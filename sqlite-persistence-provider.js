"use strict";
const { DatabaseSync } = require("node:sqlite");
function stable(value) { return JSON.stringify(value); }
function openPersistenceProvider({ filename } = {}) {
  if (!filename) throw new Error("PERSISTENCE_FILENAME_REQUIRED");
  const db = new DatabaseSync(filename);
  db.exec("CREATE TABLE IF NOT EXISTS artifacts (artifact_id TEXT NOT NULL, version TEXT NOT NULL, artifact_type TEXT, generation TEXT, payload TEXT NOT NULL, PRIMARY KEY(artifact_id, version)); CREATE TABLE IF NOT EXISTS mutations (mutation_id TEXT PRIMARY KEY, fingerprint TEXT NOT NULL);");
  let closed = false, active = null;
  const ensure = () => { if (closed) throw new Error("PERSISTENCE_CLOSED"); };
  const provider = {
    closePersistenceProvider() { if (!closed) { db.close(); closed = true; } },
    withGovernedTransaction(tx = {}, callback) {
      ensure(); if (typeof callback !== "function" || !tx.mutationId) throw new Error("GOVERNED_TRANSACTION_REQUIRED");
      const fingerprint = stable({ transactionId: tx.transactionId || null, mutationId: tx.mutationId, purpose: tx.purpose || null, expectedWrites: tx.expectedWrites || null });
      const prior = db.prepare("SELECT fingerprint FROM mutations WHERE mutation_id=?").get(tx.mutationId);
      if (prior) { if (prior.fingerprint !== fingerprint) throw new Error("CONFLICTING_MUTATION_REPLAY"); return { status: "COMMITTED", idempotent: true }; }
      db.exec("BEGIN IMMEDIATE"); active = [];
      try { const result = callback(provider); db.prepare("INSERT INTO mutations(mutation_id,fingerprint) VALUES(?,?)").run(tx.mutationId, fingerprint); db.exec("COMMIT"); active = null; return { status: "COMMITTED", idempotent: false, result }; }
      catch (error) { db.exec("ROLLBACK"); active = null; throw error; }
    },
    writeArtifact(artifact) {
      ensure(); if (!active || !artifact?.artifactId || artifact.version === undefined) throw new Error("GOVERNED_ARTIFACT_WRITE_REQUIRED");
      const payload = stable(artifact.payload), existing = db.prepare("SELECT payload FROM artifacts WHERE artifact_id=? AND version=?").get(artifact.artifactId, String(artifact.version));
      if (existing) { if (existing.payload !== payload) throw new Error("IMMUTABLE_ARTIFACT_CONFLICT"); return { artifactId: artifact.artifactId, version: String(artifact.version), duplicate: true }; }
      db.prepare("INSERT INTO artifacts(artifact_id,version,artifact_type,generation,payload) VALUES(?,?,?,?,?)").run(artifact.artifactId, String(artifact.version), artifact.artifactType || null, artifact.generation || null, payload);
      active.push(artifact.artifactId); return { artifactId: artifact.artifactId, version: String(artifact.version), duplicate: false };
    },
    readArtifact(artifactId, version) { ensure(); const row = db.prepare("SELECT * FROM artifacts WHERE artifact_id=? AND version=?").get(artifactId, String(version)); if (!row) throw new Error("ARTIFACT_NOT_FOUND"); return { artifactId: row.artifact_id, version: row.version, artifactType: row.artifact_type, generation: row.generation, payload: JSON.parse(row.payload) }; },
    lookupArtifacts({ artifactType, generation, limit } = {}) { ensure(); const where = [], values = []; if (artifactType !== undefined) { where.push("artifact_type=?"); values.push(artifactType); } if (generation !== undefined) { where.push("generation=?"); values.push(generation); } const cap = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 1000000; const rows = db.prepare(`SELECT artifact_id AS artifactId, version FROM artifacts${where.length ? ` WHERE ${where.join(" AND ")}` : ""} ORDER BY artifact_id, version LIMIT ?`).all(...values, cap); return { rows }; }
  };
  return provider;
}
module.exports = { openPersistenceProvider };

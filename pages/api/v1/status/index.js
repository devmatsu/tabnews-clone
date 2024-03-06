import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version;");
  const postgresMaxConnections = await database.query("SHOW max_connections;");
  const postgresUsedConnections = await database.query(
    "SELECT * FROM pg_stat_activity;",
  );

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: postgresVersion.rows[0].server_version,
    postgres_max_connections: parseInt(
      postgresMaxConnections.rows[0].max_connections,
    ),
    postgres_used_connections: postgresUsedConnections.rowCount,
  });
}

export default status;

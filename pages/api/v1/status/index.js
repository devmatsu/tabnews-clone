import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersion.rows[0].server_version;

  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbMaxConnectionsValue = parseInt(
    dbMaxConnections.rows[0].max_connections,
  );

  const dbUsedConnections = await database.query(
    "SELECT * FROM pg_stat_activity;",
  );
  const dbUsedConnectionsValue = dbUsedConnections.rowCount;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: dbMaxConnectionsValue,
      },
    },
  });
}

export default status;

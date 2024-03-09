import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersion.rows[0].server_version;

  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbMaxConnectionsValue = parseInt(
    dbMaxConnections.rows[0].max_connections,
  );

  const dbOpenConnections = await database.query(
    "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = 'local_db';",
  );
  const dbOpenConnectionsValue = dbOpenConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: dbMaxConnectionsValue,
        opened_connections: dbOpenConnectionsValue,
      },
    },
  });
}

export default status;

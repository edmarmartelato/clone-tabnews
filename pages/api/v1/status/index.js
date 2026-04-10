import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionvalue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValues =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnectionsResult = await database.query(
    "SELECT * FROM pg_stat_activity WHERE datname = 'local_db' ;",
  );

  console.log(databaseOpenedConnectionsResult);

  const databaseOpenedConnectionsValues =
    databaseOpenedConnectionsResult.rows[0].count;

  console.log(" aqui : " + databaseOpenedConnectionsValues);

  response.status(200).json({
    updated_At: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionvalue,
        max_connections: parseInt(databaseMaxConnectionsValues),
        opened_connections: databaseOpenedConnectionsValues,
      },
    },
  });
}

export default status;

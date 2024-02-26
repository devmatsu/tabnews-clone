import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 AS SUM;");
  console.log(result.rows);

  response.status(200).json({ message: "The API is working" });
}

export default status;

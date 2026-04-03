import database from "../../../../infra/database.js";

async function status(request, response) {
  //response.status(200).send("alunos do curso.dev são pessoas acima da média");
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "são acima da média" });
}

export default status;

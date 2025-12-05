import { ENV } from "./config/constant";
import { connection } from "./config/knexfile";
import app from "./index";

app.listen(ENV.PORT, () => {
  console.log(`Servidor rodando`);
});
connection
  .raw("SELECT 1")
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

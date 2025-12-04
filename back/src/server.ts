import { ENV } from "./config/constant";
import app from "./index";

app.listen(ENV.PORT, () => {
  console.log(`Servidor rodando na porta ${ENV.PORT}`);
});

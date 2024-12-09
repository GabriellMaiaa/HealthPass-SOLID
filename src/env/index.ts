import "dotenv";
import { z } from "zod";

const envSchema = z.object({
  //Aqui crio a validação das nossas variáveis de ambiente
  NODE_ENV: z.enum(["production", "dev", "test"]).default("dev"),
  PORT: z.coerce.number().default(3333), // O coerce faz a conversão
});

const _env = envSchema.safeParse(process.env); // Aqui está validando se dentro de process existe as minhas Var´s

if (_env.success === false) {
  // Se der erro nas variaveis
  console.error("Invalid enviroment variables", _env.error.format());
  throw new Error("Invalid enviroment variables"); // Roda o erro e para a aplicação
}

export const env = _env.data; // Se der certo exporta para os outros arquivos

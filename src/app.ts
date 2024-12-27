import fastify from "fastify";
//Aqui nesse file app, só criamos a instância do nosso app do Fastify

import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validantion error", issues: error.format() }); //Aqui mostramos o erro globalmente com o zod
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return res.status(500).send({ message: "Internal error server." });
});

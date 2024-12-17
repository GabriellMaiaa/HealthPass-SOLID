// Esse routes funciona como um plugin do fastify, por isso tem que ser assícrono

import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register); // Estou passando aqui somente o nome do meu CONTROLLER
}

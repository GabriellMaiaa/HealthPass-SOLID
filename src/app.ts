import fastify from "fastify";
//Aqui nesse file app, só criamos a instância do nosso app do Fastify

import { appRoutes } from "./http/routes";
export const app = fastify();

app.register(appRoutes);

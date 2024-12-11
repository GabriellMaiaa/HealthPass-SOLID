import fastify from "fastify";
//Aqui nesse file app, só criamos a instância do nosso app do Fastify
import { PrismaClient } from "@prisma/client";
export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Gabriel Maia",
    email: "gmaia@gmail.com",
  },
});

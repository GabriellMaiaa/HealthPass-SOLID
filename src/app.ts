import fastify from "fastify";
//Aqui nesse file app, só criamos a instância do nosso app do Fastify
import { z } from "zod";
import { prisma } from "./lib/prisma";
export const app = fastify();

prisma.user.create({
  data: {
    name: "Gabriel Maia",
    email: "gmaia@gmail.com",
    password_hash: "293904",
  },
});

app.post("/users", async (req, res) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });
  const { name, email, password } = registerBodySchema.parse(req.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });
  return res.status(201).send();
});

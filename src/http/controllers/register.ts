import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });
  const { name, email, password } = registerBodySchema.parse(req.body);

  const password_hash = await hash(password, 4); // O 2 parametro se refere a quantas vezzes vai gerar uma senha hash a partir da nossa

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userWithSameEmail) {
    return res.status(409).send("This email is already in our database");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
  return res.status(201).send();
}

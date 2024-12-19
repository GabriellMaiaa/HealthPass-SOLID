import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { registerUseCase } from "@/services/register";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });
  const { name, email, password } = registerBodySchema.parse(req.body);
  try {
    await registerUseCase({
      // Chamada de nosso service
      name,
      email,
      password,
    });
  } catch (err) {
    res.status(409).send("Error. This email already exist");
  }
  return res.status(201).send();
}

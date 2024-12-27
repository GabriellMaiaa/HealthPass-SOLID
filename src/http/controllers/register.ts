import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterUseCase } from "@/services/register";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });
  const { name, email, password } = registerBodySchema.parse(req.body);
  try {
    const usersRepository = new PrismaUsersRepository(); //Chamando nossos repository, tiramos basicamente tudo do prisma de dentro do controller
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
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

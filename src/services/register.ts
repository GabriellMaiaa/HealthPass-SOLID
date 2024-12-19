import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUseCase {
  name: string;
  email: string;
  password: string;
}

// Os services contém ações que SEMPRE ACONTECEM em nossas requisiçoes HTTP

export async function registerUseCase({
  name, // Pega os parâmetros obrigatórios para a CRIAÇÃO DE NOSSO USER
  email,
  password,
}: RegisterUseCase) {
  const password_hash = await hash(password, 4); // O 2 parametro se refere a quantas vezzes vai gerar uma senha hash a partir da nossa

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userWithSameEmail) {
    throw new Error("This email already exist!");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}

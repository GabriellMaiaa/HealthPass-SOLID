import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

// Os services contém ações que SEMPRE ACONTECEM em nossas requisiçoes HTTP

export class RegisterUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    //metodo execute,usando a inversão de dependecias
    const password_hash = await hash(password, 4); // O 2 parametro se refere a quantas vezzes vai gerar uma senha hash a partir da nossa

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new Error("This email already exist!");
    }
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}

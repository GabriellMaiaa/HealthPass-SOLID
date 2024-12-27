import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// -> Os repositories patterns economizam nosso tempo em relação a se quisermos trocar nossa lib de banco,
//-> Pois só esses arquivos vão ter que mexer
export class PrismaUsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  // Isso aqui já uma interface que o Prisma gera com várias possibilidades
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}

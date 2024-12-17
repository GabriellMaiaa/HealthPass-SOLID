import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [], //Se o sql for executado em dev, mostre o log das queries
});

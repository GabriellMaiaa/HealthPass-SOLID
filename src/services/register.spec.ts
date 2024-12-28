import { expect, test, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register use cases", () => {
  it("should hash user password upon registratio", async () => {
    const registerUseCase = new RegisterUseCase({
      //Aqui estou simulando a criação dos atributos no banco
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });
    //Aqui abaixo esta pegando desestruturado o valor de user
    const { user } = await registerUseCase.execute({
      name: "Gabriel teste",
      email: "gmaia@gmail.com",
      password: "12344",
    });
    const isPasswordCorrectlyHashed = await compare(
      // Isso aqui vai ta comparando a senha enviada com o hashed feito dele
      "123456",
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true); // esperar pra ver se os valores sao iguais
  });
});

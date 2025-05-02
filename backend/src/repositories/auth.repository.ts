import { executeQuery } from "../config/database";

class AuthRepository {
  async findByUser(user: string, pass: string) {
    const result = await executeQuery(
      "select codigo,nome,senha from c000008 where codigo = ?",
      [user]
    );

    if (!result?.length) {
      throw new Error("Usuário não encontrado");
    }

    const usuario = result[0];

    if (usuario?.senha != pass) {
      throw new Error("A senha não confere");
    }

    if (usuario?.senha === pass) {
      return { ...usuario, dataRegristro: new Date() };
    }
  }

  async check(user: string, pass: string) {
    const result = await executeQuery(
      "select codigo,senha from c000008 where codigo = ?",
      [user]
    );

    if (!result?.length) {
      throw new Error("Usuário não encontrado");
    }
    if (result[0]?.senha != pass) {
      throw new Error("A senha não confere");
    }

    if (result[0]?.senha === pass) {
      return true;
    }
  }
}

export default new AuthRepository();

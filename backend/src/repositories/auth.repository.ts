import { executeQuery } from "../config/database";

class AuthRepository {
  async findByUser(user: string, pass: string) {
    const result = await executeQuery(
      "select codigo,nome,senha_app from c000008 where f_vendedor = 1 and codigo = ?",
      [user]
    );


    if (!result?.length) {
      throw new Error("Usuário não encontrado");
    }

    const usuario = result[0];

    if (usuario?.senha_app != pass) {
      throw new Error("A senha não confere");
    }

    if (usuario?.senha_app === pass) {
      return { ...usuario, dataRegristro: new Date() };
    }
  }

  async check(user: string, pass: string) {
    const result = await executeQuery(
      "select codigo,senha_app from c000008 where codigo = ?",
      [user]
    );

    if (!result?.length) {
      throw new Error("Usuário não encontrado");
    }
    if (result[0]?.senha_app != pass) {
      throw new Error("A senha não confere");
    }

    if (result[0]?.senha_app === pass) {
      return true;
    }
  }
}

export default new AuthRepository();

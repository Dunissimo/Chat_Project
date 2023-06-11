import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { pool as db } from "../db";
import { QueryConfig } from "pg";
import { generateJWT } from "../utils/generateJWT";

export class AuthService {
  async createUser(dto: any) {
    // TODO: сделать dto

    const { name, password, email, role } = dto || {};
    const salt = genSaltSync(7);
    const passwordHash = hashSync(password, salt);

    const query: QueryConfig = {
      name: "create-user",
      text: 'INSERT INTO public."user" (name, password, email, role) VALUES($1, $2, $3, $4);',
      values: [name, passwordHash, email, role || "user"],
    };

    await db.query(query);

    return { message: "Пользователь зарегистрирован" };
  }

  async findUser(name: string) {
    const query: QueryConfig = {
      name: "find-user",
      text: 'SELECT * FROM public."user" Where name = $1',
      values: [name],
    };

    return db.query(query);
  }

  async validateUser(name: string, password: string) {
    const user = await this.findUser(name);

    if (user.rowCount < 1) {
      return false;
    }

    const isCorrectPass = compareSync(password, user.rows[0].password);

    if (!isCorrectPass) {
      return false;
    }

    return true;
  }

  async login(name: string) {
    return {
      access_token: generateJWT(name),
      message: "Пользователь вошел в систему",
    };
  }
}

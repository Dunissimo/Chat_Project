import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { pool as db } from "../db";
import { QueryConfig } from "pg";

export class AuthService {
  async createUser(dto: any) {
    // TODO: сделать dto

    const { name, password, email, role } = dto || {};
    const salt = genSaltSync(7);
    const passwordHash = hashSync(password, salt);

    // нужно найти пользователя в бд, проверить пароль, и если все ок, то вернуть name
    const query: QueryConfig = {
      name: "create-user",
      text: 'INSERT INTO public."User" (name, password, email, role) VALUES($1, $2, $3, $4);',
      values: [name, passwordHash, email, role || "user"],
    };
    const newUser = await db.query(query);

    return newUser;
  }

  async findUser(name: string) {
    const query: QueryConfig = {
      name: "find-user",
      text: 'SELECT * FROM public."User" Where name = $1',
      values: [name],
    };

    return db.query(query);
  }

  async validateUser(name: string, password: string) {
    const user = await this.findUser(name);

    if (user.rows.length < 1) {
      throw new Error("Пользователь не найден");
    }

    const isCorrectPass = compareSync(password, user.rows[0].password);

    if (!isCorrectPass) {
      throw new Error("Неправильный пароль");
    }

    return { name: user.rows[0].name };
  }
  async login(name: string) {
    // TODO: нужно вернуть новый access_token
    const payload = { name };

    return {
      access_token: "here_must_be_a_jwt " + payload.name,
    };
  }
}

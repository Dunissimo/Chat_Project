import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { pool as db } from "../db";
import { QueryConfig } from "pg";
import { generateJWT } from "../utils/generateJWT";
import { CustomError } from "../utils/custom-error";

export class AuthService {
  async createUser(dto: any) {
    // TODO: сделать dto

    const { name, password, email, role } = dto || {};
    const salt = genSaltSync(7);
    const passwordHash = hashSync(password, salt);

    // TODO: сделать норм валидацию
    if (
      name.length < 2 ||
      !/^[a-zA-Zа-яА-Я]+([-_]?[a-zA-Zа-яА-Я0-9]+){0,2}$/.test(name)
    ) {
      throw new CustomError(
        401,
        "Логин слишком короткий или содержит недопустимые символы"
      );
    }

    if (password.length < 5) {
      throw new CustomError(
        401,
        "Пароль слишком короткий, минимальная длина равна пяти"
      );
    }

    const query: QueryConfig = {
      name: "create-user",
      text: 'INSERT INTO public."User" (name, password, email, role) VALUES($1, $2, $3, $4);',
      values: [name, passwordHash, email, role || "user"],
    };

    const user = await db.query(query);

    return { user, message: "Пользователь зарегистрирован" };
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
      throw new CustomError(404, "Пользователь не найден");
    }

    const isCorrectPass = compareSync(password, user.rows[0].password);

    if (!isCorrectPass) {
      throw new CustomError(404, "Неправильный пароль");
    }

    return { user: user.rows[0] };
  }

  async login(name: string, password: string) {
    return {
      user: this.validateUser(name, password),
      access_token: generateJWT(name),
      message: "Пользователь вошел в систему",
    };
  }
}

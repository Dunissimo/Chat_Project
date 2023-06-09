import createHttpError from "http-errors";
import { AuthService } from "../services/auth";
// require("express-async-errors");

const authService = new AuthService();

export class AuthController {
  async register(dto: any) {
    const oldUser = await authService.findUser(dto.name);

    if (oldUser.rows.length > 0) {
      throw createHttpError(401, "Пользователь уже зарегестрирован");
    }

    return authService.createUser(dto);
  }

  async login(dto: any) {
    const { name } = await authService.validateUser(dto.name, dto.password);

    if (!name) {
      throw new Error("Неправильный логин или пароль");
    }

    return authService.login(name);
  }
}

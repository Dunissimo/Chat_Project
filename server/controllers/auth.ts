import { AuthService } from "../services/auth";
import { CustomError } from "../utils/custom-error";
import { generateJWT } from "../utils/generateJWT";

const authService = new AuthService();

export class AuthController {
  async register(dto: any) {
    const oldUser = await authService.findUser(dto.name);

    if (oldUser.rows.length > 0) {
      throw new CustomError(401, "Пользователь уже зарегестрирован");
    }

    return authService.createUser(dto);
  }

  async login(dto: any) {
    const { name } = await authService.validateUser(dto.name, dto.password);

    if (!name) {
      throw new CustomError(401, "Неправильный логин или пароль");
    }

    return authService.login(name);
  }
}

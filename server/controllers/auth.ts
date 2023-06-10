import { AuthService } from "../services/auth";
import { CustomError } from "../utils/custom-error";
import { generateJWT } from "../utils/generateJWT";

const authService = new AuthService();

export class AuthController {
  async register(dto: any) {
    const { name, password } = dto || {};

    // TODO: сделать норм валидацию
    if (name.length < 2) {
      throw new CustomError(404, "Логин слишком короткий");
    }

    if (!/^[a-zA-Zа-яА-Я]+([-_]?[a-zA-Zа-яА-Я0-9]+){0,2}$/.test(name)) {
      throw new CustomError(404, "Логин содержит недопустимые символы");
    }

    if (password.length < 5) {
      throw new CustomError(
        404,
        "Пароль слишком короткий, минимальная длина равна пяти"
      );
    }

    const oldUser = await authService.findUser(dto.name);

    if (oldUser.rows.length > 0) {
      throw new CustomError(404, "Пользователь уже зарегестрирован");
    }

    return authService.createUser(dto);
  }

  async login(dto: any) {
    const isValid = await authService.validateUser(dto.name, dto.password);

    if (!isValid) {
      throw new CustomError(404, "Неправильный логин или пароль");
    }

    return authService.login(dto.name);
  }
}

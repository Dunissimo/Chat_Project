import { userSerice } from "../services/users";
import { CustomError } from "../utils/custom-error";

class UsersController {
  async getUser(id: number) {
    const response = await userSerice.getUser(id);

    if (!response) {
      throw new CustomError(404, "Пользователь не найден");
    }

    return { user: response, message: `Найден пользователь с id: ${id}}` };
  }

  async updateUser(dto: any, id: number) {
    // добавить обработку ошибок
    return userSerice.updateUser(dto, id);
  }
}

export const usersController = new UsersController();

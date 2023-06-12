import { userSerice } from "../services/users";

class UsersController {
  async updateUser(dto: any, id: number) {
    return userSerice.updateUser(dto, id);
  }
}

export const usersController = new UsersController();

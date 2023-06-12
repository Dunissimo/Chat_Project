import { pool as db } from "../db";

class UserService {
  async updateUser(dto: any, id: number) {
    const query = {
      name: "update-user",
      text: 'UPDATE public."user" SET name = $1, email = $2 WHERE user_id = $3',
      values: [dto.name, dto.email, id],
    };

    const res = await db.query(query);
    console.log(res);
  }

  async deleteUser(dto: any) {}
}

export const userSerice = new UserService();

import { QueryConfig } from "pg";
import { pool as db } from "../db";

class UserService {
  async getUser(id: number) {
    const query: QueryConfig = {
      name: "get-user",
      text: 'SELECT * FROM public."user" WHERE user_id = $1',
      values: [id],
    };

    const response = await db.query(query);

    if (response.rowCount < 1) {
      return null;
    }

    return response.rows[0];
  }

  async updateUser(dto: any, id: number) {
    const query = {
      name: "update-user",
      text: 'UPDATE public."user" SET name = $1, email = $2 WHERE user_id = $3',
      values: [dto.name, dto.email, id],
    };

    await db.query(query);
  }

  async deleteUser(dto: any) {}
}

export const userSerice = new UserService();

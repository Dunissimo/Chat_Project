import axios from "axios";
import { apiRoutes } from "./api-routes";

class UsersApi {
  async getUser(id: number) {
    return axios.get(`${apiRoutes.users}${id}`);
  }

  async updateUser(dto: any, id: number | undefined) {
    return axios.patch(`${apiRoutes.users}${id}`, dto);
  }
}

export default new UsersApi();

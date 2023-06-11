import axios from "axios";
import { registerDto } from "../utils/interfaces";
import { apiRoutes } from "./api-routes";

class AuthApi {
  async register(dto: registerDto) {
    // return fetch(apiRoutes.registerUser, {
    //   method: "POST",
    //   body: JSON.stringify(dto),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return axios.post(apiRoutes.registerUser, dto);
  }

  async login(dto: Pick<registerDto, "name" | "password">) {
    // return fetch(apiRoutes.loginUser, {
    //   method: "POST",
    //   body: JSON.stringify(dto),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return axios.post(apiRoutes.loginUser, dto);
  }
}

export default new AuthApi();

import axios from "axios";
import { loginDto, registerDto } from "../utils/interfaces";
import { apiRoutes } from "./api-routes";

class AuthApi {
  async auth(mode: "login" | "signup", dto: registerDto | loginDto) {
    if (mode == "login") {
      return this.login(dto);
    }
    if (mode == "signup") {
      return this.register(dto);
    }
  }

  async register(dto: registerDto) {
    return axios.post(apiRoutes.registerUser, dto);
  }

  async login(dto: loginDto) {
    return axios.post(apiRoutes.loginUser, dto);
  }
}

export default new AuthApi();

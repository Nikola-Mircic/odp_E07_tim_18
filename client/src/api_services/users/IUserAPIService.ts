import type { UserDto } from "../../models/users/UserDTO";
import type { ApiResponse } from "../../types/common/ApiResponse";

export interface IUserAPIService {
  getUserById(id: number): Promise<ApiResponse<UserDto>>;
}
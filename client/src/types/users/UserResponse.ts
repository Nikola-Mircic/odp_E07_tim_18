import type { UserDto } from "../../models/users/UserDTO";

export interface UserResponse {
  success: boolean;
  message: string;
  data?: UserDto;
}
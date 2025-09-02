import type { UserResponse } from "../../types/users/UserResponse";

export interface IUserAPIService {
  getUserById(id: number): Promise<UserResponse>;
}
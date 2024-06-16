import { User } from "../models/user.model";

export class UserRepository {
  constructor(private userModel: User){}

  async getUserByLogin(login: string){
    const result = await User.findAll({
      where: {login}
    })
    return result[0]
  }
}
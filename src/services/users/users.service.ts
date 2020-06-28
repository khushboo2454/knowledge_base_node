import { getRepository, getConnection } from 'typeorm';
import { Users } from '../../entities/Users';

export default class UserService {

  constructor() {}

  /**
   * Inserts a new User into the database.
   * @param data user data
   */
  async insert(data: Users): Promise<Users> {
    const newUser = await getRepository(Users).create(data);
    return await getRepository(Users).save(newUser);
  }

  /**
   * find user by email
   * @param data user data
   */
  async getUser(email: string) {
    let whereClause: any = { email };
    return await getConnection().getRepository(Users).findOne(whereClause);
  }

  /**
   * find user by social id
   * @param id users social id
   */
  async getBySocialId(id: string): Promise<Users | undefined> {
    const users = await getRepository(Users).find({
      where: { googleId : id}
    });
    if (users && users.length > 0) {
      return users[0];
    } else {
      return undefined;
    }
  }
}

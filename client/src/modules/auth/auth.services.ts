import { RegisterDto } from './dtos/register.dto';

import { User } from '../user/interfaces/user.interface';
import { UserMapper } from '../user/mappers/user.mapper';

import { httpClientExternal } from '../../lib/http-client/http-client-external';

export class AuthServices {
  async register(credentials: RegisterDto): Promise<User> {
    try {
      const { data: response } = await httpClientExternal.request({
        url: 'auth/register',
        method: 'POST',
        data: credentials,
      });

      return new UserMapper().toDomain(response.data.profile);
    } catch (error: any) {
      const errorMessage = error?.response?.message;

      throw new Error(errorMessage);
    }
  }
}

const authServices = new AuthServices();

export default authServices;

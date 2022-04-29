import { httpClientExternal } from '../../lib/http-client/http-client-external';

import { SimpleUserMapper } from '../user/mappers/simple-user.mapper';
import { UpdateUserDto } from '../user/dtos/update-user.dto';

export class AdminService {
  session: Record<string, string>;

  constructor(session: Record<string, string>) {
    this.session = session;
  }
  async fetchUsers() {
    const { data: response } = await httpClientExternal.request({
      url: '/admin/users',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.session.accessToken}`,
      },
    });

    return response.data.map(new SimpleUserMapper().toDomain);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { data: response } = await httpClientExternal.request({
      url: `/admin/users/${id}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.session.accessToken}`,
      },
      data: updateUserDto,
    });

    return new SimpleUserMapper().toDomain(response.data);
  }

  async deleteUser(id: string) {
    await httpClientExternal.request({
      url: `/admin/users/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.session.accessToken}`,
      },
    });
  }

  async updateUserSpread(id: string, spread: number) {
    const { data: response } = await httpClientExternal.request({
      url: `/admin/users/${id}/spread`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.session.accessToken}`,
      },
      data: { spread },
    });

    return new SimpleUserMapper().toDomain(response.data);
  }
}

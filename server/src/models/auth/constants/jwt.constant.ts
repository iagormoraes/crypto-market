import { Environment } from '../../../config/environment';

export const jwtConstants = {
  secret: Environment.JWT_SECRET,
  expiresIn: Environment.ACCESS_TOKEN_EXPIRY,
};

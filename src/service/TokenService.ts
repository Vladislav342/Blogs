const jwt = require('jsonwebtoken');
import TokenModel from '@/models/TokenModel';
import { UserDataDto } from '@/types/UserDataDto';

class TokenServices {
  generateToken(payload: UserDataDto) {
    const refreshToken = jwt.sign(
      payload,
      `${process.env.JWT_REFRESH_SECRET}`,
      { expiresIn: '30m' },
    );
    return refreshToken;
  }

  validateRefreshToken(token: string) {
    try {
      console.log(token);
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      return await TokenModel.findOneAndUpdate(
        { user: userId },
        { refreshToken },
        {
          returnOriginal: false,
        },
      );
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new Error('There is no refresh token');
    }
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async removeTokenById(id: string) {
    const tokenData = await TokenModel.deleteOne({ user: id });
    return tokenData;
  }

  async findToken(id: string) {
    const tokenData = await TokenModel.findOne({ user: id });
    return tokenData;
  }
}

const TokenService = new TokenServices();

export default TokenService;

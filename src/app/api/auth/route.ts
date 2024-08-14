import dbConnect from '@/lib/dbConnect';
import UserBlog from '@/models/UserModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import TokenService from '@/service/TokenService';
import { UsersDto } from '@/types/UsersDto';
import userValidation from '@/validation/userValidSchema';

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
      return NextResponse.json(null);
    }
    return NextResponse.json(refreshToken);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const { login, password, action } = Object.fromEntries(
    req.nextUrl.searchParams,
  );
  let { error }: any = userValidation({ login, password, action });
  if (error) {
    return NextResponse.json(error.details[0].message);
  }

  try {
    const candidate: UsersDto | null = await UserBlog.findOne({ login: login });

    if (action === 'signIn') {
      if (candidate) {
        return NextResponse.json('This user is already created.');
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const newUser = await UserBlog.create({ login, password: hashPassword });
      const token = TokenService.generateToken({ ...newUser });

      await TokenService.saveToken(newUser._id, token);

      const res = NextResponse.json({
        token,
        user: newUser,
      });
      res.cookies.set('refreshToken', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookies.set('login', login, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res;
    }

    if (action === 'logIn') {
      if (!candidate) {
        return NextResponse.json(
          'You are not authorized yet! Please, sign in.',
        );
      }
      const isPassEquals = await bcrypt.compare(password, candidate.password);
      if (!isPassEquals) {
        return NextResponse.json('The password might be wrong');
      }

      let extToken = await TokenService.findToken(candidate._id);
      if (extToken) {
        await TokenService.removeTokenById(candidate._id);
      }

      const token = TokenService.generateToken({ ...candidate });
      await TokenService.saveToken(candidate._id, token);

      const res = NextResponse.json({
        token,
        user: candidate,
      });
      res.cookies.set('refreshToken', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookies.set('login', login, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res;
    }
  } catch {
    return NextResponse.json('Something went wrong');
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const refreshToken = req.cookies.get('refreshToken')?.value;
  await TokenService.removeToken(refreshToken);

  const res = NextResponse.json('Successfully removed');
  res.cookies.set('refreshToken', '', {
    maxAge: -1,
  });
  res.cookies.set('login', '', {
    maxAge: -1,
  });

  return res;
}

import dbConnect from '@/lib/dbConnect';
// import Blog from '@/models/Blogs';
import BlogService from "@/service/BlogController";
import { NextResponse, NextRequest } from 'next/server';
import TokenService from '@/service/TokenService';
import blogValidation from '@/validation/blogValidSchema';

export async function GET() {
  await dbConnect();

  try {
    const blogs = await BlogService.findAllBlogs();
    return NextResponse.json(blogs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    const validToken = await TokenService.validateRefreshToken(
      refreshToken || '',
    );

    if (!validToken) {
      await TokenService.removeToken(refreshToken);
      const res = NextResponse.json("You're not authorized !");
      res.cookies.set('refreshToken', '', {
        maxAge: -1,
      });
      res.cookies.set('login', '', {
        maxAge: -1,
      });
      return res;
    }

    const { title, date, content } = await req.json();
    let { error }: any = blogValidation({ title, date, content });
    if (error) {
      return NextResponse.json(error.details[0].message);
    }

    const newBlog = await BlogService.createBlog(title, date, content);
    return NextResponse.json(newBlog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    const validToken = await TokenService.validateRefreshToken(
      refreshToken || '',
    );

    if (!validToken) {
      await TokenService.removeToken(refreshToken);
      const res = NextResponse.json("You're not authorized !");
      res.cookies.set('refreshToken', '', {
        maxAge: -1,
      });
      res.cookies.set('login', '', {
        maxAge: -1,
      });
      return res;
    }

    const { _id, title, date, content } = await req.json();
    let { error }: any = blogValidation({ title, date, content });
    if (error) {
      return NextResponse.json(error.details[0].message);
    }
    const editedBlog = await BlogService.findBlogAndUpdate(_id, title, date, content);
    return NextResponse.json(editedBlog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    const validToken = await TokenService.validateRefreshToken(
      refreshToken || '',
    );

    if (!validToken) {
      await TokenService.removeToken(refreshToken);
      const res = NextResponse.json("You're not authorized !");
      res.cookies.set('refreshToken', '', {
        maxAge: -1,
      });
      res.cookies.set('login', '', {
        maxAge: -1,
      });
      return res;
    }

    const { _id } = Object.fromEntries(req.nextUrl.searchParams);
    const remBlog = await BlogService.removeBlog(_id);
    return NextResponse.json(remBlog);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

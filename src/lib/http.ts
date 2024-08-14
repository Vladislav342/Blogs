import { PostDataDto } from '@/types/PostDataDto';
import { UserTokenDto } from '@/types/UsersDto';
import { ILogIn } from '@/types/ILogedIn';

export async function getSortedPostsData(): Promise<PostDataDto[]> {
  const fetchBlogs = async (): Promise<PostDataDto[]> => {
    const res = await fetch('http://localhost:3000/api/blogs', {
      method: 'GET',
    });
    if (!res.ok) {
      throw new Error('Failed to get posts');
    }
    const blogs: PostDataDto[] = await res.json();
    return blogs;
  };

  let allBlogs: PostDataDto[] = await fetchBlogs();

  return allBlogs.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function removeBlog(id: string): Promise<void | string> {
  const fetchRemoveBlog = async (): Promise<void | string> => {
    const res = await fetch(`http://localhost:3000/api/blogs?_id=${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to remove the blog');
    }

    const result: void | string = await res.json();
    return result;
  };

  const removedBlog = await fetchRemoveBlog();
  return removedBlog;
}

export async function logIn({
  loginValue,
  passValue,
  action,
}: ILogIn): Promise<UserTokenDto | string> {
  const fetchLogIn = async (): Promise<UserTokenDto | string> => {
    const res = await fetch(
      `http://localhost:3000/api/auth?login=${loginValue}&password=${passValue}&action=${action}`,
      {
        method: 'POST',
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to ${action}`);
    }

    const user: UserTokenDto | string = await res.json();
    return user;
  };

  const logedIn_Or_signedInUser = await fetchLogIn();
  return logedIn_Or_signedInUser;
}

export async function createBlog({
  title,
  date,
  content,
}: PostDataDto): Promise<PostDataDto | string> {
  const fetchNewBlog = async (): Promise<PostDataDto | string> => {
    const res = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        date,
        content,
      }),
    });

    const blog: PostDataDto | string = await res.json();
    return blog;
  };

  const newBlog = await fetchNewBlog();
  return newBlog;
}

export async function editBlog({
  _id,
  title,
  date,
  content,
}: PostDataDto): Promise<PostDataDto | string> {
  const fetchEditBlog = async (): Promise<PostDataDto | string> => {
    const res = await fetch('http://localhost:3000/api/blogs', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        title,
        date,
        content,
      }),
    });

    const blog: PostDataDto | string = await res.json();
    return blog;
  };

  const editedBlog = await fetchEditBlog();
  return editedBlog;
}

export async function getToken() {
  const fetchToken = async (): Promise<string> => {
    const res = await fetch(`http://localhost:3000/api/auth`, {
      method: 'GET',
    });

    const token: string = await res.json();
    return token;
  };

  const authToken = await fetchToken();
  return authToken;
}

export async function removeToken() {
  const fetchRemToken = async (): Promise<string> => {
    const res = await fetch(`http://localhost:3000/api/auth`, {
      method: 'DELETE',
    });

    const result: string = await res.json();
    return result;
  };

  const removedToken = await fetchRemToken();
  return removedToken;
}

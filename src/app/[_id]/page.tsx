'use client';
import React, { useEffect, useState, useRef } from 'react';
import { getSortedPostsData } from '@/lib/http';
import { PostDataDto } from '@/types/PostDataDto';
import { PostProps } from '@/types/PostProps';
import Link from 'next/link';
import { VscArrowLeft } from 'react-icons/vsc';
import { formatFullDate } from '@/common/utils';
import { ImSpinner9 } from 'react-icons/im';
import Head from 'next/head';

const SeparateBlog = ({ params }: PostProps) => {
  const [posts, setPosts] = useState<PostDataDto[]>([]);
  const [loading, setLoading] = useState(false);

  const idRef = useRef(-1);
  const getId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getSortedPostsData();
        setPosts(data);
      } catch (error: any) {
        throw new Error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const post = posts.find(p => p._id === params._id);

  let arr = post?.content.split('\n') || [];

  return (
    <div>
      <Head>
        <title>{post?.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <button className="flex justify-start items-center bg-cyan-400 hover:bg-cyan-700 text-white rounded py-1 px-2 mt-5">
        <VscArrowLeft />
        <Link href="/">Back</Link>
      </button>
      {loading && (
        <ImSpinner9 className="h-20 w-40 mt-32 mx-auto text-green-300 animate-spin"></ImSpinner9>
      )}
      {!loading && (
        <div className="container mx-auto bg-white-100 w-screen max-h-screen mr-10flex flex-col mt-12">
          <div className="flex flex-col mb-22 items-center justify-center">
            <h1 className="font-bold text-2xl">{post?.title}</h1>
            <p className="">{formatFullDate(post?.date || '')}</p>
          </div>
          <div className="flex justify-center items-center flex-col mt-16 mb-10">
            {arr.map(str => (
              <p className="w-10/12 mt-2 text-justify" key={getId()}>
                {str}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeparateBlog;

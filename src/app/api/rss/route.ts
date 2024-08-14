import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getSortedPostsData } from '@/lib/http';

export const GET = async () => {
  const posts = await getSortedPostsData();

  const feed = new RSS({
    title: 'NEWS',
    description: 'Visit out site',
    feed_url: 'https://example.com/rss.xml',
    site_url: 'http://localhost:3000',
    image_url: 'https://example.com/image.png',
    language: 'en',
    pubDate: new Date().toISOString(),
    ttl: 60,
  });

  posts.forEach(post => {
    feed.item({
      title: post.title,
      guid: post._id,
      url: `http://localhost:3000/${post._id}`,
      description: post.content || '',
      date: post.date,
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
};

import Link from 'next/link';

import { Separator } from '../ui/separator';

interface userPostListProps {
  user: string;
  id: string;
  posts: {
    id: string;
    title: string;
    tags: string[];
  }[];
}

const UserPostList = ({ user, posts }: userPostListProps) => {
  return (
    <div className='flex flex-col items-start justify-center rounded-2xl bg-white p-5 pb-[30px] dark:bg-darkPrimary-3'>
      <p className='heading3 pb-[15px] text-darkSecondary-900 dark:text-white-800'>
        More from {user}
      </p>

      <Separator />
      {posts.map((post) => (
        <div key={post?.id} className='w-full'>
          <div className='py-[15px]'>
            <Link
              href={`/post/${post?.id}`}
              className='bodyMd-semibold cursor-pointer pb-1 text-darkSecondary-900 dark:text-white-800'
            >
              {post?.title}
            </Link>
            <ul className='bodyMd-semibold flex text-darkSecondary-800'>
              {post?.tags.map((tag) => (
                <li key={tag} className='mr-1'>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <Separator className='dark:bg-darkSecondary-900' />
        </div>
      ))}
    </div>
  );
};

export default UserPostList;

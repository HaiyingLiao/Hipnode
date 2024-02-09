'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { IsLiked } from '../Home/IsLiked';

type User = {
  username: string;
  emailAddress: string;
};
interface PostCardProps extends User {
  postImage: string;
  title: string;
  tags: string[];
  avatar: string;
  authorName: string;
  online?: boolean;
  createdAt: string;
  views: number;
  // likes: string[];
  // comments: Comment[];
  styles?: string;
  id: string;
}

const PostCard = ({
  authorName,
  avatar,
  // comments,
  createdAt,
  id,
  styles,
  // likes,
  postImage,
  tags,
  title,
  views,
  online,
  emailAddress,
  username,
}: PostCardProps) => {
  return (
    <div className={cn('postCardGrid', styles)}>
      <div className='postCardGridItem1'>
        <Image
          priority
          fetchPriority='high'
          src={postImage}
          alt='Post image'
          width={156}
          height={156}
          className='postCardMainImage object-cover'
        />
      </div>

      <div className='postCardGridItem2'>
        <Link href={`/post/${id}`} className='postCardTitle'>
          {title}
        </Link>
        <ul className='postCardTagList'>
          {tags.map((tag) => (
            <li key={tag} className='tag'>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <IsLiked
        avatar={avatar}
        id={id}
        // likes={likes}
        emailAddress={emailAddress}
        username={username}
      />

      <div className='postCardGridItem4'>
        <Avatar className='avatarDesktop'>
          <AvatarImage
            src={avatar}
            alt='Avatar'
            width={40}
            height={40}
            className='rounded-full'
          />
          <AvatarFallback>{authorName}</AvatarFallback>
        </Avatar>
        <div>
          <div className='flex items-center justify-between'>
            <p className='avatarName'>{authorName}</p>
            <div
              className={`online ${
                online ? 'bg-green-500' : 'bg-darkSecondary-600'
              }`}
            ></div>
          </div>
          <p className='postCreatedDate'>{createdAt}</p>
        </div>
      </div>

      <div className='postCardGridItem5'>
        <ul className='viewsList'>
          <li>{views} Views</li>
          {/* <li>{likes.length} Likes</li> */}
          <li>10 Likes</li>
          {/* <li>{comments.length} Comments</li> */}
          <li>0 Comments</li>
        </ul>
      </div>
    </div>
  );
};

export default PostCard;

import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { likePost } from '@/lib/actions/post.action';
import { PostActions } from '@/components/index';

interface isLikedProps {
  avatar: string;
  id: string;
  likes: string[];
  emailAddress: string;
  username: string;
}

export const IsLiked = ({
  avatar,
  id,
  likes,
  emailAddress,
  username,
}: isLikedProps) => {
  const isLikedByCurrentUser = likes ? likes.includes(emailAddress) : false;
  const heartIcon = isLikedByCurrentUser
    ? '/orange-heart.svg'
    : '/gray-heart.svg';

  return (
    <div
      className='postCardGridItem3 cursor-pointer md:pl-6'
      onClick={() => likePost(id)}
    >
      <button className='heart'>
        <Image
          src={heartIcon}
          alt='Heart icon'
          width={25}
          height={25}
          className='mt-[2px]'
        />
      </button>
      <PostActions postId={id} postType='post' />

      {/* Avatar shows on mobile view instead of heart */}
      <Avatar className='avatarMobile md:hidden'>
        <AvatarImage
          src={avatar}
          alt='Avatar'
          width={25}
          height={25}
          className='rounded-full'
        />
        <AvatarFallback className='m-1'>{username}</AvatarFallback>
      </Avatar>
    </div>
  );
};

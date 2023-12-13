'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { Comment as PostComment } from '@/prisma/generated/client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CommentInput } from '@/components/index';
import {
  getCommentsReply,
  likeComments,
  uploadComment,
} from '@/lib/actions/post.action';
import { cn } from '@/lib/utils';
import { toast } from '../ui/use-toast';

type ExtendedTypes = {
  children?: ReactNode;
  postId: string;
  className?: string;
};

type PostCommentsTypes = PostComment;

const Comment = ({
  authorImage,
  comment,
  createdAt,
  id,
  name,
  postId,
  updateAt,
  likes,
  className,
  type,
}: PostCommentsTypes & ExtendedTypes) => {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [replies, setReplies] = useState<PostCommentsTypes[]>([]);

  const { user } = useUser();
  const isLikedByCurrentUser = likes?.includes(
    user?.emailAddresses[0]?.emailAddress as string,
  );

  const handleReply = async (text: string) => {
    try {
      setLoading(true);

      await Promise.all([
        uploadComment({
          message: text,
          parentId: id,
          path: window.location.pathname,
          postId,
          type: 'children',
        }),
        showAllReplies(),
      ]);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await likeComments(id, window.location.pathname, type);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  const showAllReplies = async () => {
    try {
      if (replies.length < 1) {
        const commentsReply = await getCommentsReply(postId, id);
        if (commentsReply.length < 1) {
          toast({
            title: 'There are no comments',
          });
          return;
        }
        setReplies(commentsReply);
      } else {
        setReplies([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className='rounded-b-2xl pb-2 dark:bg-darkPrimary-3'>
      <div
        className={cn('flex rounded-2xl px-4 py-5 md:px-6 lg:-mt-4', className)}
      >
        <Avatar className='mr-4 h-11 w-11 rounded-full bg-secondary-yellow-30'>
          <AvatarImage src={authorImage} className='rounded-full' />
          <AvatarFallback className='rounded-full !bg-secondary-yellow-30'>
            {name}
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-col gap-3.5'>
          <div className='flex-wrap break-words rounded-3xl border border-slate-300 p-3.5'>
            <div className='flex flex-col items-start'>
              <div className='mb-4 flex flex-wrap items-center'>
                <p className='body-semibold md:display text-darkSecondary-900 dark:text-white-800'>
                  {name} •
                </p>
                <p className='bodyMd-regular md:body-regular ml-1 text-darkSecondary-900 dark:text-white-800'>
                  {createdAt as unknown as string}{' '}
                  {updateAt ? ` • Edited on ${updateAt}` : ''}
                </p>
              </div>
              <p className='body-regular md:display-regular w-full break-words text-darkSecondary-800'>
                {comment}
              </p>
            </div>
          </div>
          <div>
            <div className='ml-4 flex gap-5'>
              <Image
                src={
                  isLikedByCurrentUser ? '/orange-heart.svg' : '/gray-heart.svg'
                }
                alt='Heart'
                width={20}
                height={20}
                className='cursor-pointer object-contain'
                onClick={handleLike}
              />

              {type !== 'children' && (
                <Image
                  src='/assets/posts/reply.svg'
                  alt='Reply Icon'
                  width={20}
                  height={20}
                  className='cursor-pointer object-contain grayscale'
                  onClick={() => setShowReplyInput(!showReplyInput)}
                />
              )}

              <Image
                src='/assets/posts/more.svg'
                alt='More Icon'
                width={20}
                height={20}
                className='cursor-pointer object-contain grayscale'
              />
            </div>
            {type !== 'children' && (
              <button
                onClick={showAllReplies}
                className='pl-4 pt-2 text-left text-sm text-darkSecondary-800'
              >
                {replies && replies.length >= 1
                  ? 'Hide all replies'
                  : 'See all replies'}
              </button>
            )}
          </div>

          {showReplyInput && (
            <div className='pr-4'>
              <CommentInput
                loading={loading}
                placeholder='Reply...'
                handleComment={handleReply}
              />
            </div>
          )}
        </div>
      </div>
      {replies?.map((reply) => (
        <Comment
          parentId={reply.parentId}
          key={reply.id}
          type='children'
          postId={id}
          likes={reply.likes}
          className='ml-[60px] mt-4'
          id={reply.id}
          name={reply.name}
          comment={reply.comment}
          authorImage={reply.authorImage}
          createdAt={createdAt}
          updateAt={updateAt}
        />
      ))}
    </div>
  );
};

export default Comment;

'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CommentInput } from '@/components/index';
import { createComment } from '@/constants';
import { CommentType } from '@/types/post';

interface CommentProps {
  id: number | string;
  user: string;
  postedDate: string;
  editedDate?: string;
  avatar: string;
  comment: string;
  className?: string;
  subComments?: CommentType[];
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

const Comment = ({
  id,
  user,
  postedDate,
  editedDate,
  avatar,
  comment,
  setComments,
  subComments = [],
  className,
}: CommentProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

  const handleReply = (text: string) => {
    if (text) {
      const subComment = createComment(text, new Date());
      setComments((prevComments: CommentType[]) => {
        const finalComments = prevComments?.map((comment: CommentType) => {
          if (comment.id === id) {
            return {
              ...comment,
              subComments: comment?.subComments?.concat(subComment),
            };
          }
          return comment;
        });
        return finalComments;
      });
      setShowReplyInput(false);
    }
  };

  return (
    <div className='rounded-b-2xl pb-2 dark:bg-darkPrimary-3'>
      <div
        className={clsx(
          'flex rounded-2xl px-4 py-5  md:px-6 lg:-mt-4',
          className,
        )}
      >
        <Avatar className='mr-4 h-11 w-11 rounded-full bg-secondary-yellow-30'>
          <AvatarImage src={avatar} className='rounded-full' />
          <AvatarFallback className='rounded-full !bg-secondary-yellow-30'>
            HN
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-col gap-3.5'>
          <div className='flex-wrap break-words rounded-3xl border border-slate-300 p-3.5'>
            <div className='flex flex-col items-start'>
              <div className='mb-4 flex flex-wrap items-center'>
                <p className='body-semibold md:display text-darkSecondary-900 dark:text-white-800'>
                  {user} •
                </p>
                <p className='bodyMd-regular md:body-regular ml-1 text-darkSecondary-900 dark:text-white-800'>
                  {postedDate} {editedDate ? ` • Edited on ${editedDate}` : ``}
                </p>
              </div>
              <p className='body-regular md:display-regular w-full break-words text-darkSecondary-800'>
                {comment}
              </p>
            </div>
          </div>
          <div className='ml-4 flex gap-5'>
            <Image
              src={
                isLiked
                  ? '/assets/posts/orange-heart-square.svg'
                  : '/assets/posts/gray-heart-square.svg'
              }
              alt='Heart'
              width={20}
              height={20}
              className={`cursor-pointer object-contain ${
                isLiked ? '' : 'grayscale'
              }`}
              onClick={() => setIsLiked(!isLiked)}
            />

            <Image
              src='/assets/posts/reply.svg'
              alt='Reply Icon'
              width={20}
              height={20}
              className='cursor-pointer object-contain grayscale'
              onClick={() => setShowReplyInput(!showReplyInput)}
            />

            <Image
              src='/assets/posts/more.svg'
              alt='More Icon'
              width={20}
              height={20}
              className='cursor-pointer object-contain grayscale'
            />
          </div>

          {showReplyInput && (
            <div className='pr-4'>
              <CommentInput
                placeholder='Reply...'
                handleComment={handleReply}
              />
            </div>
          )}
        </div>
      </div>

      <div className='rounded-2xl bg-white'>
        {subComments.length > 0 &&
          subComments.map((comment) => (
            <Comment
              className='-mt-4 ml-[60px]'
              key={comment.id}
              {...comment}
              setComments={setComments}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;

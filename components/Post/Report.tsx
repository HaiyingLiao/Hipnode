'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { reportTags } from '@/constants';
import ReportItem from './ReportItem';
import ReportConfirmation from './ReportConfirmation';
import { reportPost } from '@/lib/actions/post.action';
import { toast } from '../ui/use-toast';

interface ReportProps {
  user: string;
  postId: string;
}

const Report = ({ user, postId }: ReportProps) => {
  const [selectedReportItems, setSelectedReportItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePostReport = async () => {
    try {
      await reportPost(postId, selectedReportItems);
      setSelectedReportItems([]);
      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='reportButton no-focus h-7 hover:opacity-70'>
          <div className='reportButtonImageContainer'>
            <Image
              src='/assets/posts/report.svg'
              alt='Report icon'
              width={20}
              height={20}
              className='m-[1px] object-contain dark:brightness-200'
            />
          </div>
          <p className='display-regular text-darkSecondary-800'>Report</p>
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-[30px] rounded-2xl p-[30px] dark:bg-darkPrimary sm:max-w-[477px]'>
        <DialogHeader>
          <DialogTitle className='heading3 text-darkSecondary-900 dark:text-white-800'>
            Why are you reporting this post by {user}?
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <ul className='flex flex-wrap items-center gap-5'>
            {reportTags.map((item) => (
              <ReportItem
                selectedReportItem={selectedReportItems}
                key={item.id}
                id={item.id}
                title={item.title}
                setSelectedReportItems={setSelectedReportItems}
              />
            ))}
          </ul>
        </div>

        <DialogFooter className='flex !flex-row !justify-start'>
          <ReportConfirmation
            closeParentModal={handlePostReport}
            selectedReportItems={selectedReportItems}
          />
          <DialogClose asChild>
            <Button className='heading-3 no-focus ml-5 !bg-transparent p-2.5 text-darkSecondary-800 hover:bg-transparent dark:text-darkSecondary-800 dark:hover:text-secondary-blue'>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Report;

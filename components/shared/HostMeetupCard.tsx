import Link from 'next/link';

import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface HostButtonProps {
  cardBtns: {
    name: string;
    link: string;
  }[];
}

const HostMeetupCard = ({ cardBtns }: HostButtonProps) => {
  return (
    <Card className='relative rounded-2xl border-none bg-meetUpBg bg-cover bg-center bg-no-repeat p-5'>
      <CardHeader className='p-0'>
        <CardTitle className='heading3 mb-1 p-0 text-white'>
          {cardBtns[0]?.name}
        </CardTitle>
        <CardDescription className='bodyMd-regular mb-5 !text-white '>
          Find other Hipnoders in your area so you can learn, share and work
          together.
        </CardDescription>
      </CardHeader>
      <CardContent className='mt-5 flex justify-between p-0'>
        <Link
          href={`${cardBtns[1]?.link}`}
          className='bodyMd-semibold rounded-md !bg-secondary-red-60 px-3 py-2.5 !text-secondary-red-10 hover:!bg-secondary-red-80'
        >
          {cardBtns[1]?.name}
        </Link>
        <Link
          href={cardBtns[0]?.link}
          className='bodyMd-semibold rounded-md bg-white px-2 py-2.5 !text-secondary-red-80 hover:!bg-white-700'
        >
          {cardBtns[0]?.name}
        </Link>
      </CardContent>
    </Card>
  );
};

export default HostMeetupCard;

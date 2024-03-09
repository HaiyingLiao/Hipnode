import Image from 'next/image';

type Props = {
  cardData: {
    img: string;
    alt: string;
    title: string;
    author: string;
  };
};

const PodcastsCard = ({ cardData }: Props) => {
  return (
    <section className='my-2.5 flex w-full items-center justify-between'>
      <Image
        className='shadow-postCardImgShadow'
        src={cardData.img}
        alt={cardData.alt}
        width={100}
        height={100}
      />

      <div className='flex flex-1 flex-col items-start justify-start px-3'>
        <p className='bodyMd-semibold text-darkSecondary-900 dark:text-white-800'>
          {cardData.title}
        </p>
        <p className='bodySm-regular pt-1.5 text-darkSecondary-800'>
          {cardData.author}
        </p>
      </div>

      <div>
        <Image src='icons/rightArr.svg' width={20} height={20} alt='rightArr' />
      </div>
    </section>
  );
};

export default PodcastsCard;

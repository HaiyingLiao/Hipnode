import { CreatePost } from '@/components/index';

const page = () => {
  return (
    <section className='mx-auto my-[90px] w-full rounded-2xl bg-white p-5 dark:bg-darkPrimary-3 md:max-w-[900px] md:p-[30px] lg:my-[100px]'>
      <CreatePost />
    </section>
  );
};

export default page;

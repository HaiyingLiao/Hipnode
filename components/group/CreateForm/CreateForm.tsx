'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { uploadImageToS3 } from '@/lib/aws_s3';
import { Input } from '@/components/ui/input';
import { Textarea } from '../../ui/textarea';
import ItemList from './ItemList';
import useHandleEnter from '@/hooks/useHandleEnter';
import { InferedFormSchema, formSchema } from '@/validations/create-group';

type ExtendedFormSchemaType = InferedFormSchema & Record<string, any>;

export default function CreateGroupForm() {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [file, setFile] = useState<{ cover: File; profile: File } | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [admins, setAdmins] = useState<string[]>([]);
  const [preview, setPreview] = useState<{
    cover: string;
    profile: string;
  } | null>(null);

  const form = useForm<ExtendedFormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const { handleEnter } = useHandleEnter({
    form,
    fields: {
      members: {
        state: members.slice(0, 2),
        setState: setMembers,
      },
      admins: {
        state: admins.slice(0, 2),
        setState: setAdmins,
      },
    },
  });

  const handleSubmit = async (data: InferedFormSchema) => {
    try {
      setIsSubmit(true);
      // eslint-disable-next-line no-unused-vars
      const [, profile] = await Promise.all([
        uploadImageToS3(file?.cover!),
        uploadImageToS3(file?.profile!),
      ]);
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsSubmit(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    form.setValue(field, file!);
    setFile((prev) => {
      return {
        ...prev!,
        [field]: file!,
      };
    });

    const reader = new FileReader();

    reader.onload = (event) => {
      setPreview((prev) => {
        return {
          ...prev!,
          [field]: event.target?.result as string,
        };
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='my-5 flex w-full max-w-[840px] flex-col gap-5 rounded-2xl bg-white p-5 dark:bg-darkPrimary-3'
      >
        <FormField
          control={form.control}
          name='cover'
          render={() => (
            <FormItem>
              <FormLabel
                htmlFor='cover-input'
                className='flex w-28 gap-2.5 rounded bg-white-800 px-2.5 py-1 dark:bg-darkPrimary-4'
              >
                <Image
                  width={20}
                  height={20}
                  src={'/assets/icons/image.svg'}
                  alt='Cover Image'
                  className='aspect-square w-5 '
                  loading='lazy'
                />
                <span className='my-auto cursor-pointer text-xs font-semibold leading-[160%] text-darkPrimary-2 dark:text-white-800'>
                  Set Cover
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type='file'
                  id='cover-input'
                  accept='image/png, image/jpeg'
                  className='hidden'
                  placeholder='set cover'
                  onChange={(e) => handleChange(e, 'cover')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='relative flex w-full grow flex-col items-center justify-center bg-white-800 px-5 py-16 dark:bg-darkPrimary-4 max-md:max-w-full'>
          {preview ? (
            <Image
              fill
              src={preview.cover}
              alt='Profile Image'
              className='max-w-full self-center overflow-hidden rounded-lg object-cover object-center'
            />
          ) : (
            <Image
              width={20}
              height={20}
              src={'/assets/icons/image.svg'}
              alt='image icon'
              className='aspect-square w-10 max-w-full self-center overflow-hidden object-cover object-center'
            />
          )}
        </div>
        <FormField
          control={form.control}
          name='profile'
          render={() => (
            <FormItem>
              <FormLabel
                htmlFor='profile'
                className=' flex w-max items-center gap-5 '
              >
                <div className='relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-white-800 dark:bg-darkPrimary-4'>
                  {preview?.profile ? (
                    <Image
                      className='rounded-full object-cover object-center'
                      fill
                      src={preview.profile}
                      alt='profile Image'
                    />
                  ) : (
                    <Image
                      width={20}
                      height={20}
                      src={'/assets/icons/image.svg'}
                      alt='image icon'
                    />
                  )}
                </div>
                <div className='flex items-center gap-2.5 rounded bg-white-800 px-2.5 py-1 text-xs font-semibold leading-[160%] text-darkPrimary-2 dark:bg-darkPrimary-4 dark:text-white-800'>
                  <Image
                    width={20}
                    height={20}
                    className='dark:brightness-0 dark:invert'
                    src={'/assets/icons/image.svg'}
                    alt='profile Image'
                    loading='lazy'
                  />
                  <span>Set Profile Photo</span>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  type='file'
                  id='profile'
                  accept='image/png, image/jpeg'
                  className='hidden'
                  placeholder='set profile'
                  onChange={(e) => handleChange(e, 'profile')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-semibold text-darkPrimary-2 dark:text-white-800'>
                Group Name
              </FormLabel>
              <FormControl>
                <Input
                  className='h-12 rounded-lg bg-white-800 focus-visible:!ring-0 focus-visible:!ring-transparent focus-visible:!ring-offset-transparent dark:bg-darkPrimary-4'
                  placeholder='Name'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-semibold text-darkPrimary-2 dark:text-white-800'>
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Provide a short description...'
                  className='h-36 bg-white-800 text-sm font-normal placeholder:text-darkSecondary-800 focus-visible:!ring-0  focus-visible:!ring-transparent focus-visible:!ring-offset-transparent dark:border-darkPrimary-4 dark:bg-darkPrimary-4'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='relative flex w-full flex-col gap-3'>
          <FormField
            control={form.control}
            name={`admins`}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold text-darkPrimary-2 dark:text-white-800'>
                  Add Admins
                </FormLabel>
                <FormControl className='!w-full'>
                  <Input
                    type='text'
                    onKeyDown={(e) =>
                      handleEnter(
                        e,
                        'admins',
                        form.getValues('admins') as unknown as string,
                      )
                    }
                    className='h-12 w-full flex-1 rounded-lg bg-white-800  focus-visible:!ring-0 focus-visible:!ring-transparent focus-visible:!ring-offset-transparent dark:border-darkPrimary-4 dark:bg-darkPrimary-4'
                    placeholder='Add Admins'
                    autoComplete='off'
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ItemList items={admins} setItems={setAdmins} />
        </div>
        <div className='relative flex w-full flex-col gap-3'>
          <FormField
            control={form.control}
            name='members'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-semibold text-darkPrimary-2 dark:text-white-800'>
                  Add members
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    onKeyDown={(e) =>
                      handleEnter(
                        e,
                        'members',
                        form.getValues('members') as unknown as string,
                      )
                    }
                    className='h-12 rounded-lg bg-white-800  focus-visible:!ring-0 focus-visible:!ring-transparent focus-visible:!ring-offset-transparent dark:border-darkPrimary-4 dark:bg-darkPrimary-4'
                    placeholder='Add members'
                    autoComplete='off'
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ItemList items={members ?? []} setItems={setMembers} />
        </div>
        <div className='flex gap-5'>
          <Button
            aria-disabled={isSubmit}
            disabled={isSubmit}
            type='submit'
            className='flex w-[125px] rounded-lg !bg-secondary-blue px-5 py-2.5 text-center text-base font-semibold leading-[150%] !text-white-800 hover:bg-secondary-blue-80'
          >
            Create
          </Button>
          <Button className=' !bg-transparent text-base leading-[150%] !text-darkSecondary-900'>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

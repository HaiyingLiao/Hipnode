'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { CreatePostSchema } from '@/lib/validations';
import { createPostData, categoryItems } from '@/constants';
import GroupSelectContent from './GroupSelectContent';
import { createInterview } from '@/lib/actions/interviews.action';

const CreatePost = () => {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: '',
      post: '',
      group: '',
      createType: '',
      tags: [],
      revenue: 0,
      updates: 0,
      website: '',
      category: '',
    },
  });

  // interview post related field show up based on selectedType
  const selectedType = form.watch('createType');

  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    const {
      title,
      post,
      tags,
      revenue,
      updates,
      website,
      category,
      createType,
    } = values;
    const modifiedCategory = category?.replace(/\W/g, '');

    try {
      switch (createType) {
        case 'interviews':
          await createInterview({
            // replace image path when implement image function
            image: '/assets/images/illustration.png',
            authorId: '657ddd2e3647ac6914ff58c7',
            title,
            post,
            tags,
            revenue: revenue || 0,
            updates: updates || 0,
            website: website || '',
            category: modifiedCategory || 'free',
          });
          toast({
            title: 'Success!🎉 Your interview post has been uploaded.',
          });
          router.push('/interviews');
      }
    } catch (error) {
      console.error('Error in form:', error);
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: 'destructive',
        });
      }
    }
  }

  const handleInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tags must be less than 15 characters',
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue('tags', newTags);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Title...'
                  {...field}
                  className='heading3 md:heading1 min-h-[48px] rounded-lg border-none bg-white-800 px-5 py-3 text-darkSecondary-800 dark:bg-darkPrimary-4 md:min-h-[60px]'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-5'>
          {/* implement AWS here */}

          <FormField
            control={form.control}
            name='group'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='selectStyle'>
                      <SelectValue placeholder='Select Group' />
                      <Image
                        src='form-down-arrow.svg'
                        alt='icon'
                        width={15}
                        height={15}
                        className='h-2.5 w-2.5 dark:brightness-0 dark:invert md:h-3.5 md:w-3.5'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='max-h-[500px] overflow-y-auto dark:bg-darkPrimary-4'>
                    <GroupSelectContent />
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='createType'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='selectStyle'>
                      <SelectValue placeholder='Create - Post' />
                      <Image
                        src='form-down-arrow.svg'
                        alt='icon'
                        width={15}
                        height={15}
                        className='h-2.5 w-2.5 dark:brightness-0 dark:invert md:h-3.5 md:w-3.5'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='dark:bg-darkPrimary-4'>
                    {createPostData.map((data) => (
                      <SelectItem value={data.value} key={data.title}>
                        <div className='flex flex-row items-center justify-between gap-1 p-1 md:gap-2.5'>
                          <Image
                            src={data.icon}
                            alt={`${data.title} - icon`}
                            width={15}
                            height={15}
                            className='h-2.5 w-2.5 dark:brightness-0 dark:invert md:h-3.5 md:w-3.5'
                          />
                          <p className='bodyMd-semibold'>{data.title}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='post'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=''
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
                    content_css: theme === 'dark' ? 'dark' : 'default',
                    setup: function (editor) {
                      editor.ui.registry.addButton('Write', {
                        icon: 'edit-block',
                        text: 'Write',
                        onAction: function () {
                          alert('Button clicked!');
                        },
                      });
                      editor.ui.registry.addButton('CodeOfConduct', {
                        text: 'Code of Conduct',
                        onAction: function () {
                          return alert('TODO: link');
                        },
                      });
                    },
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'code',
                      'help',
                      'wordcount',
                      'codesample',
                    ],
                    toolbar:
                      'Write preview CodeOfConduct |' +
                      'bold italic underline strikethrough forecolor codesample link image alignleft aligncenter alignright alignjustify bullist numlist |',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedType === 'interviews' && (
          <>
            <div className='flex w-full flex-wrap gap-3 md:flex-nowrap'>
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='w-full md:w-[50%]'>
                    <FormLabel className='md:body-semibold bodyMd-semibold text-darkSecondary-900 dark:text-white-800'>
                      Category
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='inputStyle'>
                          <SelectValue placeholder='Select or create a category...' />
                          <Image
                            src='form-down-arrow.svg'
                            alt='icon'
                            width={15}
                            height={15}
                            className='h-2.5 w-2.5 dark:brightness-0 dark:invert md:h-3.5 md:w-3.5'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='dark:bg-darkPrimary-4'>
                        {categoryItems.map((item) => (
                          <SelectItem value={item} key={item}>
                            <p className='bodyMd-semibold p-2'>{item}</p>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='revenue'
                render={({ field }) => (
                  <FormItem className='w-full md:w-[50%]'>
                    <FormLabel className='md:body-semibold bodyMd-semibold text-darkSecondary-900 dark:text-white-800 '>
                      Revenue
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Add revenue...'
                        {...field}
                        className='inputStyle'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex w-full flex-wrap gap-3 md:flex-nowrap'>
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem className='w-full md:w-[50%]'>
                    <FormLabel className='md:body-semibold bodyMd-semibold text-darkSecondary-900 dark:text-white-800 '>
                      Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Add website link ...'
                        {...field}
                        className='inputStyle'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='updates'
                render={({ field }) => (
                  <FormItem className='w-full md:w-[50%]'>
                    <FormLabel className='md:body-semibold bodyMd-semibold text-darkSecondary-900 dark:text-white-800 '>
                      Updates
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Add updates...'
                        {...field}
                        className='inputStyle'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='md:body-semibold bodyMd-semibold text-darkSecondary-900 dark:text-white-800'>
                Add or change tags (up to 5) so readers know what your story is
                about
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder='Add a tag...'
                    className='inputStyle'
                    onKeyDown={(e) => handleInput(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className='flex-start flex gap-2.5'>
                      {field.value.map((tag: any) => (
                        <div
                          key={tag}
                          className='bodyXs-regular mt-2.5 cursor-pointer rounded-[4px] bg-white-700 px-[10px] py-[6px] dark:bg-darkPrimary-4'
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='body-semibold md:display-semibold rounded-lg bg-secondary-blue px-10 py-[10px] text-secondary-blue-10 hover:bg-[#347ae2e6] dark:bg-secondary-blue dark:text-secondary-blue-10 dark:hover:bg-[#347ae2e6]'
        >
          Publish
        </Button>
        <Button
          type='button'
          className='md:display-regular body-semibold bg-white text-darkSecondary-800 hover:bg-white dark:bg-darkPrimary-3 dark:text-darkSecondary-800'
        >
          Cancel
        </Button>
      </form>
    </Form>
  );
};

export default CreatePost;

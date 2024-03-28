'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatTime } from '@/lib/utils';

interface PlayBtnProps {
  audio: string;
  author: string;
}

const AudioSection = ({ audio, author }: PlayBtnProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<string | null>(null);
  const [playtime, setPlaytime] = useState<string | null>(null);
  const [playProgressValue, setPlayProgressValue] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to start updating playtime
  const startPlaytime = useCallback(() => {
    setInterval(() => {
      if (audioRef.current) {
        const roundedPlayTime =
          Math.round(audioRef.current.currentTime * 100) / 100;
        setPlaytime(formatTime(roundedPlayTime));
      }
    }, 1000);
  }, []);

  const calculatePlayPercentage = () => {
    if (audioRef.current && audioRef.current.duration) {
      const percentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      return percentage;
    }
    return 0;
  };

  useEffect(() => {
    if (isPlaying) {
      startPlaytime();
      setPlayProgressValue(calculatePlayPercentage());
    }
  }, [isPlaying, startPlaytime, playtime]);

  useEffect(() => {
    const audioElement = new Audio(audio);
    audioElement.addEventListener('loadedmetadata', () => {
      const roundedDuration = Math.round(audioElement.duration * 100) / 100;
      setDuration(formatTime(roundedDuration));
    });
    audioRef.current = audioElement;
    return () => {
      audioElement.removeEventListener('loadedmetadata', () => {});
    };
  }, [audio]);

  const playAudio = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };

  return (
    <div className='grow'>
      <p className='bodyMd-regular text-darkSecondary-900 dark:text-white'>
        Hipnod • Episode 243
      </p>
      <h3 className='heading3 text-darkSecondary-900 dark:text-white'>
        {`by ${author}`}
      </h3>
      <div className='flex items-center py-4'>
        <Progress value={playProgressValue} className='mr-5 h-2.5' />
        <p className='body-semibold grow whitespace-nowrap text-darkSecondary-900 dark:text-white'>
          {`${playtime || '00:00'} | ${duration || '00:00'}`}
        </p>
      </div>

      <Button
        onClick={() => {
          setIsPlaying((prev) => !prev);
          playAudio();
        }}
        className='!hover:bg-secondary-blue-90 display-semibold flex rounded-[20px] !bg-secondary-blue !text-white'
      >
        <Image
          className='mr-2'
          src={isPlaying ? '/pause.png' : '/icons/playIcon.svg'}
          width={16}
          height={16}
          alt='playIcon'
        />
        {isPlaying ? 'Pause' : 'Play Now'}
      </Button>
    </div>
  );
};

export default AudioSection;

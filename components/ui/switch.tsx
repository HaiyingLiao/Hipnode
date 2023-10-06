"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { setTheme } = useTheme();

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white-700 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-darkPrimary-2 dark:data-[state=unchecked]:bg-darkPrimary-2",
        className
      )}
      {...props}
      ref={ref}
    >
      <BsMoonFill
        size={10}
        onClick={() => setTheme("dark")}
        className='absolute left-[95px] z-50 ml-1 text-darkSecondary-700 dark:text-secondary-red-90'
      />
      <BsSunFill
        size={10}
        onClick={() => setTheme("light")}
        className='absolute left-[75px] z-50 ml-1 text-secondary-red-90 dark:text-darkSecondary-700'
      />
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-darkPrimary-2 relative"
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

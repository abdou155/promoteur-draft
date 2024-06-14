import React, { ReactNode } from 'react';
import { cn } from '@/utils/helper';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'large';
  className?: string;
  children?: ReactNode;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = 'small',
  outline = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        `w-full rounded border-rose-500 bg-rose-500 py-[8px] text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70`,
        size === 'small'
          ? 'border-[1px] text-[16px] font-medium'
          : 'border-2 text-[18px] font-semibold',
        outline
          ? 'border-[1px] border-gray-500 bg-white text-[#4e4e4e]'
          : 'border-rose-500 bg-rose-500 text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

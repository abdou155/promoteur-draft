import React, { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { UseFormRegister, FieldValues, FieldErrors, UseFormWatch } from 'react-hook-form';
import { cn } from '@/utils/helper';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: IconType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch: UseFormWatch<FieldValues>;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  icon: Icon,
  register,
  errors,
  watch,
  autoFocus = false,
  type = 'text',
  disabled,
  ...props
}) => {
  const value = watch(id);

  return (
    <div className="relative w-full">
      {Icon && <Icon size={20} className="absolute left-2 top-[13px] text-[#666]" />}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required: true })}
        className={cn(
          `peer w-full rounded border-[1px] border-gray-400 bg-white px-2 py-3 text-[15px] font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70`,
          errors[id]
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-neutral-300 focus:border-black',
          Icon ? 'pl-9' : 'pl-4',
        )}
        autoFocus={autoFocus}
        {...props}
      />
      <label
        className={cn(
          `scale-80 peer-focus:scale-80 absolute top-[28px] z-[20] origin-[0] -translate-y-4 transform px-1 text-[14px] duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[40px] peer-focus:bg-[#fff]`,
          errors[id] ? 'text-rose-500' : 'text-zinc-400',
          value && '-translate-y-[40px] bg-[#fff]',
          Icon ? 'left-9' : 'left-4',
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

import React, { ChangeEvent, FC, useState, useTransition } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

import SpinnerMini from './Loader';
import { useEdgeStore } from '@/lib/edgestore';
import { cn } from '@/utils/helper';

interface ImageUploadProps {
  onChange: (fieldName: string, imgSrc: string) => void;
  initialImage?: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, initialImage = '' }) => {
  const [image, setImage] = useState(initialImage);
  const [isLoading, startTransition] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const { edgestore } = useEdgeStore();

  const uploadImage = (e: any, file: File) => {
    if (!file.type.startsWith('image')) return;
    setImage(URL.createObjectURL(file));
    startTransition(async () => {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: initialImage,
        },
      });

      onChange('image', res.url);
      setTimeout(() => {
        e.target.form?.requestSubmit();
      }, 1000);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    uploadImage(e, file);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    uploadImage(e, e.dataTransfer.files[0]);
  };

  return (
    <label
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      htmlFor="hotel"
      className={cn(
        'relative flex h-[240px] w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70',
        isLoading && 'opacity-70',
        isDragging && 'border-red-500',
      )}
    >
      {isLoading && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center">
          {' '}
          <SpinnerMini className="h-[32px] w-[32px] text-red-600" />
        </div>
      )}
      {image ? (
        <div className="absolute inset-0 h-full w-full">
          <Image
            fill
            style={{ objectFit: 'cover' }}
            src={image}
            alt="hotel"
            sizes="100vw"
            className="z-10"
          />
        </div>
      ) : (
        <>
          <TbPhotoPlus className="mb-4 !h-[64px] !w-[64px]" />
          <span className="text-lg font-semibold">Upload image</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        id="hotel"
        className="h-0 w-0 opacity-0"
        onChange={handleChange}
        autoFocus
      />
    </label>
  );
};

export default ImageUpload;

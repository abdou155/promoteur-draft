import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Listing } from '@prisma/client';
import Skeleton from 'react-loading-skeleton';

import HeartButton from './HeartButton';
import Image from './Image';
import { formatPrice } from '@/utils/helper';
import ListingMenu from './ListingMenu';

interface ListingCardProps {
  data: Listing;
  reservation?: {
    id: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
  };
  hasFavorited: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, hasFavorited }) => {
  const price = reservation ? reservation.totalPrice : data?.price;

  let reservationDate;
  if (reservation) {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    reservationDate = `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-3">
        <div className="z-5">
          <ListingMenu id={reservation?.id || data.id} />
        </div>

        <div className="flex h-[28px] w-[28px] items-center justify-center">
          <HeartButton listingId={data.id} key={data.id} hasFavorited={hasFavorited} />
        </div>
      </div>
      <Link href={`/listings/${data.id}`} className="col-span-1 cursor-pointer">
        <div className="flex w-full flex-col gap-1">
          <div className="overflow-hidden rounded-md md:rounded-xl">
            <div className="relative aspect-[1/0.95] bg-gray-100">
              <Image
                imageSrc={data.imageSrc}
                fill
                alt={data.title}
                effect="zoom"
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
          <span className="mt-[4px] text-[16px] font-semibold">
            {data?.region}, {data?.country}
          </span>
          <span className="text-sm font-light text-neutral-500">
            {reservationDate || data.category}
          </span>

          <div className="flex flex-row items-baseline gap-1">
            <span className="text-[14px] font-bold text-[#444]">$ {formatPrice(price)}</span>
            {!reservation && <span className="font-light">night</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;

export const ListingSkeleton = () => {
  return (
    <div className="col-span-1">
      <div className="flex w-full flex-col gap-1">
        <Skeleton width={'100%'} height={'100%'} borderRadius={'12px'} className="aspect-square" />

        <div className="flex flex-row gap-3">
          <Skeleton height={'18px'} width={'84px'} />
          <Skeleton height={'18px'} width={'84px'} />
        </div>
        <Skeleton height={'16px'} width={'102px'} />
        <Skeleton height={'18px'} width={'132px'} />
      </div>
    </div>
  );
};

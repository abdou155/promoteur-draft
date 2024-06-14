import React from 'react';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';

import Button from '@/components/Button';
import SpinnerMini from '@/components/Loader';
import { formatPrice } from '@/utils/helper';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (name: string, value: Range) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disabledDates: Date[];
}

const Calendar = dynamic(() => import('@/components/Calender'), {
  ssr: false,
});

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  isLoading,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-lg font-semibold">$ {formatPrice(price)}</span>
        <span className="font-light text-neutral-600">night</span>
      </div>
      <hr />
      <Calendar value={dateRange} disabledDates={disabledDates} onChange={onChangeDate} />
      <hr />
      <div className="p-4">
        <Button
          disabled={isLoading}
          onClick={onSubmit}
          className="flex h-[42px] flex-row items-center justify-center"
          size="large"
        >
          {isLoading ? <SpinnerMini /> : <span>Reserve</span>}
        </Button>
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <span>Total</span>
        <span>$ {formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default ListingReservation;

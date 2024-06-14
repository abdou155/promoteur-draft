'use client';
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

import Modal from '../modals/Modal';

const SearchModal = dynamic(() => import('@/components/modals/SearchModal'), {
  ssr: false,
});

const Search = () => {
  const searchParams = useSearchParams();

  const country = searchParams?.get('country');

  const startDate = searchParams?.get('startDate');
  const endDate = searchParams?.get('endDate');
  const guestCount = searchParams?.get('guestCount');

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any week';
  }, [endDate, startDate]);

  const guestLabel = guestCount ? `${guestCount} Guests` : 'Add Guests';

  return (
    <Modal>
      <Modal.Trigger name="search">
        <button
          type="button"
          className="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition duration-300 hover:shadow-md md:w-auto"
        >
          <div className="flex flex-row items-center justify-between">
            <small className="px-6 text-sm font-bold text-[#585858]">
              {country ? country : 'Anywhere'}
            </small>

            <small className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-bold text-[#585858] sm:block">
              {durationLabel}
            </small>

            <div className="flex flex-row items-center gap-4 pl-6 pr-2 text-sm text-gray-600">
              <small className="hidden text-sm font-normal sm:block">{guestLabel}</small>
              <div className="rounded-full bg-rose-500 p-2 text-white">
                <FaSearch className="text-[12px]" />
              </div>
            </div>
          </div>
        </button>
      </Modal.Trigger>
      <Modal.Window name="search">
        <SearchModal />
      </Modal.Window>
    </Modal>
  );
};

export default Search;

'use client';
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { formatISO } from 'date-fns';

import Modal from './Modal';
import Button from '../Button';
import Heading from '../Heading';
import Counter from '../inputs/Counter';
import CountrySelect from '../inputs/CountrySelect';

const Calendar = dynamic(() => import('@/components/Calender'), { ssr: false });

const steps = {
  '0': 'location',
  '1': 'dateRange',
  '2': 'guestCount',
};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = ({ onCloseModal }: { onCloseModal?: () => void }) => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { handleSubmit, setValue, watch, getValues } = useForm<FieldValues>({
    defaultValues: {
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    },
  });

  const location = watch('location');
  const dateRange = watch('dateRange');
  const country = location?.label;

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country],
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.INFO) return onNext();
    const { guestCount, roomCount, bathroomCount, dateRange } = data;

    let currentQuery = {};

    if (searchParams) {
      currentQuery = queryString.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      country: location?.label,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true },
    );
    onCloseModal?.();
    router.push(url);
  };

  const body = () => {
    switch (step) {
      case STEPS.DATE:
        return (
          <div className="flex flex-col gap-3">
            <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
            <div className="h-[348px] w-full">
              <Calendar onChange={setCustomValue} value={dateRange} />
            </div>
          </div>
        );

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-6">
            <Heading title="More information" subtitle="Find your perfect place!" />
            <Counter
              title="Guests"
              subtitle="How many guests do you allow?"
              watch={watch}
              onChange={setCustomValue}
              name="guestCount"
            />
            <hr />
            <Counter
              onChange={setCustomValue}
              watch={watch}
              title="Rooms"
              subtitle="How many rooms do you have?"
              name="roomCount"
            />
            <hr />
            <Counter
              onChange={setCustomValue}
              watch={watch}
              title="Bathrooms"
              subtitle="How many bathrooms do you have?"
              name="bathroomCount"
            />
          </div>
        );

      default:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Where is your place located?" subtitle="Help guests find you!" />
            <CountrySelect value={location} onChange={setCustomValue} />
            <div className="h-[240px]">
              <Map center={location?.latlng} />
            </div>
          </div>
        );
    }
  };

  const isFieldFilled = !!getValues(steps[step]);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <Modal.WindowHeader title="Filter" />
      <form
        className="relative flex h-auto w-full flex-1 flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative p-6">{body()}</div>
        <div className="flex flex-col gap-2 px-6 pb-6 pt-3">
          <div className="flex w-full flex-row items-center gap-4">
            {step !== STEPS.LOCATION ? (
              <Button
                type="button"
                className="flex items-center justify-center gap-2"
                onClick={onBack}
                outline
              >
                Back
              </Button>
            ) : null}
            <Button
              type="submit"
              className="flex items-center justify-center gap-2"
              disabled={!isFieldFilled}
            >
              {step === STEPS.INFO ? 'Search' : 'Next'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchModal;

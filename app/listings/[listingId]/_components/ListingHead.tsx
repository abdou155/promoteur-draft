import React from 'react';
import Image from '@/components/Image';

import Heading from '@/components/Heading';
import HeartButton from '@/components/HeartButton';
import { getFavorites } from '@/services/favorite';

interface ListingHeadProps {
  title: string;
  country: string | null;
  region: string | null;
  image: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = async ({
  title,
  country = '',
  region = '',
  image,
  id,
}) => {
  const favorites = await getFavorites();
  const hasFavorited = favorites.includes(id);

  return (
    <>
      <Heading title={title} subtitle={`${region}, ${country}`} backBtn />
      <div
        className={`relative h-[260px] w-full overflow-hidden rounded-xl bg-gray-100 transition duration-300 sm:h-[280px] md:h-[420px]`}
      >
        <Image imageSrc={image} fill className={`object-cover`} alt={title} sizes="100vw" />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} hasFavorited={hasFavorited} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

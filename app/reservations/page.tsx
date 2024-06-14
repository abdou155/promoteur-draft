import React, { Suspense } from 'react';

import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import ListingCard from '@/components/ListingCard';
import LoadMore from '@/components/LoadMore';

import { getCurrentUser } from '@/services/user';
import { getReservations } from '@/services/reservation';
import { getFavorites } from '@/services/favorite';

const ReservationPage = async () => {
  const user = await getCurrentUser();
  const favorites = await getFavorites();

  if (!user) return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const { listings, nextCursor } = await getReservations({
    authorId: user.id,
  });

  if (listings.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );

  return (
    <section className="main-container">
      <Heading title="Reservations" subtitle="Bookings on your properties" backBtn />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-10 md:gap-8 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => {
          const { reservation, ...data } = listing;
          const hasFavorited = favorites.includes(listing.id);
          return (
            <ListingCard
              key={listing.id}
              data={data}
              reservation={reservation}
              hasFavorited={hasFavorited}
            />
          );
        })}
        {nextCursor ? (
          <Suspense fallback={<></>}>
            <LoadMore
              nextCursor={nextCursor}
              fnArgs={{ authorId: user.id }}
              queryFn={getReservations}
              queryKey={['reservations', user.id]}
              favorites={favorites}
            />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
};

export default ReservationPage;

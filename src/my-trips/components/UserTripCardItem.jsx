import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi';
import { placesCache } from '@/service/PlacesCache';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async () => {
    if (!trip?.userSelection?.location?.label) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const destinationName = trip.userSelection.location.label;

    try {
      const response = await placesCache.get(destinationName, () => GetDetailedPlaceInfo(destinationName));
      const photoName = response.data?.places?.[0]?.photos?.[0]?.name;
      
      if (photoName) {
        const fullUrl = buildPhotoUrl(photoName);
        setPhotoUrl(fullUrl);
      }
    } catch (error) {
      console.error('UserTripCard - Failed to fetch photo:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const formatDate = (createdAt) => {
    if (!createdAt) return '';
    try {
      const date = new Date(createdAt);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return '';
    }
  }

  const getBudgetIcon = (budget) => {
    switch(budget?.toLowerCase()) {
      case 'cheap': return '💵';
      case 'moderate': return '💰';
      case 'luxury': return '💎';
      default: return '💰';
    }
  }

  const getTravelIcon = (traveler) => {
    if (!traveler) return '👤';
    if (traveler.includes('1')) return '✈️';
    if (traveler.includes('2')) return '🥂';
    if (traveler.includes('3') || traveler.includes('4') || traveler.includes('5')) return '👨‍👩‍👧‍👦';
    return '👥';
  }

  return (

    <Link to={`/view-trip/${trip?.id}`}>
      <div className='bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300 overflow-hidden group'>
        {/* Image Section */}
        <div className='relative h-48 overflow-hidden'>
          {isLoading ? (
            <div className='w-full h-full bg-slate-200 flex items-center justify-center'>
              <div className='w-8 h-8 border-4 border-slate-400 border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : (
            <>
              <img 
                src={photoUrl}
                alt={`${trip?.userSelection?.location?.label || 'Destination'}`}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>
            </>
          )}
          
          {/* Status Badge */}
          <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-slate-700'>
            Planned
          </div>
        </div>

        {/* Content Section */}
        <div className='p-6'>
          <div className='mb-4'>
            <h3 className='font-semibold text-lg text-slate-900 mb-2 line-clamp-1'>
              {trip?.userSelection?.location?.label}
            </h3>
            {trip?.createdAt && (
              <p className='text-sm text-slate-500'>
                Created {formatDate(trip.createdAt)}
              </p>
            )}
          </div>

          {/* Trip Details */}
          <div className='space-y-3 mb-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-slate-600'>Duration</span>
              <span className='font-medium text-slate-900'>{trip?.userSelection?.noOfDays} days</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-slate-600'>Budget</span>
              <span className='font-medium text-slate-900 capitalize'>{trip?.userSelection?.budget}</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-slate-600'>Group Size</span>
              <span className='font-medium text-slate-900'>{trip?.userSelection?.traveler}</span>
            </div>
          </div>

          {/* Action */}
          <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
            <span className='text-sm text-slate-500'>View Details</span>
            <svg className='w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem

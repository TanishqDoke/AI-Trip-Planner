import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi';
import { placesCache } from '@/service/PlacesCache';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/translations/translations';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

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
      <div className='bg-white rounded-lg border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-200 hover:border-[#2276E3] overflow-hidden group'>
        {/* Image Section */}
        <div className='relative h-48 overflow-hidden'>
          {isLoading ? (
            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
              <div className='w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : (
            <>
              <img 
                src={photoUrl}
                alt={`${trip?.userSelection?.location?.label || 'Destination'}`}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent'></div>
            </>
          )}
          
          {/* Status Badge - EaseMyTrip Style */}
          <div className='absolute top-3 right-3 bg-[#D32F2F] text-white px-3 py-1 rounded-full text-xs font-bold uppercase'>
            {t('planned')}
          </div>
        </div>

        {/* Content Section */}
        <div className='p-5'>
          <div className='mb-4'>
            <h3 className='font-bold text-lg text-gray-800 mb-2 line-clamp-1'>
              {trip?.userSelection?.location?.label}
            </h3>
            {trip?.createdAt && (
              <p className='text-sm text-slate-500'>
                {t('created')} {formatDate(trip.createdAt)}
              </p>
            )}
          </div>

          {/* Trip Details - EaseMyTrip Style */}
          <div className='space-y-3 mb-4'>
            <div className='flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md'>
              <svg className='w-4 h-4 text-[#2276E3]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              <span className='text-gray-600 font-medium'>{trip?.userSelection?.noOfDays} {t('daysTrip')}</span>
            </div>
            <div className='flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md'>
              <svg className='w-4 h-4 text-[#D32F2F]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
              </svg>
              <span className='text-gray-600 font-medium capitalize'>{trip?.userSelection?.budget} {t('budget')}</span>
            </div>
            <div className='flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md'>
              <svg className='w-4 h-4 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
              <span className='text-gray-600 font-medium'>{trip?.userSelection?.traveler}</span>
            </div>
          </div>

          {/* Action - EaseMyTrip Style */}
          <div className='pt-4 border-t-2 border-gray-100'>
            <button className='w-full bg-[#2276E3] hover:bg-[#1b5cba] text-white py-2 rounded-md font-bold transition-colors uppercase text-sm'>
              {t('viewItinerary')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem

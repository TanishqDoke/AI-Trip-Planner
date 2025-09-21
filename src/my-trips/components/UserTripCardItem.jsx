import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ShareItinerary from './ShareItinerary'; // Adjust path to your ShareItinerary component location

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      }
      
      const result = await GetPlaceDetails(data);
      const places = result?.data?.places;
      
      if (places && places.length > 0 && places[0].photos && places[0].photos.length > 0) {
        // Try to get the best available photo (prefer index 0, 1, or 2 over 3)
        const photoIndex = Math.min(places[0].photos.length - 1, Math.floor(Math.random() * Math.min(4, places[0].photos.length)));
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', places[0].photos[photoIndex].name);
        setPhotoUrl(PhotoUrl);
      } else {
        // Fallback to a beautiful default image based on location
        setPhotoUrl(getDefaultImageForLocation(trip?.userSelection?.location?.label));
      }
    } catch (error) {
      console.log('Error fetching place photo:', error);
      setPhotoUrl(getDefaultImageForLocation(trip?.userSelection?.location?.label));
    } finally {
      setIsLoading(false);
    }
  }

  const getDefaultImageForLocation = (location) => {
    // Create beautiful default images based on location keywords
    const locationLower = location?.toLowerCase() || '';
    
    if (locationLower.includes('beach') || locationLower.includes('island') || locationLower.includes('hawaii') || locationLower.includes('bali')) {
      return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop';
    } else if (locationLower.includes('mountain') || locationLower.includes('himalaya') || locationLower.includes('alps') || locationLower.includes('denver')) {
      return 'https://images.unsplash.com/photo-1464822759844-d150ad6c0a12?w=800&h=600&fit=crop';
    } else if (locationLower.includes('city') || locationLower.includes('new york') || locationLower.includes('tokyo') || locationLower.includes('london')) {
      return 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop';
    } else if (locationLower.includes('desert') || locationLower.includes('dubai') || locationLower.includes('sahara')) {
      return 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop';
    } else if (locationLower.includes('forest') || locationLower.includes('jungle') || locationLower.includes('amazon')) {
      return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop';
    } else {
      // Generic travel image
      return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop';
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
            <div className='w-full h-full bg-slate-200 animate-pulse'></div>
          ) : (
            <>
              <img 
                src={photoUrl} 
                alt={trip?.userSelection?.location?.label || 'Trip destination'} 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                onError={(e) => {
                  e.target.src = getDefaultImageForLocation(trip?.userSelection?.location?.label);
                }}
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

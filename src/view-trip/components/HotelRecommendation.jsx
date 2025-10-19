import React, { useEffect, useState } from 'react'
import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi'
import { placesCache } from '@/service/PlacesCache'

function HotelRecommendation({ trip }) {
    const [hotelPhotoUrl, setHotelPhotoUrl] = useState('/placeholder.jpg');
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);

    // Try to get hotel from multiple possible locations
    const hotel = trip?.tripData?.recommended_hotel || 
                  trip?.tripData?.recommended_hotels?.[0] || 
                  trip?.tripData?.hotels?.[0];

    useEffect(() => {
        if (hotel?.name) {
            fetchHotelPhoto();
        } else {
            setIsLoadingPhoto(false);
        }
    }, [hotel]);

    const fetchHotelPhoto = async () => {
        if (!hotel?.name) {
            setIsLoadingPhoto(false);
            return;
        }

        setIsLoadingPhoto(true);
        try {
            const response = await placesCache.get(hotel.name, () => GetDetailedPlaceInfo(hotel.name));
            const photoName = response.data?.places?.[0]?.photos?.[0]?.name;
            
            if (photoName) {
                const fullUrl = buildPhotoUrl(photoName);
                setHotelPhotoUrl(fullUrl);
            }
        } catch (error) {
            console.error('Failed to fetch hotel photo:', error);
        } finally {
            setIsLoadingPhoto(false);
        }
    };

    if (!hotel) {
        return (
            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
                <div className='text-center py-8 text-slate-500'>
                    <p>No hotel recommendation available</p>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
            {/* Hotel Image */}
            <div className='relative h-48'>
                {isLoadingPhoto ? (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <div className='w-8 h-8 border-4 border-slate-400 border-t-transparent rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <img 
                        src={hotelPhotoUrl} 
                        alt={hotel.name}
                        className='w-full h-full object-cover'
                        onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                    />
                )}
                <div className='absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-600'>
                    {hotel.rating}
                </div>
            </div>

            {/* Hotel Details */}
            <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                    <div>
                        <h3 className='text-xl font-bold text-slate-900 mb-1'>{hotel.name}</h3>
                        <p className='text-slate-600 text-sm'>{hotel.address}</p>
                    </div>
                    <div className='text-right'>
                        <p className='text-lg font-bold text-blue-600'>{hotel.price}</p>
                        <p className='text-sm text-slate-500'>{hotel.total_cost}</p>
                    </div>
                </div>

                <p className='text-slate-700 mb-4'>{hotel.description}</p>

                {/* Check-in/Check-out Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div className='bg-green-50 p-3 rounded-lg'>
                        <h4 className='font-semibold text-green-800 mb-1'>Check-in</h4>
                        <p className='text-sm text-green-700'>{hotel.check_in}</p>
                    </div>
                    <div className='bg-blue-50 p-3 rounded-lg'>
                        <h4 className='font-semibold text-blue-800 mb-1'>Check-out</h4>
                        <p className='text-sm text-blue-700'>{hotel.check_out}</p>
                    </div>
                </div>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                    <div>
                        <h4 className='font-semibold text-slate-900 mb-2'>Amenities</h4>
                        <div className='flex flex-wrap gap-2'>
                            {hotel.amenities.map((amenity, index) => (
                                <span 
                                    key={index}
                                    className='px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full'
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HotelRecommendation
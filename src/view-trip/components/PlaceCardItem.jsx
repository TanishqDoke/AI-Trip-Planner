import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi'
import { placesCache } from '@/service/PlacesCache'

function PlaceCardItem({ place }) {
    const [placeDetails, setPlaceDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const placeName = place?.name || place?.place || place?.activity

    useEffect(() => {
        if (placeName) {
            fetchPlaceDetails()
        }
    }, [placeName])

    const fetchPlaceDetails = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await placesCache.get(placeName, () => GetDetailedPlaceInfo(placeName))
            
            if (response.data && response.data.places && response.data.places.length > 0) {
                const placeData = response.data.places[0]
                setPlaceDetails(placeData)
            }
        } catch (err) {
            console.error('Error fetching place details:', err)
            setError('Could not fetch location details')
        } finally {
            setLoading(false)
        }
    }

    const getPlaceImage = () => {
        if (placeDetails?.photos && placeDetails.photos.length > 0) {
            const photoName = placeDetails.photos[0].name
            // Use the new helper function, requesting a smaller image size for the card
            return buildPhotoUrl(photoName, 200, 200) 
        }
        return '/placeholder.jpg'
    }

    const getGoogleMapsUrl = () => {
        if (placeDetails?.googleMapsUri) {
            return placeDetails.googleMapsUri
        }
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`
    }

    return (
        <Link to={getGoogleMapsUrl()} target='_blank'>
            <div className='border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-[#2276E3] transition-all bg-white group'>
                <div className='flex gap-4'>
                    <div className='relative'>
                        <img 
                            src={getPlaceImage()}
                            alt={placeName} 
                            className='w-28 h-28 rounded-lg object-cover border-2 border-gray-100 group-hover:scale-105 transition-transform' 
                            onError={(e) => {
                                e.target.src = '/placeholder.jpg'
                            }}
                        />
                        {loading && (
                            <div className='absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center'>
                                <div className='w-4 h-4 border-2 border-[#2276E3] border-t-transparent rounded-full animate-spin'></div>
                            </div>
                        )}
                    </div>
                    <div className='flex-1'>
                        <h3 className='font-bold text-gray-900 mb-2 text-lg group-hover:text-[#2276E3] transition-colors'>
                            {placeDetails?.displayName?.text || placeName}
                        </h3>
                        <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                            {place?.details || place?.description}
                        </p>
                        
                        {/* Location Information */}
                        {placeDetails?.formattedAddress && (
                            <div className='flex items-center gap-1 mb-2'>
                                <svg className='w-3 h-3 text-slate-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                </svg>
                                <span className='text-xs text-slate-500 truncate'>
                                    {placeDetails.formattedAddress}
                                </span>
                            </div>
                        )}

                        {/* Rating */}
                        {placeDetails?.rating && (
                            <div className='flex items-center gap-1 mb-2'>
                                <svg className='w-3 h-3 text-yellow-500' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                                </svg>
                                <span className='text-xs text-slate-600'>
                                    {placeDetails.rating.toFixed(1)} ({placeDetails.userRatingCount || 0} reviews)
                                </span>
                            </div>
                        )}

                        <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium text-slate-700'>
                                {place?.ticket_pricing || place?.cost || 'Free'}
                            </span>
                            {place?.time && (
                                <span className='text-xs text-slate-500'>
                                    {place.time}
                                </span>
                            )}
                        </div>

                        {error && (
                            <p className='text-xs text-red-500 mt-1'>{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem


import React, { useState, useEffect } from 'react'
import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi'
import { placesCache } from '@/service/PlacesCache'

function ActivityCardItem({ activity, activityIndex, tripDestination }) {
    const [placeDetails, setPlaceDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const activityName = activity.activity || activity.name || activity.place
    
    // Smart filtering - only fetch location for actual places/attractions
    const shouldFetchLocation = () => {
        if (!activityName) return false
        
        const name = activityName.toLowerCase()
        
        // Skip transport-related activities
        const transportKeywords = ['taxi', 'transport', 'travel', 'departure', 'arrival', 'check-in', 'checkout', 'flight', 'train', 'bus', 'car', 'pre-booked', 'negotiate', 'ride']
        if (transportKeywords.some(keyword => name.includes(keyword))) return false
        
        // Skip generic activities
        const genericKeywords = ['breakfast', 'lunch', 'dinner', 'meal', 'rest', 'relax', 'enjoy', 'prepare', 'allow time']
        if (genericKeywords.some(keyword => name.includes(keyword))) return false
        
        // Skip hotel activities unless it's a specific hotel name
        if (name.includes('hotel') && (name.includes('enjoy') || name.includes('have') || name.includes('breakfast'))) return false
        
        // Only fetch for actual attractions, monuments, markets, etc.
        const attractionKeywords = ['fort', 'palace', 'temple', 'museum', 'monument', 'tomb', 'mahal', 'bazaar', 'market', 'park', 'garden', 'lake', 'beach', 'church', 'mosque', 'gurdwara']
        const isAttraction = attractionKeywords.some(keyword => name.includes(keyword))
        
        // Or if it's a proper noun (starts with capital) and doesn't contain generic words
        const isProperNoun = activityName.charAt(0) === activityName.charAt(0).toUpperCase() && 
                             !name.includes('enjoy') && !name.includes('have') && !name.includes('relax')
        
        return isAttraction || isProperNoun
    }
    
    useEffect(() => {
        if (shouldFetchLocation()) {
            fetchPlaceDetails()
        }
    }, [activityName])

    const fetchPlaceDetails = async () => {
        try {
            setLoading(true)
            
            // Add trip destination context to the search query for better results
            const searchQuery = tripDestination ? `${activityName} ${tripDestination}` : activityName
            
            const response = await placesCache.get(searchQuery, () => GetDetailedPlaceInfo(searchQuery))
            
            if (response.data && response.data.places && response.data.places.length > 0) {
                const placeData = response.data.places[0]
                
                // Validate location relevance if we have trip destination
                if (tripDestination && placeData.formattedAddress) {
                    const address = placeData.formattedAddress.toLowerCase()
                    const destination = tripDestination.toLowerCase()
                    
                    // Extract country/state/city from destination
                    const destinationParts = destination.split(',').map(part => part.trim())
                    const isRelevant = destinationParts.some(part => 
                        part.length > 2 && address.includes(part)
                    )
                    
                    if (isRelevant) {
                        setPlaceDetails(placeData)
                    }
                } else {
                    setPlaceDetails(placeData)
                }
            }
        } catch (err) {
            console.error('Error fetching activity place details:', err)
        } finally {
            setLoading(false)
        }
    }

    const openInGoogleMaps = () => {
        const mapsUrl = placeDetails?.googleMapsUri || 
                       `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activityName)}`
        window.open(mapsUrl, '_blank')
    }

    // Helper to get activity image URL
    const getActivityImage = () => {
            if (placeDetails?.photos && placeDetails.photos.length > 0) {
                // Use the buildPhotoUrl function imported at the top of the file
                return buildPhotoUrl(placeDetails.photos[0].name)
            }
            return '/placeholder.jpg'
        }

    return (
        <div
            key={activityIndex}
            className='border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all bg-white cursor-pointer'
            onClick={openInGoogleMaps}
        >
            <div className='flex gap-4'>
                <div className='flex-shrink-0'>
                    <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center overflow-hidden'>
                        <img
                            src={getActivityImage()}
                            alt={placeDetails?.displayName?.text || activityName}
                            className='object-cover w-12 h-12 rounded-lg'
                            onError={e => { e.target.src = '/placeholder.jpg' }}
                        />
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                        <span className='text-sm font-medium text-slate-500'>{activity.time}</span>
                        {activity.duration && (
                            <span className='text-xs text-slate-400'>• {activity.duration}</span>
                        )}
                    </div>
                    <h4 className='font-semibold text-slate-900 mb-1'>
                        {placeDetails?.displayName?.text || activityName}
                    </h4>
                    <p className='text-sm text-slate-600 mb-2'>
                        {activity.details || activity.description}
                    </p>
                    {placeDetails?.formattedAddress && (
                        <div className='flex items-center gap-1 mb-2'>
                            <svg className='w-3 h-3 text-slate-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                            </svg>
                            <span className='text-xs text-slate-500'>
                                {placeDetails.formattedAddress}
                            </span>
                        </div>
                    )}
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
                    <div className='flex items-center justify-between mt-2'>
                        {(activity.cost || activity.ticket_pricing) && (
                            <span className='inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded'>
                                Cost: {activity.cost || activity.ticket_pricing}
                            </span>
                        )}
                        {loading && (
                            <div className='flex items-center gap-1'>
                                <div className='w-3 h-3 border border-slate-400 border-t-transparent rounded-full animate-spin'></div>
                                <span className='text-xs text-slate-500'>Getting location...</span>
                            </div>
                        )}
                        {placeDetails && (
                            <div className='flex items-center gap-1 text-blue-600'>
                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                </svg>
                                <span className='text-xs'>View on Maps</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCardItem

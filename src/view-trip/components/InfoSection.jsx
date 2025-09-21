import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

function InfoSection({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl)
        })
    }

    // Show loading state if trip data is not available
    if (!trip || !trip.userSelection) {
        return (
            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                <div className='relative h-64 md:h-80 bg-slate-200 animate-pulse'></div>
                <div className='p-8'>
                    <div className='mb-6'>
                        <div className='h-8 bg-slate-200 rounded animate-pulse mb-3'></div>
                        <div className='h-4 bg-slate-200 rounded animate-pulse w-1/2'></div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className='flex items-center gap-3 p-4 bg-slate-50 rounded-xl'>
                                <div className='w-10 h-10 bg-slate-200 rounded-lg animate-pulse'></div>
                                <div className='flex-1'>
                                    <div className='h-4 bg-slate-200 rounded animate-pulse mb-2'></div>
                                    <div className='h-5 bg-slate-200 rounded animate-pulse'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
            {/* Hero Image */}
            <div className='relative h-64 md:h-80'>
                <img 
                    src={photoUrl ? photoUrl : '/placeholder.jpg'} 
                    alt="Destination" 
                    className='w-full h-full object-cover' 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
            </div>

            {/* Trip Details */}
            <div className='p-8'>
                <div className='mb-6'>
                    <h1 className='text-3xl font-bold text-slate-900 mb-3'>
                        {trip?.userSelection?.location?.label}
                    </h1>
                    <p className='text-slate-600'>Your complete travel itinerary</p>
                </div>

                {/* Trip Stats */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* Duration */}
                    <div className='flex items-center gap-3 p-4 bg-slate-50 rounded-xl'>
                        <div className='w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center'>
                            <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-sm text-slate-600'>Duration</p>
                            <p className='font-semibold text-slate-900'>
                                {trip?.userSelection?.noOfDays || 'N/A'} {trip?.userSelection?.noOfDays === '1' ? 'Day' : 'Days'}
                            </p>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className='flex items-center gap-3 p-4 bg-slate-50 rounded-xl'>
                        <div className='w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center'>
                            <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-sm text-slate-600'>Budget</p>
                            <p className='font-semibold text-slate-900 capitalize'>{trip?.userSelection?.budget || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Travelers */}
                    <div className='flex items-center gap-3 p-4 bg-slate-50 rounded-xl'>
                        <div className='w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center'>
                            <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                            </svg>
                        </div>
                        <div>
                            <p className='text-sm text-slate-600'>Group Size</p>
                            <p className='font-semibold text-slate-900'>{trip?.userSelection?.traveler || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection
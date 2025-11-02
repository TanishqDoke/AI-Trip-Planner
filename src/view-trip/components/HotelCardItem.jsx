import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel&&GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.name
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl)
        })
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + "," + hotel?.address} target='_blank'>
            <div className='group border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-[#2276E3] transition-all duration-200 bg-white'>
                <div className='flex gap-4'>
                    {/* Hotel Image */}
                    <div className='flex-shrink-0'>
                        <img 
                            src={photoUrl ? photoUrl : '/placeholder.jpg'} 
                            className='w-24 h-24 rounded-lg object-cover border-2 border-gray-100' 
                            alt={hotel?.name}
                        />
                    </div>
                    
                    {/* Hotel Details - EaseMyTrip Style */}
                    <div className='flex-1 min-w-0'>
                        <h3 className='font-bold text-gray-900 group-hover:text-[#2276E3] transition-colors line-clamp-1 text-lg'>
                            {hotel?.name}
                        </h3>
                        
                        <div className='mt-2 space-y-2'>
                            <div className='flex items-center gap-2 text-sm text-gray-600'>
                                <svg className='w-4 h-4 flex-shrink-0 text-[#D32F2F]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                </svg>
                                <span className='line-clamp-1'>{hotel?.address}</span>
                            </div>
                            
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <div className='bg-green-600 text-white px-2 py-1 rounded text-xs font-bold'>
                                        ★ {hotel?.rating}
                                    </div>
                                </div>
                                
                                <div className='text-base font-bold text-[#D32F2F]'>
                                    {hotel?.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem
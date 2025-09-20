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
            <div className='group border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-slate-300 transition-all duration-200'>
                <div className='flex gap-4'>
                    {/* Hotel Image */}
                    <div className='flex-shrink-0'>
                        <img 
                            src={photoUrl ? photoUrl : '/placeholder.jpg'} 
                            className='w-20 h-20 rounded-lg object-cover' 
                            alt={hotel?.name}
                        />
                    </div>
                    
                    {/* Hotel Details */}
                    <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1'>
                            {hotel?.name}
                        </h3>
                        
                        <div className='mt-2 space-y-1'>
                            <div className='flex items-center gap-2 text-sm text-slate-600'>
                                <svg className='w-4 h-4 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                </svg>
                                <span className='line-clamp-1'>{hotel?.address}</span>
                            </div>
                            
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2 text-sm'>
                                    <svg className='w-4 h-4 text-yellow-500' fill='currentColor' viewBox='0 0 24 24'>
                                        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                                    </svg>
                                    <span className='font-medium text-slate-900'>{hotel?.rating}</span>
                                </div>
                                
                                <div className='text-sm font-semibold text-slate-900'>
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
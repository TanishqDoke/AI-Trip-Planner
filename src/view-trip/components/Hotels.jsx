import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    // Add loading state if trip data is not available
    if (!trip || !trip.tripData) {
        return (
            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-8 h-8 bg-slate-200 rounded-lg animate-pulse'></div>
                    <div className='flex-1'>
                        <div className='h-6 bg-slate-200 rounded animate-pulse mb-2'></div>
                        <div className='h-4 bg-slate-200 rounded animate-pulse w-1/2'></div>
                    </div>
                </div>
                
                <div className='space-y-4'>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className='h-24 bg-slate-200 rounded animate-pulse'></div>
                    ))}
                </div>
            </div>
        )
    }
    
    return (
        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center'>
                    <svg className='w-4 h-4 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                    </svg>
                </div>
                <div>
                    <h2 className='text-xl font-semibold text-slate-900'>Recommended Hotels</h2>
                    <p className='text-sm text-slate-600'>Curated accommodations for your stay</p>
                </div>
            </div>
            
            <div className='space-y-4'>
                {trip?.tripData?.hotels?.length > 0 ? (
                    trip.tripData.hotels.map((hotel, index) => (
                        <HotelCardItem key={index} hotel={hotel} />
                    ))
                ) : (
                    <div className='text-center py-8 text-slate-500'>
                        <p>No hotel recommendations available</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Hotels
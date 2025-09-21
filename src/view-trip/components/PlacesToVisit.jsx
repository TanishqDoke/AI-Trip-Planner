import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    if (!trip || !trip.tripData) {
        return (
            <div className='space-y-6'>
                <div className='text-center py-8 text-slate-500'>
                    <p>Loading trip details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center'>
                    <svg className='w-4 h-4 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                </div>
                <div>
                    <h2 className='text-xl font-semibold text-slate-900'>Day-wise Itinerary</h2>
                    <p className='text-sm text-slate-600'>Your detailed travel schedule</p>
                </div>
            </div>

            <div className='space-y-6'>
                {trip?.tripData?.itinerary?.length > 0 ? (
                    trip.tripData.itinerary.map((item, dayIndex) => (
                        <div key={dayIndex} className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                            <div className='bg-slate-50 px-6 py-4 border-b border-slate-200'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-semibold'>
                                        {dayIndex + 1}
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-slate-900'>{item.day || `Day ${dayIndex + 1}`}</h3>
                                        <p className='text-sm text-slate-600'>{item.places?.length || 0} activities planned</p>
                                    </div>
                                </div>
                            </div>

                            <div className='p-6'>
                                <div className='space-y-4'>
                                    {item.places?.length > 0 ? (
                                        item.places.map((place, placeIndex) => (
                                            <PlaceCardItem key={placeIndex} place={place} />
                                        ))
                                    ) : (
                                        <div className='text-center py-8 text-slate-500'>
                                            <p>No activities planned for this day</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center'>
                        <div className='text-slate-500'>
                            <p className='text-lg font-medium text-slate-600 mb-2'>No itinerary available</p>
                            <p className='text-sm text-slate-500'>The trip itinerary is being prepared or not available</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlacesToVisit

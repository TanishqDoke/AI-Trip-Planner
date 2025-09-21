import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    const navigate = useNavigate();
    // Add debugging to see the actual data structure
    console.log("PlacesToVisit - Full trip data:", trip);
    console.log("PlacesToVisit - Itinerary:", trip?.tripData?.itinerary);
    
    // State to track which days are expanded
    const [expandedDays, setExpandedDays] = useState(new Set([0])); // First day expanded by default
    
    if (!trip || !trip.tripData) {
        return (
            <div className='space-y-6'>
                <div className='text-center py-8 text-slate-500'>
                    <p>Loading trip details...</p>
                </div>
            </div>
        )
    }

    const toggleDay = (dayIndex) => {
        const newExpandedDays = new Set(expandedDays)
        if (newExpandedDays.has(dayIndex)) {
            newExpandedDays.delete(dayIndex)
        } else {
            newExpandedDays.add(dayIndex)
        }
        setExpandedDays(newExpandedDays)
    }

    return (
        <div className='space-y-6'>
            {/* Back Button */}
            <div className='flex items-center gap-2 mb-4'>
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors'
                >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                    </svg>
                    <span className='font-medium'>Back</span>
                </button>
            </div>

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
                    trip.tripData.itinerary.map((item, dayIndex) => {
                        // Handle both old format (item.places) and new format (item.schedule)
                        const activities = item.places || item.schedule || [];
                        const activityCount = activities.length;
                        const isExpanded = expandedDays.has(dayIndex);
                        
                        return (
                            <div key={dayIndex} className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                                {/* Day Header - Clickable */}
                                <div 
                                    className='bg-slate-50 px-6 py-4 border-b border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors'
                                    onClick={() => toggleDay(dayIndex)}
                                >
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-semibold'>
                                                {dayIndex + 1}
                                            </div>
                                            <div>
                                                <h3 className='text-lg font-semibold text-slate-900'>{item.day || `Day ${dayIndex + 1}`}</h3>
                                                <p className='text-sm text-slate-600'>{activityCount} activities planned</p>
                                            </div>
                                        </div>
                                        
                                        {/* Dropdown Arrow */}
                                        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                            <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Collapsible Activities Section */}
                                {isExpanded && (
                                    <div className='p-6'>
                                        <div className='space-y-4'>
                                            {activityCount > 0 ? (
                                                activities.map((place, placeIndex) => {
                                                    // Handle both old format and new format activities
                                                    const placeData = {
                                                        name: place?.name || place?.place || place?.activity,
                                                        place: place?.place || place?.activity || place?.name,
                                                        details: place?.details || place?.description,
                                                        ticket_pricing: place?.ticket_pricing || place?.cost || 'Free',
                                                        rating: place?.rating,
                                                        time: place?.time
                                                    };
                                                    return (
                                                        <PlaceCardItem key={placeIndex} place={placeData} />
                                                    );
                                                })
                                            ) : (
                                                <div className='text-center py-8 text-slate-500'>
                                                    <p>No activities planned for this day</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
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
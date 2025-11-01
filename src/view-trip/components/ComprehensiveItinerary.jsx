import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActivityCardItem from './ActivityCardItem'

function ComprehensiveItinerary({ trip }) {
    const navigate = useNavigate();
    console.log("ComprehensiveItinerary - Full trip data:", trip);
    console.log("ComprehensiveItinerary - Itinerary data:", trip?.tripData?.itinerary);
    console.log("ComprehensiveItinerary - Itinerary length:", trip?.tripData?.itinerary?.length);
    console.log("ComprehensiveItinerary - Recommended hotels:", trip?.tripData?.recommended_hotels);
    console.log("ComprehensiveItinerary - Hotels:", trip?.tripData?.hotels);
    console.log("ComprehensiveItinerary - User selection days:", trip?.userSelection?.noOfDays);
    
    const [expandedDays, setExpandedDays] = useState(new Set([0]));

    if (!trip || !trip.tripData) {
        return (
            <div className='space-y-6'>
                <div className='text-center py-8 text-slate-500'>
                    <p>Loading comprehensive itinerary...</p>
                </div>
            </div>
        )
    }

    const itinerary = trip?.tripData?.itinerary || [];
    
    // Check if there's actually any itinerary data
    if (!itinerary || itinerary.length === 0) {
        return (
            <div className='space-y-6'>
                <div className='bg-red-100 border border-red-300 text-red-800 rounded-lg px-4 py-3 mb-4'>
                    <strong>Debug Info:</strong> No itinerary found. Check browser console for full trip data.
                </div>
                <div className='text-center py-8 text-slate-500'>
                    <p>No itinerary available</p>
                    <p className='text-sm mt-2'>The trip itinerary is being prepared or not available</p>
                </div>
            </div>
        )
    }
    
    const expectedDays = parseInt(trip?.userSelection?.noOfDays) || itinerary.length;
    const completeItinerary = [];
    for (let i = 0; i < expectedDays; i++) {
        if (itinerary[i]) {
            completeItinerary.push(itinerary[i]);
        } else {
            completeItinerary.push({
                day: `Day ${i + 1}`,
                daily_total_cost: 'Budget varies',
                schedule: [],
                places: []
            });
        }
    }
    const aiIncomplete = itinerary.length < expectedDays;
    console.log("Complete itinerary with placeholders:", completeItinerary);

    const toggleDay = (dayIndex) => {
        const newExpandedDays = new Set(expandedDays)
        if (newExpandedDays.has(dayIndex)) {
            newExpandedDays.delete(dayIndex)
        } else {
            newExpandedDays.add(dayIndex)
        }
        setExpandedDays(newExpandedDays)
    }

    // Try to extract the main destination/city from userSelection or tripData
    const tripDestination = trip?.userSelection?.location?.label || trip?.userSelection?.location || trip?.tripData?.destination || "";

    return (
        <div className='space-y-8'>
            {aiIncomplete && (
                <div className='bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg px-4 py-3 mb-4'>
                    <strong>Note:</strong> The AI could not generate a full itinerary for all {expectedDays} days. Some days may be empty. Try again or choose a different city for better results.
                </div>
            )}
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
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                    </svg>
                </div>
                <div>
                    <h2 className='text-xl font-semibold text-slate-900'>Day-wise Itinerary</h2>
                    <p className='text-sm text-slate-600'>Your detailed travel schedule</p>
                </div>
            </div>

            <div className='space-y-6'>
                {completeItinerary.length > 0 ? (
                    completeItinerary.map((dayPlan, dayIndex) => {
                        const activities = dayPlan.places || dayPlan.schedule || [];
                        const activityCount = activities.length;
                        const isExpanded = expandedDays.has(dayIndex);

                        return (
                            <div key={dayIndex} className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                                <div
                                    className='bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-slate-200 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-colors'
                                    onClick={() => toggleDay(dayIndex)}
                                >
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-bold'>
                                                {dayIndex + 1}
                                            </div>
                                            <div>
                                                <h3 className='text-xl font-bold text-slate-900'>{dayPlan.day || `Day ${dayIndex + 1}`}</h3>
                                                <p className='text-sm text-slate-600'>{activityCount} activities planned</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            {/* <div className='text-right'>
                                                <p className='text-lg font-bold text-blue-600'>{dayPlan.daily_total_cost || 'Budget varies'}</p>
                                                <p className='text-sm text-slate-500'>Daily Total</p>
                                            </div> */}
                                            <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                                <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className='p-6'>
                                        <div className='space-y-4'>
                                            {activityCount > 0 ? (
                                                activities.map((activity, activityIndex) => (
                                                    <ActivityCardItem 
                                                        key={activityIndex}
                                                        activity={activity}
                                                        activityIndex={activityIndex}
                                                        tripDestination={tripDestination}
                                                    />
                                                ))
                                            ) : (
                                                <div className='text-center py-8 text-slate-500'>
                                                    {dayIndex === 0 ? (
                                                        <p>No activities planned for this day</p>
                                                    ) : (
                                                        <div className='space-y-3'>
                                                            <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                                                                <svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                                                </svg>
                                                            </div>
                                                            <p className='text-lg font-medium text-slate-600'>Itinerary Coming Soon</p>
                                                            <p className='text-sm text-slate-500'>The detailed activities for this day are being prepared</p>
                                                        </div>
                                                    )}
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

export default ComprehensiveItinerary
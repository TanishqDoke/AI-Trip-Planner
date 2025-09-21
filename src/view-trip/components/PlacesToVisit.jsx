// import React from 'react'
// import PlaceCardItem from './PlaceCardItem'

// function PlacesToVisit({trip}) {
//   return (
//     <div className='space-y-6'>
//         {/* Header */}
//         <div className='flex items-center gap-3 mb-6'>
//             <div className='w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center'>
//                 <svg className='w-4 h-4 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
//                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
//                 </svg>
//             </div>
//             <div>
//                 <h2 className='text-xl font-semibold text-slate-900'>Day-wise Itinerary</h2>
//                 <p className='text-sm text-slate-600'>Your detailed travel schedule</p>
//             </div>
//         </div>

//         {/* Itinerary Days */}
//         <div className='space-y-6'>
//             {trip.tripData?.itinerary.map((item, dayIndex) => (
//                 <div key={dayIndex} className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
//                     {/* Day Header */}
//                     <div className='bg-slate-50 px-6 py-4 border-b border-slate-200'>
//                         <div className='flex items-center gap-3'>
//                             <div className='w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-semibold'>
//                                 {dayIndex + 1}
//                             </div>
//                             <div>
//                                 <h3 className='text-lg font-semibold text-slate-900'>{item.day}</h3>
//                                 <p className='text-sm text-slate-600'>{item.plan?.length || 0} activities planned</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Day Activities */}
//                     <div className='p-6'>
//                         <div className='space-y-4'>
//                             {item.plan?.map((place, placeIndex) => (
//                                 <div key={placeIndex} className='relative'>
//                                     {/* Timeline connector */}
//                                     {placeIndex < item.plan.length - 1 && (
//                                         <div className='absolute left-4 top-12 w-0.5 h-16 bg-slate-200'></div>
//                                     )}
                                    
//                                     {/* Activity Item */}
//                                     <div className='flex gap-4'>
//                                         {/* Time Badge */}
//                                         <div className='flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm'>
//                                             <div className='w-2 h-2 bg-slate-600 rounded-full'></div>
//                                         </div>
                                        
//                                         {/* Activity Content */}
//                                         <div className='flex-1 min-w-0'>
//                                             <div className='mb-2'>
//                                                 <span className='inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full'>
//                                                     {place.time}
//                                                 </span>
//                                             </div>
//                                             <PlaceCardItem place={place} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default PlacesToVisit

// Fixed PlacesToVisit.jsx
import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
    // Add debugging
    console.log("PlacesToVisit component received:", trip?.tripData?.itinerary);
    
    return (
        <div className='space-y-6'>
            {/* Header */}
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

            {/* Itinerary Days */}
            <div className='space-y-6'>
                {trip?.tripData?.itinerary?.length > 0 ? (
                    trip.tripData.itinerary.map((item, dayIndex) => (
                        <div key={dayIndex} className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                            {/* Day Header */}
                            <div className='bg-slate-50 px-6 py-4 border-b border-slate-200'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-semibold'>
                                        {dayIndex + 1}
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-slate-900'>{item.day}</h3>
                                        {/* Fix 2: Use 'places' instead of 'plan' */}
                                        <p className='text-sm text-slate-600'>{item.places?.length || 0} activities planned</p>
                                    </div>
                                </div>
                            </div>

                            {/* Day Activities */}
                            <div className='p-6'>
                                <div className='space-y-4'>
                                    {/* Fix 3: Use 'places' instead of 'plan' */}
                                    {item.places?.length > 0 ? (
                                        item.places.map((place, placeIndex) => (
                                            <div key={placeIndex} className='relative'>
                                                {/* Timeline connector */}
                                                {placeIndex < item.places.length - 1 && (
                                                    <div className='absolute left-4 top-12 w-0.5 h-16 bg-slate-200'></div>
                                                )}
                                                
                                                {/* Activity Item */}
                                                <div className='flex gap-4'>
                                                    {/* Time Badge */}
                                                    <div className='flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm'>
                                                        <div className='w-2 h-2 bg-slate-600 rounded-full'></div>
                                                    </div>
                                                    
                                                    {/* Activity Content */}
                                                    <div className='flex-1 min-w-0'>
                                                        <div className='mb-2'>
                                                            <span className='inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full'>
                                                                {place.time || 'All day'}
                                                            </span>
                                                        </div>
                                                        <PlaceCardItem place={place} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-center py-4 text-slate-500'>
                                            <p>No activities planned for this day</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-8 text-slate-500'>
                        <p>No itinerary available</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlacesToVisit;
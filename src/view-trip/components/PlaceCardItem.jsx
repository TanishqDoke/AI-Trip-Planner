// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from 'react-router-dom';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

// function PlaceCardItem({place}) {
//   const [photoUrl, setPhotoUrl] = useState();

//   useEffect(() => {
//       place && GetPlacePhoto();
//   }, [place])

//   const GetPlacePhoto = async () => {
//       const data = {
//           textQuery: place?.place
//       }
//       const result = await GetPlaceDetails(data).then(resp => {
//           console.log(resp.data.places[0].photos[3].name)
//           const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//           setPhotoUrl(PhotoUrl)
//       })
//   }

//   return (
//     <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.place} target='_blank'>
//         <div className='group border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-slate-300 transition-all duration-200 bg-white'>
//             <div className='flex gap-4'>
//                 {/* Place Image */}
//                 <div className='flex-shrink-0'>
//                     <img 
//                         src={photoUrl ? photoUrl : '/placeholder.jpg'} 
//                         alt={place?.place} 
//                         className='w-24 h-24 rounded-lg object-cover' 
//                     />
//                 </div>
                
//                 {/* Place Details */}
//                 <div className='flex-1 min-w-0'>
//                     <h3 className='font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1 mb-2'>
//                         {place.place}
//                     </h3>
                    
//                     <p className='text-sm text-slate-600 line-clamp-2 mb-3'>
//                         {place.details}
//                     </p>
                    
//                     {/* Ticket Info */}
//                     <div className='flex items-center justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <svg className='w-4 h-4 text-slate-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' />
//                             </svg>
//                             <span className='text-sm font-medium text-slate-700'>
//                                 {place.ticket_pricing}
//                             </span>
//                         </div>
                        
//                         <div className='flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors'>
//                             <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </Link>
//   )
// }

// export default PlaceCardItem

// Corrected PlaceCardItem.jsx
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({place}) {
    const [photoUrl, setPhotoUrl] = useState();
    
    // Add debugging
    console.log("PlaceCardItem received:", place);

    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {
        try {
            const data = {
                // Fix 4: Use 'name' instead of 'place'
                textQuery: place?.name
            }
            const result = await GetPlaceDetails(data).then(resp => {
                if (resp?.data?.places?.[0]?.photos?.[3]?.name) {
                    console.log(resp.data.places[0].photos[3].name)
                    const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
                    setPhotoUrl(PhotoUrl)
                }
            })
        } catch (error) {
            console.error("Error fetching place photo:", error);
        }
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.name} target='_blank'>
            <div className='group border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-slate-300 transition-all duration-200 bg-white'>
                <div className='flex gap-4'>
                    {/* Place Image */}
                    <div className='flex-shrink-0'>
                        <img 
                            src={photoUrl ? photoUrl : '/placeholder.jpg'} 
                            alt={place?.name} 
                            className='w-24 h-24 rounded-lg object-cover' 
                        />
                    </div>
                    
                    {/* Place Details */}
                    <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1 mb-2'>
                            {place?.name}
                        </h3>
                        
                        <p className='text-sm text-slate-600 line-clamp-2 mb-3'>
                            {place?.details}
                        </p>
                        
                        {/* Ticket Info */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <svg className='w-4 h-4 text-slate-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' />
                                </svg>
                                <span className='text-sm font-medium text-slate-700'>
                                    {place?.ticket_pricing || 'Free'}
                                </span>
                            </div>
                            
                            <div className='flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Additional Info */}
                        {place?.rating && (
                            <div className='mt-2 flex items-center gap-1'>
                                <svg className='w-4 h-4 text-yellow-500' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                                </svg>
                                <span className='text-sm text-slate-600'>{place.rating}</span>
                                {place?.time && (
                                    <>
                                        <span className='text-slate-400'>•</span>
                                        <span className='text-sm text-slate-600'>{place.time}</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
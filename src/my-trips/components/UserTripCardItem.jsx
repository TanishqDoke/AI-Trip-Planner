import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ShareItinerary from './ShareItinerary'; // Adjust path to your ShareItinerary component location

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      // console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl)
    })
  }

  return (
    <div className='hover:scale-105 transition-all rounded-xl border p-3'>
      <Link to={`/view-trip/${trip?.id}`}>
        <div>
          <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="" className='object-cover rounded-xl h-[220px] w-full' />
          <div className='mt-2'>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget.</h2>
          </div>
        </div>
      </Link>
      
      {/* ShareItinerary below the content */}
      {/* <div className='mt-3'>
        <ShareItinerary tripId={trip?.id} title={trip?.userSelection?.location?.label || "My Itinerary"} />
      </div> */}
      
    </div>
  )
}

export default UserTripCardItem

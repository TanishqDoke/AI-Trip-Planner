import React from 'react'

function HotelRecommendation({ trip }) {
    // Try to get hotel from multiple possible locations
    const hotel = trip?.tripData?.recommended_hotel || 
                  trip?.tripData?.recommended_hotels?.[0] || 
                  trip?.tripData?.hotels?.[0];

    if (!hotel) {
        return (
            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
                <div className='text-center py-8 text-slate-500'>
                    <p>No hotel recommendation available</p>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
            {/* Hotel Image */}
            <div className='relative h-48'>
                <img 
                    src={hotel.image_url || '/placeholder.jpg'} 
                    alt={hotel.name}
                    className='w-full h-full object-cover' 
                />
                <div className='absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-green-600'>
                    {hotel.rating}
                </div>
            </div>

            {/* Hotel Details */}
            <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                    <div>
                        <h3 className='text-xl font-bold text-slate-900 mb-1'>{hotel.name}</h3>
                        <p className='text-slate-600 text-sm'>{hotel.address}</p>
                    </div>
                    <div className='text-right'>
                        <p className='text-lg font-bold text-blue-600'>{hotel.price}</p>
                        <p className='text-sm text-slate-500'>{hotel.total_cost}</p>
                    </div>
                </div>

                <p className='text-slate-700 mb-4'>{hotel.description}</p>

                {/* Check-in/Check-out Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div className='bg-green-50 p-3 rounded-lg'>
                        <h4 className='font-semibold text-green-800 mb-1'>Check-in</h4>
                        <p className='text-sm text-green-700'>{hotel.check_in}</p>
                    </div>
                    <div className='bg-blue-50 p-3 rounded-lg'>
                        <h4 className='font-semibold text-blue-800 mb-1'>Check-out</h4>
                        <p className='text-sm text-blue-700'>{hotel.check_out}</p>
                    </div>
                </div>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                    <div>
                        <h4 className='font-semibold text-slate-900 mb-2'>Amenities</h4>
                        <div className='flex flex-wrap gap-2'>
                            {hotel.amenities.map((amenity, index) => (
                                <span 
                                    key={index}
                                    className='px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full'
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HotelRecommendation
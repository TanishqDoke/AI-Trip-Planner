import React, { useState } from 'react';
import { toast } from 'sonner';

function SelectedTravel({ trip }) {
  const [booked, setBooked] = useState(false);
  
  const selectedTravel = trip?.userSelection?.selectedTravel;
  
  if (!selectedTravel) return null;

  const handleBookNow = () => {
    setBooked(true);
    toast('✅ Booked Successfully!', {
      description: `Your ${selectedTravel.mode} (${selectedTravel.name}) has been booked for ${selectedTravel.travelers} traveler(s).`,
    });
  };

  const getTravelIcon = (mode) => {
    switch(mode) {
      case 'flight': return '✈️';
      case 'train': return '🚆';
      case 'bus': return '🚌';
      default: return '🚗';
    }
  };

  const travelers = selectedTravel.travelers || parseInt(trip?.userSelection?.traveler) || 1;

  return (
    <div className='mt-8'>
      <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-2xl'>
            {getTravelIcon(selectedTravel.mode)}
          </div>
          <div>
            <h2 className='text-xl font-semibold text-slate-900'>Your Travel Booking</h2>
            <p className='text-sm text-slate-600'>Selected {selectedTravel.mode} details</p>
          </div>
        </div>

        <div className='bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h3 className='text-2xl font-bold text-slate-900 capitalize'>{selectedTravel.mode}</h3>
              <p className='text-lg text-slate-700 mt-1'>{selectedTravel.name}</p>
              {selectedTravel.class && (
                <span className='inline-block mt-2 text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full'>
                  {selectedTravel.class}
                </span>
              )}
            </div>
            <div className='text-3xl'>
              {getTravelIcon(selectedTravel.mode)}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div className='bg-white rounded-lg p-4 border border-slate-200'>
              <p className='text-sm text-slate-600 mb-1'>Departure</p>
              <p className='text-lg font-semibold text-slate-900'>{selectedTravel.departure}</p>
            </div>
            <div className='bg-white rounded-lg p-4 border border-slate-200'>
              <p className='text-sm text-slate-600 mb-1'>Arrival</p>
              <p className='text-lg font-semibold text-slate-900'>{selectedTravel.arrival}</p>
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 border border-slate-200 mb-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600'>Duration</p>
                <p className='text-lg font-semibold text-slate-900'>{selectedTravel.duration}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-slate-600'>Total Cost</p>
                <p className='text-2xl font-bold text-blue-600'>₹{selectedTravel.totalCost?.toLocaleString()}</p>
                <p className='text-xs text-slate-500'>for {travelers} traveler(s)</p>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between bg-blue-50 rounded-lg p-4 border border-blue-200'>
            <div>
              <p className='text-sm text-slate-600'>Price per person</p>
              <p className='text-lg font-semibold text-slate-900'>₹{selectedTravel.price?.toLocaleString()}</p>
            </div>
            <div>
              {booked ? (
                <div className='bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  Booked
                </div>
              ) : (
                <button
                  onClick={handleBookNow}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200'>
          <div className='flex items-start gap-3'>
            <svg className='w-5 h-5 text-slate-600 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <div>
              <p className='text-sm font-medium text-slate-700'>Travel Information</p>
              <p className='text-xs text-slate-600 mt-1'>
                From: {trip?.userSelection?.originCity?.label} → To: {trip?.userSelection?.location?.label}
              </p>
              {selectedTravel.distance && (
                <p className='text-xs text-slate-600'>
                  Distance: {selectedTravel.distance}
                </p>
              )}
              <p className='text-xs text-slate-600'>
                Date: {trip?.userSelection?.departureDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedTravel;

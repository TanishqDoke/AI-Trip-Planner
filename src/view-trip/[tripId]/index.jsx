import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection'; // adjust relative path as needed
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import ShareItinerary from '../../my-trips/components/ShareItinerary'; // adjust path as needed
import HotelRecommendation from '../components/HotelRecommendation';
import ComprehensiveItinerary from '../components/ComprehensiveItinerary';
import BudgetBreakdown from '../components/BudgetBreakdown';
import { HeroWithImage } from '@/components/custom/Hero';

function Viewtrip() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        tripId && GetTripData()
    }, [tripId])

    // used to get trip info from firebase
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        }
        else {
            toast("No trip found")
        }
    }

    return (

        <div className='min-h-screen bg-gradient-to-br from-blue-50/20 via-slate-50 to-blue-50/30'>
            {/* Header with Trip Overview */}
            <div className='bg-white border-b border-slate-200'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    {/* Back Button */}
                    <div className='flex items-center gap-2 mb-6'>
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

                    <div className='flex items-center gap-4 mb-4'>
                        <img src="/cerebro-professional.svg" alt="CerebroCraft" className='h-8' />
                        <div className='h-6 w-px bg-slate-300'></div>
                        <div>
                            <h1 className='text-2xl font-bold text-slate-900'>Trip Itinerary</h1>
                            <p className='text-slate-600'>Your personalized travel plan</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-8'>
                {/* Trip Information Section */}
                <InfoSection trip={trip} />

                {/* Budget Breakdown Section */}
                {trip && (
                    <div className='mt-8'>
                        <BudgetBreakdown trip={trip} />
                    </div>
                )}

                {/* Share Itinerary Section - Add this above the main content */}
                {trip && (
                    <div className='mt-8'>
                        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className='text-xl font-semibold text-slate-900'>Share Your Trip</h2>
                                    <p className='text-sm text-slate-600'>Share this amazing itinerary with friends and family</p>
                                </div>
                            </div>
                            <ShareItinerary
                                tripId={tripId}
                                title={`${trip?.userSelection?.location?.label} - ${trip?.userSelection?.noOfDays} Days Trip`}
                            />
                        </div>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
                    {/* Left Column - Itinerary */}
                    <div className='lg:col-span-2'>
                        {(trip?.tripData?.recommended_hotel || trip?.tripData?.recommended_hotels?.length > 0) ? (
                            <ComprehensiveItinerary trip={trip} />
                        ) : (
                            <PlacesToVisit trip={trip} />
                        )}
                    </div>

                    {/* Right Column - Hotels */}
                    <div className='lg:col-span-1'>
                        {(trip?.tripData?.recommended_hotel || trip?.tripData?.recommended_hotels?.length > 0) ? (
                            <HotelRecommendation trip={trip} />
                        ) : (
                            <Hotels trip={trip} />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <Footer trip={trip} />
            </div>

        </div>
    )
}

export default Viewtrip

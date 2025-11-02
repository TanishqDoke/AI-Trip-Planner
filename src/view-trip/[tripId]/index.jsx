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
import SelectedTravel from '../components/SelectedTravel';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/translations/translations';

function Viewtrip() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);

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
            toast(t('noTripFound'))
        }
    }

    return (

        <div className='min-h-screen bg-gray-50'>
            {/* EaseMyTrip Style Header */}
            <div className='bg-gradient-to-r from-[#2276E3] to-[#1565C0] text-white'>
                <div className='max-w-7xl mx-auto px-6 py-10'>
                    {/* Back Button */}
                    <div className='flex items-center gap-2 mb-6'>
                        <button
                            onClick={() => navigate(-1)}
                            className='flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors'
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            <span className='font-semibold'>{t('backToMyTrips')}</span>
                        </button>
                    </div>

                    <div className='text-center'>
                        <h1 className='text-3xl font-bold mb-2'>{t('yourTripItinerary')}</h1>
                        <p className='text-blue-100 text-lg'>{t('everythingYouNeed')}</p>
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

                {/* Share Itinerary Section */}
                {trip && (
                    <div className='mt-8'>
                        <div className='bg-white rounded-lg border-2 border-gray-200 shadow-md p-6'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-10 h-10 bg-[#2276E3] rounded-lg flex items-center justify-center'>
                                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className='text-xl font-bold text-gray-900'>{t('shareYourTrip')}</h2>
                                    <p className='text-sm text-gray-600'>{t('shareItinerary')}</p>
                                </div>
                            </div>
                            <ShareItinerary
                                tripId={tripId}
                                title={`${trip?.userSelection?.location?.label} - ${trip?.userSelection?.noOfDays} Days Trip`}
                            />
                        </div>
                    </div>
                )}

                {/* Selected Travel Section */}
                {trip && (
                    <SelectedTravel trip={trip} />
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

import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection'; // adjust relative path as needed
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import ShareItinerary from '../../my-trips/components/ShareItinerary'; // adjust path as needed

function Viewtrip() {
    const { tripId } = useParams();
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

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8'>
                    {/* Left Column - Itinerary */}
                    <div className='lg:col-span-2'>
                        <PlacesToVisit trip={trip} />
                    </div>

                    {/* Right Column - Hotels */}
                    <div className='lg:col-span-1'>
                        <Hotels trip={trip} />
                    </div>
                </div>

                {/* Footer */}
                <Footer trip={trip} />
            </div>

        </div>
    )
}

export default Viewtrip

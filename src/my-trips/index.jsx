import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation, useNavigate } from 'react-router-dom';
import { query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/translations/translations';
//import ShareItinerary from './components/ShareItinerary';

function MyTrips() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([])
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);

    useEffect(() => {
        GetUserTrips();
    }, [])

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([])
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal => [...prevVal, doc.data()])
        });
    }

    return (

        <div className='min-h-screen bg-white'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Back Button */}
                <div className='flex items-center gap-2 mb-6'>
                    <button
                        onClick={() => navigate(-1)}
                        className='flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#2276E3] hover:bg-gray-50 rounded-md transition-colors'
                    >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                        </svg>
                        <span className='font-semibold'>{t('back')}</span>
                    </button>
                </div>

                {/* EaseMyTrip Style Header */}
                <div className='mb-10'>
                    <div className='bg-gradient-to-r from-[#2276E3] to-[#1565C0] text-white rounded-lg p-8 mb-6'>
                        <div className='flex items-center justify-between flex-wrap gap-4'>
                            <div>
                                <h1 className='text-3xl md:text-4xl font-bold mb-2'>{t('myTripsTitle')}</h1>
                                <p className='text-blue-100 text-lg'>{t('myTripsSubtitle')}</p>
                            </div>
                            <button
                                onClick={() => navigate('/create-trip')}
                                className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-3 rounded-md font-bold shadow-lg hover:shadow-xl transition-all duration-200 uppercase'
                            >
                                {t('createNewTrip')}
                            </button>
                        </div>
                    </div>
                    
                    {/* Stats Overview - EaseMyTrip Style */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center'>
                                    <svg className='w-7 h-7 text-[#2276E3]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-3xl font-bold text-gray-800'>{userTrips?.length || 0}</p>
                                    <p className='text-sm text-gray-600 font-medium'>{t('totalTrips')}</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 h-14 bg-red-100 rounded-full flex items-center justify-center'>
                                    <svg className='w-7 h-7 text-[#D32F2F]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-3xl font-bold text-gray-800'>{userTrips?.length > 0 ? new Set(userTrips.map(trip => trip.userSelection?.location?.label)).size : 0}</p>
                                    <p className='text-sm text-gray-600 font-medium'>{t('destinations')}</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 h-14 bg-green-100 rounded-full flex items-center justify-center'>
                                    <svg className='w-7 h-7 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-3xl font-bold text-gray-800'>{userTrips?.reduce((sum, trip) => sum + (parseInt(trip.userSelection?.noOfDays) || 0), 0) || 0}</p>
                                    <p className='text-sm text-gray-600 font-medium'>{t('totalDays')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trips Grid - EaseMyTrip Style */}
                <div className='mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>{t('yourItineraries')}</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                        <UserTripCardItem trip={trip} key={index} />
                    )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm'>
                            <div className='h-48 w-full bg-gray-200 animate-pulse rounded-lg mb-4'></div>
                            <div className='space-y-3'>
                                <div className='h-5 bg-gray-200 animate-pulse rounded'></div>
                                <div className='h-4 bg-gray-200 animate-pulse rounded w-3/4'></div>
                                <div className='h-4 bg-gray-200 animate-pulse rounded w-1/2'></div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Empty State - EaseMyTrip Style */}
                {userTrips?.length === 0 && (
                    <div className='text-center mt-16'>
                        <div className='bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-12 border-2 border-dashed border-gray-300 max-w-md mx-auto'>
                            <div className='w-20 h-20 bg-[#2276E3] rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                                </svg>
                            </div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>{t('noTripsYet')}</h3>
                            <p className='text-gray-600 mb-8 text-lg'>{t('startPlanningDream')}</p>
                            <a href="/create-trip" className='inline-block bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-3 rounded-md font-bold shadow-lg hover:shadow-xl transition-all duration-200 uppercase'>
                                {t('planFirstTrip')}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyTrips
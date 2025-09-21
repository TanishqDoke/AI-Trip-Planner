import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
//import ShareItinerary from './components/ShareItinerary';

function MyTrips() {
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([])

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

        <div className='min-h-screen bg-gradient-to-br from-blue-50/20 via-slate-50 to-blue-50/30'>
            <div className='max-w-7xl mx-auto px-6 py-12'>
                {/* Professional Header */}
                <div className='mb-12'>
                    <div className='flex items-center gap-4 mb-6'>
                        <img src="/cerebro-professional.svg" alt="CerebroCraft" className='h-10' />
                        <div className='h-8 w-px bg-slate-300'></div>
                        <div>
                            <h1 className='text-3xl font-bold text-slate-900'>Travel Portfolio</h1>
                            <p className='text-slate-600'>Manage and review your planned itineraries</p>
                        </div>
                    </div>
                    
                    {/* Stats Overview */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
                        <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center'>
                                    <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-slate-900'>{userTrips?.length || 0}</p>
                                    <p className='text-sm text-slate-600'>Total Trips</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center'>
                                    <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-slate-900'>{userTrips?.length > 0 ? new Set(userTrips.map(trip => trip.userSelection?.location?.label)).size : 0}</p>
                                    <p className='text-sm text-slate-600'>Destinations</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center'>
                                    <svg className='w-5 h-5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-slate-900'>{userTrips?.reduce((sum, trip) => sum + (parseInt(trip.userSelection?.noOfDays) || 0), 0) || 0}</p>
                                    <p className='text-sm text-slate-600'>Total Days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trips Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                        <UserTripCardItem trip={trip} key={index} />
                    )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='bg-white rounded-xl p-6 border border-slate-200 shadow-sm'>
                            <div className='h-48 w-full bg-slate-200 animate-pulse rounded-lg mb-4'></div>
                            <div className='space-y-3'>
                                <div className='h-5 bg-slate-200 animate-pulse rounded'></div>
                                <div className='h-4 bg-slate-200 animate-pulse rounded w-3/4'></div>
                                <div className='h-4 bg-slate-200 animate-pulse rounded w-1/2'></div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Empty State */}
                {userTrips?.length === 0 && (
                    <div className='text-center mt-16'>
                        <div className='bg-white rounded-xl p-12 border border-slate-200 shadow-sm max-w-md mx-auto'>
                            <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg className='w-8 h-8 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-900 mb-2'>No trips planned yet</h3>
                            <p className='text-slate-600 mb-8'>Create your first AI-powered travel itinerary to get started.</p>
                            <a href="/create-trip" className='inline-block bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200'>
                                Create New Trip
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyTrips
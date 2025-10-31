import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { flightService } from '@/service/FlightService';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function TravelBooking({ trip }) {
    const [travelOptions, setTravelOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [backendStatus, setBackendStatus] = useState('checking');
    const [selectedMode, setSelectedMode] = useState('flight'); // flight, train, or bus

    // Extract trip details
    const destination = trip?.userSelection?.location?.label || '';
    const noOfDays = trip?.userSelection?.noOfDays || 3;
    const travelers = trip?.userSelection?.traveler || '1 person';

    // Parse number of travelers
    const getTravelerCount = (travelerString) => {
        const match = travelerString.match(/\d+/);
        return match ? parseInt(match[0]) : 1;
    };

    // Get saved travel details from trip
    const savedOrigin = trip?.userSelection?.originCity || '';
    const savedDepartureDate = trip?.userSelection?.departureDate || '';
    const savedReturnDate = trip?.userSelection?.returnDate || '';

    const [searchParams, setSearchParams] = useState({
        origin: savedOrigin,
        destination: destination,
        departureDate: savedDepartureDate,
        returnDate: savedReturnDate,
        passengers: getTravelerCount(travelers),
    });

    // Check backend health on mount
    useEffect(() => {
        checkBackendHealth();
    }, []);

    const checkBackendHealth = async () => {
        try {
            const health = await flightService.checkHealth();
            setBackendStatus(health.status === 'healthy' ? 'online' : 'offline');
        } catch (error) {
            setBackendStatus('offline');
        }
    };

    const handleSearch = async () => {
        if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (backendStatus === 'offline') {
            toast.error('Backend server is not running. Please start the Python backend.');
            return;
        }

        setLoading(true);
        try {
            const result = await flightService.searchTravelOptions({
                ...searchParams,
                mode: selectedMode
            });

            if (result.success) {
                setTravelOptions(result.options || []);
                toast.success(`Found ${result.options?.length || 0} ${selectedMode} options`);

                // Show AI recommendations if available
                if (result.recommendations) {
                    toast.info(result.recommendations, { duration: 5000 });
                }
            } else {
                toast.error(result.error || 'Failed to search travel options');
            }
        } catch (error) {
            toast.error('Failed to connect to booking service. Make sure the backend is running.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookTravel = (option) => {
        toast.info('Booking functionality coming soon! This will integrate with payment gateway.');
        console.log('Booking travel:', option);
    };

    const getModeIcon = (mode) => {
        switch(mode) {
            case 'flight': return '✈️';
            case 'train': return '🚂';
            case 'bus': return '🚌';
            default: return '🚗';
        }
    };

    return (
        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-8'>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-2xl'>
                        {getModeIcon(selectedMode)}
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold text-slate-900'>Book Travel</h2>
                        <p className='text-sm text-slate-600'>Search flights, trains, or buses for your {noOfDays}-day trip</p>
                    </div>
                </div>

                {/* Backend Status Indicator */}
                <div className='flex items-center gap-2'>
                    <div className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-green-500' : backendStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <span className='text-xs text-slate-600'>
                        {backendStatus === 'online' ? 'AI Service Online' : backendStatus === 'offline' ? 'AI Service Offline' : 'Checking...'}
                    </span>
                </div>
            </div>

            {/* Backend Offline Warning */}
            {backendStatus === 'offline' && (
                <div className='mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                    <div className='flex items-start gap-3'>
                        <svg className='w-5 h-5 text-yellow-600 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                        </svg>
                        <div>
                            <p className='text-sm font-semibold text-yellow-800'>Backend Server Not Running</p>
                            <p className='text-xs text-yellow-700 mt-1'>
                                To use travel booking, start the Python backend server:
                                <code className='block mt-1 bg-yellow-100 px-2 py-1 rounded font-mono text-xs'>cd backend && python app.py</code>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Trip Summary */}
            <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                    <div>
                        <span className='text-slate-600'>Destination:</span>
                        <p className='font-semibold text-slate-900'>{destination}</p>
                    </div>
                    <div>
                        <span className='text-slate-600'>Duration:</span>
                        <p className='font-semibold text-slate-900'>{noOfDays} days</p>
                    </div>
                    <div>
                        <span className='text-slate-600'>Travelers:</span>
                        <p className='font-semibold text-slate-900'>{travelers}</p>
                    </div>
                    <div>
                        <span className='text-slate-600'>Budget:</span>
                        <p className='font-semibold text-slate-900'>{trip?.userSelection?.budget || 'N/A'}</p>
                    </div>
                </div>
                {savedOrigin && savedDepartureDate && (
                    <div className='mt-3 pt-3 border-t border-blue-300'>
                        <p className='text-xs text-blue-700'>
                            ✓ Travel details saved: From <span className='font-semibold'>{savedOrigin}</span> on <span className='font-semibold'>{new Date(savedDepartureDate).toLocaleDateString()}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Travel Mode Selection */}
            <div className='mb-6'>
                <label className='text-sm font-medium text-slate-700 mb-3 block'>Select Travel Mode</label>
                <div className='grid grid-cols-3 gap-3'>
                    {['flight', 'train', 'bus'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setSelectedMode(mode)}
                            className={`p-4 border-2 rounded-xl transition-all duration-200 ${selectedMode === mode
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                                }`}
                        >
                            <div className='text-3xl mb-2'>{getModeIcon(mode)}</div>
                            <div className='font-semibold text-slate-900 capitalize'>{mode}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Form */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <div>
                    <label className='text-sm font-medium text-slate-700 mb-2 block'>
                        From (Origin City) <span className='text-red-500'>*</span>
                    </label>
                    <Input
                        placeholder='e.g., Mumbai, Delhi, Bangalore'
                        value={searchParams.origin}
                        onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                    />
                </div>
                <div>
                    <label className='text-sm font-medium text-slate-700 mb-2 block'>
                        To (Destination) <span className='text-red-500'>*</span>
                    </label>
                    <Input
                        placeholder='Destination city'
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                    />
                </div>
                <div>
                    <label className='text-sm font-medium text-slate-700 mb-2 block'>
                        Departure Date <span className='text-red-500'>*</span>
                    </label>
                    <Input
                        type='date'
                        value={searchParams.departureDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                    />
                </div>
                <div>
                    <label className='text-sm font-medium text-slate-700 mb-2 block'>Number of Passengers</label>
                    <Input
                        type='number'
                        min='1'
                        max='9'
                        value={searchParams.passengers}
                        onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
                    />
                </div>
            </div>

            <Button
                onClick={handleSearch}
                disabled={loading || backendStatus === 'offline'}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
            >
                {loading ? (
                    <div className='flex items-center gap-2'>
                        <AiOutlineLoading3Quarters className='animate-spin' />
                        <span>Searching {selectedMode}s...</span>
                    </div>
                ) : (
                    `Search ${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)}s`
                )}
            </Button>

            {/* Travel Options Results */}
            {travelOptions.length > 0 && (
                <div className='mt-6 space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='font-semibold text-slate-900'>Available Options ({travelOptions.length})</h3>
                        <span className='text-xs text-slate-600'>Powered by Google Gemini AI</span>
                    </div>
                    {travelOptions.map((option, index) => (
                        <div key={index} className='border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all'>
                            <div className='flex flex-col md:flex-row justify-between gap-4'>
                                <div className='flex-1'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <div className='text-2xl'>{getModeIcon(selectedMode)}</div>
                                        <div className='font-semibold text-slate-900 text-lg'>
                                            {option.operator} {option.number}
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${option.stops === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {option.stops === 0 ? 'Direct' : `${option.stops} stop(s)`}
                                        </span>
                                    </div>

                                    <div className='grid grid-cols-2 gap-4 text-sm'>
                                        <div>
                                            <p className='text-slate-500'>Departure</p>
                                            <p className='font-semibold text-slate-900'>{option.departure.location}</p>
                                            <p className='text-slate-600'>{new Date(option.departure.time).toLocaleString('en-IN', {
                                                dateStyle: 'short',
                                                timeStyle: 'short'
                                            })}</p>
                                        </div>
                                        <div>
                                            <p className='text-slate-500'>Arrival</p>
                                            <p className='font-semibold text-slate-900'>{option.arrival.location}</p>
                                            <p className='text-slate-600'>{new Date(option.arrival.time).toLocaleString('en-IN', {
                                                dateStyle: 'short',
                                                timeStyle: 'short'
                                            })}</p>
                                        </div>
                                    </div>

                                    <div className='mt-2 flex items-center gap-4 text-xs text-slate-500'>
                                        <span>Duration: {option.duration}</span>
                                        <span>Class: {option.class}</span>
                                    </div>
                                </div>

                                <div className='flex flex-col items-end justify-between'>
                                    <div className='text-right'>
                                        <div className='text-2xl font-bold text-blue-600'>
                                            ₹{option.price.amount.toLocaleString()}
                                        </div>
                                        <p className='text-xs text-slate-500'>per person</p>
                                    </div>
                                    <Button
                                        onClick={() => handleBookTravel(option)}
                                        className='bg-blue-600 hover:bg-blue-700 text-white'
                                        size='sm'
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results */}
            {!loading && travelOptions.length === 0 && searchParams.origin && (
                <div className='mt-6 text-center py-8 text-slate-500'>
                    <div className='text-6xl mb-4'>{getModeIcon(selectedMode)}</div>
                    <p>No {selectedMode} options found. Try adjusting your search criteria.</p>
                </div>
            )}
        </div>
    );
}

export default TravelBooking;

// // index.jsx

// import { Input } from '@/components/ui/input';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
// import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
// import { Button } from '@/components/ui/button'
// import { toast } from 'sonner';
// import { chatSession } from '@/service/AIModel';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from "@/components/ui/dialog"
// import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { doc, setDoc } from "firebase/firestore";
// import { app, db } from '@/service/firebaseConfig';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom';

// function CreateTrip() {
//   const [place, setPlace] = useState();
//   const [formData, setFormData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const navigate = useNavigate();

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     })
//   }

//   useEffect(() => {
//     console.log(formData)
//   }, [formData])

//   const onGenerateTrip = async () => {
//     const user = localStorage.getItem('user');
//     if (!user) {
//       setOpenDialog(true)
//       return;
//     }

//     if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
//       toast('Please fill all the details before generating your trip!', {
//         description: 'Make sure you\'ve selected destination, duration, budget, and travel companions.',
//       })
//       return;
//     }

//     if (formData?.noOfDays > 10) {
//       toast('Please select a trip duration of 10 days or less', {
//         description: 'For better results, we recommend trips of 10 days or fewer.',
//       })
//       return;
//     }

//     setLoading(true)

//     try {
//       const FINAL_PROMPT = AI_PROMPT
//         .replace('{location}', formData?.location?.label)
//         .replace('{totalDays}', formData?.noOfDays)
//         .replace('{traveler}', formData?.traveler)
//         .replace('{budget}', formData?.budget)
//         .replace('{budget}', formData?.budget)
//         .replace('{totalDays}', formData?.noOfDays)

//       console.log('Generating trip for:', formData);
//       toast('🧠 AI is crafting your perfect itinerary...', {
//         description: 'This may take a few moments. Please wait.',
//       });

//       const result = await chatSession.sendMessage(FINAL_PROMPT);
//       const tripData = result?.response?.text();
      
//       if (!tripData) {
//         throw new Error('No response from AI service');
//       }

//       console.log('AI Response:', tripData);
//       SaveAiTrip(tripData);
//     } catch (error) {
//       console.error('Error generating trip:', error);
//       setLoading(false);
//       toast('Failed to generate trip', {
//         description: 'Please check your internet connection and try again. Make sure all API keys are configured.',
//       });
//     }
//   }

//   const SaveAiTrip = async (TripData) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'))
//       const docId = Date.now().toString();
      
//       console.log('Saving trip to Firebase...');
      
//       // Parse and validate the JSON response
//       let parsedTripData;
//       try {
//         parsedTripData = JSON.parse(TripData);
//       } catch (parseError) {
//         console.error('Failed to parse AI response:', parseError);
//         throw new Error('Invalid response format from AI');
//       }

//       await setDoc(doc(db, "AITrips", docId), {
//         userSelection: formData,
//         tripData: parsedTripData,
//         userEmail: user?.email,
//         id: docId,
//         createdAt: new Date().toISOString()
//       });

//       console.log('Trip saved successfully with ID:', docId);
//       setLoading(false);
      
//       toast('🎉 Your trip has been created!', {
//         description: 'Redirecting to your personalized itinerary...',
//       });
      
//       // Small delay to show the success message
//       setTimeout(() => {
//         navigate('/view-trip/' + docId);
//       }, 1000);
      
//     } catch (error) {
//       console.error('Error saving trip:', error);
//       setLoading(false);
//       toast('Failed to save your trip', {
//         description: 'Please try again. If the problem persists, check your internet connection.',
//       });
//     }
//   }

//   const login = useGoogleLogin({
//     onSuccess: (res) => GetUserProfile(res),
//     onError: (error) => console.log(error)
//   })

//   const GetUserProfile = (tokenInfo) => {
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
//       headers: {
//         Authorization: `Bearer ${tokenInfo.access_token}`,
//         Accept: 'application/json',
//       },
//     }).then((resp) => {
//       console.log(resp);
//       localStorage.setItem('user', JSON.stringify(resp.data));
//       setOpenDialog(false);
//       onGenerateTrip();
//     }).catch((error) => {
//       console.error("Error fetching user profile: ", error);
//     });
//   }

//   return (
//     <div className='relative min-h-screen bg-gradient-to-br from-blue-50/20 via-slate-50 to-blue-50/30'>
//       {/* Professional grid background */}
//       <div className='absolute inset-0 bg-[linear-gradient(to_right,#dbeafe_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20'></div>
      
//       {/* Subtle blue accent elements */}
//       <div className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-blue-200/40 rounded-2xl rotate-12 opacity-40'></div>
//       <div className='absolute top-60 right-20 w-20 h-20 bg-gradient-to-br from-blue-200/40 to-blue-300/50 rounded-xl -rotate-12 opacity-50'></div>
      
//       <div className='relative max-w-5xl mx-auto px-6 py-12'>
//         {/* Professional Header Section */}
//         <div className='text-center mb-16'>
//           <div className='flex items-center justify-center gap-4 mb-8'>
//             <img src="/cerebro-professional.svg" alt="CerebroCraft" className='h-16' />
//           </div>
//           <h1 className='font-bold text-4xl md:text-5xl mb-6 text-slate-900'>
//             AI Travel Planning Console
//           </h1>
//           <p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
//             Configure your travel parameters to generate an optimized itinerary powered by 
//             <span className='text-slate-800 font-semibold'> advanced AI algorithms</span>
//           </p>
//           <div className='w-24 h-0.5 bg-gradient-to-r from-slate-400 to-blue-500 mx-auto mt-6'></div>
//         </div>

//         {/* Professional Progress Indicator */}
//         <div className='mb-12'>
//           <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50'>
//             <div className='flex justify-between items-center mb-4'>
//               {[1, 2, 3, 4].map((step) => (
//                 <div key={step} className='flex items-center flex-1'>
//                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
//                     currentStep >= step 
//                       ? 'bg-slate-900 text-white shadow-sm' 
//                       : 'bg-slate-200 text-slate-500'
//                   }`}>
//                     {step}
//                   </div>
//                   {step < 4 && (
//                     <div className={`flex-1 h-0.5 mx-3 transition-all duration-300 ${
//                       currentStep > step ? 'bg-slate-900' : 'bg-slate-200'
//                     }`}></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className='text-center text-sm text-gray-600'>
//               <span className='font-medium'>Configuration Step {currentStep} of 4:</span>{' '}
//               {
//                 currentStep === 1 ? 'Destination Selection' :
//                 currentStep === 2 ? 'Duration Parameters' :
//                 currentStep === 3 ? 'Budget Configuration' :
//                 'Group Composition'
//               }
//             </div>
//           </div>
//         </div>

//         {/* Professional Form Sections */}
//         <div className='space-y-8 create-trip-form'>
//           {/* Destination Selection */}
//           <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 relative z-40 overflow-visible'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-bold text-gray-900'>Destination</h2>
//                 <p className='text-sm text-gray-600'>Select your target location</p>
//               </div>
//             </div>
//             <div className='relative z-50'>
//               <GooglePlacesAutocomplete
//                 apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//                 selectProps={{
//                   place,
//                   onChange: (v) => { 
//                     setPlace(v); 
//                     handleInputChange('location', v);
//                     if (v && currentStep === 1) setCurrentStep(2);
//                   },
//                   styles: {
//                     control: (provided) => ({
//                       ...provided,
//                       border: '2px solid #e5e7eb',
//                       borderRadius: '12px',
//                       padding: '8px',
//                       fontSize: '16px',
//                       '&:hover': {
//                         borderColor: '#64748b',
//                       },
//                     }),
//                     menu: (provided) => ({
//                       ...provided,
//                       zIndex: 9999,
//                       position: 'absolute',
//                       backgroundColor: 'white',
//                       border: '1px solid #e5e7eb',
//                       borderRadius: '12px',
//                       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//                       marginTop: '4px',
//                     }),
//                     menuList: (provided) => ({
//                       ...provided,
//                       padding: '8px',
//                       maxHeight: '200px',
//                     }),
//                     option: (provided, state) => ({
//                       ...provided,
//                       backgroundColor: state.isFocused ? '#f1f5f9' : 'white',
//                       color: '#334155',
//                       padding: '12px 16px',
//                       borderRadius: '8px',
//                       margin: '2px 0',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         backgroundColor: '#f1f5f9',
//                       },
//                     }),
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           {/* Days Selection */}
//           <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-bold text-gray-900'>Duration</h2>
//                 <p className='text-sm text-gray-600'>Trip length in days (1-10 recommended)</p>
//               </div>
//             </div>
//             <Input 
//               placeholder='Enter number of days' 
//               type='number' 
//               className='text-lg p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300'
//               onChange={(e) => {
//                 handleInputChange('noOfDays', e.target.value);
//                 if (e.target.value && currentStep === 2) setCurrentStep(3);
//               }} 
//             />
//           </div>

//           {/* Budget Selection */}
//           <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-bold text-gray-900'>Budget Range</h2>
//                 <p className='text-sm text-gray-600'>Select your preferred spending range</p>
//               </div>
//             </div>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//               {SelectBudgetOptions.map((item, index) => (
//                 <div key={index}
//                   onClick={() => {
//                     handleInputChange('budget', item.title);
//                     if (currentStep === 3) setCurrentStep(4);
//                   }}
//                   className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
//                     formData?.budget === item.title 
//                       ? 'border-slate-400 bg-slate-50 shadow-md ring-2 ring-slate-200' 
//                       : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
//                   }`}
//                 >
//                   <div className='flex items-start justify-between mb-3'>
//                     <div>
//                       <h3 className='text-lg font-semibold text-slate-800'>{item.title}</h3>
//                       <p className='text-sm text-gray-600 mt-1'>{item.desc}</p>
//                     </div>
//                     <div className='text-2xl opacity-60'>{item.icon}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Travel Companions */}
//           <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-bold text-gray-900'>Travel Group</h2>
//                 <p className='text-sm text-gray-600'>Select your travel companion type</p>
//               </div>
//             </div>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//               {SelectTravelList.map((item, index) => (
//                 <div key={index}
//                   onClick={() => handleInputChange('traveler', item.people)}
//                   className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
//                     formData?.traveler === item.people 
//                       ? 'border-slate-400 bg-slate-50 shadow-md ring-2 ring-slate-200' 
//                       : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
//                   }`}
//                 >
//                   <div className='flex items-start justify-between mb-3'>
//                     <div>
//                       <h3 className='text-lg font-semibold text-slate-800'>{item.title}</h3>
//                       <p className='text-sm text-gray-600 mt-1'>{item.desc}</p>
//                     </div>
//                     <div className='text-2xl opacity-60'>{item.icon}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Professional Generate Button */}
//         <div className='mt-12 text-center'>
//           <Button 
//             disabled={loading} 
//             onClick={onGenerateTrip}
//             className='bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 min-w-[240px] disabled:opacity-60 disabled:cursor-not-allowed'
//           >
//             {loading ? (
//               <div className='flex items-center gap-3'>
//                 <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin' />
//                 <span>Processing Request...</span>
//               </div>
//             ) : (
//               <div className='flex items-center gap-3'>
//                 <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
//                 </svg>
//                 <span>Generate Trip Plan</span>
//               </div>
//             )}
//           </Button>
          
//           {loading && (
//             <div className='mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto'>
//               <div className='flex items-center justify-center gap-3 mb-4'>
//                 <div className='loading-spinner'></div>
//                 <span className='text-gray-700 font-medium'>Crafting your perfect itinerary...</span>
//               </div>
//               <div className='w-full bg-gray-200 rounded-full h-2'>
//                 <div className='bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full animate-pulse' style={{width: '60%'}}></div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Dialog */}
//         <Dialog open={openDialog}>
//           <DialogContent className='bg-white/95 backdrop-blur-md border border-purple-200 shadow-2xl max-w-md'>
//             <DialogHeader>
//               <DialogDescription>
//                 <div className='flex flex-col items-center text-center space-y-6'>
//                   <img src="/cerebro-logo.svg" alt="CerebroCraft Logo" width="180px" className='mx-auto animate-float' />
//                   <div className='space-y-3'>
//                     <h2 className='font-bold text-2xl text-gray-800'>Welcome to CerebroCraft! 🌟</h2>
//                     <p className='text-gray-600 text-lg'>Sign in to unlock your personalized travel planning experience</p>
//                   </div>
//                   <Button
//                     onClick={login}
//                     className="w-full mt-8 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-4 px-6 rounded-full flex gap-4 items-center justify-center font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                     <FcGoogle className="h-7 w-7" />
//                     Continue with Google
//                   </Button>
//                 </div>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// }

// export default CreateTrip



// index.jsx

import { Input } from '@/components/ui/input';
import { AI_PROMPT, BudgetSliderConfig, SelectTravelList, TripThemes } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { generateTravelOptions } from '@/service/FlightService';

// Travel Mode Selector Component
const TravelModeSelector = ({ formData, onSelectTravel }) => {
  const [travelOptions, setTravelOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Get number of travelers
  const getNumberOfTravelers = () => {
    if (formData.numberOfPeople) {
      return parseInt(formData.numberOfPeople);
    }
    // Parse from traveler string
    const travelerStr = formData.traveler || '1';
    if (travelerStr === 'Just Me') return 1;
    if (travelerStr === 'A Couple') return 2;
    return parseInt(travelerStr) || 1;
  };

  useEffect(() => {
    const fetchTravelOptions = async () => {
      if (!formData?.originCity || !formData?.location || !formData?.departureDate) return;
      
      setLoading(true);
      try {
        const options = await generateTravelOptions({
          origin: formData.originCity.label,
          destination: formData.location.label,
          departureDate: formData.departureDate,
          travelers: getNumberOfTravelers()
        });
        setTravelOptions(options);
      } catch (error) {
        console.error('Error fetching travel options:', error);
        toast('Failed to load travel options', {
          description: 'Please try again'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTravelOptions();
  }, [formData?.originCity, formData?.location, formData?.departureDate, formData?.traveler, formData?.numberOfPeople]);

  const handleSelectOption = (mode, option) => {
    const travelers = getNumberOfTravelers();
    const totalCost = option.price * travelers;
    const selectedData = { ...option, mode, totalCost, travelers };
    setSelectedOption(option.id);
    setSelectedMode(mode);
    onSelectTravel(selectedData);
  };

  const getTravelIcon = (mode) => {
    switch(mode) {
      case 'flight': return '✈️';
      case 'train': return '🚆';
      case 'bus': return '🚌';
      default: return '🚗';
    }
  };

  if (loading) {
    return (
      <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg border border-blue-100/50'>
        <div className='flex items-center justify-center gap-3'>
          <AiOutlineLoading3Quarters className='h-6 w-6 animate-spin text-slate-600' />
          <span className='text-slate-600'>Loading travel options...</span>
        </div>
      </div>
    );
  }

  if (!travelOptions) return null;

  const travelers = getNumberOfTravelers();

  return (
    <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
      <div className='flex items-center gap-4 mb-6'>
        <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
          </svg>
        </div>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>Travel Mode</h2>
          <p className='text-sm text-gray-600'>Choose your preferred mode of transport ({travelers} traveler{travelers > 1 ? 's' : ''})</p>
        </div>
      </div>

      <div className='space-y-6'>
        {['flight', 'train', 'bus'].map((mode) => {
          const options = travelOptions[mode];
          if (!options || !Array.isArray(options)) return null;

          return (
            <div key={mode} className='border-2 border-slate-200 rounded-xl p-6 bg-slate-50/50'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='text-3xl'>{getTravelIcon(mode)}</div>
                <h3 className='text-xl font-bold text-gray-900 capitalize'>{mode} Options</h3>
              </div>
              
              <div className='space-y-3'>
                {options.map((option) => {
                  const totalCost = option.price * travelers;
                  const isSelected = selectedOption === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(mode, option)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-white ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className='flex items-center justify-between'>
                        <div>
                          <div className='flex items-center gap-2'>
                            <h4 className='text-lg font-semibold text-slate-800'>{option.name}</h4>
                            <span className='text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded'>{option.class}</span>
                          </div>
                          <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                            <span>🕐 {option.duration}</span>
                            <span>🛫 {option.departure}</span>
                            <span>🛬 {option.arrival}</span>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='text-sm text-gray-600'>₹{option.price.toLocaleString()}/person</div>
                          <div className='text-xl font-bold text-blue-600'>₹{totalCost.toLocaleString()}</div>
                          <div className='text-xs text-slate-500'>for {travelers} traveler{travelers > 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function CreateTrip() {
  const [place, setPlace] = useState();
  const [originPlace, setOriginPlace] = useState();
  const [formData, setFormData] = useState({
    budget: {
      min: BudgetSliderConfig.defaultMin,
      max: BudgetSliderConfig.defaultMax
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [budgetRange, setBudgetRange] = useState({
    min: BudgetSliderConfig.defaultMin,
    max: BudgetSliderConfig.defaultMax
  });

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  useEffect(() => {
    console.log('FormData updated:', {
      ...formData,
      departureDate: formData.departureDate,
      noOfDays: formData.noOfDays
    })
  }, [formData])

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true)
      return;
    }

    // Debug logging to see what's missing
    console.log('Form validation check:', {
      originCity: formData?.originCity,
      location: formData?.location,
      noOfDays: formData?.noOfDays,
      departureDate: formData?.departureDate,
      theme: formData?.theme,
      budgetMin: formData?.budget?.min,
      budgetMax: formData?.budget?.max,
      traveler: formData?.traveler
    });

    if (!formData?.originCity || !formData?.location || !formData?.noOfDays || !formData?.departureDate || !formData?.theme || !formData?.budget?.min || !formData?.budget?.max || !formData?.traveler || !formData?.selectedTravel) {
      // Show which fields are missing
      const missingFields = [];
      if (!formData?.originCity) missingFields.push('Origin City');
      if (!formData?.location) missingFields.push('Destination');
      if (!formData?.noOfDays) missingFields.push('Number of Days');
      if (!formData?.departureDate) missingFields.push('Departure Date');
      if (!formData?.theme) missingFields.push('Theme');
      if (!formData?.budget?.min || !formData?.budget?.max) missingFields.push('Budget');
      if (!formData?.traveler) missingFields.push('Travel Group');
      if (!formData?.selectedTravel) missingFields.push('Travel Mode');
      
      toast('Please fill all the details before generating your trip!', {
        description: `Missing: ${missingFields.join(', ')}`,
      })
      return;
    }

    if (formData?.noOfDays > 10) {
      toast('Please select a trip duration of 10 days or less', {
        description: 'For better results, we recommend trips of 10 days or fewer.',
      })
      return;
    }

    setLoading(true)

    try {
      // Find the selected theme details
      const selectedTheme = TripThemes.find(t => t.value === formData?.theme);
      const themeTitle = selectedTheme ? selectedTheme.title : 'General';
      const themeKeywords = formData?.themeKeywords || 'general sightseeing, popular attractions';

      const FINAL_PROMPT = AI_PROMPT
        .replace(/{location}/g, formData?.location?.label)
        .replace(/{totalDays}/g, formData?.noOfDays)
        .replace(/{traveler}/g, formData?.traveler)
        .replace(/{budget}/g, `${BudgetSliderConfig.currency}${formData?.budget?.min?.toLocaleString()} - ${BudgetSliderConfig.currency}${formData?.budget?.max?.toLocaleString()}`)
        .replace(/{theme}/g, themeTitle)
        .replace(/{themeKeywords}/g, themeKeywords)

      console.log('Generating trip for:', formData);
      console.log('Final AI Prompt:', FINAL_PROMPT);
      toast('🧠 AI is crafting your perfect itinerary...', {
        description: 'This may take a few moments. Please wait.',
      });

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = result?.response?.text();
      
      if (!tripData) {
        throw new Error('No response from AI service');
      }

      console.log('AI Response:', tripData);
      SaveAiTrip(tripData);
    } catch (error) {
      console.error('Error generating trip:', error);
      setLoading(false);
      toast('Failed to generate trip', {
        description: 'Please check your internet connection and try again. Make sure all API keys are configured.',
      });
    }
  }

  // const SaveAiTrip = async (TripData) => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem('user'))
  //     const docId = Date.now().toString();
      
  //     console.log('Saving trip to Firebase...');
  //     console.log('Raw AI Response:', TripData);
      
  //     // Parse and validate the JSON response
  //     let parsedTripData;
  //     try {
  //       // Clean the response - remove any markdown formatting or extra text
  //       let cleanedData = TripData;
        
  //       // Remove markdown code blocks if present
  //       cleanedData = cleanedData.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        
  //       // Find the JSON part if there's extra text
  //       const jsonStart = cleanedData.indexOf('{');
  //       const jsonEnd = cleanedData.lastIndexOf('}');
        
  //       if (jsonStart !== -1 && jsonEnd !== -1) {
  //         cleanedData = cleanedData.substring(jsonStart, jsonEnd + 1);
  //       }
        
  //       parsedTripData = JSON.parse(cleanedData);
        
  //       console.log('Initial parsed data:', parsedTripData);
        
  //       // Validate and transform the structure to match expected format
  //       let finalItinerary = [];
  //       let finalHotels = [];
        
  //       // Handle different itinerary formats
  //       if (parsedTripData.itinerary) {
  //         if (Array.isArray(parsedTripData.itinerary)) {
  //           // Already in correct format
  //           finalItinerary = parsedTripData.itinerary;
  //         } else if (parsedTripData.itinerary.daily_plan && Array.isArray(parsedTripData.itinerary.daily_plan)) {
  //           // Format: {itinerary: {daily_plan: [...]}}
  //           finalItinerary = parsedTripData.itinerary.daily_plan;
  //         } else if (typeof parsedTripData.itinerary === 'object') {
  //           // Try to extract array from any nested structure
  //           const potentialArrays = Object.values(parsedTripData.itinerary).filter(Array.isArray);
  //           if (potentialArrays.length > 0) {
  //             finalItinerary = potentialArrays[0];
  //           }
  //         }
  //       }
        
  //       // Handle different hotel formats  
  //       if (parsedTripData.recommended_hotels && Array.isArray(parsedTripData.recommended_hotels)) {
  //         finalHotels = parsedTripData.recommended_hotels;
  //       } else if (parsedTripData.hotels && Array.isArray(parsedTripData.hotels)) {
  //         finalHotels = parsedTripData.hotels;
  //       } else if (parsedTripData.hotel_options && Array.isArray(parsedTripData.hotel_options)) {
  //         finalHotels = parsedTripData.hotel_options;
  //       } else if (parsedTripData.recommended_hotel) {
  //         // Handle single hotel object
  //         finalHotels = [parsedTripData.recommended_hotel];
  //       }
        
  //       // Create the final normalized structure
  //       parsedTripData = {
  //         ...parsedTripData,
  //         itinerary: finalItinerary,
  //         hotels: finalHotels,
  //         recommended_hotels: finalHotels, // Add this for backward compatibility
  //         recommended_hotel: finalHotels.length > 0 ? finalHotels[0] : null // Add this for backward compatibility
  //       };
        
  //       console.log('Final normalized data:', parsedTripData);
        
  //     } catch (parseError) {
  //       console.error('Failed to parse AI response:', parseError);
  //       console.log('Problematic response:', TripData);
        
  //       // Create a fallback structure
  //       parsedTripData = {
  //         hotels: [],
  //         itinerary: [],
  //         rawResponse: TripData,
  //         parseError: parseError.message
  //       };
        
  //       toast('AI response received but may have formatting issues', {
  //         description: 'Your trip has been saved, but some data might need manual review.',
  //       });
  //     }

  //           const computeCostEstimates = async () => {
  //       try {
  //         const travelers = parseInt(formData.numberOfPeople) || (formData.traveler === 'A Couple' ? 2 : (formData.traveler === 'Just Me' ? 1 : 1));
  //         const days = parseInt(formData.noOfDays) || 1;

  //         // Include selected travel cost in the prompt
  //         const selectedTravelCost = formData?.selectedTravel?.totalCost || 0;
  //         const prompt = `You are given a travel itinerary JSON and the user's selections. Using the itinerary and user selections, produce a realistic cost estimate in INR that is consistent with the user's budget range, number of days (${days}), number of travelers (${travelers}), and destination (${formData?.location?.label || formData.location || 'unknown'}). The user has already selected their travel mode (${formData?.selectedTravel?.mode || 'unknown'}) with a total cost of ₹${selectedTravelCost}. Respond ONLY in JSON with this shape:\n\n{\n  "market_price": {"min": <number>, "max": <number>, "currency": "INR"},\n  "ai_optimized_price": {"amount": <number>, "currency": "INR"},\n  "per_day_range": {"min": <number>, "max": <number>},\n  "per_person_total": {"amount": <number>},\n  "breakdown": {\n    "hotel": <number>,\n    "primary_transport": <number>,\n    "local_transport": <number>,\n    "food": <number>,\n    "activities": <number>\n  }\n}\n\nGuidelines:\n- IMPORTANT: The primary_transport cost MUST be exactly ${selectedTravelCost} to match the user's selected travel mode cost.\n- The local_transport cost should be estimated based on the itinerary locations, local taxi/bus/auto fares, and number of days.\n- For ${formData?.location?.label || 'the destination'}, estimate daily local transport costs considering:\n  * Distances between attractions in the itinerary\n  * Local transport options (taxi, auto, bus, etc.)\n  * Number of days (${days})\n  * Number of travelers (${travelers})\n- Ensure numbers are integers (no commas) and totals are internally consistent (breakdown sums approximately equal totals).\n- Base hotel/food/activities numbers on values found in the itinerary/hotels if available; otherwise infer sensible values for the destination and days.\n- Ensure the market price range aligns with the user's selected budget range (${formData?.budget?.min} - ${formData?.budget?.max}); do not produce totals wildly outside the budget.\n- AI optimized price should be a realistic total that includes both transport costs plus optimized costs for hotel, food, and activities.\n\nHere is the parsed tripData JSON:\n` + JSON.stringify(parsedTripData) + `\n\nHere is the user's selection JSON:\n` + JSON.stringify({ travelers, days, budget: formData?.budget, selectedTravel: formData?.selectedTravel }) + `\n`;

  //         const result = await chatSession.sendMessage(prompt);
  //         const text = result?.response?.text();
  //         if (!text) throw new Error('No response from Gemini for cost estimates');

  //         // Clean and parse the response
  //         let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  //         const start = cleaned.indexOf('{');
  //         const end = cleaned.lastIndexOf('}');
  //         if (start !== -1 && end !== -1) cleaned = cleaned.substring(start, end + 1);

  //         const estimates = JSON.parse(cleaned);
  //         return estimates;
  //       } catch (err) {
  //         console.warn('Gemini cost estimation failed, falling back to heuristic:', err);

  //         // Fallback deterministic estimate based on budget / days / travelers
  //         const travelers = parseInt(formData.numberOfPeople) || (formData.traveler === 'A Couple' ? 2 : (formData.traveler === 'Just Me' ? 1 : 1));
  //         const days = parseInt(formData.noOfDays) || 1;
  //         const budgetMin = formData?.budget?.min || BudgetSliderConfig.defaultMin;
  //         const budgetMax = formData?.budget?.max || BudgetSliderConfig.defaultMax;

  //         const perPersonPerDayMin = Math.max(300, Math.floor(budgetMin / (travelers * days)));
  //         const perPersonPerDayMax = Math.max(perPersonPerDayMin + 200, Math.ceil(budgetMax / (travelers * days)));

  //         const market_min = Math.max(1000, budgetMin);
  //         const market_max = Math.max(market_min + 500, budgetMax);
  //         const marketAvg = Math.round((market_min + market_max) / 2);
  //         const aiOpt = Math.round(marketAvg * 0.88); // ~12% savings

  //         const breakdown = {
  //           hotel: Math.round(marketAvg * 0.5),
  //           transport: Math.round(marketAvg * 0.2),
  //           food: Math.round(marketAvg * 0.2),
  //           activities: Math.round(marketAvg * 0.1)
  //         };

  //         return {
  //           market_price: { min: market_min, max: market_max, currency: 'INR' },
  //           ai_optimized_price: { amount: aiOpt, currency: 'INR' },
  //           per_day_range: { min: perPersonPerDayMin * travelers, max: perPersonPerDayMax * travelers },
  //           per_person_total: { amount: Math.round((perPersonPerDayMin + perPersonPerDayMax) / 2 * days) },
  //           breakdown
  //         };
  //       }
  //     };

  //     // compute estimates and merge into trip data
  //     const estimates = await computeCostEstimates();
  //     if (estimates) {
  //       // attach estimates in a stable location
  //       parsedTripData.cost_estimates = estimates;

  //       // also ensure cost_breakdown.grand_total exists for backward compatibility
  //       if (!parsedTripData.cost_breakdown) parsedTripData.cost_breakdown = {};
  //       // prefer AI optimized amount as displayed total, fallback to market avg
  //       const displayTotal = estimates.ai_optimized_price?.amount || Math.round(((estimates.market_price?.min || 0) + (estimates.market_price?.max || 0)) / 2);
  //       parsedTripData.cost_breakdown.grand_total = `₹${displayTotal}`;
  //     }

  //     await setDoc(doc(db, "AITrips", docId), {
  //       userSelection: {
  //         ...formData,
  //         // Convert budget object to string for display
  //         budget: formData.budget ? `${BudgetSliderConfig.currency}${formData.budget.min?.toLocaleString()} - ${BudgetSliderConfig.currency}${formData.budget.max?.toLocaleString()}` : 'Not specified'
  //       },
  //       tripData: parsedTripData,
  //       userEmail: user?.email,
  //       id: docId,
  //       createdAt: new Date().toISOString()
  //     });

  //     console.log('Trip saved successfully with ID:', docId);
  //     setLoading(false);
      
  //     toast('🎉 Your trip has been created!', {
  //       description: 'Redirecting to your personalized itinerary...',
  //     });
      
  //     // Small delay to show the success message
  //     setTimeout(() => {
  //       navigate('/view-trip/' + docId);
  //     }, 1000);
      
  //   } catch (error) {
  //     console.error('Error saving trip:', error);
  //     setLoading(false);
  //     toast('Failed to save your trip', {
  //       description: 'Please try again. If the problem persists, check your internet connection.',
  //     });
  //   }
  // }

  const SaveAiTrip = async (TripData) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString();
    
    console.log('Saving trip to Firebase...');
    console.log('Raw AI Response:', TripData);
    
    // Parse and validate the JSON response
    let parsedTripData;
    try {
      // Clean the response - remove any markdown formatting or extra text
      let cleanedData = TripData;
      
      // Remove markdown code blocks if present
      cleanedData = cleanedData.replace(/``````\n?/g, '');
      
      // Find the JSON part if there's extra text
      const jsonStart = cleanedData.indexOf('{');
      const jsonEnd = cleanedData.lastIndexOf('}');
      
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanedData = cleanedData.substring(jsonStart, jsonEnd + 1);
      }
      
      parsedTripData = JSON.parse(cleanedData);
      
      console.log('Initial parsed data:', parsedTripData);
      
      // Validate and transform the structure to match expected format
      let finalItinerary = [];
      let finalHotels = [];
      
      // Handle different itinerary formats
      if (parsedTripData.itinerary) {
        if (Array.isArray(parsedTripData.itinerary)) {
          // Already in correct format
          finalItinerary = parsedTripData.itinerary;
        } else if (parsedTripData.itinerary.daily_plan && Array.isArray(parsedTripData.itinerary.daily_plan)) {
          // Format: {itinerary: {daily_plan: [...]}}
          finalItinerary = parsedTripData.itinerary.daily_plan;
        } else if (typeof parsedTripData.itinerary === 'object') {
          // Try to extract array from any nested structure
          const potentialArrays = Object.values(parsedTripData.itinerary).filter(Array.isArray);
          if (potentialArrays.length > 0) {
            finalItinerary = potentialArrays[0];
          }
        }
      }
      
      // Handle different hotel formats  
      if (parsedTripData.recommended_hotels && Array.isArray(parsedTripData.recommended_hotels)) {
        finalHotels = parsedTripData.recommended_hotels;
      } else if (parsedTripData.hotels && Array.isArray(parsedTripData.hotels)) {
        finalHotels = parsedTripData.hotels;
      } else if (parsedTripData.hotel_options && Array.isArray(parsedTripData.hotel_options)) {
        finalHotels = parsedTripData.hotel_options;
      } else if (parsedTripData.recommended_hotel) {
        // Handle single hotel object
        finalHotels = [parsedTripData.recommended_hotel];
      }
      
      // Create the final normalized structure
      parsedTripData = {
        ...parsedTripData,
        itinerary: finalItinerary,
        hotels: finalHotels,
        recommended_hotels: finalHotels, // Add this for backward compatibility
        recommended_hotel: finalHotels.length > 0 ? finalHotels[0] : null // Add this for backward compatibility
      };
      
      console.log('Final normalized data:', parsedTripData);
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Problematic response:', TripData);
      
      // Create a fallback structure
      parsedTripData = {
        hotels: [],
        itinerary: [],
        rawResponse: TripData,
        parseError: parseError.message
      };
      
      toast('AI response received but may have formatting issues', {
        description: 'Your trip has been saved, but some data might need manual review.',
      });
    }

    const computeCostEstimates = async () => {
      try {
        const travelers = parseInt(formData.numberOfPeople) || (formData.traveler === 'A Couple' ? 2 : (formData.traveler === 'Just Me' ? 1 : 1));
        const days = parseInt(formData.noOfDays) || 1;

        // Include selected travel cost in the prompt
        const selectedTravelCost = formData?.selectedTravel?.totalCost || 0;
        const prompt = `You are given a travel itinerary JSON and the user's selections. Using the itinerary and user selections, produce a realistic cost estimate in INR that is consistent with the user's budget range, number of days (${days}), number of travelers (${travelers}), and destination (${formData?.location?.label || formData.location || 'unknown'}). The user has already selected their travel mode (${formData?.selectedTravel?.mode || 'unknown'}) with a total cost of ₹${selectedTravelCost}. Respond ONLY in JSON with this shape:\n\n{\n  "market_price": {"min": <number>, "max": <number>, "currency": "INR"},\n  "ai_optimized_price": {"amount": <number>, "currency": "INR"},\n  "per_day_range": {"min": <number>, "max": <number>},\n  "per_person_total": {"amount": <number>},\n  "breakdown": {\n    "hotel": <number>,\n    "primary_transport": <number>,\n    "local_transport": <number>,\n    "food": <number>,\n    "activities": <number>\n  }\n}\n\nGuidelines:\n- IMPORTANT: The primary_transport cost MUST be exactly ${selectedTravelCost} to match the user's selected travel mode cost.\n- The local_transport cost should be estimated based on the itinerary locations, local taxi/bus/auto fares, and number of days.\n- For ${formData?.location?.label || 'the destination'}, estimate daily local transport costs considering:\n  * Distances between attractions in the itinerary\n  * Local transport options (taxi, auto, bus, etc.)\n  * Number of days (${days})\n  * Number of travelers (${travelers})\n- Ensure numbers are integers (no commas) and totals are internally consistent (breakdown sums approximately equal totals).\n- Base hotel/food/activities numbers on values found in the itinerary/hotels if available; otherwise infer sensible values for the destination and days.\n- Ensure the market price range aligns with the user's selected budget range (${formData?.budget?.min} - ${formData?.budget?.max}); do not produce totals wildly outside the budget.\n- AI optimized price should be a realistic total that includes both transport costs plus optimized costs for hotel, food, and activities.\n\nHere is the parsed tripData JSON:\n` + JSON.stringify(parsedTripData) + `\n\nHere is the user's selection JSON:\n` + JSON.stringify({ travelers, days, budget: formData?.budget, selectedTravel: formData?.selectedTravel }) + `\n`;

        const result = await chatSession.sendMessage(prompt);
        const text = result?.response?.text();
        if (!text) throw new Error('No response from Gemini for cost estimates');

        // Clean and parse the response
        let cleaned = text.replace(/``````\n?/g, '').trim();
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start !== -1 && end !== -1) cleaned = cleaned.substring(start, end + 1);

        const estimates = JSON.parse(cleaned);
        return estimates;
      } catch (err) {
        console.warn('Gemini cost estimation failed, falling back to heuristic:', err);

        // Fallback deterministic estimate based on budget / days / travelers
        const travelers = parseInt(formData.numberOfPeople) || (formData.traveler === 'A Couple' ? 2 : (formData.traveler === 'Just Me' ? 1 : 1));
        const days = parseInt(formData.noOfDays) || 1;
        const budgetMin = formData?.budget?.min || BudgetSliderConfig.defaultMin;
        const budgetMax = formData?.budget?.max || BudgetSliderConfig.defaultMax;

        const perPersonPerDayMin = Math.max(300, Math.floor(budgetMin / (travelers * days)));
        const perPersonPerDayMax = Math.max(perPersonPerDayMin + 200, Math.ceil(budgetMax / (travelers * days)));

        const market_min = Math.max(1000, budgetMin);
        const market_max = Math.max(market_min + 500, budgetMax);
        const marketAvg = Math.round((market_min + market_max) / 2);
        const aiOpt = Math.round(marketAvg * 0.88); // ~12% savings

        const breakdown = {
          hotel: Math.round(marketAvg * 0.5),
          transport: Math.round(marketAvg * 0.2),
          food: Math.round(marketAvg * 0.2),
          activities: Math.round(marketAvg * 0.1)
        };

        return {
          market_price: { min: market_min, max: market_max, currency: 'INR' },
          ai_optimized_price: { amount: aiOpt, currency: 'INR' },
          per_day_range: { min: perPersonPerDayMin * travelers, max: perPersonPerDayMax * travelers },
          per_person_total: { amount: Math.round((perPersonPerDayMin + perPersonPerDayMax) / 2 * days) },
          breakdown
        };
      }
    };

    // compute estimates and merge into trip data
    const estimates = await computeCostEstimates();
    if (estimates) {
      // attach estimates in a stable location
      parsedTripData.cost_estimates = estimates;

      // also ensure cost_breakdown.grand_total exists for backward compatibility
      if (!parsedTripData.cost_breakdown) parsedTripData.cost_breakdown = {};
      // prefer AI optimized amount as displayed total, fallback to market avg
      const displayTotal = estimates.ai_optimized_price?.amount || Math.round(((estimates.market_price?.min || 0) + (estimates.market_price?.max || 0)) / 2);
      parsedTripData.cost_breakdown.grand_total = `₹${displayTotal}`;
    }

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: {
        ...formData,
        // Convert budget object to string for display
        budget: formData.budget ? `${BudgetSliderConfig.currency}${formData.budget.min?.toLocaleString()} - ${BudgetSliderConfig.currency}${formData.budget.max?.toLocaleString()}` : 'Not specified'
      },
      tripData: parsedTripData,
      userEmail: user?.email,
      id: docId,
      createdAt: new Date().toISOString()
    });

    console.log('Trip saved successfully with ID:', docId);
    
    // 🆕 NEW: Send email notification to user
    try {
      console.log('🔄 Sending itinerary email to backend...');
      
      // Format dates properly
      const startDate = formData?.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : null;
      const endDate = formData?.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : null;
      
      // Get cost estimates
      const budgetAmount = estimates?.ai_optimized_price?.amount || 
                          estimates?.market_price?.max || 
                          formData?.budget?.max;
      
      const emailPayload = {
        userEmail: user?.email,
        userName: user?.name || user?.given_name || 'Traveler',
        destination: formData?.location?.label || 'Your Destination',
        startDate: startDate,  // Properly formatted date
        endDate: endDate,      // Properly formatted date
        noOfDays: formData?.noOfDays,
        budget: budgetAmount,  // AI optimized price, NOT market price
        costEstimates: estimates,  // Send full estimates object
        hotels: parsedTripData?.hotels || [],
        itinerary: parsedTripData?.itinerary || [],
        aiItineraryRaw: TripData,  // Full raw itinerary
        tripId: docId
      };
      
      console.log('📧 Email Payload:', emailPayload);
      
      const emailResponse = await fetch('http://localhost:5000/api/send-itinerary-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload)
      });
      
      const emailResult = await emailResponse.json();
      
      if (emailResponse.ok) {
        console.log('✅ Email sent successfully!');
        toast.success('📧 Confirmation email sent to ' + user?.email);
      } else {
        console.warn('⚠️ Email API returned error:', emailResult);
        toast.warning('Email sending encountered an issue');
      }
      
    } catch (emailError) {
      console.error('❌ Email sending failed with error:', emailError);
      toast.error('Email notification failed');
    }
    // 🆕 END OF NEW CODE
    
    setLoading(false);
    
    toast('🎉 Your trip has been created!', {
      description: 'Redirecting to your personalized itinerary...',
    });
    
    // Small delay to show the success message
    setTimeout(() => {
      navigate('/view-trip/' + docId);
    }, 1000);
    
  } catch (error) {
    console.error('Error saving trip:', error);
    setLoading(false);
    toast('Failed to save your trip', {
      description: 'Please try again. If the problem persists, check your internet connection.',
    });
  }
}


  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  const handleBudgetChange = (type, value) => {
    const newRange = { ...budgetRange, [type]: parseInt(value) };
    
    // Ensure min is always less than max
    if (type === 'min' && newRange.min >= newRange.max) {
      newRange.min = newRange.max - BudgetSliderConfig.step;
    }
    if (type === 'max' && newRange.max <= newRange.min) {
      newRange.max = newRange.min + BudgetSliderConfig.step;
    }
    
    setBudgetRange(newRange);
    handleInputChange('budget', newRange);
    // Progress to next step automatically since budget is always valid
    if (currentStep === 5) setCurrentStep(6);
  };

  const formatBudget = (value) => {
    if (!value || isNaN(value)) return `${BudgetSliderConfig.currency}0`;
    return `${BudgetSliderConfig.currency}${parseInt(value).toLocaleString()}`;
  };

  const formatBudgetRange = (min, max) => {
    const minValue = min || BudgetSliderConfig.defaultMin;
    const maxValue = max || BudgetSliderConfig.defaultMax;
    return `${formatBudget(minValue)} - ${formatBudget(maxValue)}`;
  };

  return (
    <div className='relative min-h-screen bg-white'>
      {/* EaseMyTrip Style Header Banner */}
      <div className='bg-gradient-to-r from-[#2276E3] to-[#1565C0] text-white py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          {/* Back Button */}
          <div className='flex items-center gap-2 mb-6'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
              </svg>
              <span className='font-semibold'>Back</span>
            </button>
          </div>

          <div className='text-center'>
            <h1 className='font-bold text-4xl md:text-5xl mb-4'>
              Plan Your Perfect Trip
            </h1>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
              Tell us your preferences and let AI create your personalized itinerary
            </p>
          </div>
        </div>
      </div>
      
      <div className='relative max-w-6xl mx-auto px-4 py-8'>
        {/* EaseMyTrip Style Progress Steps */}
        <div className='mb-10'>
          <div className='bg-white rounded-lg p-6 shadow-md border-2 border-gray-200'>
            <div className='flex justify-between items-center mb-4'>
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div key={step} className='flex items-center flex-1'>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    currentStep >= step 
                      ? 'bg-[#2276E3] text-white shadow-md scale-110' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 7 && (
                    <div className={`flex-1 h-1 mx-3 transition-all duration-300 ${
                      currentStep > step ? 'bg-[#2276E3]' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className='text-center text-sm text-gray-700'>
              <span className='font-bold'>Step {currentStep} of 7:</span>{' '}
              {
                currentStep === 1 ? 'Origin Selection' :
                currentStep === 2 ? 'Destination Selection' :
                currentStep === 3 ? 'Duration & Dates' :
                currentStep === 4 ? 'Theme Selection' :
                currentStep === 5 ? 'Budget Configuration' :
                currentStep === 6 ? 'Group Composition' :
                'Travel Mode Selection'
              }
            </div>
          </div>
        </div>

        {/* EaseMyTrip Style Form Sections */}
        <div className='space-y-6 create-trip-form'>
          {/* Origin Selection */}
          <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 relative z-50 overflow-visible'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Starting From</h2>
                <p className='text-sm text-gray-600'>Where will you start your journey?</p>
              </div>
            </div>
            <div className='relative z-50'>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  originPlace,
                  onChange: (v) => { 
                    setOriginPlace(v); 
                    handleInputChange('originCity', v);
                    if (v && currentStep === 1) setCurrentStep(2);
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '8px',
                      fontSize: '16px',
                      '&:hover': {
                        borderColor: '#64748b',
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                      position: 'absolute',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      marginTop: '4px',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: '8px',
                      maxHeight: '200px',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#f1f5f9' : 'white',
                      color: '#334155',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      margin: '2px 0',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f1f5f9',
                      },
                    }),
                  },
                }}
              />
            </div>
          </div>

          {/* Destination Selection */}
          <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 relative z-40 overflow-visible'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-[#D32F2F] rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Destination</h2>
                <p className='text-sm text-gray-600'>Where do you want to go?</p>
              </div>
            </div>
            <div className='relative z-50'>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => { 
                    setPlace(v); 
                    handleInputChange('location', v);
                    if (v && currentStep === 2) setCurrentStep(3);
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '8px',
                      fontSize: '16px',
                      '&:hover': {
                        borderColor: '#64748b',
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                      position: 'absolute',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      marginTop: '4px',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: '8px',
                      maxHeight: '200px',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#f1f5f9' : 'white',
                      color: '#334155',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      margin: '2px 0',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f1f5f9',
                      },
                    }),
                  },
                }}
              />
            </div>
          </div>

          {/* Days Selection */}
          <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Duration & Travel Dates</h2>
                <p className='text-sm text-gray-600'>Trip length and when you're traveling</p>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-700 mb-2 block'>Number of Days</label>
                <input 
                  placeholder='Enter number of days' 
                  type='number'
                  value={formData.noOfDays || ''}
                  className='w-full text-lg p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-white'
                  onChange={(e) => {
                    console.log('Number of days changed:', e.target.value);
                    handleInputChange('noOfDays', e.target.value);
                  }} 
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium text-slate-700 mb-2 block'>Departure Date</label>
                  <input 
                    type='date'
                    value={formData.departureDate || ''}
                    min={new Date().toISOString().split('T')[0]}
                    className='w-full text-lg p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-white'
                    onChange={(e) => {
                      console.log('Departure date changed:', e.target.value);
                      handleInputChange('departureDate', e.target.value);
                      // Auto-calculate return date
                      if (e.target.value && formData.noOfDays) {
                        const depDate = new Date(e.target.value);
                        const retDate = new Date(depDate);
                        retDate.setDate(depDate.getDate() + parseInt(formData.noOfDays));
                        handleInputChange('returnDate', retDate.toISOString().split('T')[0]);
                      }
                      if (e.target.value && currentStep === 3) setCurrentStep(4);
                    }} 
                  />
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-700 mb-2 block'>Return Date (Auto-calculated)</label>
                  <input 
                    type='date'
                    value={formData.returnDate || ''}
                    min={formData.departureDate || new Date().toISOString().split('T')[0]}
                    className='w-full text-lg p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-slate-50'
                    readOnly
                  />
                  <p className='text-xs text-slate-500 mt-1'>Automatically calculated from trip duration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Trip Theme</h2>
                <p className='text-sm text-gray-600'>Choose your travel experience focus</p>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {TripThemes.map((theme, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      theme: theme.value,
                      themeKeywords: theme.keywords
                    });
                    if (currentStep === 4) setCurrentStep(5);
                  }}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    formData?.theme === theme.value 
                      ? 'border-slate-400 bg-slate-50 shadow-md ring-2 ring-slate-200' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='text-lg font-semibold text-slate-800'>{theme.title}</h3>
                      <p className='text-sm text-gray-600 mt-1'>{theme.desc}</p>
                    </div>
                    <div className='text-2xl opacity-60'>{theme.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Selection - Updated with Slider */}
          <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Budget Range</h2>
                <p className='text-sm text-gray-600'>Set your total trip budget</p>
              </div>
            </div>
            
            <div className='space-y-6'>
              {/* Budget Display */}
              <div className='text-center'>
                <div className='text-3xl font-bold text-slate-800 mb-2'>
                  {formatBudgetRange(budgetRange?.min, budgetRange?.max)}
                </div>
                <p className='text-sm text-gray-600'>Budget range for entire trip</p>
              </div>

              {/* Dual Range Slider with Buttons */}
              <div className='relative px-4'>
                <div className='relative'>
                  {/* Background track */}
                  <div className='w-full h-3 bg-slate-200 rounded-xl'></div>
                  
                  {/* Active range track */}
                  <div 
                    className='absolute top-0 h-3 bg-slate-900 rounded-xl'
                    style={{
                      left: `${((budgetRange?.min || BudgetSliderConfig.defaultMin) - BudgetSliderConfig.min) / (BudgetSliderConfig.max - BudgetSliderConfig.min) * 100}%`,
                      width: `${((budgetRange?.max || BudgetSliderConfig.defaultMax) - (budgetRange?.min || BudgetSliderConfig.defaultMin)) / (BudgetSliderConfig.max - BudgetSliderConfig.min) * 100}%`
                    }}
                  ></div>
                  
                  {/* Min value slider */}
                  <input
                    type='range'
                    min={BudgetSliderConfig.min}
                    max={BudgetSliderConfig.max}
                    step={BudgetSliderConfig.step}
                    value={budgetRange?.min || BudgetSliderConfig.defaultMin}
                    onChange={(e) => handleBudgetChange('min', e.target.value)}
                    className='absolute top-0 w-full h-3 appearance-none bg-transparent cursor-pointer range-slider'
                  />
                  
                  {/* Max value slider */}
                  <input
                    type='range'
                    min={BudgetSliderConfig.min}
                    max={BudgetSliderConfig.max}
                    step={BudgetSliderConfig.step}
                    value={budgetRange?.max || BudgetSliderConfig.defaultMax}
                    onChange={(e) => handleBudgetChange('max', e.target.value)}
                    className='absolute top-0 w-full h-3 appearance-none bg-transparent cursor-pointer range-slider'
                  />
                </div>
                
                {/* Value indicators with +/- buttons */}
                <div className='flex justify-between items-center mt-4'>
                  <div className='text-center'>
                    <div className='text-sm font-medium text-slate-700 mb-2'>Min Budget</div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleBudgetChange('min', Math.max(BudgetSliderConfig.min, (budgetRange?.min || BudgetSliderConfig.defaultMin) - BudgetSliderConfig.step))}
                        className='w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg flex items-center justify-center font-semibold transition-all duration-200'
                      >
                        -
                      </button>
                      <div className='text-lg font-bold text-slate-800 min-w-[100px]'>{formatBudget(budgetRange?.min)}</div>
                      <button
                        onClick={() => handleBudgetChange('min', Math.min((budgetRange?.max || BudgetSliderConfig.defaultMax) - BudgetSliderConfig.step, (budgetRange?.min || BudgetSliderConfig.defaultMin) + BudgetSliderConfig.step))}
                        className='w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg flex items-center justify-center font-semibold transition-all duration-200'
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-sm font-medium text-slate-700 mb-2'>Max Budget</div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleBudgetChange('max', Math.max((budgetRange?.min || BudgetSliderConfig.defaultMin) + BudgetSliderConfig.step, (budgetRange?.max || BudgetSliderConfig.defaultMax) - BudgetSliderConfig.step))}
                        className='w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg flex items-center justify-center font-semibold transition-all duration-200'
                      >
                        -
                      </button>
                      <div className='text-lg font-bold text-slate-800 min-w-[100px]'>{formatBudget(budgetRange?.max)}</div>
                      <button
                        onClick={() => handleBudgetChange('max', Math.min(BudgetSliderConfig.max, (budgetRange?.max || BudgetSliderConfig.defaultMax) + BudgetSliderConfig.step))}
                        className='w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg flex items-center justify-center font-semibold transition-all duration-200'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Range Labels */}
                <div className='flex justify-between text-sm text-slate-500 mt-4'>
                  <span>{formatBudget(BudgetSliderConfig.min)}</span>
                  <span>{formatBudget(BudgetSliderConfig.max)}</span>
                </div>
              </div>
            </div>

            <style jsx>{`
              .range-slider::-webkit-slider-thumb {
                appearance: none;
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background: #1e293b;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                border: 3px solid #ffffff;
                transition: all 0.2s ease-in-out;
                position: relative;
                z-index: 10;
              }
              
              .range-slider::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
              }
              
              .range-slider::-moz-range-thumb {
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background: #1e293b;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                border: 3px solid #ffffff;
                transition: all 0.2s ease-in-out;
                z-index: 10;
              }
              
              .range-slider::-moz-range-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
              }
              
              .range-slider::-webkit-slider-track {
                background: transparent;
              }
              
              .range-slider::-moz-range-track {
                background: transparent;
              }
            `}</style>
          </div>

          {/* Travel Companions */}
          <div className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-[#2276E3] rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Travel Group</h2>
                <p className='text-sm text-gray-600'>Select your travel companion type</p>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {SelectTravelList.map((item, index) => (
                <div key={index}
                  onClick={() => {
                    handleInputChange('traveler', item.people);
                    // Don't auto-progress if Family or Friends (need to enter number)
                    if (item.people !== '3-5 People' && item.people !== '5+ People' && currentStep === 6) {
                      setCurrentStep(7);
                    }
                  }}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    formData?.traveler === item.people 
                      ? 'border-slate-400 bg-slate-50 shadow-md ring-2 ring-slate-200' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='text-lg font-semibold text-slate-800'>{item.title}</h3>
                      <p className='text-sm text-gray-600 mt-1'>{item.desc}</p>
                    </div>
                    <div className='text-2xl opacity-60'>{item.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Number of People Input - Show for Family and Friends */}
            {(formData?.traveler === '3-5 People' || formData?.traveler === '5+ People') && (
              <div className='mt-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200'>
                <label className='text-sm font-medium text-slate-700 mb-2 block'>
                  How many people are traveling?
                </label>
                <input
                  type='number'
                  min='1'
                  max='20'
                  value={formData.numberOfPeople || ''}
                  placeholder='Enter number of people'
                  className='w-full text-lg p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300 bg-white'
                  onChange={(e) => {
                    handleInputChange('numberOfPeople', e.target.value);
                    if (e.target.value && currentStep === 6) setCurrentStep(7);
                  }}
                />
                <p className='text-xs text-slate-500 mt-2'>This will be used to calculate total travel costs</p>
              </div>
            )}
          </div>

          {/* Travel Mode Selection - Show only after traveler is selected */}
          {formData?.traveler && formData?.originCity && formData?.location && formData?.departureDate && (
            <TravelModeSelector 
              formData={formData}
              onSelectTravel={(travelData) => {
                handleInputChange('selectedTravel', travelData);
              }}
            />
          )}
        </div>

        {/* EaseMyTrip Generate Button */}
        <div className='mt-12 text-center'>
          <Button 
            disabled={loading} 
            onClick={onGenerateTrip}
            className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-4 text-lg font-bold rounded-md shadow-lg hover:shadow-xl transition-all duration-200 border-0 min-w-[280px] disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? (
              <div className='flex items-center gap-3'>
                <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin' />
                <span>Processing Request...</span>
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
                <span>Generate Trip Plan</span>
              </div>
            )}
          </Button>
          
          {loading && (
            <div className='mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto'>
              <div className='flex items-center justify-center gap-3 mb-4'>
                <div className='loading-spinner'></div>
                <span className='text-gray-700 font-medium'>Crafting your perfect itinerary...</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div className='bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full animate-pulse' style={{width: '60%'}}></div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Dialog */}
        <Dialog open={openDialog}>
          <DialogContent className='bg-white/95 backdrop-blur-md border border-purple-200 shadow-2xl max-w-md'>
            <DialogHeader>
              <DialogDescription>
                <div className='flex flex-col items-center text-center space-y-6'>
                  <img src="/cerebro-logo.svg" alt="CerebroCraft Logo" width="180px" className='mx-auto animate-float' />
                  <div className='space-y-3'>
                    <h2 className='font-bold text-2xl text-gray-800'>Welcome to CerebroCraft! 🌟</h2>
                    <p className='text-gray-600 text-lg'>Sign in to unlock your personalized travel planning experience</p>
                  </div>
                  <Button
                    onClick={login}
                    className="w-full mt-8 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-4 px-6 rounded-full flex gap-4 items-center justify-center font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <FcGoogle className="h-7 w-7" />
                    Continue with Google
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CreateTrip



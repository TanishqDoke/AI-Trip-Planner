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
//             <div className='text-center text-sm text-slate-600'>
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
//           <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50 relative z-40 overflow-visible'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-semibold text-slate-800'>Destination</h2>
//                 <p className='text-sm text-slate-600'>Select your target location</p>
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
//           <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-semibold text-slate-800'>Duration</h2>
//                 <p className='text-sm text-slate-600'>Trip length in days (1-10 recommended)</p>
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
//           <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-semibold text-slate-800'>Budget Range</h2>
//                 <p className='text-sm text-slate-600'>Select your preferred spending range</p>
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
//                       <p className='text-sm text-slate-600 mt-1'>{item.desc}</p>
//                     </div>
//                     <div className='text-2xl opacity-60'>{item.icon}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Travel Companions */}
//           <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
//             <div className='flex items-center gap-4 mb-6'>
//               <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
//                 <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className='text-xl font-semibold text-slate-800'>Travel Group</h2>
//                 <p className='text-sm text-slate-600'>Select your travel companion type</p>
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
//                       <p className='text-sm text-slate-600 mt-1'>{item.desc}</p>
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
import { AI_PROMPT, BudgetSliderConfig, SelectTravelList } from '@/constants/options';
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

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [budgetRange, setBudgetRange] = useState({
    min: BudgetSliderConfig.defaultMin,
    max: BudgetSliderConfig.defaultMax
  });

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
    // Initialize budget in formData if not already set
    if (!formData.budget) {
      handleInputChange('budget', budgetRange);
    }
  }, [formData])

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (!formData?.location || !formData?.noOfDays || !formData?.budget?.min || !formData?.budget?.max || !formData?.traveler) {
      toast('Please fill all the details before generating your trip!', {
        description: 'Make sure you\'ve selected destination, duration, budget, and travel companions.',
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
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', `${BudgetSliderConfig.currency}${formData?.budget?.min?.toLocaleString()} - ${BudgetSliderConfig.currency}${formData?.budget?.max?.toLocaleString()}`)
        .replace('{totalDays}', formData?.noOfDays)

      console.log('Generating trip for:', formData);
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
        cleanedData = cleanedData.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        
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
        if (parsedTripData.hotels && Array.isArray(parsedTripData.hotels)) {
          finalHotels = parsedTripData.hotels;
        } else if (parsedTripData.hotel_options && Array.isArray(parsedTripData.hotel_options)) {
          finalHotels = parsedTripData.hotel_options;
        }
        
        // Create the final normalized structure
        parsedTripData = {
          ...parsedTripData,
          itinerary: finalItinerary,
          hotels: finalHotels
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
    if (newRange.min && newRange.max && currentStep === 3) setCurrentStep(4);
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
    <div className='relative min-h-screen bg-gradient-to-br from-blue-50/20 via-slate-50 to-blue-50/30'>
      {/* Professional grid background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#dbeafe_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20'></div>
      
      {/* Subtle blue accent elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-blue-200/40 rounded-2xl rotate-12 opacity-40'></div>
      <div className='absolute top-60 right-20 w-20 h-20 bg-gradient-to-br from-blue-200/40 to-blue-300/50 rounded-xl -rotate-12 opacity-50'></div>
      
      <div className='relative max-w-5xl mx-auto px-6 py-12'>
        {/* Professional Header Section */}
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-4 mb-8'>
            <img src="/cerebro-professional.svg" alt="CerebroCraft" className='h-16' />
          </div>
          <h1 className='font-bold text-4xl md:text-5xl mb-6 text-slate-900'>
            AI Travel Planning Console
          </h1>
          <p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
            Configure your travel parameters to generate an optimized itinerary powered by 
            <span className='text-slate-800 font-semibold'> advanced AI algorithms</span>
          </p>
          <div className='w-24 h-0.5 bg-gradient-to-r from-slate-400 to-blue-500 mx-auto mt-6'></div>
        </div>

        {/* Professional Progress Indicator */}
        <div className='mb-12'>
          <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50'>
            <div className='flex justify-between items-center mb-4'>
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className='flex items-center flex-1'>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`flex-1 h-0.5 mx-3 transition-all duration-300 ${
                      currentStep > step ? 'bg-slate-900' : 'bg-slate-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className='text-center text-sm text-slate-600'>
              <span className='font-medium'>Configuration Step {currentStep} of 4:</span>{' '}
              {
                currentStep === 1 ? 'Destination Selection' :
                currentStep === 2 ? 'Duration Parameters' :
                currentStep === 3 ? 'Budget Configuration' :
                'Group Composition'
              }
            </div>
          </div>
        </div>

        {/* Professional Form Sections */}
        <div className='space-y-8 create-trip-form'>
          {/* Destination Selection */}
          <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50 relative z-40 overflow-visible'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-slate-800'>Destination</h2>
                <p className='text-sm text-slate-600'>Select your target location</p>
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

          {/* Days Selection */}
          <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-slate-800'>Duration</h2>
                <p className='text-sm text-slate-600'>Trip length in days (1-10 recommended)</p>
              </div>
            </div>
            <Input 
              placeholder='Enter number of days' 
              type='number' 
              className='text-lg p-4 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all duration-300'
              onChange={(e) => {
                handleInputChange('noOfDays', e.target.value);
                if (e.target.value && currentStep === 2) setCurrentStep(3);
              }} 
            />
          </div>

          {/* Budget Selection - Updated with Slider */}
          <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-slate-800'>Budget Range</h2>
                <p className='text-sm text-slate-600'>Set your total trip budget</p>
              </div>
            </div>
            
            <div className='space-y-6'>
              {/* Budget Display */}
              <div className='text-center'>
                <div className='text-3xl font-bold text-slate-800 mb-2'>
                  {formatBudgetRange(budgetRange?.min, budgetRange?.max)}
                </div>
                <p className='text-sm text-slate-600'>Budget range for entire trip</p>
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
          <div className='bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-slate-800'>Travel Group</h2>
                <p className='text-sm text-slate-600'>Select your travel companion type</p>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {SelectTravelList.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('traveler', item.people)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    formData?.traveler === item.people 
                      ? 'border-slate-400 bg-slate-50 shadow-md ring-2 ring-slate-200' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='text-lg font-semibold text-slate-800'>{item.title}</h3>
                      <p className='text-sm text-slate-600 mt-1'>{item.desc}</p>
                    </div>
                    <div className='text-2xl opacity-60'>{item.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Generate Button */}
        <div className='mt-12 text-center'>
          <Button 
            disabled={loading} 
            onClick={onGenerateTrip}
            className='bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 min-w-[240px] disabled:opacity-60 disabled:cursor-not-allowed'
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
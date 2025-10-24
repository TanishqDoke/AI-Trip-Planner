// // options.jsx

// export const SelectTravelList = [
//     {
//         id:1,
//         title: 'Just Me',
//         desc: 'A sole traveles in exploration',
//         icon: '✈️',
//         people:'1 person'
//     },
//     {
//         id:2,
//         title: 'A Couple',
//         desc: 'Two traveles in tandem',
//         icon: '🥂',
//         people:'2 people'
//     },
//     {
//         id:3,
//         title: 'Family',
//         desc: 'A group of fun loving adv',
//         icon: '🏡',
//         people:'3 to 5 People'
//     },
//     {
//         id:4,
//         title: 'Friends',
//         desc: 'A bunch of thrill-seekes',
//         icon: '⛵',
//         people:'5 to 10 people'
//     }
// ]

// export const SelectBudgetOptions = [
//     {
//         id:1,
//         title: 'Cheap',
//         desc: 'Stay conscious of costs',
//         icon: '💵',
//     },
//     {
//         id:2,
//         title: 'Moderate',
//         desc: 'Keep cost on the average side',
//         icon: '💰',
//     },
//     {
//         id:3,
//         title: 'Luxury',
//         desc: 'Dont worry about cost',
//         icon: '💸',
//     }
// ]

// export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'



// options.jsx

export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

// Budget slider configuration
export const BudgetSliderConfig = {
    min: 2000,
    max: 1000000,
    step: 1000,
    defaultMin: 20000,
    defaultMax: 80000,
    currency: '₹'
}

export const TripThemes = [
    {
        id: 1,
        title: 'Heritage & Culture',
        desc: 'Explore historical sites, museums, and cultural landmarks',
        icon: '🏛️',
        value: 'heritage',
        keywords: 'temples, monuments, museums, historical sites, cultural centers, heritage walks, traditional crafts, local art'
    },
    {
        id: 2,
        title: 'Adventure',
        desc: 'Thrilling activities and outdoor experiences',
        icon: '🏔️',
        value: 'adventure',
        keywords: 'trekking, hiking, water sports, rock climbing, paragliding, camping, wildlife safari, adventure parks'
    },
    {
        id: 3,
        title: 'Nightlife & Entertainment',
        desc: 'Vibrant nightlife, clubs, and entertainment venues',
        icon: '🎭',
        value: 'nightlife',
        keywords: 'nightclubs, bars, live music, theaters, entertainment districts, rooftop lounges, night markets, cultural shows'
    },
    {
        id: 4,
        title: 'Food & Culinary',
        desc: 'Local cuisine, food tours, and culinary experiences',
        icon: '🍜',
        value: 'culinary',
        keywords: 'local restaurants, street food, food tours, cooking classes, food markets, specialty cuisine, cafes, traditional dishes'
    },
    {
        id: 5,
        title: 'Wellness & Relaxation',
        desc: 'Spa, yoga, meditation, and peaceful retreats',
        icon: '🧘',
        value: 'wellness',
        keywords: 'spa, yoga centers, meditation retreats, wellness resorts, ayurveda, massage, peaceful gardens, nature walks'
    },
    {
        id: 6,
        title: 'Beach & Coastal',
        desc: 'Beaches, water activities, and coastal experiences',
        icon: '🏖️',
        value: 'beach',
        keywords: 'beaches, water sports, coastal walks, beach resorts, snorkeling, boat rides, seaside restaurants, sunset points'
    }
]

export const AI_PROMPT = `Generate a COMPREHENSIVE Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, focusing on {theme} theme. 

🎯 THEME-SPECIFIC REQUIREMENTS:
   - Primary Theme: {theme}
   - Theme Keywords: {themeKeywords}
   - PRIORITIZE activities, attractions, and experiences related to the selected theme
   - At least 60% of daily activities should align with the theme
   - Include theme-specific recommendations (e.g., best heritage sites for heritage theme, adventure activities for adventure theme)
   - Suggest theme-appropriate timing (e.g., evening activities for nightlife, morning yoga for wellness)
   - Recommend theme-specific local experts or guides when relevant

⚠️ ABSOLUTE CRITICAL REQUIREMENTS - FAILURE TO FOLLOW = INVALID RESPONSE:

1. 🚫 STRICT LOCATION ENFORCEMENT:
   - If user selects "Shirdi" → EVERYTHING must be in Shirdi, Maharashtra ONLY
   - If user selects "Pune" → EVERYTHING must be in Pune, Maharashtra ONLY  
   - If user selects "Mumbai" → EVERYTHING must be in Mumbai, Maharashtra ONLY
   - NEVER EVER mix cities - this is the #1 rule
   - ALL hotel addresses must contain "{location}" in the address
   - ALL attraction addresses must contain "{location}" in the address

2. 🏨 HOTEL VALIDATION:
   - Hotel MUST be physically located in "{location}" city
   - Hotel address MUST show "{location}, Maharashtra" or "{location}, [State]"
   - If selecting Shirdi trip → Hotel must be "Hotel Name, Shirdi, Maharashtra"
   - If selecting Pune trip → Hotel must be "Hotel Name, Pune, Maharashtra"
   - REJECT any hotel not in the selected destination city

3. 🎯 ACTIVITY VALIDATION:
   - ALL temples, attractions, museums MUST be in "{location}" city only
   - If Shirdi trip → Sai Baba Temple must be "Sai Baba Temple, Shirdi"
   - If Pune trip → Shaniwar Wada must be "Shaniwar Wada, Pune"
   - NEVER show "Pune" addresses for "Shirdi" trip
   - NEVER show "Shirdi" addresses for "Pune" trip

4. ✅ RESPONSE VALIDATION:
   - Before generating, verify EVERY hotel is in {location}
   - Before generating, verify EVERY attraction is in {location}
   - If you cannot find enough places in {location}, repeat popular ones
   - NEVER add places from other cities to fill gaps

5. 📍 ADDRESS FORMAT:
   - Hotel: "Hotel Name, Street, {location}, State, PIN"
   - Attraction: "Attraction Name, Street, {location}, State, PIN"
   - NO Pune addresses for Shirdi trips
   - NO Shirdi addresses for Pune trips

6. 🗓️ MANDATORY DAY COUNT REQUIREMENT:
   - MUST generate EXACTLY {totalDays} days - NO EXCEPTIONS
   - If {totalDays} = 3, generate Day 1, Day 2, Day 3 - ALL REQUIRED
   - If {totalDays} = 5, generate Day 1, Day 2, Day 3, Day 4, Day 5 - ALL REQUIRED  
   - NEVER generate partial itineraries (like only Day 1 of 3-day trip)
   - Count your days before responding - ensure all {totalDays} are included

7. 🏨 HOTEL CONTINUITY LOGIC - CRITICAL:
   - Day 1: Start from primary hotel check-in
   - Day 2+: Start from EXACT SAME hotel where previous day ended
   - If changing hotels: Day X ends with "Check out from Hotel A", Day X+1 starts with "Check in to Hotel B"
   - Maintain logical flow - travelers sleep somewhere each night
   - NEVER teleport between hotels without logical transitions
   
   🎯 EXAMPLE CORRECT FLOW:
   Day 1: Start "Hotel Sai Leela" → End "Hotel Sai Leela" 
   Day 2: Start "Hotel Sai Leela" (SAME as Day 1 end) → End "Hotel Sai Leela"
   
   ❌ WRONG FLOW (DO NOT DO THIS):
   Day 1: Start "Hotel Sai Leela" → End "Hotel Temple Tree"
   Day 2: Start "Sun-n-sand Shirdi" (DIFFERENT hotel - FORBIDDEN!)

8. 📍 HOTEL TRACKING RULES:
   - Track ending hotel of each day in "current_hotel" field
   - Next day MUST start from same hotel in "current_hotel" field
   - If traveler moves to new hotel, explicitly show checkout/checkin
   - Use SAME hotel names throughout (no variations)

🚨 BEFORE GENERATING RESPONSE:
1. Count total days in your itinerary array - MUST equal {totalDays}
2. Verify hotel continuity - each day starts where previous ended
3. Confirm all addresses contain "{location}"
4. Check that Day 2 "current_hotel" = Day 1 ending hotel
5. Check that Day 3 "current_hotel" = Day 2 ending hotel  
6. If any requirement fails - REGENERATE until perfect

🔄 HOTEL CONTINUITY VALIDATION:
- Day 1 End Hotel = Day 2 Start Hotel ✓
- Day 2 End Hotel = Day 3 Start Hotel ✓  
- Day N End Hotel = Day N+1 Start Hotel ✓

Return ONLY valid JSON in this EXACT structure - VALIDATE EVERY ADDRESS CONTAINS {location}:
{
  "recommended_hotels": [
    {
      "name": "Hotel Name",
      "address": "Street Address, {location}, State, PIN",
      "city": "{location}",
      "state": "Maharashtra",
      "price": "₹X per night",
      "nights": X,
      "total_cost": "₹X for X nights",
      "rating": "X stars",
      "description": "Hotel located in {location} for exploring {location} attractions",
      "check_in": "Day 1 - Check-in process",
      "check_out": "Day X - Check-out process",
      "amenities": ["WiFi", "Breakfast", "AC"],
      "location_advantage": "Strategic location in {location} for {location} sightseeing"
    }
  ],
  "itinerary": [
    {
      "day": "Day 1: {location} Exploration",
      "current_hotel": "Hotel Name in {location}",
      "location_focus": "{location}",
      "schedule": [
        {
          "time": "8:00 AM",
          "type": "start",
          "activity": "Check-in and breakfast at hotel",
          "location": "Hotel Name, {location}",
          "details": "Begin day with breakfast at hotel in {location}"
        },
        {
          "time": "9:00 AM",
          "type": "destination",
          "name": "Attraction Name",
          "address": "Full Address, {location}, State, PIN",
          "city": "{location}",
          "state": "Maharashtra",
          "details": "Description of this {location} attraction",
          "ticket_pricing": "₹X or Free",
          "rating": "X stars",
          "duration": "X hours",
          "highlights": ["Key features of this {location} attraction"]
        },
        {
          "time": "7:00 PM",
          "type": "end",
          "activity": "Return to Hotel in {location}",
          "location": "Hotel Name, {location}",
          "details": "End day at hotel in {location}"
        }
      ],
      "daily_transport_cost": "₹X",
      "daily_total_cost": "₹X",
      "day_summary": "Exploring major {location} attractions"
    },
    {
      "day": "Day 2: {location} Continued",
      "current_hotel": "EXACT SAME Hotel Name from Day 1",
      "location_focus": "{location}",
      "schedule": [
        {
          "time": "8:00 AM",
          "type": "start",
          "activity": "Start from SAME hotel where Day 1 ended",
          "location": "EXACT SAME Hotel Name, {location}",
          "details": "Continue from same hotel - MANDATORY logical continuity"
        },
        {
          "time": "9:00 AM",
          "type": "destination",
          "name": "Different {location} Attraction",
          "address": "Address in {location}, State, PIN",
          "city": "{location}",
          "details": "Another {location} attraction",
          "ticket_pricing": "₹X or Free",
          "duration": "X hours"
        },
        {
          "time": "7:00 PM",
          "type": "end",
          "activity": "Return to EXACT SAME Hotel",
          "location": "EXACT SAME Hotel Name, {location}",
          "details": "End day at SAME hotel for continuity"
        }
      ],
      "daily_transport_cost": "₹X",
      "daily_total_cost": "₹X",
      "day_summary": "More {location} exploration from same hotel"
    }
  ],
  "validation": {
    "all_hotels_in_location": true,
    "all_activities_in_location": true,
    "no_mixed_cities": true,
    "location_consistency": "{location}",
    "total_days_generated": "{totalDays}",
    "hotel_continuity_maintained": true,
    "day_1_hotel": "Primary Hotel Name",
    "day_2_starts_from": "SAME Primary Hotel Name",
    "consistent_hotel_names": true
  },
  "cost_breakdown": {
    "hotel_total": "₹X (accommodation in {location})",
    "transport_total": "₹X (local transport in {location})",
    "activities_total": "₹X ({location} attraction fees)",
    "estimated_food": "₹X (meals in {location})",
    "miscellaneous": "₹X (shopping and extras)",
    "grand_total": "₹X",
    "cost_per_person": "₹X per person",
    "daily_average": "₹X per day",
    "budget_category": "Economy/Moderate/Luxury"
  }
}`
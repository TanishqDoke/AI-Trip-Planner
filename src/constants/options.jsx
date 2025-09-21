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

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a budget range of {budget} (total budget range for entire trip). Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. IMPORTANT: For each day, provide at least 5-7 activities/places to visit with different time slots (morning, afternoon, evening, night) to give users more options. Return ONLY valid JSON in this exact structure: {"hotels": [{"name": "Hotel Name", "address": "Address", "price": "Price Range", "image_url": "URL", "geo_coordinates": "lat,lng", "rating": "X stars", "description": "Description"}], "itinerary": [{"day": "Day X: Title", "places": [{"name": "Place Name", "details": "Description", "image_url": "URL", "geo_coordinates": "lat,lng", "ticket_pricing": "Price", "rating": "X stars", "time": "Duration"}]}]}'
import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  }); 
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format. Provide at least 5-7 activities per day."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotels\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"from $35/night\",\n      \"image_url\": \"https://www.thedlv.com/images/hero.jpg\",\n      \"geo_coordinates\": \"36.1696,-115.1420\",\n      \"rating\": \"4.0 stars\",\n      \"description\": \"Located in the heart of Downtown Las Vegas, The D is a budget-friendly option with a retro vibe.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"from $40/night\",\n      \"image_url\": \"https://circuscircus.com/images/hotel.jpg\",\n      \"geo_coordinates\": \"36.1183,-115.1694\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"Family-friendly atmosphere with affordable accommodations and carnival games.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1: Downtown & Fremont Street\",\n      \"places\": [\n        {\n          \"name\": \"Fremont Street Experience\",\n          \"details\": \"Explore the vibrant pedestrian mall with live music and light shows.\",\n          \"image_url\": \"https://fremontstreet.com/images/experience.jpg\",\n          \"geo_coordinates\": \"36.1696,-115.1420\",\n          \"ticket_pricing\": \"Free\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Morning (9:00 AM - 11:00 AM)\"\n        },\n        {\n          \"name\": \"Golden Nugget Casino\",\n          \"details\": \"Historic casino with shark tank and gaming.\",\n          \"image_url\": \"https://goldennugget.com/images/casino.jpg\",\n          \"geo_coordinates\": \"36.1684,-115.1419\",\n          \"ticket_pricing\": \"Free entry\",\n          \"rating\": \"4.0 stars\",\n          \"time\": \"Late Morning (11:00 AM - 12:30 PM)\"\n        },\n        {\n          \"name\": \"Container Park\",\n          \"details\": \"Unique shopping and dining area made from shipping containers.\",\n          \"image_url\": \"https://containerpark.com/images/park.jpg\",\n          \"geo_coordinates\": \"36.1699,-115.1423\",\n          \"ticket_pricing\": \"$10 entry\",\n          \"rating\": \"4.2 stars\",\n          \"time\": \"Afternoon (1:00 PM - 3:00 PM)\"\n        },\n        {\n          \"name\": \"Neon Museum\",\n          \"details\": \"Collection of iconic Las Vegas signs from the past.\",\n          \"image_url\": \"https://neonmuseum.org/images/signs.jpg\",\n          \"geo_coordinates\": \"36.1745,-115.1443\",\n          \"ticket_pricing\": \"$25 per person\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Late Afternoon (3:30 PM - 5:00 PM)\"\n        },\n        {\n          \"name\": \"Pinball Hall of Fame\",\n          \"details\": \"Play classic pinball machines from all eras.\",\n          \"image_url\": \"https://pinballhalloffame.org/images/games.jpg\",\n          \"geo_coordinates\": \"36.1708,-115.1434\",\n          \"ticket_pricing\": \"$15 per person\",\n          \"rating\": \"4.0 stars\",\n          \"time\": \"Evening (6:00 PM - 8:00 PM)\"\n        },\n        {\n          \"name\": \"Fremont Street Light Show\",\n          \"details\": \"Watch the spectacular overhead LED light show.\",\n          \"image_url\": \"https://fremontstreet.com/images/lightshow.jpg\",\n          \"geo_coordinates\": \"36.1696,-115.1420\",\n          \"ticket_pricing\": \"Free\",\n          \"rating\": \"4.7 stars\",\n          \"time\": \"Night (8:30 PM - 9:30 PM)\"\n        }\n      ]\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
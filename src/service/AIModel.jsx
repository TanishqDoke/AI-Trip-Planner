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
            {text: "Generate a COMPREHENSIVE Travel Plan for Location: Shirdi, for 2 Days for Couple with a Moderate budget. ⚠️ CRITICAL: ALL hotels must have Shirdi addresses, ALL activities must have Shirdi addresses. NO Pune locations allowed. Validate every address contains 'Shirdi'."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"recommended_hotels\": [{\n    \"name\": \"Hotel Sai Miracle\",\n    \"address\": \"Nagar Manmad Road, Shirdi, Maharashtra 423109\",\n    \"city\": \"Shirdi\",\n    \"state\": \"Maharashtra\",\n    \"price\": \"₹3,000 per night\",\n    \"nights\": 2,\n    \"total_cost\": \"₹6,000 for 2 nights\",\n    \"rating\": \"4.2 stars\",\n    \"description\": \"Hotel located in Shirdi for exploring Shirdi attractions\",\n    \"check_in\": \"Day 1 - 2:00 PM check-in\",\n    \"check_out\": \"Day 2 - 12:00 PM check-out\",\n    \"amenities\": [\"WiFi\", \"Breakfast\", \"AC\"],\n    \"location_advantage\": \"Strategic location in Shirdi for Shirdi sightseeing\"\n  }],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1: Shirdi Exploration\",\n      \"current_hotel\": \"Hotel Sai Miracle in Shirdi\",\n      \"location_focus\": \"Shirdi\",\n      \"schedule\": [\n        {\n          \"time\": \"8:00 AM\",\n          \"type\": \"start\",\n          \"activity\": \"Start from Hotel in Shirdi\",\n          \"location\": \"Hotel Sai Miracle, Shirdi\",\n          \"details\": \"Begin day with breakfast at hotel in Shirdi\"\n        },\n        {\n          \"time\": \"9:00 AM\",\n          \"type\": \"destination\",\n          \"name\": \"Sai Baba Samadhi Temple\",\n          \"address\": \"Samadhi Mandir Road, Shirdi, Maharashtra 423109\",\n          \"city\": \"Shirdi\",\n          \"state\": \"Maharashtra\",\n          \"details\": \"Main spiritual center and temple in Shirdi\",\n          \"ticket_pricing\": \"Free\",\n          \"rating\": \"4.8 stars\",\n          \"duration\": \"3 hours\",\n          \"highlights\": [\"Samadhi Mandir in Shirdi\", \"Darshan\", \"Prayer ceremonies\"]\n        },\n        {\n          \"time\": \"1:00 PM\",\n          \"type\": \"destination\",\n          \"name\": \"Dwarkamai Mosque\",\n          \"address\": \"Dwarkamai Road, Shirdi, Maharashtra 423109\",\n          \"city\": \"Shirdi\",\n          \"state\": \"Maharashtra\",\n          \"details\": \"Sacred mosque in Shirdi where Sai Baba lived\",\n          \"ticket_pricing\": \"Free\",\n          \"duration\": \"2 hours\"\n        },\n        {\n          \"time\": \"7:00 PM\",\n          \"type\": \"end\",\n          \"activity\": \"Return to Hotel in Shirdi\",\n          \"location\": \"Hotel Sai Miracle, Shirdi\",\n          \"details\": \"End day at hotel in Shirdi\"\n        }\n      ],\n      \"daily_transport_cost\": \"₹200\",\n      \"daily_total_cost\": \"₹800\",\n      \"day_summary\": \"Exploring major Shirdi attractions\"\n    }\n  ],\n  \"validation\": {\n    \"all_hotels_in_location\": true,\n    \"all_activities_in_location\": true,\n    \"no_mixed_cities\": true,\n    \"location_consistency\": \"Shirdi\"\n  },\n  \"cost_breakdown\": {\n    \"hotel_total\": \"₹6,000 (accommodation in Shirdi)\",\n    \"transport_total\": \"₹400 (local transport in Shirdi)\",\n    \"activities_total\": \"₹0 (Shirdi attraction fees)\",\n    \"estimated_food\": \"₹2,000 (meals in Shirdi)\",\n    \"grand_total\": \"₹8,400\"\n  }\n}\n```"},
          ],
        },
      ],
    });
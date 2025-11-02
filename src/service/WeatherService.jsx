// WeatherService.jsx
import axios from 'axios';

const WEATHER_API_KEY = '5439c0c0c09242de997165901250201'; // WeatherAPI.com free key
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1';

class WeatherService {
  constructor() {
    this.apiKey = WEATHER_API_KEY;
  }

  /**
   * Get weather forecast for a specific date range
   * @param {string} location - City name
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {number} days - Number of days to forecast
   * @returns {Promise<Object>} Weather data with suggestions
   */
  async getWeatherForecast(location, startDate, days = 7) {
    try {
      const response = await axios.get(`${WEATHER_BASE_URL}/forecast.json`, {
        params: {
          key: this.apiKey,
          q: location,
          days: Math.min(days, 14), // API limit is 14 days
          dt: startDate, // Specific date
          aqi: 'no',
          alerts: 'yes'
        }
      });

      const weatherData = response.data;
      return this.processWeatherData(weatherData, days);
    } catch (error) {
      console.error('Error fetching weather:', error);
      return this.getFallbackWeather(location);
    }
  }

  /**
   * Process weather data and generate suggestions
   */
  processWeatherData(data, requestedDays) {
    const current = data.current;
    const forecast = data.forecast.forecastday;
    const location = data.location;

    const suggestions = {
      current: {
        temperature: current.temp_c,
        condition: current.condition.text,
        humidity: current.humidity,
        windSpeed: current.wind_kph,
        feelsLike: current.feelslike_c,
        uv: current.uv
      },
      forecast: forecast.map(day => ({
        date: day.date,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        chanceOfRain: day.day.daily_chance_of_rain,
        humidity: day.day.avghumidity,
        uv: day.day.uv,
        icon: day.day.condition.icon
      })),
      location: {
        name: location.name,
        region: location.region,
        country: location.country
      },
      recommendations: this.generateRecommendations(current, forecast, requestedDays)
    };

    return suggestions;
  }

  /**
   * Generate detailed activity recommendations based on weather
   */
  generateRecommendations(current, forecast, days) {
    const avgTemp = forecast.reduce((sum, day) => sum + day.day.maxtemp_c, 0) / forecast.length;
    const avgRainChance = forecast.reduce((sum, day) => sum + day.day.daily_chance_of_rain, 0) / forecast.length;
    
    const recommendations = {
      bestActivities: [],
      avoidActivities: [],
      clothingSuggestions: [],
      timingSuggestions: [],
      placesToVisit: [],
      weatherType: '',
      weatherSummary: '',
      detailedSuggestions: ''
    };

    // Determine weather type and generate suggestions
    if (avgTemp > 35) {
      recommendations.weatherType = 'Very Hot ☀️';
      recommendations.weatherSummary = `Expect very hot conditions with temperatures around ${avgTemp.toFixed(1)}°C`;
      
      recommendations.bestActivities = [
        '🏛️ Indoor museums and air-conditioned attractions',
        '🕌 Early morning temple visits (6-9 AM)',
        '🎭 Evening cultural shows and performances',
        '🛍️ Mall shopping and indoor entertainment',
        '💦 Water parks and swimming activities',
        '🧖 Spa and wellness centers',
        '🍽️ Indoor restaurants and cafes'
      ];
      
      recommendations.avoidActivities = [
        '❌ Midday outdoor activities (11 AM - 4 PM)',
        '❌ Long outdoor walking tours',
        '❌ Hiking or trekking without shade',
        '❌ Open-air markets during afternoon'
      ];
      
      recommendations.clothingSuggestions = [
        '👕 Light cotton or linen clothes',
        '🧢 Wide-brimmed hat or cap',
        '🕶️ UV protection sunglasses',
        '🧴 Sunscreen (SPF 50+)',
        '👟 Comfortable breathable shoes',
        '💧 Reusable water bottle'
      ];
      
      recommendations.timingSuggestions = [
        '⏰ Best outdoor time: 6:00 AM - 10:00 AM',
        '🌆 Evening activities: 5:00 PM onwards',
        '🏢 Indoor activities: 11:00 AM - 4:00 PM',
        '💧 Stay hydrated - drink water every 30 mins'
      ];
      
      recommendations.placesToVisit = [
        '🏛️ Air-conditioned museums and galleries',
        '🕌 Historic temples (visit early morning)',
        '🛍️ Shopping malls and bazaars (covered)',
        '🎪 Indoor entertainment complexes',
        '🌳 Gardens with shade (early morning/evening)',
        '💦 Water theme parks',
        '🎭 Indoor theaters and cultural centers'
      ];
      
      recommendations.detailedSuggestions = `The weather will be very hot during your visit. Plan indoor activities like museums, shopping malls, and cultural centers for midday hours (11 AM - 4 PM). Visit outdoor attractions like temples, monuments, and gardens early morning (6-9 AM) or late evening (5-7 PM) when temperatures are cooler. Consider water-based activities and stay in air-conditioned spaces during peak heat. Carry sunscreen, hat, and plenty of water.`;
      
    } else if (avgTemp >= 25 && avgTemp <= 35) {
      recommendations.weatherType = 'Pleasant & Warm 🌤️';
      recommendations.weatherSummary = `Perfect weather with temperatures around ${avgTemp.toFixed(1)}°C`;
      
      recommendations.bestActivities = [
        '🏰 Heritage site visits and historical tours',
        '🕌 Temple and spiritual center exploration',
        '🍜 Outdoor cafes and food tours',
        '📸 Photography and sightseeing',
        '🛍️ Shopping in local markets',
        '🌳 Garden and park visits',
        '🎭 Cultural performances and shows',
        '🚶 Walking tours of old city areas'
      ];
      
      recommendations.avoidActivities = [
        '⚠️ Heavy physical activities during midday'
      ];
      
      recommendations.clothingSuggestions = [
        '👕 Comfortable cotton or linen clothing',
        '🧥 Light jacket or shawl for evening',
        '👟 Comfortable walking shoes',
        '🕶️ Sunglasses and light cap',
        '🧴 Sunscreen (SPF 30)',
        '🎒 Small backpack for day trips'
      ];
      
      recommendations.timingSuggestions = [
        '✨ Ideal for all-day sightseeing',
        '📸 Best photography: Golden hour (6-8 AM, 5-7 PM)',
        '🚶 Comfortable for walking tours throughout day',
        '🌆 Evening perfect for rooftop dining'
      ];
      
      recommendations.placesToVisit = [
        '🏰 Historic forts and palaces',
        '🕌 Famous temples and religious sites',
        '🍜 Local food streets and markets',
        '📸 Scenic viewpoints and landmarks',
        '🌳 Botanical gardens and parks',
        '🏛️ Museums and cultural centers',
        '🎨 Art galleries and craft villages',
        '🌆 Rooftop restaurants with city views'
      ];
      
      recommendations.detailedSuggestions = `Perfect weather for extensive exploration! This is ideal for visiting heritage sites, temples, outdoor markets, and enjoying food tours. Comfortable temperatures throughout the day make it excellent for walking tours and photography. Evenings are particularly pleasant for outdoor dining, rooftop experiences, and cultural shows. You can comfortably explore both indoor and outdoor attractions without weather constraints.`;
      
    } else if (avgTemp >= 15 && avgTemp < 25) {
      recommendations.weatherType = 'Cool & Comfortable 🍃';
      recommendations.weatherSummary = `Excellent weather with temperatures around ${avgTemp.toFixed(1)}°C`;
      
      recommendations.bestActivities = [
        '🏔️ All outdoor activities',
        '🚶 Long walking tours and heritage trails',
        '⛰️ Hiking and adventure activities',
        '🍜 Food tours and street food exploration',
        '🎭 Evening cultural performances',
        '🧘 Outdoor yoga and meditation sessions',
        '📸 Photography expeditions',
        '🚴 Cycling tours of the city'
      ];
      
      recommendations.avoidActivities = [];
      
      recommendations.clothingSuggestions = [
        '🧥 Layered clothing (jacket + t-shirt)',
        '👖 Comfortable jeans or pants',
        '🧶 Sweater or hoodie for evening',
        '👟 Comfortable walking shoes',
        '🧣 Light scarf for morning/evening',
        '🎒 Medium backpack for day trips'
      ];
      
      recommendations.timingSuggestions = [
        '⭐ Excellent for all-day outdoor activities',
        '🌅 Perfect for sunrise and sunset viewing',
        '🚶 Ideal for extended walking explorations',
        '📸 Great lighting conditions all day'
      ];
      
      recommendations.placesToVisit = [
        '🏰 All outdoor heritage sites',
        '⛰️ Hill stations and viewpoints',
        '🌳 Parks and nature trails',
        '🍜 Street food areas and markets',
        '🕌 Open-air temples and monuments',
        '🎪 Outdoor festivals and events',
        '📸 Scenic photography locations',
        '🚶 Heritage walking trails'
      ];
      
      recommendations.detailedSuggestions = `Ideal weather conditions for maximum outdoor exploration! Perfect for extended outdoor activities, walking tours, adventure sports, and heritage site visits. The comfortable temperatures throughout the day make it excellent for food tours, photography expeditions, and cultural experiences. Both morning and evening hours are pleasant for outdoor dining, viewpoint visits, and cultural shows. This is the best weather to explore everything your destination offers!`;
      
    } else if (avgTemp < 15) {
      recommendations.weatherType = 'Cold ❄️';
      recommendations.weatherSummary = `Cold weather expected with temperatures around ${avgTemp.toFixed(1)}°C`;
      
      recommendations.bestActivities = [
        '🕌 Indoor temple visits',
        '🏛️ Museum and cultural center tours',
        '☕ Hot food and beverage experiences',
        '🎭 Indoor cultural performances',
        '🧖 Spa and wellness treatments',
        '🌞 Short outdoor visits during midday sun',
        '🛍️ Covered shopping areas'
      ];
      
      recommendations.avoidActivities = [
        '❌ Early morning outdoor activities',
        '❌ Long exposure to cold in evening',
        '❌ Water-based activities',
        '❌ Open-air attractions without heating'
      ];
      
      recommendations.clothingSuggestions = [
        '🧥 Warm jacket or coat',
        '🧶 Woolen sweater or thermal wear',
        '🧤 Gloves and warm socks',
        '🧣 Scarf and ear warmers',
        '👢 Warm comfortable boots',
        '🎒 Layered clothing approach'
      ];
      
      recommendations.timingSuggestions = [
        '🌞 Outdoor visits best: 11:00 AM - 3:00 PM',
        '🏢 Indoor activities: Morning and evening',
        '☕ Hot beverage breaks throughout day',
        '🔥 Seek heated indoor spaces regularly'
      ];
      
      recommendations.placesToVisit = [
        '🏛️ Indoor museums and galleries',
        '🕌 Heated temples and prayer halls',
        '☕ Cozy cafes and restaurants',
        '🛍️ Covered markets and malls',
        '🎭 Indoor theaters and shows',
        '🌞 Sunny outdoor spots (midday only)',
        '🧖 Wellness centers with heating',
        '📚 Libraries and cultural centers'
      ];
      
      recommendations.detailedSuggestions = `Cold weather requires strategic planning! Focus on indoor attractions and heated spaces. Time outdoor visits during midday warmth (11 AM - 3 PM) when temperatures are slightly higher. Enjoy hot local cuisine, visit heated temples and indoor cultural centers. Perfect weather for cozy cafe experiences, indoor shopping, and cultural shows. Carry layers and warm clothing, and plan flexible schedules with indoor backup options.`;
    }

    // Add rain-specific suggestions
    if (avgRainChance > 60) {
      recommendations.weatherType += ' with Frequent Rain 🌧️';
      recommendations.weatherSummary += `. High chance of rain (${avgRainChance.toFixed(0)}%)`;
      
      recommendations.bestActivities.unshift(
        '☂️ Indoor temples with covered areas',
        '🏛️ Museums and art galleries',
        '🛍️ Shopping malls and covered markets',
        '🎭 Indoor shows and performances'
      );
      
      recommendations.avoidActivities.push(
        '❌ Long outdoor walking tours',
        '❌ Open-air attractions without shelter',
        '❌ Activities requiring dry weather'
      );
      
      recommendations.clothingSuggestions.push(
        '☔ Waterproof raincoat or umbrella',
        '👟 Waterproof footwear',
        '🎒 Waterproof bag for electronics',
        '👕 Quick-dry clothing'
      );
      
      recommendations.placesToVisit.unshift(
        '☂️ Covered temples and shrines',
        '🏛️ Indoor museums',
        '🛍️ Covered shopping arcades'
      );
      
      recommendations.detailedSuggestions += ` Expect rain during your visit, so prioritize covered and indoor attractions. Carry rain gear (umbrella, raincoat, waterproof shoes) and plan flexible schedules. Indoor cultural experiences, covered markets, temples with shelter, and museums are recommended. Many attractions offer covered areas - ask locals for rain-proof options. Consider indoor activities as primary and outdoor visits as weather-permitting.`;
      
    } else if (avgRainChance > 30) {
      recommendations.weatherSummary += `. Occasional rain possible (${avgRainChance.toFixed(0)}% chance)`;
      recommendations.clothingSuggestions.push(
        '☔ Compact umbrella (just in case)',
        '🧥 Light rain jacket'
      );
      recommendations.timingSuggestions.push(
        '⚠️ Check weather before outdoor activities',
        '📱 Keep rain gear handy'
      );
    }

    // Add UV index suggestions
    const avgUV = forecast.reduce((sum, day) => sum + (day.day.uv || 0), 0) / forecast.length;
    if (avgUV > 6) {
      recommendations.clothingSuggestions.push(
        '🧴 High SPF sunscreen (50+)',
        '🕶️ UV protection sunglasses',
        '🧢 Hat with UV protection'
      );
      recommendations.timingSuggestions.push(
        '☀️ Seek shade during peak UV (11 AM - 3 PM)',
        '🧴 Reapply sunscreen every 2 hours'
      );
    }

    return recommendations;
  }

  /**
   * Fallback weather data if API fails
   */
  getFallbackWeather(location) {
    return {
      current: {
        temperature: 28,
        condition: 'Partly cloudy',
        humidity: 65,
        windSpeed: 10,
        feelsLike: 30,
        uv: 5
      },
      forecast: [],
      location: {
        name: location,
        region: '',
        country: 'India'
      },
      recommendations: {
        weatherType: 'Pleasant 🌤️',
        weatherSummary: 'Weather data unavailable, assuming pleasant conditions',
        bestActivities: [
          '🏰 Heritage site visits',
          '🕌 Temple tours',
          '🍜 Local food exploration',
          '📸 Photography and sightseeing'
        ],
        avoidActivities: [],
        clothingSuggestions: [
          '👕 Comfortable cotton clothing',
          '🧥 Light jacket for evening',
          '🧴 Sunscreen and sunglasses'
        ],
        timingSuggestions: [
          '⏰ Best outdoor time: Morning and evening',
          '💧 Carry water and stay hydrated'
        ],
        placesToVisit: [
          '🏰 Major heritage sites',
          '🕌 Famous temples',
          '🛍️ Local markets',
          '🍜 Popular food areas'
        ],
        detailedSuggestions: 'Weather data unavailable. Plan for typical pleasant conditions with light, comfortable clothing. Carry sunscreen and water for outdoor activities. Visit major attractions during morning and evening hours for best experience.'
      }
    };
  }

  /**
   * Format weather data for AI prompt inclusion
   */
  formatWeatherForPrompt(weatherData) {
    const { current, forecast, recommendations } = weatherData;
    
    const forecastSummary = forecast.slice(0, 7).map(day => 
      `   ${day.date}: ${day.minTemp}°C - ${day.maxTemp}°C, ${day.condition} (${day.chanceOfRain}% rain)`
    ).join('\n');

    return `
🌤️ WEATHER-BASED ITINERARY OPTIMIZATION:

📍 Location Weather Analysis:
   ${recommendations.weatherSummary}

Current Conditions:
   • Temperature: ${current.temperature}°C (Feels like ${current.feelsLike}°C)
   • Condition: ${current.condition}
   • Humidity: ${current.humidity}%
   • UV Index: ${current.uv}

7-Day Forecast:
${forecastSummary}

Weather Classification: ${recommendations.weatherType}

✅ PRIORITIZE THESE ACTIVITIES:
${recommendations.bestActivities.map(activity => `   ${activity}`).join('\n')}

❌ AVOID OR MINIMIZE:
${recommendations.avoidActivities.length > 0 ? recommendations.avoidActivities.map(item => `   ${item}`).join('\n') : '   • No specific restrictions'}

📍 RECOMMENDED PLACES TO VISIT:
${recommendations.placesToVisit.map(place => `   ${place}`).join('\n')}

👕 PACKING ESSENTIALS:
${recommendations.clothingSuggestions.map(item => `   ${item}`).join('\n')}

⏰ OPTIMAL TIMING:
${recommendations.timingSuggestions.map(tip => `   ${tip}`).join('\n')}

📝 WEATHER-BASED ITINERARY INSTRUCTIONS:
${recommendations.detailedSuggestions}

🎯 CRITICAL: Use this weather data to:
   1. Schedule indoor activities during extreme conditions
   2. Plan outdoor visits during optimal weather windows
   3. Include weather-appropriate clothing in suggestions
   4. Add timing recommendations for each activity
   5. Provide alternative indoor options for rainy/extreme weather
   6. Suggest early morning visits for hot weather
   7. Recommend midday outdoor activities for cold weather
   8. Include weather warnings and preparation tips
`;
  }
}

export const weatherService = new WeatherService();

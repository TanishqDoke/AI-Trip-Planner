import axios from 'axios';

// Backend API URL (Python Flask server with Google ADK)
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

class FlightService {
  constructor() {
    this.apiUrl = BACKEND_API_URL;
  }

  // Search for travel options (flight/train/bus) using Gemini AI
  async searchTravelOptions({ origin, destination, departureDate, returnDate, passengers = 1, mode = 'flight' }) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/travel/search`, {
        origin,
        destination,
        departureDate,
        returnDate,
        passengers,
        mode  // 'flight', 'train', or 'bus'
      });

      return response.data;
    } catch (error) {
      console.error('Error searching travel options:', error);
      throw error;
    }
  }

  // Search for hotels using Google ADK backend
  async searchHotels({ location, checkIn, checkOut, guests = 1, rooms = 1 }) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/hotels/search`, {
        location,
        checkIn,
        checkOut,
        guests,
        rooms
      });

      return response.data;
    } catch (error) {
      console.error('Error searching hotels:', error);
      throw error;
    }
  }

  // Book travel (flight/train/bus)
  async bookTravel(travelOffer, passengers, paymentInfo) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/travel/book`, {
        travelOffer,
        passengers,
        payment: paymentInfo
      });

      return response.data;
    } catch (error) {
      console.error('Error booking travel:', error);
      throw error;
    }
  }

  // Book a hotel
  async bookHotel(hotelOffer, guests, paymentInfo) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/hotels/book`, {
        hotelOffer,
        guests,
        payment: paymentInfo
      });

      return response.data;
    } catch (error) {
      console.error('Error booking hotel:', error);
      throw error;
    }
  }

  // Generate complete itinerary using AI
  async generateCompleteItinerary({ destination, origin, startDate, endDate, budget, preferences }) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/itinerary/generate`, {
        destination,
        origin,
        startDate,
        endDate,
        budget,
        preferences
      });

      return response.data;
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw error;
    }
  }

  // Check backend health
  async checkHealth() {
    try {
      const response = await axios.get(`${this.apiUrl}/health`);
      return response.data;
    } catch (error) {
      console.error('Backend is not available:', error);
      return { status: 'unhealthy' };
    }
  }
}

export const flightService = new FlightService();

// Fallback distance estimation based on common Indian city pairs
const estimateDistance = (origin, destination) => {
  // Common city distances in India (approximate km)
  const cityDistances = {
    'mumbai-delhi': 1400,
    'mumbai-bangalore': 980,
    'mumbai-pune': 150,
    'mumbai-ahmedabad': 530,
    'delhi-bangalore': 2150,
    'delhi-kolkata': 1500,
    'delhi-chennai': 2180,
    'delhi-hyderabad': 1570,
    'bangalore-chennai': 350,
    'bangalore-hyderabad': 570,
    'pune-bangalore': 840,
    'pune-goa': 460,
    'chennai-hyderabad': 630,
    'kolkata-chennai': 1670,
  };

  // Normalize city names (remove state, country, etc.)
  const normalizeCity = (city) => {
    return city.toLowerCase().split(',')[0].trim();
  };

  const originCity = normalizeCity(origin);
  const destCity = normalizeCity(destination);

  // Try both directions
  const key1 = `${originCity}-${destCity}`;
  const key2 = `${destCity}-${originCity}`;

  return cityDistances[key1] || cityDistances[key2] || 500; // Default 500 km
};

// Helper function to calculate distance using Google Maps JavaScript SDK
const calculateDistance = async (origin, destination) => {
  return new Promise((resolve) => {
    try {
      // Check if Google Maps is loaded
      if (typeof google === 'undefined' || !google.maps) {
        console.warn('Google Maps not loaded, using estimated distance');
        const estimatedDistance = estimateDistance(origin, destination);
        console.log(`Estimated distance: ${estimatedDistance} km`);
        resolve(estimatedDistance);
        return;
      }

      const service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const distanceInKm = response.rows[0].elements[0].distance.value / 1000;
            console.log(`Calculated distance: ${distanceInKm} km`);
            resolve(distanceInKm);
          } else {
            console.warn('Distance calculation failed, using estimated distance');
            const estimatedDistance = estimateDistance(origin, destination);
            console.log(`Estimated distance: ${estimatedDistance} km`);
            resolve(estimatedDistance);
          }
        }
      );
    } catch (error) {
      console.error('Error calculating distance:', error);
      const estimatedDistance = estimateDistance(origin, destination);
      console.log(`Fallback estimated distance: ${estimatedDistance} km`);
      resolve(estimatedDistance);
    }
  });
};

// Helper function to generate realistic travel options based on actual distance
export const generateTravelOptions = async ({ origin, destination, departureDate, travelers = 1 }) => {
  // Calculate actual distance between origin and destination
  let distanceKm;
  try {
    distanceKm = await calculateDistance(origin, destination);
  } catch (error) {
    console.error('Using fallback distance calculation');
    distanceKm = 500; // Fallback distance
  }

  console.log(`Distance between ${origin} and ${destination}: ${distanceKm} km`);

  // Calculate realistic durations based on distance, mode, and class
  const calculateDuration = (mode, distanceKm, classLevel) => {
    // Average speeds for each mode and class (km/h)
    // Premium is faster, Economy is slower
    const avgSpeeds = {
      flight: [600, 650, 700],  // Economy, Standard, Premium (all flights similar speed)
      train: [60, 80, 100],     // Economy (slower trains), Standard, Premium (express trains)
      bus: [50, 60, 70]         // Economy (regular), Standard, Premium (luxury/express)
    };

    // Add base time for boarding, security, etc.
    const baseTimeMinutes = {
      flight: 90,   // 1.5 hours for check-in, security, boarding
      train: 30,    // 30 minutes for boarding
      bus: 15       // 15 minutes for boarding
    };

    const speed = avgSpeeds[mode][classLevel];
    const travelTimeMinutes = (distanceKm / speed) * 60;
    const totalMinutes = Math.round(travelTimeMinutes + baseTimeMinutes[mode]);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      formatted: `${hours}h ${minutes}m`,
      totalMinutes: totalMinutes
    };
  };

  // Calculate realistic prices based on distance
  const calculatePrice = (mode, distanceKm, classLevel) => {
    // Price per km for each mode and class (as per your specifications)
    const pricePerKm = {
      flight: [35, 45, 60],       // Economy, Standard, Premium (₹/km)
      train: [0.6, 1.0, 2.5],     // Economy, Standard, Premium (₹/km)
      bus: [2, 10, 20]            // Economy, Standard, Premium (₹/km)
    };

    // Base fare (minimum charge)
    const baseFare = {
      flight: [500, 800, 1200],   // Reduced base fare since per km is higher
      train: [100, 200, 400],
      bus: [50, 100, 200]
    };

    const distancePrice = distanceKm * pricePerKm[mode][classLevel];
    const totalPrice = Math.round(baseFare[mode][classLevel] + distancePrice);

    return totalPrice;
  };

  // Generate carrier names with multiple options
  const carriers = {
    flight: ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Go First', 'AirAsia'],
    train: ['Rajdhani Express', 'Shatabdi Express', 'Duronto Express', 'Garib Rath', 'Humsafar Express', 'Tejas Express'],
    bus: ['VRL Travels', 'RedBus Sleeper', 'SRS Travels', 'Orange Travels', 'Neeta Travels', 'Paulo Travels']
  };

  // Generate departure times
  const departureTimes = {
    flight: ['06:00 AM', '10:30 AM', '03:45 PM'],
    train: ['05:30 AM', '02:15 PM', '11:00 PM'],
    bus: ['08:00 PM', '10:30 PM', '11:45 PM']
  };

  // Generate 3 options for each mode
  const generateOptions = (mode) => {
    return [0, 1, 2].map((index) => {
      // index 0 = Economy (slowest), index 1 = Standard, index 2 = Premium (fastest)
      const durationData = calculateDuration(mode, distanceKm, index);
      const price = calculatePrice(mode, distanceKm, index);
      const carrierIndex = Math.floor(Math.random() * carriers[mode].length);
      const departure = departureTimes[mode][index];

      // Calculate arrival time
      const depTime = new Date(`2000-01-01 ${departure}`);
      const arrTime = new Date(depTime.getTime() + durationData.totalMinutes * 60000);
      const arrival = arrTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      return {
        id: `${mode}-${index}`,
        name: carriers[mode][carrierIndex],
        duration: durationData.formatted,
        price,
        departure,
        arrival,
        class: index === 0 ? 'Economy' : index === 1 ? 'Standard' : 'Premium',
        distance: `${Math.round(distanceKm)} km`
      };
    });
  };

  return {
    flight: generateOptions('flight'),
    train: generateOptions('train'),
    bus: generateOptions('bus'),
    distance: distanceKm
  };
};

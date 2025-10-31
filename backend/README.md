# Travel Concierge Backend - Google ADK Integration

This backend service integrates Google's Agent Development Kit (ADK) for flight and hotel booking.

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Install Google ADK

```bash
pip install google-genai
```

### 3. Set Environment Variables

Create a `.env` file in the backend directory:

```env
GOOGLE_API_KEY=your_google_api_key
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_api_secret
PORT=5000
```

### 4. Run the Server

```bash
python app.py
```

The server will run on `http://localhost:5000`

## API Endpoints

### Flight Search
```
POST /api/flights/search
Body: {
  "origin": "BOM",
  "destination": "DEL",
  "departureDate": "2025-11-01",
  "returnDate": "2025-11-05",
  "passengers": 2
}
```

### Hotel Search
```
POST /api/hotels/search
Body: {
  "location": "Mumbai",
  "checkIn": "2025-11-01",
  "checkOut": "2025-11-05",
  "guests": 2
}
```

### Book Flight
```
POST /api/flights/book
Body: {
  "flightId": "flight_123",
  "passengers": [...],
  "payment": {...}
}
```

### Book Hotel
```
POST /api/hotels/book
Body: {
  "hotelId": "hotel_123",
  "guests": [...],
  "payment": {...}
}
```

## Integration with React Frontend

The React app will call these endpoints to search and book flights/hotels.

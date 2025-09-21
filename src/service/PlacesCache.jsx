// Utility to throttle API calls and cache results
class PlacesCache {
    constructor() {
        this.cache = new Map();
        this.pendingRequests = new Map();
        this.lastRequestTime = 0;
        this.minDelay = 100; // Minimum delay between requests (ms)
    }

    async get(placeName, apiCall) {
        const normalizedName = placeName.toLowerCase().trim();
        
        // Return cached result if available
        if (this.cache.has(normalizedName)) {
            return this.cache.get(normalizedName);
        }

        // If request is already pending, wait for it
        if (this.pendingRequests.has(normalizedName)) {
            return this.pendingRequests.get(normalizedName);
        }

        // Throttle requests
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < this.minDelay) {
            await new Promise(resolve => setTimeout(resolve, this.minDelay - timeSinceLastRequest));
        }

        // Make the API call
        const requestPromise = apiCall().then(result => {
            this.cache.set(normalizedName, result);
            this.pendingRequests.delete(normalizedName);
            this.lastRequestTime = Date.now();
            return result;
        }).catch(error => {
            this.pendingRequests.delete(normalizedName);
            throw error;
        });

        this.pendingRequests.set(normalizedName, requestPromise);
        return requestPromise;
    }

    clear() {
        this.cache.clear();
        this.pendingRequests.clear();
    }
}

export const placesCache = new PlacesCache();
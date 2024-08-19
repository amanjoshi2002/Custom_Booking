// API Routes
export const API_ROUTES = {
    // Authentication
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
  
    // User
    GET_USER_PROFILE: '/api/user/profile',
    UPDATE_USER_PROFILE: '/api/user/profile',
  
    // Bookings
    GET_BOOKINGS: '/api/bookings',
    CREATE_BOOKING: '/api/bookings',
    UPDATE_BOOKING: '/api/bookings/:id',
    DELETE_BOOKING: '/api/bookings/:id',
  
    // Services
    GET_SERVICES: '/api/services',
    GET_SERVICE: '/api/services/:id',
    SEARCH_SERVICES: '/api/services/search',
  
    // Settings
    GET_SETTINGS: '/api/settings',
    UPDATE_SETTINGS: '/api/settings',
  
    // Notifications
    GET_NOTIFICATIONS: '/api/notifications',
    MARK_NOTIFICATION_READ: '/api/notifications/:id/read',
  };
  
  // Page Routes
  export const PAGE_ROUTES = {
    HOME: '/',
    CONTACT_US: '/contact_us',
    ABOUT: '/about',
    BOOKINGS: '/bookings',
    SETTINGS: '/settings',
    SERVICES: '/services',
  };

export const getUserTheme = async () => {
  // Fetch the user theme from your API or local storage
  const response = await fetch('/api/user-theme'); // Example API endpoint
  const data = await response.json();
  return data.styles; // Assuming the response contains the styles
};
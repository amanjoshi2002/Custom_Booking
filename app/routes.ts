// API Routes
export const API_ROUTES = {
  // Authentication
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  LOGOUT: '/api/auth/logout',

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
  SAVE_STYLE: '/api/saveStyle',
  GET_STYLE: '/api/getStyle',

  // Notifications
  GET_NOTIFICATIONS: '/api/notifications',
  MARK_NOTIFICATION_READ: '/api/notifications/:id/read',

  // Push Notifications
  SUBSCRIBE: '/api/subscribe',
  GET_VAPID_PUBLIC_KEY: '/api/vapidPublicKey',
};

// Page Routes
export const PAGE_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
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


<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">CUSTOM_BOOKING</h1>
</p>
<p align="center">
    <em>A comprehensive booking management system built with Next.js, React, and Socket.IO</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/amanjoshi2002/Custom_Booking?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/amanjoshi2002/Custom_Booking?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/amanjoshi2002/Custom_Booking?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/amanjoshi2002/Custom_Booking?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=MongoDB&logoColor=white" alt="MongoDB">
	<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=flat&logo=Lodash&logoColor=white" alt="Lodash">
	<br>
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Socket.io-010101.svg?style=flat&logo=socketdotio&logoColor=white" alt="Socket.io">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

## 📝 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Repository Structure](#-repository-structure)
- [Main Components](#-main-components)
- [API Routes](#️-api-routes)
- [Push Notification System](#push-notification-system)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Security Note](#-security-note)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Overview

Custom_Booking is a comprehensive booking management system built with Next.js, React, and Socket.IO. It provides functionality for users to view, create, edit, and cancel bookings, with real-time updates across all connected clients.

## ✨ Features

- User authentication
- Booking creation and management
- Service listing and management
- Real-time updates using Socket.IO
- Responsive design with Tailwind CSS
- Push notification system for style updates

## 📂 Repository Structure
##  Repository Structure

```sh
└── Custom_Booking/
    ├── README.md
    ├── app
    │   ├── ClientSessionProvider.tsx
    │   ├── _app.tsx
    │   ├── about
    │   │   └── page.tsx
    │   ├── api
    │   │   ├── auth
    │   │   │   ├── [...nextauth]
    │   │   │   │   ├── options.ts
    │   │   │   │   └── route.ts
    │   │   │   ├── [...nextauth].ts
    │   │   │   └── signup
    │   │   │       └── route.ts
    │   │   ├── bookings
    │   │   │   ├── [id]
    │   │   │   │   └── route.ts
    │   │   │   └── route.ts
    │   │   ├── getStyle
    │   │   │   └── route.ts
    │   │   ├── saveStyle
    │   │   │   └── route.ts
    │   │   ├── services
    │   │   │   └── route.ts
    │   │   └── subscribe
    │   │       └── route.ts
    │   ├── bookings
    │   │   ├── [id]
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── components
    │   │   ├── CancelButton.tsx
    │   │   ├── DefaultStyle.tsx
    │   │   ├── Footer.tsx
    │   │   ├── HomeService.tsx
    │   │   ├── Loading.tsx
    │   │   ├── LoadingOverlay.tsx
    │   │   ├── LoginModel.tsx
    │   │   ├── NavBar.tsx
    │   │   ├── Providers.tsx
    │   │   ├── ServiceImages.tsx
    │   │   ├── SignupModel.tsx
    │   │   └── Toast.tsx
    │   ├── contact_us
    │   │   └── page.tsx
    │   ├── contexts
    │   │   └── StyleContext.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── interface
    │   │   ├── booking.ts
    │   │   ├── model
    │   │   │   ├── Service.ts
    │   │   │   └── Style.ts
    │   │   └── styles.ts
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── routes.ts
    │   ├── services
    │   │   └── page.tsx
    │   └── settings
    │       └── page.tsx
    ├── env.d.ts
    ├── example.env.local
    ├── generate-vapid-keys.js
    ├── generateVapidKeys.js
    ├── lib
    │   └── mongodb.ts
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── next.svg
    │   ├── photo
    │   │   ├── 1.webp
    │   │   ├── 11.webp
    │   │   ├── 2.webp
    │   │   ├── 22.webp
    │   │   ├── 3.webp
    │   │   ├── 33.webp
    │   │   ├── 4.webp
    │   │   ├── 44.webp
    │   │   ├── 5.webp
    │   │   ├── 6.webp
    │   │   ├── 7.png
    │   │   ├── 8.png
    │   │   ├── Repair.webp
    │   │   ├── ac.jpg
    │   │   ├── door.svg
    │   │   ├── fixing.jpg
    │   │   ├── gardencleaning.jpg
    │   │   ├── housemaid.avif
    │   │   ├── massage.jpg
    │   │   ├── team.webp
    │   │   └── tvrepair.jpg
    │   ├── service-worker.js
    │   └── vercel.svg
    ├── server.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── tsconfig.server.json
    ├── types
    │   └── next-auth.d.ts
    └── vercel.json
```

---


## 🚀 Main Components

1. `BookingsPage`: Displays a list of user bookings with sorting options.
2. `BookingDetailPage`: Shows detailed information for a single booking, with options to edit and cancel.
3. `ServicesPage`: Displays a list of available services with search and filter functionality.
4. `ServiceDetailPage`: Shows detailed information for a single service, allowing users to book the service.
5. `NavBar`: Navigation component for the application.
6. `Footer`: Footer component for the application.
7. `Loading`: Loading indicator component.

## 🛣️ API Routes

- `/api/auth/[...nextauth]`: Handles authentication using NextAuth.js.
- `/api/auth/signup`: Handles user registration.
- `/api/bookings`: Handles fetching and creating bookings.
- `/api/bookings/[id]`: Handles fetching, updating, and cancelling individual bookings.
- `/api/services`: Handles fetching and creating services.

## Push Notification System

Our project implements a real-time push notification system to keep users informed about style updates across the application. This system ensures that all connected clients receive instant updates when global styles are changed.

[... Keep the existing Push Notification System section ...]

## 🏁 Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/amanjoshi2002/Custom_Booking
   ```
2. Change to the project directory:
   ```sh
   cd Custom_Booking
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (see below)
5. Run the development server:
   ```sh
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

- `MONGODB_URI`: Your MongoDB connection string.
- `NEXTAUTH_SECRET`: A secret key used by NextAuth.js for encryption.

## 🔒 Security Note

1. Use a secure password for your MongoDB user.
2. Generate a strong, random string for your NextAuth secret.
3. Consider using separate databases for development and production environments.
4. Ensure that your MongoDB cluster has appropriate security measures in place.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">CUSTOM_BOOKING</h1>
</p>
<p align="center">
    <em>HTTP error 401 for prompt `slogan`</em>
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

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running Custom_Booking](#-running-Custom_Booking)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

HTTP error 401 for prompt `overview`

---

##  Features

HTTP error 401 for prompt `features`

---

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

##  Modules

<details closed><summary>.</summary>

| File                                                                                                         | Summary                                            |
| ---                                                                                                          | ---                                                |
| [server.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/server.ts)                           | HTTP error 401 for prompt `server.ts`              |
| [postcss.config.mjs](https://github.com/amanjoshi2002/Custom_Booking/blob/master/postcss.config.mjs)         | HTTP error 401 for prompt `postcss.config.mjs`     |
| [tailwind.config.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/tailwind.config.ts)         | HTTP error 401 for prompt `tailwind.config.ts`     |
| [tsconfig.json](https://github.com/amanjoshi2002/Custom_Booking/blob/master/tsconfig.json)                   | HTTP error 401 for prompt `tsconfig.json`          |
| [generateVapidKeys.js](https://github.com/amanjoshi2002/Custom_Booking/blob/master/generateVapidKeys.js)     | HTTP error 401 for prompt `generateVapidKeys.js`   |
| [package.json](https://github.com/amanjoshi2002/Custom_Booking/blob/master/package.json)                     | HTTP error 401 for prompt `package.json`           |
| [next.config.mjs](https://github.com/amanjoshi2002/Custom_Booking/blob/master/next.config.mjs)               | HTTP error 401 for prompt `next.config.mjs`        |
| [next-env.d.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/next-env.d.ts)                   | HTTP error 401 for prompt `next-env.d.ts`          |
| [example.env.local](https://github.com/amanjoshi2002/Custom_Booking/blob/master/example.env.local)           | HTTP error 401 for prompt `example.env.local`      |
| [generate-vapid-keys.js](https://github.com/amanjoshi2002/Custom_Booking/blob/master/generate-vapid-keys.js) | HTTP error 401 for prompt `generate-vapid-keys.js` |
| [package-lock.json](https://github.com/amanjoshi2002/Custom_Booking/blob/master/package-lock.json)           | HTTP error 401 for prompt `package-lock.json`      |
| [env.d.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/env.d.ts)                             | HTTP error 401 for prompt `env.d.ts`               |
| [vercel.json](https://github.com/amanjoshi2002/Custom_Booking/blob/master/vercel.json)                       | HTTP error 401 for prompt `vercel.json`            |
| [tsconfig.server.json](https://github.com/amanjoshi2002/Custom_Booking/blob/master/tsconfig.server.json)     | HTTP error 401 for prompt `tsconfig.server.json`   |

</details>

<details closed><summary>public</summary>

| File                                                                                                      | Summary                                              |
| ---                                                                                                       | ---                                                  |
| [service-worker.js](https://github.com/amanjoshi2002/Custom_Booking/blob/master/public/service-worker.js) | HTTP error 401 for prompt `public/service-worker.js` |

</details>

<details closed><summary>types</summary>

| File                                                                                               | Summary                                          |
| ---                                                                                                | ---                                              |
| [next-auth.d.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/types/next-auth.d.ts) | HTTP error 401 for prompt `types/next-auth.d.ts` |

</details>

<details closed><summary>lib</summary>

| File                                                                                     | Summary                                    |
| ---                                                                                      | ---                                        |
| [mongodb.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/lib/mongodb.ts) | HTTP error 401 for prompt `lib/mongodb.ts` |

</details>

<details closed><summary>app</summary>

| File                                                                                                                   | Summary                                                   |
| ---                                                                                                                    | ---                                                       |
| [ClientSessionProvider.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/ClientSessionProvider.tsx) | HTTP error 401 for prompt `app/ClientSessionProvider.tsx` |
| [routes.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/routes.ts)                                 | HTTP error 401 for prompt `app/routes.ts`                 |
| [globals.css](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/globals.css)                             | HTTP error 401 for prompt `app/globals.css`               |
| [page.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/page.tsx)                                   | HTTP error 401 for prompt `app/page.tsx`                  |
| [layout.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/layout.tsx)                               | HTTP error 401 for prompt `app/layout.tsx`                |
| [_app.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/_app.tsx)                                   | HTTP error 401 for prompt `app/_app.tsx`                  |

</details>

<details closed><summary>app.interface</summary>

| File                                                                                               | Summary                                              |
| ---                                                                                                | ---                                                  |
| [booking.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/interface/booking.ts) | HTTP error 401 for prompt `app/interface/booking.ts` |
| [styles.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/interface/styles.ts)   | HTTP error 401 for prompt `app/interface/styles.ts`  |

</details>

<details closed><summary>app.interface.model</summary>

| File                                                                                                     | Summary                                                    |
| ---                                                                                                      | ---                                                        |
| [Style.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/interface/model/Style.ts)     | HTTP error 401 for prompt `app/interface/model/Style.ts`   |
| [Service.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/interface/model/Service.ts) | HTTP error 401 for prompt `app/interface/model/Service.ts` |

</details>

<details closed><summary>app.bookings</summary>

| File                                                                                          | Summary                                           |
| ---                                                                                           | ---                                               |
| [page.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/bookings/page.tsx) | HTTP error 401 for prompt `app/bookings/page.tsx` |

</details>

<details closed><summary>app.bookings.[id]</summary>

| File                                                                                               | Summary                                                |
| ---                                                                                                | ---                                                    |
| [page.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/bookings/[id]/page.tsx) | HTTP error 401 for prompt `app/bookings/[id]/page.tsx` |

</details>

<details closed><summary>app.services</summary>

| File                                                                                          | Summary                                           |
| ---                                                                                           | ---                                               |
| [page.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/services/page.tsx) | HTTP error 401 for prompt `app/services/page.tsx` |

</details>

<details closed><summary>app.components</summary>

| File                                                                                                                | Summary                                                       |
| ---                                                                                                                 | ---                                                           |
| [NavBar.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/NavBar.tsx)                 | HTTP error 401 for prompt `app/components/NavBar.tsx`         |
| [HomeService.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/HomeService.tsx)       | HTTP error 401 for prompt `app/components/HomeService.tsx`    |
| [Providers.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/Providers.tsx)           | HTTP error 401 for prompt `app/components/Providers.tsx`      |
| [DefaultStyle.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/DefaultStyle.tsx)     | HTTP error 401 for prompt `app/components/DefaultStyle.tsx`   |
| [Toast.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/Toast.tsx)                   | HTTP error 401 for prompt `app/components/Toast.tsx`          |
| [Footer.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/Footer.tsx)                 | HTTP error 401 for prompt `app/components/Footer.tsx`         |
| [LoadingOverlay.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/LoadingOverlay.tsx) | HTTP error 401 for prompt `app/components/LoadingOverlay.tsx` |
| [ServiceImages.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/ServiceImages.tsx)   | HTTP error 401 for prompt `app/components/ServiceImages.tsx`  |
| [CancelButton.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/CancelButton.tsx)     | HTTP error 401 for prompt `app/components/CancelButton.tsx`   |
| [Loading.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/Loading.tsx)               | HTTP error 401 for prompt `app/components/Loading.tsx`        |
| [SignupModel.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/SignupModel.tsx)       | HTTP error 401 for prompt `app/components/SignupModel.tsx`    |
| [LoginModel.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/components/LoginModel.tsx)         | HTTP error 401 for prompt `app/components/LoginModel.tsx`     |

</details>

<details closed><summary>app.contact_us</summary>

| File                                                                                            | Summary                                             |
| ---                                                                                             | ---                                                 |
| [page.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/contact_us/page.tsx) | HTTP error 401 for prompt `app/contact_us/page.tsx` |

</details>

<details closed><summary>app.api.bookings</summary>

| File                                                                                              | Summary                                               |
| ---                                                                                               | ---                                                   |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/bookings/route.ts) | HTTP error 401 for prompt `app/api/bookings/route.ts` |

</details>

<details closed><summary>app.api.bookings.[id]</summary>

| File                                                                                                   | Summary                                                    |
| ---                                                                                                    | ---                                                        |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/bookings/[id]/route.ts) | HTTP error 401 for prompt `app/api/bookings/[id]/route.ts` |

</details>

<details closed><summary>app.api.subscribe</summary>

| File                                                                                               | Summary                                                |
| ---                                                                                                | ---                                                    |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/subscribe/route.ts) | HTTP error 401 for prompt `app/api/subscribe/route.ts` |

</details>

<details closed><summary>app.api.saveStyle</summary>

| File                                                                                               | Summary                                                |
| ---                                                                                                | ---                                                    |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/saveStyle/route.ts) | HTTP error 401 for prompt `app/api/saveStyle/route.ts` |

</details>

<details closed><summary>app.api.services</summary>

| File                                                                                              | Summary                                               |
| ---                                                                                               | ---                                                   |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/services/route.ts) | HTTP error 401 for prompt `app/api/services/route.ts` |

</details>

<details closed><summary>app.api.auth</summary>

| File                                                                                                          | Summary                                                   |
| ---                                                                                                           | ---                                                       |
| [[...nextauth].ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/auth/[...nextauth].ts) | HTTP error 401 for prompt `app/api/auth/[...nextauth].ts` |

</details>

<details closed><summary>app.api.auth.signup</summary>

| File                                                                                                 | Summary                                                  |
| ---                                                                                                  | ---                                                      |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/auth/signup/route.ts) | HTTP error 401 for prompt `app/api/auth/signup/route.ts` |

</details>

<details closed><summary>app.api.auth.[...nextauth]</summary>

| File                                                                                                            | Summary                                                           |
| ---                                                                                                             | ---                                                               |
| [options.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/auth/[...nextauth]/options.ts) | HTTP error 401 for prompt `app/api/auth/[...nextauth]/options.ts` |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/auth/[...nextauth]/route.ts)     | HTTP error 401 for prompt `app/api/auth/[...nextauth]/route.ts`   |

</details>

<details closed><summary>app.api.getStyle</summary>

| File                                                                                              | Summary                                               |
| ---                                                                                               | ---                                                   |
| [route.ts](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/api/getStyle/route.ts) | HTTP error 401 for prompt `app/api/getStyle/route.ts` |

</details>

<details closed><summary>app.settings</summary>

| File                                                                                          | Summary                                           |
| ---                                                                                           | ---                                               |
| [page.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/settings/page.tsx) | HTTP error 401 for prompt `app/settings/page.tsx` |

</details>

<details closed><summary>app.about</summary>

| File                                                                                       | Summary                                        |
| ---                                                                                        | ---                                            |
| [page.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/about/page.tsx) | HTTP error 401 for prompt `app/about/page.tsx` |

</details>

<details closed><summary>app.contexts</summary>

| File                                                                                                          | Summary                                                   |
| ---                                                                                                           | ---                                                       |
| [StyleContext.tsx](https://github.com/amanjoshi2002/Custom_Booking/blob/master/app/contexts/StyleContext.tsx) | HTTP error 401 for prompt `app/contexts/StyleContext.tsx` |

</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**: `version x.y.z`

###  Installation

1. Clone the Custom_Booking repository:

```sh
git clone https://github.com/amanjoshi2002/Custom_Booking
```

2. Change to the project directory:

```sh
cd Custom_Booking
```

3. Install the dependencies:

```sh
npm install
```

###  Running Custom_Booking

Use the following command to run Custom_Booking:

```sh
npm run build && node dist/main.js
```

###  Tests

To execute tests, run:

```sh
npm test
```

---

##  Project Roadmap

- [X] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...`

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/amanjoshi2002/Custom_Booking/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/amanjoshi2002/Custom_Booking/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/amanjoshi2002/Custom_Booking/issues)**: Submit bugs found or log feature requests for Custom_booking.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/amanjoshi2002/Custom_Booking
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---

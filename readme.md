### Clean Architecture: EFREI car rental

## How to start the server

Start docker compose to run the Postgres server

```
docker compose up -d
```

Install the dependencies

```
npm install
```

Start the server at http://localhost:4000

```
npm start
```

## Folder Structure

```
.
├── Efrei Car Rental.postman_collection.json
├── docker-compose.yml
├── package-lock.json
├── package.json
├── readme.md
├── src
│   ├── data-sources
│   │   ├── mongo.ts
│   │   └── postgres.ts
│   ├── domain
│   │   ├── interfaces
│   │   │   └── use-cases
│   │   │       ├── account
│   │   │       │   ├── create-account-use-case.ts
│   │   │       │   ├── get-all-accounts-use-case.ts
│   │   │       │   ├── get-cart-for-account-use-case.ts
│   │   │       │   └── get-one-account-use-case.ts
│   │   │       ├── car
│   │   │       │   ├── create-car-use-case.ts
│   │   │       │   ├── get-all-cars-use-case.ts
│   │   │       │   └── get-one-car-use-case.ts
│   │   │       ├── cart
│   │   │       │   ├── get-one-cart-use-case.ts
│   │   │       │   └── modify-cart-use-case.ts
│   │   │       ├── payment
│   │   │       │   ├── create-payment-use-case.ts
│   │   │       │   ├── get-all-payments-use-case.ts
│   │   │       │   └── get-one-payment-use-case.ts
│   │   │       └── reservation
│   │   │           ├── create-reservation-use-case.ts
│   │   │           ├── get-all-reservations-use-case.ts
│   │   │           └── get-one-reservation-use-case.ts
│   │   ├── models
│   │   │   ├── account.ts
│   │   │   ├── car.ts
│   │   │   ├── cart.ts
│   │   │   ├── payment.ts
│   │   │   └── reservation.ts
│   │   └── use-cases
│   │       ├── account
│   │       │   ├── create-account.ts
│   │       │   ├── get-all-accounts.ts
│   │       │   ├── get-cart-for-account.ts
│   │       │   └── get-one-account.ts
│   │       ├── car
│   │       │   ├── create-car.ts
│   │       │   ├── get-all-cars.ts
│   │       │   └── get-one-car.ts
│   │       ├── cart
│   │       │   ├── get-one-cart.ts
│   │       │   └── modify-cart.ts
│   │       ├── payment
│   │       │   ├── create-payment.ts
│   │       │   ├── get-all-payments.ts
│   │       │   └── get-one-payment.ts
│   │       └── reservation
│   │           ├── create-reservation.ts
│   │           ├── get-all-reservations.ts
│   │           └── get-one-reservation.ts
│   ├── email-providers
│   │   ├── gmail-provider.ts
│   │   └── interfaces
│   │       └── provider.ts
│   ├── index.ts
│   ├── payment-providers
│   │   ├── credit-card-provider.ts
│   │   └── interfaces
│   │       └── provider.ts
│   ├── presentation
│   │   └── routers
│   │       ├── account-router.ts
│   │       ├── car-router.ts
│   │       ├── cart-router.ts
│   │       ├── payment-router.ts
│   │       └── reservation-router.ts
│   └── server.ts
└── tsconfig.json
```

index.ts is the starting point of the server.

The presentation layer is mainly be used for inputting and outputting data (REST
API routes).

The inner core domain layer holds all business logic.

The data layer holds all infrastructure implementations (data sources).

The providers holds utils to communicates with external services (payment,
email).

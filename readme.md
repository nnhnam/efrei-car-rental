# EFREI car rental

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

## Endpoints

| REST API              | Description                              | Request schema                                                                                            | Response schema                                                                                                                                  |
| --------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST /account         | Create an account                        | email: string; firstName: string; lastName: string;                                                       | accountId: string; email: string; firstName: string; lastName: string;                                                                           |
| GET /account          | Get all accounts                         | N/A                                                                                                       | accountId: string; email: string; firstName: string; lastName: string;                                                                           |
| GET /account/:id      | Get an account with id                   | N/A                                                                                                       | accountId: string; email: string; firstName: string; lastName: string;                                                                           |
| GET /account/:id/cart | Get a cart associated with an account id | N/A                                                                                                       | cartId: string; accountId: string; cars: Car[];                                                                                                  |
|                       |                                          |                                                                                                           |                                                                                                                                                  |
| POST /car             | Create a car                             | registrationNum: string; brand: string; model: string; type: string; price: number;                       | carId: string; registrationNum: string; brand: string; model: string; type: string; price: number;                                               |
| GET /car              | Get all cars                             | N/A                                                                                                       | carId: string; registrationNum: string; brand: string; model: string; type: string; price: number;                                               |
| GET /car/:id          | Get a car with id                        | N/A                                                                                                       | carId: string; registrationNum: string; brand: string; model: string; type: string; price: number;                                               |
|                       |                                          |                                                                                                           |                                                                                                                                                  |
| POST /cart            | Modify a cart                            | carIds: string[];                                                                                         | cartId: string; accountId: string; cars: Car[];                                                                                                  |
| GET /cart             | Get all carts                            | N/A                                                                                                       | cartId: string; accountId: string; cars: Car[];                                                                                                  |
| GET /cart/:id         | Get a cart with id                       | N/A                                                                                                       | cartId: string; accountId: string; cars: Car[];                                                                                                  |
|                       |                                          |                                                                                                           |                                                                                                                                                  |
| POST /reservation     | Create a reservation from a cart         | cartId: string; // Date format YYYY-MM-DD. startDate: string; // Date format YYYY-MM-DD. endDate: string; | reservationId: string; // Date format YYYY-MM-DD. startDate: string; // Date format YYYY-MM-DD. endDate: string; accountId: string; cars: Car[]; |
| GET /reservation      | Get all reservations                     | N/A                                                                                                       | reservationId: string; // Date format YYYY-MM-DD. startDate: string; // Date format YYYY-MM-DD. endDate: string; accountId: string; cars: Car[]; |
| GET /reservation/:id  | Get a reservation with id                | N/A                                                                                                       | reservationId: string; // Date format YYYY-MM-DD. startDate: string; // Date format YYYY-MM-DD. endDate: string; accountId: string; cars: Car[]; |
|                       |                                          |                                                                                                           |                                                                                                                                                  |
| POST /payment         | Create a payment for a reservation       | paymentMethod: string; reservationId: string;                                                             | paymentId: string; total: number; paymentMethod: string; paymentDate: Date; reservationId: string;                                               |
| GET /payment          | Get all payments                         | N/A                                                                                                       | paymentId: string; total: number; paymentMethod: string; paymentDate: Date; reservationId: string;                                               |
| GET /payment/:id      | Get a payment with id                    | N/A                                                                                                       | paymentId: string; total: number; paymentMethod: string; paymentDate: Date; reservationId: string;                                               |

## Testing steps

1. Create an account using POST /account
2. Create a car using POST /car
3. Get the cart ID associated with the account using GET /account/:id/cart
4. Add the car to the cart using POST /cart/:id
5. Submit the cart and create a reservation using POST /reservation
6. Pay for the cart using POST /payment

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

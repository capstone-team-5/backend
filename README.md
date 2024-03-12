# $mrtCART Backend

Welcome to the $mrtCART backend application! This backend is designed with one core mission: to cater to the needs of shoppers who are seeking an effortless way to compare prices. Our backend empowers users to make informed purchasing decisions by providing them with a seamless and convenient experience when it comes to comparing prices for their desired products.

## The Concept

At the heart of $mrtCART lies a simple yet powerful idea: making price comparison a breeze for shoppers. The main logic of the application revolves around a user-friendly process that begins with users selecting their desired location and entering their grocery list. Once the grocery list is entered, the magic of the $mrtCART backend comes into play.

## Table of Contents

- [Trello Board](https://trello.com/b/PG58P1v8/93-capstone-team-5)
- [WireFrame](https://www.figma.com/file/O2GvnaIrPFRSURlMLNeX9w/Capstone---Team-5?type=design&node-id=0-1&mode=design&t=ZhrulM6i0d83wAcF-0)
- [Deployed Backend URL](https://)
- [Deployed Frontend URL](https://)
- Meet Team Members
- Installation

---

## Team Members

Meet the fantastic minds behind $mrtCART:

- **Diandre Miller**: Technical Lead

  - [GitHub](https://github.com/DiandreMiller)
  - [LinkedIn](https://www.linkedin.com/in/diandre-miller/)

- **Ryan Fodera**: 

  - [GitHub](https://github.com/ryanfodera)
  - [LinkedIn](https://www.linkedin.com/in/ryan-fodera/)

- **Tafari Excell**: 

  - [GitHub](https://github.com/Tafarigit)
  - [LinkedIn](https://www.linkedin.com/in/tafari-e-7a5554110/)

- **Touhami Benmessaoud**: 

  - [GitHub](https://github.com/touhami-ben)
  - [LinkedIn](https://www.linkedin.com/in/touhami-benmessaoud-aaa072259/)

- **Vandhana Mohan**: Design Lead
  - [GitHub](https://github.com/Vandhana-Mohan)
  - [LinkedIn](https://www.linkedin.com/in/vandhanamohan/)

---

## Installation

Getting started with the $mrtCART backend is a breeze:

1. Fork and Clone the repository using the following command:

   ```
   git clone <https://github.com/capstone-team-5/SmartCart-backend>
   ```

2. Navigate to the project directory and install the dependencies using the following command:

   ```
   `cd` into this repository
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=4444
   PG_DATABASE=cart_dev
   PG_HOST=localhost
   PG_USER=postgres
   ```

4. Start the server using the following command

   ```
   npm run dev
   ```

## Available Endpoints

Explore the following endpoints to interact with the $mrtCART backend:

| Method |   Endpoint    |        Description         |
| :----: | :-----------: | :------------------------: |
|  GET   |   /products   |      Get all products      |
|  GET   | /products/:id |    Get a product by ID     |
|  GET   |    /stores    |       Get all stores       |
|  GET   |  /stores/:id  |     Get a store by ID      |
|  GET   |   /reviews    |      Get all reviews       |
|  GET   | /reviews/:id  |     Get a review by ID     |
|  POST  |   /reviews    |    Create a new review     |
|  PUT   | /reviews/:id  |    Update a user review    |
| DELETE | /reviews/:id  | Delete review from product |

🍓🛒🛍🍓 Feel free to explore these endpoints to manage products, stores, and reviews for an enhanced shopping experience! 🍓🛒🛍🍓

---

<h1 align='center'>✈️🗺️ Gasbnb 🗺️✈️</h1>

<!-- <a href="https://dustydogcodex.github.io/AirBnB-Clone/"> LIVE DEMO </a> -->

<p align='center'>
    A full stack clone of Airbnb built using React, Express, MongoDb and TailwindCSS. Currently in the process of turning this from a one page front-end clone of the AirBnB home page into a full stack MERN AirBnB clone. Check back in later to see the fully functioning app!
</p>

<h3 align='center'>when you and the bois get a sick deal on that gasbnb down in tahoe:</h3>
<div align='center'>
    <img src='https://media1.giphy.com/media/XdPYDCGqky4Y2vNsRS/giphy.gif?cid=ecf05e473275n9eri7i750tbirblrbc0hwjhfw978l4ckvm0&ep=v1_gifs_related&rid=giphy.gif&ct=g'>
</div>

## Table of Contents

- [Features](#features)
    - [Future Enhancements](#future-enhancements)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [License](#license)

## Features

- Modern and sleek design using React + TailwindCSS
- Responsive design that adapts to various screen sizes
- Intuitive navbar for mobile and small screens
- User authentication and authorisation
- Add images to your listing through links or directly from your device
- Book reservations for already existing listings and create your own listings
- Expired reservations are automatically removed a day after checkout date

### Future enhancements:

- Adding functionality to search bar to filter through available listings
- Adding categories bar to find listings by category
- Improved user profiles in listing pages to see more info about users creating listings
- User reviews section

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DustyDogCodex/Gasbnb
   ```

2. Navigate to the project directory:

   ```bash
   cd Gasbnb
   ```

3. Install dependencies in client and root folders:

   ```bash
   npm install
   ```

4. Create an ```.env``` file with the following variables:
    ```
    MONGO_URL = your_mongodb_connection_string
    SESSION_SECRET = your_session_secret_key
    ```

## Usage

To run the development server and view the project in your browser, run:

```bash
npm run devstart
```

This will launch the application at `http://localhost:5000`.

## License

This project is built using the ISC license.

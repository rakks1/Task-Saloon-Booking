
# Natural Beauty Salon Booking App

## Description
This is a web-based booking application for Natural Beauty Salon, Spa, and Wellness Center, allowing users to select services, staff, dates, and times for their appointments. It offers an interactive interface where users can:

- Select services to add to the cart
- Choose staff based on availability
- Pick a date and time for their appointment
- Book their appointment with a summary of selected details

## Features

- **Service Selection**: Users can choose from a variety of beauty and wellness services.
- **Cart Management**: Users can add or remove services from the cart.
- **Staff Selection**: Users can select a staff member (or choose "No preference").
- **Date and Time Picker**: Allows users to choose an appointment date and time.
- **Total Calculation**: Automatically calculates the total cost based on selected services.
- **Responsive UI**: The application is designed to work on both desktop and mobile devices.

## Technologies Used

- **React**: For building the user interface and managing state.
- **CSS**: For styling the application (with a custom `Home.css`).
- **React Router**: For navigation within the app.
- **JavaScript**: For the interactive functionalities, including service selection and booking process.

## Setup Instructions

### Prerequisites
Make sure you have the following installed on your system:

- Node.js (version 14 or above)
- npm (Node Package Manager)

### Steps to Run the Project Locally

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate into the project directory**:

   ```bash
   cd <project-directory>
   ```

3. **Install dependencies**:

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

4. **Run the development server**:

   Start the development server with the following command:

   ```bash
   npm start
   ```

   This will open the application in your default browser at `http://localhost:3000`.

## Folder Structure

```
/src
  /components
    Home.js             # Main component of the booking page
    /Css
      Home.css          # Custom styles for the Home component
  /assets
    /images             # Image assets for the slideshow
  /data.json            # Sample data for services
  App.js                # Main entry point of the application
  index.js              # Renders the app into the DOM
```

## Available Scripts

In the project directory, you can run:

- `npm start` — Starts the development server.
- `npm test` — Launches the test runner (if tests are set up).
- `npm run build` — Builds the app for production.
- `npm run eject` — Ejects the configuration (use with caution).

## Contributing

If you would like to contribute to this project, please fork the repository, make changes, and submit a pull request. Here are a few guidelines:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your changes.
3. Write tests for your changes (if applicable).
4. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to [React](https://reactjs.org/) for building a powerful UI library.
- Special thanks to the Natural Beauty Salon team for providing the design and data.

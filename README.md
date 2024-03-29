# DexterPro Limited UI-Dashboard Project README

This repository contains the source code for a dashboard built using React.js. The dashboard includes a table component powered by Axios for fetching data and rendering the table, a line graph component utilizing Nivo for data visualization, as well as other components displaying data fetched from API endpoints.

## Libraries Used

- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to server endpoints. In this project, Axios is used for fetching data and populating the table component.
- **Nivo**: A rich set of data visualization components for React. Here, Nivo is utilized for creating visually appealing line graphs.

## API Links

The dashboard fetches data from the following API endpoints:

- "https://beta.getdexterapp.com/api/test"
- "https://beta.getdexterapp.com/api/test?page=2"
- "https://beta.getdexterapp.com/api/test?page=3"
- "https://beta.getdexterapp.com/api/test?page=4"
- "https://beta.getdexterapp.com/api/test?page=5"
- "https://beta.getdexterapp.com/api/test?page=6"

These API endpoints provide the necessary data for populating the table and generating insights for the line graph.

## Deployment

The dashboard is hosted using Vercel, a platform for deploying serverless functions and static websites. Vercel provides seamless deployment and scaling capabilities, ensuring the dashboard is accessible and performant.

## Getting Started

To run the dashboard locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Start the development server with `npm start`.
5. Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Contributing

Contributions to this project are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

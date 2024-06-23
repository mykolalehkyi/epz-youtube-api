# Angular youtube statistics
Hi, I am Mykola Lehkyi and I am Software Engineer.
This Angular application provides visualizations for video statistics stored in Azure Blob Storage. It fetches video statistics data as JSON and renders various line charts to show trends and insights related to likes, views, comments, and favorite counts over time. This tool is designed for users who need to analyze video performance on platforms such as YouTube.

Azure part: https://github.com/mykolalehkyi/SaveYouTubeVideoStatistics/
Web Api part: https://github.com/mykolalehkyi/YT_Data_Api
Angular client part: https://github.com/mykolalehkyi/epz-youtube-api 

## Features
Data Fetching: Fetch video statistics data from Azure Blob Storage using a custom service.
Chart Visualization: Utilize Chart.js to render line charts for likes, views, comments, and favorites.
Date Filtering: Offers functionality to filter data based on a specific date range, enhancing the flexibility in data analysis.
Unique Color Assignment: Each video's data line in the chart is represented with a unique color, improving readability and comparison.
## Components
- ChartService:
Handles the fetching of video list data from Azure Blob Storage.
Manages an array of VideoStatisticsSimpleModel that stores the fetched data.
-AzureBlobStorageService:
Responsible for interfacing with Azure Blob Storage to retrieve the video statistics JSON file.
Utilizes HttpClient to interact with Azure services.
- ChartComponent:
Initializes the data fetching on component load.
Renders four different line charts using Chart.js: Likes, Views, Comments, and Favorites.
Provides a method to dynamically create chart datasets based on unique video IDs and applies date filters.
## Installation
- Prerequisites:
Ensure you have Node.js and Angular CLI installed on your machine.
An active Azure subscription and access to Blob Storage are required.
- Setup:
Clone the repository to your local machine.
Navigate to the project directory and run npm install to install dependencies.
- Configuration:
Update the Azure Blob Storage credentials in the AzureBlobStorageService to match your Azure account and Blob Storage container details.
- Running the Application:
Execute ng serve in the terminal to start the development server.
Open a web browser and navigate to http://localhost:4200/ to view the application.
## Usage
On the application interface, select the date range you wish to analyze.
Data will be automatically fetched and charts rendered based on the selected dates.
Each chart can be viewed individually with corresponding video statistics highlighted.
## Conclusion
This application serves as a robust tool for analyzing video performance data, providing clear visual insights through customizable charts. It is built with scalability in mind, allowing for further enhancements such as adding more types of data visualizations or integrating with other data sources.

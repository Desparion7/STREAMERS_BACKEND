# Dare Drop Streamers Spotlight BACKEND

# Project Overview

This project is a Node.js backend application that serves as a streamer list manager. It allows users to store and manage a list of streamers.

# Getting Started

To get started with this project, follow the steps below:

1. Make sure you have Node.js installed on your machine. You can download it from nodejs.org.
2. Clone the project repository to your local machine:

> git clone <repository-url>

3. Navigate to the project directory
4. Install the project dependencies:

> npm install

5. Start the development server:

> npm run start

6. You should see the application running on http://localhost:3000/

# API Documentation

The project provides an API for managing the streamer list. Here are some key endpoints:

-   POST /streamers: An endpoint to receive new streamer submissions from the frontend and store them in a database
-   GET /streamers: An endpoint to return all the stored streamer submissions in response to a request from the frontend.
-   GET /streamers/:streamerId An endpoint to return data about a specific streamer.
-   PUT /streamers/:streamerId An endpoint to receive an upvote for a specific streamer and update their current upvote/downvote count.

# Contact

If you have any questions or suggestions regarding this project, feel free to contact us at wosmateusz2@gmail.com

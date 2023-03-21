![Stream Me Logo](./public/images/stream_me_logo.png)

Strem Me is a streaming web application, built with cutting-edge technologies such as React, Typescript, NodeJS, PostgreSQL, AdminJS, and Sequelize. This app provides a complete solution for streaming videos, with a sleek and intuitive user interface and a powerful back-end for efficient data management. While the platform currently features a selection of short, copyright-free videos, it is designed to accommodate real courses and episodes with ease. The application is hosted on AWS, providing reliable and scalable hosting solutions. Whether you are a video enthusiast looking for the latest content or an administrator in need of a comprehensive platform to manage your video content, Stream Me has you covered.

## Table of Contents

- [Usage](#usage)
- [Features](#features)
- [API Design](#api)
- [Technologies](#technologies)
- [Installation](#installation)

## Usage

To use this application, you will need to have Node.js and PostgreSQL installed on your system. Here are the general steps:
1. Clone this repository to your local machine.
2. Install dependencies by running **`npm install`** in both the root directory and client directory.
3. Create a PostgreSQL database with the name 'stream_me_db' and update the database configuration in the .env file located in the server folder.
4. Run the database migration by running **`npx sequelize-cli db:migrate`** in the server directory.
5. Seed the database with some initial data by running **`npx sequelize-cli db:seed:all`** in the server directory.
6. Start the application by running **`npm run dev`** in the root directory.
7. Open your browser and navigate to **`http://localhost:3001`** to see the application in action.

## Features

This application provides the following features:

- User authentication: users can create an account, log in and log out.
- User authorization: users have different roles in order to restrict access.
- Video streaming: users can browse, search and watch videos on the platform.
- Admin panel: administrators can manage the application by accessing the admin panel, which allows them to manage users, videos and categories.
- Database management: the Sequelize library is used to communicate with the PostgreSQL database, which provides efficient and reliable data management.

While the platform currently features a selection of short, copyright-free videos, it is designed to accommodate real courses and episodes with ease.

## API Design
I designed the API to be powerful, flexible, and easy to use. I used Postman to create a comprehensive API documentation that you can use to understand the available endpoints and parameters. You can access the documentation by clicking on this link: [link to API documentation](https://documenter.getpostman.com/view/19214258/2s93RKzbXT).

The API is built using NodeJS and PostgreSQL, and uses the Sequelize ORM to interact with the database. We have also implemented authentication and authorization using JSON Web Tokens (JWT). This ensures that only authorized users can access the API and perform certain actions.

If you have any questions or issues with the API, please feel free to open an issue in this GitHub repository.

## Technologies
This application was built using the following technologies:

- Front-end: HTML, CSS, Javascript, React, and Typescript.
- Back-end: Typescript, NodeJS, PostgreSQL, AdminJS, and Sequelize.
- Host: AWS

## Installation
To install and run this application locally, please follow the instructions provided in the [Usage](##usage) section above.

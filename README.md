# caption_contest
> Basic API that allows authenticated users to submit captions for images in a photo contest. 
> Live demo [_here_](image-contest-api.herokuapp.com).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)


## General Information
This project was completed to satisfy a portfolio component of the Back-End Engineer career path on Code Academy. The goal of the project was to implement an API for a caption contest where users could create an account, login, and submit captions for various images. The project built on previous portfolio components, adding basic authentication using Passport.js and caching using node-cache.  


## Technologies Used
- Express - version 4.17.1
- PostgreSQL - version 13
- Swagger - OpenAPI Specification 2.0
- Passport.js - version 0.4.1
- Sequelize - version 6.6.5
- bcrypt - version 5.0.1
- cookie-session - version 1.4.0
- node-cache - version 5.1.2 


## Features
List the ready features here:
- Endpoints for authentication (logging in, logging out, creating an account), viewing images, and submitting captions. 
- PostgreSQL database for storing images, captions, and user information. 
- Basic authentication using Passport.js. Passwords are hashed using bcrypt before being stored in the database. 
- Server cache using node-cache for frequently accessed images. 


## Setup
- In order to deploy to Heroku, edit the "host" field in the `swagger.json` file to update the swagger documentation. Otherwise, the program is ready for immediate deployment. 
- In order to deploy locally, also edit the "development" object in the `database.json` file to match your local database. The basic structure of the database can be created by running the migrations in the migration folder using sequelize. Five default images can also be added by running the seeders. 
- During deployment to Heroku, the "build" command in the `package.json` file is run. This command seeds the database, clears all data from the Images and Captions tables, and re-seeds the five default images. If you want to change this behavior, edit this command. 


## Usage
The swagger documentation can be accessed through the root directory '/'. 


## Project Status
Project is:  _complete_ 


## Room for Improvement
- Better error handling for endpoints. 
- Ability to edit your own captions. 


## Acknowledgements
Full credit to the Code Academy Back-End Engineering career pathway. 

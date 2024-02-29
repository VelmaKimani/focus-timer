# Focus Timer frontend
# Overview
This Focus Timer is a web application designed to help users manage their time efficiently using the Pomodoro Technique. It includes features such as task tracking, user authentication, and activity reporting.

# Table of Contents
-Getting Started
-Features
-Dependencies
-Installation
-Usage
-Folder Structure
-Contributing
-License

# Getting Started
To run the Focus Timer locally, follow the installation instructions below.

# Features
-User Authentication: Allows users to sign up, log in, and log out securely.
-Task Management: Provides functionalities to add, update, and delete tasks with specific details such as title, category, and completion status.
-Timer Functionality: Utilizes the Pomodoro Technique for time management, allowing users to focus on tasks for a set period with breaks in between.
-Activity Reporting: Generates activity reports, summarizing hours worked, days accessed, and streak information.

# Dependencies
axios: HTTP client for making API requests.
luxon: Library for handling dates and times.
react: JavaScript library for building user interfaces.
react-dom: Entry point for DOM-specific methods.
react-router-dom: Provides routing for React applications.
sweetalert2: Customizable alert and modal dialogs.

# Installation
1.Clone the repository:

git clone https://github.com/your-username/focus-timer.git

2.Navigate to the project directory:

cd focus-timer

3.Install dependencies:

npm install

# Usage
Start the development server:

npm start
-Open your browser and navigate to http://localhost:3000 to use the Focus Timer.

# Folder Structure
The project structure is organized as follows:

src:
-components: Contains React components for different sections of the application.
-context: Houses context providers for user authentication, tasks, and reporting.
-images: Stores images used in the application.
-styles: Includes CSS files for styling.

# License
This project is licensed under the MIT License

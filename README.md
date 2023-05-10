
# SSI Management App

The Standard Settlement Instructions Management System is a software application designed to streamline the process of managing and maintaining settlement instructions for financial transactions. This system is intended to simplify the process of managing settlement instructions for both individuals and businesses, providing a reliable and efficient way to manage this critical aspect of financial transactions.

With the Standard Settlement Instructions Management System, users can easily create, update, and manage settlement instructions for a wide range of financial transactions, including securities, foreign exchange, and money market transactions. This system provides a user-friendly interface that makes it easy for users to input and update settlement information, and it also includes advanced features like automatic validation and error checking to ensure accuracy and reliability.

One of the key benefits of the Standard Settlement Instructions Management System is its ability to help reduce errors and streamline the settlement process. By providing a centralized platform for managing settlement instructions, this system can help eliminate the need for manual data entry and reduce the risk of errors that can occur when using spreadsheets or other manual processes.

This project is open-source and welcomes contributions from developers of all skill levels. If you're interested in contributing to this project, please see our contribution guidelines for more information.

Thank you for your interest in the Standard Settlement Instructions Management System! We hope that you find it to be a useful tool for managing your financial transactions.


## Licenses


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Features

- Light/dark mode toggle

- **Login/logout feature:** This feature allows users to securely login and logout of the application, ensuring that only authorized users can access the system.

- **Change password feature:** This feature enables users to change their password, ensuring that they can maintain the security of their account and protect their sensitive information.

- **Email verification feature:** This feature provides an additional layer of security by requiring users to verify their email address before they can access the system.

- **Landing page:** The landing page is the first page that users see when they visit the website. It provides an overview of the application and allows users to navigate to other pages within the system.

- **User authentication using JWT token:** This feature uses JSON Web Tokens (JWT) to authenticate users and ensure that only authorized users can access the system.

- **User roles:** User roles allow the system to distinguish between different types of users and provide them with appropriate levels of access to the application.

- **Dashboard:** The dashboard is a centralized location where users can view all the SSI present in the system and can view individual SSI information.

- **Manage SSI screen:** This feature allows users to manage their Standard Settlement Instructions (SSI). They can make any SSI primary, delete it as necessary or edit an SSI if required.

- **Manage users:** This feature allows administrators to manage user accounts. They can make any user an admin or view-only user as well as manage the user's profile information.

- **Add user:** This feature enables administrators to add new users to the system. They can input the new user's information and assign a user role to the account.
## Run Locally

Clone the project

```bash
  git clone https://github.com/vishesh-baghel/ssi-management-app.git
```

Go to the project directory

```bash
  cd my-project
```

Install node dependencies by going to the webapp directory

```bash
  cd my-project/product-webapp/webapp
  npm install
```
To deploy this project go back to the parent directory and run 

```bash
  sudo docker-compose up
```

To check all the running containers run

```bash
  sudo docker ps -a
```


## Tech Stack

**Client:** React, Material UI

**Server:** Spring Boot


## Support

For support, email me at visheshbaghel99@gmail.com


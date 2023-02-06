<img src="https://github.com/MaxWanless/max-wanless-kanban-app/blob/main/client/src/assets/images/favicon.png?raw=true" width="48" height="48">

# React KanBan App

A MERN stack Kanban web application that streamlines project management with its intuitive drag-and-drop interface. Easily categorize tasks and track progress with real-time updates and visual representation.

## Table of Contents

- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Setup Instructions](#EF%B8%8F-setup-instructions)
- [Next Steps](#-next-steps)
- [Contact Me](#-contact)

## 📲 Live Demo

Just working on hosting, Stay tuned for a live [Demo](https://max-wanless-kanban.netlify.app).

## 💻 Tech Stack

### Front-End

- React
- Material UI
- Axios
- React Router Dom
- Redux

### Back-End

- Node.js
- Express
- MongoDB
- JSON Web Token (JWT)
- REST API

## ✨ Features

- Create KanBan Boards, sections and tasks for project tracking.
- Intuitive drag-and-drop interface for task categorization.
- Data persistence with MongoDB.
- User authentication with JSON Web Tokens (JWT)

## 📸 Screenshots

Login Page
![Login Page](https://github.com/MaxWanless/max-wanless-kanban-app/blob/main/screenshots/Login_Page.png?raw=true)

Signup Page
![Signup Page](https://github.com/MaxWanless/max-wanless-kanban-app/blob/main/screenshots/Signup_Page.png?raw=true)

Board Page Dark
![Board Page Dark](https://github.com/MaxWanless/max-wanless-kanban-app/blob/main/screenshots/Board_Page_Dark.png?raw=true)

Board Page Light
![Board Page Light](https://github.com/MaxWanless/max-wanless-kanban-app/blob/main/screenshots/Board_Page_Light.png?raw=true)

Task View
![Task View](https://github.com/MaxWanless/max-wanless-kanban-app/blob/main/screenshots/Task_View.png?raw=true)

<br />



## ⚙️ Setup Instructions

- Download or clone the project repository.
- Create a MongoDB account and follow the steps for setting up a new cluster. [Getting started](https://www.mongodb.com/docs/manual/tutorial/getting-started/) 
- In the client folder create a `.env` file with the following variables:
  - `REACT_APP_BASE_URL` The url your API server is running on. (eg. "http://localhost:3001/api/v1/")
- In the server folder create a `.env` file with the following variables:
  - `PORT` The port you wish your API server to run on. (eg. "3001")
  - `MONGO_URL` The url for your API server. (eg. "mongodb+srv://<user>:<passord>@cluster0")
  - `PASSWORD_SECRET` The secret key used to encrypt your password for storage.
  - `TOKEN_SECRET` The secret key used to generate your JSON Web Token.
- `npm run i` in root folder.
- `npm run postInstall` in root folder.
- `npm run dev` in root folder.
- If port is already in use, use command `killall -9 node` and start again.

## 👟 Next Steps

- Optimize for mobile viewing.

## 📬 Contact

If you have any questions regarding this project please feel free to reach out to me:
<br />
<br />
[<img align="left" alt="codeSTACKr | LinkedIn" width="22px" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" />][linkedin]
<br />

[linkedin]: https://www.linkedin.com/in/maxwanless/

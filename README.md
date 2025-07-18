# WIZR (Backend)

>The deployed version of the backend API can be found at https://wizr-z1na.onrender.com/.

>The frontend repository for this project can be found at https://github.com/kshbarge/wizr.

WIZR is a video app that is designed to help you share knowledge with other users. By logging in to your account and selecting something you want to learn and something you want to teach, you can get paired with another user who's needs match yours and be placed into a video chat with them.

## Project overview

The WIZR backend has been scaffolded using the Nest.js framework for Node.js. The majority of our work can be found within the src file, with separate nested folders for the chat, video and match modules. All the test data and custom hooks for our MongoDB database can also be found in this repository.

When running the project locally, please run `npm install` first to make sure that all of the app's dependencies are accessible. To run the backend, use `npm run start:dev`. The minimum node version requirement for this project is v23.11.0.
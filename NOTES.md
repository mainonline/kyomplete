# KYO APP task management dashboard

## Frontend/Backend Notes

These notes relate to both the frontend and backend components of the app.

Before commencing the development of any app, we conduct research to identify and analyze similar apps and platforms that are highly regarded by users. In my case, I drew inspiration from Notion, Trello, and Asana—widely used applications in their respective domains.

### Tech Stack

- **Backend**: I used Node.js with the Express.js framework in TypeScript, along with MongoDB for the database.

- **Frontend**: I chose React.js, complemented by Material-UI (MUI) and Tailwind CSS. For state management, I found Redux Toolkit to be the most suitable choice.

### Authorization

As per the task requirements, implementing a robust user authorization system was essential. To achieve this, I employed JSON Web Tokens (jsonwebtoken), and I also integrated email notifications using Nodemailer to communicate with users from the server.

### Importance of User Experience and UI

In product development, one of the most challenging aspects is to create simple and intuitive interfaces for even the most complex applications. To address this challenge, I incorporated interactive left and right sidebars to enhance the user experience.

...more notes to come
# Frontend/Backend

*These notes pertain to both the frontend and backend parts of the app.*

Before commencing the development of any app, we conduct research to identify and analyze similar apps and platforms that are highly regarded by users. In my case, I drew inspiration from Notion, Trello, and Asana—widely used applications in their respective fields.

## Tech Stack

For the backend, I used Node.js with the Express.js framework in TypeScript, along with MongoDB for the database.

For the frontend, I decided to use React.js with Material-UI (MUI) and Tailwind CSS. For state management, the best option was to use Redux Toolkit.

## Authorization

Based on the provided task, it was necessary to implement a user authorization system. I achieved this using JSON Web Tokens (jsonwebtoken), and I also integrated email notifications to users from the server using Nodemailer.

## Future

In the app, users should be able to create teams and send invitation links to other users, who can then join the team, project, and more. Additionally, notifications will be added.

## Importance of User Experience and UI

One of the most challenging aspects of product development is to create simple and intuitive interfaces, even for complex applications. To address this challenge, I decided to use interactive left and right sidebars.

### In Progress

- Implement error handling and display errors to users using toasts, snackbars, dialogs, and more so that users can understand their mistakes based on the errors they encounter.
- Implement data filtering and sorting to help users easily find what they're searching for.

### Future

The main UI part involves loading pages. For tasks and other components, we have to implement loading state elements since all data coming from the database is asynchronous. Implement loading state management in Redux and develop components.

...more notes coming soon 😄
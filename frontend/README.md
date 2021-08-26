# DJ events

Forked from <https://github.com/bradtraversy/dj-events-frontend> of Brad Traversy.

This is an event website built with NextJS for frontend and use Strapi as the backend. In this project, I put a lot of comments in the code so that you can easily follow along.

## Features

- Authentication using JWT
  - Login/Logout
  - User registration
- Events
  - Pagagination on events page
  - Search page
  - Single event page
  - Create/Delete/Edit events (user only)
- Upload image to Cloudinary

## What you will learn

- Routing features of NextJS
- Data fetching using `getStaticProps` and `getStaticPaths`

## Built With

- NextJS
- TypeScript
- React Icons
- Strapi
  - qs: recommended to generate complex query string
  - strapi-provider-upload-cloudinary: synchronize strapi media upload with your cloudinary.
    - Create a file named `plugins.js`
    - Copy code from the npm page of the package
    - Create `.env` file
  - slugify: create strapi slugify system.
    - Go to `api/events/models/events.js` and copy code from strapi docs for slugify systems
- React Toastify

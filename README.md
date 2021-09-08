# DJ events

Forked from <https://github.com/bradtraversy/dj-events-frontend> of Brad Traversy.

This is an event website built with NextJS for frontend and use Strapi as the backend. In this project, I put a lot of comments in the code so that you can easily follow along.

Link demo: <https://nextjs-dj-events.vercel.app/>. Feel free to play with it and let me know if there is any bug.

## Pages

- Homepage: Display 3 latest events
- Events
  - Display all events
  - Has pagination
- Single Event
- Login
- Registration
- Dashboard
  - Display event of the logged in user
  - Delete/Edit that event
- Add event
- Edit event

## Features

- Authentication using JWT HttpOnly Cookies
  - Login: then redirect to dashboard
  - Logout: then redirect to homepage
  - User registration: if successfull, redirect to the dashboard
- Events
  - Pagagination on events page
  - Search page: Search from the search form in the header
  - Create/Delete/Edit events (user only)
- Synchronize Strapi's media upload with Cloudinary

## What you will learn

- Routing features of NextJS
- Data fetching in NextJS using `getStaticProps` and `getStaticPaths`
- Create a modal using React Portal and NextJS custom document
- Strapi Authentication, refer the [Doc section](#doc) for more details

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
- Cookie: we use this package to save the user's token

## Doc

### Authentication

- Login
  - Create a NextJS api for login ('api/login')
  - When the user login, he connects to 'auth/local' endpoint for authentication.
  - If the credentials is true, the API returns the user data and we save it into the context's user state.
  - Then we redirect the logged-in user to the dashboard page.
- Register
  - It is the same as login. We replace 'auth/local' by 'auth/local/register'
- Check if user is logged in
  - When we refresh the page, the credentials is gone as well. So we need to save the user's token into the cookies of the header. And we use this token to check if the user is logged in. This check is implemented everytime we access to the page.
  - We create another api for this check, named 'api/user',
  - We retrieve the token from header and send it to 'users/me' endpoint of Strapi.
  - If success, the API return the user object and we save it to the context's user state
- Logout
  - Delete token
  - setUser(null)
  - Redirect to homepage

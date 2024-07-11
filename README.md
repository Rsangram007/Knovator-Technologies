


## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on the provided `.env` template
4. Start the application: `npm start`

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and get a JWT token

### Posts

- `POST /api/posts`: Create a new post (authenticated)
- `GET /api/posts`: Get all posts of the authenticated user
- `GET /api/posts/:id`: Get a post by ID (authenticated)
- `PUT /api/posts/:id`: Update a post by ID (authenticated)
- `DELETE /api/posts/:id`: Delete a post by ID (authenticated)
- `GET /api/posts/location?latitude=<lat>&longitude=<lon>`: Get posts by location (authenticated)
- `GET /api/posts/counts`: Get the count of active and inactive posts (authenticated)
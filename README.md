

# Posts App 
 <p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs" />
  </a>
</p>
####  This simple blogging platform is built with a MERN (MongoDB, Express.js, React, Node.js) stack.  

#### It allows users to create, read, update, and delete posts. The application supports user authentication, post management, and provides a clean and intuitive user interface.
---
Created during  the course "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)"

---

## Features

### User Authentication
- **Sign Up & Login**: Users can sign up and log in to the application using their email and password.
- **JWT Authentication**: Authentication is managed using JSON Web Tokens (JWT), ensuring secure access to user-specific data.
- **User Status**: Users can set and update their status.

### Post Management
- **Create Post**: Authenticated users can create new posts with a title, content, and image URL.
- **View Posts**: All users can view the list of posts, including details such as the post title, content, and the date it was posted.
- **Edit Post**: Authenticated users can update their existing posts.
- **Delete Post**: Authenticated users can delete their posts.

### Pagination
- **Post Listing**: Posts are displayed with pagination, allowing users to navigate through multiple pages of content.

### Real-Time Interface
- **React Frontend**: The frontend is built using React, providing a dynamic and responsive user interface.
- **GraphQL**: The backend API is built with GraphQL, allowing efficient querying of data with minimal overhead.

### Dependencies

The application relies on the following key dependencies:

- **bcryptjs**: Used for hashing user passwords before storing them in the database.
- **body-parser**: Middleware for parsing incoming request bodies in a middleware before your handlers.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **express**: The web framework used for building the backend of the application.
- **express-graphiql-explorer**: Provides an in-browser IDE for writing, validating, and testing GraphQL queries.
- **express-validator**: Middleware for validating and sanitizing user input.
- **graphql**: The GraphQL language implementation used for defining the schema and resolvers.
- **graphql-http**: A GraphQL over HTTP server.
- **graphql-playground-middleware-express**: Provides an in-browser IDE for testing GraphQL queries.
- **jsonwebtoken**: Used for signing and verifying JSON Web Tokens.
- **mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model data.
- **multer**: Middleware for handling `multipart/form-data` for file uploads.
- **validator**: Library for string validation and sanitization.

## GraphQL Schema

The backend is powered by a GraphQL API with the following schema:

### Types

- **Post**
  - `_id: ID!`: The unique identifier of the post.
  - `title: String!`: The title of the post.
  - `content: String!`: The content/body of the post.
  - `imageUrl: String!`: The URL of the image associated with the post.
  - `creator: User!`: The user who created the post.
  - `createdAt: String!`: The timestamp when the post was created.
  - `updatedAt: String!`: The timestamp when the post was last updated.

- **User**
  - `_id: ID!`: The unique identifier of the user.
  - `name: String!`: The name of the user.
  - `email: String!`: The email of the user.
  - `password: String`: The hashed password of the user.
  - `status: String!`: The status/message of the user.
  - `posts: [Post!]!`: The list of posts created by the user.

- **AuthData**
  - `token: String!`: The JWT token for authenticated requests.
  - `userId: String!`: The unique identifier of the authenticated user.

- **PostData**
  - `posts: [Post!]!`: A list of posts.
  - `totalPosts: Int!`: The total number of posts available.

### Inputs

- **UserData**
  - `email: String!`: The user's email.
  - `name: String!`: The user's name.
  - `password: String!`: The user's password.

- **PostInputData**
  - `title: String!`: The title of the post.
  - `content: String!`: The content of the post.
  - `imageUrl: String!`: The URL of the image associated with the post.

### Queries

- **login(email: String!, password: String!): AuthData!**: Authenticates a user and returns the token and user ID.
- **posts(page: Int): PostData!**: Fetches a paginated list of posts.
- **post(id: ID!): Post!**: Fetches a single post by ID.
- **user: User!**: Fetches the authenticated user's data.

### Mutations

- **createUser(userInput: UserData): User!**: Creates a new user.
- **createPost(postInput: PostInputData): Post!**: Creates a new post.
- **updatePost(id: ID!, postInput: PostInputData): Post!**: Updates an existing post.
- **deletePost(id: ID!): Boolean**: Deletes a post by ID.
- **updateStatus(status: String!): User!**: Updates the authenticated user's status.

## Running the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/victoriababala/posts-app.git
   ```

2. **Install dependencies**:
   ```bash
   cd posts-app
   npm install
   ```

3. **Create a `.env` file** in the root directory and set the required environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWTSecretkey=your_jwt_secret
   ```

4. **Run the backend server**:
   ```bash
   npm start
   ```

5. **Run the frontend**:
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**: Open your browser and go to `http://localhost:3000`.


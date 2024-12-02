# Labbtest

User Management API
This is a simple Node.js Express application that provides basic CRUD operations (Create, Read, Update, Delete) for managing users. The API uses MongoDB for data storage and Mongoose for interacting with the database.

Features
Create User: Adds a new user to the database.
Read Users: Retrieves all users or a user by ID.
Update User: Updates a user's information by ID.
Delete User: Deletes a user from the database by ID.
MongoDB: Uses MongoDB for data storage via Mongoose.
Environment Variables: Utilizes .env for configuration like the MongoDB connection string.
Requirements
Node.js: v14 or higher
MongoDB: A MongoDB instance (local or cloud, e.g., MongoDB Atlas).
.env File: To store environment variables such as the MongoDB connection string and port.
Installation
1. Clone the repository
bash
Kopiera kod
git clone https://github.com/your-username/your-repository.git
2. Install dependencies
Navigate to the project directory and install the required dependencies.

bash
Kopiera kod
cd your-repository
npm install
3. Setup .env file
Create a .env file in the root of the project and add the following variables:

env
Kopiera kod
MONGO_CONNECTION_STRING=mongodb://localhost:27017/yourdbname
PORT=5000
Replace yourdbname with the name of your MongoDB database. If you're using MongoDB Atlas, replace the connection string with your Atlas URL.

4. Run the application
Start the server by running:

bash
Kopiera kod
npm start
The application will run on port 5000 (or the port defined in the .env file).

File Structure
bash
Kopiera kod
/project-root
  ├── src/
  │   ├── models/
  │   │   └── User.js           # User model schema
  ├── .env                      # Environment variables (MONGO_CONNECTION_STRING, PORT)
  ├── index.js                  # Main server file
  ├── package.json              # Project dependencies and scripts
  └── README.md                 # Project documentation
API Endpoints
1. Create User
POST /users: Creates a new user with a username and password.
Request Body:
json
Kopiera kod
{
  "username": "newuser",
  "password": "password123"
}
Response:
json
Kopiera kod
{
  "_id": "userId",
  "username": "newuser",
  "password": "hashedPassword"
}
2. Get All Users
GET /users: Retrieves a list of all users.
Response:
json
Kopiera kod
[
  {
    "_id": "userId",
    "username": "user1",
    "password": "hashedPassword"
  },
  {
    "_id": "userId2",
    "username": "user2",
    "password": "hashedPassword"
  }
]
3. Get User by ID
GET /users/:id: Retrieves a user by their ID.
Response:
json
Kopiera kod
{
  "_id": "userId",
  "username": "user1",
  "password": "hashedPassword"
}
4. Update User
PUT /users/:id: Updates the username of a user by their ID.
Request Body:
json
Kopiera kod
{
  "username": "updatedUsername"
}
Response:
json
Kopiera kod
{
  "_id": "userId",
  "username": "updatedUsername",
  "password": "hashedPassword"
}
5. Delete User
DELETE /users/:id: Deletes a user by their ID.
Response:
json
Kopiera kod
{
  "message": "User deleted"
}
Security
Password Handling: The application stores passwords in the database but does not hash them. For production applications, you should hash passwords using libraries like bcryptjs.
Environment Variables: The MongoDB connection string and other sensitive data should be stored in the .env file to keep them secure.
Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request with improvements or bug fixes.

License
This project is licensed under the MIT License
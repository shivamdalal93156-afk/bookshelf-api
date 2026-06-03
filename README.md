# Bookshelf API & Identity Management Platform

A highly structured, production-ready RESTful API built with Node.js, Express, and MongoDB. This platform implements secure user authentication, role-based access contexts, and an isolated, validated book management ecosystem where records are strictly mapped to authenticated user entities.

## 🏗️ Architectural Pattern

The codebase adheres strictly to the **MVC (Model-Controller-Service)** design pattern to enforce an absolute separation of concerns, ensuring modularity, clear debugging paths, and clean horizontal scaling.

```text
├── DB/                  # Database connection orchestration
├── controller/          # HTTP Request/Response translation layer
├── middleware/          # Network gates (JWT verification, multi-stream validation)
├── models/              # Mongoose structural database schemas
├── routes/              # Express endpoint routers
├── schema/              # Zod schema validation rules
├── services/            # Isolated database business logic (Decoupled from Express)
├── app.js               # Express app initialization and global error handler middleware
└── server.js            # Main Node.js runtime process initialization listener


Technical Highlights & Engineering Pillars
Relational Identity Mapping: Implements robust MongoDB relational reference keys (userId pointing to the User model) across collections. Users interact strictly with their own isolated book instances; data corruption or cross-user visibility is completely blocked.

Fail-Safe Request Validation: Integrates Zod Schema Parsing directly at the network routing layer. Invalid payloads (e.g., missing data blocks, incorrect formats) are rejected at the application gate before ever hitting database resources, protecting system performance.

Stream-Based Upload Configurations: Integrated with a secure multer engine configuration mapping designated mimetype evaluation arrays (image/jpeg, image/png, image/webp) and strict file size buffers to protect disk infrastructure from malicious scripts.

Decoupled Business Services: Database querying layers are written completely independent of the Express framework. They accept clean variable parameters and return strict data documents, allowing the underlying query logic to be universally reusable across alternative runtime adapters (e.g., microservices or cron jobs).

Robust Error Handling Pipeline: Features a centralized Express error interceptor that safely handles thrown operational errors and formats clean 400/404/401/500 JSON payloads for client feedback without leaking server trace data.

📡 API Reference Manual
🔐 Account & Authentication Routing
Register User
URL Endpoint: POST /register

Validation Payload Required:

JSON
{
  "name": "Full Name",
  "email": "user@example.com",
  "password": "securePasswordMin8Chars",
  "phone_no": "10DigitString"
}
Success Status: 201 Created

User Login
URL Endpoint: POST /login

Success Status: 200 OK

Response Payload:

JSON
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
📚 Secured Book Management Routing (Requires Authorization Token)
💡 Note: All book management endpoints are protected by an authentication gate. You must supply your signed token inside the request header as: Authorization: Bearer <your_jwt_token>

Add Book to Personal Shelf
URL Endpoint: POST /add_book

Validation Payload Required: (Title, Author, and Note properties must all be strings between 10 and 100 characters long).

JSON
{
  "title": "Clean Code Handbook",
  "author": "Robert C. Martin",
  "note": "Essential reading for senior software engineering concepts."
}
Success Status: 201 Created

Fetch Personal Bookshelf
URL Endpoint: GET /books

Success Status: 200 OK

Description: Returns a customized array containing exclusively the book documents created by and referenced to the authenticated user's ID.

Delete Book Entry
URL Endpoint: DELETE /delete/:id

Success Status: 200 OK

Description: Permanently drops the designated book from MongoDB, verifying both the target entity ID and the matching owner's authorization context.

⚙️ Environment Variables Setup
Create a .env file in the root configuration directory matching the layout pattern below:

Code snippet
PORT=9000
MONGO_URL=your_mongodb_connection_uri_string
JWT_TOKEN=your_private_cryptographic_signing_key
🏃‍♂️ Getting Started Locally
Clone the repository framework directly from GitHub:

Bash
git clone [https://github.com/shivamdalal93156-afk/bookshelf-api.git](https://github.com/shivamdalal93156-afk/bookshelf-api.git)
cd bookshelf-api
Install all necessary technical dependencies listed inside package.json:

Bash
npm install
Set your production or testing .env configurations, then boot up the API engine:

Bash
npm start
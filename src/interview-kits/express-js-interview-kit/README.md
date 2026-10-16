# 🟢 Express.js Interview Questions

# 📚 PART 1 — THEORY QUESTIONS

## 1. Express.js Fundamentals & Architecture ⭐⭐⭐⭐⭐

1. What is Express.js, and why is it used with Node.js?
2. What are the main features of Express.js?
3. What is the difference between Node.js and Express.js?
4. How do you create an Express.js server?
5. What is the request-response lifecycle in Express.js?
6. What is the difference between Express.js and other Node.js frameworks?
7. What is routing in Express.js?
8. What are `req`, `res`, and `next` in Express.js?

## 2. Middleware & Request Lifecycle ⭐⭐⭐⭐⭐

1. What is middleware in Express.js?
2. What are the different types of middleware?
   - Application-level middleware
   - Router-level middleware
   - Built-in middleware
   - Error-handling middleware
   - Third-party middleware
3. What is the difference between `app.use()` and `app.get()`?
4. How does middleware execution order work?
5. What happens if middleware does not call `next()` or send a response?
6. What is the difference between `next()` and `next(err)`?
7. How do you create custom middleware?
8. How do you handle errors in asynchronous middleware?
9. What is the purpose of `express.json()` and `express.urlencoded()`?
10. What is the difference between `express.json()` and `body-parser`?

## 3. Routing & Route Parameters ⭐⭐⭐⭐⭐

1. What is routing in Express.js?
2. What is the difference between `app.get()`, `app.post()`, `app.put()`, and `app.delete()`?
3. What is the difference between `req.params`, `req.query`, and `req.body`?
4. What are route parameters?
5. How do you define optional and dynamic routes?
6. What is `express.Router()`?
7. Why should you use modular routes?
8. What is route chaining using `app.route()`?
9. How do you handle 404 routes?
10. How does Express.js determine which route handler executes first?

## 4. Request & Response Handling ⭐⭐⭐⭐

1. What is the difference between `res.send()`, `res.json()`, and `res.end()`?
2. What is the purpose of `res.status()`?
3. What is the difference between `res.redirect()` and `res.render()`?
4. How do you set HTTP headers in Express.js?
5. How do you send files using `res.sendFile()`?
6. How do you download files using `res.download()`?
7. What is the difference between `req.headers` and `req.get()`?
8. How do you access cookies and query parameters?
9. What happens if you send multiple responses for one request?
10. What does the error `Cannot set headers after they are sent to the client` mean?

## 5. REST APIs & HTTP Methods ⭐⭐⭐⭐⭐

1. What is a REST API?
2. What are the REST principles?
3. What is the difference between `PUT` and `PATCH`?
4. What are HTTP status codes, and which ones are commonly used?
5. What is the difference between `200`, `201`, `204`, and `304`?
6. What is the difference between `400`, `401`, `403`, `404`, and `409`?
7. What is the difference between `500`, `502`, and `503`?
8. What is idempotency in REST APIs?
9. How do you implement pagination, sorting, and filtering?
10. How do you version an Express.js API?
11. How do you validate incoming API requests?
12. How do you design consistent API responses?

## 6. Authentication & Authorization ⭐⭐⭐⭐⭐

1. What is the difference between authentication and authorization?
2. What is JWT authentication?
3. How do you implement JWT authentication in Express.js?
4. What is the difference between access tokens and refresh tokens?
5. Where should you store JWTs on the client side?
6. What is the purpose of the `Authorization: Bearer` header?
7. How do you implement role-based access control (RBAC)?
8. What is session-based authentication?
9. What is the difference between sessions and JWTs?
10. How do you hash passwords using `bcrypt`?
11. How do you implement logout with JWT authentication?
12. How do you protect routes using authentication middleware?

## 7. Security & Best Practices ⭐⭐⭐⭐⭐

1. What is CORS, and how do you configure it in Express.js?
2. What is Helmet, and why is it used?
3. What is SQL injection, and how do you prevent it?
4. What is NoSQL injection, and how do you prevent it?
5. What is Cross-Site Scripting (XSS)?
6. What is Cross-Site Request Forgery (CSRF)?
7. How do you implement rate limiting?
8. Why should you validate and sanitize user input?
9. How do you securely manage environment variables using `dotenv`?
10. Why should you avoid exposing stack traces in production?
11. How do you limit request body sizes?
12. How do you protect file uploads?
13. Why should an Express application avoid running as root?
14. How do you prevent HTTP parameter pollution?

## 8. Error Handling & Debugging ⭐⭐⭐⭐⭐

1. How does error handling work in Express.js?
2. What is error-handling middleware?
3. Why does error middleware have four parameters: `(err, req, res, next)`?
4. How do you handle synchronous errors?
5. How do you handle rejected promises in route handlers?
6. What changed in asynchronous error handling between Express 4 and Express 5?
7. What is the difference between operational errors and programmer errors?
8. How do you create a custom error class?
9. How do you handle database connection errors?
10. How do you implement centralized error handling?
11. How do you log errors using tools such as Winston or Pino?
12. How do you avoid sending multiple responses after an error?

## 9. Database Integration ⭐⭐⭐⭐⭐

1. How do you connect Express.js to MongoDB?
2. How do you connect Express.js to PostgreSQL or MySQL?
3. What is the difference between Mongoose and a native MongoDB driver?
4. What is connection pooling?
5. How do you handle database errors in Express.js?
6. How do you implement CRUD operations?
7. What is the difference between ORM and ODM?
8. How do you prevent SQL injection when querying a database?
9. How do you implement database transactions?
10. How do you handle database pagination efficiently?
11. Why should database queries not block the event loop?
12. How do you structure controllers, services, and repositories?

## 10. Performance, Caching & Scalability ⭐⭐⭐⭐⭐

1. How do you improve Express.js application performance?
2. What is the difference between in-memory caching and Redis caching?
3. How do you implement caching in Express.js?
4. Why should you use compression middleware?
5. What is the purpose of ETag and HTTP caching headers?
6. How do you handle large request payloads?
7. What is clustering, and how does it improve throughput?
8. How do you scale an Express.js application horizontally?
9. Why should CPU-intensive work be moved to worker threads or separate services?
10. What is the role of a reverse proxy such as Nginx?
11. How do you monitor API response times?
12. How do you prevent slow database queries from affecting API performance?

## 11. Cookies, Sessions & File Uploads ⭐⭐⭐⭐

1. What are cookies?
2. What is the difference between cookies and sessions?
3. What are `HttpOnly`, `Secure`, and `SameSite` cookie attributes?
4. How do you configure session management using `express-session`?
5. Why should production sessions use a shared session store?
6. How do you upload files using Multer?
7. What is the difference between memory storage and disk storage in Multer?
8. How do you validate uploaded file types and sizes?
9. How do you upload files to cloud storage such as Amazon S3?
10. How do you prevent malicious file uploads?

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

## 12. Server & Routing Coding ⭐⭐⭐⭐⭐

1. Create a basic Express.js server.
2. Create CRUD APIs for users.
3. Implement dynamic route parameters.
4. Implement query-based search and filtering.
5. Create modular routes using `express.Router()`.
6. Implement pagination with `limit` and `page`.
7. Implement API versioning using `/api/v1`.
8. Create a custom 404 handler.
9. Build a REST API with consistent JSON responses.
10. Implement request logging middleware.

## 13. Middleware & Validation Coding ⭐⭐⭐⭐⭐

1. Write custom middleware to log request details.
2. Create authentication middleware using JWT.
3. Create role-based authorization middleware.
4. Build a request validation middleware using Zod or Joi.
5. Implement an Express.js error-handling middleware.
6. Create middleware to restrict request body size.
7. Implement a rate limiter from scratch.
8. Create middleware to attach a request ID to each request.
9. Implement API key authentication.
10. Create middleware that measures API response time.

## 14. Authentication & Authorization Coding ⭐⭐⭐⭐⭐

1. Build user registration and login APIs.
2. Hash passwords using `bcrypt`.
3. Generate and verify JWT access tokens.
4. Implement access-token and refresh-token flows.
5. Protect routes using authentication middleware.
6. Implement role-based access control for admin and user roles.
7. Implement logout and token revocation.
8. Implement password reset using a time-limited token.
9. Store authentication tokens securely in cookies.
10. Prevent brute-force login attempts using rate limiting.

## 15. Database & CRUD Coding ⭐⭐⭐⭐⭐

1. Connect Express.js to MongoDB using Mongoose.
2. Implement create, read, update, and delete operations.
3. Create a user schema with validation.
4. Implement pagination and sorting at the database level.
5. Implement search with filters.
6. Handle duplicate email errors.
7. Implement relationships using references or SQL joins.
8. Implement transactions for multiple database operations.
9. Add database connection retry logic.
10. Create a service layer for reusable database logic.

## 16. Error Handling & Production Server Coding ⭐⭐⭐⭐⭐

1. Create a custom `AppError` class.
2. Implement centralized error handling.
3. Handle rejected promises in Express 4 and Express 5.
4. Implement graceful shutdown for `SIGTERM` and `SIGINT`.
5. Close the HTTP server and database connections safely.
6. Implement request timeout handling.
7. Add structured logging with Pino or Winston.
8. Handle uncaught exceptions and unhandled promise rejections safely.
9. Build a health-check endpoint such as `/health`.
10. Implement request tracing using a correlation ID.

## 17. Performance & Advanced API Coding ⭐⭐⭐⭐⭐

1. Implement Redis caching for API responses.
2. Create a sliding-window rate limiter.
3. Implement response compression.
4. Build a file-upload API using Multer.
5. Stream a large file without loading it completely into memory.
6. Implement a retry mechanism for external API requests.
7. Create a concurrency limiter for background tasks.
8. Add ETag-based caching.
9. Implement idempotency keys for payment APIs.
10. Build a centralized API client for external services.

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

## 18. Express.js Request Lifecycle ⭐⭐⭐⭐⭐

Understand how an HTTP request moves through the application.

```
Client Request
      |
      v
Express Application
      |
      v
Global Middleware
      |
      v
Router Matching
      |
      v
Route Middleware
      |
      v
Controller
      |
      v
Service / Database
      |
      v
Response
```

Topics to prepare:

1. Middleware execution order.
2. How `next()` transfers control.
3. How errors move to error middleware.
4. How route matching works.
5. How asynchronous handlers interact with the request lifecycle.
6. How to avoid hanging requests and duplicate responses.

## 19. Express.js Architecture & Folder Structure ⭐⭐⭐⭐⭐

1. What is the MVC pattern?
2. Why should controllers and services be separated?
3. What is dependency injection?
4. How do you organize routes, controllers, services, and models?
5. How do you centralize configuration?
6. How do you manage environment-specific settings?
7. How do you write unit tests for controllers and services?
8. How do you mock database calls in tests?

Example folder structure:

```
src/
├── app.js
├── server.js
├── config/
├── routes/
├── controllers/
├── services/
├── repositories/
├── models/
├── middleware/
├── validators/
├── utils/
└── tests/
```

## 20. Testing & Deployment ⭐⭐⭐⭐

1. What is the difference between unit, integration, and end-to-end testing?
2. How do you test Express APIs using Jest or Vitest?
3. What is Supertest?
4. How do you mock external API calls?
5. How do you test authentication middleware?
6. How do you deploy an Express.js application using Docker?
7. What is the role of a reverse proxy?
8. How do you configure environment variables in production?
9. How do you implement liveness and readiness checks?
10. How do you monitor errors and performance after deployment?

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. What is Express.js, and how does it work with Node.js?
2. Middleware types and execution order.
3. `app.use()` vs `app.get()`.
4. `req.params` vs `req.query` vs `req.body`.
5. `express.Router()` and modular routing.
6. `res.send()` vs `res.json()` vs `res.end()`.
7. REST API principles and HTTP status codes.
8. `PUT` vs `PATCH`.
9. Authentication vs authorization.
10. JWT vs session-based authentication.
11. Express 4 vs Express 5 error handling.
12. Centralized error-handling middleware.
13. CORS and Helmet.
14. SQL/NoSQL injection prevention.
15. Rate limiting and API security.

### 💻 Coding

16. Build CRUD APIs.
17. Write custom middleware.
18. Implement JWT authentication.
19. Implement role-based authorization.
20. Build centralized error handling.
21. Implement request validation.
22. Create pagination, search, and filtering.
23. Connect Express to a database.
24. Implement Redis caching.
25. Build graceful shutdown and health-check endpoints.

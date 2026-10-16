# 🟢 API Development Interview Questions

# 📚 PART 1 — THEORY QUESTIONS

## 1. API Fundamentals & Architecture ⭐⭐⭐⭐⭐

1. What is an API?
2. What is the difference between an API, a REST API, and a web service?
3. What are the different types of APIs (REST, GraphQL, SOAP, gRPC)?
4. How does the client-server architecture work?
5. What happens when a client sends an HTTP request to an API?
6. What are the components of an HTTP request and response?
7. What is the difference between synchronous and asynchronous APIs?
8. What is the difference between stateless and stateful APIs?
9. What is API contract and why is it important?
10. What is the difference between public, private, and partner APIs?

## 2. HTTP Methods & Status Codes ⭐⭐⭐⭐⭐

1. What are HTTP methods?
2. What is the difference between `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`?
3. What is the difference between `PUT` and `PATCH`?
4. What is idempotency in HTTP?
5. Which HTTP methods are considered safe and idempotent?
6. What is the difference between `200 OK`, `201 Created`, and `204 No Content`?
7. What is the difference between `301`, `302`, `307`, and `308`?
8. What is the difference between `400`, `401`, `403`, `404`, and `409`?
9. What is the difference between `422 Unprocessable Content` and `400 Bad Request`?
10. What is the difference between `429 Too Many Requests` and `503 Service Unavailable`?
11. When should an API return `500 Internal Server Error`?
12. How do you choose the correct HTTP status code for an API response?

## 3. REST API Design Principles ⭐⭐⭐⭐⭐

1. What is REST architecture?
2. What are the six constraints of REST?
3. What is a resource in REST API design?
4. How should you name REST API endpoints?
5. Why should REST endpoints generally use nouns instead of verbs?
6. What is the difference between a resource and a collection?
7. How do you design nested resources?
8. What is the difference between `/users/123/orders` and `/orders?userId=123`?
9. How do you design APIs for CRUD operations?
10. What is HATEOAS?
11. How do you design consistent JSON response structures?
12. What are common REST API design mistakes?

Example endpoint design:

```
GET     /api/v1/users        # Get all users
GET     /api/v1/users/123    # Get one user
POST    /api/v1/users        # Create a user
PUT     /api/v1/users/123    # Replace a user
PATCH   /api/v1/users/123    # Partially update a user
DELETE  /api/v1/users/123    # Delete a user
```

## 4. Request & Response Handling ⭐⭐⭐⭐⭐

1. What are headers, query parameters, path parameters, and request bodies?
2. What is the difference between query parameters and path parameters?
3. When should you send data in the request body?
4. What is the `Content-Type` header?
5. What is the `Accept` header?
6. What is the difference between JSON and form-data?
7. What is content negotiation?
8. What is the difference between `application/json` and `multipart/form-data`?
9. How do you handle malformed JSON requests?
10. How do you return structured error responses?
11. What is the purpose of the `Location` header?
12. What are `ETag`, `Last-Modified`, and `Cache-Control` headers?

## 5. Authentication & Authorization ⭐⭐⭐⭐⭐

1. What is the difference between authentication and authorization?
2. What is Basic Authentication?
3. What is Bearer Token Authentication?
4. What is JWT, and how does it work?
5. What is the difference between access tokens and refresh tokens?
6. What is session-based authentication?
7. What is OAuth 2.0?
8. What is OpenID Connect (OIDC)?
9. What is API key authentication, and when should it be used?
10. What is role-based access control (RBAC)?
11. What is attribute-based access control (ABAC)?
12. How do you prevent unauthorized access to API resources?
13. How do you implement token expiration and revocation?
14. Why should passwords never be stored in plain text?
15. How do you securely store and transmit authentication tokens?

## 6. API Security & Best Practices ⭐⭐⭐⭐⭐

1. What is CORS, and how does it affect browser-based API requests?
2. What is CSRF, and how can APIs prevent it?
3. What is Cross-Site Scripting (XSS)?
4. What is SQL injection, and how do you prevent it?
5. What is NoSQL injection?
6. Why is server-side input validation necessary?
7. What is rate limiting?
8. What is throttling, and how is it different from rate limiting?
9. What is brute-force protection?
10. How do you prevent Broken Object Level Authorization (BOLA)?
11. What is the principle of least privilege?
12. Why should APIs use HTTPS?
13. How should API secrets and credentials be managed?
14. Why should sensitive data be excluded from API responses?
15. What is mass assignment, and how can you prevent it?
16. How do you protect APIs against oversized payloads and resource exhaustion?

## 7. API Validation & Error Handling ⭐⭐⭐⭐⭐

1. Why is request validation important?
2. What is the difference between validation and sanitization?
3. How do you validate request parameters, headers, and bodies?
4. What is schema validation?
5. What are Zod, Joi, and Ajv?
6. What is centralized error handling?
7. What is the difference between client errors and server errors?
8. How should an API respond when a resource does not exist?
9. How do you handle database errors in API controllers?
10. What is a standard error response format?
11. What is RFC 9457 Problem Details for HTTP APIs?
12. Should production APIs expose stack traces?
13. How do you handle unexpected exceptions?
14. How do you make error messages useful without exposing sensitive information?

Example error response:

```
{
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "details": [
    {
      "field": "email",
      "message": "A valid email is required"
    }
  ]
}
```

## 8. Pagination, Filtering & Sorting ⭐⭐⭐⭐⭐

1. Why do APIs need pagination?
2. What is offset-based pagination?
3. What is cursor-based pagination?
4. What is the difference between offset and cursor pagination?
5. What are the limitations of `LIMIT` and `OFFSET`?
6. How do you implement pagination using `page` and `limit`?
7. How do you return pagination metadata?
8. How do you implement sorting using query parameters?
9. How do you implement search and filtering?
10. How do you validate sorting fields to prevent injection?
11. How do you paginate millions of database records efficiently?
12. How do you handle changing data while a client is navigating pages?

Example API:

```
GET /api/v1/products?page=2&limit=20&sortBy=price&order=asc
GET /api/v1/products?category=electronics&minPrice=1000
GET /api/v1/products?search=phone
```

## 9. API Versioning & Backward Compatibility ⭐⭐⭐⭐

1. What is API versioning?
2. Why do APIs need versioning?
3. What are the different API versioning strategies?
   - URI versioning
   - Query parameter versioning
   - Header versioning
   - Media type versioning
4. What is the difference between backward-compatible and breaking changes?
5. How do you add a new field without breaking existing clients?
6. How do you deprecate an API endpoint?
7. What are the `Deprecation` and `Sunset` response headers?
8. How do you migrate clients from API v1 to v2?
9. Should every small API change require a new version?
10. How do you maintain multiple API versions?

## 10. API Performance, Caching & Scalability ⭐⭐⭐⭐⭐

1. What causes slow API responses?
2. How do you measure API response time?
3. What is API caching?
4. What is the difference between client-side, server-side, and CDN caching?
5. What is Redis, and how can it improve API performance?
6. What is the difference between `Cache-Control`, `ETag`, and `Last-Modified`?
7. What is a cache hit and cache miss?
8. What is cache invalidation?
9. What is the N+1 query problem?
10. How do database indexes improve API performance?
11. What is connection pooling?
12. How do you prevent one slow downstream service from affecting the entire API?
13. What are timeouts, retries, and circuit breakers?
14. How do you scale APIs horizontally?
15. What is load balancing?
16. What is the difference between rate limiting and concurrency limiting?

## 11. API Documentation & Testing ⭐⭐⭐⭐

1. Why is API documentation important?
2. What is OpenAPI Specification?
3. What is Swagger UI?
4. What is the difference between OpenAPI and Swagger?
5. How do you document request schemas and response examples?
6. What is the difference between unit, integration, and end-to-end API testing?
7. How do you test APIs using Postman?
8. What is contract testing?
9. What is mocking in API testing?
10. How do you test authentication and authorization?
11. How do you test API error responses?
12. What is load testing, and which tools can be used?
13. What is the difference between smoke testing and regression testing?
14. How do you automate API tests in CI/CD pipelines?

# 💻 PART 2 — CODING & PRACTICAL QUESTIONS

## 12. REST API Development Coding ⭐⭐⭐⭐⭐

1. Build a REST API for user CRUD operations.
2. Create a product API with create, read, update, and delete endpoints.
3. Implement a search API using query parameters.
4. Implement pagination, sorting, and filtering.
5. Create nested resource endpoints for users and orders.
6. Build an API that returns consistent JSON responses.
7. Implement API versioning using `/api/v1`.
8. Create a centralized 404 handler.
9. Build an endpoint that supports partial updates using `PATCH`.
10. Implement bulk creation of resources with appropriate validation.

## 13. Authentication & Security Coding ⭐⭐⭐⭐⭐

1. Implement JWT authentication.
2. Create middleware to verify Bearer tokens.
3. Build a role-based authorization system.
4. Implement refresh-token rotation.
5. Create a login API with password hashing using `bcrypt`.
6. Implement rate limiting for login attempts.
7. Validate request payloads using Zod or Joi.
8. Prevent users from accessing another user's records.
9. Implement secure cookie-based authentication.
10. Create an API key verification middleware.
11. Implement password reset using expiring tokens.
12. Prevent mass assignment by allowing only approved fields.

## 14. API Error Handling & Validation Coding ⭐⭐⭐⭐⭐

1. Build centralized error-handling middleware in Express.js.
2. Create a custom API error class.
3. Implement request body validation using Zod.
4. Return consistent validation error responses.
5. Handle duplicate database records.
6. Handle database connection failures.
7. Implement request timeouts.
8. Build a not-found handler for unknown endpoints.
9. Add request IDs to error logs.
10. Implement RFC 9457-style Problem Details responses.

## 15. Pagination, Filtering & Search Coding ⭐⭐⭐⭐⭐

1. Implement offset-based pagination.
2. Implement cursor-based pagination.
3. Create a product search endpoint.
4. Implement multi-field sorting.
5. Filter products by category, price, and availability.
6. Implement case-insensitive search.
7. Validate pagination limits to prevent expensive queries.
8. Implement database-level pagination instead of fetching all records.
9. Return pagination metadata with total counts.
10. Build a reusable pagination utility for multiple endpoints.

## 16. API Integration & Async Coding ⭐⭐⭐⭐⭐

1. Fetch data from an external API using `fetch()` or Axios.
2. Handle external API errors and timeouts.
3. Execute multiple API requests in parallel using `Promise.all()`.
4. Execute API requests sequentially.
5. Retry failed API requests with exponential backoff.
6. Cancel requests using `AbortController`.
7. Implement a concurrency limiter for API calls.
8. Build a wrapper around an external API client.
9. Implement a circuit breaker for failing downstream services.
10. Handle partial failures when multiple external APIs are called.
11. Implement request deduplication for identical concurrent requests.
12. Prevent duplicate payment or order creation using idempotency keys.

## 17. API Caching & Performance Coding ⭐⭐⭐⭐⭐

1. Implement in-memory caching for API responses.
2. Integrate Redis into an Express.js application.
3. Implement cache expiration using a TTL.
4. Add `Cache-Control` headers to GET endpoints.
5. Implement ETag-based conditional requests.
6. Add compression middleware.
7. Implement a rate limiter using a sliding window.
8. Add timeout handling for downstream HTTP calls.
9. Implement graceful degradation when a service is unavailable.
10. Build a health-check endpoint for API monitoring.

## 18. File Uploads & Streaming API Coding ⭐⭐⭐⭐

1. Build a file upload API using Multer.
2. Validate file type and file size.
3. Upload files to cloud storage.
4. Stream large files to the client.
5. Implement file downloads with correct response headers.
6. Create an API that exports database records as CSV.
7. Process a large CSV upload without loading the entire file into memory.
8. Implement pagination for large file-processing jobs.
9. Handle interrupted uploads and clean up temporary files.
10. Implement authorization checks before downloading private files.

# 🧠 PART 3 — MUST-KNOW ADVANCED TOPICS

## 19. API Request Lifecycle ⭐⭐⭐⭐⭐

Understand how a request travels from the client to the server and back.

```
Client
  |
  v
DNS Resolution
  |
  v
TCP / TLS Connection
  |
  v
HTTP Request
  |
  v
Load Balancer / API Gateway
  |
  v
Authentication & Rate Limiting
  |
  v
Request Validation
  |
  v
Controller / Business Logic
  |
  v
Database / External Services
  |
  v
HTTP Response
  |
  v
Client
```

Topics to prepare:

1. DNS resolution and connection establishment.
2. HTTP and HTTPS.
3. Request headers, body, and status codes.
4. API gateway and load balancer responsibilities.
5. Authentication and authorization.
6. Request validation and business logic.
7. Database operations and external service calls.
8. Error propagation and response formatting.
9. Logging, metrics, and distributed tracing.

## 20. API Design Patterns & Distributed Systems ⭐⭐⭐⭐⭐

1. What is an API Gateway?
2. What is the difference between an API Gateway and a reverse proxy?
3. What are microservices, and how do their APIs communicate?
4. What is synchronous versus asynchronous service communication?
5. What is message-queue-based communication?
6. What are webhooks, and how do you verify webhook signatures?
7. What is the difference between webhooks and polling?
8. What is eventual consistency?
9. What is the Saga pattern?
10. What is the Circuit Breaker pattern?
11. What is the Retry pattern, and why can retries cause problems?
12. What is the Bulkhead pattern?
13. What is idempotency, and why is it important for payment APIs?
14. How do you handle distributed transactions?
15. How do you propagate correlation IDs across services?

## 21. GraphQL, gRPC & Other API Styles ⭐⭐⭐⭐

1. What is GraphQL?
2. What are queries, mutations, and subscriptions in GraphQL?
3. What is the difference between REST and GraphQL?
4. What is the N+1 problem in GraphQL?
5. What is DataLoader, and how does it help?
6. What is gRPC?
7. What is Protocol Buffers?
8. What is the difference between REST and gRPC?
9. What is SOAP, and where is it used?
10. What is the difference between WebSockets and REST APIs?
11. When would you choose server-sent events (SSE)?
12. How do you choose the right API style for a project?

## 22. API Observability & Production Readiness ⭐⭐⭐⭐⭐

1. What is API observability?
2. What is the difference between logs, metrics, and traces?
3. What are the RED metrics: Rate, Errors, and Duration?
4. What are the four golden signals for monitoring services?
5. How do you track API latency percentiles such as p95 and p99?
6. What is distributed tracing?
7. How do you use correlation IDs to trace requests?
8. How do you implement liveness and readiness checks?
9. What is an SLI, SLO, and SLA?
10. How do you investigate an API that suddenly becomes slow?
11. How do you detect memory leaks and resource exhaustion?
12. What should be monitored before deploying a new API version?

# 🏆 TOP 25 — If You Have Very Little Time

### 🔥 Theory

1. What is an API, and how does it work?
2. REST principles and resource-based endpoint design.
3. HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
4. HTTP status codes and their correct usage.
5. Idempotency and safe HTTP methods.
6. Request headers, query parameters, path parameters, and bodies.
7. Authentication vs authorization.
8. JWT vs session-based authentication.
9. CORS, CSRF, and SQL injection prevention.
10. Input validation and sanitization.
11. API pagination, filtering, and sorting.
12. API versioning and backward compatibility.
13. Rate limiting and throttling.
14. API caching and Redis.
15. API Gateway, load balancing, and microservices.

### 💻 Coding

16. Build REST CRUD APIs using Express.js.
17. Implement JWT authentication and authorization.
18. Create centralized API error handling.
19. Implement validation using Zod or Joi.
20. Build pagination, filtering, and search.
21. Implement rate limiting.
22. Integrate an external API with timeout and retry handling.
23. Implement Redis caching.
24. Build an idempotent payment or order endpoint.
25. Write automated API tests using Jest or Vitest and Supertest.

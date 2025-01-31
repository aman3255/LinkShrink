# URL Shortener API

A simple URL shortener built with Express.js and Zod for validation.

## Features
- Shorten a long URL to a short unique identifier.
- Redirect users from the short URL to the original URL.
- Validates URLs before shortening.

## Technologies Used
- **Node.js**
- **Express.js**
- **Zod** for schema validation

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/url-shortener.git
   ```
2. Navigate to the project directory:
   ```sh
   cd url-shortener
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:4000`

2. **Shorten a URL**
   - **Endpoint:** `POST /api/v1/short-url/`
   - **Request Body:**
     ```json
     {
       "url": "https://example.com"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "http://localhost:4000/abc123"
     }
     ```

3. **Redirect to Original URL**
   - **Endpoint:** `GET /:key`
   - Example: Visiting `http://localhost:4000/abc123` redirects to `https://example.com`.

## API Validation
- The URL must be a valid HTTP or HTTPS link.
- If the URL is invalid, a `400 Bad Request` response will be returned.

## Error Handling
- If the provided URL is not valid, the API responds with:
  ```json
  {
    "message": "Invalid URL format or missing input."
  }
  ```
- If the short URL does not exist, a `404 Not Found` response is returned:
  ```json
  {
    "message": "Redirect URL is invalid - URL not found"
  }
  ```

## License
This project is licensed under the MIT License.


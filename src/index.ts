import express from 'express'; // Import express
import z, { string } from 'zod'; // Import zod
const app = express(); // Create an express app
app.use(express.json()); // Enable JSON parsing for all routes.
const port = 4000; // Set the port
const urlMap = new Map();

// Creating a function which generates a random 6-digit character
function generateUniqueCode(charCount: number): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < charCount; i++) {
        const uniqueIndex = Math.floor(Math.random() * characters.length);
        result += characters[uniqueIndex];
    }
    return result;
}

// Creating a function which validates the URL
const validateUrl = z.object({
    url: z.string().url("Invalid URL. Please provide a valid URL starting with http:// or https://")
});

// Route to create a shortened URL.
app.post('/api/v1/short-url/', (req, res) => {
    const { url } = req.body;

    try {
        // Validate the URL
        validateUrl.parse(req.body);
        // Generate a 6-character unique key, ensuring no duplicates exist.
        let keyId;
        do {
            keyId = generateUniqueCode(6);
        } while (urlMap.has(keyId));

        // Map the key to the original URL in the URL map.
        urlMap.set(keyId, url);

        // Return the shortened URL to the client.
        console.log(`Shortened URL created at: ${keyId} --> ${url}`);

        res.status(201).json({
            message: `http://localhost:${port}/${keyId}`
        });

    } catch (e) {
        // Handle validation errors
        res.status(400).json({
            message: "Invalid URL format or missing input."
        });
    }
});

// Route to redirect to the original URL.
app.get("/:key", (req, res) => {
    const { key } = req.params;

    if(!urlMap.has(key)){
        res.status(404).json({
            message: "Redirect URL is invalid - URL not found"
        })
        return;
    }
    
    // Retrieve the original URL from the URL map.
    const originalUrl = urlMap.get(key);

    // Log the redirection and redirect the client.
    console.log(`Redirecting key: ${key} --> ${originalUrl}`);

    //  Redirect to the original URL
    res.redirect(originalUrl);
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

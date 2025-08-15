To create an Express.js server for an AI-powered invoice processing tool, we'll lay out a simple server structure. We'll simulate the usage of AI and integrate endpoints necessary for invoice submission, processing, and status checking. This example assumes AI processing will be handled via an external microservice or package. In a real-world scenario, further integration with databases, authentication, and additional error handling would be needed.

Here’s a basic implementation:

```javascript
const express = require('express');
const bodyParser = require('body-parser');

// Sample AI processing function (in real cases, it will invoke an ML model or external service)
const processInvoice = async (invoiceData) => {
    // Simulate AI processing here
    return {
        success: true,
        message: 'Invoice processed successfully.',
        optimizedPaymentDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later as an example
    };
};

const app = express();
app.use(bodyParser.json());

app.post('/invoices', async (req, res) => {
    const invoiceData = req.body;

    // Basic validation
    if (!invoiceData || !invoiceData.id) {
        return res.status(400).json({ error: 'Invalid invoice data' });
    }

    try {
        const processingResult = await processInvoice(invoiceData);
        if (processingResult.success) {
            res.status(201).json({
                message: processingResult.message,
                optimizedPaymentDate: processingResult.optimizedPaymentDate,
            });
        } else {
            res.status(500).json({ error: 'Invoice processing failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the invoice', details: error.message });
    }
});

app.get('/invoices/:id/status', (req, res) => {
    // For demo purposes, returning processed status
    res.status(200).json({ status: 'Processed', message: 'Payment scheduled for 2023-10-15' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Explanation:

1. **Express Server Initialization**: Initializes an Express application and uses `body-parser` to parse JSON requests.

2. **Route to Process Invoices (`/invoices`)**: Accepts POST requests with invoice data. A simple `processInvoice` function simulates invoice optimization and returns a success message with an optimized payment date. This is where you would typically interact with an AI service or ML model.

3. **Route for Checking Invoice Status (`/invoices/:id/status`)**: Provides a simulated endpoint to check the processing status of an invoice by its ID. In a production system, this would query a database or another persistent storage for the invoice status.

4. **Error Handling**: Basic error checking is included. More sophisticated error handling and logging mechanisms would be expected for a production environment.

5. **Listening on Port 3000**: The server listens for requests on port 3000, making it available for local development or through whichever mechanism you prefer to deploy it in production.

### Additional Considerations:
- **Database Integration**: Consider using a database like MongoDB or PostgreSQL to store invoice data and statuses.
- **Authentication/Authorization**: Implement a suitable auth mechanism (e.g., JWT with `express-jwt` or OAuth) for securing the API.
- **AI Service Integration**: Substitute the `processInvoice` mock with actual AI logic or an external API call.
- **Error Logging**: Use a logging library such as `winston` or integrate with logging services for better error tracking and monitoring in production.
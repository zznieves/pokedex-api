
const express = require('express');
const app = express();

// port number
const PORT = process.env.PORT || 3000;

// assign a port-number to the Express app to listen for requests
app.listen(PORT, () => {

    // success messsage
    console.log(`Success! Express Server is now running and listening on PORT: ${PORT}`);
});


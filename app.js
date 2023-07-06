
const express = require('express');
const app = express();

// port number
const PORT = process.env.PORT || 3000;

const db = { 
    
                '1': { name: 'cerberus', age: '4'  },
                '2': {name: 'snowman', age: '25'}
            
            };

// assign a port-number to the Express app to listen for requests
app.listen(PORT, () => {

    // success messsage
    console.log(`Success! Express Server is now running and listening on PORT: ${PORT}`);
});


/**
 * 4 fundamental HTTP methods: client-request server-response cycle
 * 
 *  GET (most common) -> retrieves resources
 * 
 *  PUT -> updates an existing resource
 * 
 *  POST -> creates a new resource
 * 
 *  DELETE -> deletes an existing resource
 * 
 */

// create a basic GET route for initial render
app.get('/', (req, res, next) => {

    // process the request and send a response to the client
    res.send('Pokedex API');
});
// import modules into file

import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv';

// load 'process.env' global variable with the values from our .env file
dotenv.config();

// create a connection pool: multiple reusable connections for querying the database
const pool: Pool = new Pool({

    connectionString: process.env.CONNECTION_STRING,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

// query the database: send a query string along with parameters
async function dbQuery(text: string, params: any[]): Promise<QueryResult> {

    const client = await pool.connect();
    try {
        return await client.query(text, params);
    } finally {
        client.release;
    }
}


// export the query function to be used in other files
export default dbQuery;
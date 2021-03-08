const { client } = require("./index");

async function buildTables() {
    try {
        client.connect();

        console.log('Start Dropping Tables');
        await client.query(`
            DROP TABLE IF EXISTS
        `)
        console.log('finished dropping tables');

        console.log('started building tables');
        await client.query(`
            DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stats') THEN
                    CREATE TYPE stats AS ENUM ('created', 'cancelled', 'completed', 'processing');
                END IF;
            END
            $$;
            
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL
            )
        `)



    } catch(error) {
        throw error;
    }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
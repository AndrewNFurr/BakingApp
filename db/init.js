const { 
    client,
    createAccount,
    createUser ,
    createCard,
    createBill
} = require("./index");

async function buildTables() {
    try {
        client.connect();

        console.log('Start Dropping Tables');
        await client.query(`
            DROP TABLE IF EXISTS bills;
            DROP TABLE IF EXISTS account_cards;
            DROP TABLE IF EXISTS cards;
            DROP TABLE IF EXISTS accounts;
            DROP TABLE IF EXISTS users;
        `)
        console.log('finished dropping tables');

        console.log('started building tables');
        await client.query(`

            DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'customer') THEN
                    CREATE TYPE customer AS ENUM ('basic', 'premium', 'optimum');
                END IF;
            END
            $$;
            DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account') THEN
                    CREATE TYPE account AS ENUM ('checking', 'savings', 'buisness');
                END IF;
            END
            $$;
            DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'card') THEN
                    CREATE TYPE card AS ENUM ('credit', 'debit');
                END IF;
            END
            $$;
            DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'bill') THEN
                    CREATE TYPE bill AS ENUM ('loan', 'credit', 'utility');
                END IF;
            END
            $$;

            CREATE EXTENSION IF NOT EXISTS citext;

            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) UNIQUE NOT NULL,
                email citext UNIQUE NOT NULL,
                "creditScore" INTEGER NOT NULL,
                type customer,
                "isAdmin" BOOLEAN DEFAULT 'false'
            );

            CREATE TABLE accounts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                "userId" INTEGER REFERENCES users(id),
                type account,
                balance INTEGER NOT NULL,
                active BOOLEAN DEFAULT 'true'
            );

            CREATE TABLE cards (
                id SERIAL PRIMARY KEY,
                type card,
                name VARCHAR(255) NOT NULL,
                "availableCredit" INTEGER,
                description TEXT NOT NULL
            );

            CREATE TABLE account_cards (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                "accountId" INTEGER REFERENCES accounts(id),
                name VARCHAR(255) NOT NULL,
                type card,
                "availableCredit" INTEGER,
                active BOOLEAN DEFAULT 'true'
            );

            CREATE TABLE bills (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL, 
                amount INTEGER NOT NULL,
                type bill,
                "dueDate" TIMESTAMP NOT NULL
            );
        `);
        console.log('Finished Building Tables');
    } catch(error) {
        throw error;
    }
}

async function populateInitial() {
    console.log('Creating Users');
    const user1 = {
        firstName: 'Ando',
        lastName: "Frukson",
        username: 'Beabeeitz',
        password: '1234',
        email: 'af@a.com',
        creditScore: 700,
        customerType: 'premium'
    };
    const user2 = {
        firstName: 'Mildo',
        lastName: "Bakadee",
        username: 'awalia',
        password: '1235',
        email: 'mb@a.com',
        creditScore: 830,
        customerType: 'optimum'
    };
    const userArr = [
        user1,
        user2
      ];
  
      await Promise.all(userArr.map((user) => createUser(user)));
      console.log("done creating users");
      
      console.log('Creating Accounts');
      const account1 = {
          userId: 1,
          name: 'Main Checking',
          type: "checking",
          balance: 1500,
          active: true
      }
      const account2 = {
        userId: 2,
        name: 'Alt Checking',
        type: "checking",
        balance: 1700,
        active: true
    }

      const accountArr = [
          account1,
          account2
      ];

      await Promise.all(accountArr.map(account => createAccount(account)));
      console.log("Done Creating Accounts");

      console.log('Creating Cards');
      const card1 = {
          type: 'credit',
          name: 'Master',
          availableCredit: 4000,
          description: 'starter'
      }
      const card2 = {
          type: 'debit',
          name: 'Platinum',
          availableCredit: 40000,
          description: 'intermdiate'
    }

      const cardArr = [
          card1, 
          card2
      ];

      await Promise.all(cardArr.map(card => createCard(card)));
      console.log("Done Creating Cards");

      console.log('Creating Bills');
      const bill1 = {
          userId: 1,
          title: 'Gas - creditCard',
          description: 'Gas at shell station',
          amount: 3450,
          type: 'credit',
      }
      const bill2 = {
          userId: 2,
          title: 'Groceries',
          description: 'Tomatoes, potatoes, corn',
          amount: 2500,
          type: 'utility'
    }

      const billArr = [
          bill1, 
          bill2
      ];

      await Promise.all(billArr.map(bill => createBill(bill)));
      console.log("Done Creating Bills");
 }


buildTables()
  .then(populateInitial)
  .catch(console.error)
  .finally(() => client.end());
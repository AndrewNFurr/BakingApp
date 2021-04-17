const { Client } = require("pg");

const DB_NAME = "furrbanking";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost/${DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
});

const bcrypt = require("bcrypt");
const { response, query } = require("express");
const { identity } = require("lodash");

//METHODS

//CREATE METHODS
async function createUser({
    firstName,
    lastName,
    username,
    password,
    email,
    creditScore,
    customerType
}) {
    try {
        const salt = bcrypt.genSaltSync(15);
        const hashPassword = bcrypt.hashSync(password, salt);
    
        const {
          rows: [user],
        } = await client.query(
          `
          INSERT INTO users("firstName", "lastName", username, password, email, "creditScore", type)
          VALUES($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
          `,
          [firstName, lastName, username, hashPassword, email, creditScore, customerType]
        );
    
        return user;
      } catch (error) {
        throw error;
      }
}

async function createAccount({
    userId,
    name,
    type,
    balance,
    active
}) {
    try {
        const {
            rows: [account]
        } = await client.query(
            `
            INSERT INTO accounts("userId", name, type, balance, active)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
            `,
            [userId, name, type, balance, active]);
        return account;
    } catch (error) {
        throw error;
      }
}

async function createCard({
    type,
    name,
    availableCredit,
    description
}) {
    try {
    const { 
        rows: [card] 
    } = await client.query(
        `
            INSERT INTO cards(type, name, "availableCredit", description)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `,
        [type, name, availableCredit, description]);
        return card;
    } catch (error) {
        throw error;
      }
}


async function createBill({
    userId,
    title, 
    description, 
    amount, 
    dueDate, 
    type
}) {
    try {
    const { 
        rows: [bill] 
    } = await client.query( `
            INSERT INTO bills("userId", title, description, amount, type, "dueDate")
            VALUES($1, $2, $3, $4, $5, now())
            RETURNING *
        `, [userId, title, description, amount, type]);

        return bill;
    } catch (error) {
        throw error;
      }
}

async function createAccountCard({
    cardId, 
    accountId, 
    type, 
    availableCredit, 
    active
}) {
    try {
        const { rows: [accountCard] } = await client.query(`
            INSERT INTO account_cards("cardId", "accountId", type, "availableCredit", active)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `, [cardId, accountId, type, availableCredit, active]);

        return accountCard;
    } catch(error) {
        throw error    
    }
}

//GET METHODS

//USERS

async function getUsers() {
    try {
      const { rows } = await client.query(`
  
        SELECT *
        FROM users;
      `);
  
      rows.map((row) => delete row.password);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

async function getUserById(id) {
    try {
        const {
            rows: [user]
        } = await client.query(`
            SELECT * 
            FROM users
            WHERE id=${id}
            `, [id])

        if (!user) {
            return null;
        }

        return user;
    } catch(error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const {
            rows: [user]
        } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1
        `, [username]);

        if (!user) {
            return null;
        }

        return user;
    } catch(error) {
        throw error;
    }
}

//ACOOUNTS

async function getAccountById(id) {
    try {
      const { rows: [account] } = await client.query(
        `
      SELECT *
      FROM accounts
      WHERE id=${id};
    `);
      
      const accountCards = await getAccountCardsById(id);
      account.cards = accountCards;
      console.log(account.cards)

      if (!account) {
          return null
      };

      return account;
    } catch (error) {
      throw error;
    }
  }

async function getAccountsByUserId(userId) {
    try {
        const { 
            rows: accounts
        } = await client.query(`
            SELECT *
            FROM accounts
            WHERE "userId"=$1
        `, [userId])

        const accountsWithCards = await Promise.all(
            accounts.map((account) => getAccountById(account.id))
          );
        console.log('other acounts', accountsWithCards)
        return accountsWithCards;
    } catch(error) {
        throw error;
    }
}
 

//CARDS 
async function getAllCards() {
    try {
        const {
            rows
        } = await client.query(`
            SELECT *
            FROM cards
        `);
    
        return rows;
    } catch(error) {
        throw error;
    }
}

async function getCardById(id) {
    try {
        const {
            rows: [card]
        } = await client.query(`
            SELECT *
            FROM cards
            WHERE id=${id}
        `);
    
        return card;
    } catch(error) {
        throw error;
    }
}

async function getAccountCards() {
    try {
        const { rows: accountCards } = await client.query(`
            SELECT *
            FROM account_cards;
        `);

        return accountCards;
    } catch(error) {
        throw error;
    }
}

async function getAccountCardsById(id) {
    try {
        const { rows: accountCards } = await client.query(`
            SELECT *
            FROM account_cards
            WHERE account_cards."accountId"=$1
        `, [id]);

        console.log(accountCards);
        return accountCards;
    } catch(error) {
        throw error;
    }
}


//ADD FUNCTIONS

async function addCardToAccount({cardId, accountId, type, availableCredit, active}) {
    console.log('in add');
    try {
        const newCard = {
            cardId, 
            accountId, 
            type, 
            availableCredit, 
            active
        };
        
        const accountCard = await createAccountCard(newCard);
        const account = await getAccountById(accountId);
        console.log(account);
        return account;
    } catch(error) {
        throw error;
    }
}



module.exports = {
    client,
    createAccount,
    createUser,
    createCard, 
    createBill,
    createAccountCard,
    getUsers,
    getUserById,
    getUserByUsername,
    getAllCards,
    getCardById,
    getAccountById,
    getAccountsByUserId,
    getAccountCards,
    getAccountCardsById,
    addCardToAccount
};
const { Client } = require("pg");

const DB_NAME = "furrbanking";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost/${DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
});

const bcrypt = require("bcrypt");
const { response, query } = require("express");

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
      const { rows: account } = await client.query(
        `
      SELECT *
      FROM accounts
      WHERE id=$1;
    `,
        [id]
      );
  
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

        return accounts;
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
        console.log(rows)
        return rows;
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
    getUsers,
    getUserById,
    getUserByUsername,
    getAllCards,
    getAccountsByUserId
};
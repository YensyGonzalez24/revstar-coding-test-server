import { v4 as uuidv4 } from "uuid";
import mysql from "mysql";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Parse the database connection details from the DATABASE_URL environment variable
const databaseUrl = process.env.DATABASE_URL;
const dbConfig = databaseUrl.match(
  /mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
);

if (!dbConfig) {
  throw new Error("Invalid DATABASE_URL");
}

const [, user, password, host, port, database] = dbConfig;

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  connectionLimit: 10,
  host,
  port,
  user,
  password,
  database,
});

// Truncate the "USER" table
function truncateUserTable() {
  return new Promise((resolve, reject) => {
    pool.query("TRUNCATE TABLE USER", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Add the first user entry
const regularUser = {
  id: uuidv4(),
  email: "y.gonzalez.dev@gmail.com",
  role: "USER",
};

// Add the second user entry
const adminUser = {
  id: uuidv4(),
  email: "y.gonzalez.ops@gmail.com",
  role: "ADMIN",
};

// Insert the user entries
function insertUser(user) {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO USER SET ?", user, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function runScript() {
  // Connect to the database
  const connection = await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });

  console.log("Connected to the database");

  try {
    // Truncate the "USER" table
    await truncateUserTable();
    console.log("User table truncated");

    // Insert the user entries
    await insertUser(regularUser);
    console.log("User 1 added successfully");

    await insertUser(adminUser);
    console.log("User 2 added successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Release the connection
    connection.release();

    // Close the connection pool
    pool.end((err) => {
      if (err) {
        console.error("Error closing the database connection pool:", err);
      } else {
        console.log("Database connection pool closed");
      }
    });
  }
}

// Run the script
runScript();

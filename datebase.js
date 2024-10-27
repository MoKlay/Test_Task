import "dotenv/config";
import { log } from "console";
import pkg from "pg";
const { Client } = pkg;

const database = process.env.DB_NAME;

const host = process.env.DB_HOST;
const port = process.env.DB_PORT || 5432;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

function connectDB(
  options = { host, port, user, password, database },
  callback
) {
  let client = new Client(options);
  client.connect((err) => {
    if (err) log(err);
    else if (callback) {
      callback(err, client);
    }
  });
  return client;
}

connectDB(
  {
    host,
    port,
    user,
    password,
  },
  (err, client) => {
    if (err) log(err);
    else {
      log("connected");
      client.query(
        `SELECT datname FROM pg_database WHERE datname = '${database}';`,
        (err, res) => {
          if (err) log(err, "err");
          else {
            if (res.rows.lentgh == 0) {
              client.query(`CREATE DATABASE ${database};`, (err, res) => {
                if (err) log(err);
                else {
                  log("database created");
                }
                client.end();
              });
            }
          }
        }
      );
    }
  }
);

export default connectDB({
  host,
  port,
  user,
  password,
  database,
});

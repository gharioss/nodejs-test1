import mysql from "mysql";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud-node-test",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

export default con;

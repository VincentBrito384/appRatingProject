const { Pool } = require('pg');
const cors = require('cors');
//app.use(cors()); //allow all origins (be careful)
//setting the credentials  for teh database and exporting them to teh index.js file

const pool = new Pool({
  user: 'postgres',
  password: '38447284',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgres'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};

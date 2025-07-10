//index.js
// main backend portion
//obtains datables and sends them to the frontend
const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON
const cors = require('cors');
app.use(cors()); //allow all origins (be careful)
const { Pool } = require('pg');
const db = require('./db');



const pool = new Pool({
  user: 'postgres',
  password: '38447284',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgres'
});



const router = express.Router();
const veriableToReplaceLater =2;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with a specific domain for better security
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // Specify allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Specify allowed headers
  next();
});
















//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//line to insert an APPLICATION into the applications database
//backup 6 version
    app.post('/applicationsInsert',async (req, res) => {
  const { nameApplicationsAdd, homepageApplicationsAdd, imageURLApplicationAdd, descriptionApplicationsAdd } = req.body;

  console.log('Received data from frontend:');
  console.log('Name:', nameApplicationsAdd);
  console.log('Name:', homepageApplicationsAdd);
  console.log('Name:', imageURLApplicationAdd);
  console.log('Description:', descriptionApplicationsAdd);

  // You can now insert into DB, validate, etc.
  res.json({ success: true, message: 'App received' });
  try {
    const result = await pool.query(
      'INSERT INTO applications (name, homepage, imageURl, description) VALUES ($1, $2, $3, $4)',
      [nameApplicationsAdd, homepageApplicationsAdd, imageURLApplicationAdd, descriptionApplicationsAdd]
    );
    res.status(201).json({ success: true, message: 'Application saved to DB' });
  } catch (err) {
    console.error('Error inserting into DB:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }

});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//line to insert a RATING into the ratings database
//backup 6 version
    app.post('/ratingsInsert',async (req, res) => {
  const { user_idRatingsAdd, app_idRatingsAdd, ratingRatingsAdd,  commentRatingsAdd } = req.body;

  console.log('Received data from frontend:');
  console.log('user id:', user_idRatingsAdd);
  console.log('app id:', app_idRatingsAdd);
  console.log('rating:', ratingRatingsAdd);
  console.log('comment:', commentRatingsAdd);

  // You can now insert into DB, validate, etc.
  res.json({ success: true, message: 'rating received' });
  try {
    const result = await pool.query(
      'INSERT INTO ratings (user_id, app_id, rating,  comment) VALUES ($1, $2, $3, $4)',
      [user_idRatingsAdd, app_idRatingsAdd, ratingRatingsAdd,  commentRatingsAdd]
    );
    res.status(201).json({ success: true, message: 'rating saved to DB' });
  } catch (err) {
    console.error('Error inserting into DB:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }

});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
  //line to insert a USER into the users database
//backup 6 version
    app.post('/userInsert',async (req, res) => {
  const { nameUsersAdd, emailUsersAdd } = req.body;

  console.log('Received data from frontend:');
  console.log('name:', nameUsersAdd);
  console.log('email:', emailUsersAdd);

  // You can now insert into DB, validate, etc.
  res.json({ success: true, message: 'user received' });
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [nameUsersAdd, emailUsersAdd]
    );
    res.status(201).json({ success: true, message: 'rating saved to DB' });
  } catch (err) {
    console.error('Error inserting into DB:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }

});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//filtering ratings by a veriable from the ratings page

app.post('/filteredRatings', async (req, res) => {
  const { appId } = req.body;
  try {
    console.log('call filteredRatings')
    const result = await db.query('SELECT * FROM ratings WHERE app_id = $1', [appId]);
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error('Error:',err);
    res.status(500).send('Internal Server Error');}});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//filtering users by a veriable from the ratings page

app.post('/filteredUsers', async (req, res) => {
  const { emailToExport } = req.body;
  try {
  
    const result = await db.query('SELECT * FROM users WHERE email = $1', [emailToExport]);
    res.json(result.rows);
   
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');}});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//gets applications table
app.get('/applications', async (req, res) => {
  try {
    const test = await db.query('SELECT * FROM applications');
    res.json(test.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }});












  //-----------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------------
    //gets users table
app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');}});
    //gets ratings table












    //-----------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------
app.get('/ratings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ratings');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');}});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//used to get the collumns that will be used to dynamically generate the app list
    app.get('/apps', async (req, res) => {
  try {
    const result = await pool.query('SELECT imageurl, id, name, homepage, description FROM applications');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
// API route to get table data
//this is filtered in the frontend NOT the backend
app.get('/api/data', async (req, res) => {
  try {
const result = await pool.query(`SELECT r.id,u.name AS userName,a.name AS appName,r.user_id,r.app_id,r.rating,r.comment,TO_CHAR(r.created_at, 'MM/DD/YYYY HH24:MI') AS created_at FROM ratings r JOIN users u ON u.id = r.user_id JOIN applications a ON a.id = r.app_id; `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  } 
});












//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//used to show the average rating on the apps page
router.get('/apps/:id/average-rating', async (req, res) => {
  const appId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT COALESCE(AVG(rating), 0) AS avg_rating FROM ratings WHERE app_id = $1`,
      [appId]
    );

    res.json({ avg_rating: parseFloat(result.rows[0].avg_rating) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});














//-----------------------------------------------------------------------------------------------------------------------------------------
module.exports = router;
//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//setting the server to run on port 3001
app.use('/', router);
app.listen(3001, () => {
  console.log('Server is running on port 3001');});
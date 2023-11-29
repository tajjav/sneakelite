// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cookieSession({
  name: "session",
  keys: ["OulAla", "seEhaa", "croPtop"],
  maxAge: 24 * 60 * 60 * 1000
}));
app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const listingsApiRoutes = require('./routes/listings-api');
const listingsRoutes = require('./routes/listings');
const favouritesApiRoutes = require('./routes/favourites-api');
// const favouritesRoutes = require('./routes/favourites');
// const messagesApiRoutes = require('./routes/messages-api');
// const messagesRoutes = require('./routes/messages');
const loginRoutes = require('./routes/login');
const db = require('./db/connection');
const messagesRoutes = require('./routes/messages');
const filteringRoutes = require('./routes/search');
const soldRoutes = require('./routes/sold');
const listingQueries02 = require('./db/queries/1_queries_for_listings/02_list_all_shoes');



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/listings', listingsApiRoutes);
app.use('/listings', listingsRoutes);

app.get('/item-details', (req, res) => {
  let userName = req.session.name;
  res.render('itemdes', { userName });
});





//mylisting button takes to my listing page

//app.use('/listings', listingsRoutes);
app.get('/my-listings', (req, res) => {
  let userName = req.session.name;
  res.render('mylistings', { userName });
});





//My Home button take me to he Home Page
app.get('/home-page', (req, res) => {
  let userName = req.session.name;
  res.render('index', { userName });
});

//My Home button take me to he Home Page
// My Home button takes me to the Home Page
app.get('/home-page', (req, res) => {
  let userName = req.session.name;
  res.render('index', { userName });
});




//manage-listing page leads to remove/sold page
app.get('/manage-listing', (req, res) => {
  let userName = req.session.name;
  res.render('removelisting', { userName });


});

app.use('/api/favourites', favouritesApiRoutes);
// app.use('/favourites', favouritesRoutes);
//My Wishlist button takes me to My wishlist page
app.get('/wishlist', (req, res) => {
  let userName = req.session.name;
  res.render('wishlist', { userName });
});


// app.use('/api/messages', messagesApiRoutes);
// app.use('/messages', messagesRoutes);


app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use('/', loginRoutes);


// app.use('/api/widgets', widgetApiRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  let user_id = req.session.user_id;
  
  if(!user_id) {
    res.render('index', {userName:null, items:[]});
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
      .then((data) => {
        console.log(data.rows);
        listingQueries02.listAll()
        .then(items => {
      
      
        

        const userName = data.rows[0].name;
        console.log(userName, items);
        res.render("index", {userName, items}); 
      }) 
      })
      .catch((error) => {
        console.error('Database error:', error);
        res.render("index", { userName: null });
      });
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

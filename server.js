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

const db = require('./db/connection');
const listingQueries02 = require('./db/queries/1_queries_for_listings/02_list_all_shoes');
const {showUserFavourites} = require('./db/queries/2_favourites_queries/01_favourites_queries');
const {listOne} = require('./db/queries/1_queries_for_listings/03_list_one_shoe');

const { retrieveFilteredListings } = require("./db/queries/4_filtering_queries/01_filtering_queries");
const {myListings} = require('./db/queries/1_queries_for_listings/07_my_listings');

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const listingsApiRoutes = require('./routes/listings-api');
const widgetApiRoutes = require('./routes/widgets-api');
const favouritesApiRoutes = require('./routes/favourites-api');
const loginRoutes = require('./routes/login');
const messagesRoutes = require('./routes/messages');
const filteringRoutes = require('./routes/search');
const soldRoutes = require('./routes/sold');




// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/listings', listingsApiRoutes);
app.use('/api/favourites', favouritesApiRoutes);
// app.use('/messages', messagesRoutes);
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use('/', loginRoutes);
app.use('/api/filtered', filteringRoutes);




////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// END POINTS  //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// Home page
app.get('/', (req, res) => {
  let user_id = req.session.user_id;

  if(!user_id) {
    listingQueries02.listAll()
      .then(items => {
        res.render("index", {userName:null, items});
      });
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
      .then((data) => {
        listingQueries02.listAll()
        .then(items => {
          const userName = data.rows[0].name;
          res.render("index", {userName, items});
        })
      })
      .catch((error) => {
        console.error('Database error:', error);
        res.render("index", { userName: null, items:[] });
      });
  }
});


// Wishlist page
app.get('/wishlist', (req, res) => {
  let user_id = req.session.user_id;

  if (!user_id) {
    listingQueries02.listAll()
      .then(items => {
        res.render("unauthorized", {userName:null, items});
      });
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
      .then((data) => {
        showUserFavourites(user_id)
          .then((items) => {
            const userName = data.rows[0].name;
            res.render("wishlist", {userName, items});
          })
      })
      .catch((error) => {
        console.error('Database error: ', error);
        res.render("index", { userName: null, items:[] }); // look to redirect or render?[Tauqeer]
      });
  }
});


// Item-details page
app.get('/item-details/:id', (req, res) => {
  let user_id = req.session.user_id;
  const { id } = req.params;
  if (!user_id) {
    listOne(id)
      .then(items => {
        res.render('itemdes', {userName:null, items});
      });
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
      .then((data) => {
        listOne(id)
          .then(items => {
            const userName = data.rows[0].name;
            res.render('itemdes', {userName, items});
          })
      })
      .catch((error) => {
        console.error("Database error: ", error);
        res.render('index', {userName: null, items: []});
      })
  }
});


// My listing page
app.get('/my-listings', (req, res) => {
  let user_id = req.session.user_id;
  if (!user_id) {
    listingQueries02.listAll()
      .then(items => {
        res.render("unauthorized", {userName:null, items}); 
      });
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
      .then((data) => {
        myListings(user_id)
          .then(items => {
            const userName = data.rows[0].name;
            res.render('mylistings', {userName, items});
          })
      })
      .catch((error) => {
        console.error("Database error: ", error);
        res.render('index', {userName: null, items: []});
      })
  }
});



  
// Manage-listing page leads to actions such as remove and sold
app.get('/manage-listing/:id', (req, res) => {
  let user_id = req.session.user_id;
  const { id } = req.params;
  if (!user_id) {
    listingQueries02.listAll()
      .then(items => {
        res.render("unauthorized", {userName:null, items}); 
      });
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
      .then((data) => {
        listOne(id)
          .then(items => {
            const userName = data.rows[0].name;
            res.render('removelisting', {userName, items});
          })
      })
      .catch((error) => {
        console.error("Database error: ", error);
        res.render('index', {userName: null, items: []});
      })
  }
});





// ADD item button leads to the Add item Page
app.get('/addlisting', (req, res) => {
  let userName = req.session.name;
  res.render('addlisting', { userName });
});


app.post('/api/filtered', (req, res) => {
  let userName = req.session.name;
  const {minPrice, maxPrice} = req.body;
  const filteredResults = retrieveFilteredListings({min_price: minPrice, max_price: maxPrice});
  console.log(filteredResults);
  filteredResults.then(shoe_listings => {
    console.log(shoe_listings);
    res.render('partials/_filters', {userName, shoe_listings});
  })
});



///NEW ADD-listing 

const { addToList } = require('./db/queries/1_queries_for_listings/01_add_shoe_listing.js');

app.post('/add-listing', (req, res) => {
  const newListing = {
    userId: req.session.user_id, 
    title: req.body.title,
    description: req.body.description,
    brand: req.body.brand,
    size: req.body.size,
    price: req.body.price,
    condition: req.body.condition,
    city: req.body.city,
    postalCode: req.body.postalCode,
    thumbnailUrl: req.body.thumbnailUrl,
    coverUrl: req.body.coverUrl,
    is_deleted: false,
    is_sold: false,
    is_featured:false

  };
  console.log(newListing)

  addToList(newListing)
    .then(listing => res.redirect('/my-listings'))
    .catch(error => {
      console.error('Error adding listing:', error);
      res.send('Error adding listing');
    });
});






//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

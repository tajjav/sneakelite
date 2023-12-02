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

// db queries link
const db = require('./db/connection');
const listingQueries02 = require('./db/queries/1_queries_for_listings/02_list_all_shoes');
const {showUserFavourites} = require('./db/queries/2_favourites_queries/01_favourites_queries');
const {listOne} = require('./db/queries/1_queries_for_listings/03_list_one_shoe');
const { retrieveFilteredListings } = require("./db/queries/4_filtering_queries/01_filtering_queries");
const {myListings} = require('./db/queries/1_queries_for_listings/07_my_listings');
const { addToList } = require('./db/queries/1_queries_for_listings/01_add_shoe_listing.js');

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const listingsApiRoutes = require('./routes/listings-api');
const widgetApiRoutes = require('./routes/widgets-api');
const favouritesApiRoutes = require('./routes/favourites-api');
const loginRoutes = require('./routes/login');
// const messagesRoutes = require('./routes/messages.js');
const filteringRoutes = require('./routes/search');
const soldRoutes = require('./routes/sold');
const { fstat } = require('fs');




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
            let {alertMessage} = req.query;
            if (!alertMessage) {
              alertMessage = null;
            } 
            res.render('mylistings', {userName, items, alertMessage});
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



// Filters page
app.post('/api/filtered', (req, res) => {
  let user_id = req.session.user_id;
  const {minPrice, maxPrice} = req.body;
  const filteredResults = retrieveFilteredListings({min_price: minPrice, max_price: maxPrice});
  console.log(filteredResults);

  if (!user_id) {
    filteredResults.then(shoe_listings => {
                      console.log(shoe_listings);
                      res.render('partials/_filters', {userName:null, shoe_listings});
    });
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
        .then((data) => {
          filteredResults.then(shoe_listings => {
                            console.log(shoe_listings);
                            const userName = data.rows[0].name;
                            res.render('partials/_filters', {userName, shoe_listings});
          })
        })
    }
});


// ADD item button leads to the Add item Page
app.get('/addlisting', (req, res) => {
  let user_id = req.session.user_id;
  if (!user_id) {
    listingQueries02.listAll()
      .then(items => {
        res.render("unauthorized", {userName:null, items}); 
      });
  } else {
    db.query("SELECT * FROM users WHERE id = $1", [user_id])
      .then((data) => {
            const userName = data.rows[0].name;
            res.render('addlisting', {userName});
      })
      .catch((error) => {
        console.error("Database error: ", error);
        res.render('index', {userName: null, items: []});
      })
  }
});

///NEW ADD-listing 
app.post('/add-listing', (req, res) => {
  const newListing = {
    user_id: req.session.user_id, 
    title: req.body.title,
    description: req.body.description,
    brand: req.body.brand,
    size: req.body.size,
    price: req.body.price,
    condition: req.body.condition,
    city: req.body.city,
    postal_code: req.body.postal_code,
    thumbnail_url: req.body.thumbnail_url,
    cover_url: req.body.cover_url,
    is_deleted: false,
    is_sold: false,
    is_featured:false

  };
  console.log(newListing)
  // res.json(newListing);


  addToList(newListing)
    .then((listing) => res.redirect('/my-listings'))
    .catch(error => {
      console.error('Error adding listing:', error);
      res.send(error)
      // ('Error adding listing');

    });
});




app.get('/mymessages', (req, res) => {
  let userName = req.session.name;
  const user_id = req.session.user_id;
  if (!user_id) return res.send("Unauthorized, log in first");
  Promise.all([
    db.query(`SELECT * from messages WHERE sender_id = $1 ORDER BY timestamp;` , [user_id]),
    db.query(`SELECT * from messages WHERE receiver_id = $1 ORDER BY timestamp; `, [user_id])
    
  ])
    .then(([sent, received]) => {
      const allmessages =[...sent.rows,...received.rows]
      res.render("mymessages", { messages: allmessages, userName,user_id });
      
      // res.json(data.rows)
    })
    .catch((err) => {
      console.log(err);
      res.send("error getting messages");
    });
  });




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

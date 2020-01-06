var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();



/*database connection */
const db = new sqlite.Database('./chinook.sqlite', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Yay! You are connected to the database!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

/* Albums List */
const albumList = 'SELECT * FROM albums LIMIT 5';

router.get('/albums', function(req, res, next){
  db.all(albumList, function(err, row){
    res.render('albums', {
      albums: row
    });
  });
});

/* Album Id */

router.get('/albums/:id', function(req, res, next){
  let albums = parseInt(req.params.id);
  console.log(albums);
  let idQuery = `SELECT * FROM albums WHERE AlbumId=${albums}`;
  console.log(idQuery);
  db.all(idQuery, (err, row) => {
    console.log(row);
    if (row.length > 0) {
      res.render('albums', {
        albums: row[0]
      });
    }else {
      res.send('not a valid ID');
    }
  });
});



module.exports = router;

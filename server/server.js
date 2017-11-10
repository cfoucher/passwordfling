const express = require('express');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 86400 });

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


app.get('/retrieve', (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).json({
      success: false,
      error: 'Missing required parameter(s)',
    });
  }

  cache.get(id, (err, value) => {
    if (!err) {
      if (value === undefined) {
        res.status(200).json({
          success: false,
          error: 'ID not found',
        });
      } else {
        res.status(200).json({
          success: true,
          error: null,
          data: value,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  });
});

app.post('/save', (req, res) => {
  if (!req.body.id || !req.body.hash) {
    res.status(400).json({
      success: false,
      error: 'Missing required parameter(s)',
    });
  }
  cache.set(req.body.id, req.body.hash, (err, success) => {
    if (!err && success) {
      res.status(200).json({
        success: true,
        error: null,
      });
    } else {
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  });
});

require('dotenv').config();
const express = require('express');
const winston = require('winston');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config')
const validateBearerToken = require('./validate-bearer-token')


const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'info.log' })
    ]
  });

  if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req,res)=> {
    res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
 let response
 if (NODE_ENV === 'production') {
 response = { error: { message: 'server error' } }
 } else {
 console.error(error)
 response = { message: error.message, error }
}
 res.status(500).json(response)
 })
    
const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
 .route('/bookmarks')
 .get((req, res) => {
   res.json(store.boomarks)

 })
 .post(bodyParser(req, res) => {
  for (const field of ['title', 'url', 'rating']) {
    if (!req.body[field]) {
      logger.error(`${field} is required`)
      return res.status(400).send(`'${field}' is required`)
    }
  }

  const {title, url, description, rating } = req.body
  
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    logger.error(`Invalid rating '${rating}' supplied`)
    return res.status(400).send(`'rating' must be a number between 0 and 5`)
  }

  if (!isWebUri(url)) {
    logger.error(`Invalid url '${url}' supplied`)
    return res.status(400).send(`'url' must be a valid URL`)}

  const bookmark = { id: uuid(), title, url, description, rating }
  bookmark.push(bookmark)

  logger.info(`Bookmark with id ${bookmark.id} created`)
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark)
 }) 

 bookmarksRouter 
 .route('bookmarks/:bookmark_id')
 .get((req, res) => {
   const {bookmark_id} = req.params
   const bookmark = bookmarks.find(b => b.id === bookmark_id);

   if (!bookmark) {
    return res
      .status(400)
      .send('Bookmark Does Not Exist);

    res.json(bookmark)

 })
 .delete((req, res) => {
  const {bookmark_id} = req.params;
  console.log(bookmark_id);
  const index = store.bookmarks.findIndex(b => b.id === bookmark_id);
  if (index === -1) {
    return res
      .status(404)
      .send('Bookmark not found');
  }

  store.bookmarks.splice(index, 1);

  res.send('Deleted');
  logger.info(`Bookmark with id ${bookmark_id} deleted.`)
    res
      .status(204)
      .end()

 })



module.exports = app;
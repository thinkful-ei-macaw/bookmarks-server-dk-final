const uuid = require('uuid/v4')

const bookmarks = [
  { id: uuid(),
    title: 'Best Email',
    url: 'https:/aol.com',
    description: 'Some text',
    rating: 5 },
]

module.exports ={bookmarks}
require('dotenv').config();

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/phonebook_tests'
  : process.env.MONGODB_URI || 'mongodb://localhost:27017/phonebook';

module.exports = {
  MONGODB_URI,
  PORT,
};

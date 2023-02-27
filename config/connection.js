const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNetworkApiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

var _fs = require("fs");

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var typeDefs = (0, _fs.readFileSync)('./graphql/schema/typeDefs.graphql', 'UTF-8');
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: typeDefs,
  resolvers: _resolvers["default"]
});
var app = (0, _express["default"])();
server.applyMiddleware({
  app: app
});

function main() {
  var port = process.env.PORT || 5000;
  _mongoose["default"].Promise = global.Promise;

  _mongoose["default"].connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  _mongoose["default"].set('useFindAndModify', false);

  var db = _mongoose["default"].connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  app.listen(port, function () {
    console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(port).concat(server.graphqlPath));
  });
}

main();
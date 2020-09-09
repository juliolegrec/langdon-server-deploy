import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
require('dotenv').config();

const typeDefs = readFileSync(
	__dirname + '/graphql/schema/typeDefs.graphql',
	'UTF-8'
);
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true,
});

const app = express();

server.applyMiddleware({ app });

function main() {
	const port = process.env.PORT || 5000;

	mongoose.Promise = global.Promise;

	mongoose.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	mongoose.set('useFindAndModify', false);

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'MongoDB connection error:'));

	app.listen(port, () => {
		console.log(
			`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
		);
	});
}

main();

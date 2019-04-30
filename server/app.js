const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

// cross-origin middleware
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb://localhost/graphql-ninja');
mongoose.connection.once('open', () => {
    // bind express with graphql
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));

    app.listen(4000, () => {
        console.log('Now listening for requests on port 4000');
    });
});

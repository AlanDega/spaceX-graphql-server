const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors')
const app = express();


app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Servidor corriendo en el puerto${port}`));

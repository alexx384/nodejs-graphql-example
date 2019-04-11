const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');

const PORT = 3000

const app = express();

// ===== Debug usecase only =====
app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome'
    })
});
// ==============================

app.use('/graphql', graphqlHttp({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
const express = require('express');
var cors = require('cors')
require('./db')


const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

// Using the routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/login', (req, res) => {
    res.send('we are using login up page !');
})

app.get('/signup', (req, res) => {
    res.send('we are using sign up page !');
})
app.listen(port, () => {
    console.log(`listening at port no ${port}`);
})
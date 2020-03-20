const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');


dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(mong => {
        // The server will start to listen for connection only after connected to mongodb. If connection fails, then
        // show a message error at console.
        const port = process.env.PORT || 5000;

        console.log('Connected to mongodb');

        app.listen(port, () => console.log(`Process running at port ${port}`));
    })
    .catch(err => console.log('Error:', err));

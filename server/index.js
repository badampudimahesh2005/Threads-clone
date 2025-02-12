
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();
const port =  process.env.PORT || 3000;

//-------------------------
//Connecting with database
connectDB() 
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log('Error:', err);
});
//-------------------------

app.get('/', (req, res) => {
    res.send('Hello World');
    });


app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port} `  );
}); 

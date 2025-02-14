
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

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

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.use('/api/user',userRoutes );


app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port} `  );
}); 

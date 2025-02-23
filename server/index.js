
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cookieParser = require('cookie-parser');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');

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
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.use('/api/user',userRoutes );
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port} `  );
}); 

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000; 

const connectDB = require('./config/db'); 

// Connect Database 
connectDB(); 

app.use(express.json({extended: false})); 

app.get('/', (req,res) => {
    res.send('API running');
}); 

var cors = require('cors');

app.use(cors());


// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/friends', require('./routes/api/friends')); 
app.use('/api/groups', require('./routes/api/groups')); 
app.use('/api/verify', require('./routes/api/verify')); 
app.use('/api/upload', require('./routes/api/upload'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 

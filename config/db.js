const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); 

const connectDB = async () => {
    try {
        // await mongoose.connect(db, {
        //     useNewUrlParser: true,
        //     useCreateIndex: true 
        // });
        mongoose.connect('mongodb://localhost:27017/dashboard', {useNewUrlParser: true, useCreateIndex: true});
        console.log('mongoDB connected..');
    }catch(err){
        console.error(err.message);
        process.exit(1); 
    }
}


module.exports = connectDB; 
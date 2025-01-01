const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongodb database");
        

    }catch(error){
        console.log("MONGO connect error",error);
        
    }
};

module.exports = connectDB;
const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Retrying MongoDB connection in 5 seconds...');
    
    // Try to reconnect after 5 seconds instead of exiting
    setTimeout(() => {
      connectToMongo();
    }, 5000);
  }
};

module.exports = connectToMongo;

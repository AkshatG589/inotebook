const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://akshatg1562004:MITB6YDpcsbpLsSY@cluster.hnixiky.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster');
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToMongo;
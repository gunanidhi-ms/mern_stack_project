import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Create an express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

//Set the port from environment variables or default to 7000
const PORT = process.env.PORT || 7000;

//Get the MongoDB connection string from environment variables
const MONGOURL = process.env.MONGO_URL;

//Connect the MongoDB and start the server
mongoose.connect(MONGOURL).then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

//Deine a user schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

//Create a mongoose model based called "UserModel" on the schema
const UserModel = mongoose.model('ISE', userSchema,"ISE");

//Route to get the user
app.get("/getusers", async (req, res) => {
    //Wait fetching all user data from the database using the UserModel
    const users = await UserModel.find();
    //Send the user data as a response
    res.json(users);
});
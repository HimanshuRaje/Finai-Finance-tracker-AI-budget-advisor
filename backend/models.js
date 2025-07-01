const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://himanshujagtap05:sVZ24zgMLnwkluJo@cluster0.0cnw4.mongodb.net/finai")

.then(()=> console.log("connected to MongoDB successfully!"))
.catch( err => console.error("MongoDB Connection ERROR",err))

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
     },     

    email: { 
        type: String,
        required: true, 
        unique: true 
    },

    password: { 
        type: String,
        required: true 
    },

    monthlyIncome: { 
        type: Number,
        default: 0  
    },
})

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to the User who owns this transaction
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"], // only allowed values
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // amount can't be negative
  },
  date: {
    type: Date,
    default: Date.now, // auto-sets current date if not provided
  },
  note: {
    type: String,
    default: "",
  },
}, { timestamps: true });


const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
  name: {
    type: String,
    required: true,
    trim: true,
      },
  targetAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  savedSoFar: {
    type: Number,
    default: 0,
    min: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Goal = mongoose.model("Goal", goalSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = {
  User,
  Goal,
  Transaction,
}
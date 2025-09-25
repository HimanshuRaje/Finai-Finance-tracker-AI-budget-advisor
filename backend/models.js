const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)

.then(()=> console.log("connected to MongoDB successfully!"))
.catch( err => console.error("MongoDB Connection ERROR",err))

const userSchema = new mongoose.Schema({
      
  email: { 
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },


  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },

  password: { 
    type: String,
    required: true 
  },

  monthlyIncome: { 
    type: Number,
    default: null  
  },

  savingsGoal: {
    type: Number,
    default: null
  },

  currentBalance:{
    type: Number,
    default: null
  }
})

const MonthlySummarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  month: {
    type: String, // e.g. "2025-09"
    required: true
  },
  expenses: {
    type: Map,
    of: Number, // { "Food": 8000, "Travel": 3000 }
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


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
const Transaction = mongoose.model("MonthlySummary", MonthlySummarySchema);


module.exports = {
  User,
  Goal,
  Transaction,
}
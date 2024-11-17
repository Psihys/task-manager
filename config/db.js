import mongoose from "mongoose"

// Your MongoDB connection string
const URI =
  'mongodb+srv://bogdans1:010105010105Bog!@cluster0.w2lcj.mongodb.net/?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err))

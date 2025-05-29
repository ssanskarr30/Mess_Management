const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');
const mongoose = require("mongoose");
// console.log(process.env);
const port = process.env.PORT || 3000;

// MongoDB connection with error handling
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})
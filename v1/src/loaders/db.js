const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once('open', () => {
  console.log('DB connected');
});

const connectDB = async () => {
  await Mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.i5kod.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = {
  connectDB,
};

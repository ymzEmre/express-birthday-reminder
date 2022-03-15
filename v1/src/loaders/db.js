const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once('open', () => {
  console.log('DB connected');
});

const connectDB = async () => {
  await Mongoose.connect('mongodb+srv://ymzemre:ymzEmre!m77@birthday-reminder.i5kod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectDB,
};

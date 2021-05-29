// packages
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// local
import app from './app';

dotenv.config({ path: './config.env' });

const { PORT, DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD } =
  process.env;
const port = PORT || 3000;

const startServer = async () => {
  if (DATABASE_URL && DATABASE_PASSWORD && DATABASE_USERNAME) {
    const databaseUrl = DATABASE_URL.replace(
      '<USERNAME>',
      DATABASE_USERNAME,
    ).replace('<PASSWORD>', DATABASE_PASSWORD);
    const db = await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    db.connection.on('error', console.error.bind(console, 'connection error:'));
    db.connection.once('open', function () {
      console.log('We are connected');
    });

    app.listen(PORT, () => console.log(`Listening on port ${port}`));
  } else {
    console.log(
      'Please define environment variables DATABASE_URL && DATABASE_PASSWORD && DATABASE_USERNAME in config.env',
    );
  }
};
startServer();

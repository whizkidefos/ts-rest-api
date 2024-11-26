import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router';

const app = express();
dotenv.config();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

// Database configuration
mongoose
  .connect(process.env.MONGO_URI, {

  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// const MONGO_URL = 'mongodb+srv://tsAPI:iefosa@cluster-ts-api.thtmy7k.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

// Create Server
const PORT = process.env.PORT || 9700;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
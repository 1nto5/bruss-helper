import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dmcheckMgmtRoutes from './routes/dmcheckMgmt.js';
import dmcheckProRoutes from './routes/dmcheckPro.js'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.set('strictQuery', false)
const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, { useNewUrlParser: true });

// PRODUCTION
// const PORT = "80"
// mongoose.connect('mongodb://127.0.0.1/bruss_helper', { useNewUrlParser: true });

// DEVELOPMENT
import cors from 'cors';
app.use(cors({
  origin: "*"
}));
const PORT = "4000"

// ROUTES
app.use('/', 
  dmcheckMgmtRoutes, 
  dmcheckProRoutes,
  userRoutes
);

// PRODUCTION serve React app
// import path from 'path';
// import serveStatic from 'serve-static';
// app.use(serveStatic(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

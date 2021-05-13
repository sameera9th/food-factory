import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@sam9th/common-modules'; // common set of modules written by me to use thorughout micro-services
import { foodRouter } from './routes/food';

const app = express();
app.set('trust proxy', true);
app.use(json());

// setting the access control origins when a request hits the API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// setting up the routes
app.use('/api/food', foodRouter);

// if the request does not match with any routes, the API will respond back with a not found response.
app.all('*', async function (req, res) {
  throw new NotFoundError();
});

// allows express to use errorHandler which we can use to throw any errors inside the application
app.use(errorHandler);

export { app };

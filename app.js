import express from 'express';
import cors from 'cors';
import routes from './routes/api.route.js';
import { errorHandler, errorConverter } from './middleware/error.js';

const app = express();
let corsOptions = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOptions));
app.get("/",(req,res)=>{
  res.status(200).json({CTS: "Up and Running"});
})

app.use(express.json());
app.use('api.coingecko.com/api/v3', routes);
app.use(errorConverter);
app.use(errorHandler);

export default app;
import app from './app.js';
import {seedData} from '../src/database/seed.js'
import { logger } from './config/logger.js';
const PORT = process.env.PORT ?? 3000;

const startServer = async()=>{

app.listen(PORT, () => {
  logger.info("Server started")
});
}

startServer()
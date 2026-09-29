import app from './app.js';
const PORT = process.env.PORT ?? 3000;

import { seedData } from './database/seed.js';

const startServer = async()=>{

  // await seedData()
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
}

startServer()

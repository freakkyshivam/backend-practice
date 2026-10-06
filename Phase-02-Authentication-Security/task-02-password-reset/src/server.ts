import app from "./app.js";
// import {seedData} from '../src/database/seed.js'
const PORT = process.env.PORT ?? 3000;
const startServer = async()=>{
   
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}

startServer();
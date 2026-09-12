
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res)=>{
    res.json({
        msg : "Server is running"
    })
})


export default app;
import 'dotenv/config'
import express from 'express';
import cookieparser from 'cookie-parser'

import userRouter from './module/user/routes/user.routes.js'
import taskRouter from './module/task/routes/task.routes.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieparser())

app.get('/', (req, res)=>{
    res.json({
        msg : "Server is running"
    })
})

app.use('/api/user', userRouter)
app.use('/api/task', taskRouter);

 

export default app;
import app from './app.js';

const PORT = process.env.PORT ?? 3000;

const startServer = async ()=>{
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
}

startServer();

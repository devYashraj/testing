import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({msg:"HELLO WORLD"})
})

app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
    
})
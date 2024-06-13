import express from 'express';
import { test } from './job.js';
import cors from 'cors';
import { presignedUrl } from './s3.js';
const app=express();
app.use(cors())
app.get('/',(req,res)=>
{
    res.send("hello")
})
app.get('/api/*',async(req,res)=>
{
    const result=await test(req.query.link);
    res.json({result:result});
   
});

app.get("/user/presigned",async (req, res) => {
    const totalfiles = req.query.total;
  
    try {
      const { keys, urls } = await presignedUrl(totalfiles);
      res.status(200).json({ keys: keys, urls: urls });
    } catch (error) {
      res.status(400).json({ error: "error occured" });
    }
  })

app.listen(3005,()=>{console.log("runnign code")})
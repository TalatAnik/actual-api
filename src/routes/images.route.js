const express = require('express')
const router = express.Router()

const {Deta} = require('deta')
const deta = Deta('c04auncb_5sTHrLUu9MjrcGGkWHgKNLMCPccf18jW')
const drive = deta.Drive("images")

router
.post("/upload", async (req, res) => {
    try{
        const name = req.files.file.name
        const contents = req.files.file.data
        const img = await drive.put(name, {data: contents})
        res.send(img)
    }catch(err){
        res.send(err)
    }
    
})
.get("/download/:name", async (req, res) => {
    const name = req.params.name;
    const img = await drive.get(name);
    const buffer = await img.arrayBuffer();
    res.send(Buffer.from(buffer));
})

module.exports = router
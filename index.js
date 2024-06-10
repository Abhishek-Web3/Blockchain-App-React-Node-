const express =  require("express")
const Blockchain = require('./blockchain')
const bodyParser = require('body-parser');

const app = express() 
app.use(bodyParser.json());  // for accept the json file
const blockchain  = new Blockchain();

app.get('/api/blocks',(req, res) => {
    res.json(blockchain.chain);
})

app.post('/api/mine', (req, res) => {
    const {data} = req.body;
    // npm i body-parser --save

    blockchain.addBlockintoBlockchain({data});
    res.redirect('/api/blocks');
})


const PORT = 3000;
app.listen(PORT, ()=> {
    'listening to PORT : ${PORT}'
});

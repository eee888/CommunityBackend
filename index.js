const express  = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors')
const db = require('./database')

app.use(express.json())

app.use(cors())
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

app.get('/tshirt', (req, res) =>{ res.status(200).send({tshirt: 'small'
 })
});

// app.get('/getStarter', (req, res) =>{ 
//     try{
//         db.promise().query(`SELECT * FROM Employee FETCH FIRST 1 ROWS ONLY;`)
//         res.status(200).send({msg: 'Created new phrase'})
//         console.log(sentence)
//     }
//     catch(err){
//         console.log(err);
//     }

// });

app.post('/tshirt/:id', (req, res) =>{ 
    const id = req.params.id;
    const logo = req.body.logo;

    if (!logo){
        res.status(418).send({message: "we need a logo"})
    }
    else{
        res.status(200).send({
            tshirt: `ID is ${id} with logo ${logo}`
        })
    }
});

app.post('/', (req, res)=>{
    const sentence = req.body.sentences;
    // const sentence = req;
    try{
        console.log(sentence)
        db.promise().query(`INSERT INTO CONVOSTARTERS VALUES('${sentence}')`)
        res.status(200).send({msg: `sentence is ${sentence}`})
    }
    catch(err){
        console.log(err);
    }
})

app.get('/getStarter', (req, res)=>{
    try{
        db.promise()
        .query(`SELECT SENTENCE FROM CONVOSTARTERS`)
        .then(([rows]) => {
            console.log("Query Result:", rows); // Log the result of the query where rows is the result of the query. 
            res.send(rows);  // Send the query results to the client. this is the result that the frontend will recieve 
        })
        .catch((err) => {
            console.error("Database Query Error:", err);
            res.status(500).send({ error: "Database query failed" });
        });
    }
    catch(err){
        console.log(err);
    }
})

app.post('/sendStarter', (req, res)=>{
    const sentence = req.body.sentences;
    try{
        console.log(`This is sentence '${sentence}'`)
        db.promise().query(`INSERT INTO CONVOSTARTERS VALUES('${sentence}')`)
        res.status(200).send({msg: `sentence is ${sentence}`})
    }
    catch(err){
        console.log(err);
    }
})
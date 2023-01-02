const express = require('express')
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Simple Node server Running');
});

app.use(cors());
app.use(express.json());

const users =[
    {id:1, name:'Shahanika', email:'shahanika@gmail.com'},
    {id:2, name:'Sabana', email:'sabana@gmail.com'},
    {id:3, name:'Sabnur', email:'sabnur@gmail.com'},
    {id:4, name:'Sabila', email:'sabila@gmail.com'},
];




const uri = "mongodb+srv://dbuser1:Fi2XewOVn8IlAzUN@cluster0.07lgbsy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection =client.db('simpleNode').collection('users');
        // const user ={name :'nahiya mahi', email:'nahi@gmail.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(result);
        app.get('/users',async(req, res)=>{
            const cursor =userCollection.find({});
            const users =await cursor.toArray()
            res.send(users);
        })
        app.post('/users', async(req, res)=>{
            console.log("post API Called");
            const user =req.body;
            // user.id =users.length+1;
            // users.push(user);
            // console.log(req.user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id=result.insertedId;
            res.send(user)
         })
    }
    finally {
        
    }
}
run().catch(err =>console.log(err)); 



app.get('/users', (req, res)=>{
    if (req.query.name) {
        const search =req.query.name;
        const filtered =users.filter(usr =>usr.name.toLowerCase().indexOf(search)>=0);
        res.send(filtered)
    }
    else{

        res.send(users)
    }
})

// app.post('/users', (req, res)=>{
//    console.log("post API Called");
//    const user =req.body;
//    user.id =users.length+1;
//    users.push(user);
//    console.log(req.user);
//    res.send(user)
// })


app.listen(port, () =>{
    console.log(`Simple not server running on port ${port}`);
})
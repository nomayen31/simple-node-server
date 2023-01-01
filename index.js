const express = require('express')
const cors =require('cors');
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

app.post('/users', (req, res)=>{
   console.log("post API Called");
   const user =req.body;
   user.id =users.length+1;
   users.push(user);
   console.log(req.user);
   res.send(user)
})


app.listen(port, () =>{
    console.log(`Simple not server running on port ${port}`);
})
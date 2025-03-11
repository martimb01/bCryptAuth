const express = require('express');
const bcrypt = require('bcrypt')

const app = express();
app.use(express.json())
const users = []



app.get('/users', (req, res) => {
    res.json(users)
})

//Creating User
app.post('/users', async (req,res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = {name:req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

//Loggin in User
app.post('/users/login', async (req,res) => {
 const user = users.find(user => user.name === req.body.name);
 if(!user) {
    return res.status(400).send("Cannot find that user")
}
try{
    if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('User logged in')
    } else {
        res.send('Password not correct')
    }
} catch {
    res.status(500).send()
}


})


app.listen(3000, () =>{
    console.log('Server listening on port 3000')
})
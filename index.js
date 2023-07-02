const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const http = require('http')
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json())

// 1. Hello World
// app.get('/', (req, res) => {
//     console.log(req, res)
//     return res.send("Hello World!")
// })

// 2. Static Pages
// app.use(express.static('public'))


// 3. CRUD
// app.get('/users', (req,res)=>{
//     return res.json({message: 'get Call'})
// })
// app.post('/users', (req,res)=>{
//     return res.json({message: 'post Call'})
// })
// app.put('/users', (req,res)=>{
//     return res.json({message: 'put Call'})
// })
// app.delete('/users', (req,res)=>{
//     return res.json({message: 'delete Call'})
// })


// 4. TodoList
// let todos = [
//     {
//         id: 1,
//         todo: 'a'
//     },
//     {
//         id: 2,
//         todo: 'b'
//     },
// ];
// app.get('/todo', (req, res) => {
//     return res.json(todos)
// })
// app.post('/todo', (req, res) => {
//     todos.push(req.body);
//     return res.json(todos)
// })
// app.put('/todo/:id', (req, res) => {
//     todo = todos.find(resp => Number(resp.id) == Number(req.params.id));
//     if (todo) {
//         todo.id = Number(req.params.id);
//         todo.todo = req.body.todo;
//         todos = todos.filter(resp => Number(resp.id) != Number(req.params.id));
//         todos.push(todo);
//     } else {
//         res.status(404).json('Not Found');
//     }
//     return res.json(todos)
// })
// app.delete('/todo/:id', (req, res) => {
//     todos = todos.filter(resp => Number(resp.id) != Number(req.params.id));
//     return res.json(todos)
// })

// 4.User Auth
// const users = [];
// const secretkey = 'secretkey';
// app.post('/register', (req, res) => {
//     console.log(req.body?.username);
//     const { username, password } = req.body;
//     users.push({ username: username, password: bcrypt.hashSync(password, 10) })
//     return res.json(users)
// })
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(resp => resp.username == username);
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//         res.json({ message: 'Invalid Credentials' });
//     }
//     const token = jwt.sign({ username: user.username }, secretkey)
//     return res.json({ token: token })
// })
// app.get('/protected', (req, res) => {
//     const token = req.headers.authorization;
//     try {
//         console.log(token)
//         const decoded = jwt.verify(token, secretkey);
//         const username = decoded.username;
//         return res.json({ message: `Welcome, ${username}` })
//     } catch (error) {
//         console.error('Error:', error.message);
//         return res.json({ error: `Error: ${error.message}` });
//     }
// })

// 5. Image Uploader
// const storageEngine = multer.diskStorage({
//     destination:'./uploads',
//     filename: (req,file,cb)=>{
//         cb(null, `${Date.now(0)}-${file.originalname}`)
//     },
// })
// const upload = multer({ storage: storageEngine });
// app.post('/upload', upload.single('image'), (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }
//         return res.json({ message: 'File uploaded successfully', file: req.file });
//     } catch (error) {
//         return res.json({ error: error })
//     }
// })

// 6. Real Chat App 
app.use(express.static('public'));

app.get('/socket.io/socket.io.js', (req, res) => {
    const filePath = __dirname + '/node_modules/socket.io/client-dist/socket.io.js';
    res.sendFile(filePath);
  });
app.get('/socket.io/socket.io.js.map', (req, res) => {
    const filePath = __dirname + '/node_modules/socket.io/client-dist/socket.io.js.map';
    res.sendFile(filePath);
  });

io.on('connection',(socket)=>{
    console.log('User Connected')

    socket.on('message',(msg)=>{
        console.log('Message Received', msg);
        io.emit('message', msg);
    })

    socket.on('disconnect',()=>{
        console.log('User Disconnected')
    })
})


app.listen(3000, () => {
    console.log('Server Started')
})
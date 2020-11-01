const express = require('express');
// const fs = require('fs');
const todoRouter=require('./router/todo.js');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended : false}));
app.use(express.static('./public/'));

// app.use((req, res, next) => {
//     console.log('This is custom middleware');
//     // res.status(200).send('from middleware'); //มันจะรีเทิร์นเลยนะ 
//     req.test = 'Test message';
//     next();
// })

// app.use((req, res, next) => {
//     console.log(req.test);
//     next();
// })

// const todoLists = JSON.parse(fs.readFileSync('./mock/todo.json'));
// // เพื่อเเปลง request body ที่เป็น json จาก postman ให้เป็น javascript object

// const ValidateID = (req, res, next) => {
//     const id = +req.params.id;
//     const idx = todoLists.findIndex(el => el.id === id);

//     if (idx === -1) {
//         return res.status(404).send({ message: 'Invalid Id' });
//     }
//     req.idx = idx;
//     next()
// }

// const getAllTodos = (req, res) => {
//     const searchTask = req.query.search;
//     if (searchTask) {
//         const filterTodoList = todoLists.filter(el => el.task.includes(searchTask));
//         return res.status(200).send(filterTodoList);
//     }
//     res.status(200).send(todoLists);
// };

// const getTodo = (req, res) => {
//     const id = +req.params.id;

//     const todo = todoLists.filter(el => el.id === id);
//     res.status(200).send({ todo: todo[0] });
// };

// const createTodo = (req, res) => {
//     const newId = todoLists.length > 0 ? todoLists[todoLists.length - 1].id + 1 : 0;
//     const newTodoList = {
//         id: newId, task: req.body.task
//     };

//     todoLists.push(newTodoList);

//     fs.writeFileSync('./mock/todo.json', JSON.stringify(todoLists));
//     res.status(201).send({ todo: newTodoList });
// };

// const updateTodo = (req, res) => {
//     const id = +req.params.id;

//     todoLists[req.idx] = { id: id, task: req.body.task };

//     fs.writeFileSync('./mock/todo.json', JSON.stringify(todoLists));
//     res.status(200).send({ todo: todoLists });
// };

// const deleteTodo = (req, res) => {
//     const id = +req.params.id;

//     const newTodoLists = todoLists.filter(el => el.id !== id);
//     fs.writeFileSync('./mock/todo.json', JSON.stringify(newTodoLists));
//     res.status(204).send();
// };

// app.get('/todos', getAllTodos);
// app.get('/todos/:id', ValidateID, getTodo);
// app.post('/todos', createTodo);
// app.patch('/todos/:id', ValidateID, updateTodo);
// app.delete('/todos/:id', ValidateID, deleteTodo);

app.use('/todos',todoRouter)

// app.use((req, res) => {
//     // res.status(404).send({ message: 'not found' })
//     next(new Error('Path not found'))
// })

// app.use((req,res,next)=>{
//     console.log("Test middleware ")
// })
// อันนี้จะไม่ถูกรันเพราะ middlewareก่อนหน้าบอกว่า next station ไป  error middleware หาที่มี 4 parameter

// app.use((err,req,res,next)=>{
//     console.log("Error middleware ")
// })


const port = 8000;
app.listen(port, () => {
    console.log(`server starting on port ${port}`);
});
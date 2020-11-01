const express = require('express'); 
const router=express.Router();

const fs = require('fs');
// const app = express();
// app.use(express.json());


const todoLists = JSON.parse(fs.readFileSync('./mock/todo.json'));
// เพื่อเเปลง request body ที่เป็น json จาก postman ให้เป็น javascript object

const ValidateID = (req, res, next) => {
    const id = +req.params.id;
    const idx = todoLists.findIndex(el => el.id === id);

    if (idx === -1) {
        return res.status(404).send({ message: 'Invalid Id' });
    }
    req.idx = idx;
    next()
}

const getAllTodos = (req, res) => {
    const searchTask = req.query.search;
    if (searchTask) {
        const filterTodoList = todoLists.filter(el => el.task.includes(searchTask));
        return res.status(200).send(filterTodoList);
    }
    res.status(200).send(todoLists);
};

const getTodo = (req, res) => {
    const id = +req.params.id;

    const todo = todoLists.filter(el => el.id === id);
    res.status(200).send({ todo: todo[0] });
};

const createTodo = (req, res) => {
    const newId = todoLists.length > 0 ? todoLists[todoLists.length - 1].id + 1 : 0;
    const newTodoList = {
        id: newId, task: req.body.task
    };

    todoLists.push(newTodoList);

    fs.writeFileSync('./mock/todo.json', JSON.stringify(todoLists));
    res.status(201).send({ todo: newTodoList });
};

const updateTodo = (req, res) => {
    const id = +req.params.id;

    todoLists[req.idx] = { id: id, task: req.body.task };

    fs.writeFileSync('./mock/todo.json', JSON.stringify(todoLists));
    res.status(200).send({ todo: todoLists });
};

const deleteTodo = (req, res) => {
    const id = +req.params.id;

    const newTodoLists = todoLists.filter(el => el.id !== id);
    fs.writeFileSync('./mock/todo.json', JSON.stringify(newTodoLists));
    res.status(204).send();
};

router.get('/', getAllTodos);
router.get('/:id', ValidateID, getTodo);
router.post('/', createTodo);
router.patch('/:id', ValidateID, updateTodo);
router.delete('/:id', ValidateID, deleteTodo);

module.exports = router;
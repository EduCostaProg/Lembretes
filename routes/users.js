import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let Todo = [];

// all routes in here are are /users
router.get('/', (req, res) => {
  console.log(Todo);

  res.send(Todo);
});

router.post('/', (req, res) => {
  const Todo = req.body;

  Todo.push({ ...Todo, id: uuidv4() });

  res.send(`Lembrete /${Todo.titulo}/ adicionado`);
});

// /users/2 => req.params { id: 2 }

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = Todo.find(user => user.id === id);

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Todo = Todo.filter(user => user.id !== id);

  res.send(`Lembrete com o id: ${id} deletado`);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { title, notes, start, end } = req.body;

  const user = Todo.find(user => user.id === id);

  if (title) user.title = title;
  if (notes) user.notes = notes;
  if (start) user.start = start;
  if (end) user.end = end;

  res.send(`Lembrete com o id: ${id} foi atualizado`);
});

export default router;

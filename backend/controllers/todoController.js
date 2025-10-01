import Todo from '../models/Todo.js';

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

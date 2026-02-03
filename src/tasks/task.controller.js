import Task from './task.model.js';

export const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true, status } = req.query;

    const filter = { isActive };

    if (status) {
      filter.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { dueDate: 1 },
    };

    const tasks = await Task.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(options.sort);

    const total = await Task.countDocuments(filter);

    res.status(200).json({
      success: true,

      data: tasks,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Error al obtener las tareas',

      error: error.message,
    });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,

        message: 'Tarea no encontrada',
      });
    }

    res.status(200).json({
      success: true,

      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Error al obtener la tarea',

      error: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const taskData = req.body;

    const task = new Task(taskData);

    await task.save();

    res.status(201).json({
      success: true,

      message: 'Tarea creada exitosamente',

      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: 'Error al crear la tarea',

      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,

        message: 'Tarea no encontrada',
      });
    }

    res.status(200).json({
      success: true,

      message: 'Tarea actualizada exitosamente',

      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: 'Error al actualizar la tarea',

      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tarea eliminada exitosamente',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message,
    });
  }
};


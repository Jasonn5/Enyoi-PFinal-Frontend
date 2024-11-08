import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../components/Modal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { getTasks, updateTaskStatus, createTask } from '../services/taskService';
import '../styles/Tasks.css';

const TASK_STATUSES = ['pendiente', 'en progreso', 'completada'];

const Task = ({ task, moveTask, onDoubleClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id_tarea },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getTaskStyle = (estado) => {
    switch (estado.toUpperCase()) {
      case 'PENDIENTE':
        return { backgroundColor: '#e57373', color: '#fff' };
      case 'EN PROGRESO':
        return { backgroundColor: '#ffb74d', color: '#fff' };
      case 'COMPLETADA':
        return { backgroundColor: '#81c784', color: '#fff' };
      default:
        return {};
    }
  };

  return (
    <div
      ref={drag}
      className="task"
      style={{ ...getTaskStyle(task.estado), opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={() => onDoubleClick(task)}
    >
      <h4>{task.titulo.toUpperCase()}</h4>
      <p><strong>Prioridad:</strong> {task.prioridad}</p>
      <p><strong>Vence:</strong> {new Date(task.fecha_vencimiento).toLocaleDateString()}</p>
    </div>
  );
};

const Column = ({ status, tasks, moveTask, onTaskDoubleClick }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
  });

  return (
    <div ref={drop} className="column">
      <h3>{status.toUpperCase()}</h3>
      <div className="column-content">
        {tasks.map((task) => (
          <Task key={task.id_tarea} task={task} moveTask={moveTask} onDoubleClick={onTaskDoubleClick} />
        ))}
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter state
  const [titleFilter, setTitleFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response || []);
        setFilteredTasks(response || []);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    // Apply filters whenever tasks or filter values change
    filterTasks();
  }, [tasks, titleFilter, dueDateFilter, categoryFilter]);

  const filterTasks = () => {
    const filtered = tasks.filter(task => {
      const matchesTitle = task.titulo.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesDueDate = dueDateFilter ? new Date(task.fecha_vencimiento).toLocaleDateString() === dueDateFilter : true;
      const matchesCategory = categoryFilter ? task.Categories.some(cat => cat.nombre_categoria.toLowerCase().includes(categoryFilter.toLowerCase())) : true;
      return matchesTitle && matchesDueDate && matchesCategory;
    });
    setFilteredTasks(filtered);
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id_tarea === taskId ? { ...task, estado: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      const createdTask = response.data;
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setShowModal(false);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const handleTaskDoubleClick = (task) => {
    setSelectedTask(task);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id_tarea === updatedTask.id_tarea ? updatedTask : task
      )
    );
    setSelectedTask(null); 
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tasks-container">
        <div className="button-container">
          <button onClick={() => setShowModal(true)} className="add-task-button">
            Agregar tarea
          </button>
        </div>

        {/* Filters Row */}
        <div className="filter-row">
          <input
            type="text"
            placeholder="Filtrar por título"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
          <input
            type="date"
            placeholder="Filtrar por fecha de vencimiento"
            value={dueDateFilter}
            onChange={(e) => setDueDateFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrar por categoría"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </div>

        <div className="kanban-board">
          {TASK_STATUSES.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={filteredTasks.filter((task) => task.estado.toLowerCase() === status.toLowerCase())}
              moveTask={moveTask}
              onTaskDoubleClick={handleTaskDoubleClick}
            />
          ))}
        </div>
        {showModal && <Modal onClose={() => setShowModal(false)} onAddTask={handleAddTask} />}
        {selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onSave={handleSaveTask}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default Tasks;

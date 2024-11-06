import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import '../styles/TaskDetailsModal.css';
import { getCategories, createCategory, updateTask, assignCategoryToTask, removeCategoryFromTask, deleteTask } from '../services/taskService';

const TaskDetailsModal = ({ task, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(task.titulo);
  const [description, setDescription] = useState(task.descripcion);
  const [dueDate, setDueDate] = useState(task.fecha_vencimiento.split('T')[0]);
  const [priority, setPriority] = useState(task.prioridad);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    task.Categories.map((cat) => ({ value: cat.id_categoria, label: cat.nombre_categoria }))
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.map(cat => ({ value: cat.id_categoria, label: cat.nombre_categoria })));
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async (inputValue) => {
    try {
      const newCategory = await createCategory(inputValue);
      const newCategoryOption = { value: newCategory.id_categoria, label: newCategory.nombre_categoria };
      setCategories(prev => [...prev, newCategoryOption]);
      setSelectedCategories(prev => [...prev, newCategoryOption]);
    } catch (error) {
      console.error('Error al crear la nueva categoría:', error);
    }
  };

  const handleSave = async () => {
    try {
      for (const cat of task.Categories) {
        await removeCategoryFromTask(task.id_tarea, cat.id_categoria);
      }

      for (const cat of selectedCategories) {
        await assignCategoryToTask(task.id_tarea, cat.value);
      }

      const updatedTaskData = {
        titulo: title,
        descripcion: description,
        fecha_vencimiento: dueDate,
        prioridad: priority
      };
      await updateTask(task.id_tarea, updatedTaskData);

      onSave({ ...task, ...updatedTaskData, Categories: selectedCategories });
      onClose(); 
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Hubo un problema al guardar los cambios.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id_tarea);
      onDelete(task.id_tarea);
      onClose();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Hubo un problema al eliminar la tarea.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalles de la tarea</h2>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Fecha de vencimiento</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Prioridad</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="categories">Categorías</label>
          <CreatableSelect
            id="categories"
            options={categories}
            isMulti
            value={selectedCategories}
            onChange={(selected) => setSelectedCategories(selected)}
            onCreateOption={handleCreateCategory}
            placeholder="Selecciona o crea una categoría"
            isSearchable
            isClearable
          />
        </div>
        <p><strong>Estado:</strong> {task.estado}</p>
        <p><strong>Fecha de creación:</strong> {new Date(task.fecha_creacion).toLocaleDateString()}</p>
        <p><strong>Última actualización:</strong> {new Date(task.fecha_actualizacion).toLocaleDateString()}</p>
        <div className="button-container">
          <button onClick={handleSave} className="save-button">Guardar cambios</button>
          <button onClick={handleDelete} className="delete-button">Eliminar</button>
        </div>        
        <button onClick={onClose} className="cancel-button">Cerrar</button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;

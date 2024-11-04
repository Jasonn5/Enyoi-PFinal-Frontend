// src/components/TaskDetailsModal.js
import React, { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import '../styles/TaskDetailsModal.css';

const TaskDetailsModal = ({ task, onClose, onSave }) => {
  // Estado local para los campos editables
  const [title, setTitle] = useState(task.titulo);
  const [description, setDescription] = useState(task.descripcion);
  const [dueDate, setDueDate] = useState(task.fecha_vencimiento.slice(0, 10)); // Formatea la fecha
  const [priority, setPriority] = useState(task.prioridad);
  const [categories, setCategories] = useState(task.Categories.map(cat => ({
    value: cat.id_categoria,
    label: cat.nombre_categoria,
  })));

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      titulo: title,
      descripcion: description,
      fecha_vencimiento: dueDate,
      prioridad: priority,
      Categories: categories.map(cat => ({
        id_categoria: cat.value,
        nombre_categoria: cat.label,
      })),
    };
    onSave(updatedTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalles de la tarea</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de título */}
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

          {/* Campo de descripción */}
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Campo de fecha de vencimiento */}
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

          {/* Campo de prioridad */}
          <div className="form-group">
            <label htmlFor="priority">Prioridad</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          {/* Campo de categorías */}
          <div className="form-group">
            <label htmlFor="categories">Categorías</label>
            <CreatableSelect
              id="categories"
              options={categories}
              isMulti
              value={categories}
              onChange={setCategories}
              placeholder="Selecciona o crea una categoría"
              isSearchable
              isClearable
            />
          </div>

          {/* Campos no editables */}
          <p><strong>Estado:</strong> {task.estado}</p>
          <p><strong>Fecha de creación:</strong> {new Date(task.fecha_creacion).toLocaleDateString()}</p>
          <p><strong>Última actualización:</strong> {new Date(task.fecha_actualizacion).toLocaleDateString()}</p>

          {/* Botones */}
          <div className="button-container">
            <button type="submit" className="save-button">Guardar cambios</button>
            <button type="button" onClick={onClose} className="cancel-button">Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsModal;

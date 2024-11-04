import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getCategories, createTask, createCategory, assignCategoryToTask } from '../services/taskService';
import '../styles/Modal.css';

const Modal = ({ onClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Media');
    const [status, setStatus] = useState('pendiente');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(); 
                setCategories(data.map((category) => ({
                    value: category.id_categoria,
                    label: category.nombre_categoria,
                })));
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            titulo: title,
            descripcion: description,
            fecha_vencimiento: dueDate,
            prioridad: priority,
            estado: status,
        };

        try {
            const createdTask = await createTask(newTask);

            if (selectedCategories.length > 0) {
                for (const cat of selectedCategories) {
                    await assignCategoryToTask(createdTask.id_tarea, cat.value);
                }
            }

            alert('Tarea creada y categorías asignadas con éxito');
            onAddTask(); // Refrescar la lista de tareas si es necesario
            onClose(); // Cerrar el modal
        } catch (error) {
            alert('Hubo un error al crear la tarea o asignar las categorías');
        }
    };

    const handleAddCategory = async (newCategoryName) => {
        try {
            const newCategory = await createCategory(newCategoryName);
            const categoryOption = {
                value: newCategory.id_categoria,
                label: newCategory.nombre_categoria,
            };

            setCategories([...categories, categoryOption]);
            setSelectedCategories([...selectedCategories, categoryOption]);
        } catch (error) {
            console.error('Error al añadir una nueva categoría:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Agregar nueva tarea</h2>
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
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </div>

                    {/* Campo de estado */}
                    <div className="form-group">
                        <label htmlFor="status">Estado</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="en progreso">En progreso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>

                    {/* Campo de categorías */}
                    <div className="form-group">
                        <label htmlFor="categories">Categorías</label>
                        <CreatableSelect
                            id="categories"
                            options={categories}
                            isMulti
                            value={selectedCategories}
                            onChange={(selected) => setSelectedCategories(selected)}
                            placeholder="Selecciona o crea una categoría"
                            onCreateOption={handleAddCategory} // Llama a la función para crear una nueva categoría
                            isSearchable
                            isClearable
                        />
                    </div>

                    {/* Botones */}
                    <div className="button-container">
                        <button type="submit" className="submit-button">Agregar</button>
                        <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;

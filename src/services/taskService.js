import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const authHeader = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, { headers: authHeader });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, task, { headers: authHeader });
        return response.data;
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        throw error;
    }
};

export const assignCategoryToTask = async (taskId, categoryId) => {
    try {
        await axios.post(`${API_BASE_URL}/tasks/assign-category`, { id_tarea: taskId, id_categoria: categoryId }, { headers: authHeader });
    } catch (error) {
        console.error('Error al asignar la categoría:', error);
        throw error;
    }
};

export const createCategory = async (categoryName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories`, { nombre_categoria: categoryName }, { headers: authHeader });
        return response.data;
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        throw error;
    }
};


export const updateTaskStatus = (taskId, newStatus) => {
    return axios.put(`${API_BASE_URL}/tasks/${taskId}`, { estado: newStatus }, { headers: authHeader });
  };
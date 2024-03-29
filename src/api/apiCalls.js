import axios from 'axios';

const BASE_URL = 'https://task-management-backend-mocha.vercel.app/api';

const apiCalls = {
    // Fetch all tasks
    fetchTasks: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tasks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    // Create a new task
    createTask: async (taskData) => {
        try {
            const response = await axios.post(`${BASE_URL}/tasks`, taskData);
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    fetchTaskById: async (taskId) => {
        try {
            const response = await axios.get(`${BASE_URL}/tasks/${taskId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching task', error)
            throw error;
        }
    },

    // Update an existing task
    updateTask: async (taskId, updatedTaskData) => {
        try {
            const response = await axios.patch(`${BASE_URL}/tasks/${taskId}`, updatedTaskData);
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    // Delete a task
    deleteTask: async (taskId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },
};

export default apiCalls;

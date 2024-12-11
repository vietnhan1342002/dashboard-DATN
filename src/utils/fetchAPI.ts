import axios from './axios';

// Hàm GET data từ API
export const getDataApi = async (url: string, token: string) => {
    try {
        const res = await axios.get(`/api/v1${url}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error('Error in GET:', error);
        throw error;
    }
};

// Hàm POST data tới API
export const postDataApi = async (url: string, post: any, token: string) => {
    try {
        const res = await axios.post(`/api/v1${url}`, post, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Response:', res);
        return res.data;
    } catch (error) {
        console.error('Error in POST:', error);
        throw error;
    }
};

// Hàm PUT data tới API
export const putDataApi = async (url: string, post: any, token: string) => {
    try {
        const res = await axios.put(`/api/v1${url}`, post, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error('Error in PUT:', error);
        throw error;
    }
};

// Hàm PATCH data tới API
export const patchDataApi = async (url: string, post: any, token: string) => {
    try {
        const res = await axios.patch(`/api/v1${url}`, post, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error('Error in PATCH:', error);
        throw error;
    }
};

// Hàm DELETE data từ API
export const deleteDataApi = async (url: string, token: string) => {
    try {
        const res = await axios.delete(`/api/v1${url}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error('Error in DELETE:', error);
        throw error;
    }
};

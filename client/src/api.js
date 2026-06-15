import axios from "axios";
import useAuthStore from "./store/useAuthStore";

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((req) => {
    const state = useAuthStore.getState();
    if (state.token) {
        req.headers.Authorization = `Bearer ${state.token}`;
    }
    return req;
});

export default API;
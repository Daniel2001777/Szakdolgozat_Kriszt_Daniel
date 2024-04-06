import axios from 'axios';

// Létrehoz egy példányt az Axios-ból
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Beállítja az alapértelmezett URL-t
});

export default instance;
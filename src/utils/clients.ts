import axios from 'axios';

export const typicode_client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});


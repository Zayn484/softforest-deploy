import axios from 'axios';

const projects = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/projects-detail/'
});

export default projects;
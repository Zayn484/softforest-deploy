import axios from "axios";

const instance = axios.create({
  baseURL: "http://ec2-18-191-79-52.us-east-2.compute.amazonaws.com/api/"
});

export default instance;

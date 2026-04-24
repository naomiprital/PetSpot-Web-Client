import axios from 'axios';
import { SERVER_BASE_URL } from '../../utils/consts';

const api = axios.create({
  baseURL: SERVER_BASE_URL,
});
export default api;

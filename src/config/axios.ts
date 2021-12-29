import axios from 'axios';
import { BASE } from './index';

export default axios.create({ baseURL: BASE });

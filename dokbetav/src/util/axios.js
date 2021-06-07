import Axios from 'axios';

import {axiosURL} from '../constants/const';

export const axios = Axios.create({
    baseURL: axiosURL,
    headers: {Auth: null},
    timeout: 3000,
});
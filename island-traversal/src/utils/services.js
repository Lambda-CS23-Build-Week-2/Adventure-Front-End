import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const axiosWithAuth = () => {
    return axios.create({
        headers: {
            'Authorization': `Token ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': `*/*`
        }
    });
}

export {
    axiosWithAuth
}
import axios from 'axios';

// Fetch the first row data of the table from database
export const getFirsthData = async (link_of_env, rest_of_link, set_data) => {

    try {
        const res = await axios.get(`${link_of_env}${rest_of_link}`);
        set_data(res.data[0]);
    } catch (err) {
        
    }
}

// Fetch all data of the table from database
export const getAllData = async (link_of_env, rest_of_link, set_data) => {
    try {
        const res = await axios.get(`${link_of_env}${rest_of_link}`);
        set_data(res.data);
    } catch (err) {
        
    }
}

// Post all data in a specific category (useParams)
export const postDataWithCategory = async (link, use_params, config, set_data) => {
    try {
        const res = await axios.post(link, {use_params}, config);
        set_data(res.data);
    } catch (err) {
        
    }
};
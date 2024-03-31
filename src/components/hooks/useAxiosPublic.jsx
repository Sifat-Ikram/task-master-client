import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://taste-trail-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
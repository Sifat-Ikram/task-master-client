import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";


const useCompleted = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { refetch: refetchCompleted, data: completed = [] } = useQuery({
        queryKey: ['completed', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/completed?email=${user.email}`)
            return res.data;
        }

    })
    return [completed, refetchCompleted];
};

export default useCompleted;
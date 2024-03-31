import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";


const useBooking = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { refetch: refetchBooking, data: booking = [] } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/bookings?email=${user.email}`)
            return res.data;
        }

    })
    return [booking, refetchBooking];
};

export default useBooking;
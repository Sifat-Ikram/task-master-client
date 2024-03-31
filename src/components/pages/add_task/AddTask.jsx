import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cover from "../../hooks/Cover";
import task from "../../../assets/image/task.png"
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const AddTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data)
        const taskInfo = {
            addedName: user.displayName,
            addedEmail: user.email,
            name: data.name,
            description: data.description
        }

        const taskRes = await axiosPublic.post('/task', taskInfo);
        
        if (taskRes.data.insertedId) {
            Swal.fire("Task added!!!");
            reset();
        }
    }

    return (
        <div className="my-20">
            <div className="w-full mx-auto">
                <Cover title={"Add Task"} img={task} />
                <div className="w-4/5 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className='my-8 space-y-7'>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input {...register("name")} type="text" placeholder="Type your name here" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Task Description
                            </label>
                            <textarea {...register("description")} type="text" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Write Recipe"></textarea>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary w-full'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTask;

import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import useBooking from "../../hooks/useBooking";
import useRunning from "../../hooks/useRunning";
import useCompleted from "../../hooks/useCompleted";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [booking, refetchBooking] = useBooking();
  const [running, refetchRunning] = useRunning();
  const [completed, refetchCompleted] = useCompleted();

  if (!user) {
    return <h1>Loading...</h1>;
  }

  const handlePendingDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/bookings/${item._id}`).then(() => {
          refetchBooking();
          Swal.fire({
            position: "top-right",
            title: "Deleted!",
            text: "This task is deleted",
            icon: "success",
          });
        });
      }
    });
  };

  const handleToRunning = (task) => {
    const runningTask = {
      userName: task.userName,
      email: task.email,
      taskName: task.taskName,
      description: task.description,
    };

    axiosPublic.post("/running", runningTask).then(() => {
      axiosPublic.delete(`/bookings/${task._id}`).then(() => {
        refetchBooking();
        refetchRunning();
      });
    });
  };

  const handleRunningDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/running/${item._id}`).then(() => {
          refetchRunning();
          Swal.fire({
            position: "top-right",
            title: "Deleted!",
            text: "This task is deleted",
            icon: "success",
          });
        });
      }
    });
  };

  const handleToCompleted = (task) => {
    const completedTask = {
      userName: task.userName,
      email: task.email,
      taskName: task.taskName,
      description: task.description,
    };

    axiosPublic.post("/completed", completedTask).then(() => {
      axiosPublic.delete(`/running/${task._id}`).then(() => {
        refetchRunning();
        refetchCompleted();
      });
    });
  };

  const handleCompletedDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/completed/${item._id}`).then(() => {
          refetchCompleted();
          Swal.fire({
            position: "top-right",
            title: "Deleted!",
            text: "This task is deleted",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="lg:flex justify-center max-md:items-center ml-3">
      <div className="w-3/4 mx-auto mt-28">
        <h1 className="text-4xl font-semibold text-center mb-8 text-primary">
          Manage your tasks
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold py-4 border-b border-gray-300 text-center bg-primary text-white rounded-t-lg">
              To Do
            </h2>
            <div className="p-4">
              {booking.length ? (
                booking.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between border-b border-gray-300 py-2"
                  >
                    <p className="text-lg">{task.taskName}</p>
                    <div className="flex items-center gap-4">
                      <MdDelete
                        onClick={() => handlePendingDelete(task)}
                        className="text-red-700 cursor-pointer"
                      />
                      <FaArrowRight
                        onClick={() => handleToRunning(task)}
                        className="text-blue-700 cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center">No task yet!</h1>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold py-4 border-b border-gray-300 text-center bg-primary text-white rounded-t-lg">
              In Progress
            </h2>
            <div className="p-4">
              {running.length ? (
                running.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between border-b border-gray-300 py-2"
                  >
                    <p className="text-lg">{task.taskName}</p>
                    <div className="flex items-center gap-4">
                      <MdDelete
                        onClick={() => handleRunningDelete(task)}
                        className="text-red-700 cursor-pointer"
                      />
                      <FaArrowRight
                        onClick={() => handleToCompleted(task)}
                        className="text-blue-700 cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center">No task yet!</h1>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border-l-2 border-solid ml-2 mt-20">
        <div className="pt-5 w-11/12 flex justify-center items-center pb-2 mx-auto gap-3 border-b-2">
          <img src={user.photoURL} className="h-10 w-10 rounded-full" alt="" />
          <div>
            <h1 className="text-xl font-semibold">{user.displayName}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="bg-white w-11/12 mx-auto rounded-lg mt-5 pt-5 shadow-md">
          <h2 className="text-2xl font-bold py-4 border-b border-gray-300 text-center text-primary rounded-t-lg">
            Completed Tasks
          </h2>
          <div className="">
            {completed.length ? (
              completed.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between border-b border-gray-300 py-3 px-4"
                >
                  <p className="text-lg">{task.taskName}</p>
                  <div className="flex items-center gap-4">
                    <MdDelete
                      onClick={() => handleCompletedDelete(task)}
                      className="text-red-700 cursor-pointer"
                    />
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center">No task yet!</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

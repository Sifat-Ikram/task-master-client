import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4); // Set page size to 4 tasks per page
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tasks", page, pageSize],
    queryFn: async () => {
      const res = await axiosPublic.get("/task", {
        params: { page, pageSize },
      });
      return res.data;
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  const handleSearch = (e) => {
    setValue(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getFilteredTasks = () => {
    if (!value) {
      return tasks;
    } else {
      return tasks.filter((task) => task.name.includes(value));
    }
  };

  const filteredTasks = getFilteredTasks();

  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / pageSize);

  const startTaskIndex = (page - 1) * pageSize;
  const paginatedTasks = filteredTasks.slice(
    startTaskIndex,
    startTaskIndex + pageSize
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded hover:bg-primary hover:text-white ${
            i === page ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleBook = (task) => {
    if (user) {
      const bookingTask = {
        userName: user.displayName,
        email: user.email,
        taskName: task.name,
        description: task.description
      };

      axiosPublic.post("/bookings", bookingTask).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: "This Task is booked",
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Oops!!! You aren't signed in. ",
        text: "To add this item to cart you have to sign in first",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signIn", { state: location.pathname });
        }
      });
    }
  };

  return (
    <div className="w-5/6 mx-auto mt-28 mb-10 space-y-10">
      <div>
        <h1 className="text-2xl font-medium text-center">Search Task Name</h1>
        <div className="flex items-center justify-center mt-2">
          <input
            value={value}
            onChange={handleSearch}
            type="text"
            placeholder="Search here"
            className="w-full max-w-xl border-black input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 space-y-7">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching data</div>
        ) : (
          paginatedTasks.map((task) => (
            <div key={task._id} data-aos="fade-up">
              <div className="shadow-xl border-2 border-solid">
                <div className="card-body">
                  <h2 className="card-title">Task: {task.name}</h2>
                  <p className="text-lg font-semibold">Added by {task?.addedName}</p>
                  <p>
                    <span className="text-lg font-semibold">Description:</span>{" "}
                    {task.description}
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={() => handleBook(task)}
                    >
                      Add this task to to do list
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="mr-2 px-3 py-1 bg-gray-200 rounded hover:bg-primary hover:text-white"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-primary hover:text-white"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;

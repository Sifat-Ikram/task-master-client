import { useContext, useState } from "react";
import img from "../../../assets/others/authentication.gif";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

 

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const resImage = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (resImage.data.data.display_url) {
      const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (data.password.length < 6) {
        return <p>Your password should not be less than 6 characters</p>;
      } else if (regex.test(data.password)) {
        return (
          <p>You can not use any capital letter or any special characters</p>
        );
      }

      setError("");

      createUser(data.email, data.password)
        .then((res) => {
          updateProfile(res.user, {
            displayName: data.name,
            photoURL: resImage.data.data.display_url,
          })
            .then(() => {
              console.log("Profile updated");
            })
            .catch((err) => {
              console.error(err.message);
            });

          const userInfo = {
            name: data.name,
            email: data.email,
            photoUrl: resImage.data.data.display_url,
          };
          axiosPublic
            .post("/user", userInfo)
            .then((res) => {
              if (res.data.insertedId) {
                console.log(res.data);
                Swal.fire("You signed up successfully!");
                navigate(location?.state ? location.state : "/");
              } else {
                Swal.fire("Your signed up failed!");
              }
            });
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1 ">
            <img src={img} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center gap-5 px-7 pt-10 py-5 w-full max-w-lg shadow-2xl bg-base-100">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign up now!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-4/5">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  name="name"
                  {...register("name")}
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Upload your photo</span>
                </label>
                <input
                  name="image"
                  {...register("image")}
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary mt-2 w-full text-white"
                >
                  Sign up
                </button>
              </div>
              <h1>
                Already have an account?{" "}
                <a className="text-blue-700 mt-2" href="/signIn">
                  Sign in
                </a>{" "}
                here
              </h1>
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

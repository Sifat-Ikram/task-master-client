import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const SignIn = () => {
    const { logIn } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [ success, setSuccess ] = useState('');
    const [ error, setError ] = useState('');


    const onSubmit = (data) => {
        
        logIn(data.email, data.password)
        .then(res => {
            console.log(res.user);
            navigate(location?.state ? location.state : '/');
            setSuccess('');
            
        })
        .catch(err =>{
            console.error(err.message);
            setError(err.message);
        })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='flex-1 '>
                        <img src={"https://i.ibb.co/Qr6M0Mh/6b1b22573f9f3d4bba11a9fa5cb45652.png"} className='h-4/5' alt="" />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-8 py-7 w-full max-w-lg shadow-2xl bg-base-100">
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Sign in here!</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 space-y-5'>
                            <div>
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" {...register("email")} placeholder="email" className="input input-bordered w-full" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' {...register("password")} type="password" placeholder="password" className="w-full input input-bordered" required />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-primary text-white w-full'>Sign in</button>
                            </div>
                            {
                                error && <p>{error}</p>
                            }
                            <h1>Don't have an account yet, <a className='text-blue-700' href='/signUp'>Sign up</a> here</h1>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
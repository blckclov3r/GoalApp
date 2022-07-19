
import { useEffect, useState } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../features/auth/authSlice";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner";
import {reset as goalReset} from '../features/goals/goalSlice'

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user,isLoading,isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    
    if(user){
      navigate('/');
    }
  }, [user,navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email,password} = formData;

  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    if(isSuccess || user){
      navigate('/'); //navigate to dashboard
    }

    dispatch(reset())
}, [user,isError,isSuccess,message,navigate,dispatch]);

  const onChange = (e) =>{
    setFormData(prevState=>({
        ...prevState,
        [e.target.name] : e.target.value
    }))
  }

  const onLoginSubmit = (e) =>{
    e.preventDefault();
    if(email === '' || password === ''){
      return;
    }
    const userData = {
      email,password
    }
    dispatch(goalReset())
    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner />
  }


  return (
    <>
    <section className="heading text-center">
        <h1 className="d-flex align-items-center justify-content-center">
            <FaSignInAlt className="me-2" /> Login
        </h1>
        <p>Login and start setting goals</p>
     </section>

     <section>
        <div className="row">
            <div className="col-12 col-md-6 shadow-sm container p-4">
            <form onSubmit={onLoginSubmit}>
        
            <div className="form-group mb-3">
              <label  className="form-label">Email</label>
              <input name="email" type="text" value={email} onChange={onChange}   className="form-control"  />
            </div>
            <div className="form-group mb-3">
              <label  className="form-label">Password</label>
              <input name="password" type="text" value={password} onChange={onChange}   className="form-control"  />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary" >Login</button>
            </div>
        </form>
            </div>
        </div>
     </section>
    </>
  )
}

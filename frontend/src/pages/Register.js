
import { useEffect, useState } from "react"
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import {reset,register} from '../features/auth/authSlice'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name,email,password,password2} = formData

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user,isLoading,isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

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

  const onRegisterSubmit = (e) =>{
    e.preventDefault();

    if(password !== password2){
      toast.error('Password do not match');
    }else{
      const userData = {
        name,email,password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
    <section className="heading text-center">
        <h1 className="d-flex align-items-center justify-content-center">
            <FaUser className="me-2" /> Register
        </h1>
        <p>Please  create an account</p>
     </section>

     <section>
        <div className="row">
            <div className="col-12 col-md-6 shadow-sm container p-4">
            <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-3">
              <label  className="form-label">Name</label>
              <input name="name" type="text" value={name} onChange={onChange}   className="form-control"  />
            </div>
            <div className="form-group mb-3">
              <label  className="form-label">Email</label>
              <input name="email" type="text" value={email} onChange={onChange}   className="form-control"  />
            </div>
            <div className="form-group mb-3">
              <label  className="form-label">Password</label>
              <input name="password" type="text" value={password} onChange={onChange}   className="form-control"  />
            </div>
            <div className="form-group mb-3">
              <label  className="form-label">Confirm</label>
              <input name="password2" type="text" value={password2} onChange={onChange}   className="form-control"  />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary" >Register</button>
            </div>
        </form>
            </div>
        </div>
     </section>
    </>
  )
}

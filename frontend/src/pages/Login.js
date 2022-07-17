
import { useState } from "react"
import {FaSignInAlt} from 'react-icons/fa'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email,password} = formData

  const onChange = (e) =>{
    setFormData(prevState=>({
        ...prevState,
        [e.target.name] : e.target.value
    }))
  }

  const onLoginSubmit = (e) =>{
    e.preventDefault();
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

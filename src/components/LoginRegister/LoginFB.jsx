import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { autentisering } from "../../firebase/fireConfig";

function LoginFB() {

    const [epost, setEpost] = useState('')
    const [passord, setPassord] = useState('')
    const [error, setError] = useState('')
    const loginFirebase = e => {
        e.preventDefault()
        setError('')
            signInWithEmailAndPassword(autentisering,epost,passord)
            .then((res) => {
                console.log(res.user)
            })
            .catch(err => setError(err.message))
            setEpost('')
            setPassord('')
    }

    return (
        <div className='center'>
          <div className='auth'>
            <h1>Register</h1>
            {error && <div className='auth__error'>{error}</div>}
            <form onSubmit = {loginFirebase} name='login_form'>
              <input 
                type='email' 
                value={epost}
                placeholder="Skriv inn epost adresse"
                required
                onChange={e => setEpost(e.target.value)}/>
    
              <input 
                type='password'
                value={passord} 
                required
                placeholder='Skriv inn passord'
                onChange={e => setPassord(e.target.value)}/>
    
              <button type='submit'>Login</button>
            </form>
            <span>
             Har du ikke bruker? Registrer deg her  
  
            </span>
          </div>
        </div>
      )
    }
    export default LoginFB
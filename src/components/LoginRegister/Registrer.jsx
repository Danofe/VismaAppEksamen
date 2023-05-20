import { autentisering } from "../../firebase/fireConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


function Register() {

    const [epost, setEpost] = useState('')
    const [passord, setPassord] = useState('')
    const [bekreftPassord, setBekreftPassord] = useState('')
    const [error, setError] = useState('')
    const passordValidering = () => {
        let gyldig = true
        if (passord !== '' && bekreftPassord !== '') {
            if (passord !== bekreftPassord) {
            gyldig = false
            setError('Skriv inn like passord!')
            }
        }
        return gyldig
    }
    
    const registrering = e => {
        e.preventDefault()
        setError('')
        if(passordValidering()) {
            createUserWithEmailAndPassword(autentisering,epost,passord)
            .then((res) => {
                console.log(res.user)
            })
            .catch(err => setError(err.message))
        }
        setEpost('')
        setPassord('')
        setBekreftPassord('')
    }

  
    return (
      <div className='center'>
        <div className='auth'>
          <h1>Register</h1>
          {error && <div className='auth__error'>{error}</div>}
          <form onSubmit = {registrering} name='registration_form'>
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
  
              <input 
              type='password'
              value={bekreftPassord} 
              required
              placeholder='Bekreft passord'
              onChange={e => setBekreftPassord(e.target.value)}/>
  
            <button type='submit'>Register</button>
          </form>
          <span>
           Har du en bruker?  

          </span>
        </div>
      </div>
    )
  }
  
  export default Register
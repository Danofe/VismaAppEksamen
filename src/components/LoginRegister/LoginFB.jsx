import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { autentisering } from "../../firebase/fireConfig";
import "./LoginFB.css"

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

                <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Velkommen</h1>
                <a>Logg inn</a>

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


                <a href="#">Glemt passord? </a>
                <a href="#">Har du ikke bruker? Registrer deg her</a>

              <button type='submit'>Logg inn</button>
            </form>
          </div>

            <div className="overC">
                <div className="over">
                    <div className="opanel overHoyre">
                        <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Heisann!</h1>
                        <p style={{ fontFamily: 'Arial, sans-serif' }}>Velkommen til vårt forslag til en kalender integrasjon</p>
                        <img
                            className="gruppe"
                            src="https://cdn.dribbble.com/users/6554494/screenshots/14937796/media/678312aa763e54740bfb2cb7186a12bb.gif"
                            alt="HTML5 Icon"
                        />
                    </div>
                </div>
            </div>
        </div>
      )
    }
    export default LoginFB
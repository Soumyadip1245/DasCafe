import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios'
function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [position, setPosition] = useState("")
    const [loginemail, setLoginemail] = useState("")
    const [loginpassword, setLoginpassword] = useState("")
    const [alertStyle, setAlert] = useState("d-none")
    const [alertMessage, setMessage] = useState("")
    const [alertError, setError] = useState("d-none")
    const [alertSuccess, setSuccess] = useState("d-none")
    const submitregister = async (e) => {
        e.preventDefault()
        var data = {
            "name": name,
            "phone": phone,
            "email": email,
            "password": password,
            "position": position
        }
        let res = await axios.post('http://localhost:8080/auth/register', data)
        if (res.data.success) {
            setAlert("wrapper")
            setError("toastw success")
            setSuccess("fas fa-check-circle")
            setMessage(res.data.message)
            setTimeout(() => {
                setAlert("d-none")

                setError("d-none")
                setSuccess("d-none")
                setSuccess("d-none")
                setMessage("")
            }, 2000)
            console.log(res.data.message)
            setName("")
            setEmail("")
            setPassword("")
            setPhone("")
            setPosition("")
        }
        else {
            setAlert("wrapper")
            setError("toastw error")
            setSuccess("fas fa-times-circle")
            setMessage(res.data.message)
            setTimeout(() => {
                setAlert("d-none")
                setMessage("")
                setSuccess("d-none")

                setError("d-none")
                setSuccess("d-none")
            }, 2000)
            setName("")
            setEmail("")
            setPassword("")
            setPhone("")
            setPosition("")
            console.log(res.data.message)
        }
    }
    const loginbutton = async (e) => {
        e.preventDefault()
        var data = {
            "email": loginemail,
            "password": loginpassword
        }
        let res = await axios.post('http://localhost:8080/auth/login', data)
        if (res.data.success) {
            console.log(res.data.message)
            let res1 = await axios.get('http://localhost:8080/auth/loginAuthorised/' + data.email)
            if (res1.data.logindata.authorised === false) {
                setAlert("wrapper")
                setError("toastw warning")
                setMessage("Account is currently locked")
                setSuccess("fas fa-info-circle")
                setTimeout(() => {
                    setAlert("d-none")
                    setMessage("")
                    setError("d-none")
                    setSuccess("d-none")
                    setSuccess("d-none")
                }, 2000)
                console.log("Account is currently locked")
            }
            else {
                localStorage.setItem("token", res.data.token)
                if (res1.data.logindata.position === "Admin") {
                    setAlert("wrapper")
                    setError("toastw success")
                    setMessage(res.data.message)
                    setSuccess("fas fa-check-circle")
                    setTimeout(() => {
                        setAlert("d-none")
                        setMessage("")
                        setError("d-none")
                        setSuccess("d-none")
                    }, 2000)
                    setTimeout(() => {
                        setAlert("d-none")
                        setMessage("")

                        setError("d-none")
                        setSuccess("d-none")
                        console.log("Admin Panel")
                        navigate('/admin')
                    }, 2500)

                }
                else if (res1.data.logindata.position === "Employee") {
                    setAlert("wrapper")
                    setError("toastw success")
                    setSuccess("fas fa-check-circle")
                    setMessage(res.data.message)
                    setTimeout(() => {
                        setAlert("d-none")
                        setMessage("")

                        setError("d-none")
                        setSuccess("d-none")
                    }, 2000)
                    setTimeout(() => {
                        setAlert("d-none")
                        setMessage("")

                        setError("d-none")
                        setSuccess("d-none")
                        console.log("Employee Panel")
                        navigate('/employee')
                    }, 2500)

                }
                else if (res1.data.logindata.position === "Inventory") {
                    setAlert("wrapper")
                    setError("toastw success")
                    setSuccess("fas fa-check-circle")
                    setMessage(res.data.message)
                    setTimeout(() => {
                        setAlert("d-none")
                        setMessage("")

                        setError("d-none")
                        setSuccess("d-none")
                    }, 2000)
                    setTimeout(() => {
                        setAlert("d-none")
                        setMessage("")

                        setError("d-none")
                        setSuccess("d-none")
                        console.log("Inventory Panel")
                        navigate('/inventory')
                    }, 2500)

                }
                else {
                    console.log("No Position Allocated Yet")
                }
            }
            setLoginemail("")
            setLoginpassword("")

        }
        else {
            setAlert("wrapper")
            setError("toastw error")
            setSuccess("fas fa-times-circle")
            setMessage(res.data.message)
            setTimeout(() => {
                setAlert("d-none")
                setMessage("")

                setError("d-none")
                setSuccess("d-none")
            }, 2000)
            setLoginemail("")
            setLoginpassword("")
            console.log(res.data.message)
        }
    }
    return (
        <>
            <div class={alertError}>
                <div class="container-1">
                    <i class={alertSuccess}></i>
                </div>
                <div class="container-2">
                    <p>Message</p>
                    <p>{alertMessage}</p>
                </div>
            </div>
            <section>
                {/* Pills navs */}
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a
                            className="nav-link active"
                            id="tab-login"
                            data-mdb-toggle="pill"
                            href="#pills-login"
                            role="tab"
                            aria-controls="pills-login"
                            aria-selected="true"
                        >
                            Login
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            className="nav-link"
                            id="tab-register"
                            data-mdb-toggle="pill"
                            href="#pills-register"
                            role="tab"
                            aria-controls="pills-register"
                            aria-selected="false"
                        >
                            Register
                        </a>
                    </li>
                </ul>
                {/* Pills navs */}
                {/* Pills content */}
                <div className="tab-content">
                    <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                    >
                        <form onSubmit={loginbutton}>
                            <div className="text-center mb-3">
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-facebook-f" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-google" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-twitter" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-github" />
                                </button>
                            </div>
                            <p className="text-center">or:</p>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input type="email" id="loginName" className="form-control" value={loginemail} onChange={(e) => { setLoginemail(e.target.value) }} />
                                <label className="form-label" htmlFor="loginName">
                                    Email
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading" Style={{ width: 9 }} />
                                    <div className="form-notch-middle" Style={{ width: "114.4px" }} />
                                    <div className="form-notch-trailing" />
                                </div>
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <input type="password" id="loginPassword" className="form-control" value={loginpassword} onChange={(e) => { setLoginpassword(e.target.value) }} />
                                <label className="form-label" htmlFor="loginPassword">
                                    Password
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading" Style={{ width: 9 }} />
                                    <div className="form-notch-middle" Style={{ width: "114.4px" }} />
                                    <div className="form-notch-trailing" />
                                </div>
                            </div>
                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                Sign in
                            </button>
                            {/* Register buttons */}
                        </form>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="pills-register"
                        role="tabpanel"
                        aria-labelledby="tab-register"
                    >
                        <form onSubmit={submitregister}>
                            <div className="text-center mb-3">
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-facebook-f" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-google" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-twitter" />
                                </button>
                                <button type="button" className="btn btn-secondary btn-floating mx-1">
                                    <i className="fab fa-github" />
                                </button>
                            </div>
                            <p className="text-center">or:</p>
                            {/* Name input */}
                            <div className="form-outline mb-4">
                                <input type="text" id="registerName" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                <label className="form-label" htmlFor="registerName">
                                    Name
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading" Style={{ width: 9 }} />
                                    <div className="form-notch-middle" Style={{ width: "114.4px" }} />
                                    <div className="form-notch-trailing" />
                                </div>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" id="registerName" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <label className="form-label" htmlFor="registerName">
                                    Phone
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading" Style={{ width: 9 }} />
                                    <div className="form-notch-middle" Style={{ width: "114.4px" }} />
                                    <div className="form-notch-trailing" />
                                </div>
                            </div>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input type="email" id="registerEmail" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label className="form-label" htmlFor="registerEmail">
                                    Email
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading" Style={{ width: 9 }} />
                                    <div className="form-notch-middle" Style={{ width: "114.4px" }} />
                                    <div className="form-notch-trailing" />
                                </div>
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="password"
                                    id="registerPassword"
                                    className="form-control"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="form-label" htmlFor="registerPassword">
                                    Password
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading" Style={{ width: 9 }} />
                                    <div className="form-notch-middle" Style={{ width: "114.4px" }} />
                                    <div className="form-notch-trailing" />
                                </div>
                            </div>
                            <div className="form-outline mb-4">
                                <div className="btn-group">
                                    <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" value="Admin" onChange={(e) => setPosition(e.target.value)} />
                                    <label className="btn btn-secondary" htmlFor="option1">Admin</label>

                                    <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" value="Inventory" onChange={(e) => setPosition(e.target.value)} />
                                    <label className="btn btn-secondary" htmlFor="option2">Inventory</label>

                                    <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" value="Employee" onChange={(e) => setPosition(e.target.value)} />
                                    <label className="btn btn-secondary" htmlFor="option3">Employee</label>
                                </div>
                            </div>
                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary btn-block mb-3">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
                {/* Pills content */}
            </section>

        </>
    )
}

export default Login
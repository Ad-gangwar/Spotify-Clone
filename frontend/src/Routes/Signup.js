import React, { useState } from 'react';
import Input from '../components/shared/Input';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthPostReq } from '../components/utils/serverHelper';
import { useCookies } from "react-cookie";
import toast from 'react-hot-toast';

export default function Signup() {
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [confirmEmail, setconfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email !== confirmEmail) {
            toast.error("Email and confirm email does not match. Please check again");
            return;
        }
        const data = { email, username, password, firstName, lastName };
        const response = await makeUnauthPostReq('/auth/register', data);
        if (response && !response.err) {
            toast.success("Congratulations! You are successfully registered.");
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, { path: "/", expires: date });
            navigate("/login");
        }
    }
    return (
        <div className='h-100 w-100 d-flex flex-column font-poppins'>
            <div className='w-100 d-flex justify-content-center my-5'>
                <Icon icon="logos:spotify" width={165} />
            </div>

            <div className='fw-bold text-center mb-3 fs-4'>Sign up for free to start listening.</div>
            <div className='w-100 d-flex'>
                <main className="form-signin m-auto">
                    <form className='mb-3' onSubmit={handleSubmit}>

                        <Input label="What's your email?" placeholder="Enter your email." type="email" value={email} setValue={setEmail} />
                        <Input label="Confirm your email" placeholder="Enter your email again." type="email" value={confirmEmail} setValue={setconfirmEmail} />
                        <Input label="Username" placeholder="Enter your username." type="text" value={username} setValue={setUsername} />
                        <Input label="Create a password" placeholder="Password." type="password" value={password} setValue={setPassword} />
                        <div className='fw-bold mx-1 m-2'>What should we call you?</div>
                        <div className='d-flex'>
                            <Input label="First Name" placeholder="Enter your first name." type="text" value={firstName} setValue={setfirstName} />
                            <Input label="Last Name" placeholder="Enter your last name." type="text" value={lastName} setValue={setlastName} />
                        </div>
                        <div className='d-flex justify-content-center mt-5 mb-3'>
                            <button type="submit" className="btn rounded-pill py-3 px-5 text-dark fw-bold border-0" style={{ backgroundColor: "#00cd10" }}>Sign Up</button>
                        </div>
                    </form>
                    <div className='d-flex justify-content-center' style={{ fontWeight: "600" }}>
                        <div className='mx-2'>Have an account?</div>
                        <Link to="/login" className='text-success'>Log In</Link>
                    </div>

                </main>
            </div>
        </div>
    )
}



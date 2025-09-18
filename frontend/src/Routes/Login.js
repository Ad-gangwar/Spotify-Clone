import React, { useState } from 'react';
import Input from '../components/shared/Input';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { makeUnauthPostReq } from '../components/utils/serverHelper';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

export default function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(["token", "userEmail"]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password };
        try {
            const response = await makeUnauthPostReq('/auth/login', data);
            if (response && !response.err) {
                // Assuming the token is directly present in the response object
                const token = response.token;
                // console.log(token);
                //setting time for the expiry of the token
                const date = new Date();
                date.setDate(date.getDate() + 1);
                setCookie("token", token, { path: "/", expires: date });
                setCookie("userEmail", email, { path: "/"});
                toast.success("Logged in Successfully!");
                navigate("/");
            } else {
                toast.error("Enter valid Credentials!");
            }
        } catch (error) {
            console.error("Error:", error);

        }
    };


    return (
        <div className='h-100 w-100 d-flex flex-column font-poppins'>
            <div className='w-100 d-flex justify-content-center border-bottom p-4 border-3'>
                <Icon icon="logos:spotify" width={165} />
            </div>

            <div className='fw-bold text-center mt-5 mb-4'>To continue, log in to Spotify.</div>
            <div className='w-100 d-flex'>
                <main className="form-signin m-auto">
                    <form className='mb-3' onSubmit={handleSubmit}>
                        <Input label="Email address or username" placeholder="Email address or username" type="email" value={email} setValue={setEmail}
                        />
                        <Input label="Password" placeholder="Password" type="password" value={password} setValue={setPassword} />

                        <div className='d-flex justify-content-between my-4'>
                            <div className="form-group form-check fw-bold">
                                <input type="checkbox" className="form-check-input" id="Check1" />
                                <label className="form-check-label" htmlFor="Check1">Remember me</label>
                            </div>
                            <button type="submit" className="btn rounded-pill w-25 text-dark py-2 fw-bold border-0" style={{ backgroundColor: "#00cd10" }}>LOG IN</button>
                        </div>
                    </form>
                    <div className='border-bottom border-3'></div>
                    <div className='fw-bold text-center my-4' style={{ fontSize: "1.2rem" }}>Don't have an account?</div>
                    <button type="submit" className="btn rounded-pill w-100 text-secondary fw-bold border-1 border-secondary p-3" onClick={() => {
                        navigate("/signup");
                    }}>SIGN UP FOR SPOTIFY</button>
                </main>
            </div>
        </div>
    )
}



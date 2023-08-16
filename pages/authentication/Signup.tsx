import React, {useState} from 'react'
import Wrapper from "~utils/Wrapper";
import {poolData} from '~/utils/AwsClient'
import {useNavigate} from "react-router-dom";
import VerifyOTP from "~pages/authentication/VerifyOTP";
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js'

export const Signup = () => {
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [authStep, setAuthStep] = useState("")

    const createAnAccount = async (e: any) => {
        e.preventDefault();
        const userAttributes = []

        try {
            setLoading(true)

            const userPool = new CognitoUserPool(poolData);
            const emailAttribute = new CognitoUserAttribute({
                Name: 'email',
                Value: email
            });
            userAttributes.push(emailAttribute)

            userPool.signUp(username, password, userAttributes, null, (error, result) => {
                setLoading(false)

                if (error) {
                    console.log(error)
                    return;
                }

                const cognitoUser = result?.user;
                console.log("USER DATA:", cognitoUser)

                setAuthStep("VERIFY_OTP")
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Wrapper>
            {
                authStep === "VERIFY_OTP" ? (
                    <VerifyOTP {...{email, username}} />
                ) : (
                    <div>
                        <div>
                            <h1 className={"text-center text-2xl mb-2"}> Create Account </h1>
                            <p className={"text-center mb-2 text-sm"}> Create an account to use extradite anywhere. </p>
                        </div>

                        <form onSubmit={createAnAccount} className={"flex mt-4 flex-col"}>
                            <div className={"mb-4"}>
                                <label className={"mb-2 font-semibold"} id={"email"}> Email </label>
                                <input
                                    type={"email"}
                                    name={"email"}
                                    value={email}
                                    className='mt-2 h-12 w-full border p-4'
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder={"Your Email Address"}
                                />
                            </div>

                            <div className={"mb-4"}>
                                <label className={"mb-2 font-semibold"} id={"username"}> Username </label>
                                <input
                                    type={"text"}
                                    name={"username"}
                                    value={username}
                                    className='mt-2 h-12 w-full border p-4'
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder={"Your Username"}
                                />
                            </div>

                            <div>
                                <label className={"mb-2 font-semibold"} id={"email"}> Password </label>
                                <input
                                    type={"password"}
                                    name={"password"}
                                    value={password}
                                    className='mt-2 h-12 w-full border p-4'
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder={"Your Password"}
                                />
                            </div>

                            <button
                                disabled={!email}
                                onClick={createAnAccount}
                                className='mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
                            >
                                {loading ? "Creating" : "Create"} An Account
                            </button>
                        </form>

                        <div className={"mt-4"} >
                            <p className={"text-center mb-2 text-sm"}>
                                <span className={"text-gray-400"} > Have an account? </span>
                                <span
                                    onClick={() => navigate("/login")}
                                    className={"ml-1 cursor-pointer font-semibold"}>
                                    Login
                                </span>
                            </p>
                        </div>
                    </div>
                )
            }
        </Wrapper>
    )
}
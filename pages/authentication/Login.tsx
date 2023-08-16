import React, {useState} from 'react'
import Wrapper from "~utils/Wrapper";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js'
import {poolData} from "~utils/AwsClient";
import {Link, useNavigate} from "react-router-dom";
import SnackbarNotification from "~components/SnackbarNotification";

export const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleLoginFailure = (error: string) => {
        console.log("ERROR MESSAGE:", error)
        console.log("DETAILS:", username, password)
        setErrorMessage(error)

        setTimeout(() => {
            setErrorMessage("")
            setPassword("")
            setUsername("")
        }, 4000)
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()

        const userPool = new CognitoUserPool(poolData)

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        })

        const userData = {
            Username: username,
            Pool: userPool
        }

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log("LOGIN", result)
            },
            onFailure: (error) => handleLoginFailure(error.message)
        })
    }

    return (
        <Wrapper>
            <SnackbarNotification
                message={"Incorrect Username Or Password Details"}
                isVisible={errorMessage.length > 1}
                type={"failure"}
            />

            <div className={"h-full"}>
                <div>
                    <h1 className={"text-center text-2xl mb-2"}> Login </h1>
                    <p className={"text-center mb-2 text-sm"}> Login to your Extradite account. </p>
                </div>

                <form onSubmit={handleLogin} className={"flex mt-4 flex-col"}>
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
                        <label className={"mb-2 font-semibold"} id={"username"}> Password </label>
                        <input
                            type={"text"}
                            name={"password"}
                            value={password}
                            className='mt-2 h-12 w-full border p-4'
                            onChange={e => setPassword(e.target.value)}
                            placeholder={"Your Password"}
                        />
                    </div>


                    <button
                        disabled={!username}
                        onClick={handleLogin}
                        className='mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
                    >
                        Login
                    </button>
                </form>

                <div className={"mt-2 text-sm"} >

                    <Link to={"/forgot-password"}>
                        <p> Forgot Password? </p>
                    </Link>
                </div>

                <div className={"mt-4"}>
                    <p className={"text-center mb-2 text-sm"}>
                        <span className={"text-gray-400"}> Don't have an account? </span>
                        <span
                            onClick={() => navigate("/signup")}
                            className={"ml-1 cursor-pointer font-semibold"}>
                                    Create An Account
                                </span>
                    </p>
                </div>
            </div>
        </Wrapper>
    )
}
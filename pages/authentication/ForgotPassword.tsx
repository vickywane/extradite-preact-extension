import React, {useState} from 'react'
import Wrapper from "~utils/Wrapper";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js'
import {poolData} from "~utils/AwsClient";
import {useNavigate} from "react-router-dom";
import SnackbarNotification from "~components/SnackbarNotification";

const CONFIRM_OTP = "CONFIRM_OTP"

export const ForgotPassword = () => {
    const navigate = useNavigate()
    const [authStage, setAuthStage] = useState("REQUEST_OTP")
    const [resetOtp, setResetOtp] = useState('')

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [loading, setLoading] = useState(false)

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

    const initiatePasswordReset = async (e: any) => {
        setLoading(true)

        e.preventDefault()

        const userPool = new CognitoUserPool(poolData)

        const userData = {
            Username: username,
            Pool: userPool
        }

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: (data) => {
                setAuthStage(CONFIRM_OTP)
                setLoading(false)
            },
            onFailure: (data) => {
                console.log("FAILURE DATA", data)
                setLoading(false)
            },
        })
    }

    const confirmPassword = (e) => {
        e.preventDefault()
        setLoading(true)

        const userPool = new CognitoUserPool(poolData)

        const userData = {
            Username: username,
            Pool: userPool
        }

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(resetOtp, password, {
            onSuccess: () => {
                setLoading(false)
                navigate("/login")
            },
            onFailure: (error) => {
                console.log("CONFIRM PASSWORD", error)
                setLoading(false)
            },
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
                    <h1 className={"text-center text-2xl mb-2"}> Forgot Password? </h1>
                    <p className={"text-center mb-2 text-sm"}> Reset the password to your Extradite account. </p>
                </div>

                {
                    authStage === "CONFIRM_OTP" ? (
                        <div>
                            <form onSubmit={confirmPassword} className={"flex mt-4 flex-col"}>
                                <div className={"mb-4"}>
                                    <label className={"mb-2 font-semibold"} id={"otp"}> OTP Code </label>
                                    <input
                                        type={"text"}
                                        name={"otp"}
                                        value={resetOtp}
                                        className='mt-2 h-12 w-full border p-4'
                                        onChange={e => setResetOtp(e.target.value)}
                                        placeholder={"Password Reset OTP"}
                                    />
                                </div>

                                <div className={"mb-4"}>
                                    <label className={"mb-2 font-semibold"} id={"new-password"}> New Password </label>
                                    <input
                                        type={"text"}
                                        name={"new-password"}
                                        value={password}
                                        className='mt-2 h-12 w-full border p-4'
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder={"New Password"}
                                    />
                                </div>

                                <button
                                    disabled={!resetOtp}
                                    onClick={confirmPassword}
                                    className='mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
                                >
                                    {loading ? "Confirming" : "Confirm"} OTP Code
                                </button>
                            </form>
                        </div>
                    ) : (
                        <form onSubmit={initiatePasswordReset} className={"flex mt-4 flex-col"}>
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

                            <button
                                disabled={!username}
                                onClick={initiatePasswordReset}
                                className='mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
                            >
                                {loading ? "Resetting" : "Reset"} Password
                            </button>
                        </form>
                    )
                }


                <div className={"mt-4"}>
                    <p className={"text-center mb-2 text-sm"}>
                        <span className={"text-gray-400"}> Creating A New Account? </span>
                        <span
                            onClick={() => navigate("/signup")}
                            className={"ml-1 cursor-pointer font-semibold"}>
                                    Create Account
                                </span>
                    </p>
                </div>
            </div>
        </Wrapper>
    )
}
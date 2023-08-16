import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js'

import {poolData} from "~utils/AwsClient";

interface VerifyOTPProps {
    email : string
    username : string
}

// vickywane Iamnwani01!

const VerifyOTP = ({ email, username } : VerifyOTPProps) => {
    const navigate = useNavigate()

    const [otpCode, setOtpCode] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleOtpVerification = async (e : any) => {
        e.preventDefault()

        try {
            const userPool = new CognitoUserPool(poolData);

            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userPool,
            });

            cognitoUser.confirmRegistration(otpCode, true, (err, result) => {
                if (err) {
                    console.log(err.message || JSON.stringify(err));
                    return;
                }

                if (result === "SUCCESS") {
                    navigate("/")
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <h1 className={"text-center text-2xl mb-2"}> Verify OTP Code </h1>
                <p className={"text-center mb-2 text-sm"}> Enter OTP code sent to <span
                    className={"font-semibold"}> {email} </span>.</p>
                <p className={"text-center mb-2 text-sm"}>
                    <span className={"text-gray-400"}> Didn't receive OTP code? </span> <span
                    className={"cursor-pointer"}> Resend Code </span>
                </p>
            </div>

            <form onSubmit={handleOtpVerification} className={"flex mt-4 flex-col"}>
                <div className={"mb-4"}>
                    <label className={"mb-2 font-semibold"} id={"email"}> OTP Code </label>
                    <input
                        required
                        name={"otp"}
                        value={otpCode}
                        className='mt-2 h-12 w-full border p-4'
                        onChange={e => setOtpCode(e.target.value)}
                        placeholder={"OTP Code"}
                    />
                </div>

                <button
                    onClick={handleOtpVerification}
                    className='mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
                >
                    Verify OTP Code
                </button>
            </form>
        </div>

    )
}

export default VerifyOTP
const COGNITO_CLIENT_ID = process.env.PLASMO_PUBLIC_COGNITO_CLIENT_ID
const COGNITO_POOL_ID = process.env.PLASMO_PUBLIC_COGNITO_POOL_ID

export const poolData = {
    UserPoolId: COGNITO_POOL_ID,
    ClientId: COGNITO_CLIENT_ID
}
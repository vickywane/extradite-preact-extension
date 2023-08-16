interface ApiClientProps {
    endpoint?: string;
    method?: 'GET' | 'POST' | 'DELETE' | 'UPDATE';
    body?: any;
}

const BASE_URL = process.env.PLASMO_PUBLIC_LAMBDA_FUNCTION_ENDPOINT
if (!BASE_URL) throw new Error("LAMBDA_FUNCTION_ENDPOINT value is missing!")

export const ApiClient = async ({
                                    endpoint = '/extract',
                                    method = 'GET',
                                    body = null,
                                }: ApiClientProps) => {
    const req = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        body,
    });

    return await req.json();
};

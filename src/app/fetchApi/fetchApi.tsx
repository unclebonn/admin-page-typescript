import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


interface Detail {
    url: string,
    method: string,
    data?: object
}


const fetchApi = async (params: Detail): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        url: params.url,
        method: params.method,
        data: params.data
    }
    try {
        const response: AxiosResponse = await axios(config);
        return response
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`)
    }
}



export default fetchApi
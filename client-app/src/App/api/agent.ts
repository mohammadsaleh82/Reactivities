import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity, ActivityFormValues } from '../Models/Activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../store/store';
import { User, UserFormValues } from '../Models/user';
axios.defaults.baseURL = 'http://localhost:5000/api';
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
axios.interceptors.request.use(config=>{
    const token=store.commonStore.token;
    if (token && config.headers) config.headers.Authorization=`Bearer ${token}`
    return config;
})

// axios.interceptors.response.use(async response => {
//     try {
//         await sleep(1000);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return await Promise.reject(error)
//     }
// })

axios.interceptors.response.use(async response => {
    await sleep(1000)
    return response;
}, (error: AxiosError) => {
    const { status, data, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            console.log(data.errors);
            
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found')
            }
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {

                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } else {

                toast.error("Bad Request")
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break
        case 404:
            toast.error('not found')
            break;
        case 500:
            store.commonStore.setServerError(data)
            router.navigate('/server-error')
            break;
    }

    return Promise.reject(error);
})
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}
const Activities = {
    list: () => requests.get<Activity[]>(`/activity`),
    details: (id: string) => requests.get<Activity>(`/activity/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>(`/activity`, activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activity/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activity/${id}`),
    attend:(id:string)=> requests.post<void>(`/activity/${id}/attend`,{})
}
const Account={
    current:()=>requests.get<User>('/account'),
    login:(user:UserFormValues)=>requests.post<User>('/account',user),
    register:(user:UserFormValues)=>requests.post<User>('/account/register',user)
}
const agent = {
    Account,
    Activities
}

export default agent;
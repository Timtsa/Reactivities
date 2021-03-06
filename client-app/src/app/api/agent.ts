import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';


axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;
const sleep =(ms:number)=>(response: AxiosResponse)=>
new Promise<AxiosResponse>(resolve=> setTimeout(()=>resolve(response),ms));


const request = {
    get: (url: string) => axios.get(url).then(sleep(500)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(500)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(500)).then(responseBody),
    del: (url: string)=>axios.delete(url).then(sleep(500)).then(responseBody)
}

const Activities={
    list: (): Promise<IActivity[]>=>request.get('/activities'),
    details: (id:string)=>request.get(`/activities/${id}`),
    create: (activitiy:IActivity) =>request.post('/activities',activitiy),
    update: (activitiy:IActivity) => request.put(`/activities/${activitiy.id}`,activitiy),
    delete: (id:string) =>request.del(`/activities/${id}`)
}

export default{
Activities
}
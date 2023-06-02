import axios from "axios";
import {qualificationsSlice} from "../../store/company/qualifications/qualificationsSlice";

// let baseApi = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api/',
// })

let baseApi2 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export let userAPI = {
    login(data) {
        return baseApi2.post(`login/`, data, {
            headers: {
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    loginJWT(data) {
        return baseApi2.post(`token/`, data).then(res => res.data);
    },

    refreshJWT(data) {
        return baseApi2.post(`token/refresh/`, data).then(res => res.data);
    },

    registerCompany(data) {
        return baseApi2.post(`company/singup/`, data).then(res => res.data);
    },

    getMe(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`profile/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            }
        }).then(res => res.data);
    },

    changePassword(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`change_password/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    editMe(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`profile/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    // logout(token) {
    //     const userToken = localStorage.getItem('access_token')
    //     return baseApi2.post(`logout/`, {
    //         headers: {
    //             Authorization: "Token " + token || userToken
    //         }
    //     }).then(res => res.data);
    // },
}

export let companyAPI = {
    register(data){
        console.log(data)
        return baseApi2.post(`company/singup/`, data).then(res => res.data);
    },
    getAutoAppointment(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/auto-appointment/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                is_save_mode: true
            }
        }).then(res => res.data);
    },
    applyAutoAppointment(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/auto-appointment/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                is_save_mode: false
            }
        }).then(res => res.data);
    },
    getTasks(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/task/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                page_size: 1000
            }
        }).then(res => res.data);
    },
    getVoting(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/voting/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },

    createVoting(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/voting/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editVoting(voteId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`company/voting/${voteId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteVoting(voteId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/voting/${voteId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getQualifications(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/qualification/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },

    createQualification(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/qualification/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editQualification(qualificationId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`company/qualification/${qualificationId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteQualification(qualificationId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/qualification/${qualificationId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    getWorkers(token, search) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`company/worker/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
            params: {
                search: search || ""
            }
        }).then(res => res.data);
    },

    createWorker(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`company/worker/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
                "Accept-Language": "uk-ua"
            }
        }).then(res => res.data);
    },

    editWorker(workerId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.patch(`company/worker/${workerId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },

    deleteWorker(workerId) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.delete(`company/worker/${workerId}/`,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },
}

export let workerAPI = {
    getVoting(token) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.get(`worker/voting/`, {
            headers: {
                Authorization: "Bearer " + token || userToken
            },
        }).then(res => res.data);
    },
    createVote(data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.post(`worker/vote/`, data,{
            headers: {
                Authorization: "Bearer " + userToken,
            }
        }).then(res => res.data);
    },
    editVote(voteId, data) {
        const userToken = localStorage.getItem('access_token')
        return baseApi2.put(`worker/vote/${voteId}/`, data,{
            headers: {
                Authorization: "Bearer " + userToken
            }
        }).then(res => res.data);
    },
}
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';

const instance = axios.create({
    baseURL: 'http://toutiao.itheima.net'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config);
    const token = store.getters.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, async function (error) {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
        if (store.getters.token) {
            const { refresh_token } = store.state.user
            try {
                const { data } = await axios({
                    method: 'put',
                    url: 'http://toutiao.itheima.net/v1_0/authorizations',
                    headers: {
                        Authorization: `Bearer ${refresh_token}`
                    }
                })
                store.commit('getUserInfo', {
                    token: data.data.token,
                    refresh_token,
                })
                return instance(error.config)
            } catch (error) {
                Toast.fail('登录失效，请重新登录')
                router.push('/login')
                console.log(error);
            }
        } else {
            Toast.fail('登录失效，请重新登录')
            router.push('/login')
            return Promise.reject(error);
        }
    }
    else {
        return Promise.reject(error);
    }

});

export default instance
//axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'

// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    //1.从pinia中获取token
    const userStore = useUserStore()
    //2.将token添加到请求头中
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    //统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    //401token失效处理
    //1.清除本地用户数据
    //2.跳转到登录页
    if (e.response.status === 401) {
        const userStore = useUserStore()
        router.push('/login')
    }
    return Promise.reject(e)
})


export default httpInstance
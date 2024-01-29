//createRouter：创建router示例对象
//createWebHistory：创建history路由模式

import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import home from '@/views/home/index.vue'
import category from '@/views/category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component的对应关系
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '',
          component: home,
        },
        {
          path: 'category/:id',
          component: category,
        },
      ]
    },
    {
      path: '/login',
      component: login,
    },
  ]
})

export default router

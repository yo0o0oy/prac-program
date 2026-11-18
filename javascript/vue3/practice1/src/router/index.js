import { createRouter, createWebHistory } from 'vue-router'
import CounterView from '../views/CounterView.vue'
import TaskView from '../views/TaskView.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/counter',
         name: 'counter',
         component: CounterView
      },
      {
         path: '/task',
         name: 'task',
         component: TaskView
      }
   ]
})

export default router
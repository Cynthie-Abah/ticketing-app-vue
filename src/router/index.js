import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import Signin from '@/views/auth/Signin.vue'
import Signup from '@/views/auth/Signup.vue'
import Home from '@/views/dashboard/Home.vue'
import TicketsPage from '@/views/dashboard/TicketsPage.vue'
import { useAuthStore } from '@/utils/useAuth'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'

const routes = [
  { path: '/', name: 'Landing Page', component: LandingPage },
  { path: '/signin', name: 'Sign in', component: Signin },
  { path: '/signup', name: 'Sign up', component: Signup },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', 
        component: Home,
      },
      {
        path: 'tickets',
        component: TicketsPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin') // redirect to login if not authenticated
  } else {
    next()
  }
})

export default router

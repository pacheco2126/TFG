import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'

//Here I declare the navigation cards or login page, register, user.
// I will declare a meta field
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about_us',
      name: 'about_us',
      component: () => import('../views/AboutUsView.vue'),
    },
    {
      path: '/sponsors',
      name: 'sponsors',
      component: () => import('../views/Sponsors.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta:{requireGuest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta:{requireGuest: true},

    },
    // here is meta:{requireAuth: true}, because requireGuest should only
    // allow guest users to enter this routes. Auth the authenticated.

    {
      path: '/user',
      name: 'user',
      component: () => import('../views/auth/UserView.vue'),
      meta:{requireAuth: true}

    },
    
    {
      path: '/items',
      name: 'items',
      component: () => import('../views/ItemView.vue'),
      meta:{requireAuth: true}

    },
    {
      path: '/register_item',
      name: 'register_item',
      component: () => import('../views/auth/RegisterItemView.vue'),
      meta:{requireAuth: true}

    },

    {
      path: '/edit_item/:id',
      name: 'edit_item',
      component: () => import('../views/auth/EditItemView.vue'),
      meta:{requireAuth: true}
    }

  ]
})

// 1st we check if the route requires auth. If yes then redirect login page
// if guest to home
  router.beforeEach((to, from)=>{

    const store = useAuthStore()

    if(to.meta.requireAuth && !store.isAuthenticated ){
      //query: {redirect: to.fullPath} it will save the prev URL and if login come back to the route later
      return {name: 'login', query: {redirect: to.fullPath}} 
    } else if(to.meta.requireGuest && store.isAuthenticated){
      return {name: 'home'}
    }

  })

export default router

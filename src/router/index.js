import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Dynamic from '../views/Dynamic.vue'
import Acgn from '../views/Acgn.vue'
import Album from '../views/Album.vue'
import Repository from '../views/Repository.vue'
import Inspire from '../views/Inspire.vue'
import Todo from '../views/Todo.vue'
import About from '../views/About.vue'
import Admin from '../views/admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Blog',
    component: Blog
  },
  {
    path: '/Blog/:id',
    component: () => import('../views/Blog/article.vue')
  },
  {
    path: '/Dynamic',
    component: Dynamic
  },
  {
    path: '/Acgn',
    component: Acgn
  },
  {
    path: '/Album',
    component: Album
  },
  {
    path: '/Repository',
    component: Repository
  },
  {
    path: '/Repository/:id',
    component: () => import('../views/Repository/article.vue')
  },
  {
    path: '/Inspire',
    component: Inspire
  },
  {
    path: '/Todo',
    component: Todo
  },
  {
    path: '/About',
    component: About
  },
  {
    path: '/Admin',
    component: Admin,
    children: [
      {
        path: 'view',
        component: () => import('../views/admin/view.vue')
      },
      {
        path: 'writing',
        component: () => import('../views/admin/writing.vue')
      },
      {
        path: 'blog',
        component: () => import('../views/admin/blog.vue')
      },
      {
        path: 'dynamic',
        component: () => import('../views/admin/dynamic.vue')
      },
      {
        path: 'acgn',
        component: () => import('../views/admin/acgn.vue')
      },
      {
        path: 'album',
        component: () => import('../views/admin/album.vue')
      },
      {
        path: 'repository',
        component: () => import('../views/admin/repository.vue')
      },
      {
        path: 'updateRep',
        component: () => import('../views/admin/updateRep.vue')
      },
      {
        path: 'friend',
        component: () => import('../views/admin/friend.vue')
      },
      {
        path: 'shortLink',
        component: () => import('../views/admin/shortLink.vue')
      },
      {
        path: 'log',
        component: () => import('../views/admin/log.vue')
      },
      {
        path: '',
        redirect: 'view'
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router

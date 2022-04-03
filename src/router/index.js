import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Dynamic from '../views/Dynamic.vue'
import Acgn from '../views/Acgn.vue'
import Album from '../views/Album.vue'
import Repository from '../views/Repository.vue'
import Inspire from '../views/Inspire.vue'
import Todo from '../views/Todo.vue'
import About from '../views/About.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')

const Post = () => import(/* webpackChunkName: "post" */ './views/Post.vue')

const ErrNotFound = () => import(/* webpackChunkName: "post" */ './views/ErrNotFound.vue')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    alias: '/home',
    name: 'root',
    component: Home
  }, {
    path: '/home/:page_num',
    name: 'home',
    component: Home,
    props: true,
  }, {
    path: '/topic/:topic_id',
    redirect: '/topic/:topic_id/1'
  }, {
    path: '/topic/:topic_id/:page_num',
    name: 'topic',
    component: Home,
    props: true,
  }, {
    path: '/tag/:tag_id',
    redirect: '/tag/:tag_id/1'
  }, {
    path: '/tag/:tag_id/:page_num',
    name: 'tag',
    component: Home,
    props: true,
  }, {
    path: '/about',
    name: 'about',
    component: About
  }, {
    path: '/post/:articleID',
    name: 'post',
    component: Post,
    props: true
  }, {
    path: '*',
    component: ErrNotFound,
  }]
})

import Vue from 'vue'
import Router from 'vue-router'
import ProfileList from '@/modules/profile/components/ProfileList'
import ProfileMyList from '@/modules/profile/components/ProfileMyList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ProfileList
    },
    {
      path: '/profile-list',
      name: 'ProfileList',
      component: ProfileList
    },
    {
      path: '/profile-my-list',
      name: 'ProfileMyList',
      component: ProfileMyList
    }
  ]
})

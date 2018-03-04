import Vue from 'vue'
import Router from 'vue-router'

import ProfileComponents from '@/modules/profile/components'

Vue.use(Router)

// Left nav tree
const branches = {
  Profile: {
    key: 'Profile',
    icon: 'people',
    title: 'Profiles',
    nodes: {
      ProfileList: { branchKey: 'Profile', title: 'List', route: { path: '/profile-list', name: 'ProfileList' } },
      ProfileCreate: { branchKey: 'Profile', title: 'Create', route: { path: '/profile-create', name: 'ProfileCreate' } }
    }
  },
  MyList: {
    key: 'MyList',
    icon: 'list',
    title: 'My List',
    nodes: {
      ProfileMyList: { branchKey: 'MyList', title: 'Profiles', route: { path: '/profile-my-list', name: 'ProfileMyList' } }
    }
  }
}

const routes = [
  {
    component: ProfileComponents.ProfileList,
    path: '/',
    name: 'Home',
    meta: {
      leftNode: branches.Profile.nodes.ProfileList
    }
  },
  {
    component: ProfileComponents.ProfileCreate,
    path: branches.Profile.nodes.ProfileCreate.route.path,
    name: branches.Profile.nodes.ProfileCreate.route.name,
    meta: {
      leftNode: branches.Profile.nodes.ProfileCreate
    }
  },
  {
    component: ProfileComponents.ProfileList,
    path: branches.Profile.nodes.ProfileList.route.path,
    name: branches.Profile.nodes.ProfileList.route.name,
    meta: {
      leftNode: branches.Profile.nodes.ProfileList
    }
  },
  {
    component: ProfileComponents.ProfileMyList,
    path: branches.MyList.nodes.ProfileMyList.route.path,
    name: branches.MyList.nodes.ProfileMyList.route.name,
    meta: {
      leftNode: branches.MyList.nodes.ProfileMyList
    }
  }
]

const router = new Router({routes})

export {
  router,
  branches
}

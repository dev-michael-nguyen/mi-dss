import Vue from 'vue'
import Router from 'vue-router'
import ProfileCreate from '@/modules/profile/components/ProfileCreate'
import ProfileList from '@/modules/profile/components/ProfileList'
import ProfileMyList from '@/modules/profile/components/ProfileMyList'

Vue.use(Router)

// Left nav tree
const branches = {
  Profile: {
    key: 'Profile',
    icon: 'people',
    title: 'Profiles',
    nodes: {
      ProfileList: { branchKey: 'Profile', title: 'List', route: { path: '/profile-list', name: 'ProfileList' } },
      ProfileCreate: { branchKey: 'Profile', title: 'Create New', route: { path: '/profile-create', name: 'ProfileCreate' } }
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
    component: ProfileList,
    path: '/',
    name: 'Home',
    meta: {
      leftNode: branches.Profile.nodes.ProfileList
    }
  },
  {
    component: ProfileCreate,
    path: branches.Profile.nodes.ProfileCreate.route.path,
    name: branches.Profile.nodes.ProfileCreate.route.name,
    meta: {
      leftNode: branches.Profile.nodes.ProfileCreate
    }
  },
  {
    component: ProfileList,
    path: branches.Profile.nodes.ProfileList.route.path,
    name: branches.Profile.nodes.ProfileList.route.name,
    meta: {
      leftNode: branches.Profile.nodes.ProfileList
    }
  },
  {
    component: ProfileMyList,
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

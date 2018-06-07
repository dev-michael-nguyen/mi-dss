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
      ProfileCreate: { branchKey: 'Profile', title: 'Create', route: { path: '/profile-create', name: 'ProfileCreate' }, hideUntilActive: true }
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
  }
]

Object.keys(branches).forEach(bKey => {
  var branch = branches[bKey]
  Object.keys(branch.nodes).forEach(nKey => {
    var node = branch.nodes[nKey]
    routes.push({
      component: ProfileComponents[node.route.name],
      path: node.route.path,
      name: node.route.name,
      meta: {
        leftNode: node
      }
    })
  })
})

const router = new Router({routes})

export {
  router,
  branches
}

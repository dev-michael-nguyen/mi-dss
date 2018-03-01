<template>
  <v-app>
    <v-navigation-drawer app v-model="showDrawer"
      persistent enable-resize-watcher fixed
      :clipped="clipped"
      :mini-variant="miniVariant">
      <v-list>
        <v-list-group v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items"
            :key="subItem.title"
            :value="activePath == subItem.path"
            @click="onItemClicked(subItem)">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app
      :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click.stop="showRightDrawer = !showRightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <!-- <v-navigation-drawer app v-model="showRightDrawer"
      temporary fixed
      :right="right">
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer app
      fixed>
      <span>&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // app layout configs
      title: 'DSS',
      showDrawer: true,
      clipped: true,
      miniVariant: false,
      // showRightDrawer: false,
      // right: true,
      activePath: '/profile-list',
      // left nav tree
      items: [
        {
          icon: 'people',
          title: 'Profiles',
          active: true,
          items: [
            { title: 'List', path: '/profile-list' }
          ]
        },
        {
          icon: 'list',
          title: 'My List',
          items: [
            { title: 'Profiles', path: '/profile-my-list' }
          ]
        }
      ]
    }
  },
  methods: {
    onItemClicked: function (item) {
      this.activePath = item.path
      this.$router.push({ path: item.path })
    }
  }
}
</script>

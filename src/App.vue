<template>
  <v-app>
    <v-navigation-drawer app v-model="showDrawer"
      persistent enable-resize-watcher fixed
      :clipped="clipped"
      :mini-variant="miniVariant">
      <mi-app-left-nav></mi-app-left-nav>
    </v-navigation-drawer>
    <v-toolbar app
      :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
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
      miniVariant: false
      // showRightDrawer: false,
      // right: true,
    }
  }
}
</script>

<!-- App global css go here -->
<style>
.fieldset-one {
  border-width: 2px 0 0 0;
  border-color: #2196f3
}
.fieldset-two {
  border-width: 0 0 0 0;
  border-color: #2196f3
}
fieldset > legend {
  color: #2196f3 !important;
}
</style>

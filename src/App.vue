<template>
  <v-app>
    <v-navigation-drawer app v-model="showDrawer"
      persistent enable-resize-watcher fixed
      :clipped="clipped"
      :mini-variant="miniVariant">
      <v-list>
        <v-list-group v-for="branch in branches"
          :value="branch.key == activeNode.branchKey"
          :key="branch.key"
          :prepend-icon="branch.icon"
          no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ branch.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="node in branch.nodes"
            :key="node.title"
            :value="node.route.name == activeNode.route.name"
            @click="onClickedNode(node)">
            <v-list-tile-content>
              <v-list-tile-title>{{ node.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
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
import { branches } from './router'

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
      activeNode: this.$route.meta.leftNode,
      // left nav tree
      branches: branches
    }
  },
  mounted () {
    this.updateActiveNode()
  },
  watch: {
    $route: {
      handler (val) {
        this.updateActiveNode()
      }
    }
  },
  methods: {
    updateActiveNode () {
      const activeNode = this.findActiveNode()
      if (activeNode) {
        this.activeNode = activeNode
      }
    },
    findActiveNode () {
      const targetNode = this.$route.meta.leftNode
      return this.branches[targetNode.branchKey].nodes[targetNode.route.name]
    },
    onClickedNode (node) {
      this.activeNode = node
      this.$router.push({ name: node.route.name })
    }
  }
}
</script>

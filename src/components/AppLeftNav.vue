<template>
  <v-list>
    <v-list-group v-for="branch in branches"
      :key="branch.key"
      :value="branch.key == activeNode.branchKey"
      :prepend-icon="branch.icon"
      no-action>
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>{{ branch.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-for="node in branch.nodes"
        v-if="!node.hideUntilActive || node.route.name === activeNode.route.name"
        :key="node.title"
        :value="node.route.name == activeNode.route.name"
        @click="onClickedNode(node)">
        <v-list-tile-content>
          <v-list-tile-title>{{ node.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
import { branches } from '@/router'
export default {
  data () {
    return {
      activeNode: this.$route.meta.leftNode,
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
      const target = this.$route.meta.leftNode
      const branch = this.branches[target.branchKey]
      const node = branch.nodes[target.route.name]
      return node
    },
    onClickedNode (node) {
      this.activeNode = node
      this.$router.push({ name: node.route.name })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

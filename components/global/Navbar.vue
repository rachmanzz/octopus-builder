<template>
  <nav class="navbar navbar-expand-md navbar-light">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" @click="toggleSidebar">
          <span class="ion-navicon-round"></span>
        </a>
      </li>
    </ul>
    <ul class="navbar-nav mx-auto">
      <li class="nav-title">{{ data.title }}</li>
    </ul>
    <ul class="navbar-nav navbar-action ml-auto">
      <li v-if="data.create" class="nav-item">
        <div class="btn btn-outline-success" @click="triggerCreate">Create</div>
      </li>
      <li v-if="data.publish" class="nav-item">
        <div class="btn btn-outline-info" @click="triggerPublish">Publish</div>
      </li>
      <li v-if="data.refresh" class="nav-item">
        <div class="btn btn-outline-primary" @click="triggerRefresh">Refresh</div>
      </li>
      <li v-if="data.save" class="nav-item">
        <div class="btn btn-outline-success" @click="triggerSave">Save</div>
      </li>
      <li v-else class="nav-item">
        <div class="nav-link">&nbsp;</div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      sidebar: true
    }
  },
  props: ['data', 'create', 'publish', 'refresh', 'sync', 'save'],
  methods: {
    toggleSidebar () {
      this.$store.commit('SET_SIDEBAR', !this.sidebar)
      this.sidebar = !this.sidebar
    },
    triggerCreate () {
      this.create()
    },
    triggerPublish () {
      this.publish()
    },
    triggerRefresh () {
      this.refresh()
    },
    triggerSave () {
      this.save()
    }
  }
}
</script>


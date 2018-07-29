<template>
  <div class="main main-flex">
    <Sidebar />
    <div class="main" v-bind:class="{ 'main-expand': !$store.state.sidebar }">
      <nuxt />
      <vue-snotify></vue-snotify>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Snotify from 'vue-snotify'
import Sidebar from '~/components/global/Sidebar.vue'

Vue.use(Snotify)

export default {
  components: {
    Sidebar
  }
}
</script>

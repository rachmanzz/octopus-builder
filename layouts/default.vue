<template>
  <div class="main">
    <Sidebar />
    <nuxt />
    <vue-snotify></vue-snotify>
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

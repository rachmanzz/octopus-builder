<template>
  <el-container>
    <el-aside class="sidebar" v-bind:class="{ 'sidebar-collapse': $store.state.collapse }">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-main class="main">
        <nuxt />
        <vue-snotify></vue-snotify>
      </el-main>
      <el-footer class="footer">
        <Status />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import Snotify from 'vue-snotify'
import Navbar from '~/components/global/Navbar.vue'
import Sidebar from '~/components/global/Sidebar.vue'
import Status from '~/components/global/Status.vue'

Vue.use(Snotify)

export default {
  components: {
    Navbar,
    Sidebar,
    Status
  }
}
</script>

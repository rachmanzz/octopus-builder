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
        <Error v-if="notComplete" :error="hasError" />
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
import Error from '~/components/global/Error.vue'
import Navbar from '~/components/global/Navbar.vue'
import Sidebar from '~/components/global/Sidebar.vue'
import Status from '~/components/global/Status.vue'

Vue.use(Snotify)

export default {
  components: {
    Error,
    Navbar,
    Sidebar,
    Status
  },
  data () {
    return {
      notComplete: false,
      hasError: []
    }
  },
  mounted () {
    const { settings } = this.$store.state

    Object.keys(settings).map(key => {
      if (['branch', 'name', 'repository'].indexOf(key) > -1) {
        if (settings[key] === '' || settings[key] === null) {
          this.notComplete = true
          this.hasError.push(key)
        }
      }

      if (key === 'clients' && settings[key].length === 0) {
        this.notComplete = true
        this.hasError.push(key)
      }

      if (key === 'api' && settings[key]['endpoint'] === '') {
        this.notComplete = true
        this.hasError.push(key)
      }
    })
  }
}
</script>

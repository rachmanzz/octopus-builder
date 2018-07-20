<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="content-inner">
      <div class="row">
        <div class="col-6">
          <ServerSetting />
        </div>
        <div class="col-6">
          <ServerClients />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import ServerSetting from '~/components/ServerSetting.vue'
import ServerClients from '~/components/ServerClients.vue'

export default {
  components: {
    Navbar,
    ServerSetting,
    ServerClients
  },
  data () {
    return {
      navbar: {
        title: 'Settings'
      }
    }
  }
}
</script>
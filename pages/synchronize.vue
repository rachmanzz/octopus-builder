<template>
  <div class="content">
    <Navbar :data="navbar" />
    <div class="content-inner">
      <b-btn variant="success" @click="syncClients">Reload All Clients</b-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Synchronize',
        menu: [{
          url: '/',
          title: 'Synchronize'
        }]
      }
    }
  },
  methods: {
    syncClients () {
      axios.post('/api/synchronize', this.$store.state.settings).then(res => {
        this.$snotify.success('Success reloading any clients')
      })
    }
  }
}
</script>

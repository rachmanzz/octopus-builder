<template>
  <div class="content">
    <Navbar :data="navbar" :onRefresh="refresh"/>
    <div class="content-inner">
      <div v-if="isLoading">Please Wait ...</div>
      <div class="row">
        <div class="col-4" v-for="item in server" :key="item.key" @click="openEditor(item)">
          <div class="card">
            <div class="card-body">
              {{ item.host }}:{{ item.port }}

              <div>{{ item.status.active }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Settings',
        refresh: true,
        menu: [{
          url: '/components/',
          title: 'Components'
        }, {
          url: '/components/publish',
          title: 'Publish'
        }, {
          url: '/components/server',
          title: 'Server'
        }]
      },
      config: [],
      server: [],
      isLoading: true
    }
  },
  mounted () {
    axios.get('/api/server').then(res => {
      this.config = res.data
      this.serverSatus(res.data)
    })
  },
  methods: {
    refresh (e) {
      console.log(e)
      // this.serverSatus(this.config)
    },
    serverSatus (server) {
      this.isLoading = true

      axios.post('/api/server/status', {
        server: server.clients
      }).then(res => {
        const stat = {}

        res.data.map((item, index) => {
          server.clients[index]['status'] = item
          stat[index] = server.clients[index]
        })

        this.server = stat
        this.isLoading = false
      })
    }
  }
}
</script>
<template>
  <b-card
    header="Clients Server"
    header-tag="header"
  >
    <b-table bordered :fields="fields" :items="server"></b-table>
  </b-card>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      fields: {
        name: {
          label: 'Server Name',
          sortable: true
        },
        host: {
          label: 'Hostname',
          sortable: true
        },
        port: {
          label: 'Port',
          sortable: true
        },
        active: {
          label: 'Active'
        }
      },
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
    serverSatus (server) {
      this.isLoading = true
      axios.post('/api/server/status', {
        server: server.clients
      }).then(res => {
        const status = []

        res.data.map((item, index) => {
          server.clients[index]['active'] = item['active']
          server.clients[index]['_cellVariants'] = {
            active: item['active'] ? 'sucess' : 'danger'
          }
          status[index] = server.clients[index]
        })

        this.server = status
        this.isLoading = false
      })
    }
  }
}
</script>

<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="container content-inner">
      <div class="card card-table">
        <div class="card-body">
          <div class="mb-3">
            <b-btn size="sm" variant="outline-success" @click="publish" v-bind:disabled="!isActive">Reload All Clients</b-btn>
            <b-btn size="sm" variant="outline-primary" @click="refresh" class="ml-2">Refresh</b-btn>
          </div>
          <b-table
            hover
            :fields="fields"
            :items="serverList"
          >
            <template slot="active" slot-scope="data">
              <div v-html="formatStatus(data)"></div>
            </template>
            <template slot="publish" slot-scope="data">
              <b-btn class="btn-icon" size="sm" variant="outline-success" @click.stop="publish(data)" v-bind:disabled="!data.item['active']">
                <span class="ion-loop"></span>
              </b-btn>
            </template>
            <template slot="remove" slot-scope="data">
              <b-btn class="btn-icon" size="sm" variant="outline-danger" @click.stop="remove(data)">
                <span class="ion-trash-b"></span>
              </b-btn>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Navbar from '~/components/global/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Synchronize'
      },
      server: {
        name: '',
        host: '',
        port: ''
      },
      modalCreate: false,
      fields: {
        name: {
          label: 'Server Name',
          sortable: true
        },
        host: {
          label: 'Server Host',
          sortable: true
        },
        port: {
          label: 'Server Port',
          sortable: true
        },
        active: {
          label: 'Status',
          sortable: true
        },
        publish: {
          label: 'Reload'
        },
        remove: {
          label: 'Remove'
        }
      },
      serverList: [],
      isActive: false
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    save () {
      axios.post('/core/component/create', this.form).then(res => {
        this.form = {
          fileName: '',
          filePath: '/global/'
        }
        this.modalCreate = !this.modalCreate
        this.$snotify.success(`File ${res.data.data} created`)
        this.list()
      })
    },
    status ({ clients }) {
      const client = clients.filter(item => item.host !== null)
      axios.post('/core/client/status', {
        clients: client
      }).then(res => {
        const status = []

        res.data.map((item, index) => {
          if (item.active) {
            this.isActive = true
          }

          const before = item
          before['publish'] = ''
          before['remove'] = ''

          status[index] = before
        })

        this.serverList = status
      })
    },
    list () {
      axios.get('/core/client').then(res => {
        this.config = res.data
        this.status(res.data)
      })
    },
    refresh () {
      this.list()
    },
    formatStatus (status) {
      if (status.value) {
        return `<span class="comp-status"><i class="ion-arrow-up-c"></i> UP</span>`
      } else {
        return `<span class="comp-status comp-status-down"><i class="ion-arrow-down-c"></i> DOWN</span>`
      }
    },
    publish (data) {
      const storeSetting = this.$store.state.settings
      const message = !data.item ? 'Synchronizing all clients' : `Synchronizing client : ${data.item.name}`

      const sendPublish = () => {
        this.$snotify.info(message)
        axios.post('/core/client/sync', {
          clients: storeSetting['server']
        }).then(res => {
          this.$snotify.success('Success reloading any clients')
        })
      }

      if (data.item) {
        storeSetting['file'] = data.item
        storeSetting['server'] = [{
          host: data.item['host'],
          name: data.item['name'],
          port: data.item['port']
        }]
        sendPublish()
      } else {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#17a2b8',
          cancelButtonColor: '#ababab',
          confirmButtonText: 'Yes, reload all!'
        }).then((result) => {
          if (result.value) {
            const clients = storeSetting['clients'].filter(item => item.host !== null)
            storeSetting['server'] = clients
            sendPublish()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.card {
  table tr th:not(.sorting) {
    width: 100px;
  }
}
.comp-status {
  color: #29a818;
  text-transform: uppercase;
  font-weight: 600;
  font-size: .8rem;

  &-down {
    color: #f55656;
  }
}
</style>

<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="container content-inner">
      <div class="card card-table">
        <div class="card-body">
          <div class="mb-3">
            <b-btn size="sm" variant="outline-success" @click="publish">Reload All Clients</b-btn>
          </div>
          <b-table
            hover
            :fields="fields"
            :items="serverList"
          >
            <template slot="status" slot-scope="data">
              <div v-html="formatStatus(data.value)"></div>
            </template>
            <template slot="publish" slot-scope="data">
              <b-btn class="btn-icon" size="sm" variant="success" @click.stop="publish(data)">
                <span class="ion-loop"></span>
              </b-btn>
            </template>
            <template slot="remove" slot-scope="data">
              <b-btn class="btn-icon" size="sm" variant="danger" @click.stop="remove(data)">
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
        server: {
          label: 'Server Name',
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
      serverList: []
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    save () {
      axios.post('/api/component/create', this.form).then(res => {
        this.form = {
          fileName: '',
          filePath: '/global/'
        }
        this.modalCreate = !this.modalCreate
        this.$snotify.success(`File ${res.data.data} created`)
        this.list()
      })
    },
    check (server) {
      axios.post('/api/server/status', {
        server: server.clients
      }).then(res => {
        const status = []

        res.data.map((item, index) => {
          const before = item
          before['publish'] = ''
          before['remove'] = ''

          status[index] = before
        })

        this.serverList = status
      })
    },
    list () {
      axios.get('/api/server').then(res => {
        this.config = res.data
        this.check(res.data)
      })
    },
    formatStatus (status) {
      const stat = status || 'actived'
      const name = stat.replace(/_/g, ' ')

      return `<span class="comp-status comp-status-${stat}">${name}</span>`
    },
    publish (data) {
      const message = data === 'all' ? 'Publish all clients' : `Publishing client ${data.item.name}`

      const sendPublish = () => {
        this.$snotify.info(message)
        axios.post('/api/synchronize', this.$store.state.settings).then(res => {
          this.$snotify.success('Success reloading any clients')
        })
      }

      if (data !== 'all') {
        if (!data.item.status) {
          this.$snotify.success(`File ${data.item.name} already Published`)
        } else {
          this.$store.state.settings['file'] = data.item
          sendPublish()
        }
      } else {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#17a2b8',
          cancelButtonColor: '#ababab',
          confirmButtonText: 'Yes, Publish it!'
        }).then((result) => {
          if (result.value) {
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

  &-not_added {
    color: #f55656;
  }
  &-conflicted {
    color: #ebcd4c;
  }
  &-created {
    color: #8bd479;
  }
  &-deleted {
    color: #af2727;
  }
  &-modified {
    color: #d4b52a;
  }
  &-renamed {
    color: #e7cc34;
  }
}
</style>

<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="container content-inner">
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <b-btn size="sm" variant="outline-success" @click="modalCreate = !modalCreate" class="mr-2">Create New</b-btn>
            <b-btn size="sm" variant="outline-info" @click="publish('all')">Publish All</b-btn>
          </div>
          <b-table
            hover
            :fields="fields"
            :items="components"
            @row-clicked="openDetail"
          >
            <template slot="status" slot-scope="data">
              <div v-html="formatStatus(data.value)"></div>
            </template>
            <template slot="publish" slot-scope="data">
              <b-btn class="btn-icon" size="sm" variant="info" @click.stop="publish(data)">
                <span class="ion-share"></span>
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
    <b-modal v-model="modalCreate" centered hide-header hide-footer>
      <b-form-group
        label="File Name:"
        label-for="fileName">
        <b-form-input
          id="fileName"
          type="text"
          v-model="form.fileName"
          required
          placeholder="Enter file name">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="File Path:"
        label-for="filePath">
        <b-form-input
          id="filePath"
          type="text"
          v-model="form.filePath"
          required
          placeholder="Enter file Path">
        </b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="save">Submit</b-button>
    </b-modal>
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
        title: 'All Components'
      },
      form: {
        fileName: '',
        filePath: '/global/'
      },
      modalCreate: false,
      fields: {
        file: {
          label: 'File Name',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true
        },
        publish: {
          label: 'Publish'
        },
        remove: {
          label: 'Remove'
        }
      },
      components: []
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    openDetail (record, index) {
      const file = record.file.replace(/\..*$/g, '')
      this.$router.push(`/components/editor?file=${file.toLowerCase()}`)
    },
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
    remove (data) {
      const item = data.item
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#df4848',
        cancelButtonColor: '#ababab',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.value) {
          axios.post('/api/component/remove', {
            filePath: item.path
          }).then(res => {
            axios.get('/api/component/map').then(res => {
              this.$snotify.success('Mapping new components success')
            })
            this.$swal(
              'Deleted!',
              `File ${res.data.data} removed`,
              'success'
            )
            this.list()
          })
        }
      })
    },
    publish (data) {
      const message = data === 'all' ? 'Publish all components' : `Publishing component ${data.item.name}`

      const sendPublish = () => {
        this.$snotify.info(message)
        axios.post('/api/component/publish', this.$store.state.settings).then(res => {
          this.$snotify.success(message + ' success')
        })
      }

      if (data !== 'all') {
        if (!data.item.status) {
          this.$snotify.success(`File ${data.item.name} already published`)
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
          confirmButtonText: 'Yes, publish it!'
        }).then((result) => {
          if (result.value) {
            sendPublish()
          }
        })
      }
    },
    list () {
      axios.get('/api/component').then(res => {
        const files = {}

        this.components = res.data

        res.data.map((item, index) => {
          const before = item
          before['publish'] = ''
          before['remove'] = ''

          files[item.name.toLowerCase()] = before
        })

        this.$store.commit('SET_FILES', {
          data: files
        })
      })
    },
    formatStatus (status) {
      const stat = status || 'actived'
      const name = stat.replace(/_/g, ' ')

      return `<span class="comp-status comp-status-${stat}">${name}</span>`
    }
  }
}
</script>

<style lang="scss">
.card {
  cursor: pointer;

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

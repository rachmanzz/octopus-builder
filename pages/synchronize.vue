<template>
  <section>
    <div class="container content-inner">
      <el-card class="box-card" shadow="never">
        <section slot="header" class="clearfix">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="8">
              <el-input
                placeholder="Type something"
                prefix-icon="el-icon-search">
              </el-input>
            </el-col>
            <el-col align="right">
              <el-button type="primary" plain @click="handlePublish">Reload All</el-button>
              <el-button plain @click="handleReload">Refresh List</el-button>
            </el-col>
          </el-row>
        </section>
        <el-table
          v-loading="loading"
          :data="servers"
          empty-text="Belum ada data"
          style="width: 100%">
          <el-table-column label="Name">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="Host">
            <template slot-scope="scope">
              {{ scope.row.host }}
            </template>
          </el-table-column>
          <el-table-column label="Port">
            <template slot-scope="scope">
              {{ scope.row.port }}
            </template>
          </el-table-column>
          <el-table-column label="Status">
            <template slot-scope="scope">
              <el-tag v-if="!scope.row.active" size="medium" type="danger">Down</el-tag>
              <el-tag v-else size="medium" type="success">Active</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="Operations"
            width="200px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handlePublish(scope.$index, scope.row)">Reload</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  head: {
    title: 'Synchronize - Octopus Builder'
  },
  data () {
    return {
      loading: true,
      navbar: {
        title: 'Synchronize'
      },
      servers: [],
      isActive: false
    }
  },
  mounted () {
    this.$store.commit('SET_TITLE', 'Synchronize')
    this.handleList()
  },
  methods: {
    handleMessage (message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    handleStatus ({ clients }) {
      const client = clients.filter(item => item.host !== null)
      axios.post('/core/client/status', {
        clients: client
      }).then(res => {
        res.data.map((item, index) => {
          if (item.active) {
            this.isActive = true
          }
        })

        this.servers = res.data
        this.loading = false
      })
    },
    handleList () {
      this.loading = true

      axios.get('/core/client').then(res => {
        this.config = res.data
        this.handleStatus(res.data)
      })
    },
    handleReload () {
      this.servers = []
      this.handleList()
    },
    handlePublish (index, row) {
      const storeSetting = this.$store.state.settings
      const message = !row ? 'Reloading all clients' : `Reloading client : ${row.name}`

      const sendPublish = () => {
        this.handleMessage(message, 'info')
        axios.post('/core/client/sync', {
          clients: storeSetting['server']
        }).then(res => {
          this.handleMessage('Success reloading client', 'success')
        })
      }

      if (row) {
        storeSetting['file'] = row
        storeSetting['server'] = [{
          host: row['host'],
          name: row['name'],
          port: row['port']
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

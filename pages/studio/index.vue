<template>
  <section>
    <div
      class="container content-inner"
      v-loading="dialogLoading"
      :element-loading-text="dialogLoadingText"
      >
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
              <el-button type="success" plain @click="dialogCreate = !dialogCreate">Create New</el-button>
              <el-button type="primary" plain @click="handlePublish" v-bind:disabled="!haveModified">Publish All</el-button>
            </el-col>
          </el-row>
        </section>
        <el-table
          :data="pages"
          style="width: 100%"
          @row-dblclick="handleOpen">
          <el-table-column label="Name">
            <template slot-scope="scope">
              {{ formatText(scope.row.name) }}
            </template>
          </el-table-column>
          <el-table-column label="Path">
            <template slot-scope="scope">
              {{ scope.row.path }}
            </template>
          </el-table-column>
          <el-table-column label="Clients">
            <template slot-scope="scope">
              {{ formatClients(scope.row.clients) }}
            </template>
          </el-table-column>
          <el-table-column
            label="Status"
            width="200px">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.published === 0" size="medium" type="warning">Modified</el-tag>
              <el-tag v-else size="medium" type="success">Published</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="Operations"
            width="200px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                v-bind:disabled="scope.row.published === 1"
                @click="handlePublish(scope.$index, scope.row)">Publish</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog
      title="Create File"
      :visible.sync="dialogCreate"
      width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Path">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="Clients">
          <el-select
            v-model="form.client"
            multiple
            collapse-tags
            placeholder="Select">
            <el-option
              v-for="(item, index) in clients"
              :key="index"
              :label="item.name"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">Create</el-button>
          <el-button @click="dialogCreate = !dialogCreate">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="Select Server"
      :visible.sync="dialogServer"
      :before-close="handleClose"
      width="60%">
      <Server />
      <br>
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="Choose Clients">
          <el-select
            v-model="reload.client"
            multiple
            collapse-tags
            placeholder="Select">
            <el-option
              v-for="(item, index) in reloadableClients"
              :key="index"
              :label="item.name"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReload">Reload</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Server from '~/components/global/Server.vue'

export default {
  head: {
    title: 'Studio - Octopus Builder'
  },
  components: {
    Server
  },
  data () {
    return {
      haveModified: false,
      navbar: {
        title: 'Studio'
      },
      form: {
        name: '',
        path: '/',
        description: '-',
        client: []
      },
      pages: [],
      clients: {},
      reloadablePages: [],
      reloadableClients: {},
      dialogCreate: false,
      dialogServer: false,
      dialogLoading: false,
      dialogLoadingText: '',
      reload: {
        client: [],
        sources: []
      }
    }
  },
  mounted () {
    this.$store.commit('SET_TITLE', 'Studio')
    axios.get('/core/setting').then(res => {
      res.data['clients'].map(item => {
        this.clients[item.name.toLowerCase()] = {
          name: item.name,
          value: item
        }
      })
    })

    this.handleList()
  },
  methods: {
    handleMessage (message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    handleClose (next) {
      this.reload = {
        client: [],
        sources: []
      }
      next()
    },
    handlePublish (index, row) {
      this.dialogServer = !this.dialogServer

      if (!row) {
        this.pages.map(item => this.reload['sources'].push(item.pages))
        this.reloadableClients = this.clients
        this.reloadablePages = this.pages
      } else {
        this.reload['sources'].push(row.pages)
        this.reloadableClients = {}
        JSON.parse(row.clients).map(item => {
          this.reloadableClients[item.name.toLowerCase()] = item
        })
        this.reloadablePages.push(row)
      }
    },
    handleReload () {
      this.dialogServer = false
      this.dialogLoading = true
      this.dialogLoadingText = 'Generating page on clients'

      setTimeout(() => {
        this.dialogLoadingText = 'Rebuild page on clients'
      }, 6000)

      setTimeout(() => {
        this.dialogLoadingText = 'Restarting server'
      }, 8000)

      this.reload['clients'] = this.reload['client'].map((item, index) => this.clients[item]['value'])
      axios.post('/core/client/render', {
        clients: this.reload['clients'],
        sources: this.reload['sources']
      }).then(result => {
        this.dialogLoading = false
        this.reloadablePages.map(page => {
          page['published'] = 1

          axios.put('/core/page', page).then(res => {
            this.handleMessage('Synchronizing page success', 'success')
            this.handleList()
          })
        })
      })
    },
    handleDelete (index, row) {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios.post('/core/page/delete', row).then(res => {
          this.$message({
            type: 'success',
            message: `Page ${res.data['pages']['name']} already removed`
          })
          this.handleList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    handleOpen (row, event, column) {
      this.$store.commit('SET_PAGE', row)
      this.$router.push(`/studio/editor`)
    },
    handleSave () {
      this.form['clients'] = this.form['client'].map((item, index) => this.clients[item])

      axios.post('/core/page', this.form).then(res => {
        this.dialogCreate = !this.dialogCreate
        this.handleMessage('Create page success', 'success')
        this.handleList()
        this.form = {
          name: '',
          path: '/',
          description: '-',
          client: []
        }
      })
    },
    handleList () {
      axios.get('/core/page').then(res => {
        res.data['pages'].map(item => {
          if (item.published === 0) {
            this.haveModified = true
          }
        })

        this.pages = res.data['pages']
      })
    },
    formatText (string) {
      if (!string) {
        return
      }

      return string.replace(/([A-Z]+)/g, ' $1').replace(/^ /, '').trim()
    },
    formatClients (string) {
      if (!string) {
        return
      }

      return JSON.parse(string).map(item => item.name).join(', ')
    }
  }
}
</script>

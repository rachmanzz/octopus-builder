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
              <el-button type="success" plain @click="dialogOpen = !dialogOpen">Create New</el-button>
              <el-button type="primary" plain @click="handlePublish">Share All</el-button>
              <el-button plain @click="handleRefresh">Refresh</el-button>
            </el-col>
          </el-row>
        </section>
        <el-table
          :data="layouts"
          style="width: 100%"
          @row-dblclick="handleOpen">
          <el-table-column label="Name">
            <template slot-scope="scope">
              {{ formatText(scope.row.file) }}
            </template>
          </el-table-column>
          <el-table-column label="Path">
            <template slot-scope="scope">
              {{ scope.row.path }}
            </template>
          </el-table-column>
          <el-table-column
            label="Status"
            width="200px">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 'not_added'" size="medium" type="danger">Not Added</el-tag>
              <el-tag v-else-if="scope.row.status === 'modified'" size="medium" type="warning">Modified</el-tag>
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
                @click="handlePublish(scope.$index, scope.row)">Share</el-button>
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
      :visible.sync="dialogOpen"
      width="40%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Group">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">Create</el-button>
          <el-button @click="dialogOpen = !dialogOpen">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Navbar from '~/components/global/Navbar.vue'

export default {
  head: {
    title: 'Layout - Octopus Builder'
  },
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Layout'
      },
      form: {
        name: '',
        path: '/global/'
      },
      dialogOpen: false,
      layouts: []
    }
  },
  mounted () {
    this.$store.commit('SET_TITLE', 'Layouts')
    this.handleList()
  },
  methods: {
    handleMessage (message, type) {
      this.$message({
        message: message,
        type: type
      })
    },
    handleList () {
      axios.get('/core/component').then(res => {
        const files = {}
        this.layouts = res.data

        res.data.map((item, index) => {
          files[item.file] = item
        })

        this.$store.commit('SET_FILES', {
          data: files
        })
      })
    },
    handleOpen (row, event, column) {
      this.$router.push(`/layout/editor?file=${row.file}`)
    },
    handlePublish (index, row) {
      const message = !row ? 'Publish all layout' : `Publishing layout ${row.name}`

      const sendPublish = () => {
        this.handleMessage(message, 'info')
        axios.post('/core/component/publish', this.$store.state.settings).then(res => {
          this.handleMessage(message + ' success', 'success')
          this.handleList()
        })
      }

      const showAlert = () => {
        this.$confirm('You won\'t be able to revert this action.', 'Warning', {
          confirmButtonText: 'Publish',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          sendPublish()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Publish canceled'
          })
        })
      }

      if (row) {
        if (!row.status) {
          this.handleMessage(`File ${row.name} is already published`, 'success')
        } else {
          this.$store.state.settings['file'] = row
          showAlert()
        }
      } else {
        showAlert()
      }
    },
    handleDelete (index, row) {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios.post('/core/component/remove', {
          filePath: row.path
        }).then(res => {
          this.$message({
            type: 'success',
            message: `File ${res.data.data} removed`
          })
          this.handleList()

          axios.get('/core/component/source').then(res => {})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    handleRefresh () {
      axios.get('/core/component/source').then(res => {
        this.handleMessage('Mapping new components success', 'success')
        this.handleList()
      })
    },
    handleSave () {
      axios.post('/core/component/create', this.form).then(res => {
        this.form = {
          name: '',
          path: '/global/'
        }
        this.dialogOpen = !this.dialogOpen
        this.handleMessage(`File ${res.data.data} created`, 'success')
        this.handleList()
      })
    },
    formatText (string) {
      if (!string) {
        return
      }

      return string.replace(/oct|-/g, ' ').trim()
    }
  }
}
</script>

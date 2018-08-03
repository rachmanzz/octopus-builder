<template>
  <section>
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
    </el-table>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      loading: true,
      servers: []
    }
  },
  mounted () {
    this.handleList()
  },
  methods: {
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
    }
  }
}
</script>

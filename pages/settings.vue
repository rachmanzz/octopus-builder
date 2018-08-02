<template>
  <section>
    <div class="container content-inner">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>General</span>
            </div>
            <el-form ref="form" :model="config" label-width="80px">
              <el-form-item label="Name">
                <el-input v-model="config.name"></el-input>
              </el-form-item>
              <el-form-item label="Description">
                <el-input type="textarea" v-model="config.description"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>Git Repository</span>
            </div>
            <el-form ref="form" :model="config" label-width="80px">
              <el-form-item label="Repository">
                <el-input v-model="config.repository"></el-input>
              </el-form-item>
              <el-form-item label="Branch">
                <el-input v-model="config.branch"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>API Authentication</span>
            </div>
            <el-form ref="form" :model="config" label-width="80px">
              <el-form-item label="Endpoint">
                <el-input v-model="config.api.endpoint"></el-input>
              </el-form-item>
              <el-form-item label="Token">
                <el-input v-model="config.api.token"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>Clients</span>
            </div>
            <el-form ref="form" :inline="true" :model="config" v-for="(client, index) in config.clients" :key="index">
              <el-form-item>
                <el-input style="width: 140px;" v-model="config.clients[index].name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input style="width: 200px;" v-model="config.clients[index].host"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input style="width: 90px;" v-model="config.clients[index].port"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="0" type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <el-button type="success" plain @click="handleSave">Save & Reload</el-button>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  head: {
    title: 'Settings - Octopus Builder'
  },
  data () {
    return {
      navbar: {
        title: 'Settings'
      },
      config: {
        api: {}
      }
    }
  },
  mounted () {
    this.$store.commit('SET_TITLE', 'Settings')
    axios.get('/core/setting').then(res => {
      this.config = res.data
    })
  },
  methods: {
    handleSave () {
      axios.post('/core/setting', this.config).then(res => {
        this.config = res.data
        this.$message({
          message: 'All settings already saved',
          type: 'success'
        })

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    }
  }
}
</script>

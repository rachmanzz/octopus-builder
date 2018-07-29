<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="container content-inner">
      <div class="row">
        <div class="col-8 mx-auto">
          <b-card>
            <div class="title">General</div>
            <b-form-group
              label="Application Name"
              label-for="labelName">
              <b-form-input id="labelName"
                type="text"
                v-model="config.name"
                placeholder="Enter Name"
                required>
              </b-form-input>
            </b-form-group>
            <div class="title">Git Repository</div>
            <b-form-group
              label="Global Repository"
              label-for="labelRepository"
              description="We use Git with SSH Key, don't forget to set SSH Key on your server.">
              <b-form-input id="labelRepository"
                type="text"
                v-model="config.repository"
                placeholder="Enter repository"
                required>
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="Repository Branch"
              label-for="labelBranch">
              <b-form-input id="labelBranch"
                type="text"
                v-model="config.branch"
                placeholder="Enter Branch"
                required>
              </b-form-input>
            </b-form-group>
            <div class="title">API Authentication</div>
            <b-form-group
              label="API Endpoint"
              label-for="labelApiEndpoint">
              <b-form-input id="labelApiEndpoint"
                type="text"
                v-model="config.api.endpoint"
                placeholder="Enter Api Endpoint"
                required>
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="API Token"
              label-for="labelApiToken">
              <b-form-input id="labelApiToken"
                type="text"
                v-model="config.api.token"
                placeholder="Enter Api Token"
                required>
              </b-form-input>
            </b-form-group>
            <div class="title">Clients Server</div>
            <div class="row" v-for="(client, index) in config.clients" :key="index">
              <div class="col-4">
                <b-form-group label="Name">
                  <b-form-input
                    type="text"
                    v-model="config.clients[index].name"
                    placeholder="Enter Name"
                    required>
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-4">
                <b-form-group label="Host">
                  <b-form-input
                    type="text"
                    v-model="config.clients[index].host"
                    placeholder="Enter Host"
                    required>
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-4">
                <b-form-group label="Port">
                  <b-form-input
                    type="text"
                    v-model="config.clients[index].port"
                    placeholder="Enter Port"
                    required>
                  </b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="mt-4">
              <b-btn size="sm" variant="outline-success" @click="saveSetting" class="mr-2">Save Setting</b-btn>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

import Navbar from '~/components/global/Navbar.vue'
import ServerSetting from '~/components/section/ServerSetting.vue'
import ServerClients from '~/components/section/ServerClients.vue'

export default {
  components: {
    Navbar,
    ServerSetting,
    ServerClients
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
    axios.get('/api/settings').then(res => {
      this.config = res.data
    })
  },
  methods: {
    saveSetting () {
      axios.post('/api/settings', this.config).then(res => {
        this.config = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-bottom: 1.4rem;
  padding: .2rem 1rem;
  border-left: 4px solid #527eff;

  &:first-child {
    margin-top: 0;
  }
}
</style>


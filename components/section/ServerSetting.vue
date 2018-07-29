<template>
  <b-card>
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
    <b-btn size="sm" variant="outline-success" @click="saveSetting" class="mr-2">Save Setting</b-btn>
  </b-card>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      config: {
        repository: '',
        name: ''
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

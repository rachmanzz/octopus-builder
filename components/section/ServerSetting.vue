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
      description="We'll never share your email with anyone else.">
      <b-form-input id="labelRepository"
        type="text"
        v-model="config.repository"
        placeholder="Enter repository"
        required>
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="success" @click="saveSetting">Save</b-button>
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

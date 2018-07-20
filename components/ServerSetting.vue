<template>
  <b-card
    header="Git Repository"
    header-tag="header"
  >
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
    <b-button type="submit" variant="success">Save</b-button>
  </b-card>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      config: {
        repository: ''
      }
    }
  },
  mounted () {
    axios.get('/api/server').then(res => {
      this.config = res.data
    })
  }
}
</script>

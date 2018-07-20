<template>
  <b-card
    header="Clients Server"
    header-tag="header"
  >
    
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

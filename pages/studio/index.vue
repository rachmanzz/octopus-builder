<template>
  <div class="content">
    <Navbar :data="navbar" />
    <div class="container content-inner">
      <div class="card mb-3">
        <div class="card-body">
          <b-btn size="sm" variant="outline-success" @click="modalCreate = !modalCreate" class="mr-2">Create New</b-btn>
          <b-btn size="sm" variant="outline-primary" @click="publish('all')" class="mr-2">Publish All</b-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-4" v-for="item in pages" :key="item.key">
          <div class="card card-link" @click="openBuilder">
            <div class="card-body">
              {{ item.name }} 
              {{ item.path }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Navbar from '~/components/global/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Studio'
      },
      pages: []
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    openBuilder (file) {
      this.$router.push(`/studio/editor`)
    },
    list () {
      axios.get('/core/page').then(res => {
        this.pages = res.data['pages']
      })
    }
  }
}
</script>

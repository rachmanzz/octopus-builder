<template>
  <div class="content">
    <Navbar :data="navbar" :refresh="refreshList"/>
    <div class="content-inner">
      <div class="row">
        <div class="col-3" v-for="item in components" :key="item.key">
          <div class="card" @click="openEditor(item)">
            <div class="card-body">
              {{ item.fileName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'All Components',
        refresh: true,
        menu: [{
          url: '/components/',
          title: 'Components'
        }, {
          url: '/components/publish',
          title: 'Publish'
        }, {
          url: '/components/server',
          title: 'Server'
        }]
      },
      components: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    openEditor (file) {
      this.$router.push(`/components/editor?file=${file.name.toLowerCase()}`)
    },
    getList () {
      axios.get('/api/components/list').then(res => {
        const files = {}

        this.components = res.data

        res.data.map((item, index) => {
          files[item.name.toLowerCase()] = item
        })

        this.$store.commit('FILES', {
          data: files
        })
      })
    },
    refreshList () {
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.card {
  cursor: pointer;
}
</style>

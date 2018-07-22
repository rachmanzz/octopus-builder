<template>
  <div class="content">
    <Navbar :data="navbar" :create="createComponent" :publish="publishComponent"/>
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
        create: true,
        publish: true,
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
    createComponent () {
      console.log('Create Component')
    },
    publishComponent () {
      this.$snotify.info('Publishing all components')
      axios.post('/api/component/publish', this.$store.state.settings).then(res => {
        this.$snotify.success('Publish all components success')
      })
    },
    getList () {
      axios.get('/api/component').then(res => {
        const files = {}

        this.components = res.data

        res.data.map((item, index) => {
          files[item.name.toLowerCase()] = item
        })

        this.$store.commit('SET_FILES', {
          data: files
        })
      })
    }
  }
}
</script>

<style lang="scss">
.card {
  cursor: pointer;
}
</style>

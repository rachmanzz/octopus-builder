<template>
  <section class="main">
    <SecondaryMenu :data="secondary"/>
    <div class="content">
      <button @click="refreshList">Refresh</button>
      <div class="row">
        <div class="col-4" v-for="item in components" :key="item.key" @click="openEditor(item)">
          <div class="card">
            <div class="card-body">
              {{ item.fileName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import SecondaryMenu from '~/components/SecondaryMenu.vue'

export default {
  components: {
    SecondaryMenu
  },
  data () {
    return {
      secondary: {
        title: 'Sync Components',
        menu: [{
          url: '/components/',
          title: 'Components'
        }, {
          url: '/components/publish',
          title: 'Publish'
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
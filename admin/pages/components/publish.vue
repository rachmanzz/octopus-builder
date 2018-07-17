<template>
  <section class="main">
    <SecondaryMenu :data="secondary"/>
    <div class="content">
      <div class="row">
        <div class="col-4" v-for="item in components" :key="item.key">
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
    axios.get('/api/components/list').then(res => {
      this.components = res.data
    })
  }
}
</script>
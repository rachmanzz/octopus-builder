<template>
  <div class="content">
    <Navbar :data="navbar" :refresh="refresh" :save="save"/>
    <div class="content-flex">
      <div class="studio">
        <!-- <div class="studio-inner"></div> -->

<div class="studio-inner"></div>

      </div>
      <div class="properties" role="tablist">
        <!-- Layouts -->
        <b-card class="card-default" no-body>
          <b-card-header header-tag="header" role="tab" v-b-toggle.layouts>
            Layouts
          </b-card-header>
          <b-collapse id="layouts" accordion="editor-collapse" role="tabpanel">
            <b-card-body>
              no layout
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- Components -->
        <b-card class="card-default" no-body>
          <b-card-header header-tag="header" role="tab" v-b-toggle.components>
            Components
          </b-card-header>
          <b-collapse id="components" visible accordion="editor-collapse" role="tabpanel">
            <b-card-body class="studio-element">
              <div class="studio-source" v-for="(item, key) in source" :key="key">
                <div class="studio-icon" :class="item.icon" :title="item.name"></div>
                <div class="studio-name">{{ item.name }}</div>
                <div class="studio-component">
                  <component :is="item.component"></component>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- Properties -->
        <Properties />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Builder from '~/lib/studioBuilder.js'
import Source from '~/lib/studioSource.js'
import Extractor from '~/lib/studioExtractor.js'
import Navbar from '~/components/global/Navbar.vue'
import Properties from '~/components/studio/Properties.vue'

export default {
  components: {
    Navbar,
    Properties
  },
  data () {
    return {
      navbar: {
        title: 'Studio',
        save: true,
        refresh: true
      },
      source: [],
      target: []
    }
  },
  mounted () {
    this.source = Source

    if (process.browser) {
      new Builder() // eslint-disable-line

      Extractor.generateMap().then(mapping => {
        // console.log(JSON.stringify(mapping))
        console.log(mapping)
      })
    }
  },
  methods: {
    save () {
      Extractor.generateMap().then(mapping => {
        console.log(JSON.stringify(mapping))
        // axios.post('/api/render', mapping).then(result => {
        //   this.$snotify.success('Generate page success')
        // })
      })
    },
    refresh () {
      axios.get('/api/component/map').then(res => {
        this.$snotify.success('Mapping new components success')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    }
  }
}
</script>
<template>
  <div class="content">
    <Navbar :data="navbar" :refresh="refresh" :save="save"/>
    <div class="content-flex">
      <div class="studio">
        <div class="studio-inner"></div>
      </div>
      <div class="properties">
        <div role="tablist">

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
              <b-card-body class="builder-element">
                <div class="builder-item" v-for="(item, key) in source" :key="key">
                  <div class="builder-icon" :class="item.icon" :title="item.name"></div>
                  <div class="builder-name">{{ item.name }}</div>
                  <div class="builder-component">
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
  </div>
</template>

<script>
import axios from 'axios'
import Builder from '~/lib/studioBuilder.js'
import importer from '~/lib/studioImporter.js'
import extractor from '~/lib/studioExtractor.js'
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
    new Builder() // eslint-disable-line
    this.source = importer
  },
  methods: {
    save () {
      extractor.generateMap().then(mapping => {
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
    },
    setListener () {
      document.querySelectorAll('[data-octopus]').forEach(element => {
        if (element.dataset['octopus'].indexOf('type:') > -1) {
          element.addEventListener('click', (e) => {
            e.stopPropagation()
            this.setProperties(e.target)
          }, { once: true })
        }
      })
    },
    setProperties (element) {
      const attrs = extractor.extractAttribute(element.dataset['octopus'])
      const allowStyle = ['color', 'fontSize', 'width', 'height']
      const filterStyle = (propStyle) => {
        return Object.keys(propStyle).filter(key => allowStyle.includes(key)).reduce((obj, key) => {
          obj[key] = propStyle[key]
          return obj
        }, {})
      }

      if (element.classList.value.indexOf('octopus_') === -1) {
        // element.classList.add(`octopus_${builder.uniqueID()}`)
      }

      this.$store.commit('SET_PROPERTIES', {
        type: attrs.type,
        payload: {
          element: element.classList[1],
          option: element.dataset['octopus'],
          content: extractor.generatePropsValue(element, attrs.type),
          style: JSON.stringify(filterStyle(window.getComputedStyle(element))),
          protoStyle: element.dataset['octopusStyle']
        }
      })
    }
  }
}
</script>
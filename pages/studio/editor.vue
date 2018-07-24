<template>
  <div class="content">
    <Navbar :data="navbar" :refresh="refresh" :save="save"/>
    <div class="content-flex">
      <div class="studio">
        <div class="studio-inner">

          <!-- Studio Workspace -->
          <Container
            group-name="studio"
            :get-child-payload="setTarget"
            :drag-handle-selector="`.toolbar_handle`"
            drag-class="smooth-dnd-drag"
            drop-class="smooth-dnd-drop"
            @drop="studioDrop('target', $event)"
          >
            <Draggable v-for="(item, key) in target" :key="key">
              <div class="component-item" @click="setClick(key)">
                <div class="component-toolbar">
                  <span class="component-toolbar_item toolbar_handle">
                    <i class="ion-arrow-move"></i>
                  </span>
                  <span class="component-toolbar_item toolbar_delete" @click="studioRemove(key)">
                    <i class="ion-trash-b"></i>
                  </span>
                </div>
                <component :is="item.component"></component>
              </div>
            </Draggable>
          </Container>

        </div>
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
              <b-card-body>
                <Container
                  :behaviour="'copy'"
                  group-name="studio"
                  :get-child-payload="setSource"
                  drag-class="smooth-dnd-drag"
                  drop-class="smooth-dnd-drop"
                >
                  <Draggable v-for="item in source" :key="item.id">
                    <div class="smooth-dnd-item">
                      {{ item.data }}
                    </div>
                  </Draggable>
                </Container>
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
import builder from '~/lib/studioBuilder.js'
import importer from '~/lib/studioImporter.js'
import extractor from '~/lib/studioExtractor.js'
import Navbar from '~/components/global/Navbar.vue'
import Properties from '~/components/studio/Properties.vue'
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  components: {
    Container,
    Draggable,
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
    this.source = importer
  },
  methods: {
    save () {
      extractor.generateMap().then(mapping => {
        console.log(mapping)
        axios.post('/api/render', mapping).then(result => {
          this.$snotify.success('Generate page success')
        })
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
    studioDrop (collection, dropResult) {
      this[collection] = builder.setDrop(this[collection], dropResult)
    },
    studioRemove (index) {
      this.target.splice(index, 1)
    },
    setSource (index) {
      return this.source[index]
    },
    setTarget (index) {
      return this.target[index]
    },
    setClick (key) {
      this.setListener()
      return builder.setEditable(key)
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
        element.classList.add(`octopus_${builder.uniqueID()}`)
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
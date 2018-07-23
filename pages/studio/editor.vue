<template>
  <div class="content">
    <Navbar :data="navbar" :refresh="onRefresh" :save="onSave"/>
    <div class="content-flex">
      <div class="studio">
        <div class="studio-inner">
          <Container
            group-name="studio"
            :get-child-payload="targetElement"
            :drag-handle-selector="`.toolbar_handle`"
            drag-class="smooth-dnd-drag"
            drop-class="smooth-dnd-drop"
            @drop="onDrop('target', $event)"
            @drag="onDrag('target', $event)"
          >
            <Draggable v-for="(item, key) in target" :key="key">
              <div class="component-item" @click="setEditable(key)">
                <div class="component-toolbar">
                  <span class="component-toolbar_item toolbar_handle">
                    <i class="ion-arrow-move"></i>
                  </span>
                  <span class="component-toolbar_item toolbar_delete" @click="removeComponent(key)">
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
          <b-card class="card-default" no-body>
            <b-card-header header-tag="header" role="tab" v-b-toggle.components>
              Components
            </b-card-header>
            <b-collapse id="components" visible accordion="editor-collapse" role="tabpanel">
              <b-card-body>
                <Container
                  :behaviour="'copy'"
                  group-name="studio"
                  :get-child-payload="sourceElement"
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
        </div>
      </div>
    </div>
  </div>
</template>x

<script>
import axios from 'axios'
import importer from '~/lib/components.js'
import { Container, Draggable } from 'vue-smooth-dnd'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Container,
    Draggable,
    Navbar
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
    generatePropsValue (element, data) {
      let result = ''

      if (data['octKey'] === 'image') {
        result = element.src
      } else {
        result = element.innerText
      }

      return result
    },
    generateProps (parent, child) {
      const props = {
        key: parent.dataset['octProps'],
        data: parent.dataset['octPropsKey'],
        payload: {}
      }

      child.forEach(item => {
        props['payload'][item.dataset['octKey']] = this.generatePropsValue(item, item.dataset)
      })

      return props
    },
    async generateMap () {
      const mapping = {
        slug: 'page-1',
        source: [],
        pageClass: 'container',
        components: [],
        styles: []
      }
      const component = []

      document.querySelectorAll('.studio-inner .component-item').forEach(item => {
        let element = item.childNodes[1]

        component.push({
          title: element.dataset['octComponent'],
          name: element.dataset['octComponent'],
          path: 'global',
          props: this.generateProps(element, element.childNodes)
        })
      })

      mapping['components'] = component

      return mapping
    },
    onSave () {
      this.generateMap().then(mapping => {
        axios.post('/api/render', mapping).then(result => {
          this.$snotify.success('Generate page success')
        })
      })
    },
    onRefresh () {
      axios.get('/api/component/map').then(res => {
        this.$snotify.success('Mapping new components success')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    },
    removeComponent (index) {
      this.target.splice(index, 1)
    },
    onDrop (collection, dropResult) {
      this[collection] = this.applyDrag(this[collection], dropResult)
    },
    setEditable (index) {
      const component = document.querySelectorAll('.component-item')

      component.forEach(item => item.classList.remove('component-item_active'))
      component[index].classList.add('component-item_active')

      document.querySelectorAll('.component-item [data-oct-text]').forEach(item => item.setAttribute('contenteditable', true))
    },
    sourceElement (index) {
      return this.source[index]
    },
    targetElement (index) {
      return this.target[index]
    },
    applyDrag (arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return arr

      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }

      return result
    }
  }
}
</script>
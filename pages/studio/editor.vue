<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="content-flex">
      <div class="studio">
        <div class="studio-inner">
          <Container group-name="studio" :get-child-payload="targetElement" @drop="onDrop('target', $event)">            
            <Draggable v-for="item in target" :key="item.id">
              <component :is="item.component"/>
            </Draggable>
          </Container>
        </div>
      </div>
      <div class="secondary">
        <Container :behaviour="'copy'" group-name="studio" :get-child-payload="sourceElement">
          <Draggable v-for="item in source" :key="item.id">
            <div class="smooth-dnd-item">
              {{item.data}}
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import panzoom from 'panzoom'
import { Container, Draggable } from 'vue-smooth-dnd'
import Navbar from '~/components/Navbar.vue'
import Secondary from '~/components/Secondary.vue'

export default {
  components: {
    Container,
    Draggable,
    Navbar,
    Secondary
  },
  data () {
    return {
      navbar: {
        title: 'Studio'
      },
      source: [{
        data: 'Banner',
        component: () => import('~/core/global/Banner.vue')
      }, {
        data: 'Tagline',
        component: () => import('~/core/global/Tagline.vue')
      }, {
        data: 'Counter',
        component: () => import('~/core/global/Counter.vue')
      }],
      target: []
    }
  },
  mounted () {
    if (process.browser) {
      panzoom(document.querySelector('.studio-inner'))
    }
  },
  methods: {
    getComponent (path) {
      return ({
        component: import(`${path}`)
      })
    },
    onDrop (collection, dropResult) {
      this[collection] = this.applyDrag(this[collection], dropResult)
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
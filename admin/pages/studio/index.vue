<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="content-flex">
      <div class="studio">
        <div :style="{ 'display': 'flex', 'justifyContent': 'stretch', 'marginTop': '50px', 'marginRight': '50px' }">
          <div :style="{'marginLeft': '50px', 'flex': '1'}">
            <Container :group-name="'1'" :get-child-payload="getChildPayload2" @drop="onDrop('items2', $event)">            
              <Draggable v-for="item in items2" :key="item.id">
                <div class="draggable-item">
                  {{item.data}}
                </div>
              </Draggable>
            </Container>
          </div>	
        </div>
      </div>
      <div class="secondary">
        <div :style="{'marginLeft': '50px', 'flex': '1'}">
          <Container :behaviour="'copy'" :group-name="'1'" :get-child-payload="getChildPayload1">            
            <Draggable v-for="item in items1" :key="item.id">
              <div class="draggable-item">
                {{item.data}}
              </div>
            </Draggable>
          </Container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      items1: this.generateItems(15, i => ({
        id: '1' + i,
        data: `Source Draggable - ${i}`
      })),
      items2: this.generateItems(15, i => ({
        id: '2' + i,
        data: `Draggable 2 - ${i}`
      }))
    }
  },
  methods: {
    onDrop (collection, dropResult) {
      this[collection] = this.applyDrag(this[collection], dropResult)
    },
    getChildPayload1 (index) {
      return this.items1[index]
    },
    getChildPayload2 (index) {
      return this.items2[index]
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
    },
    generateItems (count, creator) {
      const result = []
      for (let i = 0; i < count; i++) {
        result.push(creator(i))
      }
      return result
    }
  }
}
</script>
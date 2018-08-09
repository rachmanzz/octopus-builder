<template>
  <section class="properties-item">
    <div v-if="editable">
      <el-form ref="form">
        <el-form-item label="Transform">
          <el-button-group>
            <el-button type="primary" @click="updateValue('transform', 'horizontal')">Mirror X</el-button>
            <el-button type="primary" @click="updateValue('transform', 'vertical')">Mirror Y</el-button>
            <el-button type="primary" @click="setResponsive">Auto Width</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item label="Image Gallery">
          <ImagePixabay :picked="setImage" />
        </el-form-item>
        <el-form-item label="Custom URL">
          <el-input v-model="content"></el-input>
        </el-form-item>
      </el-form>
    </div>
    
    <div v-else>
      Click element to set properties
    </div>
  </section>
</template>

<script>
import ImagePixabay from './ImagePixabay.vue'

export default {
  components: {
    ImagePixabay
  },
  computed: {
    payload () {
      return this.$store.state.properties
    }
  },
  watch: {
    payload (newValue, oldValue) {
      this.createProperties(newValue)
    },
    content (newValue, oldValue) {
      this.updateElement({
        content: newValue
      })
    }
  },
  data () {
    return {
      editable: false,
      props: '',
      element: '',
      content: '',
      style: ''
    }
  },
  methods: {
    setImage (image) {
      this.updateElement({
        content: image['largeImageURL']
      })
    },
    createProperties ({ payload }) {
      this.editable = true
      this.props = payload
      this.element = payload.element
      this.content = payload.content
      this.style = JSON.parse(payload.style)
    },
    updateValue (type, value) {
      this.updateElement({
        style: {
          attr: type,
          value: value
        }
      })
    },
    updateElement ({ style, content }) {
      const el = document.querySelector(`.${this.element}`)

      if (content) {
        el.src = content
      }

      if (style) {
        if (style.attr === 'transform') {
          const currentScale = el.style['transform']
          let value = 'scale(1, 1)'

          switch (style.value) {
            case 'vertical':
              if (currentScale === 'scale(1, -1)') {
                value = 'scale(1, 1)'
              } else {
                value = 'scale(1, -1)'
              }
              break

            default:
              if (currentScale === 'scale(-1, 1)') {
                value = 'scale(1, 1)'
              } else {
                value = 'scale(-1, 1)'
              }
              break
          }

          el.style[style.attr] = value
        } else {
          el.style[style.attr] = style.value
        }
      }
    },
    formatAsNumber (value) {
      return value.replace(/\..+/g, '')
    },
    setResponsive () {
      this.style['width'] = '100%'
      this.style['height'] = 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  padding: .8rem 1rem .6rem 1rem;
}
</style>

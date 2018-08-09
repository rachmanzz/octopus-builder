<template>
  <section class="properties-item">
    <div v-if="editable">
      <ImagePixabay :picked="setImage" />
      <el-form ref="form">
        <el-form-item label="Custom URL">
          <el-input v-model="content"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" plain @click="setResponsive">Set Responsive</el-button>
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
      if (value !== 'auto' && !value.match(/%/g)) {
        value = value.replace(/[^0-9,.]+/g, '')
      }
      if (type === 'width' || type === 'height') {
        if (value.match(/^[0-9]*$/g)) {
          value = value + 'px'
        }
      }
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
        el.style[style.attr] = style.value
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

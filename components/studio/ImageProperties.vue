<template>
  <section class="properties-item">
    <div v-if="editable">
      <b-form-group label="Image URL">
        <b-form-textarea
          rows="4"
          v-model="content"
          type="text"
          placeholder="Enter text">
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Width" description="in pixels">
        <b-form-input
          rows="4"
          v-model="style['width']"
          @input="updateValue('width', $event)"
          :formatter="formatAsNumber"
          type="text"
          placeholder="Enter text">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Height" description="in pixels">
        <b-form-input
          rows="4"
          v-model="style['height']"
          @input="updateValue('height', $event)"
          :formatter="formatAsNumber"
          type="text"
          placeholder="Enter text">
        </b-form-input>
      </b-form-group>
      <b-btn variant="default" @click="setResponsive">Set Responsive</b-btn>
    </div>
    <div v-else>
      Click element to set properties
    </div>
  </section>
</template>

<script>
export default {
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

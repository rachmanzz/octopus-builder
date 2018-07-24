<template>
  <section class="properties-item">
    <div v-if="editable">
      <b-form-group label="Content">
        <b-form-textarea
          rows="4"
          v-model="content"
          type="text"
          placeholder="Enter text">
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Color">
        <b-btn class="btn-picker" id="popoverButton-disableevent" variant="default">{{ style['color'] }}</b-btn>
        <b-popover ref="popover" target="popoverButton-disableevent" placement="bottom">
          <Sketch :value="picker" @input="updateValue('color', $event)" />
        </b-popover>
      </b-form-group>
      <b-form-group label="Font Size">
        <b-form-select
          :options="size"
          @change="updateValue('size', $event)"
          required>
        </b-form-select>
      </b-form-group>
    </div>
    <div v-else>
      Click element to set properties
    </div>
  </section>
</template>

<script>
import { Sketch } from 'vue-color'

let defaultProps = {
  hex: '#194d33',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
}

let fontSize = [
  { text: '12', value: '12px' },
  { text: '14', value: '14px' },
  { text: '16', value: '16px' },
  { text: '20', value: '20px' },
  { text: '24', value: '24px' },
  { text: '28', value: '28px' },
  { text: '30', value: '32px' },
  { text: '36', value: '36px' },
  { text: '48', value: '48px' },
  { text: '64', value: '64px' },
  { text: '72', value: '72px' },
  { text: '114', value: '114px' }
]

export default {
  components: {
    Sketch
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
      picker: defaultProps,
      props: '',
      element: '',
      content: '',
      style: '',
      size: fontSize
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
      if (type === 'color') {
        this.picker = value
        this.style['color'] = value.hex
        this.updateElement({
          style: {
            attr: 'color',
            value: value.hex
          }
        })
      }

      if (type === 'size') {
        this.style['size'] = value
        this.updateElement({
          style: {
            attr: 'fontSize',
            value: value
          }
        })
      }
    },
    updateElement ({ style, content }) {
      const el = document.querySelector(`.${this.element}`)

      if (content) {
        el.innerHTML = content
      }
      if (style) {
        el.style[style.attr] = style.value
      }
    }
  }
}
</script>

<style lang="scss">
.btn-picker {
  display: block;
  width: 100%;
  padding: 6px 12px;
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.popover-body .vc-sketch {
  box-shadow: none;
}
</style>

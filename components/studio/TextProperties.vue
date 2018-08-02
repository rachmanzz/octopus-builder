<template>
  <section class="properties-item">
    <div v-if="editable">
      <el-form ref="form">
        <el-form-item label="Alignment">
          <el-button-group>
            <el-button type="primary" @click="updateValue('text-align', 'left')">Left</el-button>
            <el-button type="primary" @click="updateValue('text-align', 'center')">Center</el-button>
            <el-button type="primary" @click="updateValue('text-align', 'right')">Right</el-button>
            <el-button type="primary" @click="updateValue('text-align', 'justify')">Justify</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item label="Content">
          <el-input type="textarea" rows="4" v-model="content"></el-input>
        </el-form-item>
        <el-form-item label="Text Fill">
          <el-color-picker
            v-model="picker"
            :predefine="predefineColors">
          </el-color-picker>
        </el-form-item>
        <el-form-item label="Background Fill">
          <el-color-picker
            v-model="picker"
            :predefine="predefineColors">
          </el-color-picker>
        </el-form-item>
        <el-form-item label="Font Size">
          <el-select v-model="value" placeholder="Select">
            <el-option
              v-model="sizeSelected"
              v-for="(item, index) in size"
              :key="index"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div v-if="hasEvent">
        <el-form-item label="Event">
          <el-select v-model="value" placeholder="Select">
            <el-option
              v-model="eventSelected"
              v-for="(item, index) in event"
              :key="index"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Event Payload">
          <el-input type="textarea" rows="4" v-model="eventPayload"></el-input>
        </el-form-item>
      </div>
    </div>
    <div v-else>
      Click element to set properties
    </div>
  </section>
</template>

<script>
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
  data () {
    return {
      editable: false,
      picker: '#ff4500',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      props: '',
      element: '',
      content: '',
      style: '',
      size: fontSize,
      sizeSelected: '16px',
      event: [{ text: 'Click', value: 'click' }],
      eventSelected: 'click',
      eventPayload: '',
      hasEvent: false
    }
  },
  methods: {
    createProperties ({ payload }) {
      this.editable = true
      this.props = payload
      this.element = payload.element
      this.content = payload.content
      this.style = JSON.parse(payload.style)
      this.hasEvent = payload.tag === 'BUTTON'
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

      if (type === 'text-align') {
        this.style['text-align'] = value
        this.updateElement({
          style: {
            attr: 'textAlign',
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
  }
}
</script>

<style lang="scss" scoped>
.btn {
  padding: .8rem;
}
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

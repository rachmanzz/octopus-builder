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
        <b-row>
          <b-col :cols="5">
            <el-form-item style="display: flex; margin-top: 1rem;" label="Text Fill">
              <el-color-picker
                v-model="textFill"
                :predefine="predefineFill"
                @change="updateValue('color', $event)">
              </el-color-picker>
            </el-form-item>
          </b-col>
          <b-col :cols="7">
            <el-form-item style="display: flex; margin-top: 1rem;" label="Background Fill">
              <el-color-picker
                v-model="backgroundFill"
                :predefine="predefineFill"
                @change="updateValue('background-color', $event)">
              </el-color-picker>
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col :cols="7">
            <el-form-item style="display: flex; margin-top: 1rem;" label="Font Size">
              <el-select
                v-model="sizeSelected"
                placeholder="Select"
                @change="updateValue('font-size', $event)"
                >
                <el-option
                  v-for="(item, index) in size"
                  :key="index"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </b-col>
        </b-row>
      </el-form>
      <div v-if="hasEvent">
        <el-form-item label="Event">
          <el-select v-model="eventSelected" placeholder="Select">
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
let sizeOptions = [
  { text: '12', value: 12 },
  { text: '14', value: 14 },
  { text: '16', value: 16 },
  { text: '18', value: 18 },
  { text: '20', value: 20 },
  { text: '22', value: 22 },
  { text: '24', value: 24 },
  { text: '26', value: 26 },
  { text: '28', value: 28 },
  { text: '30', value: 30 },
  { text: '32', value: 32 },
  { text: '34', value: 34 },
  { text: '36', value: 36 },
  { text: '42', value: 42 },
  { text: '48', value: 48 },
  { text: '64', value: 64 },
  { text: '72', value: 72 },
  { text: '96', value: 96 },
  { text: '114', value: 114 }
]

let eventOptions = [
  { text: 'Click', value: 'click' }
]

let fillOptions = [
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
]

export default {
  data () {
    return {
      editable: false,
      textFill: '',
      backgroundFill: '',
      predefineFill: fillOptions,
      props: '',
      element: '',
      content: '',
      style: '',
      size: sizeOptions,
      sizeSelected: 16,
      event: eventOptions,
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
      console.log(type, value)

      if (type === 'color') {
        this.style['color'] = value
        this.updateElement({
          style: {
            attr: 'color',
            value: value
          }
        })
      }

      if (type === 'background-color') {
        this.style['backgroundColor'] = value
        this.updateElement({
          style: {
            attr: 'backgroundColor',
            value: value
          }
        })
      }

      if (type === 'font-size') {
        this.style['font-size'] = value
        this.updateElement({
          style: {
            attr: 'fontSize',
            value: value + 'px'
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

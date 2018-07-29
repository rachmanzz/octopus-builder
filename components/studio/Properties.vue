<template>
  <section>
    <TextProperties v-if="proper.type === 'text'" />
    <ImageProperties v-else-if="proper.type === 'image'" />
    <section v-else>
      Click element to set properties
    </section>
  </section>
</template>

<script>
import TextProperties from './TextProperties.vue'
import ImageProperties from './ImageProperties.vue'

export default {
  components: {
    TextProperties,
    ImageProperties
  },
  data () {
    return {
      proper: {
        type: ''
      }
    }
  },
  computed: {
    properties () {
      return this.$store.state.properties
    }
  },
  watch: {
    properties (newValue, oldValue) {
      this.proper = newValue
    }
  }
}
</script>


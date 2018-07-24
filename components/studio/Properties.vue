<template>
  <b-card class="card-default" no-body>
    <b-card-header header-tag="header" role="tab" v-b-toggle.properties>
      Properties
    </b-card-header>
    <b-collapse id="properties" visible role="tabpanel">
      <b-card-body>
        <TextProperties v-if="$store.state.properties.type === 'text'" />
        <ImageProperties v-else-if="$store.state.properties.type === 'image'" />
        <section v-else>
          Click element to set properties
        </section>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import TextProperties from './TextProperties.vue'
import ImageProperties from './ImageProperties.vue'

export default {
  components: {
    TextProperties,
    ImageProperties
  }
}
</script>


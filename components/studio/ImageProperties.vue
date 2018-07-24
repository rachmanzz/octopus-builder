<template>
  <section class="properties-item">
    Image Properties
  </section>
</template>

<script>
export default {
  mounted () {
    const { payload } = this.$store.state.properties
    console.log(JSON.parse(payload.style))
  }
}
</script>

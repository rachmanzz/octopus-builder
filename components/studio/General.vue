<template>
  <section class="properties-item">
    <b-form-group label="Page Name">
      <b-form-input
        rows="4"
        v-model="page.name"
        type="text"
        placeholder="Enter text">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Route Path">
      <b-form-input
        rows="4"
        v-model="page.path"
        type="text"
        placeholder="Enter text">
      </b-form-input>
    </b-form-group>
    <b-form-group label="Published">
      <p-check
        class="p-default p-curve"
        color="success"
        off-color="default"
        v-model="publish"
        @change="change"
        toggle
      >
        Publish
        <label slot="off-label">Draft</label>
      </p-check>
    </b-form-group>
    <b-form-group label="Custom Code">
      <b-form-textarea
        rows="6"
        v-model="page.meta"
        type="text"
        placeholder="Enter text">
      </b-form-textarea>
    </b-form-group>
  </section>
</template>

<script>
export default {
  props: ['page'],
  data () {
    return {
      publish: 0
    }
  },
  computed: {
    published () {
      return this.page.published
    }
  },
  watch: {
    published (newVal) {
      this.publish = !!newVal
    }
  },
  methods: {
    change (evt) {
      this.page['published'] = this.publish + 0
    }
  }
}
</script>

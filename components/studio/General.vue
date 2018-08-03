<template>
  <section class="properties-item">
    <el-form ref="form">
      <el-form-item label="Name">
        <el-input v-model="page.name"></el-input>
      </el-form-item>
      <el-form-item label="Path">
        <el-input v-model="page.path"></el-input>
      </el-form-item>
      <el-form-item label="Custom CSS">
        <el-input type="textarea" rows="4" v-model="styles" @input="updateMeta('styles', $event)"></el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  props: ['page'],
  data () {
    return {
      styles: ''
    }
  },
  methods: {
    updateMeta (style, content) {
      if (!this.page['meta'][style]) {
        this.page['meta'][style] = ''
      }

      this.page['meta'][style] = content
    }
  }
}
</script>

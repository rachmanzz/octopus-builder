<template>
  <el-alert
    title=""
    center
    show-icon
    type="error"
    :closable="false">
    You have uncompleted configuration, please complete this config (<b>{{ error.join(', ') }}</b>) before run this app.
  </el-alert>
</template>

<script>
export default {
  props: ['error']
}
</script>


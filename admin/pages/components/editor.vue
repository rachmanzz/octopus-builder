<template>
  <div>
    <Monaco
      :width="editorWidth"
      :height="editorHeight"
      language="html"
      theme="vs"
      :code="content"
      @mounted="onMounted"
      @codeChange="onCodeChange"
      >
    </Monaco>
    <button @click="save">Save</button>
  </div>
</template>

<script>
import axios from 'axios'
import Monaco from 'monaco-editor-forvue'

export default {
  components: {
    Monaco
  },
  data () {
    return {
      content: '<!-- do stuff -->',
      contentChanged: '',
      editorWidth: 0,
      editorHeight: 0,
      file: null
    }
  },
  mounted () {
    const query = this.$route.query['file']
    const path = this.$store.state.allFiles[query]

    if (!path) {
      this.$router.push('/components')
    }

    axios.post('/api/components/read', {
      path: path['path']
    }).then(res => {
      this.file = path
      this.editor.setValue(res.data)
    })

    if (process.browser) {
      this.editorWidth = window.innerWidth - 80
      this.editorHeight = 500
    }
  },
  methods: {
    onMounted (editor) {
      this.editor = editor
    },
    onCodeChange (editor) {
      this.contentChanged = editor.getValue()
    },
    save () {
      axios.post('/api/components/write', {
        path: this.file['path'],
        string: this.contentChanged
      }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>

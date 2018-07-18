<template>
  <div class="content">
    <Navbar :data="navbar" />
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
    <Status :data="status" />
  </div>
</template>

<script>
import axios from 'axios'
import Monaco from 'monaco-editor-forvue'
import Navbar from '~/components/Navbar.vue'
import Status from '~/components/Status.vue'

export default {
  components: {
    Monaco,
    Navbar,
    Status
  },
  data () {
    return {
      navbar: {
        title: 'Editor',
        publish: true
      },
      status: {},
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
      this.navbar.title = path.fileName
      this.editor.setValue(res.data)
    })

    if (process.browser) {
      this.editorWidth = window.innerWidth - 250
      this.editorHeight = window.innerHeight - (57 * 2)
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

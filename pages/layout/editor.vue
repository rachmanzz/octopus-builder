<template>
  <section>
    <div class="content">
      <div class="content-flex">
        <div class="studio studio-layout" v-loading="loading">
          <Monaco
            language="html"
            theme="vs"
            :code="content"
            @mounted="onMounted"
            @codeChange="onCodeChange"
            >
          </Monaco>
        </div>
        <div class="properties">
          <div class="properties-item" style="padding: 0 1.5rem;">
            <br>
            <el-card shadow="never">
              <div slot="header" class="clearfix">
                <span>Layouts Guide</span>
                <el-button style="float: right; padding: 3px 0" type="text">Learn More</el-button>
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, culpa quas ducimus laborum unde assumenda accusantium reprehenderit quis at nihil voluptates nostrum voluptas tenetur dolores perferendis? Hic est laboriosam ipsa.
            </el-card>
            <br>
            <el-form ref="form">
              <el-form-item>
                <el-button plain @click="handleCancel">Cancel</el-button>
                <el-button type="success" plain @click="handleSave">Save Layout</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Monaco from 'monaco-editor-forvue'
import Navbar from '~/components/global/Navbar.vue'
import Status from '~/components/global/Status.vue'

export default {
  head: {
    title: 'Editor - Octopus Builder',
    bodyAttrs: {
      class: 'content-editor'
    }
  },
  components: {
    Monaco,
    Navbar,
    Status
  },
  data () {
    return {
      navbar: {
        title: 'Editor',
        save: true
      },
      loading: true,
      content: '<!-- do stuff -->',
      contentChanged: '',
      editorWidth: 0,
      editorHeight: 0,
      file: {}
    }
  },
  methods: {
    onMounted (editor) {
      this.editor = editor

      const query = this.$route.query['file']
      const file = this.$store.state.files[query]

      if (!file) {
        this.$router.push('/layout')
      } else {
        axios.post('/core/component', {
          path: file['path']
        }).then(res => {
          console.log(this.file)
          this.file = file
          this.$store.commit('SET_TITLE', file['file'])
          this.loading = false

          editor.setValue(res.data)
        })
      }
    },
    onCodeChange (editor) {
      this.contentChanged = editor.getValue()
    },
    handleSave () {
      axios.put('/core/component', {
        path: this.file['path'],
        string: this.contentChanged
      }).then(res => {
        this.$message({
          message: `File ${this.file.name} saved`,
          type: 'success'
        })
        setTimeout(() => this.$router.push('/layout'), 500)
      })
    },
    handleCancel () {
      this.$router.push('/layout')
    }
  }
}
</script>

<style>
.editor {
  width: calc(100vw - 300px);
  height: calc(100vh - 56px);
}
</style>

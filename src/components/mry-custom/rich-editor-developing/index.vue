<template>
  <textarea :id="tinymceId" />
</template>

<script lang="ts">
import type { PropType } from 'vue'
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  unref,
  watch,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from 'vue'
import type { Editor, RawEditorSettings } from 'tinymce'
import tinymce from 'tinymce/tinymce'

import '~/public/tinymce/plugins/axupimgs/plugin.js'

import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/image'
import 'tinymce/plugins/toc'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'

import { v4 as uuidv4 } from 'uuid'
import { plugins as initialPlugins, toolbar as initialToolbar, fontFormats } from './tinymce'
import { api_upload_file_with_server } from '~/src/api/upload'

type Recordable<T = any> = Record<string, T>

export default defineComponent({
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object as PropType<Partial<RawEditorSettings>>,
      default: () => ({}),
    },
    toolbar: {
      type: String,
      default: initialToolbar,
    },
    plugins: {
      type: Array as PropType<string[]>,
      default: initialPlugins,
    },
    height: {
      type: [Number, String] as PropType<string | number>,
      required: false,
      default: 400,
    },
    width: {
      type: [Number, String] as PropType<string | number>,
      required: false,
      default: 'auto',
    },
    tinymceFlag: {
      type: [Number, String] as PropType<string | number>,
      default: 1,
    },
    fileLimitSize: {
      type: Number,
      default: 10,
      required: false,
    },
  },
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const tinymceId = ref<string>(uuidv4())
    const editorRef = ref<Editor>()

    const initOptions = computed((): RawEditorSettings => {
      const publicPath = '/'

      const { height, options, toolbar, plugins } = props
      return {
        selector: `#${tinymceId.value}`,
        language_url: `${publicPath}tinymce/langs/zh-Hans.js`,
        language: 'zh-Hans',
        skin_url: `${publicPath}tinymce/skins/ui/oxide`,
        content_css: `${publicPath}tinymce/skins/ui/oxide/content.min.css`,
        images_upload_handler: handleImgUpload,
        images_file_types: 'jpeg,jpg,png,gif,bmp,webp', // 准许的图片格式
        many_images_upload_handler: (blobInfo: any, succFun: any, failFun: any) => {
          return multipartImgUpload(blobInfo, succFun, failFun)
        },
        convert_urls: false,
        branding: false, // 隐藏品牌，隐藏状态栏中显示的“ Powered by Tiny ”链接
        placeholder: '请输入内容', // 占位符
        toolbar,
        plugins: [...plugins],
        height,
        toolbar_mode: 'sliding',
        toolbar_sticky: true,
        paste_block_drop: true, // 禁用将内容拖放到编辑器中
        paste_data_images: false, // 粘贴data格式的图像 谷歌浏览器无法粘贴
        font_formats: fontFormats,
        paste_retain_style_properties: 'color border border-left border-right border-bottom border-top', // MS Word 和类似 Office 套件产品保留样式
        paste_webkit_styles: 'none', // 允许在 WebKit 中粘贴时要保留的样式
        paste_tab_spaces: 2, // 将制表符转换成空格的个数
        content_style: `
          html, body                { height:100%; }
          img                       { max-width:100%; display:block;height:auto; }
          a                         { text-decoration: none; }
          p                         { line-height:1.6; margin: 0px; }
          table                     { word-wrap:break-word; word-break:break-all;max-width:100%; border:none; border-color:#999; }
          .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
          ul,ol                     { list-style-position:inside; }
          `,
        ...options,
        setup: (editor: Editor) => {
          editorRef.value = editor
          editor.on('init', initSetup)
        },
      }
    })

    onMounted(() => {
      tinymce.init(initOptions.value)
    })

    onBeforeUnmount(() => {
      destory()
    })

    onActivated(() => {
      tinymce.init(initOptions.value)
    })

    onDeactivated(() => {
      destory()
    })

    function destory() {
      if (tinymce !== null) {
        tinymce?.remove?.(unref(initOptions).selector!)
      }
    }

    // 图片上传自定义逻辑
    async function handleImgUpload(blobInfo: any, success: any, failure: any, progress: any) {
      console.log('blobInfo', blobInfo.blob(), blobInfo.filename())
      const file = blobInfo.blob()

      const isLessLimitSize = file.size / 1024 / 1024 < props.fileLimitSize
      const fileType = file.type

      const matchedFileType = fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif'

      if (!isLessLimitSize) {
        return failure(`上传图片大小不能超过${props.fileLimitSize}MB!`)
      } else if (!matchedFileType) {
        return failure('只能上传jpg/png/gif文件!')
      }

      const res = await api_upload_file_with_server(file)

      if (res.code === 200) {
        return success(res.data.url)
      }
      return failure('网络错误')
    }

    // 编辑器初始化
    function initSetup() {
      const editor = unref(editorRef)
      if (!editor) {
        return
      }
      const value = props.value || ''

      editor.setContent(value)
      bindModelHandlers(editor)
    }

    function setValue(editor: Recordable, val: string, prevVal?: string) {
      if (editor && typeof val === 'string' && val !== prevVal && val !== editor.getContent()) {
        editor.setContent(val)
      }
    }

    function bindModelHandlers(editor: any) {
      watch(
        () => props.value,
        // @ts-ignore
        (val: string, prevVal: any) => setValue(editor, val, prevVal),
        { immediate: true },
      )
      watch(
        () => props.disabled,
        val => {
          editor.setMode(val ? 'readonly' : 'design')
        },
        { immediate: true },
      )
      editor.on('change keyup undo redo', () => {
        const content = editor.getContent()
        emit('update:value', content)
        emit('change', content)
      })
    }

    async function multipartImgUpload(blobInfo: any, succFun: any, failFun: any) {
      const file = blobInfo.blob()

      const isLessLimitSize = file.size / 1024 / 1024 < props.fileLimitSize
      const fileType = file.type
      const matchedFileType = fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif'
      if (!isLessLimitSize) {
        return failFun(`上传图片大小不能超过${props.fileLimitSize}MB!`)
      } else if (!matchedFileType) {
        return failFun('只能上传jpg/png/gif文件!')
      }
      const res = await api_upload_file_with_server(file)
      if (res.code === 200) {
        return succFun(res.data.url)
      }
      return null
    }
    return {
      tinymceId,
    }
  },
})
</script>
./rich-editor/tinymce ~/public/tinymce/plugins/axupimgs/plugin.cjs

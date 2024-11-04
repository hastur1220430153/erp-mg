import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
const { copy, isSupported } = useClipboard()

/**
 * boolean组合式函数
 * @param initValue 初始值
 */
export default function useBoolean() {
  /**
   * @desc 复制功能
   */
  function handleCopy(source: string) {
    if (!isSupported) {
      window.$message?.error('您的浏览器不支持Clipboard API')
      return
    }
    if (!source) {
      window.$message?.error('请输入要复制的内容')
      return
    }
    copy(source)
    window.$message?.success(`复制成功：${source}`)
  }

  /**
   * @desc 在币安链浏览器中查看
   */
  function viewOnBiancescan(source: string) {
    const biancescan = `https://bscscan.com/tx/${source}`
    console.log(source)
    window.open(biancescan, '_blank')
  }

  /**
   * @desc 导出 excel
   */
  function handleExportExcel(res: any) {
    if (res) {
      const link = document.createElement('a')
      // 默认的未知类型
      // @ts-ignore
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      let num = ''
      for (let i = 0; i < 10; i++) {
        num += Math.ceil(Math.random() * 10)
      }
      link.setAttribute('download', `_${num}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.$message?.error('导出失败')
    }
  }

  return { handleCopy, viewOnBiancescan, handleExportExcel }
}

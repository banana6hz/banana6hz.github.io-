:::tip 导出 zip
此文介绍的是 excel 的相关功能

- upload excel to table
- export table to excel
- export table to zip
- export excel to zip
  由于 js-xlsx 体积还是很大的，导出功能也不是一个非常常用的功能，所以使用懒加载

📦： xlsx file-saver script-loader jszip
:::

---

首先安装依赖 `npm install xlsx file-saver script-loader jszip -S`

## Upload

1. upload componenet: 嫌弃太丑了，可以直接`display:none`掉这个 input 框，然后通过点击一个自定义 button,去触发这个 input 框的点击事件

```js
<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDropover" @dragenter="handleDropover">
      Drop excel file here or
      <el-button :loading="loading" style="margin-left: 16px" size="mini" @click="handleUpload">Browse</el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    beforeUpload: Function,
    // eslint-disable-next-line vue/require-default-prop
    onSuccess: Function
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagetion()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }

      this.upload(rawFile)
      e.stopPropagetion()
      e.preventDefault()
    },
    handleDropover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const file = e.target.files
      const rawFile = file[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
```

2. upload page

```js
<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/upload-excel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
```

## Export

1. 创建导出方法

```js
import { saveAs } from 'file-saver'
import XLSX from 'xlsx'
import JSZip from 'jszip'
// tablelist导出excel
export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
} = {}) {
  // origin data
  filename = filename || 'excel=list'
  data = [...data]
  data.unshift(header)

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  var ws_name = 'SheetJS'
  var wb = new Workbook()
  var ws = sheet_from_array_of_arrays(data)
  // 当需要合并单元格时可以使用merge
  // eg:merge = ['A1:A2', 'B1:D1', 'E1:E2'] 合并A1-A2,B1-D1,E2-E2
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  if (autoWidth) {
    /* 设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /* 先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        }
      } else if (val.toString().charCodeAt(0) > 255) {
        /* 再判断是否为中文*/
        return {
          'wch': val.toString().length * 2
        }
      } else {
        return {
          'wch': val.toString().length
        }
      }
    }))
    /* 以第一行为初始值*/
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch']
        }
      }
    }
    ws['!cols'] = result
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws
  console.log('ba-wb', wb)

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), `${filename}.${bookType}`)
}
// tablelist导出excel到zip
export function export_excel_to_zip(
  {
    multiHeader = [],
    header,
    data,
    filename,
    zipName,
    merges = [],
    autoWidth = true,
    bookType = 'xlsx'
  } = {}
) {
// origin data
  filename = filename || 'excel=list'
  data = [...data]
  data.unshift(header)

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  var ws_name = 'SheetJS'
  var wb = new Workbook()
  var ws = sheet_from_array_of_arrays(data)

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  if (autoWidth) {
  /* 设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
    /* 先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        }
      } else if (val.toString().charCodeAt(0) > 255) {
      /* 再判断是否为中文*/
        return {
          'wch': val.toString().length * 2
        }
      } else {
        return {
          'wch': val.toString().length
        }
      }
    }))
    /* 以第一行为初始值*/
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch']
        }
      }
    }
    ws['!cols'] = result
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws
  console.log('ba-wb', wb)

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })

  const blob = new Blob([s2ab(wbout)])

  const zip = new JSZip()
  const txt_name = filename || 'file'
  const zip_name = zipName || 'file'
  zip.file(`${txt_name}.${bookType}`, blob)
  // zip.file(`${txt_name}2.${bookType}`, blob) // 如果想压缩多个文件到一个包
  zip.generateAsync({
    type: 'blob'
  }).then((blob) => {
    saveAs(blob, `${zip_name}.zip`)
  }, (err) => {
    alert('导出失败:', err)
  })
}

// 导出txt到zip
export function export_txt_to_zip(th, jsonData, txtName, zipName) {
  const zip = new JSZip()
  const txt_name = txtName || 'file'
  const zip_name = zipName || 'file'
  const data = jsonData
  let txtData = `${th}\r\n`
  data.forEach((row) => {
    let tempStr = ''
    tempStr = row.toString()
    txtData += `${tempStr}\r\n`
  })
  zip.file(`${txt_name}.txt`, txtData)
  zip.generateAsync({
    type: 'blob'
  }).then((blob) => {
    saveAs(blob, `${zip_name}.zip`)
  }, (err) => {
    alert('导出失败:', err)
  })
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

function sheet_from_array_of_arrays(data) {
  var ws = {}
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }

  for (var R = 0; R !== data.length; ++R) {
    // 每一行
    for (var C = 0; C !== data[R].length; ++C) {
      // 每一列
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      var cell = {
        v: data[R][C] // 某一行某一列的值
      }
      if (cell.v == null) continue // 如果值为null 则跳过
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      }) // 输出表格的位置，eg: 第二行第二列为B2，第三行第四列为D3

      // 处理每个cell的type
      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function datenum(v, date1904) {
  if (date1904) v += 1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}
```

2. 页面中使用

```js
//code
<el-button style="margin-bottom:20px;" type="primary" icon="el-icon-document" @click="handleDownloadTxtZip">
  Export Txt Zip
</el-button>
<el-button style="margin-bottom:20px;" type="primary" icon="el-icon-document" @click="handleDownloadExcelZip">
  Export Excel Zip
</el-button>
// code
handleDownloadExcelZip() {
  this.downloadLoading = true
  import('@/vendor/export').then(zip => {
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
    const list = this.list
    const data = this.formatJson(filterVal, list)
    zip.export_excel_to_zip({
      header: tHeader,
      data,
      filename: this.filename,
      zipName: 'ZIP',
      autoWidth: this.autoWidth,
      bookType: this.bookType
    })
    this.downloadLoading = false
  })
},
handleDownloadTxtZip() {
  this.downloadLoading = true
  import('@/vendor/export').then(zip => {
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
    const list = this.list
    const data = this.formatJson(filterVal, list)
    zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
    this.downloadLoading = false
  })
}
formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
// code
```

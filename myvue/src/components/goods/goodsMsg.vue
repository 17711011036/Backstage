<template>
  <div>
    <!-- 引用表单信息标题的组件 -->
    <tableInfo :tableInfo="tableInfo"></tableInfo>
    <!--引用表格的组件
          tableTitles：表标题
          router：node路由地址
          operationBtns：操作按钮
          searchBtns：搜索和新增按钮
          formElement：表单元素（input和select）
     -->
    <appTable :tableTitles="tableTitles" :router="router" :operationBtns="operationBtns" :searchBtns="searchBtns" :formElement="formElement" :popTitles="popTitles"></appTable>
  </div>
</template>

<script>
import appTable from '../tableComponents/table'
import tableInfo from '../tableComponents/tableInfo'
  export default {
    name: 'goodsMsg',
    data () {
      return {
        // 表单信息标题
        tableInfo: '商品信息',
        // 表标题
        tableTitles: ['商品ID', '商品名称', '商品图片', '商品价格', '商品类别', '上架时间', '状态'],
        // 弹出层标题
        popTitles: {
          'goods_ID': '商品ID',
          'cate_ID': '商品类别',
          'goodsName': '商品名称',
          'goodsImg': '商品图片',
          'goodsPrice': '商品价格',
          'is_shelves': '是否上架',
          'is_hot': '是否热销',
          'is_recom': '是否推荐',
          'is_new': '是否新品',
          'is_sales':  '是否促销',
          'salesTime': '促销时间',
          'inventory': '库存量',
          'goodsStatus': '状态',
        },
        // node路由地址
        router: '/getgoodsmsg.do',
        // 表格按钮 text：按钮内容 className：按钮类
        // fn:表示要调用增删改查的函数
        //      其中fnName是函数名字
        //        查看 -- view
        //        修改 -- modify
        //        删除 -- delete
        //        新增 -- insert
        //        查询 -- query
        //        上/下架/发货/退款/加精/置顶/启动/禁用 -- status
        //      其中fnArg为参数（要连接的后台路由地址），没有参数（查看和查询按钮）就直接写fnArg: ''
        // 其中small，large表示按钮大小，lightGreen（浅绿），darkGreen（深绿），gray（下架）表示按钮颜色
        // operationBtns是表格操作部分的按钮是（使用小按钮small类）
        // searchBtns是查询部分的按钮（使用大按钮large类）
        operationBtns: [
          {text: '上架', className: 'small lightGreen', fn: {fnName: 'status', fnArg: '/onstatus.do'}},
          {text: '下架', className: 'small gray', fn: {fnName: 'status', fnArg: '/unstatus.do'}},
          {text: '查看', className: 'small lightGreen', fn: {fnName: 'view', fnArg: ''}},
          {text: '修改', className: 'small lightGreen', fn: {fnName: 'modify', fnArg: '/goodsmodify.do'}},
          {text: '删除', className: 'small darkGreen', fn: {fnName: 'delete', fnArg: '/goodsdelete.do'}}
        ],
        searchBtns: [
          {text: '查询', className: 'large lightGreen', fn: {fnName: 'query', fnArg: ''}},
          {text: '新增', className: 'large darkGreen', fn: {fnName: 'insert', fnArg: '/addgoodsinfo.do'}}
        ],
        // 表单元素信息，isInput：是否是input元素，如果是select就写false
        // content：是传送的内容
        // 如果是input就是描述文字
        // 如果是select就写一个对象，传你的value值
        formElement: {
          isInput: true,
          contents: '请输入商品名称' // --input传值
          // contents: ['新品', '优惠', '其他值']
        }
      }
    },
    components: {
      appTable,
      tableInfo
    }
  }
</script>

<style>

</style>

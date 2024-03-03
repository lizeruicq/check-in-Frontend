<!-- 架构页面 -->
<template>
    <div class="tablewrapper">
      <!-- <Search></Search> -->
      <Table ref="table"></Table>
      <div class="subHead pad-30">
          <!-- 新增 -->
          <AddButton @handleAdd="handleAdd" :text="text"></AddButton>
          <!-- end -->
        </div>
      <Add
  ref="add"
      :title="title"
      :formData="formData"
      :dialogFormVisible="dialogFormVisible"
      @handleClose="handleClose"
      ></Add>     
    </div>
  </template>
  <script setup>
  import Table from "./components/table.vue";
  import Search from "./components/search.vue";
  // 新增按钮
import AddButton from "@/components/AddButton/index.vue"
import Add from "./components/add.vue"
//   import Header from "./components/Header.vue";
import { ref, reactive, onMounted } from "vue"

const add = ref()
let formData = ref({})
let title = ref("")
let dialogFormVisible = ref(false)
const table = ref("")
const text = ref("新增")


const handleAdd = () => {
  title.value = "新增记录"
  dialogFormVisible.value = true
  // table.value.handleAdd()
}

//   const handleAdd = () => {
//   // title.value = "新增记录"
//   // dialogFormVisible.value = true
// }
const handleClose = () => {
  dialogFormVisible.value = false
}

  </script>
  <style lang="scss" scoped>
  .layoutsWrapper {
    
  }
  </style>
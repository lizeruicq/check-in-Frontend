<template>
    <div class="bg-wt radius marg-tp-20">
      <div class="pad-30 searchForm">
        <el-form ref="ruleForm" :inline="true" :model="searchData">
          <el-row :gutter="5">
            <!-- <el-col :span="3">
              <el-form-item label="用户姓名" prop="name">
                <el-input
                  placeholder="请输入"
                  v-model="searchData.name"
                />
              </el-form-item>
            </el-col> -->
            <el-col :span="7">
              <el-form-item label="工号" prop="username">
                <el-input placeholder="请输入" clearable v-model="searchData.username" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="需求号" prop="rdmno">
                <el-input placeholder="请输入" clearable v-model="searchData.rdmno" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="起始日期" prop="startdate">
                <el-input placeholder="请输入" clearable v-model="searchData.startdate" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="终止日期" prop="enddate">
                <el-input placeholder="请输入" clearable v-model="searchData.enddate" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12"> -->
              <div class="btn" >
                <el-button class="button primary" @click="handleSearch"
                  >搜索</el-button
                >
                <el-button class="button buttonSub" @click="handleReset(ruleForm)"
                  >重置</el-button
                >
              </div>
            <!-- </el-col> -->
          </el-row>
        </el-form>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from "vue";
  // 公用数据
  import { statusData } from "@/utils/commonData";
  // 获取父组件值、方法
  const props = defineProps({
    // 搜索对象
    searchData: {
      type: Object,
      default: () => ({}),
    },
  });
  // ------定义变量------
  const emit = defineEmits(); //子组件获取父组件事件传值
  const ruleForm = ref(); //定义搜索表单的ref
  // ------定义方法------
  // 搜索
  const handleSearch = () => {
    emit("handleSearch");//触发父组件的handleSearch方法，执行搜索
  };
  // 重置搜索表单
  const handleReset = (ruleForm) => {
    ruleForm.resetFields(); //重置表单
    emit('getList') // 重置搜索表单后，重新获取列表，刷新列表
  };
  </script>

  <style>
  .btn {
       /* padding-top:10px */
  }
  .bg-wt{
    margin-right: 0;
  }
</style>
<template>
      <div class="bg-wt radius marg-tp-20">
    <div class="pad-30 searchForm">
      <el-form ref="ruleForm" :inline="true" :model="searchData">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="RDM需求号" prop="rdmNo">
              <el-input
                placeholder="请输入需求号"
                v-model="searchData.rdmNo"
                clearable
                class="el-input"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <div class="btn">
              <el-button class="button primary" @click="handleSearch"
                >搜索</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  // 搜索对象
  searchData: {
    type: Object,
    default: () => ({}),
  },
});

const handleSearch = () => {
  emit("handleSearch");
};

</script>
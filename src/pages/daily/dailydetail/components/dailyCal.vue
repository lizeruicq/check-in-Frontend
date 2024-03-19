<template>
    <el-form
    :model="dailyCalData"
    ref="dailyCalRef"
    label-width="100px"
    class = "searcn"
    :inline="true"
    :rules="rules"
    v-loading="loading"
    >
    <div>
    <el-form-item label="姓名" prop="name">
      <el-input
            v-model="dailyCalData.name"
            placeholder="请输入"
          />
    </el-form-item>

    <el-form-item label="工号" prop="username">
      <el-input
            v-model="dailyCalData.username"
            placeholder="请输入"
          />
    </el-form-item>

    <el-form-item label="开始日期" prop="startdate">
      <el-input
            v-model="dailyCalData.startdate"
            placeholder="XXXX-XX-XX"
          />
    </el-form-item>

    <el-form-item label="结束日期" prop="enddate">
      <el-input
            v-model="dailyCalData.enddate"
            placeholder="XXXX-XX-XX"
          />
    </el-form-item>

    <el-form-item label="非工作日天数" prop="dayoffnums">
      <el-input
            v-model="dailyCalData.dayoffnums"
            placeholder="请输入"
          />
    </el-form-item>

    <el-form-item class="btn_cal">
      <el-button class="button primary" @click="handleCal">计算</el-button>
      <el-button class="button buttonSub" @click="handleReset(dailyCalRef)">重置</el-button>
    </el-form-item>
  </div>

  <div class = "result">
  <el-descriptions
  size = "medium"

  title="计算结果">
  <el-descriptions-item label="工号:">{{dailyCalRe.username}}</el-descriptions-item>
  <el-descriptions-item label="姓名:">{{dailyCalRe.name}}</el-descriptions-item>
  <el-descriptions-item label="应工作人天:">{{dailyCalRe.standarddays}}</el-descriptions-item>
  <el-descriptions-item label="工作总人天:">{{dailyCalRe.totledays}}</el-descriptions-item>
  <el-descriptions-item label="结余人天:">{{dailyCalRe.leftdays}}</el-descriptions-item>
  <el-descriptions-item label="抵扣后的工作日加班:">{{dailyCalRe.workdayot}}</el-descriptions-item>
  <el-descriptions-item label="抵扣后的非工作日加班:">{{dailyCalRe.offdayot}}</el-descriptions-item>
  </el-descriptions>
  </div>
    
  </el-form>
</template>

<script setup>
import { ref,reactive } from 'vue';
import {calDaily} from "@/api/daily";
import { ElMessage } from "element-plus"

const dailyCalRef = ref(); //定义搜索表单的ref
const loading = ref(false);
const rules = reactive(
  {
    username: [
      { required: true, message: "请输入工号", trigger: "blur" },
    ],
    startdate: [
      { required: true, message: "请输入开始日期", trigger: "blur" },
    ],
    enddate: [
      { required: true, message: "请输入结束日期", trigger: "blur" },
    ],
    dayoffnums: [
      { required: true, message: "请输入非工作日天数", trigger: "blur" },
    ],
  }
)


const handleReset = (dailyCalRef) => {
  dailyCalRef.resetFields(); //重置表单
  clearresult();
  };

const clearresult = ()=>{
  dailyCalRe.username='';
  dailyCalRe.name='';
  dailyCalRe.standarddays='';
  dailyCalRe.totledays='';
  dailyCalRe.leftdays='';
  dailyCalRe.workdayot='';
  dailyCalRe.offdayot=''

}

 const handleCal = async()=>{
   const valid = await dailyCalRef.value.validate()
   if(valid)
   {
    clearresult();
    loading.value = true;
      await calDaily(dailyCalData).then((res) =>
      {
        if (res.code === 200) {
          loading.value = false;
          {
        ElMessage({
            message: "计算完成",
            type: "success",
              
      })
    }
          dailyCalRe = Object.assign(dailyCalRe, res.data);
      }
      else
      {
        loading.value = false;
        ElMessage({
            message: res.msg,
              type: "error",
      })
    } }).catch((err) => {
      loading.value = false;
    });
 }
 else
    {
      ElMessage({message: "请检查查询内容!"})
    }
  }

  const dailyCalData = reactive({
  // name: "",
  // username: "",
  // startdate: "",
  // enddate: "",
  // dayoffnums: "",
});

const dailyCalRe = reactive({
  // username: "无",
  // name: "无",
  // standarddays: "无",
  // totledays: "无",
  // leftdays: "无",
  // workdayot: "无",
  // offdayot: "无",
});
   

</script>
<style>
.searcn {
    margin: 20px;
  }
.btn_cal {
    margin-inline: 24px;
  }
.result {
  margin: 20px;
}

</style>
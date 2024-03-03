<template>
    <el-dialog
    v-model="props.dialogFormVisible"
    :title = "title"
    :before-close = "handleClose"
    >

    <el-form
    :model = "formData"
    ref = "ruleFormRef"
    :rules="rules"
      label-width="105px"
      class="demo-ruleForm"
      label-position="right"
    >

    <el-form-item label="日期：" prop="date">
        <div class="el-input">
          <el-input
            v-model="formData.date"
            placeholder="XXXX-XX-XX"
          />
          <!-- <span class="numText" :class="dateNumVal === 0 ? 'tip' : ''"
            >{{ dateNumVal }}/20</span
          > -->
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="button buttonPrimary" @click="handleClose"
          >取消</el-button
        >
        <el-button class="button primary" v-preventReClick
          >保存</el-button
        >
      </span>
    </template>
    </el-dialog>

</template>

<script setup>
import { ref, reactive, nextTick, watch } from "vue";
import { ElMessage } from "element-plus";
// import { validateTextLength } from "@/utils/index.js";

// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  dialogFormVisible: {
    type: Boolean,
    default: false,
  },
  //标题
  title: {
    type: String,
    default: "",
  },
  // 表单数据
  formData: {
    type: Object,
    default: () => ({}),
  },
});

// ------定义变量------
const emit = defineEmits(); 
const ruleFormRef = ref(); 

  // 关闭弹层
const handleClose = () => {
  ruleFormRef.value.resetFields(); //清空表单数据
  emit("handleClose");
};

// const dateTextInput = () => {
//   nextTick(() => {
//     props.formData.date = value.val;
//   });
// };


watch(
  () => props.formData,
  (newValue, oldValue) => {
    // 课程名称默认的字数
    const value = newValue.date
  }
);
const rules = reactive({
    date:[
        { required: true,
             message: '请输入日期',
              trigger: 'blur' 
            },
        { type: 'date',
         message: '日期格式不正确', 
         trigger: 'blur' }
    ]
  }
  )



</script>
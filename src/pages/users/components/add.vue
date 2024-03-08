<template>
    <el-dialog
    v-model="props.dialogFormVisible"
    :title="title"
    :before-close="handleClose">
    <el-form :model="formData"
      ref="ruleFormRef"
      label-width="80px"
      class="demo-ruleForm"
      :rules = "rules"
      algin="right">

      <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入姓名"
          />
        </el-form-item>

        <el-form-item label="工号" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入工号"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <el-form-item label="角色" prop="role">
  <el-select v-model="formData.role" placeholder="请选择角色">
    <el-option v-for="item in roleNames" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</el-form-item>



    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button class="button buttonPrimary" @click="handleClose"
          >取消</el-button
        >
        <el-button class="button primary" v-preventReClick @click="handleSubmit"
          >保存</el-button
        >
      </span>
    </template>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, nextTick, watch, onMounted } from "vue"
import { ElMessage } from "element-plus"
import { editUser, saveUser} from "@/api/user.js"

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
})


watch(
  // () => props.formData,
  // (newValue, oldValue) => {
  //   const value = validateLength(newValue.name, 20);
  //   nameNumVal.value = value.numVal;
  // }
)
// ------定义变量------
const emit = defineEmits() //子组件获取父组件事件传值
const ruleFormRef = ref() //表单校验ref
const roleNames = reactive([
  { id: 1, name: '初级测试工程师' },
  { id: 2, name: '中级测试工程师' },
  { id: 3, name: '高级测试工程师' },
  { id: 0, name: '管理员' },
])
const nameNumVal = ref(0) //后台用户名称字数


const rules = reactive({
  name:[{
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  }]
  
})

onMounted(() => {
//   getRoleList().then((res) => {
//     roleNames.push(...res.data)
//   })
})
// 关闭弹层
const handleClose = () => {
  console.log(props.formData.id)
  ruleFormRef.value.resetFields() //清空表单数据
  nameNumVal.value = 0
  emit("handleClose")
}

const handleSubmit = async () => {
  const valid = await ruleFormRef.value.validate()
  console.log(valid)
  if (valid) {
    // 新增接口
    let params = {
      ...props.formData,
    }
  
  if(props.formData.id == undefined){
    await saveUser(params)
        .then((res) => {
          if (res.code === 200) {
            ElMessage({

              message: "新增成功!",
              type: "success",
              showClose:false,
            })
            ruleFormRef.value.resetFields() //清空表单数据
            handleClose()
            // 刷新列表
            emit("getList")
    
  }
  else{
    ElMessage({
            message: res.data.msg,
              type: "error",
              showClose:false,
      })
    }
  }).catch((err) => { })
      
}
else{
  // 编辑接口
  await editUser(params)
        .then((res) => {
          if (res.code === 200) {
            ElMessage({

              message: "编辑成功!",
              type: "success",
              showClose:false,
            })
            ruleFormRef.value.resetFields() //清空表单数据
            handleClose()
            // 刷新列表
            emit("getList")
          }
        })
        .catch((err) => { })
}
}else
{
  ElMessage({

message: "表单提交错误!",
})
}
}



</script>
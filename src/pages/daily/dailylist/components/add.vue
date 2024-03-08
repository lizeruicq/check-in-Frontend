<template>
    <el-dialog
      v-model="props.dialogFormVisible"
      :title="title"
      :before-close="handleClose"
    >
      <el-form
        :model="formData"
        ref="ruleFormRef"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        algin="right"
      >
        <el-form-item label="日期" prop="date">
          <el-input
            v-model="formData.date"
            placeholder="XXXX-XX-XX"
          />
        </el-form-item>
        
        <el-form-item label="考勤类别" prop="datetype">
            <el-select
              v-model="formData.datetype"
              placeholder="请选择"
            >
            <!-- <el-option label="工作日" value="工作日"></el-option>
            <el-option label="非工作日" value="非工作日"></el-option> -->
            <el-option v-for="item in datetypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="上班时间" prop="ondutytime">
          <el-input
            v-model="formData.ondutytime"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="下班时间" prop="offdutytime">
          <el-input
            v-model="formData.offdutytime"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="需求号1" prop="rdmno1">
          <el-input
            v-model="formData.rdmno1"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="需求号2" prop="rdmno2">
          <el-input
            v-model="formData.rdmno2"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="需求号3" prop="rdmno3">
          <el-input
            v-model="formData.rdmno3"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="工作人天" prop="worklength">
          <el-input
            v-model="formData.worklength"
            placeholder="请输入"
          />
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button class="button buttonPrimary" @click="handleClose"
            >取消</el-button>
          <el-button class="button primary" v-preventReClick @click="handleSubmit"
            >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  <script setup>
  import { ref, reactive, watchEffect, watch, onMounted } from "vue"
  import { ElMessage } from "element-plus"
  // 控制字节数
//   import { validateLength } from "@/utils/index.js"
  import { useUserStore } from "@/store"
  // 接口api
  import { editDaily, saveDaily} from "@/api/daily.js"
  
  const store = useUserStore()
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
  
  const pad = (n) => (n < 10? `0${n}` : n)
  const getCurrentDate = ()=> {
      let now = new Date();
      let year = now.getFullYear();
      let month = pad(now.getMonth() + 1);
      let day = pad(now.getDate());
      return year + "-" + month + "-" + day;
    }


  // ------定义变量------
  const emit = defineEmits() //子组件获取父组件事件传值
  const ruleFormRef = ref() //表单校验ref
  const reststart = ref(new Date(getCurrentDate() +" " + "12:30").getTime())
  const restend = ref(new Date(getCurrentDate() +" " + "13:30").getTime())

  const userInfo = ref({
  username: "",
  name: ""
  });

  const datetypes = reactive([
  { id: 0, name: '工作日' },
  { id: 1, name: '非工作日' },
])

  // 创建数据
  const nameNumVal = ref(0) //后台用户名称字数
  // 表单校验
  const rules = reactive({
    date:[
        { required: true,
             message: '请输入日期',
              trigger: 'blur' 
            },
        { type: 'date',
         message: '日期格式不正确', 
         trigger: 'blur' }
    ],
    datetype:[
        { required: true,
          message: "请输入考勤类型为工作日/非工作日",
      trigger: "blur",
    }
  ],

    ondutytime: [
    {
      required: true,
      message: "Please enter the onduty time",
      trigger: "blur",
    },
  ],
  offdutytime: [
    {
      required: true,
      message: "Please enter the offduty time",
      trigger: "blur",
    },
  ],
  rdmno1: [
    {
      required: true,
      message: "请输入至少一个需求",
      type: "string",
      trigger: "blur",
    },
  ],
  worklength: [
    {
      required: true,
      message: "Please enter the work length",
      trigger: "blur",
    },
    {
      type: "number",
      message: "请输入数字",
      trigger: "blur",
    },
  ],
  }
  )

  // 生命周期
  onMounted(() => {
    props.formData.date = getCurrentDate()
    props.formData.ondutytime = "09:00"
    props.formData.offdutytime = "18:00"
  })

  watch(
  () => [props.formData.ondutytime, props.formData.offdutytime],
  (values, oldValue) => {
    if (values[0] && values[1]) {
      let workLength=""

      let morninglength = (reststart.value - new Date(props.formData.date +" " + values[0]).
      getTime())/ (1000 * 60 * 60 * 8 );

      let afternoonlength = (new Date(props.formData.date +" " + values[1]).
      getTime() - restend.value)/ (1000 * 60 * 60 * 8);
      if (morninglength<0 || afternoonlength<0)
      {
        workLength = 
      (new Date(props.formData.date +" " + values[1]).getTime()
      -
      new Date(props.formData.date +" " + values[0]).getTime())/ (1000 * 60 * 60 * 8);
      }
      else{ workLength = morninglength + afternoonlength;}
      props.formData.worklength = workLength;
    }
  }
);

watch(
  () => props.formData.date,
  (value, oldValue) => {
    if (value) {
      // Check if the selected date is a workday or not
      const date = new Date(value)
      const day = date.getDay()
      if (day === 0 || day === 6) {
        props.formData.datetype =  1
      } else {
        props.formData.datetype =  0
      }
    }
      
    }
)
watchEffect(() => {
  userInfo.value = store.getUserInfo;
});

  // ------定义方法------
  // 搜索
  const handleSubmit = async () => {
    const valid = await ruleFormRef.value.validate()
    if(valid)
    {
      let data = {
        ...props.formData,
         username: userInfo.value.username,
         name: userInfo.value.name
      }
     
      if(props.formData.id == undefined){
    await saveDaily(data)
        .then((res) => {
          if (res.code === 200) {
            ElMessage({

              message: "新增成功!",
              type: "success",
              showClose:false,
            })
            ruleFormRef.value.resetFields() //清空表单数据
            handleClose()
            刷新列表
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
  await editDaily(data)
        .then((res) => {
          if (res.code === 200) {
            ElMessage({

              message: "编辑成功!",
              type: "success",
              showClose:false,
            })
            ruleFormRef.value.resetFields() //清空表单数据
            handleClose()
            刷新列表
            emit("getList")
          }
        })
        .catch((err) => { })
}

    }
    else
    {
      ElMessage({message: "表单提交错误，请检查填写内容!"})
    }
  }
  // 关闭弹层
  const handleClose = () => {
    ruleFormRef.value.resetFields() //清空表单数据
    nameNumVal.value = 0
    emit("handleClose")
  }



  </script>

  
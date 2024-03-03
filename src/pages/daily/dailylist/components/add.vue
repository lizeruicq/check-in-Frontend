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
        
        <el-form-item label="考勤类别" prop="worktype">
            <el-select
              v-model="formData.worktype"
              placeholder="请选择"
            >
            <el-option label="工作日" value="工作日"></el-option>
            <el-option label="非工作日" value="非工作日"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="上班时间" prop="ondutyTime">
          <el-input
            v-model="formData.ondutyTime"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="下班时间" prop="offdutyTime">
          <el-input
            v-model="formData.offdutyTime"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="需求号1" prop="rdmNo1">
          <el-input
            v-model="formData.rdmNo1"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="需求号2" prop="rdmNo2">
          <el-input
            v-model="formData.rdmNo2"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item label="需求号3" prop="rdmNo3">
          <el-input
            v-model="formData.rdmNo3"
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
  import { ref, reactive, nextTick, watch, onMounted } from "vue"
  import { ElMessage } from "element-plus"
  // 控制字节数
//   import { validateLength } from "@/utils/index.js"

  // 接口api
  import { editDaily, saveDaily} from "@/api/user.js"
  
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
  const getCurrentDate = ()=> {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      return year + "-" + month + "-" + day;
    }


  // ------定义变量------
  const emit = defineEmits() //子组件获取父组件事件传值
  const ruleFormRef = ref() //表单校验ref
  const reststart = ref(new Date(getCurrentDate() +" " + "12:30").getTime())
  const restend = ref(new Date(getCurrentDate() +" " + "13:30").getTime())

  

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
    worktype:[
        { required: true,
          message: "请输入考勤类型为工作日/非工作日",
      trigger: "blur",
    }
  ],

    ondutyTime: [
    {
      required: true,
      message: "Please enter the onduty time",
      trigger: "blur",
    },
  ],
  offdutyTime: [
    {
      required: true,
      message: "Please enter the offduty time",
      trigger: "blur",
    },
  ],
  rdmNo1: [
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
    props.formData.ondutyTime = "09:00"
    props.formData.offdutyTime = "18:00"
  })

  watch(
  () => [props.formData.ondutyTime, props.formData.offdutyTime],
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
        props.formData.worktype = "非工作日"
      } else {
        props.formData.worktype = "工作日"
      }
    }
      
    }
)
  // ------定义方法------
  // 搜索
  const handleSubmit = async () => {
    const valid = await ruleFormRef.value.validate()
    console.log(valid)
    if(valid)
    {

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

  
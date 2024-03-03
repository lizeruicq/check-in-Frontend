
  <template>
    <div class="bg-wt radius marg-tp-20">
      <el-table :data="tableData" 
      style="width: 100%" 
      height="450px"
      >
        <el-table-column type="index" align="center" width="100" label="序号" />
        <el-table-column prop="date" label="日期" width="130" align="center">
          <template #default="scope">
            <input type="text" v-model="scope.row.date" class="ipt" style="width: 100px; text-align: left;" 
            :disabled="!state.editing[scope.$index]"/>
          </template>
        </el-table-column>

        <el-table-column prop="type" label="考勤类别" width="130" align="center">
          <template #default="scope">
            <!-- <input type="text" v-model="scope.row.type" class="ipt" style="width: 100px; text-align: left;" 
            :disabled="!state.editing[scope.$index]"/> -->
            <el-select v-model="scope.row.type" class="ipt" style="width: 100px; text-align: left;"
            :disabled="!state.editing[scope.$index]">
            <el-option label="工作日" value="工作日"></el-option>
            <el-option label="非工作日" value="非工作日"></el-option>
    </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="ondutyTime" label="上班时间" width="130" align="center">
          <template #default="scope">
            <input type="text" v-model="scope.row.ondutyTime" class="ipt" style="width: 100px; text-align: left;" 
             :disabled="!state.editing[scope.$index]" />
          </template>
        </el-table-column>

        <el-table-column prop="offdutyTime" label="下班时间" width="130" align="center">
          <template #default="scope">
            <input type="text" v-model="scope.row.offdutyTime" class="ipt" style="width: 100px; text-align: left;" 
            :disabled="!state.editing[scope.$index]"/>
          </template>
        </el-table-column>

        <el-table-column prop="rdmNo" label="需求号" width="200" align="center"
        >
          <template #default="scope">
            <input type="text" v-model="scope.row.rdmNo" class="ipt" style="width: 90%; text-align: left;"
              :disabled="!state.editing[scope.$index]"/>
          </template>
        </el-table-column>

        <el-table-column prop="worklength" label="工作人天" width="130" align="center">
          <template #default="scope">
            <input type="text" v-model="scope.row.worklength" class="ipt" style="width: 100px; text-align: left;" 
            :disabled="!state.editing[scope.$index]"/>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
            >
            {{ state.editing[scope.$index] ? 'Save' : 'Edit' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
  </template> 
<script setup>
import { ref, reactive, onMounted ,nextTick} from "vue"

const props = defineProps({

  // 总条数
  total: {
    type: Number,
    default: 20,
  },
  // 每页的数量
  pageSize: {
    type: Number,
    default: 0,
  },
  // loading
  loading: {
    type: Boolean,
    default: false,
  },
  // 是否触发了搜索按钮
  isSearch: {
    type: Boolean,
    default: false,
  },
  
});

  const tableData = ref([
    {
      date: '2024-02-20',
      type: '工作日',
      ondutyTime: '9:00',
      offdutyTime: '18:00',
      rdmNo: 'S2024022034567',
      worklength: '1',
    },
  
  ])

  const state = reactive({
  editing: Array(tableData.value.length).fill(false),
})

const getCurrentDate = ()=> {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      return year + "-" + month + "-" + day;
    }

  const handleClick = () => {
    console.log('click')
  }

  const handleAdd = () => {
    tableData.value.push({
    date:getCurrentDate(),
    
  })
  state.editing.push(true)
  console.log("2、 "+state.editing)
}

const handleEdit = (row) => {
  console.log("当前选择行数"+tableData.value.indexOf(row))
  state.editing[tableData.value.indexOf(row)] = !state.editing[tableData.value.indexOf(row)]
  console.log("2、 "+state.editing)
  const inputElements = document.querySelectorAll(".ipt")
  // inputElements.forEach((input) => {
  //   input.disabled = !state.editing[tableData.value.indexOf(row)]
  //   if (state.editing[tableData.value.indexOf(row)]) {
  //     input.focus()
  //   }
  // })
}

// const handleEdit = () =>{
//     state.editing = !state.editing;
//     nextTick(() => {
//       const inputElements = document.querySelectorAll(".ipt");
//       inputElements.forEach((input) => {
//         input.disabled = !state.editing;
//         if (state.editing) {
//           input.focus();
//         }
//       });
//     });
// };
// 设置每页条数
const handleSizeChange = (val) => {
  emit("handleSizeChange", val);
};
// 当前页
const handleCurrentChange = (val) => {
  emit("handleCurrentChange", val);
};


onMounted(() => {
  console.log("2、 "+state.editing)
  const inputElements = document.querySelectorAll(".ipt")
  inputElements.forEach((input) => {
  input.disabled = !state.editing[tableData.value.indexOf(row)]
  })
  
})

defineExpose({
  handleAdd
})   


  </script>
  


  
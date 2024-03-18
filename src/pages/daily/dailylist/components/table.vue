<template>
    <el-table :data="dailyData" border stripe v-loading="loading" class="dailyTableList">
        <el-table-column type="index" align="center" width="100" label="序号" />
        <el-table-column 
        prop="date"
              label="日期"
              width="150"
              align="center"
              >
        </el-table-column>
        <el-table-column 
        prop="username"
              label="工号"
              width="180"
              align="center"
              >
        </el-table-column>
        <el-table-column 
        prop="name"
              label="姓名"
              width="150"
              align="center"
              >
        </el-table-column>
        <el-table-column 
        prop="datetype"
              label="考勤类别"
              width="180"
              align="center"
              >
        </el-table-column>
        <el-table-column 
        prop="ondutytime"
              label="上班时间"
              width="150"
              align="center"
              >
        </el-table-column>
        <el-table-column 
        prop="offdutytime"
              label="下班时间"
              width="150"
              align="center"
              >
        </el-table-column>
    
        <el-table-column 
        prop="rdmno1"
              label="需求号1"
              width="180"
              align="center"
              >
        </el-table-column>

        <el-table-column 
        prop="rdmno2"
              label="需求号2"
              width="180"
              align="center"
              >
        </el-table-column>

        <el-table-column 
        prop="rdmno3"
              label="需求号3"
              width="180"
              align="center"
              >
        </el-table-column>

        <el-table-column 
        prop="worklength"
              label="工作人天"
              width="150"
              align="center"
              >
        </el-table-column>
    
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="150"
            class-name="userTable"
          >
            <template #default="scope">
              <div class="operate">
                <span
                  @click="handleEdit(scope.row)"
                  :class="scope.row.status === 0 ? 'textForbidden' : 'textDefault'"
                  >编辑</span
                >     
                <span
                  @click="handleDelete(scope.row)"
                  :class="scope.row.status === 1 ? 'textForbidden' : 'textDefault'"
                  >删除</span
                >
              </div>
            </template>
          </el-table-column>
    </el-table>
    <el-pagination
          v-if="total >= 10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Number(total)"
          class="paginationBox"
        >
        </el-pagination>
    
    </template>
    
    <script setup>
    import { ref } from "vue";
    import { ElMessage } from "element-plus";
    import { formatTime } from "@/utils/index";
    // 接口
    import { pwdReset, usersStatus } from "@/api/user";
    
    // 获取父组件值、方法
    const props = defineProps({
      // 搜索对象
      dailyData: {
        type: Array,
        default: () => [
            // {
            //     date: "2024-02-20",
            //     username:"CHN0028042",
            //     name:"李泽睿",
            //     datetype: "工作日",
            //     ondutytime: "9:00",
            //     offdutytime: "18:00",
            //     rdmno1: "S2024022011111",
            //     rdmno2: "S2024022011111",
            //     rdmno3: "S2024022011111",
            //     worklength: "1",
            // }
        ],
      },
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
    
    });
    // ------定义变量------
    const emit = defineEmits(); //子组件获取父组件事件传值
 
    const handleEdit = (row) => {
       console.log(row.id)
       emit("handleEdit", row.id);

        // emit的两个参数，第一个是父组件的方法名，第二个是传给父组件的参数
      
    };
    // 设置每页条数
    const handleSizeChange = (val) => {
      emit("handleSizeChange", val);
    };
    // 当前页
    const handleCurrentChange = (val) => {
      emit("handleCurrentChange", val);
    };
    </script>
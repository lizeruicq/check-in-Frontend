<template>
<el-table :data="userData" border stripe v-loading="loading" class="userTableList">
    <el-table-column type="index" align="center" width="100" label="序号" />
    <el-table-column 
    prop="name"
          label="姓名"
          width="180"
          align="center"
          >
    </el-table-column>
    <el-table-column 
    prop="username"
          label="工号"
          width="180"
          align="left"
          >
    </el-table-column>
    <el-table-column 
    prop="role"
          label="角色"
          width="180"
          align="center"
          >
    </el-table-column>
    <el-table-column 
    prop="email"
          label="邮箱"
          width="180"
          align="center"
          >
    </el-table-column>

    <el-table-column 
    prop="createTime"
          label="注册时间"
          width="220"
          align="center"
          >
    </el-table-column>

    <el-table-column label="状态" min-width="120">
        <template #default="scope">
          <span
            class="iconTip"
            :class="scope.row.status === 0 ? 'forbidIcon' : 'normalIcon'"
          ></span>
          {{ scope.row.status === 0 ? "禁用" : "正常" }}
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        min-width="190"
        class-name="userTable"
      >
        <template #default="scope">
          <div class="operate">
            <!-- 禁止的时候不能触发查看和重置密码,因此按钮置灰 -->
            <span
              @click="handleEdit(scope.row)"
              :class="scope.row.status === 0 ? 'textForbidden' : 'textDefault'"
              >编辑</span
            >
            <!-- <span
              @click="handleOpenStatus(scope.row)"
              :class="scope.row.status === 0 ? 'textDefault' : 'textWarning'"
            >
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </span> -->
            <span
              @click="handleResetPwd(scope.row)"
              :class="scope.row.status === 0 ? 'textForbidden' : 'textDefault'"
              >重置密码</span
            >
            <!-- <span
              @click="handleDelete(scope.row)"
              :class="scope.row.status === 1 ? 'textForbidden' : 'textDefault'"
              >删除</span
            > -->
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
  userData: {
    type: Array
    // default: () => [
    //     {
    //       name: "李泽睿",
    //       username: "CHN0028042",
    //       role: "中级测试",
    //       email: "xxx@example.com",
    //       createTime: "2024-02-19",
    //       status: 1,
    //     },
    //     {
    //       name: "李泽睿",
    //       username: "CHN0028042",
    //       role: "中级测试",
    //       email: "xxx@example.com",
    //       createTime: "2024-02-19",
    //       status: 1,
    //     },

        
    // ],
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
const statusText = ref("");
let pic = ref(""); //要放大的图片
let userId = ref(""); //
let userName = ref(""); //
let userStatus = ref(0); //

const handleEdit = (row) => {
  console.log(row.status,row.id)
  if (row.status === 1) {
    emit("handleEdit", row.id);
    // emit的两个参数，第一个是父组件的方法名，第二个是传给父组件的参数
  }
};

const handleResetPwd =  (row) => {
  console.log(row.status,row.id)
  emit("handleResetPwd", row.id);
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
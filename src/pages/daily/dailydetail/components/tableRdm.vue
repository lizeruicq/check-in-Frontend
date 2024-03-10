<template>
    <el-table :data="RdmDetailData" 
    border stripe 
    v-loading="loading"
    class="RdmDetailList">
    <el-table-column type="index" align="center" width="100" label="序号" />
        <el-table-column 
        prop="rdmno"
              label="需求号"
              width="150"
              align="center"
              >
        </el-table-column>
        <el-table-column 
        prop="length"
              label="人天占用"
              width="150"
              align="center"
              >
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

const props = defineProps({
      // 搜索对象
      RdmDetailData: {
        type: Array,
        default: () => [
            {
                rdmno: 'S2024031012345',
                length: '3.5',
            }
           
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

    // 设置每页条数
    const handleSizeChange = (val) => {
      emit("handleSizeChange", val);
    };
    // 当前页
    const handleCurrentChange = (val) => {
      emit("handleCurrentChange", val);
    };

</script>
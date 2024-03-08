<template>
    <div class="contentBox">
        <!-- <Search :searchData="searchData" @handleSearch="handleSearch" @getList="getList"></Search> -->
        <div class="bg-wt radius marg-tp-20">
          <div class="tableBox">
        <Table
        :loading="loading"
    :dailyData="dailyData.value"
    :total="total"
    @getList="getList"
    @handleEdit="handleEdit"
    ></Table>
        <div class="subHead pad-30">
            <!-- 新增 -->
            <AddButton @handleAdd="handleAdd" :text="text"></AddButton>
            <!-- end -->
            </div>
        </div>
        <Add
          ref="add"
          :title="title"
          :formData="formData"
          :dialogFormVisible="dialogFormVisible"
          @getList="getList"
          @handleClose="handleClose"
          @getParams="getParams"
        ></Add>
        </div>
    </div>
    </template>
    <script setup>
    import { ref, reactive, onMounted } from "vue";
    // import Search from "./components/Search.vue";
    import Table from "./components/table.vue";
    import Add from "./components/add.vue";
    import AddButton from "@/components/AddButton/index.vue";
    import { queryDailyById,getDailies } from "@/api/daily";
    
    const text = ref("新增考勤");
    const loading = ref(false);
    const add = ref()
    let title = ref("");
    let total = ref(null); //数据总条数
    let dialogFormVisible = ref(false); //谈层隐藏显示
    let isSearch = ref(false)//是否触发了搜索按钮,用来控制没有搜索出数据和正常列表无数据的区分，显示的图片和提示语不一样
    let searchData = reactive({
      pageSize: 10,
      pageNo: 1,
    }); //搜索对象
    let dailyData = reactive([]); //表格数据
    let formData = ref({}); //新增编辑表单数据
    let ParamsData = ref({}); //创建成功返回的数据
    const handleAdd = () => {
      title.value = "新增考勤";
      dialogFormVisible.value = true;
    };
    
    
    onMounted(() => {
      init();
    });
    // ------定义方法------
    // 获取初始值
    const init = () => {
      getList();
    };

    // 获取列表值
    const getList = async () => {
      console.log("开始获取考勤记录")
      loading.value = true;
      await getDailies(searchData)
    .then((res) => {
      if (res.code === 200) {
        loading.value = false;
        dailyData.value = res.data.list;
        total.value = res.data.total;
      }
    })
    .catch((err) => {});
  };

    //获取考勤详情方法
const getDetailData = async(id) => {
  await queryDailyById(id)
    .then((res) => {
      if (res.code === 200) {
        formData.value = res.data;
      }
    })
    .catch((err) => {});
}
      
    // 关闭弹层
    const handleClose = () => {
      dialogFormVisible.value = false;
    };
    // 接收子组件传值
    const getParams = (val) => {
      ParamsData.value = {...val};
    };

    const handleEdit = (val) => {
    console.log("接收到编辑命令，id为"+val.toString())
    title.value = "编辑考勤记录";
    dialogFormVisible.value = true;
    getDetailData(val);

}
</script>


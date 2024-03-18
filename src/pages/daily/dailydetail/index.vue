<template>
 
    <div class="contentBox">
      
        <div class="bg-wt radius marg-tp-20 table2">
          <SearchLeft :searchData="searchData"
       @handleSearch="handleSearch" 
       @getList="getList"
       ></SearchLeft>
            <div class="tableBox">
                <TablePerson
                :loading="loading"
            :personData="personData.value"
            :total="total"
            @getList="getList"
                >
                </TablePerson>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import TablePerson from "./components/tablePerson.vue";
import { getPersonlength } from "@/api/daily";
import SearchLeft from "./components/SearchLeft.vue";

const loading = ref(false);
let total = ref(null); //数据总条数
let isSearch = ref(false)//是否触发了搜索按钮,用来控制没有搜索出数据和正常列表无数据的区分，显示的图片和提示语不一样
    let searchData = reactive({
      pageSize: 10,
      pageNo: 1,
    }); //搜索对象
    let personData = reactive([]); //表格数据

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
      console.log("开始获取人天记录")
      loading.value = true;
      await getPersonlength(searchData)
    .then((res) => {
      if (res.code === 200) {
        loading.value = false;
        personData.value = res.data.list;
        total.value = res.data.total;
      }
    })
    .catch((err) => {});
  }; 
  const handleSearch = () => {
  isSearch.value = true//是否触发了搜索按钮
  getList();
};   


</script>

<style lang="scss" scoped>
.bg-wt
{
    margin-right: 100px;
}
.table2
{
    width: 750px
}
.contentBox {
  display: flex;
  flex-direction: row;
}

.tableBox {
  width: 100%;
  max-width: 100%;
  margin-right: 10px;


}

</style>./components/SearchLeft.vue
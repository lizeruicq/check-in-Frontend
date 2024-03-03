<template>
    <div class="LeftSider fx-fd-col">
      <div  @click="() => $router.push('/')" class="cursor home">系统标题待定</div>
      <div class="nav">
        <el-menu
          :default-active="activeIndex"
          :default-openeds="defaultOpeneds"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        > 
          <div class="first-menu">
            <el-menu-item index="99" :key="99" @click="goPath(`/`)">
              <i class="iconfont" v-html="basePath[0].meta.icon"></i>
              <span>仪表盘</span>
            </el-menu-item>
          </div> 
          <el-sub-menu v-for="(item, index) in basePath"  :key="index"  :index="index.toString()" >
            <template #title>
              <i class="iconfont" v-html="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </template>
            <el-menu-item v-for="(it, ind) in item.children" :key="ind" :index="`${index}-${ind}`" @click="goPath(`${it.path}`)">
              {{it.meta.title}}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <span class="decorate"></span>
    </div>
  </template>

<script setup>
import { ref, computed, watchEffect, } from 'vue';
import { useRoute } from 'vue-router';
import router, { asyncRouterList } from '@/router';
import { catchDataesStore,useUserStore } from '@/store';
// 全部路由信息
const routers = asyncRouterList

// 当前路由下的信息
const route = useRoute()

const store = catchDataesStore()
const useStore =useUserStore()

const activeIndex = ref('99')// ref(store.getDefaultIndex)
const defaultOpeneds = ref()// ref(store.getDefaultOpeneds)

// 进入导航
const goPath = (path) => {
  useStore.setTabNumber(0)
  router.push(path)
}
const handleOpen = (key) => {
  store.setDefaultOpeneds(key)
}
const handleClose = (key) => {
  store.setDefaultOpeneds(key)
}
const handleSelect = (key) => {
  store.setDefaultIndex(key)
}

// 处理侧边栏数据
const sideMenu = computed(() => {
  const newMenuRouters = [];
  routers.forEach((menu) => {
  })
  return newMenuRouters;
});

// 处理导航数据
const getMenuList = (list, basePath) => {
  if (!list) {
    return [];
  }
  return list
    .map((item) => {
      const path = basePath ? `${basePath}/${item.path}` : item.path;
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || '',
        children: getMenuList(item.children, path),
        meta: item.meta,
        redirect: item.redirect,
      };
    })
    .filter((item) => item.meta && item.meta.hidden !== true);
  }

  // 展示基础路由
const basePath = getMenuList(routers)

  watchEffect(()=>{
  if (basePath){
    const path = route.path.toString()
    // 如果是首页
    if(path == '/main/index' || path == '/'){
        activeIndex.value = '99'
        return 
      }
    // 如果是 三级子页  
    if(route.meta && route.meta.fmeta){
      const cpath = route.meta.fmeta.path
      basePath.forEach((item,index) => {
        const regA = new RegExp(item.path)
        // 非首页 在当前的路由下查找 
        if (cpath.search(regA) != -1){
          defaultOpeneds.value == [index.toString()] ? null : defaultOpeneds.value = [index.toString()]
          item.children.forEach((val, ind) => {
            if (val.path == cpath){
              activeIndex.value == `${index}-${ind}` ? null : activeIndex.value = `${index}-${ind}`
            } 
          })
        }
      })
      return ;
    }
    // 非首页的二级页面
    basePath.forEach((item,index) => {
      const regA = new RegExp(item.path)
      // 非首页 在当前的路由下查找 
      if (path.search(regA) != -1){
        defaultOpeneds.value == [index.toString()] ? null : defaultOpeneds.value = [index.toString()]
        item.children.forEach((val, ind) => {
          if (val.path == route.path){
            activeIndex.value == `${index}-${ind}` ? null : activeIndex.value = `${index}-${ind}`
          } 
        })
      }
    })
  }
})

</script>
<style lang="scss" scoped>
.LeftSider {
  position: relative;
  position: fixed;
  overflow: hidden;
  z-index: 999;
  width: 150px;
  height: 100vh;
  background: linear-gradient(130deg, #FAF8F4 0%, #F4EEE6 53%);
  //   &::before, &::after{
  //   position: absolute;
  //   content: '';
  //   //设置背景图
  //   background-image: url(@/assets/leftbackground.png);
  //   //设置背景图大小
  //   background-size: 226px 168px;
  //   z-index: 0;
  //   width: 226px;
  //   height: 168px;
  // }
  }
  
</style>
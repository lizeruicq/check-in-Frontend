<template>
    <div class = "main-space">
        <div class = "chat-view">
        <template v-for="item in chatList">
          <div :class="{'user-msg': item.role === 'User'}">
            <div class="chat-view-msg">
              <!-- {{item.role === 'user' ? 'user' : 'openai'}} -->
              <div class="info">
                <div class="open-ai-svg" v-if="item.role !== 'User'">
                  <svg t="1710154119278" class="icon" 
                  viewBox="0 0 1024 1024" version="1.1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  p-id="1838" width="25" 
                  height="25">
                  <path d="M409.6 750.933l34.133 68.267H170.667v136.533h682.666V819.2H580.267l34.133-68.267h238.933A68.267 68.267 0 0 1 921.6 819.2v136.533A68.267 68.267 0 0 1 853.333 1024H170.667a68.267 68.267 0 0 1-68.267-68.267V819.2a68.267 68.267 0 0 1 68.267-68.267H409.6zM273.067 68.267h477.866a68.267 68.267 0 0 1 68.267 68.266V614.4a68.267 68.267 0 0 1-68.267 68.267H273.067A68.267 68.267 0 0 1 204.8 614.4V136.533a68.267 68.267 0 0 1 68.267-68.266z m0 68.266V614.4h477.866V136.533H273.067z m614.4 102.4a34.133 34.133 0 0 1 34.133 34.134v204.8a34.133 34.133 0 1 1-68.267 0v-204.8a34.133 34.133 0 0 1 34.134-34.134z m-750.934 0a34.133 34.133 0 0 1 34.134 34.134v204.8a34.133 34.133 0 0 1-68.267 0v-204.8a34.133 34.133 0 0 1 34.133-34.134zM989.867 307.2A34.133 34.133 0 0 1 1024 341.333V409.6a34.133 34.133 0 1 1-68.267 0v-68.267a34.133 34.133 0 0 1 34.134-34.133z m-955.734 0a34.133 34.133 0 0 1 34.134 34.133V409.6A34.133 34.133 0 0 1 0 409.6v-68.267A34.133 34.133 0 0 1 34.133 307.2z m341.334 102.4a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z m273.066 0a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4zM512 0a34.133 34.133 0 0 1 34.133 34.133V102.4a34.133 34.133 0 0 1-68.266 0V34.133A34.133 34.133 0 0 1 512 0z m-68.267 614.4a34.133 34.133 0 0 1 34.134 34.133v136.534a34.133 34.133 0 1 1-68.267 0V648.533a34.133 34.133 0 0 1 34.133-34.133z m136.534 0a34.133 34.133 0 0 1 34.133 34.133v136.534a34.133 34.133 0 1 1-68.267 0V648.533a34.133 34.133 0 0 1 34.134-34.133z" p-id="1839"></path></svg>
                  
                </div>
              
                <div  v-else>
                  <!-- <img class="headIcon" url = defaultImage/> -->
                </div>
              </div>
              <div><pre>{{item.text}}</pre></div>
            </div>
          </div>
        </template>    
        </div> 
 <div class="chat-input">
    <div class="m-b-20">
      <el-input
        type="textarea"
        v-model="question"
        placeholder="请输入文本内容"
      ></el-input>
    </div>
    <el-button type="primary" @click="sendChat">发送</el-button>   
    <el-button @click="clearChat">清空消息列表</el-button>
  </div>

</div>
</template>

<script setup>

import { ref, reactive, onMounted, nextTick } from "vue";
import {getAnswer} from "@/api/ai";
import defaultImage from "@/assets/icon.jpeg";

const appID = "dc055d890c344e0e8aa8ad505ab1eb19"
const RequestId = ref("")
const question=ref("")
const chatList=reactive([

 
])

const assembleRequest = (question)=>
{
  return {
    RequestId: RequestId.value,
    AppId: appID,
    Prompt: question,
    DocReferenceType:"simple"
  }
}

const sendChat = async ()=>
{
  if (question.value === "") 
  {
    return;
  }
  pushChat('User',question.value)
  scrollToEnd()
  let request = assembleRequest(question.value)
  question.value = ''
  await getAnswer(JSON.stringify(request)).then((res) => {
      // let data = JSON.parse(res.data)
      console.log(res.Success)
      if (res.Success = true) {
      pushChat('Bot',res.Data.Text)
      scrollToEnd()
      }
    })
    .catch((err) => {console.log(err)});
}
const clearChat = async () =>{
  chatList.splice(0, chatList.length)
}

const pushChat = (r,t)=>{
  chatList.push({
    role: r,
    text: t
  })
}

const scrollToEnd=()=> {
            nextTick(() => {
              document.querySelector(".chat-view").scrollTop = 100000000;
            });

// const AIrequest = {
//   "RequestId": "123456789",
//   "AppId": "dc055d890c344e0e8aa8ad505ab1eb19",
//  "Prompt": "API接口说明中, TopP参数改如何传递?",
//   "History": [
//   {
//       "User": "API接口如何使用",
//       "Bot": "API接口需要传入prompt、app id并通过post方法调用"
//     }

//   ],
// }
}
  
</script>
<style scoped>
    .main-space
    {
      width: 80%;
      height: 100%;
    }
    .chat-view {
        padding: 20px;
        height: 500px;
        max-height: 500px;
        overflow-y: scroll;
        margin-bottom: 20px;
        width: 100%;
        
      }

    .open-ai-svg {
        width: 24px;
        height: 24px;
        background:rgb(185, 189, 188)c;
        border-radius: 5px;
        padding: 5px;
        box-sizing: content-box;
      }
      .chat-view-msg {
        /* display: flex;
        align-items: flex-start; */
        margin-bottom: 10px;
        max-width:80%;      
      }
      pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

      .chat-view-msg .info {
        margin-right: 10px;

      }

      .chat-input {
        display: flex;
      }
      .chat-input .m-b-20 {
        width: 100%;
        margin-right: 20px;
      }
      .user-msg {
        display: flex;
        justify-content: flex-end;
      }
      .headIcon {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    /* margin-right: 13px; */
  }

</style>
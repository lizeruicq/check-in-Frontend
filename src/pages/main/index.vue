<template>
    <div class = "main-space">
        <div class = "chat-view">
        <template v-for="item in chatList">
          <div :class="{'user-msg': item.role === 'User'}">
            <div class="chat-view-msg">
              <!-- {{item.role === 'user' ? 'user' : 'openai'}} -->
              <div class="info">
                <div class="open-ai-svg" v-if="item.role !== 'User'">
                  <svg
                    data-name="OpenAI Logo"
                    width="24px"
                    height="24px"
                    viewBox="140 140 520 520"
                  >
                    <defs>
                      <linearGradient
                        id="linear"
                        x1="100%"
                        y1="22%"
                        x2="0%"
                        y2="78%"
                      >
                        <stop offset="0%" stop-color="rgb(131,211,231)"></stop>
                        <stop offset="2%" stop-color="rgb(127,203,229)"></stop>
                        <stop offset="25%" stop-color="rgb(86,115,217)"></stop>
                        <stop offset="49%" stop-color="rgb(105,80,190)"></stop>
                        <stop offset="98%" stop-color="rgb(197,59,119)"></stop>
                        <stop offset="100%" stop-color="rgb(197,59,119)"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      id="logo"
                      d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"
                      fill="#202123"
                      style="fill: #fff"
                    ></path>
                  </svg>
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
        background: #75a89c;
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
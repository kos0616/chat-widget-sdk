<template>
  <div
    class="fixed bottom-5 right-5 w-xs shadow-md rounded-lg overflow-hidden bg-white z-[9999]"
    :class="{ open }"
  >
    <div
      class="bg-sky-500 text-white p-2.5 cursor-pointer font-bold"
      @click="toggleOpen"
    >
      💬 客服聊天
    </div>

    <div
      class="border-t border-t-gray-400 max-h-[400px] flex flex-col"
      v-if="open"
    >
      <div
        class="p-3 flex-1 overflow-y-auto scroll-smooth"
        ref="messagesContainerRef"
      >
        <div
          v-for="(msg, i) in messageList"
          :key="i"
          :class="{ 'justify-end my-4': msg.type === 'request' }"
          class="flex flex-wrap group"
        >
          <span
            :class="{
              'rounded-xl bg-gray-200 px-3 py-2': msg.type === 'request',
              'rounded-xl bg-sky-500 text-white px-3 py-2':
                i === messageList.length - 1 &&
                msg.type === 'response' &&
                isAIGenerateMsg,
            }"
          >
            {{ msg.message }}
          </span>
          <small
            :class="{ 'text-end': msg.type === 'request' }"
            class="w-full opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500"
          >
            {{ showDate(msg.update) }}
          </small>
        </div>

        <div v-if="isUserLoading" class="flex flex-wrap justify-end my-4">
          <span class="rounded-xl bg-sky-500 text-white px-3 py-2">
            {{ input }}
          </span>
          <small class="w-full text-end text-xs text-gray-500">
            正在傳送...
          </small>
        </div>
        <div v-if="isAILoading" class="flex flex-wrap my-4">
          <span class="rounded-xl bg-sky-500 text-white px-3 py-2">
            正在回應...
          </span>
        </div>
      </div>

      <form
        @submit.prevent="sendMessage"
        class="px-3 py-2"
        style="box-shadow: 0px 0px 8px -2px rgba(150, 150, 150, 0.3)"
      >
        <input
          v-model="input"
          :disabled="isUserLoading"
          type="text"
          placeholder="請輸入訊息..."
          class="rounded-xl border border-gray-300 p-2 px-3 w-full"
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, useTemplateRef, nextTick, watch } from "vue";
import MessageList, { type TypeMessage } from "./Service/Message/List";
import MessagePost from "./Service/Message/Post";
import AIResponse from "./Service/AI";

const messagesContainerRef = useTemplateRef("messagesContainerRef");

const messageList = ref<TypeMessage[]>([]);

const open = ref(true);

const input = ref("");

const isUserLoading = ref(false);
/** 正在取得AI回應 */
const isAILoading = ref(false);
/** AI 正在產生字句 */
const isAIGenerateMsg = ref(false);

const showDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const scrollToBottom = (behavior?: ScrollBehavior) => {
  nextTick(() => {
    const el = messagesContainerRef.value;
    if (!el) return;
    el?.scrollTo({
      top: el.scrollHeight,
      behavior: behavior,
    });
  });
};

const getMessageList = async () => {
  try {
    const res = (await MessageList()) || [];
    messageList.value = res;
    scrollToBottom("instant");
  } catch (error) {
    alert("聊天記錄取得發生異常，請稍後再試");
    console.error(error);
  }
};

const toggleOpen = () => {
  open.value = !open.value;
};

const getAIResponse = async () => {
  try {
    isAILoading.value = true;
    const res = (await AIResponse()) || [];
    isAILoading.value = false;
    isAIGenerateMsg.value = true;

    const AIResponseItem = res[res.length - 1];
    const loadingMessage = { ...AIResponseItem, message: "" };
    messageList.value.push(loadingMessage);
    const fullText = AIResponseItem.message;
    await generateAIMsg(fullText);
    scrollToBottom();
  } catch (error) {
    alert("AI 服務異常，請稍後再試");
    console.error(error);
  } finally {
    isAIGenerateMsg.value = true;
  }
};

async function generateAIMsg(fullText: string): Promise<void> {
  return new Promise((resolve) => {
    let index = 0;
    const timer = setInterval(() => {
      const last = messageList.value[messageList.value.length - 1];
      last.message += fullText[index++];
      scrollToBottom();
      if (index >= fullText.length) {
        clearInterval(timer);
        resolve(); // 當模擬完成時，解決 Promise
      }
    }, 30);
  });
}

const sendMessage = async () => {
  if (!input.value.trim()) return;
  try {
    isUserLoading.value = true;
    scrollToBottom();
    const myMessage = await MessagePost(input.value);
    input.value = "";
    isUserLoading.value = false;
    messageList.value.push(myMessage);
    scrollToBottom();
    await getAIResponse();
  } catch (error) {
    console.log(error);
  } finally {
    isUserLoading.value = false;
  }
};

onMounted(() => {
  getMessageList();
});

watch(
  () => open.value,
  (newVal) => {
    if (newVal) {
      scrollToBottom("instant");
    }
  }
);
</script>

<style scoped>
.chat-input {
  border-top: 1px solid #eee;
  padding: 6px;
}
.chat-input input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

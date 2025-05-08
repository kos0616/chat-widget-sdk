<template>
  <div class="chat-widget" :class="{ open }">
    <div class="chat-header" @click="toggleOpen">💬 客服聊天</div>

    <div class="chat-body" v-if="open">
      <div class="messages">
        <div v-for="(msg, i) in messages" :key="i" :class="msg.from">
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-input">
        <input
          type="text"
          v-model="input"
          @keydown.enter="sendMessage"
          placeholder="請輸入訊息..."
        />
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue'

const open = ref(false)
const input = ref('')
const messages = ref([
  { from: 'bot', text: '您好，有什麼可以幫您？' }
])

const toggleOpen = () => {
  open.value = !open.value
}

const sendMessage = () => {
  if (!input.value.trim()) return
  messages.value.push({ from: 'user', text: input.value })
  setTimeout(() => {
    messages.value.push({ from: 'bot', text: '這是自動回覆喔 😊' })
  }, 500)
  input.value = ''
}
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-family: sans-serif;
  width: 280px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
  background: white;
  z-index: 9999;
}
.chat-header {
  background: #409eff;
  color: white;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}
.chat-body {
  border-top: 1px solid #eee;
  max-height: 400px;
  display: flex;
  flex-direction: column;
}
.messages {
  padding: 10px;
  flex: 1;
  overflow-y: auto;
}
.messages .bot {
  background: #f1f1f1;
  padding: 6px 10px;
  margin-bottom: 4px;
  border-radius: 4px;
  max-width: 80%;
}
.messages .user {
  background: #409eff;
  color: white;
  padding: 6px 10px;
  margin-bottom: 4px;
  margin-left: auto;
  border-radius: 4px;
  max-width: 80%;
}
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

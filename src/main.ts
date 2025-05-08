import { createApp } from "vue";
import ChatWidget from "./App.vue";
import "./assets/style.css"; // 引入 Tailwind CSS

// 初始化函數
function initChatWidget(options = {}) {
  let container = document.getElementById("chat-widget-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "chat-widget-container";
    document.body.appendChild(container);
  }

  createApp(ChatWidget, options).mount("#chat-widget-container");
}

// 自動執行初始化邏輯
if (typeof window !== "undefined") {
  // 預設選項
  const defaultOptions = {
    botMessage: "您好！這是預設的歡迎訊息。",
  };

  // 自動初始化
  initChatWidget(defaultOptions);

  // 將初始化函數暴露到全域（可選）
  // window.ChatWidget = {
  //   init: initChatWidget,
  // };
}

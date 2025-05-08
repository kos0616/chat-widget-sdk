import { createApp } from "vue";
import ChatWidget from "./components/ChatWidget.vue";

if (typeof window !== "undefined") {
  console.log("ChatWidget is running in the browser");
  // 動態創建一個容器元素
  const container = document.createElement("div");
  container.id = "chat-widget-container";
  document.body.appendChild(container); // 將容器附加到 body

  // 將 Vue 應用程式掛載到新創建的容器中
  createApp(ChatWidget).mount("#chat-widget-container");
}

import ChatWidget from "./components/ChatWidget.vue";

export { ChatWidget };

if (typeof window !== "undefined") {
  // 提供 window 全域調用
  (window as any).ChatWidget = {
    init(options: any) {
      console.log("Init Chat with options:", options);
      // 動態掛載組件邏輯（可使用 createApp(ChatWidget)）
    },
  };
}

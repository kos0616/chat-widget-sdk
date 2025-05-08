import { ref as c, createElementBlock as a, openBlock as l, normalizeClass as d, createElementVNode as i, createCommentVNode as m, Fragment as _, renderList as h, toDisplayString as f, withDirectives as g, withKeys as w, vModelText as x } from "vue";
const y = (o, t) => {
  const e = o.__vccOpts || o;
  for (const [s, r] of t)
    e[s] = r;
  return e;
}, C = {
  key: 0,
  class: "chat-body"
}, k = { class: "messages" }, b = { class: "chat-input" }, V = {
  __name: "ChatWidget",
  setup(o) {
    const t = c(!1), e = c(""), s = c([
      { from: "bot", text: "您好，有什麼可以幫您？" }
    ]), r = () => {
      t.value = !t.value;
    }, p = () => {
      e.value.trim() && (s.value.push({ from: "user", text: e.value }), setTimeout(() => {
        s.value.push({ from: "bot", text: "這是自動回覆喔 😊" });
      }, 500), e.value = "");
    };
    return (W, u) => (l(), a("div", {
      class: d(["chat-widget", { open: t.value }])
    }, [
      i("div", {
        class: "chat-header",
        onClick: r
      }, " 💬 客服聊天 "),
      t.value ? (l(), a("div", C, [
        i("div", k, [
          (l(!0), a(_, null, h(s.value, (n, v) => (l(), a("div", {
            key: v,
            class: d(n.from)
          }, f(n.text), 3))), 128))
        ]),
        i("div", b, [
          g(i("input", {
            type: "text",
            "onUpdate:modelValue": u[0] || (u[0] = (n) => e.value = n),
            onKeydown: w(p, ["enter"]),
            placeholder: "請輸入訊息..."
          }, null, 544), [
            [x, e.value]
          ])
        ])
      ])) : m("", !0)
    ], 2));
  }
}, D = /* @__PURE__ */ y(V, [["__scopeId", "data-v-771acf31"]]);
typeof window < "u" && (window.ChatWidget = {
  init(o) {
    console.log("Init Chat with options:", o);
  }
});
export {
  D as ChatWidget
};

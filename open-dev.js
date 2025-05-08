import { exec } from "child_process";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

/**
 * 這個腳本是用於在本機 build 後，於使用者端的視角來檢視打包後的 umd.js 檔案。
 */


// 模擬 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 獲取 dev.html 的絕對路徑
const devHtmlPath = resolve(__dirname, "dev.html");

// 根據作業系統選擇打開命令
const openCommand =
  process.platform === "darwin"
    ? `open ${devHtmlPath}` // macOS
    : process.platform === "win32"
    ? `start ${devHtmlPath}` // Windows
    : `xdg-open ${devHtmlPath}`; // Linux

// 執行打開命令
exec(openCommand, (err) => {
  if (err) {
    console.error("無法打開 dev.html:", err);
  } else {
    console.log("已成功打開 dev.html");
  }
});

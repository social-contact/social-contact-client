const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "electron/main.ts", // 修改主进程入口文件路径
      nodeIntegration: true, // 开启node支持
    },
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});

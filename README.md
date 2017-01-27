# FullStack JavaScript

### Todos

測試使用 GitHub Project 功能，因此都堆積到那邊去了⋯⋯

### 準備工作

在 Mac 電腦上以 Node + Express + MongoDB 做全棧開發。跟著[這本書](http://www.fullstackjs.com/book/index.html)演練完第一遍獲得鳥瞰式的理解，第二遍將各種開發環境配置妥當，並根據個人需求做出調整，第三遍則根據個人架構快速演練。

1. 一台 Mac 電腦。
2. 已安裝 Homebrew，並以 NVM 安裝好 Node、升級完 NPM，當然也安裝了 Git。
3. 安裝必要的全域套件：
  - `npm install -g express-generator`
  - `npm install -g gulp-cli`
4. 安裝 MongoDB 資料庫：
  - brew install mongodb

### 專案建立

使用 `express --hbs --view hbs --git fullstackjs` 建立新專案，根據指示 `cd fullstackjs && npm install` 會安裝完相依套件。

Express 預設的模板語言是 jade，改用 Handlebars；使用 `--git` 參數建立時會提供 express 預設的 `.gitignore` 檔案，便於 git 使用。

在終端機輸入 `$ DEBUG=fullstackjs:* npm start` 立即可啟用搭建好的 express 網站，預設是使用瀏覽器開啟 `http://localhost:3000`。

此時修改後端（伺服器）檔案需要 Ctrl + C 停止程式、再重新啟動一次，修改前端檔案也得手動重載瀏覽器，相當不便利，因此接下來要將本地開發環境加上自動化更新、重載與重啟的機制。

### 開發流程配置

後端代碼更新後自動重啟是透過 [nodemon](https://nodemon.io)，前端則是 [browser-sync](https://browsersync.io)。原書中的方式是修改 Node 啟動時的 script，以及修改應用程式主檔 app.js，我則希望全數改以 gulp 處理；同時也不打算如教程中安裝 `node-sass-middleware`，這類前置編譯工作沒必要擺到主機上進行。

安裝必要套件：`npm install -D gulp gulp-nodemon browser-sync`，之後編寫 gulpfile.js 即可。

進行本地開發時，在專案目錄下輸入 `gulp`。

> 偶爾就是會出現卡住、沒有更新的狀態，通常 Ctrl + C 停止、再執行一次，也出現過得重新關閉當下的終端機連線再來一次的狀態，不是非常穩定。

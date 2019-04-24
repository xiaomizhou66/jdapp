import {
  app,
  BrowserWindow,
  Tray,
  ipcMain
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 主窗口
let mainWindow

function createMainWindow() {
  /**
   * Initial window options
   */
  // mainWindow 的官网文章：https://electronjs.org/docs/api/browser-window
  mainWindow = new BrowserWindow({
    show: true, //创建一个隐藏的窗口
    //width: 840,
    //height: 600,
    width: 280,
    height: 400,
    useContentSize: false, //默认 false，若使用 web 网页 size, 这意味着实际窗口的 size 应该包括窗口框架的 size，稍微会大一点，
    fullscreen: false, //默认 false（用来规定 窗口是否全屏，并且全屏之后没有缩小按钮
    //并且 false 的时候 mac 的全屏键被隐藏或者禁用，但是我希望不是全屏，并且可以方法呢？？？）
    title: ' ' //为什么这样设置不成功？？？？
  })
  //const winURL = process.env.NODE_ENV === 'development' ?
  //  `http://localhost:9080` :
  //  `file://${__dirname}/index.html`
  const loginURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080/#/login` :
    `file://${__dirname}/index.html/#/login`;
  mainWindow.loadURL(loginURL)
  mainWindow.setMenu(null)
  mainWindow.setTitle(' ') //为什么这样设置不成功？？？？
  //wainWindow.flashFrame(true) 在任务栏闪烁，微信收到消息的时候闪烁吧
  mainWindow.setOverlayIcon('static/image/logo.png', '') //这个怎么也不成功呢？？？

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  //在打开软件的同时加载主界面 但是不让主界面显示,在登录完成后给主进程发送消息 让登录窗口关闭 让主界面显示
  //监听渲染进程中的  login-success 事件，
  ipcMain.on('login-success', (event, arg) => {
    console.log(arg) // prints "ping"
    mainWindow.setSize( 840,600)//现在登录窗口 跟 主页窗口是同一个窗口，也可以不是同一个窗口的，
    // 创建新窗口的时候，把旧窗口关闭就好 mainWindow.close() 就是关闭旧窗口了
    mainWindow.center()
    event.sender.send('login-success-reply', 'pong') //返回信息给渲染进程
  })
}

// app 就是整个桌面应用，控制你的应用程序的事件生命周期。
// ready：当 Electron 完成初始化时触发 createmainWindow???怎么也不是调用函数啊，这个是什么意思？
//app.on('ready',createmainWindow) 例子里面是这样写的
app.on('ready', () => {
  createMainWindow()
})

//在最后一个窗口被关闭时退出应用：
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

/**
 * Auto Updater 部署自动更新
 *
 * Uncomment the following code below and install `electron-updater` to
 * 取消下面的注释，并且安装 electron-updater
 * support auto updating. Code Signing with a valid certificate is required.
 * 支持自动更新。 需要使用有效证书进行代码签名。
 * 英文：https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 * 中文：https://simulatedgreg.gitbooks.io/electron-vue/content/cn/using-electron-builder.html
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
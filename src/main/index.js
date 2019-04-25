import {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  ipcMain
} from 'electron'
//import { autoUpdater } from 'electron-updater'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

function createMainWindow() {
  // 主页窗口
  // mainWindow 的官网文章：https://electronjs.org/docs/api/browser-window
  const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`
  mainWindow = new BrowserWindow({
    show: false, //创建一个隐藏的窗口
    width: 840,
    height: 600,
    frame: false,
    transparent: true,
    useContentSize: false, //默认 false，若使用 web 网页 size, 这意味着实际窗口的 size 应该包括窗口框架的 size，稍微会大一点，
    fullscreen: false, //默认 false（用来规定 窗口是否全屏，并且全屏之后没有缩小按钮
    //并且 false 的时候 mac 的全屏键被隐藏或者禁用，但是我希望不是全屏，并且可以方法呢？？？）
    title: ' ' //为什么这样设置不成功？？？？
  })
  mainWindow.loadURL(winURL)
  mainWindow.setMenu(null)
  mainWindow.setTitle(' ') //为什么这样设置不成功？？？？
  //wainWindow.flashFrame(true) 在任务栏闪烁，微信收到消息的时候闪烁吧
  mainWindow.setOverlayIcon('static/image/logo.png', '') //这个怎么也不成功呢？？？
  mainWindow.webContents.closeDevTools() //关闭控制台
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  //登录子窗口
  const loginURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080/#/login` :
    `file://${__dirname}/index.html/#/login`;
  let child = new BrowserWindow({
    parent: mainWindow,
    width: 280,
    height: 400,
    frame: false, //这两个字段，创建没有边框的 window
    transparent: true, //配合 css 中的 html, body {background: rgba(0, 0, 0, 0)!important;} 可以让 body 没有底色
    // 但是要注意的是去掉了边框之后就不能拖动了,movable:true 因为主线程中的拖动是对窗口，边框拖动的，其他地方拖动无效
    // 还是需要 css 来做的，但是 css 上面也是有问题的，后面再来学习一下是怎么做吧，微信是做到了拖动的
    useContentSize: false, //窗口大小不受 web 内容的影响
    resizable: false //不可改变窗口大小
    //webPreferences:{
    //  devTools:false
    //}
  })
  child.loadURL(loginURL)
  //child.setIgnoreMouseEvents(true) 整个窗口的鼠标事件都被忽略了不会被触发，
  // 不能用于拖拽导致的双击大，因为所有其他的也不能执行了，拖拽都不行了。
  child.setAlwaysOnTop(true)//设置在顶层
  child.webContents.openDevTools({
    mode: 'detach'
  }) //开启渲染进程的调试器，主进程的调试是别的办法
  //主进程调试：https://electronjs.org/docs/tutorial/debugging-main-process
  //child.loadURL(url.format({
  //  pathname: path.join(__dirname, 'login.html'),
  //  protocol: 'file',
  //  slashes: true
  //}))

  //在打开软件的同时加载主界面 但是不让主界面显示,在登录完成后给主进程发送消息 让登录窗口关闭 让主界面显示
  //监听渲染进程中的  login-success 事件，
  ipcMain.on('login-success', (event, arg) => {
    console.log(arg) // prints "ping"
    //mainWindow.setSize(840, 600) //现在登录窗口 跟 主页窗口是同一个窗口，也可以不是同一个窗口的，
    //mainWindow.center()
    mainWindow.show()
    mainWindow.webContents.openDevTools({
      mode: 'detach'
    }) //开启渲染进程的调试器
    child.hide()
    child.webContents.closeDevTools()
    event.sender.send('login-success-reply', 'pong') //返回信息给渲染进程
  })
}


// app 就是整个桌面应用，控制你的应用程序的事件生命周期。
// will-finish-launching：当应用程序完成基础的启动的时候被触发。在 mac 是在 ready 之前，Windows 和 Linux 与 ready 一样的
// ready：当 Electron 完成初始化时触发 createmainWindow 不是调用函数，而是作为参数
//app.on('ready', createMainWindow) // 例子里面是这样写的
app.on('ready', (launchInfo) => {
  createMainWindow()

  // 注册一个 'CommandOrControl+X' 的全局快捷键
  //const ret = globalShortcut.register('CommandOrControl+X', () => {
  //  console.log('CommandOrControl+X is pressed')
  //})
  //if (!ret) {
  //  console.log('registration failed')
  //}
  // 注册 截屏 快捷键
  const ScreeCapture = globalShortcut.register('CommandOrControl+Alt+A', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })


  // 检查快捷键是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))

  // 检查快捷键是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+Alt+A'))
  //if (process.env.NODE_ENV === 'production') {
  //  //向服务端查询现在是否有可用的更新。在调用这个方法之前，必须要先调用 setFeedURL。
  //  autoUpdater.checkForUpdates()
  //}
})

app.on('activate', () => {
  //当应用被激活时发出。 各种操作都可以触发此事件, 
  //例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它。
  if (mainWindow === null) {
    createMainWindow()
  }
})

app.on('window-all-closed', () => {
  //当所有的窗口都被关闭时触发。可以控制是否退出
  if (process.platform !== 'darwin') {
    app.quit() //试图关掉所有的窗口。
    // before-quit 事件将会最先被触发。如果所有的窗口都被成功关闭了， will-quit 事件将会被触发，默认下应用将会被关闭。
  }
})

app.on('before-quit', (event) => {
  //在应用程序开始关闭窗口之前触发。在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。
  event.preventDefault() //阻止默认的行为。默认的行为是终结应用程序。
})

app.on('will-quit', (event) => {
  //当所有窗口都已关闭并且应用程序将退出时发出。在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。
  // 注销 某个 快捷键
 // globalShortcut.unregister('CommandOrControl+X')
  // 注销所有快捷键
  globalShortcut.unregisterAll()
  event.preventDefault() //阻止默认的行为。默认的行为是终结应用程序。
})

app.on('quit', (event, exitCode) => {
  //在应用程序退出时发出。在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。
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
autoUpdater.on('error', () => {
  //更新发生错误的时候触发
})
autoUpdater.on('checking-for-update', () => {
  //当开始检查更新的时候触发。
})
autoUpdater.on('update-available', () => {
  //当发现一个可用更新的时候触发，更新包下载会自动开始。
})
autoUpdater.on('update-not-available', () => {
  //当没有可用更新的时候触发。
})


autoUpdater.on('update-downloaded', (event,releaseNotes,releaseName,releaseDate,updateURL) => {
  //在更新下载完成的时候触发。
  //在 Windows 上只有 releaseName 是有效的。
  //严格来说不需要处理此事件。即时成功下载之后，下一次应用程序启动时，仍将继续下载更新文件。
  autoUpdater.quitAndInstall()
  setTimeout(() => {
      mainWindow = null;
      app.quit();
  });
  // autoUpdater.quitAndInstall() 在下载完成后，重启当前的应用并且安装更新。仅在 update-downloaded 事件
  // 调用 autoUpdater.quitAndInstall() 将首先关闭所有应用程序窗口，并且在所有窗口都关闭之后自动调用 app.quit()
  // 不过是这样执行 setTimeout 么？？？
})


autoUpdater.on('before-quit-for-update', () => {
  //此事件是在用户调用 quitAndInstall() 之后发出的。
  //当此API被调用时，会在所有窗口关闭之前发出 before-quit 事件。 
  //因此，如果您希望在关闭窗口进程退出之前执行操作，则应该侦听此事件，以及侦听 before-quit。
})
 */
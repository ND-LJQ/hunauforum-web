
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#fff","titleText":"uni-app","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"hunauforum-web","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.8.12","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#999","selectedColor":"#42b884","borderStyle":"none","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#FFF","list":[{"iconPath":"/./static/images/index.png","selectedIconPath":"/./static/images/index-selected.png","text":"首页","pagePath":"pages/index/index"},{"iconPath":"/./static/images/community.png","selectedIconPath":"/./static/images/community-selected.png","text":"社区","pagePath":"pages/login/login"},{"iconPath":"/./static/images/shopping.png","selectedIconPath":"/./static/images/shopping-selected.png","text":"商城","pagePath":"pages/shopping/shopping"},{"iconPath":"/./static/images/message.png","selectedIconPath":"/static/images/message-selected.png","text":"消息","pagePath":"pages/message/message"},{"iconPath":"/./static/images/mine.png","selectedIconPath":"/./static/images/mine-selected.png","text":"我的","pagePath":"pages/userHome/userHome"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"enablePullDownRefresh":true,"titleNView":false,"pullToRefresh":{"support":true},"navigationBar":{"titleText":"uni-app","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/login/login","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#fff","titleText":"","type":"default"},"isNVue":false}},{"path":"pages/changepassword/changepassword","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#fff","titleText":"","type":"default"},"isNVue":false}},{"path":"pages/changepassword/changepasswdbyphone","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/changepassword/changepwdemail","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/changepassword/sendcode","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/register/register","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/passwdupdated/passwdupdated","meta":{"enablePullDownRefresh":false,"titleNView":false,"navigationBar":{"titleText":"","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/search/search","meta":{"enablePullDownRefresh":false,"titleNView":false,"navigationBar":{"titleText":"","type":"default","style":"custom"},"isNVue":false}},{"path":"pages/article/article","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/shopping/shopping","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  

(function () {
      
  const remote = require('electron').remote; 
  
  function init() { 
    document.getElementById("min-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      window.minimize(); 
    });
    
    document.getElementById("max-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }	 
    });
    
    document.getElementById("close-btn").addEventListener("click", function (e) {
      const window = remote.getCurrentWindow();
      window.close();
    }); 
  }; 
  
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      init(); 
    }
  };

  var ipcRenderer = require('electron').ipcRenderer;

  ipcRenderer.on('widget-info', function (event, widget) {
    document.getElementById('title').textContent = widget.name
    document.getElementById('webview').loadURL(widget.url, {
      userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Mobile Safari/537.36'
    })
  });
})();
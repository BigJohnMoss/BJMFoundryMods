console.log("Main.js is loaded and running");
console.log('module | Main.js is loaded and running');
  // Initialization hook
Hooks.once('init', () => {
    console.log("module | Initialized template");
    loadTemplates(["module/templates/wait-screen-shop.html"]);
  });
  
  // Ready hook
  Hooks.on('ready', () => {
    console.log("module | Ready");
    ui.notifications.info("Welcome to the upgraded wait screen!");
  });

  class WaitScreenShopApp extends Application {
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        id: "wait-screen-shop",
        title: "Wait Screen Shop",
        template: "modules/your-module-name/templates/wait-screen-shop.html", // Path to your HTML template
        width: 400,
        height: 300,
        resizable: true
      });
    }
  
    // Optionally, add data or methods for rendering dynamic content
    getData() {
      return {
        message: "Welcome to the Wait Screen Shop!"
      };
    }
  }

  Hooks.on('getSceneControlButtons', (controls) => {
    // Add a new toolset or find an existing one to append your button
    let tokenControls = controls.find((control) => control.name === "token");
  
    // If "token" controls exist, append the button to it
    if (tokenControls) {
      tokenControls.tools.push({
        name: "wait-screen-shop",
        title: "Wait Screen Shop",
        icon: "fas fa-shopping-cart", // Icon for the button
        onClick: () => {
          // Open the custom pop-up when clicked
          new WaitScreenShopApp().render(true);
        },
        visible: true
      });
    }
  });
  
  
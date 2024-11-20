console.log("Main.js is loaded and running");
console.log('module | Main.js is loaded and running');
  // Initialization hook
Hooks.once('init', () => {
    console.log("module | Initialized");
  });

  Hooks.once("init", () => {
    loadTemplates(["module/templates/wait-screen-shop.html"]);
  });
  
  // Ready hook
  Hooks.on('ready', () => {
    console.log("module | Ready");
    ui.notifications.info("Welcome to the upgraded wait screen!");
  });
  
  // Example: Display a custom message on the canvas
  Hooks.on('canvasReady', (canvas) => {
    if (canvas.scene) {
      console.log(`module | Scene Loaded: ${canvas.scene.name}`);
    }
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
    controls.push({
      name: "wait-screen-shop",
      title: "Wait Screen Shop",
      icon: "fas fa-shopping-cart", // Icon for the button
      layer: "controls",
      visible: game.user.isGM, // Make it visible only for GMs (optional)
      onClick: () => {
        // Open the custom pop-up when clicked
        new WaitScreenShopApp().render(true);
      },
      button: true
    });
  });
  
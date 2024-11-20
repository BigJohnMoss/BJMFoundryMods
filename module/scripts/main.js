
  // Initialization hook
Hooks.once('init', () => {
    console.log("Wait Screen Upgrade Module | Initialized");
  });
  
  // Ready hook
  Hooks.on('ready', () => {
    console.log("Wait Screen Upgrade Module | Ready");
    ui.notifications.info("Welcome to the upgraded wait screen!");
  });
  
  // Example: Display a custom message on the canvas
  Hooks.on('canvasReady', (canvas) => {
    if (canvas.scene) {
      console.log(`Wait Screen Upgrade Module | Scene Loaded: ${canvas.scene.name}`);
    }
  });
  
  
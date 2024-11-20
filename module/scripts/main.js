console.log("Main.js is loaded and running");
console.log('module | Main.js is loaded and running');
  // Initialization hook
Hooks.once('init', () => {
    console.log("module | Initialized");
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

  Hooks.on('renderSettingsConfig', (app, html) => {
    // Select the target container
    const settingsGameContainer = html.find('#settings-game');
  
    // Check if the container exists
    if (settingsGameContainer.length > 0) {
      // Ensure no duplicate buttons
      if (settingsGameContainer.find('.my-module-button').length === 0) {
        // Create a new button element
        const button = $(`
          <button class="my-module-button" data-action="my-action">
            <i class="fas fa-star"></i> My Custom Button
          </button>
        `);
  
        // Add a click listener for the button
        button.on('click', () => {
          ui.notifications.info("My Custom Button was clicked!");
          // Add your custom functionality here
        });
  
        // Append the button to the settings container
        settingsGameContainer.append(button);
      }
    }
  });
  
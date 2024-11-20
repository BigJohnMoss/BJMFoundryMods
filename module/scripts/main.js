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

  Hooks.on('renderSidebarTab', (app, html) => {
    console.log("we hit the render sidebar tab----------------------------------------------------------------------");
    // Check if the tab being rendered is the Actors Directory
    if (app.options.id === "actors") {
      // Ensure the button is not added multiple times
      if (html.find('.my-module-button').length === 0) {
        // Create a new button element
        const button = $(`<button class="my-module-button"><i class="fas fa-plus"></i> My Button</button>`);
        
        // Add a click listener to the button
        button.on('click', () => {
          // Add your desired functionality here
          ui.notifications.info("My Button was clicked!");
        });
  
        // Append the button to the sidebar header
        const header = html.find('.directory-header');
        header.append(button);
      }
    }
  });
  
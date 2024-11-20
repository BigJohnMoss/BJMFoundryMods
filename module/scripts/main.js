
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

  class SceneUpdater extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: "Scene Updater",
            id: "scene-updater",
            template: "modules/module/templates/gm-scene-updater.html",
            width: 400,
        });
    }

    // Provide default data for the form
    getData() {
        const scene = game.scenes.active;
        return {
            name: scene?.name || "",
            description: scene?.data?.description || "",
        };
    }

    // Handle form submission
    async _updateObject(event, formData) {
        const scene = game.scenes.active;
        if (!scene) {
            ui.notifications.error("No active scene to update.");
            return;
        }

        await scene.update({
            name: formData["scene-name"],
            description: formData["scene-description"],
        });

        ui.notifications.info("Scene updated successfully!");
    }
}

// Add a button to the game settings for the GM to open this page
Hooks.on("getSceneControlButtons", (controls) => {
  console.log("Adding Scene Updater button to scene controls");
  // Only add the button for GMs
  if (!game.user.isGM) return;

  // Add the button to the scene controls
  controls.push({
      name: "scene-updater",
      title: "Open Scene Updater",
      icon: "fa-solid fa-pencil-alt",
      onClick: () => {
          new SceneUpdater().render(true); // Opens the SceneUpdater application
      },
      button: true,
  });
});


  
  
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

Hooks.on("getSceneControlButtons", (controls) => {
  console.log("module | Adding Scene Updater button to scene controls");

  // Add a new control for GMs
  if (game.user.isGM) {
      controls.push({
          name: "scene-updater",
          title: "Scene Updater",
          icon: "fas fa-pencil-alt",
          layer: "controls", // Optional: Specify the layer
          tools: [], // Even if not used, ensure "tools" exists
          onClick: () => {
              new SceneUpdater().render(true);
          },
          button: true,
      });
  }
});
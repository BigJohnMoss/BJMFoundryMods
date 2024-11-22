console.log("Main.js is loaded and running");
console.log('module | Main.js is loaded and running');

// Initialization hook
Hooks.once('init', () => {
    console.log("module | Initialized template");
    loadTemplates(["modules/module/templates/wait-screen-shop.html"]);
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
            template: "modules/module/templates/wait-screen-shop.html", // Path to your HTML template
            width: 700,
            height: 700,
            resizable: true
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Dropdown and buttons
        const dropdown = html.find("#shop-options");
        const confirmButton = html.find("#confirm-button");
        const cancelButton = html.find("#cancel-button");

        // Event listener for Confirm button
        confirmButton.on("click", () => {
            const selectedOption = dropdown.val();
            if (!selectedOption) {
                ui.notifications.warn("Please select an option before confirming.");
                return;
            }
            // Change the background based on the selected option
            this.changeBackground(selectedOption);
        });

        // Event listener for Cancel button
        cancelButton.on("click", () => {
            ui.notifications.info("Selection canceled.");
        });
    }

    changeBackground(option) {
      const scene = game.scenes.active; // Get the active scene
      if (!scene) {
          ui.notifications.error("No active scene found.");
          return;
      }
  
      let backgroundUrl;
      switch (option) {
          case "Paul":
              backgroundUrl = "modules/module/images/Paul.jpg";
              break;
          case "Thomas":
              backgroundUrl = "modules/module/images/Thomas.jpg";
              break;
          case "Erik":
              backgroundUrl = "modules/module/images/Erik.jpg";
              break;
          case "Liam":
              backgroundUrl = "modules/module/images/Liam.jpg";
              break;
          case "Richard":
              backgroundUrl = "modules/module/images/Richard.jpg";
              break;
          default:
              ui.notifications.warn("Invalid option selected.");
              return;
      }
  
      // Update the scene's background image
      scene.update({ "background.src": backgroundUrl })
          .then(() => {
              ui.notifications.info(`Scene background updated to ${option}!`);
          })
          .catch((err) => {
              console.error(err);
              ui.notifications.error("Failed to update scene background.");
          });
  }
  
}

// Persistent reference to the app instance
let waitScreenShopApp = null;

Hooks.on('getSceneControlButtons', (controls) => {
    // Add a new toolset or find an existing one to append your button
    let tokenControls = controls.find((control) => control.name === "token");

    // If "token" controls exist, append the button to it
    if (tokenControls) {
        tokenControls.tools.push({
            name: "wait-screen-shop",
            title: "Wait Screen Shop",
            icon: "fas fa-shopping-cart", // Icon for the button
            onClick: (button) => {
                // Check if the app instance exists
                if (!waitScreenShopApp) {
                    // Create a new instance if it doesn't exist
                    waitScreenShopApp = new WaitScreenShopApp();
                }

                // Check if the application is rendered (exists in the DOM)
                const appElement = document.getElementById("wait-screen-shop");
                if (appElement) {
                    // If already rendered, bring to top
                    waitScreenShopApp.bringToTop();
                } else {
                    // Render the app
                    waitScreenShopApp.render(true);
                }

                // Manually toggle the button state off
                button.active = false;
                ui.controls.render();
            },
            toggle: true, // Mark this button as toggleable
            visible: true
        });
    }
});

// Clean up the app instance when it's closed
Hooks.on('closeWaitScreenShopApp', () => {
    waitScreenShopApp = null;
});

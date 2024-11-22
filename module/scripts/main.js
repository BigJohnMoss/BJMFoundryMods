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

// Persistent reference to the app instance
let waitScreenShopApp = null;

// Scene Controls Hook
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
            },
            visible: true
        });
    }
});

// Clean up the app instance when it's closed
Hooks.on('closeWaitScreenShopApp', () => {
    waitScreenShopApp = null;
});
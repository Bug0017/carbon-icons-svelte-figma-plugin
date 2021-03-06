'use strict';

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.    
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 500, height: 500 });
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
    if (msg.type === "import-icon") {
        console.log(msg.iconSVG);
    }
    figma.closePlugin();
};

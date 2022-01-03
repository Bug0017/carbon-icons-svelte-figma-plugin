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
    const defaultAttributes = {
      // Reference:
      // https://github.com/IBM/carbon-components-react/issues/1392
      // https://github.com/PolymerElements/iron-iconset-svg/pull/47
      // `focusable` is a string attribute which is why we do not use a boolean here
      focusable: "false",
      preserveAspectRatio: "xMidYMid meet",
    };
    function getAttributes({
      width,
      height,
      viewBox = `0 0 ${width} ${height}`,
      ...attributes
    } = {}) {
      const { tabindex, ...rest } = attributes as any;
      const iconAttributes = {
        ...defaultAttributes,
        ...rest,
        width,
        height,
        viewBox,
      };

      // TODO: attributes.title assumes that the consumer will implement <title> and
      // correctly set `aria-labelledby`.
      if (
        iconAttributes["aria-label"] ||
        iconAttributes["aria-labelledby"] ||
        iconAttributes.title
      ) {
        iconAttributes.role = "img";

        // Reference:
        // https://allyjs.io/tutorials/focusing-in-svg.html
        if (tabindex !== undefined && tabindex !== null) {
          iconAttributes.focusable = "true";
          iconAttributes.tabindex = tabindex;
        }
      } else {
        iconAttributes["aria-hidden"] = true;
      }

      return iconAttributes;
    }

    function toSVG(descriptor) {
      const { elem = "svg", attrs = {}, content = [] } = descriptor;
      const node = document.createElementNS("http://www.w3.org/2000/svg", elem);
      const attributes = elem !== "svg" ? attrs : getAttributes(attrs);

      Object.keys(attributes).forEach((key) => {
        node.setAttribute(key, attrs[key]);
      });

      for (let i = 0; i < content.length; i++) {
        node.appendChild(toSVG(content[i]));
      }

      return node;
    }
    const iconNode = toSVG({
      ...msg.iconSVG,
      attrs: getAttributes(msg.iconSVG.attrs),
    });

    figma.currentPage.appendChild(iconNode);
    figma.currentPage.selection = iconNode;
    figma.viewport.scrollAndZoomIntoView(iconNode);
    console.log(iconNode);
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

// This plugin will open a modal to prompt the user to enter a number, and
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
        function getAttributes(_a = {}) {
            var { width, height, viewBox = `0 0 ${width} ${height}` } = _a, attributes = __rest(_a, ["width", "height", "viewBox"]);
            const _b = attributes, { tabindex } = _b, rest = __rest(_b, ["tabindex"]);
            const iconAttributes = Object.assign(Object.assign(Object.assign({}, defaultAttributes), rest), { width,
                height,
                viewBox });
            // TODO: attributes.title assumes that the consumer will implement <title> and
            // correctly set `aria-labelledby`.
            if (iconAttributes["aria-label"] ||
                iconAttributes["aria-labelledby"] ||
                iconAttributes.title) {
                iconAttributes.role = "img";
                // Reference:
                // https://allyjs.io/tutorials/focusing-in-svg.html
                if (tabindex !== undefined && tabindex !== null) {
                    iconAttributes.focusable = "true";
                    iconAttributes.tabindex = tabindex;
                }
            }
            else {
                iconAttributes["aria-hidden"] = true;
            }
            return iconAttributes;
        }
        function toSVG(descriptor) {
            const { elem = "svg", attrs = {}, content = [] } = descriptor;
            const node = window.document.createElementNS("http://www.w3.org/2000/svg", elem);
            const attributes = elem !== "svg" ? attrs : getAttributes(attrs);
            Object.keys(attributes).forEach((key) => {
                node.setAttribute(key, attrs[key]);
            });
            for (let i = 0; i < content.length; i++) {
                node.appendChild(toSVG(content[i]));
            }
            return node;
        }
        const iconNode = toSVG(Object.assign(Object.assign({}, msg.iconSVG), { attrs: getAttributes(msg.iconSVG.attrs) }));
        figma.currentPage.appendChild(iconNode);
        figma.currentPage.selection = iconNode;
        figma.viewport.scrollAndZoomIntoView(iconNode);
        console.log(iconNode);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
//# sourceMappingURL=code.js.map

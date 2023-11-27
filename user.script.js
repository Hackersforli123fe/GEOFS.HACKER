// ==UserScript==
// @name                {@name:en}
// @name:tr             {@name:tr}
// @description         {@description:en}
// @description:tr      {@description:tr}
// @author              {@author}
// @namespace           {@namespace}
// @version             {@version}
// @license             {@license}
// @match               {@match}{@geo-fs-version}
// @icon                {@favicons}?sz=48&domain={@domain}
// @icon64              {@favicons}?sz=64&domain={@domain}
// @require             {@jquery.min:3.7.1}
// @require             {@toastr.min.js:2.1.4}
// @require             {@path}/{@branch}/src/classes/FlightAssistant.js
// @require             {@path}/{@branch}/src/classes/PluginManager.js
// @require             {@path}/{@branch}/src/plugins/Storage.js
// @require             {@path}/{@branch}/src/plugins/Toastr.js
// @resource            {@save-path}/src/classes/FlightAssistant.js.map {@path}/{@branch}/src/classes/FlightAssistant.js.map
// @resource            {@save-path}/src/classes/PluginManager.js.map {@path}/{@branch}/src/classes/PluginManager.js.map
// @resource            {@save-path}/src/plugins/Storage.js.map {@path}/{@branch}/src/plugins/Storage.js.map
// @resource            {@save-path}/src/plugins/Toastr.js.map {@path}/{@branch}/src/plugins/Toastr.js.map
// @resource            {@save-path}/user.script.js.map {@path}/{@branch}/user.script.js.map
// @connect             raw.githubusercontent.com
// @connect             greasyfork.org
// @grant               GM_setValue
// @grant               GM_getValue
// @grant               GM_deleteValue
// @grant               GM_listValues
// @grant               unsafeWindow
// @run-at              document-end
// ==/UserScript==

// ==OpenUserJS==
// @author              {@author}
// @name                {@name:en}
// @name:tr             {@name:tr}
// @description         {@description:en}
// @description:tr      {@description:tr}
// @namespace           {@namespace}
// @version             {@version}
// @license             {@license}
// ==/OpenUserJS==

// ==UserLibrary==
// @name                {@name:en}
// @name:tr             {@name:tr}
// @description         {@description:en}
// @description:tr      {@description:tr}
// @version             {@version}
// @license             {@license}
// ==/UserLibrary==

/* global $:false, jQuery:false, toastr:false, geofs:false, PluginManager:false, PStorage:false, Toastr:false, FlightAssistant:false */

(async () => {
  "use strict";

  const files = ["{@toastr.min.css:2.1.4}"];

  const disableElements = [
    ".geofs-adbanner.geofs-adsense-container",
    ".geofs-creditContainer.geofs-notForMobile",
  ];

  const plugin = new PluginManager();
  plugin.use(new PStorage("{@version}", { prefix: "{@plugin-prefix}" }));
  plugin.use(new Toastr());

  plugin.appendFilesToHead(files);
  plugin.instances.Toastr.notify("info", "External Files Imported");

  plugin.disableElements(disableElements);
  plugin.instances.Toastr.notify("info", "Some Elements Disabled");

  const assistant = new FlightAssistant(plugin);
  let storage = plugin.instances.PStorage;
  unsafeWindow.flightAssistant = {
    init: assistant,
    storage: storage,
    plugin: plugin,
  };
  unsafeWindow.executeOnEventDone("geofsInitialized", function () {
    assistant.init();
  });
})();

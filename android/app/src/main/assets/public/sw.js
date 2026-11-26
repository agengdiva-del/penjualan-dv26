/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "1909461bd4054770aada036cc7bedcac"
  }, {
    "url": "pwa-512x512.png",
    "revision": "84be487264df9bb5d973c01cdbbe4037"
  }, {
    "url": "pwa-192x192.png",
    "revision": "00f96711a14c77f78bfc5fdcc7bb1519"
  }, {
    "url": "index.html",
    "revision": "7de6e5e200a2ff543fce2c32b9faa689"
  }, {
    "url": "favicon.png",
    "revision": "1646d0facd46e9bab395cea8efa29df2"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a5db3e695f8adcfd4dd4dde0eba8089a"
  }, {
    "url": "src/assets/images/photo_room_ivory_1795599022734.jpg",
    "revision": "4b892bc144ebc03b0cb1ec5633c26681"
  }, {
    "url": "src/assets/images/factory_paint_machines_1795599023100.jpg",
    "revision": "434e2b27b852eafaba8e59a963ee65c8"
  }, {
    "url": "src/assets/images/banner_warehouse_finished_1795599022287.jpg",
    "revision": "02c19c077fa8a2b3159dbea65bb7ebf6"
  }, {
    "url": "src/assets/images/banner_sales_house_1795599022506.jpg",
    "revision": "e5a7e3089c2ecea8bc16b62fe7c19acb"
  }, {
    "url": "src/assets/images/banner_dashboard_interior_1795599021877.jpg",
    "revision": "ba6a025a7d8517119910a71e8c99e65b"
  }, {
    "url": "assets/index-Dp3vykew.css",
    "revision": null
  }, {
    "url": "assets/index-CRaXhv_D.js",
    "revision": null
  }, {
    "url": "assets/aistudio/image_0edf60d4.png",
    "revision": null
  }, {
    "url": "assets/aistudio/LOGO_GLOBAL__bbb94ab6.png",
    "revision": null
  }, {
    "url": "assets/aistudio/LOGO_DIVA_02_e555aa56.png",
    "revision": null
  }, {
    "url": "assets/aistudio/003_9881a867.png",
    "revision": null
  }, {
    "url": "assets/aistudio/002_44396202.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a5db3e695f8adcfd4dd4dde0eba8089a"
  }, {
    "url": "favicon.png",
    "revision": "1646d0facd46e9bab395cea8efa29df2"
  }, {
    "url": "pwa-192x192.png",
    "revision": "00f96711a14c77f78bfc5fdcc7bb1519"
  }, {
    "url": "pwa-512x512.png",
    "revision": "84be487264df9bb5d973c01cdbbe4037"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "1909461bd4054770aada036cc7bedcac"
  }, {
    "url": "manifest.webmanifest",
    "revision": "716b8675da564b5cfef7b685817a7475"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/api\//]
  }));

}));

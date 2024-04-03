var Ce = Object.defineProperty;
var Se = (p, e, s) => e in p ? Ce(p, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : p[e] = s;
var fe = (p, e, s) => (Se(p, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as ie, watch as de, ref as k, computed as ee, inject as O, openBlock as n, createElementBlock as v, unref as o, createCommentVNode as E, normalizeClass as U, createElementVNode as t, createTextVNode as F, toDisplayString as u, customRef as Me, withModifiers as W, Fragment as N, renderList as I, withDirectives as q, withKeys as Q, isRef as _e, vModelText as Z, nextTick as ce, createVNode as H, TransitionGroup as Ee, withCtx as A, onMounted as P, onUpdated as De, onBeforeUnmount as ke, vShow as re, normalizeStyle as be, vModelSelect as pe, provide as je, Transition as Ae, createBlock as L, resolveDynamicComponent as Te, renderSlot as le, onUnmounted as Le, vModelCheckbox as Oe } from "vue";
import Ve from "mitt";
import Fe from "dragselect";
import Be from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Ue from "cropperjs";
import ze from "@uppy/core";
import Ne from "@uppy/xhr-upload";
import "microtip/microtip.css";
var ge;
const me = (ge = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : ge.getAttribute("content");
class He {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    fe(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const s = this.config, r = {};
    me != null && me !== "" && (r[s.xsrfHeaderName] = me);
    const a = Object.assign({}, s.headers, r, e.headers), i = Object.assign({}, s.params, e.params), c = e.body, d = s.baseUrl + e.url, l = e.method;
    let m;
    l !== "get" && (c instanceof FormData ? (m = c, s.body != null && Object.entries(this.config.body).forEach(([_, x]) => {
      m.append(_, x);
    })) : (m = { ...c }, s.body != null && Object.assign(m, this.config.body)));
    const g = {
      url: d,
      method: l,
      headers: a,
      params: i,
      body: m
    };
    if (s.transformRequest != null) {
      const _ = s.transformRequest({
        url: d,
        method: l,
        headers: a,
        params: i,
        body: m
      });
      _.url != null && (g.url = _.url), _.method != null && (g.method = _.method), _.params != null && (g.params = _.params ?? {}), _.headers != null && (g.headers = _.headers ?? {}), _.body != null && (g.body = _.body);
    }
    return g;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const s = this.transformRequestParams(e), r = e.responseType || "json", a = {
      method: e.method,
      headers: s.headers,
      signal: e.abortSignal
    }, i = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let d;
      s.body instanceof FormData ? d = e.body : (d = JSON.stringify(s.body), a.headers["Content-Type"] = "application/json"), a.body = d;
    }
    const c = await fetch(i, a);
    if (c.ok)
      return await c[r]();
    throw await c.json();
  }
}
function Re(p) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof p == "string" ? Object.assign(e, { baseUrl: p }) : Object.assign(e, p), new He(e);
}
function qe(p) {
  let e = localStorage.getItem(p + "_storage");
  const s = ie(JSON.parse(e ?? "{}"));
  de(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(p + "_storage", JSON.stringify(s)) : localStorage.removeItem(p + "_storage");
  }
  function a(l, m) {
    s[l] = m;
  }
  function i(l) {
    delete s[l];
  }
  function c() {
    Object.keys(s).map((l) => i(l));
  }
  return { getStore: (l, m = null) => s.hasOwnProperty(l) ? s[l] : m, setStore: a, removeStore: i, clearStore: c };
}
async function Ie(p, e) {
  const s = e[p];
  return typeof s == "function" ? (await s()).default : s;
}
function Pe(p, e, s, r) {
  const { getStore: a, setStore: i } = p, c = k({}), d = k(a("locale", e)), l = (_, x = e) => {
    Ie(_, r).then((y) => {
      c.value = y, i("locale", _), d.value = _, i("translations", y), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + _ }), s.emit("vf-language-saved"));
    }).catch((y) => {
      x ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(x, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !a("locale") && !r.length ? l(e) : c.value = a("translations");
  const m = (_, ...x) => x.length ? m(_ = _.replace("%s", x.shift()), ...x) : _;
  function g(_, ...x) {
    return c.value && c.value.hasOwnProperty(_) ? m(c.value[_], ...x) : m(_, ...x);
  }
  return { t: g, changeLocale: l, locale: d };
}
const z = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, Ge = Object.values(z), Ye = "2.2.5";
function xe(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1024, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function ye(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1e3, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function We(p) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(p);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const J = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Ke(p, e) {
  const s = k(J.SYSTEM), r = k(J.LIGHT);
  s.value = p.getStore("theme", e ?? J.SYSTEM);
  const a = window.matchMedia("(prefers-color-scheme: dark)"), i = (c) => {
    s.value === J.DARK || s.value === J.SYSTEM && c.matches ? r.value = J.DARK : r.value = J.LIGHT;
  };
  return i(a), a.addEventListener("change", i), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: s,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(c) {
      s.value = c, c !== J.SYSTEM ? p.setStore("theme", c) : p.removeStore("theme"), i(a);
    }
  };
}
const Je = (p, e) => {
  const s = qe(p.id), r = Ve(), a = s.getStore("metricUnits", !1), i = Ke(s, p.theme), c = e.i18n, d = p.locale ?? e.locale, l = ee(() => Pe(s, d, r, c)), m = (_) => Array.isArray(_) ? _ : Ge, g = p.persist ? s.getStore("path", p.path) : p.path;
  return ie({
    // app version
    version: Ye,
    // root element
    root: null,
    // app id
    debug: p.debug,
    // Event Bus
    emitter: r,
    // active features
    features: m(p.features),
    // http object
    requester: Re(p.request),
    // theme state
    theme: i,
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: s.getStore("full-screen", p.fullScreen),
    // selectButton state
    selectButton: p.selectButton,
    // unit state - for example: GB or GiB
    metricUnits: a,
    // human readable file sizes
    filesize: a ? ye : xe,
    // max file size
    maxFileSize: p.maxFileSize,
    // loading state
    loading: !1,
    // default locale
    i18n: l,
    // modal state
    modal: {
      active: !1,
      type: "delete",
      data: {}
    },
    // main storage adapter
    adapter: s.getStore("adapter"),
    // main storage adapter
    path: g,
    // persist state
    persist: p.persist,
    // storage
    storage: s,
    // fetched items
    data: { adapter: s.getStore("adapter"), storages: [], dirname: g, files: [] },
    // selected items
    selectedItems: []
  });
}, Xe = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Qe = {
  key: 0,
  class: "flex text-center"
}, Ze = ["aria-label"], et = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), tt = [
  et
], st = ["aria-label"], at = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), ot = [
  at
], rt = ["aria-label"], nt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), lt = [
  nt
], it = ["aria-label"], dt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ct = [
  dt
], ut = {
  key: 1,
  class: "flex text-center"
}, mt = { class: "pl-2" }, vt = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, pt = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, ht = /* @__PURE__ */ t("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), ft = /* @__PURE__ */ t("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), gt = [
  ht,
  ft
], _t = { class: "flex text-center items-center justify-end" }, kt = ["aria-label"], bt = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, xt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, yt = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, wt = ["aria-label"], $t = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Ct = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, St = {
  name: "VFToolbar"
}, Mt = /* @__PURE__ */ Object.assign(St, {
  setup(p) {
    const e = O("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, a = k([]), i = k("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen, s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      a.value = l;
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s("viewport", e.view);
    };
    return (l, m) => (n(), v("div", Xe, [
      i.value.length ? (n(), v("div", ut, [
        t("div", mt, [
          F(u(o(r)("Search results for")) + " ", 1),
          t("span", vt, u(i.value), 1)
        ]),
        o(e).loading ? (n(), v("svg", pt, gt)) : E("", !0)
      ])) : (n(), v("div", Qe, [
        o(e).features.includes(o(z).UPLOAD) ? (n(), v("div", {
          key: 0,
          class: "upload mx-1.5",
          "aria-label": o(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[0] || (m[0] = (g) => o(e).emitter.emit("vf-modal-show", { type: "upload", items: a.value }))
        }, tt, 8, Ze)) : E("", !0),
        o(e).features.includes(o(z).RENAME) ? (n(), v("div", {
          key: 1,
          class: "rename mx-1.5",
          "aria-label": o(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[1] || (m[1] = (g) => a.value.length != 1 || o(e).emitter.emit("vf-modal-show", { type: "rename", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ot, 2))
        ], 8, st)) : E("", !0),
        o(e).features.includes(o(z).UNARCHIVE) && a.value.length == 1 && a.value[0].mime_type == "application/zip" ? (n(), v("div", {
          key: 2,
          class: "unarchive mx-1.5",
          "aria-label": o(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[2] || (m[2] = (g) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "unarchive", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, lt, 2))
        ], 8, rt)) : E("", !0),
        o(e).features.includes(o(z).ARCHIVE) ? (n(), v("div", {
          key: 3,
          class: "archive mx-1.5",
          "aria-label": o(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: m[3] || (m[3] = (g) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "archive", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ct, 2))
        ], 8, it)) : E("", !0)
      ])),
      t("div", _t, [
        o(e).features.includes(o(z).FULL_SCREEN) ? (n(), v("div", {
          key: 0,
          class: "fullscreen mx-1.5",
          "aria-label": o(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: c
        }, [
          (n(), v("svg", bt, [
            o(e).fullScreen ? (n(), v("path", xt)) : (n(), v("path", yt))
          ]))
        ], 8, kt)) : E("", !0),
        t("div", {
          class: "mx-1.5",
          "aria-label": o(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: m[4] || (m[4] = (g) => i.value.length || d())
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([i.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            o(e).view === "grid" ? (n(), v("path", $t)) : E("", !0),
            o(e).view === "list" ? (n(), v("path", Ct)) : E("", !0)
          ], 2))
        ], 8, wt)
      ])
    ]));
  }
}), Et = (p, e = 0, s = !1) => {
  let r;
  return (...a) => {
    s && !r && p(...a), clearTimeout(r), r = setTimeout(() => {
      p(...a);
    }, e);
  };
}, Dt = (p, e, s) => {
  const r = k(p);
  return Me((a, i) => ({
    get() {
      return a(), r.value;
    },
    set: Et(
      (c) => {
        r.value = c, i();
      },
      e,
      s
    )
  }));
}, jt = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, At = ["aria-label"], Tt = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Lt = [
  Tt
], Ot = ["aria-label"], Vt = /* @__PURE__ */ t("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), Ft = [
  Vt
], Bt = ["aria-label"], Ut = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), zt = [
  Ut
], Nt = /* @__PURE__ */ t("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Ht = [
  Nt
], Rt = { class: "flex leading-6" }, qt = /* @__PURE__ */ t("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), It = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Pt = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Gt = /* @__PURE__ */ t("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Yt = /* @__PURE__ */ t("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), Wt = [
  Gt,
  Yt
], Kt = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full"
}, Jt = /* @__PURE__ */ t("div", null, [
  /* @__PURE__ */ t("svg", {
    class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    })
  ])
], -1), Xt = ["placeholder"], Qt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Zt = [
  Qt
], es = {
  name: "VFBreadcrumb"
}, ts = /* @__PURE__ */ Object.assign(es, {
  setup(p) {
    const e = k(null), s = k([]), r = k(!1), a = k(null), i = O("ServiceContainer"), { t: c } = i.i18n;
    i.emitter.on("vf-explorer-update", () => {
      let $ = [], f = [];
      e.value = i.data.dirname ?? i.adapter + "://", e.value.length == 0 && (s.value = []), e.value.replace(i.adapter + "://", "").split("/").forEach(function(h) {
        $.push(h), $.join("/") != "" && f.push({
          basename: h,
          name: h,
          path: i.adapter + "://" + $.join("/"),
          type: "dir"
        });
      }), f.length > 4 && (f = f.slice(-5), f[0].name = ".."), s.value = f;
    });
    const d = () => {
      r.value = !1, m.value = "";
    };
    i.emitter.on("vf-search-exit", () => {
      d();
    });
    const l = () => {
      i.features.includes(z.SEARCH) && (r.value = !0, ce(() => a.value.focus()));
    }, m = Dt("", 400);
    de(m, ($) => {
      i.emitter.emit("vf-toast-clear"), i.emitter.emit("vf-search-query", { newQuery: $ });
    });
    const g = () => s.value.length && !r.value, _ = ($, f = null) => {
      $.preventDefault(), y($), f ?? (f = s.value.length - 2);
      let h = JSON.parse($.dataTransfer.getData("items"));
      if (h.find((B) => B.storage !== i.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      i.emitter.emit("vf-modal-show", {
        type: "move",
        items: { from: h, to: s.value[f] ?? { path: i.adapter + "://" } }
      });
    }, x = ($) => {
      $.preventDefault(), g() ? ($.dataTransfer.dropEffect = "copy", $.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-500")) : ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none");
    }, y = ($) => {
      $.preventDefault(), $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500"), g() && $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500");
    }, M = () => {
      m.value == "" && d();
    };
    return ($, f) => (n(), v("div", jt, [
      t("span", {
        "aria-label": o(c)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onDragover: f[0] || (f[0] = (h) => x(h)),
          onDragleave: f[1] || (f[1] = (h) => y(h)),
          onDrop: f[2] || (f[2] = (h) => _(h)),
          onClick: f[3] || (f[3] = (h) => {
            var B;
            return !g() || o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: ((B = s.value[s.value.length - 2]) == null ? void 0 : B.path) ?? o(i).adapter + "://" } });
          }),
          class: U(["h-6 w-6 p-0.5 rounded", g() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Lt, 34))
      ], 8, At),
      o(i).loading ? (n(), v("span", {
        key: 1,
        "aria-label": o(c)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onClick: f[5] || (f[5] = (h) => o(i).emitter.emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, zt))
      ], 8, Bt)) : (n(), v("span", {
        key: 0,
        "aria-label": o(c)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onClick: f[4] || (f[4] = (h) => {
            o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: o(i).data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, Ft))
      ], 8, Ot)),
      r.value ? (n(), v("div", Kt, [
        Jt,
        q(t("input", {
          ref_key: "searchInput",
          ref: a,
          onKeydown: Q(d, ["esc"]),
          onBlur: M,
          "onUpdate:modelValue": f[10] || (f[10] = (h) => _e(m) ? m.value = h : null),
          placeholder: o(c)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Xt), [
          [Z, o(m)]
        ]),
        (n(), v("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: d,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, Zt))
      ])) : (n(), v("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: W(l, ["self"])
      }, [
        (n(), v("svg", {
          onDragover: f[6] || (f[6] = (h) => x(h)),
          onDragleave: f[7] || (f[7] = (h) => y(h)),
          onDrop: f[8] || (f[8] = (h) => _(h, -1)),
          onClick: f[9] || (f[9] = (h) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Ht, 32)),
        t("div", Rt, [
          (n(!0), v(N, null, I(s.value, (h, B) => (n(), v("div", { key: B }, [
            qt,
            t("span", {
              onDragover: (R) => B === s.value.length - 1 || x(R),
              onDragleave: (R) => B === s.value.length - 1 || y(R),
              onDrop: (R) => B === s.value.length - 1 || _(R, B),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: h.basename,
              onClick: (R) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: h.path } })
            }, u(h.name), 41, It)
          ]))), 128))
        ]),
        o(i).loading ? (n(), v("svg", Pt, Wt)) : E("", !0)
      ]))
    ]));
  }
}), we = (p, e = null) => new Date(p * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), ss = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, as = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), os = [
  as
], rs = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, ns = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), ls = [
  ns
], is = {
  name: "VFSortIcon"
}, ne = /* @__PURE__ */ Object.assign(is, {
  props: { direction: String },
  setup(p) {
    return (e, s) => (n(), v("div", null, [
      p.direction === "down" ? (n(), v("svg", ss, os)) : E("", !0),
      p.direction === "up" ? (n(), v("svg", rs, ls)) : E("", !0)
    ]));
  }
}), ds = ["onClick"], cs = {
  name: "VFToast.vue"
}, us = /* @__PURE__ */ Object.assign(cs, {
  setup(p) {
    const e = O("ServiceContainer"), { getStore: s } = e.storage, r = k(s("full-screen", !1)), a = k([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
      a.value.splice(l, 1);
    }, d = (l) => {
      let m = a.value.findIndex((g) => g.id === l);
      m !== -1 && c(m);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let m = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = m, a.value.push(l), setTimeout(() => {
        d(m);
      }, 5e3);
    }), (l, m) => (n(), v("div", {
      class: U([r.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      H(Ee, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: A(() => [
          (n(!0), v(N, null, I(a.value, (g, _) => (n(), v("div", {
            onClick: (x) => c(_),
            key: g,
            class: U([i(g.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, u(g.label), 11, ds))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
});
function he(p, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return p.replace(new RegExp(s), "$2..$4");
}
const ms = { class: "relative flex-auto flex flex-col overflow-hidden" }, vs = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, ps = { class: "absolute" }, hs = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), fs = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, gs = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], _s = { class: "grid grid-cols-12 items-center" }, ks = { class: "flex col-span-7 items-center" }, bs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ys = [
  xs
], ws = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $s = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Cs = [
  $s
], Ss = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ms = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Es = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Ds = { class: "grid grid-cols-12 items-center" }, js = { class: "flex col-span-7 items-center" }, As = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ts = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ls = [
  Ts
], Os = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fs = [
  Vs
], Bs = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Us = { class: "col-span-2 text-center" }, zs = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ns = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Hs = { class: "relative" }, Rs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Is = [
  qs
], Ps = ["data-src", "alt"], Gs = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ys = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ws = [
  Ys
], Ks = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Js = { class: "break-all" }, Xs = {
  name: "VFExplorer"
}, Qs = /* @__PURE__ */ Object.assign(Xs, {
  setup(p) {
    const e = O("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = (w) => w == null ? void 0 : w.substring(0, 3), a = k(null), i = k(null), c = k(0), d = k(null), l = Math.floor(Math.random() * 2 ** 32), m = k("");
    let g;
    e.emitter.on("vf-fullscreen-toggle", () => {
      a.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: w }) => {
      m.value = w, w ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: w
        },
        onSuccess: (D) => {
          D.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let _ = null;
    const x = () => {
      _ && clearTimeout(_);
    }, y = k(!0), M = (w) => {
      w.touches.length > 1 && (y.value ? (d.value.stop(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: off") })) : (d.value.start(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: on") }), e.emitter.emit("vf-explorer-update")), y.value = !y.value);
    }, $ = (w) => {
      _ = setTimeout(() => {
        const D = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: w.target.getBoundingClientRect().x,
          clientY: w.target.getBoundingClientRect().y
        });
        w.target.dispatchEvent(D);
      }, 500);
    }, f = (w) => {
      w.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: w.path } })) : e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: w });
    }, h = ie({ active: !1, column: "", order: "" }), B = (w = !0) => {
      let D = [...e.data.files], C = h.column, j = h.order == "asc" ? 1 : -1;
      if (!w)
        return D;
      const S = (b, T) => typeof b == "string" && typeof T == "string" ? b.toLowerCase().localeCompare(T.toLowerCase()) : b < T ? -1 : b > T ? 1 : 0;
      return h.active && (D = D.slice().sort((b, T) => S(b[C], T[C]) * j)), D;
    }, R = (w) => {
      h.active && h.column == w ? (h.active = h.order == "asc", h.column = w, h.order = "desc") : (h.active = !0, h.column = w, h.order = "asc");
    }, K = () => d.value.getSelection().map((w) => JSON.parse(w.dataset.item)), te = (w, D) => {
      if (w.altKey || w.ctrlKey || w.metaKey)
        return w.preventDefault(), !1;
      w.dataTransfer.setDragImage(i.value, 0, 15), w.dataTransfer.effectAllowed = "all", w.dataTransfer.dropEffect = "copy", w.dataTransfer.setData("items", JSON.stringify(K()));
    }, se = (w, D) => {
      w.preventDefault();
      let C = JSON.parse(w.dataTransfer.getData("items"));
      if (C.find((j) => j.storage !== e.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.emitter.emit("vf-modal-show", { type: "move", items: { from: C, to: D } });
    }, ae = (w, D) => {
      w.preventDefault(), !D || D.type !== "dir" || d.value.getSelection().find((C) => C == w.currentTarget) ? (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : w.dataTransfer.dropEffect = "copy";
    }, oe = () => {
      d.value = new Fe({
        area: a.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), e.emitter.on("vf-explorer-update", () => ce(() => {
        d.value.clearSelection(), d.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + l)
        });
      })), d.value.subscribe("predragstart", ({ event: w, isDragging: D }) => {
        if (D)
          c.value = d.value.getSelection().length, d.value.break();
        else {
          const C = w.target.offsetWidth - w.offsetX, j = w.target.offsetHeight - w.offsetY;
          C < 15 && j < 15 && (d.value.clearSelection(), d.value.break());
        }
      }), d.value.subscribe("predragmove", ({ isDragging: w }) => {
        w && d.value.break();
      }), d.value.subscribe("callback", ({ items: w, event: D, isDragging: C }) => {
        e.emitter.emit("vf-nodes-selected", K()), c.value = d.value.getSelection().length;
      });
    };
    return P(() => {
      g = new Be(a.value), oe();
    }), De(() => {
      d.value.Area.reset(), d.value.SelectorArea.updatePos(), g.update();
    }), P(() => {
      de(() => e.view, () => e.emitter.emit("vf-explorer-update"));
    }), ke(() => {
      g.destroy();
    }), (w, D) => (n(), v("div", ms, [
      o(e).view == "list" || m.value.length ? (n(), v("div", vs, [
        t("div", {
          onClick: D[0] || (D[0] = (C) => R("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          F(u(o(s)("Name")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "basename"]
          ])
        ]),
        m.value.length ? E("", !0) : (n(), v("div", {
          key: 0,
          onClick: D[1] || (D[1] = (C) => R("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          F(u(o(s)("Size")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "file_size"]
          ])
        ])),
        m.value.length ? E("", !0) : (n(), v("div", {
          key: 1,
          onClick: D[2] || (D[2] = (C) => R("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          F(u(o(s)("Date")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "last_modified"]
          ])
        ])),
        m.value.length ? (n(), v("div", {
          key: 2,
          onClick: D[3] || (D[3] = (C) => R("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          F(u(o(s)("Filepath")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "path"]
          ])
        ])) : E("", !0)
      ])) : E("", !0),
      t("div", ps, [
        t("div", {
          ref_key: "dragImage",
          ref: i,
          class: "absolute -z-50 -top-96"
        }, [
          hs,
          t("div", fs, u(c.value), 1)
        ], 512)
      ]),
      t("div", {
        onTouchstart: M,
        onContextmenu: D[10] || (D[10] = W((C) => o(e).emitter.emit("vf-contextmenu-show", { event: C, area: a.value, items: K() }), ["self", "prevent"])),
        class: U([o(e).fullScreen ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: a
      }, [
        m.value.length ? (n(!0), v(N, { key: 0 }, I(B(), (C, j) => (n(), v("div", {
          onDblclick: (S) => f(C),
          onTouchstart: D[4] || (D[4] = (S) => $(S)),
          onTouchend: D[5] || (D[5] = (S) => x()),
          onContextmenu: W((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, area: a.value, items: K(), target: C }), ["prevent"]),
          class: U(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", _s, [
            t("div", ks, [
              C.type === "dir" ? (n(), v("svg", bs, ys)) : (n(), v("svg", ws, Cs)),
              t("span", Ss, u(C.basename), 1)
            ]),
            t("div", Ms, u(C.path), 1)
          ])
        ], 42, gs))), 256)) : E("", !0),
        o(e).view === "list" && !m.value.length ? (n(!0), v(N, { key: 1 }, I(B(), (C, j) => (n(), v("div", {
          draggable: "true",
          onDblclick: (S) => f(C),
          onTouchstart: D[6] || (D[6] = (S) => $(S)),
          onTouchend: D[7] || (D[7] = (S) => x()),
          onContextmenu: W((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, area: a.value, items: K(), target: C }), ["prevent"]),
          onDragstart: (S) => te(S),
          onDragover: (S) => ae(S, C),
          onDrop: (S) => se(S, C),
          class: U(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", Ds, [
            t("div", js, [
              C.type === "dir" ? (n(), v("svg", As, Ls)) : (n(), v("svg", Os, Fs)),
              t("span", Bs, u(C.basename), 1)
            ]),
            t("div", Us, u(C.file_size ? o(e).filesize(C.file_size) : ""), 1),
            t("div", zs, u(o(we)(C.last_modified)), 1)
          ])
        ], 42, Es))), 256)) : E("", !0),
        o(e).view === "grid" && !m.value.length ? (n(!0), v(N, { key: 2 }, I(B(!1), (C, j) => (n(), v("div", {
          draggable: "true",
          onDblclick: (S) => f(C),
          onTouchstart: D[8] || (D[8] = (S) => $(S)),
          onTouchend: D[9] || (D[9] = (S) => x()),
          onContextmenu: W((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, area: a.value, items: K(), target: C }), ["prevent"]),
          onDragstart: (S) => te(S),
          onDragover: (S) => ae(S, C),
          onDrop: (S) => se(S, C),
          class: U(["vf-item-" + o(l), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", null, [
            t("div", Hs, [
              C.type === "dir" ? (n(), v("svg", Rs, Is)) : (C.mime_type ?? "").startsWith("image") ? (n(), v("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": o(e).requester.getPreviewUrl(o(e).adapter, C),
                alt: C.basename
              }, null, 8, Ps)) : (n(), v("svg", Gs, Ws)),
              !(C.mime_type ?? "").startsWith("image") && C.type != "dir" ? (n(), v("div", Ks, u(r(C.extension)), 1)) : E("", !0)
            ]),
            t("span", Js, u(o(he)(C.basename)), 1)
          ])
        ], 42, Ns))), 256)) : E("", !0)
      ], 34),
      H(us)
    ]));
  }
}), Zs = ["href", "download"], ea = ["onClick"], ta = {
  name: "VFContextMenu"
}, sa = /* @__PURE__ */ Object.assign(ta, {
  setup(p) {
    const e = O("ServiceContainer"), { t: s } = e.i18n, r = k(null), a = k([]), i = k(""), c = ie({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ee(() => c.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      a.value = _;
    });
    const l = {
      delete: {
        key: z.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "delete", items: a });
        }
      },
      refresh: {
        title: () => s("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
        }
      },
      preview: {
        key: z.PREVIEW,
        title: () => s("Preview"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: a.value[0] });
        }
      },
      open: {
        title: () => s("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: a.value[0].path } });
        }
      },
      openDir: {
        title: () => s("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: a.value[0].dir } });
        }
      },
      download: {
        key: z.DOWNLOAD,
        link: ee(() => e.requester.getDownloadUrl(e.data.adapter, a.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: z.ARCHIVE,
        title: () => s("Archive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "archive", items: a });
        }
      },
      unarchive: {
        key: z.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "unarchive", items: a });
        }
      },
      rename: {
        key: z.RENAME,
        title: () => s("Rename"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "rename", items: a });
        }
      }
    }, m = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      i.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, area: x, items: y, target: M = null }) => {
      if (c.items = [], i.value)
        if (M)
          c.items.push(l.openDir), e.emitter.emit("vf-context-selected", [M]);
        else
          return;
      else
        !M && !i.value ? (c.items.push(l.refresh), c.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : y.length > 1 && y.some(($) => $.path === M.path) ? (c.items.push(l.refresh), c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", y)) : (M.type == "dir" ? c.items.push(l.open) : (c.items.push(l.preview), c.items.push(l.download)), c.items.push(l.rename), M.mime_type == "application/zip" ? c.items.push(l.unarchive) : c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", [M]));
      g(_, x);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const g = (_, x) => {
      c.active = !0, ce(() => {
        const y = e.root.getBoundingClientRect(), M = x.getBoundingClientRect();
        let $ = _.pageX - y.left, f = _.pageY - y.top, h = r.value.offsetHeight, B = r.value.offsetWidth;
        $ = M.right - _.pageX + window.scrollX < B ? $ - B : $, f = M.bottom - _.pageY + window.scrollY < h ? f - h : f, c.positions = {
          left: $ + "px",
          top: f + "px"
        };
      });
    };
    return (_, x) => c.active ? (n(), v("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: r,
      style: be(c.positions)
    }, [
      (n(!0), v(N, null, I(d.value, (y) => (n(), v("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: y.title
      }, [
        y.link ? (n(), v("a", {
          key: 0,
          class: "block pl-2 pr-3 py-1",
          target: "_blank",
          href: y.link,
          download: y.link,
          onClick: x[0] || (x[0] = (M) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          t("span", null, u(y.title()), 1)
        ], 8, Zs)) : (n(), v("div", {
          key: 1,
          class: "pl-2 pr-3 py-1",
          onClick: (M) => m(y)
        }, [
          t("span", null, u(y.title()), 1)
        ], 8, ea))
      ]))), 128))
    ], 4)) : E("", !0);
  }
}), aa = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, oa = { class: "flex leading-5 items-center" }, ra = ["aria-label"], na = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), la = [
  na
], ia = ["value"], da = { class: "ml-3" }, ca = { key: 0 }, ua = { class: "ml-1" }, ma = { class: "flex leading-5 items-center justify-end" }, va = ["disabled"], pa = ["aria-label"], ha = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), fa = [
  ha
], ga = {
  name: "VFStatusbar"
}, _a = /* @__PURE__ */ Object.assign(ga, {
  setup(p) {
    const e = O("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, a = k(0), i = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.adapter } }), r("adapter", e.adapter);
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      a.value = l.length;
    });
    const c = k("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const d = ee(() => {
      const l = e.selectButton.multiple ? e.selectedItems.length > 0 : e.selectedItems.length === 1;
      return e.selectButton.active && l;
    });
    return (l, m) => (n(), v("div", aa, [
      t("div", oa, [
        t("div", {
          class: "mx-2",
          "aria-label": o(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, la, 8, ra),
        q(t("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (g) => o(e).adapter = g),
          onChange: i,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), v(N, null, I(o(e).data.storages, (g) => (n(), v("option", { value: g }, u(g), 9, ia))), 256))
        ], 544), [
          [pe, o(e).adapter]
        ]),
        t("div", da, [
          c.value.length ? (n(), v("span", ca, u(o(e).data.files.length) + " items found. ", 1)) : E("", !0),
          t("span", ua, u(a.value > 0 ? o(s)("%s item(s) selected.", a.value) : ""), 1)
        ])
      ]),
      t("div", ma, [
        o(e).selectButton.active ? (n(), v("button", {
          key: 0,
          class: U(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: m[1] || (m[1] = (g) => o(e).selectButton.click(o(e).selectedItems, g))
        }, u(o(s)("Select")), 11, va)) : E("", !0),
        t("span", {
          class: "mr-1",
          "aria-label": o(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: m[2] || (m[2] = (g) => o(e).emitter.emit("vf-modal-show", { type: "about" }))
        }, fa, 8, pa)
      ])
    ]));
  }
}), ka = {
  name: "VueFinder"
}, ba = /* @__PURE__ */ Object.assign(ka, {
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: "."
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    selectButton: {
      type: Object,
      default(p) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...p
        };
      }
    }
  },
  emits: ["select"],
  setup(p, { emit: e }) {
    const s = e, a = Je(p, O("VueFinderOptions"));
    je("ServiceContainer", a);
    const { setStore: i } = a.storage, c = k(null);
    a.root = c, a.i18n, a.emitter.on("vf-modal-close", () => {
      a.modal.active = !1;
    }), a.emitter.on("vf-modal-show", (m) => {
      a.modal.active = !0, a.modal.type = m.type, a.modal.data = m;
    });
    const d = (m) => {
      Object.assign(a.data, m), a.emitter.emit("vf-nodes-selected", {}), a.emitter.emit("vf-explorer-update");
    };
    a.emitter.on("vf-nodes-selected", (m) => {
      a.selectedItems = m, s("select", m);
    });
    let l;
    return a.emitter.on("vf-fetch-abort", () => {
      l.abort(), a.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: m, body: g = null, onSuccess: _ = null, onError: x = null, noCloseModal: y = !1 }) => {
      ["index", "search"].includes(m.q) && (l && l.abort(), a.loading = !0), l = new AbortController();
      const M = l.signal;
      a.requester.send({
        url: "",
        method: m.m || "get",
        params: m,
        body: g,
        abortSignal: M
      }).then(($) => {
        a.adapter = $.adapter, a.persist && (a.path = $.dirname, i("path", a.path)), ["index", "search"].includes(m.q) && (a.loading = !1), y || a.emitter.emit("vf-modal-close"), d($), _ && _($);
      }).catch(($) => {
        console.error($), x && x($);
      });
    }), a.emitter.on("vf-download", (m) => {
      const g = document.createElement("a");
      g.style.display = "none", g.target = "_blank", g.href = m, g.download = m, a.root.appendChild(g), g.click(), g.remove();
    }), P(() => {
      let m = {};
      a.path.includes("://") && (m = {
        adapter: a.path.split("://")[0],
        path: a.path
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter, ...m } });
    }), (m, g) => (n(), v("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c
    }, [
      t("div", {
        class: U(o(a).theme.actualValue === "dark" ? "dark" : "")
      }, [
        t("div", {
          class: U([o(a).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: be(o(a).fullScreen ? "" : "max-height: " + p.maxHeight),
          onMousedown: g[0] || (g[0] = (_) => o(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (_) => o(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          H(Mt),
          H(ts),
          H(Qs),
          H(_a)
        ], 38),
        H(Ae, { name: "fade" }, {
          default: A(() => [
            o(a).modal.active ? (n(), L(Te("v-f-modal-" + o(a).modal.type), { key: 0 })) : E("", !0)
          ]),
          _: 1
        }),
        H(sa)
      ], 2)
    ], 512));
  }
}), xa = /* @__PURE__ */ t("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), ya = { class: "fixed z-10 inset-0 overflow-hidden" }, wa = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, $a = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Ca = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, G = {
  __name: "ModalLayout",
  setup(p) {
    const e = O("ServiceContainer");
    return P(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, r) => (n(), v("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Q((a) => o(e).emitter.emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      xa,
      t("div", ya, [
        t("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: r[0] || (r[0] = W((a) => o(e).emitter.emit("vf-modal-close"), ["self"]))
        }, [
          t("div", wa, [
            t("div", $a, [
              le(s.$slots, "default")
            ]),
            t("div", Ca, [
              le(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Sa = ["aria-label"], Ma = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Ea = [
  Ma
], Da = {
  name: "Message"
}, Y = /* @__PURE__ */ Object.assign(Da, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(p, { emit: e }) {
    var m;
    const s = e, r = O("ServiceContainer"), { t: a } = r.i18n, i = k(!1), c = k(null), d = k((m = c.value) == null ? void 0 : m.strMessage);
    de(d, () => i.value = !1);
    const l = () => {
      s("hidden"), i.value = !0;
    };
    return (g, _) => (n(), v("div", null, [
      i.value ? E("", !0) : (n(), v("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: U(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", p.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        le(g.$slots, "default"),
        t("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": o(a)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Ea, 8, Sa)
      ], 2))
    ]));
  }
}), ja = { class: "sm:flex sm:items-start" }, Aa = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Ta = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, La = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Oa = { class: "mt-2" }, Va = { class: "text-sm text-gray-500" }, Fa = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Ba = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ua = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, za = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Na = [
  za
], Ha = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ra = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), qa = [
  Ra
], Ia = { class: "ml-1.5" }, Pa = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Ga = {
  name: "VFModalDelete"
}, Ya = /* @__PURE__ */ Object.assign(Ga, {
  setup(p) {
    const e = O("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(e.modal.data.items), a = k(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, u(o(s)("Yes, Delete!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1),
        t("div", Pa, u(o(s)("This action cannot be undone.")), 1)
      ]),
      default: A(() => [
        t("div", ja, [
          Aa,
          t("div", Ta, [
            t("h3", La, u(o(s)("Delete files")), 1),
            t("div", Oa, [
              t("p", Va, u(o(s)("Are you sure you want to delete these files?")), 1),
              t("div", Fa, [
                (n(!0), v(N, null, I(r.value, (l) => (n(), v("p", Ba, [
                  l.type === "dir" ? (n(), v("svg", Ua, Na)) : (n(), v("svg", Ha, qa)),
                  t("span", Ia, u(l.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (n(), L(Y, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => a.value = ""),
                error: ""
              }, {
                default: A(() => [
                  F(u(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wa = { class: "sm:flex sm:items-start" }, Ka = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), Ja = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Xa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Qa = { class: "mt-2" }, Za = { class: "text-sm text-gray-500" }, eo = {
  name: "VFModalMessage"
}, to = /* @__PURE__ */ Object.assign(eo, {
  setup(p) {
    const e = O("ServiceContainer"), { t: s } = e.i18n;
    return (r, a) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Close")), 1)
      ]),
      default: A(() => {
        var i, c;
        return [
          t("div", Wa, [
            Ka,
            t("div", Ja, [
              t("h3", Xa, u(((i = o(e).modal.data) == null ? void 0 : i.title) ?? "Title"), 1),
              t("div", Qa, [
                t("p", Za, u(((c = o(e).modal.data) == null ? void 0 : c.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), so = { class: "sm:flex sm:items-start" }, ao = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), oo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ro = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, no = { class: "mt-2" }, lo = { class: "text-sm text-gray-500" }, io = ["placeholder"], co = {
  name: "VFModalNewFolder"
}, uo = /* @__PURE__ */ Object.assign(co, {
  setup(p) {
    const e = O("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), a = k(""), i = () => {
      r.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", so, [
          ao,
          t("div", oo, [
            t("h3", ro, u(o(s)("New Folder")), 1),
            t("div", no, [
              t("p", lo, u(o(s)("Create a new folder")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Folder Name"),
                type: "text"
              }, null, 40, io), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(Y, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: A(() => [
                  F(u(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), mo = { class: "sm:flex sm:items-start" }, vo = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), po = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ho = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fo = { class: "mt-2" }, go = { class: "text-sm text-gray-500" }, _o = ["placeholder"], ko = {
  name: "VFModalNewFile"
}, bo = /* @__PURE__ */ Object.assign(ko, {
  setup(p) {
    const e = O("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), a = k(""), i = () => {
      r.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", mo, [
          vo,
          t("div", po, [
            t("h3", ho, u(o(s)("New File")), 1),
            t("div", fo, [
              t("p", go, u(o(s)("Create a new file")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("File Name"),
                type: "text"
              }, null, 40, _o), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(Y, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: A(() => [
                  F(u(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xo = { class: "flex" }, yo = ["aria-label"], wo = { class: "ml-auto mb-2" }, $o = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Co = { key: 1 }, So = {
  __name: "Text",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = k(""), a = k(""), i = k(null), c = k(!1), d = k(""), l = k(!1), m = O("ServiceContainer"), { t: g } = m.i18n;
    P(() => {
      m.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: m.modal.data.adapter, path: m.modal.data.item.path },
        responseType: "text"
      }).then((y) => {
        r.value = y, s("success");
      });
    });
    const _ = () => {
      c.value = !c.value, a.value = r.value, c.value == !0 && ce(() => {
        i.value.focus();
      });
    }, x = () => {
      d.value = "", l.value = !1, m.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: m.modal.data.adapter,
          path: m.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((y) => {
        d.value = g("Updated."), r.value = y, s("success"), c.value = !c.value;
      }).catch((y) => {
        d.value = g(y.message), l.value = !0;
      });
    };
    return (y, M) => (n(), v(N, null, [
      t("div", xo, [
        t("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(m).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(o(m).modal.data.item.basename), 9, yo),
        t("div", wo, [
          c.value ? (n(), v("button", {
            key: 0,
            onClick: x,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, u(o(g)("Save")), 1)) : E("", !0),
          o(m).features.includes(o(z).EDIT) ? (n(), v("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: M[0] || (M[0] = ($) => _())
          }, u(c.value ? o(g)("Cancel") : o(g)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", null, [
        c.value ? (n(), v("div", Co, [
          q(t("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": M[1] || (M[1] = ($) => a.value = $),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Z, a.value]
          ])
        ])) : (n(), v("pre", $o, u(r.value), 1)),
        d.value.length ? (n(), L(Y, {
          key: 2,
          onHidden: M[2] || (M[2] = ($) => d.value = ""),
          error: l.value
        }, {
          default: A(() => [
            F(u(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : E("", !0)
      ])
    ], 64));
  }
}, Mo = { class: "flex" }, Eo = ["aria-label"], Do = { class: "ml-auto mb-2" }, jo = { class: "w-full flex justify-center" }, Ao = ["src"], To = {
  __name: "Image",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = O("ServiceContainer"), { t: a } = r.i18n, i = k(null), c = k(null), d = k(!1), l = k(""), m = k(!1), g = () => {
      d.value = !d.value, d.value ? c.value = new Ue(i.value, {
        crop(x) {
        }
      }) : c.value.destroy();
    }, _ = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (x) => {
          l.value = "", m.value = !1;
          const y = new FormData();
          y.set("file", x), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: y
          }).then((M) => {
            l.value = a("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), g(), s("success");
          }).catch((M) => {
            l.value = a(M.message), m.value = !0;
          });
        }
      );
    };
    return P(() => {
      s("success");
    }), (x, y) => (n(), v(N, null, [
      t("div", Mo, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(o(r).modal.data.item.basename), 9, Eo),
        t("div", Do, [
          d.value ? (n(), v("button", {
            key: 0,
            onClick: _,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, u(o(a)("Crop")), 1)) : E("", !0),
          o(r).features.includes(o(z).EDIT) ? (n(), v("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: y[0] || (y[0] = (M) => g())
          }, u(d.value ? o(a)("Cancel") : o(a)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", jo, [
        t("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[50vh] max-h-[50vh]",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Ao)
      ]),
      l.value.length ? (n(), L(Y, {
        key: 0,
        onHidden: y[1] || (y[1] = (M) => l.value = ""),
        error: m.value
      }, {
        default: A(() => [
          F(u(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : E("", !0)
    ], 64));
  }
}, Lo = { class: "flex" }, Oo = ["aria-label"], Vo = /* @__PURE__ */ t("div", null, null, -1), Fo = {
  __name: "Default",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = O("ServiceContainer"), r = e;
    return P(() => {
      r("success");
    }), (a, i) => (n(), v(N, null, [
      t("div", Lo, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(o(s).modal.data.item.basename), 9, Oo)
      ]),
      Vo
    ], 64));
  }
}, Bo = ["aria-label"], Uo = {
  class: "w-full",
  preload: "",
  controls: ""
}, zo = ["src"], No = {
  __name: "Video",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = O("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, c) => (n(), v("div", null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(o(s).modal.data.item.basename), 9, Bo),
      t("div", null, [
        t("video", Uo, [
          t("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, zo),
          F(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Ho = ["aria-label"], Ro = {
  class: "w-full",
  controls: ""
}, qo = ["src"], Io = {
  __name: "Audio",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = O("ServiceContainer"), a = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return P(() => {
      s("success");
    }), (i, c) => (n(), v(N, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(o(r).modal.data.item.basename), 9, Ho),
      t("div", null, [
        t("audio", Ro, [
          t("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, qo),
          F(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, Po = ["aria-label"], Go = ["data"], Yo = ["src"], Wo = /* @__PURE__ */ t("p", null, [
  /* @__PURE__ */ F(" Your browser does not support PDFs. "),
  /* @__PURE__ */ t("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ F(" . ")
], -1), Ko = [
  Wo
], Jo = {
  __name: "Pdf",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = O("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, c) => (n(), v(N, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(o(s).modal.data.item.basename), 9, Po),
      t("div", null, [
        t("object", {
          class: "h-[60vh]",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          t("iframe", {
            class: "border-0",
            src: a(),
            width: "100%",
            height: "100%"
          }, Ko, 8, Yo)
        ], 8, Go)
      ])
    ], 64));
  }
}, Xo = { class: "sm:flex sm:items-start" }, Qo = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Zo = { key: 0 }, er = { class: "text-gray-700 dark:text-gray-200 text-sm" }, tr = {
  key: 0,
  class: "flex leading-5"
}, sr = /* @__PURE__ */ t("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ t("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ t("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), ar = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, or = { class: "font-bold" }, rr = { class: "font-bold pl-2" }, nr = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, lr = ["download", "href"], ir = {
  name: "VFModalPreview"
}, dr = /* @__PURE__ */ Object.assign(ir, {
  setup(p) {
    const e = O("ServiceContainer"), { t: s } = e.i18n, r = k(!1), a = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(z.PREVIEW);
    return i || (r.value = !0), (c, d) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Close")), 1),
        o(e).features.includes(o(z).DOWNLOAD) ? (n(), v("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, u(o(s)("Download")), 9, lr)) : E("", !0)
      ]),
      default: A(() => [
        t("div", Xo, [
          t("div", Qo, [
            o(i) ? (n(), v("div", Zo, [
              a("text") ? (n(), L(So, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : a("image") ? (n(), L(To, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : a("video") ? (n(), L(No, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : a("audio") ? (n(), L(Io, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : a("application/pdf") ? (n(), L(Jo, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (n(), L(Fo, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : E("", !0),
            t("div", er, [
              r.value === !1 ? (n(), v("div", tr, [
                sr,
                t("span", null, u(o(s)("Loading")), 1)
              ])) : E("", !0)
            ])
          ])
        ]),
        t("div", ar, [
          t("div", null, [
            t("span", or, u(o(s)("File Size")) + ": ", 1),
            F(u(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          t("div", null, [
            t("span", rr, u(o(s)("Last Modified")) + ": ", 1),
            F(" " + u(o(we)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(z).DOWNLOAD) ? (n(), v("div", nr, [
          t("span", null, u(o(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), cr = { class: "sm:flex sm:items-start" }, ur = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), mr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, vr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, pr = { class: "mt-2" }, hr = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, fr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gr = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _r = [
  gr
], kr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, br = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xr = [
  br
], yr = { class: "ml-1.5" }, wr = {
  name: "VFModalRename"
}, $r = /* @__PURE__ */ Object.assign(wr, {
  setup(p) {
    const e = O("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(e.modal.data.items[0]), a = k(e.modal.data.items[0].basename), i = k(""), c = () => {
      a.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          item: r.value.path,
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", a.value) });
        },
        onError: (d) => {
          i.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Rename")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (m) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", cr, [
          ur,
          t("div", mr, [
            t("h3", vr, u(o(s)("Rename")), 1),
            t("div", pr, [
              t("p", hr, [
                r.value.type === "dir" ? (n(), v("svg", fr, _r)) : (n(), v("svg", kr, xr)),
                t("span", yr, u(r.value.basename), 1)
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (m) => a.value = m),
                onKeyup: Q(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Z, a.value]
              ]),
              i.value.length ? (n(), L(Y, {
                key: 0,
                onHidden: l[1] || (l[1] = (m) => i.value = ""),
                error: ""
              }, {
                default: A(() => [
                  F(u(i.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cr = { class: "sm:flex sm:items-start" }, Sr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Mr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Er = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Dr = { class: "mt-2" }, jr = {
  key: 0,
  class: "pointer-events-none"
}, Ar = {
  key: 1,
  class: "pointer-events-none"
}, Tr = ["disabled"], Lr = ["disabled"], Or = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Vr = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Fr = ["textContent"], Br = { class: "ml-1 w-full h-fit" }, Ur = { class: "text-left hidden md:block" }, zr = { class: "text-left md:hidden" }, Nr = {
  key: 0,
  class: "ml-auto"
}, Hr = ["title", "disabled", "onClick"], Rr = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), qr = [
  Rr
], Ir = {
  key: 0,
  class: "py-2"
}, Pr = ["disabled"], Gr = {
  name: "VFModalUpload"
}, Yr = /* @__PURE__ */ Object.assign(Gr, {
  setup(p) {
    const e = O("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), a = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = k({ QUEUE_ENTRY_STATUS: a }), c = k(null), d = k(null), l = k(null), m = k(null), g = k(null), _ = k(null), x = k([]), y = k(""), M = k(!1), $ = k(!1);
    let f;
    function h(j) {
      return x.value.findIndex((S) => S.id === j);
    }
    function B(j, S = null) {
      S = S ?? (j.webkitRelativePath || j.name), f.addFile({
        name: S,
        type: j.type,
        data: j,
        source: "Local"
      });
    }
    function R(j) {
      switch (j.status) {
        case a.DONE:
          return "text-green-600";
        case a.ERROR:
          return "text-red-600";
        case a.CANCELED:
          return "text-red-600";
        case a.PENDING:
        default:
          return "";
      }
    }
    const K = (j) => {
      switch (j.status) {
        case a.DONE:
          return "✓";
        case a.ERROR:
        case a.CANCELED:
          return "!";
        case a.PENDING:
        default:
          return "...";
      }
    };
    function te() {
      m.value.click();
    }
    function se() {
      if (!M.value) {
        if (!x.value.filter((j) => j.status !== a.DONE).length) {
          y.value = s("Please select file to upload first.");
          return;
        }
        y.value = "", f.retryAll(), f.upload();
      }
    }
    function ae() {
      f.cancelAll({ reason: "user" }), x.value.forEach((j) => {
        j.status !== a.DONE && (j.status = a.CANCELED, j.statusName = s("Canceled"));
      }), M.value = !1;
    }
    function oe(j) {
      M.value || (f.removeFile(j.id, "removed-by-user"), x.value.splice(h(j.id), 1));
    }
    function w(j) {
      if (!M.value) {
        if (f.cancelAll({ reason: "user" }), j) {
          const S = [];
          x.value.forEach((b) => {
            b.status !== a.DONE && S.push(b);
          }), x.value = [], S.forEach((b) => {
            B(b.originalFile, b.name);
          });
          return;
        }
        x.value.splice(0);
      }
    }
    function D() {
      e.emitter.emit("vf-modal-close");
    }
    function C() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.data.adapter, path: e.data.dirname }
      });
    }
    return P(async () => {
      f = new ze({
        debug: e.debug,
        restrictions: {
          maxFileSize: We(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(b, T) {
          if (T[b.id] != null) {
            const X = h(b.id);
            x.value[X].status === a.PENDING && (y.value = f.i18n("noDuplicates", { fileName: b.name })), x.value = x.value.filter((ue) => ue.id !== b.id);
          }
          return x.value.push({
            id: b.id,
            name: b.name,
            size: e.filesize(b.size),
            status: a.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: b.data
          }), !0;
        }
      }), f.use(Ne, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(b, T) {
          let V;
          try {
            V = JSON.parse(b).message;
          } catch {
            V = s("Cannot parse server response.");
          }
          return new Error(V);
        }
      }), f.on("restriction-failed", (b, T) => {
        const V = x.value[h(b.id)];
        oe(V), y.value = T.message;
      }), f.on("upload", () => {
        const b = C();
        f.setMeta({ ...b.body });
        const T = f.getPlugin("XHRUpload");
        T.opts.method = b.method, T.opts.endpoint = b.url + "?" + new URLSearchParams(b.params), T.opts.headers = b.headers, M.value = !0, x.value.forEach((V) => {
          V.status !== a.DONE && (V.percent = null, V.status = a.UPLOADING, V.statusName = s("Pending upload"));
        });
      }), f.on("upload-progress", (b, T) => {
        const V = Math.floor(T.bytesUploaded / T.bytesTotal * 100);
        x.value[h(b.id)].percent = `${V}%`;
      }), f.on("upload-success", (b) => {
        const T = x.value[h(b.id)];
        T.status = a.DONE, T.statusName = s("Done");
      }), f.on("upload-error", (b, T) => {
        const V = x.value[h(b.id)];
        V.percent = null, V.status = a.ERROR, T.isNetworkError ? V.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : V.statusName = T ? T.message : s("Unknown Error");
      }), f.on("error", (b) => {
        y.value = b.message, M.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), f.on("complete", () => {
        M.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), m.value.addEventListener("click", () => {
        d.value.click();
      }), g.value.addEventListener("click", () => {
        l.value.click();
      }), _.value.addEventListener("dragover", (b) => {
        b.preventDefault(), $.value = !0;
      }), _.value.addEventListener("dragleave", (b) => {
        b.preventDefault(), $.value = !1;
      });
      function j(b, T) {
        T.isFile && T.file((V) => b(T, V)), T.isDirectory && T.createReader().readEntries((V) => {
          V.forEach((X) => {
            j(b, X);
          });
        });
      }
      _.value.addEventListener("drop", (b) => {
        b.preventDefault(), $.value = !1;
        const T = /^[/\\](.+)/;
        [...b.dataTransfer.items].forEach((V) => {
          V.kind === "file" && j((X, ue) => {
            const $e = T.exec(X.fullPath);
            B(ue, $e[1]);
          }, V.webkitGetAsEntry());
        });
      });
      const S = ({ target: b }) => {
        const T = b.files;
        for (const V of T)
          B(V);
        b.value = "";
      };
      d.value.addEventListener("change", S), l.value.addEventListener("change", S);
    }), ke(() => {
      f == null || f.close({ reason: "unmount" });
    }), (j, S) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          class: U(["vf-btn vf-btn-primary", M.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: M.value,
          onClick: W(se, ["prevent"])
        }, u(o(s)("Upload")), 11, Pr),
        M.value ? (n(), v("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: W(ae, ["prevent"])
        }, u(o(s)("Cancel")), 1)) : (n(), v("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: W(D, ["prevent"])
        }, u(o(s)("Close")), 1))
      ]),
      default: A(() => [
        t("div", Cr, [
          Sr,
          t("div", Mr, [
            t("h3", Er, u(o(s)("Upload Files")), 1),
            t("div", Dr, [
              t("div", {
                ref_key: "dropArea",
                ref: _,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: te
              }, [
                $.value ? (n(), v("div", jr, u(o(s)("Release to drop these files.")), 1)) : (n(), v("div", Ar, u(o(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              t("div", {
                ref_key: "container",
                ref: c,
                class: "text-gray-500 mb-1"
              }, [
                t("button", {
                  ref_key: "pickFiles",
                  ref: m,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, u(o(s)("Select Files")), 513),
                t("button", {
                  ref_key: "pickFolders",
                  ref: g,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, u(o(s)("Select Folders")), 513),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: M.value,
                  onClick: S[0] || (S[0] = (b) => w(!1))
                }, u(o(s)("Clear all")), 9, Tr),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: M.value,
                  onClick: S[1] || (S[1] = (b) => w(!0))
                }, u(o(s)("Clear only successful")), 9, Lr)
              ], 512),
              t("div", Or, [
                (n(!0), v(N, null, I(x.value, (b) => (n(), v("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: b.id
                }, [
                  t("span", Vr, [
                    t("span", {
                      class: U(["text-base m-auto", R(b)]),
                      textContent: u(K(b))
                    }, null, 10, Fr)
                  ]),
                  t("div", Br, [
                    t("div", Ur, u(o(he)(b.name, 40)) + " (" + u(b.size) + ")", 1),
                    t("div", zr, u(o(he)(b.name, 16)) + " (" + u(b.size) + ")", 1),
                    t("div", {
                      class: U(["flex break-all text-left", R(b)])
                    }, [
                      F(u(b.statusName) + " ", 1),
                      b.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), v("b", Nr, u(b.percent), 1)) : E("", !0)
                    ], 2)
                  ]),
                  t("button", {
                    type: "button",
                    class: U(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", M.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: o(s)("Delete"),
                    disabled: M.value,
                    onClick: (T) => oe(b)
                  }, qr, 10, Hr)
                ]))), 128)),
                x.value.length ? E("", !0) : (n(), v("div", Ir, u(o(s)("No files selected!")), 1))
              ]),
              y.value.length ? (n(), L(Y, {
                key: 0,
                onHidden: S[2] || (S[2] = (b) => y.value = ""),
                error: ""
              }, {
                default: A(() => [
                  F(u(y.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ]),
        t("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        t("input", {
          ref_key: "internalFolderInput",
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), Wr = { class: "sm:flex sm:items-start" }, Kr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Jr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Xr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Qr = { class: "mt-2" }, Zr = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, en = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, tn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), an = [
  sn
], on = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), nn = [
  rn
], ln = { class: "ml-1.5" }, dn = ["placeholder"], cn = {
  name: "VFModalArchive"
}, un = /* @__PURE__ */ Object.assign(cn, {
  setup(p) {
    const e = O("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), a = k(""), i = k(e.modal.data.items), c = () => {
      i.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: i.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (d) => {
          a.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Archive")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (m) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", Wr, [
          Kr,
          t("div", Jr, [
            t("h3", Xr, u(o(s)("Archive the files")), 1),
            t("div", Qr, [
              t("div", Zr, [
                (n(!0), v(N, null, I(i.value, (m) => (n(), v("p", en, [
                  m.type === "dir" ? (n(), v("svg", tn, an)) : (n(), v("svg", on, nn)),
                  t("span", ln, u(m.basename), 1)
                ]))), 256))
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (m) => r.value = m),
                onKeyup: Q(c, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, dn), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(Y, {
                key: 0,
                onHidden: l[1] || (l[1] = (m) => a.value = ""),
                error: ""
              }, {
                default: A(() => [
                  F(u(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), mn = { class: "sm:flex sm:items-start" }, vn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), pn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, hn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, fn = { class: "mt-2" }, gn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, _n = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, kn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), bn = [
  kn
], xn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), wn = [
  yn
], $n = { class: "ml-1.5" }, Cn = { class: "my-1 text-sm text-gray-500" }, Sn = {
  name: "VFModalUnarchive"
}, Mn = /* @__PURE__ */ Object.assign(Sn, {
  setup(p) {
    const e = O("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n;
    k("");
    const r = k(e.modal.data.items[0]), a = k(""), i = k([]), c = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (d) => {
          a.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Unarchive")), 1),
        t("button", {
          type: "button",
          onClick: l[1] || (l[1] = (m) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", mn, [
          vn,
          t("div", pn, [
            t("h3", hn, u(o(s)("Unarchive")), 1),
            t("div", fn, [
              (n(!0), v(N, null, I(i.value, (m) => (n(), v("p", gn, [
                m.type === "dir" ? (n(), v("svg", _n, bn)) : (n(), v("svg", xn, wn)),
                t("span", $n, u(m.basename), 1)
              ]))), 256)),
              t("p", Cn, u(o(s)("The archive will be unarchived at")) + " (" + u(o(e).data.dirname) + ")", 1),
              a.value.length ? (n(), L(Y, {
                key: 0,
                onHidden: l[0] || (l[0] = (m) => a.value = ""),
                error: ""
              }, {
                default: A(() => [
                  F(u(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), En = { class: "sm:flex sm:items-start" }, Dn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), jn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, An = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Tn = { class: "text-sm text-gray-500 pb-1" }, Ln = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, On = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Vn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Bn = [
  Fn
], Un = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Nn = [
  zn
], Hn = { class: "ml-1.5" }, Rn = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, qn = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, In = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Pn = { class: "ml-1.5 overflow-auto" }, Gn = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, Yn = {
  name: "VFModalMove"
}, Wn = /* @__PURE__ */ Object.assign(Yn, {
  setup(p) {
    const e = O("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = k(e.modal.data.items.from), a = k(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Yes, Move!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1),
        t("div", Gn, u(o(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: A(() => [
        t("div", En, [
          Dn,
          t("div", jn, [
            t("h3", An, u(o(s)("Move files")), 1),
            t("p", Tn, u(o(s)("Are you sure you want to move these files?")), 1),
            t("div", Ln, [
              (n(!0), v(N, null, I(r.value, (l) => (n(), v("div", On, [
                t("div", null, [
                  l.type === "dir" ? (n(), v("svg", Vn, Bn)) : (n(), v("svg", Un, Nn))
                ]),
                t("div", Hn, u(l.path), 1)
              ]))), 256))
            ]),
            t("h4", Rn, u(o(s)("Target Directory")), 1),
            t("p", qn, [
              In,
              t("span", Pn, u(o(e).modal.data.items.to.path), 1)
            ]),
            a.value.length ? (n(), L(Y, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => a.value = ""),
              error: ""
            }, {
              default: A(() => [
                F(u(a.value), 1)
              ]),
              _: 1
            })) : E("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Kn = (p, e) => {
  const s = p.__vccOpts || p;
  for (const [r, a] of e)
    s[r] = a;
  return s;
}, Jn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(p, { emit: e, slots: s }) {
    const r = O("ServiceContainer"), a = k(!1), { t: i } = r.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), a.value = !0, c = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return P(() => {
      r.emitter.on(p.on, d);
    }), Le(() => {
      clearTimeout(c);
    }), {
      shown: a,
      t: i
    };
  }
}, Xn = { key: 1 };
function Qn(p, e, s, r, a, i) {
  return n(), v("div", {
    class: U(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    p.$slots.default ? le(p.$slots, "default", { key: 0 }) : (n(), v("span", Xn, u(r.t("Saved.")), 1))
  ], 2);
}
const ve = /* @__PURE__ */ Kn(Jn, [["render", Qn]]), Zn = { class: "sm:flex sm:items-start" }, el = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), tl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, sl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, al = { class: "mt-2" }, ol = { class: "text-sm text-gray-500" }, rl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, nl = { class: "mt-3 text-left" }, ll = { class: "space-y-2" }, il = { class: "flex relative gap-x-3" }, dl = { class: "h-6 items-center" }, cl = { class: "flex-1 block text-sm" }, ul = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, ml = { class: "flex relative gap-x-3" }, vl = { class: "h-6 items-center" }, pl = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, hl = { class: "flex text-sm" }, fl = ["label"], gl = ["value"], _l = {
  key: 0,
  class: "flex relative gap-x-3"
}, kl = { class: "h-6 items-center" }, bl = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, xl = { class: "flex text-sm" }, yl = ["label"], wl = ["value"], $l = {
  name: "VFModalAbout"
}, Cl = /* @__PURE__ */ Object.assign($l, {
  setup(p) {
    const e = O("ServiceContainer"), { getStore: s, setStore: r, clearStore: a } = e.storage, { t: i, changeLocale: c, locale: d } = e.i18n;
    k(""), k("");
    const l = async () => {
      a(), location.reload();
    }, m = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, g = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? ye : xe, r("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, { i18n: _ } = O("VueFinderOptions"), y = Object.fromEntries(
      Object.entries({
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([$]) => Object.keys(_).includes($))
    ), M = ee(() => ({
      system: i("System"),
      light: i("Light"),
      dark: i("Dark")
    }));
    return ($, f) => (n(), L(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: f[5] || (f[5] = (h) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(i)("Close")), 1)
      ]),
      default: A(() => [
        t("div", Zn, [
          el,
          t("div", tl, [
            t("h3", sl, u(o(i)("About %s", "Vuefinder " + o(e).version)), 1),
            t("div", al, [
              t("p", ol, u(o(i)("Vuefinder is a file manager component for vue 3.")), 1),
              t("div", null, [
                t("h3", rl, u(o(i)("Settings")), 1)
              ]),
              t("div", nl, [
                t("fieldset", null, [
                  t("div", ll, [
                    t("div", il, [
                      t("div", dl, [
                        q(t("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": f[0] || (f[0] = (h) => o(e).metricUnits = h),
                          onClick: g,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Oe, o(e).metricUnits]
                        ])
                      ]),
                      t("div", cl, [
                        t("label", ul, [
                          F(u(o(i)("Use Metric Units")) + " ", 1),
                          H(ve, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: A(() => [
                              F(u(o(i)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    t("div", ml, [
                      t("div", vl, [
                        t("label", pl, u(o(i)("Theme")), 1)
                      ]),
                      t("div", hl, [
                        q(t("select", {
                          id: "theme",
                          "onUpdate:modelValue": f[1] || (f[1] = (h) => o(e).theme.value = h),
                          onChange: f[2] || (f[2] = (h) => m(h.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Theme")
                          }, [
                            (n(!0), v(N, null, I(M.value, (h, B) => (n(), v("option", { value: B }, u(h), 9, gl))), 256))
                          ], 8, fl)
                        ], 544), [
                          [pe, o(e).theme.value]
                        ]),
                        H(ve, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: A(() => [
                            F(u(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    o(e).features.includes(o(z).LANGUAGE) && Object.keys(o(y)).length > 1 ? (n(), v("div", _l, [
                      t("div", kl, [
                        t("label", bl, u(o(i)("Language")), 1)
                      ]),
                      t("div", xl, [
                        q(t("select", {
                          id: "language",
                          "onUpdate:modelValue": f[3] || (f[3] = (h) => _e(d) ? d.value = h : null),
                          onChange: f[4] || (f[4] = (h) => o(c)(h.target.value)),
                          class: "flex-shrink-0 w-1/2 sm:w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Language")
                          }, [
                            (n(!0), v(N, null, I(o(y), (h, B) => (n(), v("option", { value: B }, u(h), 9, wl))), 256))
                          ], 8, yl)
                        ], 544), [
                          [pe, o(d)]
                        ]),
                        H(ve, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: A(() => [
                            F(u(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : E("", !0),
                    t("button", {
                      onClick: l,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, u(o(i)("Reset Settings")), 1)
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: Cl,
  ModalArchive: un,
  ModalDelete: Ya,
  ModalMessage: to,
  ModalMove: Wn,
  ModalNewFile: bo,
  ModalNewFolder: uo,
  ModalPreview: dr,
  ModalRename: $r,
  ModalUnarchive: Mn,
  ModalUpload: Yr
}, Symbol.toStringTag, { value: "Module" })), Bl = {
  /** @param {import('vue').App} app
   * @param options
   */
  install(p, e = {}) {
    p.component("VueFinder", ba);
    for (const r of Object.values(Sl))
      p.component(r.name, r);
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "pt", p.provide("VueFinderOptions", e);
  }
};
export {
  Bl as default
};

var Ce = Object.defineProperty;
var Se = (p, e, s) => e in p ? Ce(p, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : p[e] = s;
var fe = (p, e, s) => (Se(p, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as ie, watch as de, ref as _, computed as ee, inject as L, openBlock as n, createElementBlock as m, unref as o, createCommentVNode as E, normalizeClass as z, createElementVNode as t, createTextVNode as F, toDisplayString as u, customRef as Me, withModifiers as Y, Fragment as U, renderList as I, withDirectives as q, withKeys as Q, isRef as _e, vModelText as Z, nextTick as ce, createVNode as R, TransitionGroup as Ee, withCtx as A, onMounted as P, onUpdated as De, onBeforeUnmount as ke, vShow as re, normalizeStyle as be, vModelSelect as pe, provide as je, Transition as Ae, createBlock as O, resolveDynamicComponent as Te, renderSlot as le, onUnmounted as Oe, vModelCheckbox as Le } from "vue";
import Ve from "mitt";
import Fe from "dragselect";
import Ne from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import ze from "cropperjs";
import Be from "@uppy/core";
import Ue from "@uppy/xhr-upload";
import "microtip/microtip.css";
var ge;
const me = (ge = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : ge.getAttribute("content");
class Re {
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
    let v;
    l !== "get" && (c instanceof FormData ? (v = c, s.body != null && Object.entries(this.config.body).forEach(([g, x]) => {
      v.append(g, x);
    })) : (v = { ...c }, s.body != null && Object.assign(v, this.config.body)));
    const b = {
      url: d,
      method: l,
      headers: a,
      params: i,
      body: v
    };
    if (s.transformRequest != null) {
      const g = s.transformRequest({
        url: d,
        method: l,
        headers: a,
        params: i,
        body: v
      });
      g.url != null && (b.url = g.url), g.method != null && (b.method = g.method), g.params != null && (b.params = g.params ?? {}), g.headers != null && (b.headers = g.headers ?? {}), g.body != null && (b.body = g.body);
    }
    return b;
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
function He(p) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof p == "string" ? Object.assign(e, { baseUrl: p }) : Object.assign(e, p), new Re(e);
}
function qe(p) {
  let e = localStorage.getItem(p + "_storage");
  const s = ie(JSON.parse(e ?? "{}"));
  de(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(p + "_storage", JSON.stringify(s)) : localStorage.removeItem(p + "_storage");
  }
  function a(l, v) {
    s[l] = v;
  }
  function i(l) {
    delete s[l];
  }
  function c() {
    Object.keys(s).map((l) => i(l));
  }
  return { getStore: (l, v = null) => s.hasOwnProperty(l) ? s[l] : v, setStore: a, removeStore: i, clearStore: c };
}
async function Ie(p, e) {
  const s = e[p];
  return typeof s == "function" ? (await s()).default : s;
}
function Pe(p, e, s, r) {
  const { getStore: a, setStore: i } = p, c = _({}), d = _(a("locale", e)), l = (g, x = e) => {
    Ie(g, r).then((y) => {
      c.value = y, i("locale", g), d.value = g, i("translations", y), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + g }), s.emit("vf-language-saved"));
    }).catch((y) => {
      x ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(x, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !a("locale") && !r.length ? l(e) : c.value = a("translations");
  const v = (g, ...x) => x.length ? v(g = g.replace("%s", x.shift()), ...x) : g;
  function b(g, ...x) {
    return c.value && c.value.hasOwnProperty(g) ? v(c.value[g], ...x) : v(g, ...x);
  }
  return { t: b, changeLocale: l, locale: d };
}
const B = {
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
}, Ge = Object.values(B), We = "2.2.5";
function xe(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1024, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function ye(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1e3, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function Ye(p) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(p);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const J = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Ke(p, e) {
  const s = _(J.SYSTEM), r = _(J.LIGHT);
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
  const s = qe(p.id), r = Ve(), a = s.getStore("metricUnits", !1), i = Ke(s, p.theme), c = e.i18n, d = p.locale ?? e.locale, l = ee(() => Pe(s, d, r, c)), v = (g) => Array.isArray(g) ? g : Ge, b = p.persist ? s.getStore("path", p.path) : p.path;
  return ie({
    // app version
    version: We,
    // root element
    root: null,
    // app id
    debug: p.debug,
    // Event Bus
    emitter: r,
    // active features
    features: v(p.features),
    // http object
    requester: He(p.request),
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
    path: b,
    // persist state
    persist: p.persist,
    // storage
    storage: s,
    // fetched items
    data: { adapter: s.getStore("adapter"), storages: [], dirname: b, files: [] },
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
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, xt = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, yt = {
  name: "VFToolbar"
}, wt = /* @__PURE__ */ Object.assign(yt, {
  setup(p) {
    const e = L("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, a = _([]), i = _("");
    e.emitter.on("vf-search-query", ({ newQuery: d }) => {
      i.value = d;
    }), e.emitter.on("vf-nodes-selected", (d) => {
      a.value = d;
    });
    const c = () => {
      e.view = e.view === "list" ? "grid" : "list", s("viewport", e.view);
    };
    return (d, l) => (n(), m("div", Xe, [
      i.value.length ? (n(), m("div", ut, [
        t("div", mt, [
          F(u(o(r)("Search results for")) + " ", 1),
          t("span", vt, u(i.value), 1)
        ]),
        o(e).loading ? (n(), m("svg", pt, gt)) : E("", !0)
      ])) : (n(), m("div", Qe, [
        o(e).features.includes(o(B).UPLOAD) ? (n(), m("div", {
          key: 0,
          class: "upload mx-1.5",
          "aria-label": o(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: l[0] || (l[0] = (v) => o(e).emitter.emit("vf-modal-show", { type: "upload", items: a.value }))
        }, tt, 8, Ze)) : E("", !0),
        o(e).features.includes(o(B).RENAME) ? (n(), m("div", {
          key: 1,
          class: "rename mx-1.5",
          "aria-label": o(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: l[1] || (l[1] = (v) => a.value.length != 1 || o(e).emitter.emit("vf-modal-show", { type: "rename", items: a.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([a.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ot, 2))
        ], 8, st)) : E("", !0),
        o(e).features.includes(o(B).UNARCHIVE) && a.value.length == 1 && a.value[0].mime_type == "application/zip" ? (n(), m("div", {
          key: 2,
          class: "unarchive mx-1.5",
          "aria-label": o(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: l[2] || (l[2] = (v) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "unarchive", items: a.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, lt, 2))
        ], 8, rt)) : E("", !0),
        o(e).features.includes(o(B).ARCHIVE) ? (n(), m("div", {
          key: 3,
          class: "archive mx-1.5",
          "aria-label": o(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: l[3] || (l[3] = (v) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "archive", items: a.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ct, 2))
        ], 8, it)) : E("", !0)
      ])),
      t("div", _t, [
        t("div", {
          class: "mx-1.5",
          "aria-label": o(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: l[4] || (l[4] = (v) => i.value.length || c())
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([i.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            o(e).view === "grid" ? (n(), m("path", bt)) : E("", !0),
            o(e).view === "list" ? (n(), m("path", xt)) : E("", !0)
          ], 2))
        ], 8, kt)
      ])
    ]));
  }
}), $t = (p, e = 0, s = !1) => {
  let r;
  return (...a) => {
    s && !r && p(...a), clearTimeout(r), r = setTimeout(() => {
      p(...a);
    }, e);
  };
}, Ct = (p, e, s) => {
  const r = _(p);
  return Me((a, i) => ({
    get() {
      return a(), r.value;
    },
    set: $t(
      (c) => {
        r.value = c, i();
      },
      e,
      s
    )
  }));
}, St = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, Mt = ["aria-label"], Et = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Dt = [
  Et
], jt = ["aria-label"], At = /* @__PURE__ */ t("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), Tt = [
  At
], Ot = ["aria-label"], Lt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Vt = [
  Lt
], Ft = /* @__PURE__ */ t("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Nt = [
  Ft
], zt = { class: "flex leading-6" }, Bt = /* @__PURE__ */ t("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Ut = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Rt = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Ht = /* @__PURE__ */ t("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), qt = /* @__PURE__ */ t("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), It = [
  Ht,
  qt
], Pt = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full"
}, Gt = /* @__PURE__ */ t("div", null, [
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
], -1), Wt = ["placeholder"], Yt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Kt = [
  Yt
], Jt = {
  name: "VFBreadcrumb"
}, Xt = /* @__PURE__ */ Object.assign(Jt, {
  setup(p) {
    const e = _(null), s = _([]), r = _(!1), a = _(null), i = L("ServiceContainer"), { t: c } = i.i18n;
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
      r.value = !1, v.value = "";
    };
    i.emitter.on("vf-search-exit", () => {
      d();
    });
    const l = () => {
      i.features.includes(B.SEARCH) && (r.value = !0, ce(() => a.value.focus()));
    }, v = Ct("", 400);
    de(v, ($) => {
      i.emitter.emit("vf-toast-clear"), i.emitter.emit("vf-search-query", { newQuery: $ });
    });
    const b = () => s.value.length && !r.value, g = ($, f = null) => {
      $.preventDefault(), y($), f ?? (f = s.value.length - 2);
      let h = JSON.parse($.dataTransfer.getData("items"));
      if (h.find((N) => N.storage !== i.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      i.emitter.emit("vf-modal-show", {
        type: "move",
        items: { from: h, to: s.value[f] ?? { path: i.adapter + "://" } }
      });
    }, x = ($) => {
      $.preventDefault(), b() ? ($.dataTransfer.dropEffect = "copy", $.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-500")) : ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none");
    }, y = ($) => {
      $.preventDefault(), $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500"), b() && $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500");
    }, M = () => {
      v.value == "" && d();
    };
    return ($, f) => (n(), m("div", St, [
      t("span", {
        "aria-label": o(c)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onDragover: f[0] || (f[0] = (h) => x(h)),
          onDragleave: f[1] || (f[1] = (h) => y(h)),
          onDrop: f[2] || (f[2] = (h) => g(h)),
          onClick: f[3] || (f[3] = (h) => {
            var N;
            return !b() || o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: ((N = s.value[s.value.length - 2]) == null ? void 0 : N.path) ?? o(i).adapter + "://" } });
          }),
          class: z(["h-6 w-6 p-0.5 rounded", b() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Dt, 34))
      ], 8, Mt),
      o(i).loading ? (n(), m("span", {
        key: 1,
        "aria-label": o(c)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: f[5] || (f[5] = (h) => o(i).emitter.emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, Vt))
      ], 8, Ot)) : (n(), m("span", {
        key: 0,
        "aria-label": o(c)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: f[4] || (f[4] = (h) => {
            o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: o(i).data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, Tt))
      ], 8, jt)),
      r.value ? (n(), m("div", Pt, [
        Gt,
        q(t("input", {
          ref_key: "searchInput",
          ref: a,
          onKeydown: Q(d, ["esc"]),
          onBlur: M,
          "onUpdate:modelValue": f[10] || (f[10] = (h) => _e(v) ? v.value = h : null),
          placeholder: o(c)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Wt), [
          [Z, o(v)]
        ]),
        (n(), m("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: d,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, Kt))
      ])) : (n(), m("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Y(l, ["self"])
      }, [
        (n(), m("svg", {
          onDragover: f[6] || (f[6] = (h) => x(h)),
          onDragleave: f[7] || (f[7] = (h) => y(h)),
          onDrop: f[8] || (f[8] = (h) => g(h, -1)),
          onClick: f[9] || (f[9] = (h) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Nt, 32)),
        t("div", zt, [
          (n(!0), m(U, null, I(s.value, (h, N) => (n(), m("div", { key: N }, [
            Bt,
            t("span", {
              onDragover: (H) => N === s.value.length - 1 || x(H),
              onDragleave: (H) => N === s.value.length - 1 || y(H),
              onDrop: (H) => N === s.value.length - 1 || g(H, N),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: h.basename,
              onClick: (H) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: h.path } })
            }, u(h.name), 41, Ut)
          ]))), 128))
        ]),
        o(i).loading ? (n(), m("svg", Rt, It)) : E("", !0)
      ]))
    ]));
  }
}), we = (p, e = null) => new Date(p * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Qt = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Zt = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), es = [
  Zt
], ts = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, ss = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), as = [
  ss
], os = {
  name: "VFSortIcon"
}, ne = /* @__PURE__ */ Object.assign(os, {
  props: { direction: String },
  setup(p) {
    return (e, s) => (n(), m("div", null, [
      p.direction === "down" ? (n(), m("svg", Qt, es)) : E("", !0),
      p.direction === "up" ? (n(), m("svg", ts, as)) : E("", !0)
    ]));
  }
}), rs = ["onClick"], ns = {
  name: "VFToast.vue"
}, ls = /* @__PURE__ */ Object.assign(ns, {
  setup(p) {
    const e = L("ServiceContainer"), { getStore: s } = e.storage, r = _(s("full-screen", !1)), a = _([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
      a.value.splice(l, 1);
    }, d = (l) => {
      let v = a.value.findIndex((b) => b.id === l);
      v !== -1 && c(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = v, a.value.push(l), setTimeout(() => {
        d(v);
      }, 5e3);
    }), (l, v) => (n(), m("div", {
      class: z([r.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      R(Ee, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: A(() => [
          (n(!0), m(U, null, I(a.value, (b, g) => (n(), m("div", {
            onClick: (x) => c(g),
            key: b,
            class: z([i(b.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, u(b.label), 11, rs))), 128))
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
const is = { class: "relative flex-auto flex flex-col overflow-hidden" }, ds = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, cs = { class: "absolute" }, us = /* @__PURE__ */ t("svg", {
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
], -1), ms = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, vs = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], ps = { class: "grid grid-cols-12 items-center" }, hs = { class: "flex col-span-7 items-center" }, fs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), _s = [
  gs
], ks = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xs = [
  bs
], ys = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ws = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, $s = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Cs = { class: "grid grid-cols-12 items-center" }, Ss = { class: "flex col-span-7 items-center" }, Ms = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Es = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ds = [
  Es
], js = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, As = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ts = [
  As
], Os = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ls = { class: "col-span-2 text-center" }, Vs = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Fs = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Ns = { class: "relative" }, zs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Us = [
  Bs
], Rs = ["data-src", "alt"], Hs = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Is = [
  qs
], Ps = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Gs = { class: "break-all" }, Ws = {
  name: "VFExplorer"
}, Ys = /* @__PURE__ */ Object.assign(Ws, {
  setup(p) {
    const e = L("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = (w) => w == null ? void 0 : w.substring(0, 3), a = _(null), i = _(null), c = _(0), d = _(null), l = Math.floor(Math.random() * 2 ** 32), v = _("");
    let b;
    e.emitter.on("vf-fullscreen-toggle", () => {
      a.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: w }) => {
      v.value = w, w ? e.emitter.emit("vf-fetch", {
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
    let g = null;
    const x = () => {
      g && clearTimeout(g);
    }, y = _(!0), M = (w) => {
      w.touches.length > 1 && (y.value ? (d.value.stop(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: off") })) : (d.value.start(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: on") }), e.emitter.emit("vf-explorer-update")), y.value = !y.value);
    }, $ = (w) => {
      g = setTimeout(() => {
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
    }, h = ie({ active: !1, column: "", order: "" }), N = (w = !0) => {
      let D = [...e.data.files], C = h.column, j = h.order == "asc" ? 1 : -1;
      if (!w)
        return D;
      const S = (k, T) => typeof k == "string" && typeof T == "string" ? k.toLowerCase().localeCompare(T.toLowerCase()) : k < T ? -1 : k > T ? 1 : 0;
      return h.active && (D = D.slice().sort((k, T) => S(k[C], T[C]) * j)), D;
    }, H = (w) => {
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
      b = new Ne(a.value), oe();
    }), De(() => {
      d.value.Area.reset(), d.value.SelectorArea.updatePos(), b.update();
    }), P(() => {
      de(() => e.view, () => e.emitter.emit("vf-explorer-update"));
    }), ke(() => {
      b.destroy();
    }), (w, D) => (n(), m("div", is, [
      o(e).view == "list" || v.value.length ? (n(), m("div", ds, [
        t("div", {
          onClick: D[0] || (D[0] = (C) => H("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          F(u(o(s)("Name")) + " ", 1),
          q(R(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "basename"]
          ])
        ]),
        v.value.length ? E("", !0) : (n(), m("div", {
          key: 0,
          onClick: D[1] || (D[1] = (C) => H("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          F(u(o(s)("Size")) + " ", 1),
          q(R(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "file_size"]
          ])
        ])),
        v.value.length ? E("", !0) : (n(), m("div", {
          key: 1,
          onClick: D[2] || (D[2] = (C) => H("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          F(u(o(s)("Date")) + " ", 1),
          q(R(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "last_modified"]
          ])
        ])),
        v.value.length ? (n(), m("div", {
          key: 2,
          onClick: D[3] || (D[3] = (C) => H("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          F(u(o(s)("Filepath")) + " ", 1),
          q(R(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "path"]
          ])
        ])) : E("", !0)
      ])) : E("", !0),
      t("div", cs, [
        t("div", {
          ref_key: "dragImage",
          ref: i,
          class: "absolute -z-50 -top-96"
        }, [
          us,
          t("div", ms, u(c.value), 1)
        ], 512)
      ]),
      t("div", {
        onTouchstart: M,
        onContextmenu: D[10] || (D[10] = Y((C) => o(e).emitter.emit("vf-contextmenu-show", { event: C, area: a.value, items: K() }), ["self", "prevent"])),
        class: z([o(e).fullScreen ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: a
      }, [
        v.value.length ? (n(!0), m(U, { key: 0 }, I(N(), (C, j) => (n(), m("div", {
          onDblclick: (S) => f(C),
          onTouchstart: D[4] || (D[4] = (S) => $(S)),
          onTouchend: D[5] || (D[5] = (S) => x()),
          onContextmenu: Y((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, area: a.value, items: K(), target: C }), ["prevent"]),
          class: z(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", ps, [
            t("div", hs, [
              C.type === "dir" ? (n(), m("svg", fs, _s)) : (n(), m("svg", ks, xs)),
              t("span", ys, u(C.basename), 1)
            ]),
            t("div", ws, u(C.path), 1)
          ])
        ], 42, vs))), 256)) : E("", !0),
        o(e).view === "list" && !v.value.length ? (n(!0), m(U, { key: 1 }, I(N(), (C, j) => (n(), m("div", {
          draggable: "true",
          onDblclick: (S) => f(C),
          onTouchstart: D[6] || (D[6] = (S) => $(S)),
          onTouchend: D[7] || (D[7] = (S) => x()),
          onContextmenu: Y((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, area: a.value, items: K(), target: C }), ["prevent"]),
          onDragstart: (S) => te(S),
          onDragover: (S) => ae(S, C),
          onDrop: (S) => se(S, C),
          class: z(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", Cs, [
            t("div", Ss, [
              C.type === "dir" ? (n(), m("svg", Ms, Ds)) : (n(), m("svg", js, Ts)),
              t("span", Os, u(C.basename), 1)
            ]),
            t("div", Ls, u(C.file_size ? o(e).filesize(C.file_size) : ""), 1),
            t("div", Vs, u(o(we)(C.last_modified)), 1)
          ])
        ], 42, $s))), 256)) : E("", !0),
        o(e).view === "grid" && !v.value.length ? (n(!0), m(U, { key: 2 }, I(N(!1), (C, j) => (n(), m("div", {
          draggable: "true",
          onDblclick: (S) => f(C),
          onTouchstart: D[8] || (D[8] = (S) => $(S)),
          onTouchend: D[9] || (D[9] = (S) => x()),
          onContextmenu: Y((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, area: a.value, items: K(), target: C }), ["prevent"]),
          onDragstart: (S) => te(S),
          onDragover: (S) => ae(S, C),
          onDrop: (S) => se(S, C),
          class: z(["vf-item-" + o(l), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", null, [
            t("div", Ns, [
              C.type === "dir" ? (n(), m("svg", zs, Us)) : (C.mime_type ?? "").startsWith("image") ? (n(), m("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": o(e).requester.getPreviewUrl(o(e).adapter, C),
                alt: C.basename
              }, null, 8, Rs)) : (n(), m("svg", Hs, Is)),
              !(C.mime_type ?? "").startsWith("image") && C.type != "dir" ? (n(), m("div", Ps, u(r(C.extension)), 1)) : E("", !0)
            ]),
            t("span", Gs, u(o(he)(C.basename)), 1)
          ])
        ], 42, Fs))), 256)) : E("", !0)
      ], 34),
      R(ls)
    ]));
  }
}), Ks = ["href", "download"], Js = ["onClick"], Xs = {
  name: "VFContextMenu"
}, Qs = /* @__PURE__ */ Object.assign(Xs, {
  setup(p) {
    const e = L("ServiceContainer"), { t: s } = e.i18n, r = _(null), a = _([]), i = _(""), c = ie({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ee(() => c.items.filter((g) => g.key == null || e.features.includes(g.key)));
    e.emitter.on("vf-context-selected", (g) => {
      a.value = g;
    });
    const l = {
      newfolder: {
        key: B.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        key: B.DELETE,
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
        key: B.PREVIEW,
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
        key: B.DOWNLOAD,
        link: ee(() => e.requester.getDownloadUrl(e.data.adapter, a.value[0])),
        title: () => s("Download"),
        action: () => {
        }
      },
      archive: {
        key: B.ARCHIVE,
        title: () => s("Archive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "archive", items: a });
        }
      },
      unarchive: {
        key: B.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "unarchive", items: a });
        }
      },
      rename: {
        key: B.RENAME,
        title: () => s("Rename"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "rename", items: a });
        }
      }
    }, v = (g) => {
      e.emitter.emit("vf-contextmenu-hide"), g.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: g }) => {
      i.value = g;
    }), e.emitter.on("vf-contextmenu-show", ({ event: g, area: x, items: y, target: M = null }) => {
      if (c.items = [], i.value)
        if (M)
          c.items.push(l.openDir), e.emitter.emit("vf-context-selected", [M]);
        else
          return;
      else
        !M && !i.value ? (c.items.push(l.refresh), e.emitter.emit("vf-context-selected", [])) : y.length > 1 && y.some(($) => $.path === M.path) ? (c.items.push(l.refresh), c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", y)) : (M.type == "dir" ? c.items.push(l.open) : (c.items.push(l.preview), c.items.push(l.download)), c.items.push(l.rename), M.mime_type == "application/zip" ? c.items.push(l.unarchive) : c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", [M]));
      b(g, x);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const b = (g, x) => {
      c.active = !0, ce(() => {
        const y = e.root.getBoundingClientRect(), M = x.getBoundingClientRect();
        let $ = g.pageX - y.left, f = g.pageY - y.top, h = r.value.offsetHeight, N = r.value.offsetWidth;
        $ = M.right - g.pageX + window.scrollX < N ? $ - N : $, f = M.bottom - g.pageY + window.scrollY < h ? f - h : f, c.positions = {
          left: $ + "px",
          top: f + "px"
        };
      });
    };
    return (g, x) => c.active ? (n(), m("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: r,
      style: be(c.positions)
    }, [
      (n(!0), m(U, null, I(d.value, (y) => (n(), m("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: y.title
      }, [
        y.link ? (n(), m("a", {
          key: 0,
          class: "block pl-2 pr-3 py-1",
          target: "_blank",
          href: y.link,
          download: y.link,
          onClick: x[0] || (x[0] = (M) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          t("span", null, u(y.title()), 1)
        ], 8, Ks)) : (n(), m("div", {
          key: 1,
          class: "pl-2 pr-3 py-1",
          onClick: (M) => v(y)
        }, [
          t("span", null, u(y.title()), 1)
        ], 8, Js))
      ]))), 128))
    ], 4)) : E("", !0);
  }
}), Zs = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, ea = { class: "flex leading-5 items-center" }, ta = ["aria-label"], sa = /* @__PURE__ */ t("svg", {
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
], -1), aa = [
  sa
], oa = ["value"], ra = { class: "ml-3" }, na = { key: 0 }, la = { class: "ml-1" }, ia = { class: "flex leading-5 items-center justify-end" }, da = ["disabled"], ca = ["aria-label"], ua = /* @__PURE__ */ t("svg", {
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
], -1), ma = [
  ua
], va = {
  name: "VFStatusbar"
}, pa = /* @__PURE__ */ Object.assign(va, {
  setup(p) {
    const e = L("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, a = _(0), i = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.adapter } }), r("adapter", e.adapter);
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      a.value = l.length;
    });
    const c = _("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
    });
    const d = ee(() => {
      const l = e.selectButton.multiple ? e.selectedItems.length > 0 : e.selectedItems.length === 1;
      return e.selectButton.active && l;
    });
    return (l, v) => (n(), m("div", Zs, [
      t("div", ea, [
        t("div", {
          class: "mx-2",
          "aria-label": o(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, aa, 8, ta),
        q(t("select", {
          "onUpdate:modelValue": v[0] || (v[0] = (b) => o(e).adapter = b),
          onChange: i,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), m(U, null, I(o(e).data.storages, (b) => (n(), m("option", { value: b }, u(b), 9, oa))), 256))
        ], 544), [
          [pe, o(e).adapter]
        ]),
        t("div", ra, [
          c.value.length ? (n(), m("span", na, u(o(e).data.files.length) + " items found. ", 1)) : E("", !0),
          t("span", la, u(a.value > 0 ? o(s)("%s item(s) selected.", a.value) : ""), 1)
        ])
      ]),
      t("div", ia, [
        o(e).selectButton.active ? (n(), m("button", {
          key: 0,
          class: z(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: v[1] || (v[1] = (b) => o(e).selectButton.click(o(e).selectedItems, b))
        }, u(o(s)("Select")), 11, da)) : E("", !0),
        t("span", {
          class: "mr-1",
          "aria-label": o(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: v[2] || (v[2] = (b) => o(e).emitter.emit("vf-modal-show", { type: "about" }))
        }, ma, 8, ca)
      ])
    ]));
  }
}), ha = {
  name: "VueFinder"
}, fa = /* @__PURE__ */ Object.assign(ha, {
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
    const s = e, a = Je(p, L("VueFinderOptions"));
    je("ServiceContainer", a);
    const { setStore: i } = a.storage, c = _(null);
    a.root = c, a.i18n, a.emitter.on("vf-modal-close", () => {
      a.modal.active = !1;
    }), a.emitter.on("vf-modal-show", (v) => {
      a.modal.active = !0, a.modal.type = v.type, a.modal.data = v;
    });
    const d = (v) => {
      Object.assign(a.data, v), a.emitter.emit("vf-nodes-selected", {}), a.emitter.emit("vf-explorer-update");
    };
    a.emitter.on("vf-nodes-selected", (v) => {
      a.selectedItems = v, s("select", v);
    });
    let l;
    return a.emitter.on("vf-fetch-abort", () => {
      l.abort(), a.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: v, body: b = null, onSuccess: g = null, onError: x = null, noCloseModal: y = !1 }) => {
      ["index", "search"].includes(v.q) && (l && l.abort(), a.loading = !0), l = new AbortController();
      const M = l.signal;
      a.requester.send({
        url: "",
        method: v.m || "get",
        params: v,
        body: b,
        abortSignal: M
      }).then(($) => {
        a.adapter = $.adapter, a.persist && (a.path = $.dirname, i("path", a.path)), ["index", "search"].includes(v.q) && (a.loading = !1), y || a.emitter.emit("vf-modal-close"), d($), g && g($);
      }).catch(($) => {
        console.error($), x && x($);
      });
    }), a.emitter.on("vf-download", (v) => {
      const b = document.createElement("a");
      b.style.display = "none", b.target = "_blank", b.href = v, b.download = v, a.root.appendChild(b), b.click(), b.remove();
    }), P(() => {
      let v = {};
      a.path.includes("://") && (v = {
        adapter: a.path.split("://")[0],
        path: a.path
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter, ...v } });
    }), (v, b) => (n(), m("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c
    }, [
      t("div", {
        class: z(o(a).theme.actualValue === "dark" ? "dark" : "")
      }, [
        t("div", {
          class: z([o(a).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: be(o(a).fullScreen ? "" : "max-height: " + p.maxHeight),
          onMousedown: b[0] || (b[0] = (g) => o(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: b[1] || (b[1] = (g) => o(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          R(wt),
          R(Xt),
          R(Ys),
          R(pa)
        ], 38),
        R(Ae, { name: "fade" }, {
          default: A(() => [
            o(a).modal.active ? (n(), O(Te("v-f-modal-" + o(a).modal.type), { key: 0 })) : E("", !0)
          ]),
          _: 1
        }),
        R(Qs)
      ], 2)
    ], 512));
  }
}), ga = /* @__PURE__ */ t("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), _a = { class: "fixed z-10 inset-0 overflow-hidden" }, ka = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, ba = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, xa = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, G = {
  __name: "ModalLayout",
  setup(p) {
    const e = L("ServiceContainer");
    return P(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, r) => (n(), m("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Q((a) => o(e).emitter.emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      ga,
      t("div", _a, [
        t("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: r[0] || (r[0] = Y((a) => o(e).emitter.emit("vf-modal-close"), ["self"]))
        }, [
          t("div", ka, [
            t("div", ba, [
              le(s.$slots, "default")
            ]),
            t("div", xa, [
              le(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, ya = ["aria-label"], wa = /* @__PURE__ */ t("svg", {
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
], -1), $a = [
  wa
], Ca = {
  name: "Message"
}, W = /* @__PURE__ */ Object.assign(Ca, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(p, { emit: e }) {
    var v;
    const s = e, r = L("ServiceContainer"), { t: a } = r.i18n, i = _(!1), c = _(null), d = _((v = c.value) == null ? void 0 : v.strMessage);
    de(d, () => i.value = !1);
    const l = () => {
      s("hidden"), i.value = !0;
    };
    return (b, g) => (n(), m("div", null, [
      i.value ? E("", !0) : (n(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: z(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", p.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        le(b.$slots, "default"),
        t("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": o(a)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, $a, 8, ya)
      ], 2))
    ]));
  }
}), Sa = { class: "sm:flex sm:items-start" }, Ma = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ea = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Da = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ja = { class: "mt-2" }, Aa = { class: "text-sm text-gray-500" }, Ta = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Oa = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, La = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Va = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Fa = [
  Va
], Na = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, za = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ba = [
  za
], Ua = { class: "ml-1.5" }, Ra = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Ha = {
  name: "VFModalDelete"
}, qa = /* @__PURE__ */ Object.assign(Ha, {
  setup(p) {
    const e = L("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(e.modal.data.items), a = _(""), i = () => {
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
    return (c, d) => (n(), O(G, null, {
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
        t("div", Ra, u(o(s)("This action cannot be undone.")), 1)
      ]),
      default: A(() => [
        t("div", Sa, [
          Ma,
          t("div", Ea, [
            t("h3", Da, u(o(s)("Delete files")), 1),
            t("div", ja, [
              t("p", Aa, u(o(s)("Are you sure you want to delete these files?")), 1),
              t("div", Ta, [
                (n(!0), m(U, null, I(r.value, (l) => (n(), m("p", Oa, [
                  l.type === "dir" ? (n(), m("svg", La, Fa)) : (n(), m("svg", Na, Ba)),
                  t("span", Ua, u(l.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (n(), O(W, {
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
}), Ia = { class: "sm:flex sm:items-start" }, Pa = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ga = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Wa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ya = { class: "mt-2" }, Ka = { class: "text-sm text-gray-500" }, Ja = {
  name: "VFModalMessage"
}, Xa = /* @__PURE__ */ Object.assign(Ja, {
  setup(p) {
    const e = L("ServiceContainer"), { t: s } = e.i18n;
    return (r, a) => (n(), O(G, null, {
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
          t("div", Ia, [
            Pa,
            t("div", Ga, [
              t("h3", Wa, u(((i = o(e).modal.data) == null ? void 0 : i.title) ?? "Title"), 1),
              t("div", Ya, [
                t("p", Ka, u(((c = o(e).modal.data) == null ? void 0 : c.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Qa = { class: "sm:flex sm:items-start" }, Za = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), eo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, to = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, so = { class: "mt-2" }, ao = { class: "text-sm text-gray-500" }, oo = ["placeholder"], ro = {
  name: "VFModalNewFolder"
}, no = /* @__PURE__ */ Object.assign(ro, {
  setup(p) {
    const e = L("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(""), a = _(""), i = () => {
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
    return (c, d) => (n(), O(G, null, {
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
        t("div", Qa, [
          Za,
          t("div", eo, [
            t("h3", to, u(o(s)("New Folder")), 1),
            t("div", so, [
              t("p", ao, u(o(s)("Create a new folder")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Folder Name"),
                type: "text"
              }, null, 40, oo), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), O(W, {
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
}), lo = { class: "sm:flex sm:items-start" }, io = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), co = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, uo = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, mo = { class: "mt-2" }, vo = { class: "text-sm text-gray-500" }, po = ["placeholder"], ho = {
  name: "VFModalNewFile"
}, fo = /* @__PURE__ */ Object.assign(ho, {
  setup(p) {
    const e = L("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(""), a = _(""), i = () => {
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
    return (c, d) => (n(), O(G, null, {
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
        t("div", lo, [
          io,
          t("div", co, [
            t("h3", uo, u(o(s)("New File")), 1),
            t("div", mo, [
              t("p", vo, u(o(s)("Create a new file")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("File Name"),
                type: "text"
              }, null, 40, po), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), O(W, {
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
}), go = { class: "flex" }, _o = ["aria-label"], ko = { class: "ml-auto mb-2" }, bo = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, xo = { key: 1 }, yo = {
  __name: "Text",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = _(""), a = _(""), i = _(null), c = _(!1), d = _(""), l = _(!1), v = L("ServiceContainer"), { t: b } = v.i18n;
    P(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((y) => {
        r.value = y, s("success");
      });
    });
    const g = () => {
      c.value = !c.value, a.value = r.value, c.value == !0 && ce(() => {
        i.value.focus();
      });
    }, x = () => {
      d.value = "", l.value = !1, v.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: v.modal.data.adapter,
          path: v.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((y) => {
        d.value = b("Updated."), r.value = y, s("success"), c.value = !c.value;
      }).catch((y) => {
        d.value = b(y.message), l.value = !0;
      });
    };
    return (y, M) => (n(), m(U, null, [
      t("div", go, [
        t("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(v).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(o(v).modal.data.item.basename), 9, _o),
        t("div", ko, [
          c.value ? (n(), m("button", {
            key: 0,
            onClick: x,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, u(o(b)("Save")), 1)) : E("", !0),
          o(v).features.includes(o(B).EDIT) ? (n(), m("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: M[0] || (M[0] = ($) => g())
          }, u(c.value ? o(b)("Cancel") : o(b)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", null, [
        c.value ? (n(), m("div", xo, [
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
        ])) : (n(), m("pre", bo, u(r.value), 1)),
        d.value.length ? (n(), O(W, {
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
}, wo = { class: "flex" }, $o = ["aria-label"], Co = { class: "ml-auto mb-2" }, So = { class: "w-full flex justify-center" }, Mo = ["src"], Eo = {
  __name: "Image",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = L("ServiceContainer"), { t: a } = r.i18n, i = _(null), c = _(null), d = _(!1), l = _(""), v = _(!1), b = () => {
      d.value = !d.value, d.value ? c.value = new ze(i.value, {
        crop(x) {
        }
      }) : c.value.destroy();
    }, g = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (x) => {
          l.value = "", v.value = !1;
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
            l.value = a("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), b(), s("success");
          }).catch((M) => {
            l.value = a(M.message), v.value = !0;
          });
        }
      );
    };
    return P(() => {
      s("success");
    }), (x, y) => (n(), m(U, null, [
      t("div", wo, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(o(r).modal.data.item.basename), 9, $o),
        t("div", Co, [
          d.value ? (n(), m("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, u(o(a)("Crop")), 1)) : E("", !0),
          o(r).features.includes(o(B).EDIT) ? (n(), m("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: y[0] || (y[0] = (M) => b())
          }, u(d.value ? o(a)("Cancel") : o(a)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", So, [
        t("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[50vh] max-h-[50vh]",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Mo)
      ]),
      l.value.length ? (n(), O(W, {
        key: 0,
        onHidden: y[1] || (y[1] = (M) => l.value = ""),
        error: v.value
      }, {
        default: A(() => [
          F(u(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : E("", !0)
    ], 64));
  }
}, Do = { class: "flex" }, jo = ["aria-label"], Ao = /* @__PURE__ */ t("div", null, null, -1), To = {
  __name: "Default",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = L("ServiceContainer"), r = e;
    return P(() => {
      r("success");
    }), (a, i) => (n(), m(U, null, [
      t("div", Do, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, u(o(s).modal.data.item.basename), 9, jo)
      ]),
      Ao
    ], 64));
  }
}, Oo = ["aria-label"], Lo = {
  class: "w-full",
  preload: "",
  controls: ""
}, Vo = ["src"], Fo = {
  __name: "Video",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = L("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, c) => (n(), m("div", null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(o(s).modal.data.item.basename), 9, Oo),
      t("div", null, [
        t("video", Lo, [
          t("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Vo),
          F(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, No = ["aria-label"], zo = {
  class: "w-full",
  controls: ""
}, Bo = ["src"], Uo = {
  __name: "Audio",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = L("ServiceContainer"), a = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return P(() => {
      s("success");
    }), (i, c) => (n(), m(U, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(o(r).modal.data.item.basename), 9, No),
      t("div", null, [
        t("audio", zo, [
          t("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Bo),
          F(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, Ro = ["aria-label"], Ho = ["data"], qo = ["src"], Io = /* @__PURE__ */ t("p", null, [
  /* @__PURE__ */ F(" Your browser does not support PDFs. "),
  /* @__PURE__ */ t("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ F(" . ")
], -1), Po = [
  Io
], Go = {
  __name: "Pdf",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = L("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, c) => (n(), m(U, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, u(o(s).modal.data.item.basename), 9, Ro),
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
          }, Po, 8, qo)
        ], 8, Ho)
      ])
    ], 64));
  }
}, Wo = { class: "sm:flex sm:items-start" }, Yo = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, Ko = { key: 0 }, Jo = { class: "text-gray-700 dark:text-gray-200 text-sm" }, Xo = {
  key: 0,
  class: "flex leading-5"
}, Qo = /* @__PURE__ */ t("svg", {
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
], -1), Zo = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, er = { class: "font-bold" }, tr = { class: "font-bold pl-2" }, sr = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, ar = ["download", "href"], or = {
  name: "VFModalPreview"
}, rr = /* @__PURE__ */ Object.assign(or, {
  setup(p) {
    const e = L("ServiceContainer"), { t: s } = e.i18n, r = _(!1), a = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(B.PREVIEW);
    return i || (r.value = !0), (c, d) => (n(), O(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Close")), 1),
        o(e).features.includes(o(B).DOWNLOAD) ? (n(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, u(o(s)("Download")), 9, ar)) : E("", !0)
      ]),
      default: A(() => [
        t("div", Wo, [
          t("div", Yo, [
            o(i) ? (n(), m("div", Ko, [
              a("text") ? (n(), O(yo, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : a("image") ? (n(), O(Eo, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : a("video") ? (n(), O(Fo, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : a("audio") ? (n(), O(Uo, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : a("application/pdf") ? (n(), O(Go, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (n(), O(To, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : E("", !0),
            t("div", Jo, [
              r.value === !1 ? (n(), m("div", Xo, [
                Qo,
                t("span", null, u(o(s)("Loading")), 1)
              ])) : E("", !0)
            ])
          ])
        ]),
        t("div", Zo, [
          t("div", null, [
            t("span", er, u(o(s)("File Size")) + ": ", 1),
            F(u(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          t("div", null, [
            t("span", tr, u(o(s)("Last Modified")) + ": ", 1),
            F(" " + u(o(we)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(B).DOWNLOAD) ? (n(), m("div", sr, [
          t("span", null, u(o(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), nr = { class: "sm:flex sm:items-start" }, lr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ir = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, dr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, cr = { class: "mt-2" }, ur = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, mr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vr = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pr = [
  vr
], hr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fr = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), gr = [
  fr
], _r = { class: "ml-1.5" }, kr = {
  name: "VFModalRename"
}, br = /* @__PURE__ */ Object.assign(kr, {
  setup(p) {
    const e = L("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(e.modal.data.items[0]), a = _(e.modal.data.items[0].basename), i = _(""), c = () => {
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
    return (d, l) => (n(), O(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Rename")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (v) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", nr, [
          lr,
          t("div", ir, [
            t("h3", dr, u(o(s)("Rename")), 1),
            t("div", cr, [
              t("p", ur, [
                r.value.type === "dir" ? (n(), m("svg", mr, pr)) : (n(), m("svg", hr, gr)),
                t("span", _r, u(r.value.basename), 1)
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (v) => a.value = v),
                onKeyup: Q(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Z, a.value]
              ]),
              i.value.length ? (n(), O(W, {
                key: 0,
                onHidden: l[1] || (l[1] = (v) => i.value = ""),
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
}), xr = { class: "sm:flex sm:items-start" }, yr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), wr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $r = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cr = { class: "mt-2" }, Sr = {
  key: 0,
  class: "pointer-events-none"
}, Mr = {
  key: 1,
  class: "pointer-events-none"
}, Er = ["disabled"], Dr = ["disabled"], jr = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Ar = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Tr = ["textContent"], Or = { class: "ml-1 w-full h-fit" }, Lr = { class: "text-left hidden md:block" }, Vr = { class: "text-left md:hidden" }, Fr = {
  key: 0,
  class: "ml-auto"
}, Nr = ["title", "disabled", "onClick"], zr = /* @__PURE__ */ t("svg", {
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
], -1), Br = [
  zr
], Ur = {
  key: 0,
  class: "py-2"
}, Rr = ["disabled"], Hr = {
  name: "VFModalUpload"
}, qr = /* @__PURE__ */ Object.assign(Hr, {
  setup(p) {
    const e = L("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), a = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = _({ QUEUE_ENTRY_STATUS: a }), c = _(null), d = _(null), l = _(null), v = _(null), b = _(null), g = _(null), x = _([]), y = _(""), M = _(!1), $ = _(!1);
    let f;
    function h(j) {
      return x.value.findIndex((S) => S.id === j);
    }
    function N(j, S = null) {
      S = S ?? (j.webkitRelativePath || j.name), f.addFile({
        name: S,
        type: j.type,
        data: j,
        source: "Local"
      });
    }
    function H(j) {
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
      v.value.click();
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
          x.value.forEach((k) => {
            k.status !== a.DONE && S.push(k);
          }), x.value = [], S.forEach((k) => {
            N(k.originalFile, k.name);
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
      f = new Be({
        debug: e.debug,
        restrictions: {
          maxFileSize: Ye(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(k, T) {
          if (T[k.id] != null) {
            const X = h(k.id);
            x.value[X].status === a.PENDING && (y.value = f.i18n("noDuplicates", { fileName: k.name })), x.value = x.value.filter((ue) => ue.id !== k.id);
          }
          return x.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: a.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), f.use(Ue, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, T) {
          let V;
          try {
            V = JSON.parse(k).message;
          } catch {
            V = s("Cannot parse server response.");
          }
          return new Error(V);
        }
      }), f.on("restriction-failed", (k, T) => {
        const V = x.value[h(k.id)];
        oe(V), y.value = T.message;
      }), f.on("upload", () => {
        const k = C();
        f.setMeta({ ...k.body });
        const T = f.getPlugin("XHRUpload");
        T.opts.method = k.method, T.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), T.opts.headers = k.headers, M.value = !0, x.value.forEach((V) => {
          V.status !== a.DONE && (V.percent = null, V.status = a.UPLOADING, V.statusName = s("Pending upload"));
        });
      }), f.on("upload-progress", (k, T) => {
        const V = Math.floor(T.bytesUploaded / T.bytesTotal * 100);
        x.value[h(k.id)].percent = `${V}%`;
      }), f.on("upload-success", (k) => {
        const T = x.value[h(k.id)];
        T.status = a.DONE, T.statusName = s("Done");
      }), f.on("upload-error", (k, T) => {
        const V = x.value[h(k.id)];
        V.percent = null, V.status = a.ERROR, T.isNetworkError ? V.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : V.statusName = T ? T.message : s("Unknown Error");
      }), f.on("error", (k) => {
        y.value = k.message, M.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), f.on("complete", () => {
        M.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), v.value.addEventListener("click", () => {
        d.value.click();
      }), b.value.addEventListener("click", () => {
        l.value.click();
      }), g.value.addEventListener("dragover", (k) => {
        k.preventDefault(), $.value = !0;
      }), g.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), $.value = !1;
      });
      function j(k, T) {
        T.isFile && T.file((V) => k(T, V)), T.isDirectory && T.createReader().readEntries((V) => {
          V.forEach((X) => {
            j(k, X);
          });
        });
      }
      g.value.addEventListener("drop", (k) => {
        k.preventDefault(), $.value = !1;
        const T = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((V) => {
          V.kind === "file" && j((X, ue) => {
            const $e = T.exec(X.fullPath);
            N(ue, $e[1]);
          }, V.webkitGetAsEntry());
        });
      });
      const S = ({ target: k }) => {
        const T = k.files;
        for (const V of T)
          N(V);
        k.value = "";
      };
      d.value.addEventListener("change", S), l.value.addEventListener("change", S);
    }), ke(() => {
      f == null || f.close({ reason: "unmount" });
    }), (j, S) => (n(), O(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          class: z(["vf-btn vf-btn-primary", M.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: M.value,
          onClick: Y(se, ["prevent"])
        }, u(o(s)("Upload")), 11, Rr),
        M.value ? (n(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(ae, ["prevent"])
        }, u(o(s)("Cancel")), 1)) : (n(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(D, ["prevent"])
        }, u(o(s)("Close")), 1))
      ]),
      default: A(() => [
        t("div", xr, [
          yr,
          t("div", wr, [
            t("h3", $r, u(o(s)("Upload Files")), 1),
            t("div", Cr, [
              t("div", {
                ref_key: "dropArea",
                ref: g,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: te
              }, [
                $.value ? (n(), m("div", Sr, u(o(s)("Release to drop these files.")), 1)) : (n(), m("div", Mr, u(o(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              t("div", {
                ref_key: "container",
                ref: c,
                class: "text-gray-500 mb-1"
              }, [
                t("button", {
                  ref_key: "pickFiles",
                  ref: v,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, u(o(s)("Select Files")), 513),
                t("button", {
                  ref_key: "pickFolders",
                  ref: b,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, u(o(s)("Select Folders")), 513),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: M.value,
                  onClick: S[0] || (S[0] = (k) => w(!1))
                }, u(o(s)("Clear all")), 9, Er),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: M.value,
                  onClick: S[1] || (S[1] = (k) => w(!0))
                }, u(o(s)("Clear only successful")), 9, Dr)
              ], 512),
              t("div", jr, [
                (n(!0), m(U, null, I(x.value, (k) => (n(), m("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: k.id
                }, [
                  t("span", Ar, [
                    t("span", {
                      class: z(["text-base m-auto", H(k)]),
                      textContent: u(K(k))
                    }, null, 10, Tr)
                  ]),
                  t("div", Or, [
                    t("div", Lr, u(o(he)(k.name, 40)) + " (" + u(k.size) + ")", 1),
                    t("div", Vr, u(o(he)(k.name, 16)) + " (" + u(k.size) + ")", 1),
                    t("div", {
                      class: z(["flex break-all text-left", H(k)])
                    }, [
                      F(u(k.statusName) + " ", 1),
                      k.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), m("b", Fr, u(k.percent), 1)) : E("", !0)
                    ], 2)
                  ]),
                  t("button", {
                    type: "button",
                    class: z(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", M.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: o(s)("Delete"),
                    disabled: M.value,
                    onClick: (T) => oe(k)
                  }, Br, 10, Nr)
                ]))), 128)),
                x.value.length ? E("", !0) : (n(), m("div", Ur, u(o(s)("No files selected!")), 1))
              ]),
              y.value.length ? (n(), O(W, {
                key: 0,
                onHidden: S[2] || (S[2] = (k) => y.value = ""),
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
}), Ir = { class: "sm:flex sm:items-start" }, Pr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Gr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Wr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Yr = { class: "mt-2" }, Kr = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Jr = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Xr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qr = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zr = [
  Qr
], en = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, tn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), sn = [
  tn
], an = { class: "ml-1.5" }, on = ["placeholder"], rn = {
  name: "VFModalArchive"
}, nn = /* @__PURE__ */ Object.assign(rn, {
  setup(p) {
    const e = L("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(""), a = _(""), i = _(e.modal.data.items), c = () => {
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
    return (d, l) => (n(), O(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Archive")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (v) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", Ir, [
          Pr,
          t("div", Gr, [
            t("h3", Wr, u(o(s)("Archive the files")), 1),
            t("div", Yr, [
              t("div", Kr, [
                (n(!0), m(U, null, I(i.value, (v) => (n(), m("p", Jr, [
                  v.type === "dir" ? (n(), m("svg", Xr, Zr)) : (n(), m("svg", en, sn)),
                  t("span", an, u(v.basename), 1)
                ]))), 256))
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (v) => r.value = v),
                onKeyup: Q(c, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, on), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), O(W, {
                key: 0,
                onHidden: l[1] || (l[1] = (v) => a.value = ""),
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
}), ln = { class: "sm:flex sm:items-start" }, dn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), cn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, un = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, mn = { class: "mt-2" }, vn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, pn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), fn = [
  hn
], gn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _n = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), kn = [
  _n
], bn = { class: "ml-1.5" }, xn = { class: "my-1 text-sm text-gray-500" }, yn = {
  name: "VFModalUnarchive"
}, wn = /* @__PURE__ */ Object.assign(yn, {
  setup(p) {
    const e = L("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n;
    _("");
    const r = _(e.modal.data.items[0]), a = _(""), i = _([]), c = () => {
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
    return (d, l) => (n(), O(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, u(o(s)("Unarchive")), 1),
        t("button", {
          type: "button",
          onClick: l[1] || (l[1] = (v) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", ln, [
          dn,
          t("div", cn, [
            t("h3", un, u(o(s)("Unarchive")), 1),
            t("div", mn, [
              (n(!0), m(U, null, I(i.value, (v) => (n(), m("p", vn, [
                v.type === "dir" ? (n(), m("svg", pn, fn)) : (n(), m("svg", gn, kn)),
                t("span", bn, u(v.basename), 1)
              ]))), 256)),
              t("p", xn, u(o(s)("The archive will be unarchived at")) + " (" + u(o(e).data.dirname) + ")", 1),
              a.value.length ? (n(), O(W, {
                key: 0,
                onHidden: l[0] || (l[0] = (v) => a.value = ""),
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
}), $n = { class: "sm:flex sm:items-start" }, Cn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Sn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Mn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, En = { class: "text-sm text-gray-500 pb-1" }, Dn = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, jn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, An = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), On = [
  Tn
], Ln = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fn = [
  Vn
], Nn = { class: "ml-1.5" }, zn = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, Bn = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, Un = /* @__PURE__ */ t("svg", {
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
], -1), Rn = { class: "ml-1.5 overflow-auto" }, Hn = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, qn = {
  name: "VFModalMove"
}, In = /* @__PURE__ */ Object.assign(qn, {
  setup(p) {
    const e = L("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = _(e.modal.data.items.from), a = _(""), i = () => {
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
    return (c, d) => (n(), O(G, null, {
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
        t("div", Hn, u(o(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: A(() => [
        t("div", $n, [
          Cn,
          t("div", Sn, [
            t("h3", Mn, u(o(s)("Move files")), 1),
            t("p", En, u(o(s)("Are you sure you want to move these files?")), 1),
            t("div", Dn, [
              (n(!0), m(U, null, I(r.value, (l) => (n(), m("div", jn, [
                t("div", null, [
                  l.type === "dir" ? (n(), m("svg", An, On)) : (n(), m("svg", Ln, Fn))
                ]),
                t("div", Nn, u(l.path), 1)
              ]))), 256))
            ]),
            t("h4", zn, u(o(s)("Target Directory")), 1),
            t("p", Bn, [
              Un,
              t("span", Rn, u(o(e).modal.data.items.to.path), 1)
            ]),
            a.value.length ? (n(), O(W, {
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
}), Pn = (p, e) => {
  const s = p.__vccOpts || p;
  for (const [r, a] of e)
    s[r] = a;
  return s;
}, Gn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(p, { emit: e, slots: s }) {
    const r = L("ServiceContainer"), a = _(!1), { t: i } = r.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), a.value = !0, c = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return P(() => {
      r.emitter.on(p.on, d);
    }), Oe(() => {
      clearTimeout(c);
    }), {
      shown: a,
      t: i
    };
  }
}, Wn = { key: 1 };
function Yn(p, e, s, r, a, i) {
  return n(), m("div", {
    class: z(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    p.$slots.default ? le(p.$slots, "default", { key: 0 }) : (n(), m("span", Wn, u(r.t("Saved.")), 1))
  ], 2);
}
const ve = /* @__PURE__ */ Pn(Gn, [["render", Yn]]), Kn = { class: "sm:flex sm:items-start" }, Jn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Xn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Qn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Zn = { class: "mt-2" }, el = { class: "text-sm text-gray-500" }, tl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, sl = { class: "mt-3 text-left" }, al = { class: "space-y-2" }, ol = { class: "flex relative gap-x-3" }, rl = { class: "h-6 items-center" }, nl = { class: "flex-1 block text-sm" }, ll = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, il = { class: "flex relative gap-x-3" }, dl = { class: "h-6 items-center" }, cl = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, ul = { class: "flex text-sm" }, ml = ["label"], vl = ["value"], pl = {
  key: 0,
  class: "flex relative gap-x-3"
}, hl = { class: "h-6 items-center" }, fl = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, gl = { class: "flex text-sm" }, _l = ["label"], kl = ["value"], bl = {
  name: "VFModalAbout"
}, xl = /* @__PURE__ */ Object.assign(bl, {
  setup(p) {
    const e = L("ServiceContainer"), { getStore: s, setStore: r, clearStore: a } = e.storage, { t: i, changeLocale: c, locale: d } = e.i18n;
    _(""), _("");
    const l = async () => {
      a(), location.reload();
    }, v = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, b = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? ye : xe, r("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, { i18n: g } = L("VueFinderOptions"), y = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(g).includes($))
    ), M = ee(() => ({
      system: i("System"),
      light: i("Light"),
      dark: i("Dark")
    }));
    return ($, f) => (n(), O(G, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: f[5] || (f[5] = (h) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, u(o(i)("Close")), 1)
      ]),
      default: A(() => [
        t("div", Kn, [
          Jn,
          t("div", Xn, [
            t("h3", Qn, u(o(i)("About %s", "Vuefinder " + o(e).version)), 1),
            t("div", Zn, [
              t("p", el, u(o(i)("Vuefinder is a file manager component for vue 3.")), 1),
              t("div", null, [
                t("h3", tl, u(o(i)("Settings")), 1)
              ]),
              t("div", sl, [
                t("fieldset", null, [
                  t("div", al, [
                    t("div", ol, [
                      t("div", rl, [
                        q(t("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": f[0] || (f[0] = (h) => o(e).metricUnits = h),
                          onClick: b,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Le, o(e).metricUnits]
                        ])
                      ]),
                      t("div", nl, [
                        t("label", ll, [
                          F(u(o(i)("Use Metric Units")) + " ", 1),
                          R(ve, {
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
                    t("div", il, [
                      t("div", dl, [
                        t("label", cl, u(o(i)("Theme")), 1)
                      ]),
                      t("div", ul, [
                        q(t("select", {
                          id: "theme",
                          "onUpdate:modelValue": f[1] || (f[1] = (h) => o(e).theme.value = h),
                          onChange: f[2] || (f[2] = (h) => v(h.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Theme")
                          }, [
                            (n(!0), m(U, null, I(M.value, (h, N) => (n(), m("option", { value: N }, u(h), 9, vl))), 256))
                          ], 8, ml)
                        ], 544), [
                          [pe, o(e).theme.value]
                        ]),
                        R(ve, {
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
                    o(e).features.includes(o(B).LANGUAGE) && Object.keys(o(y)).length > 1 ? (n(), m("div", pl, [
                      t("div", hl, [
                        t("label", fl, u(o(i)("Language")), 1)
                      ]),
                      t("div", gl, [
                        q(t("select", {
                          id: "language",
                          "onUpdate:modelValue": f[3] || (f[3] = (h) => _e(d) ? d.value = h : null),
                          onChange: f[4] || (f[4] = (h) => o(c)(h.target.value)),
                          class: "flex-shrink-0 w-1/2 sm:w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Language")
                          }, [
                            (n(!0), m(U, null, I(o(y), (h, N) => (n(), m("option", { value: N }, u(h), 9, kl))), 256))
                          ], 8, _l)
                        ], 544), [
                          [pe, o(d)]
                        ]),
                        R(ve, {
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
}), yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: xl,
  ModalArchive: nn,
  ModalDelete: qa,
  ModalMessage: Xa,
  ModalMove: In,
  ModalNewFile: fo,
  ModalNewFolder: no,
  ModalPreview: rr,
  ModalRename: br,
  ModalUnarchive: wn,
  ModalUpload: qr
}, Symbol.toStringTag, { value: "Module" })), Ol = {
  /** @param {import('vue').App} app
   * @param options
   */
  install(p, e = {}) {
    p.component("VueFinder", fa);
    for (const r of Object.values(yl))
      p.component(r.name, r);
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "pt", p.provide("VueFinderOptions", e);
  }
};
export {
  Ol as default
};

/**
 * Skipped minification because the original files appears to be already minified.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
module.exports = (function (e) {
    var t = {};
    function s(r) {
        if (t[r]) return t[r].exports;
        var a = (t[r] = { i: r, l: !1, exports: {} });
        return e[r].call(a.exports, a, a.exports, s), (a.l = !0), a.exports;
    }
    return (
        (s.m = e),
        (s.c = t),
        (s.d = function (e, t, r) {
            s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
        }),
        (s.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (s.t = function (e, t) {
            if ((1 & t && (e = s(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if ((s.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                for (var a in e)
                    s.d(
                        r,
                        a,
                        function (t) {
                            return e[t];
                        }.bind(null, a)
                    );
            return r;
        }),
        (s.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return s.d(t, "a", t), t;
        }),
        (s.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (s.p = ""),
        s((s.s = 1))
    );
})([
    function (e, t, s) {
        "use strict";
        e.exports = function (e, t, s, r) {
            void 0 === t && (t = 1), void 0 === s && (s = 10), void 0 === r && (r = 10);
            var a,
                n,
                i = Math.ceil(e / s);
            if ((t < 1 ? (t = 1) : t > i && (t = i), i <= r)) (a = 1), (n = i);
            else {
                var l = Math.floor(r / 2),
                    o = Math.ceil(r / 2) - 1;
                t <= l ? ((a = 1), (n = r)) : t + o >= i ? ((a = i - r + 1), (n = i)) : ((a = t - l), (n = t + o));
            }
            var c = (t - 1) * s,
                u = Math.min(c + s - 1, e - 1),
                p = Array.from(Array(n + 1 - a).keys()).map(function (e) {
                    return a + e;
                });
            return { totalItems: e, currentPage: t, pageSize: s, totalPages: i, startPage: a, endPage: n, startIndex: c, endIndex: u, pages: p };
        };
    },
    function (e, t, s) {
        "use strict";
        s.r(t);
        var r = function () {
            var e = this,
                t = e.$createElement,
                s = e._self._c || t;
            return e.pager.pages && e.pager.pages.length
                ? s(
                      "ul",
                      { staticClass: "pagination", style: e.ulStyles },
                      [
                          s("li", { staticClass: "page-item first", class: { disabled: 1 === e.pager.currentPage }, style: e.liStyles }, [
                              s(
                                  "a",
                                  {
                                      staticClass: "page-link",
                                      style: e.aStyles,
                                      on: {
                                          click: function (t) {
                                              return e.setPage(1);
                                          },
                                      },
                                  },
                                  [e._v(e._s(e.labels.first))]
                              ),
                          ]),
                          e._v(" "),
                          s("li", { staticClass: "page-item previous", class: { disabled: 1 === e.pager.currentPage }, style: e.liStyles }, [
                              s(
                                  "a",
                                  {
                                      staticClass: "page-link",
                                      style: e.aStyles,
                                      on: {
                                          click: function (t) {
                                              return e.setPage(e.pager.currentPage - 1);
                                          },
                                      },
                                  },
                                  [e._v(e._s(e.labels.previous))]
                              ),
                          ]),
                          e._v(" "),
                          e._l(e.pager.pages, function (t) {
                              return s("li", { key: t, staticClass: "page-item page-number", class: { active: e.pager.currentPage === t }, style: e.liStyles }, [
                                  s(
                                      "a",
                                      {
                                          staticClass: "page-link",
                                          style: e.aStyles,
                                          on: {
                                              click: function (s) {
                                                  return e.setPage(t);
                                              },
                                          },
                                      },
                                      [e._v(e._s(t))]
                                  ),
                              ]);
                          }),
                          e._v(" "),
                          s("li", { staticClass: "page-item next", class: { disabled: e.pager.currentPage === e.pager.totalPages }, style: e.liStyles }, [
                              s(
                                  "a",
                                  {
                                      staticClass: "page-link",
                                      style: e.aStyles,
                                      on: {
                                          click: function (t) {
                                              return e.setPage(e.pager.currentPage + 1);
                                          },
                                      },
                                  },
                                  [e._v(e._s(e.labels.next))]
                              ),
                          ]),
                          e._v(" "),
                          s("li", { staticClass: "page-item last", class: { disabled: e.pager.currentPage === e.pager.totalPages }, style: e.liStyles }, [
                              s(
                                  "a",
                                  {
                                      staticClass: "page-link",
                                      style: e.aStyles,
                                      on: {
                                          click: function (t) {
                                              return e.setPage(e.pager.totalPages);
                                          },
                                      },
                                  },
                                  [e._v(e._s(e.labels.last))]
                              ),
                          ]),
                      ],
                      2
                  )
                : e._e();
        };
        r._withStripped = !0;
        var a = s(0),
            n = s.n(a);
        function i(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t &&
                    (r = r.filter(function (t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    })),
                    s.push.apply(s, r);
            }
            return s;
        }
        function l(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = null != arguments[t] ? arguments[t] : {};
                t % 2
                    ? i(s, !0).forEach(function (t) {
                          o(e, t, s[t]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s))
                    : i(s).forEach(function (t) {
                          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t));
                      });
            }
            return e;
        }
        function o(e, t, s) {
            return t in e ? Object.defineProperty(e, t, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = s), e;
        }
        var c = { first: "First", last: "Last", previous: "Previous", next: "Next" },
            u = { margin: 0, padding: 0, display: "inline-block" },
            p = { listStyle: "none", display: "inline", textAlign: "center" },
            g = { cursor: "pointer", padding: "6px 12px", display: "block", float: "left" };
        var f = (function (e, t, s, r, a, n, i, l) {
            var o,
                c = "function" == typeof e ? e.options : e;
            if (
                (t && ((c.render = t), (c.staticRenderFns = s), (c._compiled = !0)),
                r && (c.functional = !0),
                n && (c._scopeId = "data-v-" + n),
                i
                    ? ((o = function (e) {
                          (e = e || (this.$vnode && this.$vnode.ssrContext) || (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext)) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), a && a.call(this, e), e && e._registeredComponents && e._registeredComponents.add(i);
                      }),
                      (c._ssrRegister = o))
                    : a &&
                      (o = l
                          ? function () {
                                a.call(this, this.$root.$options.shadowRoot);
                            }
                          : a),
                o)
            )
                if (c.functional) {
                    c._injectStyles = o;
                    var u = c.render;
                    c.render = function (e, t) {
                        return o.call(t), u(e, t);
                    };
                } else {
                    var p = c.beforeCreate;
                    c.beforeCreate = p ? [].concat(p, o) : [o];
                }
            return { exports: e, options: c };
        })(
            {
                props: {
                    items: { type: Array, required: !0 },
                    initialPage: { type: Number, default: 1 },
                    pageSize: { type: Number, default: 10 },
                    maxPages: { type: Number, default: 10 },
                    labels: {
                        type: Object,
                        default: function () {
                            return c;
                        },
                    },
                    styles: { type: Object },
                    disableDefaultStyles: { type: Boolean, default: !1 },
                },
                data: function () {
                    return { pager: {}, ulStyles: {}, liStyles: {}, aStyles: {} };
                },
                created: function () {
                    if (!this.$listeners.changePage) throw 'Missing required event listener: "changePage"';
                    this.disableDefaultStyles || ((this.ulStyles = u), (this.liStyles = p), (this.aStyles = g)), this.styles && ((this.ulStyles = l({}, this.ulStyles, {}, this.styles.ul)), (this.liStyles = l({}, this.liStyles, {}, this.styles.li)), (this.aStyles = l({}, this.aStyles, {}, this.styles.a))), this.setPage(this.initialPage);
                },
                methods: {
                    setPage: function (e) {
                        var t = this.items,
                            s = this.pageSize,
                            r = this.maxPages,
                            a = n()(t.length, e, s, r),
                            i = t.slice(a.startIndex, a.endIndex + 1);
                        (this.pager = a), this.$emit("changePage", i);
                    },
                },
                watch: {
                    items: function () {
                        this.setPage(this.initialPage);
                    },
                },
            },
            r,
            [],
            !1,
            null,
            null,
            null
        );
        f.options.__file = "src/JwPagination.vue";
        t.default = f.exports;
    },
]);

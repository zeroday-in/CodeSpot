(window.webpackJsonp = window.webpackJsonp || []).push([
  [11, 77],
  {
    10: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return m;
      }),
        n.d(t, "a", function () {
          return g;
        });
      var r = n(2),
        a = n(1),
        o = n.n(a);
      function i(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return f(e);
          })(e) ||
          (function (e) {
            if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e))
              return Array.from(e);
          })(e) ||
          d(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function c(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? c(Object(n), !0).forEach(function (t) {
                l(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : c(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function l(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function u(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if (
              "undefined" === typeof Symbol ||
              !(Symbol.iterator in Object(e))
            )
              return;
            var n = [],
              r = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var i, c = e[Symbol.iterator]();
                !(r = (i = c.next()).done) &&
                (n.push(i.value), !t || n.length !== t);
                r = !0
              );
            } catch (s) {
              (a = !0), (o = s);
            } finally {
              try {
                r || null == c.return || c.return();
              } finally {
                if (a) throw o;
              }
            }
            return n;
          })(e, t) ||
          d(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function d(e, t) {
        if (e) {
          if ("string" === typeof e) return f(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? f(e, t)
              : void 0
          );
        }
      }
      function f(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function p(e) {
        if (e instanceof HTMLElement === !1) return !1;
        var t = e.nodeName.toLowerCase(),
          n = (e.getAttribute("type") || "").toLowerCase();
        return (
          "select" === t ||
          "textarea" === t ||
          ("input" === t &&
            "submit" !== n &&
            "reset" !== n &&
            "checkbox" !== n &&
            "radio" !== n) ||
          e.isContentEditable
        );
      }
      var h = { timeout: 0 };
      function m(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : window,
          n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          a = Object(r.j)([]),
          o = u(a, 2),
          c = o[0],
          l = o[1],
          d = Object(r.j)(null),
          f = u(d, 2),
          m = f[0],
          g = f[1],
          b = Object(r.j)(s(s({}, h), n)),
          y = u(b, 2),
          v = y[0],
          O = y[1],
          w = Object(r.a)(
            function (t, n) {
              var r;
              (r =
                c.length > 0
                  ? e["".concat(c.join("~"), "~").concat(t.code)]
                  : e["".concat(n).concat(t.code)] ||
                    e["".concat(n).concat(t.key.toLowerCase())]) &&
                (r(t), l([]));
            },
            [e, c]
          );
        Object(r.d)(
          function () {
            var e = {};
            "number" === typeof n.timeout && (e.timeout = n.timeout),
              O(s(s({}, h), e));
          },
          [n.timeout]
        ),
          Object(r.d)(
            function () {
              var e;
              if (m || 0 !== c.length)
                return (
                  (e = window.setTimeout(function () {
                    clearTimeout(e), l([]);
                  }, v.timeout)),
                  m && (l([].concat(i(c), [m])), g(null)),
                  function () {
                    return clearTimeout(e);
                  }
                );
            },
            [c, m, v.timeout]
          ),
          Object(r.d)(
            function () {
              if (e && 0 !== Object.keys(e).length) {
                var n = function (e) {
                  if (!e.defaultPrevented) {
                    var t = ""
                      .concat(e.ctrlKey || e.metaKey ? "ctrl+" : "")
                      .concat(e.altKey ? "alt+" : "")
                      .concat(
                        (e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey
                          ? "shift+"
                          : ""
                      );
                    (e.target instanceof Node && p(e.target) && !t) ||
                      (t ? l([]) : g(e.code), w(e, t));
                  }
                };
                return (
                  t.addEventListener("keydown", n),
                  function () {
                    return t.removeEventListener("keydown", n);
                  }
                );
              }
            },
            [e, t, w]
          );
      }
      function g(e) {
        return m(e.shortcuts, e.eventTarget, e.options), null;
      }
      (g.propTypes = {
        shortcuts: o.a.object.isRequired,
        options: o.a.shape({ timeout: o.a.number }),
        eventTarget: o.a.instanceOf(Element),
      }),
        (g.defaultProps = { shortcuts: {}, options: {}, eventTarget: window });
    },
    11: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return c;
      }),
        n.d(t, "a", function () {
          return s;
        });
      var r = n(1),
        a = n.n(r),
        o = n(7),
        i = n(6),
        c = a.a.shape({ body_text: a.a.arrayOf(a.a.string) }),
        s = a.a.shape({
          id: a.a.number.isRequired,
          title: a.a.string.isRequired,
          path: a.a.string.isRequired,
          cloudinary_video_url: a.a.string,
          video_duration_in_minutes: a.a.number,
          type_of: a.a.oneOf(["podcast_episodes"]),
          class_name: a.a.oneOf(["PodcastEpisode", "User", "Article"]),
          flare_tag: o.a,
          tag_list: a.a.arrayOf(a.a.string),
          cached_tag_list_array: a.a.arrayOf(a.a.string),
          podcast: a.a.shape({
            slug: a.a.string.isRequired,
            title: a.a.string.isRequired,
            image_url: a.a.string.isRequired,
          }),
          user_id: a.a.string.isRequired,
          user: a.a.shape({
            username: a.a.string.isRequired,
            name: a.a.string.isRequired,
          }),
          organization: i.a,
          highlight: c,
          public_reactions_count: a.a.number,
          reactions_count: a.a.number,
          comments_count: a.a.number,
          reading_time: a.a.number,
        });
    },
    13: function (e, t, n) {
      "use strict";
      n.d(t, "d", function () {
        return i;
      }),
        n.d(t, "a", function () {
          return s;
        }),
        n.d(t, "c", function () {
          return l;
        }),
        n.d(t, "e", function () {
          return u;
        }),
        n.d(t, "b", function () {
          return d;
        });
      var r = n(5);
      function a(e, t) {
        var n = (function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : window.location.href,
            n = e.replace(/[[\]]/g, "\\$&"),
            r = new RegExp("[?&]".concat(n, "(=([^&#]*)|&|#|$)")).exec(t);
          return r
            ? r[2]
              ? decodeURIComponent(r[2].replace(/\+/g, " "))
              : ""
            : null;
        })(e, t);
        return n ? "&".concat(e, "=").concat(n) : "";
      }
      function o(e) {
        return a("filters", e);
      }
      function i() {
        return "undefined" !== typeof instantClick;
      }
      function c(e) {
        return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {
          return "%".concat(e.charCodeAt(0).toString(16));
        });
      }
      function s(e) {
        var t,
          n = e.searchTerm,
          r = e.location,
          i = void 0 === r ? window.location : r,
          s = i.origin,
          l = c(n),
          u = o(i.href),
          d = a("sort_by", (t = i.href)) + a("sort_direction", t);
        InstantClick.display(
          "".concat(s, "/search?q=").concat(l).concat(u).concat(d)
        );
      }
      function l(e) {
        var t,
          n = new URLSearchParams(e),
          r = null !== (t = filterXSS(n.get("q"))) && void 0 !== t ? t : "",
          a = document.createElement("div");
        return (
          (a.innerHTML = r), null !== a.firstChild ? a.firstChild.nodeValue : r
        );
      }
      function u(e) {
        var t = e.searchTerm,
          n = e.location,
          r = void 0 === n ? window.location : n,
          a = c(t.replace(/^[ ]+|[ ]+$/g, "")),
          i = "".concat(r.origin, "/search?q=").concat(a).concat(o(r.href));
        InstantClick.preload(i);
      }
      function d(e, t) {
        var n = (function (e) {
          var t = new URLSearchParams();
          return (
            Object.keys(e).forEach(function (n) {
              var r = e[n];
              Array.isArray(r)
                ? r.forEach(function (e) {
                    t.append("".concat(n, "[]"), e);
                  })
                : t.append(n, r);
            }),
            t.toString()
          );
        })(t);
        return Object(r.b)("/search/".concat(e, "?").concat(n)).then(function (
          e
        ) {
          return e.json();
        });
      }
    },
    14: function (e, t, n) {
      "use strict";
      function r(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function a(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? r(Object(n), !0).forEach(function (t) {
                o(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : r(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function o(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function i(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              a = {},
              o = Object.keys(e);
            for (r = 0; r < o.length; r++)
              (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (a[n] = e[n]));
        }
        return a;
      }
      function c(e, t, n, r, a, o, i) {
        try {
          var c = e[o](i),
            s = c.value;
        } catch (l) {
          return void n(l);
        }
        c.done ? t(s) : Promise.resolve(s).then(r, a);
      }
      function s(e) {
        return function () {
          var t = this,
            n = arguments;
          return new Promise(function (r, a) {
            var o = e.apply(t, n);
            function i(e) {
              c(o, r, a, i, s, "next", e);
            }
            function s(e) {
              c(o, r, a, i, s, "throw", e);
            }
            i(void 0);
          });
        };
      }
      function l(e) {
        return u.apply(this, arguments);
      }
      function u() {
        return (u = s(function* (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = t.headers,
            r = t.body,
            o = t.method,
            c = void 0 === o ? "GET" : o,
            s = t.csrfToken,
            l = void 0 === s ? yield getCsrfToken() : s,
            u = i(t, ["headers", "body", "method", "csrfToken"]),
            d = { body: r && "string" !== typeof r ? JSON.stringify(r) : r },
            f = a(
              a(
                {
                  method: c,
                  headers: a(
                    {
                      Accept: "application/json",
                      "X-CSRF-Token": l,
                      "Content-Type": "application/json",
                    },
                    n
                  ),
                  credentials: "same-origin",
                },
                d
              ),
              u
            );
          return fetch(e, f);
        })).apply(this, arguments);
      }
      n.d(t, "a", function () {
        return l;
      });
    },
    15: function (e, t, n) {
      "use strict";
      n.d(t, "d", function () {
        return f;
      }),
        n.d(t, "e", function () {
          return p;
        }),
        n.d(t, "g", function () {
          return h;
        }),
        n.d(t, "h", function () {
          return m;
        }),
        n.d(t, "f", function () {
          return g;
        }),
        n.d(t, "a", function () {
          return b;
        }),
        n.d(t, "b", function () {
          return y;
        }),
        n.d(t, "c", function () {
          return v;
        });
      var r = n(13);
      n(52);
      function a(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if (
              "undefined" === typeof Symbol ||
              !(Symbol.iterator in Object(e))
            )
              return;
            var n = [],
              r = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var i, c = e[Symbol.iterator]();
                !(r = (i = c.next()).done) &&
                (n.push(i.value), !t || n.length !== t);
                r = !0
              );
            } catch (s) {
              (a = !0), (o = s);
            } finally {
              try {
                r || null == c.return || c.return();
              } finally {
                if (a) throw o;
              }
            }
            return n;
          })(e, t) ||
          i(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function o(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return c(e);
          })(e) ||
          (function (e) {
            if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e))
              return Array.from(e);
          })(e) ||
          i(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function i(e, t) {
        if (e) {
          if ("string" === typeof e) return c(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? c(e, t)
              : void 0
          );
        }
      }
      function c(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function s(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? s(Object(n), !0).forEach(function (t) {
                u(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : s(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function u(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var d = function (e) {
          var t = e.resolve,
            n = e.reject,
            r = e.waitTime,
            a = void 0 === r ? 20 : r,
            o = 0;
          return function e() {
            if (3e3 !== o) {
              var r,
                i =
                  (document,
                  null !==
                  (r = document.querySelector("meta[name='csrf-token']"))
                    ? r.content
                    : void 0),
                c = document.body.dataset.user;
              if (c && void 0 !== i) {
                var s = JSON.parse(c);
                t({ currentUser: s, csrfToken: i });
              } else (o += a), setTimeout(e, a);
            } else n(new Error("Couldn't find user data on page."));
          };
        },
        f = function () {
          var e = document.body.dataset.user;
          return JSON.parse(e);
        };
      function p() {
        return new Promise(function (e, t) {
          d({ resolve: e, reject: t })();
        });
      }
      function h() {
        var e = document.getElementById("messagelist");
        e.scrollTop = e.scrollHeight;
      }
      function m(e) {
        var t = document.getElementById("messagelist__sentinel");
        new IntersectionObserver(e, { threshold: [0, 1] }).observe(t);
      }
      function g(e, t) {
        return Object.keys(e).reduce(function (n, r) {
          var a = e[r].map(function (e) {
            if (e.user_id === t) {
              var n = Object.assign({ type: "hidden" }, e);
              return (
                (n.message = "<message removed>"),
                (n.messageColor = "lightgray"),
                n
              );
            }
            return e;
          });
          return l(l({}, n), {}, u({}, r, a));
        }, {});
      }
      function b(e) {
        var t = new Date(e);
        return (t = new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(t));
      }
      var y = function (e, t, n) {
          var r = e.filter(function (e) {
              return e.viewable_by === t && "active" === e.status;
            }),
            a = e.filter(function (e) {
              return "joining_request" === e.status;
            }),
            i = [
              o(
                new Set(
                  r.map(function (e) {
                    return e.chat_channel_id;
                  })
                )
              ),
              o(
                new Set(
                  a.map(function (e) {
                    return e.chat_channel_id;
                  })
                )
              ),
            ];
          return {
            activeChannels: r,
            discoverableChannels: e
              .filter(function (e) {
                return (
                  ("joining_request" === e.status && n) ||
                  (!i[1].includes(e.chat_channel_id) && e.viewable_by !== t)
                );
              })
              .filter(function (e) {
                return !i[0].includes(e.chat_channel_id);
              }),
          };
        },
        v = function (e, t) {
          var n = {};
          if (e.filters) {
            var o = a(e.filters.split(":"), 2),
              i = o[0],
              c = o[1];
            n[i] = c;
          }
          return (
            (n.per_page = 30),
            (n.page = t.paginationNumber),
            (n.channel_text = t.query),
            "discoverable" === t.searchType && (n.user_id = "all"),
            Object(r.b)("chat_channels", n)
          );
        };
    },
    18: function (e, t, n) {
      "use strict";
      var r = n(19);
      n.d(t, "a", function () {
        return r.a;
      });
    },
    19: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return u;
      });
      var r = n(0),
        a = n(1),
        o = n.n(a),
        i = n(4);
      function c() {
        return (c =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      function s(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              a = {},
              o = Object.keys(e);
            for (r = 0; r < o.length; r++)
              (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (a[n] = e[n]));
        }
        return a;
      }
      function l(e) {
        var t = e.variant,
          n = e.className,
          r = e.contentType,
          a = e.size,
          o = e.inverted,
          i = e.disabled,
          c = "";
        return (
          t &&
            t.length > 0 &&
            "primary" !== t &&
            (c += " crayons-btn--".concat(t)),
          a &&
            a.length > 0 &&
            "default" !== a &&
            (c += " crayons-btn--".concat(a)),
          r &&
            r.length > 0 &&
            "text" !== r &&
            (c += " crayons-btn--".concat(r)),
          i && (c += " crayons-btn--disabled"),
          o && (c += " crayons-btn--inverted"),
          n && n.length > 0 && (c += " ".concat(n)),
          c
        );
      }
      var u = function (e) {
        var t = e.children,
          n = e.variant,
          a = void 0 === n ? "primary" : n,
          o = e.tagName,
          i = void 0 === o ? "button" : o,
          u = e.inverted,
          d = e.contentType,
          f = void 0 === d ? "text" : d,
          p = e.size,
          h = void 0 === p ? "default" : p,
          m = e.className,
          g = e.icon,
          b = e.url,
          y = e.buttonType,
          v = e.disabled,
          O = e.onClick,
          w = e.onMouseOver,
          j = e.onMouseOut,
          S = e.onFocus,
          _ = e.onBlur,
          k = e.tabIndex,
          R = e.title,
          C = s(e, [
            "children",
            "variant",
            "tagName",
            "inverted",
            "contentType",
            "size",
            "className",
            "icon",
            "url",
            "buttonType",
            "disabled",
            "onClick",
            "onMouseOver",
            "onMouseOut",
            "onFocus",
            "onBlur",
            "tabIndex",
            "title",
          ]),
          I = i,
          N = g,
          T =
            "button" === i
              ? { type: y, disabled: v }
              : { href: v ? void 0 : b };
        return Object(r.h)(
          I,
          c(
            {
              className: "crayons-btn".concat(
                l({
                  variant: a,
                  size: h,
                  contentType: f,
                  className: m,
                  icon: g,
                  inverted: u,
                  disabled: "a" === i && v,
                  children: t,
                })
              ),
              onClick: O,
              onMouseOver: w,
              onMouseOut: j,
              onFocus: S,
              onBlur: _,
              tabIndex: k,
              title: R,
            },
            T,
            C
          ),
          "text" !== f && "icon-right" !== f && N && Object(r.h)(N, null),
          ("text" === f || "icon-left" === f || "icon-right" === f) && t,
          "text" !== f && "icon-right" === f && N && Object(r.h)(N, null)
        );
      };
      (u.displayName = "Button"),
        (u.defaultProps = {
          className: void 0,
          icon: void 0,
          url: void 0,
          buttonType: "button",
          disabled: !1,
          inverted: !1,
          onClick: void 0,
          onMouseOver: void 0,
          onMouseOut: void 0,
          onFocus: void 0,
          onBlur: void 0,
          tabIndex: void 0,
          title: void 0,
        }),
        (u.propTypes = {
          children: i.c.isRequired,
          variant: o.a.oneOf([
            "primary",
            "secondary",
            "outlined",
            "danger",
            "ghost",
            "ghost-brand",
            "ghost-success",
            "ghost-warning",
            "ghost-danger",
          ]).isRequired,
          contentType: o.a.oneOf([
            "text",
            "icon-left",
            "icon-right",
            "icon",
            "icon-rounded",
          ]).isRequired,
          inverted: o.a.bool,
          tagName: o.a.oneOf(["a", "button"]).isRequired,
          className: o.a.string,
          icon: o.a.node,
          url: o.a.string,
          buttonType: o.a.string,
          disabled: o.a.bool,
          size: o.a.oneOf(["default", "s", "l", "xl"]).isRequired,
          onClick: o.a.func,
          onMouseOver: o.a.func,
          onMouseOut: o.a.func,
          onFocus: o.a.func,
          onBlur: o.a.func,
          tabIndex: o.a.number,
          title: o.a.string,
        });
    },
    20: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return a;
      });
      var r = n(0),
        a = function () {
          return Object(r.h)(
            "svg",
            {
              className: "crayons-icon crayons-spinner",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            Object(r.h)("path", {
              d:
                "M18.364 5.636L16.95 7.05A7 7 0 1019 12h2a9 9 0 11-2.636-6.364z",
              fill: "currentColor",
            })
          );
        };
    },
    23: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return l;
      });
      var r = n(0),
        a = n(1),
        o = n.n(a),
        i = n(4),
        c = n(3),
        s = {
          children: i.c.isRequired,
          actions: o.a.arrayOf(
            o.a.shape({
              message: o.a.string.isRequired,
              handler: o.a.func.isRequired,
              lifespan: o.a.number.isRequired,
            })
          ),
        },
        l = function (e) {
          var t = e.message,
            n = e.actions,
            a = void 0 === n ? [] : n;
          return Object(r.h)(
            "div",
            { className: "crayons-snackbar__item flex" },
            Object(r.h)(
              "div",
              { className: "crayons-snackbar__body", role: "alert" },
              t
            ),
            Object(r.h)(
              "div",
              { className: "crayons-snackbar__actions" },
              a.map(function (e) {
                var t = e.text,
                  n = e.handler;
                return Object(r.h)(
                  c.a,
                  {
                    variant: "ghost-success",
                    inverted: !0,
                    onClick: n,
                    key: t,
                  },
                  t
                );
              })
            )
          );
        };
      (l.displayName = "SnackbarItem"), (l.propTypes = s.isRequired);
    },
    247: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(0),
        a = n(15),
        o = n(1),
        i = n.n(o),
        c = n(27),
        s = n(67),
        l = n.n(s),
        u = n(10),
        d = n(26),
        f = n(2),
        p = n(3),
        h = function (e) {
          var t = e.passedData,
            n = t.published,
            a = void 0 !== n && n,
            o = t.allSeries,
            i = void 0 === o ? [] : o,
            c = t.canonicalUrl,
            s = void 0 === c ? "" : c,
            l = t.series,
            u = void 0 === l ? "" : l,
            d = e.onSaveDraft,
            f = e.onConfigChange,
            h = e.toggleMoreConfig,
            m = e.moreConfigShowing,
            g = "",
            b = "";
          if (i.length > 0) {
            var y = i.map(function (e) {
              return Object(r.h)("option", { value: e }, e);
            });
            b = Object(r.h)(
              "div",
              { className: "crayons-field__description" },
              "Existing series:",
              " ",
              Object(r.h)(
                "select",
                {
                  value: "",
                  name: "series",
                  onInput: f,
                  required: !0,
                  "aria-label": "Select one of the existing series",
                },
                Object(r.h)("option", { value: "", disabled: !0 }, "Select..."),
                y
              )
            );
          }
          return (
            a &&
              (g = Object(r.h)(
                "div",
                {
                  "data-testid": "options__danger-zone",
                  className: "crayons-field mb-6",
                },
                Object(r.h)(
                  "div",
                  { className: "crayons-field__label color-accent-danger" },
                  "Danger Zone"
                ),
                Object(r.h)(
                  p.a,
                  { variant: "danger", onClick: d },
                  "Unpublish post"
                )
              )),
            Object(r.h)(
              p.c,
              {
                className:
                  m &&
                  "inline-block bottom-2 s:bottom-100 left-2 s:left-0 right-2 s:left-auto",
                style: { zIndex: 100 },
              },
              Object(r.h)("h3", { className: "mb-6" }, "Post options"),
              Object(r.h)(
                "div",
                { className: "crayons-field mb-6" },
                Object(r.h)(
                  "label",
                  {
                    htmlFor: "canonicalUrl",
                    className: "crayons-field__label",
                  },
                  "Canonical URL"
                ),
                Object(r.h)(
                  "p",
                  { className: "crayons-field__description" },
                  "Change meta tag",
                  " ",
                  Object(r.h)("code", null, "canonical_url"),
                  " ",
                  "if this post was first published elsewhere (like your own blog)."
                ),
                Object(r.h)("input", {
                  type: "text",
                  value: s,
                  className: "crayons-textfield",
                  placeholder: "https://yoursite.com/post-title",
                  name: "canonicalUrl",
                  onKeyUp: f,
                  id: "canonicalUrl",
                })
              ),
              Object(r.h)(
                "div",
                { className: "crayons-field mb-6" },
                Object(r.h)(
                  "label",
                  { htmlFor: "series", className: "crayons-field__label" },
                  "Series"
                ),
                Object(r.h)(
                  "p",
                  { className: "crayons-field__description" },
                  "Will this post be part of a series? Give the series a unique name. (Series visible once it has multiple posts)"
                ),
                Object(r.h)("input", {
                  type: "text",
                  value: u,
                  className: "crayons-textfield",
                  name: "series",
                  onKeyUp: f,
                  id: "series",
                  placeholder: "...",
                }),
                b
              ),
              g,
              Object(r.h)(
                p.a,
                { className: "w-100", "data-content": "exit", onClick: h },
                "Done"
              )
            )
          );
        };
      function m(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if (
              "undefined" === typeof Symbol ||
              !(Symbol.iterator in Object(e))
            )
              return;
            var n = [],
              r = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var i, c = e[Symbol.iterator]();
                !(r = (i = c.next()).done) &&
                (n.push(i.value), !t || n.length !== t);
                r = !0
              );
            } catch (s) {
              (a = !0), (o = s);
            } finally {
              try {
                r || null == c.return || c.return();
              } finally {
                if (a) throw o;
              }
            }
            return n;
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return g(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return g(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function g(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      (h.propTypes = {
        passedData: i.a.shape({
          published: i.a.bool.isRequired,
          allSeries: i.a.array.isRequired,
          canonicalUrl: i.a.string.isRequired,
          series: i.a.string.isRequired,
        }).isRequired,
        onSaveDraft: i.a.func.isRequired,
        onConfigChange: i.a.func.isRequired,
        toggleMoreConfig: i.a.func.isRequired,
        moreConfigShowing: i.a.bool.isRequired,
      }),
        (h.displayName = "Options");
      var b = function () {
          return Object(r.h)(
            "svg",
            {
              width: "24",
              className: "crayons-icon",
              height: "24",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
              role: "img",
              "aria-labelledby": "75abcb76478519ca4eb9",
            },
            Object(r.h)(
              "title",
              { id: "75abcb76478519ca4eb9" },
              "Post options"
            ),
            Object(r.h)("path", {
              d:
                "M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z",
            })
          );
        },
        y = function (e) {
          var t = e.onSaveDraft,
            n = e.onPublish,
            a = e.onClearChanges,
            o = e.published,
            i = e.edited,
            c = e.version,
            s = e.passedData,
            l = e.onConfigChange,
            u = e.submitting,
            d = m(Object(f.j)(!1), 2),
            g = d[0],
            y = d[1],
            v = "v1" === c,
            O = "v2" === c,
            w = function (e) {
              e.preventDefault(), y(!g);
            };
          return u
            ? Object(r.h)(
                "div",
                { className: "crayons-article-form__footer" },
                Object(r.h)(
                  p.a,
                  {
                    className: "mr-2 whitespace-nowrap",
                    onClick: n,
                    disabled: !0,
                  },
                  o && O
                    ? "Publishing..."
                    : "Saving ".concat(O ? "draft" : "", "...")
                )
              )
            : Object(r.h)(
                "div",
                { className: "crayons-article-form__footer" },
                Object(r.h)(
                  p.a,
                  { className: "mr-2 whitespace-nowrap", onClick: n },
                  o || v ? "Save changes" : "Publish"
                ),
                !(o || v) &&
                  Object(r.h)(
                    p.a,
                    {
                      variant: "secondary",
                      className: "mr-2 whitespace-nowrap",
                      onClick: t,
                    },
                    "Save ",
                    Object(r.h)(
                      "span",
                      { className: "hidden s:inline" },
                      "draft"
                    )
                  ),
                O &&
                  Object(r.h)(
                    "div",
                    { className: "s:relative" },
                    Object(r.h)(p.a, {
                      variant: "ghost",
                      contentType: "icon",
                      icon: b,
                      title: "Post options",
                      onClick: w,
                    }),
                    g &&
                      Object(r.h)(h, {
                        passedData: s,
                        onConfigChange: l,
                        onSaveDraft: t,
                        moreConfigShowing: g,
                        toggleMoreConfig: w,
                      })
                  ),
                i &&
                  Object(r.h)(
                    p.a,
                    {
                      variant: "ghost",
                      onClick: a,
                      className: "whitespace-nowrap fw-normal",
                      size: "s",
                    },
                    "Revert ",
                    Object(r.h)(
                      "span",
                      { className: "hidden s:inline" },
                      "new changes"
                    )
                  )
              );
        };
      (y.propTypes = {
        onSaveDraft: i.a.func.isRequired,
        onPublish: i.a.func.isRequired,
        published: i.a.bool.isRequired,
        edited: i.a.bool.isRequired,
        version: i.a.string.isRequired,
        onClearChanges: i.a.func.isRequired,
        passedData: i.a.string.isRequired,
        onConfigChange: i.a.func.isRequired,
        submitting: i.a.bool.isRequired,
      }),
        (y.displayName = "EditorActions");
      var v = n(36),
        O = n.n(v),
        w = n(30);
      var j = function () {
        return Object(r.h)(
          "svg",
          {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            className: "crayons-icon",
            xmlns: "http://www.w3.org/2000/svg",
            role: "img",
            "aria-labelledby": "fc5f15add1e114844f5e",
          },
          Object(r.h)(
            "title",
            { id: "fc5f15add1e114844f5e" },
            "Copy Markdown for image"
          ),
          Object(r.h)("path", {
            d:
              "M7 6V3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1 1 0 013 21l.003-14c0-.552.45-1 1.007-1H7zm2 0h8v10h2V4H9v2zm-2 5v2h6v-2H7zm0 4v2h6v-2H7z",
          })
        );
      };
      j.displayName = "CopyIcon";
      var S = function (e) {
        var t,
          n = e.onCopy,
          a = e.imageUrls,
          o = e.showCopyMessage,
          i = void 0 !== o && o;
        return Object(r.h)(
          "clipboard-copy",
          {
            onClick: n,
            for: "image-markdown-copy-link-input",
            "aria-live": "polite",
            className: "flex items-center flex-1",
            "aria-controls": "image-markdown-copy-link-announcer",
          },
          Object(r.h)("input", {
            "data-testid": "markdown-copy-link",
            type: "text",
            className: "crayons-textfield mr-2",
            id: "image-markdown-copy-link-input",
            readOnly: "true",
            value:
              ((t = a),
              t
                .map(function (e) {
                  return "![Alt Text](".concat(e, ")");
                })
                .join("\n")),
          }),
          Object(r.h)(
            p.a,
            {
              className:
                "spec__image-markdown-copy whitespace-nowrap fw-normal",
              variant: "ghost",
              contentType: "icon-left",
              icon: j,
            },
            i ? "Copied!" : "Copy..."
          )
        );
      };
      function _() {
        return (_ =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      function k(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if (
              "undefined" === typeof Symbol ||
              !(Symbol.iterator in Object(e))
            )
              return;
            var n = [],
              r = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var i, c = e[Symbol.iterator]();
                !(r = (i = c.next()).done) &&
                (n.push(i.value), !t || n.length !== t);
                r = !0
              );
            } catch (s) {
              (a = !0), (o = s);
            } finally {
              try {
                r || null == c.return || c.return();
              } finally {
                if (a) throw o;
              }
            }
            return n;
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return R(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return R(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function R(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function C(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function I(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? C(Object(n), !0).forEach(function (t) {
                N(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : C(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function N(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      (S.displayName = "ClipboardButton"),
        (S.propTypes = {
          onCopy: i.a.func.isRequired,
          imageUrls: i.a.arrayOf(i.a.string).isRequired,
          showCopyMessage: i.a.bool.isRequired,
        });
      var T = function () {
        return Object(r.h)(
          "svg",
          {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            className: "crayons-icon",
            xmlns: "http://www.w3.org/2000/svg",
            role: "img",
            "aria-labelledby": "a17qec5pfhrwzk9w4kg0tp62v27qqu9t",
          },
          Object(r.h)(
            "title",
            { id: "a17qec5pfhrwzk9w4kg0tp62v27qqu9t" },
            "Upload image"
          ),
          Object(r.h)("path", {
            d:
              "M20 5H4v14l9.292-9.294a1 1 0 011.414 0L20 15.01V5zM2 3.993A1 1 0 012.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 01-.992.993H2.992A.993.993 0 012 20.007V3.993zM8 11a2 2 0 110-4 2 2 0 010 4z",
          })
        );
      };
      function P(e, t) {
        var n = t.type,
          r = t.payload;
        switch (n) {
          case "uploading_image":
            return I(
              I({}, e),
              {},
              {
                uploadError: !1,
                uploadingErrorMessage: null,
                uploadingImage: !0,
                insertionImageUrls: [],
                showImageCopiedMessage: !1,
              }
            );
          case "upload_error":
            return I(
              I({}, e),
              {},
              {
                insertionImageUrls: [],
                uploadError: !0,
                uploadErrorMessage: r.errorMessage,
                uploadingImage: !1,
              }
            );
          case "show_copied_image_message":
            return I(I({}, e), {}, { showImageCopiedMessage: !0 });
          case "upload_image_success":
            return I(
              I({}, e),
              {},
              { insertionImageUrls: r.insertionImageUrls, uploadingImage: !1 }
            );
          default:
            return e;
        }
      }
      T.displayName = "ImageIcon";
      var x = function () {
        var e = k(
            Object(f.h)(P, {
              insertionImageUrls: [],
              uploadError: !1,
              uploadErrorMessage: null,
              showImageCopiedMessage: !1,
              uploadingImage: !1,
            }),
            2
          ),
          t = e[0],
          n = e[1],
          a = t.uploadingImage,
          o = t.showImageCopiedMessage,
          i = t.uploadErrorMessage,
          c = t.uploadError,
          s = t.insertionImageUrls,
          l = null;
        function u(e) {
          n({ type: "upload_error", payload: { errorMessage: e.message } });
        }
        function h(e) {
          n({
            type: "upload_image_success",
            payload: { insertionImageUrls: e.links },
          });
        }
        var m = Runtime.isNativeIOS("imageUpload"),
          g = m
            ? {
                onClick: function (e) {
                  e.preventDefault(),
                    window.webkit.messageHandlers.imageUpload.postMessage({
                      id: "native-image-upload-message",
                    });
                },
                "aria-label": "Upload an image",
              }
            : { tabIndex: -1 };
        return Object(r.h)(
          "div",
          { className: "flex items-center" },
          a
            ? Object(r.h)(
                "span",
                { class: "lh-base pl-3 border-0 py-2 inline-block" },
                Object(r.h)(p.g, null),
                " Uploading..."
              )
            : Object(r.h)(
                p.a,
                _(
                  {
                    className: "mr-2 fw-normal",
                    variant: "ghost",
                    contentType: "icon-left",
                    icon: T,
                  },
                  g
                ),
                "Upload image",
                !m &&
                  Object(r.h)("input", {
                    type: "file",
                    id: "image-upload-field",
                    onChange: function (e) {
                      var t = e.target.files;
                      if (t.length > 0 && Object(w.validateFileInputs)()) {
                        var r = { image: t };
                        n({ type: "uploading_image" }), Object(d.a)(r, h, u);
                      }
                    },
                    className:
                      "w-100 h-100 absolute left-0 right-0 top-0 bottom-0 overflow-hidden opacity-0 cursor-pointer",
                    multiple: !0,
                    accept: "image/*",
                    "data-max-file-size-mb": "25",
                    "aria-label": "Upload an image",
                  })
              ),
          m &&
            Object(r.h)("input", {
              type: "hidden",
              id: "native-image-upload-message",
              value: "",
              onChange: function (e) {
                var t = JSON.parse(e.target.value);
                switch (t.action) {
                  case "uploading":
                    n({ type: "uploading_image" });
                    break;
                  case "error":
                    n({
                      type: "upload_error",
                      payload: { errorMessage: t.error },
                    });
                    break;
                  case "success":
                    n({
                      type: "upload_image_success",
                      payload: { insertionImageUrls: [t.link] },
                    });
                }
              },
            }),
          s.length > 0 &&
            Object(r.h)(S, {
              onCopy: function () {
                (l = document.getElementById("image-markdown-copy-link-input")),
                  Runtime.copyToClipboard(l.value).then(function () {
                    n({ type: "show_copied_image_message" });
                  });
              },
              imageUrls: s,
              showCopyMessage: o,
            }),
          c && Object(r.h)("span", { className: "color-accent-danger" }, i)
        );
      };
      x.displayName = "ImageUploader";
      var E = function (e) {
        var t = e.version;
        return Object(r.h)(
          "div",
          {
            className: "crayons-article-form__toolbar ".concat(
              "v1" === t && "border-t-0"
            ),
          },
          Object(r.h)(x, null)
        );
      };
      (E.propTypes = { version: i.a.string.isRequired }),
        (E.displayName = "Toolbar");
      var q = n(8);
      function M(e, t) {
        return function (n) {
          if (
            n.clipboardData &&
            n.clipboardData.items &&
            (function () {
              var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "Files";
              return (arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : []
              ).some(function (t) {
                return t === e;
              });
            })(n.clipboardData.types)
          ) {
            n.preventDefault();
            var r = n.clipboardData.files;
            r.length > 1
              ? Object(q.b)({
                  message: "Only one image can be pasted at a time.",
                  addCloseButton: !0,
                })
              : Object(d.c)(r, e, t);
          }
        };
      }
      function D(e) {
        e.preventDefault(),
          e.currentTarget
            .closest(".drop-area")
            .classList.add("drop-area--active");
      }
      function A(e) {
        e.preventDefault(),
          e.currentTarget
            .closest(".drop-area")
            .classList.remove("drop-area--active");
      }
      function L(e) {
        var t = e.message;
        Object(q.b)({ message: t, addCloseButton: !0 });
      }
      function U(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if (
              "undefined" === typeof Symbol ||
              !(Symbol.iterator in Object(e))
            )
              return;
            var n = [],
              r = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var i, c = e[Symbol.iterator]();
                !(r = (i = c.next()).done) &&
                (n.push(i.value), !t || n.length !== t);
                r = !0
              );
            } catch (s) {
              (a = !0), (o = s);
            } finally {
              try {
                r || null == c.return || c.return();
              } finally {
                if (a) throw o;
              }
            }
            return n;
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return H(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return H(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function H(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var z = n(37);
      function F(e) {
        return function (t) {
          var n = e.current.base,
            r = t.links,
            a = t.image,
            o = a[0] ? a[0].name.replace(/\.[^.]+$/, "") : "alt text",
            i = "![".concat(o, "](").concat(r[0], ")\n"),
            c = n.selectionStart,
            s = n.selectionEnd,
            l = n.value,
            u = l.substring(0, c),
            d = l.substring(s, l.length);
          (n.value = "".concat(u + i, " ").concat(d)),
            (n.selectionStart = c + i.length),
            (n.selectionEnd = n.selectionStart),
            n.dispatchEvent(new Event("input"));
        };
      }
      var B = function (e) {
        var t,
          n,
          a = e.onChange,
          o = e.defaultValue,
          i = e.switchHelpContext,
          c = e.version,
          s = Object(f.i)(null),
          l = Object(z.b)({
            onDrop:
              ((t = F(s)),
              (n = L),
              function (e) {
                if (
                  (e.preventDefault(),
                  (function () {
                    var e =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : "Files";
                    return (arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : []
                    ).some(function (t) {
                      return t === e;
                    });
                  })(e.dataTransfer.types))
                ) {
                  e.currentTarget
                    .closest(".drop-area")
                    .classList.remove("drop-area--active");
                  var r = e.dataTransfer.files;
                  r.length > 1
                    ? Object(q.b)({
                        message: "Only one image can be dropped at a time.",
                        addCloseButton: !0,
                      })
                    : Object(d.c)(r, t, n);
                }
              }),
            onDragOver: D,
            onDragExit: A,
          }).setElement,
          u = (function (e) {
            var t = e.onPaste,
              n = U(Object(f.j)(null), 2),
              r = n[0],
              a = n[1];
            return (
              Object(f.d)(
                function () {
                  if (r)
                    return (
                      r.addEventListener("paste", t),
                      function () {
                        r.removeEventListener("paste", t);
                      }
                    );
                },
                [r, t]
              ),
              a
            );
          })({ onPaste: M(F(s), L) });
        return (
          Object(f.d)(function () {
            s.current && (l(s.current.base), u(s.current.base));
          }),
          Object(r.h)(
            "div",
            {
              "data-testid": "article-form__body",
              className: "crayons-article-form__body drop-area text-padding",
            },
            Object(r.h)(E, { version: c }),
            Object(r.h)(O.a, {
              className:
                "crayons-textfield crayons-textfield--ghost crayons-article-form__body__field",
              id: "article_body_markdown",
              "aria-label": "Post Content",
              placeholder: "Write your post content here...",
              value: o,
              onInput: a,
              onFocus: function (e) {
                i(e);
              },
              name: "body_markdown",
              ref: s,
            })
          )
        );
      };
      (B.propTypes = {
        onChange: i.a.func.isRequired,
        defaultValue: i.a.string.isRequired,
        switchHelpContext: i.a.func.isRequired,
        version: i.a.string.isRequired,
      }),
        (B.displayName = "EditorBody");
      var V = n(20);
      function J(e) {
        return (J =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function K() {
        return (K =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      function $(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function G(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function W(e, t) {
        return (W =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function X(e) {
        var t = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Q(e);
          if (t) {
            var a = Q(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return Y(this, n);
        };
      }
      function Y(e, t) {
        return !t || ("object" !== J(t) && "function" !== typeof t) ? Z(e) : t;
      }
      function Z(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function Q(e) {
        return (Q = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function ee(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var te = (function (e) {
        !(function (e, t) {
          if ("function" !== typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && W(e, t);
        })(i, e);
        var t,
          n,
          a,
          o = X(i);
        function i() {
          var e;
          $(this, i);
          for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
            n[r] = arguments[r];
          return (
            ee(Z((e = o.call.apply(o, [this].concat(n)))), "state", {
              uploadError: !1,
              uploadErrorMessage: null,
              uploadingImage: !1,
            }),
            ee(Z(e), "onImageUploadSuccess", function () {
              var t;
              (t = e.props).onMainImageUrlChange.apply(t, arguments),
                e.setState({ uploadingImage: !1 });
            }),
            ee(Z(e), "handleMainImageUpload", function (t) {
              if (
                (t.preventDefault(),
                e.setState({ uploadingImage: !0 }),
                e.clearUploadError(),
                Object(w.validateFileInputs)())
              ) {
                var n = { image: (t.dataTransfer || t.target).files };
                Object(d.a)(n, e.onImageUploadSuccess, e.onUploadError);
              }
            }),
            ee(Z(e), "clearUploadError", function () {
              e.setState({ uploadError: !1, uploadErrorMessage: null });
            }),
            ee(Z(e), "onUploadError", function (t) {
              e.setState({
                uploadingImage: !1,
                uploadError: !0,
                uploadErrorMessage: t.message,
              });
            }),
            ee(Z(e), "useNativeUpload", function () {
              return Runtime.isNativeIOS("imageUpload");
            }),
            ee(Z(e), "initNativeImagePicker", function (e) {
              e.preventDefault(),
                window.webkit.messageHandlers.imageUpload.postMessage({
                  id: "native-cover-image-upload-message",
                  ratio: "".concat(100 / 42),
                });
            }),
            ee(Z(e), "handleNativeMessage", function (t) {
              var n = JSON.parse(t.target.value);
              switch (n.action) {
                case "uploading":
                  e.setState({ uploadingImage: !0 }), e.clearUploadError();
                  break;
                case "error":
                  e.setState({
                    uploadingImage: !1,
                    uploadError: !0,
                    uploadErrorMessage: n.error,
                  });
                  break;
                case "success":
                  e.props.onMainImageUrlChange({ links: [n.link] }),
                    e.setState({ uploadingImage: !1 });
              }
            }),
            ee(Z(e), "triggerMainImageRemoval", function (t) {
              t.preventDefault(),
                (0, e.props.onMainImageUrlChange)({ links: [] });
            }),
            ee(Z(e), "onDropImage", function (t) {
              A(t),
                t.dataTransfer.files.length > 1
                  ? Object(q.b)({
                      message: "Only one image can be dropped at a time.",
                      addCloseButton: !0,
                    })
                  : e.handleMainImageUpload(t);
            }),
            e
          );
        }
        return (
          (t = i),
          (n = [
            {
              key: "render",
              value: function () {
                var e = this.props.mainImage,
                  t = this.state,
                  n = t.uploadError,
                  a = t.uploadErrorMessage,
                  o = t.uploadingImage,
                  i = e ? "Change" : "Add a cover image",
                  c = this.useNativeUpload()
                    ? {
                        onClick: this.initNativeImagePicker,
                        "aria-label": "Upload cover image",
                      }
                    : {};
                return Object(r.h)(
                  z.a,
                  { onDragOver: D, onDragExit: A, onDrop: this.onDropImage },
                  Object(r.h)(
                    "div",
                    {
                      className: "crayons-article-form__cover",
                      role: "presentation",
                    },
                    !o &&
                      e &&
                      Object(r.h)("img", {
                        src: e,
                        className: "crayons-article-form__cover__image",
                        width: "250",
                        height: "105",
                        alt: "Post cover",
                      }),
                    Object(r.h)(
                      "div",
                      { className: "flex items-center" },
                      o
                        ? Object(r.h)(
                            "span",
                            {
                              class: "lh-base pl-1 border-0 py-2 inline-block",
                            },
                            Object(r.h)(V.a, null),
                            " Uploading..."
                          )
                        : Object(r.h)(
                            r.Fragment,
                            null,
                            Object(r.h)(
                              p.a,
                              K(
                                {
                                  variant: "outlined",
                                  className: "mr-2 whitespace-nowrap",
                                },
                                c
                              ),
                              Object(r.h)(
                                "label",
                                { htmlFor: "cover-image-input" },
                                i
                              ),
                              !this.useNativeUpload() &&
                                Object(r.h)("input", {
                                  id: "cover-image-input",
                                  type: "file",
                                  onChange: this.handleMainImageUpload,
                                  accept: "image/*",
                                  className:
                                    "w-100 h-100 absolute left-0 right-0 top-0 bottom-0 overflow-hidden opacity-0 cursor-pointer",
                                  "data-max-file-size-mb": "25",
                                })
                            ),
                            e &&
                              Object(r.h)(
                                p.a,
                                {
                                  variant: "ghost-danger",
                                  onClick: this.triggerMainImageRemoval,
                                },
                                "Remove"
                              )
                          ),
                      this.useNativeUpload() &&
                        Object(r.h)("input", {
                          type: "hidden",
                          id: "native-cover-image-upload-message",
                          value: "",
                          onChange: this.handleNativeMessage,
                        })
                    ),
                    n &&
                      Object(r.h)(
                        "p",
                        { className: "articleform__uploaderror" },
                        a
                      )
                  )
                );
              },
            },
          ]) && G(t.prototype, n),
          a && G(t, a),
          i
        );
      })(r.Component);
      (te.propTypes = {
        mainImage: i.a.string.isRequired,
        onMainImageUrlChange: i.a.func.isRequired,
      }),
        (te.displayName = "ArticleCoverImage");
      var ne = n(46),
        re = function (e) {
          var t = e.onChange,
            n = e.defaultValue,
            a = e.switchHelpContext;
          return Object(r.h)(
            "div",
            {
              "data-testid": "article-form__title",
              className: "crayons-article-form__title",
            },
            Object(r.h)(O.a, {
              className:
                "crayons-textfield crayons-textfield--ghost fs-3xl m:fs-4xl l:fs-5xl fw-bold s:fw-heavy lh-tight",
              type: "text",
              id: "article-form-title",
              "aria-label": "Post Title",
              placeholder: "New post title here...",
              autoComplete: "off",
              value: n,
              onFocus: a,
              onInput: t,
              autofocus: "true",
              onKeyDown: function (e) {
                13 === e.keyCode && e.preventDefault();
              },
            })
          );
        };
      (re.propTypes = {
        onChange: i.a.func.isRequired,
        defaultValue: i.a.string.isRequired,
        switchHelpContext: i.a.func.isRequired,
      }),
        (re.displayName = "Title");
      var ae = function (e) {
        var t = e.titleDefaultValue,
          n = e.titleOnChange,
          a = e.tagsDefaultValue,
          o = e.tagsOnInput,
          i = e.mainImage,
          c = e.onMainImageUrlChange,
          s = e.switchHelpContext;
        return Object(r.h)(
          "div",
          { className: "crayons-article-form__top text-padding drop-area" },
          Object(r.h)(te, { mainImage: i, onMainImageUrlChange: c }),
          Object(r.h)(re, {
            defaultValue: t,
            onChange: n,
            switchHelpContext: s,
          }),
          Object(r.h)(ne.b, {
            defaultValue: a,
            onInput: o,
            switchHelpContext: s,
          })
        );
      };
      (ae.propTypes = {
        titleDefaultValue: i.a.string.isRequired,
        titleOnChange: i.a.func.isRequired,
        tagsDefaultValue: i.a.string.isRequired,
        tagsOnInput: i.a.func.isRequired,
        mainImage: i.a.string.isRequired,
        onMainImageUrlChange: i.a.func.isRequired,
        switchHelpContext: i.a.func.isRequired,
      }),
        (ae.displayName = "Meta");
      var oe = function (e) {
        var t = e.errors;
        return Object(r.h)(
          "div",
          {
            "data-testid": "error-message",
            className: "crayons-notice crayons-notice--danger mb-6",
          },
          Object(r.h)(
            "h3",
            { className: "fs-l mb-2 fw-bold" },
            "Whoops, something went wrong:"
          ),
          Object(r.h)(
            "ul",
            { className: "list-disc pl-6" },
            Object.keys(t).map(function (e) {
              return Object(r.h)("li", null, e, ": ", t[e]);
            })
          )
        );
      };
      (oe.propTypes = { errors: i.a.objectOf(i.a.string).isRequired }),
        (oe.displayName = "ErrorList");
      var ie = function (e) {
        var t = e.titleDefaultValue,
          n = e.titleOnChange,
          a = e.tagsDefaultValue,
          o = e.tagsOnInput,
          i = e.bodyDefaultValue,
          c = e.bodyOnChange,
          s = e.bodyHasFocus,
          l = e.version,
          u = e.mainImage,
          d = e.onMainImageUrlChange,
          f = e.switchHelpContext,
          p = e.errors;
        return Object(r.h)(
          "div",
          { className: "crayons-article-form__content crayons-card" },
          p && Object(r.h)(oe, { errors: p }),
          "v2" === l &&
            Object(r.h)(ae, {
              titleDefaultValue: t,
              titleOnChange: n,
              tagsDefaultValue: a,
              tagsOnInput: o,
              mainImage: u,
              onMainImageUrlChange: d,
              switchHelpContext: f,
            }),
          Object(r.h)(B, {
            defaultValue: i,
            onChange: c,
            hasFocus: s,
            switchHelpContext: f,
            version: l,
          })
        );
      };
      (ie.propTypes = {
        titleDefaultValue: i.a.string.isRequired,
        titleOnChange: i.a.func.isRequired,
        tagsDefaultValue: i.a.string.isRequired,
        tagsOnInput: i.a.func.isRequired,
        bodyDefaultValue: i.a.string.isRequired,
        bodyOnChange: i.a.func.isRequired,
        bodyHasFocus: i.a.bool.isRequired,
        version: i.a.string.isRequired,
        mainImage: i.a.string.isRequired,
        onMainImageUrlChange: i.a.func.isRequired,
        switchHelpContext: i.a.func.isRequired,
        errors: i.a.func.isRequired,
      }),
        (ie.displayName = "Form");
      var ce = function (e) {
        var t = e.displayModal,
          n = void 0 === t ? function () {} : t;
        return Object(r.h)(
          "div",
          { className: "crayons-article-form__close" },
          Object(r.h)(p.a, {
            variant: "ghost",
            contentType: "icon",
            icon: function () {
              return Object(r.h)(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  className: "crayons-icon",
                  xmlns: "http://www.w3.org/2000/svg",
                  role: "img",
                  "aria-labelledby": "as1mn15llu5e032u2pgzlc6yhvss2myk",
                },
                Object(r.h)(
                  "title",
                  { id: "as1mn15llu5e032u2pgzlc6yhvss2myk" },
                  "Close the editor"
                ),
                Object(r.h)("path", {
                  d:
                    "M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z",
                })
              );
            },
            onClick: function () {
              return n();
            },
          })
        );
      };
      ce.displayName = "Close";
      var se = function (e) {
        var t = e.onPreview,
          n = e.previewShowing;
        return Object(r.h)(
          "div",
          { className: "crayons-article-form__tabs crayons-tabs ml-auto" },
          Object(r.h)(
            "button",
            {
              className: "crayons-tabs__item ".concat(
                !n && "crayons-tabs__item--current"
              ),
              onClick: n && t,
              type: "button",
            },
            "Edit"
          ),
          Object(r.h)(
            "button",
            {
              className: "crayons-tabs__item ".concat(
                n && "crayons-tabs__item--current"
              ),
              onClick: !n && t,
              type: "button",
            },
            "Preview"
          )
        );
      };
      (se.propTypes = {
        previewShowing: i.a.bool.isRequired,
        onPreview: i.a.func.isRequired,
      }),
        (se.displayName = "Tabs");
      var le = n(47),
        ue = function (e) {
          var t = e.organizations,
            n = e.organizationId,
            a = e.onToggle;
          return Object(r.h)(
            "div",
            { className: "crayons-field__label flex items-center flex-1" },
            Object(r.h)(
              "span",
              { className: "hidden s:inline-block mr-2 whitespace-nowrap" },
              "Write a new post"
            ),
            t &&
              t.length > 0 &&
              Object(r.h)(
                "div",
                null,
                Object(r.h)(le.a, {
                  name: "article[organization_id]",
                  id: "article_publish_under_org",
                  className: "crayons-select mt-0",
                  organizations: t,
                  organizationId: n,
                  onToggle: a,
                  emptyLabel: "Personal",
                })
              )
          );
        };
      (ue.propTypes = {
        organizations: i.a.string.isRequired,
        organizationId: i.a.string.isRequired,
        onToggle: i.a.string.isRequired,
      }),
        (ue.displayName = "Organization");
      var de = function (e) {
        var t = e.onPreview,
          n = e.previewShowing,
          a = e.organizations,
          o = e.organizationId,
          i = e.onToggle,
          c = e.siteLogo,
          s = e.displayModal;
        return Object(r.h)(
          "div",
          { className: "crayons-article-form__header" },
          Object(r.h)("span", {
            className: "crayons-article-form__logo",
            dangerouslySetInnerHTML: { __html: c },
          }),
          Object(r.h)(ue, { organizations: a, organizationId: o, onToggle: i }),
          Object(r.h)(se, { onPreview: t, previewShowing: n }),
          Object(r.h)(ce, { displayModal: s })
        );
      };
      function fe(e) {
        return (fe =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function pe(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function he(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function me(e, t) {
        return (me =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function ge(e) {
        var t = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = ve(e);
          if (t) {
            var a = ve(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return be(this, n);
        };
      }
      function be(e, t) {
        return !t || ("object" !== fe(t) && "function" !== typeof t)
          ? ye(e)
          : t;
      }
      function ye(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function ve(e) {
        return (ve = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function Oe(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      (de.propTypes = {
        displayModal: i.a.func.isRequired,
        onPreview: i.a.func.isRequired,
        previewShowing: i.a.bool.isRequired,
        organizations: i.a.string.isRequired,
        organizationId: i.a.string.isRequired,
        onToggle: i.a.string.isRequired,
        siteLogo: i.a.string.isRequired,
      }),
        (de.displayName = "Header");
      var we = (function (e) {
        !(function (e, t) {
          if ("function" !== typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && me(e, t);
        })(i, e);
        var t,
          n,
          a,
          o = ge(i);
        function i(e) {
          var t;
          return (
            (function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, i),
            Oe(ye((t = o.call(this, e))), "setCommonProps", function (e) {
              var t = e.liquidShowing,
                n = void 0 !== t && t,
                r = e.markdownShowing,
                a = void 0 !== r && r,
                o = e.frontmatterShowing;
              return {
                liquidShowing: n,
                markdownShowing: a,
                frontmatterShowing: void 0 !== o && o,
              };
            }),
            Oe(ye(t), "toggleModal", function (e) {
              return function () {
                t.setState(function (n) {
                  return (function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = null != arguments[t] ? arguments[t] : {};
                      t % 2
                        ? pe(Object(n), !0).forEach(function (t) {
                            Oe(e, t, n[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                            e,
                            Object.getOwnPropertyDescriptors(n)
                          )
                        : pe(Object(n)).forEach(function (t) {
                            Object.defineProperty(
                              e,
                              t,
                              Object.getOwnPropertyDescriptor(n, t)
                            );
                          });
                    }
                    return e;
                  })({}, t.setCommonProps(Oe({}, e, !n[e])));
                });
              };
            }),
            Oe(ye(t), "renderArticleFormTitleHelp", function () {
              return Object(r.h)(
                "div",
                {
                  "data-testid": "title-help",
                  className:
                    "crayons-article-form__help crayons-article-form__help--title",
                },
                Object(r.h)(
                  "h4",
                  { className: "mb-2 fs-l" },
                  "Writing a Great Post Title"
                ),
                Object(r.h)(
                  "ul",
                  { className: "list-disc pl-6 color-base-70" },
                  Object(r.h)(
                    "li",
                    null,
                    "Think of your post title as a super short (but compelling!) description \u2014 like an overview of the actual post in one short sentence."
                  ),
                  Object(r.h)(
                    "li",
                    null,
                    "Use keywords where appropriate to help ensure people can find your post by search."
                  )
                )
              );
            }),
            Oe(ye(t), "renderTagInputHelp", function () {
              return Object(r.h)(
                "div",
                {
                  "data-testid": "basic-tag-input-help",
                  className:
                    "crayons-article-form__help crayons-article-form__help--tags",
                },
                Object(r.h)(
                  "h4",
                  { className: "mb-2 fs-l" },
                  "Tagging Guidelines"
                ),
                Object(r.h)(
                  "ul",
                  { className: "list-disc pl-6 color-base-70" },
                  Object(r.h)("li", null, "Tags help people find your post."),
                  Object(r.h)(
                    "li",
                    null,
                    "Think of tags as the topics or categories that best describe your post."
                  ),
                  Object(r.h)(
                    "li",
                    null,
                    "Add up to four comma-separated tags per post. Combine tags to reach the appropriate subcommunities."
                  ),
                  Object(r.h)(
                    "li",
                    null,
                    "Use existing tags whenever possible."
                  ),
                  Object(r.h)(
                    "li",
                    null,
                    "Some tags, such as \u201chelp\u201d or \u201chealthydebate\u201d, have special posting guidelines."
                  )
                )
              );
            }),
            Oe(ye(t), "renderBasicEditorHelp", function () {
              return Object(r.h)(
                "div",
                {
                  "data-testid": "basic-editor-help",
                  className: "crayons-card crayons-card--secondary p-4 mb-6",
                },
                "You are currently using the basic markdown editor that uses",
                " ",
                Object(r.h)(
                  "a",
                  {
                    href: "#frontmatter",
                    onClick: t.toggleModal("frontmatterShowing"),
                  },
                  "Jekyll front matter"
                ),
                ". You can also use the ",
                Object(r.h)("em", null, "rich+markdown"),
                " editor you can find in",
                " ",
                Object(r.h)(
                  "a",
                  { href: "/settings/customization" },
                  "UX settings",
                  Object(r.h)(
                    "svg",
                    {
                      width: "24",
                      height: "24",
                      viewBox: "0 0 24 24",
                      className: "crayons-icon",
                      xmlns: "http://www.w3.org/2000/svg",
                      role: "img",
                      "aria-labelledby": "c038a36b2512ed25db907e179ab45cfc",
                    },
                    Object(r.h)(
                      "title",
                      { id: "c038a36b2512ed25db907e179ab45cfc" },
                      "Open UX settings"
                    ),
                    Object(r.h)("path", {
                      d:
                        "M10.667 8v1.333H7.333v7.334h7.334v-3.334H16v4a.666.666 0 01-.667.667H6.667A.666.666 0 016 17.333V8.667A.667.667 0 016.667 8h4zM18 6v5.333h-1.333V8.275l-5.196 5.196-.942-.942 5.194-5.196h-3.056V6H18z",
                    })
                  )
                ),
                "."
              );
            }),
            Oe(ye(t), "renderFormatHelp", function () {
              return Object(r.h)(
                "div",
                {
                  "data-testid": "format-help",
                  className:
                    "crayons-article-form__help crayons-article-form__help--body",
                },
                Object(r.h)("h4", { className: "mb-2 fs-l" }, "Editor Basics"),
                Object(r.h)(
                  "ul",
                  { className: "list-disc pl-6 color-base-70" },
                  Object(r.h)(
                    "li",
                    null,
                    "Use",
                    " ",
                    Object(r.h)(
                      "a",
                      {
                        href: "#markdown",
                        onClick: t.toggleModal("markdownShowing"),
                      },
                      "Markdown"
                    ),
                    " ",
                    "to write and format posts.",
                    Object(r.h)(
                      "details",
                      { className: "fs-s my-1" },
                      Object(r.h)(
                        "summary",
                        { class: "cursor-pointer" },
                        "Commonly used syntax"
                      ),
                      Object(r.h)(
                        "table",
                        {
                          className:
                            "crayons-card crayons-card--secondary crayons-table crayons-table--compact w-100 mt-2 mb-4 lh-tight",
                        },
                        Object(r.h)(
                          "tbody",
                          null,
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "# Header",
                              Object(r.h)("br", null),
                              "...",
                              Object(r.h)("br", null),
                              "###### Header"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              "H1 Header",
                              Object(r.h)("br", null),
                              "...",
                              Object(r.h)("br", null),
                              "H6 Header"
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "*italics* or _italics_"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)("em", null, "italics")
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "**bold**"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)("strong", null, "bold")
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "[Link](https://...)"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)(
                                "a",
                                { href: "https://forem.com" },
                                "Link"
                              )
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "* item 1",
                              Object(r.h)("br", null),
                              "* item 2"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)(
                                "ul",
                                { class: "list-disc ml-5" },
                                Object(r.h)("li", null, "item 1"),
                                Object(r.h)("li", null, "item 2")
                              )
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "1. item 1",
                              Object(r.h)("br", null),
                              "2. item 2"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)(
                                "ul",
                                { class: "list-decimal ml-5" },
                                Object(r.h)("li", null, "item 1"),
                                Object(r.h)("li", null, "item 2")
                              )
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "> quoted text"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)(
                                "span",
                                {
                                  className:
                                    "pl-2 border-0 border-solid border-l-4 border-base-50",
                                },
                                "quoted text"
                              )
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              "`inline code`"
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)("code", null, "inline code")
                            )
                          ),
                          Object(r.h)(
                            "tr",
                            null,
                            Object(r.h)(
                              "td",
                              { className: "ff-monospace" },
                              Object(r.h)("span", { class: "fs-xs" }, "```"),
                              Object(r.h)("br", null),
                              "code block",
                              Object(r.h)("br", null),
                              Object(r.h)("span", { class: "fs-xs" }, "```")
                            ),
                            Object(r.h)(
                              "td",
                              null,
                              Object(r.h)(
                                "div",
                                { class: "highlight p-2 overflow-hidden" },
                                Object(r.h)("code", null, "code block")
                              )
                            )
                          )
                        )
                      )
                    )
                  ),
                  Object(r.h)(
                    "li",
                    null,
                    "You can use",
                    " ",
                    Object(r.h)(
                      "a",
                      {
                        href: "#liquid",
                        onClick: t.toggleModal("liquidShowing"),
                      },
                      "Liquid tags"
                    ),
                    " ",
                    "to add rich content such as Tweets, YouTube videos, etc."
                  ),
                  Object(r.h)(
                    "li",
                    null,
                    "In addition to images for the post's content, you can also drag and drop a cover image"
                  )
                )
              );
            }),
            Oe(ye(t), "renderModal", function (e, t, n) {
              return Object(r.h)(
                p.e,
                { onClose: e, title: t },
                Object(r.h)("div", { dangerouslySetInnerHTML: { __html: n } })
              );
            }),
            (t.state = {
              liquidHelpHTML:
                document.getElementById("editor-liquid-help") &&
                document.getElementById("editor-liquid-help").innerHTML,
              markdownHelpHTML:
                document.getElementById("editor-markdown-help") &&
                document.getElementById("editor-markdown-help").innerHTML,
              frontmatterHelpHTML:
                document.getElementById("editor-frontmatter-help") &&
                document.getElementById("editor-frontmatter-help").innerHTML,
            }),
            t
          );
        }
        return (
          (t = i),
          (n = [
            {
              key: "render",
              value: function () {
                var e = this.props,
                  t = e.previewShowing,
                  n = e.helpFor,
                  a = e.helpPosition,
                  o = e.version,
                  i = this.state,
                  c = i.liquidHelpHTML,
                  s = i.markdownHelpHTML,
                  l = i.frontmatterHelpHTML,
                  u = i.liquidShowing,
                  d = i.markdownShowing,
                  f = i.frontmatterShowing;
                return Object(r.h)(
                  "div",
                  { className: "crayons-article-form__aside" },
                  !t &&
                    Object(r.h)(
                      "div",
                      {
                        "data-testid": "article-form__help-section",
                        className: "sticky",
                        style: { top: "v1" === o ? "56px" : a },
                      },
                      "article-form-title" === n &&
                        this.renderArticleFormTitleHelp(),
                      "tag-input" === n && this.renderTagInputHelp(),
                      "v1" === o && this.renderBasicEditorHelp(),
                      ("article_body_markdown" === n || "v1" === o) &&
                        this.renderFormatHelp()
                    ),
                  u &&
                    this.renderModal(
                      this.toggleModal("liquidShowing"),
                      "\ud83c\udf0a Liquid Tags",
                      c
                    ),
                  d &&
                    this.renderModal(
                      this.toggleModal("markdownShowing"),
                      "\u270d\ufe0f Markdown",
                      s
                    ),
                  f &&
                    this.renderModal(
                      this.toggleModal("frontmatterShowing"),
                      "Jekyll Front Matter",
                      l
                    )
                );
              },
            },
          ]) && he(t.prototype, n),
          a && he(t, a),
          i
        );
      })(r.Component);
      (we.propTypes = {
        previewShowing: i.a.bool.isRequired,
        helpFor: i.a.string.isRequired,
        helpPosition: i.a.string.isRequired,
        version: i.a.string.isRequired,
      }),
        (we.displayName = "Help");
      var je = i.a.shape({
          processed_html: i.a.string.isRequired,
          title: i.a.string,
          tags: i.a.array,
          cover_image: i.a.string,
        }),
        Se = function (e) {
          var t = e.previewResponse,
            n = e.articleState,
            a = e.errors;
          return (
            Object(f.d)(
              function () {
                var e;
                t.processed_html.includes("twitter-timeline") &&
                  (((e = document.createElement("script")).src =
                    "https://platform.twitter.com/widgets.js"),
                  (e.async = !0),
                  document.body.appendChild(e));
              },
              [t]
            ),
            Object(r.h)(
              "div",
              { className: "crayons-article-form__content crayons-card" },
              Object(r.h)(
                "article",
                { className: "crayons-article" },
                (function (e, t, n) {
                  var a = e.tags || t.tagList.split(", "),
                    o = "";
                  a.length > 0 &&
                    a[0].length > 0 &&
                    (o = a.map(function (e) {
                      return (
                        e.length > 0 &&
                        Object(r.h)(
                          "span",
                          { className: "crayons-tag mr-2" },
                          Object(r.h)(
                            "span",
                            { className: "crayons-tag__prefix" },
                            "#"
                          ),
                          e
                        )
                      );
                    }));
                  var i = t.mainImage || "";
                  t.previewShowing &&
                    e.cover_image &&
                    e.cover_image.length > 0 &&
                    (i = e.cover_image);
                  var c = e.title || t.title || "";
                  return Object(r.h)(
                    "header",
                    { className: "crayons-article__header" },
                    i.length > 0 &&
                      Object(r.h)(
                        "div",
                        {
                          "data-testid": "article-form__cover",
                          className: "crayons-article__cover",
                        },
                        Object(r.h)("img", {
                          className: "crayons-article__cover__image",
                          src: i,
                          width: "1000",
                          height: "420",
                          alt: "Post preview cover",
                        })
                      ),
                    Object(r.h)(
                      "div",
                      { className: "crayons-article__header__meta" },
                      n && Object(r.h)(oe, { errors: n }),
                      Object(r.h)(
                        "h1",
                        {
                          className:
                            "fs-4xl l:fs-5xl fw-bold s:fw-heavy lh-tight mb-6 spec-article__title",
                        },
                        c
                      ),
                      Object(r.h)("div", { className: "spec-article__tags" }, o)
                    )
                  );
                })(t, n, a),
                Object(r.h)(
                  "div",
                  { className: "crayons-article__main" },
                  Object(r.h)("div", {
                    className: "crayons-article__body text-styles",
                    dangerouslySetInnerHTML: { __html: t.processed_html },
                  })
                )
              )
            )
          );
        };
      function _e(e) {
        return (_e =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function ke(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function Re(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ke(Object(n), !0).forEach(function (t) {
                Ee(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ke(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function Ce(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function Ie(e, t) {
        return (Ie =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function Ne(e) {
        var t = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = xe(e);
          if (t) {
            var a = xe(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return Te(this, n);
        };
      }
      function Te(e, t) {
        return !t || ("object" !== _e(t) && "function" !== typeof t)
          ? Pe(e)
          : t;
      }
      function Pe(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function xe(e) {
        return (xe = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function Ee(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      (Se.propTypes = {
        previewResponse: je.isRequired,
        errors: i.a.string.isRequired,
        articleState: i.a.shape({
          id: i.a.number,
          title: i.a.string,
          tagList: i.a.string,
          description: i.a.string,
          canonicalUrl: i.a.string,
          series: i.a.string,
          allSeries: i.a.arrayOf(i.a.string),
          bodyMarkdown: i.a.string,
          published: i.a.bool,
          previewShowing: i.a.bool,
          helpShowing: i.a.bool,
          previewResponse: je,
          helpHTML: i.a.string,
          submitting: i.a.bool,
          editing: i.a.bool,
          imageManagementShowing: i.a.bool,
          moreConfigShowing: i.a.bool,
          mainImage: i.a.string,
          organization: i.a.shape({
            name: i.a.string.isRequired,
            bg_color_hex: i.a.string.isRequired,
            text_color_hex: i.a.string.isRequired,
            profile_image_90: i.a.string.isRequired,
          }),
          postUnderOrg: i.a.bool,
          errors: i.a.any,
          edited: i.a.bool,
          version: i.a.string,
        }).isRequired,
      }),
        (Se.displayName = "Preview");
      var qe = (function (e) {
        !(function (e, t) {
          if ("function" !== typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && Ie(e, t);
        })(i, e);
        var t,
          n,
          a,
          o = Ne(i);
        function i(e) {
          var t;
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, i),
            Ee(Pe((t = o.call(this, e))), "localStoreContent", function () {
              var e = t.state,
                n = e.version,
                r = e.title,
                a = e.tagList,
                o = e.mainImage,
                i = e.bodyMarkdown,
                c = new Date();
              localStorage.setItem(
                "editor-".concat(n, "-").concat(t.url),
                JSON.stringify({
                  title: r,
                  tagList: a,
                  mainImage: o,
                  bodyMarkdown: i,
                  updatedAt: c,
                })
              );
            }),
            Ee(Pe(t), "setCommonProps", function (e) {
              var t = e.previewShowing,
                n = void 0 !== t && t,
                r = e.helpFor,
                a = void 0 === r ? null : r,
                o = e.helpPosition;
              return {
                previewShowing: n,
                helpFor: a,
                helpPosition: void 0 === o ? null : o,
              };
            }),
            Ee(Pe(t), "fetchPreview", function (e) {
              var n = t.state,
                r = n.previewShowing,
                a = n.bodyMarkdown;
              e.preventDefault(),
                r
                  ? t.setState(Re({}, t.setCommonProps({})))
                  : Object(d.b)(a, t.showPreview, t.failedPreview);
            }),
            Ee(Pe(t), "showPreview", function (e) {
              t.setState(
                Re(
                  Re({}, t.setCommonProps({ previewShowing: !0 })),
                  {},
                  { previewResponse: e, errors: null }
                )
              );
            }),
            Ee(Pe(t), "handleOrgIdChange", function (e) {
              var n = e.target.selectedOptions[0].value;
              t.setState({ organizationId: n });
            }),
            Ee(Pe(t), "failedPreview", function (e) {
              t.setState({ errors: e, submitting: !1 });
            }),
            Ee(Pe(t), "handleConfigChange", function (e) {
              e.preventDefault();
              var n = {};
              (n[e.target.name] = e.target.value), t.setState(n);
            }),
            Ee(Pe(t), "handleMainImageUrlChange", function (e) {
              t.setState({ mainImage: e.links[0] });
            }),
            Ee(Pe(t), "removeLocalStorage", function () {
              var e = t.state.version;
              localStorage.removeItem("editor-".concat(e, "-").concat(t.url)),
                window.removeEventListener("beforeunload", t.localStoreContent);
            }),
            Ee(Pe(t), "onPublish", function (e) {
              e.preventDefault(), t.setState({ submitting: !0, published: !0 });
              var n = Pe(t).state;
              (n.published = !0),
                Object(d.d)(n, t.removeLocalStorage, t.handleArticleError);
            }),
            Ee(Pe(t), "onSaveDraft", function (e) {
              e.preventDefault(), t.setState({ submitting: !0, published: !1 });
              var n = Pe(t).state;
              (n.published = !1),
                Object(d.d)(n, t.removeLocalStorage, t.handleArticleError);
            }),
            Ee(Pe(t), "onClearChanges", function (e) {
              e.preventDefault(),
                (window.confirm(
                  "Are you sure you want to revert to the previous save?"
                ) ||
                  "DEV-Native-ios" === navigator.userAgent) &&
                  t.setState({
                    title: t.article.title || "",
                    tagList: t.article.cached_tag_list || "",
                    description: "",
                    canonicalUrl: t.article.canonical_url || "",
                    series: t.article.series || "",
                    allSeries: t.article.all_series || [],
                    bodyMarkdown: t.article.body_markdown || "",
                    published: t.article.published || !1,
                    previewShowing: !1,
                    previewResponse: "",
                    submitting: !1,
                    editing: null !== t.article.id,
                    mainImage: t.article.main_image || null,
                    errors: null,
                    edited: !1,
                    helpFor: null,
                    helpPosition: 0,
                    showModal: !1,
                  });
            }),
            Ee(Pe(t), "handleArticleError", function (e) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              window.scrollTo(0, 0);
              var r = t.state.published;
              t.setState({ errors: e, submitting: !1, published: r && !n });
            }),
            Ee(Pe(t), "toggleEdit", function () {
              t.localStoreContent(),
                t.state.edited || t.setState({ edited: !0 });
            }),
            Ee(Pe(t), "toggleModal", function () {
              t.state.edited
                ? t.setState({ showModal: !t.state.showModal })
                : (window.location.href = "/");
            }),
            Ee(Pe(t), "switchHelpContext", function (e) {
              var n = e.target;
              t.setState(
                Re(
                  {},
                  t.setCommonProps({
                    helpFor: n.id,
                    helpPosition: n.getBoundingClientRect().y,
                  })
                )
              );
            });
          var n = t.props,
            r = n.article,
            a = n.version,
            c = n.siteLogo,
            s = t.props.organizations;
          (t.article = JSON.parse(r)),
            (s = s ? JSON.parse(s) : null),
            (t.url = window.location.href);
          var l =
              JSON.parse(
                localStorage.getItem(
                  "editor-".concat(a, "-").concat(window.location.href)
                )
              ) || {},
            u = new Date(l.updatedAt) > new Date(t.article.updated_at),
            f =
              l && u
                ? {
                    title: l.title || "",
                    tagList: l.tagList || "",
                    mainImage: l.mainImage || null,
                    bodyMarkdown: l.bodyMarkdown || "",
                    edited: !0,
                  }
                : {};
          return (
            (t.state = Re(
              {
                id: t.article.id || null,
                title: t.article.title || "",
                tagList: t.article.cached_tag_list || "",
                description: "",
                canonicalUrl: t.article.canonical_url || "",
                series: t.article.series || "",
                allSeries: t.article.all_series || [],
                bodyMarkdown: t.article.body_markdown || "",
                published: t.article.published || !1,
                previewShowing: !1,
                previewResponse: "",
                submitting: !1,
                editing: null !== t.article.id,
                mainImage: t.article.main_image || null,
                organizations: s,
                organizationId: t.article.organization_id,
                errors: null,
                edited: !1,
                updatedAt: t.article.updated_at,
                version: a,
                siteLogo: c,
                helpFor: null,
                helpPosition: null,
              },
              f
            )),
            t
          );
        }
        return (
          (t = i),
          (a = [
            {
              key: "handleGistPreview",
              value: function () {
                for (
                  var e = document.getElementsByClassName(
                      "ltag_gist-liquid-tag"
                    ),
                    t = 0;
                  t < e.length;
                  t += 1
                )
                  l()(e[t], e[t].firstElementChild.outerHTML);
              },
            },
            {
              key: "handleRunkitPreview",
              value: function () {
                activateRunkitTags();
              },
            },
            {
              key: "handleAsciinemaPreview",
              value: function () {
                for (
                  var e = document.getElementsByClassName("ltag_asciinema"),
                    t = 0;
                  t < e.length;
                  t += 1
                ) {
                  var n = e[t],
                    r = n.removeChild(n.firstElementChild);
                  l()(n, r.outerHTML);
                }
              },
            },
          ]),
          (n = [
            {
              key: "componentDidMount",
              value: function () {
                window.addEventListener("beforeunload", this.localStoreContent);
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                window.removeEventListener(
                  "beforeunload",
                  this.localStoreContent
                );
              },
            },
            {
              key: "componentDidUpdate",
              value: function () {
                this.state.previewResponse &&
                  (this.constructor.handleGistPreview(),
                  this.constructor.handleRunkitPreview(),
                  this.constructor.handleAsciinemaPreview());
              },
            },
            {
              key: "render",
              value: function () {
                var e = this.state,
                  t = e.title,
                  n = e.tagList,
                  a = e.bodyMarkdown,
                  o = e.published,
                  i = e.previewShowing,
                  s = e.previewResponse,
                  l = e.submitting,
                  d = e.organizations,
                  f = e.organizationId,
                  h = e.mainImage,
                  m = e.errors,
                  g = e.edited,
                  b = e.version,
                  v = e.helpFor,
                  O = e.helpPosition,
                  w = e.siteLogo;
                return Object(r.h)(
                  "form",
                  {
                    id: "article-form",
                    className: "crayons-article-form",
                    onSubmit: this.onSubmit,
                    onInput: this.toggleEdit,
                    "data-testid": "article-form",
                  },
                  Object(r.h)(de, {
                    onPreview: this.fetchPreview,
                    previewShowing: i,
                    organizations: d,
                    organizationId: f,
                    onToggle: this.handleOrgIdChange,
                    siteLogo: w,
                    displayModal: this.toggleModal,
                  }),
                  i
                    ? Object(r.h)(Se, {
                        previewResponse: s,
                        articleState: this.state,
                        errors: m,
                      })
                    : Object(r.h)(ie, {
                        titleDefaultValue: t,
                        titleOnChange: Object(c.a)(this, "title"),
                        tagsDefaultValue: n,
                        tagsOnInput: Object(c.a)(this, "tagList"),
                        bodyDefaultValue: a,
                        bodyOnChange: Object(c.a)(this, "bodyMarkdown"),
                        bodyHasFocus: !1,
                        version: b,
                        mainImage: h,
                        onMainImageUrlChange: this.handleMainImageUrlChange,
                        errors: m,
                        switchHelpContext: this.switchHelpContext,
                      }),
                  Object(r.h)(we, {
                    previewShowing: i,
                    helpFor: v,
                    helpPosition: O,
                    version: b,
                  }),
                  this.state.showModal &&
                    Object(r.h)(
                      p.e,
                      {
                        size: "s",
                        title: "You have unsaved changes",
                        onClose: this.toggleModal,
                      },
                      Object(r.h)(
                        "p",
                        null,
                        "You've made changes to your post. Do you want to navigate to leave this page?"
                      ),
                      Object(r.h)(
                        "div",
                        { className: "pt-4" },
                        Object(r.h)(
                          p.a,
                          {
                            className: "mr-2",
                            variant: "danger",
                            url: "/",
                            tagName: "a",
                          },
                          "Yes, leave the page"
                        ),
                        Object(r.h)(
                          p.a,
                          { variant: "secondary", onClick: this.toggleModal },
                          "No, keep editing"
                        )
                      )
                    ),
                  Object(r.h)(y, {
                    published: o,
                    version: b,
                    onPublish: this.onPublish,
                    onSaveDraft: this.onSaveDraft,
                    onClearChanges: this.onClearChanges,
                    edited: g,
                    passedData: this.state,
                    onConfigChange: this.handleConfigChange,
                    submitting: l,
                  }),
                  Object(r.h)(u.a, {
                    shortcuts: { "ctrl+shift+KeyP": this.fetchPreview },
                  })
                );
              },
            },
          ]) && Ce(t.prototype, n),
          a && Ce(t, a),
          i
        );
      })(r.Component);
      function Me() {
        var e = document.getElementById("snack-zone");
        e && Object(r.render)(Object(r.h)(q.a, { lifespan: "3" }), e),
          Object(a.e)().then(function (e) {
            var t = e.currentUser,
              n = e.csrfToken;
            (window.currentUser = t), (window.csrfToken = n);
            var a = document.getElementById("js-article-form"),
              o = a.dataset,
              i = o.article,
              c = o.organizations,
              s = o.version,
              l = o.siteLogo;
            Object(r.render)(
              Object(r.h)(qe, {
                article: i,
                organizations: c,
                version: s,
                siteLogo: l,
              }),
              a,
              a.firstElementChild
            );
          });
      }
      Ee(qe, "propTypes", {
        version: i.a.string.isRequired,
        article: i.a.string.isRequired,
        organizations: i.a.string,
        siteLogo: i.a.string.isRequired,
      }),
        Ee(qe, "defaultProps", { organizations: "" }),
        (HTMLDocument.prototype.ready = new Promise(function (e) {
          return "loading" !== document.readyState
            ? e()
            : (document.addEventListener("DOMContentLoaded", function () {
                return e();
              }),
              null);
        })),
        document.ready.then(function () {
          Me(),
            window.InstantClick.on("change", function () {
              document.getElementById("article-form") && Me();
            });
        });
    },
    26: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return s;
      }),
        n.d(t, "d", function () {
          return u;
        }),
        n.d(t, "a", function () {
          return f;
        }),
        n.d(t, "c", function () {
          return p;
        });
      var r = n(30);
      function a(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if (
              "undefined" === typeof Symbol ||
              !(Symbol.iterator in Object(e))
            )
              return;
            var n = [],
              r = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var i, c = e[Symbol.iterator]();
                !(r = (i = c.next()).done) &&
                (n.push(i.value), !t || n.length !== t);
                r = !0
              );
            } catch (s) {
              (a = !0), (o = s);
            } finally {
              try {
                r || null == c.return || c.return();
              } finally {
                if (a) throw o;
              }
            }
            return n;
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return o(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function o(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function i(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              a = {},
              o = Object.keys(e);
            for (r = 0; r < o.length; r++)
              (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (a[n] = e[n]));
        }
        return a;
      }
      function c(e, t, n, r, a, o, i) {
        try {
          var c = e[o](i),
            s = c.value;
        } catch (l) {
          return void n(l);
        }
        c.done ? t(s) : Promise.resolve(s).then(r, a);
      }
      function s(e, t, n) {
        fetch("https://dev.to/articles/preview", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: JSON.stringify({ article_body: e }),
          credentials: "same-origin",
        })
          .then(
            (function () {
              var e,
                t =
                  ((e = function* (e) {
                    var t = yield e.json();
                    if (200 !== e.status) throw t;
                    return t;
                  }),
                  function () {
                    var t = this,
                      n = arguments;
                    return new Promise(function (r, a) {
                      var o = e.apply(t, n);
                      function i(e) {
                        c(o, r, a, i, s, "next", e);
                      }
                      function s(e) {
                        c(o, r, a, i, s, "throw", e);
                      }
                      i(void 0);
                    });
                  });
              return function (e) {
                return t.apply(this, arguments);
              };
            })()
          )
          .then(t)
          .catch(n);
      }
      function l(e) {
        e.previewShowing,
          e.helpShowing,
          e.previewResponse,
          e.helpHTML,
          e.imageManagementShowing,
          e.moreConfigShowing,
          e.errors;
        return i(e, [
          "previewShowing",
          "helpShowing",
          "previewResponse",
          "helpHTML",
          "imageManagementShowing",
          "moreConfigShowing",
          "errors",
        ]);
      }
      function u(e, t, n, r) {
        var a = e.id ? "PUT" : "POST",
          o = e.id ? "/articles/".concat(e.id) : "/articles";
        fetch(o, {
          method: a,
          headers: {
            Accept: "application/json",
            "X-CSRF-Token": window.csrfToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ article: l(e) }),
          credentials: "same-origin",
        })
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.current_state_path
              ? (t(), window.location.replace(e.current_state_path))
              : n(e, "POST" === a);
          })
          .catch(r);
      }
      function d(e) {
        var t = window.csrfToken,
          n = new FormData();
        return (
          n.append("authenticity_token", t),
          Object.entries(e.image).forEach(function (e) {
            var t = a(e, 2),
              r = (t[0], t[1]);
            return n.append("image[]", r);
          }),
          n
        );
      }
      function f(e, t, n) {
        fetch("/image_uploads", {
          method: "POST",
          headers: { "X-CSRF-Token": window.csrfToken },
          body: d(e),
          credentials: "same-origin",
        })
          .then(function (e) {
            return e.json();
          })
          .then(function (n) {
            if (n.error) throw new Error(n.error);
            var r = n.links,
              a = e.image;
            return t({ links: r, image: a });
          })
          .catch(n);
      }
      function p(e, t, n) {
        e.length > 0 && Object(r.validateFileInputs)() && f({ image: e }, t, n);
      }
    },
    29: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return w;
      }),
        n.d(t, "a", function () {
          return j;
        });
      var r = n(0),
        a = n(1),
        o = n.n(a),
        i = n(23);
      function c(e) {
        return (c =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function s(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return l(e);
          })(e) ||
          (function (e) {
            if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e))
              return Array.from(e);
          })(e) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return l(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return l(e, t);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function l(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function u(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function d(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? u(Object(n), !0).forEach(function (t) {
                v(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : u(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function f(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function p(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function h(e, t) {
        return (h =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function m(e) {
        var t = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = y(e);
          if (t) {
            var a = y(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return g(this, n);
        };
      }
      function g(e, t) {
        return !t || ("object" !== c(t) && "function" !== typeof t) ? b(e) : t;
      }
      function b(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function y(e) {
        return (y = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function v(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var O = [];
      function w(e) {
        Array.isArray(e.actions) || (e.actions = []), O.push(e);
      }
      var j = (function (e) {
        !(function (e, t) {
          if ("function" !== typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && h(e, t);
        })(c, e);
        var t,
          n,
          a,
          o = m(c);
        function c() {
          var e;
          f(this, c);
          for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
            n[r] = arguments[r];
          return (
            v(b((e = o.call.apply(o, [this].concat(n)))), "state", {
              snacks: [],
            }),
            v(b(e), "pollingId", void 0),
            v(b(e), "paused", !1),
            v(b(e), "pauseLifespan", void 0),
            v(b(e), "resumeLifespan", void 0),
            e
          );
        }
        return (
          (t = c),
          (n = [
            {
              key: "componentDidMount",
              value: function () {
                this.initializePolling();
              },
            },
            {
              key: "componentDidUpdate",
              value: function () {
                var e = this;
                this.pauseLifespan ||
                  ((this.pauseLifespan = function (t) {
                    e.paused = !0;
                  }),
                  (this.resumeLifespan = function (t) {
                    t.stopPropagation(), (e.paused = !1);
                  }),
                  this.element.addEventListener(
                    "mouseover",
                    this.pauseLifespan
                  ),
                  this.element.addEventListener(
                    "mouseout",
                    this.resumeLifespan,
                    !0
                  ));
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                this.element &&
                  (this.element.removeEventListener(
                    "mouseover",
                    this.pauseLifespan
                  ),
                  this.element.addEventListener(
                    "mouseout",
                    this.resumeLifespan
                  ));
              },
            },
            {
              key: "initializePolling",
              value: function () {
                var e = this,
                  t = this.props,
                  n = t.pollingTime,
                  r = t.lifespan;
                this.pollingId = setInterval(function () {
                  if (O.length > 0) {
                    var t = O.map(function (e) {
                      return d(d({}, e), {}, { lifespan: r });
                    });
                    (O = []),
                      e.updateSnackbarItems(t),
                      t.forEach(function (t) {
                        (t.lifespanTimeoutId = setTimeout(function () {
                          e.decreaseLifespan(t);
                        }, 1e3)),
                          t.addCloseButton &&
                            t.actions.push({
                              text: "Dismiss",
                              handler: function () {
                                e.setState(function (e) {
                                  return {
                                    prevState: e,
                                    snacks: e.snacks.filter(function (e) {
                                      return e !== t;
                                    }),
                                  };
                                });
                              },
                            });
                      });
                  }
                }, n);
              },
            },
            {
              key: "updateSnackbarItems",
              value: function (e) {
                this.setState(function (t) {
                  var n = [].concat(s(t.snacks), s(e));
                  return (
                    n.length > 3 &&
                      (n.slice(0, n.length - 3).forEach(function (e) {
                        var t = e.lifespanTimeoutId;
                        clearTimeout(t);
                      }),
                      (n = n.slice(n.length - 3))),
                    d(d({}, t), {}, { snacks: n })
                  );
                });
              },
            },
            {
              key: "decreaseLifespan",
              value: function (e) {
                var t = this;
                if (!this.paused && 0 === e.lifespan)
                  return (
                    clearTimeout(e.lifespanTimeoutId),
                    void this.setState(function (t) {
                      var n = t.snacks.filter(function (t) {
                        return t !== e;
                      });
                      return d(d({}, t), {}, { snacks: n });
                    })
                  );
                this.paused || (e.lifespan -= 1),
                  (e.lifespanTimeoutId = setTimeout(function () {
                    t.decreaseLifespan(e);
                  }, 1e3));
              },
            },
            {
              key: "render",
              value: function () {
                var e = this,
                  t = this.state.snacks;
                return Object(r.h)(
                  "div",
                  {
                    className: t.length > 0 ? "crayons-snackbar" : "hidden",
                    ref: function (t) {
                      e.element = t;
                    },
                  },
                  t.map(function (e) {
                    var t = e.message,
                      n = e.actions,
                      a = void 0 === n ? [] : n;
                    return Object(r.h)(i.a, { message: t, actions: a });
                  })
                );
              },
            },
          ]) && p(t.prototype, n),
          a && p(t, a),
          c
        );
      })(r.Component);
      (j.defaultProps = { lifespan: 5, pollingTime: 300 }),
        (j.displayName = "Snackbar"),
        (j.propTypes = { lifespan: o.a.number, pollingTime: o.a.number });
    },
    3: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return r.a;
      }),
        n.d(t, "b", function () {
          return i;
        }),
        n.d(t, "c", function () {
          return f;
        }),
        n.d(t, "d", function () {
          return p;
        }),
        n.d(t, "f", function () {
          return g;
        }),
        n.d(t, "e", function () {
          return O;
        }),
        n.d(t, "g", function () {
          return w.a;
        });
      var r = n(18),
        a = n(0),
        o = n(4),
        i = function (e) {
          var t = e.children;
          return Object(a.h)(
            "div",
            { role: "presentation", className: "crayons-btn-group" },
            t
          );
        };
      (i.displayName = "ButtonGroup"),
        (i.propTypes = { children: o.c.isRequired });
      var c = n(1),
        s = n.n(c),
        l = n(9);
      function u() {
        return (u =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      function d(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              a = {},
              o = Object.keys(e);
            for (r = 0; r < o.length; r++)
              (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (a[n] = e[n]));
        }
        return a;
      }
      var f = function (e) {
        var t = e.children,
          n = e.className,
          r = d(e, ["children", "className"]);
        return Object(a.h)(
          "div",
          u(
            {
              className: "crayons-dropdown".concat(
                n && n.length > 0 ? " ".concat(n) : ""
              ),
            },
            r
          ),
          t
        );
      };
      (f.defaultProps = { className: void 0 }),
        (f.displayName = "Dropdown"),
        (f.propTypes = { children: l.a.isRequired, className: s.a.string });
      var p = function (e) {
        var t = e.children,
          n = e.variant;
        return Object(a.h)(
          "div",
          {
            className: "crayons-field".concat(
              n && n.length > 0 ? " crayons-field--".concat(n) : ""
            ),
          },
          t
        );
      };
      function h() {
        return (h =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      function m(e, t) {
        if (null == e) return {};
        var n,
          r,
          a = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              a = {},
              o = Object.keys(e);
            for (r = 0; r < o.length; r++)
              (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
            return a;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (a[n] = e[n]));
        }
        return a;
      }
      (p.displayName = "FormField"),
        (p.defaultProps = { variant: void 0 }),
        (p.propTypes = {
          children: o.c.isRequired,
          variant: s.a.oneOf(["radio", "checkbox"]),
        });
      var g = function (e) {
        var t = e.id,
          n = e.value,
          r = e.name,
          o = e.className,
          i = e.checked,
          c = e.onClick,
          s = m(e, ["id", "value", "name", "className", "checked", "onClick"]);
        return Object(a.h)(
          "input",
          h(
            {
              id: t,
              value: n,
              name: r,
              className: "crayons-radio".concat(
                o && o.length > 0 ? " ".concat(o) : ""
              ),
              checked: i,
              onClick: c,
              type: "radio",
            },
            s
          )
        );
      };
      (g.displayName = "RadioButton"),
        (g.defaultProps = {
          id: void 0,
          className: void 0,
          checked: !1,
          name: void 0,
        }),
        (g.propTypes = {
          id: s.a.string,
          value: s.a.string.isRequired,
          className: s.a.string,
          checked: s.a.bool,
          name: s.a.string,
          onClick: s.a.func.isRequired,
        });
      var b = n(10);
      function y(e) {
        var t = e.size,
          n = e.className,
          r = "";
        return (
          t &&
            t.length > 0 &&
            "default" !== t &&
            (r += " crayons-modal--".concat(t)),
          n && n.length > 0 && (r += " ".concat(n)),
          r
        );
      }
      var v = function () {
          return Object(a.h)(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              className: "crayons-icon",
              xmlns: "http://www.w3.org/2000/svg",
              role: "img",
              "aria-labelledby": "714d29e78a3867c79b07f310e075e824",
            },
            Object(a.h)(
              "title",
              { id: "714d29e78a3867c79b07f310e075e824" },
              "Close"
            ),
            Object(a.h)("path", {
              d:
                "M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z",
            })
          );
        },
        O = function (e) {
          var t = e.children,
            n = e.size,
            o = void 0 === n ? "default" : n,
            i = e.className,
            c = e.title,
            s = e.overlay,
            l = e.onClose,
            u = { escape: l };
          return Object(a.h)(
            "div",
            {
              "data-testid": "modal-container",
              className: "crayons-modal".concat(y({ size: o, className: i })),
            },
            Object(a.h)(
              "div",
              {
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "modal",
                className: "crayons-modal__box",
              },
              c &&
                Object(a.h)(
                  "div",
                  { className: "crayons-modal__box__header" },
                  Object(a.h)("h2", null, c),
                  Object(a.h)(r.a, {
                    icon: v,
                    variant: "ghost",
                    contentType: "icon",
                    "aria-label": "Close",
                    onClick: l,
                  }),
                  Object(a.h)(b.a, { shortcuts: u })
                ),
              Object(a.h)("div", { className: "crayons-modal__box__body" }, t)
            ),
            s &&
              Object(a.h)("div", {
                "data-testid": "modal-overlay",
                className: "crayons-modal__overlay",
              })
          );
        };
      (O.displayName = "Modal"),
        (O.defaultProps = { className: void 0, overlay: !0, onClose: void 0 }),
        (O.propTypes = {
          children: o.c.isRequired,
          className: s.a.string,
          title: s.a.string.isRequired,
          overlay: s.a.bool,
          onClose: s.a.func,
          size: s.a.oneOf(["default", "s", "m"]).isRequired,
        });
      var w = n(20);
    },
    30: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "validateFileInputs", function () {
          return u;
        });
      var r = Object.freeze({ image: 25, video: 50 }),
        a = ["image"];
      function o(e, t) {
        var n = e,
          r = document.createElement("div");
        (r.style.color = "red"),
          (r.innerHTML = t),
          r.classList.add("file-upload-error"),
          n.parentNode.append(r);
      }
      function i(e, t, n) {
        var a = n.dataset.maxFileSizeMb,
          i = n.dataset.fileSizeErrorHandler,
          c = (e.size / 1048576).toFixed(2),
          s = c <= (a = Number(a || r[t]));
        return (
          s ||
            (function (e, t, n, r) {
              if (((t.value = null), e)) e();
              else {
                var a = "File size too large (".concat(n, " MB).");
                r >= 0 && (a += " The limit is ".concat(r, " MB.")), o(t, a);
              }
            })(i, n, c, a),
          s
        );
      }
      function c(e, t, n) {
        var r = n.dataset.permittedFileTypes;
        r && (r = JSON.parse(r)), (r = r || a);
        var i = n.dataset.fileTypeErrorHandler,
          c = r.includes(t);
        return (
          c ||
            (function (e, t, n, r) {
              (t.value = null),
                e
                  ? e()
                  : o(
                      t,
                      "Invalid file format ("
                        .concat(n, "). Only ")
                        .concat(r.join(", "), " files are permitted.")
                    );
            })(i, n, t, r),
          c
        );
      }
      function s(e, t) {
        var n = t.dataset.maxFileNameLength;
        n = Number(n || 250);
        var r = t.dataset.fileNameLengthErrorHandler,
          a = e.name.length <= n;
        return (
          a ||
            (function (e, t, n) {
              (t.value = null),
                e
                  ? e()
                  : o(
                      t,
                      "File name is too long. It can't be longer than ".concat(
                        n,
                        " characters."
                      )
                    );
            })(r, t, n),
          a
        );
      }
      function l(e) {
        var t = !0;
        !(function (e) {
          var t = e.parentNode.querySelector("div.file-upload-error");
          t && t.remove();
        })(e);
        for (var n = Array.from(e.files), r = 0; r < n.length; r += 1) {
          var a = n[r],
            o = a.type.split("/")[0];
          if (!i(a, o, e)) {
            t = !1;
            break;
          }
          if (!c(0, o, e)) {
            t = !1;
            break;
          }
          if (!s(a, e)) {
            t = !1;
            break;
          }
        }
        return t;
      }
      function u() {
        for (
          var e = !0,
            t = document.querySelectorAll('input[type="file"]'),
            n = 0;
          n < t.length;
          n += 1
        ) {
          if (!l(t[n])) {
            e = !1;
            break;
          }
        }
        return e;
      }
      document.querySelectorAll('input[type="file"]').forEach(function (e) {
        e.addEventListener("change", function () {
          l(e);
        });
      });
    },
    34: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return _;
      });
      var r = n(0),
        a = n(1),
        o = n.n(a),
        i = n(13);
      function c(e) {
        return (c =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function s(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function l(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function u(e, t) {
        return (u =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function d(e) {
        var t = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = h(e);
          if (t) {
            var a = h(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return f(this, n);
        };
      }
      function f(e, t) {
        return !t || ("object" !== c(t) && "function" !== typeof t) ? p(e) : t;
      }
      function p(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function h(e) {
        return (h = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function m(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var g = "ArrowUp",
        b = "ArrowDown",
        y = "Tab",
        v = "Enter",
        O = ",",
        w = "Backspace",
        j = [O, w, "ArrowLeft", "ArrowRight", y],
        S = /[a-z0-9]/i,
        _ = (function (e) {
          !(function (e, t) {
            if ("function" !== typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && u(e, t);
          })(c, e);
          var t,
            n,
            a,
            o = d(c);
          function c(e) {
            var t;
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, c),
              m(
                p((t = o.call(this, e))),
                "getCurrentTagAtSelectionIndex",
                function (e, t) {
                  var n = 0,
                    r = {};
                  e.split("").forEach(function (e, t) {
                    "," === e ? (n += 1) : (r[t] = n);
                  });
                  var a = e.split(",")[r[t]];
                  return void 0 === a ? "" : a.trim();
                }
              ),
              m(p(t), "getRangeBetweenCommas", function (e, t) {
                var n = 0,
                  r = e.length,
                  a = e.slice(0, t).split("").reverse().indexOf(","),
                  o = e.slice(t).indexOf(",");
                return (
                  -1 !== a && (n = t - a + 1), -1 !== o && (r = t + o), [n, r]
                );
              }),
              m(p(t), "handleKeyDown", function (e) {
                var n = p(t),
                  r = t.props.maxTags;
                n.selected.length !== r || e.key !== O
                  ? (e.key !== b && e.key !== y) ||
                    t.isBottomOfSearchResults ||
                    "" === n.props.defaultValue
                    ? e.key !== g || t.isTopOfSearchResults
                      ? e.key === v && t.isSearchResultSelected
                        ? (e.preventDefault(),
                          t.insertTag(
                            n.state.searchResults[n.state.selectedIndex].name
                          ),
                          setTimeout(function () {
                            document.getElementById("tag-input").focus();
                          }, 10))
                        : e.key !== O || t.isSearchResultSelected
                        ? e.key === w
                          ? "," ===
                              n.props.defaultValue[
                                n.props.defaultValue.length - 1
                              ] && t.clearSelectedSearchResult()
                          : S.test(e.key) ||
                            j.includes(e.key) ||
                            e.preventDefault()
                        : (t.resetSearchResults(),
                          t.clearSelectedSearchResult())
                      : (e.preventDefault(), t.moveUpInSearchResults())
                    : (e.preventDefault(), t.moveDownInSearchResults())
                  : e.preventDefault();
              }),
              m(p(t), "handleRulesClick", function (e) {
                e.preventDefault(),
                  t.state.showingRulesForTag === e.target.dataset.content
                    ? t.setState({ showingRulesForTag: null })
                    : t.setState({
                        showingRulesForTag: e.target.dataset.content,
                      });
              }),
              m(p(t), "handleTagClick", function (e) {
                "articleform__tagsoptionrulesbutton" !== e.target.className &&
                  (document.getElementById("tag-input").focus(),
                  t.insertTag(e.currentTarget.dataset.content));
              }),
              m(p(t), "handleInput", function (e) {
                var n = e.target.value;
                "insertText" === e.inputType &&
                  "," === e.target.value[e.target.selectionStart - 2] &&
                  (n = t.insertSpace(n, e.target.selectionStart - 1));
                "," === e.data && (n += " "), t.props.onInput(n);
                var r = t.getCurrentTagAtSelectionIndex(
                  e.target.value,
                  e.target.selectionStart - 1
                );
                return (
                  t.setState({
                    selectedIndex: 0,
                    cursorIdx: e.target.selectionStart,
                    prevLen: t.textArea.value.length,
                  }),
                  t.search(r)
                );
              }),
              m(p(t), "handleFocusChange", function () {
                var e = p(t);
                setTimeout(function () {
                  "tag-input" !== document.activeElement.id && e.forceUpdate();
                }, 250);
              }),
              m(p(t), "insertSpace", function (e, t) {
                return ""
                  .concat(e.slice(0, t), " ")
                  .concat(e.slice(t, e.length));
              }),
              m(p(t), "handleTagEnter", function (e) {
                e.key === v && t.handleTagClick();
              });
            var n = e.listing
              ? {
                  additionalTags: {
                    jobs: [
                      "remote",
                      "remoteoptional",
                      "lgbtbenefits",
                      "greencard",
                      "senior",
                      "junior",
                      "intermediate",
                      "401k",
                      "fulltime",
                      "contract",
                      "temp",
                    ],
                    forhire: [
                      "remote",
                      "remoteoptional",
                      "lgbtbenefits",
                      "greencard",
                      "senior",
                      "junior",
                      "intermediate",
                      "401k",
                      "fulltime",
                      "contract",
                      "temp",
                    ],
                    forsale: ["laptop", "desktopcomputer", "new", "used"],
                    events: ["conference", "meetup"],
                    collabs: ["paid", "temp"],
                  },
                }
              : null;
            return (
              (t.state = (function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = null != arguments[t] ? arguments[t] : {};
                  t % 2
                    ? s(Object(n), !0).forEach(function (t) {
                        m(e, t, n[t]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(n)
                      )
                    : s(Object(n)).forEach(function (t) {
                        Object.defineProperty(
                          e,
                          t,
                          Object.getOwnPropertyDescriptor(n, t)
                        );
                      });
                }
                return e;
              })(
                {
                  selectedIndex: -1,
                  searchResults: [],
                  additionalTags: [],
                  cursorIdx: 0,
                  prevLen: 0,
                  showingRulesForTag: null,
                },
                n
              )),
              t
            );
          }
          return (
            (t = c),
            (n = [
              {
                key: "componentDidUpdate",
                value: function () {
                  var e = this.state,
                    t = e.cursorIdx,
                    n = e.prevLen;
                  t < this.textArea.value.length &&
                    this.textArea.value.length < n + 1 &&
                    ((this.textArea.selectionEnd = t),
                    (this.textArea.selectionStart = this.textArea.selectionEnd));
                },
              },
              {
                key: "selected",
                get: function () {
                  return this.props.defaultValue
                    .split(",")
                    .map(function (e) {
                      return void 0 !== e && e.trim();
                    })
                    .filter(function (e) {
                      return e.length > 0;
                    });
                },
              },
              {
                key: "isTopOfSearchResults",
                get: function () {
                  return this.state.selectedIndex <= 0;
                },
              },
              {
                key: "isBottomOfSearchResults",
                get: function () {
                  var e = this.state;
                  return e.selectedIndex >= e.searchResults.length - 1;
                },
              },
              {
                key: "isSearchResultSelected",
                get: function () {
                  return this.state.selectedIndex > -1;
                },
              },
              {
                key: "insertTag",
                value: function (e) {
                  var t = document.getElementById("tag-input"),
                    n = this.props.maxTags,
                    r = this.getRangeBetweenCommas(t.value, t.selectionStart),
                    a = r[1] === t.value.length,
                    o = this.selected.length === n,
                    i = e;
                  a && !o && (i = "".concat(i, ", "));
                  var c =
                    t.value.slice(0, r[0]) +
                    i +
                    t.value.slice(r[1], t.value.length);
                  this.props.onInput(c),
                    this.resetSearchResults(),
                    this.clearSelectedSearchResult();
                },
              },
              {
                key: "search",
                value: function (e) {
                  var t = this;
                  if ("" === e)
                    return new Promise(function (e) {
                      setTimeout(function () {
                        t.resetSearchResults(), e();
                      }, 5);
                    });
                  var n = this.props.listing,
                    r = { name: e };
                  return Object(i.b)("tags", r).then(function (r) {
                    if (!0 === n) {
                      var a = (
                          t.state.additionalTags[t.props.category] || []
                        ).filter(function (t) {
                          return t.includes(e);
                        }),
                        o = r.result;
                      a.forEach(function (e) {
                        o.includes(e) || o.push({ name: e });
                      });
                    }
                    t.setState({
                      searchResults: r.result.filter(function (e) {
                        return !t.selected.includes(e.name);
                      }),
                    });
                  });
                },
              },
              {
                key: "resetSearchResults",
                value: function () {
                  this.setState({ searchResults: [] });
                },
              },
              {
                key: "moveUpInSearchResults",
                value: function () {
                  this.setState(function (e) {
                    return { selectedIndex: e.selectedIndex - 1 };
                  });
                },
              },
              {
                key: "moveDownInSearchResults",
                value: function () {
                  this.setState(function (e) {
                    return { selectedIndex: e.selectedIndex + 1 };
                  });
                },
              },
              {
                key: "clearSelectedSearchResult",
                value: function () {
                  this.setState({ selectedIndex: -1 });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = "",
                    n = this.state,
                    a = n.searchResults,
                    o = n.selectedIndex,
                    i = n.showingRulesForTag,
                    c = this.props,
                    s = c.classPrefix,
                    l = c.defaultValue,
                    u = c.maxTags,
                    d = c.listing,
                    f = c.fieldClassName,
                    p = c.onFocus,
                    h = c.pattern,
                    m = document.activeElement,
                    g = a.map(function (t, n) {
                      return Object(r.h)(
                        "div",
                        {
                          tabIndex: "-1",
                          role: "button",
                          className: ""
                            .concat(s, "__tagoptionrow ")
                            .concat(s, "__tagoptionrow--")
                            .concat(o === n ? "active" : "inactive"),
                          onClick: e.handleTagClick,
                          onKeyDown: e.handleTagEnter,
                          "data-content": t.name,
                        },
                        Object(r.h)(
                          "span",
                          { className: "".concat(s, "__tagname") },
                          t.name
                        ),
                        t.rules_html && t.rules_html.length > 0
                          ? Object(r.h)(
                              "button",
                              {
                                type: "button",
                                className: "".concat(
                                  s,
                                  "__tagsoptionrulesbutton"
                                ),
                                onClick: e.handleRulesClick,
                                "data-content": t.name,
                              },
                              i === t.name ? "Hide Rules" : "View Rules"
                            )
                          : "",
                        Object(r.h)("div", {
                          className: ""
                            .concat(s, "__tagrules--")
                            .concat(i === t.name ? "active" : "inactive"),
                          dangerouslySetInnerHTML: { __html: t.rules_html },
                        })
                      );
                    });
                  return (
                    a.length > 0 &&
                      ("tag-input" === m.id ||
                        m.classList.contains(
                          "articleform__tagsoptionrulesbutton"
                        ) ||
                        m.classList.contains("articleform__tagoptionrow")) &&
                      (t = Object(r.h)(
                        "div",
                        { className: "".concat(s, "__tagsoptions") },
                        g,
                        Object(r.h)(
                          "div",
                          { className: "".concat(s, "__tagsoptionsbottomrow") },
                          "Some tags have rules and guidelines determined by community moderators"
                        )
                      )),
                    Object(r.h)(
                      "div",
                      {
                        className: "".concat(s, "__tagswrapper crayons-field"),
                      },
                      d &&
                        Object(r.h)(
                          "label",
                          { htmlFor: "Tags", class: "crayons-field__label" },
                          "Tags"
                        ),
                      Object(r.h)("input", {
                        "data-testid": "tag-input",
                        "aria-label": "Post Tags",
                        id: "tag-input",
                        type: "text",
                        ref: function (t) {
                          return (e.textArea = t), e.textArea;
                        },
                        className: "".concat(
                          "".concat(f, " ").concat(s),
                          "__tags"
                        ),
                        name: "listing[tag_list]",
                        placeholder: "Add up to ".concat(u, " tags..."),
                        autoComplete: "off",
                        value: l,
                        onInput: this.handleInput,
                        onKeyDown: this.handleKeyDown,
                        onBlur: this.handleFocusChange,
                        onFocus: p,
                        pattern: h,
                      }),
                      t
                    )
                  );
                },
              },
            ]) && l(t.prototype, n),
            a && l(t, a),
            c
          );
        })(r.Component);
      _.propTypes = {
        defaultValue: o.a.string.isRequired,
        onInput: o.a.func.isRequired,
        maxTags: o.a.number.isRequired,
        classPrefix: o.a.string.isRequired,
        fieldClassName: o.a.string.isRequired,
        listing: o.a.string.isRequired,
        category: o.a.string.isRequired,
        onFocus: o.a.func.isRequired,
        pattern: o.a.string.isRequired,
      };
    },
    37: function (e, t, n) {
      "use strict";
      n.d(t, "b", function () {
        return c;
      }),
        n.d(t, "a", function () {
          return s;
        });
      var r = n(0),
        a = n(2);
      function o(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if (
              "undefined" === typeof Symbol ||
              !(Symbol.iterator in Object(e))
            )
              return;
            var n = [],
              r = !0,
              a = !1,
              o = void 0;
            try {
              for (
                var i, c = e[Symbol.iterator]();
                !(r = (i = c.next()).done) &&
                (n.push(i.value), !t || n.length !== t);
                r = !0
              );
            } catch (s) {
              (a = !0), (o = s);
            } finally {
              try {
                r || null == c.return || c.return();
              } finally {
                if (a) throw o;
              }
            }
            return n;
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return i(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return i(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function i(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function c(e) {
        var t = e.onDragOver,
          n = e.onDragExit,
          r = e.onDrop,
          i = o(Object(a.j)(null), 2),
          c = i[0],
          s = i[1];
        return (
          Object(a.d)(
            function () {
              if (c) {
                var e = function (e) {
                  return e.preventDefault();
                };
                return (
                  document.addEventListener("dragover", e),
                  document.addEventListener("drop", e),
                  c.addEventListener("dragover", t),
                  c.addEventListener("dragexit", n),
                  c.addEventListener("dragleave", n),
                  c.addEventListener("drop", r),
                  function () {
                    document.removeEventListener("dragover", e),
                      document.removeEventListener("drop", e),
                      c.removeEventListener("dragover", t),
                      c.removeEventListener("dragexit", n),
                      c.removeEventListener("dragleave", n),
                      c.removeEventListener("drop", r);
                  }
                );
              }
            },
            [c, t, n, r]
          ),
          { setElement: s }
        );
      }
      function s(e) {
        var t = e.children,
          n = e.onDragOver,
          o = e.onDragExit,
          i = e.onDrop;
        if (!t)
          throw new Error(
            "The <DragAndDropZone /> component children prop is null or was not specified."
          );
        var s = c({ onDragOver: n, onDragExit: o, onDrop: i }).setElement,
          l = Object(a.i)(null);
        return l.current && s(l.current), Object(r.cloneElement)(t, { ref: l });
      }
    },
    4: function (e, t, n) {
      "use strict";
      n.d(t, "g", function () {
        return o;
      }),
        n.d(t, "c", function () {
          return i.a;
        }),
        n.d(t, "d", function () {
          return c.a;
        }),
        n.d(t, "f", function () {
          return s.a;
        }),
        n.d(t, "b", function () {
          return l.b;
        }),
        n.d(t, "a", function () {
          return l.a;
        }),
        n.d(t, "e", function () {
          return u;
        });
      var r = n(1),
        a = n.n(r),
        o = a.a.shape({
          id: a.a.string.isRequired,
          name: a.a.string.isRequired,
          profile_image_url: a.a.string.isRequired,
          summary: a.a.string.isRequired,
        }),
        i = n(9),
        c = n(6),
        s = n(7),
        l = n(11),
        u = a.a.shape({
          tags: a.a.arrayOf(a.a.string).isRequired,
          onClick: a.a.func.isRequired,
          onKeyPress: a.a.func.isRequired,
        });
    },
    46: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return c;
      }),
        n.d(t, "b", function () {
          return s;
        });
      var r = n(0),
        a = n(1),
        o = n.n(a),
        i = n(34),
        c = "[0-9A-Za-z, ]+",
        s = function (e) {
          var t = e.defaultValue,
            n = e.onInput,
            a = e.switchHelpContext,
            o = e.tagFormat,
            s = void 0 === o ? c : o;
          return Object(r.h)(
            "div",
            { className: "crayons-article-form__tagsfield" },
            Object(r.h)(i.a, {
              defaultValue: t,
              maxTags: "4",
              onInput: n,
              onFocus: a,
              classPrefix: "crayons-article-form",
              fieldClassName:
                "crayons-textfield crayons-textfield--ghost ff-monospace",
              pattern: s,
            })
          );
        };
      (s.propTypes = {
        onInput: o.a.func.isRequired,
        defaultValue: o.a.string.isRequired,
        switchHelpContext: o.a.func.isRequired,
      }),
        (s.displayName = "TagsField");
    },
    47: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return l;
      });
      var r = n(0),
        a = n(1),
        o = n.n(a),
        i = n(4);
      function c(e) {
        return (
          (function (e) {
            if (Array.isArray(e)) return s(e);
          })(e) ||
          (function (e) {
            if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e))
              return Array.from(e);
          })(e) ||
          (function (e, t) {
            if (!e) return;
            if ("string" === typeof e) return s(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return s(e, t);
          })(e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function s(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var l = function (e) {
        var t = e.name,
          n = e.id,
          a = e.className,
          o = e.organizations,
          i = e.organizationId,
          s = e.onToggle,
          l = e.emptyLabel;
        return Object(r.h)(
          "select",
          {
            "aria-label": "Select an organization",
            name: t,
            id: n,
            className: a,
            onBlur: s,
          },
          (function (e, t, n) {
            var a = e.map(function (e) {
              return t === e.id
                ? Object(r.h)("option", { value: e.id, selected: !0 }, e.name)
                : Object(r.h)("option", { value: e.id }, e.name);
            });
            return [
              null === t
                ? Object(r.h)("option", { value: "", selected: !0 }, n)
                : Object(r.h)("option", { value: "" }, n),
            ].concat(c(a));
          })(o, i, l)
        );
      };
      (l.defaultProps = { emptyLabel: "None" }),
        (l.propTypes = {
          name: o.a.string.isRequired,
          id: o.a.string.isRequired,
          className: o.a.string.isRequired,
          emptyLabel: o.a.string,
          onToggle: o.a.func.isRequired,
          organizationId: o.a.number.isRequired,
          organizations: o.a.arrayOf(i.d).isRequired,
        });
    },
    5: function (e, t, n) {
      "use strict";
      function r(e) {
        if (e.ok) return e;
        try {
          e.json().then(function (e) {
            throw new Error(e.error);
          });
        } catch (t) {
          throw t instanceof SyntaxError ? new Error(e.statusText) : t;
        }
      }
      n.d(t, "a", function () {
        return r;
      }),
        n.d(t, "b", function () {
          return a.a;
        });
      var a = n(14);
    },
    6: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return o;
      });
      var r = n(1),
        a = n.n(r),
        o = a.a.shape({
          id: a.a.number.isRequired,
          name: a.a.string.isRequired,
          slug: a.a.string.isRequired,
          profile_image_90: a.a.string.isRequired,
        });
    },
    7: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return o;
      });
      var r = n(1),
        a = n.n(r),
        o = a.a.shape({
          id: a.a.number.isRequired,
          name: a.a.string.isRequired,
          hotness_score: a.a.number.isRequired,
          points: a.a.number.isRequired,
          bg_color_hex: a.a.string.isRequired,
          text_color_hex: a.a.string.isRequired,
        });
    },
    8: function (e, t, n) {
      "use strict";
      var r = n(29);
      n.d(t, "a", function () {
        return r.a;
      }),
        n.d(t, "b", function () {
          return r.b;
        });
      n(23);
    },
    9: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return o;
      });
      var r = n(1),
        a = n.n(r),
        o = a.a.oneOfType([a.a.arrayOf(a.a.node), a.a.node]);
    },
  },
  [[247, 43, 1, 80]],
]);
//# sourceMappingURL=articleForm-e265299f71fbd1be3872.chunk.js.map

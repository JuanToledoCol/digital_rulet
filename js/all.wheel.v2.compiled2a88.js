var PromotionsMixin = {
  created: function () {
    console.log("created PromotionsMixin");
  },

  methods: {
    createPromotion: function (type, name, config, design, prizes, callback) {
      $.ajax({
        method: "POST",
        dataType: "json",
        url: "/promotions/create",
        data: {
          type: type,
          name: name,
          promotion: config,
          template: design,
          prizes: prizes,
          is_ajax: true,
          lang: window.locale ? window.locale : "",
        },
        success: function (r) {
          callback && callback(r);
        },
        error: function (jqXhr, textStatus, errorMessage) {},
      });
    },
  },
};

!(function () {
  "use strict";
  var e =
      "undefined" != typeof window && void 0 !== window.document
        ? window.document
        : {},
    n = "undefined" != typeof module && module.exports,
    r = (function () {
      for (
        var n,
          r = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          l = 0,
          t = r.length,
          u = {};
        l < t;
        l++
      )
        if ((n = r[l]) && n[1] in e) {
          for (l = 0; l < n.length; l++) u[r[0][l]] = n[l];
          return u;
        }
      return !1;
    })(),
    l = { change: r.fullscreenchange, error: r.fullscreenerror },
    t = {
      request: function (n) {
        return new Promise(
          function (l, t) {
            var u = function () {
              this.off("change", u), l();
            }.bind(this);
            this.on("change", u);
            var c = (n = n || e.documentElement)[r.requestFullscreen]();
            c instanceof Promise && c.then(u).catch(t);
          }.bind(this),
        );
      },
      exit: function () {
        return new Promise(
          function (n, l) {
            if (this.isFullscreen) {
              var t = function () {
                this.off("change", t), n();
              }.bind(this);
              this.on("change", t);
              var u = e[r.exitFullscreen]();
              u instanceof Promise && u.then(t).catch(l);
            } else n();
          }.bind(this),
        );
      },
      toggle: function (e) {
        return this.isFullscreen ? this.exit() : this.request(e);
      },
      onchange: function (e) {
        this.on("change", e);
      },
      onerror: function (e) {
        this.on("error", e);
      },
      on: function (n, r) {
        var t = l[n];
        t && e.addEventListener(t, r, !1);
      },
      off: function (n, r) {
        var t = l[n];
        t && e.removeEventListener(t, r, !1);
      },
      raw: r,
    };
  r
    ? (Object.defineProperties(t, {
        isFullscreen: {
          get: function () {
            return Boolean(e[r.fullscreenElement]);
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return e[r.fullscreenElement];
          },
        },
        isEnabled: {
          enumerable: !0,
          get: function () {
            return Boolean(e[r.fullscreenEnabled]);
          },
        },
      }),
      n ? (module.exports = t) : (window.screenfull = t))
    : n
      ? (module.exports = { isEnabled: !1 })
      : (window.screenfull = { isEnabled: !1 });
})();

/*!
 * VERSION: 1.18.0
 * DATE: 2015-09-05
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (t, e, i) {
      var s = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        r = function (t, e, i) {
          var s,
            r,
            n = t.cycle;
          for (s in n)
            (r = n[s]),
              (t[s] =
                "function" == typeof r ? r.call(e[i], i) : r[i % r.length]);
          delete t.cycle;
        },
        n = function (t, e, s) {
          i.call(this, t, e, s),
            (this._cycle = 0),
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._dirty = !0),
            (this.render = n.prototype.render);
        },
        a = 1e-10,
        o = i._internals,
        l = o.isSelector,
        h = o.isArray,
        _ = (n.prototype = i.to({}, 0.1, {})),
        u = [];
      (n.version = "1.18.0"),
        (_.constructor = n),
        (_.kill()._gc = !1),
        (n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf),
        (n.getTweensOf = i.getTweensOf),
        (n.lagSmoothing = i.lagSmoothing),
        (n.ticker = i.ticker),
        (n.render = i.render),
        (_.invalidate = function () {
          return (
            (this._yoyo = this.vars.yoyo === !0),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._uncache(!0),
            i.prototype.invalidate.call(this)
          );
        }),
        (_.updateTo = function (t, e) {
          var s,
            r = this.ratio,
            n = this.vars.immediateRender || t.immediateRender;
          e &&
            this._startTime < this._timeline._time &&
            ((this._startTime = this._timeline._time),
            this._uncache(!1),
            this._gc
              ? this._enabled(!0, !1)
              : this._timeline.insert(this, this._startTime - this._delay));
          for (s in t) this.vars[s] = t[s];
          if (this._initted || n)
            if (e) (this._initted = !1), n && this.render(0, !0, !0);
            else if (
              (this._gc && this._enabled(!0, !1),
              this._notifyPluginsOfEnabled &&
                this._firstPT &&
                i._onPluginEvent("_onDisable", this),
              this._time / this._duration > 0.998)
            ) {
              var a = this._time;
              this.render(0, !0, !1),
                (this._initted = !1),
                this.render(a, !0, !1);
            } else if (this._time > 0 || n) {
              (this._initted = !1), this._init();
              for (var o, l = 1 / (1 - r), h = this._firstPT; h; )
                (o = h.s + h.c), (h.c *= l), (h.s = o - h.c), (h = h._next);
            }
          return this;
        }),
        (_.render = function (t, e, i) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          var s,
            r,
            n,
            l,
            h,
            _,
            u,
            c,
            f = this._dirty ? this.totalDuration() : this._totalDuration,
            p = this._time,
            m = this._totalTime,
            d = this._cycle,
            g = this._duration,
            v = this._rawPrevTime;
          if (
            (t >= f
              ? ((this._totalTime = f),
                (this._cycle = this._repeat),
                this._yoyo && 0 !== (1 & this._cycle)
                  ? ((this._time = 0),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(0)
                      : 0))
                  : ((this._time = g),
                    (this.ratio = this._ease._calcEnd
                      ? this._ease.getRatio(1)
                      : 1)),
                this._reversed ||
                  ((s = !0),
                  (r = "onComplete"),
                  (i = i || this._timeline.autoRemoveChildren)),
                0 === g &&
                  (this._initted || !this.vars.lazy || i) &&
                  (this._startTime === this._timeline._duration && (t = 0),
                  (0 === t || 0 > v || v === a) &&
                    v !== t &&
                    ((i = !0), v > a && (r = "onReverseComplete")),
                  (this._rawPrevTime = c = !e || t || v === t ? t : a)))
              : 1e-7 > t
                ? ((this._totalTime = this._time = this._cycle = 0),
                  (this.ratio = this._ease._calcEnd
                    ? this._ease.getRatio(0)
                    : 0),
                  (0 !== m || (0 === g && v > 0)) &&
                    ((r = "onReverseComplete"), (s = this._reversed)),
                  0 > t &&
                    ((this._active = !1),
                    0 === g &&
                      (this._initted || !this.vars.lazy || i) &&
                      (v >= 0 && (i = !0),
                      (this._rawPrevTime = c = !e || t || v === t ? t : a))),
                  this._initted || (i = !0))
                : ((this._totalTime = this._time = t),
                  0 !== this._repeat &&
                    ((l = g + this._repeatDelay),
                    (this._cycle = (this._totalTime / l) >> 0),
                    0 !== this._cycle &&
                      this._cycle === this._totalTime / l &&
                      this._cycle--,
                    (this._time = this._totalTime - this._cycle * l),
                    this._yoyo &&
                      0 !== (1 & this._cycle) &&
                      (this._time = g - this._time),
                    this._time > g
                      ? (this._time = g)
                      : 0 > this._time && (this._time = 0)),
                  this._easeType
                    ? ((h = this._time / g),
                      (_ = this._easeType),
                      (u = this._easePower),
                      (1 === _ || (3 === _ && h >= 0.5)) && (h = 1 - h),
                      3 === _ && (h *= 2),
                      1 === u
                        ? (h *= h)
                        : 2 === u
                          ? (h *= h * h)
                          : 3 === u
                            ? (h *= h * h * h)
                            : 4 === u && (h *= h * h * h * h),
                      (this.ratio =
                        1 === _
                          ? 1 - h
                          : 2 === _
                            ? h
                            : 0.5 > this._time / g
                              ? h / 2
                              : 1 - h / 2))
                    : (this.ratio = this._ease.getRatio(this._time / g))),
            p === this._time && !i && d === this._cycle)
          )
            return (
              m !== this._totalTime &&
                this._onUpdate &&
                (e || this._callback("onUpdate")),
              void 0
            );
          if (!this._initted) {
            if ((this._init(), !this._initted || this._gc)) return;
            if (
              !i &&
              this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration))
            )
              return (
                (this._time = p),
                (this._totalTime = m),
                (this._rawPrevTime = v),
                (this._cycle = d),
                o.lazyTweens.push(this),
                (this._lazy = [t, e]),
                void 0
              );
            this._time && !s
              ? (this.ratio = this._ease.getRatio(this._time / g))
              : s &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._lazy !== !1 && (this._lazy = !1),
              this._active ||
                (!this._paused &&
                  this._time !== p &&
                  t >= 0 &&
                  (this._active = !0)),
              0 === m &&
                (2 === this._initted && t > 0 && this._init(),
                this._startAt &&
                  (t >= 0
                    ? this._startAt.render(t, e, i)
                    : r || (r = "_dummyGS")),
                this.vars.onStart &&
                  (0 !== this._totalTime || 0 === g) &&
                  (e || this._callback("onStart"))),
              n = this._firstPT;
            n;

          )
            n.f
              ? n.t[n.p](n.c * this.ratio + n.s)
              : (n.t[n.p] = n.c * this.ratio + n.s),
              (n = n._next);
          this._onUpdate &&
            (0 > t &&
              this._startAt &&
              this._startTime &&
              this._startAt.render(t, e, i),
            e || ((this._totalTime !== m || s) && this._callback("onUpdate"))),
            this._cycle !== d &&
              (e ||
                this._gc ||
                (this.vars.onRepeat && this._callback("onRepeat"))),
            r &&
              (!this._gc || i) &&
              (0 > t &&
                this._startAt &&
                !this._onUpdate &&
                this._startTime &&
                this._startAt.render(t, e, i),
              s &&
                (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                (this._active = !1)),
              !e && this.vars[r] && this._callback(r),
              0 === g &&
                this._rawPrevTime === a &&
                c !== a &&
                (this._rawPrevTime = 0));
        }),
        (n.to = function (t, e, i) {
          return new n(t, e, i);
        }),
        (n.from = function (t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new n(t, e, i)
          );
        }),
        (n.fromTo = function (t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new n(t, e, s)
          );
        }),
        (n.staggerTo = n.allTo =
          function (t, e, a, o, _, c, f) {
            o = o || 0;
            var p,
              m,
              d,
              g,
              v = a.delay || 0,
              y = [],
              T = function () {
                a.onComplete &&
                  a.onComplete.apply(a.onCompleteScope || this, arguments),
                  _.apply(f || a.callbackScope || this, c || u);
              },
              x = a.cycle,
              w = a.startAt && a.startAt.cycle;
            for (
              h(t) ||
                ("string" == typeof t && (t = i.selector(t) || t),
                l(t) && (t = s(t))),
                t = t || [],
                0 > o && ((t = s(t)), t.reverse(), (o *= -1)),
                p = t.length - 1,
                d = 0;
              p >= d;
              d++
            ) {
              m = {};
              for (g in a) m[g] = a[g];
              if ((x && r(m, t, d), w)) {
                w = m.startAt = {};
                for (g in a.startAt) w[g] = a.startAt[g];
                r(m.startAt, t, d);
              }
              (m.delay = v),
                d === p && _ && (m.onComplete = T),
                (y[d] = new n(t[d], e, m)),
                (v += o);
            }
            return y;
          }),
        (n.staggerFrom = n.allFrom =
          function (t, e, i, s, r, a, o) {
            return (
              (i.runBackwards = !0),
              (i.immediateRender = 0 != i.immediateRender),
              n.staggerTo(t, e, i, s, r, a, o)
            );
          }),
        (n.staggerFromTo = n.allFromTo =
          function (t, e, i, s, r, a, o, l) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              n.staggerTo(t, e, s, r, a, o, l)
            );
          }),
        (n.delayedCall = function (t, e, i, s, r) {
          return new n(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            useFrames: r,
            overwrite: 0,
          });
        }),
        (n.set = function (t, e) {
          return new n(t, 0, e);
        }),
        (n.isTweening = function (t) {
          return i.getTweensOf(t, !0).length > 0;
        });
      var c = function (t, e) {
          for (var s = [], r = 0, n = t._first; n; )
            n instanceof i
              ? (s[r++] = n)
              : (e && (s[r++] = n), (s = s.concat(c(n, e))), (r = s.length)),
              (n = n._next);
          return s;
        },
        f = (n.getAllTweens = function (e) {
          return c(t._rootTimeline, e).concat(c(t._rootFramesTimeline, e));
        });
      (n.killAll = function (t, i, s, r) {
        null == i && (i = !0), null == s && (s = !0);
        var n,
          a,
          o,
          l = f(0 != r),
          h = l.length,
          _ = i && s && r;
        for (o = 0; h > o; o++)
          (a = l[o]),
            (_ ||
              a instanceof e ||
              ((n = a.target === a.vars.onComplete) && s) ||
              (i && !n)) &&
              (t
                ? a.totalTime(a._reversed ? 0 : a.totalDuration())
                : a._enabled(!1, !1));
      }),
        (n.killChildTweensOf = function (t, e) {
          if (null != t) {
            var r,
              a,
              _,
              u,
              c,
              f = o.tweenLookup;
            if (
              ("string" == typeof t && (t = i.selector(t) || t),
              l(t) && (t = s(t)),
              h(t))
            )
              for (u = t.length; --u > -1; ) n.killChildTweensOf(t[u], e);
            else {
              r = [];
              for (_ in f)
                for (a = f[_].target.parentNode; a; )
                  a === t && (r = r.concat(f[_].tweens)), (a = a.parentNode);
              for (c = r.length, u = 0; c > u; u++)
                e && r[u].totalTime(r[u].totalDuration()),
                  r[u]._enabled(!1, !1);
            }
          }
        });
      var p = function (t, i, s, r) {
        (i = i !== !1), (s = s !== !1), (r = r !== !1);
        for (var n, a, o = f(r), l = i && s && r, h = o.length; --h > -1; )
          (a = o[h]),
            (l ||
              a instanceof e ||
              ((n = a.target === a.vars.onComplete) && s) ||
              (i && !n)) &&
              a.paused(t);
      };
      return (
        (n.pauseAll = function (t, e, i) {
          p(!0, t, e, i);
        }),
        (n.resumeAll = function (t, e, i) {
          p(!1, t, e, i);
        }),
        (n.globalTimeScale = function (e) {
          var s = t._rootTimeline,
            r = i.ticker.time;
          return arguments.length
            ? ((e = e || a),
              (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
              (s = t._rootFramesTimeline),
              (r = i.ticker.frame),
              (s._startTime = r - ((r - s._startTime) * s._timeScale) / e),
              (s._timeScale = t._rootTimeline._timeScale = e),
              e)
            : s._timeScale;
        }),
        (_.progress = function (t) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) +
                  this._cycle * (this._duration + this._repeatDelay),
                !1,
              )
            : this._time / this.duration();
        }),
        (_.totalProgress = function (t) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, !1)
            : this._totalTime / this.totalDuration();
        }),
        (_.time = function (t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              t > this._duration && (t = this._duration),
              this._yoyo && 0 !== (1 & this._cycle)
                ? (t =
                    this._duration -
                    t +
                    this._cycle * (this._duration + this._repeatDelay))
                : 0 !== this._repeat &&
                  (t += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(t, e))
            : this._time;
        }),
        (_.duration = function (e) {
          return arguments.length
            ? t.prototype.duration.call(this, e)
            : this._duration;
        }),
        (_.totalDuration = function (t) {
          return arguments.length
            ? -1 === this._repeat
              ? this
              : this.duration(
                  (t - this._repeat * this._repeatDelay) / (this._repeat + 1),
                )
            : (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat
                    ? 999999999999
                    : this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (_.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t), this._uncache(!0))
            : this._repeat;
        }),
        (_.repeatDelay = function (t) {
          return arguments.length
            ? ((this._repeatDelay = t), this._uncache(!0))
            : this._repeatDelay;
        }),
        (_.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        n
      );
    },
    !0,
  ),
    _gsScope._gsDefine(
      "TimelineLite",
      ["core.Animation", "core.SimpleTimeline", "TweenLite"],
      function (t, e, i) {
        var s = function (t) {
            e.call(this, t),
              (this._labels = {}),
              (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
              (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
              (this._sortChildren = !0),
              (this._onUpdate = this.vars.onUpdate);
            var i,
              s,
              r = this.vars;
            for (s in r)
              (i = r[s]),
                l(i) &&
                  -1 !== i.join("").indexOf("{self}") &&
                  (r[s] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
          },
          r = 1e-10,
          n = i._internals,
          a = (s._internals = {}),
          o = n.isSelector,
          l = n.isArray,
          h = n.lazyTweens,
          _ = n.lazyRender,
          u = _gsScope._gsDefine.globals,
          c = function (t) {
            var e,
              i = {};
            for (e in t) i[e] = t[e];
            return i;
          },
          f = function (t, e, i) {
            var s,
              r,
              n = t.cycle;
            for (s in n)
              (r = n[s]),
                (t[s] =
                  "function" == typeof r ? r.call(e[i], i) : r[i % r.length]);
            delete t.cycle;
          },
          p = (a.pauseCallback = function () {}),
          m = function (t) {
            var e,
              i = [],
              s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i;
          },
          d = (s.prototype = new e());
        return (
          (s.version = "1.18.0"),
          (d.constructor = s),
          (d.kill()._gc = d._forcingPlayhead = d._hasPause = !1),
          (d.to = function (t, e, s, r) {
            var n = (s.repeat && u.TweenMax) || i;
            return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
          }),
          (d.from = function (t, e, s, r) {
            return this.add(((s.repeat && u.TweenMax) || i).from(t, e, s), r);
          }),
          (d.fromTo = function (t, e, s, r, n) {
            var a = (r.repeat && u.TweenMax) || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
          }),
          (d.staggerTo = function (t, e, r, n, a, l, h, _) {
            var u,
              p,
              d = new s({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: _,
                smoothChildTiming: this.smoothChildTiming,
              }),
              g = r.cycle;
            for (
              "string" == typeof t && (t = i.selector(t) || t),
                t = t || [],
                o(t) && (t = m(t)),
                n = n || 0,
                0 > n && ((t = m(t)), t.reverse(), (n *= -1)),
                p = 0;
              t.length > p;
              p++
            )
              (u = c(r)),
                u.startAt &&
                  ((u.startAt = c(u.startAt)),
                  u.startAt.cycle && f(u.startAt, t, p)),
                g && f(u, t, p),
                d.to(t[p], e, u, p * n);
            return this.add(d, a);
          }),
          (d.staggerFrom = function (t, e, i, s, r, n, a, o) {
            return (
              (i.immediateRender = 0 != i.immediateRender),
              (i.runBackwards = !0),
              this.staggerTo(t, e, i, s, r, n, a, o)
            );
          }),
          (d.staggerFromTo = function (t, e, i, s, r, n, a, o, l) {
            return (
              (s.startAt = i),
              (s.immediateRender =
                0 != s.immediateRender && 0 != i.immediateRender),
              this.staggerTo(t, e, s, r, n, a, o, l)
            );
          }),
          (d.call = function (t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r);
          }),
          (d.set = function (t, e, s) {
            return (
              (s = this._parseTimeOrLabel(s, 0, !0)),
              null == e.immediateRender &&
                (e.immediateRender = s === this._time && !this._paused),
              this.add(new i(t, 0, e), s)
            );
          }),
          (s.exportRoot = function (t, e) {
            (t = t || {}),
              null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r,
              n,
              a = new s(t),
              o = a._timeline;
            for (
              null == e && (e = !0),
                o._remove(a, !0),
                a._startTime = 0,
                a._rawPrevTime = a._time = a._totalTime = o._time,
                r = o._first;
              r;

            )
              (n = r._next),
                (e && r instanceof i && r.target === r.vars.onComplete) ||
                  a.add(r, r._startTime - r._delay),
                (r = n);
            return o.add(a, 0), a;
          }),
          (d.add = function (r, n, a, o) {
            var h, _, u, c, f, p;
            if (
              ("number" != typeof n &&
                (n = this._parseTimeOrLabel(n, 0, !0, r)),
              !(r instanceof t))
            ) {
              if (r instanceof Array || (r && r.push && l(r))) {
                for (
                  a = a || "normal", o = o || 0, h = n, _ = r.length, u = 0;
                  _ > u;
                  u++
                )
                  l((c = r[u])) && (c = new s({ tweens: c })),
                    this.add(c, h),
                    "string" != typeof c &&
                      "function" != typeof c &&
                      ("sequence" === a
                        ? (h = c._startTime + c.totalDuration() / c._timeScale)
                        : "start" === a && (c._startTime -= c.delay())),
                    (h += o);
                return this._uncache(!0);
              }
              if ("string" == typeof r) return this.addLabel(r, n);
              if ("function" != typeof r)
                throw (
                  "Cannot add " +
                  r +
                  " into the timeline; it is not a tween, timeline, function, or string."
                );
              r = i.delayedCall(0, r);
            }
            if (
              (e.prototype.add.call(this, r, n),
              (this._gc || this._time === this._duration) &&
                !this._paused &&
                this._duration < this.duration())
            )
              for (f = this, p = f.rawTime() > r._startTime; f._timeline; )
                p && f._timeline.smoothChildTiming
                  ? f.totalTime(f._totalTime, !0)
                  : f._gc && f._enabled(!0, !1),
                  (f = f._timeline);
            return this;
          }),
          (d.remove = function (e) {
            if (e instanceof t) {
              this._remove(e, !1);
              var i = (e._timeline = e.vars.useFrames
                ? t._rootFramesTimeline
                : t._rootTimeline);
              return (
                (e._startTime =
                  (e._paused ? e._pauseTime : i._time) -
                  (e._reversed
                    ? e.totalDuration() - e._totalTime
                    : e._totalTime) /
                    e._timeScale),
                this
              );
            }
            if (e instanceof Array || (e && e.push && l(e))) {
              for (var s = e.length; --s > -1; ) this.remove(e[s]);
              return this;
            }
            return "string" == typeof e
              ? this.removeLabel(e)
              : this.kill(null, e);
          }),
          (d._remove = function (t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return (
              s
                ? this._time > s._startTime + s._totalDuration / s._timeScale &&
                  ((this._time = this.duration()),
                  (this._totalTime = this._totalDuration))
                : (this._time =
                    this._totalTime =
                    this._duration =
                    this._totalDuration =
                      0),
              this
            );
          }),
          (d.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
          }),
          (d.insert = d.insertMultiple =
            function (t, e, i, s) {
              return this.add(t, e || 0, i, s);
            }),
          (d.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
          }),
          (d.addLabel = function (t, e) {
            return (this._labels[t] = this._parseTimeOrLabel(e)), this;
          }),
          (d.addPause = function (t, e, s, r) {
            var n = i.delayedCall(0, p, s, r || this);
            return (
              (n.vars.onComplete = n.vars.onReverseComplete = e),
              (n.data = "isPause"),
              (this._hasPause = !0),
              this.add(n, t)
            );
          }),
          (d.removeLabel = function (t) {
            return delete this._labels[t], this;
          }),
          (d.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1;
          }),
          (d._parseTimeOrLabel = function (e, i, s, r) {
            var n;
            if (r instanceof t && r.timeline === this) this.remove(r);
            else if (r && (r instanceof Array || (r.push && l(r))))
              for (n = r.length; --n > -1; )
                r[n] instanceof t &&
                  r[n].timeline === this &&
                  this.remove(r[n]);
            if ("string" == typeof i)
              return this._parseTimeOrLabel(
                i,
                s && "number" == typeof e && null == this._labels[i]
                  ? e - this.duration()
                  : 0,
                s,
              );
            if (
              ((i = i || 0),
              "string" != typeof e || (!isNaN(e) && null == this._labels[e]))
            )
              null == e && (e = this.duration());
            else {
              if (((n = e.indexOf("=")), -1 === n))
                return null == this._labels[e]
                  ? s
                    ? (this._labels[e] = this.duration() + i)
                    : i
                  : this._labels[e] + i;
              (i =
                parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1))),
                (e =
                  n > 1
                    ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s)
                    : this.duration());
            }
            return Number(e) + i;
          }),
          (d.seek = function (t, e) {
            return this.totalTime(
              "number" == typeof t ? t : this._parseTimeOrLabel(t),
              e !== !1,
            );
          }),
          (d.stop = function () {
            return this.paused(!0);
          }),
          (d.gotoAndPlay = function (t, e) {
            return this.play(t, e);
          }),
          (d.gotoAndStop = function (t, e) {
            return this.pause(t, e);
          }),
          (d.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              n,
              a,
              o,
              l,
              u,
              c = this._dirty ? this.totalDuration() : this._totalDuration,
              f = this._time,
              p = this._startTime,
              m = this._timeScale,
              d = this._paused;
            if (t >= c)
              (this._totalTime = this._time = c),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((n = !0),
                  (o = "onComplete"),
                  (l = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    (0 === t ||
                      0 > this._rawPrevTime ||
                      this._rawPrevTime === r) &&
                    this._rawPrevTime !== t &&
                    this._first &&
                    ((l = !0),
                    this._rawPrevTime > r && (o = "onReverseComplete"))),
                (this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                (t = c + 1e-4);
            else if (1e-7 > t)
              if (
                ((this._totalTime = this._time = 0),
                (0 !== f ||
                  (0 === this._duration &&
                    this._rawPrevTime !== r &&
                    (this._rawPrevTime > 0 ||
                      (0 > t && this._rawPrevTime >= 0)))) &&
                  ((o = "onReverseComplete"), (n = this._reversed)),
                0 > t)
              )
                (this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed
                    ? ((l = n = !0), (o = "onReverseComplete"))
                    : this._rawPrevTime >= 0 && this._first && (l = !0),
                  (this._rawPrevTime = t);
              else {
                if (
                  ((this._rawPrevTime =
                    this._duration || !e || t || this._rawPrevTime === t
                      ? t
                      : r),
                  0 === t && n)
                )
                  for (s = this._first; s && 0 === s._startTime; )
                    s._duration || (n = !1), (s = s._next);
                (t = 0), this._initted || (l = !0);
              }
            else {
              if (this._hasPause && !this._forcingPlayhead && !e) {
                if (t >= f)
                  for (s = this._first; s && t >= s._startTime && !u; )
                    s._duration ||
                      "isPause" !== s.data ||
                      s.ratio ||
                      (0 === s._startTime && 0 === this._rawPrevTime) ||
                      (u = s),
                      (s = s._next);
                else
                  for (s = this._last; s && s._startTime >= t && !u; )
                    s._duration ||
                      ("isPause" === s.data && s._rawPrevTime > 0 && (u = s)),
                      (s = s._prev);
                u &&
                  ((this._time = t = u._startTime),
                  (this._totalTime =
                    t +
                    this._cycle * (this._totalDuration + this._repeatDelay)));
              }
              this._totalTime = this._time = this._rawPrevTime = t;
            }
            if ((this._time !== f && this._first) || i || l || u) {
              if (
                (this._initted || (this._initted = !0),
                this._active ||
                  (!this._paused &&
                    this._time !== f &&
                    t > 0 &&
                    (this._active = !0)),
                0 === f &&
                  this.vars.onStart &&
                  0 !== this._time &&
                  (e || this._callback("onStart")),
                this._time >= f)
              )
                for (
                  s = this._first;
                  s && ((a = s._next), !this._paused || d);

                )
                  (s._active ||
                    (s._startTime <= this._time && !s._paused && !s._gc)) &&
                    (u === s && this.pause(),
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i,
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i)),
                    (s = a);
              else
                for (
                  s = this._last;
                  s && ((a = s._prev), !this._paused || d);

                ) {
                  if (
                    s._active ||
                    (f >= s._startTime && !s._paused && !s._gc)
                  ) {
                    if (u === s) {
                      for (u = s._prev; u && u.endTime() > this._time; )
                        u.render(
                          u._reversed
                            ? u.totalDuration() -
                                (t - u._startTime) * u._timeScale
                            : (t - u._startTime) * u._timeScale,
                          e,
                          i,
                        ),
                          (u = u._prev);
                      (u = null), this.pause();
                    }
                    s._reversed
                      ? s.render(
                          (s._dirty ? s.totalDuration() : s._totalDuration) -
                            (t - s._startTime) * s._timeScale,
                          e,
                          i,
                        )
                      : s.render((t - s._startTime) * s._timeScale, e, i);
                  }
                  s = a;
                }
              this._onUpdate &&
                (e || (h.length && _(), this._callback("onUpdate"))),
                o &&
                  (this._gc ||
                    ((p === this._startTime || m !== this._timeScale) &&
                      (0 === this._time || c >= this.totalDuration()) &&
                      (n &&
                        (h.length && _(),
                        this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !e && this.vars[o] && this._callback(o))));
            }
          }),
          (d._hasPausedChild = function () {
            for (var t = this._first; t; ) {
              if (t._paused || (t instanceof s && t._hasPausedChild()))
                return !0;
              t = t._next;
            }
            return !1;
          }),
          (d.getChildren = function (t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a; )
              r > a._startTime ||
                (a instanceof i
                  ? e !== !1 && (n[o++] = a)
                  : (s !== !1 && (n[o++] = a),
                    t !== !1 &&
                      ((n = n.concat(a.getChildren(!0, e, s))),
                      (o = n.length)))),
                (a = a._next);
            return n;
          }),
          (d.getTweensOf = function (t, e) {
            var s,
              r,
              n = this._gc,
              a = [],
              o = 0;
            for (
              n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length;
              --r > -1;

            )
              (s[r].timeline === this || (e && this._contains(s[r]))) &&
                (a[o++] = s[r]);
            return n && this._enabled(!1, !0), a;
          }),
          (d.recent = function () {
            return this._recent;
          }),
          (d._contains = function (t) {
            for (var e = t.timeline; e; ) {
              if (e === this) return !0;
              e = e.timeline;
            }
            return !1;
          }),
          (d.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r; )
              r._startTime >= i && (r._startTime += t), (r = r._next);
            if (e) for (s in n) n[s] >= i && (n[s] += t);
            return this._uncache(!0);
          }),
          (d._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (
              var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1),
                s = i.length,
                r = !1;
              --s > -1;

            )
              i[s]._kill(t, e) && (r = !0);
            return r;
          }),
          (d.clear = function (t) {
            var e = this.getChildren(!1, !0, !0),
              i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
              e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}), this._uncache(!0);
          }),
          (d.invalidate = function () {
            for (var e = this._first; e; ) e.invalidate(), (e = e._next);
            return t.prototype.invalidate.call(this);
          }),
          (d._enabled = function (t, i) {
            if (t === this._gc)
              for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
            return e.prototype._enabled.call(this, t, i);
          }),
          (d.totalTime = function () {
            this._forcingPlayhead = !0;
            var e = t.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), e;
          }),
          (d.duration = function (t) {
            return arguments.length
              ? (0 !== this.duration() &&
                  0 !== t &&
                  this.timeScale(this._duration / t),
                this)
              : (this._dirty && this.totalDuration(), this._duration);
          }),
          (d.totalDuration = function (t) {
            if (!arguments.length) {
              if (this._dirty) {
                for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                  (e = r._prev),
                    r._dirty && r.totalDuration(),
                    r._startTime > n && this._sortChildren && !r._paused
                      ? this.add(r, r._startTime - r._delay)
                      : (n = r._startTime),
                    0 > r._startTime &&
                      !r._paused &&
                      ((s -= r._startTime),
                      this._timeline.smoothChildTiming &&
                        (this._startTime += r._startTime / this._timeScale),
                      this.shiftChildren(-r._startTime, !1, -9999999999),
                      (n = 0)),
                    (i = r._startTime + r._totalDuration / r._timeScale),
                    i > s && (s = i),
                    (r = e);
                (this._duration = this._totalDuration = s), (this._dirty = !1);
              }
              return this._totalDuration;
            }
            return (
              0 !== this.totalDuration() &&
                0 !== t &&
                this.timeScale(this._totalDuration / t),
              this
            );
          }),
          (d.paused = function (e) {
            if (!e)
              for (var i = this._first, s = this._time; i; )
                i._startTime === s &&
                  "isPause" === i.data &&
                  (i._rawPrevTime = 0),
                  (i = i._next);
            return t.prototype.paused.apply(this, arguments);
          }),
          (d.usesFrames = function () {
            for (var e = this._timeline; e._timeline; ) e = e._timeline;
            return e === t._rootFramesTimeline;
          }),
          (d.rawTime = function () {
            return this._paused
              ? this._totalTime
              : (this._timeline.rawTime() - this._startTime) * this._timeScale;
          }),
          s
        );
      },
      !0,
    ),
    _gsScope._gsDefine(
      "TimelineMax",
      ["TimelineLite", "TweenLite", "easing.Ease"],
      function (t, e, i) {
        var s = function (e) {
            t.call(this, e),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = this.vars.yoyo === !0),
              (this._dirty = !0);
          },
          r = 1e-10,
          n = e._internals,
          a = n.lazyTweens,
          o = n.lazyRender,
          l = new i(null, null, 1, 0),
          h = (s.prototype = new t());
        return (
          (h.constructor = s),
          (h.kill()._gc = !1),
          (s.version = "1.18.0"),
          (h.invalidate = function () {
            return (
              (this._yoyo = this.vars.yoyo === !0),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              t.prototype.invalidate.call(this)
            );
          }),
          (h.addCallback = function (t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i);
          }),
          (h.removeCallback = function (t, e) {
            if (t)
              if (null == e) this._kill(null, t);
              else
                for (
                  var i = this.getTweensOf(t, !1),
                    s = i.length,
                    r = this._parseTimeOrLabel(e);
                  --s > -1;

                )
                  i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this;
          }),
          (h.removePause = function (e) {
            return this.removeCallback(t._internals.pauseCallback, e);
          }),
          (h.tweenTo = function (t, i) {
            i = i || {};
            var s,
              r,
              n,
              a = {
                ease: l,
                useFrames: this.usesFrames(),
                immediateRender: !1,
              };
            for (r in i) a[r] = i[r];
            return (
              (a.time = this._parseTimeOrLabel(t)),
              (s =
                Math.abs(Number(a.time) - this._time) / this._timeScale ||
                0.001),
              (n = new e(this, s, a)),
              (a.onStart = function () {
                n.target.paused(!0),
                  n.vars.time !== n.target.time() &&
                    s === n.duration() &&
                    n.duration(
                      Math.abs(n.vars.time - n.target.time()) /
                        n.target._timeScale,
                    ),
                  i.onStart && n._callback("onStart");
              }),
              n
            );
          }),
          (h.tweenFromTo = function (t, e, i) {
            (i = i || {}),
              (t = this._parseTimeOrLabel(t)),
              (i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                callbackScope: this,
              }),
              (i.immediateRender = i.immediateRender !== !1);
            var s = this.tweenTo(e, i);
            return s.duration(
              Math.abs(s.vars.time - t) / this._timeScale || 0.001,
            );
          }),
          (h.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s,
              n,
              l,
              h,
              _,
              u,
              c,
              f = this._dirty ? this.totalDuration() : this._totalDuration,
              p = this._duration,
              m = this._time,
              d = this._totalTime,
              g = this._startTime,
              v = this._timeScale,
              y = this._rawPrevTime,
              T = this._paused,
              x = this._cycle;
            if (t >= f)
              this._locked ||
                ((this._totalTime = f), (this._cycle = this._repeat)),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((n = !0),
                  (h = "onComplete"),
                  (_ = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    (0 === t || 0 > y || y === r) &&
                    y !== t &&
                    this._first &&
                    ((_ = !0), y > r && (h = "onReverseComplete"))),
                (this._rawPrevTime =
                  this._duration || !e || t || this._rawPrevTime === t ? t : r),
                this._yoyo && 0 !== (1 & this._cycle)
                  ? (this._time = t = 0)
                  : ((this._time = p), (t = p + 1e-4));
            else if (1e-7 > t)
              if (
                (this._locked || (this._totalTime = this._cycle = 0),
                (this._time = 0),
                (0 !== m ||
                  (0 === p &&
                    y !== r &&
                    (y > 0 || (0 > t && y >= 0)) &&
                    !this._locked)) &&
                  ((h = "onReverseComplete"), (n = this._reversed)),
                0 > t)
              )
                (this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed
                    ? ((_ = n = !0), (h = "onReverseComplete"))
                    : y >= 0 && this._first && (_ = !0),
                  (this._rawPrevTime = t);
              else {
                if (
                  ((this._rawPrevTime =
                    p || !e || t || this._rawPrevTime === t ? t : r),
                  0 === t && n)
                )
                  for (s = this._first; s && 0 === s._startTime; )
                    s._duration || (n = !1), (s = s._next);
                (t = 0), this._initted || (_ = !0);
              }
            else if (
              (0 === p && 0 > y && (_ = !0),
              (this._time = this._rawPrevTime = t),
              this._locked ||
                ((this._totalTime = t),
                0 !== this._repeat &&
                  ((u = p + this._repeatDelay),
                  (this._cycle = (this._totalTime / u) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / u &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * u),
                  this._yoyo &&
                    0 !== (1 & this._cycle) &&
                    (this._time = p - this._time),
                  this._time > p
                    ? ((this._time = p), (t = p + 1e-4))
                    : 0 > this._time
                      ? (this._time = t = 0)
                      : (t = this._time))),
              this._hasPause && !this._forcingPlayhead && !e)
            ) {
              if (((t = this._time), t >= m))
                for (s = this._first; s && t >= s._startTime && !c; )
                  s._duration ||
                    "isPause" !== s.data ||
                    s.ratio ||
                    (0 === s._startTime && 0 === this._rawPrevTime) ||
                    (c = s),
                    (s = s._next);
              else
                for (s = this._last; s && s._startTime >= t && !c; )
                  s._duration ||
                    ("isPause" === s.data && s._rawPrevTime > 0 && (c = s)),
                    (s = s._prev);
              c &&
                ((this._time = t = c._startTime),
                (this._totalTime =
                  t + this._cycle * (this._totalDuration + this._repeatDelay)));
            }
            if (this._cycle !== x && !this._locked) {
              var w = this._yoyo && 0 !== (1 & x),
                b = w === (this._yoyo && 0 !== (1 & this._cycle)),
                P = this._totalTime,
                k = this._cycle,
                S = this._rawPrevTime,
                R = this._time;
              if (
                ((this._totalTime = x * p),
                x > this._cycle ? (w = !w) : (this._totalTime += p),
                (this._time = m),
                (this._rawPrevTime = 0 === p ? y - 1e-4 : y),
                (this._cycle = x),
                (this._locked = !0),
                (m = w ? 0 : p),
                this.render(m, e, 0 === p),
                e ||
                  this._gc ||
                  (this.vars.onRepeat && this._callback("onRepeat")),
                b && ((m = w ? p + 1e-4 : -1e-4), this.render(m, !0, !1)),
                (this._locked = !1),
                this._paused && !T)
              )
                return;
              (this._time = R),
                (this._totalTime = P),
                (this._cycle = k),
                (this._rawPrevTime = S);
            }
            if (!((this._time !== m && this._first) || i || _ || c))
              return (
                d !== this._totalTime &&
                  this._onUpdate &&
                  (e || this._callback("onUpdate")),
                void 0
              );
            if (
              (this._initted || (this._initted = !0),
              this._active ||
                (!this._paused &&
                  this._totalTime !== d &&
                  t > 0 &&
                  (this._active = !0)),
              0 === d &&
                this.vars.onStart &&
                0 !== this._totalTime &&
                (e || this._callback("onStart")),
              this._time >= m)
            )
              for (s = this._first; s && ((l = s._next), !this._paused || T); )
                (s._active ||
                  (s._startTime <= this._time && !s._paused && !s._gc)) &&
                  (c === s && this.pause(),
                  s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i,
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i)),
                  (s = l);
            else
              for (s = this._last; s && ((l = s._prev), !this._paused || T); ) {
                if (s._active || (m >= s._startTime && !s._paused && !s._gc)) {
                  if (c === s) {
                    for (c = s._prev; c && c.endTime() > this._time; )
                      c.render(
                        c._reversed
                          ? c.totalDuration() -
                              (t - c._startTime) * c._timeScale
                          : (t - c._startTime) * c._timeScale,
                        e,
                        i,
                      ),
                        (c = c._prev);
                    (c = null), this.pause();
                  }
                  s._reversed
                    ? s.render(
                        (s._dirty ? s.totalDuration() : s._totalDuration) -
                          (t - s._startTime) * s._timeScale,
                        e,
                        i,
                      )
                    : s.render((t - s._startTime) * s._timeScale, e, i);
                }
                s = l;
              }
            this._onUpdate &&
              (e || (a.length && o(), this._callback("onUpdate"))),
              h &&
                (this._locked ||
                  this._gc ||
                  ((g === this._startTime || v !== this._timeScale) &&
                    (0 === this._time || f >= this.totalDuration()) &&
                    (n &&
                      (a.length && o(),
                      this._timeline.autoRemoveChildren &&
                        this._enabled(!1, !1),
                      (this._active = !1)),
                    !e && this.vars[h] && this._callback(h))));
          }),
          (h.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s,
              r,
              n = [],
              a = this.getChildren(t, e, i),
              o = 0,
              l = a.length;
            for (s = 0; l > s; s++) (r = a[s]), r.isActive() && (n[o++] = r);
            return n;
          }),
          (h.getLabelAfter = function (t) {
            t || (0 !== t && (t = this._time));
            var e,
              i = this.getLabelsArray(),
              s = i.length;
            for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
            return null;
          }),
          (h.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
              if (t > e[i].time) return e[i].name;
            return null;
          }),
          (h.getLabelsArray = function () {
            var t,
              e = [],
              i = 0;
            for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
            return (
              e.sort(function (t, e) {
                return t.time - e.time;
              }),
              e
            );
          }),
          (h.progress = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) +
                    this._cycle * (this._duration + this._repeatDelay),
                  e,
                )
              : this._time / this.duration();
          }),
          (h.totalProgress = function (t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this._totalTime / this.totalDuration();
          }),
          (h.totalDuration = function (e) {
            return arguments.length
              ? -1 === this._repeat
                ? this
                : this.duration(
                    (e - this._repeat * this._repeatDelay) / (this._repeat + 1),
                  )
              : (this._dirty &&
                  (t.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat
                      ? 999999999999
                      : this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (h.time = function (t, e) {
            return arguments.length
              ? (this._dirty && this.totalDuration(),
                t > this._duration && (t = this._duration),
                this._yoyo && 0 !== (1 & this._cycle)
                  ? (t =
                      this._duration -
                      t +
                      this._cycle * (this._duration + this._repeatDelay))
                  : 0 !== this._repeat &&
                    (t += this._cycle * (this._duration + this._repeatDelay)),
                this.totalTime(t, e))
              : this._time;
          }),
          (h.repeat = function (t) {
            return arguments.length
              ? ((this._repeat = t), this._uncache(!0))
              : this._repeat;
          }),
          (h.repeatDelay = function (t) {
            return arguments.length
              ? ((this._repeatDelay = t), this._uncache(!0))
              : this._repeatDelay;
          }),
          (h.yoyo = function (t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          (h.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.getLabelBefore(this._time + 1e-8);
          }),
          s
        );
      },
      !0,
    ),
    (function () {
      var t = 180 / Math.PI,
        e = [],
        i = [],
        s = [],
        r = {},
        n = _gsScope._gsDefine.globals,
        a = function (t, e, i, s) {
          (this.a = t),
            (this.b = e),
            (this.c = i),
            (this.d = s),
            (this.da = s - t),
            (this.ca = i - t),
            (this.ba = e - t);
        },
        o =
          ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        l = function (t, e, i, s) {
          var r = { a: t },
            n = {},
            a = {},
            o = { c: s },
            l = (t + e) / 2,
            h = (e + i) / 2,
            _ = (i + s) / 2,
            u = (l + h) / 2,
            c = (h + _) / 2,
            f = (c - u) / 8;
          return (
            (r.b = l + (t - l) / 4),
            (n.b = u + f),
            (r.c = n.a = (r.b + n.b) / 2),
            (n.c = a.a = (u + c) / 2),
            (a.b = c - f),
            (o.b = _ + (s - _) / 4),
            (a.c = o.a = (a.b + o.b) / 2),
            [r, n, a, o]
          );
        },
        h = function (t, r, n, a, o) {
          var h,
            _,
            u,
            c,
            f,
            p,
            m,
            d,
            g,
            v,
            y,
            T,
            x,
            w = t.length - 1,
            b = 0,
            P = t[0].a;
          for (h = 0; w > h; h++)
            (f = t[b]),
              (_ = f.a),
              (u = f.d),
              (c = t[b + 1].d),
              o
                ? ((y = e[h]),
                  (T = i[h]),
                  (x = (0.25 * (T + y) * r) / (a ? 0.5 : s[h] || 0.5)),
                  (p = u - (u - _) * (a ? 0.5 * r : 0 !== y ? x / y : 0)),
                  (m = u + (c - u) * (a ? 0.5 * r : 0 !== T ? x / T : 0)),
                  (d =
                    u - (p + (((m - p) * ((3 * y) / (y + T) + 0.5)) / 4 || 0))))
                : ((p = u - 0.5 * (u - _) * r),
                  (m = u + 0.5 * (c - u) * r),
                  (d = u - (p + m) / 2)),
              (p += d),
              (m += d),
              (f.c = g = p),
              (f.b = 0 !== h ? P : (P = f.a + 0.6 * (f.c - f.a))),
              (f.da = u - _),
              (f.ca = g - _),
              (f.ba = P - _),
              n
                ? ((v = l(_, P, g, u)),
                  t.splice(b, 1, v[0], v[1], v[2], v[3]),
                  (b += 4))
                : b++,
              (P = m);
          (f = t[b]),
            (f.b = P),
            (f.c = P + 0.4 * (f.d - P)),
            (f.da = f.d - f.a),
            (f.ca = f.c - f.a),
            (f.ba = P - f.a),
            n &&
              ((v = l(f.a, P, f.c, f.d)),
              t.splice(b, 1, v[0], v[1], v[2], v[3]));
        },
        _ = function (t, s, r, n) {
          var o,
            l,
            h,
            _,
            u,
            c,
            f = [];
          if (n)
            for (t = [n].concat(t), l = t.length; --l > -1; )
              "string" == typeof (c = t[l][s]) &&
                "=" === c.charAt(1) &&
                (t[l][s] = n[s] + Number(c.charAt(0) + c.substr(2)));
          if (((o = t.length - 2), 0 > o))
            return (f[0] = new a(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s])), f;
          for (l = 0; o > l; l++)
            (h = t[l][s]),
              (_ = t[l + 1][s]),
              (f[l] = new a(h, 0, 0, _)),
              r &&
                ((u = t[l + 2][s]),
                (e[l] = (e[l] || 0) + (_ - h) * (_ - h)),
                (i[l] = (i[l] || 0) + (u - _) * (u - _)));
          return (f[l] = new a(t[l][s], 0, 0, t[l + 1][s])), f;
        },
        u = function (t, n, a, l, u, c) {
          var f,
            p,
            m,
            d,
            g,
            v,
            y,
            T,
            x = {},
            w = [],
            b = c || t[0];
          (u = "string" == typeof u ? "," + u + "," : o), null == n && (n = 1);
          for (p in t[0]) w.push(p);
          if (t.length > 1) {
            for (T = t[t.length - 1], y = !0, f = w.length; --f > -1; )
              if (((p = w[f]), Math.abs(b[p] - T[p]) > 0.05)) {
                y = !1;
                break;
              }
            y &&
              ((t = t.concat()),
              c && t.unshift(c),
              t.push(t[1]),
              (c = t[t.length - 3]));
          }
          for (e.length = i.length = s.length = 0, f = w.length; --f > -1; )
            (p = w[f]),
              (r[p] = -1 !== u.indexOf("," + p + ",")),
              (x[p] = _(t, p, r[p], c));
          for (f = e.length; --f > -1; )
            (e[f] = Math.sqrt(e[f])), (i[f] = Math.sqrt(i[f]));
          if (!l) {
            for (f = w.length; --f > -1; )
              if (r[p])
                for (m = x[w[f]], v = m.length - 1, d = 0; v > d; d++)
                  (g = m[d + 1].da / i[d] + m[d].da / e[d]),
                    (s[d] = (s[d] || 0) + g * g);
            for (f = s.length; --f > -1; ) s[f] = Math.sqrt(s[f]);
          }
          for (f = w.length, d = a ? 4 : 1; --f > -1; )
            (p = w[f]),
              (m = x[p]),
              h(m, n, a, l, r[p]),
              y && (m.splice(0, d), m.splice(m.length - d, d));
          return x;
        },
        c = function (t, e, i) {
          e = e || "soft";
          var s,
            r,
            n,
            o,
            l,
            h,
            _,
            u,
            c,
            f,
            p,
            m = {},
            d = "cubic" === e ? 3 : 2,
            g = "soft" === e,
            v = [];
          if ((g && i && (t = [i].concat(t)), null == t || d + 1 > t.length))
            throw "invalid Bezier data";
          for (c in t[0]) v.push(c);
          for (h = v.length; --h > -1; ) {
            for (
              c = v[h], m[c] = l = [], f = 0, u = t.length, _ = 0;
              u > _;
              _++
            )
              (s =
                null == i
                  ? t[_][c]
                  : "string" == typeof (p = t[_][c]) && "=" === p.charAt(1)
                    ? i[c] + Number(p.charAt(0) + p.substr(2))
                    : Number(p)),
                g && _ > 1 && u - 1 > _ && (l[f++] = (s + l[f - 2]) / 2),
                (l[f++] = s);
            for (u = f - d + 1, f = 0, _ = 0; u > _; _ += d)
              (s = l[_]),
                (r = l[_ + 1]),
                (n = l[_ + 2]),
                (o = 2 === d ? 0 : l[_ + 3]),
                (l[f++] = p =
                  3 === d
                    ? new a(s, r, n, o)
                    : new a(s, (2 * r + s) / 3, (2 * r + n) / 3, n));
            l.length = f;
          }
          return m;
        },
        f = function (t, e, i) {
          for (
            var s, r, n, a, o, l, h, _, u, c, f, p = 1 / i, m = t.length;
            --m > -1;

          )
            for (
              c = t[m],
                n = c.a,
                a = c.d - n,
                o = c.c - n,
                l = c.b - n,
                s = r = 0,
                _ = 1;
              i >= _;
              _++
            )
              (h = p * _),
                (u = 1 - h),
                (s = r - (r = (h * h * a + 3 * u * (h * o + u * l)) * h)),
                (f = m * i + _ - 1),
                (e[f] = (e[f] || 0) + s * s);
        },
        p = function (t, e) {
          e = e >> 0 || 6;
          var i,
            s,
            r,
            n,
            a = [],
            o = [],
            l = 0,
            h = 0,
            _ = e - 1,
            u = [],
            c = [];
          for (i in t) f(t[i], a, e);
          for (r = a.length, s = 0; r > s; s++)
            (l += Math.sqrt(a[s])),
              (n = s % e),
              (c[n] = l),
              n === _ &&
                ((h += l),
                (n = (s / e) >> 0),
                (u[n] = c),
                (o[n] = h),
                (l = 0),
                (c = []));
          return { length: h, lengths: o, segments: u };
        },
        m = _gsScope._gsDefine.plugin({
          propName: "bezier",
          priority: -1,
          version: "1.3.4",
          API: 2,
          global: !0,
          init: function (t, e, i) {
            (this._target = t),
              e instanceof Array && (e = { values: e }),
              (this._func = {}),
              (this._round = {}),
              (this._props = []),
              (this._timeRes =
                null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10));
            var s,
              r,
              n,
              a,
              o,
              l = e.values || [],
              h = {},
              _ = l[0],
              f = e.autoRotate || i.vars.orientToBezier;
            this._autoRotate = f
              ? f instanceof Array
                ? f
                : [["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]]
              : null;
            for (s in _) this._props.push(s);
            for (n = this._props.length; --n > -1; )
              (s = this._props[n]),
                this._overwriteProps.push(s),
                (r = this._func[s] = "function" == typeof t[s]),
                (h[s] = r
                  ? t[
                      s.indexOf("set") ||
                      "function" != typeof t["get" + s.substr(3)]
                        ? s
                        : "get" + s.substr(3)
                    ]()
                  : parseFloat(t[s])),
                o || (h[s] !== l[0][s] && (o = h));
            if (
              ((this._beziers =
                "cubic" !== e.type &&
                "quadratic" !== e.type &&
                "soft" !== e.type
                  ? u(
                      l,
                      isNaN(e.curviness) ? 1 : e.curviness,
                      !1,
                      "thruBasic" === e.type,
                      e.correlate,
                      o,
                    )
                  : c(l, e.type, h)),
              (this._segCount = this._beziers[s].length),
              this._timeRes)
            ) {
              var m = p(this._beziers, this._timeRes);
              (this._length = m.length),
                (this._lengths = m.lengths),
                (this._segments = m.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length);
            }
            if ((f = this._autoRotate))
              for (
                this._initialRotations = [],
                  f[0] instanceof Array || (this._autoRotate = f = [f]),
                  n = f.length;
                --n > -1;

              ) {
                for (a = 0; 3 > a; a++)
                  (s = f[n][a]),
                    (this._func[s] =
                      "function" == typeof t[s]
                        ? t[
                            s.indexOf("set") ||
                            "function" != typeof t["get" + s.substr(3)]
                              ? s
                              : "get" + s.substr(3)
                          ]
                        : !1);
                (s = f[n][2]),
                  (this._initialRotations[n] = this._func[s]
                    ? this._func[s].call(this._target)
                    : this._target[s]);
              }
            return (this._startRatio = i.vars.runBackwards ? 1 : 0), !0;
          },
          set: function (e) {
            var i,
              s,
              r,
              n,
              a,
              o,
              l,
              h,
              _,
              u,
              c = this._segCount,
              f = this._func,
              p = this._target,
              m = e !== this._startRatio;
            if (this._timeRes) {
              if (
                ((_ = this._lengths),
                (u = this._curSeg),
                (e *= this._length),
                (r = this._li),
                e > this._l2 && c - 1 > r)
              ) {
                for (h = c - 1; h > r && e >= (this._l2 = _[++r]); );
                (this._l1 = _[r - 1]),
                  (this._li = r),
                  (this._curSeg = u = this._segments[r]),
                  (this._s2 = u[(this._s1 = this._si = 0)]);
              } else if (this._l1 > e && r > 0) {
                for (; r > 0 && (this._l1 = _[--r]) >= e; );
                0 === r && this._l1 > e ? (this._l1 = 0) : r++,
                  (this._l2 = _[r]),
                  (this._li = r),
                  (this._curSeg = u = this._segments[r]),
                  (this._s1 = u[(this._si = u.length - 1) - 1] || 0),
                  (this._s2 = u[this._si]);
              }
              if (
                ((i = r),
                (e -= this._l1),
                (r = this._si),
                e > this._s2 && u.length - 1 > r)
              ) {
                for (h = u.length - 1; h > r && e >= (this._s2 = u[++r]); );
                (this._s1 = u[r - 1]), (this._si = r);
              } else if (this._s1 > e && r > 0) {
                for (; r > 0 && (this._s1 = u[--r]) >= e; );
                0 === r && this._s1 > e ? (this._s1 = 0) : r++,
                  (this._s2 = u[r]),
                  (this._si = r);
              }
              o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec;
            } else
              (i = 0 > e ? 0 : e >= 1 ? c - 1 : (c * e) >> 0),
                (o = (e - i * (1 / c)) * c);
            for (s = 1 - o, r = this._props.length; --r > -1; )
              (n = this._props[r]),
                (a = this._beziers[n][i]),
                (l = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a),
                this._round[n] && (l = Math.round(l)),
                f[n] ? p[n](l) : (p[n] = l);
            if (this._autoRotate) {
              var d,
                g,
                v,
                y,
                T,
                x,
                w,
                b = this._autoRotate;
              for (r = b.length; --r > -1; )
                (n = b[r][2]),
                  (x = b[r][3] || 0),
                  (w = b[r][4] === !0 ? 1 : t),
                  (a = this._beziers[b[r][0]]),
                  (d = this._beziers[b[r][1]]),
                  a &&
                    d &&
                    ((a = a[i]),
                    (d = d[i]),
                    (g = a.a + (a.b - a.a) * o),
                    (y = a.b + (a.c - a.b) * o),
                    (g += (y - g) * o),
                    (y += (a.c + (a.d - a.c) * o - y) * o),
                    (v = d.a + (d.b - d.a) * o),
                    (T = d.b + (d.c - d.b) * o),
                    (v += (T - v) * o),
                    (T += (d.c + (d.d - d.c) * o - T) * o),
                    (l = m
                      ? Math.atan2(T - v, y - g) * w + x
                      : this._initialRotations[r]),
                    f[n] ? p[n](l) : (p[n] = l));
            }
          },
        }),
        d = m.prototype;
      (m.bezierThrough = u),
        (m.cubicToQuadratic = l),
        (m._autoCSS = !0),
        (m.quadraticToCubic = function (t, e, i) {
          return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
        }),
        (m._cssRegister = function () {
          var t = n.CSSPlugin;
          if (t) {
            var e = t._internals,
              i = e._parseToProxy,
              s = e._setPluginRatio,
              r = e.CSSPropTween;
            e._registerComplexSpecialProp("bezier", {
              parser: function (t, e, n, a, o, l) {
                e instanceof Array && (e = { values: e }), (l = new m());
                var h,
                  _,
                  u,
                  c = e.values,
                  f = c.length - 1,
                  p = [],
                  d = {};
                if (0 > f) return o;
                for (h = 0; f >= h; h++)
                  (u = i(t, c[h], a, o, l, f !== h)), (p[h] = u.end);
                for (_ in e) d[_] = e[_];
                return (
                  (d.values = p),
                  (o = new r(t, "bezier", 0, 0, u.pt, 2)),
                  (o.data = u),
                  (o.plugin = l),
                  (o.setRatio = s),
                  0 === d.autoRotate && (d.autoRotate = !0),
                  !d.autoRotate ||
                    d.autoRotate instanceof Array ||
                    ((h = d.autoRotate === !0 ? 0 : Number(d.autoRotate)),
                    (d.autoRotate =
                      null != u.end.left
                        ? [["left", "top", "rotation", h, !1]]
                        : null != u.end.x
                          ? [["x", "y", "rotation", h, !1]]
                          : !1)),
                  d.autoRotate &&
                    (a._transform || a._enableTransforms(!1),
                    (u.autoRotate = a._target._gsTransform)),
                  l._onInitTween(u.proxy, d, a._tween),
                  o
                );
              },
            });
          }
        }),
        (d._roundProps = function (t, e) {
          for (var i = this._overwriteProps, s = i.length; --s > -1; )
            (t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e);
        }),
        (d._kill = function (t) {
          var e,
            i,
            s = this._props;
          for (e in this._beziers)
            if (e in t)
              for (
                delete this._beziers[e], delete this._func[e], i = s.length;
                --i > -1;

              )
                s[i] === e && s.splice(i, 1);
          return this._super._kill.call(this, t);
        });
    })(),
    _gsScope._gsDefine(
      "plugins.CSSPlugin",
      ["plugins.TweenPlugin", "TweenLite"],
      function (t, e) {
        var i,
          s,
          r,
          n,
          a = function () {
            t.call(this, "css"),
              (this._overwriteProps.length = 0),
              (this.setRatio = a.prototype.setRatio);
          },
          o = _gsScope._gsDefine.globals,
          l = {},
          h = (a.prototype = new t("css"));
        (h.constructor = a),
          (a.version = "1.18.0"),
          (a.API = 2),
          (a.defaultTransformPerspective = 0),
          (a.defaultSkewType = "compensated"),
          (a.defaultSmoothOrigin = !0),
          (h = "px"),
          (a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: "",
          });
        var _,
          u,
          c,
          f,
          p,
          m,
          d = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
          g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
          v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
          y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
          T = /(?:\d|\-|\+|=|#|\.)*/g,
          x = /opacity *= *([^)]*)/i,
          w = /opacity:([^;]*)/i,
          b = /alpha\(opacity *=.+?\)/i,
          P = /^(rgb|hsl)/,
          k = /([A-Z])/g,
          S = /-([a-z])/gi,
          R = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
          O = function (t, e) {
            return e.toUpperCase();
          },
          A = /(?:Left|Right|Width)/i,
          C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
          D = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
          M = /,(?=[^\)]*(?:\(|$))/gi,
          z = Math.PI / 180,
          F = 180 / Math.PI,
          I = {},
          E = document,
          N = function (t) {
            return E.createElementNS
              ? E.createElementNS("http://www.w3.org/1999/xhtml", t)
              : E.createElement(t);
          },
          L = N("div"),
          X = N("img"),
          B = (a._internals = { _specialProps: l }),
          j = navigator.userAgent,
          Y = (function () {
            var t = j.indexOf("Android"),
              e = N("a");
            return (
              (c =
                -1 !== j.indexOf("Safari") &&
                -1 === j.indexOf("Chrome") &&
                (-1 === t || Number(j.substr(t + 8, 1)) > 3)),
              (p = c && 6 > Number(j.substr(j.indexOf("Version/") + 8, 1))),
              (f = -1 !== j.indexOf("Firefox")),
              (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(j) ||
                /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(j)) &&
                (m = parseFloat(RegExp.$1)),
              e
                ? ((e.style.cssText = "top:1px;opacity:.55;"),
                  /^0.55/.test(e.style.opacity))
                : !1
            );
          })(),
          U = function (t) {
            return x.test(
              "string" == typeof t
                ? t
                : (t.currentStyle ? t.currentStyle.filter : t.style.filter) ||
                    "",
            )
              ? parseFloat(RegExp.$1) / 100
              : 1;
          },
          q = function (t) {
            window.console && console.log(t);
          },
          V = "",
          G = "",
          W = function (t, e) {
            e = e || L;
            var i,
              s,
              r = e.style;
            if (void 0 !== r[t]) return t;
            for (
              t = t.charAt(0).toUpperCase() + t.substr(1),
                i = ["O", "Moz", "ms", "Ms", "Webkit"],
                s = 5;
              --s > -1 && void 0 === r[i[s] + t];

            );
            return s >= 0
              ? ((G = 3 === s ? "ms" : i[s]),
                (V = "-" + G.toLowerCase() + "-"),
                G + t)
              : null;
          },
          Z = E.defaultView ? E.defaultView.getComputedStyle : function () {},
          Q = (a.getStyle = function (t, e, i, s, r) {
            var n;
            return Y || "opacity" !== e
              ? (!s && t.style[e]
                  ? (n = t.style[e])
                  : (i = i || Z(t))
                    ? (n =
                        i[e] ||
                        i.getPropertyValue(e) ||
                        i.getPropertyValue(e.replace(k, "-$1").toLowerCase()))
                    : t.currentStyle && (n = t.currentStyle[e]),
                null == r ||
                (n && "none" !== n && "auto" !== n && "auto auto" !== n)
                  ? n
                  : r)
              : U(t);
          }),
          $ = (B.convertToPixels = function (t, i, s, r, n) {
            if ("px" === r || !r) return s;
            if ("auto" === r || !s) return 0;
            var o,
              l,
              h,
              _ = A.test(i),
              u = t,
              c = L.style,
              f = 0 > s;
            if ((f && (s = -s), "%" === r && -1 !== i.indexOf("border")))
              o = (s / 100) * (_ ? t.clientWidth : t.clientHeight);
            else {
              if (
                ((c.cssText =
                  "border:0 solid red;position:" +
                  Q(t, "position") +
                  ";line-height:0;"),
                "%" !== r &&
                  u.appendChild &&
                  "v" !== r.charAt(0) &&
                  "rem" !== r)
              )
                c[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r;
              else {
                if (
                  ((u = t.parentNode || E.body),
                  (l = u._gsCache),
                  (h = e.ticker.frame),
                  l && _ && l.time === h)
                )
                  return (l.width * s) / 100;
                c[_ ? "width" : "height"] = s + r;
              }
              u.appendChild(L),
                (o = parseFloat(L[_ ? "offsetWidth" : "offsetHeight"])),
                u.removeChild(L),
                _ &&
                  "%" === r &&
                  a.cacheWidths !== !1 &&
                  ((l = u._gsCache = u._gsCache || {}),
                  (l.time = h),
                  (l.width = 100 * (o / s))),
                0 !== o || n || (o = $(t, i, s, r, !0));
            }
            return f ? -o : o;
          }),
          H = (B.calculateOffset = function (t, e, i) {
            if ("absolute" !== Q(t, "position", i)) return 0;
            var s = "left" === e ? "Left" : "Top",
              r = Q(t, "margin" + s, i);
            return (
              t["offset" + s] - ($(t, e, parseFloat(r), r.replace(T, "")) || 0)
            );
          }),
          K = function (t, e) {
            var i,
              s,
              r,
              n = {};
            if ((e = e || Z(t, null)))
              if ((i = e.length))
                for (; --i > -1; )
                  (r = e[i]),
                    (-1 === r.indexOf("-transform") || ke === r) &&
                      (n[r.replace(S, O)] = e.getPropertyValue(r));
              else
                for (i in e)
                  (-1 === i.indexOf("Transform") || Pe === i) && (n[i] = e[i]);
            else if ((e = t.currentStyle || t.style))
              for (i in e)
                "string" == typeof i &&
                  void 0 === n[i] &&
                  (n[i.replace(S, O)] = e[i]);
            return (
              Y || (n.opacity = U(t)),
              (s = Ne(t, e, !1)),
              (n.rotation = s.rotation),
              (n.skewX = s.skewX),
              (n.scaleX = s.scaleX),
              (n.scaleY = s.scaleY),
              (n.x = s.x),
              (n.y = s.y),
              Re &&
                ((n.z = s.z),
                (n.rotationX = s.rotationX),
                (n.rotationY = s.rotationY),
                (n.scaleZ = s.scaleZ)),
              n.filters && delete n.filters,
              n
            );
          },
          J = function (t, e, i, s, r) {
            var n,
              a,
              o,
              l = {},
              h = t.style;
            for (a in i)
              "cssText" !== a &&
                "length" !== a &&
                isNaN(a) &&
                (e[a] !== (n = i[a]) || (r && r[a])) &&
                -1 === a.indexOf("Origin") &&
                ("number" == typeof n || "string" == typeof n) &&
                ((l[a] =
                  "auto" !== n || ("left" !== a && "top" !== a)
                    ? ("" !== n && "auto" !== n && "none" !== n) ||
                      "string" != typeof e[a] ||
                      "" === e[a].replace(y, "")
                      ? n
                      : 0
                    : H(t, a)),
                void 0 !== h[a] && (o = new pe(h, a, h[a], o)));
            if (s) for (a in s) "className" !== a && (l[a] = s[a]);
            return { difs: l, firstMPT: o };
          },
          te = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
          ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
          ie = function (t, e, i) {
            var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
              r = te[e],
              n = r.length;
            for (i = i || Z(t, null); --n > -1; )
              (s -= parseFloat(Q(t, "padding" + r[n], i, !0)) || 0),
                (s -= parseFloat(Q(t, "border" + r[n] + "Width", i, !0)) || 0);
            return s;
          },
          se = function (t, e) {
            if ("contain" === t || "auto" === t || "auto auto" === t)
              return t + " ";
            (null == t || "" === t) && (t = "0 0");
            var i = t.split(" "),
              s =
                -1 !== t.indexOf("left")
                  ? "0%"
                  : -1 !== t.indexOf("right")
                    ? "100%"
                    : i[0],
              r =
                -1 !== t.indexOf("top")
                  ? "0%"
                  : -1 !== t.indexOf("bottom")
                    ? "100%"
                    : i[1];
            return (
              null == r
                ? (r = "center" === s ? "50%" : "0")
                : "center" === r && (r = "50%"),
              ("center" === s ||
                (isNaN(parseFloat(s)) && -1 === (s + "").indexOf("="))) &&
                (s = "50%"),
              (t = s + " " + r + (i.length > 2 ? " " + i[2] : "")),
              e &&
                ((e.oxp = -1 !== s.indexOf("%")),
                (e.oyp = -1 !== r.indexOf("%")),
                (e.oxr = "=" === s.charAt(1)),
                (e.oyr = "=" === r.charAt(1)),
                (e.ox = parseFloat(s.replace(y, ""))),
                (e.oy = parseFloat(r.replace(y, ""))),
                (e.v = t)),
              e || t
            );
          },
          re = function (t, e) {
            return "string" == typeof t && "=" === t.charAt(1)
              ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2))
              : parseFloat(t) - parseFloat(e);
          },
          ne = function (t, e) {
            return null == t
              ? e
              : "string" == typeof t && "=" === t.charAt(1)
                ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e
                : parseFloat(t);
          },
          ae = function (t, e, i, s) {
            var r,
              n,
              a,
              o,
              l,
              h = 1e-6;
            return (
              null == t
                ? (o = e)
                : "number" == typeof t
                  ? (o = t)
                  : ((r = 360),
                    (n = t.split("_")),
                    (l = "=" === t.charAt(1)),
                    (a =
                      (l
                        ? parseInt(t.charAt(0) + "1", 10) *
                          parseFloat(n[0].substr(2))
                        : parseFloat(n[0])) *
                        (-1 === t.indexOf("rad") ? 1 : F) -
                      (l ? 0 : e)),
                    n.length &&
                      (s && (s[i] = e + a),
                      -1 !== t.indexOf("short") &&
                        ((a %= r),
                        a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)),
                      -1 !== t.indexOf("_cw") && 0 > a
                        ? (a = ((a + 9999999999 * r) % r) - (0 | (a / r)) * r)
                        : -1 !== t.indexOf("ccw") &&
                          a > 0 &&
                          (a = ((a - 9999999999 * r) % r) - (0 | (a / r)) * r)),
                    (o = e + a)),
              h > o && o > -h && (o = 0),
              o
            );
          },
          oe = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          },
          le = function (t, e, i) {
            return (
              (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t),
              0 |
                (255 *
                  (1 > 6 * t
                    ? e + 6 * (i - e) * t
                    : 0.5 > t
                      ? i
                      : 2 > 3 * t
                        ? e + 6 * (i - e) * (2 / 3 - t)
                        : e) +
                  0.5)
            );
          },
          he = (a.parseColor = function (t, e) {
            var i, s, r, n, a, o, l, h, _, u, c;
            if (t)
              if ("number" == typeof t) i = [t >> 16, 255 & (t >> 8), 255 & t];
              else {
                if (
                  ("," === t.charAt(t.length - 1) &&
                    (t = t.substr(0, t.length - 1)),
                  oe[t])
                )
                  i = oe[t];
                else if ("#" === t.charAt(0))
                  4 === t.length &&
                    ((s = t.charAt(1)),
                    (r = t.charAt(2)),
                    (n = t.charAt(3)),
                    (t = "#" + s + s + r + r + n + n)),
                    (t = parseInt(t.substr(1), 16)),
                    (i = [t >> 16, 255 & (t >> 8), 255 & t]);
                else if ("hsl" === t.substr(0, 3))
                  if (((i = c = t.match(d)), e)) {
                    if (-1 !== t.indexOf("=")) return t.match(g);
                  } else
                    (a = (Number(i[0]) % 360) / 360),
                      (o = Number(i[1]) / 100),
                      (l = Number(i[2]) / 100),
                      (r = 0.5 >= l ? l * (o + 1) : l + o - l * o),
                      (s = 2 * l - r),
                      i.length > 3 && (i[3] = Number(t[3])),
                      (i[0] = le(a + 1 / 3, s, r)),
                      (i[1] = le(a, s, r)),
                      (i[2] = le(a - 1 / 3, s, r));
                else i = t.match(d) || oe.transparent;
                (i[0] = Number(i[0])),
                  (i[1] = Number(i[1])),
                  (i[2] = Number(i[2])),
                  i.length > 3 && (i[3] = Number(i[3]));
              }
            else i = oe.black;
            return (
              e &&
                !c &&
                ((s = i[0] / 255),
                (r = i[1] / 255),
                (n = i[2] / 255),
                (h = Math.max(s, r, n)),
                (_ = Math.min(s, r, n)),
                (l = (h + _) / 2),
                h === _
                  ? (a = o = 0)
                  : ((u = h - _),
                    (o = l > 0.5 ? u / (2 - h - _) : u / (h + _)),
                    (a =
                      h === s
                        ? (r - n) / u + (n > r ? 6 : 0)
                        : h === r
                          ? (n - s) / u + 2
                          : (s - r) / u + 4),
                    (a *= 60)),
                (i[0] = 0 | (a + 0.5)),
                (i[1] = 0 | (100 * o + 0.5)),
                (i[2] = 0 | (100 * l + 0.5))),
              i
            );
          }),
          _e = function (t, e) {
            var i,
              s,
              r,
              n = t.match(ue) || [],
              a = 0,
              o = n.length ? "" : t;
            for (i = 0; n.length > i; i++)
              (s = n[i]),
                (r = t.substr(a, t.indexOf(s, a) - a)),
                (a += r.length + s.length),
                (s = he(s, e)),
                3 === s.length && s.push(1),
                (o +=
                  r +
                  (e
                    ? "hsla(" + s[0] + "," + s[1] + "%," + s[2] + "%," + s[3]
                    : "rgba(" + s.join(",")) +
                  ")");
            return o;
          },
          ue = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (h in oe) ue += "|" + h + "\\b";
        (ue = RegExp(ue + ")", "gi")),
          (a.colorStringFilter = function (t) {
            var e,
              i = t[0] + t[1];
            (ue.lastIndex = 0),
              ue.test(i) &&
                ((e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla(")),
                (t[0] = _e(t[0], e)),
                (t[1] = _e(t[1], e)));
          }),
          e.defaultStringFilter ||
            (e.defaultStringFilter = a.colorStringFilter);
        var ce = function (t, e, i, s) {
            if (null == t)
              return function (t) {
                return t;
              };
            var r,
              n = e ? (t.match(ue) || [""])[0] : "",
              a = t.split(n).join("").match(v) || [],
              o = t.substr(0, t.indexOf(a[0])),
              l = ")" === t.charAt(t.length - 1) ? ")" : "",
              h = -1 !== t.indexOf(" ") ? " " : ",",
              _ = a.length,
              u = _ > 0 ? a[0].replace(d, "") : "";
            return _
              ? (r = e
                  ? function (t) {
                      var e, c, f, p;
                      if ("number" == typeof t) t += u;
                      else if (s && M.test(t)) {
                        for (
                          p = t.replace(M, "|").split("|"), f = 0;
                          p.length > f;
                          f++
                        )
                          p[f] = r(p[f]);
                        return p.join(",");
                      }
                      if (
                        ((e = (t.match(ue) || [n])[0]),
                        (c = t.split(e).join("").match(v) || []),
                        (f = c.length),
                        _ > f--)
                      )
                        for (; _ > ++f; )
                          c[f] = i ? c[0 | ((f - 1) / 2)] : a[f];
                      return (
                        o +
                        c.join(h) +
                        h +
                        e +
                        l +
                        (-1 !== t.indexOf("inset") ? " inset" : "")
                      );
                    }
                  : function (t) {
                      var e, n, c;
                      if ("number" == typeof t) t += u;
                      else if (s && M.test(t)) {
                        for (
                          n = t.replace(M, "|").split("|"), c = 0;
                          n.length > c;
                          c++
                        )
                          n[c] = r(n[c]);
                        return n.join(",");
                      }
                      if (((e = t.match(v) || []), (c = e.length), _ > c--))
                        for (; _ > ++c; )
                          e[c] = i ? e[0 | ((c - 1) / 2)] : a[c];
                      return o + e.join(h) + l;
                    })
              : function (t) {
                  return t;
                };
          },
          fe = function (t) {
            return (
              (t = t.split(",")),
              function (e, i, s, r, n, a, o) {
                var l,
                  h = (i + "").split(" ");
                for (o = {}, l = 0; 4 > l; l++)
                  o[t[l]] = h[l] = h[l] || h[((l - 1) / 2) >> 0];
                return r.parse(e, o, n, a);
              }
            );
          },
          pe =
            ((B._setPluginRatio = function (t) {
              this.plugin.setRatio(t);
              for (
                var e,
                  i,
                  s,
                  r,
                  n = this.data,
                  a = n.proxy,
                  o = n.firstMPT,
                  l = 1e-6;
                o;

              )
                (e = a[o.v]),
                  o.r ? (e = Math.round(e)) : l > e && e > -l && (e = 0),
                  (o.t[o.p] = e),
                  (o = o._next);
              if (
                (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
              )
                for (o = n.firstMPT; o; ) {
                  if (((i = o.t), i.type)) {
                    if (1 === i.type) {
                      for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++)
                        r += i["xn" + s] + i["xs" + (s + 1)];
                      i.e = r;
                    }
                  } else i.e = i.s + i.xs0;
                  o = o._next;
                }
            }),
            function (t, e, i, s, r) {
              (this.t = t),
                (this.p = e),
                (this.v = i),
                (this.r = r),
                s && ((s._prev = this), (this._next = s));
            }),
          me =
            ((B._parseToProxy = function (t, e, i, s, r, n) {
              var a,
                o,
                l,
                h,
                _,
                u = s,
                c = {},
                f = {},
                p = i._transform,
                m = I;
              for (
                i._transform = null,
                  I = e,
                  s = _ = i.parse(t, e, s, r),
                  I = m,
                  n &&
                    ((i._transform = p),
                    u && ((u._prev = null), u._prev && (u._prev._next = null)));
                s && s !== u;

              ) {
                if (
                  1 >= s.type &&
                  ((o = s.p),
                  (f[o] = s.s + s.c),
                  (c[o] = s.s),
                  n || ((h = new pe(s, "s", o, h, s.r)), (s.c = 0)),
                  1 === s.type)
                )
                  for (a = s.l; --a > 0; )
                    (l = "xn" + a),
                      (o = s.p + "_" + l),
                      (f[o] = s.data[l]),
                      (c[o] = s[l]),
                      n || (h = new pe(s, l, o, h, s.rxp[l]));
                s = s._next;
              }
              return { proxy: c, end: f, firstMPT: h, pt: _ };
            }),
            (B.CSSPropTween = function (t, e, s, r, a, o, l, h, _, u, c) {
              (this.t = t),
                (this.p = e),
                (this.s = s),
                (this.c = r),
                (this.n = l || e),
                t instanceof me || n.push(this.n),
                (this.r = h),
                (this.type = o || 0),
                _ && ((this.pr = _), (i = !0)),
                (this.b = void 0 === u ? s : u),
                (this.e = void 0 === c ? s + r : c),
                a && ((this._next = a), (a._prev = this));
            })),
          de = function (t, e, i, s, r, n) {
            var a = new me(t, e, i, s - i, r, -1, n);
            return (a.b = i), (a.e = a.xs0 = s), a;
          },
          ge = (a.parseComplex = function (t, e, i, s, r, n, a, o, l, h) {
            (i = i || n || ""),
              (a = new me(t, e, 0, 0, a, h ? 2 : 1, null, !1, o, i, s)),
              (s += "");
            var u,
              c,
              f,
              p,
              m,
              v,
              y,
              T,
              x,
              w,
              b,
              P,
              k,
              S = i.split(", ").join(",").split(" "),
              R = s.split(", ").join(",").split(" "),
              O = S.length,
              A = _ !== !1;
            for (
              (-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) &&
                ((S = S.join(" ").replace(M, ", ").split(" ")),
                (R = R.join(" ").replace(M, ", ").split(" ")),
                (O = S.length)),
                O !== R.length && ((S = (n || "").split(" ")), (O = S.length)),
                a.plugin = l,
                a.setRatio = h,
                ue.lastIndex = 0,
                u = 0;
              O > u;
              u++
            )
              if (((p = S[u]), (m = R[u]), (T = parseFloat(p)), T || 0 === T))
                a.appendXtra(
                  "",
                  T,
                  re(m, T),
                  m.replace(g, ""),
                  A && -1 !== m.indexOf("px"),
                  !0,
                );
              else if (r && ue.test(p))
                (P = "," === m.charAt(m.length - 1) ? ")," : ")"),
                  (k = -1 !== m.indexOf("hsl") && Y),
                  (p = he(p, k)),
                  (m = he(m, k)),
                  (x = p.length + m.length > 6),
                  x && !Y && 0 === m[3]
                    ? ((a["xs" + a.l] += a.l ? " transparent" : "transparent"),
                      (a.e = a.e.split(R[u]).join("transparent")))
                    : (Y || (x = !1),
                      k
                        ? a
                            .appendXtra(
                              x ? "hsla(" : "hsl(",
                              p[0],
                              re(m[0], p[0]),
                              ",",
                              !1,
                              !0,
                            )
                            .appendXtra("", p[1], re(m[1], p[1]), "%,", !1)
                            .appendXtra(
                              "",
                              p[2],
                              re(m[2], p[2]),
                              x ? "%," : "%" + P,
                              !1,
                            )
                        : a
                            .appendXtra(
                              x ? "rgba(" : "rgb(",
                              p[0],
                              m[0] - p[0],
                              ",",
                              !0,
                              !0,
                            )
                            .appendXtra("", p[1], m[1] - p[1], ",", !0)
                            .appendXtra("", p[2], m[2] - p[2], x ? "," : P, !0),
                      x &&
                        ((p = 4 > p.length ? 1 : p[3]),
                        a.appendXtra(
                          "",
                          p,
                          (4 > m.length ? 1 : m[3]) - p,
                          P,
                          !1,
                        ))),
                  (ue.lastIndex = 0);
              else if ((v = p.match(d))) {
                if (((y = m.match(g)), !y || y.length !== v.length)) return a;
                for (f = 0, c = 0; v.length > c; c++)
                  (b = v[c]),
                    (w = p.indexOf(b, f)),
                    a.appendXtra(
                      p.substr(f, w - f),
                      Number(b),
                      re(y[c], b),
                      "",
                      A && "px" === p.substr(w + b.length, 2),
                      0 === c,
                    ),
                    (f = w + b.length);
                a["xs" + a.l] += p.substr(f);
              } else a["xs" + a.l] += a.l ? " " + p : p;
            if (-1 !== s.indexOf("=") && a.data) {
              for (P = a.xs0 + a.data.s, u = 1; a.l > u; u++)
                P += a["xs" + u] + a.data["xn" + u];
              a.e = P + a["xs" + u];
            }
            return a.l || ((a.type = -1), (a.xs0 = a.e)), a.xfirst || a;
          }),
          ve = 9;
        for (h = me.prototype, h.l = h.pr = 0; --ve > 0; )
          (h["xn" + ve] = 0), (h["xs" + ve] = "");
        (h.xs0 = ""),
          (h._next =
            h._prev =
            h.xfirst =
            h.data =
            h.plugin =
            h.setRatio =
            h.rxp =
              null),
          (h.appendXtra = function (t, e, i, s, r, n) {
            var a = this,
              o = a.l;
            return (
              (a["xs" + o] += n && o ? " " + t : t || ""),
              i || 0 === o || a.plugin
                ? (a.l++,
                  (a.type = a.setRatio ? 2 : 1),
                  (a["xs" + a.l] = s || ""),
                  o > 0
                    ? ((a.data["xn" + o] = e + i),
                      (a.rxp["xn" + o] = r),
                      (a["xn" + o] = e),
                      a.plugin ||
                        ((a.xfirst = new me(
                          a,
                          "xn" + o,
                          e,
                          i,
                          a.xfirst || a,
                          0,
                          a.n,
                          r,
                          a.pr,
                        )),
                        (a.xfirst.xs0 = 0)),
                      a)
                    : ((a.data = { s: e + i }),
                      (a.rxp = {}),
                      (a.s = e),
                      (a.c = i),
                      (a.r = r),
                      a))
                : ((a["xs" + o] += e + (s || "")), a)
            );
          });
        var ye = function (t, e) {
            (e = e || {}),
              (this.p = e.prefix ? W(t) || t : t),
              (l[t] = l[this.p] = this),
              (this.format =
                e.formatter ||
                ce(e.defaultValue, e.color, e.collapsible, e.multi)),
              e.parser && (this.parse = e.parser),
              (this.clrs = e.color),
              (this.multi = e.multi),
              (this.keyword = e.keyword),
              (this.dflt = e.defaultValue),
              (this.pr = e.priority || 0);
          },
          Te = (B._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = { parser: i });
            var s,
              r,
              n = t.split(","),
              a = e.defaultValue;
            for (i = i || [a], s = 0; n.length > s; s++)
              (e.prefix = 0 === s && e.prefix),
                (e.defaultValue = i[s] || a),
                (r = new ye(n[s], e));
          }),
          xe = function (t) {
            if (!l[t]) {
              var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
              Te(t, {
                parser: function (t, i, s, r, n, a, h) {
                  var _ = o.com.greensock.plugins[e];
                  return _
                    ? (_._cssRegister(), l[s].parse(t, i, s, r, n, a, h))
                    : (q("Error: " + e + " js file not loaded."), n);
                },
              });
            }
          };
        (h = ye.prototype),
          (h.parseComplex = function (t, e, i, s, r, n) {
            var a,
              o,
              l,
              h,
              _,
              u,
              c = this.keyword;
            if (
              (this.multi &&
                (M.test(i) || M.test(e)
                  ? ((o = e.replace(M, "|").split("|")),
                    (l = i.replace(M, "|").split("|")))
                  : c && ((o = [e]), (l = [i]))),
              l)
            ) {
              for (
                h = l.length > o.length ? l.length : o.length, a = 0;
                h > a;
                a++
              )
                (e = o[a] = o[a] || this.dflt),
                  (i = l[a] = l[a] || this.dflt),
                  c &&
                    ((_ = e.indexOf(c)),
                    (u = i.indexOf(c)),
                    _ !== u &&
                      (-1 === u
                        ? (o[a] = o[a].split(c).join(""))
                        : -1 === _ && (o[a] += " " + c)));
              (e = o.join(", ")), (i = l.join(", "));
            }
            return ge(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n);
          }),
          (h.parse = function (t, e, i, s, n, a) {
            return this.parseComplex(
              t.style,
              this.format(Q(t, this.p, r, !1, this.dflt)),
              this.format(e),
              n,
              a,
            );
          }),
          (a.registerSpecialProp = function (t, e, i) {
            Te(t, {
              parser: function (t, s, r, n, a, o) {
                var l = new me(t, r, 0, 0, a, 2, r, !1, i);
                return (l.plugin = o), (l.setRatio = e(t, s, n._tween, r)), l;
              },
              priority: i,
            });
          }),
          (a.useSVGTransformAttr = c || f);
        var we,
          be =
            "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
              ",",
            ),
          Pe = W("transform"),
          ke = V + "transform",
          Se = W("transformOrigin"),
          Re = null !== W("perspective"),
          Oe = (B.Transform = function () {
            (this.perspective = parseFloat(a.defaultTransformPerspective) || 0),
              (this.force3D =
                a.defaultForce3D !== !1 && Re
                  ? a.defaultForce3D || "auto"
                  : !1);
          }),
          Ae = window.SVGElement,
          Ce = function (t, e, i) {
            var s,
              r = E.createElementNS("http://www.w3.org/2000/svg", t),
              n = /([a-z])([A-Z])/g;
            for (s in i)
              r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
            return e.appendChild(r), r;
          },
          De = E.documentElement,
          Me = (function () {
            var t,
              e,
              i,
              s = m || (/Android/i.test(j) && !window.chrome);
            return (
              E.createElementNS &&
                !s &&
                ((t = Ce("svg", De)),
                (e = Ce("rect", t, { width: 100, height: 50, x: 100 })),
                (i = e.getBoundingClientRect().width),
                (e.style[Se] = "50% 50%"),
                (e.style[Pe] = "scaleX(0.5)"),
                (s = i === e.getBoundingClientRect().width && !(f && Re)),
                De.removeChild(t)),
              s
            );
          })(),
          ze = function (t, e, i, s, r) {
            var n,
              o,
              l,
              h,
              _,
              u,
              c,
              f,
              p,
              m,
              d,
              g,
              v,
              y,
              T = t._gsTransform,
              x = Ee(t, !0);
            T && ((v = T.xOrigin), (y = T.yOrigin)),
              (!s || 2 > (n = s.split(" ")).length) &&
                ((c = t.getBBox()),
                (e = se(e).split(" ")),
                (n = [
                  (-1 !== e[0].indexOf("%")
                    ? (parseFloat(e[0]) / 100) * c.width
                    : parseFloat(e[0])) + c.x,
                  (-1 !== e[1].indexOf("%")
                    ? (parseFloat(e[1]) / 100) * c.height
                    : parseFloat(e[1])) + c.y,
                ])),
              (i.xOrigin = h = parseFloat(n[0])),
              (i.yOrigin = _ = parseFloat(n[1])),
              s &&
                x !== Ie &&
                ((u = x[0]),
                (c = x[1]),
                (f = x[2]),
                (p = x[3]),
                (m = x[4]),
                (d = x[5]),
                (g = u * p - c * f),
                (o = h * (p / g) + _ * (-f / g) + (f * d - p * m) / g),
                (l = h * (-c / g) + _ * (u / g) - (u * d - c * m) / g),
                (h = i.xOrigin = n[0] = o),
                (_ = i.yOrigin = n[1] = l)),
              T &&
                (r || (r !== !1 && a.defaultSmoothOrigin !== !1)
                  ? ((o = h - v),
                    (l = _ - y),
                    (T.xOffset += o * x[0] + l * x[2] - o),
                    (T.yOffset += o * x[1] + l * x[3] - l))
                  : (T.xOffset = T.yOffset = 0)),
              t.setAttribute("data-svg-origin", n.join(" "));
          },
          Fe = function (t) {
            return !!(
              Ae &&
              "function" == typeof t.getBBox &&
              t.getCTM &&
              (!t.parentNode || (t.parentNode.getBBox && t.parentNode.getCTM))
            );
          },
          Ie = [1, 0, 0, 1, 0, 0],
          Ee = function (t, e) {
            var i,
              s,
              r,
              n,
              a,
              o = t._gsTransform || new Oe(),
              l = 1e5;
            if (
              (Pe
                ? (s = Q(t, ke, null, !0))
                : t.currentStyle &&
                  ((s = t.currentStyle.filter.match(C)),
                  (s =
                    s && 4 === s.length
                      ? [
                          s[0].substr(4),
                          Number(s[2].substr(4)),
                          Number(s[1].substr(4)),
                          s[3].substr(4),
                          o.x || 0,
                          o.y || 0,
                        ].join(",")
                      : "")),
              (i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s),
              (o.svg || (t.getBBox && Fe(t))) &&
                (i &&
                  -1 !== (t.style[Pe] + "").indexOf("matrix") &&
                  ((s = t.style[Pe]), (i = 0)),
                (r = t.getAttribute("transform")),
                i &&
                  r &&
                  (-1 !== r.indexOf("matrix")
                    ? ((s = r), (i = 0))
                    : -1 !== r.indexOf("translate") &&
                      ((s =
                        "matrix(1,0,0,1," +
                        r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") +
                        ")"),
                      (i = 0)))),
              i)
            )
              return Ie;
            for (
              r = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [],
                ve = r.length;
              --ve > -1;

            )
              (n = Number(r[ve])),
                (r[ve] = (a = n - (n |= 0))
                  ? (0 | (a * l + (0 > a ? -0.5 : 0.5))) / l + n
                  : n);
            return e && r.length > 6
              ? [r[0], r[1], r[4], r[5], r[12], r[13]]
              : r;
          },
          Ne = (B.getTransform = function (t, i, s, n) {
            if (t._gsTransform && s && !n) return t._gsTransform;
            var o,
              l,
              h,
              _,
              u,
              c,
              f = s ? t._gsTransform || new Oe() : new Oe(),
              p = 0 > f.scaleX,
              m = 2e-5,
              d = 1e5,
              g = Re
                ? parseFloat(Q(t, Se, i, !1, "0 0 0").split(" ")[2]) ||
                  f.zOrigin ||
                  0
                : 0,
              v = parseFloat(a.defaultTransformPerspective) || 0;
            if (
              ((f.svg = !(!t.getBBox || !Fe(t))),
              f.svg &&
                (ze(
                  t,
                  Q(t, Se, r, !1, "50% 50%") + "",
                  f,
                  t.getAttribute("data-svg-origin"),
                ),
                (we = a.useSVGTransformAttr || Me)),
              (o = Ee(t)),
              o !== Ie)
            ) {
              if (16 === o.length) {
                var y,
                  T,
                  x,
                  w,
                  b,
                  P = o[0],
                  k = o[1],
                  S = o[2],
                  R = o[3],
                  O = o[4],
                  A = o[5],
                  C = o[6],
                  D = o[7],
                  M = o[8],
                  z = o[9],
                  I = o[10],
                  E = o[12],
                  N = o[13],
                  L = o[14],
                  X = o[11],
                  B = Math.atan2(C, I);
                f.zOrigin &&
                  ((L = -f.zOrigin),
                  (E = M * L - o[12]),
                  (N = z * L - o[13]),
                  (L = I * L + f.zOrigin - o[14])),
                  (f.rotationX = B * F),
                  B &&
                    ((w = Math.cos(-B)),
                    (b = Math.sin(-B)),
                    (y = O * w + M * b),
                    (T = A * w + z * b),
                    (x = C * w + I * b),
                    (M = O * -b + M * w),
                    (z = A * -b + z * w),
                    (I = C * -b + I * w),
                    (X = D * -b + X * w),
                    (O = y),
                    (A = T),
                    (C = x)),
                  (B = Math.atan2(M, I)),
                  (f.rotationY = B * F),
                  B &&
                    ((w = Math.cos(-B)),
                    (b = Math.sin(-B)),
                    (y = P * w - M * b),
                    (T = k * w - z * b),
                    (x = S * w - I * b),
                    (z = k * b + z * w),
                    (I = S * b + I * w),
                    (X = R * b + X * w),
                    (P = y),
                    (k = T),
                    (S = x)),
                  (B = Math.atan2(k, P)),
                  (f.rotation = B * F),
                  B &&
                    ((w = Math.cos(-B)),
                    (b = Math.sin(-B)),
                    (P = P * w + O * b),
                    (T = k * w + A * b),
                    (A = k * -b + A * w),
                    (C = S * -b + C * w),
                    (k = T)),
                  f.rotationX &&
                    Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 &&
                    ((f.rotationX = f.rotation = 0), (f.rotationY += 180)),
                  (f.scaleX = (0 | (Math.sqrt(P * P + k * k) * d + 0.5)) / d),
                  (f.scaleY = (0 | (Math.sqrt(A * A + z * z) * d + 0.5)) / d),
                  (f.scaleZ = (0 | (Math.sqrt(C * C + I * I) * d + 0.5)) / d),
                  (f.skewX = 0),
                  (f.perspective = X ? 1 / (0 > X ? -X : X) : 0),
                  (f.x = E),
                  (f.y = N),
                  (f.z = L),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * P - f.yOrigin * O)),
                    (f.y -= f.yOrigin - (f.yOrigin * k - f.xOrigin * A)));
              } else if (
                !(
                  (Re &&
                    !n &&
                    o.length &&
                    f.x === o[4] &&
                    f.y === o[5] &&
                    (f.rotationX || f.rotationY)) ||
                  (void 0 !== f.x && "none" === Q(t, "display", i))
                )
              ) {
                var j = o.length >= 6,
                  Y = j ? o[0] : 1,
                  U = o[1] || 0,
                  q = o[2] || 0,
                  V = j ? o[3] : 1;
                (f.x = o[4] || 0),
                  (f.y = o[5] || 0),
                  (h = Math.sqrt(Y * Y + U * U)),
                  (_ = Math.sqrt(V * V + q * q)),
                  (u = Y || U ? Math.atan2(U, Y) * F : f.rotation || 0),
                  (c = q || V ? Math.atan2(q, V) * F + u : f.skewX || 0),
                  Math.abs(c) > 90 &&
                    270 > Math.abs(c) &&
                    (p
                      ? ((h *= -1),
                        (c += 0 >= u ? 180 : -180),
                        (u += 0 >= u ? 180 : -180))
                      : ((_ *= -1), (c += 0 >= c ? 180 : -180))),
                  (f.scaleX = h),
                  (f.scaleY = _),
                  (f.rotation = u),
                  (f.skewX = c),
                  Re &&
                    ((f.rotationX = f.rotationY = f.z = 0),
                    (f.perspective = v),
                    (f.scaleZ = 1)),
                  f.svg &&
                    ((f.x -= f.xOrigin - (f.xOrigin * Y + f.yOrigin * q)),
                    (f.y -= f.yOrigin - (f.xOrigin * U + f.yOrigin * V)));
              }
              f.zOrigin = g;
              for (l in f) m > f[l] && f[l] > -m && (f[l] = 0);
            }
            return (
              s &&
                ((t._gsTransform = f),
                f.svg &&
                  (we && t.style[Pe]
                    ? e.delayedCall(0.001, function () {
                        je(t.style, Pe);
                      })
                    : !we &&
                      t.getAttribute("transform") &&
                      e.delayedCall(0.001, function () {
                        t.removeAttribute("transform");
                      }))),
              f
            );
          }),
          Le = function (t) {
            var e,
              i,
              s = this.data,
              r = -s.rotation * z,
              n = r + s.skewX * z,
              a = 1e5,
              o = (0 | (Math.cos(r) * s.scaleX * a)) / a,
              l = (0 | (Math.sin(r) * s.scaleX * a)) / a,
              h = (0 | (Math.sin(n) * -s.scaleY * a)) / a,
              _ = (0 | (Math.cos(n) * s.scaleY * a)) / a,
              u = this.t.style,
              c = this.t.currentStyle;
            if (c) {
              (i = l), (l = -h), (h = -i), (e = c.filter), (u.filter = "");
              var f,
                p,
                d = this.t.offsetWidth,
                g = this.t.offsetHeight,
                v = "absolute" !== c.position,
                y =
                  "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                  o +
                  ", M12=" +
                  l +
                  ", M21=" +
                  h +
                  ", M22=" +
                  _,
                w = s.x + (d * s.xPercent) / 100,
                b = s.y + (g * s.yPercent) / 100;
              if (
                (null != s.ox &&
                  ((f = (s.oxp ? 0.01 * d * s.ox : s.ox) - d / 2),
                  (p = (s.oyp ? 0.01 * g * s.oy : s.oy) - g / 2),
                  (w += f - (f * o + p * l)),
                  (b += p - (f * h + p * _))),
                v
                  ? ((f = d / 2),
                    (p = g / 2),
                    (y +=
                      ", Dx=" +
                      (f - (f * o + p * l) + w) +
                      ", Dy=" +
                      (p - (f * h + p * _) + b) +
                      ")"))
                  : (y += ", sizingMethod='auto expand')"),
                (u.filter =
                  -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(")
                    ? e.replace(D, y)
                    : y + " " + e),
                (0 === t || 1 === t) &&
                  1 === o &&
                  0 === l &&
                  0 === h &&
                  1 === _ &&
                  ((v && -1 === y.indexOf("Dx=0, Dy=0")) ||
                    (x.test(e) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === e.indexOf("gradient(" && e.indexOf("Alpha")) &&
                      u.removeAttribute("filter"))),
                !v)
              ) {
                var P,
                  k,
                  S,
                  R = 8 > m ? 1 : -1;
                for (
                  f = s.ieOffsetX || 0,
                    p = s.ieOffsetY || 0,
                    s.ieOffsetX = Math.round(
                      (d - ((0 > o ? -o : o) * d + (0 > l ? -l : l) * g)) / 2 +
                        w,
                    ),
                    s.ieOffsetY = Math.round(
                      (g - ((0 > _ ? -_ : _) * g + (0 > h ? -h : h) * d)) / 2 +
                        b,
                    ),
                    ve = 0;
                  4 > ve;
                  ve++
                )
                  (k = ee[ve]),
                    (P = c[k]),
                    (i =
                      -1 !== P.indexOf("px")
                        ? parseFloat(P)
                        : $(this.t, k, parseFloat(P), P.replace(T, "")) || 0),
                    (S =
                      i !== s[k]
                        ? 2 > ve
                          ? -s.ieOffsetX
                          : -s.ieOffsetY
                        : 2 > ve
                          ? f - s.ieOffsetX
                          : p - s.ieOffsetY),
                    (u[k] =
                      (s[k] = Math.round(
                        i - S * (0 === ve || 2 === ve ? 1 : R),
                      )) + "px");
              }
            }
          },
          Xe =
            (B.set3DTransformRatio =
            B.setTransformRatio =
              function (t) {
                var e,
                  i,
                  s,
                  r,
                  n,
                  a,
                  o,
                  l,
                  h,
                  _,
                  u,
                  c,
                  p,
                  m,
                  d,
                  g,
                  v,
                  y,
                  T,
                  x,
                  w,
                  b,
                  P,
                  k = this.data,
                  S = this.t.style,
                  R = k.rotation,
                  O = k.rotationX,
                  A = k.rotationY,
                  C = k.scaleX,
                  D = k.scaleY,
                  M = k.scaleZ,
                  F = k.x,
                  I = k.y,
                  E = k.z,
                  N = k.svg,
                  L = k.perspective,
                  X = k.force3D;
                if (
                  !(
                    ((((1 !== t && 0 !== t) ||
                      "auto" !== X ||
                      (this.tween._totalTime !== this.tween._totalDuration &&
                        this.tween._totalTime)) &&
                      X) ||
                      E ||
                      L ||
                      A ||
                      O) &&
                    (!we || !N) &&
                    Re
                  )
                )
                  return (
                    R || k.skewX || N
                      ? ((R *= z),
                        (b = k.skewX * z),
                        (P = 1e5),
                        (e = Math.cos(R) * C),
                        (r = Math.sin(R) * C),
                        (i = Math.sin(R - b) * -D),
                        (n = Math.cos(R - b) * D),
                        b &&
                          "simple" === k.skewType &&
                          ((v = Math.tan(b)),
                          (v = Math.sqrt(1 + v * v)),
                          (i *= v),
                          (n *= v),
                          k.skewY && ((e *= v), (r *= v))),
                        N &&
                          ((F +=
                            k.xOrigin -
                            (k.xOrigin * e + k.yOrigin * i) +
                            k.xOffset),
                          (I +=
                            k.yOrigin -
                            (k.xOrigin * r + k.yOrigin * n) +
                            k.yOffset),
                          we &&
                            (k.xPercent || k.yPercent) &&
                            ((m = this.t.getBBox()),
                            (F += 0.01 * k.xPercent * m.width),
                            (I += 0.01 * k.yPercent * m.height)),
                          (m = 1e-6),
                          m > F && F > -m && (F = 0),
                          m > I && I > -m && (I = 0)),
                        (T =
                          (0 | (e * P)) / P +
                          "," +
                          (0 | (r * P)) / P +
                          "," +
                          (0 | (i * P)) / P +
                          "," +
                          (0 | (n * P)) / P +
                          "," +
                          F +
                          "," +
                          I +
                          ")"),
                        N && we
                          ? this.t.setAttribute("transform", "matrix(" + T)
                          : (S[Pe] =
                              (k.xPercent || k.yPercent
                                ? "translate(" +
                                  k.xPercent +
                                  "%," +
                                  k.yPercent +
                                  "%) matrix("
                                : "matrix(") + T))
                      : (S[Pe] =
                          (k.xPercent || k.yPercent
                            ? "translate(" +
                              k.xPercent +
                              "%," +
                              k.yPercent +
                              "%) matrix("
                            : "matrix(") +
                          C +
                          ",0,0," +
                          D +
                          "," +
                          F +
                          "," +
                          I +
                          ")"),
                    void 0
                  );
                if (
                  (f &&
                    ((m = 1e-4),
                    m > C && C > -m && (C = M = 2e-5),
                    m > D && D > -m && (D = M = 2e-5),
                    !L || k.z || k.rotationX || k.rotationY || (L = 0)),
                  R || k.skewX)
                )
                  (R *= z),
                    (d = e = Math.cos(R)),
                    (g = r = Math.sin(R)),
                    k.skewX &&
                      ((R -= k.skewX * z),
                      (d = Math.cos(R)),
                      (g = Math.sin(R)),
                      "simple" === k.skewType &&
                        ((v = Math.tan(k.skewX * z)),
                        (v = Math.sqrt(1 + v * v)),
                        (d *= v),
                        (g *= v),
                        k.skewY && ((e *= v), (r *= v)))),
                    (i = -g),
                    (n = d);
                else {
                  if (!(A || O || 1 !== M || L || N))
                    return (
                      (S[Pe] =
                        (k.xPercent || k.yPercent
                          ? "translate(" +
                            k.xPercent +
                            "%," +
                            k.yPercent +
                            "%) translate3d("
                          : "translate3d(") +
                        F +
                        "px," +
                        I +
                        "px," +
                        E +
                        "px)" +
                        (1 !== C || 1 !== D
                          ? " scale(" + C + "," + D + ")"
                          : "")),
                      void 0
                    );
                  (e = n = 1), (i = r = 0);
                }
                (h = 1),
                  (s = a = o = l = _ = u = 0),
                  (c = L ? -1 / L : 0),
                  (p = k.zOrigin),
                  (m = 1e-6),
                  (x = ","),
                  (w = "0"),
                  (R = A * z),
                  R &&
                    ((d = Math.cos(R)),
                    (g = Math.sin(R)),
                    (o = -g),
                    (_ = c * -g),
                    (s = e * g),
                    (a = r * g),
                    (h = d),
                    (c *= d),
                    (e *= d),
                    (r *= d)),
                  (R = O * z),
                  R &&
                    ((d = Math.cos(R)),
                    (g = Math.sin(R)),
                    (v = i * d + s * g),
                    (y = n * d + a * g),
                    (l = h * g),
                    (u = c * g),
                    (s = i * -g + s * d),
                    (a = n * -g + a * d),
                    (h *= d),
                    (c *= d),
                    (i = v),
                    (n = y)),
                  1 !== M && ((s *= M), (a *= M), (h *= M), (c *= M)),
                  1 !== D && ((i *= D), (n *= D), (l *= D), (u *= D)),
                  1 !== C && ((e *= C), (r *= C), (o *= C), (_ *= C)),
                  (p || N) &&
                    (p && ((F += s * -p), (I += a * -p), (E += h * -p + p)),
                    N &&
                      ((F +=
                        k.xOrigin -
                        (k.xOrigin * e + k.yOrigin * i) +
                        k.xOffset),
                      (I +=
                        k.yOrigin -
                        (k.xOrigin * r + k.yOrigin * n) +
                        k.yOffset)),
                    m > F && F > -m && (F = w),
                    m > I && I > -m && (I = w),
                    m > E && E > -m && (E = 0)),
                  (T =
                    k.xPercent || k.yPercent
                      ? "translate(" +
                        k.xPercent +
                        "%," +
                        k.yPercent +
                        "%) matrix3d("
                      : "matrix3d("),
                  (T +=
                    (m > e && e > -m ? w : e) +
                    x +
                    (m > r && r > -m ? w : r) +
                    x +
                    (m > o && o > -m ? w : o)),
                  (T +=
                    x +
                    (m > _ && _ > -m ? w : _) +
                    x +
                    (m > i && i > -m ? w : i) +
                    x +
                    (m > n && n > -m ? w : n)),
                  O || A
                    ? ((T +=
                        x +
                        (m > l && l > -m ? w : l) +
                        x +
                        (m > u && u > -m ? w : u) +
                        x +
                        (m > s && s > -m ? w : s)),
                      (T +=
                        x +
                        (m > a && a > -m ? w : a) +
                        x +
                        (m > h && h > -m ? w : h) +
                        x +
                        (m > c && c > -m ? w : c) +
                        x))
                    : (T += ",0,0,0,0,1,0,"),
                  (T += F + x + I + x + E + x + (L ? 1 + -E / L : 1) + ")"),
                  (S[Pe] = T);
              });
        (h = Oe.prototype),
          (h.x =
            h.y =
            h.z =
            h.skewX =
            h.skewY =
            h.rotation =
            h.rotationX =
            h.rotationY =
            h.zOrigin =
            h.xPercent =
            h.yPercent =
            h.xOffset =
            h.yOffset =
              0),
          (h.scaleX = h.scaleY = h.scaleZ = 1),
          Te(
            "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
            {
              parser: function (t, e, i, s, n, o, l) {
                if (s._lastParsedTransform === l) return n;
                s._lastParsedTransform = l;
                var h,
                  _,
                  u,
                  c,
                  f,
                  p,
                  m,
                  d,
                  g,
                  v,
                  y = t._gsTransform,
                  T = t.style,
                  x = 1e-6,
                  w = be.length,
                  b = l,
                  P = {},
                  k = "transformOrigin";
                if (
                  (l.display
                    ? ((c = Q(t, "display")),
                      (T.display = "block"),
                      (h = Ne(t, r, !0, l.parseTransform)),
                      (T.display = c))
                    : (h = Ne(t, r, !0, l.parseTransform)),
                  (s._transform = h),
                  "string" == typeof b.transform && Pe)
                )
                  (c = L.style),
                    (c[Pe] = b.transform),
                    (c.display = "block"),
                    (c.position = "absolute"),
                    E.body.appendChild(L),
                    (_ = Ne(L, null, !1)),
                    E.body.removeChild(L),
                    _.perspective || (_.perspective = h.perspective),
                    null != b.xPercent &&
                      (_.xPercent = ne(b.xPercent, h.xPercent)),
                    null != b.yPercent &&
                      (_.yPercent = ne(b.yPercent, h.yPercent));
                else if ("object" == typeof b) {
                  if (
                    ((_ = {
                      scaleX: ne(
                        null != b.scaleX ? b.scaleX : b.scale,
                        h.scaleX,
                      ),
                      scaleY: ne(
                        null != b.scaleY ? b.scaleY : b.scale,
                        h.scaleY,
                      ),
                      scaleZ: ne(b.scaleZ, h.scaleZ),
                      x: ne(b.x, h.x),
                      y: ne(b.y, h.y),
                      z: ne(b.z, h.z),
                      xPercent: ne(b.xPercent, h.xPercent),
                      yPercent: ne(b.yPercent, h.yPercent),
                      perspective: ne(b.transformPerspective, h.perspective),
                    }),
                    (d = b.directionalRotation),
                    null != d)
                  )
                    if ("object" == typeof d) for (c in d) b[c] = d[c];
                    else b.rotation = d;
                  "string" == typeof b.x &&
                    -1 !== b.x.indexOf("%") &&
                    ((_.x = 0), (_.xPercent = ne(b.x, h.xPercent))),
                    "string" == typeof b.y &&
                      -1 !== b.y.indexOf("%") &&
                      ((_.y = 0), (_.yPercent = ne(b.y, h.yPercent))),
                    (_.rotation = ae(
                      "rotation" in b
                        ? b.rotation
                        : "shortRotation" in b
                          ? b.shortRotation + "_short"
                          : "rotationZ" in b
                            ? b.rotationZ
                            : h.rotation,
                      h.rotation,
                      "rotation",
                      P,
                    )),
                    Re &&
                      ((_.rotationX = ae(
                        "rotationX" in b
                          ? b.rotationX
                          : "shortRotationX" in b
                            ? b.shortRotationX + "_short"
                            : h.rotationX || 0,
                        h.rotationX,
                        "rotationX",
                        P,
                      )),
                      (_.rotationY = ae(
                        "rotationY" in b
                          ? b.rotationY
                          : "shortRotationY" in b
                            ? b.shortRotationY + "_short"
                            : h.rotationY || 0,
                        h.rotationY,
                        "rotationY",
                        P,
                      ))),
                    (_.skewX =
                      null == b.skewX ? h.skewX : ae(b.skewX, h.skewX)),
                    (_.skewY =
                      null == b.skewY ? h.skewY : ae(b.skewY, h.skewY)),
                    (u = _.skewY - h.skewY) &&
                      ((_.skewX += u), (_.rotation += u));
                }
                for (
                  Re &&
                    null != b.force3D &&
                    ((h.force3D = b.force3D), (m = !0)),
                    h.skewType = b.skewType || h.skewType || a.defaultSkewType,
                    p =
                      h.force3D ||
                      h.z ||
                      h.rotationX ||
                      h.rotationY ||
                      _.z ||
                      _.rotationX ||
                      _.rotationY ||
                      _.perspective,
                    p || null == b.scale || (_.scaleZ = 1);
                  --w > -1;

                )
                  (i = be[w]),
                    (f = _[i] - h[i]),
                    (f > x || -x > f || null != b[i] || null != I[i]) &&
                      ((m = !0),
                      (n = new me(h, i, h[i], f, n)),
                      i in P && (n.e = P[i]),
                      (n.xs0 = 0),
                      (n.plugin = o),
                      s._overwriteProps.push(n.n));
                return (
                  (f = b.transformOrigin),
                  h.svg &&
                    (f || b.svgOrigin) &&
                    ((g = h.xOffset),
                    (v = h.yOffset),
                    ze(t, se(f), _, b.svgOrigin, b.smoothOrigin),
                    (n = de(
                      h,
                      "xOrigin",
                      (y ? h : _).xOrigin,
                      _.xOrigin,
                      n,
                      k,
                    )),
                    (n = de(
                      h,
                      "yOrigin",
                      (y ? h : _).yOrigin,
                      _.yOrigin,
                      n,
                      k,
                    )),
                    (g !== h.xOffset || v !== h.yOffset) &&
                      ((n = de(
                        h,
                        "xOffset",
                        y ? g : h.xOffset,
                        h.xOffset,
                        n,
                        k,
                      )),
                      (n = de(
                        h,
                        "yOffset",
                        y ? v : h.yOffset,
                        h.yOffset,
                        n,
                        k,
                      ))),
                    (f = we ? null : "0px 0px")),
                  (f || (Re && p && h.zOrigin)) &&
                    (Pe
                      ? ((m = !0),
                        (i = Se),
                        (f = (f || Q(t, i, r, !1, "50% 50%")) + ""),
                        (n = new me(T, i, 0, 0, n, -1, k)),
                        (n.b = T[i]),
                        (n.plugin = o),
                        Re
                          ? ((c = h.zOrigin),
                            (f = f.split(" ")),
                            (h.zOrigin =
                              (f.length > 2 && (0 === c || "0px" !== f[2])
                                ? parseFloat(f[2])
                                : c) || 0),
                            (n.xs0 = n.e =
                              f[0] + " " + (f[1] || "50%") + " 0px"),
                            (n = new me(h, "zOrigin", 0, 0, n, -1, n.n)),
                            (n.b = c),
                            (n.xs0 = n.e = h.zOrigin))
                          : (n.xs0 = n.e = f))
                      : se(f + "", h)),
                  m &&
                    (s._transformType =
                      (h.svg && we) || (!p && 3 !== this._transformType)
                        ? 2
                        : 3),
                  n
                );
              },
              prefix: !0,
            },
          ),
          Te("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset",
          }),
          Te("borderRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, n, a) {
              e = this.format(e);
              var o,
                l,
                h,
                _,
                u,
                c,
                f,
                p,
                m,
                d,
                g,
                v,
                y,
                T,
                x,
                w,
                b = [
                  "borderTopLeftRadius",
                  "borderTopRightRadius",
                  "borderBottomRightRadius",
                  "borderBottomLeftRadius",
                ],
                P = t.style;
              for (
                m = parseFloat(t.offsetWidth),
                  d = parseFloat(t.offsetHeight),
                  o = e.split(" "),
                  l = 0;
                b.length > l;
                l++
              )
                this.p.indexOf("border") && (b[l] = W(b[l])),
                  (u = _ = Q(t, b[l], r, !1, "0px")),
                  -1 !== u.indexOf(" ") &&
                    ((_ = u.split(" ")), (u = _[0]), (_ = _[1])),
                  (c = h = o[l]),
                  (f = parseFloat(u)),
                  (v = u.substr((f + "").length)),
                  (y = "=" === c.charAt(1)),
                  y
                    ? ((p = parseInt(c.charAt(0) + "1", 10)),
                      (c = c.substr(2)),
                      (p *= parseFloat(c)),
                      (g = c.substr((p + "").length - (0 > p ? 1 : 0)) || ""))
                    : ((p = parseFloat(c)), (g = c.substr((p + "").length))),
                  "" === g && (g = s[i] || v),
                  g !== v &&
                    ((T = $(t, "borderLeft", f, v)),
                    (x = $(t, "borderTop", f, v)),
                    "%" === g
                      ? ((u = 100 * (T / m) + "%"), (_ = 100 * (x / d) + "%"))
                      : "em" === g
                        ? ((w = $(t, "borderLeft", 1, "em")),
                          (u = T / w + "em"),
                          (_ = x / w + "em"))
                        : ((u = T + "px"), (_ = x + "px")),
                    y &&
                      ((c = parseFloat(u) + p + g),
                      (h = parseFloat(_) + p + g))),
                  (a = ge(P, b[l], u + " " + _, c + " " + h, !1, "0px", a));
              return a;
            },
            prefix: !0,
            formatter: ce("0px 0px 0px 0px", !1, !0),
          }),
          Te("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (t, e, i, s, n, a) {
              var o,
                l,
                h,
                _,
                u,
                c,
                f = "background-position",
                p = r || Z(t, null),
                d = this.format(
                  (p
                    ? m
                      ? p.getPropertyValue(f + "-x") +
                        " " +
                        p.getPropertyValue(f + "-y")
                      : p.getPropertyValue(f)
                    : t.currentStyle.backgroundPositionX +
                      " " +
                      t.currentStyle.backgroundPositionY) || "0 0",
                ),
                g = this.format(e);
              if (
                (-1 !== d.indexOf("%")) != (-1 !== g.indexOf("%")) &&
                ((c = Q(t, "backgroundImage").replace(R, "")),
                c && "none" !== c)
              ) {
                for (
                  o = d.split(" "),
                    l = g.split(" "),
                    X.setAttribute("src", c),
                    h = 2;
                  --h > -1;

                )
                  (d = o[h]),
                    (_ = -1 !== d.indexOf("%")),
                    _ !== (-1 !== l[h].indexOf("%")) &&
                      ((u =
                        0 === h
                          ? t.offsetWidth - X.width
                          : t.offsetHeight - X.height),
                      (o[h] = _
                        ? (parseFloat(d) / 100) * u + "px"
                        : 100 * (parseFloat(d) / u) + "%"));
                d = o.join(" ");
              }
              return this.parseComplex(t.style, d, g, n, a);
            },
            formatter: se,
          }),
          Te("backgroundSize", { defaultValue: "0 0", formatter: se }),
          Te("perspective", { defaultValue: "0px", prefix: !0 }),
          Te("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }),
          Te("transformStyle", { prefix: !0 }),
          Te("backfaceVisibility", { prefix: !0 }),
          Te("userSelect", { prefix: !0 }),
          Te("margin", {
            parser: fe("marginTop,marginRight,marginBottom,marginLeft"),
          }),
          Te("padding", {
            parser: fe("paddingTop,paddingRight,paddingBottom,paddingLeft"),
          }),
          Te("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, s, n, a) {
              var o, l, h;
              return (
                9 > m
                  ? ((l = t.currentStyle),
                    (h = 8 > m ? " " : ","),
                    (o =
                      "rect(" +
                      l.clipTop +
                      h +
                      l.clipRight +
                      h +
                      l.clipBottom +
                      h +
                      l.clipLeft +
                      ")"),
                    (e = this.format(e).split(",").join(h)))
                  : ((o = this.format(Q(t, this.p, r, !1, this.dflt))),
                    (e = this.format(e))),
                this.parseComplex(t.style, o, e, n, a)
              );
            },
          }),
          Te("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0,
          }),
          Te("autoRound,strictUnits", {
            parser: function (t, e, i, s, r) {
              return r;
            },
          }),
          Te("border", {
            defaultValue: "0px solid #000",
            parser: function (t, e, i, s, n, a) {
              return this.parseComplex(
                t.style,
                this.format(
                  Q(t, "borderTopWidth", r, !1, "0px") +
                    " " +
                    Q(t, "borderTopStyle", r, !1, "solid") +
                    " " +
                    Q(t, "borderTopColor", r, !1, "#000"),
                ),
                this.format(e),
                n,
                a,
              );
            },
            color: !0,
            formatter: function (t) {
              var e = t.split(" ");
              return (
                e[0] +
                " " +
                (e[1] || "solid") +
                " " +
                (t.match(ue) || ["#000"])[0]
              );
            },
          }),
          Te("borderWidth", {
            parser: fe(
              "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth",
            ),
          }),
          Te("float,cssFloat,styleFloat", {
            parser: function (t, e, i, s, r) {
              var n = t.style,
                a = "cssFloat" in n ? "cssFloat" : "styleFloat";
              return new me(n, a, 0, 0, r, -1, i, !1, 0, n[a], e);
            },
          });
        var Be = function (t) {
          var e,
            i = this.t,
            s = i.filter || Q(this.data, "filter") || "",
            r = 0 | (this.s + this.c * t);
          100 === r &&
            (-1 === s.indexOf("atrix(") &&
            -1 === s.indexOf("radient(") &&
            -1 === s.indexOf("oader(")
              ? (i.removeAttribute("filter"), (e = !Q(this.data, "filter")))
              : ((i.filter = s.replace(b, "")), (e = !0))),
            e ||
              (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"),
              -1 === s.indexOf("pacity")
                ? (0 === r && this.xn1) ||
                  (i.filter = s + " alpha(opacity=" + r + ")")
                : (i.filter = s.replace(x, "opacity=" + r)));
        };
        Te("opacity,alpha,autoAlpha", {
          defaultValue: "1",
          parser: function (t, e, i, s, n, a) {
            var o = parseFloat(Q(t, "opacity", r, !1, "1")),
              l = t.style,
              h = "autoAlpha" === i;
            return (
              "string" == typeof e &&
                "=" === e.charAt(1) &&
                (e =
                  ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o),
              h &&
                1 === o &&
                "hidden" === Q(t, "visibility", r) &&
                0 !== e &&
                (o = 0),
              Y
                ? (n = new me(l, "opacity", o, e - o, n))
                : ((n = new me(l, "opacity", 100 * o, 100 * (e - o), n)),
                  (n.xn1 = h ? 1 : 0),
                  (l.zoom = 1),
                  (n.type = 2),
                  (n.b = "alpha(opacity=" + n.s + ")"),
                  (n.e = "alpha(opacity=" + (n.s + n.c) + ")"),
                  (n.data = t),
                  (n.plugin = a),
                  (n.setRatio = Be)),
              h &&
                ((n = new me(
                  l,
                  "visibility",
                  0,
                  0,
                  n,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== o ? "inherit" : "hidden",
                  0 === e ? "hidden" : "inherit",
                )),
                (n.xs0 = "inherit"),
                s._overwriteProps.push(n.n),
                s._overwriteProps.push(i)),
              n
            );
          },
        });
        var je = function (t, e) {
            e &&
              (t.removeProperty
                ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) &&
                    (e = "-" + e),
                  t.removeProperty(e.replace(k, "-$1").toLowerCase()))
                : t.removeAttribute(e));
          },
          Ye = function (t) {
            if (((this.t._gsClassPT = this), 1 === t || 0 === t)) {
              this.t.setAttribute("class", 0 === t ? this.b : this.e);
              for (var e = this.data, i = this.t.style; e; )
                e.v ? (i[e.p] = e.v) : je(i, e.p), (e = e._next);
              1 === t &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else
              this.t.getAttribute("class") !== this.e &&
                this.t.setAttribute("class", this.e);
          };
        Te("className", {
          parser: function (t, e, s, n, a, o, l) {
            var h,
              _,
              u,
              c,
              f,
              p = t.getAttribute("class") || "",
              m = t.style.cssText;
            if (
              ((a = n._classNamePT = new me(t, s, 0, 0, a, 2)),
              (a.setRatio = Ye),
              (a.pr = -11),
              (i = !0),
              (a.b = p),
              (_ = K(t, r)),
              (u = t._gsClassPT))
            ) {
              for (c = {}, f = u.data; f; ) (c[f.p] = 1), (f = f._next);
              u.setRatio(1);
            }
            return (
              (t._gsClassPT = a),
              (a.e =
                "=" !== e.charAt(1)
                  ? e
                  : p.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") +
                    ("+" === e.charAt(0) ? " " + e.substr(2) : "")),
              t.setAttribute("class", a.e),
              (h = J(t, _, K(t), l, c)),
              t.setAttribute("class", p),
              (a.data = h.firstMPT),
              (t.style.cssText = m),
              (a = a.xfirst = n.parse(t, h.difs, a, o))
            );
          },
        });
        var Ue = function (t) {
          if (
            (1 === t || 0 === t) &&
            this.data._totalTime === this.data._totalDuration &&
            "isFromStart" !== this.data.data
          ) {
            var e,
              i,
              s,
              r,
              n,
              a = this.t.style,
              o = l.transform.parse;
            if ("all" === this.e) (a.cssText = ""), (r = !0);
            else
              for (
                e = this.e.split(" ").join("").split(","), s = e.length;
                --s > -1;

              )
                (i = e[s]),
                  l[i] &&
                    (l[i].parse === o
                      ? (r = !0)
                      : (i = "transformOrigin" === i ? Se : l[i].p)),
                  je(a, i);
            r &&
              (je(a, Pe),
              (n = this.t._gsTransform),
              n &&
                (n.svg && this.t.removeAttribute("data-svg-origin"),
                delete this.t._gsTransform));
          }
        };
        for (
          Te("clearProps", {
            parser: function (t, e, s, r, n) {
              return (
                (n = new me(t, s, 0, 0, n, 2)),
                (n.setRatio = Ue),
                (n.e = e),
                (n.pr = -10),
                (n.data = r._tween),
                (i = !0),
                n
              );
            },
          }),
            h = "bezier,throwProps,physicsProps,physics2D".split(","),
            ve = h.length;
          ve--;

        )
          xe(h[ve]);
        (h = a.prototype),
          (h._firstPT = h._lastParsedTransform = h._transform = null),
          (h._onInitTween = function (t, e, o) {
            if (!t.nodeType) return !1;
            (this._target = t),
              (this._tween = o),
              (this._vars = e),
              (_ = e.autoRound),
              (i = !1),
              (s = e.suffixMap || a.suffixMap),
              (r = Z(t, "")),
              (n = this._overwriteProps);
            var h,
              f,
              m,
              d,
              g,
              v,
              y,
              T,
              x,
              b = t.style;
            if (
              (u &&
                "" === b.zIndex &&
                ((h = Q(t, "zIndex", r)),
                ("auto" === h || "" === h) && this._addLazySet(b, "zIndex", 0)),
              "string" == typeof e &&
                ((d = b.cssText),
                (h = K(t, r)),
                (b.cssText = d + ";" + e),
                (h = J(t, h, K(t)).difs),
                !Y && w.test(e) && (h.opacity = parseFloat(RegExp.$1)),
                (e = h),
                (b.cssText = d)),
              (this._firstPT = f =
                e.className
                  ? l.className.parse(
                      t,
                      e.className,
                      "className",
                      this,
                      null,
                      null,
                      e,
                    )
                  : this.parse(t, e, null)),
              this._transformType)
            ) {
              for (
                x = 3 === this._transformType,
                  Pe
                    ? c &&
                      ((u = !0),
                      "" === b.zIndex &&
                        ((y = Q(t, "zIndex", r)),
                        ("auto" === y || "" === y) &&
                          this._addLazySet(b, "zIndex", 0)),
                      p &&
                        this._addLazySet(
                          b,
                          "WebkitBackfaceVisibility",
                          this._vars.WebkitBackfaceVisibility ||
                            (x ? "visible" : "hidden"),
                        ))
                    : (b.zoom = 1),
                  m = f;
                m && m._next;

              )
                m = m._next;
              (T = new me(t, "transform", 0, 0, null, 2)),
                this._linkCSSP(T, null, m),
                (T.setRatio = Pe ? Xe : Le),
                (T.data = this._transform || Ne(t, r, !0)),
                (T.tween = o),
                (T.pr = -1),
                n.pop();
            }
            if (i) {
              for (; f; ) {
                for (v = f._next, m = d; m && m.pr > f.pr; ) m = m._next;
                (f._prev = m ? m._prev : g) ? (f._prev._next = f) : (d = f),
                  (f._next = m) ? (m._prev = f) : (g = f),
                  (f = v);
              }
              this._firstPT = d;
            }
            return !0;
          }),
          (h.parse = function (t, e, i, n) {
            var a,
              o,
              h,
              u,
              c,
              f,
              p,
              m,
              d,
              g,
              v = t.style;
            for (a in e)
              (f = e[a]),
                (o = l[a]),
                o
                  ? (i = o.parse(t, f, a, this, i, n, e))
                  : ((c = Q(t, a, r) + ""),
                    (d = "string" == typeof f),
                    "color" === a ||
                    "fill" === a ||
                    "stroke" === a ||
                    -1 !== a.indexOf("Color") ||
                    (d && P.test(f))
                      ? (d ||
                          ((f = he(f)),
                          (f =
                            (f.length > 3 ? "rgba(" : "rgb(") +
                            f.join(",") +
                            ")")),
                        (i = ge(v, a, c, f, !0, "transparent", i, 0, n)))
                      : !d || (-1 === f.indexOf(" ") && -1 === f.indexOf(","))
                        ? ((h = parseFloat(c)),
                          (p = h || 0 === h ? c.substr((h + "").length) : ""),
                          ("" === c || "auto" === c) &&
                            ("width" === a || "height" === a
                              ? ((h = ie(t, a, r)), (p = "px"))
                              : "left" === a || "top" === a
                                ? ((h = H(t, a, r)), (p = "px"))
                                : ((h = "opacity" !== a ? 0 : 1), (p = ""))),
                          (g = d && "=" === f.charAt(1)),
                          g
                            ? ((u = parseInt(f.charAt(0) + "1", 10)),
                              (f = f.substr(2)),
                              (u *= parseFloat(f)),
                              (m = f.replace(T, "")))
                            : ((u = parseFloat(f)),
                              (m = d ? f.replace(T, "") : "")),
                          "" === m && (m = a in s ? s[a] : p),
                          (f = u || 0 === u ? (g ? u + h : u) + m : e[a]),
                          p !== m &&
                            "" !== m &&
                            (u || 0 === u) &&
                            h &&
                            ((h = $(t, a, h, p)),
                            "%" === m
                              ? ((h /= $(t, a, 100, "%") / 100),
                                e.strictUnits !== !0 && (c = h + "%"))
                              : "em" === m || "rem" === m
                                ? (h /= $(t, a, 1, m))
                                : "px" !== m &&
                                  ((u = $(t, a, u, m)), (m = "px")),
                            g && (u || 0 === u) && (f = u + h + m)),
                          g && (u += h),
                          (!h && 0 !== h) || (!u && 0 !== u)
                            ? void 0 !== v[a] &&
                              (f || ("NaN" != f + "" && null != f))
                              ? ((i = new me(
                                  v,
                                  a,
                                  u || h || 0,
                                  0,
                                  i,
                                  -1,
                                  a,
                                  !1,
                                  0,
                                  c,
                                  f,
                                )),
                                (i.xs0 =
                                  "none" !== f ||
                                  ("display" !== a && -1 === a.indexOf("Style"))
                                    ? f
                                    : c))
                              : q("invalid " + a + " tween value: " + e[a])
                            : ((i = new me(
                                v,
                                a,
                                h,
                                u - h,
                                i,
                                0,
                                a,
                                _ !== !1 && ("px" === m || "zIndex" === a),
                                0,
                                c,
                                f,
                              )),
                              (i.xs0 = m)))
                        : (i = ge(v, a, c, f, !0, null, i, 0, n))),
                n && i && !i.plugin && (i.plugin = n);
            return i;
          }),
          (h.setRatio = function (t) {
            var e,
              i,
              s,
              r = this._firstPT,
              n = 1e-6;
            if (
              1 !== t ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            )
              if (
                t ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              )
                for (; r; ) {
                  if (
                    ((e = r.c * t + r.s),
                    r.r ? (e = Math.round(e)) : n > e && e > -n && (e = 0),
                    r.type)
                  )
                    if (1 === r.type)
                      if (((s = r.l), 2 === s))
                        r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                      else if (3 === s)
                        r.t[r.p] =
                          r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                      else if (4 === s)
                        r.t[r.p] =
                          r.xs0 +
                          e +
                          r.xs1 +
                          r.xn1 +
                          r.xs2 +
                          r.xn2 +
                          r.xs3 +
                          r.xn3 +
                          r.xs4;
                      else if (5 === s)
                        r.t[r.p] =
                          r.xs0 +
                          e +
                          r.xs1 +
                          r.xn1 +
                          r.xs2 +
                          r.xn2 +
                          r.xs3 +
                          r.xn3 +
                          r.xs4 +
                          r.xn4 +
                          r.xs5;
                      else {
                        for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++)
                          i += r["xn" + s] + r["xs" + (s + 1)];
                        r.t[r.p] = i;
                      }
                    else
                      -1 === r.type
                        ? (r.t[r.p] = r.xs0)
                        : r.setRatio && r.setRatio(t);
                  else r.t[r.p] = e + r.xs0;
                  r = r._next;
                }
              else
                for (; r; )
                  2 !== r.type ? (r.t[r.p] = r.b) : r.setRatio(t),
                    (r = r._next);
            else
              for (; r; ) {
                if (2 !== r.type)
                  if (r.r && -1 !== r.type)
                    if (((e = Math.round(r.s + r.c)), r.type)) {
                      if (1 === r.type) {
                        for (
                          s = r.l, i = r.xs0 + e + r.xs1, s = 1;
                          r.l > s;
                          s++
                        )
                          i += r["xn" + s] + r["xs" + (s + 1)];
                        r.t[r.p] = i;
                      }
                    } else r.t[r.p] = e + r.xs0;
                  else r.t[r.p] = r.e;
                else r.setRatio(t);
                r = r._next;
              }
          }),
          (h._enableTransforms = function (t) {
            (this._transform = this._transform || Ne(this._target, r, !0)),
              (this._transformType =
                (this._transform.svg && we) || (!t && 3 !== this._transformType)
                  ? 2
                  : 3);
          });
        var qe = function () {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (h._addLazySet = function (t, e, i) {
          var s = (this._firstPT = new me(t, e, 0, 0, this._firstPT, 2));
          (s.e = i), (s.setRatio = qe), (s.data = this);
        }),
          (h._linkCSSP = function (t, e, i, s) {
            return (
              t &&
                (e && (e._prev = t),
                t._next && (t._next._prev = t._prev),
                t._prev
                  ? (t._prev._next = t._next)
                  : this._firstPT === t &&
                    ((this._firstPT = t._next), (s = !0)),
                i
                  ? (i._next = t)
                  : s || null !== this._firstPT || (this._firstPT = t),
                (t._next = e),
                (t._prev = i)),
              t
            );
          }),
          (h._kill = function (e) {
            var i,
              s,
              r,
              n = e;
            if (e.autoAlpha || e.alpha) {
              n = {};
              for (s in e) n[s] = e[s];
              (n.opacity = 1), n.autoAlpha && (n.visibility = 1);
            }
            return (
              e.className &&
                (i = this._classNamePT) &&
                ((r = i.xfirst),
                r && r._prev
                  ? this._linkCSSP(r._prev, i._next, r._prev._prev)
                  : r === this._firstPT && (this._firstPT = i._next),
                i._next && this._linkCSSP(i._next, i._next._next, r._prev),
                (this._classNamePT = null)),
              t.prototype._kill.call(this, n)
            );
          });
        var Ve = function (t, e, i) {
          var s, r, n, a;
          if (t.slice) for (r = t.length; --r > -1; ) Ve(t[r], e, i);
          else
            for (s = t.childNodes, r = s.length; --r > -1; )
              (n = s[r]),
                (a = n.type),
                n.style && (e.push(K(n)), i && i.push(n)),
                (1 !== a && 9 !== a && 11 !== a) ||
                  !n.childNodes.length ||
                  Ve(n, e, i);
        };
        return (
          (a.cascadeTo = function (t, i, s) {
            var r,
              n,
              a,
              o,
              l = e.to(t, i, s),
              h = [l],
              _ = [],
              u = [],
              c = [],
              f = e._internals.reservedProps;
            for (
              t = l._targets || l.target,
                Ve(t, _, c),
                l.render(i, !0, !0),
                Ve(t, u),
                l.render(0, !0, !0),
                l._enabled(!0),
                r = c.length;
              --r > -1;

            )
              if (((n = J(c[r], _[r], u[r])), n.firstMPT)) {
                n = n.difs;
                for (a in s) f[a] && (n[a] = s[a]);
                o = {};
                for (a in n) o[a] = _[r][a];
                h.push(e.fromTo(c[r], i, o, n));
              }
            return h;
          }),
          t.activate([a]),
          a
        );
      },
      !0,
    ),
    (function () {
      var t = _gsScope._gsDefine.plugin({
          propName: "roundProps",
          version: "1.5",
          priority: -1,
          API: 2,
          init: function (t, e, i) {
            return (this._tween = i), !0;
          },
        }),
        e = function (t) {
          for (; t; ) t.f || t.blob || (t.r = 1), (t = t._next);
        },
        i = t.prototype;
      (i._onInitAllProps = function () {
        for (
          var t,
            i,
            s,
            r = this._tween,
            n = r.vars.roundProps.join
              ? r.vars.roundProps
              : r.vars.roundProps.split(","),
            a = n.length,
            o = {},
            l = r._propLookup.roundProps;
          --a > -1;

        )
          o[n[a]] = 1;
        for (a = n.length; --a > -1; )
          for (t = n[a], i = r._firstPT; i; )
            (s = i._next),
              i.pg
                ? i.t._roundProps(o, !0)
                : i.n === t &&
                  (2 === i.f && i.t
                    ? e(i.t._firstPT)
                    : (this._add(i.t, t, i.s, i.c),
                      s && (s._prev = i._prev),
                      i._prev
                        ? (i._prev._next = s)
                        : r._firstPT === i && (r._firstPT = s),
                      (i._next = i._prev = null),
                      (r._propLookup[t] = l))),
              (i = s);
        return !1;
      }),
        (i._add = function (t, e, i, s) {
          this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e);
        });
    })(),
    (function () {
      _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.5.0",
        init: function (t, e) {
          var i;
          if ("function" != typeof t.setAttribute) return !1;
          for (i in e)
            this._addTween(
              t,
              "setAttribute",
              t.getAttribute(i) + "",
              e[i] + "",
              i,
              !1,
              i,
            ),
              this._overwriteProps.push(i);
          return !0;
        },
      });
    })(),
    (_gsScope._gsDefine.plugin({
      propName: "directionalRotation",
      version: "0.2.1",
      API: 2,
      init: function (t, e) {
        "object" != typeof e && (e = { rotation: e }), (this.finals = {});
        var i,
          s,
          r,
          n,
          a,
          o,
          l = e.useRadians === !0 ? 2 * Math.PI : 360,
          h = 1e-6;
        for (i in e)
          "useRadians" !== i &&
            ((o = (e[i] + "").split("_")),
            (s = o[0]),
            (r = parseFloat(
              "function" != typeof t[i]
                ? t[i]
                : t[
                    i.indexOf("set") ||
                    "function" != typeof t["get" + i.substr(3)]
                      ? i
                      : "get" + i.substr(3)
                  ](),
            )),
            (n = this.finals[i] =
              "string" == typeof s && "=" === s.charAt(1)
                ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))
                : Number(s) || 0),
            (a = n - r),
            o.length &&
              ((s = o.join("_")),
              -1 !== s.indexOf("short") &&
                ((a %= l), a !== a % (l / 2) && (a = 0 > a ? a + l : a - l)),
              -1 !== s.indexOf("_cw") && 0 > a
                ? (a = ((a + 9999999999 * l) % l) - (0 | (a / l)) * l)
                : -1 !== s.indexOf("ccw") &&
                  a > 0 &&
                  (a = ((a - 9999999999 * l) % l) - (0 | (a / l)) * l)),
            (a > h || -h > a) &&
              (this._addTween(t, i, r, r + a, i),
              this._overwriteProps.push(i)));
        return !0;
      },
      set: function (t) {
        var e;
        if (1 !== t) this._super.setRatio.call(this, t);
        else
          for (e = this._firstPT; e; )
            e.f ? e.t[e.p](this.finals[e.p]) : (e.t[e.p] = this.finals[e.p]),
              (e = e._next);
      },
    })._autoCSS = !0),
    _gsScope._gsDefine(
      "easing.Back",
      ["easing.Ease"],
      function (t) {
        var e,
          i,
          s,
          r = _gsScope.GreenSockGlobals || _gsScope,
          n = r.com.greensock,
          a = 2 * Math.PI,
          o = Math.PI / 2,
          l = n._class,
          h = function (e, i) {
            var s = l("easing." + e, function () {}, !0),
              r = (s.prototype = new t());
            return (r.constructor = s), (r.getRatio = i), s;
          },
          _ = t.register || function () {},
          u = function (t, e, i, s) {
            var r = l(
              "easing." + t,
              { easeOut: new e(), easeIn: new i(), easeInOut: new s() },
              !0,
            );
            return _(r, t), r;
          },
          c = function (t, e, i) {
            (this.t = t),
              (this.v = e),
              i &&
                ((this.next = i),
                (i.prev = this),
                (this.c = i.v - e),
                (this.gap = i.t - t));
          },
          f = function (e, i) {
            var s = l(
                "easing." + e,
                function (t) {
                  (this._p1 = t || 0 === t ? t : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0,
              ),
              r = (s.prototype = new t());
            return (
              (r.constructor = s),
              (r.getRatio = i),
              (r.config = function (t) {
                return new s(t);
              }),
              s
            );
          },
          p = u(
            "Back",
            f("BackOut", function (t) {
              return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
            }),
            f("BackIn", function (t) {
              return t * t * ((this._p1 + 1) * t - this._p1);
            }),
            f("BackInOut", function (t) {
              return 1 > (t *= 2)
                ? 0.5 * t * t * ((this._p2 + 1) * t - this._p2)
                : 0.5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
            }),
          ),
          m = l(
            "easing.SlowMo",
            function (t, e, i) {
              (e = e || 0 === e ? e : 0.7),
                null == t ? (t = 0.7) : t > 1 && (t = 1),
                (this._p = 1 !== t ? e : 0),
                (this._p1 = (1 - t) / 2),
                (this._p2 = t),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = i === !0);
            },
            !0,
          ),
          d = (m.prototype = new t());
        return (
          (d.constructor = m),
          (d.getRatio = function (t) {
            var e = t + (0.5 - t) * this._p;
            return this._p1 > t
              ? this._calcEnd
                ? 1 - (t = 1 - t / this._p1) * t
                : e - (t = 1 - t / this._p1) * t * t * t * e
              : t > this._p3
                ? this._calcEnd
                  ? 1 - (t = (t - this._p3) / this._p1) * t
                  : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t
                : this._calcEnd
                  ? 1
                  : e;
          }),
          (m.ease = new m(0.7, 0.7)),
          (d.config = m.config =
            function (t, e, i) {
              return new m(t, e, i);
            }),
          (e = l(
            "easing.SteppedEase",
            function (t) {
              (t = t || 1), (this._p1 = 1 / t), (this._p2 = t + 1);
            },
            !0,
          )),
          (d = e.prototype = new t()),
          (d.constructor = e),
          (d.getRatio = function (t) {
            return (
              0 > t ? (t = 0) : t >= 1 && (t = 0.999999999),
              ((this._p2 * t) >> 0) * this._p1
            );
          }),
          (d.config = e.config =
            function (t) {
              return new e(t);
            }),
          (i = l(
            "easing.RoughEase",
            function (e) {
              e = e || {};
              for (
                var i,
                  s,
                  r,
                  n,
                  a,
                  o,
                  l = e.taper || "none",
                  h = [],
                  _ = 0,
                  u = 0 | (e.points || 20),
                  f = u,
                  p = e.randomize !== !1,
                  m = e.clamp === !0,
                  d = e.template instanceof t ? e.template : null,
                  g = "number" == typeof e.strength ? 0.4 * e.strength : 0.4;
                --f > -1;

              )
                (i = p ? Math.random() : (1 / u) * f),
                  (s = d ? d.getRatio(i) : i),
                  "none" === l
                    ? (r = g)
                    : "out" === l
                      ? ((n = 1 - i), (r = n * n * g))
                      : "in" === l
                        ? (r = i * i * g)
                        : 0.5 > i
                          ? ((n = 2 * i), (r = 0.5 * n * n * g))
                          : ((n = 2 * (1 - i)), (r = 0.5 * n * n * g)),
                  p
                    ? (s += Math.random() * r - 0.5 * r)
                    : f % 2
                      ? (s += 0.5 * r)
                      : (s -= 0.5 * r),
                  m && (s > 1 ? (s = 1) : 0 > s && (s = 0)),
                  (h[_++] = { x: i, y: s });
              for (
                h.sort(function (t, e) {
                  return t.x - e.x;
                }),
                  o = new c(1, 1, null),
                  f = u;
                --f > -1;

              )
                (a = h[f]), (o = new c(a.x, a.y, o));
              this._prev = new c(0, 0, 0 !== o.t ? o : o.next);
            },
            !0,
          )),
          (d = i.prototype = new t()),
          (d.constructor = i),
          (d.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
              for (; e.next && t >= e.t; ) e = e.next;
              e = e.prev;
            } else for (; e.prev && e.t >= t; ) e = e.prev;
            return (this._prev = e), e.v + ((t - e.t) / e.gap) * e.c;
          }),
          (d.config = function (t) {
            return new i(t);
          }),
          (i.ease = new i()),
          u(
            "Bounce",
            h("BounceOut", function (t) {
              return 1 / 2.75 > t
                ? 7.5625 * t * t
                : 2 / 2.75 > t
                  ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                  : 2.5 / 2.75 > t
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }),
            h("BounceIn", function (t) {
              return 1 / 2.75 > (t = 1 - t)
                ? 1 - 7.5625 * t * t
                : 2 / 2.75 > t
                  ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                  : 2.5 / 2.75 > t
                    ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                    : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
            }),
            h("BounceInOut", function (t) {
              var e = 0.5 > t;
              return (
                (t = e ? 1 - 2 * t : 2 * t - 1),
                (t =
                  1 / 2.75 > t
                    ? 7.5625 * t * t
                    : 2 / 2.75 > t
                      ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                      : 2.5 / 2.75 > t
                        ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                        : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375),
                e ? 0.5 * (1 - t) : 0.5 * t + 0.5
              );
            }),
          ),
          u(
            "Circ",
            h("CircOut", function (t) {
              return Math.sqrt(1 - (t -= 1) * t);
            }),
            h("CircIn", function (t) {
              return -(Math.sqrt(1 - t * t) - 1);
            }),
            h("CircInOut", function (t) {
              return 1 > (t *= 2)
                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            }),
          ),
          (s = function (e, i, s) {
            var r = l(
                "easing." + e,
                function (t, e) {
                  (this._p1 = t >= 1 ? t : 1),
                    (this._p2 = (e || s) / (1 > t ? t : 1)),
                    (this._p3 =
                      (this._p2 / a) * (Math.asin(1 / this._p1) || 0)),
                    (this._p2 = a / this._p2);
                },
                !0,
              ),
              n = (r.prototype = new t());
            return (
              (n.constructor = r),
              (n.getRatio = i),
              (n.config = function (t, e) {
                return new r(t, e);
              }),
              r
            );
          }),
          u(
            "Elastic",
            s(
              "ElasticOut",
              function (t) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * t) *
                    Math.sin((t - this._p3) * this._p2) +
                  1
                );
              },
              0.3,
            ),
            s(
              "ElasticIn",
              function (t) {
                return -(
                  this._p1 *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin((t - this._p3) * this._p2)
                );
              },
              0.3,
            ),
            s(
              "ElasticInOut",
              function (t) {
                return 1 > (t *= 2)
                  ? -0.5 *
                      this._p1 *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2)
                  : 0.5 *
                      this._p1 *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin((t - this._p3) * this._p2) +
                      1;
              },
              0.45,
            ),
          ),
          u(
            "Expo",
            h("ExpoOut", function (t) {
              return 1 - Math.pow(2, -10 * t);
            }),
            h("ExpoIn", function (t) {
              return Math.pow(2, 10 * (t - 1)) - 0.001;
            }),
            h("ExpoInOut", function (t) {
              return 1 > (t *= 2)
                ? 0.5 * Math.pow(2, 10 * (t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
            }),
          ),
          u(
            "Sine",
            h("SineOut", function (t) {
              return Math.sin(t * o);
            }),
            h("SineIn", function (t) {
              return -Math.cos(t * o) + 1;
            }),
            h("SineInOut", function (t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            }),
          ),
          l(
            "easing.EaseLookup",
            {
              find: function (e) {
                return t.map[e];
              },
            },
            !0,
          ),
          _(r.SlowMo, "SlowMo", "ease,"),
          _(i, "RoughEase", "ease,"),
          _(e, "SteppedEase", "ease,"),
          p
        );
      },
      !0,
    );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (t, e) {
    "use strict";
    var i = (t.GreenSockGlobals = t.GreenSockGlobals || t);
    if (!i.TweenLite) {
      var s,
        r,
        n,
        a,
        o,
        l = function (t) {
          var e,
            s = t.split("."),
            r = i;
          for (e = 0; s.length > e; e++) r[s[e]] = r = r[s[e]] || {};
          return r;
        },
        h = l("com.greensock"),
        _ = 1e-10,
        u = function (t) {
          var e,
            i = [],
            s = t.length;
          for (e = 0; e !== s; i.push(t[e++]));
          return i;
        },
        c = function () {},
        f = (function () {
          var t = Object.prototype.toString,
            e = t.call([]);
          return function (i) {
            return (
              null != i &&
              (i instanceof Array ||
                ("object" == typeof i && !!i.push && t.call(i) === e))
            );
          };
        })(),
        p = {},
        m = function (s, r, n, a) {
          (this.sc = p[s] ? p[s].sc : []),
            (p[s] = this),
            (this.gsClass = null),
            (this.func = n);
          var o = [];
          (this.check = function (h) {
            for (var _, u, c, f, d, g = r.length, v = g; --g > -1; )
              (_ = p[r[g]] || new m(r[g], [])).gsClass
                ? ((o[g] = _.gsClass), v--)
                : h && _.sc.push(this);
            if (0 === v && n)
              for (
                u = ("com.greensock." + s).split("."),
                  c = u.pop(),
                  f = l(u.join("."))[c] = this.gsClass = n.apply(n, o),
                  a &&
                    ((i[c] = f),
                    (d = "undefined" != typeof module && module.exports),
                    !d && "function" == typeof define && define.amd
                      ? define(
                          (t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") +
                            s.split(".").pop(),
                          [],
                          function () {
                            return f;
                          },
                        )
                      : s === e && d && (module.exports = f)),
                  g = 0;
                this.sc.length > g;
                g++
              )
                this.sc[g].check();
          }),
            this.check(!0);
        },
        d = (t._gsDefine = function (t, e, i, s) {
          return new m(t, e, i, s);
        }),
        g = (h._class = function (t, e, i) {
          return (
            (e = e || function () {}),
            d(
              t,
              [],
              function () {
                return e;
              },
              i,
            ),
            e
          );
        });
      d.globals = i;
      var v = [0, 0, 1, 1],
        y = [],
        T = g(
          "easing.Ease",
          function (t, e, i, s) {
            (this._func = t),
              (this._type = i || 0),
              (this._power = s || 0),
              (this._params = e ? v.concat(e) : v);
          },
          !0,
        ),
        x = (T.map = {}),
        w = (T.register = function (t, e, i, s) {
          for (
            var r,
              n,
              a,
              o,
              l = e.split(","),
              _ = l.length,
              u = (i || "easeIn,easeOut,easeInOut").split(",");
            --_ > -1;

          )
            for (
              n = l[_],
                r = s ? g("easing." + n, null, !0) : h.easing[n] || {},
                a = u.length;
              --a > -1;

            )
              (o = u[a]),
                (x[n + "." + o] =
                  x[o + n] =
                  r[o] =
                    t.getRatio ? t : t[o] || new t());
        });
      for (
        n = T.prototype,
          n._calcEnd = !1,
          n.getRatio = function (t) {
            if (this._func)
              return (
                (this._params[0] = t), this._func.apply(null, this._params)
              );
            var e = this._type,
              i = this._power,
              s = 1 === e ? 1 - t : 2 === e ? t : 0.5 > t ? 2 * t : 2 * (1 - t);
            return (
              1 === i
                ? (s *= s)
                : 2 === i
                  ? (s *= s * s)
                  : 3 === i
                    ? (s *= s * s * s)
                    : 4 === i && (s *= s * s * s * s),
              1 === e ? 1 - s : 2 === e ? s : 0.5 > t ? s / 2 : 1 - s / 2
            );
          },
          s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
          r = s.length;
        --r > -1;

      )
        (n = s[r] + ",Power" + r),
          w(new T(null, null, 1, r), n, "easeOut", !0),
          w(
            new T(null, null, 2, r),
            n,
            "easeIn" + (0 === r ? ",easeNone" : ""),
          ),
          w(new T(null, null, 3, r), n, "easeInOut");
      (x.linear = h.easing.Linear.easeIn), (x.swing = h.easing.Quad.easeInOut);
      var b = g("events.EventDispatcher", function (t) {
        (this._listeners = {}), (this._eventTarget = t || this);
      });
      (n = b.prototype),
        (n.addEventListener = function (t, e, i, s, r) {
          r = r || 0;
          var n,
            l,
            h = this._listeners[t],
            _ = 0;
          for (
            null == h && (this._listeners[t] = h = []), l = h.length;
            --l > -1;

          )
            (n = h[l]),
              n.c === e && n.s === i
                ? h.splice(l, 1)
                : 0 === _ && r > n.pr && (_ = l + 1);
          h.splice(_, 0, { c: e, s: i, up: s, pr: r }),
            this !== a || o || a.wake();
        }),
        (n.removeEventListener = function (t, e) {
          var i,
            s = this._listeners[t];
          if (s)
            for (i = s.length; --i > -1; )
              if (s[i].c === e) return s.splice(i, 1), void 0;
        }),
        (n.dispatchEvent = function (t) {
          var e,
            i,
            s,
            r = this._listeners[t];
          if (r)
            for (e = r.length, i = this._eventTarget; --e > -1; )
              (s = r[e]),
                s &&
                  (s.up
                    ? s.c.call(s.s || i, { type: t, target: i })
                    : s.c.call(s.s || i));
        });
      var P = t.requestAnimationFrame,
        k = t.cancelAnimationFrame,
        S =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        R = S();
      for (s = ["ms", "moz", "webkit", "o"], r = s.length; --r > -1 && !P; )
        (P = t[s[r] + "RequestAnimationFrame"]),
          (k =
            t[s[r] + "CancelAnimationFrame"] ||
            t[s[r] + "CancelRequestAnimationFrame"]);
      g("Ticker", function (t, e) {
        var i,
          s,
          r,
          n,
          l,
          h = this,
          u = S(),
          f = e !== !1 && P,
          p = 500,
          m = 33,
          d = "tick",
          g = function (t) {
            var e,
              a,
              o = S() - R;
            o > p && (u += o - m),
              (R += o),
              (h.time = (R - u) / 1e3),
              (e = h.time - l),
              (!i || e > 0 || t === !0) &&
                (h.frame++, (l += e + (e >= n ? 0.004 : n - e)), (a = !0)),
              t !== !0 && (r = s(g)),
              a && h.dispatchEvent(d);
          };
        b.call(h),
          (h.time = h.frame = 0),
          (h.tick = function () {
            g(!0);
          }),
          (h.lagSmoothing = function (t, e) {
            (p = t || 1 / _), (m = Math.min(e, p, 0));
          }),
          (h.sleep = function () {
            null != r &&
              (f && k ? k(r) : clearTimeout(r),
              (s = c),
              (r = null),
              h === a && (o = !1));
          }),
          (h.wake = function () {
            null !== r ? h.sleep() : h.frame > 10 && (R = S() - p + 5),
              (s =
                0 === i
                  ? c
                  : f && P
                    ? P
                    : function (t) {
                        return setTimeout(t, 0 | (1e3 * (l - h.time) + 1));
                      }),
              h === a && (o = !0),
              g(2);
          }),
          (h.fps = function (t) {
            return arguments.length
              ? ((i = t),
                (n = 1 / (i || 60)),
                (l = this.time + n),
                h.wake(),
                void 0)
              : i;
          }),
          (h.useRAF = function (t) {
            return arguments.length
              ? (h.sleep(), (f = t), h.fps(i), void 0)
              : f;
          }),
          h.fps(t),
          setTimeout(function () {
            f && 5 > h.frame && h.useRAF(!1);
          }, 1500);
      }),
        (n = h.Ticker.prototype = new h.events.EventDispatcher()),
        (n.constructor = h.Ticker);
      var O = g("core.Animation", function (t, e) {
        if (
          ((this.vars = e = e || {}),
          (this._duration = this._totalDuration = t || 0),
          (this._delay = Number(e.delay) || 0),
          (this._timeScale = 1),
          (this._active = e.immediateRender === !0),
          (this.data = e.data),
          (this._reversed = e.reversed === !0),
          W)
        ) {
          o || a.wake();
          var i = this.vars.useFrames ? G : W;
          i.add(this, i._time), this.vars.paused && this.paused(!0);
        }
      });
      (a = O.ticker = new h.Ticker()),
        (n = O.prototype),
        (n._dirty = n._gc = n._initted = n._paused = !1),
        (n._totalTime = n._time = 0),
        (n._rawPrevTime = -1),
        (n._next = n._last = n._onUpdate = n._timeline = n.timeline = null),
        (n._paused = !1);
      var A = function () {
        o && S() - R > 2e3 && a.wake(), setTimeout(A, 2e3);
      };
      A(),
        (n.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (n.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (n.resume = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!1);
        }),
        (n.seek = function (t, e) {
          return this.totalTime(Number(t), e !== !1);
        }),
        (n.restart = function (t, e) {
          return this.reversed(!1)
            .paused(!1)
            .totalTime(t ? -this._delay : 0, e !== !1, !0);
        }),
        (n.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (n.render = function () {}),
        (n.invalidate = function () {
          return (
            (this._time = this._totalTime = 0),
            (this._initted = this._gc = !1),
            (this._rawPrevTime = -1),
            (this._gc || !this.timeline) && this._enabled(!0),
            this
          );
        }),
        (n.isActive = function () {
          var t,
            e = this._timeline,
            i = this._startTime;
          return (
            !e ||
            (!this._gc &&
              !this._paused &&
              e.isActive() &&
              (t = e.rawTime()) >= i &&
              i + this.totalDuration() / this._timeScale > t)
          );
        }),
        (n._enabled = function (t, e) {
          return (
            o || a.wake(),
            (this._gc = !t),
            (this._active = this.isActive()),
            e !== !0 &&
              (t && !this.timeline
                ? this._timeline.add(this, this._startTime - this._delay)
                : !t && this.timeline && this._timeline._remove(this, !0)),
            !1
          );
        }),
        (n._kill = function () {
          return this._enabled(!1, !1);
        }),
        (n.kill = function (t, e) {
          return this._kill(t, e), this;
        }),
        (n._uncache = function (t) {
          for (var e = t ? this : this.timeline; e; )
            (e._dirty = !0), (e = e.timeline);
          return this;
        }),
        (n._swapSelfInParams = function (t) {
          for (var e = t.length, i = t.concat(); --e > -1; )
            "{self}" === t[e] && (i[e] = this);
          return i;
        }),
        (n._callback = function (t) {
          var e = this.vars;
          e[t].apply(
            e[t + "Scope"] || e.callbackScope || this,
            e[t + "Params"] || y,
          );
        }),
        (n.eventCallback = function (t, e, i, s) {
          if ("on" === (t || "").substr(0, 2)) {
            var r = this.vars;
            if (1 === arguments.length) return r[t];
            null == e
              ? delete r[t]
              : ((r[t] = e),
                (r[t + "Params"] =
                  f(i) && -1 !== i.join("").indexOf("{self}")
                    ? this._swapSelfInParams(i)
                    : i),
                (r[t + "Scope"] = s)),
              "onUpdate" === t && (this._onUpdate = e);
          }
          return this;
        }),
        (n.delay = function (t) {
          return arguments.length
            ? (this._timeline.smoothChildTiming &&
                this.startTime(this._startTime + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (n.duration = function (t) {
          return arguments.length
            ? ((this._duration = this._totalDuration = t),
              this._uncache(!0),
              this._timeline.smoothChildTiming &&
                this._time > 0 &&
                this._time < this._duration &&
                0 !== t &&
                this.totalTime(this._totalTime * (t / this._duration), !0),
              this)
            : ((this._dirty = !1), this._duration);
        }),
        (n.totalDuration = function (t) {
          return (
            (this._dirty = !1),
            arguments.length ? this.duration(t) : this._totalDuration
          );
        }),
        (n.time = function (t, e) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              this.totalTime(t > this._duration ? this._duration : t, e))
            : this._time;
        }),
        (n.totalTime = function (t, e, i) {
          if ((o || a.wake(), !arguments.length)) return this._totalTime;
          if (this._timeline) {
            if (
              (0 > t && !i && (t += this.totalDuration()),
              this._timeline.smoothChildTiming)
            ) {
              this._dirty && this.totalDuration();
              var s = this._totalDuration,
                r = this._timeline;
              if (
                (t > s && !i && (t = s),
                (this._startTime =
                  (this._paused ? this._pauseTime : r._time) -
                  (this._reversed ? s - t : t) / this._timeScale),
                r._dirty || this._uncache(!1),
                r._timeline)
              )
                for (; r._timeline; )
                  r._timeline._time !==
                    (r._startTime + r._totalTime) / r._timeScale &&
                    r.totalTime(r._totalTime, !0),
                    (r = r._timeline);
            }
            this._gc && this._enabled(!0, !1),
              (this._totalTime !== t || 0 === this._duration) &&
                (F.length && Q(), this.render(t, e, !1), F.length && Q());
          }
          return this;
        }),
        (n.progress = n.totalProgress =
          function (t, e) {
            var i = this.duration();
            return arguments.length
              ? this.totalTime(i * t, e)
              : i
                ? this._time / i
                : this.ratio;
          }),
        (n.startTime = function (t) {
          return arguments.length
            ? (t !== this._startTime &&
                ((this._startTime = t),
                this.timeline &&
                  this.timeline._sortChildren &&
                  this.timeline.add(this, t - this._delay)),
              this)
            : this._startTime;
        }),
        (n.endTime = function (t) {
          return (
            this._startTime +
            (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
          );
        }),
        (n.timeScale = function (t) {
          if (!arguments.length) return this._timeScale;
          if (
            ((t = t || _), this._timeline && this._timeline.smoothChildTiming)
          ) {
            var e = this._pauseTime,
              i = e || 0 === e ? e : this._timeline.totalTime();
            this._startTime = i - ((i - this._startTime) * this._timeScale) / t;
          }
          return (this._timeScale = t), this._uncache(!1);
        }),
        (n.reversed = function (t) {
          return arguments.length
            ? (t != this._reversed &&
                ((this._reversed = t),
                this.totalTime(
                  this._timeline && !this._timeline.smoothChildTiming
                    ? this.totalDuration() - this._totalTime
                    : this._totalTime,
                  !0,
                )),
              this)
            : this._reversed;
        }),
        (n.paused = function (t) {
          if (!arguments.length) return this._paused;
          var e,
            i,
            s = this._timeline;
          return (
            t != this._paused &&
              s &&
              (o || t || a.wake(),
              (e = s.rawTime()),
              (i = e - this._pauseTime),
              !t &&
                s.smoothChildTiming &&
                ((this._startTime += i), this._uncache(!1)),
              (this._pauseTime = t ? e : null),
              (this._paused = t),
              (this._active = this.isActive()),
              !t &&
                0 !== i &&
                this._initted &&
                this.duration() &&
                ((e = s.smoothChildTiming
                  ? this._totalTime
                  : (e - this._startTime) / this._timeScale),
                this.render(e, e === this._totalTime, !0))),
            this._gc && !t && this._enabled(!0, !1),
            this
          );
        });
      var C = g("core.SimpleTimeline", function (t) {
        O.call(this, 0, t),
          (this.autoRemoveChildren = this.smoothChildTiming = !0);
      });
      (n = C.prototype = new O()),
        (n.constructor = C),
        (n.kill()._gc = !1),
        (n._first = n._last = n._recent = null),
        (n._sortChildren = !1),
        (n.add = n.insert =
          function (t, e) {
            var i, s;
            if (
              ((t._startTime = Number(e || 0) + t._delay),
              t._paused &&
                this !== t._timeline &&
                (t._pauseTime =
                  t._startTime +
                  (this.rawTime() - t._startTime) / t._timeScale),
              t.timeline && t.timeline._remove(t, !0),
              (t.timeline = t._timeline = this),
              t._gc && t._enabled(!0, !0),
              (i = this._last),
              this._sortChildren)
            )
              for (s = t._startTime; i && i._startTime > s; ) i = i._prev;
            return (
              i
                ? ((t._next = i._next), (i._next = t))
                : ((t._next = this._first), (this._first = t)),
              t._next ? (t._next._prev = t) : (this._last = t),
              (t._prev = i),
              (this._recent = t),
              this._timeline && this._uncache(!0),
              this
            );
          }),
        (n._remove = function (t, e) {
          return (
            t.timeline === this &&
              (e || t._enabled(!1, !0),
              t._prev
                ? (t._prev._next = t._next)
                : this._first === t && (this._first = t._next),
              t._next
                ? (t._next._prev = t._prev)
                : this._last === t && (this._last = t._prev),
              (t._next = t._prev = t.timeline = null),
              t === this._recent && (this._recent = this._last),
              this._timeline && this._uncache(!0)),
            this
          );
        }),
        (n.render = function (t, e, i) {
          var s,
            r = this._first;
          for (this._totalTime = this._time = this._rawPrevTime = t; r; )
            (s = r._next),
              (r._active || (t >= r._startTime && !r._paused)) &&
                (r._reversed
                  ? r.render(
                      (r._dirty ? r.totalDuration() : r._totalDuration) -
                        (t - r._startTime) * r._timeScale,
                      e,
                      i,
                    )
                  : r.render((t - r._startTime) * r._timeScale, e, i)),
              (r = s);
        }),
        (n.rawTime = function () {
          return o || a.wake(), this._totalTime;
        });
      var D = g(
          "TweenLite",
          function (e, i, s) {
            if (
              (O.call(this, i, s),
              (this.render = D.prototype.render),
              null == e)
            )
              throw "Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : D.selector(e) || e;
            var r,
              n,
              a,
              o =
                e.jquery ||
                (e.length &&
                  e !== t &&
                  e[0] &&
                  (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))),
              l = this.vars.overwrite;
            if (
              ((this._overwrite = l =
                null == l
                  ? V[D.defaultOverwrite]
                  : "number" == typeof l
                    ? l >> 0
                    : V[l]),
              (o || e instanceof Array || (e.push && f(e))) &&
                "number" != typeof e[0])
            )
              for (
                this._targets = a = u(e),
                  this._propLookup = [],
                  this._siblings = [],
                  r = 0;
                a.length > r;
                r++
              )
                (n = a[r]),
                  n
                    ? "string" != typeof n
                      ? n.length &&
                        n !== t &&
                        n[0] &&
                        (n[0] === t ||
                          (n[0].nodeType && n[0].style && !n.nodeType))
                        ? (a.splice(r--, 1),
                          (this._targets = a = a.concat(u(n))))
                        : ((this._siblings[r] = $(n, this, !1)),
                          1 === l &&
                            this._siblings[r].length > 1 &&
                            K(n, this, null, 1, this._siblings[r]))
                      : ((n = a[r--] = D.selector(n)),
                        "string" == typeof n && a.splice(r + 1, 1))
                    : a.splice(r--, 1);
            else
              (this._propLookup = {}),
                (this._siblings = $(e, this, !1)),
                1 === l &&
                  this._siblings.length > 1 &&
                  K(e, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (0 === i &&
                0 === this._delay &&
                this.vars.immediateRender !== !1)) &&
              ((this._time = -_), this.render(-this._delay));
          },
          !0,
        ),
        M = function (e) {
          return (
            e &&
            e.length &&
            e !== t &&
            e[0] &&
            (e[0] === t || (e[0].nodeType && e[0].style && !e.nodeType))
          );
        },
        z = function (t, e) {
          var i,
            s = {};
          for (i in t)
            q[i] ||
              (i in e &&
                "transform" !== i &&
                "x" !== i &&
                "y" !== i &&
                "width" !== i &&
                "height" !== i &&
                "className" !== i &&
                "border" !== i) ||
              !(!j[i] || (j[i] && j[i]._autoCSS)) ||
              ((s[i] = t[i]), delete t[i]);
          t.css = s;
        };
      (n = D.prototype = new O()),
        (n.constructor = D),
        (n.kill()._gc = !1),
        (n.ratio = 0),
        (n._firstPT = n._targets = n._overwrittenProps = n._startAt = null),
        (n._notifyPluginsOfEnabled = n._lazy = !1),
        (D.version = "1.18.0"),
        (D.defaultEase = n._ease = new T(null, null, 1, 1)),
        (D.defaultOverwrite = "auto"),
        (D.ticker = a),
        (D.autoSleep = 120),
        (D.lagSmoothing = function (t, e) {
          a.lagSmoothing(t, e);
        }),
        (D.selector =
          t.$ ||
          t.jQuery ||
          function (e) {
            var i = t.$ || t.jQuery;
            return i
              ? ((D.selector = i), i(e))
              : "undefined" == typeof document
                ? e
                : document.querySelectorAll
                  ? document.querySelectorAll(e)
                  : document.getElementById(
                      "#" === e.charAt(0) ? e.substr(1) : e,
                    );
          });
      var F = [],
        I = {},
        E = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        N = function (t) {
          for (var e, i = this._firstPT, s = 1e-6; i; )
            (e = i.blob ? (t ? this.join("") : this.start) : i.c * t + i.s),
              i.r ? (e = Math.round(e)) : s > e && e > -s && (e = 0),
              i.f ? (i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e)) : (i.t[i.p] = e),
              (i = i._next);
        },
        L = function (t, e, i, s) {
          var r,
            n,
            a,
            o,
            l,
            h,
            _,
            u = [t, e],
            c = 0,
            f = "",
            p = 0;
          for (
            u.start = t,
              i && (i(u), (t = u[0]), (e = u[1])),
              u.length = 0,
              r = t.match(E) || [],
              n = e.match(E) || [],
              s && ((s._next = null), (s.blob = 1), (u._firstPT = s)),
              l = n.length,
              o = 0;
            l > o;
            o++
          )
            (_ = n[o]),
              (h = e.substr(c, e.indexOf(_, c) - c)),
              (f += h || !o ? h : ","),
              (c += h.length),
              p ? (p = (p + 1) % 5) : "rgba(" === h.substr(-5) && (p = 1),
              _ === r[o] || o >= r.length
                ? (f += _)
                : (f && (u.push(f), (f = "")),
                  (a = parseFloat(r[o])),
                  u.push(a),
                  (u._firstPT = {
                    _next: u._firstPT,
                    t: u,
                    p: u.length - 1,
                    s: a,
                    c:
                      ("=" === _.charAt(1)
                        ? parseInt(_.charAt(0) + "1", 10) *
                          parseFloat(_.substr(2))
                        : parseFloat(_) - a) || 0,
                    f: 0,
                    r: p && 4 > p,
                  })),
              (c += _.length);
          return (f += e.substr(c)), f && u.push(f), (u.setRatio = N), u;
        },
        X = function (t, e, i, s, r, n, a, o) {
          var l,
            h,
            _ = "get" === i ? t[e] : i,
            u = typeof t[e],
            c = "string" == typeof s && "=" === s.charAt(1),
            f = {
              t: t,
              p: e,
              s: _,
              f: "function" === u,
              pg: 0,
              n: r || e,
              r: n,
              pr: 0,
              c: c
                ? parseInt(s.charAt(0) + "1", 10) * parseFloat(s.substr(2))
                : parseFloat(s) - _ || 0,
            };
          return (
            "number" !== u &&
              ("function" === u &&
                "get" === i &&
                ((h =
                  e.indexOf("set") ||
                  "function" != typeof t["get" + e.substr(3)]
                    ? e
                    : "get" + e.substr(3)),
                (f.s = _ = a ? t[h](a) : t[h]())),
              "string" == typeof _ && (a || isNaN(_))
                ? ((f.fp = a),
                  (l = L(_, s, o || D.defaultStringFilter, f)),
                  (f = {
                    t: l,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: r || e,
                    pr: 0,
                  }))
                : c || (f.c = parseFloat(s) - parseFloat(_) || 0)),
            f.c
              ? ((f._next = this._firstPT) && (f._next._prev = f),
                (this._firstPT = f),
                f)
              : void 0
          );
        },
        B = (D._internals = {
          isArray: f,
          isSelector: M,
          lazyTweens: F,
          blobDif: L,
        }),
        j = (D._plugins = {}),
        Y = (B.tweenLookup = {}),
        U = 0,
        q = (B.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
          callbackScope: 1,
          stringFilter: 1,
        }),
        V = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0,
        },
        G = (O._rootFramesTimeline = new C()),
        W = (O._rootTimeline = new C()),
        Z = 30,
        Q = (B.lazyRender = function () {
          var t,
            e = F.length;
          for (I = {}; --e > -1; )
            (t = F[e]),
              t &&
                t._lazy !== !1 &&
                (t.render(t._lazy[0], t._lazy[1], !0), (t._lazy = !1));
          F.length = 0;
        });
      (W._startTime = a.time),
        (G._startTime = a.frame),
        (W._active = G._active = !0),
        setTimeout(Q, 1),
        (O._updateRoot = D.render =
          function () {
            var t, e, i;
            if (
              (F.length && Q(),
              W.render((a.time - W._startTime) * W._timeScale, !1, !1),
              G.render((a.frame - G._startTime) * G._timeScale, !1, !1),
              F.length && Q(),
              a.frame >= Z)
            ) {
              Z = a.frame + (parseInt(D.autoSleep, 10) || 120);
              for (i in Y) {
                for (e = Y[i].tweens, t = e.length; --t > -1; )
                  e[t]._gc && e.splice(t, 1);
                0 === e.length && delete Y[i];
              }
              if (
                ((i = W._first),
                (!i || i._paused) &&
                  D.autoSleep &&
                  !G._first &&
                  1 === a._listeners.tick.length)
              ) {
                for (; i && i._paused; ) i = i._next;
                i || a.sleep();
              }
            }
          }),
        a.addEventListener("tick", O._updateRoot);
      var $ = function (t, e, i) {
          var s,
            r,
            n = t._gsTweenID;
          if (
            (Y[n || (t._gsTweenID = n = "t" + U++)] ||
              (Y[n] = { target: t, tweens: [] }),
            e && ((s = Y[n].tweens), (s[(r = s.length)] = e), i))
          )
            for (; --r > -1; ) s[r] === e && s.splice(r, 1);
          return Y[n].tweens;
        },
        H = function (t, e, i, s) {
          var r,
            n,
            a = t.vars.onOverwrite;
          return (
            a && (r = a(t, e, i, s)),
            (a = D.onOverwrite),
            a && (n = a(t, e, i, s)),
            r !== !1 && n !== !1
          );
        },
        K = function (t, e, i, s, r) {
          var n, a, o, l;
          if (1 === s || s >= 4) {
            for (l = r.length, n = 0; l > n; n++)
              if ((o = r[n]) !== e) o._gc || (o._kill(null, t, e) && (a = !0));
              else if (5 === s) break;
            return a;
          }
          var h,
            u = e._startTime + _,
            c = [],
            f = 0,
            p = 0 === e._duration;
          for (n = r.length; --n > -1; )
            (o = r[n]) === e ||
              o._gc ||
              o._paused ||
              (o._timeline !== e._timeline
                ? ((h = h || J(e, 0, p)), 0 === J(o, h, p) && (c[f++] = o))
                : u >= o._startTime &&
                  o._startTime + o.totalDuration() / o._timeScale > u &&
                  (((p || !o._initted) && 2e-10 >= u - o._startTime) ||
                    (c[f++] = o)));
          for (n = f; --n > -1; )
            if (
              ((o = c[n]),
              2 === s && o._kill(i, t, e) && (a = !0),
              2 !== s || (!o._firstPT && o._initted))
            ) {
              if (2 !== s && !H(o, e)) continue;
              o._enabled(!1, !1) && (a = !0);
            }
          return a;
        },
        J = function (t, e, i) {
          for (
            var s = t._timeline, r = s._timeScale, n = t._startTime;
            s._timeline;

          ) {
            if (((n += s._startTime), (r *= s._timeScale), s._paused))
              return -100;
            s = s._timeline;
          }
          return (
            (n /= r),
            n > e
              ? n - e
              : (i && n === e) || (!t._initted && 2 * _ > n - e)
                ? _
                : (n += t.totalDuration() / t._timeScale / r) > e + _
                  ? 0
                  : n - e - _
          );
        };
      (n._init = function () {
        var t,
          e,
          i,
          s,
          r,
          n = this.vars,
          a = this._overwrittenProps,
          o = this._duration,
          l = !!n.immediateRender,
          h = n.ease;
        if (n.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
            (r = {});
          for (s in n.startAt) r[s] = n.startAt[s];
          if (
            ((r.overwrite = !1),
            (r.immediateRender = !0),
            (r.lazy = l && n.lazy !== !1),
            (r.startAt = r.delay = null),
            (this._startAt = D.to(this.target, 0, r)),
            l)
          )
            if (this._time > 0) this._startAt = null;
            else if (0 !== o) return;
        } else if (n.runBackwards && 0 !== o)
          if (this._startAt)
            this._startAt.render(-1, !0),
              this._startAt.kill(),
              (this._startAt = null);
          else {
            0 !== this._time && (l = !1), (i = {});
            for (s in n) (q[s] && "autoCSS" !== s) || (i[s] = n[s]);
            if (
              ((i.overwrite = 0),
              (i.data = "isFromStart"),
              (i.lazy = l && n.lazy !== !1),
              (i.immediateRender = l),
              (this._startAt = D.to(this.target, 0, i)),
              l)
            ) {
              if (0 === this._time) return;
            } else
              this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null);
          }
        if (
          ((this._ease = h =
            h
              ? h instanceof T
                ? h
                : "function" == typeof h
                  ? new T(h, n.easeParams)
                  : x[h] || D.defaultEase
              : D.defaultEase),
          n.easeParams instanceof Array &&
            h.config &&
            (this._ease = h.config.apply(h, n.easeParams)),
          (this._easeType = this._ease._type),
          (this._easePower = this._ease._power),
          (this._firstPT = null),
          this._targets)
        )
          for (t = this._targets.length; --t > -1; )
            this._initProps(
              this._targets[t],
              (this._propLookup[t] = {}),
              this._siblings[t],
              a ? a[t] : null,
            ) && (e = !0);
        else
          e = this._initProps(this.target, this._propLookup, this._siblings, a);
        if (
          (e && D._onPluginEvent("_onInitAllProps", this),
          a &&
            (this._firstPT ||
              ("function" != typeof this.target && this._enabled(!1, !1))),
          n.runBackwards)
        )
          for (i = this._firstPT; i; )
            (i.s += i.c), (i.c = -i.c), (i = i._next);
        (this._onUpdate = n.onUpdate), (this._initted = !0);
      }),
        (n._initProps = function (e, i, s, r) {
          var n, a, o, l, h, _;
          if (null == e) return !1;
          I[e._gsTweenID] && Q(),
            this.vars.css ||
              (e.style &&
                e !== t &&
                e.nodeType &&
                j.css &&
                this.vars.autoCSS !== !1 &&
                z(this.vars, e));
          for (n in this.vars)
            if (((_ = this.vars[n]), q[n]))
              _ &&
                (_ instanceof Array || (_.push && f(_))) &&
                -1 !== _.join("").indexOf("{self}") &&
                (this.vars[n] = _ = this._swapSelfInParams(_, this));
            else if (
              j[n] &&
              (l = new j[n]())._onInitTween(e, this.vars[n], this)
            ) {
              for (
                this._firstPT = h =
                  {
                    _next: this._firstPT,
                    t: l,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: n,
                    pg: 1,
                    pr: l._priority,
                  },
                  a = l._overwriteProps.length;
                --a > -1;

              )
                i[l._overwriteProps[a]] = this._firstPT;
              (l._priority || l._onInitAllProps) && (o = !0),
                (l._onDisable || l._onEnable) &&
                  (this._notifyPluginsOfEnabled = !0),
                h._next && (h._next._prev = h);
            } else
              i[n] = X.call(
                this,
                e,
                n,
                "get",
                _,
                n,
                0,
                null,
                this.vars.stringFilter,
              );
          return r && this._kill(r, e)
            ? this._initProps(e, i, s, r)
            : this._overwrite > 1 &&
                this._firstPT &&
                s.length > 1 &&
                K(e, this, i, this._overwrite, s)
              ? (this._kill(i, e), this._initProps(e, i, s, r))
              : (this._firstPT &&
                  ((this.vars.lazy !== !1 && this._duration) ||
                    (this.vars.lazy && !this._duration)) &&
                  (I[e._gsTweenID] = !0),
                o);
        }),
        (n.render = function (t, e, i) {
          var s,
            r,
            n,
            a,
            o = this._time,
            l = this._duration,
            h = this._rawPrevTime;
          if (t >= l)
            (this._totalTime = this._time = l),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
              this._reversed ||
                ((s = !0),
                (r = "onComplete"),
                (i = i || this._timeline.autoRemoveChildren)),
              0 === l &&
                (this._initted || !this.vars.lazy || i) &&
                (this._startTime === this._timeline._duration && (t = 0),
                (0 === t || 0 > h || (h === _ && "isPause" !== this.data)) &&
                  h !== t &&
                  ((i = !0), h > _ && (r = "onReverseComplete")),
                (this._rawPrevTime = a = !e || t || h === t ? t : _));
          else if (1e-7 > t)
            (this._totalTime = this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
              (0 !== o || (0 === l && h > 0)) &&
                ((r = "onReverseComplete"), (s = this._reversed)),
              0 > t &&
                ((this._active = !1),
                0 === l &&
                  (this._initted || !this.vars.lazy || i) &&
                  (h >= 0 && (h !== _ || "isPause" !== this.data) && (i = !0),
                  (this._rawPrevTime = a = !e || t || h === t ? t : _))),
              this._initted || (i = !0);
          else if (((this._totalTime = this._time = t), this._easeType)) {
            var u = t / l,
              c = this._easeType,
              f = this._easePower;
            (1 === c || (3 === c && u >= 0.5)) && (u = 1 - u),
              3 === c && (u *= 2),
              1 === f
                ? (u *= u)
                : 2 === f
                  ? (u *= u * u)
                  : 3 === f
                    ? (u *= u * u * u)
                    : 4 === f && (u *= u * u * u * u),
              (this.ratio =
                1 === c
                  ? 1 - u
                  : 2 === c
                    ? u
                    : 0.5 > t / l
                      ? u / 2
                      : 1 - u / 2);
          } else this.ratio = this._ease.getRatio(t / l);
          if (this._time !== o || i) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !i &&
                this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = this._totalTime = o),
                  (this._rawPrevTime = h),
                  F.push(this),
                  (this._lazy = [t, e]),
                  void 0
                );
              this._time && !s
                ? (this.ratio = this._ease.getRatio(this._time / l))
                : s &&
                  this._ease._calcEnd &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (
              this._lazy !== !1 && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== o &&
                    t >= 0 &&
                    (this._active = !0)),
                0 === o &&
                  (this._startAt &&
                    (t >= 0
                      ? this._startAt.render(t, e, i)
                      : r || (r = "_dummyGS")),
                  this.vars.onStart &&
                    (0 !== this._time || 0 === l) &&
                    (e || this._callback("onStart"))),
                n = this._firstPT;
              n;

            )
              n.f
                ? n.t[n.p](n.c * this.ratio + n.s)
                : (n.t[n.p] = n.c * this.ratio + n.s),
                (n = n._next);
            this._onUpdate &&
              (0 > t &&
                this._startAt &&
                t !== -1e-4 &&
                this._startAt.render(t, e, i),
              e || ((this._time !== o || s) && this._callback("onUpdate"))),
              r &&
                (!this._gc || i) &&
                (0 > t &&
                  this._startAt &&
                  !this._onUpdate &&
                  t !== -1e-4 &&
                  this._startAt.render(t, e, i),
                s &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !e && this.vars[r] && this._callback(r),
                0 === l &&
                  this._rawPrevTime === _ &&
                  a !== _ &&
                  (this._rawPrevTime = 0));
          }
        }),
        (n._kill = function (t, e, i) {
          if (
            ("all" === t && (t = null),
            null == t && (null == e || e === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          e =
            "string" != typeof e
              ? e || this._targets || this.target
              : D.selector(e) || e;
          var s,
            r,
            n,
            a,
            o,
            l,
            h,
            _,
            u,
            c =
              i &&
              this._time &&
              i._startTime === this._startTime &&
              this._timeline === i._timeline;
          if ((f(e) || M(e)) && "number" != typeof e[0])
            for (s = e.length; --s > -1; ) this._kill(t, e[s], i) && (l = !0);
          else {
            if (this._targets) {
              for (s = this._targets.length; --s > -1; )
                if (e === this._targets[s]) {
                  (o = this._propLookup[s] || {}),
                    (this._overwrittenProps = this._overwrittenProps || []),
                    (r = this._overwrittenProps[s] =
                      t ? this._overwrittenProps[s] || {} : "all");
                  break;
                }
            } else {
              if (e !== this.target) return !1;
              (o = this._propLookup),
                (r = this._overwrittenProps =
                  t ? this._overwrittenProps || {} : "all");
            }
            if (o) {
              if (
                ((h = t || o),
                (_ =
                  t !== r &&
                  "all" !== r &&
                  t !== o &&
                  ("object" != typeof t || !t._tempKill)),
                i && (D.onOverwrite || this.vars.onOverwrite))
              ) {
                for (n in h) o[n] && (u || (u = []), u.push(n));
                if ((u || !t) && !H(this, i, e, u)) return !1;
              }
              for (n in h)
                (a = o[n]) &&
                  (c && (a.f ? a.t[a.p](a.s) : (a.t[a.p] = a.s), (l = !0)),
                  a.pg && a.t._kill(h) && (l = !0),
                  (a.pg && 0 !== a.t._overwriteProps.length) ||
                    (a._prev
                      ? (a._prev._next = a._next)
                      : a === this._firstPT && (this._firstPT = a._next),
                    a._next && (a._next._prev = a._prev),
                    (a._next = a._prev = null)),
                  delete o[n]),
                  _ && (r[n] = 1);
              !this._firstPT && this._initted && this._enabled(!1, !1);
            }
          }
          return l;
        }),
        (n.invalidate = function () {
          return (
            this._notifyPluginsOfEnabled &&
              D._onPluginEvent("_onDisable", this),
            (this._firstPT =
              this._overwrittenProps =
              this._startAt =
              this._onUpdate =
                null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            O.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -_), this.render(-this._delay)),
            this
          );
        }),
        (n._enabled = function (t, e) {
          if ((o || a.wake(), t && this._gc)) {
            var i,
              s = this._targets;
            if (s)
              for (i = s.length; --i > -1; )
                this._siblings[i] = $(s[i], this, !0);
            else this._siblings = $(this.target, this, !0);
          }
          return (
            O.prototype._enabled.call(this, t, e),
            this._notifyPluginsOfEnabled && this._firstPT
              ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
              : !1
          );
        }),
        (D.to = function (t, e, i) {
          return new D(t, e, i);
        }),
        (D.from = function (t, e, i) {
          return (
            (i.runBackwards = !0),
            (i.immediateRender = 0 != i.immediateRender),
            new D(t, e, i)
          );
        }),
        (D.fromTo = function (t, e, i, s) {
          return (
            (s.startAt = i),
            (s.immediateRender =
              0 != s.immediateRender && 0 != i.immediateRender),
            new D(t, e, s)
          );
        }),
        (D.delayedCall = function (t, e, i, s, r) {
          return new D(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: s,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: r,
            overwrite: 0,
          });
        }),
        (D.set = function (t, e) {
          return new D(t, 0, e);
        }),
        (D.getTweensOf = function (t, e) {
          if (null == t) return [];
          t = "string" != typeof t ? t : D.selector(t) || t;
          var i, s, r, n;
          if ((f(t) || M(t)) && "number" != typeof t[0]) {
            for (i = t.length, s = []; --i > -1; )
              s = s.concat(D.getTweensOf(t[i], e));
            for (i = s.length; --i > -1; )
              for (n = s[i], r = i; --r > -1; ) n === s[r] && s.splice(i, 1);
          } else
            for (s = $(t).concat(), i = s.length; --i > -1; )
              (s[i]._gc || (e && !s[i].isActive())) && s.splice(i, 1);
          return s;
        }),
        (D.killTweensOf = D.killDelayedCallsTo =
          function (t, e, i) {
            "object" == typeof e && ((i = e), (e = !1));
            for (var s = D.getTweensOf(t, e), r = s.length; --r > -1; )
              s[r]._kill(i, t);
          });
      var te = g(
        "plugins.TweenPlugin",
        function (t, e) {
          (this._overwriteProps = (t || "").split(",")),
            (this._propName = this._overwriteProps[0]),
            (this._priority = e || 0),
            (this._super = te.prototype);
        },
        !0,
      );
      if (
        ((n = te.prototype),
        (te.version = "1.18.0"),
        (te.API = 2),
        (n._firstPT = null),
        (n._addTween = X),
        (n.setRatio = N),
        (n._kill = function (t) {
          var e,
            i = this._overwriteProps,
            s = this._firstPT;
          if (null != t[this._propName]) this._overwriteProps = [];
          else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
          for (; s; )
            null != t[s.n] &&
              (s._next && (s._next._prev = s._prev),
              s._prev
                ? ((s._prev._next = s._next), (s._prev = null))
                : this._firstPT === s && (this._firstPT = s._next)),
              (s = s._next);
          return !1;
        }),
        (n._roundProps = function (t, e) {
          for (var i = this._firstPT; i; )
            (t[this._propName] ||
              (null != i.n && t[i.n.split(this._propName + "_").join("")])) &&
              (i.r = e),
              (i = i._next);
        }),
        (D._onPluginEvent = function (t, e) {
          var i,
            s,
            r,
            n,
            a,
            o = e._firstPT;
          if ("_onInitAllProps" === t) {
            for (; o; ) {
              for (a = o._next, s = r; s && s.pr > o.pr; ) s = s._next;
              (o._prev = s ? s._prev : n) ? (o._prev._next = o) : (r = o),
                (o._next = s) ? (s._prev = o) : (n = o),
                (o = a);
            }
            o = e._firstPT = r;
          }
          for (; o; )
            o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0),
              (o = o._next);
          return i;
        }),
        (te.activate = function (t) {
          for (var e = t.length; --e > -1; )
            t[e].API === te.API && (j[new t[e]()._propName] = t[e]);
          return !0;
        }),
        (d.plugin = function (t) {
          if (!(t && t.propName && t.init && t.API))
            throw "illegal plugin definition.";
          var e,
            i = t.propName,
            s = t.priority || 0,
            r = t.overwriteProps,
            n = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_roundProps",
              initAll: "_onInitAllProps",
            },
            a = g(
              "plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin",
              function () {
                te.call(this, i, s), (this._overwriteProps = r || []);
              },
              t.global === !0,
            ),
            o = (a.prototype = new te(i));
          (o.constructor = a), (a.API = t.API);
          for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
          return (a.version = t.version), te.activate([a]), a;
        }),
        (s = t._gsQueue))
      ) {
        for (r = 0; s.length > r; r++) s[r]();
        for (n in p)
          p[n].func ||
            t.console.log(
              "GSAP encountered missing dependency: com.greensock." + n,
            );
      }
      o = !1;
    }
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenMax",
  );

var JSConfetti = (function () {
  "use strict";
  function t(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function e(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function i(t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  }
  function n(t) {
    return +t.replace(/px/, "");
  }
  function s(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
      n = Math.random() * (e - t) + t;
    return Math.floor(n * Math.pow(10, i)) / Math.pow(10, i);
  }
  function o(t) {
    return t[s(0, t.length)];
  }
  var a = [
    "#fcf403",
    "#62fc03",
    "#f4fc03",
    "#03e7fc",
    "#03fca5",
    "#a503fc",
    "#fc03ad",
    "#fc03c2",
  ];
  function r(t) {
    return Math.log(t) / Math.log(1920);
  }
  var h = (function () {
    function e(i) {
      t(this, e);
      var n = i.initialPosition,
        a = i.direction,
        h = i.confettiRadius,
        c = i.confettiColors,
        u = i.emojis,
        l = i.emojiSize,
        d = i.canvasWidth,
        f = s(0.9, 1.7, 3) * r(d);
      (this.confettiSpeed = { x: f, y: f }),
        (this.finalConfettiSpeedX = s(0.2, 0.6, 3)),
        (this.rotationSpeed = u.length ? 0.01 : s(0.03, 0.07, 3) * r(d)),
        (this.dragForceCoefficient = s(5e-4, 9e-4, 6)),
        (this.radius = { x: h, y: h }),
        (this.initialRadius = h),
        (this.rotationAngle = "left" === a ? s(0, 0.2, 3) : s(-0.2, 0, 3)),
        (this.emojiSize = l),
        (this.emojiRotationAngle = s(0, 2 * Math.PI)),
        (this.radiusYUpdateDirection = "down");
      var m =
        "left" === a
          ? (s(82, 15) * Math.PI) / 180
          : (s(-15, -82) * Math.PI) / 180;
      (this.absCos = Math.abs(Math.cos(m))),
        (this.absSin = Math.abs(Math.sin(m)));
      var p = s(-150, 0),
        v = {
          x: n.x + ("left" === a ? -p : p) * this.absCos,
          y: n.y - p * this.absSin,
        };
      (this.currentPosition = Object.assign({}, v)),
        (this.initialPosition = Object.assign({}, v)),
        (this.color = u.length ? null : o(c)),
        (this.emoji = u.length ? o(u) : null),
        (this.createdAt = new Date().getTime()),
        (this.direction = a);
    }
    return (
      i(e, [
        {
          key: "draw",
          value: function (t) {
            var e = this.currentPosition,
              i = this.radius,
              n = this.color,
              s = this.emoji,
              o = this.rotationAngle,
              a = this.emojiRotationAngle,
              r = this.emojiSize,
              h = window.devicePixelRatio;
            n
              ? ((t.fillStyle = n),
                t.beginPath(),
                t.ellipse(
                  e.x * h,
                  e.y * h,
                  i.x * h,
                  i.y * h,
                  o,
                  0,
                  2 * Math.PI,
                ),
                t.fill())
              : s &&
                ((t.font = "".concat(r, "px serif")),
                t.save(),
                t.translate(h * e.x, h * e.y),
                t.rotate(a),
                (t.textAlign = "center"),
                t.fillText(s, 0, 0),
                t.restore());
          },
        },
        {
          key: "updatePosition",
          value: function (t, e) {
            var i = this.confettiSpeed,
              n = this.dragForceCoefficient,
              s = this.finalConfettiSpeedX,
              o = this.radiusYUpdateDirection,
              a = this.rotationSpeed,
              r = this.createdAt,
              h = this.direction,
              c = e - r;
            i.x > s && (this.confettiSpeed.x -= n * t),
              (this.currentPosition.x +=
                i.x * ("left" === h ? -this.absCos : this.absCos) * t),
              (this.currentPosition.y =
                this.initialPosition.y -
                i.y * this.absSin * c +
                (0.00125 * Math.pow(c, 2)) / 2),
              (this.rotationSpeed -= this.emoji ? 1e-4 : 1e-5 * t),
              this.rotationSpeed < 0 && (this.rotationSpeed = 0),
              this.emoji
                ? (this.emojiRotationAngle +=
                    (this.rotationSpeed * t) % (2 * Math.PI))
                : "down" === o
                  ? ((this.radius.y -= t * a),
                    this.radius.y <= 0 &&
                      ((this.radius.y = 0),
                      (this.radiusYUpdateDirection = "up")))
                  : ((this.radius.y += t * a),
                    this.radius.y >= this.initialRadius &&
                      ((this.radius.y = this.initialRadius),
                      (this.radiusYUpdateDirection = "down")));
          },
        },
        {
          key: "getIsVisibleOnCanvas",
          value: function (t) {
            return this.currentPosition.y < t + 100;
          },
        },
      ]),
      e
    );
  })();
  function c() {
    var t = document.createElement("canvas");
    return (
      (t.style.position = "fixed"),
      (t.style.width = "100%"),
      (t.style.height = "100%"),
      (t.style.top = "0"),
      (t.style.left = "0"),
      (t.style.zIndex = "1000"),
      (t.style.pointerEvents = "none"),
      document.body.appendChild(t),
      t
    );
  }
  function u(t) {
    var e = t.confettiRadius,
      i = void 0 === e ? 6 : e,
      n = t.confettiNumber,
      s = void 0 === n ? t.confettiesNumber || (t.emojis ? 40 : 250) : n,
      o = t.confettiColors,
      r = void 0 === o ? a : o,
      h = t.emojis,
      c = void 0 === h ? t.emojies || [] : h,
      u = t.emojiSize,
      l = void 0 === u ? 80 : u;
    return (
      t.emojies &&
        console.error(
          "emojies argument is deprecated, please use emojis instead",
        ),
      t.confettiesNumber &&
        console.error(
          "confettiesNumber argument is deprecated, please use confettiNumber instead",
        ),
      {
        confettiRadius: i,
        confettiNumber: s,
        confettiColors: r,
        emojis: c,
        emojiSize: l,
      }
    );
  }
  var l = (function () {
    function e(i) {
      var n = this;
      t(this, e),
        (this.canvasContext = i),
        (this.shapes = []),
        (this.promise = new Promise(function (t) {
          return (n.resolvePromise = t);
        }));
    }
    return (
      i(e, [
        {
          key: "getBatchCompletePromise",
          value: function () {
            return this.promise;
          },
        },
        {
          key: "addShapes",
          value: function () {
            var t;
            (t = this.shapes).push.apply(t, arguments);
          },
        },
        {
          key: "complete",
          value: function () {
            var t;
            return (
              !this.shapes.length &&
              (null === (t = this.resolvePromise) ||
                void 0 === t ||
                t.call(this),
              !0)
            );
          },
        },
        {
          key: "processShapes",
          value: function (t, e, i) {
            var n = this,
              s = t.timeDelta,
              o = t.currentTime;
            this.shapes = this.shapes.filter(function (t) {
              return (
                t.updatePosition(s, o),
                t.draw(n.canvasContext),
                !i || t.getIsVisibleOnCanvas(e)
              );
            });
          },
        },
      ]),
      e
    );
  })();
  return (function () {
    function e() {
      var i =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e),
        (this.activeConfettiBatches = []),
        (this.canvas = i.canvas || c()),
        (this.canvasContext = this.canvas.getContext("2d")),
        (this.requestAnimationFrameRequested = !1),
        (this.lastUpdated = new Date().getTime()),
        (this.iterationIndex = 0),
        (this.loop = this.loop.bind(this)),
        requestAnimationFrame(this.loop);
    }
    return (
      i(e, [
        {
          key: "loop",
          value: function () {
            var t, e, i, s, o;
            (this.requestAnimationFrameRequested = !1),
              (t = this.canvas),
              (e = window.devicePixelRatio),
              (i = getComputedStyle(t)),
              (s = n(i.getPropertyValue("width"))),
              (o = n(i.getPropertyValue("height"))),
              t.setAttribute("width", (s * e).toString()),
              t.setAttribute("height", (o * e).toString());
            var a = new Date().getTime(),
              r = a - this.lastUpdated,
              h = this.canvas.offsetHeight,
              c = this.iterationIndex % 10 == 0;
            (this.activeConfettiBatches = this.activeConfettiBatches.filter(
              function (t) {
                return (
                  t.processShapes({ timeDelta: r, currentTime: a }, h, c),
                  !c || !t.complete()
                );
              },
            )),
              this.iterationIndex++,
              this.queueAnimationFrameIfNeeded(a);
          },
        },
        {
          key: "queueAnimationFrameIfNeeded",
          value: function (t) {
            this.requestAnimationFrameRequested ||
              this.activeConfettiBatches.length < 1 ||
              ((this.requestAnimationFrameRequested = !0),
              (this.lastUpdated = t || new Date().getTime()),
              requestAnimationFrame(this.loop));
          },
        },
        {
          key: "addConfetti",
          value: function () {
            for (
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                e = u(t),
                i = e.confettiRadius,
                n = e.confettiNumber,
                s = e.confettiColors,
                o = e.emojis,
                a = e.emojiSize,
                r = this.canvas.getBoundingClientRect(),
                c = r.width,
                d = r.height,
                f = (5 * d) / 7,
                m = { x: 0, y: f },
                p = { x: c, y: f },
                v = new l(this.canvasContext),
                g = 0;
              g < n / 2;
              g++
            ) {
              var y = new h({
                  initialPosition: m,
                  direction: "right",
                  confettiRadius: i,
                  confettiColors: s,
                  confettiNumber: n,
                  emojis: o,
                  emojiSize: a,
                  canvasWidth: c,
                }),
                C = new h({
                  initialPosition: p,
                  direction: "left",
                  confettiRadius: i,
                  confettiColors: s,
                  confettiNumber: n,
                  emojis: o,
                  emojiSize: a,
                  canvasWidth: c,
                });
              v.addShapes(y, C);
            }
            return (
              this.activeConfettiBatches.push(v),
              this.queueAnimationFrameIfNeeded(),
              v.getBatchCompletePromise()
            );
          },
        },
      ]),
      e
    );
  })();
})();

var SoundPlayer = {};

SoundPlayer.sounds = {};

SoundPlayer.soundContext = new (window.AudioContext ||
  window.webkitAudioContext)();

SoundPlayer.initialized = false;

SoundPlayer.init = function (sounds) {
  SoundPlayer.sounds = sounds;

  for (var key in SoundPlayer.sounds) {
    SoundPlayer.loadSound(key);
  }

  document.body.addEventListener("touchstart", SoundPlayer.tapped, false);
  document.body.addEventListener("click", SoundPlayer.tapped, false);
};

SoundPlayer.setSounds = function (sounds) {
  SoundPlayer.sounds = sounds;
};

SoundPlayer.tapped = function () {
  if (SoundPlayer.initialized) {
    return false;
  }

  for (var key in SoundPlayer.sounds) {
    SoundPlayer.play(key, { muted: true }, true);
  }

  SoundPlayer.initialized = true;
};

SoundPlayer.addSound = function (name, config, callback) {
  if (!SoundPlayer.sounds[name]) {
    SoundPlayer.sounds[name] = config;
    SoundPlayer.loadSound(name, function () {
      if (callback) {
        callback();
      }
    });
  } else {
    if (callback) {
      callback();
    }
  }
};

SoundPlayer.loadSound = function (name, callback) {
  var sound = SoundPlayer.sounds[name];

  var url = sound.url;
  var buffer = sound.buffer;

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    SoundPlayer.soundContext.decodeAudioData(
      request.response,
      function (newBuffer) {
        sound.buffer = newBuffer;
        if (callback) {
          callback(name);
        }
      },
    );
  };

  request.send();
};

SoundPlayer.stop = function (name) {
  var sound = SoundPlayer.sounds[name];
  sound.is_playing = false;
  if (sound.source) {
    sound.source.disconnect();
  }
};

SoundPlayer.stopAll = function () {
  for (var key in SoundPlayer.sounds) {
    SoundPlayer.stop(key);
  }
};

SoundPlayer.play = function (name, options, is_loading_sound, not_wait) {
  if (!SoundPlayer.initialized && !is_loading_sound) {
    setTimeout(function () {
      SoundPlayer.play(name, options);
    }, 500);

    return false;
  }

  var sound = SoundPlayer.sounds[name];

  if (sound.is_playing && !not_wait) {
    return false;
  }

  if (!is_loading_sound) {
    sound.is_playing = true;
  }

  var soundVolume = SoundPlayer.sounds[name].volume || 1;

  var buffer = sound.buffer;

  if (buffer) {
    var source = SoundPlayer.soundContext.createBufferSource();
    source.buffer = buffer;

    sound.source = source;

    var volume = SoundPlayer.soundContext.createGain();

    if (options) {
      if (options.volume) {
        volume.gain.value = soundVolume * options.volume;
      }

      if (options.muted) {
        volume.gain.value = 0;
      }
    } else {
      volume.gain.value = soundVolume;
    }

    volume.connect(SoundPlayer.soundContext.destination);
    source.connect(volume);
    if (options && options.loop) {
      source.loop = true;
    }
    source.start(0);
    source.onended = function () {
      sound.is_playing = false;
    };
  }
};

function Winwheel(options, drawWheel) {
  for (let key in (defaultOptions = {
    canvasId: "canvas",
    centerX: null,
    centerY: null,
    outerRadius: null,
    innerRadius: 0,
    numSegments: 1,
    drawMode: "code",
    rotationAngle: 0,
    textFontFamily: "Arial",
    textFontSize: 20,
    textFontWeight: "bold",
    textOrientation: "horizontal",
    textAlignment: "center",
    textDirection: "normal",
    textMargin: null,
    textFillStyle: "black",
    textStrokeStyle: null,
    textLineWidth: 1,
    fillStyle: "silver",
    strokeStyle: "black",
    lineWidth: 1,
    clearTheCanvas: !0,
    imageOverlay: !1,
    drawText: !0,
    pointerAngle: 0,
    wheelImage: null,
    imageDirection: "N",
    responsive: !1,
    scaleFactor: 1,
  }))
    null != options && void 0 !== options[key]
      ? (this[key] = options[key])
      : (this[key] = defaultOptions[key]);
  if (null != options)
    for (let key in options) void 0 === this[key] && (this[key] = options[key]);
  this.canvasId
    ? ((this.canvas = document.getElementById(this.canvasId)),
      this.canvas
        ? (null == this.centerX && (this.centerX = this.canvas.width / 2),
          null == this.centerY && (this.centerY = this.canvas.height / 2),
          null == this.outerRadius &&
            (this.canvas.width < this.canvas.height
              ? (this.outerRadius = this.canvas.width / 2 - this.lineWidth)
              : (this.outerRadius = this.canvas.height / 2 - this.lineWidth)),
          (this.ctx = this.canvas.getContext("2d")))
        : ((this.canvas = null), (this.ctx = null)))
    : ((this.canvas = null), (this.ctx = null)),
    (this.segments = new Array(null));
  for (let x = 1; x <= this.numSegments; x++)
    null != options && options.segments && void 0 !== options.segments[x - 1]
      ? (this.segments[x] = new Segment(options.segments[x - 1]))
      : (this.segments[x] = new Segment());
  if (
    (this.updateSegmentSizes(),
    null === this.textMargin && (this.textMargin = this.textFontSize / 1.7),
    null != options && options.animation && void 0 !== options.animation
      ? (this.animation = new Animation(options.animation))
      : (this.animation = new Animation()),
    null != options &&
      options.pins &&
      void 0 !== options.pins &&
      (this.pins = new Pin(options.pins)),
    "image" == this.drawMode || "segmentImage" == this.drawMode
      ? (void 0 === options.fillStyle && (this.fillStyle = null),
        void 0 === options.strokeStyle && (this.strokeStyle = "red"),
        void 0 === options.drawText && (this.drawText = !1),
        void 0 === options.lineWidth && (this.lineWidth = 1),
        void 0 === drawWheel && (drawWheel = !1))
      : void 0 === drawWheel && (drawWheel = !0),
    null != options && options.pointerGuide && void 0 !== options.pointerGuide
      ? (this.pointerGuide = new PointerGuide(options.pointerGuide))
      : (this.pointerGuide = new PointerGuide()),
    this.responsive &&
      ((winwheelToDrawDuringAnimation = this),
      (this._originalCanvasWidth = this.canvas.width),
      (this._originalCanvasHeight = this.canvas.height),
      (this._responsiveScaleHeight = this.canvas.dataset.responsivescaleheight),
      (this._responsiveMinWidth = this.canvas.dataset.responsiveminwidth),
      (this._responsiveMinHeight = this.canvas.dataset.responsiveminheight),
      (this._responsiveMargin = this.canvas.dataset.responsivemargin),
      window.addEventListener("load", winwheelResize),
      window.addEventListener("resize", winwheelResize)),
    !0 == drawWheel)
  )
    this.draw(this.clearTheCanvas);
  else if ("segmentImage" == this.drawMode) {
    (winwheelToDrawDuringAnimation = this), (winhweelAlreadyDrawn = !1);
    for (let y = 1; y <= this.numSegments; y++)
      null !== this.segments[y].image &&
        ((this.segments[y].imgData = new Image()),
        (this.segments[y].imgData.onload = winwheelLoadedImage),
        (this.segments[y].imgData.src = this.segments[y].image));
  }
}
function Pin(options) {
  let defaultOptions = {
    visible: !0,
    number: 36,
    outerRadius: 3,
    fillStyle: "grey",
    strokeStyle: "black",
    lineWidth: 1,
    margin: 3,
    responsive: !1,
  };
  for (let key in defaultOptions)
    null != options && void 0 !== options[key]
      ? (this[key] = options[key])
      : (this[key] = defaultOptions[key]);
  if (null != options)
    for (let key in options) void 0 === this[key] && (this[key] = options[key]);
}
function Animation(options) {
  let defaultOptions = {
    type: "spinOngoing",
    direction: "clockwise",
    propertyName: null,
    propertyValue: null,
    duration: 10,
    yoyo: !1,
    repeat: null,
    easing: null,
    stopAngle: null,
    spins: null,
    clearTheCanvas: null,
    callbackFinished: null,
    callbackBefore: null,
    callbackAfter: null,
    callbackSound: null,
    soundTrigger: "segment",
  };
  for (let key in defaultOptions)
    null != options && void 0 !== options[key]
      ? (this[key] = options[key])
      : (this[key] = defaultOptions[key]);
  if (null != options)
    for (let key in options) void 0 === this[key] && (this[key] = options[key]);
}
function Segment(options) {
  let defaultOptions = {
    size: null,
    text: "",
    fillStyle: null,
    strokeStyle: null,
    lineWidth: null,
    textFontFamily: null,
    textFontSize: null,
    textFontWeight: null,
    textOrientation: null,
    textAlignment: null,
    textDirection: null,
    textMargin: null,
    textFillStyle: null,
    textStrokeStyle: null,
    textLineWidth: null,
    image: null,
    imageDirection: null,
    imgData: null,
  };
  for (let key in defaultOptions)
    null != options && void 0 !== options[key]
      ? (this[key] = options[key])
      : (this[key] = defaultOptions[key]);
  if (null != options)
    for (let key in options) void 0 === this[key] && (this[key] = options[key]);
  (this.startAngle = 0), (this.endAngle = 0);
}
function PointerGuide(options) {
  let defaultOptions = { display: !1, strokeStyle: "red", lineWidth: 3 };
  for (let key in defaultOptions)
    null != options && void 0 !== options[key]
      ? (this[key] = options[key])
      : (this[key] = defaultOptions[key]);
}
function winwheelPercentToDegrees(percentValue) {
  let degrees = 0;
  return (
    percentValue > 0 &&
      percentValue <= 100 &&
      (degrees = 360 * (percentValue / 100)),
    degrees
  );
}
function winwheelAnimationLoop() {
  if (winwheelToDrawDuringAnimation) {
    !1 != winwheelToDrawDuringAnimation.animation.clearTheCanvas &&
      winwheelToDrawDuringAnimation.ctx.clearRect(
        0,
        0,
        winwheelToDrawDuringAnimation.canvas.width,
        winwheelToDrawDuringAnimation.canvas.height,
      );
    let callbackBefore = winwheelToDrawDuringAnimation.animation.callbackBefore,
      callbackAfter = winwheelToDrawDuringAnimation.animation.callbackAfter;
    null != callbackBefore &&
      ("function" == typeof callbackBefore
        ? callbackBefore()
        : eval(callbackBefore)),
      winwheelToDrawDuringAnimation.draw(!1),
      null != callbackAfter &&
        ("function" == typeof callbackAfter
          ? callbackAfter()
          : eval(callbackAfter)),
      winwheelToDrawDuringAnimation.animation.callbackSound &&
        winwheelTriggerSound();
  }
}
function winwheelTriggerSound() {
  !1 ==
    winwheelToDrawDuringAnimation.hasOwnProperty("_lastSoundTriggerNumber") &&
    (winwheelToDrawDuringAnimation._lastSoundTriggerNumber = 0);
  let callbackSound = winwheelToDrawDuringAnimation.animation.callbackSound,
    currentTriggerNumber = 0;
  (currentTriggerNumber =
    "pin" == winwheelToDrawDuringAnimation.animation.soundTrigger
      ? winwheelToDrawDuringAnimation.getCurrentPinNumber()
      : winwheelToDrawDuringAnimation.getIndicatedSegmentNumber()) !=
    winwheelToDrawDuringAnimation._lastSoundTriggerNumber &&
    ("function" == typeof callbackSound ? callbackSound() : eval(callbackSound),
    (winwheelToDrawDuringAnimation._lastSoundTriggerNumber =
      currentTriggerNumber));
}
(Winwheel.prototype.updateSegmentSizes = function () {
  if (this.segments) {
    let d = 0,
      e = 0;
    for (let b = 1; b <= this.numSegments; b++)
      null !== this.segments[b].size && ((d += this.segments[b].size), e++);
    let f = 360 - d,
      g = 0;
    f > 0 && (g = f / (this.numSegments - e));
    let c = 0;
    for (let a = 1; a <= this.numSegments; a++)
      (this.segments[a].startAngle = c),
        this.segments[a].size ? (c += this.segments[a].size) : (c += g),
        (this.segments[a].endAngle = c);
  }
}),
  (Winwheel.prototype.clearCanvas = function () {
    this.ctx && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }),
  (Winwheel.prototype.draw = function (a) {
    this.ctx &&
      (void 0 !== a ? !0 == a && this.clearCanvas() : this.clearCanvas(),
      "image" == this.drawMode
        ? (this.drawWheelImage(),
          !0 == this.drawText && this.drawSegmentText(),
          !0 == this.imageOverlay && this.drawSegments())
        : "segmentImage" == this.drawMode
          ? (this.drawSegmentImages(),
            !0 == this.drawText && this.drawSegmentText(),
            !0 == this.imageOverlay && this.drawSegments())
          : (this.drawSegments(),
            !0 == this.drawText && this.drawSegmentText()),
      void 0 !== this.pins && !0 == this.pins.visible && this.drawPins(),
      !0 == this.pointerGuide.display && this.drawPointerGuide());
  }),
  (Winwheel.prototype.drawPins = function () {
    if (this.pins && this.pins.number) {
      let a = this.centerX * this.scaleFactor,
        b = this.centerY * this.scaleFactor,
        f = this.outerRadius * this.scaleFactor,
        c = this.pins.outerRadius,
        e = this.pins.margin;
      this.pins.responsive &&
        ((c = this.pins.outerRadius * this.scaleFactor),
        (e = this.pins.margin * this.scaleFactor));
      let g = 360 / this.pins.number;
      for (let d = 1; d <= this.pins.number; d++)
        this.ctx.save(),
          (this.ctx.strokeStyle = this.pins.strokeStyle),
          (this.ctx.lineWidth = this.pins.lineWidth),
          (this.ctx.fillStyle = this.pins.fillStyle),
          this.ctx.translate(a, b),
          this.ctx.rotate(this.degToRad(d * g + this.rotationAngle)),
          this.ctx.translate(-a, -b),
          this.ctx.beginPath(),
          this.ctx.arc(a, b - f + c + e, c, 0, 2 * Math.PI),
          this.pins.fillStyle && this.ctx.fill(),
          this.pins.strokeStyle && this.ctx.stroke(),
          this.ctx.restore();
    }
  }),
  (Winwheel.prototype.drawPointerGuide = function () {
    if (this.ctx) {
      let a = this.centerX * this.scaleFactor,
        b = this.centerY * this.scaleFactor,
        c = this.outerRadius * this.scaleFactor;
      this.ctx.save(),
        this.ctx.translate(a, b),
        this.ctx.rotate(this.degToRad(this.pointerAngle)),
        this.ctx.translate(-a, -b),
        (this.ctx.strokeStyle = this.pointerGuide.strokeStyle),
        (this.ctx.lineWidth = this.pointerGuide.lineWidth),
        this.ctx.beginPath(),
        this.ctx.moveTo(a, b),
        this.ctx.lineTo(a, -(c / 4)),
        this.ctx.stroke(),
        this.ctx.restore();
    }
  }),
  (Winwheel.prototype.drawWheelImage = function () {
    if (null != this.wheelImage) {
      let a = this.centerX * this.scaleFactor,
        b = this.centerY * this.scaleFactor,
        c = this.wheelImage.width * this.scaleFactor,
        d = this.wheelImage.height * this.scaleFactor,
        e = a - c / 2,
        f = b - d / 2;
      this.ctx.save(),
        this.ctx.translate(a, b),
        this.ctx.rotate(this.degToRad(this.rotationAngle)),
        this.ctx.translate(-a, -b),
        this.ctx.drawImage(this.wheelImage, e, f, c, d),
        this.ctx.restore();
    }
  }),
  (Winwheel.prototype.drawSegmentImages = function () {
    if (this.ctx) {
      let b = this.centerX * this.scaleFactor,
        c = this.centerY * this.scaleFactor;
      if (this.segments)
        for (let g = 1; g <= this.numSegments; g++) {
          let a = this.segments[g];
          if (a.imgData.height) {
            let d = 0,
              e = 0,
              f = 0,
              j = "",
              h = a.imgData.width * this.scaleFactor,
              i = a.imgData.height * this.scaleFactor;
            "S" ==
            (j =
              null !== a.imageDirection
                ? a.imageDirection
                : this.imageDirection)
              ? ((d = b - h / 2),
                (e = c),
                (f = a.startAngle + 180 + (a.endAngle - a.startAngle) / 2))
              : "E" == j
                ? ((d = b),
                  (e = c - i / 2),
                  (f = a.startAngle + 270 + (a.endAngle - a.startAngle) / 2))
                : "W" == j
                  ? ((d = b - h),
                    (e = c - i / 2),
                    (f = a.startAngle + 90 + (a.endAngle - a.startAngle) / 2))
                  : ((d = b - h / 2),
                    (e = c - i),
                    (f = a.startAngle + (a.endAngle - a.startAngle) / 2)),
              this.ctx.save(),
              this.ctx.translate(b, c),
              this.ctx.rotate(this.degToRad(this.rotationAngle + f)),
              this.ctx.translate(-b, -c),
              this.ctx.drawImage(a.imgData, d, e, h, i),
              this.ctx.restore();
          } else console.log("Segment " + g + " imgData is not loaded");
        }
    }
  }),
  (Winwheel.prototype.drawSegments = function () {
    if (this.ctx && this.segments) {
      let c = this.centerX * this.scaleFactor,
        d = this.centerY * this.scaleFactor,
        g = this.innerRadius * this.scaleFactor,
        i = this.outerRadius * this.scaleFactor;
      for (let h = 1; h <= this.numSegments; h++) {
        let a = this.segments[h],
          e,
          b,
          f;
        if (
          ((e = null !== a.fillStyle ? a.fillStyle : this.fillStyle),
          (this.ctx.fillStyle = e),
          (b = null !== a.lineWidth ? a.lineWidth : this.lineWidth),
          (this.ctx.lineWidth = b),
          (f = null !== a.strokeStyle ? a.strokeStyle : this.strokeStyle),
          (this.ctx.strokeStyle = f),
          f || e)
        ) {
          if ((this.ctx.beginPath(), this.innerRadius)) {
            let j =
                Math.cos(
                  this.degToRad(a.startAngle + this.rotationAngle - 90),
                ) *
                (g - b / 2),
              k =
                Math.sin(
                  this.degToRad(a.startAngle + this.rotationAngle - 90),
                ) *
                (g - b / 2);
            this.ctx.moveTo(c + j, d + k);
          } else this.ctx.moveTo(c, d);
          this.ctx.arc(
            c,
            d,
            i + b / 2,
            this.degToRad(a.startAngle + this.rotationAngle - 90),
            this.degToRad(a.endAngle + this.rotationAngle - 90),
            !1,
          ),
            this.innerRadius &&
              this.ctx.arc(
                c,
                d,
                g,
                this.degToRad(a.endAngle + this.rotationAngle - 90),
                this.degToRad(a.startAngle + this.rotationAngle - 90),
                !0,
              ),
            e && this.ctx.fill(),
            f && this.ctx.stroke();
        }
      }
    }
  }),
  (Winwheel.prototype.drawSegmentText = function () {
    if (this.ctx) {
      let x,
        m,
        y,
        n,
        f,
        M,
        h,
        j,
        k,
        N,
        b = this.centerX * this.scaleFactor,
        e = this.centerY * this.scaleFactor,
        l = this.outerRadius * this.scaleFactor,
        i = this.innerRadius * this.scaleFactor;
      for (let z = 1; z <= this.numSegments; z++) {
        this.ctx.save();
        let a = this.segments[z];
        if (a.text) {
          (x =
            null !== a.textFontFamily ? a.textFontFamily : this.textFontFamily),
            (m = null !== a.textFontSize ? a.textFontSize : this.textFontSize),
            (y =
              null !== a.textFontWeight
                ? a.textFontWeight
                : this.textFontWeight),
            (n =
              null !== a.textOrientation
                ? a.textOrientation
                : this.textOrientation),
            (f =
              null !== a.textAlignment ? a.textAlignment : this.textAlignment),
            (M =
              null !== a.textDirection ? a.textDirection : this.textDirection),
            (h = null !== a.textMargin ? a.textMargin : this.textMargin),
            (j =
              null !== a.textFillStyle ? a.textFillStyle : this.textFillStyle),
            (k =
              null !== a.textStrokeStyle
                ? a.textStrokeStyle
                : this.textStrokeStyle),
            (N =
              null !== a.textLineWidth ? a.textLineWidth : this.textLineWidth),
            (m *= this.scaleFactor),
            (h *= this.scaleFactor);
          let u = "";
          null != y && (u += y + " "),
            null != m && (u += m + "px "),
            null != x && (u += x),
            (this.ctx.font = u),
            (this.ctx.fillStyle = j),
            (this.ctx.strokeStyle = k),
            (this.ctx.lineWidth = N);
          let c = a.text.split("\n"),
            g = 0 - m * (c.length / 2) + m / 2;
          "curved" == n && ("inner" == f || "outer" == f) && (g = 0);
          for (let d = 0; d < c.length; d++) {
            if ("reversed" == M) {
              if ("horizontal" == n) {
                "inner" == f
                  ? (this.ctx.textAlign = "right")
                  : "outer" == f
                    ? (this.ctx.textAlign = "left")
                    : (this.ctx.textAlign = "center"),
                  (this.ctx.textBaseline = "middle");
                let $ = this.degToRad(
                  a.endAngle -
                    (a.endAngle - a.startAngle) / 2 +
                    this.rotationAngle -
                    90 -
                    180,
                );
                this.ctx.save(),
                  this.ctx.translate(b, e),
                  this.ctx.rotate($),
                  this.ctx.translate(-b, -e),
                  "inner" == f
                    ? (j && this.ctx.fillText(c[d], b - i - h, e + g),
                      k && this.ctx.strokeText(c[d], b - i - h, e + g))
                    : "outer" == f
                      ? (j && this.ctx.fillText(c[d], b - l + h, e + g),
                        k && this.ctx.strokeText(c[d], b - l + h, e + g))
                      : (j &&
                          this.ctx.fillText(
                            c[d],
                            b - i - (l - i) / 2 - h,
                            e + g,
                          ),
                        k &&
                          this.ctx.strokeText(
                            c[d],
                            b - i - (l - i) / 2 - h,
                            e + g,
                          )),
                  this.ctx.restore();
              } else if ("vertical" == n) {
                (this.ctx.textAlign = "center"),
                  "inner" == f
                    ? (this.ctx.textBaseline = "top")
                    : "outer" == f
                      ? (this.ctx.textBaseline = "bottom")
                      : (this.ctx.textBaseline = "middle");
                let O = a.endAngle - (a.endAngle - a.startAngle) / 2 - 180;
                (O += this.rotationAngle),
                  this.ctx.save(),
                  this.ctx.translate(b, e),
                  this.ctx.rotate(this.degToRad(O)),
                  this.ctx.translate(-b, -e);
                let o = 0;
                "outer" == f
                  ? (o = e + l - h)
                  : "inner" == f && (o = e + i + h);
                let v = m - m / 9;
                if ("outer" == f)
                  for (let A = c[d].length - 1; A >= 0; A--) {
                    let P = c[d].charAt(A);
                    j && this.ctx.fillText(P, b + g, o),
                      k && this.ctx.strokeText(P, b + g, o),
                      (o -= v);
                  }
                else if ("inner" == f)
                  for (let B = 0; B < c[d].length; B++) {
                    let Q = c[d].charAt(B);
                    j && this.ctx.fillText(Q, b + g, o),
                      k && this.ctx.strokeText(Q, b + g, o),
                      (o += v);
                  }
                else if ("center" == f) {
                  let R = 0;
                  c[d].length > 1 && (R = (v * (c[d].length - 1)) / 2);
                  let C = e + i + (l - i) / 2 + R + h;
                  for (let D = c[d].length - 1; D >= 0; D--) {
                    let S = c[d].charAt(D);
                    j && this.ctx.fillText(S, b + g, C),
                      k && this.ctx.strokeText(S, b + g, C),
                      (C -= v);
                  }
                }
                this.ctx.restore();
              } else if ("curved" == n) {
                let q = 0;
                "inner" == f
                  ? ((q = i + h), (this.ctx.textBaseline = "top"))
                  : "outer" == f
                    ? ((q = l - h),
                      (this.ctx.textBaseline = "bottom"),
                      (q -= m * (c.length - 1)))
                    : "center" == f &&
                      ((q = i + h + (l - i) / 2),
                      (this.ctx.textBaseline = "middle"));
                let E = 0,
                  s = 0;
                if (c[d].length > 1) {
                  (this.ctx.textAlign = "left"), (E = 4 * (m / 10));
                  let _ = (E *= 100 / q) * c[d].length;
                  s = a.startAngle + ((a.endAngle - a.startAngle) / 2 - _ / 2);
                } else
                  (s = a.startAngle + (a.endAngle - a.startAngle) / 2),
                    (this.ctx.textAlign = "center");
                (s += this.rotationAngle), (s -= 180);
                for (let F = c[d].length; F >= 0; F--) {
                  this.ctx.save();
                  let T = c[d].charAt(F);
                  this.ctx.translate(b, e),
                    this.ctx.rotate(this.degToRad(s)),
                    this.ctx.translate(-b, -e),
                    k && this.ctx.strokeText(T, b, e + q + g),
                    j && this.ctx.fillText(T, b, e + q + g),
                    (s += E),
                    this.ctx.restore();
                }
              }
            } else if ("horizontal" == n) {
              "inner" == f
                ? (this.ctx.textAlign = "left")
                : "outer" == f
                  ? (this.ctx.textAlign = "right")
                  : (this.ctx.textAlign = "center"),
                (this.ctx.textBaseline = "middle");
              let aa = this.degToRad(
                a.endAngle -
                  (a.endAngle - a.startAngle) / 2 +
                  this.rotationAngle -
                  90,
              );
              this.ctx.save(),
                this.ctx.translate(b, e),
                this.ctx.rotate(aa),
                this.ctx.translate(-b, -e),
                "inner" == f
                  ? (j && this.ctx.fillText(c[d], b + i + h, e + g),
                    k && this.ctx.strokeText(c[d], b + i + h, e + g))
                  : "outer" == f
                    ? (j && this.ctx.fillText(c[d], b + l - h, e + g),
                      k && this.ctx.strokeText(c[d], b + l - h, e + g))
                    : (j &&
                        this.ctx.fillText(c[d], b + i + (l - i) / 2 + h, e + g),
                      k &&
                        this.ctx.strokeText(
                          c[d],
                          b + i + (l - i) / 2 + h,
                          e + g,
                        )),
                this.ctx.restore();
            } else if ("vertical" == n) {
              (this.ctx.textAlign = "center"),
                "inner" == f
                  ? (this.ctx.textBaseline = "bottom")
                  : "outer" == f
                    ? (this.ctx.textBaseline = "top")
                    : (this.ctx.textBaseline = "middle");
              let U = a.endAngle - (a.endAngle - a.startAngle) / 2;
              (U += this.rotationAngle),
                this.ctx.save(),
                this.ctx.translate(b, e),
                this.ctx.rotate(this.degToRad(U)),
                this.ctx.translate(-b, -e);
              let p = 0;
              "outer" == f ? (p = e - l + h) : "inner" == f && (p = e - i - h);
              let w = m - m / 9;
              if ("outer" == f)
                for (let G = 0; G < c[d].length; G++) {
                  let V = c[d].charAt(G);
                  j && this.ctx.fillText(V, b + g, p),
                    k && this.ctx.strokeText(V, b + g, p),
                    (p += w);
                }
              else if ("inner" == f)
                for (let H = c[d].length - 1; H >= 0; H--) {
                  let W = c[d].charAt(H);
                  j && this.ctx.fillText(W, b + g, p),
                    k && this.ctx.strokeText(W, b + g, p),
                    (p -= w);
                }
              else if ("center" == f) {
                let X = 0;
                c[d].length > 1 && (X = (w * (c[d].length - 1)) / 2);
                let I = e - i - (l - i) / 2 - X - h;
                for (let J = 0; J < c[d].length; J++) {
                  let Y = c[d].charAt(J);
                  j && this.ctx.fillText(Y, b + g, I),
                    k && this.ctx.strokeText(Y, b + g, I),
                    (I += w);
                }
              }
              this.ctx.restore();
            } else if ("curved" == n) {
              let r = 0;
              "inner" == f
                ? ((r = i + h),
                  (this.ctx.textBaseline = "bottom"),
                  (r += m * (c.length - 1)))
                : "outer" == f
                  ? ((r = l - h), (this.ctx.textBaseline = "top"))
                  : "center" == f &&
                    ((r = i + h + (l - i) / 2),
                    (this.ctx.textBaseline = "middle"));
              let K = 0,
                t = 0;
              if (c[d].length > 1) {
                (this.ctx.textAlign = "left"), (K = 4 * (m / 10));
                let ab = (K *= 100 / r) * c[d].length;
                t = a.startAngle + ((a.endAngle - a.startAngle) / 2 - ab / 2);
              } else
                (t = a.startAngle + (a.endAngle - a.startAngle) / 2),
                  (this.ctx.textAlign = "center");
              t += this.rotationAngle;
              for (let L = 0; L < c[d].length; L++) {
                this.ctx.save();
                let Z = c[d].charAt(L);
                this.ctx.translate(b, e),
                  this.ctx.rotate(this.degToRad(t)),
                  this.ctx.translate(-b, -e),
                  k && this.ctx.strokeText(Z, b, e - r + g),
                  j && this.ctx.fillText(Z, b, e - r + g),
                  (t += K),
                  this.ctx.restore();
              }
            }
            g += m;
          }
        }
        this.ctx.restore();
      }
    }
  }),
  (Winwheel.prototype.degToRad = function (a) {
    return 0.017453292519943295 * a;
  }),
  (Winwheel.prototype.setCenter = function (a, b) {
    (this.centerX = a), (this.centerY = b);
  }),
  (Winwheel.prototype.addSegment = function (e, a) {
    let d = new Segment(e);
    this.numSegments++;
    let c;
    if (void 0 !== a) {
      for (let b = this.numSegments; b > a; b--)
        this.segments[b] = this.segments[b - 1];
      (this.segments[a] = d), (c = a);
    } else (this.segments[this.numSegments] = d), (c = this.numSegments);
    return this.updateSegmentSizes(), this.segments[c];
  }),
  (Winwheel.prototype.setCanvasId = function (a) {
    a
      ? ((this.canvasId = a),
        (this.canvas = document.getElementById(this.canvasId)),
        this.canvas && (this.ctx = this.canvas.getContext("2d")))
      : ((this.canvasId = null), (this.ctx = null), (this.canvas = null));
  }),
  (Winwheel.prototype.deleteSegment = function (b) {
    if (this.numSegments > 1) {
      if (void 0 !== b)
        for (let a = b; a < this.numSegments; a++)
          this.segments[a] = this.segments[a + 1];
      (this.segments[this.numSegments] = void 0),
        this.segments.pop(),
        this.numSegments--,
        this.updateSegmentSizes();
    }
  }),
  (Winwheel.prototype.windowToCanvas = function (b, c) {
    let a = this.canvas.getBoundingClientRect();
    return {
      x: Math.floor(b - a.left * (this.canvas.width / a.width)),
      y: Math.floor(c - a.top * (this.canvas.height / a.height)),
    };
  }),
  (Winwheel.prototype.getSegmentAt = function (c, d) {
    let a = null,
      b = this.getSegmentNumberAt(c, d);
    return null !== b && (a = this.segments[b]), a;
  }),
  (Winwheel.prototype.getSegmentNumberAt = function (m, n) {
    let b = this.windowToCanvas(m, n),
      c,
      d,
      e,
      f,
      i,
      j = this.centerX * this.scaleFactor,
      k = this.centerY * this.scaleFactor,
      o = this.outerRadius * this.scaleFactor,
      p = this.innerRadius * this.scaleFactor;
    b.x > j ? ((e = b.x - j), (d = "R")) : ((e = j - b.x), (d = "L")),
      b.y > k ? ((f = b.y - k), (c = "B")) : ((f = k - b.y), (c = "T"));
    let h = (180 * Math.atan(f / e)) / Math.PI,
      a = 0;
    (i = Math.sqrt(f * f + e * e)),
      "T" == c && "R" == d
        ? (a = Math.round(90 - h))
        : "B" == c && "R" == d
          ? (a = Math.round(h + 90))
          : "B" == c && "L" == d
            ? (a = Math.round(90 - h + 180))
            : "T" == c && "L" == d && (a = Math.round(h + 270)),
      0 != this.rotationAngle &&
        (a -= this.getRotationPosition()) < 0 &&
        (a = 360 - Math.abs(a));
    let l = null;
    for (let g = 1; g <= this.numSegments; g++)
      if (
        a >= this.segments[g].startAngle &&
        a <= this.segments[g].endAngle &&
        i >= p &&
        i <= o
      ) {
        l = g;
        break;
      }
    return l;
  }),
  (Winwheel.prototype.getIndicatedSegment = function () {
    let a = this.getIndicatedSegmentNumber();
    return this.segments[a];
  }),
  (Winwheel.prototype.getIndicatedSegmentNumber = function () {
    let c = 0,
      d = this.getRotationPosition(),
      a = Math.floor(this.pointerAngle - d);
    a < 0 && (a = 360 - Math.abs(a));
    for (let b = 1; b < this.segments.length; b++)
      if (a >= this.segments[b].startAngle && a <= this.segments[b].endAngle) {
        c = b;
        break;
      }
    return c;
  }),
  (Winwheel.prototype.getCurrentPinNumber = function () {
    let b = 0;
    if (this.pins) {
      let f = this.getRotationPosition(),
        a = Math.floor(this.pointerAngle - f);
      a < 0 && (a = 360 - Math.abs(a));
      let e = 360 / this.pins.number,
        c = 0;
      for (let d = 0; d < this.pins.number; d++) {
        if (a >= c && a <= c + e) {
          b = d;
          break;
        }
        c += e;
      }
      "clockwise" == this.animation.direction &&
        ++b > this.pins.number &&
        (b = 0);
    }
    return b;
  }),
  (Winwheel.prototype.getRotationPosition = function () {
    let a = this.rotationAngle;
    if (a >= 0) {
      if (a > 360) {
        let b = Math.floor(a / 360);
        a -= 360 * b;
      }
    } else {
      if (a < -360) {
        let c = Math.ceil(a / 360);
        a -= 360 * c;
      }
      a = 360 + a;
    }
    return a;
  }),
  (Winwheel.prototype.startAnimation = function () {
    if (this.animation) {
      this.computeAnimation(), (winwheelToDrawDuringAnimation = this);
      let a = new Array(null);
      (a[this.animation.propertyName] = this.animation.propertyValue),
        (a.yoyo = this.animation.yoyo),
        (a.repeat = this.animation.repeat),
        (a.ease = this.animation.easing),
        (a.onUpdate = winwheelAnimationLoop),
        (a.onComplete = winwheelStopAnimation),
        (this.tween = TweenMax.to(this, this.animation.duration, a));
    }
  }),
  (Winwheel.prototype.stopAnimation = function (a) {
    winwheelToDrawDuringAnimation &&
      (winwheelToDrawDuringAnimation.tween &&
        winwheelToDrawDuringAnimation.tween.kill(),
      winwheelStopAnimation(a)),
      (winwheelToDrawDuringAnimation = this);
  }),
  (Winwheel.prototype.pauseAnimation = function () {
    this.tween && this.tween.pause();
  }),
  (Winwheel.prototype.resumeAnimation = function () {
    this.tween && this.tween.play();
  }),
  (Winwheel.prototype.computeAnimation = function () {
    this.animation &&
      ("spinOngoing" == this.animation.type
        ? ((this.animation.propertyName = "rotationAngle"),
          null == this.animation.spins && (this.animation.spins = 5),
          null == this.animation.repeat && (this.animation.repeat = -1),
          null == this.animation.easing &&
            (this.animation.easing = "Linear.easeNone"),
          null == this.animation.yoyo && (this.animation.yoyo = !1),
          (this.animation.propertyValue = 360 * this.animation.spins),
          "anti-clockwise" == this.animation.direction &&
            (this.animation.propertyValue = 0 - this.animation.propertyValue))
        : "spinToStop" == this.animation.type
          ? ((this.animation.propertyName = "rotationAngle"),
            null == this.animation.spins && (this.animation.spins = 5),
            null == this.animation.repeat && (this.animation.repeat = 0),
            null == this.animation.easing &&
              (this.animation.easing = "Power3.easeOut"),
            null == this.animation.stopAngle
              ? (this.animation._stopAngle = Math.floor(359 * Math.random()))
              : (this.animation._stopAngle =
                  360 - this.animation.stopAngle + this.pointerAngle),
            null == this.animation.yoyo && (this.animation.yoyo = !1),
            (this.animation.propertyValue = 360 * this.animation.spins),
            "anti-clockwise" == this.animation.direction
              ? ((this.animation.propertyValue =
                  0 - this.animation.propertyValue),
                (this.animation.propertyValue -=
                  360 - this.animation._stopAngle))
              : (this.animation.propertyValue += this.animation._stopAngle))
          : "spinAndBack" == this.animation.type
            ? ((this.animation.propertyName = "rotationAngle"),
              null == this.animation.spins && (this.animation.spins = 5),
              null == this.animation.repeat && (this.animation.repeat = 1),
              null == this.animation.easing &&
                (this.animation.easing = "Power2.easeInOut"),
              null == this.animation.yoyo && (this.animation.yoyo = !0),
              null == this.animation.stopAngle
                ? (this.animation._stopAngle = 0)
                : (this.animation._stopAngle = 360 - this.animation.stopAngle),
              (this.animation.propertyValue = 360 * this.animation.spins),
              "anti-clockwise" == this.animation.direction
                ? ((this.animation.propertyValue =
                    0 - this.animation.propertyValue),
                  (this.animation.propertyValue -=
                    360 - this.animation._stopAngle))
                : (this.animation.propertyValue += this.animation._stopAngle))
            : this.animation.type);
  }),
  (Winwheel.prototype.getRandomForSegment = function (a) {
    let b = 0;
    if (a) {
      if (void 0 !== this.segments[a]) {
        let c = this.segments[a].startAngle,
          d = this.segments[a].endAngle - c - 2;
        d > 0
          ? (b = c + 1 + Math.floor(Math.random() * d))
          : ((b = this.segments[a].startAngle),
            console.log(
              "Segment size is too small to safely get random angle inside it",
            ));
      } else console.log("Segment " + a + " undefined");
    } else console.log("Segment number not specified");
    return b;
  }),
  (Segment.prototype.changeImage = function (b, a) {
    (this.image = b),
      (this.imgData = null),
      a && (this.imageDirection = a),
      (winhweelAlreadyDrawn = !1),
      (this.imgData = new Image()),
      (this.imgData.onload = winwheelLoadedImage),
      (this.imgData.src = this.image);
  });
let winwheelToDrawDuringAnimation = null;
function winwheelStopAnimation(canCallback) {
  if (!1 != canCallback) {
    let callback = winwheelToDrawDuringAnimation.animation.callbackFinished;
    null != callback &&
      ("function" == typeof callback
        ? callback(winwheelToDrawDuringAnimation.getIndicatedSegment())
        : eval(callback));
  }
}
let winhweelAlreadyDrawn = !1;
function winwheelLoadedImage() {
  if (!1 == winhweelAlreadyDrawn) {
    let winwheelImageLoadCount = 0;
    for (let i = 1; i <= winwheelToDrawDuringAnimation.numSegments; i++)
      null != winwheelToDrawDuringAnimation.segments[i].imgData &&
        winwheelToDrawDuringAnimation.segments[i].imgData.height &&
        winwheelImageLoadCount++;
    winwheelImageLoadCount == winwheelToDrawDuringAnimation.numSegments &&
      ((winhweelAlreadyDrawn = !0), winwheelToDrawDuringAnimation.draw());
  }
}
function winwheelResize() {
  let margin = 40;
  void 0 !== winwheelToDrawDuringAnimation._responsiveMargin &&
    (margin = winwheelToDrawDuringAnimation._responsiveMargin);
  let width = window.innerWidth - margin,
    minWidth = winwheelToDrawDuringAnimation._responsiveMinWidth,
    minHeight = winwheelToDrawDuringAnimation._responsiveMinHeight;
  width < minWidth
    ? (width = minWidth)
    : width > winwheelToDrawDuringAnimation._originalCanvasWidth &&
      (width = winwheelToDrawDuringAnimation._originalCanvasWidth);
  let percent = width / winwheelToDrawDuringAnimation._originalCanvasWidth;
  if (
    ((winwheelToDrawDuringAnimation.canvas.width =
      winwheelToDrawDuringAnimation._originalCanvasWidth * percent),
    winwheelToDrawDuringAnimation._responsiveScaleHeight)
  ) {
    let height = winwheelToDrawDuringAnimation._originalCanvasHeight * percent;
    height < minHeight
      ? (height = minHeight)
      : height > winwheelToDrawDuringAnimation._originalCanvasHeight &&
        (height = winwheelToDrawDuringAnimation._originalCanvasHeight),
      (winwheelToDrawDuringAnimation.canvas.height = height);
  }
  (winwheelToDrawDuringAnimation.scaleFactor = percent),
    winwheelToDrawDuringAnimation.draw();
}

function calculateSpinDuration() {
  var duration1 = Math.floor(Math.random() * 11) + 10;
  // Genera un valor aleatorio entre 10 y 20
  console.log("duration: " + duration1);
  return duration1;
}
var __DATA_WHEEL_THEMES__ = [
  {
    page_background_color: "#D1E4FF",
    main_color: "#1a1a1a",
    action_color: "#9ad0e6",
    wheel_dots_color: "#f199a0",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#9ad0e6",
    wheel_slices_text_color: "auto",
    wheel_slices_color: [
      "#5B68BB",
      "#A746B9",
      "#E33F76",
      "#EB5B4F",
      "#F7A126",
      "#F7BF46",
      "#F7E756",
      "#CEDA53",
      "#95C955",
      "#25A095",
      "#3EA0ED",
    ],
  },
  {
    page_background_color: "#D1E4FF",
    main_color: "#1a1a1a",
    action_color: "#9ad0e6",
    wheel_dots_color: "#f199a0",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#9ad0e6",
    wheel_slices_text_color: "auto",
    wheel_slices_color: ["#7eecec", "#7280fd", "#fff171", "#ff7878"],
  },
  {
    page_background_color: "#012d41",
    main_color: "#ffffff",
    action_color: "#9ad0e6",
    wheel_dots_color: "#f199a0",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#9ad0e6",
    wheel_slices_text_color: "auto",
    wheel_slices_color: ["#ff404e", "#D8DCF3", "#1ba5b8", "#daecf3"],
  },
  {
    page_background_color: "#680052",
    main_color: "#ffffff",
    action_color: "#ecabe4",
    wheel_dots_color: "#cd9cd8",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#ecabe4",
    // wheel_slices_text_color: '#FFFFFF',
    wheel_slices_text_color: "auto",
    wheel_slices_color: ["#680052", "#360541", "#863297", "#db9be4"],
  },
  {
    page_background_color: "#797DD7",
    main_color: "#ffffff",
    action_color: "#011646",
    wheel_dots_color: "#4D3C86",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#515AA4",
    wheel_slices_text_color: "#FFFFFF",
    wheel_slices_text_color: "auto",
    wheel_slices_color: ["#949cdf", "#a7c5eb", "#f6ecf0"],
  },
  {
    page_background_color: "#4f4f4f",
    main_color: "#ffffff",
    action_color: "#D2BE46",
    wheel_dots_color: "#62531E",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#62531E",
    wheel_slices_text_color: "#342323",
    wheel_slices_color: ["#C6B86C", "#efe8bc", "#d2be46", "#eee6ba"],
  },
  {
    page_background_color: "#9F5F80",
    main_color: "#ffffff",
    action_color: "#ECAB89",
    wheel_dots_color: "#FFFFFF",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#5E3651",
    wheel_slices_text_color: "auto",
    wheel_slices_color: ["#ffba93", "#9f5f80"],
  },
  {
    page_background_color: "#E9F0DB",
    main_color: "#28583A",
    action_color: "#9ECCA4",
    wheel_dots_color: "#FFFFFF",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#5D764C",
    wheel_slices_text_color: "#342323",
    wheel_slices_color: ["#cee6b4", "#9ecca4"],
  },
  {
    page_background_color: "#F7CFCF",
    main_color: "#212121",
    action_color: "#E67979",
    wheel_dots_color: "#973549",
    wheel_border_color: "#973549",
    wheel_pointer_color: "#973549",
    wheel_slices_text_color: "#342323",
    wheel_slices_color: ["#ff8fa3", "#f9f9f9"],
  },
  {
    page_background_color: "#263627",
    main_color: "#FFFFFF",
    action_color: "#91B693",
    wheel_dots_color: "#1E6C23",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#1E6C23",
    wheel_slices_text_color: "#342323",
    wheel_slices_color: ["#52c758", "#beeac0"],
  },
  {
    page_background_color: "#edf6f9",
    main_color: "#303a53",
    action_color: "#9ad0e6",
    wheel_dots_color: "#f199a0",
    wheel_border_color: "#FFFFFF",
    wheel_pointer_color: "#9ad0e6",
    wheel_slices_text_color: "auto",
    wheel_slices_color: [
      "#264653",
      "#EDF6F9",
      "#2a9d8f",
      "#e9c46a",
      "#f4a261",
      "#e76f51",
    ],
  },
];

var __DATA_QUIZ_THEMES__ = [
  {
    page_background_color: "#D1E4FF",
    main_color: "#1a1a1a",
    action_color: "#9ad0e6",
    container_background_color: "#D1E4FF",
  },
  {
    page_background_color: "#F5DB2E",
    container_background_color: "#F5DB2E",
    main_color: "#4C4171",
    action_color: "#4C4171",
  },
  {
    page_background_color: "#012d41",
    main_color: "#ffffff",
    action_color: "#9ad0e6",
    container_background_color: "#012d41",
  },
  {
    page_background_color: "#680052",
    main_color: "#ffffff",
    action_color: "#ecabe4",
    container_background_color: "#680052",
  },
  {
    page_background_color: "#797DD7",
    main_color: "#ffffff",
    action_color: "#011646",
    container_background_color: "#797DD7",
  },
  {
    page_background_color: "#6D3737",
    main_color: "#ffffff",
    action_color: "#FFB8B8",
    container_background_color: "#6D3737",
  },
  {
    page_background_color: "#9F5F80",
    main_color: "#ffffff",
    action_color: "#ECAB89",
    container_background_color: "#9F5F80",
  },
  {
    page_background_color: "#E9F0DB",
    main_color: "#28583A",
    action_color: "#9ECCA4",
    container_background_color: "#E9F0DB",
  },
  {
    page_background_color: "#F7CFCF",
    main_color: "#212121",
    action_color: "#E67979",
    container_background_color: "#F7CFCF",
  },
  {
    page_background_color: "#436045",
    main_color: "#FFFFFF",
    action_color: "#91B693",
    container_background_color: "#436045",
  },
  {
    page_background_color: "#edf6f9",
    main_color: "#303a53",
    action_color: "#9ad0e6",
    container_background_color: "#edf6f9",
  },
];

var a0_0x5e4a = [
  "is_inactive_wheel",
  "updatePinNumbers",
  "event",
  "getRandomHash",
  "onload",
  "DELETE",
  "wheel_add_option_list_original",
  "height",
  "show_desc",
  "prizes",
  "advanced_mode",
  "[data-target=\x22#Customizer_Section_Form\x22]",
  "authModal",
  "src",
  "run",
  "assign",
  "rotationAngle",
  "width",
  "config",
  "load",
  "max_chance_available",
  "image/jpeg",
  "99%",
  "stopAngle",
  "showModal",
  "join",
  "disabled",
  "app_wheel.default_prize_text",
  "90%",
  "__SAVED_WHEELS__",
  "start_button",
  "onSaveWheel",
  "then",
  "cover",
  "theWheel",
  "Inter",
  "toFixed",
  "unique_page_view",
  "target",
  "white",
  "40px",
  "capture_leads",
  "trigger",
  "createPromotion",
  "split",
  "#1a1a1a",
  "#app",
  "bind",
  "wheel_temporal_hash",
  "rgba(0,0,0,.2)",
  "toString",
  "wheel_add_option_textarea",
  "settings",
  "getPrizeChanceAvailable",
  "wheel_segment_index",
  "title",
  "wheel_spin_duration",
  "rgba(",
  "value",
  "participants",
  "result",
  "hash",
  ".wof__wheel__pointer",
  "is_wheel_centered",
  "filter",
  "wheel_lines_size",
  "setup",
  "participants_prev",
  "Create_New_Wheel",
  ".hide-logged-in",
  "canvas",
  "isFullscreen",
  "app_wheel.error_default_entries",
  "spins",
  "buttons.delete",
  "spinWhileWaiting",
  "track",
  "Montevideo",
  "showClassicWheelUpgrade",
  "location",
  "save_form",
  "warn",
  "upgrade.classic_wheel.feature5",
  "setUser",
  "upgrade.classic_wheel.feature3",
  "history",
  "/api/wheels/track?verbose=1&ip=1&_=",
  "startAnimation",
  "numSegments",
  "/img/apps/wheel-center-logo-default.jpg",
  "files",
  "{}.constructor(\x22return\x20this\x22)(\x20)",
  "wheel_border_color",
  "open",
  "total_entries",
  "forEach",
  "hideModal",
  "wheel_dots_color",
  "ERROR_NO_USER",
  "border",
  "slice",
  "source",
  "/media/tick.mp3",
  "error",
  "#wheelShareModal",
  "attr",
  "edit_entry_modal",
  "notifications.saved_changes",
  "no-repeat",
  "post",
  "/dashboard?deleted=1",
  "shuffle",
  "Singapur",
  "play",
  ".wof__wheel",
  "Uploaded_Logo",
  "show",
  "upgrade.classic_wheel.feature4",
  "ceil",
  "Theme_Selected",
  "custom_logo",
  "getWeightedRandomSegmentIndex",
  "removeClass",
  "toast",
  "offsetWidth",
  ".promotion-editor-sidebar-body",
  "85%",
  "#saveModal",
  "Roma",
  "wheel_auto_remove",
  "length",
  "app_wheel.default_prize_empty_4",
  "now",
  "isEnabled",
  "trace",
  "share_url",
  "Pekin",
  "#7280fd",
  "AS_CreatedWheel",
  "is_full_screen",
  "clear",
  "last_sort",
  "concat",
  "playFxEnd",
  "auto",
  "AuthModal",
  "main_color",
  "toDataURL",
  "show_upgrade_after_login",
  "trim",
  "show_title",
  "last_segment_picked",
  "modal",
  "/api/wheels/delete",
  "css",
  "app_wheel.default_prize_empty_1",
  "Buenos\x20Aires",
  "showConfirm",
  "custom_bg",
  "dong",
  "getParticipantsListFromPrizes",
  "subscription",
  "updateWheelStroke",
  "AS_LeadsWheelSelected",
  "hidden",
  "AS_LeadsWheelCreated",
  "customizer_mobile_opened",
  "WheelDecide_v2",
  "resetValues",
  "spinToStop",
  "effect_spin_zoom",
  "isPlaying",
  "addEventListener",
  "upgrade.classic_wheel_text",
  "wheel_slices_text_color",
  "table",
  "keyCode",
  "saving",
  "#screencast",
  "refreshSliceColors",
  "href",
  "AS_WheelUserAction",
  "toggle",
  "is_customer",
  "hide",
  "change",
  "300px",
  "improve_slices",
  "hex_is_light",
  "fireConfettis",
  "url",
  ".user-picture",
  "mode",
  "substr",
  "getElementById",
  "plan_id",
  "app_wheel.start_button_placeholder",
  "results",
  "lineWidth",
  "options",
  "design",
  "colors",
  "calculated_auto_chance",
  "show_confettis",
  "success",
  "play_sounds",
  "#design",
  "calculated_chance",
  "spin-links",
  "ajax",
  "floor",
  "editColorsModal",
  "AS_UpdatedWheel",
  "backgroundImage",
  "75%",
  "#FFFFFF",
  "Wheel_Preview_Click",
  "?hash=",
  "alertPrize",
  "choices",
  "savedWheel",
  "Fullscreen\x20mode:\x20",
  "outer",
  "upgrade.pick_best_plan",
  "SpinWheel",
  "action_color",
  "checkUserSubStatus",
  "Berlín",
  "data",
  "duration",
  "pins",
  "strokeStyle",
  "drawImage",
  "#fff171",
  "is_wheel_play_only",
  "text",
  "prototype",
  "showSubscriptionUpgradeModal",
  "random",
  "onEditBulkEntries",
  "wheel_fx_sound",
  "/media/ding.mp3",
  "name",
  "pushState",
  "user",
  "total_custom_chance",
  "wheel_add_option_list",
  "#111111",
  "show_save_modal_after_login",
  "exception",
  "enabled",
  "show_winners",
  "Londres",
  "index",
  "onPrizeChanceChange",
  "gtag",
  "onStopPlaying",
  "jsConfetti",
  "saved_wheels",
  "empty",
  "upgrade.classic_wheel.feature1",
  "fillStyle",
  "description",
  "animation",
  "segments",
  "#wof",
  "spin",
  "chance",
  ".wof__wheel__winner",
  "replace",
  "logo",
  "notifications.success_login",
  "onPrizeInputChange",
  "app_wheel.default_title",
  "textFillStyle",
  "body",
  "/api/wheels/save",
  "log",
  "json",
  "notifications.copied_to_clipboard",
  "media-gallery",
  "#Customizer_Section_Prizes",
  "addConfetti",
  "click",
  "getRandomSegmentIndex",
  "#7eecec",
  "#ff7878",
  "overflow",
  "#000000",
  "page_background_color",
  "sort",
  "saveWheel",
  "locale",
  "substring",
  "collapse",
  "deleteSegment",
  "upgrade.classic_wheel.title",
  "backgroundRepeat",
  "initTooltips",
  "user_id",
  ".collapsed[data-target=\x22#Customizer_Section_Prizes\x22]",
  "wheel_options_textarea",
  "getGlobalLink",
  "picture",
  "map",
  "is_editing_bulk",
  "addClass",
  "is_mobile",
  "upload_logo_input",
  "spin-btn-alone",
  "jsccc",
  "apply",
  "initKeyHandlers",
  "initial",
  "onLaunchWheel",
  "themes",
  "getRandomForSegment",
  "show_start_button",
  "#1B2430",
  "wheel.confirm_delete",
  "upgrade.classic_wheel.text",
  "splice",
  "number",
  "getSliceMaxTextLength",
  "totalWeight",
  "stringify",
  "AS_SpinWheel",
  ".show-logged-in",
  "backgroundSize",
  "fortune-wheel",
  "resizeDownDataUrlKeepProportions",
  "#capture_leads",
  "app_wheel.default_description",
  "$refs",
  "wheel_pointer_color",
  "Lima",
  "customize_tab",
  "Something\x20went\x20wrong,\x20please\x20try\x20again.",
  "wheel_slices_color",
  "Uploaded_Background",
  "onCaptureLeadsChange",
  "#wheelPrizeModal",
  "page_background_image",
  "wheel_add_option_input",
  "originalText",
  "readAsDataURL",
  "popstate",
  "console",
  "draw",
  "edit",
  "onItemDeleted",
  "createElement",
  "wheel_segment_name",
  "push",
  "preventDefault",
  "app_wheel.default_prize_empty_2",
];
(function (_0x337ddb, _0x5e4a7f) {
  var _0x5f14e3 = function (_0x4c6c30) {
    while (--_0x4c6c30) {
      _0x337ddb["push"](_0x337ddb["shift"]());
    }
  };
  _0x5f14e3(++_0x5e4a7f);
})(a0_0x5e4a, 0x13c);
var a0_0x5f14 = function (_0x337ddb, _0x5e4a7f) {
  _0x337ddb = _0x337ddb - 0x0;
  var _0x5f14e3 = a0_0x5e4a[_0x337ddb];
  return _0x5f14e3;
};
var a0_0x13aa32 = (function () {
    var _0x3389fd = !![];
    return function (_0x4fe7dc, _0x4fccf6) {
      var _0x2d0c26 = _0x3389fd
        ? function () {
            if (_0x4fccf6) {
              var _0x53374c = _0x4fccf6[a0_0x5f14("0x15f")](
                _0x4fe7dc,
                arguments,
              );
              return (_0x4fccf6 = null), _0x53374c;
            }
          }
        : function () {};
      return (_0x3389fd = ![]), _0x2d0c26;
    };
  })(),
  a0_0x130cb5 = a0_0x13aa32(this, function () {
    var _0x6cec91;
    try {
      var _0xad9b6e = Function(
        "return\x20(function()\x20" + a0_0x5f14("0x83") + ");",
      );
      _0x6cec91 = _0xad9b6e();
    } catch (_0x88dcc1) {
      _0x6cec91 = window;
    }
    var _0x489268 = (_0x6cec91[a0_0x5f14("0x1f")] =
        _0x6cec91[a0_0x5f14("0x1f")] || {}),
      _0x291dea = [
        a0_0x5f14("0x13d"),
        a0_0x5f14("0x79"),
        "info",
        a0_0x5f14("0x8f"),
        a0_0x5f14("0x121"),
        a0_0x5f14("0xd7"),
        a0_0x5f14("0xae"),
      ];
    for (
      var _0x468ce0 = 0x0;
      _0x468ce0 < _0x291dea[a0_0x5f14("0xaa")];
      _0x468ce0++
    ) {
      var _0x38a952 =
          a0_0x13aa32["constructor"][a0_0x5f14("0x114")][a0_0x5f14("0x57")](
            a0_0x13aa32,
          ),
        _0x584b13 = _0x291dea[_0x468ce0],
        _0x379965 = _0x489268[_0x584b13] || _0x38a952;
      (_0x38a952["__proto__"] = a0_0x13aa32[a0_0x5f14("0x57")](a0_0x13aa32)),
        (_0x38a952[a0_0x5f14("0x5a")] =
          _0x379965[a0_0x5f14("0x5a")][a0_0x5f14("0x57")](_0x379965)),
        (_0x489268[_0x584b13] = _0x38a952);
    }
  });
a0_0x130cb5(),
  SoundPlayer["init"]({
    tick: { url: a0_0x5f14("0x8e") },
    end: { url: "/media/wd-sound-fx-end.mp3" },
    ding: { url: a0_0x5f14("0x119") },
    dong: { url: "/media/wof_dong.ogg" },
  });
var __default_slice_colors = [
    a0_0x5f14("0x145"),
    a0_0x5f14("0xb1"),
    a0_0x5f14("0x111"),
    a0_0x5f14("0x146"),
  ],
  // Write default names
  __default_names = [
    "Paris",
    a0_0x5f14("0x98"),
    a0_0x5f14("0xa8"),
    a0_0x5f14("0x10b"),
    "Washington",
    a0_0x5f14("0xc4"),
    a0_0x5f14("0x13"),
    "Tokio",
    "Estocolmo",
    "Bangkok",
    "Madrid",
    a0_0x5f14("0x124"),
    a0_0x5f14("0x75"),
    a0_0x5f14("0xb0"),
    "Santo\x20Domingo",
  ],
  __default_logo = a0_0x5f14("0x81"),
  app = new Vue({
    el: a0_0x5f14("0x131"),
    i18n: Vue_I18N,
    mixins: [CommonMixin, PromotionsMixin, UpgradeMixin],
    data: {
      is_customer: ![],
      colors: __default_slice_colors,
      saving: ![],
      participants: __default_names,
      participants_prev: [],
      prizes: [],
      results: [],
      savedWheel: {},
      theWheel: null,
      jsConfetti: null,
      mode: a0_0x5f14("0x21"),
      customize_tab: a0_0x5f14("0x3a"),
      customizer_mobile_opened: ![],
      edit_entry_modal: null,
      wheel_options: [],
      wheel_options_textarea: "",
      saved_wheels: [],
      show_upgrade_after_login: ![],
      show_save_modal_after_login: ![],
      is_inactive_wheel: !![],
      is_mobile: ![],
      is_full_screen: ![],
      is_wheel_spinning: ![],
      is_wheel_centered: ![],
      is_editing_bulk: ![],
      is_wheel_play_only: ![],
      wheel_segment_index: null,
      wheel_segment_name: null,
      wheel_temporal_hash: null,
      last_segment_picked: null,
      wheel_add_option_input: "",
      wheel_add_option_textarea: "",
      wheel_add_option_list: [],
      wheel_add_option_list_original: [],
      show_winners: ![],
      show_design_advanced_settings: ![],
      last_sort: "za",
      save_form: { name: "" },
      config: {
        title: "",
        description: "",
        start_button: "",
        effect_spin_zoom: !![],
        capture_leads: ![],
        show_title: ![],
        show_desc: ![],
        show_start_button: !![],
        show_confettis: !![],
        play_sounds: !![],
        wheel_spin_duration: 0xa,
        wheel_fx_sound: a0_0x5f14("0xc7"),
        wheel_auto_remove: ![],
        advanced_mode: ![],
        improve_slices: ![],
      },
      design: {
        logo: "",
        page_background_color: "#D1E4FF",
        page_background_image: "",
        container_background_color: a0_0x5f14("0xff"),
        main_color: "#1a1a1a",
        action_color: "#1a1a1a",
        wheel_dots_color: "#FFFFFF",
        wheel_border_color: a0_0x5f14("0xff"),
        wheel_pointer_color: a0_0x5f14("0x148"),
        wheel_slices_text_color: a0_0x5f14("0x148"),
        wheel_slices_color: __default_slice_colors,
        wheel_lines_size: 0x0,
      },
      themes: [],
    },
    created: function () {
      var _0x3a0fea = this;
      __WHEEL_DATA__[a0_0x5f14("0x153")] &&
        (!SHARED_DATA["user"] ||
          __WHEEL_DATA__[a0_0x5f14("0x153")] !== SHARED_DATA["user"]["id"]) &&
        ((this[a0_0x5f14("0x112")] = !![]),
        (this["mode"] = a0_0x5f14("0x99")),
        $(a0_0x5f14("0x13b"))["css"]("overflow", a0_0x5f14("0xcc"))),
        __WHEEL_DATA__["id"] &&
          ((this[a0_0x5f14("0x63")] = __WHEEL_DATA__["choices"] || []),
          __WHEEL_DATA__[a0_0x5f14("0x3a")][a0_0x5f14("0xf0")] &&
            (this[a0_0x5f14("0xf0")] =
              __WHEEL_DATA__[a0_0x5f14("0x3a")][a0_0x5f14("0xf0")]),
          __WHEEL_DATA__["config"][a0_0x5f14("0x5c")] &&
            (this[a0_0x5f14("0x3a")] =
              __WHEEL_DATA__[a0_0x5f14("0x3a")][a0_0x5f14("0x5c")]),
          __WHEEL_DATA__[a0_0x5f14("0x3a")][a0_0x5f14("0xf1")] &&
            (this[a0_0x5f14("0xf0")][a0_0x5f14("0x16")] =
              __WHEEL_DATA__[a0_0x5f14("0x3a")][a0_0x5f14("0xf1")]),
          (this[a0_0x5f14("0x8d")] = (__WHEEL_DATA__[a0_0x5f14("0x103")] || [])[
            a0_0x5f14("0x41")
          ]("\x0a")),
          (this[a0_0x5f14("0x5f")] = __WHEEL_DATA__[a0_0x5f14("0x5f")]),
          (this[a0_0x5f14("0x104")] = __WHEEL_DATA__)),
        window[a0_0x5f14("0x45")] &&
          (this[a0_0x5f14("0x12a")] = window["__SAVED_WHEELS__"]),
        this["checkUserSubStatus"](),
        this["onEditBulkEntries"](),
        this[a0_0x5f14("0x3a")]["advanced_mode"] &&
          ((this["wheel_add_option_list"] = __WHEEL_DATA__[a0_0x5f14("0x103")]),
          this["wheel_add_option_list"][a0_0x5f14("0x87")](
            function (_0x3e2527) {
              _0x3e2527["chance"] = parseInt(_0x3e2527["chance"]);
            },
          ),
          (this[a0_0x5f14("0x63")] = this[a0_0x5f14("0x11e")][
            a0_0x5f14("0x158")
          ](function (_0xc183ba) {
            return _0xc183ba[a0_0x5f14("0x113")];
          })),
          (this[a0_0x5f14("0x5b")] =
            this["participants"][a0_0x5f14("0x41")]("\x0a")),
          this[a0_0x5f14("0x126")]());
    },
    computed: {
      is_spin_btn_alone: function () {
        if (this["config"][a0_0x5f14("0x51")]) return ![];
        if (
          this[a0_0x5f14("0x3a")]["show_title"] &&
          this[a0_0x5f14("0x3a")][a0_0x5f14("0x5f")]
        )
          return ![];
        if (
          this[a0_0x5f14("0x3a")][a0_0x5f14("0x30")] &&
          this["config"]["description"]
        )
          return ![];
        return !![];
      },
      is_wheel_r_visible: function () {
        if (this[a0_0x5f14("0x3a")][a0_0x5f14("0x51")]) return !![];
        if (
          this["config"][a0_0x5f14("0xbe")] &&
          this[a0_0x5f14("0x3a")]["title"]
        )
          return !![];
        if (
          this[a0_0x5f14("0x3a")][a0_0x5f14("0x30")] &&
          this[a0_0x5f14("0x3a")]["description"]
        )
          return !![];
        if (this[a0_0x5f14("0x3a")][a0_0x5f14("0x1")]) return !![];
        return ![];
      },
      can_play_wheel: function () {
        if (this[a0_0x5f14("0x3a")][a0_0x5f14("0x51")]) return ![];
        return !![];
      },
      should_save_wheel: function () {
        if (this[a0_0x5f14("0x3a")]["capture_leads"]) return !![];
        return ![];
      },
    },
    mounted: function () {
      var _0x2e16c4 = 0x0;
      (this[a0_0x5f14("0x15b")] = document["body"][a0_0x5f14("0xa4")] <= 0x400),
        this[a0_0x5f14("0x15b")] &&
          ((this[a0_0x5f14("0x14")] = null),
          $(a0_0x5f14("0x141"))
            ["removeClass"](a0_0x5f14("0x9c"))
            [a0_0x5f14("0x15a")]("collapse")),
        __DATA_WHEEL_THEMES__ &&
          (this[a0_0x5f14("0x163")] = __DATA_WHEEL_THEMES__),
        (this[a0_0x5f14("0x4a")] = new Winwheel({
          responsive: ![],
          pointerAngle: 0x5a,
          numSegments: 0x0,
          innerRadius: 0x32,
          textFontSize: 0x12,
          textFontFamily: a0_0x5f14("0x4b"),
          textFontWeight: "700",
          textMargin: 0xf,
          textAlignment: a0_0x5f14("0x106"),
          lineWidth: _0x2e16c4,
          strokeStyle: _0x2e16c4 ? a0_0x5f14("0x4f") : null,
          animation: {
            type: a0_0x5f14("0xd1"),
            duration: 0x5,
            spins: 0x8,
            callbackFinished: this[a0_0x5f14("0x102")],
            callbackSound: this["playSound"],
            easing: "Expo.easeOut",
          },
          pins: {
            number: 0xf,
            outerRadius: 0x4,
            margin: 0x7,
            fillStyle: a0_0x5f14("0x4f"),
            strokeStyle: a0_0x5f14("0x59"),
          },
        })),
        this[a0_0x5f14("0x6a")](),
        this[a0_0x5f14("0x73")](),
        (this[a0_0x5f14("0x58")] = this[a0_0x5f14("0x2b")](0x8)),
        this[a0_0x5f14("0x160")](),
        this[a0_0x5f14("0x3a")][a0_0x5f14("0x46")] === "" &&
          (this[a0_0x5f14("0x3a")][a0_0x5f14("0x46")] = this["$t"](
            a0_0x5f14("0xec"),
          ));
    },
    methods: {
      resetValues: function () {
        (this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")] = [null]),
          (this[a0_0x5f14("0x4a")][a0_0x5f14("0x80")] = 0x0);
      },
      setup: function () {
        var _0x113567 = this;
        this[a0_0x5f14("0xd0")]();
        var _0x4d0788 = 0x0,
          _0x1aca70 = this[a0_0x5f14("0xf0")][a0_0x5f14("0x16")],
          _0x50fd1a = this[a0_0x5f14("0x7")](),
          _0x2d6505 = this[a0_0x5f14("0x63")];
        this[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] === 0x0 &&
          (_0x2d6505 = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ]),
          this[a0_0x5f14("0x3a")][a0_0x5f14("0xe3")] &&
            (_0x2d6505[a0_0x5f14("0xaa")] < 0x4 &&
              (_0x2d6505 =
                _0x2d6505[a0_0x5f14("0xb6")](_0x2d6505)[a0_0x5f14("0xb6")](
                  _0x2d6505,
                )),
            _0x2d6505[a0_0x5f14("0xaa")] < 0x8 &&
              (_0x2d6505 = _0x2d6505[a0_0x5f14("0xb6")](_0x2d6505))),
          _0x2d6505[a0_0x5f14("0x87")](function (_0x5aea9b, _0x583228) {
            var _0x24c794 = _0x1aca70[_0x4d0788];
            _0x4d0788++;
            if (_0x4d0788 > _0x1aca70[a0_0x5f14("0xaa")] - 0x1) _0x4d0788 = 0x0;
            var _0x29a609 = 0xf,
              _0x6ea7f2 = _0x5aea9b;
            _0x50fd1a <= 0x12 && (_0x29a609 = 0x11);
            _0x50fd1a <= 0x10 && (_0x29a609 = 0x12);
            _0x50fd1a <= 0xe && (_0x29a609 = 0x15);
            _0x50fd1a <= 0xc && (_0x29a609 = 0x18);
            _0x50fd1a <= 0xa && (_0x29a609 = 0x1a);
            _0x50fd1a <= 0x6 && (_0x29a609 = 0x24);
            _0x50fd1a <= 0x3 && (_0x29a609 = 0x2e);
            _0x113567[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] > 0x32 &&
              (_0x29a609 = 0xc);
            _0x113567[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] > 0x50 &&
              (_0x29a609 = 0xa);
            _0x113567[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] > 0x8c &&
              (_0x6ea7f2 = "");
            _0x113567["participants"][a0_0x5f14("0xaa")] > 0x14 &&
              _0x29a609 > 0x1e &&
              (_0x29a609 = 0x1c);
            _0x113567[a0_0x5f14("0x63")]["length"] > 0x28 &&
              _0x29a609 > 0x14 &&
              (_0x29a609 = 0x16);
            _0x113567[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] > 0x3c &&
              _0x29a609 > 0x12 &&
              (_0x29a609 = 0x12);
            _0x113567[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] > 0x50 &&
              _0x29a609 > 0xe &&
              (_0x29a609 = 0xe);
            _0x6ea7f2[a0_0x5f14("0xaa")] > 0x14 &&
              (_0x6ea7f2 = _0x6ea7f2[a0_0x5f14("0x8c")](0x0, 0x12) + "..");
            var _0x4cd83e = a0_0x5f14("0x2");
            !_0x113567[a0_0x5f14("0xe4")](_0x24c794) &&
              (_0x4cd83e = a0_0x5f14("0xff")),
              _0x113567["theWheel"]["addSegment"]({
                text: _0x6ea7f2,
                originalText: _0x5aea9b,
                fillStyle: _0x24c794,
                textFontSize: _0x29a609,
                textFontFamily: a0_0x5f14("0x4b"),
                textFillStyle: _0x4cd83e,
              });
          }),
          _0x113567[a0_0x5f14("0x4a")][a0_0x5f14("0x20")](),
          (this["open"] = ![]),
          this["updatePinNumbers"](),
          this[a0_0x5f14("0xca")](this["design"]["wheel_lines_size"]);
      },
      updatePinNumbers: function () {
        (this["theWheel"]["pins"][a0_0x5f14("0x6")] =
          (this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][a0_0x5f14("0xaa")] -
            0x1) *
          0x1),
          this["participants"][a0_0x5f14("0xaa")] > 0x32 &&
            (this[a0_0x5f14("0x4a")][a0_0x5f14("0x10e")][a0_0x5f14("0x6")] =
              0x0);
      },
      getSliceMaxTextLength: function () {
        var _0x32131a = 0x0;
        return (
          this["participants"][a0_0x5f14("0x87")](
            function (_0x218074, _0x5be2b7) {
              _0x218074["length"] > _0x32131a &&
                (_0x32131a = _0x218074[a0_0x5f14("0xaa")]);
            },
          ),
          _0x32131a
        );
      },
      run: function () {
        if (this[a0_0x5f14("0xe8")] === a0_0x5f14("0x21")) return ![];
        if (this["is_wheel_spinning"]) return ![];
        this[a0_0x5f14("0x3a")][a0_0x5f14("0xa9")] &&
          this[a0_0x5f14("0x5e")] !== null &&
          (this[a0_0x5f14("0x4a")][a0_0x5f14("0x14f")](this[a0_0x5f14("0x5e")]),
          this["wheel_add_option_list"]["length"] &&
            this[a0_0x5f14("0x11e")][a0_0x5f14("0x5")](
              this[a0_0x5f14("0x5e")] - 0x1,
              0x1,
            ),
          this[a0_0x5f14("0x4a")][a0_0x5f14("0x20")](),
          (this[a0_0x5f14("0x5e")] = null),
          this[a0_0x5f14("0x29")]()),
          (this[a0_0x5f14("0x28")] = ![]),
          (this["is_wheel_spinning"] = !![]),
          (this[a0_0x5f14("0x67")] = !![]),
          this[a0_0x5f14("0x3a")][a0_0x5f14("0xd2")]
            ? TweenMax["to"](a0_0x5f14("0x9a"), 0.5, {
                // scale: 1.2,
                x: "0%",
                // y: a0_0x5f14("0x50"),
                onComplete: this["spin"],
              })
            : this[a0_0x5f14("0x132")]();
      },
      spin: function () {
        window[a0_0x5f14("0x127")] &&
          gtag(a0_0x5f14("0x2a"), a0_0x5f14("0x108"), {
            event_category: a0_0x5f14("0xcf"),
          });
        this[a0_0x5f14("0x63")] &&
          this[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] > 0x1 &&
          trackEvent(a0_0x5f14("0xa"), {}, !![]);
        this[a0_0x5f14("0x104")] &&
          this[a0_0x5f14("0x104")]["id"] &&
          this["trackSpin"]();
        if (this[a0_0x5f14("0x3a")][a0_0x5f14("0x32")])
          var _0xe7d3c5 = this[a0_0x5f14("0xa1")]();
        else var _0xe7d3c5 = this[a0_0x5f14("0x144")]();
        (this["theWheel"][a0_0x5f14("0x12f")][a0_0x5f14("0x10d")] =
          calculateSpinDuration()),
          // this[a0_0x5f14("0x3a")]["wheel_spin_duration"] || 0xa),
          (this[a0_0x5f14("0x4a")][a0_0x5f14("0x12f")][a0_0x5f14("0x71")] =
            Math["ceil"](this[a0_0x5f14("0x3a")][a0_0x5f14("0x60")] * 0.6)),
          (this[a0_0x5f14("0x4a")]["animation"][a0_0x5f14("0x3f")] =
            this[a0_0x5f14("0x4a")][a0_0x5f14("0x0")](_0xe7d3c5)),
          this[a0_0x5f14("0x4a")][a0_0x5f14("0x7f")]();
      },
      getRandomSegmentIndex: function () {
        var _0x4ba488 = this["theWheel"]["segments"][a0_0x5f14("0xaa")] - 0x1,
          _0x2ba33a = rando(0x1, _0x4ba488);
        return (
          this[a0_0x5f14("0xbf")] === _0x2ba33a &&
            (_0x2ba33a = rando(0x1, _0x4ba488)),
          this[a0_0x5f14("0xbf")] === _0x2ba33a &&
            (_0x2ba33a = rando(0x1, _0x4ba488)),
          (this[a0_0x5f14("0xbf")] = _0x2ba33a),
          _0x2ba33a
        );
      },
      getWeightedRandomSegmentIndex: function () {
        let _0x3a1bb8 = 0x0,
          _0x49e3eb = 0x0,
          _0x357ce0 = this;
        this["wheel_add_option_list"]["forEach"](function (_0x15e898) {
          _0x3a1bb8 += _0x15e898["calculated_chance"];
        }),
          console[a0_0x5f14("0xb4")](),
          console["log"](a0_0x5f14("0x8"), _0x3a1bb8);
        const _0x307d71 = Math["random"]() * _0x3a1bb8;
        console[a0_0x5f14("0x13d")](a0_0x5f14("0x116"), _0x307d71);
        let _0x1a750d = 0x0;
        for (const _0xe0dc09 of this[a0_0x5f14("0x11e")]) {
          (_0x1a750d += _0xe0dc09[a0_0x5f14("0xf7")]),
            console[a0_0x5f14("0x13d")]("accumulatedWeight", _0x1a750d);
          if (_0x307d71 <= _0x1a750d)
            return (
              console[a0_0x5f14("0x13d")](
                a0_0x5f14("0x125"),
                _0x357ce0[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][
                  _0x49e3eb + 0x1
                ][a0_0x5f14("0x113")],
              ),
              _0x49e3eb + 0x1
            );
          _0x49e3eb++;
        }
        return this[a0_0x5f14("0x144")]();
      },
      hex_is_light: function (_0x1fa287) {
        const _0x45b14e = _0x1fa287[a0_0x5f14("0x135")]("#", ""),
          _0x164a96 = parseInt(_0x45b14e[a0_0x5f14("0xe9")](0x0, 0x2), 0x10),
          _0x5407d8 = parseInt(_0x45b14e[a0_0x5f14("0xe9")](0x2, 0x2), 0x10),
          _0xb7d33c = parseInt(_0x45b14e[a0_0x5f14("0xe9")](0x4, 0x2), 0x10),
          _0x39b3c6 =
            (_0x164a96 * 0x12b + _0x5407d8 * 0x24b + _0xb7d33c * 0x72) / 0x3e8;
        return _0x39b3c6 > 0x9b;
      },
      alertPrize: function alertPrize(_0x55e24f) {
        (this["is_wheel_spinning"] = ![]), this[a0_0x5f14("0xb7")]();
        (this[a0_0x5f14("0x24")] =
          _0x55e24f[a0_0x5f14("0x1c")] || _0x55e24f[a0_0x5f14("0x113")]),
          (this["wheel_segment_index"] =
            this["theWheel"]["getIndicatedSegmentNumber"]());
        while (this[a0_0x5f14("0x4a")][a0_0x5f14("0x38")] > 0x0) {
          this[a0_0x5f14("0x4a")][a0_0x5f14("0x38")] -= 0x168;
        }
        var _0x55a65f =
          _0x55e24f[a0_0x5f14("0x1c")] || _0x55e24f[a0_0x5f14("0x113")];
        this["results"][a0_0x5f14("0x25")](_0x55a65f),
          this["config"][a0_0x5f14("0xd2")] &&
            TweenMax["to"](a0_0x5f14("0x9a"), 0.5, {
              scale: 0x1,
              x: "0%",
              y: "0%",
            }),
          TweenMax["to"](a0_0x5f14("0x134"), 0.3, {
            scale: 1.5,
            onComplete: function () {
              TweenMax["to"](".wof__wheel__winner", 0.5, { scale: 0x1 });
            },
          }),
          this[a0_0x5f14("0xe5")](),
          setTimeout(this[a0_0x5f14("0xe5")], 0x2ee);
      },
      playSound: function () {
        var _0x1eb6c4 = ".centered-spin";
        (_0x1eb6c4 = a0_0x5f14("0x66")),
          TweenMax["to"](_0x1eb6c4, 0.15, {
            rotation: -0x14,
            onComplete: function () {
              TweenMax["to"](_0x1eb6c4, 0x0, { rotation: 0x0 });
            },
          });
        if (this[a0_0x5f14("0x28")]) return ![];
        var _0xa1ca97 = this[a0_0x5f14("0x4a")]["getIndicatedSegment"]();
        (this[a0_0x5f14("0x24")] =
          _0xa1ca97["text"] || _0xa1ca97["originalText"]),
          this[a0_0x5f14("0x3a")]["play_sounds"] &&
            SoundPlayer[a0_0x5f14("0x99")](
              this[a0_0x5f14("0x3a")][a0_0x5f14("0x118")],
              {},
              ![],
              !![],
            );
      },
      playFxEnd: function () {
        this["config"][a0_0x5f14("0xf5")] &&
          SoundPlayer[a0_0x5f14("0x99")]("end", {}, ![], !![]);
      },
      toggleSound: function () {
        this[a0_0x5f14("0x3a")][a0_0x5f14("0xf5")] =
          !this[a0_0x5f14("0x3a")][a0_0x5f14("0xf5")];
      },
      toggleWinners: function () {
        this[a0_0x5f14("0x123")] = !this[a0_0x5f14("0x123")];
      },
      toggleFs: function () {
        screenfull[a0_0x5f14("0xde")]($(a0_0x5f14("0x56"))[0x0])[
          a0_0x5f14("0x48")
        ](function () {
          console[a0_0x5f14("0x13d")](
            a0_0x5f14("0x105") +
              (screenfull["isFullscreen"]
                ? a0_0x5f14("0x122")
                : a0_0x5f14("0x42")),
          );
        });
      },
      saveWheel: function () {
        if (this[a0_0x5f14("0x63")][a0_0x5f14("0xaa")] < 0x2)
          return (
            $(a0_0x5f14("0x154"))[a0_0x5f14("0x52")](a0_0x5f14("0x143")),
            this[a0_0x5f14("0xa3")](
              this["$t"]("app_wheel.error_no_entries"),
              "error",
            )
          );
        if (
          JSON[a0_0x5f14("0x9")](__default_names) ===
          JSON[a0_0x5f14("0x9")](this["participants"])
        )
          return (
            $(a0_0x5f14("0x154"))[a0_0x5f14("0x52")](a0_0x5f14("0x143")),
            this["toast"](this["$t"](a0_0x5f14("0x70")), a0_0x5f14("0x8f"))
          );
        if (this["user"] === null || !this["user"] || !this["user"]["id"])
          return (
            this[a0_0x5f14("0x11")]["AuthModal"][a0_0x5f14("0x9c")](),
            (this[a0_0x5f14("0x120")] = !![]),
            ![]
          );
        if (this[a0_0x5f14("0x104")] && this[a0_0x5f14("0x104")]["id"])
          return this[a0_0x5f14("0x47")]();
        $(a0_0x5f14("0xa7"))["modal"]();
      },
      onSaveLeadsWheel: function () {
        var _0x8c4845 = this;
        if (this["config"][a0_0x5f14("0x51")]) {
          this[a0_0x5f14("0x3a")]["name"] =
            _0x8c4845["save_form"][a0_0x5f14("0x11a")];
          var _0x358830 = this["config"],
            _0x54ca0a = this[a0_0x5f14("0xf0")],
            _0x5a047b = this[a0_0x5f14("0x31")];
          return (
            (this[a0_0x5f14("0xd9")] = !![]),
            this[a0_0x5f14("0x53")](
              a0_0x5f14("0xd"),
              this[a0_0x5f14("0x78")][a0_0x5f14("0x11a")],
              _0x358830,
              _0x54ca0a,
              _0x5a047b,
              function (_0x549d37) {
                _0x549d37[a0_0x5f14("0xf4")] &&
                _0x549d37[a0_0x5f14("0x10c")]["id"]
                  ? (trackEvent(a0_0x5f14("0xcd")),
                    (window[a0_0x5f14("0x77")][a0_0x5f14("0xdc")] =
                      "/promotions/setup/" +
                      _0x549d37[a0_0x5f14("0x10c")]["id"] +
                      a0_0x5f14("0xf6")))
                  : (_0x549d37[a0_0x5f14("0x10c")] === a0_0x5f14("0x8a")
                      ? ($(a0_0x5f14("0xa7"))["modal"](a0_0x5f14("0xe0")),
                        _0x8c4845[a0_0x5f14("0x11")][a0_0x5f14("0xb9")][
                          a0_0x5f14("0x9c")
                        ]())
                      : _0x8c4845[a0_0x5f14("0xa3")](
                          a0_0x5f14("0x15"),
                          "error",
                        ),
                    (_0x8c4845[a0_0x5f14("0xd9")] = ![]));
              },
            ),
            ![]
          );
        }
      },
      onSaveWheel: function (_0x20f269) {
        var _0x235dc8 = this;
        this[a0_0x5f14("0xd9")] = !![];
        var _0xc21e62 = this["participants"];
        this[a0_0x5f14("0x3a")]["advanced_mode"] &&
          (_0xc21e62 = this[a0_0x5f14("0x11e")]),
          $[a0_0x5f14("0xf9")]({
            url: a0_0x5f14("0x13c"),
            method: "POST",
            dataType: "json",
            data: {
              id:
                _0x235dc8[a0_0x5f14("0x104")] && _0x235dc8["savedWheel"]["id"]
                  ? _0x235dc8[a0_0x5f14("0x104")]["id"]
                  : null,
              title:
                _0x235dc8["save_form"][a0_0x5f14("0x11a")] ||
                _0x235dc8[a0_0x5f14("0x5f")],
              choices: _0xc21e62,
              version: 0x2,
              lang: window[a0_0x5f14("0x14c")]
                ? window[a0_0x5f14("0x14c")]
                : "",
              promotion_id: _0x20f269 || null,
              config: {
                settings: _0x235dc8[a0_0x5f14("0x3a")],
                design: _0x235dc8["design"],
              },
            },
            success: function (_0x1bbc3a) {
              if (!_0x235dc8[a0_0x5f14("0x104")]["id"])
                return (
                  mixpanel["track"]("AS_SavedWheel"),
                  (window["location"]["href"] =
                    window["location"][a0_0x5f14("0xdc")][a0_0x5f14("0x135")](
                      "#",
                      "",
                    ) +
                    a0_0x5f14("0x101") +
                    _0x1bbc3a[a0_0x5f14("0x10c")][a0_0x5f14("0x65")]),
                  ![]
                );
              mixpanel["track"](a0_0x5f14("0xfc")),
                (_0x235dc8["saving"] = ![]),
                (_0x235dc8[a0_0x5f14("0x104")] = _0x1bbc3a[a0_0x5f14("0x10c")]),
                _0x235dc8["toast"](_0x235dc8["$t"](a0_0x5f14("0x93")));
            },
            error: function (_0x4831ea, _0x1d83f4, _0x4386ed) {
              (_0x235dc8[a0_0x5f14("0xd9")] = ![]),
                console[a0_0x5f14("0x13d")]("Error:\x20", _0x4386ed);
            },
          });
      },
      hex2RGBA: function (_0x52ca82, _0x3e5607) {
        return (
          (_0x52ca82 = _0x52ca82["replace"]("#", "")),
          (r = parseInt(_0x52ca82[a0_0x5f14("0x14d")](0x0, 0x2), 0x10)),
          (g = parseInt(_0x52ca82[a0_0x5f14("0x14d")](0x2, 0x4), 0x10)),
          (b = parseInt(_0x52ca82["substring"](0x4, 0x6), 0x10)),
          (result =
            a0_0x5f14("0x61") +
            r +
            "," +
            g +
            "," +
            b +
            "," +
            _0x3e5607 / 0x64 +
            ")"),
          result
        );
      },
      getFontSize: function (_0x1f99bc) {
        var _0x4e7853 = _0x1f99bc;
        if (this["is_wheel_spinning"]) return "100%";
        if (_0x4e7853["length"] > 0x3c) return a0_0x5f14("0xfe");
        if (_0x4e7853["length"] > 0x2e) return a0_0x5f14("0xa6");
        if (_0x4e7853[a0_0x5f14("0xaa")] > 0x24) return a0_0x5f14("0x44");
        return a0_0x5f14("0x3e");
      },
      usePalette: function (_0x4ff7a2) {
        var _0x3e5361 = 0x0;
        (this[a0_0x5f14("0xf1")] = _0x4ff7a2),
          (this[a0_0x5f14("0xf0")]["wheel_slices_color"] = _0x4ff7a2);
        for (
          i = 0x0;
          i < this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][a0_0x5f14("0xaa")];
          i++
        ) {
          if (
            this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][i] &&
            this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][i]["fillStyle"]
          ) {
            var _0x1b5eb9 = this["design"][a0_0x5f14("0x16")][_0x3e5361];
            _0x3e5361++;
            if (
              _0x3e5361 >
              this[a0_0x5f14("0xf0")][a0_0x5f14("0x16")]["length"] - 0x1
            )
              _0x3e5361 = 0x0;
            this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][i]["fillStyle"] =
              _0x1b5eb9;
            var _0x59088e = a0_0x5f14("0x11f");
            !this[a0_0x5f14("0xe4")](_0x1b5eb9) && (_0x59088e = "#f5f5f5"),
              (this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][i]["textFillStyle"] =
                _0x59088e);
          }
        }
        this["theWheel"][a0_0x5f14("0x20")]();
      },
      editColors: function () {
        this[a0_0x5f14("0x40")](a0_0x5f14("0xfb"));
      },
      onDeleteWheel: function (_0x17ad10) {
        this[a0_0x5f14("0xc5")](
          this["$t"](a0_0x5f14("0x72")),
          this["$t"](a0_0x5f14("0x3")),
          this["$t"]("buttons.delete"),
          this[a0_0x5f14("0x22")],
        );
      },
      onItemDeleted: function () {
        $["ajax"]({
          method: a0_0x5f14("0x2d"),
          dataType: a0_0x5f14("0x13e"),
          url: a0_0x5f14("0xc1"),
          data: { id: this[a0_0x5f14("0x104")]["id"] },
          success: function (_0x53fee7) {
            window[a0_0x5f14("0x77")][a0_0x5f14("0xdc")] = a0_0x5f14("0x96");
          },
          error: function (_0x498e50, _0x549b8d, _0x3018e1) {},
        });
      },
      spinWhileWaiting: function () {
        (this[a0_0x5f14("0x28")] = !![]),
          (this[a0_0x5f14("0x4a")][a0_0x5f14("0x12f")][a0_0x5f14("0x71")] =
            0x1e),
          (this[a0_0x5f14("0x4a")]["animation"]["duration"] = 0x78 * 0x64),
          this["theWheel"][a0_0x5f14("0x7f")]();
      },
      onLogoSelected: function (_0x1ff069) {
        var _0x7aa69f = this;
        if (_0x1ff069[a0_0x5f14("0x4e")]["files"][a0_0x5f14("0xaa")]) {
          var _0x31484c = new FileReader();
          (_0x31484c[a0_0x5f14("0x2c")] = function (_0x1d2262) {
            (_0x7aa69f[a0_0x5f14("0xf0")][a0_0x5f14("0x136")] =
              _0x1d2262[a0_0x5f14("0x4e")]["result"]),
              mixpanel[a0_0x5f14("0x74")](a0_0x5f14("0xdd"), {
                action: a0_0x5f14("0x9b"),
              }),
              _0x7aa69f[a0_0x5f14("0xe")](
                _0x1d2262[a0_0x5f14("0x4e")][a0_0x5f14("0x64")],
                0x1f4,
                0x1f4,
                function (_0x19bf3e) {
                  _0x7aa69f[a0_0x5f14("0xf0")][a0_0x5f14("0x136")] = _0x19bf3e;
                },
              );
          }),
            _0x31484c[a0_0x5f14("0x1d")](
              _0x1ff069[a0_0x5f14("0x4e")]["files"][0x0],
            );
        }
      },
      resizeDownDataUrlKeepProportions: function (
        _0xfa4bf7,
        _0x5cc116,
        _0x398a9e,
        _0x595896,
        _0x2735f6,
      ) {
        _0x2735f6 = _0x2735f6 || 0.9;
        var _0x28a848 = document[a0_0x5f14("0x23")]("img");
        _0x28a848[a0_0x5f14("0xd4")](a0_0x5f14("0x3b"), function () {
          var _0x3ed4e9 = document[a0_0x5f14("0x23")](a0_0x5f14("0x6e")),
            _0x461af1 = _0x3ed4e9["getContext"]("2d");
          if (
            _0x28a848[a0_0x5f14("0x39")] > _0x5cc116 ||
            _0x28a848["height"] > _0x398a9e
          ) {
            if (_0x28a848[a0_0x5f14("0x39")] == _0x28a848[a0_0x5f14("0x2f")])
              (_0x3ed4e9[a0_0x5f14("0x39")] =
                _0x398a9e >= _0x5cc116 ? _0x5cc116 : _0x398a9e),
                (_0x3ed4e9[a0_0x5f14("0x2f")] =
                  _0x398a9e >= _0x5cc116 ? _0x5cc116 : _0x398a9e);
            else {
              if (_0x28a848[a0_0x5f14("0x39")] > _0x28a848[a0_0x5f14("0x2f")])
                (_0x3ed4e9[a0_0x5f14("0x39")] = _0x5cc116),
                  (_0x3ed4e9["height"] =
                    (_0x5cc116 / _0x28a848[a0_0x5f14("0x39")]) *
                    _0x28a848[a0_0x5f14("0x2f")]);
              else
                _0x28a848[a0_0x5f14("0x2f")] > _0x28a848[a0_0x5f14("0x39")] &&
                  ((_0x3ed4e9[a0_0x5f14("0x2f")] = _0x398a9e),
                  (_0x3ed4e9[a0_0x5f14("0x39")] =
                    (_0x398a9e / _0x28a848[a0_0x5f14("0x2f")]) *
                    _0x28a848[a0_0x5f14("0x39")]));
            }
          } else return ![];
          _0x461af1[a0_0x5f14("0x110")](
            this,
            0x0,
            0x0,
            _0x3ed4e9[a0_0x5f14("0x39")],
            _0x3ed4e9[a0_0x5f14("0x2f")],
          );
          var _0x260e54 = _0x3ed4e9[a0_0x5f14("0xbb")](
            a0_0x5f14("0x3d"),
            _0x2735f6,
          );
          _0x595896 && _0x595896(_0x260e54);
        }),
          (_0x28a848[a0_0x5f14("0x35")] = _0xfa4bf7);
      },
      onBackgroundSelected: function (_0x3cb31e) {
        var _0x3027f5 = this;
        if (_0x3cb31e[a0_0x5f14("0x4e")][a0_0x5f14("0x82")]["length"]) {
          var _0x76071a = new FileReader();
          (_0x76071a[a0_0x5f14("0x2c")] = function (_0x3df06c) {
            (_0x3027f5[a0_0x5f14("0xf0")]["page_background_image"] =
              _0x3df06c[a0_0x5f14("0x4e")][a0_0x5f14("0x64")]),
              mixpanel["track"]("AS_WheelUserAction", {
                action: a0_0x5f14("0x17"),
              }),
              _0x3027f5[a0_0x5f14("0xe")](
                _0x3df06c[a0_0x5f14("0x4e")]["result"],
                0x780,
                0x438,
                function (_0x450166) {
                  _0x3027f5[a0_0x5f14("0xf0")][a0_0x5f14("0x1a")] = _0x450166;
                },
              );
          }),
            _0x76071a[a0_0x5f14("0x1d")](
              _0x3cb31e[a0_0x5f14("0x4e")]["files"][0x0],
            );
        }
      },
      onLaunchWheel: function () {
        if (this[a0_0x5f14("0x3a")][a0_0x5f14("0x51")]) return ![];
        var _0x2289c4 = this;
        (this[a0_0x5f14("0xe8")] = "play"),
          window[a0_0x5f14("0x7d")][a0_0x5f14("0x11b")](
            a0_0x5f14("0xd3"),
            null,
            null,
          ),
          window[a0_0x5f14("0xd4")](
            a0_0x5f14("0x1e"),
            function (_0xbaf73c) {
              _0x2289c4[a0_0x5f14("0x128")]();
            },
            { once: !![] },
          ),
          this[a0_0x5f14("0x152")](0x3e8),
          (this[a0_0x5f14("0x2e")] =
            this[a0_0x5f14("0x11e")][a0_0x5f14("0x8c")](0x0)),
          $(a0_0x5f14("0x13b"))[a0_0x5f14("0xc2")](
            a0_0x5f14("0x147"),
            "hidden",
          ),
          this[a0_0x5f14("0x63")] &&
            this["participants"][a0_0x5f14("0xaa")] > 0x1 &&
            !this[a0_0x5f14("0x104")]["id"] &&
            JSON[a0_0x5f14("0x9")](__default_names) !==
              JSON["stringify"](this[a0_0x5f14("0x63")]) &&
            trackEvent(a0_0x5f14("0xb2"), {}, !![]);
      },
      getWheelStyles: function (_0x595b63) {
        switch (_0x595b63) {
          case "page":
            var _0x382145 = {
              backgroundColor: this[a0_0x5f14("0xf0")][a0_0x5f14("0x149")],
              color: this["design"][a0_0x5f14("0xba")],
            };
            this["design"][a0_0x5f14("0x1a")] &&
              ((_0x382145[a0_0x5f14("0xfd")] =
                "url(" + this[a0_0x5f14("0xf0")][a0_0x5f14("0x1a")] + ")"),
              (_0x382145[a0_0x5f14("0xc")] = a0_0x5f14("0x49")),
              (_0x382145["backgroundRepeat"] = a0_0x5f14("0x94")),
              this[a0_0x5f14("0xf0")]["page_background_image"]["indexOf"](
                "/patterns/",
              ) > -0x1 &&
                ((_0x382145["backgroundSize"] = a0_0x5f14("0x161")),
                (_0x382145[a0_0x5f14("0x151")] = "repeat")));
            return _0x382145;
          case a0_0x5f14("0x8b"):
            return { borderColor: this["design"][a0_0x5f14("0x84")] };
          case "pointer":
            return { color: this[a0_0x5f14("0xf0")][a0_0x5f14("0x12")] };
          case "spin-btn":
            return {
              backgroundColor: this[a0_0x5f14("0xf0")][a0_0x5f14("0xba")],
              color: this[a0_0x5f14("0xe4")](
                this[a0_0x5f14("0xf0")][a0_0x5f14("0xba")],
              )
                ? a0_0x5f14("0x55")
                : a0_0x5f14("0xff"),
            };
          case a0_0x5f14("0x15d"):
            return {
              backgroundColor: this[a0_0x5f14("0xf0")][a0_0x5f14("0xba")],
              color: this[a0_0x5f14("0xe4")](this["design"][a0_0x5f14("0xba")])
                ? a0_0x5f14("0x55")
                : "#FFFFFF",
              "max-width": a0_0x5f14("0xe2"),
              // "margin-top": a0_0x5f14("0x50"),
            };
          case a0_0x5f14("0xf8"):
            return {
              color: this[a0_0x5f14("0xe4")](
                this[a0_0x5f14("0xf0")]["main_color"],
              )
                ? a0_0x5f14("0x55")
                : a0_0x5f14("0xff"),
            };
        }
      },
      onDesignPropChanged: function (_0x540213, _0x40ca12, _0x459cab) {
        var _0x5453ec = this;
        _0x40ca12 === a0_0x5f14("0x84") &&
          ((this[a0_0x5f14("0x4a")]["strokeStyle"] =
            _0x540213["target"]["value"]),
          this[a0_0x5f14("0x4a")][a0_0x5f14("0x20")]());
        _0x40ca12 === "wheel_slices_text_color" &&
          (this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")][a0_0x5f14("0x87")](
            function (_0x377c18) {
              _0x377c18 &&
                _0x377c18[a0_0x5f14("0x13a")] &&
                (_0x377c18["textFillStyle"] =
                  _0x540213[a0_0x5f14("0x4e")][a0_0x5f14("0x62")]);
            },
          ),
          this[a0_0x5f14("0x4a")][a0_0x5f14("0x20")]());
        _0x40ca12 === a0_0x5f14("0x69") &&
          this[a0_0x5f14("0xca")](
            parseInt(_0x540213[a0_0x5f14("0x4e")][a0_0x5f14("0x62")]),
          );
        if (_0x40ca12 === a0_0x5f14("0x16")) {
          console[a0_0x5f14("0x13d")](_0x40ca12, _0x459cab);
          var _0x34cc57 = 0x0;
          this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")]["forEach"](
            function (_0x1ecd46) {
              _0x1ecd46 &&
                (_0x34cc57 === _0x459cab &&
                  (_0x1ecd46[a0_0x5f14("0x12d")] =
                    _0x540213["target"]["value"]),
                _0x34cc57++),
                _0x34cc57 >=
                  _0x5453ec[a0_0x5f14("0xf0")][a0_0x5f14("0x16")][
                    a0_0x5f14("0xaa")
                  ] && (_0x34cc57 = 0x0);
            },
          ),
            this[a0_0x5f14("0x4a")][a0_0x5f14("0x20")]();
        }
      },
      updateWheelStroke: function (_0x44c26a) {
        (_0x44c26a = parseInt(_0x44c26a)),
          (this[a0_0x5f14("0x4a")][a0_0x5f14("0xee")] = _0x44c26a),
          _0x44c26a === 0x0
            ? (this[a0_0x5f14("0x4a")][a0_0x5f14("0x10f")] = null)
            : (this["theWheel"]["strokeStyle"] =
                this[a0_0x5f14("0xf0")]["wheel_border_color"]),
          this[a0_0x5f14("0x4a")][a0_0x5f14("0x20")]();
      },
      onSelectTab: function (_0x274d94) {
        this[a0_0x5f14("0x15b")] && (this[a0_0x5f14("0xce")] = !![]),
          _0x274d94 === "config" &&
            $(a0_0x5f14("0x33"))[a0_0x5f14("0x52")](a0_0x5f14("0x143")),
          _0x274d94 === "prizes" &&
            $("[data-target=\x22#Customizer_Section_Prizes\x22]")["trigger"](
              a0_0x5f14("0x143"),
            ),
          _0x274d94 === a0_0x5f14("0xf0") &&
            $("[data-target=\x22#Customizer_Section_Design\x22]")[
              a0_0x5f14("0x52")
            ](a0_0x5f14("0x143")),
          (this[a0_0x5f14("0x14")] = _0x274d94),
          this[a0_0x5f14("0x152")](0x190);
      },
      useTheme: function (_0x4ff861) {
        (this[a0_0x5f14("0xf0")][a0_0x5f14("0x149")] =
          _0x4ff861["page_background_color"]),
          (this[a0_0x5f14("0xf0")]["main_color"] =
            _0x4ff861[a0_0x5f14("0xba")]),
          (this[a0_0x5f14("0xf0")][a0_0x5f14("0x109")] =
            _0x4ff861["action_color"]),
          (this["design"][a0_0x5f14("0x89")] = _0x4ff861[a0_0x5f14("0x89")]),
          (this[a0_0x5f14("0xf0")][a0_0x5f14("0x84")] =
            _0x4ff861[a0_0x5f14("0x84")]),
          (this[a0_0x5f14("0xf0")][a0_0x5f14("0x12")] =
            _0x4ff861[a0_0x5f14("0x12")]),
          (this[a0_0x5f14("0xf0")]["wheel_slices_color"] =
            _0x4ff861[a0_0x5f14("0x16")]),
          (this[a0_0x5f14("0xf0")]["wheel_slices_text_color"] =
            _0x4ff861[a0_0x5f14("0xd6")]),
          this[a0_0x5f14("0xdb")](),
          this[a0_0x5f14("0xca")](this[a0_0x5f14("0xf0")][a0_0x5f14("0x69")]),
          mixpanel[a0_0x5f14("0x74")](a0_0x5f14("0xdd"), {
            action: a0_0x5f14("0x9f"),
          });
      },
      refreshSliceColors: function () {
        var _0x14ac01 = this,
          _0x4345fc = 0x0;
        this[a0_0x5f14("0x4a")][a0_0x5f14("0x130")]["forEach"](
          function (_0x56ef2a) {
            _0x56ef2a &&
              ((_0x56ef2a[a0_0x5f14("0x12d")] =
                _0x14ac01["design"][a0_0x5f14("0x16")][_0x4345fc]),
              _0x14ac01[a0_0x5f14("0xf0")][a0_0x5f14("0xd6")] ===
              a0_0x5f14("0xb8")
                ? (_0x56ef2a[a0_0x5f14("0x13a")] = _0x14ac01[a0_0x5f14("0xe4")](
                    _0x56ef2a[a0_0x5f14("0x12d")],
                  )
                    ? "#1A1A1A"
                    : a0_0x5f14("0xff"))
                : (_0x56ef2a[a0_0x5f14("0x13a")] =
                    _0x14ac01[a0_0x5f14("0xf0")][a0_0x5f14("0xd6")]),
              _0x4345fc++),
              _0x4345fc >=
                _0x14ac01[a0_0x5f14("0xf0")][a0_0x5f14("0x16")]["length"] &&
                (_0x4345fc = 0x0);
          },
        ),
          this["theWheel"][a0_0x5f14("0x20")]();
      },
      onWheelOptionsChanged: function () {
        var _0x5b87e6 = this[a0_0x5f14("0x5b")]
          [a0_0x5f14("0x54")]("\x0a")
          [a0_0x5f14("0x68")](function (_0x26c5bb) {
            return _0x26c5bb !== "";
          })
          ["map"](function (_0x4d3754) {
            return _0x4d3754["trim"]();
          });
        (this[a0_0x5f14("0x63")] = _0x5b87e6), this[a0_0x5f14("0x6a")]();
      },
      onAddOptionToWheel: function () {
        var _0x53c3f3 = this[a0_0x5f14("0x155")]
            [a0_0x5f14("0x54")]("\x0a")
            ["filter"](function (_0xadf625) {
              return _0xadf625 !== "";
            })
            [a0_0x5f14("0x158")](function (_0x3b7b6e) {
              return _0x3b7b6e[a0_0x5f14("0xbd")]();
            }),
          _0x5ed7c5 = this[a0_0x5f14("0x1b")][a0_0x5f14("0xbd")]();
        _0x5ed7c5 &&
          (this[a0_0x5f14("0x63")]["push"](_0x5ed7c5),
          (this[a0_0x5f14("0x1b")] = "")),
          this[a0_0x5f14("0x6a")]();
      },
      initKeyHandlers: function () {
        var _0x2966a5 = this;
        window[a0_0x5f14("0xd4")]("keydown", function (_0x45f580) {
          if (_0x2966a5[a0_0x5f14("0xe8")] !== a0_0x5f14("0x99")) return ![];
          (_0x45f580[a0_0x5f14("0xd8")] === 0x1b ||
            _0x45f580[a0_0x5f14("0xd8")] === 0xd) &&
            (_0x45f580[a0_0x5f14("0x26")](), _0x2966a5["onStopPlaying"]()),
            _0x45f580[a0_0x5f14("0xd8")] === 0x20 &&
              (_0x45f580[a0_0x5f14("0x26")](), _0x2966a5[a0_0x5f14("0x36")]());
        });
      },
      fireConfettis: function () {
        if (this[a0_0x5f14("0x129")] === null) {
          var _0x3fb5a3 = document[a0_0x5f14("0xea")](a0_0x5f14("0x15e"));
          _0x3fb5a3
            ? (this[a0_0x5f14("0x129")] = new JSConfetti({ canvas: _0x3fb5a3 }))
            : (this["jsConfetti"] = new JSConfetti());
        }
        this[a0_0x5f14("0x3a")][a0_0x5f14("0xf3")] &&
          this["jsConfetti"][a0_0x5f14("0x142")]({ confettiRadius: 0x4 });
      },
      onShowConfettisChange: function () {
        this[a0_0x5f14("0x3a")]["show_confettis"] && this[a0_0x5f14("0xe5")]();
      },
      onPlaySoundsChange: function () {
        this[a0_0x5f14("0x3a")][a0_0x5f14("0xf5")] &&
          SoundPlayer["play"](this[a0_0x5f14("0x3a")][a0_0x5f14("0x118")]);
      },
      onStopPlaying: function () {
        if (this["is_wheel_spinning"]) return ![];
        if (this[a0_0x5f14("0x112")]) return ![];
        this[a0_0x5f14("0x6a")](),
          setTimeout(() => (this[a0_0x5f14("0x67")] = ![]), 0x7),
          (this[a0_0x5f14("0x11e")] = this[a0_0x5f14("0x2e")]),
          (this["wheel_segment_index"] = null),
          (this["wheel_segment_name"] = null),
          (this["results"] = []),
          (this[a0_0x5f14("0xe8")] = a0_0x5f14("0x21")),
          $(a0_0x5f14("0x13b"))[a0_0x5f14("0xc2")](a0_0x5f14("0x147"), "auto");
      },
      toggleFullScreen: function () {
        var _0x4c76ac = this;
        if (screenfull[a0_0x5f14("0xad")]) {
          var _0x44cc77 = $(a0_0x5f14("0xda"))[0x0];
          screenfull[a0_0x5f14("0xde")](_0x44cc77),
            screenfull["on"](a0_0x5f14("0xe1"), function () {
              (_0x4c76ac[a0_0x5f14("0xb3")] = screenfull[a0_0x5f14("0x6f")]),
                screenfull[a0_0x5f14("0x6f")] &&
                  trackEvent(
                    a0_0x5f14("0xdd"),
                    { action: "Go_FullScreen" },
                    !![],
                  );
            });
        }
      },
      onRemoveEntry: function (_0x59c481) {
        this[a0_0x5f14("0x63")][_0x59c481] &&
          (this["participants"][a0_0x5f14("0x5")](_0x59c481, 0x1),
          this[a0_0x5f14("0x6a")]());
      },
      onEditBulkEntries: function () {
        (this[a0_0x5f14("0x5b")] =
          this["participants"][a0_0x5f14("0x41")]("\x0a")),
          (this[a0_0x5f14("0x159")] = !![]);
      },
      onEditBulkEntriesSave: function () {
        (this[a0_0x5f14("0x63")] = this[a0_0x5f14("0x5b")]
          [a0_0x5f14("0x54")]("\x0a")
          [a0_0x5f14("0x68")](function (_0x132700) {
            return _0x132700 !== "";
          })
          [a0_0x5f14("0x158")](function (_0x31ecf7) {
            return _0x31ecf7[a0_0x5f14("0xbd")]();
          })),
          (this[a0_0x5f14("0x159")] = ![]),
          this[a0_0x5f14("0x6a")]();
      },
      resetPlayWheel: function () {
        (this[a0_0x5f14("0xed")] = []),
          (this["wheel_segment_index"] = null),
          (this["wheel_segment_name"] = null),
          (this[a0_0x5f14("0x67")] = ![]),
          this[a0_0x5f14("0x6a")]();
      },
      closeCustomizer: function () {
        (this[a0_0x5f14("0xce")] = ![]),
          (this[a0_0x5f14("0x14")] = null),
          $(a0_0x5f14("0xa5"))
            [a0_0x5f14("0xa2")](a0_0x5f14("0x9c"))
            [a0_0x5f14("0x15a")](a0_0x5f14("0x14e"));
      },
      LightenDarkenColor: function (_0x58fbe7, _0x43b4c0) {
        var _0x27ffd9 = parseInt(_0x58fbe7, 0x10),
          _0xedca13 = (_0x27ffd9 >> 0x10) + _0x43b4c0,
          _0x1140bd = ((_0x27ffd9 >> 0x8) & 0xff) + _0x43b4c0,
          _0x15167e = (_0x27ffd9 & 0xff) + _0x43b4c0,
          _0x573a8e = _0x15167e | (_0x1140bd << 0x8) | (_0xedca13 << 0x10);
        return _0x573a8e[a0_0x5f14("0x5a")](0x10);
      },
      onUserSignup: function (_0x409dee) {
        this[a0_0x5f14("0x11")][a0_0x5f14("0xb9")]["hide"](),
          $(".hide-logged-in")[a0_0x5f14("0xe0")](),
          $(a0_0x5f14("0xb"))[a0_0x5f14("0x9c")](),
          $(".user-picture")[a0_0x5f14("0x91")](
            a0_0x5f14("0x35"),
            _0x409dee[a0_0x5f14("0x11c")][a0_0x5f14("0x157")],
          ),
          this[a0_0x5f14("0x7b")](_0x409dee[a0_0x5f14("0x11c")]),
          this[a0_0x5f14("0x10a")]();
        if (!this["is_customer"] && this[a0_0x5f14("0xbc")])
          return this["showClassicWheelUpgrade"](this[a0_0x5f14("0xbc")]);
        this[a0_0x5f14("0x120")] && this[a0_0x5f14("0x14b")]();
      },
      onUserLogin: function (_0x579fe6) {
        this[a0_0x5f14("0x88")](a0_0x5f14("0x34")),
          $(a0_0x5f14("0x6d"))[a0_0x5f14("0xe0")](),
          $(a0_0x5f14("0xb"))[a0_0x5f14("0x9c")](),
          $(a0_0x5f14("0xe7"))["attr"](
            a0_0x5f14("0x35"),
            _0x579fe6[a0_0x5f14("0x11c")][a0_0x5f14("0x157")],
          ),
          this["setUser"](_0x579fe6[a0_0x5f14("0x11c")]),
          this[a0_0x5f14("0xa3")](
            this["$t"](a0_0x5f14("0x137")),
            a0_0x5f14("0xf4"),
          ),
          this["checkUserSubStatus"]();
        if (!this[a0_0x5f14("0xdf")] && this[a0_0x5f14("0xbc")])
          return this[a0_0x5f14("0x76")](this["show_upgrade_after_login"]);
        this["show_save_modal_after_login"] && this[a0_0x5f14("0x14b")]();
      },
      trackSpin: function () {
        $["post"]({
          url: a0_0x5f14("0x7e") + Date[a0_0x5f14("0xac")](),
          dataType: a0_0x5f14("0x13e"),
          data: { id: this["savedWheel"]["id"], event: "spin" },
        });
      },
      trackUniquePageView: function () {
        $[a0_0x5f14("0x95")]({
          url: a0_0x5f14("0x7e") + Date[a0_0x5f14("0xac")](),
          dataType: a0_0x5f14("0x13e"),
          data: {
            id: this[a0_0x5f14("0x104")]["id"],
            event: a0_0x5f14("0x4d"),
          },
        });
      },
      copyWheelLink: function (_0x3040da) {
        if (!this[a0_0x5f14("0x104")][a0_0x5f14("0xaf")]) return ![];
        this["copyToClipboard"](
          this[a0_0x5f14("0x104")][a0_0x5f14("0xaf")],
          a0_0x5f14("0x90"),
        ),
          this[a0_0x5f14("0xa3")](
            this["$t"](a0_0x5f14("0x13f")),
            a0_0x5f14("0xf4"),
            0xdac,
          );
      },
      onWheelPreviewClick: function () {
        this[a0_0x5f14("0xe8")] === a0_0x5f14("0x21") &&
          (this[a0_0x5f14("0x162")](),
          mixpanel[a0_0x5f14("0x74")](a0_0x5f14("0xdd"), {
            action: a0_0x5f14("0x100"),
          }));
      },
      onCreateNew: function () {
        (window[a0_0x5f14("0x77")][a0_0x5f14("0xdc")] =
          this[a0_0x5f14("0x156")]("wheel")),
          mixpanel[a0_0x5f14("0x74")]("AS_WheelUserAction", {
            action: a0_0x5f14("0x6c"),
          });
      },
      onActivateLeadsWheel: function () {
        (this[a0_0x5f14("0x3a")][a0_0x5f14("0x51")] = !![]),
          this[a0_0x5f14("0x18")](),
          this["hideModal"]("LeadsWheelExplainModal");
      },
      setCaptureLeads: function (_0x3ac88d) {
        if (_0x3ac88d) {
          this[a0_0x5f14("0x40")]("LeadsWheelExplainModal");
          return;
        }
        (this[a0_0x5f14("0x3a")][a0_0x5f14("0x51")] = _0x3ac88d),
          this[a0_0x5f14("0x18")]();
      },
      onCaptureLeadsChange: function () {
        this[a0_0x5f14("0x3a")][a0_0x5f14("0x51")]
          ? ((this["config"]["show_start_button"] = !![]),
            (!this[a0_0x5f14("0x3a")][a0_0x5f14("0xbe")] ||
              this["config"][a0_0x5f14("0x5f")] === "") &&
              ((this[a0_0x5f14("0x3a")][a0_0x5f14("0xbe")] = !![]),
              (this[a0_0x5f14("0x3a")][a0_0x5f14("0x5f")] = this["$t"](
                a0_0x5f14("0x139"),
              ))),
            (!this[a0_0x5f14("0x3a")][a0_0x5f14("0x30")] ||
              this[a0_0x5f14("0x3a")][a0_0x5f14("0x12e")] === "") &&
              ((this["config"][a0_0x5f14("0x30")] = !![]),
              (this["config"]["description"] = this["$t"](a0_0x5f14("0x10")))),
            this["createPrizes"](),
            (this[a0_0x5f14("0x6b")] = this[a0_0x5f14("0x63")]),
            (this["participants"] = this[a0_0x5f14("0xc8")]()),
            (this["is_editing_bulk"] = ![]),
            this[a0_0x5f14("0x6a")](),
            $(a0_0x5f14("0x154"))["trigger"](a0_0x5f14("0x143")),
            trackEvent(a0_0x5f14("0xcb")))
          : ((this["config"][a0_0x5f14("0x1")] = ![]),
            (this[a0_0x5f14("0x3a")][a0_0x5f14("0x51")] = ![]),
            this[a0_0x5f14("0x3a")][a0_0x5f14("0xbe")] &&
              this[a0_0x5f14("0x3a")][a0_0x5f14("0x5f")] ===
                this["$t"](a0_0x5f14("0x139")) &&
              ((this[a0_0x5f14("0x3a")][a0_0x5f14("0xbe")] = ![]),
              (this[a0_0x5f14("0x3a")]["title"] = "")),
            this[a0_0x5f14("0x3a")]["show_desc"] &&
              this[a0_0x5f14("0x3a")][a0_0x5f14("0x12e")] ===
                this["$t"](a0_0x5f14("0x10")) &&
              ((this[a0_0x5f14("0x3a")][a0_0x5f14("0x30")] = ![]),
              (this["config"][a0_0x5f14("0x12e")] = "")),
            $(a0_0x5f14("0xf"))[a0_0x5f14("0x91")]("checked", ![]),
            (this[a0_0x5f14("0x63")] = this[a0_0x5f14("0x6b")]),
            this["onEditBulkEntries"](),
            this[a0_0x5f14("0x6a")](),
            (this[a0_0x5f14("0x31")] = []));
      },
      createPrizes: function () {
        var _0x3f2b05 = this;
        if (
          JSON["stringify"](__default_names) ===
          JSON[a0_0x5f14("0x9")](this["participants"])
        )
          this[a0_0x5f14("0x31")] = [
            { name: this["$t"](a0_0x5f14("0x43")) + "\x201", type: "text" },
            {
              name: this["$t"]("app_wheel.default_prize_empty_1"),
              type: a0_0x5f14("0x12b"),
            },
            { name: this["$t"](a0_0x5f14("0x43")) + "\x202", type: "text" },
            { name: this["$t"](a0_0x5f14("0x27")), type: a0_0x5f14("0x12b") },
            {
              name: this["$t"](a0_0x5f14("0x43")) + "\x203",
              type: a0_0x5f14("0x113"),
            },
            {
              name: this["$t"]("app_wheel.default_prize_empty_3"),
              type: "empty",
            },
            {
              name: this["$t"]("app_wheel.default_prize_text") + "\x204",
              type: a0_0x5f14("0x113"),
            },
            { name: this["$t"](a0_0x5f14("0xab")), type: "empty" },
            { name: this["$t"](a0_0x5f14("0x43")) + "\x205", type: "text" },
            { name: this["$t"](a0_0x5f14("0xc3")), type: "empty" },
            {
              name: this["$t"](a0_0x5f14("0x43")) + "\x206",
              type: a0_0x5f14("0x113"),
            },
            { name: this["$t"](a0_0x5f14("0x27")), type: a0_0x5f14("0x12b") },
          ];
        else {
          var _0x353607 = this[a0_0x5f14("0x63")]["slice"](0x0, 0xa);
          (this[a0_0x5f14("0x31")] = []),
            _0x353607["forEach"](function (_0x323b3f) {
              var _0x572dce = { name: _0x323b3f, type: "text" };
              _0x3f2b05["prizes"]["push"](_0x572dce);
            }),
            this[a0_0x5f14("0x31")][a0_0x5f14("0x25")]({
              name: this["$t"]("app_wheel.default_prize_empty_1"),
              type: "empty",
            }),
            this[a0_0x5f14("0x31")][a0_0x5f14("0x25")]({
              name: this["$t"](a0_0x5f14("0x27")),
              type: a0_0x5f14("0x12b"),
            });
        }
      },
      onInputPrizeChange: function () {
        (this[a0_0x5f14("0x63")] = this[a0_0x5f14("0xc8")]()), this["setup"]();
      },
      getParticipantsListFromPrizes: function () {
        return this[a0_0x5f14("0x31")][a0_0x5f14("0x158")](
          function (_0x43e690) {
            return _0x43e690["name"];
          },
        );
      },
      shuffle: function (_0x5ed005) {
        var _0x50b7e0, _0x5261f9, _0x5a29fe;
        for (
          _0x5a29fe = _0x5ed005[a0_0x5f14("0xaa")] - 0x1;
          _0x5a29fe > 0x0;
          _0x5a29fe--
        ) {
          (_0x50b7e0 = Math[a0_0x5f14("0xfa")](
            Math[a0_0x5f14("0x116")]() * (_0x5a29fe + 0x1),
          )),
            (_0x5261f9 = _0x5ed005[_0x5a29fe]),
            (_0x5ed005[_0x5a29fe] = _0x5ed005[_0x50b7e0]),
            (_0x5ed005[_0x50b7e0] = _0x5261f9);
        }
        return _0x5ed005;
      },
      onSortEntrants: function () {
        (this[a0_0x5f14("0x63")] =
          this[a0_0x5f14("0x63")][a0_0x5f14("0x14a")]()),
          this[a0_0x5f14("0xb5")] === "az"
            ? ((this["participants"] = this[a0_0x5f14("0x63")]
                ["sort"]()
                ["reverse"]()),
              (this["last_sort"] = "za"))
            : ((this[a0_0x5f14("0x63")] =
                this[a0_0x5f14("0x63")][a0_0x5f14("0x14a")]()),
              (this[a0_0x5f14("0xb5")] = "az")),
          this[a0_0x5f14("0x117")](),
          this[a0_0x5f14("0x6a")]();
      },
      onShuffleEntrants: function () {
        (this[a0_0x5f14("0x63")] = this[a0_0x5f14("0x97")](
          this[a0_0x5f14("0x63")],
        )),
          this["onEditBulkEntries"](),
          this["setup"]();
      },
      onClearEntrants: function () {
        (this[a0_0x5f14("0x63")] = []),
          this["onEditBulkEntries"](),
          this[a0_0x5f14("0x6a")](),
          this[a0_0x5f14("0x3a")]["advanced_mode"] &&
            this[a0_0x5f14("0x11e")][a0_0x5f14("0x87")](function (_0x40807e) {
              _0x40807e[a0_0x5f14("0x113")] = "";
            });
      },
      openMediaGallery: function (_0x355a97) {
        if (!this["is_customer"])
          return this[a0_0x5f14("0x76")](a0_0x5f14("0xc6"));
        this[a0_0x5f14("0x11")][a0_0x5f14("0x140")][a0_0x5f14("0x85")](
          _0x355a97,
        );
      },
      onImageSelected: function (_0x1d4d9f) {
        _0x1d4d9f[a0_0x5f14("0xef")] &&
          _0x1d4d9f["options"]["target"] === a0_0x5f14("0x1a") &&
          (this["design"][a0_0x5f14("0x1a")] = _0x1d4d9f[a0_0x5f14("0xe6")]);
      },
      getWheelLink: function (_0x4594d4) {
        return (
          window["SHARED_DATA"]["links"]["wheel"] +
          a0_0x5f14("0x101") +
          _0x4594d4[a0_0x5f14("0x65")]
        );
      },
      onUploadLogo: function () {
        if (!this[a0_0x5f14("0xdf")])
          return this[a0_0x5f14("0x76")](a0_0x5f14("0xa0"));
        this["$refs"][a0_0x5f14("0x15c")][a0_0x5f14("0x143")]();
      },
      checkUserSubStatus: function () {
        if (
          this[a0_0x5f14("0x11c")] &&
          this[a0_0x5f14("0x11c")][a0_0x5f14("0xc9")] &&
          this[a0_0x5f14("0x11c")][a0_0x5f14("0xc9")][a0_0x5f14("0xeb")]
        ) {
          if (
            this[a0_0x5f14("0x11c")][a0_0x5f14("0xc9")][a0_0x5f14("0xeb")] > 0x1
          )
            return (this[a0_0x5f14("0xdf")] = !![]), !![];
        }
        this["is_customer"] = ![];
      },
      showClassicWheelUpgrade: function (_0x492b8b) {
        if (
          this["user"] === null ||
          !this[a0_0x5f14("0x11c")] ||
          !this[a0_0x5f14("0x11c")]["id"]
        )
          return (
            this[a0_0x5f14("0x11")]["AuthModal"][a0_0x5f14("0x9c")](),
            (this["show_upgrade_after_login"] = _0x492b8b),
            ![]
          );
        var _0x125482 = this["$t"](a0_0x5f14("0x150")),
          _0x48fa18 = this["$t"](a0_0x5f14("0x4")),
          _0x48c745 = [
            this["$t"](a0_0x5f14("0x12c")),
            this["$t"]("upgrade.classic_wheel.feature2"),
            this["$t"](a0_0x5f14("0x7c")),
            this["$t"](a0_0x5f14("0x9d")),
            this["$t"](a0_0x5f14("0x7a")),
          ];
        this[a0_0x5f14("0x115")](0x0, _0x492b8b, "classic-wheel", {
          custom_title: this["$t"](a0_0x5f14("0x107")),
          custom_text: this["$t"](a0_0x5f14("0xd5")),
          features_page: {
            title: _0x125482,
            text: _0x48fa18,
            features: _0x48c745,
          },
        });
      },
      setAdvancedMode: function () {
        if (this[a0_0x5f14("0x3a")]["advanced_mode"]) {
          console[a0_0x5f14("0x13d")](
            a0_0x5f14("0x5b"),
            this[a0_0x5f14("0x5b")],
          );
          var _0x3b19dd = this[a0_0x5f14("0x5b")]
            ["split"]("\x0a")
            [a0_0x5f14("0x68")](function (_0x4d4c67) {
              return _0x4d4c67 !== "";
            })
            [a0_0x5f14("0x158")](function (_0x181bac) {
              return _0x181bac[a0_0x5f14("0xbd")]();
            });
          (this["wheel_add_option_list"] = []),
            _0x3b19dd["forEach"]((_0x18b2d9) => {
              this["wheel_add_option_list"][a0_0x5f14("0x25")]({
                text: _0x18b2d9,
                chance: -0x1,
                calculated_chance: 0x0,
                color: "",
              });
            }),
            this["onPrizeChanceChange"]();
        } else {
          var _0x3b19dd = this[a0_0x5f14("0x11e")][a0_0x5f14("0x158")](
            function (_0x387bb1) {
              return _0x387bb1[a0_0x5f14("0x113")];
            },
          );
          this[a0_0x5f14("0x5b")] = _0x3b19dd[a0_0x5f14("0x41")]("\x0a");
        }
      },
      onPrizeInputChange: function () {
        var _0x264316 = this["wheel_add_option_list"]["map"](
          function (_0x19a26d) {
            return _0x19a26d["text"];
          },
        );
        (this["participants"] = _0x264316), this[a0_0x5f14("0x6a")]();
      },
      getPrizeChanceAvailable: function (_0x2bddbd) {
        var _0x505186 = 0x0;
        this[a0_0x5f14("0x11e")][a0_0x5f14("0x87")](function (_0x43603e) {
          _0x43603e[a0_0x5f14("0x133")] > -0x1 &&
            (_0x505186 += parseInt(_0x43603e["chance"]));
        });
        let _0x17a1dd = 0x64 - _0x505186;
        debugger;
        return (
          _0x2bddbd &&
            _0x2bddbd["chance"] > 0x0 &&
            (_0x17a1dd = _0x17a1dd + _0x2bddbd[a0_0x5f14("0x133")]),
          _0x17a1dd
        );
      },
      onPrizeChanceChange: function () {
        var _0x445602 = this[a0_0x5f14("0x11e")][a0_0x5f14("0xaa")],
          _0x10574b = 0x0,
          _0x26c519 = 0x0,
          _0x4ec296 = 0x0,
          _0x567283 = 0x0;
        this["wheel_add_option_list"][a0_0x5f14("0x87")](function (_0xb26e85) {
          _0xb26e85[a0_0x5f14("0x133")] === -0x1
            ? _0x10574b++
            : (_0x26c519++,
              (_0x567283 += parseInt(
                Math[a0_0x5f14("0x9e")](_0xb26e85[a0_0x5f14("0x133")]),
              )));
        }),
          (_0x4ec296 = (0x64 - _0x567283) / _0x10574b),
          _0x4ec296 < 0x0 && (_0x4ec296 = 0x0),
          this["wheel_add_option_list"][a0_0x5f14("0x87")](
            function (_0x317995) {
              _0x317995[a0_0x5f14("0x133")] === -0x1
                ? _0x4ec296 > 0x0
                  ? (_0x317995[a0_0x5f14("0xf7")] = Number(
                      _0x4ec296[a0_0x5f14("0x4c")](0x1),
                    ))
                  : (_0x317995[a0_0x5f14("0xf7")] = _0x4ec296)
                : (_0x317995["calculated_chance"] =
                    _0x317995[a0_0x5f14("0x133")]);
            },
          ),
          console["clear"](),
          console[a0_0x5f14("0x13d")](a0_0x5f14("0x86"), _0x445602),
          console[a0_0x5f14("0x13d")](a0_0x5f14("0xf2"), _0x4ec296),
          console[a0_0x5f14("0x13d")]("entries_with_custom_chance", _0x26c519),
          console[a0_0x5f14("0x13d")](a0_0x5f14("0x11d"), _0x567283);
      },
      onDeleteEntry: function (_0x27aecc, _0x2ad383) {
        this[a0_0x5f14("0x11e")]["splice"](_0x2ad383, 0x1),
          this[a0_0x5f14("0x138")](),
          this["onPrizeChanceChange"]();
      },
      onAddEntry: function () {
        this["wheel_add_option_list"][a0_0x5f14("0x25")]({
          text: "",
          chance: -0x1,
          calculated_chance: 0x0,
          color: "",
        }),
          this["onPrizeInputChange"](),
          this[a0_0x5f14("0x126")]();
      },
      onEditEntry: function (_0x3d8fed, _0x2a89fa) {
        (this[a0_0x5f14("0x92")] = Object[a0_0x5f14("0x37")]({}, _0x3d8fed)),
          (this[a0_0x5f14("0x92")][a0_0x5f14("0x125")] = _0x2a89fa),
          (this["edit_entry_modal"][a0_0x5f14("0x3c")] =
            this[a0_0x5f14("0x5d")](_0x3d8fed)),
          $(a0_0x5f14("0x19"))["modal"]();
      },
      onEditEntryChanceUpdated: function (_0x584b40) {
        console[a0_0x5f14("0x13d")](_0x584b40[a0_0x5f14("0x4e")]["value"]);
      },
      onEditEntryApplyChanges: function () {
        var _0xbbf557 =
          this[a0_0x5f14("0x11e")][this[a0_0x5f14("0x92")]["index"]];
        (_0xbbf557[a0_0x5f14("0x113")] = this[a0_0x5f14("0x92")]["text"]),
          (_0xbbf557[a0_0x5f14("0x133")] = parseInt(
            this[a0_0x5f14("0x92")]["chance"],
          )),
          (this[a0_0x5f14("0x92")] = null),
          this["onPrizeChanceChange"](),
          $(a0_0x5f14("0x19"))[a0_0x5f14("0xc0")](a0_0x5f14("0xe0"));
      },
    },
  });

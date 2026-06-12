function gu(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var It = 1e3, Ot = It * 60, Nt = Ot * 60, gt = Nt * 24, Tu = gt * 7, vu = gt * 365.25, Eu = function(s, i) {
  i = i || {};
  var n = typeof s;
  if (n === "string" && s.length > 0)
    return Cu(s);
  if (n === "number" && isFinite(s))
    return i.long ? Au(s) : Su(s);
  throw new Error(
    "val is not a non-empty string or a valid number. val=" + JSON.stringify(s)
  );
};
function Cu(s) {
  if (s = String(s), !(s.length > 100)) {
    var i = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      s
    );
    if (i) {
      var n = parseFloat(i[1]), a = (i[2] || "ms").toLowerCase();
      switch (a) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * vu;
        case "weeks":
        case "week":
        case "w":
          return n * Tu;
        case "days":
        case "day":
        case "d":
          return n * gt;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * Nt;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * Ot;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * It;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return;
      }
    }
  }
}
function Su(s) {
  var i = Math.abs(s);
  return i >= gt ? Math.round(s / gt) + "d" : i >= Nt ? Math.round(s / Nt) + "h" : i >= Ot ? Math.round(s / Ot) + "m" : i >= It ? Math.round(s / It) + "s" : s + "ms";
}
function Au(s) {
  var i = Math.abs(s);
  return i >= gt ? kn(s, i, gt, "day") : i >= Nt ? kn(s, i, Nt, "hour") : i >= Ot ? kn(s, i, Ot, "minute") : i >= It ? kn(s, i, It, "second") : s + " ms";
}
function kn(s, i, n, a) {
  var l = i >= n * 1.5;
  return Math.round(s / n) + " " + a + (l ? "s" : "");
}
const Ru = /* @__PURE__ */ gu(Eu);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function re(s, i, n, a) {
  return new (n || (n = Promise))(function(l, e) {
    function h(T) {
      try {
        u(a.next(T));
      } catch (g) {
        e(g);
      }
    }
    function f(T) {
      try {
        u(a.throw(T));
      } catch (g) {
        e(g);
      }
    }
    function u(T) {
      var g;
      T.done ? l(T.value) : (g = T.value, g instanceof n ? g : new n(function(A) {
        A(g);
      })).then(h, f);
    }
    u((a = a.apply(s, [])).next());
  });
}
function b(s, i, n, a) {
  if (n === "a" && !a) throw new TypeError("Private accessor was defined without a getter");
  if (typeof i == "function" ? s !== i || !a : !i.has(s)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? a : n === "a" ? a.call(s) : a ? a.value : i.get(s);
}
function ie(s, i, n, a, l) {
  if (typeof i == "function" ? s !== i || !0 : !i.has(s)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return i.set(s, n), n;
}
const yu = function(s, i) {
  const n = /* @__PURE__ */ new Date(), a = `${n.getFullYear()}`;
  let l = `${n.getMonth() + 1}`;
  l.length === 1 && (l = `0${l}`);
  let e = `${n.getDate()}`;
  e.length === 1 && (e = `0${e}`);
  let h = `${n.getHours()}`;
  h.length === 1 && (h = `0${h}`);
  let f = `${n.getMinutes()}`;
  f.length === 1 && (f = `0${f}`);
  let u = `${n.getSeconds()}`;
  return u.length === 1 && (u = `0${u}`), (s || "yyyy-MM-dd hh:mm:ss").replace(/yyyy/g, a).replace(/MM/g, l).replace(/dd/g, e).replace(/hh/g, h).replace(/mm/g, f).replace(/ss/g, u);
}, tl = "error", Aa = new class {
  constructor() {
    this.init = (s) => {
      s || (s = {});
      const { uploadLog: i } = s;
      if (i) if (this.isInit) console.error("Log has been initialized, please do not repeat initialization!");
      else {
        this.resetUploadTime();
        for (let n in this) s[n] !== void 0 && (this[n] = s[n]);
        this.isInit = !0, window && window.addEventListener("unhandledrejection", (n) => this.handleError(n)), window && window.addEventListener("error", (n) => this.handleError(n));
      }
      else console.log("Log initialization failed, uploadLog field is missing!");
    }, this.resetDate = () => {
      this.logList = [];
    }, this.resetUploadTime = () => {
      this.uploadTime && clearTimeout(this.uploadTime), this.uploadTime = setTimeout(() => {
        this.doUpload();
      }, this.maxTime);
    }, this.handleError = ({ reason: s, message: i, error: n }) => re(this, void 0, void 0, function* () {
      var a, l;
      try {
        const e = (a = n?.stack) === null || a === void 0 ? void 0 : a.split(" at ")[1], h = ((l = e?.replace(`
`, "")) === null || l === void 0 ? void 0 : l.split("/")) || [], f = h[h.length - 1], u = f?.split(":") || [];
        let T = s;
        T && typeof T == "object" && (T = JSON.stringify(T), T && (T = T.substring(0, 200)));
        const g = { level: tl, msg: i, source: u[0], line: u[1], column: u[2] };
        u[0] && (yield this.addLog(g));
      } catch (e) {
        console.error(e);
      }
    }), this.doUpload = () => re(this, void 0, void 0, function* () {
      if (this.logList && this.logList.length) {
        const s = [...this.logList];
        this.logList = [];
        const i = (yield this.uploadLog({ log_list: s })) || {};
        i && i.data && i.data.errcode === 0 ? this.resetUploadTime() : this.logList = [...this.logList, ...s];
      }
    }), this.addLog = (s) => {
      if (!this.isInit) return void console.error("The log has not been initialized, please initialize it first");
      const { caller_id_name: i, ext_num: n } = this.extensionInfo, { level: a } = s;
      this.logList.push(JSON.stringify(Object.assign(Object.assign({}, s), { ts: yu(), extensionInfo: { caller_id_name: i, ext_num: n } }))), (this.logList.length >= this.maxLogCount || a === tl) && this.doUpload();
    }, this.logList = [], this.maxLogCount = 100, this.maxTime = 3e5, this.uploadTime = null, this.extensionInfo = {}, this.uploadLog = () => {
    }, this.isInit = !1;
  }
}();
var Mn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function bu(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function wu(s) {
  if (s.__esModule) return s;
  var i = s.default;
  if (typeof i == "function") {
    var n = function a() {
      if (this instanceof a) {
        var l = [null];
        return l.push.apply(l, arguments), new (Function.bind.apply(i, l))();
      }
      return i.apply(this, arguments);
    };
    n.prototype = i.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(s).forEach(function(a) {
    var l = Object.getOwnPropertyDescriptor(s, a);
    Object.defineProperty(n, a, l.get ? l : { enumerable: !0, get: function() {
      return s[a];
    } });
  }), n;
}
var Ra = typeof Mn == "object" && Mn && Mn.Object === Object && Mn, Iu = Ra, Ou = typeof self == "object" && self && self.Object === Object && self, Yr = Iu || Ou || Function("return this")(), pr = Yr.Symbol, nl = pr, ya = Object.prototype, Nu = ya.hasOwnProperty, Du = ya.toString, Vt = nl ? nl.toStringTag : void 0, Lu = function(s) {
  var i = Nu.call(s, Vt), n = s[Vt];
  try {
    s[Vt] = void 0;
    var a = !0;
  } catch {
  }
  var l = Du.call(s);
  return a && (i ? s[Vt] = n : delete s[Vt]), l;
}, Pu = Object.prototype.toString, xu = Lu, Uu = function(s) {
  return Pu.call(s);
}, ku = "[object Null]", Mu = "[object Undefined]", sl = pr ? pr.toStringTag : void 0, Qr = function(s) {
  return s == null ? s === void 0 ? Mu : ku : sl && sl in Object(s) ? xu(s) : Uu(s);
}, Zr = function(s) {
  var i = typeof s;
  return s != null && (i == "object" || i == "function");
}, $u = Qr, Fu = Zr, qu = "[object AsyncFunction]", Hu = "[object Function]", ju = "[object GeneratorFunction]", Bu = "[object Proxy]", rl, ba = function(s) {
  if (!Fu(s)) return !1;
  var i = $u(s);
  return i == Hu || i == ju || i == qu || i == Bu;
}, $s = Yr["__core-js_shared__"], il = (rl = /[^.]+$/.exec($s && $s.keys && $s.keys.IE_PROTO || "")) ? "Symbol(src)_1." + rl : "", Wu = function(s) {
  return !!il && il in s;
}, Gu = Function.prototype.toString, Vu = ba, Ku = Wu, zu = Zr, Ju = function(s) {
  if (s != null) {
    try {
      return Gu.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}, Xu = /^\[object .+?Constructor\]$/, Yu = Function.prototype, Qu = Object.prototype, Zu = Yu.toString, ec = Qu.hasOwnProperty, tc = RegExp("^" + Zu.call(ec).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), nc = function(s) {
  return !(!zu(s) || Ku(s)) && (Vu(s) ? tc : Xu).test(Ju(s));
}, sc = function(s, i) {
  return s?.[i];
}, rc = function(s, i) {
  var n = sc(s, i);
  return nc(n) ? n : void 0;
}, wa = function() {
  try {
    var s = rc(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch {
  }
}(), ol = wa, Ia = function(s, i, n) {
  i == "__proto__" && ol ? ol(s, i, { configurable: !0, enumerable: !0, value: n, writable: !0 }) : s[i] = n;
}, Oa = function(s, i) {
  return s === i || s != s && i != i;
}, ic = Ia, oc = Oa, lc = Object.prototype.hasOwnProperty, ac = function(s, i, n) {
  var a = s[i];
  lc.call(s, i) && oc(a, n) && (n !== void 0 || i in s) || ic(s, i, n);
}, uc = Ia, cc = function(s, i, n, a) {
  var l = !n;
  n || (n = {});
  for (var e = -1, h = i.length; ++e < h; ) {
    var f = i[e], u = a ? a(n[f], s[f], f, n, s) : void 0;
    u === void 0 && (u = s[f]), l ? uc(n, f, u) : ac(n, f, u);
  }
  return n;
}, Na = function(s) {
  return s;
}, hc = function(s, i, n) {
  switch (n.length) {
    case 0:
      return s.call(i);
    case 1:
      return s.call(i, n[0]);
    case 2:
      return s.call(i, n[0], n[1]);
    case 3:
      return s.call(i, n[0], n[1], n[2]);
  }
  return s.apply(i, n);
}, ll = Math.max, dc = function(s, i, n) {
  return i = ll(i === void 0 ? s.length - 1 : i, 0), function() {
    for (var a = arguments, l = -1, e = ll(a.length - i, 0), h = Array(e); ++l < e; ) h[l] = a[i + l];
    l = -1;
    for (var f = Array(i + 1); ++l < i; ) f[l] = a[l];
    return f[i] = n(h), hc(s, this, f);
  };
}, fc = function(s) {
  return function() {
    return s;
  };
}, al = wa, _c = al ? function(s, i) {
  return al(s, "toString", { configurable: !0, enumerable: !1, value: fc(i), writable: !0 });
} : Na, pc = 800, mc = 16, gc = Date.now, Tc = /* @__PURE__ */ function(s) {
  var i = 0, n = 0;
  return function() {
    var a = gc(), l = mc - (a - n);
    if (n = a, l > 0) {
      if (++i >= pc) return arguments[0];
    } else i = 0;
    return s.apply(void 0, arguments);
  };
}(_c), vc = Na, Ec = dc, Cc = Tc, Sc = 9007199254740991, Da = function(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= Sc;
}, Ac = ba, Rc = Da, La = function(s) {
  return s != null && Rc(s.length) && !Ac(s);
}, yc = 9007199254740991, bc = /^(?:0|[1-9]\d*)$/, Pa = function(s, i) {
  var n = typeof s;
  return !!(i = i ?? yc) && (n == "number" || n != "symbol" && bc.test(s)) && s > -1 && s % 1 == 0 && s < i;
}, wc = Oa, Ic = La, Oc = Pa, Nc = Zr, Dc = function(s, i) {
  return Cc(Ec(s, i, vc), s + "");
}, Lc = function(s, i, n) {
  if (!Nc(n)) return !1;
  var a = typeof i;
  return !!(a == "number" ? Ic(n) && Oc(i, n.length) : a == "string" && i in n) && wc(n[i], s);
}, Pc = function(s) {
  return Dc(function(i, n) {
    var a = -1, l = n.length, e = l > 1 ? n[l - 1] : void 0, h = l > 2 ? n[2] : void 0;
    for (e = s.length > 3 && typeof e == "function" ? (l--, e) : void 0, h && Lc(n[0], n[1], h) && (e = l < 3 ? void 0 : e, l = 1), i = Object(i); ++a < l; ) {
      var f = n[a];
      f && s(i, f, a, e);
    }
    return i;
  });
}, xc = function(s, i) {
  for (var n = -1, a = Array(s); ++n < s; ) a[n] = i(n);
  return a;
}, ei = function(s) {
  return s != null && typeof s == "object";
}, Uc = Qr, kc = ei, Mc = "[object Arguments]", ul = function(s) {
  return kc(s) && Uc(s) == Mc;
}, $c = ei, xa = Object.prototype, Fc = xa.hasOwnProperty, qc = xa.propertyIsEnumerable, Hc = ul(/* @__PURE__ */ function() {
  return arguments;
}()) ? ul : function(s) {
  return $c(s) && Fc.call(s, "callee") && !qc.call(s, "callee");
}, jc = Array.isArray, Vn = {}, Bc = function() {
  return !1;
};
(function(s, i) {
  var n = Yr, a = Bc, l = i && !i.nodeType && i, e = l && s && !s.nodeType && s, h = e && e.exports === l ? n.Buffer : void 0, f = (h ? h.isBuffer : void 0) || a;
  s.exports = f;
})({ get exports() {
  return Vn;
}, set exports(s) {
  Vn = s;
} }, Vn);
var Wc = Qr, Gc = Da, Vc = ei, ce = {};
ce["[object Float32Array]"] = ce["[object Float64Array]"] = ce["[object Int8Array]"] = ce["[object Int16Array]"] = ce["[object Int32Array]"] = ce["[object Uint8Array]"] = ce["[object Uint8ClampedArray]"] = ce["[object Uint16Array]"] = ce["[object Uint32Array]"] = !0, ce["[object Arguments]"] = ce["[object Array]"] = ce["[object ArrayBuffer]"] = ce["[object Boolean]"] = ce["[object DataView]"] = ce["[object Date]"] = ce["[object Error]"] = ce["[object Function]"] = ce["[object Map]"] = ce["[object Number]"] = ce["[object Object]"] = ce["[object RegExp]"] = ce["[object Set]"] = ce["[object String]"] = ce["[object WeakMap]"] = !1;
var Kc = function(s) {
  return Vc(s) && Gc(s.length) && !!ce[Wc(s)];
}, zc = function(s) {
  return function(i) {
    return s(i);
  };
}, mn = {};
(function(s, i) {
  var n = Ra, a = i && !i.nodeType && i, l = a && s && !s.nodeType && s, e = l && l.exports === a && n.process, h = function() {
    try {
      var f = l && l.require && l.require("util").types;
      return f || e && e.binding && e.binding("util");
    } catch {
    }
  }();
  s.exports = h;
})({ get exports() {
  return mn;
}, set exports(s) {
  mn = s;
} }, mn);
var Jc = Kc, Xc = zc, cl = mn && mn.isTypedArray, Yc = cl ? Xc(cl) : Jc, Qc = xc, Zc = Hc, eh = jc, th = Vn, nh = Pa, sh = Yc, rh = Object.prototype.hasOwnProperty, ih = function(s, i) {
  var n = eh(s), a = !n && Zc(s), l = !n && !a && th(s), e = !n && !a && !l && sh(s), h = n || a || l || e, f = h ? Qc(s.length, String) : [], u = f.length;
  for (var T in s) !i && !rh.call(s, T) || h && (T == "length" || l && (T == "offset" || T == "parent") || e && (T == "buffer" || T == "byteLength" || T == "byteOffset") || nh(T, u)) || f.push(T);
  return f;
}, oh = Object.prototype, lh = function(s) {
  var i = s && s.constructor;
  return s === (typeof i == "function" && i.prototype || oh);
}, ah = /* @__PURE__ */ function(s, i) {
  return function(n) {
    return s(i(n));
  };
}(Object.keys, Object), uh = lh, ch = ah, hh = Object.prototype.hasOwnProperty, dh = ih, fh = function(s) {
  if (!uh(s)) return ch(s);
  var i = [];
  for (var n in Object(s)) hh.call(s, n) && n != "constructor" && i.push(n);
  return i;
}, _h = La, ph = cc, mh = function(s) {
  return _h(s) ? dh(s) : fh(s);
}, gh = Pc(function(s, i, n, a) {
  ph(i, mh(i), s, a);
}), Th = function(s) {
  return s === void 0;
};
function mr(s) {
  return Array.isArray(s) ? s.map((i) => mr(i)) : s !== null && typeof s == "object" ? Object.keys(s).reduce((i, n) => {
    const a = n.replace(/_([a-z])/g, (e, h) => h.toUpperCase()), l = s[n];
    return i[a] = mr(l), i;
  }, {}) : s;
}
function gr(s) {
  return Array.isArray(s) ? s.map((i) => gr(i)) : s !== null && typeof s == "object" ? Object.keys(s).reduce((i, n) => {
    const a = n.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`), l = s[n];
    return i[a] = gr(l), i;
  }, {}) : s;
}
function _t(s, i) {
  return gh(s, i, (n, a) => Th(a) ? n : a);
}
function vh(s, i = "-", n = ":") {
  const a = s || /* @__PURE__ */ new Date(), l = a.getFullYear(), e = a.getMonth() + 1, h = a.getDate(), f = a.getHours(), u = a.getMinutes(), T = a.getSeconds(), g = a.getMilliseconds();
  return `${l}${i}${At(e)}${i}${At(h)} ${At(f)}${n}${At(u)}${n}${At(T)}${n}${At(g, 3)}`;
}
function At(s, i = 2) {
  return s.toString().padStart(i, "0");
}
function Ua(s, i, n) {
  return re(this, void 0, void 0, function* () {
    const a = { audio: !0, video: !1 };
    let l = !0, e = !0;
    try {
      const h = yield navigator.mediaDevices.enumerateDevices(), f = h.filter((T) => T.kind === "videoinput");
      l = !(f.length > 0), s && f.length > 0 && (n && f.some((T) => T.deviceId === n) ? a.video = { deviceId: { exact: n } } : a.video = !0);
      const u = h.filter((T) => T.kind === "audioinput");
      return e = !(u.length > 0), u.length > 0 && (i && u.some((T) => T.deviceId === i) ? a.audio = { deviceId: { exact: i } } : a.audio = !0), { mediaConstraints: a, isNoneCamera: l, isNoneAudio: e };
    } catch {
      return null;
    }
  });
}
function ka(s) {
  return re(this, void 0, void 0, function* () {
    const { browserName: i } = function() {
      var n, a;
      const l = navigator.userAgent;
      return { browserName: (n = l.toLowerCase().match(/(chrome|firefox|msie|trident|edge|safari|opera)/)) === null || n === void 0 ? void 0 : n[1], browserVersion: (a = l.match(/(version|opr|chrome|firefox|safari|msie|trident|edge)\/([\d.]+)/i)) === null || a === void 0 ? void 0 : a[2] };
    }();
    if (i !== "chrome" && i !== "edge" && i !== "opear") return !0;
    try {
      const n = { audio: !0 };
      return s === "video" && (n.video = !0), (yield navigator.mediaDevices.getUserMedia(n)).getTracks().forEach((a) => {
        a.stop();
      }), !0;
    } catch {
      return !1;
    }
  });
}
function Ma(s) {
  let i = "unused", n = "unused";
  return s.subscribe_plan_list ? (s.subscribe_plan_list.forEach((a) => {
    a?.service_list && a.service_list.forEach((l) => {
      l?.status && (l?.service_name === "fqdn" ? i = l.status : l?.service_name === "video" && (n = l.status));
    });
  }), { fqdnStatus: i, videoStatus: n }) : { fqdnStatus: i, videoStatus: n };
}
class K {
  static set(i, n, a = !0) {
    return !(!a && this._data.hasOwnProperty(i)) && (this._data[i] = n, !0);
  }
  static get(i) {
    return i === void 0 ? this._data : this._data[i];
  }
  static remove(i) {
    delete this._data[i];
  }
}
K._data = {};
var P = new class {
  constructor(s = !0) {
    this._enabled = !0, this._enabled = s;
  }
  getCurrentTime() {
    const s = /* @__PURE__ */ new Date(), i = s.getFullYear(), n = s.getMonth() + 1, a = s.getDate(), l = s.getHours(), e = s.getMinutes(), h = s.getSeconds(), f = s.getMilliseconds();
    return `${i}-${this.padZero(n)}-${this.padZero(a)} ${this.padZero(l)}:${this.padZero(e)}:${this.padZero(h)}:${this.padZero(f, 3)}`;
  }
  padZero(s, i = 2) {
    return s.toString().padStart(i, "0");
  }
  log(s, ...i) {
    if (this._enabled) switch (console.log(`[${s}] ${this.getCurrentTime()} `, ...i), s) {
      case "error":
      case "warn":
      case "record":
        Aa.addLog({ level: s === "record" ? "info" : s, msg: `${this.username || ""} ${i.toString()}`, source: "WebRTC SDK" });
    }
  }
  error(...s) {
    this.log("error", ...s);
  }
  warn(...s) {
    this.log("warn", ...s);
  }
  info(...s) {
    this.log("info", ...s);
  }
  enable() {
    this._enabled = !0;
  }
  disable() {
    this._enabled = !1;
  }
}();
function $a(s, i) {
  return function() {
    return s.apply(i, arguments);
  };
}
const { toString: Fa } = Object.prototype, { getPrototypeOf: ti } = Object, ni = (Fs = /* @__PURE__ */ Object.create(null), (s) => {
  const i = Fa.call(s);
  return Fs[i] || (Fs[i] = i.slice(8, -1).toLowerCase());
});
var Fs;
const Je = (s) => (s = s.toLowerCase(), (i) => ni(i) === s), rs = (s) => (i) => typeof i === s, { isArray: yt } = Array, sn = rs("undefined"), hl = Je("ArrayBuffer"), Eh = rs("string"), Ye = rs("function"), dl = rs("number"), qs = (s) => s !== null && typeof s == "object", $n = (s) => {
  if (ni(s) !== "object") return !1;
  const i = ti(s);
  return !(i !== null && i !== Object.prototype && Object.getPrototypeOf(i) !== null || Symbol.toStringTag in s || Symbol.iterator in s);
}, Ch = Je("Date"), Sh = Je("File"), Ah = Je("Blob"), Rh = Je("FileList"), yh = Je("URLSearchParams");
function rn(s, i, { allOwnKeys: n = !1 } = {}) {
  if (s == null) return;
  let a, l;
  if (typeof s != "object" && (s = [s]), yt(s)) for (a = 0, l = s.length; a < l; a++) i.call(null, s[a], a, s);
  else {
    const e = n ? Object.getOwnPropertyNames(s) : Object.keys(s), h = e.length;
    let f;
    for (a = 0; a < h; a++) f = e[a], i.call(null, s[f], f, s);
  }
}
function fl(s, i) {
  i = i.toLowerCase();
  const n = Object.keys(s);
  let a, l = n.length;
  for (; l-- > 0; ) if (a = n[l], i === a.toLowerCase()) return a;
  return null;
}
const qa = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, _l = (s) => !sn(s) && s !== qa, bh = (Hs = typeof Uint8Array < "u" && ti(Uint8Array), (s) => Hs && s instanceof Hs);
var Hs;
const wh = Je("HTMLFormElement"), pl = (({ hasOwnProperty: s }) => (i, n) => s.call(i, n))(Object.prototype), Ih = Je("RegExp"), ml = (s, i) => {
  const n = Object.getOwnPropertyDescriptors(s), a = {};
  rn(n, (l, e) => {
    i(l, e, s) !== !1 && (a[e] = l);
  }), Object.defineProperties(s, a);
}, js = "abcdefghijklmnopqrstuvwxyz", gl = "0123456789", Tl = { DIGIT: gl, ALPHA: js, ALPHA_DIGIT: js + js.toUpperCase() + gl };
var x = { isArray: yt, isArrayBuffer: hl, isBuffer: function(s) {
  return s !== null && !sn(s) && s.constructor !== null && !sn(s.constructor) && Ye(s.constructor.isBuffer) && s.constructor.isBuffer(s);
}, isFormData: (s) => {
  const i = "[object FormData]";
  return s && (typeof FormData == "function" && s instanceof FormData || Fa.call(s) === i || Ye(s.toString) && s.toString() === i);
}, isArrayBufferView: function(s) {
  let i;
  return i = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(s) : s && s.buffer && hl(s.buffer), i;
}, isString: Eh, isNumber: dl, isBoolean: (s) => s === !0 || s === !1, isObject: qs, isPlainObject: $n, isUndefined: sn, isDate: Ch, isFile: Sh, isBlob: Ah, isRegExp: Ih, isFunction: Ye, isStream: (s) => qs(s) && Ye(s.pipe), isURLSearchParams: yh, isTypedArray: bh, isFileList: Rh, forEach: rn, merge: function s() {
  const { caseless: i } = _l(this) && this || {}, n = {}, a = (l, e) => {
    const h = i && fl(n, e) || e;
    $n(n[h]) && $n(l) ? n[h] = s(n[h], l) : $n(l) ? n[h] = s({}, l) : yt(l) ? n[h] = l.slice() : n[h] = l;
  };
  for (let l = 0, e = arguments.length; l < e; l++) arguments[l] && rn(arguments[l], a);
  return n;
}, extend: (s, i, n, { allOwnKeys: a } = {}) => (rn(i, (l, e) => {
  n && Ye(l) ? s[e] = $a(l, n) : s[e] = l;
}, { allOwnKeys: a }), s), trim: (s) => s.trim ? s.trim() : s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), stripBOM: (s) => (s.charCodeAt(0) === 65279 && (s = s.slice(1)), s), inherits: (s, i, n, a) => {
  s.prototype = Object.create(i.prototype, a), s.prototype.constructor = s, Object.defineProperty(s, "super", { value: i.prototype }), n && Object.assign(s.prototype, n);
}, toFlatObject: (s, i, n, a) => {
  let l, e, h;
  const f = {};
  if (i = i || {}, s == null) return i;
  do {
    for (l = Object.getOwnPropertyNames(s), e = l.length; e-- > 0; ) h = l[e], a && !a(h, s, i) || f[h] || (i[h] = s[h], f[h] = !0);
    s = n !== !1 && ti(s);
  } while (s && (!n || n(s, i)) && s !== Object.prototype);
  return i;
}, kindOf: ni, kindOfTest: Je, endsWith: (s, i, n) => {
  s = String(s), (n === void 0 || n > s.length) && (n = s.length), n -= i.length;
  const a = s.indexOf(i, n);
  return a !== -1 && a === n;
}, toArray: (s) => {
  if (!s) return null;
  if (yt(s)) return s;
  let i = s.length;
  if (!dl(i)) return null;
  const n = new Array(i);
  for (; i-- > 0; ) n[i] = s[i];
  return n;
}, forEachEntry: (s, i) => {
  const n = (s && s[Symbol.iterator]).call(s);
  let a;
  for (; (a = n.next()) && !a.done; ) {
    const l = a.value;
    i.call(s, l[0], l[1]);
  }
}, matchAll: (s, i) => {
  let n;
  const a = [];
  for (; (n = s.exec(i)) !== null; ) a.push(n);
  return a;
}, isHTMLForm: wh, hasOwnProperty: pl, hasOwnProp: pl, reduceDescriptors: ml, freezeMethods: (s) => {
  ml(s, (i, n) => {
    if (Ye(s) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return !1;
    const a = s[n];
    Ye(a) && (i.enumerable = !1, "writable" in i ? i.writable = !1 : i.set || (i.set = () => {
      throw Error("Can not rewrite read-only method '" + n + "'");
    }));
  });
}, toObjectSet: (s, i) => {
  const n = {}, a = (l) => {
    l.forEach((e) => {
      n[e] = !0;
    });
  };
  return yt(s) ? a(s) : a(String(s).split(i)), n;
}, toCamelCase: (s) => s.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(i, n, a) {
  return n.toUpperCase() + a;
}), noop: () => {
}, toFiniteNumber: (s, i) => (s = +s, Number.isFinite(s) ? s : i), findKey: fl, global: qa, isContextDefined: _l, ALPHABET: Tl, generateString: (s = 16, i = Tl.ALPHA_DIGIT) => {
  let n = "";
  const { length: a } = i;
  for (; s--; ) n += i[Math.random() * a | 0];
  return n;
}, isSpecCompliantForm: function(s) {
  return !!(s && Ye(s.append) && s[Symbol.toStringTag] === "FormData" && s[Symbol.iterator]);
}, toJSONObject: (s) => {
  const i = new Array(10), n = (a, l) => {
    if (qs(a)) {
      if (i.indexOf(a) >= 0) return;
      if (!("toJSON" in a)) {
        i[l] = a;
        const e = yt(a) ? [] : {};
        return rn(a, (h, f) => {
          const u = n(h, l + 1);
          !sn(u) && (e[f] = u);
        }), i[l] = void 0, e;
      }
    }
    return a;
  };
  return n(s, 0);
} };
function ee(s, i, n, a, l) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = s, this.name = "AxiosError", i && (this.code = i), n && (this.config = n), a && (this.request = a), l && (this.response = l);
}
x.inherits(ee, Error, { toJSON: function() {
  return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: x.toJSONObject(this.config), code: this.code, status: this.response && this.response.status ? this.response.status : null };
} });
const vl = ee.prototype, El = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((s) => {
  El[s] = { value: s };
}), Object.defineProperties(ee, El), Object.defineProperty(vl, "isAxiosError", { value: !0 }), ee.from = (s, i, n, a, l, e) => {
  const h = Object.create(vl);
  return x.toFlatObject(s, h, function(f) {
    return f !== Error.prototype;
  }, (f) => f !== "isAxiosError"), ee.call(h, s.message, i, n, a, l), h.cause = s, h.name = s.name, e && Object.assign(h, e), h;
};
function Bs(s) {
  return x.isPlainObject(s) || x.isArray(s);
}
function Ha(s) {
  return x.endsWith(s, "[]") ? s.slice(0, -2) : s;
}
function Cl(s, i, n) {
  return s ? s.concat(i).map(function(a, l) {
    return a = Ha(a), !n && l ? "[" + a + "]" : a;
  }).join(n ? "." : "") : i;
}
const Oh = x.toFlatObject(x, {}, null, function(s) {
  return /^is[A-Z]/.test(s);
});
function ts(s, i, n) {
  if (!x.isObject(s)) throw new TypeError("target must be an object");
  i = i || new FormData();
  const a = (n = x.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function(S, L) {
    return !x.isUndefined(L[S]);
  })).metaTokens, l = n.visitor || T, e = n.dots, h = n.indexes, f = (n.Blob || typeof Blob < "u" && Blob) && x.isSpecCompliantForm(i);
  if (!x.isFunction(l)) throw new TypeError("visitor must be a function");
  function u(S) {
    if (S === null) return "";
    if (x.isDate(S)) return S.toISOString();
    if (!f && x.isBlob(S)) throw new ee("Blob is not supported. Use a Buffer instead.");
    return x.isArrayBuffer(S) || x.isTypedArray(S) ? f && typeof Blob == "function" ? new Blob([S]) : Buffer.from(S) : S;
  }
  function T(S, L, w) {
    let y = S;
    if (S && !w && typeof S == "object") {
      if (x.endsWith(L, "{}")) L = a ? L : L.slice(0, -2), S = JSON.stringify(S);
      else if (x.isArray(S) && function(U) {
        return x.isArray(U) && !U.some(Bs);
      }(S) || (x.isFileList(S) || x.endsWith(L, "[]")) && (y = x.toArray(S))) return L = Ha(L), y.forEach(function(U, O) {
        !x.isUndefined(U) && U !== null && i.append(h === !0 ? Cl([L], O, e) : h === null ? L : L + "[]", u(U));
      }), !1;
    }
    return !!Bs(S) || (i.append(Cl(w, L, e), u(S)), !1);
  }
  const g = [], A = Object.assign(Oh, { defaultVisitor: T, convertValue: u, isVisitable: Bs });
  if (!x.isObject(s)) throw new TypeError("data must be an object");
  return function S(L, w) {
    if (!x.isUndefined(L)) {
      if (g.indexOf(L) !== -1) throw Error("Circular reference detected in " + w.join("."));
      g.push(L), x.forEach(L, function(y, U) {
        (!(x.isUndefined(y) || y === null) && l.call(i, y, x.isString(U) ? U.trim() : U, w, A)) === !0 && S(y, w ? w.concat(U) : [U]);
      }), g.pop();
    }
  }(s), i;
}
function Sl(s) {
  const i = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g, function(n) {
    return i[n];
  });
}
function si(s, i) {
  this._pairs = [], s && ts(s, this, i);
}
const Al = si.prototype;
function Nh(s) {
  return encodeURIComponent(s).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ja(s, i, n) {
  if (!i) return s;
  const a = n && n.encode || Nh, l = n && n.serialize;
  let e;
  if (e = l ? l(i, n) : x.isURLSearchParams(i) ? i.toString() : new si(i, n).toString(a), e) {
    const h = s.indexOf("#");
    h !== -1 && (s = s.slice(0, h)), s += (s.indexOf("?") === -1 ? "?" : "&") + e;
  }
  return s;
}
Al.append = function(s, i) {
  this._pairs.push([s, i]);
}, Al.toString = function(s) {
  const i = s ? function(n) {
    return s.call(this, n, Sl);
  } : Sl;
  return this._pairs.map(function(n) {
    return i(n[0]) + "=" + i(n[1]);
  }, "").join("&");
};
class Rl {
  constructor() {
    this.handlers = [];
  }
  use(i, n, a) {
    return this.handlers.push({ fulfilled: i, rejected: n, synchronous: !!a && a.synchronous, runWhen: a ? a.runWhen : null }), this.handlers.length - 1;
  }
  eject(i) {
    this.handlers[i] && (this.handlers[i] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(i) {
    x.forEach(this.handlers, function(n) {
      n !== null && i(n);
    });
  }
}
var Ba = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 }, ze = { classes: { URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : si, FormData: typeof FormData < "u" ? FormData : null, Blob: typeof Blob < "u" ? Blob : null }, isStandardBrowserEnv: (() => {
  let s;
  return (typeof navigator > "u" || (s = navigator.product) !== "ReactNative" && s !== "NativeScript" && s !== "NS") && typeof window < "u" && typeof document < "u";
})(), isStandardBrowserWebWorkerEnv: typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", protocols: ["http", "https", "file", "blob", "url", "data"] };
function Wa(s) {
  function i(n, a, l, e) {
    let h = n[e++];
    const f = Number.isFinite(+h), u = e >= n.length;
    return h = !h && x.isArray(l) ? l.length : h, u ? (x.hasOwnProp(l, h) ? l[h] = [l[h], a] : l[h] = a, !f) : (l[h] && x.isObject(l[h]) || (l[h] = []), i(n, a, l[h], e) && x.isArray(l[h]) && (l[h] = function(T) {
      const g = {}, A = Object.keys(T);
      let S;
      const L = A.length;
      let w;
      for (S = 0; S < L; S++) w = A[S], g[w] = T[w];
      return g;
    }(l[h])), !f);
  }
  if (x.isFormData(s) && x.isFunction(s.entries)) {
    const n = {};
    return x.forEachEntry(s, (a, l) => {
      i(function(e) {
        return x.matchAll(/\w+|\[(\w*)]/g, e).map((h) => h[0] === "[]" ? "" : h[1] || h[0]);
      }(a), l, n, 0);
    }), n;
  }
  return null;
}
const Dh = { "Content-Type": void 0 }, Dt = { transitional: Ba, adapter: ["xhr", "http"], transformRequest: [function(s, i) {
  const n = i.getContentType() || "", a = n.indexOf("application/json") > -1, l = x.isObject(s);
  if (l && x.isHTMLForm(s) && (s = new FormData(s)), x.isFormData(s)) return a && a ? JSON.stringify(Wa(s)) : s;
  if (x.isArrayBuffer(s) || x.isBuffer(s) || x.isStream(s) || x.isFile(s) || x.isBlob(s)) return s;
  if (x.isArrayBufferView(s)) return s.buffer;
  if (x.isURLSearchParams(s)) return i.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), s.toString();
  let e;
  if (l) {
    if (n.indexOf("application/x-www-form-urlencoded") > -1) return function(h, f) {
      return ts(h, new ze.classes.URLSearchParams(), Object.assign({ visitor: function(u, T, g, A) {
        return A.defaultVisitor.apply(this, arguments);
      } }, f));
    }(s, this.formSerializer).toString();
    if ((e = x.isFileList(s)) || n.indexOf("multipart/form-data") > -1) {
      const h = this.env && this.env.FormData;
      return ts(e ? { "files[]": s } : s, h && new h(), this.formSerializer);
    }
  }
  return l || a ? (i.setContentType("application/json", !1), function(h, f, u) {
    if (x.isString(h)) try {
      return (f || JSON.parse)(h), x.trim(h);
    } catch (T) {
      if (T.name !== "SyntaxError") throw T;
    }
    return (u || JSON.stringify)(h);
  }(s)) : s;
}], transformResponse: [function(s) {
  const i = this.transitional || Dt.transitional, n = i && i.forcedJSONParsing, a = this.responseType === "json";
  if (s && x.isString(s) && (n && !this.responseType || a)) {
    const l = !(i && i.silentJSONParsing) && a;
    try {
      return JSON.parse(s);
    } catch (e) {
      if (l)
        throw e.name === "SyntaxError" ? ee.from(e, ee.ERR_BAD_RESPONSE, this, null, this.response) : e;
    }
  }
  return s;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: ze.classes.FormData, Blob: ze.classes.Blob }, validateStatus: function(s) {
  return s >= 200 && s < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*" } } };
x.forEach(["delete", "get", "head"], function(s) {
  Dt.headers[s] = {};
}), x.forEach(["post", "put", "patch"], function(s) {
  Dt.headers[s] = x.merge(Dh);
});
const Lh = x.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), yl = Symbol("internals");
function Kt(s) {
  return s && String(s).trim().toLowerCase();
}
function Kn(s) {
  return s === !1 || s == null ? s : x.isArray(s) ? s.map(Kn) : String(s);
}
function Ws(s, i, n, a, l) {
  return x.isFunction(a) ? a.call(this, i, n) : (l && (i = n), x.isString(i) ? x.isString(a) ? i.indexOf(a) !== -1 : x.isRegExp(a) ? a.test(i) : void 0 : void 0);
}
class xe {
  constructor(i) {
    i && this.set(i);
  }
  set(i, n, a) {
    const l = this;
    function e(f, u, T) {
      const g = Kt(u);
      if (!g) throw new Error("header name must be a non-empty string");
      const A = x.findKey(l, g);
      (!A || l[A] === void 0 || T === !0 || T === void 0 && l[A] !== !1) && (l[A || u] = Kn(f));
    }
    const h = (f, u) => x.forEach(f, (T, g) => e(T, g, u));
    return x.isPlainObject(i) || i instanceof this.constructor ? h(i, n) : x.isString(i) && (i = i.trim()) && !/^[-_a-zA-Z]+$/.test(i.trim()) ? h(((f) => {
      const u = {};
      let T, g, A;
      return f && f.split(`
`).forEach(function(S) {
        A = S.indexOf(":"), T = S.substring(0, A).trim().toLowerCase(), g = S.substring(A + 1).trim(), !T || u[T] && Lh[T] || (T === "set-cookie" ? u[T] ? u[T].push(g) : u[T] = [g] : u[T] = u[T] ? u[T] + ", " + g : g);
      }), u;
    })(i), n) : i != null && e(n, i, a), this;
  }
  get(i, n) {
    if (i = Kt(i)) {
      const a = x.findKey(this, i);
      if (a) {
        const l = this[a];
        if (!n) return l;
        if (n === !0) return function(e) {
          const h = /* @__PURE__ */ Object.create(null), f = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
          let u;
          for (; u = f.exec(e); ) h[u[1]] = u[2];
          return h;
        }(l);
        if (x.isFunction(n)) return n.call(this, l, a);
        if (x.isRegExp(n)) return n.exec(l);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(i, n) {
    if (i = Kt(i)) {
      const a = x.findKey(this, i);
      return !(!a || this[a] === void 0 || n && !Ws(0, this[a], a, n));
    }
    return !1;
  }
  delete(i, n) {
    const a = this;
    let l = !1;
    function e(h) {
      if (h = Kt(h)) {
        const f = x.findKey(a, h);
        !f || n && !Ws(0, a[f], f, n) || (delete a[f], l = !0);
      }
    }
    return x.isArray(i) ? i.forEach(e) : e(i), l;
  }
  clear(i) {
    const n = Object.keys(this);
    let a = n.length, l = !1;
    for (; a--; ) {
      const e = n[a];
      i && !Ws(0, this[e], e, i, !0) || (delete this[e], l = !0);
    }
    return l;
  }
  normalize(i) {
    const n = this, a = {};
    return x.forEach(this, (l, e) => {
      const h = x.findKey(a, e);
      if (h) return n[h] = Kn(l), void delete n[e];
      const f = i ? function(u) {
        return u.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (T, g, A) => g.toUpperCase() + A);
      }(e) : String(e).trim();
      f !== e && delete n[e], n[f] = Kn(l), a[f] = !0;
    }), this;
  }
  concat(...i) {
    return this.constructor.concat(this, ...i);
  }
  toJSON(i) {
    const n = /* @__PURE__ */ Object.create(null);
    return x.forEach(this, (a, l) => {
      a != null && a !== !1 && (n[l] = i && x.isArray(a) ? a.join(", ") : a);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([i, n]) => i + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(i) {
    return i instanceof this ? i : new this(i);
  }
  static concat(i, ...n) {
    const a = new this(i);
    return n.forEach((l) => a.set(l)), a;
  }
  static accessor(i) {
    const n = (this[yl] = this[yl] = { accessors: {} }).accessors, a = this.prototype;
    function l(e) {
      const h = Kt(e);
      n[h] || (function(f, u) {
        const T = x.toCamelCase(" " + u);
        ["get", "set", "has"].forEach((g) => {
          Object.defineProperty(f, g + T, { value: function(A, S, L) {
            return this[g].call(this, u, A, S, L);
          }, configurable: !0 });
        });
      }(a, e), n[h] = !0);
    }
    return x.isArray(i) ? i.forEach(l) : l(i), this;
  }
}
function Gs(s, i) {
  const n = this || Dt, a = i || n, l = xe.from(a.headers);
  let e = a.data;
  return x.forEach(s, function(h) {
    e = h.call(n, e, l.normalize(), i ? i.status : void 0);
  }), l.normalize(), e;
}
function Ga(s) {
  return !(!s || !s.__CANCEL__);
}
function Tn(s, i, n) {
  ee.call(this, s ?? "canceled", ee.ERR_CANCELED, i, n), this.name = "CanceledError";
}
xe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), x.freezeMethods(xe.prototype), x.freezeMethods(xe), x.inherits(Tn, ee, { __CANCEL__: !0 });
var Ph = ze.isStandardBrowserEnv ? { write: function(s, i, n, a, l, e) {
  const h = [];
  h.push(s + "=" + encodeURIComponent(i)), x.isNumber(n) && h.push("expires=" + new Date(n).toGMTString()), x.isString(a) && h.push("path=" + a), x.isString(l) && h.push("domain=" + l), e === !0 && h.push("secure"), document.cookie = h.join("; ");
}, read: function(s) {
  const i = document.cookie.match(new RegExp("(^|;\\s*)(" + s + ")=([^;]*)"));
  return i ? decodeURIComponent(i[3]) : null;
}, remove: function(s) {
  this.write(s, "", Date.now() - 864e5);
} } : { write: function() {
}, read: function() {
  return null;
}, remove: function() {
} };
function Va(s, i) {
  return s && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(i) ? function(n, a) {
    return a ? n.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, "") : n;
  }(s, i) : i;
}
var xh = ze.isStandardBrowserEnv ? function() {
  const s = /(msie|trident)/i.test(navigator.userAgent), i = document.createElement("a");
  let n;
  function a(l) {
    let e = l;
    return s && (i.setAttribute("href", e), e = i.href), i.setAttribute("href", e), { href: i.href, protocol: i.protocol ? i.protocol.replace(/:$/, "") : "", host: i.host, search: i.search ? i.search.replace(/^\?/, "") : "", hash: i.hash ? i.hash.replace(/^#/, "") : "", hostname: i.hostname, port: i.port, pathname: i.pathname.charAt(0) === "/" ? i.pathname : "/" + i.pathname };
  }
  return n = a(window.location.href), function(l) {
    const e = x.isString(l) ? a(l) : l;
    return e.protocol === n.protocol && e.host === n.host;
  };
}() : function() {
  return !0;
};
function bl(s, i) {
  let n = 0;
  const a = function(l, e) {
    l = l || 10;
    const h = new Array(l), f = new Array(l);
    let u, T = 0, g = 0;
    return e = e !== void 0 ? e : 1e3, function(A) {
      const S = Date.now(), L = f[g];
      u || (u = S), h[T] = A, f[T] = S;
      let w = g, y = 0;
      for (; w !== T; ) y += h[w++], w %= l;
      if (T = (T + 1) % l, T === g && (g = (g + 1) % l), S - u < e) return;
      const U = L && S - L;
      return U ? Math.round(1e3 * y / U) : void 0;
    };
  }(50, 250);
  return (l) => {
    const e = l.loaded, h = l.lengthComputable ? l.total : void 0, f = e - n, u = a(f);
    n = e;
    const T = { loaded: e, total: h, progress: h ? e / h : void 0, bytes: f, rate: u || void 0, estimated: u && h && e <= h ? (h - e) / u : void 0, event: l };
    T[i ? "download" : "upload"] = !0, s(T);
  };
}
var Uh = typeof XMLHttpRequest < "u" && function(s) {
  return new Promise(function(i, n) {
    let a = s.data;
    const l = xe.from(s.headers).normalize(), e = s.responseType;
    let h;
    function f() {
      s.cancelToken && s.cancelToken.unsubscribe(h), s.signal && s.signal.removeEventListener("abort", h);
    }
    x.isFormData(a) && (ze.isStandardBrowserEnv || ze.isStandardBrowserWebWorkerEnv) && l.setContentType(!1);
    let u = new XMLHttpRequest();
    if (s.auth) {
      const S = s.auth.username || "", L = s.auth.password ? unescape(encodeURIComponent(s.auth.password)) : "";
      l.set("Authorization", "Basic " + btoa(S + ":" + L));
    }
    const T = Va(s.baseURL, s.url);
    function g() {
      if (!u) return;
      const S = xe.from("getAllResponseHeaders" in u && u.getAllResponseHeaders());
      (function(L, w, y) {
        const U = y.config.validateStatus;
        y.status && U && !U(y.status) ? w(new ee("Request failed with status code " + y.status, [ee.ERR_BAD_REQUEST, ee.ERR_BAD_RESPONSE][Math.floor(y.status / 100) - 4], y.config, y.request, y)) : L(y);
      })(function(L) {
        i(L), f();
      }, function(L) {
        n(L), f();
      }, { data: e && e !== "text" && e !== "json" ? u.response : u.responseText, status: u.status, statusText: u.statusText, headers: S, config: s, request: u }), u = null;
    }
    if (u.open(s.method.toUpperCase(), ja(T, s.params, s.paramsSerializer), !0), u.timeout = s.timeout, "onloadend" in u ? u.onloadend = g : u.onreadystatechange = function() {
      u && u.readyState === 4 && (u.status !== 0 || u.responseURL && u.responseURL.indexOf("file:") === 0) && setTimeout(g);
    }, u.onabort = function() {
      u && (n(new ee("Request aborted", ee.ECONNABORTED, s, u)), u = null);
    }, u.onerror = function() {
      n(new ee("Network Error", ee.ERR_NETWORK, s, u)), u = null;
    }, u.ontimeout = function() {
      let S = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const L = s.transitional || Ba;
      s.timeoutErrorMessage && (S = s.timeoutErrorMessage), n(new ee(S, L.clarifyTimeoutError ? ee.ETIMEDOUT : ee.ECONNABORTED, s, u)), u = null;
    }, ze.isStandardBrowserEnv) {
      const S = (s.withCredentials || xh(T)) && s.xsrfCookieName && Ph.read(s.xsrfCookieName);
      S && l.set(s.xsrfHeaderName, S);
    }
    a === void 0 && l.setContentType(null), "setRequestHeader" in u && x.forEach(l.toJSON(), function(S, L) {
      u.setRequestHeader(L, S);
    }), x.isUndefined(s.withCredentials) || (u.withCredentials = !!s.withCredentials), e && e !== "json" && (u.responseType = s.responseType), typeof s.onDownloadProgress == "function" && u.addEventListener("progress", bl(s.onDownloadProgress, !0)), typeof s.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", bl(s.onUploadProgress)), (s.cancelToken || s.signal) && (h = (S) => {
      u && (n(!S || S.type ? new Tn(null, s, u) : S), u.abort(), u = null);
    }, s.cancelToken && s.cancelToken.subscribe(h), s.signal && (s.signal.aborted ? h() : s.signal.addEventListener("abort", h)));
    const A = function(S) {
      const L = /^([-+\w]{1,25})(:?\/\/|:)/.exec(S);
      return L && L[1] || "";
    }(T);
    A && ze.protocols.indexOf(A) === -1 ? n(new ee("Unsupported protocol " + A + ":", ee.ERR_BAD_REQUEST, s)) : u.send(a || null);
  });
};
const zn = { http: null, xhr: Uh };
x.forEach(zn, (s, i) => {
  if (s) {
    try {
      Object.defineProperty(s, "name", { value: i });
    } catch {
    }
    Object.defineProperty(s, "adapterName", { value: i });
  }
});
var kh = { getAdapter: (s) => {
  s = x.isArray(s) ? s : [s];
  const { length: i } = s;
  let n, a;
  for (let l = 0; l < i && (n = s[l], !(a = x.isString(n) ? zn[n.toLowerCase()] : n)); l++) ;
  if (!a)
    throw a === !1 ? new ee(`Adapter ${n} is not supported by the environment`, "ERR_NOT_SUPPORT") : new Error(x.hasOwnProp(zn, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`);
  if (!x.isFunction(a)) throw new TypeError("adapter is not a function");
  return a;
}, adapters: zn };
function Vs(s) {
  if (s.cancelToken && s.cancelToken.throwIfRequested(), s.signal && s.signal.aborted) throw new Tn(null, s);
}
function wl(s) {
  return Vs(s), s.headers = xe.from(s.headers), s.data = Gs.call(s, s.transformRequest), ["post", "put", "patch"].indexOf(s.method) !== -1 && s.headers.setContentType("application/x-www-form-urlencoded", !1), kh.getAdapter(s.adapter || Dt.adapter)(s).then(function(i) {
    return Vs(s), i.data = Gs.call(s, s.transformResponse, i), i.headers = xe.from(i.headers), i;
  }, function(i) {
    return Ga(i) || (Vs(s), i && i.response && (i.response.data = Gs.call(s, s.transformResponse, i.response), i.response.headers = xe.from(i.response.headers))), Promise.reject(i);
  });
}
const Il = (s) => s instanceof xe ? s.toJSON() : s;
function Lt(s, i) {
  i = i || {};
  const n = {};
  function a(T, g, A) {
    return x.isPlainObject(T) && x.isPlainObject(g) ? x.merge.call({ caseless: A }, T, g) : x.isPlainObject(g) ? x.merge({}, g) : x.isArray(g) ? g.slice() : g;
  }
  function l(T, g, A) {
    return x.isUndefined(g) ? x.isUndefined(T) ? void 0 : a(void 0, T, A) : a(T, g, A);
  }
  function e(T, g) {
    if (!x.isUndefined(g)) return a(void 0, g);
  }
  function h(T, g) {
    return x.isUndefined(g) ? x.isUndefined(T) ? void 0 : a(void 0, T) : a(void 0, g);
  }
  function f(T, g, A) {
    return A in i ? a(T, g) : A in s ? a(void 0, T) : void 0;
  }
  const u = { url: e, method: e, data: e, baseURL: h, transformRequest: h, transformResponse: h, paramsSerializer: h, timeout: h, timeoutMessage: h, withCredentials: h, adapter: h, responseType: h, xsrfCookieName: h, xsrfHeaderName: h, onUploadProgress: h, onDownloadProgress: h, decompress: h, maxContentLength: h, maxBodyLength: h, beforeRedirect: h, transport: h, httpAgent: h, httpsAgent: h, cancelToken: h, socketPath: h, responseEncoding: h, validateStatus: f, headers: (T, g) => l(Il(T), Il(g), !0) };
  return x.forEach(Object.keys(s).concat(Object.keys(i)), function(T) {
    const g = u[T] || l, A = g(s[T], i[T], T);
    x.isUndefined(A) && g !== f || (n[T] = A);
  }), n;
}
const Ka = "1.3.4", ri = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((s, i) => {
  ri[s] = function(n) {
    return typeof n === s || "a" + (i < 1 ? "n " : " ") + s;
  };
});
const Ol = {};
ri.transitional = function(s, i, n) {
  function a(l, e) {
    return "[Axios v" + Ka + "] Transitional option '" + l + "'" + e + (n ? ". " + n : "");
  }
  return (l, e, h) => {
    if (s === !1) throw new ee(a(e, " has been removed" + (i ? " in " + i : "")), ee.ERR_DEPRECATED);
    return i && !Ol[e] && (Ol[e] = !0, console.warn(a(e, " has been deprecated since v" + i + " and will be removed in the near future"))), !s || s(l, e, h);
  };
};
var Tr = { assertOptions: function(s, i, n) {
  if (typeof s != "object") throw new ee("options must be an object", ee.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(s);
  let l = a.length;
  for (; l-- > 0; ) {
    const e = a[l], h = i[e];
    if (h) {
      const f = s[e], u = f === void 0 || h(f, e, s);
      if (u !== !0) throw new ee("option " + e + " must be " + u, ee.ERR_BAD_OPTION_VALUE);
    } else if (n !== !0) throw new ee("Unknown option " + e, ee.ERR_BAD_OPTION);
  }
}, validators: ri };
const Qe = Tr.validators;
class mt {
  constructor(i) {
    this.defaults = i, this.interceptors = { request: new Rl(), response: new Rl() };
  }
  request(i, n) {
    typeof i == "string" ? (n = n || {}).url = i : n = i || {}, n = Lt(this.defaults, n);
    const { transitional: a, paramsSerializer: l, headers: e } = n;
    let h;
    a !== void 0 && Tr.assertOptions(a, { silentJSONParsing: Qe.transitional(Qe.boolean), forcedJSONParsing: Qe.transitional(Qe.boolean), clarifyTimeoutError: Qe.transitional(Qe.boolean) }, !1), l !== void 0 && Tr.assertOptions(l, { encode: Qe.function, serialize: Qe.function }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase(), h = e && x.merge(e.common, e[n.method]), h && x.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (w) => {
      delete e[w];
    }), n.headers = xe.concat(h, e);
    const f = [];
    let u = !0;
    this.interceptors.request.forEach(function(w) {
      typeof w.runWhen == "function" && w.runWhen(n) === !1 || (u = u && w.synchronous, f.unshift(w.fulfilled, w.rejected));
    });
    const T = [];
    let g;
    this.interceptors.response.forEach(function(w) {
      T.push(w.fulfilled, w.rejected);
    });
    let A, S = 0;
    if (!u) {
      const w = [wl.bind(this), void 0];
      for (w.unshift.apply(w, f), w.push.apply(w, T), A = w.length, g = Promise.resolve(n); S < A; ) g = g.then(w[S++], w[S++]);
      return g;
    }
    A = f.length;
    let L = n;
    for (S = 0; S < A; ) {
      const w = f[S++], y = f[S++];
      try {
        L = w(L);
      } catch (U) {
        y.call(this, U);
        break;
      }
    }
    try {
      g = wl.call(this, L);
    } catch (w) {
      return Promise.reject(w);
    }
    for (S = 0, A = T.length; S < A; ) g = g.then(T[S++], T[S++]);
    return g;
  }
  getUri(i) {
    return ja(Va((i = Lt(this.defaults, i)).baseURL, i.url), i.params, i.paramsSerializer);
  }
}
x.forEach(["delete", "get", "head", "options"], function(s) {
  mt.prototype[s] = function(i, n) {
    return this.request(Lt(n || {}, { method: s, url: i, data: (n || {}).data }));
  };
}), x.forEach(["post", "put", "patch"], function(s) {
  function i(n) {
    return function(a, l, e) {
      return this.request(Lt(e || {}, { method: s, headers: n ? { "Content-Type": "multipart/form-data" } : {}, url: a, data: l }));
    };
  }
  mt.prototype[s] = i(), mt.prototype[s + "Form"] = i(!0);
});
class ii {
  constructor(i) {
    if (typeof i != "function") throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(l) {
      n = l;
    });
    const a = this;
    this.promise.then((l) => {
      if (!a._listeners) return;
      let e = a._listeners.length;
      for (; e-- > 0; ) a._listeners[e](l);
      a._listeners = null;
    }), this.promise.then = (l) => {
      let e;
      const h = new Promise((f) => {
        a.subscribe(f), e = f;
      }).then(l);
      return h.cancel = function() {
        a.unsubscribe(e);
      }, h;
    }, i(function(l, e, h) {
      a.reason || (a.reason = new Tn(l, e, h), n(a.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(i) {
    this.reason ? i(this.reason) : this._listeners ? this._listeners.push(i) : this._listeners = [i];
  }
  unsubscribe(i) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(i);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let i;
    return { token: new ii(function(n) {
      i = n;
    }), cancel: i };
  }
}
const vr = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 };
Object.entries(vr).forEach(([s, i]) => {
  vr[i] = s;
});
const Se = function s(i) {
  const n = new mt(i), a = $a(mt.prototype.request, n);
  return x.extend(a, mt.prototype, n, { allOwnKeys: !0 }), x.extend(a, n, null, { allOwnKeys: !0 }), a.create = function(l) {
    return s(Lt(i, l));
  }, a;
}(Dt);
Se.Axios = mt, Se.CanceledError = Tn, Se.CancelToken = ii, Se.isCancel = Ga, Se.VERSION = Ka, Se.toFormData = ts, Se.AxiosError = ee, Se.Cancel = Se.CanceledError, Se.all = function(s) {
  return Promise.all(s);
}, Se.spread = function(s) {
  return function(i) {
    return s.apply(null, i);
  };
}, Se.isAxiosError = function(s) {
  return x.isObject(s) && s.isAxiosError === !0;
}, Se.mergeConfig = Lt, Se.AxiosHeaders = xe, Se.formToJSON = (s) => Wa(x.isHTMLForm(s) ? new FormData(s) : s), Se.HttpStatusCode = vr, Se.default = Se;
class Mh {
  constructor(i) {
    this.config = i;
  }
}
class Er extends Mh {
  constructor(i) {
    super(i), this.token = "", this.instance = Se.create(i), this.instance.interceptors.request.use((n) => {
      const a = this.token || K.get("token");
      return a && (n.headers.Authorization = a), n;
    }, (n) => Promise.reject(n)), this.instance.interceptors.response.use(function(n) {
      return n;
    }, function(n) {
      return Promise.reject(n);
    });
  }
}
class Nl extends Er {
  constructor(i) {
    super(i);
  }
}
var Oe = new class {
  constructor(s, i = "XHR") {
    this.get = (n, a) => re(this, void 0, void 0, function* () {
      return this.instance.get(n, { params: a });
    }), this.post = (n, a) => re(this, void 0, void 0, function* () {
      return this.instance.post(n, a);
    }), this.resetRequest = (n) => {
      n === "Fetch" ? this._request = new Nl(this._config) : this._request = new Er(this._config);
    }, this._config = s, i === "Fetch" ? this._request = new Nl(s) : this._request = new Er(s);
  }
  get instance() {
    return this._request.instance;
  }
  set config(s) {
    this._config = s, this._request.instance.defaults.baseURL = s.baseURL, this._request.instance.defaults.timeout = s.timeout;
  }
  set token(s) {
    this._request.token = s, K.set("token", s), this._request.instance.defaults.headers.Authorization = s;
  }
}({});
const $h = () => Oe.get("/v1.0/pbx/getproduct"), za = () => Oe.get("/v1.0/extension/getregisterinfo"), Fh = (s) => Oe.get("/v1.0/extension/getphoto", s), qh = (s) => Oe.get("/v1.0/contacts/matchall", s), Hh = (s) => Oe.post("/v1.0/systemlog/webclientlog", s), jh = { UNKNOWN_ERROR: { code: -1, msg: "UNKNOWN_ERROR", describe: "未知错误" }, INVALID_PBX_URL: { code: -2, msg: "INVALID_PBX_URL", describe: "pbxURL 不合法" }, PBX_URL_NOT_HTTPS: { code: -3, msg: "PBX_URL_NOT_HTTPS", describe: "pbxURL 不是https" }, GET_PRODUCT_FAILED: { code: -4, msg: "GET_PRODUCT_FAILED", describe: "获取PBX PRODUCT接口失败" } }, Bh = { SUCCESS: { code: 0, msg: "SUCCESS", describe: "成功" } }, Wh = { UNKNOWN_ERROR: { code: -100, msg: "UNKNOWN_ERROR", describe: "未知错误" }, REGISTRY_FAILED: { code: -101, msg: "REGISTRY_FAILED", describe: "注册失败" }, PBX_NETWORK_ERROR: { code: -102, msg: "PBX_NETWORK_ERROR", describe: "PBX接口请求错误" }, PBX_API_ERROR: { code: -103, msg: "PBX_API_ERROR", describe: "PBX接口错误，返回的错误不等于0" }, GET_PERSONAL_NOT_FOUND_DATA: { code: -104, msg: "GET_PERSONAL_NOT_FOUND_DATA", describe: "PBX未返回分机信息" }, PBX_ALREADY_INITIALIZED: { code: -105, msg: "PBX_ALREADY_INITIALIZED", describe: "PBX对象已初始化过，不许重复初始化" }, LINKUS_DISABLED: { code: -106, msg: "LINKUS_DISABLED", describe: "linkus 客户端未开启" }, LOGGED_IN_ELSEWHERE: { code: -107, msg: "LOGGED_IN_ELSEWHERE", describe: "在别处登录了" }, EXTENSION_DELETED: { code: -108, msg: "EXTENSION_DELETED", describe: "分机被删除了" }, RE_LOGIN: { code: -109, msg: "RE_LOGIN", describe: "重新登录" }, SDK_PLAN_DISABLED: { code: -110, msg: "SDK_PLAN_DISABLED", describe: "sdk plan未启用" } }, Gh = { SUCCESS: { code: 100, msg: "SUCCESS", describe: "PBX对象通用成功" } }, Vh = { UNKNOWN_ERROR: { code: -200, msg: "UNKNOWN_ERROR", describe: "未知错误" }, REGISTRY_FAILED: { code: -201, msg: "REGISTRY_FAILED", describe: "注册失败" }, GET_AGREE_CHROME_USER_MEDIA_ROLE_ERROR: { code: -202, msg: "GET_AGREE_CHROME_USER_MEDIA_ROLE_ERROR", describe: "获取媒体流失败（未获得授权）" }, GET_LOCAL_STREAM_ERROR: { code: -203, msg: "GET_LOCAL_STREAM_ERROR", describe: "获取媒体流失败" }, RE_REGISTRY_MAX_LIMIT_TIMES: { code: -204, msg: "RE_REGISTRY_MAX_LIMIT_TIMES", describe: "已达最大重试次数" }, MAX_LIMIT_CALL: { code: -205, msg: "MAX_LIMIT_CALL", describe: "已达最大通话数" }, GET_LOCAL_MEDIA_INFO_ERROR: { code: -206, msg: "GET_LOCAL_MEDIA_INFO_ERROR", describe: "获取本地媒体设备错误" }, ATTENDED_PARENT_NOT_FOUND: { code: -207, msg: "ATTENDED_PARENT_NOT_FOUND", describe: "咨询转父节点未找到" }, CALL_TOO_MANY_TIMES: { code: -208, msg: "CALL_TOO_MANY_TIMES", describe: "1秒钟内呼出太多次" }, INVALID_NUMBER: { code: -209, msg: "INVALID_NUMBER", describe: "非法号码" }, CURRENT_CALL_HAS_NOT_CONNECTED: { code: -210, msg: "CURRENT_CALL_HAS_NOT_CONNECTED", describe: "当前有未接通的电话" }, NOT_FOUND_CALL_ID: { code: -211, msg: "NOT_FOUND_CALL_ID", describe: "未找到通话id" }, NOT_FOUND_AUDIO_INPUT_DEVICE: { code: -290, msg: "NOT_FOUND_AUDIO_INPUT_DEVICE", describe: "未找到音频输入设备" }, NOT_FOUND_VIDEO_INPUT_DEVICE: { code: -291, msg: "NOT_FOUND_VIDEO_INPUT_DEVICE", describe: "未找到视频输入设备" } }, Kh = { SUCCESS: { code: 200, msg: "SUCCESS", describe: "Phone对象通用成功" } };
var Dl;
(function(s) {
  s[s.RECORD_FEATURE_CODE = 20008] = "RECORD_FEATURE_CODE", s[s.REGISTRY_INFO_CHANGE = 20066] = "REGISTRY_INFO_CHANGE", s[s.RECORD_PERMISSIONS_CHANGE = 20047] = "RECORD_PERMISSIONS_CHANGE", s[s.CALL_STATUS_CHANGE = 20048] = "CALL_STATUS_CHANGE";
})(Dl || (Dl = {}));
class Pt {
  constructor(i, n) {
    this.code = i[n].code, this.message = i[n].msg;
  }
}
class Ks {
  static error(i) {
    return new Pt(jh, i);
  }
  static success(i) {
    return new Pt(Bh, i);
  }
}
class Ie {
  static error(i) {
    return new Pt(Wh, i);
  }
  static success(i) {
    return new Pt(Gh, i);
  }
}
class ge {
  static error(i) {
    return new Pt(Vh, i);
  }
  static success(i) {
    return new Pt(Kh, i);
  }
}
var Ja, Tt = {}, zh = { get exports() {
  return Tt;
}, set exports(s) {
  Tt = s;
} }, wt = typeof Reflect == "object" ? Reflect : null, Ll = wt && typeof wt.apply == "function" ? wt.apply : function(s, i, n) {
  return Function.prototype.apply.call(s, i, n);
};
Ja = wt && typeof wt.ownKeys == "function" ? wt.ownKeys : Object.getOwnPropertySymbols ? function(s) {
  return Object.getOwnPropertyNames(s).concat(Object.getOwnPropertySymbols(s));
} : function(s) {
  return Object.getOwnPropertyNames(s);
};
var Pl = Number.isNaN || function(s) {
  return s != s;
};
function le() {
  le.init.call(this);
}
zh.exports = le, Tt.once = function(s, i) {
  return new Promise(function(n, a) {
    function l(h) {
      s.removeListener(i, e), a(h);
    }
    function e() {
      typeof s.removeListener == "function" && s.removeListener("error", l), n([].slice.call(arguments));
    }
    Fl(s, i, e, { once: !0 }), i !== "error" && function(h, f, u) {
      typeof h.on == "function" && Fl(h, "error", f, u);
    }(s, l, { once: !0 });
  });
}, le.EventEmitter = le, le.prototype._events = void 0, le.prototype._eventsCount = 0, le.prototype._maxListeners = void 0;
var xl = 10;
function Jn(s) {
  if (typeof s != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof s);
}
function Xa(s) {
  return s._maxListeners === void 0 ? le.defaultMaxListeners : s._maxListeners;
}
function Ul(s, i, n, a) {
  var l, e, h, f;
  if (Jn(n), (e = s._events) === void 0 ? (e = s._events = /* @__PURE__ */ Object.create(null), s._eventsCount = 0) : (e.newListener !== void 0 && (s.emit("newListener", i, n.listener ? n.listener : n), e = s._events), h = e[i]), h === void 0) h = e[i] = n, ++s._eventsCount;
  else if (typeof h == "function" ? h = e[i] = a ? [n, h] : [h, n] : a ? h.unshift(n) : h.push(n), (l = Xa(s)) > 0 && h.length > l && !h.warned) {
    h.warned = !0;
    var u = new Error("Possible EventEmitter memory leak detected. " + h.length + " " + String(i) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    u.name = "MaxListenersExceededWarning", u.emitter = s, u.type = i, u.count = h.length, f = u, console && console.warn && console.warn(f);
  }
  return s;
}
function Jh() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function kl(s, i, n) {
  var a = { fired: !1, wrapFn: void 0, target: s, type: i, listener: n }, l = Jh.bind(a);
  return l.listener = n, a.wrapFn = l, l;
}
function Ml(s, i, n) {
  var a = s._events;
  if (a === void 0) return [];
  var l = a[i];
  return l === void 0 ? [] : typeof l == "function" ? n ? [l.listener || l] : [l] : n ? function(e) {
    for (var h = new Array(e.length), f = 0; f < h.length; ++f) h[f] = e[f].listener || e[f];
    return h;
  }(l) : Ya(l, l.length);
}
function $l(s) {
  var i = this._events;
  if (i !== void 0) {
    var n = i[s];
    if (typeof n == "function") return 1;
    if (n !== void 0) return n.length;
  }
  return 0;
}
function Ya(s, i) {
  for (var n = new Array(i), a = 0; a < i; ++a) n[a] = s[a];
  return n;
}
function Fl(s, i, n, a) {
  if (typeof s.on == "function") a.once ? s.once(i, n) : s.on(i, n);
  else {
    if (typeof s.addEventListener != "function") throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof s);
    s.addEventListener(i, function l(e) {
      a.once && s.removeEventListener(i, l), n(e);
    });
  }
}
Object.defineProperty(le, "defaultMaxListeners", { enumerable: !0, get: function() {
  return xl;
}, set: function(s) {
  if (typeof s != "number" || s < 0 || Pl(s)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + s + ".");
  xl = s;
} }), le.init = function() {
  this._events !== void 0 && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, le.prototype.setMaxListeners = function(s) {
  if (typeof s != "number" || s < 0 || Pl(s)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + s + ".");
  return this._maxListeners = s, this;
}, le.prototype.getMaxListeners = function() {
  return Xa(this);
}, le.prototype.emit = function(s) {
  for (var i = [], n = 1; n < arguments.length; n++) i.push(arguments[n]);
  var a = s === "error", l = this._events;
  if (l !== void 0) a = a && l.error === void 0;
  else if (!a) return !1;
  if (a) {
    var e;
    if (i.length > 0 && (e = i[0]), e instanceof Error) throw e;
    var h = new Error("Unhandled error." + (e ? " (" + e.message + ")" : ""));
    throw h.context = e, h;
  }
  var f = l[s];
  if (f === void 0) return !1;
  if (typeof f == "function") Ll(f, this, i);
  else {
    var u = f.length, T = Ya(f, u);
    for (n = 0; n < u; ++n) Ll(T[n], this, i);
  }
  return !0;
}, le.prototype.addListener = function(s, i) {
  return Ul(this, s, i, !1);
}, le.prototype.on = le.prototype.addListener, le.prototype.prependListener = function(s, i) {
  return Ul(this, s, i, !0);
}, le.prototype.once = function(s, i) {
  return Jn(i), this.on(s, kl(this, s, i)), this;
}, le.prototype.prependOnceListener = function(s, i) {
  return Jn(i), this.prependListener(s, kl(this, s, i)), this;
}, le.prototype.removeListener = function(s, i) {
  var n, a, l, e, h;
  if (Jn(i), (a = this._events) === void 0) return this;
  if ((n = a[s]) === void 0) return this;
  if (n === i || n.listener === i) --this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete a[s], a.removeListener && this.emit("removeListener", s, n.listener || i));
  else if (typeof n != "function") {
    for (l = -1, e = n.length - 1; e >= 0; e--) if (n[e] === i || n[e].listener === i) {
      h = n[e].listener, l = e;
      break;
    }
    if (l < 0) return this;
    l === 0 ? n.shift() : function(f, u) {
      for (; u + 1 < f.length; u++) f[u] = f[u + 1];
      f.pop();
    }(n, l), n.length === 1 && (a[s] = n[0]), a.removeListener !== void 0 && this.emit("removeListener", s, h || i);
  }
  return this;
}, le.prototype.off = le.prototype.removeListener, le.prototype.removeAllListeners = function(s) {
  var i, n, a;
  if ((n = this._events) === void 0) return this;
  if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[s] !== void 0 && (--this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[s]), this;
  if (arguments.length === 0) {
    var l, e = Object.keys(n);
    for (a = 0; a < e.length; ++a) (l = e[a]) !== "removeListener" && this.removeAllListeners(l);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (typeof (i = n[s]) == "function") this.removeListener(s, i);
  else if (i !== void 0) for (a = i.length - 1; a >= 0; a--) this.removeListener(s, i[a]);
  return this;
}, le.prototype.listeners = function(s) {
  return Ml(this, s, !0);
}, le.prototype.rawListeners = function(s) {
  return Ml(this, s, !1);
}, le.listenerCount = function(s, i) {
  return typeof s.listenerCount == "function" ? s.listenerCount(i) : $l.call(s, i);
}, le.prototype.listenerCount = $l, le.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Ja(this._events) : [];
};
var Cr = { title: "JsSIP", version: "1.3.1" }, Ae = { USER_AGENT: `${Cr.title} ${Cr.version}`, SIP: "sip", SIPS: "sips", causes: { CONNECTION_ERROR: "Connection Error", REQUEST_TIMEOUT: "Request Timeout", SIP_FAILURE_CODE: "SIP Failure Code", INTERNAL_ERROR: "Internal Error", BUSY: "Busy", REJECTED: "Rejected", REDIRECTED: "Redirected", UNAVAILABLE: "Unavailable", NOT_FOUND: "Not Found", ADDRESS_INCOMPLETE: "Address Incomplete", INCOMPATIBLE_SDP: "Incompatible SDP", MISSING_SDP: "Missing SDP", AUTHENTICATION_ERROR: "Authentication Error", BYE: "Terminated", WEBRTC_ERROR: "WebRTC Error", CANCELED: "Canceled", NO_ANSWER: "No Answer", EXPIRES: "Expires", NO_ACK: "No ACK", DIALOG_ERROR: "Dialog Error", USER_DENIED_MEDIA_ACCESS: "User Denied Media Access", BAD_MEDIA_DESCRIPTION: "Bad Media Description", RTP_TIMEOUT: "RTP Timeout" }, SIP_ERROR_CAUSES: { REDIRECTED: [300, 301, 302, 305, 380], BUSY: [486, 600], REJECTED: [403, 603], NOT_FOUND: [404, 604], UNAVAILABLE: [480, 410, 408, 430], ADDRESS_INCOMPLETE: [484, 424], INCOMPATIBLE_SDP: [488, 606], AUTHENTICATION_ERROR: [401, 407] }, ACK: "ACK", BYE: "BYE", CANCEL: "CANCEL", INFO: "INFO", INVITE: "INVITE", MESSAGE: "MESSAGE", NOTIFY: "NOTIFY", OPTIONS: "OPTIONS", REGISTER: "REGISTER", REFER: "REFER", UPDATE: "UPDATE", SUBSCRIBE: "SUBSCRIBE", DTMF_TRANSPORT: { INFO: "INFO", RFC2833: "RFC2833" }, REASON_PHRASE: { 100: "Trying", 180: "Ringing", 181: "Call Is Being Forwarded", 182: "Queued", 183: "Session Progress", 199: "Early Dialog Terminated", 200: "OK", 202: "Accepted", 204: "No Notification", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Moved Temporarily", 305: "Use Proxy", 380: "Alternative Service", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 410: "Gone", 412: "Conditional Request Failed", 413: "Request Entity Too Large", 414: "Request-URI Too Long", 415: "Unsupported Media Type", 416: "Unsupported URI Scheme", 417: "Unknown Resource-Priority", 420: "Bad Extension", 421: "Extension Required", 422: "Session Interval Too Small", 423: "Interval Too Brief", 424: "Bad Location Information", 428: "Use Identity Header", 429: "Provide Referrer Identity", 430: "Flow Failed", 433: "Anonymity Disallowed", 436: "Bad Identity-Info", 437: "Unsupported Certificate", 438: "Invalid Identity Header", 439: "First Hop Lacks Outbound Support", 440: "Max-Breadth Exceeded", 469: "Bad Info Package", 470: "Consent Needed", 478: "Unresolvable Destination", 480: "Temporarily Unavailable", 481: "Call/Transaction Does Not Exist", 482: "Loop Detected", 483: "Too Many Hops", 484: "Address Incomplete", 485: "Ambiguous", 486: "Busy Here", 487: "Request Terminated", 488: "Not Acceptable Here", 489: "Bad Event", 491: "Request Pending", 493: "Undecipherable", 494: "Security Agreement Required", 500: "JsSIP Internal Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Server Time-out", 505: "Version Not Supported", 513: "Message Too Large", 580: "Precondition Failure", 600: "Busy Everywhere", 603: "Decline", 604: "Does Not Exist Anywhere", 606: "Not Acceptable" }, ALLOWED_METHODS: "INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO,NOTIFY", ACCEPTED_BODY_TYPES: "application/sdp, application/dtmf-relay", MAX_FORWARDS: 69, SESSION_EXPIRES: 90, MIN_SESSION_EXPIRES: 60, CONNECTION_RECOVERY_MAX_INTERVAL: 30, CONNECTION_RECOVERY_MIN_INTERVAL: 2 };
class Xh extends Error {
  constructor(i, n) {
    super(), this.code = 1, this.name = "CONFIGURATION_ERROR", this.parameter = i, this.value = n, this.message = this.value ? `Invalid value ${JSON.stringify(this.value)} for parameter "${this.parameter}"` : `Missing parameter: ${this.parameter}`;
  }
}
class Yh extends Error {
  constructor(i) {
    super(), this.code = 2, this.name = "INVALID_STATE_ERROR", this.status = i, this.message = `Invalid status: ${i}`;
  }
}
class Qh extends Error {
  constructor(i) {
    super(), this.code = 3, this.name = "NOT_SUPPORTED_ERROR", this.message = i;
  }
}
class Zh extends Error {
  constructor(i) {
    super(), this.code = 4, this.name = "NOT_READY_ERROR", this.message = i;
  }
}
var zs, ql, Hl, jl, Js, Bl, Wl, vt = { ConfigurationError: Xh, InvalidStateError: Yh, NotSupportedError: Qh, NotReadyError: Zh }, _e = {};
function oi() {
  if (ql) return zs;
  ql = 1;
  const s = Et(), i = je();
  return zs = class Qa {
    static parse(a) {
      return (a = i.parse(a, "Name_Addr_Header")) !== -1 ? a : void 0;
    }
    constructor(a, l, e) {
      if (!(a && a instanceof s)) throw new TypeError('missing or invalid "uri" parameter');
      this._uri = a, this._parameters = {}, this.display_name = l;
      for (const h in e) Object.prototype.hasOwnProperty.call(e, h) && this.setParam(h, e[h]);
    }
    get uri() {
      return this._uri;
    }
    get display_name() {
      return this._display_name;
    }
    set display_name(a) {
      this._display_name = a === 0 ? "0" : a;
    }
    setParam(a, l) {
      a && (this._parameters[a.toLowerCase()] = l == null ? null : l.toString());
    }
    getParam(a) {
      if (a) return this._parameters[a.toLowerCase()];
    }
    hasParam(a) {
      if (a) return !!this._parameters.hasOwnProperty(a.toLowerCase());
    }
    deleteParam(a) {
      if (a = a.toLowerCase(), this._parameters.hasOwnProperty(a)) {
        const l = this._parameters[a];
        return delete this._parameters[a], l;
      }
    }
    clearParams() {
      this._parameters = {};
    }
    clone() {
      return new Qa(this._uri.clone(), this._display_name, JSON.parse(JSON.stringify(this._parameters)));
    }
    _quote(a) {
      return a.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    }
    toString() {
      let a = this._display_name ? `"${this._quote(this._display_name)}" ` : "";
      a += `<${this._uri.toString()}>`;
      for (const l in this._parameters) Object.prototype.hasOwnProperty.call(this._parameters, l) && (a += `;${l}`, this._parameters[l] !== null && (a += `=${this._parameters[l]}`));
      return a;
    }
  }, zs;
}
function je() {
  return jl || (jl = 1, Hl = function() {
    function s(n) {
      return '"' + n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"';
    }
    var i = { parse: function(n, a) {
      var l = { CRLF: T, DIGIT: g, ALPHA: A, HEXDIG: S, WSP: L, OCTET: w, DQUOTE: y, SP: U, HTAB: O, alphanum: z, reserved: k, unreserved: _, mark: m, escaped: v, LWS: E, SWS: I, HCOLON: D, TEXT_UTF8_TRIM: $, TEXT_UTF8char: M, UTF8_NONASCII: B, UTF8_CONT: V, LHEX: function() {
        var t;
        return (t = g()) === null && (/^[a-f]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[a-f]"))), t;
      }, token: q, token_nodot: Q, separators: function() {
        var t;
        return n.charCodeAt(e) === 40 ? (t = "(", e++) : (t = null, u('"("')), t === null && (n.charCodeAt(e) === 41 ? (t = ")", e++) : (t = null, u('")"')), t === null && (n.charCodeAt(e) === 60 ? (t = "<", e++) : (t = null, u('"<"')), t === null && (n.charCodeAt(e) === 62 ? (t = ">", e++) : (t = null, u('">"')), t === null && (n.charCodeAt(e) === 64 ? (t = "@", e++) : (t = null, u('"@"')), t === null && (n.charCodeAt(e) === 44 ? (t = ",", e++) : (t = null, u('","')), t === null && (n.charCodeAt(e) === 59 ? (t = ";", e++) : (t = null, u('";"')), t === null && (n.charCodeAt(e) === 58 ? (t = ":", e++) : (t = null, u('":"')), t === null && (n.charCodeAt(e) === 92 ? (t = "\\", e++) : (t = null, u('"\\\\"')), t === null && (t = y()) === null && (n.charCodeAt(e) === 47 ? (t = "/", e++) : (t = null, u('"/"')), t === null && (n.charCodeAt(e) === 91 ? (t = "[", e++) : (t = null, u('"["')), t === null && (n.charCodeAt(e) === 93 ? (t = "]", e++) : (t = null, u('"]"')), t === null && (n.charCodeAt(e) === 63 ? (t = "?", e++) : (t = null, u('"?"')), t === null && (n.charCodeAt(e) === 61 ? (t = "=", e++) : (t = null, u('"="')), t === null && (n.charCodeAt(e) === 123 ? (t = "{", e++) : (t = null, u('"{"')), t === null && (n.charCodeAt(e) === 125 ? (t = "}", e++) : (t = null, u('"}"')), t === null && (t = U()) === null && (t = O())))))))))))))))), t;
      }, word: he, STAR: fe, SLASH: De, EQUAL: H, LPAREN: Me, RPAREN: Xe, RAQUOT: ls, LAQUOT: as, COMMA: de, SEMI: se, COLON: hi, LDQUOT: us, RDQUOT: cs, comment: function t() {
        var r, o, c, d;
        if (d = e, (r = Me()) !== null) {
          for (o = [], (c = hs()) === null && (c = st()) === null && (c = t()); c !== null; ) o.push(c), (c = hs()) === null && (c = st()) === null && (c = t());
          o !== null && (c = Xe()) !== null ? r = [r, o, c] : (r = null, e = d);
        } else r = null, e = d;
        return r;
      }, ctext: hs, quoted_string: vn, quoted_string_clean: xt, qdtext: Ut, quoted_pair: st, SIP_URI_noparams: kt, SIP_URI: En, uri_scheme: ds, uri_scheme_sips: di, uri_scheme_sip: fi, userinfo: Cn, user: _i, user_unreserved: fs, password: pi, hostport: Sn, host: Mt, hostname: _s, domainlabel: ps, toplabel: mi, IPv6reference: ms, IPv6address: gs, h16: G, ls32: Le, IPv4address: $t, dec_octet: Ft, port: gi, uri_parameters: Ti, uri_parameter: Ts, transport_param: vi, user_param: Ei, method_param: Ci, ttl_param: Si, maddr_param: Ai, lr_param: Ri, other_param: yi, pname: bi, pvalue: wi, paramchar: qt, param_unreserved: Ii, headers: Oi, header: An, hname: Ni, hvalue: Di, hnv_unreserved: Ht, Request_Response: function() {
        var t;
        return (t = Zi()) === null && (t = Li()), t;
      }, Request_Line: Li, Request_URI: Pi, absoluteURI: vs, hier_part: xi, net_path: Ui, abs_path: Rn, opaque_part: ki, uric: jt, uric_no_slash: Mi, path_segments: $i, segment: yn, param: Es, pchar: Bt, scheme: Fi, authority: qi, srvr: Hi, reg_name: ji, query: Bi, SIP_Version: Cs, INVITEm: Wi, ACKm: Gi, OPTIONSm: Vi, BYEm: Ki, CANCELm: zi, REGISTERm: Ji, SUBSCRIBEm: Xi, NOTIFYm: Yi, REFERm: Qi, Method: bn, Status_Line: Zi, Status_Code: eo, extension_code: to, Reason_Phrase: no, Allow_Events: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = Wt()) !== null) {
          for (r = [], p = e, (o = de()) !== null && (c = Wt()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = de()) !== null && (c = Wt()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, Call_ID: function() {
        var t, r, o, c, d, p;
        return c = e, d = e, (t = he()) !== null ? (p = e, n.charCodeAt(e) === 64 ? (r = "@", e++) : (r = null, u('"@"')), r !== null && (o = he()) !== null ? r = [r, o] : (r = null, e = p), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = function(C) {
          R = n.substring(e, C);
        }(c)), t === null && (e = c), t;
      }, Contact: function() {
        var t, r, o, c, d, p, C;
        if (d = e, (t = fe()) === null) if (p = e, (t = wn()) !== null) {
          for (r = [], C = e, (o = de()) !== null && (c = wn()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = de()) !== null && (c = wn()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          var j, X;
          for (X = R.multi_header.length, j = 0; j < X; j++) if (R.multi_header[j].parsed === null) {
            R = null;
            break;
          }
          R = R !== null ? R.multi_header : -1;
        }()), t === null && (e = d), t;
      }, contact_param: wn, name_addr: rt, display_name: In, contact_params: Ss, c_p_q: so, c_p_expires: ro, delta_seconds: it, qvalue: io, generic_param: Te, gen_value: oo, Content_Disposition: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = lo()) !== null) {
          for (r = [], p = e, (o = se()) !== null && (c = As()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = se()) !== null && (c = As()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, disp_type: lo, disp_param: As, handling_param: ao, Content_Encoding: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = q()) !== null) {
          for (r = [], p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, Content_Length: function() {
        var t, r, o;
        if (o = e, (r = g()) !== null) for (t = []; r !== null; ) t.push(r), r = g();
        else t = null;
        return t !== null && (t = void (R = parseInt(t.join("")))), t === null && (e = o), t;
      }, Content_Type: function() {
        var t, r;
        return r = e, (t = uo()) !== null && (t = function(o) {
          R = n.substring(e, o);
        }(r)), t === null && (e = r), t;
      }, media_type: uo, m_type: co, discrete_type: ho, composite_type: fo, extension_token: On, x_token: _o, m_subtype: po, m_parameter: Rs, m_value: mo, CSeq: function() {
        var t, r, o, c;
        return c = e, (t = go()) !== null && (r = E()) !== null && (o = bn()) !== null ? t = [t, r, o] : (t = null, e = c), t;
      }, CSeq_value: go, Expires: function() {
        var t, r;
        return r = e, (t = it()) !== null && (t = void (R = t)), t === null && (e = r), t;
      }, Event: function() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (t = Wt()) !== null) {
          for (r = [], C = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        t !== null && (N = t[0], t = void (R.event = N.join("").toLowerCase()));
        var N;
        return t === null && (e = d), t;
      }, event_type: Wt, From: function() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (t = kt()) === null && (t = rt()), t !== null) {
          for (r = [], C = e, (o = se()) !== null && (c = ys()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = se()) !== null && (c = ys()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          var j = R.tag;
          try {
            R = new St(R.uri, R.display_name, R.params), j && R.setParam("tag", j);
          } catch {
            R = -1;
          }
        }()), t === null && (e = d), t;
      }, from_param: ys, tag_param: bs, Max_Forwards: function() {
        var t, r, o;
        if (o = e, (r = g()) !== null) for (t = []; r !== null; ) t.push(r), r = g();
        else t = null;
        return t !== null && (t = void (R = parseInt(t.join("")))), t === null && (e = o), t;
      }, Min_Expires: function() {
        var t, r;
        return r = e, (t = it()) !== null && (t = void (R = t)), t === null && (e = r), t;
      }, Name_Addr_Header: function() {
        var t, r, o, c, d, p, C, N, j, X;
        for (N = e, j = e, t = [], r = In(); r !== null; ) t.push(r), r = In();
        if (t !== null) if ((r = as()) !== null) if ((o = En()) !== null) if ((c = ls()) !== null) {
          for (d = [], X = e, (p = se()) !== null && (C = Te()) !== null ? p = [p, C] : (p = null, e = X); p !== null; ) d.push(p), X = e, (p = se()) !== null && (C = Te()) !== null ? p = [p, C] : (p = null, e = X);
          d !== null ? t = [t, r, o, c, d] : (t = null, e = j);
        } else t = null, e = j;
        else t = null, e = j;
        else t = null, e = j;
        else t = null, e = j;
        return t !== null && (t = function(we) {
          try {
            R = new St(R.uri, R.display_name, R.params);
          } catch {
            R = -1;
          }
        }()), t === null && (e = N), t;
      }, Proxy_Authenticate: function() {
        return ws();
      }, challenge: ws, other_challenge: To, auth_param: Gt, digest_cln: Nn, realm: vo, realm_value: Eo, domain: Co, URI: Dn, nonce: So, nonce_value: Ao, opaque: Ro, stale: yo, algorithm: bo, qop_options: wo, qop_value: Ln, Proxy_Require: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = q()) !== null) {
          for (r = [], p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, Record_Route: function() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (t = Pn()) !== null) {
          for (r = [], C = e, (o = de()) !== null && (c = Pn()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = de()) !== null && (c = Pn()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          var j, X;
          for (X = R.multi_header.length, j = 0; j < X; j++) if (R.multi_header[j].parsed === null) {
            R = null;
            break;
          }
          R = R !== null ? R.multi_header : -1;
        }()), t === null && (e = d), t;
      }, rec_route: Pn, Reason: function() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, n.substr(e, 3).toLowerCase() === "sip" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"SIP"')), t === null && (t = q()), t !== null) {
          for (r = [], C = e, (o = se()) !== null && (c = Is()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = se()) !== null && (c = Is()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N, j) {
          if (R.protocol = j.toLowerCase(), R.params || (R.params = {}), R.params.text && R.params.text[0] === '"') {
            var X = R.params.text;
            R.text = X.substring(1, X.length - 1), delete R.params.text;
          }
        }(0, t[0])), t === null && (e = d), t;
      }, reason_param: Is, reason_cause: Io, Require: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = q()) !== null) {
          for (r = [], p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, Route: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = xn()) !== null) {
          for (r = [], p = e, (o = de()) !== null && (c = xn()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = de()) !== null && (c = xn()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, route_param: xn, Subscription_State: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = Oo()) !== null) {
          for (r = [], p = e, (o = se()) !== null && (c = Os()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = se()) !== null && (c = Os()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, substate_value: Oo, subexp_params: Os, event_reason_value: No, Subject: function() {
        var t;
        return t = (t = $()) !== null ? t : "";
      }, Supported: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = q()) !== null) {
          for (r = [], p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = de()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t = t !== null ? t : "";
      }, To: function() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (t = kt()) === null && (t = rt()), t !== null) {
          for (r = [], C = e, (o = se()) !== null && (c = Ns()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = se()) !== null && (c = Ns()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          var j = R.tag;
          try {
            R = new St(R.uri, R.display_name, R.params), j && R.setParam("tag", j);
          } catch {
            R = -1;
          }
        }()), t === null && (e = d), t;
      }, to_param: Ns, Via: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = Un()) !== null) {
          for (r = [], p = e, (o = de()) !== null && (c = Un()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = de()) !== null && (c = Un()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, via_param: Un, via_params: Ds, via_ttl: Do, via_maddr: Lo, via_received: Po, via_branch: xo, response_port: Uo, rport: ko, sent_protocol: Mo, protocol_name: $o, transport: Fo, sent_by: qo, via_host: Ho, via_port: jo, ttl: Ls, WWW_Authenticate: function() {
        return ws();
      }, Session_Expires: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = Bo()) !== null) {
          for (r = [], p = e, (o = se()) !== null && (c = Ps()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = se()) !== null && (c = Ps()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, s_e_expires: Bo, s_e_params: Ps, s_e_refresher: Wo, extension_header: function() {
        var t, r, o, c;
        return c = e, (t = q()) !== null && (r = D()) !== null && (o = Go()) !== null ? t = [t, r, o] : (t = null, e = c), t;
      }, header_value: Go, message_body: function() {
        var t, r;
        for (t = [], r = w(); r !== null; ) t.push(r), r = w();
        return t;
      }, uuid_URI: function() {
        var t, r, o;
        return o = e, n.substr(e, 5) === "uuid:" ? (t = "uuid:", e += 5) : (t = null, u('"uuid:"')), t !== null && (r = Vo()) !== null ? t = [t, r] : (t = null, e = o), t;
      }, uuid: Vo, hex4: Be, hex8: Ko, hex12: zo, Refer_To: function() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (t = kt()) === null && (t = rt()), t !== null) {
          for (r = [], C = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          try {
            R = new St(R.uri, R.display_name, R.params);
          } catch {
            R = -1;
          }
        }()), t === null && (e = d), t;
      }, Replaces: function() {
        var t, r, o, c, d, p;
        if (d = e, (t = Jo()) !== null) {
          for (r = [], p = e, (o = se()) !== null && (c = xs()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = se()) !== null && (c = xs()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }, call_id: Jo, replaces_param: xs, to_tag: Xo, from_tag: Yo, early_flag: Qo };
      if (a !== void 0) {
        if (l[a] === void 0) throw new Error("Invalid rule name: " + s(a) + ".");
      } else a = "CRLF";
      var e = 0, h = 0, f = [];
      function u(t) {
        e < h || (e > h && (h = e, f = []), f.push(t));
      }
      function T() {
        var t;
        return n.substr(e, 2) === `\r
` ? (t = `\r
`, e += 2) : (t = null, u('"\\r\\n"')), t;
      }
      function g() {
        var t;
        return /^[0-9]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[0-9]")), t;
      }
      function A() {
        var t;
        return /^[a-zA-Z]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[a-zA-Z]")), t;
      }
      function S() {
        var t;
        return /^[0-9a-fA-F]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[0-9a-fA-F]")), t;
      }
      function L() {
        var t;
        return (t = U()) === null && (t = O()), t;
      }
      function w() {
        var t;
        return /^[\0-\xFF]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[\\0-\\xFF]")), t;
      }
      function y() {
        var t;
        return /^["]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u('["]')), t;
      }
      function U() {
        var t;
        return n.charCodeAt(e) === 32 ? (t = " ", e++) : (t = null, u('" "')), t;
      }
      function O() {
        var t;
        return n.charCodeAt(e) === 9 ? (t = "	", e++) : (t = null, u('"\\t"')), t;
      }
      function z() {
        var t;
        return /^[a-zA-Z0-9]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[a-zA-Z0-9]")), t;
      }
      function k() {
        var t;
        return n.charCodeAt(e) === 59 ? (t = ";", e++) : (t = null, u('";"')), t === null && (n.charCodeAt(e) === 47 ? (t = "/", e++) : (t = null, u('"/"')), t === null && (n.charCodeAt(e) === 63 ? (t = "?", e++) : (t = null, u('"?"')), t === null && (n.charCodeAt(e) === 58 ? (t = ":", e++) : (t = null, u('":"')), t === null && (n.charCodeAt(e) === 64 ? (t = "@", e++) : (t = null, u('"@"')), t === null && (n.charCodeAt(e) === 38 ? (t = "&", e++) : (t = null, u('"&"')), t === null && (n.charCodeAt(e) === 61 ? (t = "=", e++) : (t = null, u('"="')), t === null && (n.charCodeAt(e) === 43 ? (t = "+", e++) : (t = null, u('"+"')), t === null && (n.charCodeAt(e) === 36 ? (t = "$", e++) : (t = null, u('"$"')), t === null && (n.charCodeAt(e) === 44 ? (t = ",", e++) : (t = null, u('","'))))))))))), t;
      }
      function _() {
        var t;
        return (t = z()) === null && (t = m()), t;
      }
      function m() {
        var t;
        return n.charCodeAt(e) === 45 ? (t = "-", e++) : (t = null, u('"-"')), t === null && (n.charCodeAt(e) === 95 ? (t = "_", e++) : (t = null, u('"_"')), t === null && (n.charCodeAt(e) === 46 ? (t = ".", e++) : (t = null, u('"."')), t === null && (n.charCodeAt(e) === 33 ? (t = "!", e++) : (t = null, u('"!"')), t === null && (n.charCodeAt(e) === 126 ? (t = "~", e++) : (t = null, u('"~"')), t === null && (n.charCodeAt(e) === 42 ? (t = "*", e++) : (t = null, u('"*"')), t === null && (n.charCodeAt(e) === 39 ? (t = "'", e++) : (t = null, u(`"'"`)), t === null && (n.charCodeAt(e) === 40 ? (t = "(", e++) : (t = null, u('"("')), t === null && (n.charCodeAt(e) === 41 ? (t = ")", e++) : (t = null, u('")"')))))))))), t;
      }
      function v() {
        var t, r, o, c, d;
        return c = e, d = e, n.charCodeAt(e) === 37 ? (t = "%", e++) : (t = null, u('"%"')), t !== null && (r = S()) !== null && (o = S()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (t = t.join("")), t === null && (e = c), t;
      }
      function E() {
        var t, r, o, c, d, p;
        for (c = e, d = e, p = e, t = [], r = L(); r !== null; ) t.push(r), r = L();
        if (t !== null && (r = T()) !== null ? t = [t, r] : (t = null, e = p), (t = t !== null ? t : "") !== null) {
          if ((o = L()) !== null) for (r = []; o !== null; ) r.push(o), o = L();
          else r = null;
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t !== null && (t = " "), t === null && (e = c), t;
      }
      function I() {
        var t;
        return t = (t = E()) !== null ? t : "";
      }
      function D() {
        var t, r, o, c, d;
        for (c = e, d = e, t = [], (r = U()) === null && (r = O()); r !== null; ) t.push(r), (r = U()) === null && (r = O());
        return t !== null ? (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = ":"), t === null && (e = c), t;
      }
      function $() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (r = M()) !== null) for (t = []; r !== null; ) t.push(r), r = M();
        else t = null;
        if (t !== null) {
          for (r = [], C = e, o = [], c = E(); c !== null; ) o.push(c), c = E();
          for (o !== null && (c = M()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) {
            for (r.push(o), C = e, o = [], c = E(); c !== null; ) o.push(c), c = E();
            o !== null && (c = M()) !== null ? o = [o, c] : (o = null, e = C);
          }
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          return n.substring(e, N);
        }(d)), t === null && (e = d), t;
      }
      function M() {
        var t;
        return /^[!-~]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[!-~]")), t === null && (t = B()), t;
      }
      function B() {
        var t;
        return /^[\x80-\uFFFF]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[\\x80-\\uFFFF]")), t;
      }
      function V() {
        var t;
        return /^[\x80-\xBF]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[\\x80-\\xBF]")), t;
      }
      function q() {
        var t, r, o;
        if (o = e, (r = z()) === null && (n.charCodeAt(e) === 45 ? (r = "-", e++) : (r = null, u('"-"')), r === null && (n.charCodeAt(e) === 46 ? (r = ".", e++) : (r = null, u('"."')), r === null && (n.charCodeAt(e) === 33 ? (r = "!", e++) : (r = null, u('"!"')), r === null && (n.charCodeAt(e) === 37 ? (r = "%", e++) : (r = null, u('"%"')), r === null && (n.charCodeAt(e) === 42 ? (r = "*", e++) : (r = null, u('"*"')), r === null && (n.charCodeAt(e) === 95 ? (r = "_", e++) : (r = null, u('"_"')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 96 ? (r = "`", e++) : (r = null, u('"`"')), r === null && (n.charCodeAt(e) === 39 ? (r = "'", e++) : (r = null, u(`"'"`)), r === null && (n.charCodeAt(e) === 126 ? (r = "~", e++) : (r = null, u('"~"')))))))))))), r !== null) for (t = []; r !== null; ) t.push(r), (r = z()) === null && (n.charCodeAt(e) === 45 ? (r = "-", e++) : (r = null, u('"-"')), r === null && (n.charCodeAt(e) === 46 ? (r = ".", e++) : (r = null, u('"."')), r === null && (n.charCodeAt(e) === 33 ? (r = "!", e++) : (r = null, u('"!"')), r === null && (n.charCodeAt(e) === 37 ? (r = "%", e++) : (r = null, u('"%"')), r === null && (n.charCodeAt(e) === 42 ? (r = "*", e++) : (r = null, u('"*"')), r === null && (n.charCodeAt(e) === 95 ? (r = "_", e++) : (r = null, u('"_"')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 96 ? (r = "`", e++) : (r = null, u('"`"')), r === null && (n.charCodeAt(e) === 39 ? (r = "'", e++) : (r = null, u(`"'"`)), r === null && (n.charCodeAt(e) === 126 ? (r = "~", e++) : (r = null, u('"~"'))))))))))));
        else t = null;
        return t !== null && (t = function(c) {
          return n.substring(e, c);
        }(o)), t === null && (e = o), t;
      }
      function Q() {
        var t, r, o;
        if (o = e, (r = z()) === null && (n.charCodeAt(e) === 45 ? (r = "-", e++) : (r = null, u('"-"')), r === null && (n.charCodeAt(e) === 33 ? (r = "!", e++) : (r = null, u('"!"')), r === null && (n.charCodeAt(e) === 37 ? (r = "%", e++) : (r = null, u('"%"')), r === null && (n.charCodeAt(e) === 42 ? (r = "*", e++) : (r = null, u('"*"')), r === null && (n.charCodeAt(e) === 95 ? (r = "_", e++) : (r = null, u('"_"')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 96 ? (r = "`", e++) : (r = null, u('"`"')), r === null && (n.charCodeAt(e) === 39 ? (r = "'", e++) : (r = null, u(`"'"`)), r === null && (n.charCodeAt(e) === 126 ? (r = "~", e++) : (r = null, u('"~"'))))))))))), r !== null) for (t = []; r !== null; ) t.push(r), (r = z()) === null && (n.charCodeAt(e) === 45 ? (r = "-", e++) : (r = null, u('"-"')), r === null && (n.charCodeAt(e) === 33 ? (r = "!", e++) : (r = null, u('"!"')), r === null && (n.charCodeAt(e) === 37 ? (r = "%", e++) : (r = null, u('"%"')), r === null && (n.charCodeAt(e) === 42 ? (r = "*", e++) : (r = null, u('"*"')), r === null && (n.charCodeAt(e) === 95 ? (r = "_", e++) : (r = null, u('"_"')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 96 ? (r = "`", e++) : (r = null, u('"`"')), r === null && (n.charCodeAt(e) === 39 ? (r = "'", e++) : (r = null, u(`"'"`)), r === null && (n.charCodeAt(e) === 126 ? (r = "~", e++) : (r = null, u('"~"')))))))))));
        else t = null;
        return t !== null && (t = function(c) {
          return n.substring(e, c);
        }(o)), t === null && (e = o), t;
      }
      function he() {
        var t, r, o;
        if (o = e, (r = z()) === null && (n.charCodeAt(e) === 45 ? (r = "-", e++) : (r = null, u('"-"')), r === null && (n.charCodeAt(e) === 46 ? (r = ".", e++) : (r = null, u('"."')), r === null && (n.charCodeAt(e) === 33 ? (r = "!", e++) : (r = null, u('"!"')), r === null && (n.charCodeAt(e) === 37 ? (r = "%", e++) : (r = null, u('"%"')), r === null && (n.charCodeAt(e) === 42 ? (r = "*", e++) : (r = null, u('"*"')), r === null && (n.charCodeAt(e) === 95 ? (r = "_", e++) : (r = null, u('"_"')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 96 ? (r = "`", e++) : (r = null, u('"`"')), r === null && (n.charCodeAt(e) === 39 ? (r = "'", e++) : (r = null, u(`"'"`)), r === null && (n.charCodeAt(e) === 126 ? (r = "~", e++) : (r = null, u('"~"')), r === null && (n.charCodeAt(e) === 40 ? (r = "(", e++) : (r = null, u('"("')), r === null && (n.charCodeAt(e) === 41 ? (r = ")", e++) : (r = null, u('")"')), r === null && (n.charCodeAt(e) === 60 ? (r = "<", e++) : (r = null, u('"<"')), r === null && (n.charCodeAt(e) === 62 ? (r = ">", e++) : (r = null, u('">"')), r === null && (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r === null && (n.charCodeAt(e) === 92 ? (r = "\\", e++) : (r = null, u('"\\\\"')), r === null && (r = y()) === null && (n.charCodeAt(e) === 47 ? (r = "/", e++) : (r = null, u('"/"')), r === null && (n.charCodeAt(e) === 91 ? (r = "[", e++) : (r = null, u('"["')), r === null && (n.charCodeAt(e) === 93 ? (r = "]", e++) : (r = null, u('"]"')), r === null && (n.charCodeAt(e) === 63 ? (r = "?", e++) : (r = null, u('"?"')), r === null && (n.charCodeAt(e) === 123 ? (r = "{", e++) : (r = null, u('"{"')), r === null && (n.charCodeAt(e) === 125 ? (r = "}", e++) : (r = null, u('"}"')))))))))))))))))))))))), r !== null) for (t = []; r !== null; ) t.push(r), (r = z()) === null && (n.charCodeAt(e) === 45 ? (r = "-", e++) : (r = null, u('"-"')), r === null && (n.charCodeAt(e) === 46 ? (r = ".", e++) : (r = null, u('"."')), r === null && (n.charCodeAt(e) === 33 ? (r = "!", e++) : (r = null, u('"!"')), r === null && (n.charCodeAt(e) === 37 ? (r = "%", e++) : (r = null, u('"%"')), r === null && (n.charCodeAt(e) === 42 ? (r = "*", e++) : (r = null, u('"*"')), r === null && (n.charCodeAt(e) === 95 ? (r = "_", e++) : (r = null, u('"_"')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 96 ? (r = "`", e++) : (r = null, u('"`"')), r === null && (n.charCodeAt(e) === 39 ? (r = "'", e++) : (r = null, u(`"'"`)), r === null && (n.charCodeAt(e) === 126 ? (r = "~", e++) : (r = null, u('"~"')), r === null && (n.charCodeAt(e) === 40 ? (r = "(", e++) : (r = null, u('"("')), r === null && (n.charCodeAt(e) === 41 ? (r = ")", e++) : (r = null, u('")"')), r === null && (n.charCodeAt(e) === 60 ? (r = "<", e++) : (r = null, u('"<"')), r === null && (n.charCodeAt(e) === 62 ? (r = ">", e++) : (r = null, u('">"')), r === null && (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r === null && (n.charCodeAt(e) === 92 ? (r = "\\", e++) : (r = null, u('"\\\\"')), r === null && (r = y()) === null && (n.charCodeAt(e) === 47 ? (r = "/", e++) : (r = null, u('"/"')), r === null && (n.charCodeAt(e) === 91 ? (r = "[", e++) : (r = null, u('"["')), r === null && (n.charCodeAt(e) === 93 ? (r = "]", e++) : (r = null, u('"]"')), r === null && (n.charCodeAt(e) === 63 ? (r = "?", e++) : (r = null, u('"?"')), r === null && (n.charCodeAt(e) === 123 ? (r = "{", e++) : (r = null, u('"{"')), r === null && (n.charCodeAt(e) === 125 ? (r = "}", e++) : (r = null, u('"}"'))))))))))))))))))))))));
        else t = null;
        return t !== null && (t = function(c) {
          return n.substring(e, c);
        }(o)), t === null && (e = o), t;
      }
      function fe() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 42 ? (r = "*", e++) : (r = null, u('"*"')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = "*"), t === null && (e = c), t;
      }
      function De() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 47 ? (r = "/", e++) : (r = null, u('"/"')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = "/"), t === null && (e = c), t;
      }
      function H() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = "="), t === null && (e = c), t;
      }
      function Me() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 40 ? (r = "(", e++) : (r = null, u('"("')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = "("), t === null && (e = c), t;
      }
      function Xe() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 41 ? (r = ")", e++) : (r = null, u('")"')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = ")"), t === null && (e = c), t;
      }
      function ls() {
        var t, r, o, c;
        return o = e, c = e, n.charCodeAt(e) === 62 ? (t = ">", e++) : (t = null, u('">"')), t !== null && (r = I()) !== null ? t = [t, r] : (t = null, e = c), t !== null && (t = ">"), t === null && (e = o), t;
      }
      function as() {
        var t, r, o, c;
        return o = e, c = e, (t = I()) !== null ? (n.charCodeAt(e) === 60 ? (r = "<", e++) : (r = null, u('"<"')), r !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t !== null && (t = "<"), t === null && (e = o), t;
      }
      function de() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 44 ? (r = ",", e++) : (r = null, u('","')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = ","), t === null && (e = c), t;
      }
      function se() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 59 ? (r = ";", e++) : (r = null, u('";"')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = ";"), t === null && (e = c), t;
      }
      function hi() {
        var t, r, o, c, d;
        return c = e, d = e, (t = I()) !== null ? (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = I()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = ":"), t === null && (e = c), t;
      }
      function us() {
        var t, r, o, c;
        return o = e, c = e, (t = I()) !== null && (r = y()) !== null ? t = [t, r] : (t = null, e = c), t !== null && (t = '"'), t === null && (e = o), t;
      }
      function cs() {
        var t, r, o, c;
        return o = e, c = e, (t = y()) !== null && (r = I()) !== null ? t = [t, r] : (t = null, e = c), t !== null && (t = '"'), t === null && (e = o), t;
      }
      function hs() {
        var t;
        return /^[!-']/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[!-']")), t === null && (/^[*-[]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[*-[]")), t === null && (/^[\]-~]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[\\]-~]")), t === null && (t = B()) === null && (t = E()))), t;
      }
      function vn() {
        var t, r, o, c, d, p;
        if (d = e, p = e, (t = I()) !== null) if ((r = y()) !== null) {
          for (o = [], (c = Ut()) === null && (c = st()); c !== null; ) o.push(c), (c = Ut()) === null && (c = st());
          o !== null && (c = y()) !== null ? t = [t, r, o, c] : (t = null, e = p);
        } else t = null, e = p;
        else t = null, e = p;
        return t !== null && (t = function(C) {
          return n.substring(e, C);
        }(d)), t === null && (e = d), t;
      }
      function xt() {
        var t, r, o, c, d, p;
        if (d = e, p = e, (t = I()) !== null) if ((r = y()) !== null) {
          for (o = [], (c = Ut()) === null && (c = st()); c !== null; ) o.push(c), (c = Ut()) === null && (c = st());
          o !== null && (c = y()) !== null ? t = [t, r, o, c] : (t = null, e = p);
        } else t = null, e = p;
        else t = null, e = p;
        return t !== null && (t = function(C) {
          var N = n.substring(e, C).trim();
          return N.substring(1, N.length - 1).replace(/\\([\x00-\x09\x0b-\x0c\x0e-\x7f])/g, "$1");
        }(d)), t === null && (e = d), t;
      }
      function Ut() {
        var t;
        return (t = E()) === null && (n.charCodeAt(e) === 33 ? (t = "!", e++) : (t = null, u('"!"')), t === null && (/^[#-[]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[#-[]")), t === null && (/^[\]-~]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[\\]-~]")), t === null && (t = B())))), t;
      }
      function st() {
        var t, r, o;
        return o = e, n.charCodeAt(e) === 92 ? (t = "\\", e++) : (t = null, u('"\\\\"')), t !== null ? (/^[\0-\t]/.test(n.charAt(e)) ? (r = n.charAt(e), e++) : (r = null, u("[\\0-\\t]")), r === null && (/^[\x0B-\f]/.test(n.charAt(e)) ? (r = n.charAt(e), e++) : (r = null, u("[\\x0B-\\f]")), r === null && (/^[\x0E-]/.test(n.charAt(e)) ? (r = n.charAt(e), e++) : (r = null, u("[\\x0E-]")))), r !== null ? t = [t, r] : (t = null, e = o)) : (t = null, e = o), t;
      }
      function kt() {
        var t, r, o, c, d, p;
        return d = e, p = e, (t = ds()) !== null ? (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = (o = Cn()) !== null ? o : "") !== null && (c = Sn()) !== null ? t = [t, r, o, c] : (t = null, e = p)) : (t = null, e = p), t !== null && (t = function(C) {
          try {
            R.uri = new Zo(R.scheme, R.user, R.host, R.port), delete R.scheme, delete R.user, delete R.host, delete R.host_type, delete R.port;
          } catch {
            R = -1;
          }
        }()), t === null && (e = d), t;
      }
      function En() {
        var t, r, o, c, d, p, C, N;
        return C = e, N = e, (t = ds()) !== null ? (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = (o = Cn()) !== null ? o : "") !== null && (c = Sn()) !== null && (d = Ti()) !== null && (p = (p = Oi()) !== null ? p : "") !== null ? t = [t, r, o, c, d, p] : (t = null, e = N)) : (t = null, e = N), t !== null && (t = function(j) {
          try {
            R.uri = new Zo(R.scheme, R.user, R.host, R.port, R.uri_params, R.uri_headers), delete R.scheme, delete R.user, delete R.host, delete R.host_type, delete R.port, delete R.uri_params, a === "SIP_URI" && (R = R.uri);
          } catch {
            R = -1;
          }
        }()), t === null && (e = C), t;
      }
      function ds() {
        var t;
        return (t = di()) === null && (t = fi()), t;
      }
      function di() {
        var t, r, o;
        return r = e, n.substr(e, 4).toLowerCase() === "sips" ? (t = n.substr(e, 4), e += 4) : (t = null, u('"sips"')), t !== null && (o = t, t = void (R.scheme = o.toLowerCase())), t === null && (e = r), t;
      }
      function fi() {
        var t, r, o;
        return r = e, n.substr(e, 3).toLowerCase() === "sip" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"sip"')), t !== null && (o = t, t = void (R.scheme = o.toLowerCase())), t === null && (e = r), t;
      }
      function Cn() {
        var t, r, o, c, d, p;
        return c = e, d = e, (t = _i()) !== null ? (p = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = pi()) !== null ? r = [r, o] : (r = null, e = p), (r = r !== null ? r : "") !== null ? (n.charCodeAt(e) === 64 ? (o = "@", e++) : (o = null, u('"@"')), o !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d)) : (t = null, e = d), t !== null && (t = function(C) {
          R.user = decodeURIComponent(n.substring(e - 1, C));
        }(c)), t === null && (e = c), t;
      }
      function _i() {
        var t, r;
        if ((r = _()) === null && (r = v()) === null && (r = fs()), r !== null) for (t = []; r !== null; ) t.push(r), (r = _()) === null && (r = v()) === null && (r = fs());
        else t = null;
        return t;
      }
      function fs() {
        var t;
        return n.charCodeAt(e) === 38 ? (t = "&", e++) : (t = null, u('"&"')), t === null && (n.charCodeAt(e) === 61 ? (t = "=", e++) : (t = null, u('"="')), t === null && (n.charCodeAt(e) === 43 ? (t = "+", e++) : (t = null, u('"+"')), t === null && (n.charCodeAt(e) === 36 ? (t = "$", e++) : (t = null, u('"$"')), t === null && (n.charCodeAt(e) === 44 ? (t = ",", e++) : (t = null, u('","')), t === null && (n.charCodeAt(e) === 59 ? (t = ";", e++) : (t = null, u('";"')), t === null && (n.charCodeAt(e) === 63 ? (t = "?", e++) : (t = null, u('"?"')), t === null && (n.charCodeAt(e) === 47 ? (t = "/", e++) : (t = null, u('"/"'))))))))), t;
      }
      function pi() {
        var t, r, o;
        for (o = e, t = [], (r = _()) === null && (r = v()) === null && (n.charCodeAt(e) === 38 ? (r = "&", e++) : (r = null, u('"&"')), r === null && (n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 36 ? (r = "$", e++) : (r = null, u('"$"')), r === null && (n.charCodeAt(e) === 44 ? (r = ",", e++) : (r = null, u('","'))))))); r !== null; ) t.push(r), (r = _()) === null && (r = v()) === null && (n.charCodeAt(e) === 38 ? (r = "&", e++) : (r = null, u('"&"')), r === null && (n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')), r === null && (n.charCodeAt(e) === 36 ? (r = "$", e++) : (r = null, u('"$"')), r === null && (n.charCodeAt(e) === 44 ? (r = ",", e++) : (r = null, u('","')))))));
        return t !== null && (t = function(c) {
          R.password = n.substring(e, c);
        }(o)), t === null && (e = o), t;
      }
      function Sn() {
        var t, r, o, c, d;
        return c = e, (t = Mt()) !== null ? (d = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = gi()) !== null ? r = [r, o] : (r = null, e = d), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t;
      }
      function Mt() {
        var t, r;
        return r = e, (t = _s()) === null && (t = $t()) === null && (t = ms()), t !== null && (t = function(o) {
          return R.host = n.substring(e, o).toLowerCase(), R.host;
        }(r)), t === null && (e = r), t;
      }
      function _s() {
        var t, r, o, c, d, p;
        for (c = e, d = e, t = [], p = e, (r = ps()) !== null ? (n.charCodeAt(e) === 46 ? (o = ".", e++) : (o = null, u('"."')), o !== null ? r = [r, o] : (r = null, e = p)) : (r = null, e = p); r !== null; ) t.push(r), p = e, (r = ps()) !== null ? (n.charCodeAt(e) === 46 ? (o = ".", e++) : (o = null, u('"."')), o !== null ? r = [r, o] : (r = null, e = p)) : (r = null, e = p);
        return t !== null && (r = mi()) !== null ? (n.charCodeAt(e) === 46 ? (o = ".", e++) : (o = null, u('"."')), (o = o !== null ? o : "") !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = function(C) {
          return R.host_type = "domain", n.substring(e, C);
        }(c)), t === null && (e = c), t;
      }
      function ps() {
        var t, r, o, c;
        if (c = e, (t = z()) !== null) {
          for (r = [], (o = z()) === null && (n.charCodeAt(e) === 45 ? (o = "-", e++) : (o = null, u('"-"')), o === null && (n.charCodeAt(e) === 95 ? (o = "_", e++) : (o = null, u('"_"')))); o !== null; ) r.push(o), (o = z()) === null && (n.charCodeAt(e) === 45 ? (o = "-", e++) : (o = null, u('"-"')), o === null && (n.charCodeAt(e) === 95 ? (o = "_", e++) : (o = null, u('"_"'))));
          r !== null ? t = [t, r] : (t = null, e = c);
        } else t = null, e = c;
        return t;
      }
      function mi() {
        var t, r, o, c;
        if (c = e, (t = z()) !== null) {
          for (r = [], (o = z()) === null && (n.charCodeAt(e) === 45 ? (o = "-", e++) : (o = null, u('"-"')), o === null && (n.charCodeAt(e) === 95 ? (o = "_", e++) : (o = null, u('"_"')))); o !== null; ) r.push(o), (o = z()) === null && (n.charCodeAt(e) === 45 ? (o = "-", e++) : (o = null, u('"-"')), o === null && (n.charCodeAt(e) === 95 ? (o = "_", e++) : (o = null, u('"_"'))));
          r !== null ? t = [t, r] : (t = null, e = c);
        } else t = null, e = c;
        return t;
      }
      function ms() {
        var t, r, o, c, d;
        return c = e, d = e, n.charCodeAt(e) === 91 ? (t = "[", e++) : (t = null, u('"["')), t !== null && (r = gs()) !== null ? (n.charCodeAt(e) === 93 ? (o = "]", e++) : (o = null, u('"]"')), o !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = function(p) {
          return R.host_type = "IPv6", n.substring(e, p);
        }(c)), t === null && (e = c), t;
      }
      function gs() {
        var t, r, o, c, d, p, C, N, j, X, we, We, ks, Ms, F, Y;
        return Ms = e, F = e, (t = G()) !== null ? (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? (n.charCodeAt(e) === 58 ? (c = ":", e++) : (c = null, u('":"')), c !== null && (d = G()) !== null ? (n.charCodeAt(e) === 58 ? (p = ":", e++) : (p = null, u('":"')), p !== null && (C = G()) !== null ? (n.charCodeAt(e) === 58 ? (N = ":", e++) : (N = null, u('":"')), N !== null && (j = G()) !== null ? (n.charCodeAt(e) === 58 ? (X = ":", e++) : (X = null, u('":"')), X !== null && (we = G()) !== null ? (n.charCodeAt(e) === 58 ? (We = ":", e++) : (We = null, u('":"')), We !== null && (ks = Le()) !== null ? t = [t, r, o, c, d, p, C, N, j, X, we, We, ks] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, n.substr(e, 2) === "::" ? (t = "::", e += 2) : (t = null, u('"::"')), t !== null && (r = G()) !== null ? (n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? (n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = G()) !== null ? (n.charCodeAt(e) === 58 ? (C = ":", e++) : (C = null, u('":"')), C !== null && (N = G()) !== null ? (n.charCodeAt(e) === 58 ? (j = ":", e++) : (j = null, u('":"')), j !== null && (X = G()) !== null ? (n.charCodeAt(e) === 58 ? (we = ":", e++) : (we = null, u('":"')), we !== null && (We = Le()) !== null ? t = [t, r, o, c, d, p, C, N, j, X, we, We] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, n.substr(e, 2) === "::" ? (t = "::", e += 2) : (t = null, u('"::"')), t !== null && (r = G()) !== null ? (n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? (n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = G()) !== null ? (n.charCodeAt(e) === 58 ? (C = ":", e++) : (C = null, u('":"')), C !== null && (N = G()) !== null ? (n.charCodeAt(e) === 58 ? (j = ":", e++) : (j = null, u('":"')), j !== null && (X = Le()) !== null ? t = [t, r, o, c, d, p, C, N, j, X] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, n.substr(e, 2) === "::" ? (t = "::", e += 2) : (t = null, u('"::"')), t !== null && (r = G()) !== null ? (n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? (n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = G()) !== null ? (n.charCodeAt(e) === 58 ? (C = ":", e++) : (C = null, u('":"')), C !== null && (N = Le()) !== null ? t = [t, r, o, c, d, p, C, N] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, n.substr(e, 2) === "::" ? (t = "::", e += 2) : (t = null, u('"::"')), t !== null && (r = G()) !== null ? (n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? (n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = Le()) !== null ? t = [t, r, o, c, d, p] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, n.substr(e, 2) === "::" ? (t = "::", e += 2) : (t = null, u('"::"')), t !== null && (r = G()) !== null ? (n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = Le()) !== null ? t = [t, r, o, c] : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, n.substr(e, 2) === "::" ? (t = "::", e += 2) : (t = null, u('"::"')), t !== null && (r = Le()) !== null ? t = [t, r] : (t = null, e = F), t === null && (F = e, n.substr(e, 2) === "::" ? (t = "::", e += 2) : (t = null, u('"::"')), t !== null && (r = G()) !== null ? t = [t, r] : (t = null, e = F), t === null && (F = e, (t = G()) !== null ? (n.substr(e, 2) === "::" ? (r = "::", e += 2) : (r = null, u('"::"')), r !== null && (o = G()) !== null ? (n.charCodeAt(e) === 58 ? (c = ":", e++) : (c = null, u('":"')), c !== null && (d = G()) !== null ? (n.charCodeAt(e) === 58 ? (p = ":", e++) : (p = null, u('":"')), p !== null && (C = G()) !== null ? (n.charCodeAt(e) === 58 ? (N = ":", e++) : (N = null, u('":"')), N !== null && (j = G()) !== null ? (n.charCodeAt(e) === 58 ? (X = ":", e++) : (X = null, u('":"')), X !== null && (we = Le()) !== null ? t = [t, r, o, c, d, p, C, N, j, X, we] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, (t = G()) !== null ? (Y = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? r = [r, o] : (r = null, e = Y), (r = r !== null ? r : "") !== null ? (n.substr(e, 2) === "::" ? (o = "::", e += 2) : (o = null, u('"::"')), o !== null && (c = G()) !== null ? (n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = G()) !== null ? (n.charCodeAt(e) === 58 ? (C = ":", e++) : (C = null, u('":"')), C !== null && (N = G()) !== null ? (n.charCodeAt(e) === 58 ? (j = ":", e++) : (j = null, u('":"')), j !== null && (X = Le()) !== null ? t = [t, r, o, c, d, p, C, N, j, X] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, (t = G()) !== null ? (Y = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? r = [r, o] : (r = null, e = Y), (r = r !== null ? r : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? o = [o, c] : (o = null, e = Y), (o = o !== null ? o : "") !== null ? (n.substr(e, 2) === "::" ? (c = "::", e += 2) : (c = null, u('"::"')), c !== null && (d = G()) !== null ? (n.charCodeAt(e) === 58 ? (p = ":", e++) : (p = null, u('":"')), p !== null && (C = G()) !== null ? (n.charCodeAt(e) === 58 ? (N = ":", e++) : (N = null, u('":"')), N !== null && (j = Le()) !== null ? t = [t, r, o, c, d, p, C, N, j] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, (t = G()) !== null ? (Y = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? r = [r, o] : (r = null, e = Y), (r = r !== null ? r : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? o = [o, c] : (o = null, e = Y), (o = o !== null ? o : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (c = ":", e++) : (c = null, u('":"')), c !== null && (d = G()) !== null ? c = [c, d] : (c = null, e = Y), (c = c !== null ? c : "") !== null ? (n.substr(e, 2) === "::" ? (d = "::", e += 2) : (d = null, u('"::"')), d !== null && (p = G()) !== null ? (n.charCodeAt(e) === 58 ? (C = ":", e++) : (C = null, u('":"')), C !== null && (N = Le()) !== null ? t = [t, r, o, c, d, p, C, N] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, (t = G()) !== null ? (Y = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? r = [r, o] : (r = null, e = Y), (r = r !== null ? r : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? o = [o, c] : (o = null, e = Y), (o = o !== null ? o : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (c = ":", e++) : (c = null, u('":"')), c !== null && (d = G()) !== null ? c = [c, d] : (c = null, e = Y), (c = c !== null ? c : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = G()) !== null ? d = [d, p] : (d = null, e = Y), (d = d !== null ? d : "") !== null ? (n.substr(e, 2) === "::" ? (p = "::", e += 2) : (p = null, u('"::"')), p !== null && (C = Le()) !== null ? t = [t, r, o, c, d, p, C] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, (t = G()) !== null ? (Y = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? r = [r, o] : (r = null, e = Y), (r = r !== null ? r : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? o = [o, c] : (o = null, e = Y), (o = o !== null ? o : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (c = ":", e++) : (c = null, u('":"')), c !== null && (d = G()) !== null ? c = [c, d] : (c = null, e = Y), (c = c !== null ? c : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = G()) !== null ? d = [d, p] : (d = null, e = Y), (d = d !== null ? d : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (p = ":", e++) : (p = null, u('":"')), p !== null && (C = G()) !== null ? p = [p, C] : (p = null, e = Y), (p = p !== null ? p : "") !== null ? (n.substr(e, 2) === "::" ? (C = "::", e += 2) : (C = null, u('"::"')), C !== null && (N = G()) !== null ? t = [t, r, o, c, d, p, C, N] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F), t === null && (F = e, (t = G()) !== null ? (Y = e, n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? r = [r, o] : (r = null, e = Y), (r = r !== null ? r : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (o = ":", e++) : (o = null, u('":"')), o !== null && (c = G()) !== null ? o = [o, c] : (o = null, e = Y), (o = o !== null ? o : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (c = ":", e++) : (c = null, u('":"')), c !== null && (d = G()) !== null ? c = [c, d] : (c = null, e = Y), (c = c !== null ? c : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (d = ":", e++) : (d = null, u('":"')), d !== null && (p = G()) !== null ? d = [d, p] : (d = null, e = Y), (d = d !== null ? d : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (p = ":", e++) : (p = null, u('":"')), p !== null && (C = G()) !== null ? p = [p, C] : (p = null, e = Y), (p = p !== null ? p : "") !== null ? (Y = e, n.charCodeAt(e) === 58 ? (C = ":", e++) : (C = null, u('":"')), C !== null && (N = G()) !== null ? C = [C, N] : (C = null, e = Y), (C = C !== null ? C : "") !== null ? (n.substr(e, 2) === "::" ? (N = "::", e += 2) : (N = null, u('"::"')), N !== null ? t = [t, r, o, c, d, p, C, N] : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F)) : (t = null, e = F))))))))))))))), t !== null && (t = function(mu) {
          return R.host_type = "IPv6", n.substring(e, mu);
        }(Ms)), t === null && (e = Ms), t;
      }
      function G() {
        var t, r, o, c, d;
        return d = e, (t = S()) !== null && (r = (r = S()) !== null ? r : "") !== null && (o = (o = S()) !== null ? o : "") !== null && (c = (c = S()) !== null ? c : "") !== null ? t = [t, r, o, c] : (t = null, e = d), t;
      }
      function Le() {
        var t, r, o, c;
        return c = e, (t = G()) !== null ? (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null && (o = G()) !== null ? t = [t, r, o] : (t = null, e = c)) : (t = null, e = c), t === null && (t = $t()), t;
      }
      function $t() {
        var t, r, o, c, d, p, C, N, j;
        return N = e, j = e, (t = Ft()) !== null ? (n.charCodeAt(e) === 46 ? (r = ".", e++) : (r = null, u('"."')), r !== null && (o = Ft()) !== null ? (n.charCodeAt(e) === 46 ? (c = ".", e++) : (c = null, u('"."')), c !== null && (d = Ft()) !== null ? (n.charCodeAt(e) === 46 ? (p = ".", e++) : (p = null, u('"."')), p !== null && (C = Ft()) !== null ? t = [t, r, o, c, d, p, C] : (t = null, e = j)) : (t = null, e = j)) : (t = null, e = j)) : (t = null, e = j), t !== null && (t = function(X) {
          return R.host_type = "IPv4", n.substring(e, X);
        }(N)), t === null && (e = N), t;
      }
      function Ft() {
        var t, r, o, c;
        return c = e, n.substr(e, 2) === "25" ? (t = "25", e += 2) : (t = null, u('"25"')), t !== null ? (/^[0-5]/.test(n.charAt(e)) ? (r = n.charAt(e), e++) : (r = null, u("[0-5]")), r !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t === null && (c = e, n.charCodeAt(e) === 50 ? (t = "2", e++) : (t = null, u('"2"')), t !== null ? (/^[0-4]/.test(n.charAt(e)) ? (r = n.charAt(e), e++) : (r = null, u("[0-4]")), r !== null && (o = g()) !== null ? t = [t, r, o] : (t = null, e = c)) : (t = null, e = c), t === null && (c = e, n.charCodeAt(e) === 49 ? (t = "1", e++) : (t = null, u('"1"')), t !== null && (r = g()) !== null && (o = g()) !== null ? t = [t, r, o] : (t = null, e = c), t === null && (c = e, /^[1-9]/.test(n.charAt(e)) ? (t = n.charAt(e), e++) : (t = null, u("[1-9]")), t !== null && (r = g()) !== null ? t = [t, r] : (t = null, e = c), t === null && (t = g())))), t;
      }
      function gi() {
        var t, r, o, c, d, p, C, N;
        return p = e, C = e, (t = (t = g()) !== null ? t : "") !== null && (r = (r = g()) !== null ? r : "") !== null && (o = (o = g()) !== null ? o : "") !== null && (c = (c = g()) !== null ? c : "") !== null && (d = (d = g()) !== null ? d : "") !== null ? t = [t, r, o, c, d] : (t = null, e = C), t !== null && (N = t, N = parseInt(N.join("")), R.port = N, t = N), t === null && (e = p), t;
      }
      function Ti() {
        var t, r, o, c;
        for (t = [], c = e, n.charCodeAt(e) === 59 ? (r = ";", e++) : (r = null, u('";"')), r !== null && (o = Ts()) !== null ? r = [r, o] : (r = null, e = c); r !== null; ) t.push(r), c = e, n.charCodeAt(e) === 59 ? (r = ";", e++) : (r = null, u('";"')), r !== null && (o = Ts()) !== null ? r = [r, o] : (r = null, e = c);
        return t;
      }
      function Ts() {
        var t;
        return (t = vi()) === null && (t = Ei()) === null && (t = Ci()) === null && (t = Si()) === null && (t = Ai()) === null && (t = Ri()) === null && (t = yi()), t;
      }
      function vi() {
        var t, r, o, c;
        return o = e, c = e, n.substr(e, 10).toLowerCase() === "transport=" ? (t = n.substr(e, 10), e += 10) : (t = null, u('"transport="')), t !== null ? (n.substr(e, 3).toLowerCase() === "udp" ? (r = n.substr(e, 3), e += 3) : (r = null, u('"udp"')), r === null && (n.substr(e, 3).toLowerCase() === "tcp" ? (r = n.substr(e, 3), e += 3) : (r = null, u('"tcp"')), r === null && (n.substr(e, 4).toLowerCase() === "sctp" ? (r = n.substr(e, 4), e += 4) : (r = null, u('"sctp"')), r === null && (n.substr(e, 3).toLowerCase() === "tls" ? (r = n.substr(e, 3), e += 3) : (r = null, u('"tls"')), r === null && (r = q())))), r !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t !== null && (t = function(d, p) {
          R.uri_params || (R.uri_params = {}), R.uri_params.transport = p.toLowerCase();
        }(0, t[1])), t === null && (e = o), t;
      }
      function Ei() {
        var t, r, o, c, d;
        return o = e, c = e, n.substr(e, 5).toLowerCase() === "user=" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"user="')), t !== null ? (n.substr(e, 5).toLowerCase() === "phone" ? (r = n.substr(e, 5), e += 5) : (r = null, u('"phone"')), r === null && (n.substr(e, 2).toLowerCase() === "ip" ? (r = n.substr(e, 2), e += 2) : (r = null, u('"ip"')), r === null && (r = q())), r !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t !== null && (d = t[1], R.uri_params || (R.uri_params = {}), t = void (R.uri_params.user = d.toLowerCase())), t === null && (e = o), t;
      }
      function Ci() {
        var t, r, o, c, d;
        return o = e, c = e, n.substr(e, 7).toLowerCase() === "method=" ? (t = n.substr(e, 7), e += 7) : (t = null, u('"method="')), t !== null && (r = bn()) !== null ? t = [t, r] : (t = null, e = c), t !== null && (d = t[1], R.uri_params || (R.uri_params = {}), t = void (R.uri_params.method = d)), t === null && (e = o), t;
      }
      function Si() {
        var t, r, o, c, d;
        return o = e, c = e, n.substr(e, 4).toLowerCase() === "ttl=" ? (t = n.substr(e, 4), e += 4) : (t = null, u('"ttl="')), t !== null && (r = Ls()) !== null ? t = [t, r] : (t = null, e = c), t !== null && (d = t[1], R.params || (R.params = {}), t = void (R.params.ttl = d)), t === null && (e = o), t;
      }
      function Ai() {
        var t, r, o, c, d;
        return o = e, c = e, n.substr(e, 6).toLowerCase() === "maddr=" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"maddr="')), t !== null && (r = Mt()) !== null ? t = [t, r] : (t = null, e = c), t !== null && (d = t[1], R.uri_params || (R.uri_params = {}), t = void (R.uri_params.maddr = d)), t === null && (e = o), t;
      }
      function Ri() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 2).toLowerCase() === "lr" ? (t = n.substr(e, 2), e += 2) : (t = null, u('"lr"')), t !== null ? (p = e, n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r !== null && (o = q()) !== null ? r = [r, o] : (r = null, e = p), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = d)) : (t = null, e = d), t !== null && (R.uri_params || (R.uri_params = {}), t = void (R.uri_params.lr = void 0)), t === null && (e = c), t;
      }
      function yi() {
        var t, r, o, c, d, p, C, N;
        return c = e, d = e, (t = bi()) !== null ? (p = e, n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r !== null && (o = wi()) !== null ? r = [r, o] : (r = null, e = p), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = d)) : (t = null, e = d), t !== null && (C = t[0], N = t[1], R.uri_params || (R.uri_params = {}), N = N === void 0 ? void 0 : N[1], t = void (R.uri_params[C.toLowerCase()] = N)), t === null && (e = c), t;
      }
      function bi() {
        var t, r, o;
        if (o = e, (r = qt()) !== null) for (t = []; r !== null; ) t.push(r), r = qt();
        else t = null;
        return t !== null && (t = t.join("")), t === null && (e = o), t;
      }
      function wi() {
        var t, r, o;
        if (o = e, (r = qt()) !== null) for (t = []; r !== null; ) t.push(r), r = qt();
        else t = null;
        return t !== null && (t = t.join("")), t === null && (e = o), t;
      }
      function qt() {
        var t;
        return (t = Ii()) === null && (t = _()) === null && (t = v()), t;
      }
      function Ii() {
        var t;
        return n.charCodeAt(e) === 91 ? (t = "[", e++) : (t = null, u('"["')), t === null && (n.charCodeAt(e) === 93 ? (t = "]", e++) : (t = null, u('"]"')), t === null && (n.charCodeAt(e) === 47 ? (t = "/", e++) : (t = null, u('"/"')), t === null && (n.charCodeAt(e) === 58 ? (t = ":", e++) : (t = null, u('":"')), t === null && (n.charCodeAt(e) === 38 ? (t = "&", e++) : (t = null, u('"&"')), t === null && (n.charCodeAt(e) === 43 ? (t = "+", e++) : (t = null, u('"+"')), t === null && (n.charCodeAt(e) === 36 ? (t = "$", e++) : (t = null, u('"$"')))))))), t;
      }
      function Oi() {
        var t, r, o, c, d, p, C;
        if (p = e, n.charCodeAt(e) === 63 ? (t = "?", e++) : (t = null, u('"?"')), t !== null) if ((r = An()) !== null) {
          for (o = [], C = e, n.charCodeAt(e) === 38 ? (c = "&", e++) : (c = null, u('"&"')), c !== null && (d = An()) !== null ? c = [c, d] : (c = null, e = C); c !== null; ) o.push(c), C = e, n.charCodeAt(e) === 38 ? (c = "&", e++) : (c = null, u('"&"')), c !== null && (d = An()) !== null ? c = [c, d] : (c = null, e = C);
          o !== null ? t = [t, r, o] : (t = null, e = p);
        } else t = null, e = p;
        else t = null, e = p;
        return t;
      }
      function An() {
        var t, r, o, c, d, p, C;
        return c = e, d = e, (t = Ni()) !== null ? (n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r !== null && (o = Di()) !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (p = t[0], C = t[2], p = p.join("").toLowerCase(), C = C.join(""), R.uri_headers || (R.uri_headers = {}), t = void (R.uri_headers[p] ? R.uri_headers[p].push(C) : R.uri_headers[p] = [C])), t === null && (e = c), t;
      }
      function Ni() {
        var t, r;
        if ((r = Ht()) === null && (r = _()) === null && (r = v()), r !== null) for (t = []; r !== null; ) t.push(r), (r = Ht()) === null && (r = _()) === null && (r = v());
        else t = null;
        return t;
      }
      function Di() {
        var t, r;
        for (t = [], (r = Ht()) === null && (r = _()) === null && (r = v()); r !== null; ) t.push(r), (r = Ht()) === null && (r = _()) === null && (r = v());
        return t;
      }
      function Ht() {
        var t;
        return n.charCodeAt(e) === 91 ? (t = "[", e++) : (t = null, u('"["')), t === null && (n.charCodeAt(e) === 93 ? (t = "]", e++) : (t = null, u('"]"')), t === null && (n.charCodeAt(e) === 47 ? (t = "/", e++) : (t = null, u('"/"')), t === null && (n.charCodeAt(e) === 63 ? (t = "?", e++) : (t = null, u('"?"')), t === null && (n.charCodeAt(e) === 58 ? (t = ":", e++) : (t = null, u('":"')), t === null && (n.charCodeAt(e) === 43 ? (t = "+", e++) : (t = null, u('"+"')), t === null && (n.charCodeAt(e) === 36 ? (t = "$", e++) : (t = null, u('"$"')))))))), t;
      }
      function Li() {
        var t, r, o, c, d, p;
        return p = e, (t = bn()) !== null && (r = U()) !== null && (o = Pi()) !== null && (c = U()) !== null && (d = Cs()) !== null ? t = [t, r, o, c, d] : (t = null, e = p), t;
      }
      function Pi() {
        var t;
        return (t = En()) === null && (t = vs()), t;
      }
      function vs() {
        var t, r, o, c;
        return c = e, (t = Fi()) !== null ? (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r !== null ? ((o = xi()) === null && (o = ki()), o !== null ? t = [t, r, o] : (t = null, e = c)) : (t = null, e = c)) : (t = null, e = c), t;
      }
      function xi() {
        var t, r, o, c, d;
        return c = e, (t = Ui()) === null && (t = Rn()), t !== null ? (d = e, n.charCodeAt(e) === 63 ? (r = "?", e++) : (r = null, u('"?"')), r !== null && (o = Bi()) !== null ? r = [r, o] : (r = null, e = d), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t;
      }
      function Ui() {
        var t, r, o, c;
        return c = e, n.substr(e, 2) === "//" ? (t = "//", e += 2) : (t = null, u('"//"')), t !== null && (r = qi()) !== null && (o = (o = Rn()) !== null ? o : "") !== null ? t = [t, r, o] : (t = null, e = c), t;
      }
      function Rn() {
        var t, r, o;
        return o = e, n.charCodeAt(e) === 47 ? (t = "/", e++) : (t = null, u('"/"')), t !== null && (r = $i()) !== null ? t = [t, r] : (t = null, e = o), t;
      }
      function ki() {
        var t, r, o, c;
        if (c = e, (t = Mi()) !== null) {
          for (r = [], o = jt(); o !== null; ) r.push(o), o = jt();
          r !== null ? t = [t, r] : (t = null, e = c);
        } else t = null, e = c;
        return t;
      }
      function jt() {
        var t;
        return (t = k()) === null && (t = _()) === null && (t = v()), t;
      }
      function Mi() {
        var t;
        return (t = _()) === null && (t = v()) === null && (n.charCodeAt(e) === 59 ? (t = ";", e++) : (t = null, u('";"')), t === null && (n.charCodeAt(e) === 63 ? (t = "?", e++) : (t = null, u('"?"')), t === null && (n.charCodeAt(e) === 58 ? (t = ":", e++) : (t = null, u('":"')), t === null && (n.charCodeAt(e) === 64 ? (t = "@", e++) : (t = null, u('"@"')), t === null && (n.charCodeAt(e) === 38 ? (t = "&", e++) : (t = null, u('"&"')), t === null && (n.charCodeAt(e) === 61 ? (t = "=", e++) : (t = null, u('"="')), t === null && (n.charCodeAt(e) === 43 ? (t = "+", e++) : (t = null, u('"+"')), t === null && (n.charCodeAt(e) === 36 ? (t = "$", e++) : (t = null, u('"$"')), t === null && (n.charCodeAt(e) === 44 ? (t = ",", e++) : (t = null, u('","'))))))))))), t;
      }
      function $i() {
        var t, r, o, c, d, p;
        if (d = e, (t = yn()) !== null) {
          for (r = [], p = e, n.charCodeAt(e) === 47 ? (o = "/", e++) : (o = null, u('"/"')), o !== null && (c = yn()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, n.charCodeAt(e) === 47 ? (o = "/", e++) : (o = null, u('"/"')), o !== null && (c = yn()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }
      function yn() {
        var t, r, o, c, d, p;
        for (d = e, t = [], r = Bt(); r !== null; ) t.push(r), r = Bt();
        if (t !== null) {
          for (r = [], p = e, n.charCodeAt(e) === 59 ? (o = ";", e++) : (o = null, u('";"')), o !== null && (c = Es()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, n.charCodeAt(e) === 59 ? (o = ";", e++) : (o = null, u('";"')), o !== null && (c = Es()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }
      function Es() {
        var t, r;
        for (t = [], r = Bt(); r !== null; ) t.push(r), r = Bt();
        return t;
      }
      function Bt() {
        var t;
        return (t = _()) === null && (t = v()) === null && (n.charCodeAt(e) === 58 ? (t = ":", e++) : (t = null, u('":"')), t === null && (n.charCodeAt(e) === 64 ? (t = "@", e++) : (t = null, u('"@"')), t === null && (n.charCodeAt(e) === 38 ? (t = "&", e++) : (t = null, u('"&"')), t === null && (n.charCodeAt(e) === 61 ? (t = "=", e++) : (t = null, u('"="')), t === null && (n.charCodeAt(e) === 43 ? (t = "+", e++) : (t = null, u('"+"')), t === null && (n.charCodeAt(e) === 36 ? (t = "$", e++) : (t = null, u('"$"')), t === null && (n.charCodeAt(e) === 44 ? (t = ",", e++) : (t = null, u('","'))))))))), t;
      }
      function Fi() {
        var t, r, o, c, d;
        if (c = e, d = e, (t = A()) !== null) {
          for (r = [], (o = A()) === null && (o = g()) === null && (n.charCodeAt(e) === 43 ? (o = "+", e++) : (o = null, u('"+"')), o === null && (n.charCodeAt(e) === 45 ? (o = "-", e++) : (o = null, u('"-"')), o === null && (n.charCodeAt(e) === 46 ? (o = ".", e++) : (o = null, u('"."'))))); o !== null; ) r.push(o), (o = A()) === null && (o = g()) === null && (n.charCodeAt(e) === 43 ? (o = "+", e++) : (o = null, u('"+"')), o === null && (n.charCodeAt(e) === 45 ? (o = "-", e++) : (o = null, u('"-"')), o === null && (n.charCodeAt(e) === 46 ? (o = ".", e++) : (o = null, u('"."')))));
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t !== null && (t = function(p) {
          R.scheme = n.substring(e, p);
        }(c)), t === null && (e = c), t;
      }
      function qi() {
        var t;
        return (t = Hi()) === null && (t = ji()), t;
      }
      function Hi() {
        var t, r, o, c;
        return o = e, c = e, (t = Cn()) !== null ? (n.charCodeAt(e) === 64 ? (r = "@", e++) : (r = null, u('"@"')), r !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), (t = t !== null ? t : "") !== null && (r = Sn()) !== null ? t = [t, r] : (t = null, e = o), t = t !== null ? t : "";
      }
      function ji() {
        var t, r;
        if ((r = _()) === null && (r = v()) === null && (n.charCodeAt(e) === 36 ? (r = "$", e++) : (r = null, u('"$"')), r === null && (n.charCodeAt(e) === 44 ? (r = ",", e++) : (r = null, u('","')), r === null && (n.charCodeAt(e) === 59 ? (r = ";", e++) : (r = null, u('";"')), r === null && (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r === null && (n.charCodeAt(e) === 64 ? (r = "@", e++) : (r = null, u('"@"')), r === null && (n.charCodeAt(e) === 38 ? (r = "&", e++) : (r = null, u('"&"')), r === null && (n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"')))))))))), r !== null) for (t = []; r !== null; ) t.push(r), (r = _()) === null && (r = v()) === null && (n.charCodeAt(e) === 36 ? (r = "$", e++) : (r = null, u('"$"')), r === null && (n.charCodeAt(e) === 44 ? (r = ",", e++) : (r = null, u('","')), r === null && (n.charCodeAt(e) === 59 ? (r = ";", e++) : (r = null, u('";"')), r === null && (n.charCodeAt(e) === 58 ? (r = ":", e++) : (r = null, u('":"')), r === null && (n.charCodeAt(e) === 64 ? (r = "@", e++) : (r = null, u('"@"')), r === null && (n.charCodeAt(e) === 38 ? (r = "&", e++) : (r = null, u('"&"')), r === null && (n.charCodeAt(e) === 61 ? (r = "=", e++) : (r = null, u('"="')), r === null && (n.charCodeAt(e) === 43 ? (r = "+", e++) : (r = null, u('"+"'))))))))));
        else t = null;
        return t;
      }
      function Bi() {
        var t, r;
        for (t = [], r = jt(); r !== null; ) t.push(r), r = jt();
        return t;
      }
      function Cs() {
        var t, r, o, c, d, p, C, N;
        if (C = e, N = e, n.substr(e, 3).toLowerCase() === "sip" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"SIP"')), t !== null) if (n.charCodeAt(e) === 47 ? (r = "/", e++) : (r = null, u('"/"')), r !== null) {
          if ((c = g()) !== null) for (o = []; c !== null; ) o.push(c), c = g();
          else o = null;
          if (o !== null) if (n.charCodeAt(e) === 46 ? (c = ".", e++) : (c = null, u('"."')), c !== null) {
            if ((p = g()) !== null) for (d = []; p !== null; ) d.push(p), p = g();
            else d = null;
            d !== null ? t = [t, r, o, c, d] : (t = null, e = N);
          } else t = null, e = N;
          else t = null, e = N;
        } else t = null, e = N;
        else t = null, e = N;
        return t !== null && (t = function(j) {
          R.sip_version = n.substring(e, j);
        }(C)), t === null && (e = C), t;
      }
      function Wi() {
        var t;
        return n.substr(e, 6) === "INVITE" ? (t = "INVITE", e += 6) : (t = null, u('"INVITE"')), t;
      }
      function Gi() {
        var t;
        return n.substr(e, 3) === "ACK" ? (t = "ACK", e += 3) : (t = null, u('"ACK"')), t;
      }
      function Vi() {
        var t;
        return n.substr(e, 7) === "OPTIONS" ? (t = "OPTIONS", e += 7) : (t = null, u('"OPTIONS"')), t;
      }
      function Ki() {
        var t;
        return n.substr(e, 3) === "BYE" ? (t = "BYE", e += 3) : (t = null, u('"BYE"')), t;
      }
      function zi() {
        var t;
        return n.substr(e, 6) === "CANCEL" ? (t = "CANCEL", e += 6) : (t = null, u('"CANCEL"')), t;
      }
      function Ji() {
        var t;
        return n.substr(e, 8) === "REGISTER" ? (t = "REGISTER", e += 8) : (t = null, u('"REGISTER"')), t;
      }
      function Xi() {
        var t;
        return n.substr(e, 9) === "SUBSCRIBE" ? (t = "SUBSCRIBE", e += 9) : (t = null, u('"SUBSCRIBE"')), t;
      }
      function Yi() {
        var t;
        return n.substr(e, 6) === "NOTIFY" ? (t = "NOTIFY", e += 6) : (t = null, u('"NOTIFY"')), t;
      }
      function Qi() {
        var t;
        return n.substr(e, 5) === "REFER" ? (t = "REFER", e += 5) : (t = null, u('"REFER"')), t;
      }
      function bn() {
        var t, r;
        return r = e, (t = Wi()) === null && (t = Gi()) === null && (t = Vi()) === null && (t = Ki()) === null && (t = zi()) === null && (t = Ji()) === null && (t = Xi()) === null && (t = Yi()) === null && (t = Qi()) === null && (t = q()), t !== null && (t = function(o) {
          return R.method = n.substring(e, o), R.method;
        }(r)), t === null && (e = r), t;
      }
      function Zi() {
        var t, r, o, c, d, p;
        return p = e, (t = Cs()) !== null && (r = U()) !== null && (o = eo()) !== null && (c = U()) !== null && (d = no()) !== null ? t = [t, r, o, c, d] : (t = null, e = p), t;
      }
      function eo() {
        var t, r, o;
        return r = e, (t = to()) !== null && (o = t, t = void (R.status_code = parseInt(o.join("")))), t === null && (e = r), t;
      }
      function to() {
        var t, r, o, c;
        return c = e, (t = g()) !== null && (r = g()) !== null && (o = g()) !== null ? t = [t, r, o] : (t = null, e = c), t;
      }
      function no() {
        var t, r, o;
        for (o = e, t = [], (r = k()) === null && (r = _()) === null && (r = v()) === null && (r = B()) === null && (r = V()) === null && (r = U()) === null && (r = O()); r !== null; ) t.push(r), (r = k()) === null && (r = _()) === null && (r = v()) === null && (r = B()) === null && (r = V()) === null && (r = U()) === null && (r = O());
        return t !== null && (t = function(c) {
          R.reason_phrase = n.substring(e, c);
        }(o)), t === null && (e = o), t;
      }
      function wn() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (t = kt()) === null && (t = rt()), t !== null) {
          for (r = [], C = e, (o = se()) !== null && (c = Ss()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = se()) !== null && (c = Ss()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          var j;
          R.multi_header || (R.multi_header = []);
          try {
            j = new St(R.uri, R.display_name, R.params), delete R.uri, delete R.display_name, delete R.params;
          } catch {
            j = null;
          }
          R.multi_header.push({ possition: e, offset: N, parsed: j });
        }(d)), t === null && (e = d), t;
      }
      function rt() {
        var t, r, o, c, d;
        return d = e, (t = (t = In()) !== null ? t : "") !== null && (r = as()) !== null && (o = En()) !== null && (c = ls()) !== null ? t = [t, r, o, c] : (t = null, e = d), t;
      }
      function In() {
        var t, r, o, c, d, p, C, N;
        if (d = e, p = e, (t = q()) !== null) {
          for (r = [], C = e, (o = E()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = E()) !== null && (c = q()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t === null && (t = xt()), t !== null && (N = t, t = void (R.display_name = typeof N == "string" ? N : N[1].reduce(function(j, X) {
          return j + X[0] + X[1];
        }, N[0]))), t === null && (e = d), t;
      }
      function Ss() {
        var t;
        return (t = so()) === null && (t = ro()) === null && (t = Te()), t;
      }
      function so() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 1).toLowerCase() === "q" ? (t = n.substr(e, 1), e++) : (t = null, u('"q"')), t !== null && (r = H()) !== null && (o = io()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], R.params || (R.params = {}), t = void (R.params.q = p)), t === null && (e = c), t;
      }
      function ro() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 7).toLowerCase() === "expires" ? (t = n.substr(e, 7), e += 7) : (t = null, u('"expires"')), t !== null && (r = H()) !== null && (o = it()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], R.params || (R.params = {}), t = void (R.params.expires = p)), t === null && (e = c), t;
      }
      function it() {
        var t, r, o;
        if (o = e, (r = g()) !== null) for (t = []; r !== null; ) t.push(r), r = g();
        else t = null;
        return t !== null && (t = parseInt(t.join(""))), t === null && (e = o), t;
      }
      function io() {
        var t, r, o, c, d, p, C, N;
        return p = e, C = e, n.charCodeAt(e) === 48 ? (t = "0", e++) : (t = null, u('"0"')), t !== null ? (N = e, n.charCodeAt(e) === 46 ? (r = ".", e++) : (r = null, u('"."')), r !== null && (o = (o = g()) !== null ? o : "") !== null && (c = (c = g()) !== null ? c : "") !== null && (d = (d = g()) !== null ? d : "") !== null ? r = [r, o, c, d] : (r = null, e = N), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = C)) : (t = null, e = C), t !== null && (t = function(j) {
          return parseFloat(n.substring(e, j));
        }(p)), t === null && (e = p), t;
      }
      function Te() {
        var t, r, o, c, d, p, C, N;
        return c = e, d = e, (t = q()) !== null ? (p = e, (r = H()) !== null && (o = oo()) !== null ? r = [r, o] : (r = null, e = p), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = d)) : (t = null, e = d), t !== null && (C = t[0], N = t[1], R.params || (R.params = {}), N = N === void 0 ? void 0 : N[1], t = void (R.params[C.toLowerCase()] = N)), t === null && (e = c), t;
      }
      function oo() {
        var t;
        return (t = q()) === null && (t = Mt()) === null && (t = vn()), t;
      }
      function lo() {
        var t;
        return n.substr(e, 6).toLowerCase() === "render" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"render"')), t === null && (n.substr(e, 7).toLowerCase() === "session" ? (t = n.substr(e, 7), e += 7) : (t = null, u('"session"')), t === null && (n.substr(e, 4).toLowerCase() === "icon" ? (t = n.substr(e, 4), e += 4) : (t = null, u('"icon"')), t === null && (n.substr(e, 5).toLowerCase() === "alert" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"alert"')), t === null && (t = q())))), t;
      }
      function As() {
        var t;
        return (t = ao()) === null && (t = Te()), t;
      }
      function ao() {
        var t, r, o, c;
        return c = e, n.substr(e, 8).toLowerCase() === "handling" ? (t = n.substr(e, 8), e += 8) : (t = null, u('"handling"')), t !== null && (r = H()) !== null ? (n.substr(e, 8).toLowerCase() === "optional" ? (o = n.substr(e, 8), e += 8) : (o = null, u('"optional"')), o === null && (n.substr(e, 8).toLowerCase() === "required" ? (o = n.substr(e, 8), e += 8) : (o = null, u('"required"')), o === null && (o = q())), o !== null ? t = [t, r, o] : (t = null, e = c)) : (t = null, e = c), t;
      }
      function uo() {
        var t, r, o, c, d, p, C, N;
        if (C = e, (t = co()) !== null) if ((r = De()) !== null) if ((o = po()) !== null) {
          for (c = [], N = e, (d = se()) !== null && (p = Rs()) !== null ? d = [d, p] : (d = null, e = N); d !== null; ) c.push(d), N = e, (d = se()) !== null && (p = Rs()) !== null ? d = [d, p] : (d = null, e = N);
          c !== null ? t = [t, r, o, c] : (t = null, e = C);
        } else t = null, e = C;
        else t = null, e = C;
        else t = null, e = C;
        return t;
      }
      function co() {
        var t;
        return (t = ho()) === null && (t = fo()), t;
      }
      function ho() {
        var t;
        return n.substr(e, 4).toLowerCase() === "text" ? (t = n.substr(e, 4), e += 4) : (t = null, u('"text"')), t === null && (n.substr(e, 5).toLowerCase() === "image" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"image"')), t === null && (n.substr(e, 5).toLowerCase() === "audio" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"audio"')), t === null && (n.substr(e, 5).toLowerCase() === "video" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"video"')), t === null && (n.substr(e, 11).toLowerCase() === "application" ? (t = n.substr(e, 11), e += 11) : (t = null, u('"application"')), t === null && (t = On()))))), t;
      }
      function fo() {
        var t;
        return n.substr(e, 7).toLowerCase() === "message" ? (t = n.substr(e, 7), e += 7) : (t = null, u('"message"')), t === null && (n.substr(e, 9).toLowerCase() === "multipart" ? (t = n.substr(e, 9), e += 9) : (t = null, u('"multipart"')), t === null && (t = On())), t;
      }
      function On() {
        var t;
        return (t = q()) === null && (t = _o()), t;
      }
      function _o() {
        var t, r, o;
        return o = e, n.substr(e, 2).toLowerCase() === "x-" ? (t = n.substr(e, 2), e += 2) : (t = null, u('"x-"')), t !== null && (r = q()) !== null ? t = [t, r] : (t = null, e = o), t;
      }
      function po() {
        var t;
        return (t = On()) === null && (t = q()), t;
      }
      function Rs() {
        var t, r, o, c;
        return c = e, (t = q()) !== null && (r = H()) !== null && (o = mo()) !== null ? t = [t, r, o] : (t = null, e = c), t;
      }
      function mo() {
        var t;
        return (t = q()) === null && (t = vn()), t;
      }
      function go() {
        var t, r, o, c;
        if (o = e, (r = g()) !== null) for (t = []; r !== null; ) t.push(r), r = g();
        else t = null;
        return t !== null && (c = t, t = void (R.value = parseInt(c.join("")))), t === null && (e = o), t;
      }
      function Wt() {
        var t, r, o, c, d, p;
        if (d = e, (t = Q()) !== null) {
          for (r = [], p = e, n.charCodeAt(e) === 46 ? (o = ".", e++) : (o = null, u('"."')), o !== null && (c = Q()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, n.charCodeAt(e) === 46 ? (o = ".", e++) : (o = null, u('"."')), o !== null && (c = Q()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }
      function ys() {
        var t;
        return (t = bs()) === null && (t = Te()), t;
      }
      function bs() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 3).toLowerCase() === "tag" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"tag"')), t !== null && (r = H()) !== null && (o = q()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], t = void (R.tag = p)), t === null && (e = c), t;
      }
      function ws() {
        var t, r, o, c, d, p, C, N;
        if (C = e, n.substr(e, 6).toLowerCase() === "digest" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"Digest"')), t !== null) if ((r = E()) !== null) if ((o = Nn()) !== null) {
          for (c = [], N = e, (d = de()) !== null && (p = Nn()) !== null ? d = [d, p] : (d = null, e = N); d !== null; ) c.push(d), N = e, (d = de()) !== null && (p = Nn()) !== null ? d = [d, p] : (d = null, e = N);
          c !== null ? t = [t, r, o, c] : (t = null, e = C);
        } else t = null, e = C;
        else t = null, e = C;
        else t = null, e = C;
        return t === null && (t = To()), t;
      }
      function To() {
        var t, r, o, c, d, p, C, N;
        if (C = e, (t = q()) !== null) if ((r = E()) !== null) if ((o = Gt()) !== null) {
          for (c = [], N = e, (d = de()) !== null && (p = Gt()) !== null ? d = [d, p] : (d = null, e = N); d !== null; ) c.push(d), N = e, (d = de()) !== null && (p = Gt()) !== null ? d = [d, p] : (d = null, e = N);
          c !== null ? t = [t, r, o, c] : (t = null, e = C);
        } else t = null, e = C;
        else t = null, e = C;
        else t = null, e = C;
        return t;
      }
      function Gt() {
        var t, r, o, c;
        return c = e, (t = q()) !== null && (r = H()) !== null ? ((o = q()) === null && (o = vn()), o !== null ? t = [t, r, o] : (t = null, e = c)) : (t = null, e = c), t;
      }
      function Nn() {
        var t;
        return (t = vo()) === null && (t = Co()) === null && (t = So()) === null && (t = Ro()) === null && (t = yo()) === null && (t = bo()) === null && (t = wo()) === null && (t = Gt()), t;
      }
      function vo() {
        var t, r, o, c;
        return c = e, n.substr(e, 5).toLowerCase() === "realm" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"realm"')), t !== null && (r = H()) !== null && (o = Eo()) !== null ? t = [t, r, o] : (t = null, e = c), t;
      }
      function Eo() {
        var t, r, o;
        return r = e, (t = xt()) !== null && (o = t, t = void (R.realm = o)), t === null && (e = r), t;
      }
      function Co() {
        var t, r, o, c, d, p, C, N, j;
        if (N = e, n.substr(e, 6).toLowerCase() === "domain" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"domain"')), t !== null) if ((r = H()) !== null) if ((o = us()) !== null) if ((c = Dn()) !== null) {
          if (d = [], j = e, (C = U()) !== null) for (p = []; C !== null; ) p.push(C), C = U();
          else p = null;
          for (p !== null && (C = Dn()) !== null ? p = [p, C] : (p = null, e = j); p !== null; ) {
            if (d.push(p), j = e, (C = U()) !== null) for (p = []; C !== null; ) p.push(C), C = U();
            else p = null;
            p !== null && (C = Dn()) !== null ? p = [p, C] : (p = null, e = j);
          }
          d !== null && (p = cs()) !== null ? t = [t, r, o, c, d, p] : (t = null, e = N);
        } else t = null, e = N;
        else t = null, e = N;
        else t = null, e = N;
        else t = null, e = N;
        return t;
      }
      function Dn() {
        var t;
        return (t = vs()) === null && (t = Rn()), t;
      }
      function So() {
        var t, r, o, c;
        return c = e, n.substr(e, 5).toLowerCase() === "nonce" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"nonce"')), t !== null && (r = H()) !== null && (o = Ao()) !== null ? t = [t, r, o] : (t = null, e = c), t;
      }
      function Ao() {
        var t, r, o;
        return r = e, (t = xt()) !== null && (o = t, t = void (R.nonce = o)), t === null && (e = r), t;
      }
      function Ro() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 6).toLowerCase() === "opaque" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"opaque"')), t !== null && (r = H()) !== null && (o = xt()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], t = void (R.opaque = p)), t === null && (e = c), t;
      }
      function yo() {
        var t, r, o, c, d;
        return c = e, n.substr(e, 5).toLowerCase() === "stale" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"stale"')), t !== null && (r = H()) !== null ? (d = e, n.substr(e, 4).toLowerCase() === "true" ? (o = n.substr(e, 4), e += 4) : (o = null, u('"true"')), o !== null && (o = void (R.stale = !0)), o === null && (e = d), o === null && (d = e, n.substr(e, 5).toLowerCase() === "false" ? (o = n.substr(e, 5), e += 5) : (o = null, u('"false"')), o !== null && (o = void (R.stale = !1)), o === null && (e = d)), o !== null ? t = [t, r, o] : (t = null, e = c)) : (t = null, e = c), t;
      }
      function bo() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 9).toLowerCase() === "algorithm" ? (t = n.substr(e, 9), e += 9) : (t = null, u('"algorithm"')), t !== null && (r = H()) !== null ? (n.substr(e, 3).toLowerCase() === "md5" ? (o = n.substr(e, 3), e += 3) : (o = null, u('"MD5"')), o === null && (n.substr(e, 8).toLowerCase() === "md5-sess" ? (o = n.substr(e, 8), e += 8) : (o = null, u('"MD5-sess"')), o === null && (o = q())), o !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (p = t[2], t = void (R.algorithm = p.toUpperCase())), t === null && (e = c), t;
      }
      function wo() {
        var t, r, o, c, d, p, C, N, j, X;
        if (N = e, n.substr(e, 3).toLowerCase() === "qop" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"qop"')), t !== null) if ((r = H()) !== null) if ((o = us()) !== null) {
          if (j = e, (c = Ln()) !== null) {
            for (d = [], X = e, n.charCodeAt(e) === 44 ? (p = ",", e++) : (p = null, u('","')), p !== null && (C = Ln()) !== null ? p = [p, C] : (p = null, e = X); p !== null; ) d.push(p), X = e, n.charCodeAt(e) === 44 ? (p = ",", e++) : (p = null, u('","')), p !== null && (C = Ln()) !== null ? p = [p, C] : (p = null, e = X);
            d !== null ? c = [c, d] : (c = null, e = j);
          } else c = null, e = j;
          c !== null && (d = cs()) !== null ? t = [t, r, o, c, d] : (t = null, e = N);
        } else t = null, e = N;
        else t = null, e = N;
        else t = null, e = N;
        return t;
      }
      function Ln() {
        var t, r, o;
        return r = e, n.substr(e, 8).toLowerCase() === "auth-int" ? (t = n.substr(e, 8), e += 8) : (t = null, u('"auth-int"')), t === null && (n.substr(e, 4).toLowerCase() === "auth" ? (t = n.substr(e, 4), e += 4) : (t = null, u('"auth"')), t === null && (t = q())), t !== null && (o = t, R.qop || (R.qop = []), t = void R.qop.push(o.toLowerCase())), t === null && (e = r), t;
      }
      function Pn() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, (t = rt()) !== null) {
          for (r = [], C = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = C); o !== null; ) r.push(o), C = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = C);
          r !== null ? t = [t, r] : (t = null, e = p);
        } else t = null, e = p;
        return t !== null && (t = function(N) {
          var j;
          R.multi_header || (R.multi_header = []);
          try {
            j = new St(R.uri, R.display_name, R.params), delete R.uri, delete R.display_name, delete R.params;
          } catch {
            j = null;
          }
          R.multi_header.push({ possition: e, offset: N, parsed: j });
        }(d)), t === null && (e = d), t;
      }
      function Is() {
        var t;
        return (t = Io()) === null && (t = Te()), t;
      }
      function Io() {
        var t, r, o, c, d, p, C;
        if (d = e, p = e, n.substr(e, 5).toLowerCase() === "cause" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"cause"')), t !== null) if ((r = H()) !== null) {
          if ((c = g()) !== null) for (o = []; c !== null; ) o.push(c), c = g();
          else o = null;
          o !== null ? t = [t, r, o] : (t = null, e = p);
        } else t = null, e = p;
        else t = null, e = p;
        return t !== null && (C = t[2], t = void (R.cause = parseInt(C.join("")))), t === null && (e = d), t;
      }
      function xn() {
        var t, r, o, c, d, p;
        if (d = e, (t = rt()) !== null) {
          for (r = [], p = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = p); o !== null; ) r.push(o), p = e, (o = se()) !== null && (c = Te()) !== null ? o = [o, c] : (o = null, e = p);
          r !== null ? t = [t, r] : (t = null, e = d);
        } else t = null, e = d;
        return t;
      }
      function Oo() {
        var t, r;
        return r = e, n.substr(e, 6).toLowerCase() === "active" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"active"')), t === null && (n.substr(e, 7).toLowerCase() === "pending" ? (t = n.substr(e, 7), e += 7) : (t = null, u('"pending"')), t === null && (n.substr(e, 10).toLowerCase() === "terminated" ? (t = n.substr(e, 10), e += 10) : (t = null, u('"terminated"')), t === null && (t = q()))), t !== null && (t = function(o) {
          R.state = n.substring(e, o);
        }(r)), t === null && (e = r), t;
      }
      function Os() {
        var t, r, o, c, d, p, C, N;
        return c = e, d = e, n.substr(e, 6).toLowerCase() === "reason" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"reason"')), t !== null && (r = H()) !== null && (o = No()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (t = void ((p = t[2]) !== void 0 && (R.reason = p))), t === null && (e = c), t === null && (c = e, d = e, n.substr(e, 7).toLowerCase() === "expires" ? (t = n.substr(e, 7), e += 7) : (t = null, u('"expires"')), t !== null && (r = H()) !== null && (o = it()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (t = void ((N = t[2]) !== void 0 && (R.expires = N))), t === null && (e = c), t === null && (c = e, d = e, n.substr(e, 11).toLowerCase() === "retry_after" ? (t = n.substr(e, 11), e += 11) : (t = null, u('"retry_after"')), t !== null && (r = H()) !== null && (o = it()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (t = void ((C = t[2]) !== void 0 && (R.retry_after = C))), t === null && (e = c), t === null && (t = Te()))), t;
      }
      function No() {
        var t;
        return n.substr(e, 11).toLowerCase() === "deactivated" ? (t = n.substr(e, 11), e += 11) : (t = null, u('"deactivated"')), t === null && (n.substr(e, 9).toLowerCase() === "probation" ? (t = n.substr(e, 9), e += 9) : (t = null, u('"probation"')), t === null && (n.substr(e, 8).toLowerCase() === "rejected" ? (t = n.substr(e, 8), e += 8) : (t = null, u('"rejected"')), t === null && (n.substr(e, 7).toLowerCase() === "timeout" ? (t = n.substr(e, 7), e += 7) : (t = null, u('"timeout"')), t === null && (n.substr(e, 6).toLowerCase() === "giveup" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"giveup"')), t === null && (n.substr(e, 10).toLowerCase() === "noresource" ? (t = n.substr(e, 10), e += 10) : (t = null, u('"noresource"')), t === null && (n.substr(e, 9).toLowerCase() === "invariant" ? (t = n.substr(e, 9), e += 9) : (t = null, u('"invariant"')), t === null && (t = q()))))))), t;
      }
      function Ns() {
        var t;
        return (t = bs()) === null && (t = Te()), t;
      }
      function Un() {
        var t, r, o, c, d, p, C, N;
        if (C = e, (t = Mo()) !== null) if ((r = E()) !== null) if ((o = qo()) !== null) {
          for (c = [], N = e, (d = se()) !== null && (p = Ds()) !== null ? d = [d, p] : (d = null, e = N); d !== null; ) c.push(d), N = e, (d = se()) !== null && (p = Ds()) !== null ? d = [d, p] : (d = null, e = N);
          c !== null ? t = [t, r, o, c] : (t = null, e = C);
        } else t = null, e = C;
        else t = null, e = C;
        else t = null, e = C;
        return t;
      }
      function Ds() {
        var t;
        return (t = Do()) === null && (t = Lo()) === null && (t = Po()) === null && (t = xo()) === null && (t = Uo()) === null && (t = Te()), t;
      }
      function Do() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 3).toLowerCase() === "ttl" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"ttl"')), t !== null && (r = H()) !== null && (o = Ls()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], t = void (R.ttl = p)), t === null && (e = c), t;
      }
      function Lo() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 5).toLowerCase() === "maddr" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"maddr"')), t !== null && (r = H()) !== null && (o = Mt()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], t = void (R.maddr = p)), t === null && (e = c), t;
      }
      function Po() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 8).toLowerCase() === "received" ? (t = n.substr(e, 8), e += 8) : (t = null, u('"received"')), t !== null && (r = H()) !== null ? ((o = $t()) === null && (o = gs()), o !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (p = t[2], t = void (R.received = p)), t === null && (e = c), t;
      }
      function xo() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 6).toLowerCase() === "branch" ? (t = n.substr(e, 6), e += 6) : (t = null, u('"branch"')), t !== null && (r = H()) !== null && (o = q()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], t = void (R.branch = p)), t === null && (e = c), t;
      }
      function Uo() {
        var t, r, o, c, d;
        return c = e, n.substr(e, 5).toLowerCase() === "rport" ? (t = n.substr(e, 5), e += 5) : (t = null, u('"rport"')), t !== null ? (d = e, (r = H()) !== null && (o = ko()) !== null ? r = [r, o] : (r = null, e = d), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t;
      }
      function ko() {
        var t, r, o, c, d, p, C, N;
        return p = e, C = e, (t = (t = g()) !== null ? t : "") !== null && (r = (r = g()) !== null ? r : "") !== null && (o = (o = g()) !== null ? o : "") !== null && (c = (c = g()) !== null ? c : "") !== null && (d = (d = g()) !== null ? d : "") !== null ? t = [t, r, o, c, d] : (t = null, e = C), t !== null && (N = t, t = void (R.rport = parseInt(N.join("")))), t === null && (e = p), t;
      }
      function Mo() {
        var t, r, o, c, d, p;
        return p = e, (t = $o()) !== null && (r = De()) !== null && (o = q()) !== null && (c = De()) !== null && (d = Fo()) !== null ? t = [t, r, o, c, d] : (t = null, e = p), t;
      }
      function $o() {
        var t, r, o;
        return r = e, n.substr(e, 3).toLowerCase() === "sip" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"SIP"')), t === null && (t = q()), t !== null && (o = t, t = void (R.protocol = o)), t === null && (e = r), t;
      }
      function Fo() {
        var t, r, o;
        return r = e, n.substr(e, 3).toLowerCase() === "udp" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"UDP"')), t === null && (n.substr(e, 3).toLowerCase() === "tcp" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"TCP"')), t === null && (n.substr(e, 3).toLowerCase() === "tls" ? (t = n.substr(e, 3), e += 3) : (t = null, u('"TLS"')), t === null && (n.substr(e, 4).toLowerCase() === "sctp" ? (t = n.substr(e, 4), e += 4) : (t = null, u('"SCTP"')), t === null && (t = q())))), t !== null && (o = t, t = void (R.transport = o)), t === null && (e = r), t;
      }
      function qo() {
        var t, r, o, c, d;
        return c = e, (t = Ho()) !== null ? (d = e, (r = hi()) !== null && (o = jo()) !== null ? r = [r, o] : (r = null, e = d), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = c)) : (t = null, e = c), t;
      }
      function Ho() {
        var t, r;
        return r = e, (t = $t()) === null && (t = ms()) === null && (t = _s()), t !== null && (t = function(o) {
          R.host = n.substring(e, o);
        }(r)), t === null && (e = r), t;
      }
      function jo() {
        var t, r, o, c, d, p, C, N;
        return p = e, C = e, (t = (t = g()) !== null ? t : "") !== null && (r = (r = g()) !== null ? r : "") !== null && (o = (o = g()) !== null ? o : "") !== null && (c = (c = g()) !== null ? c : "") !== null && (d = (d = g()) !== null ? d : "") !== null ? t = [t, r, o, c, d] : (t = null, e = C), t !== null && (N = t, t = void (R.port = parseInt(N.join("")))), t === null && (e = p), t;
      }
      function Ls() {
        var t, r, o, c, d;
        return c = e, d = e, (t = g()) !== null && (r = (r = g()) !== null ? r : "") !== null && (o = (o = g()) !== null ? o : "") !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (t = parseInt(t.join(""))), t === null && (e = c), t;
      }
      function Bo() {
        var t, r, o;
        return r = e, (t = it()) !== null && (o = t, t = void (R.expires = o)), t === null && (e = r), t;
      }
      function Ps() {
        var t;
        return (t = Wo()) === null && (t = Te()), t;
      }
      function Wo() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 9).toLowerCase() === "refresher" ? (t = n.substr(e, 9), e += 9) : (t = null, u('"refresher"')), t !== null && (r = H()) !== null ? (n.substr(e, 3).toLowerCase() === "uac" ? (o = n.substr(e, 3), e += 3) : (o = null, u('"uac"')), o === null && (n.substr(e, 3).toLowerCase() === "uas" ? (o = n.substr(e, 3), e += 3) : (o = null, u('"uas"'))), o !== null ? t = [t, r, o] : (t = null, e = d)) : (t = null, e = d), t !== null && (p = t[2], t = void (R.refresher = p.toLowerCase())), t === null && (e = c), t;
      }
      function Go() {
        var t, r;
        for (t = [], (r = M()) === null && (r = V()) === null && (r = E()); r !== null; ) t.push(r), (r = M()) === null && (r = V()) === null && (r = E());
        return t;
      }
      function Vo() {
        var t, r, o, c, d, p, C, N, j, X, we;
        return X = e, we = e, (t = Ko()) !== null ? (n.charCodeAt(e) === 45 ? (r = "-", e++) : (r = null, u('"-"')), r !== null && (o = Be()) !== null ? (n.charCodeAt(e) === 45 ? (c = "-", e++) : (c = null, u('"-"')), c !== null && (d = Be()) !== null ? (n.charCodeAt(e) === 45 ? (p = "-", e++) : (p = null, u('"-"')), p !== null && (C = Be()) !== null ? (n.charCodeAt(e) === 45 ? (N = "-", e++) : (N = null, u('"-"')), N !== null && (j = zo()) !== null ? t = [t, r, o, c, d, p, C, N, j] : (t = null, e = we)) : (t = null, e = we)) : (t = null, e = we)) : (t = null, e = we)) : (t = null, e = we), t !== null && (t = function(We, ks) {
          R = n.substring(e + 5, We);
        }(X, t[0])), t === null && (e = X), t;
      }
      function Be() {
        var t, r, o, c, d;
        return d = e, (t = S()) !== null && (r = S()) !== null && (o = S()) !== null && (c = S()) !== null ? t = [t, r, o, c] : (t = null, e = d), t;
      }
      function Ko() {
        var t, r, o;
        return o = e, (t = Be()) !== null && (r = Be()) !== null ? t = [t, r] : (t = null, e = o), t;
      }
      function zo() {
        var t, r, o, c;
        return c = e, (t = Be()) !== null && (r = Be()) !== null && (o = Be()) !== null ? t = [t, r, o] : (t = null, e = c), t;
      }
      function Jo() {
        var t, r, o, c, d, p;
        return c = e, d = e, (t = he()) !== null ? (p = e, n.charCodeAt(e) === 64 ? (r = "@", e++) : (r = null, u('"@"')), r !== null && (o = he()) !== null ? r = [r, o] : (r = null, e = p), (r = r !== null ? r : "") !== null ? t = [t, r] : (t = null, e = d)) : (t = null, e = d), t !== null && (t = function(C) {
          R.call_id = n.substring(e, C);
        }(c)), t === null && (e = c), t;
      }
      function xs() {
        var t;
        return (t = Xo()) === null && (t = Yo()) === null && (t = Qo()) === null && (t = Te()), t;
      }
      function Xo() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 6) === "to-tag" ? (t = "to-tag", e += 6) : (t = null, u('"to-tag"')), t !== null && (r = H()) !== null && (o = q()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], t = void (R.to_tag = p)), t === null && (e = c), t;
      }
      function Yo() {
        var t, r, o, c, d, p;
        return c = e, d = e, n.substr(e, 8) === "from-tag" ? (t = "from-tag", e += 8) : (t = null, u('"from-tag"')), t !== null && (r = H()) !== null && (o = q()) !== null ? t = [t, r, o] : (t = null, e = d), t !== null && (p = t[2], t = void (R.from_tag = p)), t === null && (e = c), t;
      }
      function Qo() {
        var t, r;
        return r = e, n.substr(e, 10) === "early-only" ? (t = "early-only", e += 10) : (t = null, u('"early-only"')), t !== null && (t = void (R.early_only = !0)), t === null && (e = r), t;
      }
      var Zo = Et(), St = oi(), R = {};
      if (l[a]() === null || e !== n.length) {
        var Us = Math.max(e, h), pu = Us < n.length ? n.charAt(Us) : null, el = function() {
          for (var t = 1, r = 1, o = !1, c = 0; c < Math.max(e, h); c++) {
            var d = n.charAt(c);
            d === `
` ? (o || t++, r = 1, o = !1) : d === "\r" || d === "\u2028" || d === "\u2029" ? (t++, r = 1, o = !0) : (r++, o = !1);
          }
          return { line: t, column: r };
        }();
        return new this.SyntaxError(function(t) {
          t.sort();
          for (var r = null, o = [], c = 0; c < t.length; c++) t[c] !== r && (o.push(t[c]), r = t[c]);
          return o;
        }(f), pu, Us, el.line, el.column), -1;
      }
      return R;
    }, toSource: function() {
      return this._source;
    }, SyntaxError: function(n, a, l, e, h) {
      this.name = "SyntaxError", this.expected = n, this.found = a, this.message = function(f, u) {
        var T;
        switch (f.length) {
          case 0:
            T = "end of input";
            break;
          case 1:
            T = f[0];
            break;
          default:
            T = f.slice(0, f.length - 1).join(", ") + " or " + f[f.length - 1];
        }
        return "Expected " + T + " but " + (u ? s(u) : "end of input") + " found.";
      }(n, a), this.offset = l, this.line = e, this.column = h;
    } };
    return i.SyntaxError.prototype = Error.prototype, i;
  }()), Hl;
}
function Et() {
  if (Bl) return Js;
  Bl = 1;
  const s = Ae, i = Ne(), n = je();
  return Js = class Za {
    static parse(l) {
      return (l = n.parse(l, "SIP_URI")) !== -1 ? l : void 0;
    }
    constructor(l, e, h, f, u = {}, T = {}) {
      if (!h) throw new TypeError('missing or invalid "host" parameter');
      this._parameters = {}, this._headers = {}, this._scheme = l || s.SIP, this._user = e, this._host = h, this._port = f;
      for (const g in u) Object.prototype.hasOwnProperty.call(u, g) && this.setParam(g, u[g]);
      for (const g in T) Object.prototype.hasOwnProperty.call(T, g) && this.setHeader(g, T[g]);
    }
    get scheme() {
      return this._scheme;
    }
    set scheme(l) {
      this._scheme = l.toLowerCase();
    }
    get user() {
      return this._user;
    }
    set user(l) {
      this._user = l;
    }
    get host() {
      return this._host;
    }
    set host(l) {
      this._host = l.toLowerCase();
    }
    get port() {
      return this._port;
    }
    set port(l) {
      this._port = l === 0 ? l : parseInt(l, 10) || null;
    }
    setParam(l, e) {
      l && (this._parameters[l.toLowerCase()] = e == null ? null : e.toString());
    }
    getParam(l) {
      if (l) return this._parameters[l.toLowerCase()];
    }
    hasParam(l) {
      if (l) return !!this._parameters.hasOwnProperty(l.toLowerCase());
    }
    deleteParam(l) {
      if (l = l.toLowerCase(), this._parameters.hasOwnProperty(l)) {
        const e = this._parameters[l];
        return delete this._parameters[l], e;
      }
    }
    clearParams() {
      this._parameters = {};
    }
    setHeader(l, e) {
      this._headers[i.headerize(l)] = Array.isArray(e) ? e : [e];
    }
    getHeader(l) {
      if (l) return this._headers[i.headerize(l)];
    }
    hasHeader(l) {
      if (l) return !!this._headers.hasOwnProperty(i.headerize(l));
    }
    deleteHeader(l) {
      if (l = i.headerize(l), this._headers.hasOwnProperty(l)) {
        const e = this._headers[l];
        return delete this._headers[l], e;
      }
    }
    clearHeaders() {
      this._headers = {};
    }
    clone() {
      return new Za(this._scheme, this._user, this._host, this._port, JSON.parse(JSON.stringify(this._parameters)), JSON.parse(JSON.stringify(this._headers)));
    }
    toString() {
      const l = [];
      let e = `${this._scheme}:`;
      this._user && (e += `${i.escapeUser(this._user)}@`), e += this._host, (this._port || this._port === 0) && (e += `:${this._port}`);
      for (const h in this._parameters) Object.prototype.hasOwnProperty.call(this._parameters, h) && (e += `;${h}`, this._parameters[h] !== null && (e += `=${this._parameters[h]}`));
      for (const h in this._headers) if (Object.prototype.hasOwnProperty.call(this._headers, h)) for (const f of this._headers[h]) l.push(`${h}=${f}`);
      return l.length > 0 && (e += `?${l.join("&")}`), e;
    }
    toAor(l) {
      let e = `${this._scheme}:`;
      return this._user && (e += `${i.escapeUser(this._user)}@`), e += this._host, l && (this._port || this._port === 0) && (e += `:${this._port}`), e;
    }
  }, Js;
}
function Ne() {
  if (Wl) return _e;
  Wl = 1;
  const s = Ae, i = Et(), n = je();
  _e.str_utf8_length = (h) => unescape(encodeURIComponent(h)).length;
  const a = _e.isFunction = (h) => h !== void 0 && Object.prototype.toString.call(h) === "[object Function]";
  _e.isString = (h) => h !== void 0 && Object.prototype.toString.call(h) === "[object String]", _e.isDecimal = (h) => !isNaN(h) && parseFloat(h) === parseInt(h, 10), _e.isEmpty = (h) => h === null || h === "" || h === void 0 || Array.isArray(h) && h.length === 0 || typeof h == "number" && isNaN(h), _e.hasMethods = function(h, ...f) {
    for (const u of f) if (a(h[u])) return !1;
    return !0;
  };
  const l = _e.createRandomToken = (h, f = 32) => {
    let u, T, g = "";
    for (u = 0; u < h; u++) T = Math.random() * f | 0, g += T.toString(f);
    return g;
  };
  _e.newTag = () => l(10), _e.newUUID = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (h) => {
    const f = 16 * Math.random() | 0;
    return (h === "x" ? f : 3 & f | 8).toString(16);
  }), _e.hostType = (h) => {
    if (h) return (h = n.parse(h, "host")) !== -1 ? h.host_type : void 0;
  };
  const e = _e.escapeUser = (h) => encodeURIComponent(decodeURIComponent(h)).replace(/%3A/gi, ":").replace(/%2B/gi, "+").replace(/%3F/gi, "?").replace(/%2F/gi, "/");
  return _e.normalizeTarget = (h, f) => {
    if (h) {
      if (h instanceof i) return h;
      if (typeof h == "string") {
        const u = h.split("@");
        let T, g, A;
        switch (u.length) {
          case 1:
            if (!f) return;
            T = h, g = f;
            break;
          case 2:
            T = u[0], g = u[1];
            break;
          default:
            T = u.slice(0, u.length - 1).join("@"), g = u[u.length - 1];
        }
        return T = T.replace(/^(sips?|tel):/i, ""), /^[-.()]*\+?[0-9\-.()]+$/.test(T) && (T = T.replace(/[-.()]/g, "")), h = `${s.SIP}:${e(T)}@${g}`, (A = i.parse(h)) ? A : void 0;
      }
    }
  }, _e.headerize = (h) => {
    const f = { "Call-Id": "Call-ID", Cseq: "CSeq", "Www-Authenticate": "WWW-Authenticate" }, u = h.toLowerCase().replace(/_/g, "-").split("-");
    let T = "";
    const g = u.length;
    let A;
    for (A = 0; A < g; A++) A !== 0 && (T += "-"), T += u[A].charAt(0).toUpperCase() + u[A].substring(1);
    return f[T] && (T = f[T]), T;
  }, _e.sipErrorCause = (h) => {
    for (const f in s.SIP_ERROR_CAUSES) if (s.SIP_ERROR_CAUSES[f].indexOf(h) !== -1) return s.causes[f];
    return s.causes.SIP_FAILURE_CODE;
  }, _e.getRandomTestNetIP = () => {
    return `192.0.2.${h = 1, f = 254, Math.floor(Math.random() * (f - h + 1) + h)}`;
    var h, f;
  }, _e.calculateMD5 = (h) => {
    function f(I, D) {
      return I << D | I >>> 32 - D;
    }
    function u(I, D) {
      const $ = 2147483648 & I, M = 2147483648 & D, B = 1073741824 & I, V = 1073741824 & D, q = (1073741823 & I) + (1073741823 & D);
      return B & V ? 2147483648 ^ q ^ $ ^ M : B | V ? 1073741824 & q ? 3221225472 ^ q ^ $ ^ M : 1073741824 ^ q ^ $ ^ M : q ^ $ ^ M;
    }
    function T(I, D, $, M, B, V, q) {
      return I = u(I, u(u(function(Q, he, fe) {
        return Q & he | ~Q & fe;
      }(D, $, M), B), q)), u(f(I, V), D);
    }
    function g(I, D, $, M, B, V, q) {
      return I = u(I, u(u(function(Q, he, fe) {
        return Q & fe | he & ~fe;
      }(D, $, M), B), q)), u(f(I, V), D);
    }
    function A(I, D, $, M, B, V, q) {
      return I = u(I, u(u(function(Q, he, fe) {
        return Q ^ he ^ fe;
      }(D, $, M), B), q)), u(f(I, V), D);
    }
    function S(I, D, $, M, B, V, q) {
      return I = u(I, u(u(function(Q, he, fe) {
        return he ^ (Q | ~fe);
      }(D, $, M), B), q)), u(f(I, V), D);
    }
    function L(I) {
      let D, $, M = "", B = "";
      for ($ = 0; $ <= 3; $++) D = I >>> 8 * $ & 255, B = `0${D.toString(16)}`, M += B.substr(B.length - 2, 2);
      return M;
    }
    let w, y, U, O, z, k, _, m, v, E = [];
    for (h = function(I) {
      I = I.replace(/\r\n/g, `
`);
      let D = "";
      for (let $ = 0; $ < I.length; $++) {
        const M = I.charCodeAt($);
        M < 128 ? D += String.fromCharCode(M) : M > 127 && M < 2048 ? (D += String.fromCharCode(M >> 6 | 192), D += String.fromCharCode(63 & M | 128)) : (D += String.fromCharCode(M >> 12 | 224), D += String.fromCharCode(M >> 6 & 63 | 128), D += String.fromCharCode(63 & M | 128));
      }
      return D;
    }(h), E = function(I) {
      let D;
      const $ = I.length, M = $ + 8, B = 16 * ((M - M % 64) / 64 + 1), V = new Array(B - 1);
      let q = 0, Q = 0;
      for (; Q < $; ) D = (Q - Q % 4) / 4, q = Q % 4 * 8, V[D] = V[D] | I.charCodeAt(Q) << q, Q++;
      return D = (Q - Q % 4) / 4, q = Q % 4 * 8, V[D] = V[D] | 128 << q, V[B - 2] = $ << 3, V[B - 1] = $ >>> 29, V;
    }(h), k = 1732584193, _ = 4023233417, m = 2562383102, v = 271733878, w = 0; w < E.length; w += 16) y = k, U = _, O = m, z = v, k = T(k, _, m, v, E[w + 0], 7, 3614090360), v = T(v, k, _, m, E[w + 1], 12, 3905402710), m = T(m, v, k, _, E[w + 2], 17, 606105819), _ = T(_, m, v, k, E[w + 3], 22, 3250441966), k = T(k, _, m, v, E[w + 4], 7, 4118548399), v = T(v, k, _, m, E[w + 5], 12, 1200080426), m = T(m, v, k, _, E[w + 6], 17, 2821735955), _ = T(_, m, v, k, E[w + 7], 22, 4249261313), k = T(k, _, m, v, E[w + 8], 7, 1770035416), v = T(v, k, _, m, E[w + 9], 12, 2336552879), m = T(m, v, k, _, E[w + 10], 17, 4294925233), _ = T(_, m, v, k, E[w + 11], 22, 2304563134), k = T(k, _, m, v, E[w + 12], 7, 1804603682), v = T(v, k, _, m, E[w + 13], 12, 4254626195), m = T(m, v, k, _, E[w + 14], 17, 2792965006), _ = T(_, m, v, k, E[w + 15], 22, 1236535329), k = g(k, _, m, v, E[w + 1], 5, 4129170786), v = g(v, k, _, m, E[w + 6], 9, 3225465664), m = g(m, v, k, _, E[w + 11], 14, 643717713), _ = g(_, m, v, k, E[w + 0], 20, 3921069994), k = g(k, _, m, v, E[w + 5], 5, 3593408605), v = g(v, k, _, m, E[w + 10], 9, 38016083), m = g(m, v, k, _, E[w + 15], 14, 3634488961), _ = g(_, m, v, k, E[w + 4], 20, 3889429448), k = g(k, _, m, v, E[w + 9], 5, 568446438), v = g(v, k, _, m, E[w + 14], 9, 3275163606), m = g(m, v, k, _, E[w + 3], 14, 4107603335), _ = g(_, m, v, k, E[w + 8], 20, 1163531501), k = g(k, _, m, v, E[w + 13], 5, 2850285829), v = g(v, k, _, m, E[w + 2], 9, 4243563512), m = g(m, v, k, _, E[w + 7], 14, 1735328473), _ = g(_, m, v, k, E[w + 12], 20, 2368359562), k = A(k, _, m, v, E[w + 5], 4, 4294588738), v = A(v, k, _, m, E[w + 8], 11, 2272392833), m = A(m, v, k, _, E[w + 11], 16, 1839030562), _ = A(_, m, v, k, E[w + 14], 23, 4259657740), k = A(k, _, m, v, E[w + 1], 4, 2763975236), v = A(v, k, _, m, E[w + 4], 11, 1272893353), m = A(m, v, k, _, E[w + 7], 16, 4139469664), _ = A(_, m, v, k, E[w + 10], 23, 3200236656), k = A(k, _, m, v, E[w + 13], 4, 681279174), v = A(v, k, _, m, E[w + 0], 11, 3936430074), m = A(m, v, k, _, E[w + 3], 16, 3572445317), _ = A(_, m, v, k, E[w + 6], 23, 76029189), k = A(k, _, m, v, E[w + 9], 4, 3654602809), v = A(v, k, _, m, E[w + 12], 11, 3873151461), m = A(m, v, k, _, E[w + 15], 16, 530742520), _ = A(_, m, v, k, E[w + 2], 23, 3299628645), k = S(k, _, m, v, E[w + 0], 6, 4096336452), v = S(v, k, _, m, E[w + 7], 10, 1126891415), m = S(m, v, k, _, E[w + 14], 15, 2878612391), _ = S(_, m, v, k, E[w + 5], 21, 4237533241), k = S(k, _, m, v, E[w + 12], 6, 1700485571), v = S(v, k, _, m, E[w + 3], 10, 2399980690), m = S(m, v, k, _, E[w + 10], 15, 4293915773), _ = S(_, m, v, k, E[w + 1], 21, 2240044497), k = S(k, _, m, v, E[w + 8], 6, 1873313359), v = S(v, k, _, m, E[w + 15], 10, 4264355552), m = S(m, v, k, _, E[w + 6], 15, 2734768916), _ = S(_, m, v, k, E[w + 13], 21, 1309151649), k = S(k, _, m, v, E[w + 4], 6, 4149444226), v = S(v, k, _, m, E[w + 11], 10, 3174756917), m = S(m, v, k, _, E[w + 2], 15, 718787259), _ = S(_, m, v, k, E[w + 9], 21, 3951481745), k = u(k, y), _ = u(_, U), m = u(m, O), v = u(v, z);
    return (L(k) + L(_) + L(m) + L(v)).toLowerCase();
  }, _e.closeMediaStream = (h) => {
    if (h) try {
      let f;
      if (h.getTracks) {
        f = h.getTracks();
        for (const u of f) u.stop();
      } else {
        f = h.getAudioTracks();
        for (const u of f) u.stop();
        f = h.getVideoTracks();
        for (const u of f) u.stop();
      }
    } catch {
      typeof h.stop != "function" && typeof h.stop != "object" || h.stop();
    }
  }, _e.cloneArray = (h) => h && h.slice() || [], _e.cloneObject = (h, f = {}) => h && Object.assign({}, h) || f, _e;
}
function Ze() {
}
function oe() {
  oe.init.call(this);
}
function eu(s) {
  return s._maxListeners === void 0 ? oe.defaultMaxListeners : s._maxListeners;
}
function Gl(s, i, n, a) {
  var l, e, h, f;
  if (typeof n != "function") throw new TypeError('"listener" argument must be a function');
  if ((e = s._events) ? (e.newListener && (s.emit("newListener", i, n.listener ? n.listener : n), e = s._events), h = e[i]) : (e = s._events = new Ze(), s._eventsCount = 0), h) {
    if (typeof h == "function" ? h = e[i] = a ? [n, h] : [h, n] : a ? h.unshift(n) : h.push(n), !h.warned && (l = eu(s)) && l > 0 && h.length > l) {
      h.warned = !0;
      var u = new Error("Possible EventEmitter memory leak detected. " + h.length + " " + i + " listeners added. Use emitter.setMaxListeners() to increase limit");
      u.name = "MaxListenersExceededWarning", u.emitter = s, u.type = i, u.count = h.length, f = u, typeof console.warn == "function" ? console.warn(f) : console.log(f);
    }
  } else h = e[i] = n, ++s._eventsCount;
  return s;
}
function Vl(s, i, n) {
  var a = !1;
  function l() {
    s.removeListener(i, l), a || (a = !0, n.apply(s, arguments));
  }
  return l.listener = n, l;
}
function Kl(s) {
  var i = this._events;
  if (i) {
    var n = i[s];
    if (typeof n == "function") return 1;
    if (n) return n.length;
  }
  return 0;
}
function zt(s, i) {
  for (var n = new Array(i); i--; ) n[i] = s[i];
  return n;
}
Ze.prototype = /* @__PURE__ */ Object.create(null), oe.EventEmitter = oe, oe.usingDomains = !1, oe.prototype.domain = void 0, oe.prototype._events = void 0, oe.prototype._maxListeners = void 0, oe.defaultMaxListeners = 10, oe.init = function() {
  this.domain = null, oe.usingDomains && (void 0).active, this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new Ze(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, oe.prototype.setMaxListeners = function(s) {
  if (typeof s != "number" || s < 0 || isNaN(s)) throw new TypeError('"n" argument must be a positive number');
  return this._maxListeners = s, this;
}, oe.prototype.getMaxListeners = function() {
  return eu(this);
}, oe.prototype.emit = function(s) {
  var i, n, a, l, e, h, f, u = s === "error";
  if (h = this._events) u = u && h.error == null;
  else if (!u) return !1;
  if (f = this.domain, u) {
    if (i = arguments[1], !f) {
      if (i instanceof Error) throw i;
      var T = new Error('Uncaught, unspecified "error" event. (' + i + ")");
      throw T.context = i, T;
    }
    return i || (i = new Error('Uncaught, unspecified "error" event')), i.domainEmitter = this, i.domain = f, i.domainThrown = !1, f.emit("error", i), !1;
  }
  if (!(n = h[s])) return !1;
  var g = typeof n == "function";
  switch (a = arguments.length) {
    case 1:
      (function(A, S, L) {
        if (S) A.call(L);
        else for (var w = A.length, y = zt(A, w), U = 0; U < w; ++U) y[U].call(L);
      })(n, g, this);
      break;
    case 2:
      (function(A, S, L, w) {
        if (S) A.call(L, w);
        else for (var y = A.length, U = zt(A, y), O = 0; O < y; ++O) U[O].call(L, w);
      })(n, g, this, arguments[1]);
      break;
    case 3:
      (function(A, S, L, w, y) {
        if (S) A.call(L, w, y);
        else for (var U = A.length, O = zt(A, U), z = 0; z < U; ++z) O[z].call(L, w, y);
      })(n, g, this, arguments[1], arguments[2]);
      break;
    case 4:
      (function(A, S, L, w, y, U) {
        if (S) A.call(L, w, y, U);
        else for (var O = A.length, z = zt(A, O), k = 0; k < O; ++k) z[k].call(L, w, y, U);
      })(n, g, this, arguments[1], arguments[2], arguments[3]);
      break;
    default:
      for (l = new Array(a - 1), e = 1; e < a; e++) l[e - 1] = arguments[e];
      (function(A, S, L, w) {
        if (S) A.apply(L, w);
        else for (var y = A.length, U = zt(A, y), O = 0; O < y; ++O) U[O].apply(L, w);
      })(n, g, this, l);
  }
  return !0;
}, oe.prototype.addListener = function(s, i) {
  return Gl(this, s, i, !1);
}, oe.prototype.on = oe.prototype.addListener, oe.prototype.prependListener = function(s, i) {
  return Gl(this, s, i, !0);
}, oe.prototype.once = function(s, i) {
  if (typeof i != "function") throw new TypeError('"listener" argument must be a function');
  return this.on(s, Vl(this, s, i)), this;
}, oe.prototype.prependOnceListener = function(s, i) {
  if (typeof i != "function") throw new TypeError('"listener" argument must be a function');
  return this.prependListener(s, Vl(this, s, i)), this;
}, oe.prototype.removeListener = function(s, i) {
  var n, a, l, e, h;
  if (typeof i != "function") throw new TypeError('"listener" argument must be a function');
  if (!(a = this._events)) return this;
  if (!(n = a[s])) return this;
  if (n === i || n.listener && n.listener === i) --this._eventsCount == 0 ? this._events = new Ze() : (delete a[s], a.removeListener && this.emit("removeListener", s, n.listener || i));
  else if (typeof n != "function") {
    for (l = -1, e = n.length; e-- > 0; ) if (n[e] === i || n[e].listener && n[e].listener === i) {
      h = n[e].listener, l = e;
      break;
    }
    if (l < 0) return this;
    if (n.length === 1) {
      if (n[0] = void 0, --this._eventsCount == 0) return this._events = new Ze(), this;
      delete a[s];
    } else (function(f, u) {
      for (var T = u, g = T + 1, A = f.length; g < A; T += 1, g += 1) f[T] = f[g];
      f.pop();
    })(n, l);
    a.removeListener && this.emit("removeListener", s, h || i);
  }
  return this;
}, oe.prototype.off = function(s, i) {
  return this.removeListener(s, i);
}, oe.prototype.removeAllListeners = function(s) {
  var i, n;
  if (!(n = this._events)) return this;
  if (!n.removeListener) return arguments.length === 0 ? (this._events = new Ze(), this._eventsCount = 0) : n[s] && (--this._eventsCount == 0 ? this._events = new Ze() : delete n[s]), this;
  if (arguments.length === 0) {
    for (var a, l = Object.keys(n), e = 0; e < l.length; ++e) (a = l[e]) !== "removeListener" && this.removeAllListeners(a);
    return this.removeAllListeners("removeListener"), this._events = new Ze(), this._eventsCount = 0, this;
  }
  if (typeof (i = n[s]) == "function") this.removeListener(s, i);
  else if (i) do
    this.removeListener(s, i[i.length - 1]);
  while (i[0]);
  return this;
}, oe.prototype.listeners = function(s) {
  var i, n = this._events;
  return n && (i = n[s]) ? typeof i == "function" ? [i.listener || i] : function(a) {
    for (var l = new Array(a.length), e = 0; e < l.length; ++e) l[e] = a[e].listener || a[e];
    return l;
  }(i) : [];
}, oe.listenerCount = function(s, i) {
  return typeof s.listenerCount == "function" ? s.listenerCount(i) : Kl.call(s, i);
}, oe.prototype.listenerCount = Kl, oe.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
var Ct = wu(Object.freeze({ __proto__: null, default: oe, EventEmitter: oe })), He = {}, tu = {}, ns = {}, zl = { get exports() {
  return ns;
}, set exports(s) {
  ns = s;
} }.exports = { v: [{ name: "version", reg: /^(\d*)$/ }], o: [{ name: "origin", reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/, names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"], format: "%s %s %d %s IP%d %s" }], s: [{ name: "name" }], i: [{ name: "description" }], u: [{ name: "uri" }], e: [{ name: "email" }], p: [{ name: "phone" }], z: [{ name: "timezones" }], r: [{ name: "repeats" }], t: [{ name: "timing", reg: /^(\d*) (\d*)/, names: ["start", "stop"], format: "%d %d" }], c: [{ name: "connection", reg: /^IN IP(\d) (\S*)/, names: ["version", "ip"], format: "IN IP%d %s" }], b: [{ push: "bandwidth", reg: /^(TIAS|AS|CT|RR|RS):(\d*)/, names: ["type", "limit"], format: "%s:%s" }], m: [{ reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/, names: ["type", "port", "protocol", "payloads"], format: "%s %d %s %s" }], a: [{ push: "rtp", reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/, names: ["payload", "codec", "rate", "encoding"], format: function(s) {
  return s.encoding ? "rtpmap:%d %s/%s/%s" : s.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
} }, { push: "fmtp", reg: /^fmtp:(\d*) ([\S| ]*)/, names: ["payload", "config"], format: "fmtp:%d %s" }, { name: "control", reg: /^control:(.*)/, format: "control:%s" }, { name: "rtcp", reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/, names: ["port", "netType", "ipVer", "address"], format: function(s) {
  return s.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
} }, { push: "rtcpFbTrrInt", reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/, names: ["payload", "value"], format: "rtcp-fb:%s trr-int %d" }, { push: "rtcpFb", reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/, names: ["payload", "type", "subtype"], format: function(s) {
  return s.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
} }, { push: "ext", reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/, names: ["value", "direction", "encrypt-uri", "uri", "config"], format: function(s) {
  return "extmap:%d" + (s.direction ? "/%s" : "%v") + (s["encrypt-uri"] ? " %s" : "%v") + " %s" + (s.config ? " %s" : "");
} }, { name: "extmapAllowMixed", reg: /^(extmap-allow-mixed)/ }, { push: "crypto", reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/, names: ["id", "suite", "config", "sessionConfig"], format: function(s) {
  return s.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
} }, { name: "setup", reg: /^setup:(\w*)/, format: "setup:%s" }, { name: "connectionType", reg: /^connection:(new|existing)/, format: "connection:%s" }, { name: "mid", reg: /^mid:([^\s]*)/, format: "mid:%s" }, { name: "msid", reg: /^msid:(.*)/, format: "msid:%s" }, { name: "ptime", reg: /^ptime:(\d*(?:\.\d*)*)/, format: "ptime:%d" }, { name: "maxptime", reg: /^maxptime:(\d*(?:\.\d*)*)/, format: "maxptime:%d" }, { name: "direction", reg: /^(sendrecv|recvonly|sendonly|inactive)/ }, { name: "icelite", reg: /^(ice-lite)/ }, { name: "iceUfrag", reg: /^ice-ufrag:(\S*)/, format: "ice-ufrag:%s" }, { name: "icePwd", reg: /^ice-pwd:(\S*)/, format: "ice-pwd:%s" }, { name: "fingerprint", reg: /^fingerprint:(\S*) (\S*)/, names: ["type", "hash"], format: "fingerprint:%s %s" }, { push: "candidates", reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/, names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"], format: function(s) {
  var i = "candidate:%s %d %s %d %s %d typ %s";
  return i += s.raddr != null ? " raddr %s rport %d" : "%v%v", i += s.tcptype != null ? " tcptype %s" : "%v", s.generation != null && (i += " generation %d"), i += s["network-id"] != null ? " network-id %d" : "%v", i += s["network-cost"] != null ? " network-cost %d" : "%v";
} }, { name: "endOfCandidates", reg: /^(end-of-candidates)/ }, { name: "remoteCandidates", reg: /^remote-candidates:(.*)/, format: "remote-candidates:%s" }, { name: "iceOptions", reg: /^ice-options:(\S*)/, format: "ice-options:%s" }, { push: "ssrcs", reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/, names: ["id", "attribute", "value"], format: function(s) {
  var i = "ssrc:%d";
  return s.attribute != null && (i += " %s", s.value != null && (i += ":%s")), i;
} }, { push: "ssrcGroups", reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/, names: ["semantics", "ssrcs"], format: "ssrc-group:%s %s" }, { name: "msidSemantic", reg: /^msid-semantic:\s?(\w*) (\S*)/, names: ["semantic", "token"], format: "msid-semantic: %s %s" }, { push: "groups", reg: /^group:(\w*) (.*)/, names: ["type", "mids"], format: "group:%s %s" }, { name: "rtcpMux", reg: /^(rtcp-mux)/ }, { name: "rtcpRsize", reg: /^(rtcp-rsize)/ }, { name: "sctpmap", reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/, names: ["sctpmapNumber", "app", "maxMessageSize"], format: function(s) {
  return s.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
} }, { name: "xGoogleFlag", reg: /^x-google-flag:([^\s]*)/, format: "x-google-flag:%s" }, { push: "rids", reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/, names: ["id", "direction", "params"], format: function(s) {
  return s.params ? "rid:%s %s %s" : "rid:%s %s";
} }, { push: "imageattrs", reg: new RegExp("^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"), names: ["pt", "dir1", "attrs1", "dir2", "attrs2"], format: function(s) {
  return "imageattr:%s %s %s" + (s.dir2 ? " %s %s" : "");
} }, { name: "simulcast", reg: new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"), names: ["dir1", "list1", "dir2", "list2"], format: function(s) {
  return "simulcast:%s %s" + (s.dir2 ? " %s %s" : "");
} }, { name: "simulcast_03", reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/, names: ["value"], format: "simulcast: %s" }, { name: "framerate", reg: /^framerate:(\d+(?:$|\.\d+))/, format: "framerate:%s" }, { name: "sourceFilter", reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/, names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"], format: "source-filter: %s %s %s %s %s" }, { name: "bundleOnly", reg: /^(bundle-only)/ }, { name: "label", reg: /^label:(.+)/, format: "label:%s" }, { name: "sctpPort", reg: /^sctp-port:(\d+)$/, format: "sctp-port:%s" }, { name: "maxMessageSize", reg: /^max-message-size:(\d+)$/, format: "max-message-size:%s" }, { push: "tsRefClocks", reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/, names: ["clksrc", "clksrcExt"], format: function(s) {
  return "ts-refclk:%s" + (s.clksrcExt != null ? "=%s" : "");
} }, { name: "mediaClk", reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/, names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"], format: function(s) {
  var i = "mediaclk:";
  return i += s.id != null ? "id=%s %s" : "%v%s", i += s.mediaClockValue != null ? "=%s" : "", i += s.rateNumerator != null ? " rate=%s" : "", i += s.rateDenominator != null ? "/%s" : "";
} }, { name: "keywords", reg: /^keywds:(.+)$/, format: "keywds:%s" }, { name: "content", reg: /^content:(.+)/, format: "content:%s" }, { name: "bfcpFloorCtrl", reg: /^floorctrl:(c-only|s-only|c-s)/, format: "floorctrl:%s" }, { name: "bfcpConfId", reg: /^confid:(\d+)/, format: "confid:%s" }, { name: "bfcpUserId", reg: /^userid:(\d+)/, format: "userid:%s" }, { name: "bfcpFloorId", reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/, names: ["id", "mStream"], format: "floorid:%s mstrm:%s" }, { push: "invalid", names: ["value"] }] };
Object.keys(zl).forEach(function(s) {
  zl[s].forEach(function(i) {
    i.reg || (i.reg = /(.*)/), i.format || (i.format = "%s");
  });
}), function(s) {
  var i = function(h) {
    return String(Number(h)) === h ? Number(h) : h;
  }, n = function(h, f, u) {
    var T = h.name && h.names;
    h.push && !f[h.push] ? f[h.push] = [] : T && !f[h.name] && (f[h.name] = {});
    var g = h.push ? {} : T ? f[h.name] : f;
    (function(A, S, L, w) {
      if (w && !L) S[w] = i(A[1]);
      else for (var y = 0; y < L.length; y += 1) A[y + 1] != null && (S[L[y]] = i(A[y + 1]));
    })(u.match(h.reg), g, h.names, h.name), h.push && f[h.push].push(g);
  }, a = ns, l = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
  s.parse = function(h) {
    var f = {}, u = [], T = f;
    return h.split(/(\r\n|\r|\n)/).filter(l).forEach(function(g) {
      var A = g[0], S = g.slice(2);
      A === "m" && (u.push({ rtp: [], fmtp: [] }), T = u[u.length - 1]);
      for (var L = 0; L < (a[A] || []).length; L += 1) {
        var w = a[A][L];
        if (w.reg.test(S)) return n(w, T, S);
      }
    }), f.media = u, f;
  };
  var e = function(h, f) {
    var u = f.split(/=(.+)/, 2);
    return u.length === 2 ? h[u[0]] = i(u[1]) : u.length === 1 && f.length > 1 && (h[u[0]] = void 0), h;
  };
  s.parseParams = function(h) {
    return h.split(/;\s?/).reduce(e, {});
  }, s.parseFmtpConfig = s.parseParams, s.parsePayloads = function(h) {
    return h.toString().split(" ").map(Number);
  }, s.parseRemoteCandidates = function(h) {
    for (var f = [], u = h.split(" ").map(i), T = 0; T < u.length; T += 3) f.push({ component: u[T], ip: u[T + 1], port: u[T + 2] });
    return f;
  }, s.parseImageAttributes = function(h) {
    return h.split(" ").map(function(f) {
      return f.substring(1, f.length - 1).split(",").reduce(e, {});
    });
  }, s.parseSimulcastStreamList = function(h) {
    return h.split(";").map(function(f) {
      return f.split(",").map(function(u) {
        var T, g = !1;
        return u[0] !== "~" ? T = i(u) : (T = i(u.substring(1, u.length)), g = !0), { scid: T, paused: g };
      });
    });
  };
}(tu);
var Xs = ns, ed = /%[sdv%]/g, td = function(s) {
  var i = 1, n = arguments, a = n.length;
  return s.replace(ed, function(l) {
    if (i >= a) return l;
    var e = n[i];
    switch (i += 1, l) {
      case "%%":
        return "%";
      case "%s":
        return String(e);
      case "%d":
        return Number(e);
      case "%v":
        return "";
    }
  });
}, Jt = function(s, i, n) {
  var a = [s + "=" + (i.format instanceof Function ? i.format(i.push ? n : n[i.name]) : i.format)];
  if (i.names) for (var l = 0; l < i.names.length; l += 1) {
    var e = i.names[l];
    i.name ? a.push(n[i.name][e]) : a.push(n[i.names[l]]);
  }
  else a.push(n[i.name]);
  return td.apply(null, a);
}, nd = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"], sd = ["i", "c", "b", "a"], ut = tu, rd = function(s, i) {
  i = i || {}, s.version == null && (s.version = 0), s.name == null && (s.name = " "), s.media.forEach(function(e) {
    e.payloads == null && (e.payloads = "");
  });
  var n = i.outerOrder || nd, a = i.innerOrder || sd, l = [];
  return n.forEach(function(e) {
    Xs[e].forEach(function(h) {
      h.name in s && s[h.name] != null ? l.push(Jt(e, h, s)) : h.push in s && s[h.push] != null && s[h.push].forEach(function(f) {
        l.push(Jt(e, h, f));
      });
    });
  }), s.media.forEach(function(e) {
    l.push(Jt("m", Xs.m[0], e)), a.forEach(function(h) {
      Xs[h].forEach(function(f) {
        f.name in e && e[f.name] != null ? l.push(Jt(h, f, e)) : f.push in e && e[f.push] != null && e[f.push].forEach(function(u) {
          l.push(Jt(h, f, u));
        });
      });
    });
  }), l.join(`\r
`) + `\r
`;
};
He.write = rd;
var id = He.parse = ut.parse;
He.parseParams = ut.parseParams, He.parseFmtpConfig = ut.parseFmtpConfig, He.parsePayloads = ut.parsePayloads, He.parseRemoteCandidates = ut.parseRemoteCandidates, He.parseImageAttributes = ut.parseImageAttributes, He.parseSimulcastStreamList = ut.parseSimulcastStreamList;
var te = {}, od = function(s) {
  function i(l) {
    let e, h, f, u = null;
    function T(...g) {
      if (!T.enabled) return;
      const A = T, S = Number(/* @__PURE__ */ new Date()), L = S - (e || S);
      A.diff = L, A.prev = e, A.curr = S, e = S, g[0] = i.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
      let w = 0;
      g[0] = g[0].replace(/%([a-zA-Z%])/g, (y, U) => {
        if (y === "%%") return "%";
        w++;
        const O = i.formatters[U];
        if (typeof O == "function") {
          const z = g[w];
          y = O.call(A, z), g.splice(w, 1), w--;
        }
        return y;
      }), i.formatArgs.call(A, g), (A.log || i.log).apply(A, g);
    }
    return T.namespace = l, T.useColors = i.useColors(), T.color = i.selectColor(l), T.extend = n, T.destroy = i.destroy, Object.defineProperty(T, "enabled", { enumerable: !0, configurable: !1, get: () => u !== null ? u : (h !== i.namespaces && (h = i.namespaces, f = i.enabled(l)), f), set: (g) => {
      u = g;
    } }), typeof i.init == "function" && i.init(T), T;
  }
  function n(l, e) {
    const h = i(this.namespace + (e === void 0 ? ":" : e) + l);
    return h.log = this.log, h;
  }
  function a(l) {
    return l.toString().substring(2, l.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  return i.debug = i, i.default = i, i.coerce = function(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }, i.disable = function() {
    const l = [...i.names.map(a), ...i.skips.map(a).map((e) => "-" + e)].join(",");
    return i.enable(""), l;
  }, i.enable = function(l) {
    let e;
    i.save(l), i.namespaces = l, i.names = [], i.skips = [];
    const h = (typeof l == "string" ? l : "").split(/[\s,]+/), f = h.length;
    for (e = 0; e < f; e++) h[e] && ((l = h[e].replace(/\*/g, ".*?"))[0] === "-" ? i.skips.push(new RegExp("^" + l.slice(1) + "$")) : i.names.push(new RegExp("^" + l + "$")));
  }, i.enabled = function(l) {
    if (l[l.length - 1] === "*") return !0;
    let e, h;
    for (e = 0, h = i.skips.length; e < h; e++) if (i.skips[e].test(l)) return !1;
    for (e = 0, h = i.names.length; e < h; e++) if (i.names[e].test(l)) return !0;
    return !1;
  }, i.humanize = Ru, i.destroy = function() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }, Object.keys(s).forEach((l) => {
    i[l] = s[l];
  }), i.names = [], i.skips = [], i.formatters = {}, i.selectColor = function(l) {
    let e = 0;
    for (let h = 0; h < l.length; h++) e = (e << 5) - e + l.charCodeAt(h), e |= 0;
    return i.colors[Math.abs(e) % i.colors.length];
  }, i.enable(i.load()), i;
};
(function(s, i) {
  i.formatArgs = function(a) {
    if (a[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + a[0] + (this.useColors ? "%c " : " ") + "+" + s.exports.humanize(this.diff), !this.useColors) return;
    const l = "color: " + this.color;
    a.splice(1, 0, l, "color: inherit");
    let e = 0, h = 0;
    a[0].replace(/%[a-zA-Z%]/g, (f) => {
      f !== "%%" && (e++, f === "%c" && (h = e));
    }), a.splice(h, 0, l);
  }, i.save = function(a) {
    try {
      a ? i.storage.setItem("debug", a) : i.storage.removeItem("debug");
    } catch {
    }
  }, i.load = function() {
    let a;
    try {
      a = i.storage.getItem("debug");
    } catch {
    }
    return !a && typeof process < "u" && "env" in process && (a = process.env.DEBUG), a;
  }, i.useColors = function() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, i.storage = function() {
    try {
      return localStorage;
    } catch {
    }
  }(), i.destroy = /* @__PURE__ */ (() => {
    let a = !1;
    return () => {
      a || (a = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), i.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], i.log = console.debug || console.log || (() => {
  }), s.exports = od(i);
  const { formatters: n } = s.exports;
  n.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (l) {
      return "[UnexpectedJSONParseError]: " + l.message;
    }
  };
})({ get exports() {
  return te;
}, set exports(s) {
  te = s;
} }, te);
const nu = He, be = Ae, Ce = Ne(), Jl = oi(), ld = je(), Ys = te("JsSIP:SIPMessage");
class is {
  constructor(i, n, a, l, e, h) {
    if (!i || !n || !a) return null;
    l = l || {}, this.ua = a, this.headers = {}, this.method = i, this.ruri = n, this.body = h, this.extraHeaders = Ce.cloneArray(e), l.route_set ? this.setHeader("route", l.route_set) : a.configuration.use_preloaded_route && this.setHeader("route", `<${a.transport.sip_uri};lr>`), this.setHeader("via", ""), this.setHeader("max-forwards", be.MAX_FORWARDS);
    const f = l.to_uri || n, u = l.to_tag ? { tag: l.to_tag } : null, T = l.to_display_name !== void 0 ? l.to_display_name : null;
    this.to = new Jl(f, T, u), this.setHeader("to", this.to.toString());
    const g = l.from_uri || a.configuration.uri, A = { tag: l.from_tag || Ce.newTag() };
    let S;
    S = l.from_display_name !== void 0 ? l.from_display_name : a.configuration.display_name ? a.configuration.display_name : null, this.from = new Jl(g, S, A), this.setHeader("from", this.from.toString());
    const L = l.call_id || a.configuration.jssip_id + Ce.createRandomToken(15);
    this.call_id = L, this.setHeader("call-id", L);
    const w = l.cseq || Math.floor(1e4 * Math.random());
    this.cseq = w, this.setHeader("cseq", `${w} ${i}`);
  }
  setHeader(i, n) {
    const a = new RegExp(`^\\s*${i}\\s*:`, "i");
    for (let l = 0; l < this.extraHeaders.length; l++) a.test(this.extraHeaders[l]) && this.extraHeaders.splice(l, 1);
    this.headers[Ce.headerize(i)] = Array.isArray(n) ? n : [n];
  }
  getHeader(i) {
    const n = this.headers[Ce.headerize(i)];
    if (n) {
      if (n[0]) return n[0];
    } else {
      const a = new RegExp(`^\\s*${i}\\s*:`, "i");
      for (const l of this.extraHeaders) if (a.test(l)) return l.substring(l.indexOf(":") + 1).trim();
    }
  }
  getHeaders(i) {
    const n = this.headers[Ce.headerize(i)], a = [];
    if (n) {
      for (const l of n) a.push(l);
      return a;
    }
    {
      const l = new RegExp(`^\\s*${i}\\s*:`, "i");
      for (const e of this.extraHeaders) l.test(e) && a.push(e.substring(e.indexOf(":") + 1).trim());
      return a;
    }
  }
  hasHeader(i) {
    if (this.headers[Ce.headerize(i)]) return !0;
    {
      const n = new RegExp(`^\\s*${i}\\s*:`, "i");
      for (const a of this.extraHeaders) if (n.test(a)) return !0;
    }
    return !1;
  }
  parseSDP(i) {
    return !i && this.sdp || (this.sdp = nu.parse(this.body || "")), this.sdp;
  }
  toString() {
    let i = `${this.method} ${this.ruri} SIP/2.0\r
`;
    for (const l in this.headers) if (Object.prototype.hasOwnProperty.call(this.headers, l)) for (const e of this.headers[l]) i += `${l}: ${e}\r
`;
    for (const l of this.extraHeaders) i += `${l.trim()}\r
`;
    const n = [];
    switch (this.method) {
      case be.REGISTER:
        n.push("path", "gruu");
        break;
      case be.INVITE:
        this.ua.configuration.session_timers && n.push("timer"), (this.ua.contact.pub_gruu || this.ua.contact.temp_gruu) && n.push("gruu"), n.push("ice", "replaces");
        break;
      case be.UPDATE:
        this.ua.configuration.session_timers && n.push("timer"), n.push("ice");
    }
    n.push("outbound");
    const a = this.ua.configuration.user_agent || be.USER_AGENT;
    return i += `Allow: ${be.ALLOWED_METHODS}\r
`, i += `Supported: ${n}\r
`, i += `User-Agent: ${a}\r
`, this.body ? (i += `Content-Length: ${Ce.str_utf8_length(this.body)}\r
\r
`, i += this.body) : i += `Content-Length: 0\r
\r
`, i;
  }
  clone() {
    const i = new is(this.method, this.ruri, this.ua);
    return Object.keys(this.headers).forEach(function(n) {
      i.headers[n] = this.headers[n].slice();
    }, this), i.body = this.body, i.extraHeaders = Ce.cloneArray(this.extraHeaders), i.to = this.to, i.from = this.from, i.call_id = this.call_id, i.cseq = this.cseq, i;
  }
}
class li extends is {
  constructor(i, n, a, l, e) {
    super(be.INVITE, i, n, a, l, e), this.transaction = null;
  }
  cancel(i) {
    this.transaction.cancel(i);
  }
  clone() {
    const i = new li(this.ruri, this.ua);
    return Object.keys(this.headers).forEach(function(n) {
      i.headers[n] = this.headers[n].slice();
    }, this), i.body = this.body, i.extraHeaders = Ce.cloneArray(this.extraHeaders), i.to = this.to, i.from = this.from, i.call_id = this.call_id, i.cseq = this.cseq, i.transaction = this.transaction, i;
  }
}
class Xl {
  constructor() {
    this.data = null, this.headers = null, this.method = null, this.via = null, this.via_branch = null, this.call_id = null, this.cseq = null, this.from = null, this.from_tag = null, this.to = null, this.to_tag = null, this.body = null, this.sdp = null;
  }
  addHeader(i, n) {
    const a = { raw: n };
    i = Ce.headerize(i), this.headers[i] ? this.headers[i].push(a) : this.headers[i] = [a];
  }
  getHeader(i) {
    const n = this.headers[Ce.headerize(i)];
    if (n) return n[0] ? n[0].raw : void 0;
  }
  getHeaders(i) {
    const n = this.headers[Ce.headerize(i)], a = [];
    if (!n) return [];
    for (const l of n) a.push(l.raw);
    return a;
  }
  hasHeader(i) {
    return !!this.headers[Ce.headerize(i)];
  }
  parseHeader(i, n = 0) {
    if (i = Ce.headerize(i), !this.headers[i]) return void Ys(`header "${i}" not present`);
    if (n >= this.headers[i].length) return void Ys(`not so many "${i}" headers present`);
    const a = this.headers[i][n], l = a.raw;
    if (a.parsed) return a.parsed;
    const e = ld.parse(l, i.replace(/-/g, "_"));
    return e === -1 ? (this.headers[i].splice(n, 1), void Ys(`error parsing "${i}" header field with value "${l}"`)) : (a.parsed = e, e);
  }
  s(i, n) {
    return this.parseHeader(i, n);
  }
  setHeader(i, n) {
    const a = { raw: n };
    this.headers[Ce.headerize(i)] = [a];
  }
  parseSDP(i) {
    return !i && this.sdp || (this.sdp = nu.parse(this.body || "")), this.sdp;
  }
  toString() {
    return this.data;
  }
}
var nt = { OutgoingRequest: is, InitialOutgoingInviteRequest: li, IncomingRequest: class extends Xl {
  constructor(s) {
    super(), this.ua = s, this.headers = {}, this.ruri = null, this.transport = null, this.server_transaction = null;
  }
  reply(s, i, n, a, l, e) {
    const h = [];
    let f = this.getHeader("To");
    if (i = i || null, !(s = s || null) || s < 100 || s > 699) throw new TypeError(`Invalid status_code: ${s}`);
    if (i && typeof i != "string" && !(i instanceof String)) throw new TypeError(`Invalid reason_phrase: ${i}`);
    i = i || be.REASON_PHRASE[s] || "", n = Ce.cloneArray(n);
    let u = `SIP/2.0 ${s} ${i}\r
`;
    if (this.method === be.INVITE && s > 100 && s <= 200) {
      const g = this.getHeaders("record-route");
      for (const A of g) u += `Record-Route: ${A}\r
`;
    }
    const T = this.getHeaders("via");
    for (const g of T) u += `Via: ${g}\r
`;
    !this.to_tag && s > 100 ? f += `;tag=${Ce.newTag()}` : this.to_tag && !this.s("to").hasParam("tag") && (f += `;tag=${this.to_tag}`), u += `To: ${f}\r
`, u += `From: ${this.getHeader("From")}\r
`, u += `Call-ID: ${this.call_id}\r
`, u += `CSeq: ${this.cseq} ${this.method}\r
`;
    for (const g of n) u += `${g.trim()}\r
`;
    switch (this.method) {
      case be.INVITE:
        this.ua.configuration.session_timers && h.push("timer"), (this.ua.contact.pub_gruu || this.ua.contact.temp_gruu) && h.push("gruu"), h.push("ice", "replaces");
        break;
      case be.UPDATE:
        this.ua.configuration.session_timers && h.push("timer"), a && h.push("ice"), h.push("replaces");
    }
    h.push("outbound"), this.method === be.OPTIONS ? (u += `Allow: ${be.ALLOWED_METHODS}\r
`, u += `Accept: ${be.ACCEPTED_BODY_TYPES}\r
`) : s === 405 ? u += `Allow: ${be.ALLOWED_METHODS}\r
` : s === 415 && (u += `Accept: ${be.ACCEPTED_BODY_TYPES}\r
`), u += `Supported: ${h}\r
`, a ? (u += `Content-Type: application/sdp\r
`, u += `Content-Length: ${Ce.str_utf8_length(a)}\r
\r
`, u += a) : u += `Content-Length: 0\r
\r
`, this.server_transaction.receiveResponse(s, u, l, e);
  }
  reply_sl(s = null, i = null) {
    const n = this.getHeaders("via");
    if (!s || s < 100 || s > 699) throw new TypeError(`Invalid status_code: ${s}`);
    if (i && typeof i != "string" && !(i instanceof String)) throw new TypeError(`Invalid reason_phrase: ${i}`);
    let a = `SIP/2.0 ${s} ${i = i || be.REASON_PHRASE[s] || ""}\r
`;
    for (const e of n) a += `Via: ${e}\r
`;
    let l = this.getHeader("To");
    !this.to_tag && s > 100 ? l += `;tag=${Ce.newTag()}` : this.to_tag && !this.s("to").hasParam("tag") && (l += `;tag=${this.to_tag}`), a += `To: ${l}\r
`, a += `From: ${this.getHeader("From")}\r
`, a += `Call-ID: ${this.call_id}\r
`, a += `CSeq: ${this.cseq} ${this.method}\r
`, a += `Content-Length: 0\r
\r
`, this.transport.send(a);
  }
}, IncomingResponse: class extends Xl {
  constructor() {
    super(), this.headers = {}, this.status_code = null, this.reason_phrase = null;
  }
} };
const Ge = Ne(), Fn = te("JsSIP:DigestAuthentication"), et = te("JsSIP:ERROR:DigestAuthentication");
et.log = console.warn.bind(console);
const ad = 500;
var su = { T1: ad, T2: 4e3, TIMER_B: 32e3, TIMER_D: 0, TIMER_F: 32e3, TIMER_H: 32e3, TIMER_I: 0, TIMER_J: 0, TIMER_K: 0, TIMER_L: 32e3, TIMER_M: 32e3, PROVISIONAL_RESPONSE_INTERVAL: 6e4 };
const Xt = Ct.EventEmitter, Yt = Ae, Yl = nt, $e = su, Ql = te("JsSIP:NonInviteClientTransaction"), qn = te("JsSIP:InviteClientTransaction"), ud = te("JsSIP:AckClientTransaction"), Zl = te("JsSIP:NonInviteServerTransaction"), Hn = te("JsSIP:InviteServerTransaction"), W = { STATUS_TRYING: 1, STATUS_PROCEEDING: 2, STATUS_CALLING: 3, STATUS_ACCEPTED: 4, STATUS_COMPLETED: 5, STATUS_TERMINATED: 6, STATUS_CONFIRMED: 7, NON_INVITE_CLIENT: "nict", NON_INVITE_SERVER: "nist", INVITE_CLIENT: "ict", INVITE_SERVER: "ist" };
var gn = { C: W, NonInviteClientTransaction: class extends Xt {
  constructor(s, i, n, a) {
    super(), this.type = W.NON_INVITE_CLIENT, this.id = `z9hG4bK${Math.floor(1e7 * Math.random())}`, this.ua = s, this.transport = i, this.request = n, this.eventHandlers = a;
    let l = `SIP/2.0/${i.via_transport}`;
    l += ` ${s.configuration.via_host};branch=${this.id}`, this.request.setHeader("via", l), this.ua.newTransaction(this);
  }
  get C() {
    return W;
  }
  stateChanged(s) {
    this.state = s, this.emit("stateChanged");
  }
  send() {
    this.stateChanged(W.STATUS_TRYING), this.F = setTimeout(() => {
      this.timer_F();
    }, $e.TIMER_F), this.transport.send(this.request) || this.onTransportError();
  }
  onTransportError() {
    Ql(`transport error occurred, deleting transaction ${this.id}`), clearTimeout(this.F), clearTimeout(this.K), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this), this.eventHandlers.onTransportError();
  }
  timer_F() {
    Ql(`Timer F expired for transaction ${this.id}`), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this), this.eventHandlers.onRequestTimeout();
  }
  timer_K() {
    this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this);
  }
  receiveResponse(s) {
    const i = s.status_code;
    if (i < 200) switch (this.state) {
      case W.STATUS_TRYING:
      case W.STATUS_PROCEEDING:
        this.stateChanged(W.STATUS_PROCEEDING), this.eventHandlers.onReceiveResponse(s);
    }
    else switch (this.state) {
      case W.STATUS_TRYING:
      case W.STATUS_PROCEEDING:
        this.stateChanged(W.STATUS_COMPLETED), clearTimeout(this.F), i === 408 ? this.eventHandlers.onRequestTimeout() : this.eventHandlers.onReceiveResponse(s), this.K = setTimeout(() => {
          this.timer_K();
        }, $e.TIMER_K);
    }
  }
}, InviteClientTransaction: class extends Xt {
  constructor(s, i, n, a) {
    super(), this.type = W.INVITE_CLIENT, this.id = `z9hG4bK${Math.floor(1e7 * Math.random())}`, this.ua = s, this.transport = i, this.request = n, this.eventHandlers = a, n.transaction = this;
    let l = `SIP/2.0/${i.via_transport}`;
    l += ` ${s.configuration.via_host};branch=${this.id}`, this.request.setHeader("via", l), this.ua.newTransaction(this);
  }
  get C() {
    return W;
  }
  stateChanged(s) {
    this.state = s, this.emit("stateChanged");
  }
  send() {
    this.stateChanged(W.STATUS_CALLING), this.B = setTimeout(() => {
      this.timer_B();
    }, $e.TIMER_B), this.transport.send(this.request) || this.onTransportError();
  }
  onTransportError() {
    clearTimeout(this.B), clearTimeout(this.D), clearTimeout(this.M), this.state !== W.STATUS_ACCEPTED && (qn(`transport error occurred, deleting transaction ${this.id}`), this.eventHandlers.onTransportError()), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this);
  }
  timer_M() {
    qn(`Timer M expired for transaction ${this.id}`), this.state === W.STATUS_ACCEPTED && (clearTimeout(this.B), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this));
  }
  timer_B() {
    qn(`Timer B expired for transaction ${this.id}`), this.state === W.STATUS_CALLING && (this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this), this.eventHandlers.onRequestTimeout());
  }
  timer_D() {
    qn(`Timer D expired for transaction ${this.id}`), clearTimeout(this.B), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this);
  }
  sendACK(s) {
    const i = new Yl.OutgoingRequest(Yt.ACK, this.request.ruri, this.ua, { route_set: this.request.getHeaders("route"), call_id: this.request.getHeader("call-id"), cseq: this.request.cseq });
    i.setHeader("from", this.request.getHeader("from")), i.setHeader("via", this.request.getHeader("via")), i.setHeader("to", s.getHeader("to")), this.D = setTimeout(() => {
      this.timer_D();
    }, $e.TIMER_D), this.transport.send(i);
  }
  cancel(s) {
    if (this.state !== W.STATUS_PROCEEDING) return;
    const i = new Yl.OutgoingRequest(Yt.CANCEL, this.request.ruri, this.ua, { route_set: this.request.getHeaders("route"), call_id: this.request.getHeader("call-id"), cseq: this.request.cseq });
    i.setHeader("from", this.request.getHeader("from")), i.setHeader("via", this.request.getHeader("via")), i.setHeader("to", this.request.getHeader("to")), s && i.setHeader("reason", s), this.transport.send(i);
  }
  receiveResponse(s) {
    const i = s.status_code;
    if (i >= 100 && i <= 199) switch (this.state) {
      case W.STATUS_CALLING:
        this.stateChanged(W.STATUS_PROCEEDING), this.eventHandlers.onReceiveResponse(s);
        break;
      case W.STATUS_PROCEEDING:
        this.eventHandlers.onReceiveResponse(s);
    }
    else if (i >= 200 && i <= 299) switch (this.state) {
      case W.STATUS_CALLING:
      case W.STATUS_PROCEEDING:
        this.stateChanged(W.STATUS_ACCEPTED), this.M = setTimeout(() => {
          this.timer_M();
        }, $e.TIMER_M), this.eventHandlers.onReceiveResponse(s);
        break;
      case W.STATUS_ACCEPTED:
        this.eventHandlers.onReceiveResponse(s);
    }
    else if (i >= 300 && i <= 699) switch (this.state) {
      case W.STATUS_CALLING:
      case W.STATUS_PROCEEDING:
        this.stateChanged(W.STATUS_COMPLETED), this.sendACK(s), this.eventHandlers.onReceiveResponse(s);
        break;
      case W.STATUS_COMPLETED:
        this.sendACK(s);
    }
  }
}, AckClientTransaction: class extends Xt {
  constructor(s, i, n, a) {
    super(), this.id = `z9hG4bK${Math.floor(1e7 * Math.random())}`, this.transport = i, this.request = n, this.eventHandlers = a;
    let l = `SIP/2.0/${i.via_transport}`;
    l += ` ${s.configuration.via_host};branch=${this.id}`, this.request.setHeader("via", l);
  }
  get C() {
    return W;
  }
  send() {
    this.transport.send(this.request) || this.onTransportError();
  }
  onTransportError() {
    ud(`transport error occurred for transaction ${this.id}`), this.eventHandlers.onTransportError();
  }
}, NonInviteServerTransaction: class extends Xt {
  constructor(s, i, n) {
    super(), this.type = W.NON_INVITE_SERVER, this.id = n.via_branch, this.ua = s, this.transport = i, this.request = n, this.last_response = "", n.server_transaction = this, this.state = W.STATUS_TRYING, s.newTransaction(this);
  }
  get C() {
    return W;
  }
  stateChanged(s) {
    this.state = s, this.emit("stateChanged");
  }
  timer_J() {
    Zl(`Timer J expired for transaction ${this.id}`), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this);
  }
  onTransportError() {
    this.transportError || (this.transportError = !0, Zl(`transport error occurred, deleting transaction ${this.id}`), clearTimeout(this.J), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this));
  }
  receiveResponse(s, i, n, a) {
    if (s === 100) switch (this.state) {
      case W.STATUS_TRYING:
        this.stateChanged(W.STATUS_PROCEEDING), this.transport.send(i) || this.onTransportError();
        break;
      case W.STATUS_PROCEEDING:
        this.last_response = i, this.transport.send(i) ? n && n() : (this.onTransportError(), a && a());
    }
    else if (s >= 200 && s <= 699) switch (this.state) {
      case W.STATUS_TRYING:
      case W.STATUS_PROCEEDING:
        this.stateChanged(W.STATUS_COMPLETED), this.last_response = i, this.J = setTimeout(() => {
          this.timer_J();
        }, $e.TIMER_J), this.transport.send(i) ? n && n() : (this.onTransportError(), a && a());
    }
  }
}, InviteServerTransaction: class extends Xt {
  constructor(s, i, n) {
    super(), this.type = W.INVITE_SERVER, this.id = n.via_branch, this.ua = s, this.transport = i, this.request = n, this.last_response = "", n.server_transaction = this, this.state = W.STATUS_PROCEEDING, s.newTransaction(this), this.resendProvisionalTimer = null, n.reply(100);
  }
  get C() {
    return W;
  }
  stateChanged(s) {
    this.state = s, this.emit("stateChanged");
  }
  timer_H() {
    Hn(`Timer H expired for transaction ${this.id}`), this.state === W.STATUS_COMPLETED && Hn("ACK not received, dialog will be terminated"), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this);
  }
  timer_I() {
    this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this);
  }
  timer_L() {
    Hn(`Timer L expired for transaction ${this.id}`), this.state === W.STATUS_ACCEPTED && (this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this));
  }
  onTransportError() {
    this.transportError || (this.transportError = !0, Hn(`transport error occurred, deleting transaction ${this.id}`), this.resendProvisionalTimer !== null && (clearInterval(this.resendProvisionalTimer), this.resendProvisionalTimer = null), clearTimeout(this.L), clearTimeout(this.H), clearTimeout(this.I), this.stateChanged(W.STATUS_TERMINATED), this.ua.destroyTransaction(this));
  }
  resend_provisional() {
    this.transport.send(this.last_response) || this.onTransportError();
  }
  receiveResponse(s, i, n, a) {
    if (s >= 100 && s <= 199 && this.state === W.STATUS_PROCEEDING && (this.transport.send(i) || this.onTransportError(), this.last_response = i), s > 100 && s <= 199 && this.state === W.STATUS_PROCEEDING) this.resendProvisionalTimer === null && (this.resendProvisionalTimer = setInterval(() => {
      this.resend_provisional();
    }, $e.PROVISIONAL_RESPONSE_INTERVAL));
    else if (s >= 200 && s <= 299) switch (this.state) {
      case W.STATUS_PROCEEDING:
        this.stateChanged(W.STATUS_ACCEPTED), this.last_response = i, this.L = setTimeout(() => {
          this.timer_L();
        }, $e.TIMER_L), this.resendProvisionalTimer !== null && (clearInterval(this.resendProvisionalTimer), this.resendProvisionalTimer = null);
      case W.STATUS_ACCEPTED:
        this.transport.send(i) ? n && n() : (this.onTransportError(), a && a());
    }
    else s >= 300 && s <= 699 && this.state === W.STATUS_PROCEEDING && (this.resendProvisionalTimer !== null && (clearInterval(this.resendProvisionalTimer), this.resendProvisionalTimer = null), this.transport.send(i) ? (this.stateChanged(W.STATUS_COMPLETED), this.H = setTimeout(() => {
      this.timer_H();
    }, $e.TIMER_H), n && n()) : (this.onTransportError(), a && a()));
  }
}, checkTransaction: function({ _transactions: s }, i) {
  let n;
  switch (i.method) {
    case Yt.INVITE:
      if (n = s.ist[i.via_branch], n)
        return n.state === W.STATUS_PROCEEDING && n.transport.send(n.last_response), !0;
      break;
    case Yt.ACK:
      if (n = s.ist[i.via_branch], !n || n.state === W.STATUS_ACCEPTED) return !1;
      if (n.state === W.STATUS_COMPLETED) return n.state = W.STATUS_CONFIRMED, n.I = setTimeout(() => {
        n.timer_I();
      }, $e.TIMER_I), !0;
      break;
    case Yt.CANCEL:
      return n = s.ist[i.via_branch], n ? (i.reply_sl(200), n.state !== W.STATUS_PROCEEDING) : (i.reply_sl(481), !0);
    default:
      if (n = s.nist[i.via_branch], n) {
        switch (n.state) {
          case W.STATUS_TRYING:
            break;
          case W.STATUS_PROCEEDING:
          case W.STATUS_COMPLETED:
            n.transport.send(n.last_response);
        }
        return !0;
      }
  }
} };
const ea = Ae, cd = class {
  constructor(s) {
    this._credentials = s, this._cnonce = null, this._nc = 0, this._ncHex = "00000000", this._algorithm = null, this._realm = null, this._nonce = null, this._opaque = null, this._stale = null, this._qop = null, this._method = null, this._uri = null, this._ha1 = null, this._response = null;
  }
  get(s) {
    switch (s) {
      case "realm":
        return this._realm;
      case "ha1":
        return this._ha1;
      default:
        return void et('get() | cannot get "%s" parameter', s);
    }
  }
  authenticate({ method: s, ruri: i, body: n }, a, l = null) {
    if (this._algorithm = a.algorithm, this._realm = a.realm, this._nonce = a.nonce, this._opaque = a.opaque, this._stale = a.stale, this._algorithm) {
      if (this._algorithm !== "MD5") return et('authenticate() | challenge with Digest algorithm different than "MD5", authentication aborted'), !1;
    } else this._algorithm = "MD5";
    if (!this._nonce) return et("authenticate() | challenge without Digest nonce, authentication aborted"), !1;
    if (!this._realm) return et("authenticate() | challenge without Digest realm, authentication aborted"), !1;
    if (!this._credentials.password) {
      if (!this._credentials.ha1) return et("authenticate() | no plain SIP password nor ha1 provided, authentication aborted"), !1;
      if (this._credentials.realm !== this._realm) return et('authenticate() | no plain SIP password, and stored `realm` does not match the given `realm`, cannot authenticate [stored:"%s", given:"%s"]', this._credentials.realm, this._realm), !1;
    }
    if (a.qop) if (a.qop.indexOf("auth-int") > -1) this._qop = "auth-int";
    else {
      if (!(a.qop.indexOf("auth") > -1)) return et('authenticate() | challenge without Digest qop different than "auth" or "auth-int", authentication aborted'), !1;
      this._qop = "auth";
    }
    else this._qop = null;
    this._method = s, this._uri = i, this._cnonce = l || Ge.createRandomToken(12), this._nc += 1;
    const e = Number(this._nc).toString(16);
    let h, f;
    return this._ncHex = "00000000".substr(0, 8 - e.length) + e, this._nc === 4294967296 && (this._nc = 1, this._ncHex = "00000001"), this._credentials.password ? this._ha1 = Ge.calculateMD5(`${this._credentials.username}:${this._realm}:${this._credentials.password}`) : this._ha1 = this._credentials.ha1, this._qop === "auth" ? (h = `${this._method}:${this._uri}`, f = Ge.calculateMD5(h), Fn('authenticate() | using qop=auth [a2:"%s"]', h), this._response = Ge.calculateMD5(`${this._ha1}:${this._nonce}:${this._ncHex}:${this._cnonce}:auth:${f}`)) : this._qop === "auth-int" ? (h = `${this._method}:${this._uri}:${Ge.calculateMD5(n || "")}`, f = Ge.calculateMD5(h), Fn('authenticate() | using qop=auth-int [a2:"%s"]', h), this._response = Ge.calculateMD5(`${this._ha1}:${this._nonce}:${this._ncHex}:${this._cnonce}:auth-int:${f}`)) : this._qop === null && (h = `${this._method}:${this._uri}`, f = Ge.calculateMD5(h), Fn('authenticate() | using qop=null [a2:"%s"]', h), this._response = Ge.calculateMD5(`${this._ha1}:${this._nonce}:${f}`)), Fn("authenticate() | response generated"), !0;
  }
  toString() {
    const s = [];
    if (!this._response) throw new Error("response field does not exist, cannot generate Authorization header");
    return s.push(`algorithm=${this._algorithm}`), s.push(`username="${this._credentials.username}"`), s.push(`realm="${this._realm}"`), s.push(`nonce="${this._nonce}"`), s.push(`uri="${this._uri}"`), s.push(`response="${this._response}"`), this._opaque && s.push(`opaque="${this._opaque}"`), this._qop && (s.push(`qop=${this._qop}`), s.push(`cnonce="${this._cnonce}"`), s.push(`nc=${this._ncHex}`)), `Digest ${s.join(", ")}`;
  }
}, Qs = gn, hd = te("JsSIP:RequestSender"), Zs = { onRequestTimeout: () => {
}, onTransportError: () => {
}, onReceiveResponse: () => {
}, onAuthenticated: () => {
} };
var os = class {
  constructor(s, i, n) {
    this._ua = s, this._eventHandlers = n, this._method = i.method, this._request = i, this._auth = null, this._challenged = !1, this._staled = !1;
    for (const a in Zs) Object.prototype.hasOwnProperty.call(Zs, a) && (this._eventHandlers[a] || (this._eventHandlers[a] = Zs[a]));
    s.status !== s.C.STATUS_USER_CLOSED || this._method === ea.BYE && this._method === ea.ACK || this._eventHandlers.onTransportError();
  }
  send() {
    const s = { onRequestTimeout: () => {
      this._eventHandlers.onRequestTimeout();
    }, onTransportError: () => {
      this._eventHandlers.onTransportError();
    }, onReceiveResponse: (i) => {
      this._receiveResponse(i);
    } };
    switch (this._method) {
      case "INVITE":
        this.clientTransaction = new Qs.InviteClientTransaction(this._ua, this._ua.transport, this._request, s);
        break;
      case "ACK":
        this.clientTransaction = new Qs.AckClientTransaction(this._ua, this._ua.transport, this._request, s);
        break;
      default:
        this.clientTransaction = new Qs.NonInviteClientTransaction(this._ua, this._ua.transport, this._request, s);
    }
    this._ua._configuration.authorization_jwt && this._request.setHeader("Authorization", this._ua._configuration.authorization_jwt), this.clientTransaction.send();
  }
  _receiveResponse(s) {
    let i, n;
    const a = s.status_code;
    if (a !== 401 && a !== 407 || this._ua.configuration.password === null && this._ua.configuration.ha1 === null) this._eventHandlers.onReceiveResponse(s);
    else {
      if (s.status_code === 401 ? (i = s.parseHeader("www-authenticate"), n = "authorization") : (i = s.parseHeader("proxy-authenticate"), n = "proxy-authorization"), !i) return hd(`${s.status_code} with wrong or missing challenge, cannot authenticate`), void this._eventHandlers.onReceiveResponse(s);
      if (!this._challenged || !this._staled && i.stale === !0) {
        if (this._auth || (this._auth = new cd({ username: this._ua.configuration.authorization_user, password: this._ua.configuration.password, realm: this._ua.configuration.realm, ha1: this._ua.configuration.ha1 })), !this._auth.authenticate(this._request, i)) return void this._eventHandlers.onReceiveResponse(s);
        this._challenged = !0, this._ua.set("realm", this._auth.get("realm")), this._ua.set("ha1", this._auth.get("ha1")), i.stale && (this._staled = !0), this._request = this._request.clone(), this._request.cseq += 1, this._request.setHeader("cseq", `${this._request.cseq} ${this._method}`), this._request.setHeader(n, this._auth.toString()), this._eventHandlers.onAuthenticated(this._request), this.send();
      } else this._eventHandlers.onReceiveResponse(s);
    }
  }
};
const er = Ne(), ot = Ae, ta = nt, na = os, Qt = te("JsSIP:Registrator");
var tr, sa, nr, ra;
function dd() {
  if (ra) return nr;
  ra = 1;
  const s = nt, i = Ae, n = gn, a = function() {
    if (sa) return tr;
    sa = 1;
    const f = Ae, u = gn, T = ru(), g = os, A = { onRequestTimeout: () => {
    }, onTransportError: () => {
    }, onSuccessResponse: () => {
    }, onErrorResponse: () => {
    }, onAuthenticated: () => {
    }, onDialogError: () => {
    } };
    return tr = class {
      constructor(S, L, w) {
        this._dialog = S, this._ua = S._ua, this._request = L, this._eventHandlers = w, this._reattempt = !1, this._reattemptTimer = null;
        for (const y in A) Object.prototype.hasOwnProperty.call(A, y) && (this._eventHandlers[y] || (this._eventHandlers[y] = A[y]));
      }
      get request() {
        return this._request;
      }
      send() {
        const S = new g(this._ua, this._request, { onRequestTimeout: () => {
          this._eventHandlers.onRequestTimeout();
        }, onTransportError: () => {
          this._eventHandlers.onTransportError();
        }, onAuthenticated: (L) => {
          this._eventHandlers.onAuthenticated(L);
        }, onReceiveResponse: (L) => {
          this._receiveResponse(L);
        } });
        if (S.send(), (this._request.method === f.INVITE || this._request.method === f.UPDATE && this._request.body) && S.clientTransaction.state !== u.C.STATUS_TERMINATED) {
          this._dialog.uac_pending_reply = !0;
          const L = () => {
            S.clientTransaction.state !== u.C.STATUS_ACCEPTED && S.clientTransaction.state !== u.C.STATUS_COMPLETED && S.clientTransaction.state !== u.C.STATUS_TERMINATED || (S.clientTransaction.removeListener("stateChanged", L), this._dialog.uac_pending_reply = !1);
          };
          S.clientTransaction.on("stateChanged", L);
        }
      }
      _receiveResponse(S) {
        S.status_code === 408 || S.status_code === 481 ? this._eventHandlers.onDialogError(S) : S.method === f.INVITE && S.status_code === 491 ? this._reattempt ? S.status_code >= 200 && S.status_code < 300 ? this._eventHandlers.onSuccessResponse(S) : S.status_code >= 300 && this._eventHandlers.onErrorResponse(S) : (this._request.cseq = this._dialog.local_seqnum += 1, this._reattemptTimer = setTimeout(() => {
          this._dialog.owner.status !== T.C.STATUS_TERMINATED && (this._reattempt = !0, this._request_sender.send());
        }, 1e3)) : S.status_code >= 200 && S.status_code < 300 ? this._eventHandlers.onSuccessResponse(S) : S.status_code >= 300 && this._eventHandlers.onErrorResponse(S);
      }
    }, tr;
  }(), l = Ne(), e = te("JsSIP:Dialog"), h = { STATUS_EARLY: 1, STATUS_CONFIRMED: 2 };
  return nr = class {
    static get C() {
      return h;
    }
    constructor(f, u, T, g = h.STATUS_CONFIRMED) {
      if (this._owner = f, this._ua = f._ua, this._uac_pending_reply = !1, this._uas_pending_reply = !1, !u.hasHeader("contact")) return { error: "unable to create a Dialog without Contact header field" };
      u instanceof s.IncomingResponse && (g = u.status_code < 200 ? h.STATUS_EARLY : h.STATUS_CONFIRMED);
      const A = u.parseHeader("contact");
      T === "UAS" ? (this._id = { call_id: u.call_id, local_tag: u.to_tag, remote_tag: u.from_tag, toString() {
        return this.call_id + this.local_tag + this.remote_tag;
      } }, this._state = g, this._remote_seqnum = u.cseq, this._local_uri = u.parseHeader("to").uri, this._remote_uri = u.parseHeader("from").uri, this._remote_target = A.uri, this._route_set = u.getHeaders("record-route"), this._ack_seqnum = this._remote_seqnum) : T === "UAC" && (this._id = { call_id: u.call_id, local_tag: u.from_tag, remote_tag: u.to_tag, toString() {
        return this.call_id + this.local_tag + this.remote_tag;
      } }, this._state = g, this._local_seqnum = u.cseq, this._local_uri = u.parseHeader("from").uri, this._remote_uri = u.parseHeader("to").uri, this._remote_target = A.uri, this._route_set = u.getHeaders("record-route").reverse(), this._ack_seqnum = null), this._ua.newDialog(this), e(`new ${T} dialog created with status ${this._state === h.STATUS_EARLY ? "EARLY" : "CONFIRMED"}`);
    }
    get id() {
      return this._id;
    }
    get local_seqnum() {
      return this._local_seqnum;
    }
    set local_seqnum(f) {
      this._local_seqnum = f;
    }
    get owner() {
      return this._owner;
    }
    get uac_pending_reply() {
      return this._uac_pending_reply;
    }
    set uac_pending_reply(f) {
      this._uac_pending_reply = f;
    }
    get uas_pending_reply() {
      return this._uas_pending_reply;
    }
    update(f, u) {
      this._state = h.STATUS_CONFIRMED, e(`dialog ${this._id.toString()}  changed to CONFIRMED state`), u === "UAC" && (this._route_set = f.getHeaders("record-route").reverse());
    }
    terminate() {
      e(`dialog ${this._id.toString()} deleted`), this._ua.destroyDialog(this);
    }
    sendRequest(f, u = {}) {
      const T = l.cloneArray(u.extraHeaders), g = l.cloneObject(u.eventHandlers), A = u.body || null, S = this._createRequest(f, T, A);
      return g.onAuthenticated = () => {
        this._local_seqnum += 1;
      }, new a(this, S, g).send(), S;
    }
    receiveRequest(f) {
      this._checkInDialogRequest(f) && (f.method === i.ACK && this._ack_seqnum !== null ? this._ack_seqnum = null : f.method === i.INVITE && (this._ack_seqnum = f.cseq), this._owner.receiveRequest(f));
    }
    _createRequest(f, u, T) {
      u = l.cloneArray(u), this._local_seqnum || (this._local_seqnum = Math.floor(1e4 * Math.random()));
      const g = f === i.CANCEL || f === i.ACK ? this._local_seqnum : this._local_seqnum += 1;
      return new s.OutgoingRequest(f, this._remote_target, this._ua, { cseq: g, call_id: this._id.call_id, from_uri: this._local_uri, from_tag: this._id.local_tag, to_uri: this._remote_uri, to_tag: this._id.remote_tag, route_set: this._route_set }, u, T);
    }
    _checkInDialogRequest(f) {
      if (this._remote_seqnum) if (f.cseq < this._remote_seqnum) {
        if (f.method !== i.ACK) return f.reply(500), !1;
        if (this._ack_seqnum === null || f.cseq !== this._ack_seqnum) return !1;
      } else f.cseq > this._remote_seqnum && (this._remote_seqnum = f.cseq);
      else this._remote_seqnum = f.cseq;
      if (f.method === i.INVITE || f.method === i.UPDATE && f.body) {
        if (this._uac_pending_reply === !0) f.reply(491);
        else {
          if (this._uas_pending_reply === !0) {
            const u = 1 + (10 * Math.random() | 0);
            return f.reply(500, null, [`Retry-After:${u}`]), !1;
          }
          {
            this._uas_pending_reply = !0;
            const u = () => {
              f.server_transaction.state !== n.C.STATUS_ACCEPTED && f.server_transaction.state !== n.C.STATUS_COMPLETED && f.server_transaction.state !== n.C.STATUS_TERMINATED || (f.server_transaction.removeListener("stateChanged", u), this._uas_pending_reply = !1);
            };
            f.server_transaction.on("stateChanged", u);
          }
        }
        f.hasHeader("contact") && f.server_transaction.on("stateChanged", () => {
          f.server_transaction.state === n.C.STATUS_ACCEPTED && (this._remote_target = f.parseHeader("contact").uri);
        });
      } else f.method === i.NOTIFY && f.hasHeader("contact") && f.server_transaction.on("stateChanged", () => {
        f.server_transaction.state === n.C.STATUS_COMPLETED && (this._remote_target = f.parseHeader("contact").uri);
      });
      return !0;
    }
  }, nr;
}
var ss = {}, fd = { get exports() {
  return ss;
}, set exports(s) {
  ss = s;
} };
const _d = Ct.EventEmitter, pd = Ae, md = vt, ia = Ne(), gd = te("JsSIP:RTCSession:DTMF");
te("JsSIP:ERROR:RTCSession:DTMF").log = console.warn.bind(console);
const oa = { MIN_DURATION: 70, MAX_DURATION: 6e3, DEFAULT_DURATION: 100, MIN_INTER_TONE_GAP: 50, DEFAULT_INTER_TONE_GAP: 500 };
fd.exports = class extends _d {
  constructor(s) {
    super(), this._session = s, this._direction = null, this._tone = null, this._duration = null, this._request = null;
  }
  get tone() {
    return this._tone;
  }
  get duration() {
    return this._duration;
  }
  send(s, i = {}) {
    if (s === void 0) throw new TypeError("Not enough arguments");
    if (this._direction = "outgoing", this._session.status !== this._session.C.STATUS_CONFIRMED && this._session.status !== this._session.C.STATUS_WAITING_FOR_ACK) throw new md.InvalidStateError(this._session.status);
    const n = ia.cloneArray(i.extraHeaders);
    if (this.eventHandlers = ia.cloneObject(i.eventHandlers), typeof s == "string") s = s.toUpperCase();
    else {
      if (typeof s != "number") throw new TypeError(`Invalid tone: ${s}`);
      s = s.toString();
    }
    if (!s.match(/^[0-9A-DR#*]$/)) throw new TypeError(`Invalid tone: ${s}`);
    this._tone = s, this._duration = i.duration, n.push("Content-Type: application/dtmf-relay");
    let a = `Signal=${this._tone}\r
`;
    a += `Duration=${this._duration}`, this._session.newDTMF({ originator: "local", dtmf: this, request: this._request }), this._session.sendRequest(pd.INFO, { extraHeaders: n, eventHandlers: { onSuccessResponse: (l) => {
      this.emit("succeeded", { originator: "remote", response: l });
    }, onErrorResponse: (l) => {
      this.eventHandlers.onFailed && this.eventHandlers.onFailed(), this.emit("failed", { originator: "remote", response: l });
    }, onRequestTimeout: () => {
      this._session.onRequestTimeout();
    }, onTransportError: () => {
      this._session.onTransportError();
    }, onDialogError: () => {
      this._session.onDialogError();
    } }, body: a });
  }
  init_incoming(s) {
    const i = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/, n = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;
    if (this._direction = "incoming", this._request = s, s.reply(200), s.body) {
      const a = s.body.split(`
`);
      a.length >= 1 && i.test(a[0]) && (this._tone = a[0].replace(i, "$2")), a.length >= 2 && n.test(a[1]) && (this._duration = parseInt(a[1].replace(n, "$2"), 10));
    }
    this._duration || (this._duration = oa.DEFAULT_DURATION), this._tone ? this._session.newDTMF({ originator: "remote", dtmf: this, request: s }) : gd("invalid INFO DTMF received, discarded");
  }
}, ss.C = oa;
const Td = Ct.EventEmitter;
te("JsSIP:ERROR:RTCSession:Info").log = console.warn.bind(console);
const vd = Ae, Ed = vt, Cd = Ne();
var Sd = class extends Td {
  constructor(s) {
    super(), this._session = s, this._direction = null, this._contentType = null, this._body = null;
  }
  get contentType() {
    return this._contentType;
  }
  get body() {
    return this._body;
  }
  send(s, i, n = {}) {
    if (this._direction = "outgoing", s === void 0) throw new TypeError("Not enough arguments");
    if (this._session.status !== this._session.C.STATUS_CONFIRMED && this._session.status !== this._session.C.STATUS_WAITING_FOR_ACK) throw new Ed.InvalidStateError(this._session.status);
    this._contentType = s, this._body = i;
    const a = Cd.cloneArray(n.extraHeaders);
    a.push(`Content-Type: ${s}`), this._session.newInfo({ originator: "local", info: this, request: this.request }), this._session.sendRequest(vd.INFO, { extraHeaders: a, eventHandlers: { onSuccessResponse: (l) => {
      this.emit("succeeded", { originator: "remote", response: l });
    }, onErrorResponse: (l) => {
      this.emit("failed", { originator: "remote", response: l });
    }, onTransportError: () => {
      this._session.onTransportError();
    }, onRequestTimeout: () => {
      this._session.onRequestTimeout();
    }, onDialogError: () => {
      this._session.onDialogError();
    } }, body: i });
  }
  init_incoming(s) {
    this._direction = "incoming", this.request = s, s.reply(200), this._contentType = s.hasHeader("Content-Type") ? s.getHeader("Content-Type").toLowerCase() : void 0, this._body = s.body, this._session.newInfo({ originator: "remote", info: this, request: s });
  }
};
const la = Ae, Ad = te("JsSIP:RTCSession:ReferNotifier"), Rd = "refer", yd = "message/sipfrag;version=2.0", bd = 300;
var wd = class {
  constructor(s, i, n) {
    this._session = s, this._id = i, this._expires = n || bd, this._active = !0, this.notify(100);
  }
  notify(s, i) {
    if (Ad("notify()"), this._active === !1) return;
    let n;
    i = i || la.REASON_PHRASE[s] || "", n = s >= 200 ? "terminated;reason=noresource" : `active;expires=${this._expires}`, this._session.sendRequest(la.NOTIFY, { extraHeaders: [`Event: ${Rd};id=${this._id}`, `Subscription-State: ${n}`, `Content-Type: ${yd}`], body: `SIP/2.0 ${s} ${i}`, eventHandlers: { onErrorResponse() {
      this._active = !1;
    } } });
  }
};
const Id = Ct.EventEmitter, Zt = Ae, Od = je(), aa = Ne(), lt = te("JsSIP:RTCSession:ReferSubscriber");
var sr, ua, Nd = class extends Id {
  constructor(s) {
    super(), this._id = null, this._session = s;
  }
  get id() {
    return this._id;
  }
  sendRefer(s, i = {}) {
    lt("sendRefer()");
    const n = aa.cloneArray(i.extraHeaders), a = aa.cloneObject(i.eventHandlers);
    for (const u in a) Object.prototype.hasOwnProperty.call(a, u) && this.on(u, a[u]);
    let l = null;
    i.replaces && (l = i.replaces._request.call_id, l += `;to-tag=${i.replaces._to_tag}`, l += `;from-tag=${i.replaces._from_tag}`, l = encodeURIComponent(l));
    const e = `Refer-To: <${s}${l ? `?Replaces=${l}` : ""}>`;
    n.push(e);
    const h = `Referred-By: <${this._session._ua._configuration.uri._scheme}:${this._session._ua._configuration.uri._user}@${this._session._ua._configuration.uri._host}>`;
    n.push(h), n.push(`Contact: ${this._session.contact}`);
    const f = this._session.sendRequest(Zt.REFER, { extraHeaders: n, eventHandlers: { onSuccessResponse: (u) => {
      this._requestSucceeded(u);
    }, onErrorResponse: (u) => {
      this._requestFailed(u, Zt.causes.REJECTED);
    }, onTransportError: () => {
      this._requestFailed(null, Zt.causes.CONNECTION_ERROR);
    }, onRequestTimeout: () => {
      this._requestFailed(null, Zt.causes.REQUEST_TIMEOUT);
    }, onDialogError: () => {
      this._requestFailed(null, Zt.causes.DIALOG_ERROR);
    } } });
    this._id = f.cseq;
  }
  receiveNotify(s) {
    if (lt("receiveNotify()"), !s.body) return;
    const i = Od.parse(s.body.trim(), "Status_Line");
    if (i !== -1) switch (!0) {
      case /^100$/.test(i.status_code):
        this.emit("trying", { request: s, status_line: i });
        break;
      case /^1[0-9]{2}$/.test(i.status_code):
        this.emit("progress", { request: s, status_line: i });
        break;
      case /^2[0-9]{2}$/.test(i.status_code):
        this.emit("accepted", { request: s, status_line: i });
        break;
      default:
        this.emit("failed", { request: s, status_line: i });
    }
    else lt(`receiveNotify() | error parsing NOTIFY body: "${s.body}"`);
  }
  _requestSucceeded(s) {
    lt("REFER succeeded"), lt('emit "requestSucceeded"'), this.emit("requestSucceeded", { response: s });
  }
  _requestFailed(s, i) {
    lt("REFER failed"), lt('emit "requestFailed"'), this.emit("requestFailed", { response: s || null, cause: i });
  }
};
function ru() {
  if (ua) return sr;
  ua = 1;
  const s = Ct.EventEmitter, i = He, n = Ae, a = vt, l = gn, e = Ne(), h = su, f = nt, u = dd(), T = os, g = ss, A = Sd, S = wd, L = Nd, w = Et(), y = te("JsSIP:RTCSession"), U = te("JsSIP:ERROR:RTCSession");
  U.log = console.warn.bind(console);
  const O = { STATUS_NULL: 0, STATUS_INVITE_SENT: 1, STATUS_1XX_RECEIVED: 2, STATUS_INVITE_RECEIVED: 3, STATUS_WAITING_FOR_ANSWER: 4, STATUS_ANSWERED: 5, STATUS_WAITING_FOR_ACK: 6, STATUS_CANCELED: 7, STATUS_TERMINATED: 8, STATUS_CONFIRMED: 9 }, z = ["audio", "video"];
  return sr = class Sr extends s {
    static get C() {
      return O;
    }
    constructor(_) {
      y("new"), super(), this._id = null, this._ua = _, this._status = O.STATUS_NULL, this._dialog = null, this._earlyDialogs = {}, this._contact = null, this._from_tag = null, this._to_tag = null, this._connection = null, this._connectionPromiseQueue = Promise.resolve(), this._request = null, this._is_canceled = !1, this._cancel_reason = "", this._is_confirmed = !1, this._late_sdp = !1, this._rtcOfferConstraints = null, this._rtcAnswerConstraints = null, this._localMediaStream = null, this._localMediaStreamLocallyGenerated = !1, this._rtcReady = !0, this._timers = { ackTimer: null, expiresTimer: null, invite2xxTimer: null, userNoAnswerTimer: null }, this._direction = null, this._local_identity = null, this._remote_identity = null, this._start_time = null, this._end_time = null, this._tones = null, this._audioMuted = !1, this._videoMuted = !1, this._localHold = !1, this._remoteHold = !1, this._sessionTimers = { enabled: this._ua.configuration.session_timers, refreshMethod: this._ua.configuration.session_timers_refresh_method, defaultExpires: n.SESSION_EXPIRES, currentExpires: null, running: !1, refresher: !1, timer: null }, this._referSubscribers = {}, this._data = {}, this._preview = !1, this._previewLocalDesc = null;
    }
    get C() {
      return O;
    }
    get causes() {
      return n.causes;
    }
    get id() {
      return this._id;
    }
    get connection() {
      return this._connection;
    }
    get contact() {
      return this._contact;
    }
    get direction() {
      return this._direction;
    }
    get local_identity() {
      return this._local_identity;
    }
    get remote_identity() {
      return this._remote_identity;
    }
    get start_time() {
      return this._start_time;
    }
    get end_time() {
      return this._end_time;
    }
    get data() {
      return this._data;
    }
    set data(_) {
      this._data = _;
    }
    get status() {
      return this._status;
    }
    isInProgress() {
      switch (this._status) {
        case O.STATUS_NULL:
        case O.STATUS_INVITE_SENT:
        case O.STATUS_1XX_RECEIVED:
        case O.STATUS_INVITE_RECEIVED:
        case O.STATUS_WAITING_FOR_ANSWER:
          return !0;
        default:
          return !1;
      }
    }
    isEstablished() {
      switch (this._status) {
        case O.STATUS_ANSWERED:
        case O.STATUS_WAITING_FOR_ACK:
        case O.STATUS_CONFIRMED:
          return !0;
        default:
          return !1;
      }
    }
    isEnded() {
      switch (this._status) {
        case O.STATUS_CANCELED:
        case O.STATUS_TERMINATED:
          return !0;
        default:
          return !1;
      }
    }
    isMuted() {
      return { audio: this._audioMuted, video: this._videoMuted };
    }
    isOnHold() {
      return { local: this._localHold, remote: this._remoteHold };
    }
    connect(_, m = {}, v) {
      y("connect()");
      const E = _, I = e.cloneObject(m.eventHandlers), D = e.cloneArray(m.extraHeaders), $ = e.cloneObject(m.mediaConstraints, { audio: !0, video: !0 }), M = m.mediaStream || null, B = e.cloneObject(m.pcConfig, { iceServers: [] }), V = m.rtcConstraints || null, q = m.rtcOfferConstraints || null;
      if (this._rtcOfferConstraints = q, this._rtcAnswerConstraints = m.rtcAnswerConstraints || null, this._data = m.data || this._data, _ === void 0) throw new TypeError("Not enough arguments");
      if (this._status !== O.STATUS_NULL) throw new a.InvalidStateError(this._status);
      if (!window.RTCPeerConnection) throw new a.NotSupportedError("WebRTC not supported");
      if (!(_ = this._ua.normalizeTarget(_))) throw new TypeError(`Invalid target: ${E}`);
      this._sessionTimers.enabled && e.isDecimal(m.sessionTimersExpires) && (m.sessionTimersExpires >= n.MIN_SESSION_EXPIRES ? this._sessionTimers.defaultExpires = m.sessionTimersExpires : this._sessionTimers.defaultExpires = n.SESSION_EXPIRES);
      for (const fe in I) Object.prototype.hasOwnProperty.call(I, fe) && this.on(fe, I[fe]);
      this._from_tag = e.newTag();
      const Q = m.anonymous || !1, he = { from_tag: this._from_tag };
      this._contact = this._ua.contact.toString({ anonymous: Q, outbound: !0 }), Q && (he.from_display_name = "Anonymous", he.from_uri = new w("sip", "anonymous", "anonymous.invalid"), D.push(`P-Preferred-Identity: ${this._ua.configuration.uri.toString()}`), D.push("Privacy: id")), D.push(`Contact: ${this._contact}`), D.push("Content-Type: application/sdp"), this._sessionTimers.enabled && D.push(`Session-Expires: ${this._sessionTimers.defaultExpires}${this._ua.configuration.session_timers_force_refresher ? ";refresher=uac" : ""}`), this._request = new f.InitialOutgoingInviteRequest(_, this._ua, he, D), this._id = this._request.call_id + this._from_tag, this._createRTCConnection(B, V), this._direction = "outgoing", this._local_identity = this._request.from, this._remote_identity = this._request.to, v && v(this), this._newRTCSession("local", this._request), this._sendInitialRequest($, q, M);
    }
    init_incoming(_, m) {
      let v;
      y("init_incoming()");
      const E = _.hasHeader("Content-Type") ? _.getHeader("Content-Type").toLowerCase() : void 0;
      _.body && E !== "application/sdp" ? _.reply(415) : (this._status = O.STATUS_INVITE_RECEIVED, this._from_tag = _.from_tag, this._id = _.call_id + this._from_tag, this._request = _, this._contact = this._ua.contact.toString(), _.hasHeader("expires") && (v = 1e3 * _.getHeader("expires")), _.to_tag = e.newTag(), this._createDialog(_, "UAS", !0) ? (_.body ? this._late_sdp = !1 : this._late_sdp = !0, this._status = O.STATUS_WAITING_FOR_ANSWER, this._timers.userNoAnswerTimer = setTimeout(() => {
        _.reply(408), this._failed("local", null, n.causes.NO_ANSWER);
      }, this._ua.configuration.no_answer_timeout), v && (this._timers.expiresTimer = setTimeout(() => {
        this._status === O.STATUS_WAITING_FOR_ANSWER && (_.reply(487), this._failed("system", null, n.causes.EXPIRES));
      }, v)), this._direction = "incoming", this._local_identity = _.to, this._remote_identity = _.from, m && m(this), this._newRTCSession("remote", _), this._status !== O.STATUS_TERMINATED && (_.reply(180, null, [`Contact: ${this._contact}`]), this._progress("local", null))) : _.reply(500, "Missing Contact header field"));
    }
    preview(_ = {}) {
      y("preview()");
      const m = this._request, v = e.cloneArray(_.extraHeaders), E = e.cloneObject(_.mediaConstraints), I = _.mediaStream || null, D = e.cloneObject(_.pcConfig, { iceServers: [] }), $ = _.rtcConstraints || null, M = _.rtcAnswerConstraints || null, B = e.cloneObject(_.rtcOfferConstraints);
      let V, q = !1, Q = !1, he = !1, fe = !1;
      if (this._rtcAnswerConstraints = M, this._rtcOfferConstraints = _.rtcOfferConstraints || null, this._data = _.data || this._data, this._direction !== "incoming") throw new a.NotSupportedError('"answer" not supported for outgoing RTCSession');
      if (this._status !== O.STATUS_WAITING_FOR_ANSWER) throw new a.InvalidStateError(this._status);
      if (this._sessionTimers.enabled && e.isDecimal(_.sessionTimersExpires) && (_.sessionTimersExpires >= n.MIN_SESSION_EXPIRES ? this._sessionTimers.defaultExpires = _.sessionTimersExpires : this._sessionTimers.defaultExpires = n.SESSION_EXPIRES), this._status = O.STATUS_ANSWERED, !this._createDialog(m, "UAS")) return void m.reply(500, "Error creating dialog");
      clearTimeout(this._timers.userNoAnswerTimer), v.unshift(`Contact: ${this._contact}`);
      const De = m.parseSDP();
      Array.isArray(De.media) || (De.media = [De.media]);
      for (const H of De.media) H.type === "audio" && (q = !0, H.direction && H.direction !== "sendrecv" || (he = !0)), H.type === "video" && (Q = !0, H.direction && H.direction !== "sendrecv" || (fe = !0));
      if (I && E.audio === !1) {
        V = I.getAudioTracks();
        for (const H of V) I.removeTrack(H);
      }
      if (I && E.video === !1) {
        V = I.getVideoTracks();
        for (const H of V) I.removeTrack(H);
      }
      I || E.audio !== void 0 || (E.audio = he), I || E.video !== void 0 || (E.video = fe), I || q || B.offerToReceiveAudio || (E.audio = !1), I || Q || B.offerToReceiveVideo || (E.video = !1), this._createRTCConnection(D, $), Promise.resolve().then(() => I || (E.audio || E.video ? (this._localMediaStreamLocallyGenerated = !0, navigator.mediaDevices.getUserMedia(E).catch((H) => {
        throw this._status === O.STATUS_TERMINATED ? new Error("terminated") : (m.reply(480), this._failed("local", null, n.causes.USER_DENIED_MEDIA_ACCESS), U('emit "getusermediafailed" [error:%o]', H), this.emit("getusermediafailed", H), new Error("getUserMedia() failed"));
      })) : void 0)).then((H) => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        this._localMediaStream = H, H && H.getTracks().forEach((Me) => {
          this._connection.addTrack(Me, H);
        });
      }).then(() => {
        if (this._late_sdp) return;
        const H = { originator: "remote", type: "offer", sdp: m.body };
        y('emit "sdp"'), this.emit("sdp", H);
        const Me = new RTCSessionDescription({ type: "offer", sdp: H.sdp });
        return this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._connection.setRemoteDescription(Me)).catch((Xe) => {
          throw m.reply(488), this._failed("system", null, n.causes.WEBRTC_ERROR), U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', Xe), this.emit("peerconnection:setremotedescriptionfailed", Xe), new Error("peerconnection.setRemoteDescription() failed");
        }), this._connectionPromiseQueue;
      }).then(() => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        return this._connecting(m), this._late_sdp ? this._createLocalDescription("offer", this._rtcOfferConstraints).catch(() => {
          throw m.reply(500), new Error("_createLocalDescription() failed");
        }) : this._createLocalDescription("answer", M).catch(() => {
          throw m.reply(500), new Error("_createLocalDescription() failed");
        });
      }).then((H) => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        this._handleSessionTimersInIncomingRequest(m, v), this._previewLocalDesc = H, m.reply(183, null, v, H, () => {
        }, () => {
          this._failed("system", null, n.causes.CONNECTION_ERROR);
        }), this._preview = !0;
      }).catch((H) => {
        this._status !== O.STATUS_TERMINATED && U(H);
      });
    }
    answer(_ = {}) {
      y("answer()");
      const m = this._request, v = e.cloneArray(_.extraHeaders), E = e.cloneObject(_.mediaConstraints), I = _.mediaStream || null, D = e.cloneObject(_.pcConfig, { iceServers: [] }), $ = _.rtcConstraints || null, M = _.rtcAnswerConstraints || null, B = e.cloneObject(_.rtcOfferConstraints);
      let V, q = !1, Q = !1, he = !1, fe = !1;
      if (this._rtcAnswerConstraints = M, this._rtcOfferConstraints = _.rtcOfferConstraints || null, this._data = _.data || this._data, this._direction !== "incoming") throw new a.NotSupportedError('"answer" not supported for outgoing RTCSession');
      if (this._preview) {
        this._preview = !1, this._status = O.STATUS_ANSWERED, clearTimeout(this._timers.userNoAnswerTimer), this._handleSessionTimersInIncomingRequest(m, v);
        let H = this._previewLocalDesc;
        return void m.reply(200, null, v, H, () => {
          this._status = O.STATUS_WAITING_FOR_ACK, this._setInvite2xxTimer(m, H), this._setACKTimer(), this._accepted("local");
        }, () => {
          this._failed("system", null, n.causes.CONNECTION_ERROR);
        });
      }
      if (this._status !== O.STATUS_WAITING_FOR_ANSWER) throw new a.InvalidStateError(this._status);
      if (this._sessionTimers.enabled && e.isDecimal(_.sessionTimersExpires) && (_.sessionTimersExpires >= n.MIN_SESSION_EXPIRES ? this._sessionTimers.defaultExpires = _.sessionTimersExpires : this._sessionTimers.defaultExpires = n.SESSION_EXPIRES), this._status = O.STATUS_ANSWERED, !this._createDialog(m, "UAS")) return void m.reply(500, "Error creating dialog");
      clearTimeout(this._timers.userNoAnswerTimer), v.unshift(`Contact: ${this._contact}`);
      const De = m.parseSDP();
      Array.isArray(De.media) || (De.media = [De.media]);
      for (const H of De.media) H.type === "audio" && (q = !0, H.direction && H.direction !== "sendrecv" || (he = !0)), H.type === "video" && (Q = !0, H.direction && H.direction !== "sendrecv" || (fe = !0));
      if (I && E.audio === !1) {
        V = I.getAudioTracks();
        for (const H of V) I.removeTrack(H);
      }
      if (I && E.video === !1) {
        V = I.getVideoTracks();
        for (const H of V) I.removeTrack(H);
      }
      I || E.audio !== void 0 || (E.audio = he), I || E.video !== void 0 || (E.video = fe), I || q || B.offerToReceiveAudio || (E.audio = !1), I || Q || B.offerToReceiveVideo || (E.video = !1), this._createRTCConnection(D, $), Promise.resolve().then(() => I || (E.audio || E.video ? (this._localMediaStreamLocallyGenerated = !0, navigator.mediaDevices.getUserMedia(E).catch((H) => {
        throw this._status === O.STATUS_TERMINATED ? new Error("terminated") : (m.reply(480), this._failed("local", null, n.causes.USER_DENIED_MEDIA_ACCESS), U('emit "getusermediafailed" [error:%o]', H), this.emit("getusermediafailed", H), new Error("getUserMedia() failed"));
      })) : void 0)).then((H) => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        this._localMediaStream = H, H && H.getTracks().forEach((Me) => {
          this._connection.addTrack(Me, H);
        });
      }).then(() => {
        if (this._late_sdp) return;
        const H = { originator: "remote", type: "offer", sdp: m.body };
        y('emit "sdp"'), this.emit("sdp", H);
        const Me = new RTCSessionDescription({ type: "offer", sdp: H.sdp });
        return this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._connection.setRemoteDescription(Me)).catch((Xe) => {
          throw m.reply(488), this._failed("system", null, n.causes.WEBRTC_ERROR), U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', Xe), this.emit("peerconnection:setremotedescriptionfailed", Xe), new Error("peerconnection.setRemoteDescription() failed");
        }), this._connectionPromiseQueue;
      }).then(() => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        return this._connecting(m), this._late_sdp ? this._createLocalDescription("offer", this._rtcOfferConstraints).catch(() => {
          throw m.reply(500), new Error("_createLocalDescription() failed");
        }) : this._createLocalDescription("answer", M).catch(() => {
          throw m.reply(500), new Error("_createLocalDescription() failed");
        });
      }).then((H) => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        this._handleSessionTimersInIncomingRequest(m, v), m.reply(200, null, v, H, () => {
          this._status = O.STATUS_WAITING_FOR_ACK, this._setInvite2xxTimer(m, H), this._setACKTimer(), this._accepted("local");
        }, () => {
          this._failed("system", null, n.causes.CONNECTION_ERROR);
        });
      }).catch((H) => {
        this._status !== O.STATUS_TERMINATED && U(H);
      });
    }
    terminate(_ = {}) {
      y("terminate()");
      const m = _.cause || n.causes.BYE, v = e.cloneArray(_.extraHeaders), E = _.body;
      let I, D = _.status_code, $ = _.reason_phrase;
      if (this._status === O.STATUS_TERMINATED) throw new a.InvalidStateError(this._status);
      switch (this._status) {
        case O.STATUS_NULL:
        case O.STATUS_INVITE_SENT:
        case O.STATUS_1XX_RECEIVED:
          if (y("canceling session"), D && (D < 200 || D >= 700)) throw new TypeError(`Invalid status_code: ${D}`);
          D && ($ = $ || n.REASON_PHRASE[D] || "", I = `SIP ;cause=${D} ;text="${$}"`), this._status === O.STATUS_NULL || this._status === O.STATUS_INVITE_SENT ? (this._is_canceled = !0, this._cancel_reason = I) : this._status === O.STATUS_1XX_RECEIVED && this._request.cancel(I), this._status = O.STATUS_CANCELED, this._failed("local", null, n.causes.CANCELED);
          break;
        case O.STATUS_WAITING_FOR_ANSWER:
        case O.STATUS_ANSWERED:
          if (y("rejecting session"), D = D || 480, D < 300 || D >= 700) throw new TypeError(`Invalid status_code: ${D}`);
          this._request.reply(D, $, v, E), this._failed("local", null, n.causes.REJECTED);
          break;
        case O.STATUS_WAITING_FOR_ACK:
        case O.STATUS_CONFIRMED:
          if (y("terminating session"), $ = _.reason_phrase || n.REASON_PHRASE[D] || "", D && (D < 200 || D >= 700)) throw new TypeError(`Invalid status_code: ${D}`);
          if (D && v.push(`Reason: SIP ;cause=${D}; text="${$}"`), this._status === O.STATUS_WAITING_FOR_ACK && this._direction === "incoming" && this._request.server_transaction.state !== l.C.STATUS_TERMINATED) {
            const M = this._dialog;
            this.receiveRequest = ({ method: B }) => {
              B === n.ACK && (this.sendRequest(n.BYE, { extraHeaders: v, body: E }), M.terminate());
            }, this._request.server_transaction.on("stateChanged", () => {
              this._request.server_transaction.state === l.C.STATUS_TERMINATED && (this.sendRequest(n.BYE, { extraHeaders: v, body: E }), M.terminate());
            }), this._ended("local", null, m), this._dialog = M, this._ua.newDialog(M);
          } else this.sendRequest(n.BYE, { extraHeaders: v, body: E }), this._ended("local", null, m);
      }
    }
    sendDTMF(_, m = {}) {
      y("sendDTMF() | tones: %s", _);
      let v = 0, E = m.duration || null, I = m.interToneGap || null;
      const D = m.transportType || n.DTMF_TRANSPORT.INFO;
      if (_ === void 0) throw new TypeError("Not enough arguments");
      if (this._status !== O.STATUS_CONFIRMED && this._status !== O.STATUS_WAITING_FOR_ACK) throw new a.InvalidStateError(this._status);
      if (D !== n.DTMF_TRANSPORT.INFO && D !== n.DTMF_TRANSPORT.RFC2833) throw new TypeError(`invalid transportType: ${D}`);
      if (typeof _ == "number" && (_ = _.toString()), !_ || typeof _ != "string" || !_.match(/^[0-9A-DR#*,]+$/i)) throw new TypeError(`Invalid tones: ${_}`);
      if (E && !e.isDecimal(E)) throw new TypeError(`Invalid tone duration: ${E}`);
      if (E ? E < g.C.MIN_DURATION ? (y(`"duration" value is lower than the minimum allowed, setting it to ${g.C.MIN_DURATION} milliseconds`), E = g.C.MIN_DURATION) : E > g.C.MAX_DURATION ? (y(`"duration" value is greater than the maximum allowed, setting it to ${g.C.MAX_DURATION} milliseconds`), E = g.C.MAX_DURATION) : E = Math.abs(E) : E = g.C.DEFAULT_DURATION, m.duration = E, I && !e.isDecimal(I)) throw new TypeError(`Invalid interToneGap: ${I}`);
      if (I ? I < g.C.MIN_INTER_TONE_GAP ? (y(`"interToneGap" value is lower than the minimum allowed, setting it to ${g.C.MIN_INTER_TONE_GAP} milliseconds`), I = g.C.MIN_INTER_TONE_GAP) : I = Math.abs(I) : I = g.C.DEFAULT_INTER_TONE_GAP, D !== n.DTMF_TRANSPORT.RFC2833) this._tones ? this._tones += _ : (this._tones = _, function $() {
        let M;
        if (this._status === O.STATUS_TERMINATED || !this._tones || v >= this._tones.length) return void (this._tones = null);
        const B = this._tones[v];
        if (v += 1, B === ",") M = 2e3;
        else {
          const V = new g(this);
          m.eventHandlers = { onFailed: () => {
            this._tones = null;
          } }, V.send(B, m), M = E + I;
        }
        setTimeout($.bind(this), M);
      }.call(this));
      else {
        const $ = this._getDTMFRTPSender();
        $ && (_ = $.toneBuffer + _, $.insertDTMF(_, E, I));
      }
    }
    sendInfo(_, m, v = {}) {
      if (y("sendInfo()"), this._status !== O.STATUS_CONFIRMED && this._status !== O.STATUS_WAITING_FOR_ACK) throw new a.InvalidStateError(this._status);
      new A(this).send(_, m, v);
    }
    mute(_ = { audio: !0, video: !1 }) {
      y("mute()");
      let m = !1, v = !1;
      this._audioMuted === !1 && _.audio && (m = !0, this._audioMuted = !0, this._toggleMuteAudio(!0)), this._videoMuted === !1 && _.video && (v = !0, this._videoMuted = !0, this._toggleMuteVideo(!0)), m !== !0 && v !== !0 || this._onmute({ audio: m, video: v });
    }
    unmute(_ = { audio: !0, video: !0 }) {
      y("unmute()");
      let m = !1, v = !1;
      this._audioMuted === !0 && _.audio && (m = !0, this._audioMuted = !1, this._localHold === !1 && this._toggleMuteAudio(!1)), this._videoMuted === !0 && _.video && (v = !0, this._videoMuted = !1, this._localHold === !1 && this._toggleMuteVideo(!1)), m !== !0 && v !== !0 || this._onunmute({ audio: m, video: v });
    }
    hold(_ = {}, m) {
      if (y("hold()"), this._status !== O.STATUS_WAITING_FOR_ACK && this._status !== O.STATUS_CONFIRMED || this._localHold === !0 || !this._isReadyToReOffer()) return !1;
      this._localHold = !0, this._onhold("local");
      const v = { succeeded: () => {
        m && m();
      }, failed: () => {
        this.terminate({ cause: n.causes.WEBRTC_ERROR, status_code: 500, reason_phrase: "Hold Failed" });
      } };
      return _.useUpdate ? this._sendUpdate({ sdpOffer: !0, eventHandlers: v, extraHeaders: _.extraHeaders }) : this._sendReinvite({ eventHandlers: v, extraHeaders: _.extraHeaders }), !0;
    }
    unhold(_ = {}, m) {
      if (y("unhold()"), this._status !== O.STATUS_WAITING_FOR_ACK && this._status !== O.STATUS_CONFIRMED || this._localHold === !1 || !this._isReadyToReOffer()) return !1;
      this._localHold = !1, this._onunhold("local");
      const v = { succeeded: () => {
        m && m();
      }, failed: () => {
        this.terminate({ cause: n.causes.WEBRTC_ERROR, status_code: 500, reason_phrase: "Unhold Failed" });
      } };
      return _.useUpdate ? this._sendUpdate({ sdpOffer: !0, eventHandlers: v, extraHeaders: _.extraHeaders }) : this._sendReinvite({ eventHandlers: v, extraHeaders: _.extraHeaders }), !0;
    }
    renegotiate(_ = {}, m) {
      y("renegotiate()");
      const v = _.rtcOfferConstraints || null;
      if (this._status !== O.STATUS_WAITING_FOR_ACK && this._status !== O.STATUS_CONFIRMED || !this._isReadyToReOffer()) return !1;
      const E = { succeeded: () => {
        m && m();
      }, failed: () => {
        this.terminate({ cause: n.causes.WEBRTC_ERROR, status_code: 500, reason_phrase: "Media Renegotiation Failed" });
      } };
      return this._setLocalMediaStatus(), _.useUpdate ? this._sendUpdate({ sdpOffer: !0, eventHandlers: E, rtcOfferConstraints: v, extraHeaders: _.extraHeaders }) : this._sendReinvite({ eventHandlers: E, rtcOfferConstraints: v, extraHeaders: _.extraHeaders }), !0;
    }
    refer(_, m) {
      y("refer()");
      const v = _;
      if (this._status !== O.STATUS_WAITING_FOR_ACK && this._status !== O.STATUS_CONFIRMED) return !1;
      if (!(_ = this._ua.normalizeTarget(_))) throw new TypeError(`Invalid target: ${v}`);
      const E = new L(this);
      E.sendRefer(_, m);
      const I = E.id;
      return this._referSubscribers[I] = E, E.on("requestFailed", () => {
        delete this._referSubscribers[I];
      }), E.on("accepted", () => {
        delete this._referSubscribers[I];
      }), E.on("failed", () => {
        delete this._referSubscribers[I];
      }), E;
    }
    sendRequest(_, m) {
      return y("sendRequest()"), this._dialog.sendRequest(_, m);
    }
    receiveRequest(_) {
      if (y("receiveRequest()"), _.method === n.CANCEL) this._status !== O.STATUS_WAITING_FOR_ANSWER && this._status !== O.STATUS_ANSWERED || (this._status = O.STATUS_CANCELED, this._request.reply(487), this._failed("remote", _, n.causes.CANCELED));
      else switch (_.method) {
        case n.ACK:
          if (this._status !== O.STATUS_WAITING_FOR_ACK) return;
          if (this._status = O.STATUS_CONFIRMED, clearTimeout(this._timers.ackTimer), clearTimeout(this._timers.invite2xxTimer), this._late_sdp) {
            if (!_.body) {
              this.terminate({ cause: n.causes.MISSING_SDP, status_code: 400 });
              break;
            }
            const m = { originator: "remote", type: "answer", sdp: _.body };
            y('emit "sdp"'), this.emit("sdp", m);
            const v = new RTCSessionDescription({ type: "answer", sdp: m.sdp });
            this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._connection.setRemoteDescription(v)).then(() => {
              this._is_confirmed || this._confirmed("remote", _);
            }).catch((E) => {
              this.terminate({ cause: n.causes.BAD_MEDIA_DESCRIPTION, status_code: 488 }), U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', E), this.emit("peerconnection:setremotedescriptionfailed", E);
            });
          } else this._is_confirmed || this._confirmed("remote", _);
          break;
        case n.BYE:
          this._status === O.STATUS_CONFIRMED || this._status === O.STATUS_WAITING_FOR_ACK ? (_.reply(200), this._ended("remote", _, n.causes.BYE)) : this._status === O.STATUS_INVITE_RECEIVED || this._status === O.STATUS_WAITING_FOR_ANSWER ? (_.reply(200), this._request.reply(487, "BYE Received"), this._ended("remote", _, n.causes.BYE)) : _.reply(403, "Wrong Status");
          break;
        case n.INVITE:
          this._status === O.STATUS_CONFIRMED ? _.hasHeader("replaces") ? this._receiveReplaces(_) : this._receiveReinvite(_) : _.reply(403, "Wrong Status");
          break;
        case n.INFO:
          if (this._status === O.STATUS_1XX_RECEIVED || this._status === O.STATUS_WAITING_FOR_ANSWER || this._status === O.STATUS_ANSWERED || this._status === O.STATUS_WAITING_FOR_ACK || this._status === O.STATUS_CONFIRMED) {
            const m = _.hasHeader("Content-Type") ? _.getHeader("Content-Type").toLowerCase() : void 0;
            m && m.match(/^application\/dtmf-relay/i) ? new g(this).init_incoming(_) : m !== void 0 ? new A(this).init_incoming(_) : _.reply(415);
          } else _.reply(403, "Wrong Status");
          break;
        case n.UPDATE:
          this._status === O.STATUS_CONFIRMED ? this._receiveUpdate(_) : _.reply(403, "Wrong Status");
          break;
        case n.REFER:
          this._status === O.STATUS_CONFIRMED ? this._receiveRefer(_) : _.reply(403, "Wrong Status");
          break;
        case n.NOTIFY:
          this._status === O.STATUS_CONFIRMED ? this._receiveNotify(_) : _.reply(403, "Wrong Status");
          break;
        default:
          _.reply(501);
      }
    }
    onTransportError() {
      U("onTransportError()"), this._status !== O.STATUS_TERMINATED && this.terminate({ status_code: 500, reason_phrase: n.causes.CONNECTION_ERROR, cause: n.causes.CONNECTION_ERROR });
    }
    onRequestTimeout() {
      U("onRequestTimeout()"), this._status !== O.STATUS_TERMINATED && this.terminate({ status_code: 408, reason_phrase: n.causes.REQUEST_TIMEOUT, cause: n.causes.REQUEST_TIMEOUT });
    }
    onDialogError() {
      U("onDialogError()"), this._status !== O.STATUS_TERMINATED && this.terminate({ status_code: 500, reason_phrase: n.causes.DIALOG_ERROR, cause: n.causes.DIALOG_ERROR });
    }
    newDTMF(_) {
      y("newDTMF()"), this.emit("newDTMF", _);
    }
    newInfo(_) {
      y("newInfo()"), this.emit("newInfo", _);
    }
    _isReadyToReOffer() {
      return this._rtcReady ? this._dialog ? this._dialog.uac_pending_reply !== !0 && this._dialog.uas_pending_reply !== !0 || (y("_isReadyToReOffer() | there is another INVITE/UPDATE transaction in progress"), !1) : (y("_isReadyToReOffer() | session not established yet"), !1) : (y("_isReadyToReOffer() | internal WebRTC status not ready"), !1);
    }
    _close() {
      if (y("close()"), this._status !== O.STATUS_TERMINATED) {
        if (this._status = O.STATUS_TERMINATED, this._connection) try {
          this._connection.close();
        } catch (_) {
          U("close() | error closing the RTCPeerConnection: %o", _);
        }
        this._localMediaStream && this._localMediaStreamLocallyGenerated && (y("close() | closing local MediaStream"), e.closeMediaStream(this._localMediaStream));
        for (const _ in this._timers) Object.prototype.hasOwnProperty.call(this._timers, _) && clearTimeout(this._timers[_]);
        clearTimeout(this._sessionTimers.timer), this._dialog && (this._dialog.terminate(), delete this._dialog);
        for (const _ in this._earlyDialogs) Object.prototype.hasOwnProperty.call(this._earlyDialogs, _) && (this._earlyDialogs[_].terminate(), delete this._earlyDialogs[_]);
        for (const _ in this._referSubscribers) Object.prototype.hasOwnProperty.call(this._referSubscribers, _) && delete this._referSubscribers[_];
        this._ua.destroyRTCSession(this);
      }
    }
    _setInvite2xxTimer(_, m) {
      let v = h.T1;
      this._timers.invite2xxTimer = setTimeout(function E() {
        this._status === O.STATUS_WAITING_FOR_ACK && (_.reply(200, null, [`Contact: ${this._contact}`], m), v < h.T2 && (v *= 2, v > h.T2 && (v = h.T2)), this._timers.invite2xxTimer = setTimeout(E.bind(this), v));
      }.bind(this), v);
    }
    _setACKTimer() {
      this._timers.ackTimer = setTimeout(() => {
        this._status === O.STATUS_WAITING_FOR_ACK && (y("no ACK received, terminating the session"), clearTimeout(this._timers.invite2xxTimer), this.sendRequest(n.BYE), this._ended("remote", null, n.causes.NO_ACK));
      }, h.TIMER_H);
    }
    _createRTCConnection(_, m) {
      this._connection = new RTCPeerConnection(_, m), this._connection.addEventListener("iceconnectionstatechange", () => {
        this._connection.iceConnectionState === "failed" && this.terminate({ cause: n.causes.RTP_TIMEOUT, status_code: 408, reason_phrase: n.causes.RTP_TIMEOUT });
      }), y('emit "peerconnection"'), this.emit("peerconnection", { peerconnection: this._connection });
    }
    _createLocalDescription(_, m) {
      if (y("createLocalDescription()"), _ !== "offer" && _ !== "answer") throw new Error(`createLocalDescription() | invalid type "${_}"`);
      const v = this._connection;
      return this._rtcReady = !1, Promise.resolve().then(() => _ === "offer" ? v.createOffer(m).catch((E) => (U('emit "peerconnection:createofferfailed" [error:%o]', E), this.emit("peerconnection:createofferfailed", E), Promise.reject(E))) : v.createAnswer(m).catch((E) => (U('emit "peerconnection:createanswerfailed" [error:%o]', E), this.emit("peerconnection:createanswerfailed", E), Promise.reject(E)))).then((E) => v.setLocalDescription(E).catch((I) => (this._rtcReady = !0, U('emit "peerconnection:setlocaldescriptionfailed" [error:%o]', I), this.emit("peerconnection:setlocaldescriptionfailed", I), Promise.reject(I)))).then(() => {
        if (!(v.iceGatheringState !== "complete" || m && m.iceRestart)) {
          this._rtcReady = !0;
          const E = { originator: "local", type: _, sdp: v.localDescription.sdp };
          return y('emit "sdp"'), this.emit("sdp", E), Promise.resolve(E.sdp);
        }
        return new Promise((E) => {
          let I, D, $ = !1;
          const M = () => {
            v.removeEventListener("icecandidate", I), v.removeEventListener("icegatheringstatechange", D), $ = !0, this._rtcReady = !0;
            const B = { originator: "local", type: _, sdp: v.localDescription.sdp };
            y('emit "sdp"'), this.emit("sdp", B), E(B.sdp);
          };
          v.addEventListener("icecandidate", I = (B) => {
            const V = B.candidate;
            V ? this.emit("icecandidate", { candidate: V, ready: M }) : $ || M();
          }), v.addEventListener("icegatheringstatechange", D = () => {
            v.iceGatheringState !== "complete" || $ || M();
          });
        });
      });
    }
    _createDialog(_, m, v) {
      const E = m === "UAS" ? _.to_tag : _.from_tag, I = m === "UAS" ? _.from_tag : _.to_tag, D = _.call_id + E + I;
      let $ = this._earlyDialogs[D];
      if (v) return !!$ || ($ = new u(this, _, m, u.C.STATUS_EARLY), $.error ? (y($.error), this._failed("remote", _, n.causes.INTERNAL_ERROR), !1) : (this._earlyDialogs[D] = $, !0));
      {
        if (this._from_tag = _.from_tag, this._to_tag = _.to_tag, $) return $.update(_, m), this._dialog = $, delete this._earlyDialogs[D], !0;
        const M = new u(this, _, m);
        return M.error ? (y(M.error), this._failed("remote", _, n.causes.INTERNAL_ERROR), !1) : (this._dialog = M, !0);
      }
    }
    _receiveReinvite(_) {
      y("receiveReinvite()");
      const m = _.hasHeader("Content-Type") ? _.getHeader("Content-Type").toLowerCase() : void 0, v = { request: _, callback: void 0, reject: function(D = {}) {
        E = !0;
        const $ = D.status_code || 403, M = D.reason_phrase || "", B = e.cloneArray(D.extraHeaders);
        if (this._status !== O.STATUS_CONFIRMED) return !1;
        if ($ < 300 || $ >= 700) throw new TypeError(`Invalid status_code: ${$}`);
        _.reply($, M, B);
      }.bind(this) };
      let E = !1;
      if (this.emit("reinvite", v), !E) {
        if (this._late_sdp = !1, !_.body) return this._late_sdp = !0, this._remoteHold && (this._remoteHold = !1, this._onunhold("remote")), void (this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._createLocalDescription("offer", this._rtcOfferConstraints)).then((D) => {
          I.call(this, D);
        }).catch(() => {
          _.reply(500);
        }));
        if (m !== "application/sdp") return y("invalid Content-Type"), void _.reply(415);
        this._processInDialogSdpOffer(_).then((D) => {
          this._status !== O.STATUS_TERMINATED && I.call(this, D);
        }).catch((D) => {
          U(D);
        });
      }
      function I(D) {
        const $ = [`Contact: ${this._contact}`];
        this._handleSessionTimersInIncomingRequest(_, $), this._late_sdp && (D = this._mangleOffer(D)), _.reply(200, null, $, D, () => {
          this._status = O.STATUS_WAITING_FOR_ACK, this._setInvite2xxTimer(_, D), this._setACKTimer();
        }), typeof v.callback == "function" && v.callback();
      }
    }
    _receiveUpdate(_) {
      y("receiveUpdate()");
      const m = _.hasHeader("Content-Type") ? _.getHeader("Content-Type").toLowerCase() : void 0, v = { request: _, callback: void 0, reject: function(D = {}) {
        E = !0;
        const $ = D.status_code || 403, M = D.reason_phrase || "", B = e.cloneArray(D.extraHeaders);
        if (this._status !== O.STATUS_CONFIRMED) return !1;
        if ($ < 300 || $ >= 700) throw new TypeError(`Invalid status_code: ${$}`);
        _.reply($, M, B);
      }.bind(this) };
      let E = !1;
      if (this.emit("update", v), !E) if (_.body) {
        if (m !== "application/sdp") return y("invalid Content-Type"), void _.reply(415);
        this._processInDialogSdpOffer(_).then((D) => {
          this._status !== O.STATUS_TERMINATED && I.call(this, D);
        }).catch((D) => {
          U(D);
        });
      } else I.call(this, null);
      function I(D) {
        const $ = [`Contact: ${this._contact}`];
        this._handleSessionTimersInIncomingRequest(_, $), _.reply(200, null, $, D), typeof v.callback == "function" && v.callback();
      }
    }
    _processInDialogSdpOffer(_) {
      y("_processInDialogSdpOffer()");
      const m = _.parseSDP();
      let v = !1;
      for (const D of m.media) {
        if (z.indexOf(D.type) === -1) continue;
        const $ = D.direction || m.direction || "sendrecv";
        if ($ !== "sendonly" && $ !== "inactive") {
          v = !1;
          break;
        }
        v = !0;
      }
      const E = { originator: "remote", type: "offer", sdp: _.body };
      y('emit "sdp"'), this.emit("sdp", E);
      const I = new RTCSessionDescription({ type: "offer", sdp: E.sdp });
      return this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        return this._connection.setRemoteDescription(I).catch((D) => {
          throw _.reply(488), U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', D), this.emit("peerconnection:setremotedescriptionfailed", D), D;
        });
      }).then(() => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        this._remoteHold === !0 && v === !1 ? (this._remoteHold = !1, this._onunhold("remote")) : this._remoteHold === !1 && v === !0 && (this._remoteHold = !0, this._onhold("remote"));
      }).then(() => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        return this._createLocalDescription("answer", this._rtcAnswerConstraints).catch((D) => {
          throw _.reply(500), U('emit "peerconnection:createtelocaldescriptionfailed" [error:%o]', D), D;
        });
      }).catch((D) => {
        U("_processInDialogSdpOffer() failed [error: %o]", D);
      }), this._connectionPromiseQueue;
    }
    _receiveRefer(_) {
      if (y("receiveRefer()"), !_.refer_to) return y("no Refer-To header field present in REFER"), void _.reply(400);
      if (_.refer_to.uri.scheme !== n.SIP) return y("Refer-To header field points to a non-SIP URI scheme"), void _.reply(416);
      _.reply(202);
      const m = new S(this, _.cseq);
      function v(I, D = {}) {
        if (I = typeof I == "function" ? I : null, this._status !== O.STATUS_WAITING_FOR_ACK && this._status !== O.STATUS_CONFIRMED) return !1;
        const $ = new Sr(this._ua);
        if ($.on("progress", ({ response: M }) => {
          m.notify(M.status_code, M.reason_phrase);
        }), $.on("accepted", ({ response: M }) => {
          m.notify(M.status_code, M.reason_phrase);
        }), $.on("_failed", ({ message: M, cause: B }) => {
          M ? m.notify(M.status_code, M.reason_phrase) : m.notify(487, B);
        }), _.refer_to.uri.hasHeader("replaces")) {
          const M = decodeURIComponent(_.refer_to.uri.getHeader("replaces"));
          D.extraHeaders = e.cloneArray(D.extraHeaders), D.extraHeaders.push(`Replaces: ${M}`);
        }
        $.connect(_.refer_to.uri.toAor(), D, I);
      }
      function E() {
        m.notify(603);
      }
      y('emit "refer"'), this.emit("refer", { request: _, accept: (I, D) => {
        v.call(this, I, D);
      }, reject: () => {
        E.call(this);
      } });
    }
    _receiveNotify(_) {
      switch (y("receiveNotify()"), _.event || _.reply(400), _.event.event) {
        case "refer": {
          let m, v;
          if (_.event.params && _.event.params.id) m = _.event.params.id, v = this._referSubscribers[m];
          else {
            if (Object.keys(this._referSubscribers).length !== 1) return void _.reply(400, "Missing event id parameter");
            v = this._referSubscribers[Object.keys(this._referSubscribers)[0]];
          }
          if (!v) return void _.reply(481, "Subscription does not exist");
          v.receiveNotify(_), _.reply(200);
          break;
        }
        default:
          _.reply(489);
      }
    }
    _receiveReplaces(_) {
      function m(E) {
        if (this._status !== O.STATUS_WAITING_FOR_ACK && this._status !== O.STATUS_CONFIRMED) return !1;
        const I = new Sr(this._ua);
        I.on("confirmed", () => {
          this.terminate();
        }), I.init_incoming(_, E);
      }
      function v() {
        y("Replaced INVITE rejected by the user"), _.reply(486);
      }
      y("receiveReplaces()"), this.emit("replaces", { request: _, accept: (E) => {
        m.call(this, E);
      }, reject: () => {
        v.call(this);
      } });
    }
    _sendInitialRequest(_, m, v) {
      const E = new T(this._ua, this._request, { onRequestTimeout: () => {
        this.onRequestTimeout();
      }, onTransportError: () => {
        this.onTransportError();
      }, onAuthenticated: (I) => {
        this._request = I;
      }, onReceiveResponse: (I) => {
        this._receiveInviteResponse(I);
      } });
      Promise.resolve().then(() => v || (_.audio || _.video ? (this._localMediaStreamLocallyGenerated = !0, navigator.mediaDevices.getUserMedia(_).catch((I) => {
        throw this._status === O.STATUS_TERMINATED ? new Error("terminated") : (this._failed("local", null, n.causes.USER_DENIED_MEDIA_ACCESS), U('emit "getusermediafailed" [error:%o]', I), this.emit("getusermediafailed", I), I);
      })) : void 0)).then((I) => {
        if (this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        return this._localMediaStream = I, I && I.getTracks().forEach((D) => {
          this._connection.addTrack(D, I);
        }), this._connecting(this._request), this._createLocalDescription("offer", m).catch((D) => {
          throw this._failed("local", null, n.causes.WEBRTC_ERROR), D;
        });
      }).then((I) => {
        if (this._is_canceled || this._status === O.STATUS_TERMINATED) throw new Error("terminated");
        this._request.body = I, this._status = O.STATUS_INVITE_SENT, y('emit "sending" [request:%o]', this._request), this.emit("sending", { request: this._request }), E.send();
      }).catch((I) => {
        this._status !== O.STATUS_TERMINATED && U(I);
      });
    }
    _getDTMFRTPSender() {
      const _ = this._connection.getSenders().find((m) => m.track && m.track.kind === "audio");
      if (_ && _.dtmf) return _.dtmf;
      U("sendDTMF() | no local audio track to send DTMF with");
    }
    _receiveInviteResponse(_) {
      if (y("receiveInviteResponse()"), this._dialog && _.status_code >= 200 && _.status_code <= 299) {
        if (this._dialog.id.call_id === _.call_id && this._dialog.id.local_tag === _.from_tag && this._dialog.id.remote_tag === _.to_tag) return void this.sendRequest(n.ACK);
        {
          const m = new u(this, _, "UAC");
          return m.error !== void 0 ? void y(m.error) : (this.sendRequest(n.ACK), void this.sendRequest(n.BYE));
        }
      }
      if (this._is_canceled) _.status_code >= 100 && _.status_code < 200 ? this._request.cancel(this._cancel_reason) : _.status_code >= 200 && _.status_code < 299 && this._acceptAndTerminate(_);
      else if (this._status === O.STATUS_INVITE_SENT || this._status === O.STATUS_1XX_RECEIVED) switch (!0) {
        case /^100$/.test(_.status_code):
          this._status = O.STATUS_1XX_RECEIVED;
          break;
        case /^1[0-9]{2}$/.test(_.status_code): {
          if (!_.to_tag) {
            y("1xx response received without to tag");
            break;
          }
          if (_.hasHeader("contact") && !this._createDialog(_, "UAC", !0)) break;
          if (this._status = O.STATUS_1XX_RECEIVED, !_.body) {
            this._progress("remote", _);
            break;
          }
          const m = { originator: "remote", type: "answer", sdp: _.body };
          y('emit "sdp"'), this.emit("sdp", m);
          const v = new RTCSessionDescription({ type: "answer", sdp: m.sdp });
          this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._connection.setRemoteDescription(v)).then(() => this._progress("remote", _)).catch((E) => {
            U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', E), this.emit("peerconnection:setremotedescriptionfailed", E);
          });
          break;
        }
        case /^2[0-9]{2}$/.test(_.status_code): {
          if (this._status = O.STATUS_CONFIRMED, !_.body) {
            this._acceptAndTerminate(_, 400, n.causes.MISSING_SDP), this._failed("remote", _, n.causes.BAD_MEDIA_DESCRIPTION);
            break;
          }
          if (!this._createDialog(_, "UAC")) break;
          const m = { originator: "remote", type: "answer", sdp: _.body };
          y('emit "sdp"'), this.emit("sdp", m);
          const v = new RTCSessionDescription({ type: "answer", sdp: m.sdp });
          this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => {
            if (this._connection.signalingState === "stable") return this._connection.createOffer(this._rtcOfferConstraints).then((E) => this._connection.setLocalDescription(E)).catch((E) => {
              this._acceptAndTerminate(_, 500, E.toString()), this._failed("local", _, n.causes.WEBRTC_ERROR);
            });
          }).then(() => {
            this._connection.setRemoteDescription(v).then(() => {
              this._handleSessionTimersInIncomingResponse(_), this._accepted("remote", _), this.sendRequest(n.ACK), this._confirmed("local", null);
            }).catch((E) => {
              this._acceptAndTerminate(_, 488, "Not Acceptable Here"), this._failed("remote", _, n.causes.BAD_MEDIA_DESCRIPTION), U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', E), this.emit("peerconnection:setremotedescriptionfailed", E);
            });
          });
          break;
        }
        default: {
          const m = e.sipErrorCause(_.status_code);
          this._failed("remote", _, m);
        }
      }
    }
    _sendReinvite(_ = {}) {
      y("sendReinvite()");
      const m = e.cloneArray(_.extraHeaders), v = e.cloneObject(_.eventHandlers), E = _.rtcOfferConstraints || this._rtcOfferConstraints || null;
      let I = !1;
      function D(M) {
        if (this._status === O.STATUS_TERMINATED || (this.sendRequest(n.ACK), I)) return;
        if (this._handleSessionTimersInIncomingResponse(M), !M.body) return void $.call(this);
        if (!M.hasHeader("Content-Type") || M.getHeader("Content-Type").toLowerCase() !== "application/sdp") return void $.call(this);
        const B = { originator: "remote", type: "answer", sdp: M.body };
        y('emit "sdp"'), this.emit("sdp", B);
        const V = new RTCSessionDescription({ type: "answer", sdp: B.sdp });
        this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._connection.setRemoteDescription(V)).then(() => {
          v.succeeded && v.succeeded(M);
        }).catch((q) => {
          $.call(this), U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', q), this.emit("peerconnection:setremotedescriptionfailed", q);
        });
      }
      function $(M) {
        v.failed && v.failed(M);
      }
      m.push(`Contact: ${this._contact}`), m.push("Content-Type: application/sdp"), this._sessionTimers.running && m.push(`Session-Expires: ${this._sessionTimers.currentExpires};refresher=${this._sessionTimers.refresher ? "uac" : "uas"}`), this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._createLocalDescription("offer", E)).then((M) => {
        const B = { originator: "local", type: "offer", sdp: M = this._mangleOffer(M) };
        y('emit "sdp"'), this.emit("sdp", B), this.sendRequest(n.INVITE, { extraHeaders: m, body: M, eventHandlers: { onSuccessResponse: (V) => {
          D.call(this, V), I = !0;
        }, onErrorResponse: (V) => {
          $.call(this, V);
        }, onTransportError: () => {
          this.onTransportError();
        }, onRequestTimeout: () => {
          this.onRequestTimeout();
        }, onDialogError: () => {
          this.onDialogError();
        } } });
      }).catch(() => {
        $();
      });
    }
    _sendUpdate(_ = {}) {
      y("sendUpdate()");
      const m = e.cloneArray(_.extraHeaders), v = e.cloneObject(_.eventHandlers), E = _.rtcOfferConstraints || this._rtcOfferConstraints || null, I = _.sdpOffer || !1;
      let D = !1;
      function $(B) {
        if (this._status !== O.STATUS_TERMINATED && !D) if (this._handleSessionTimersInIncomingResponse(B), I) {
          if (!B.body) return void M.call(this);
          if (!B.hasHeader("Content-Type") || B.getHeader("Content-Type").toLowerCase() !== "application/sdp") return void M.call(this);
          const V = { originator: "remote", type: "answer", sdp: B.body };
          y('emit "sdp"'), this.emit("sdp", V);
          const q = new RTCSessionDescription({ type: "answer", sdp: V.sdp });
          this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._connection.setRemoteDescription(q)).then(() => {
            v.succeeded && v.succeeded(B);
          }).catch((Q) => {
            M.call(this), U('emit "peerconnection:setremotedescriptionfailed" [error:%o]', Q), this.emit("peerconnection:setremotedescriptionfailed", Q);
          });
        } else v.succeeded && v.succeeded(B);
      }
      function M(B) {
        v.failed && v.failed(B);
      }
      m.push(`Contact: ${this._contact}`), this._sessionTimers.running && m.push(`Session-Expires: ${this._sessionTimers.currentExpires};refresher=${this._sessionTimers.refresher ? "uac" : "uas"}`), I ? (m.push("Content-Type: application/sdp"), this._connectionPromiseQueue = this._connectionPromiseQueue.then(() => this._createLocalDescription("offer", E)).then((B) => {
        const V = { originator: "local", type: "offer", sdp: B = this._mangleOffer(B) };
        y('emit "sdp"'), this.emit("sdp", V), this.sendRequest(n.UPDATE, { extraHeaders: m, body: B, eventHandlers: { onSuccessResponse: (q) => {
          $.call(this, q), D = !0;
        }, onErrorResponse: (q) => {
          M.call(this, q);
        }, onTransportError: () => {
          this.onTransportError();
        }, onRequestTimeout: () => {
          this.onRequestTimeout();
        }, onDialogError: () => {
          this.onDialogError();
        } } });
      }).catch(() => {
        M.call(this);
      })) : this.sendRequest(n.UPDATE, { extraHeaders: m, eventHandlers: { onSuccessResponse: (B) => {
        $.call(this, B);
      }, onErrorResponse: (B) => {
        M.call(this, B);
      }, onTransportError: () => {
        this.onTransportError();
      }, onRequestTimeout: () => {
        this.onRequestTimeout();
      }, onDialogError: () => {
        this.onDialogError();
      } } });
    }
    _acceptAndTerminate(_, m, v) {
      y("acceptAndTerminate()");
      const E = [];
      m && (v = v || n.REASON_PHRASE[m] || "", E.push(`Reason: SIP ;cause=${m}; text="${v}"`)), (this._dialog || this._createDialog(_, "UAC")) && (this.sendRequest(n.ACK), this.sendRequest(n.BYE, { extraHeaders: E })), this._status = O.STATUS_TERMINATED;
    }
    _mangleOffer(_) {
      if (!this._localHold && !this._remoteHold) return _;
      if (_ = i.parse(_), this._localHold && !this._remoteHold) {
        y("mangleOffer() | me on hold, mangling offer");
        for (const m of _.media) z.indexOf(m.type) !== -1 && (m.direction ? m.direction === "sendrecv" ? m.direction = "sendonly" : m.direction === "recvonly" && (m.direction = "inactive") : m.direction = "sendonly");
      } else if (this._localHold && this._remoteHold) {
        y("mangleOffer() | both on hold, mangling offer");
        for (const m of _.media) z.indexOf(m.type) !== -1 && (m.direction = "inactive");
      } else if (this._remoteHold) {
        y("mangleOffer() | remote on hold, mangling offer");
        for (const m of _.media) z.indexOf(m.type) !== -1 && (m.direction ? m.direction === "sendrecv" ? m.direction = "recvonly" : m.direction === "recvonly" && (m.direction = "inactive") : m.direction = "recvonly");
      }
      return i.write(_);
    }
    _setLocalMediaStatus() {
      let _ = !0, m = !0;
      (this._localHold || this._remoteHold) && (_ = !1, m = !1), this._audioMuted && (_ = !1), this._videoMuted && (m = !1), this._toggleMuteAudio(!_), this._toggleMuteVideo(!m);
    }
    _handleSessionTimersInIncomingRequest(_, m) {
      if (!this._sessionTimers.enabled) return;
      let v;
      _.session_expires && _.session_expires >= n.MIN_SESSION_EXPIRES ? (this._sessionTimers.currentExpires = _.session_expires, v = _.session_expires_refresher || "uas") : (this._sessionTimers.currentExpires = this._sessionTimers.defaultExpires, v = "uas"), m.push(`Session-Expires: ${this._sessionTimers.currentExpires};refresher=${v}`), this._sessionTimers.refresher = v === "uas", this._runSessionTimer();
    }
    _handleSessionTimersInIncomingResponse(_) {
      if (!this._sessionTimers.enabled) return;
      let m;
      _.session_expires && _.session_expires >= n.MIN_SESSION_EXPIRES ? (this._sessionTimers.currentExpires = _.session_expires, m = _.session_expires_refresher || "uac") : (this._sessionTimers.currentExpires = this._sessionTimers.defaultExpires, m = "uac"), this._sessionTimers.refresher = m === "uac", this._runSessionTimer();
    }
    _runSessionTimer() {
      const _ = this._sessionTimers.currentExpires;
      this._sessionTimers.running = !0, clearTimeout(this._sessionTimers.timer), this._sessionTimers.refresher ? this._sessionTimers.timer = setTimeout(() => {
        this._status !== O.STATUS_TERMINATED && (y("runSessionTimer() | sending session refresh request"), this._sessionTimers.refreshMethod === n.UPDATE ? this._sendUpdate() : this._sendReinvite());
      }, 500 * _) : this._sessionTimers.timer = setTimeout(() => {
        this._status !== O.STATUS_TERMINATED && (U("runSessionTimer() | timer expired, terminating the session"), this.terminate({ cause: n.causes.REQUEST_TIMEOUT, status_code: 408, reason_phrase: "Session Timer Expired" }));
      }, 1100 * _);
    }
    _toggleMuteAudio(_) {
      const m = this._connection.getSenders().filter((v) => v.track && v.track.kind === "audio");
      for (const v of m) v.track.enabled = !_;
    }
    _toggleMuteVideo(_) {
      const m = this._connection.getSenders().filter((v) => v.track && v.track.kind === "video");
      for (const v of m) v.track.enabled = !_;
    }
    _newRTCSession(_, m) {
      y("newRTCSession()"), this._ua.newRTCSession(this, { originator: _, session: this, request: m });
    }
    _connecting(_) {
      y("session connecting"), y('emit "connecting"'), this.emit("connecting", { request: _ });
    }
    _progress(_, m) {
      y("session progress"), y('emit "progress"'), this.emit("progress", { originator: _, response: m || null, session: this._request });
    }
    _accepted(_, m) {
      y("session accepted"), this._start_time = /* @__PURE__ */ new Date(), y('emit "accepted"'), this.emit("accepted", { originator: _, response: m || null });
    }
    _confirmed(_, m) {
      y("session confirmed"), this._is_confirmed = !0, y('emit "confirmed"'), this.emit("confirmed", { originator: _, ack: m || null });
    }
    _ended(_, m, v) {
      y("session ended"), this._end_time = /* @__PURE__ */ new Date(), this._close(), y('emit "ended"'), this.emit("ended", { originator: _, message: m || null, cause: v });
    }
    _failed(_, m, v) {
      y("session failed"), y('emit "_failed"'), this.emit("_failed", { originator: _, message: m || null, cause: v }), this._close(), y('emit "failed"'), this.emit("failed", { originator: _, message: m || null, cause: v });
    }
    _onhold(_) {
      y("session onhold"), this._setLocalMediaStatus(), y('emit "hold"'), this.emit("hold", { originator: _ });
    }
    _onunhold(_) {
      y("session onunhold"), this._setLocalMediaStatus(), y('emit "unhold"'), this.emit("unhold", { originator: _ });
    }
    _onmute({ audio: _, video: m }) {
      y("session onmute"), this._setLocalMediaStatus(), y('emit "muted"'), this.emit("muted", { audio: _, video: m });
    }
    _onunmute({ audio: _, video: m }) {
      y("session onunmute"), this._setLocalMediaStatus(), y('emit "unmuted"'), this.emit("unmuted", { audio: _, video: m });
    }
  }, sr;
}
const Dd = Ct.EventEmitter, rr = Ae, Ld = nt, en = Ne(), Pd = os, ca = vt, jn = te("JsSIP:Message");
var ai = {};
const ir = Ne(), xd = je(), Rt = te("JsSIP:ERROR:Socket");
Rt.log = console.warn.bind(console), ai.isSocket = (s) => {
  if (Array.isArray(s)) return !1;
  if (s === void 0) return Rt("undefined JsSIP.Socket instance"), !1;
  try {
    if (!ir.isString(s.url)) throw Rt("missing or invalid JsSIP.Socket url property"), new Error();
    if (!ir.isString(s.via_transport)) throw Rt("missing or invalid JsSIP.Socket via_transport property"), new Error();
    if (xd.parse(s.sip_uri, "SIP_URI") === -1) throw Rt("missing or invalid JsSIP.Socket sip_uri property"), new Error();
  } catch {
    return !1;
  }
  try {
    ["connect", "disconnect", "send"].forEach((i) => {
      if (!ir.isFunction(s[i])) throw Rt(`missing or invalid JsSIP.Socket method: ${i}`), new Error();
    });
  } catch {
    return !1;
  }
  return !0;
};
const Ud = ai, Pe = te("JsSIP:Transport"), iu = te("JsSIP:ERROR:Transport"), ha = Ae;
iu.log = console.warn.bind(console);
const da = 0, fa = 1, or = 2, _a = 0, pa = 1, kd = { min_interval: ha.CONNECTION_RECOVERY_MIN_INTERVAL, max_interval: ha.CONNECTION_RECOVERY_MAX_INTERVAL };
var ou = {};
const Ar = je(), Rr = nt, tn = te("JsSIP:ERROR:Parser");
function Md(s, i) {
  let n = i, a = 0, l = 0;
  if (s.substring(n, n + 2).match(/(^\r\n)/)) return -2;
  for (; a === 0; ) {
    if (l = s.indexOf(`\r
`, n), l === -1) return l;
    !s.substring(l + 2, l + 4).match(/(^\r\n)/) && s.charAt(l + 2).match(/(^\s+)/) ? n = l + 2 : a = l;
  }
  return a;
}
function $d(s, i, n, a) {
  let l;
  const e = i.indexOf(":", n), h = i.substring(n, e).trim(), f = i.substring(e + 1, a).trim();
  switch (h.toLowerCase()) {
    case "via":
    case "v":
      s.addHeader("via", f), s.getHeaders("via").length === 1 ? (l = s.parseHeader("Via"), l && (s.via = l, s.via_branch = l.branch)) : l = 0;
      break;
    case "from":
    case "f":
      s.setHeader("from", f), l = s.parseHeader("from"), l && (s.from = l, s.from_tag = l.getParam("tag"));
      break;
    case "to":
    case "t":
      s.setHeader("to", f), l = s.parseHeader("to"), l && (s.to = l, s.to_tag = l.getParam("tag"));
      break;
    case "record-route":
      if (l = Ar.parse(f, "Record_Route"), l === -1) l = void 0;
      else for (const u of l) s.addHeader("record-route", f.substring(u.possition, u.offset)), s.headers["Record-Route"][s.getHeaders("record-route").length - 1].parsed = u.parsed;
      break;
    case "call-id":
    case "i":
      s.setHeader("call-id", f), l = s.parseHeader("call-id"), l && (s.call_id = f);
      break;
    case "contact":
    case "m":
      if (l = Ar.parse(f, "Contact"), l === -1) l = void 0;
      else for (const u of l) s.addHeader("contact", f.substring(u.possition, u.offset)), s.headers.Contact[s.getHeaders("contact").length - 1].parsed = u.parsed;
      break;
    case "content-length":
    case "l":
      s.setHeader("content-length", f), l = s.parseHeader("content-length");
      break;
    case "content-type":
    case "c":
      s.setHeader("content-type", f), l = s.parseHeader("content-type");
      break;
    case "cseq":
      s.setHeader("cseq", f), l = s.parseHeader("cseq"), l && (s.cseq = l.value), s instanceof Rr.IncomingResponse && (s.method = l.method);
      break;
    case "max-forwards":
      s.setHeader("max-forwards", f), l = s.parseHeader("max-forwards");
      break;
    case "www-authenticate":
      s.setHeader("www-authenticate", f), l = s.parseHeader("www-authenticate");
      break;
    case "proxy-authenticate":
      s.setHeader("proxy-authenticate", f), l = s.parseHeader("proxy-authenticate");
      break;
    case "session-expires":
    case "x":
      s.setHeader("session-expires", f), l = s.parseHeader("session-expires"), l && (s.session_expires = l.expires, s.session_expires_refresher = l.refresher);
      break;
    case "refer-to":
    case "r":
      s.setHeader("refer-to", f), l = s.parseHeader("refer-to"), l && (s.refer_to = l);
      break;
    case "replaces":
      s.setHeader("replaces", f), l = s.parseHeader("replaces"), l && (s.replaces = l);
      break;
    case "event":
    case "o":
      s.setHeader("event", f), l = s.parseHeader("event"), l && (s.event = l);
      break;
    default:
      s.addHeader(h, f), l = 0;
  }
  return l !== void 0 || { error: `error parsing header "${h}"` };
}
tn.log = console.warn.bind(console), ou.parseMessage = (s, i) => {
  let n, a, l = s.indexOf(`\r
`);
  if (l === -1) return void tn("parseMessage() | no CRLF found, not a SIP message");
  const e = s.substring(0, l);
  let h = Ar.parse(e, "Request_Response");
  if (h === -1) return void tn(`parseMessage() | error parsing first line of SIP message: "${e}"`);
  h.status_code ? (n = new Rr.IncomingResponse(), n.status_code = h.status_code, n.reason_phrase = h.reason_phrase) : (n = new Rr.IncomingRequest(i), n.method = h.method, n.ruri = h.uri), n.data = s;
  let f = l + 2;
  for (; ; ) {
    if (l = Md(s, f), l === -2) {
      a = f + 2;
      break;
    }
    if (l === -1) return void tn("parseMessage() | malformed message");
    if (h = $d(n, s, f, l), h !== !0) return void tn("parseMessage() |", h.error);
    f = l + 2;
  }
  if (n.hasHeader("content-length")) {
    const u = n.getHeader("content-length");
    n.body = s.substr(a, u);
  } else n.body = s.substring(a);
  return n;
};
const lu = Ae, ma = nt, ui = Ne(), yr = te("JsSIP:sanityCheck"), Fd = [function() {
  const s = ["from", "to", "call_id", "cseq", "via"];
  for (const i of s) if (!ue.hasHeader(i)) return yr(`missing mandatory header field : ${i}, dropping the response`), !1;
}], qd = [function() {
  if (ue.s("to").uri.scheme !== "sip") return nn(416), !1;
}, function() {
  if (!ue.to_tag && ue.call_id.substr(0, 5) === Fe.configuration.jssip_id) return nn(482), !1;
}, function() {
  const s = ui.str_utf8_length(ue.body), i = ue.getHeader("content-length");
  if (s < i) return nn(400), !1;
}, function() {
  const s = ue.from_tag, i = ue.call_id, n = ue.cseq;
  let a;
  if (!ue.to_tag)
    if (ue.method === lu.INVITE) {
      if (Fe._transactions.ist[ue.via_branch]) return !1;
      for (const l in Fe._transactions.ist) if (Object.prototype.hasOwnProperty.call(Fe._transactions.ist, l) && (a = Fe._transactions.ist[l], a.request.from_tag === s && a.request.call_id === i && a.request.cseq === n)) return nn(482), !1;
    } else {
      if (Fe._transactions.nist[ue.via_branch]) return !1;
      for (const l in Fe._transactions.nist) if (Object.prototype.hasOwnProperty.call(Fe._transactions.nist, l) && (a = Fe._transactions.nist[l], a.request.from_tag === s && a.request.call_id === i && a.request.cseq === n)) return nn(482), !1;
    }
}], Hd = [function() {
  if (ue.getHeaders("via").length > 1) return yr("more than one Via header field present in the response, dropping the response"), !1;
}, function() {
  const s = ui.str_utf8_length(ue.body), i = ue.getHeader("content-length");
  if (s < i) return yr("message body length is lower than the value in Content-Length header field, dropping the response"), !1;
}];
let ue, Fe, au;
function nn(s) {
  const i = ue.getHeaders("via");
  let n, a = `SIP/2.0 ${s} ${lu.REASON_PHRASE[s]}\r
`;
  for (const l of i) a += `Via: ${l}\r
`;
  n = ue.getHeader("To"), ue.to_tag || (n += `;tag=${ui.newTag()}`), a += `To: ${n}\r
`, a += `From: ${ue.getHeader("From")}\r
`, a += `Call-ID: ${ue.call_id}\r
`, a += `CSeq: ${ue.cseq} ${ue.method}\r
`, a += `\r
`, au.send(a);
}
var ci = {};
const bt = Ne(), pt = Ae, lr = je(), ga = Et(), ar = ai, ur = vt;
ci.settings = { authorization_user: null, password: null, realm: null, ha1: null, display_name: null, uri: null, contact_uri: null, instance_id: null, use_preloaded_route: !1, session_timers: !0, session_timers_refresh_method: pt.UPDATE, session_timers_force_refresher: !1, no_answer_timeout: 60, register: !0, register_expires: 600, registrar_server: null, sockets: null, connection_recovery_max_interval: pt.CONNECTION_RECOVERY_MAX_INTERVAL, connection_recovery_min_interval: pt.CONNECTION_RECOVERY_MIN_INTERVAL, via_host: `${bt.createRandomToken(12)}.invalid` };
const Bn = { mandatory: { sockets(s) {
  const i = [];
  if (ar.isSocket(s)) i.push({ socket: s });
  else {
    if (!Array.isArray(s) || !s.length) return;
    for (const n of s) Object.prototype.hasOwnProperty.call(n, "socket") && ar.isSocket(n.socket) ? i.push(n) : ar.isSocket(n) && i.push({ socket: n });
  }
  return i;
}, uri(s) {
  /^sip:/i.test(s) || (s = `${pt.SIP}:${s}`);
  const i = ga.parse(s);
  return i && i.user ? i : void 0;
} }, optional: { authorization_user: (s) => lr.parse(`"${s}"`, "quoted_string") === -1 ? void 0 : s, authorization_jwt(s) {
  if (typeof s == "string") return s;
}, user_agent(s) {
  if (typeof s == "string") return s;
}, connection_recovery_max_interval(s) {
  if (bt.isDecimal(s)) {
    const i = Number(s);
    if (i > 0) return i;
  }
}, connection_recovery_min_interval(s) {
  if (bt.isDecimal(s)) {
    const i = Number(s);
    if (i > 0) return i;
  }
}, contact_uri(s) {
  if (typeof s == "string") {
    const i = lr.parse(s, "SIP_URI");
    if (i !== -1) return i;
  }
}, display_name: (s) => s, instance_id: (s) => (/^uuid:/i.test(s) && (s = s.substr(5)), lr.parse(s, "uuid") === -1 ? void 0 : s), no_answer_timeout(s) {
  if (bt.isDecimal(s)) {
    const i = Number(s);
    if (i > 0) return i;
  }
}, session_timers(s) {
  if (typeof s == "boolean") return s;
}, session_timers_refresh_method(s) {
  if (typeof s == "string" && ((s = s.toUpperCase()) === pt.INVITE || s === pt.UPDATE)) return s;
}, session_timers_force_refresher(s) {
  if (typeof s == "boolean") return s;
}, password: (s) => String(s), realm: (s) => String(s), ha1: (s) => String(s), register(s) {
  if (typeof s == "boolean") return s;
}, register_expires(s) {
  if (bt.isDecimal(s)) {
    const i = Number(s);
    if (i > 0) return i;
  }
}, registrar_server(s) {
  /^sip:/i.test(s) || (s = `${pt.SIP}:${s}`);
  const i = ga.parse(s);
  return i ? i.user ? void 0 : i : void 0;
}, use_preloaded_route(s) {
  if (typeof s == "boolean") return s;
} } };
ci.load = (s, i) => {
  for (const n in Bn.mandatory) {
    if (!i.hasOwnProperty(n)) throw new ur.ConfigurationError(n);
    {
      const a = i[n], l = Bn.mandatory[n](a);
      if (l === void 0) throw new ur.ConfigurationError(n, a);
      s[n] = l;
    }
  }
  for (const n in Bn.optional) if (i.hasOwnProperty(n)) {
    const a = i[n];
    if (bt.isEmpty(a)) continue;
    const l = Bn.optional[n](a);
    if (l === void 0) throw new ur.ConfigurationError(n, a);
    s[n] = l;
  }
};
const jd = Ct.EventEmitter, Re = Ae, Bd = class {
  constructor(s, i) {
    this._ua = s, this._transport = i, this._registrar = s.configuration.registrar_server, this._expires = s.configuration.register_expires, this._call_id = er.createRandomToken(22), this._cseq = 0, this._to_uri = s.configuration.uri, this._registrationTimer = null, this._registering = !1, this._registered = !1, this._contact = this._ua.contact.toString(), this._contact += ";+sip.ice", this._extraHeaders = [], this._extraContactParams = "", this._contact += ";reg-id=1", this._contact += `;+sip.instance="<urn:uuid:${this._ua.configuration.instance_id}>"`;
  }
  get registered() {
    return this._registered;
  }
  setExtraHeaders(s) {
    Array.isArray(s) || (s = []), this._extraHeaders = s.slice();
  }
  setExtraContactParams(s) {
    s instanceof Object || (s = {}), this._extraContactParams = "";
    for (const i in s) if (Object.prototype.hasOwnProperty.call(s, i)) {
      const n = s[i];
      this._extraContactParams += `;${i}`, n && (this._extraContactParams += `=${n}`);
    }
  }
  register() {
    if (this._registering) return void Qt("Register request in progress...");
    const s = this._extraHeaders.slice();
    s.push(`Contact: ${this._contact};expires=${this._expires}${this._extraContactParams}`), s.push(`Expires: ${this._expires}`);
    const i = new ta.OutgoingRequest(ot.REGISTER, this._registrar, this._ua, { to_uri: this._to_uri, call_id: this._call_id, cseq: this._cseq += 1 }, s), n = new na(this._ua, i, { onRequestTimeout: () => {
      this._registrationFailure(null, ot.causes.REQUEST_TIMEOUT);
    }, onTransportError: () => {
      this._registrationFailure(null, ot.causes.CONNECTION_ERROR);
    }, onAuthenticated: () => {
      this._cseq += 1;
    }, onReceiveResponse: (a) => {
      if (a.cseq === this._cseq) switch (this._registrationTimer !== null && (clearTimeout(this._registrationTimer), this._registrationTimer = null), !0) {
        case /^1[0-9]{2}$/.test(a.status_code):
          break;
        case /^2[0-9]{2}$/.test(a.status_code): {
          if (this._registering = !1, !a.hasHeader("Contact")) {
            Qt("no Contact header in response to REGISTER, response ignored");
            break;
          }
          const l = a.headers.Contact.reduce((f, u) => f.concat(u.parsed), []).find((f) => f.uri.user === this._ua.contact.uri.user);
          if (!l) {
            Qt("no Contact header pointing to us, response ignored");
            break;
          }
          let e = l.getParam("expires");
          !e && a.hasHeader("expires") && (e = a.getHeader("expires")), e || (e = this._expires), e = Number(e), e < 10 && (e = 10);
          const h = e > 64 ? 1e3 * e / 2 + Math.floor(1e3 * (e / 2 - 32) * Math.random()) : 1e3 * e - 5e3;
          this._registrationTimer = setTimeout(() => {
            this._registrationTimer = null, this._ua.listeners("registrationExpiring").length === 0 ? this.register() : this._ua.emit("registrationExpiring");
          }, h), l.hasParam("temp-gruu") && (this._ua.contact.temp_gruu = l.getParam("temp-gruu").replace(/"/g, "")), l.hasParam("pub-gruu") && (this._ua.contact.pub_gruu = l.getParam("pub-gruu").replace(/"/g, "")), this._registered || (this._registered = !0, this._ua.registered({ response: a }));
          break;
        }
        case /^423$/.test(a.status_code):
          a.hasHeader("min-expires") ? (this._expires = Number(a.getHeader("min-expires")), this._expires < 10 && (this._expires = 10), this.register()) : (Qt("423 response received for REGISTER without Min-Expires"), this._registrationFailure(a, ot.causes.SIP_FAILURE_CODE));
          break;
        default: {
          const l = er.sipErrorCause(a.status_code);
          this._registrationFailure(a, l);
        }
      }
    } });
    this._registering = !0, n.send();
  }
  unregister(s = {}) {
    if (!this._registered) return void Qt("already unregistered");
    this._registered = !1, this._registrationTimer !== null && (clearTimeout(this._registrationTimer), this._registrationTimer = null);
    const i = this._extraHeaders.slice();
    s.all ? i.push(`Contact: *${this._extraContactParams}`) : i.push(`Contact: ${this._contact};expires=0${this._extraContactParams}`), i.push("Expires: 0");
    const n = new ta.OutgoingRequest(ot.REGISTER, this._registrar, this._ua, { to_uri: this._to_uri, call_id: this._call_id, cseq: this._cseq += 1 }, i);
    new na(this._ua, n, { onRequestTimeout: () => {
      this._unregistered(null, ot.causes.REQUEST_TIMEOUT);
    }, onTransportError: () => {
      this._unregistered(null, ot.causes.CONNECTION_ERROR);
    }, onAuthenticated: () => {
      this._cseq += 1;
    }, onReceiveResponse: (a) => {
      switch (!0) {
        case /^1[0-9]{2}$/.test(a.status_code):
          break;
        case /^2[0-9]{2}$/.test(a.status_code):
          this._unregistered(a);
          break;
        default: {
          const l = er.sipErrorCause(a.status_code);
          this._unregistered(a, l);
        }
      }
    } }).send();
  }
  close() {
    this._registered && this.unregister();
  }
  onTransportClosed() {
    this._registering = !1, this._registrationTimer !== null && (clearTimeout(this._registrationTimer), this._registrationTimer = null), this._registered && (this._registered = !1, this._ua.unregistered({}));
  }
  _registrationFailure(s, i) {
    this._registering = !1, this._ua.registrationFailed({ response: s || null, cause: i }), this._registered && (this._registered = !1, this._ua.unregistered({ response: s || null, cause: i }));
  }
  _unregistered(s, i) {
    this._registering = !1, this._registered = !1, this._ua.unregistered({ response: s || null, cause: i || null });
  }
}, Ta = ru(), va = class extends Dd {
  constructor(s) {
    super(), this._ua = s, this._request = null, this._closed = !1, this._direction = null, this._local_identity = null, this._remote_identity = null, this._is_replied = !1, this._data = {};
  }
  get direction() {
    return this._direction;
  }
  get local_identity() {
    return this._local_identity;
  }
  get remote_identity() {
    return this._remote_identity;
  }
  send(s, i, n = {}) {
    const a = s;
    if (s === void 0 || i === void 0) throw new TypeError("Not enough arguments");
    if (!(s = this._ua.normalizeTarget(s))) throw new TypeError(`Invalid target: ${a}`);
    const l = en.cloneArray(n.extraHeaders), e = en.cloneObject(n.eventHandlers), h = n.contentType || "text/plain";
    for (const u in e) Object.prototype.hasOwnProperty.call(e, u) && this.on(u, e[u]);
    l.push(`Content-Type: ${h}`), this._request = new Ld.OutgoingRequest(rr.MESSAGE, s, this._ua, null, l), i && (this._request.body = i);
    const f = new Pd(this._ua, this._request, { onRequestTimeout: () => {
      this._onRequestTimeout();
    }, onTransportError: () => {
      this._onTransportError();
    }, onReceiveResponse: (u) => {
      this._receiveResponse(u);
    } });
    this._newMessage("local", this._request), f.send();
  }
  init_incoming(s) {
    this._request = s, this._newMessage("remote", s), this._is_replied || (this._is_replied = !0, s.reply(200)), this._close();
  }
  accept(s = {}) {
    const i = en.cloneArray(s.extraHeaders), n = s.body;
    if (this._direction !== "incoming") throw new ca.NotSupportedError('"accept" not supported for outgoing Message');
    if (this._is_replied) throw new Error("incoming Message already replied");
    this._is_replied = !0, this._request.reply(200, null, i, n);
  }
  reject(s = {}) {
    const i = s.status_code || 480, n = s.reason_phrase, a = en.cloneArray(s.extraHeaders), l = s.body;
    if (this._direction !== "incoming") throw new ca.NotSupportedError('"reject" not supported for outgoing Message');
    if (this._is_replied) throw new Error("incoming Message already replied");
    if (i < 300 || i >= 700) throw new TypeError(`Invalid status_code: ${i}`);
    this._is_replied = !0, this._request.reply(i, n, a, l);
  }
  _receiveResponse(s) {
    if (!this._closed) switch (!0) {
      case /^1[0-9]{2}$/.test(s.status_code):
        break;
      case /^2[0-9]{2}$/.test(s.status_code):
        this._succeeded("remote", s);
        break;
      default: {
        const i = en.sipErrorCause(s.status_code);
        this._failed("remote", s, i);
        break;
      }
    }
  }
  _onRequestTimeout() {
    this._closed || this._failed("system", null, rr.causes.REQUEST_TIMEOUT);
  }
  _onTransportError() {
    this._closed || this._failed("system", null, rr.causes.CONNECTION_ERROR);
  }
  _close() {
    this._closed = !0, this._ua.destroyMessage(this);
  }
  _newMessage(s, i) {
    s === "remote" ? (this._direction = "incoming", this._local_identity = i.to, this._remote_identity = i.from) : s === "local" && (this._direction = "outgoing", this._local_identity = i.from, this._remote_identity = i.to), this._ua.newMessage(this, { originator: s, message: this, request: i });
  }
  _failed(s, i, n) {
    jn("MESSAGE failed"), this._close(), jn('emit "failed"'), this.emit("failed", { originator: s, response: i || null, cause: n });
  }
  _succeeded(s, i) {
    jn("MESSAGE succeeded"), this._close(), jn('emit "succeeded"'), this.emit("succeeded", { originator: s, response: i });
  }
}, cr = gn, Wd = class {
  constructor(s, i = kd) {
    if (Pe("new()"), this.status = or, this.socket = null, this.sockets = [], this.recovery_options = i, this.recover_attempts = 0, this.recovery_timer = null, this.close_requested = !1, s === void 0) throw new TypeError("Invalid argument. undefined 'sockets' argument");
    s instanceof Array || (s = [s]), s.forEach(function(n) {
      if (!Ud.isSocket(n.socket)) throw new TypeError("Invalid argument. invalid 'JsSIP.Socket' instance");
      if (n.weight && !Number(n.weight)) throw new TypeError("Invalid argument. 'weight' attribute is not a number");
      this.sockets.push({ socket: n.socket, weight: n.weight || 0, status: _a });
    }, this), this._getSocket();
  }
  get via_transport() {
    return this.socket.via_transport;
  }
  get url() {
    return this.socket.url;
  }
  get sip_uri() {
    return this.socket.sip_uri;
  }
  connect() {
    Pe("connect()"), this.isConnected() ? Pe("Transport is already connected") : this.isConnecting() ? Pe("Transport is connecting") : (this.close_requested = !1, this.status = fa, this.onconnecting({ socket: this.socket, attempts: this.recover_attempts }), this.close_requested || (this.socket.onconnect = this._onConnect.bind(this), this.socket.ondisconnect = this._onDisconnect.bind(this), this.socket.ondata = this._onData.bind(this), this.socket.connect()));
  }
  disconnect() {
    Pe("close()"), this.close_requested = !0, this.recover_attempts = 0, this.status = or, this.recovery_timer !== null && (clearTimeout(this.recovery_timer), this.recovery_timer = null), this.socket.onconnect = () => {
    }, this.socket.ondisconnect = () => {
    }, this.socket.ondata = () => {
    }, this.socket.disconnect(), this.ondisconnect({ socket: this.socket, error: !1 });
  }
  send(s) {
    if (Pe("send()"), !this.isConnected()) return iu("unable to send message, transport is not connected"), !1;
    const i = s.toString();
    return Pe(`sending message:

${i}
`), this.socket.send(i);
  }
  isConnected() {
    return this.status === da;
  }
  isConnecting() {
    return this.status === fa;
  }
  _reconnect() {
    this.recover_attempts += 1;
    let s = Math.floor(Math.random() * Math.pow(2, this.recover_attempts) + 1);
    s < this.recovery_options.min_interval ? s = this.recovery_options.min_interval : s > this.recovery_options.max_interval && (s = this.recovery_options.max_interval), Pe(`reconnection attempt: ${this.recover_attempts}. next connection attempt in ${s} seconds`), this.recovery_timer = setTimeout(() => {
      this.close_requested || this.isConnected() || this.isConnecting() || (this._getSocket(), this.connect());
    }, 1e3 * s);
  }
  _getSocket() {
    let s = [];
    if (this.sockets.forEach((n) => {
      n.status !== pa && (s.length === 0 ? s.push(n) : n.weight > s[0].weight ? s = [n] : n.weight === s[0].weight && s.push(n));
    }), s.length === 0) return this.sockets.forEach((n) => {
      n.status = _a;
    }), void this._getSocket();
    const i = Math.floor(Math.random() * s.length);
    this.socket = s[i].socket;
  }
  _onConnect() {
    this.recover_attempts = 0, this.status = da, this.recovery_timer !== null && (clearTimeout(this.recovery_timer), this.recovery_timer = null), this.onconnect({ socket: this });
  }
  _onDisconnect(s, i, n) {
    this.status = or, this.ondisconnect({ socket: this.socket, error: s, code: i, reason: n }), this.close_requested || (this.sockets.forEach(function(a) {
      this.socket === a.socket && (a.status = pa);
    }, this), this._reconnect(s));
  }
  _onData(s) {
    if (s !== `\r
`) {
      if (typeof s != "string") {
        try {
          s = String.fromCharCode.apply(null, new Uint8Array(s));
        } catch {
          return void Pe("received binary message failed to be converted into string, message discarded");
        }
        Pe(`received binary message:

${s}
`);
      } else Pe(`received text message:

${s}
`);
      this.ondata({ transport: this, message: s });
    } else Pe("received message with CRLF Keep Alive response");
  }
}, Wn = Ne(), Gd = vt, Vd = Et(), Kd = ou, hr = nt, zd = (s, i, n) => {
  ue = s, Fe = i, au = n;
  for (const a of Fd) if (a() === !1) return !1;
  if (ue instanceof ma.IncomingRequest) {
    for (const a of qd) if (a() === !1) return !1;
  } else if (ue instanceof ma.IncomingResponse) {
    for (const a of Hd) if (a() === !1) return !1;
  }
  return !0;
}, dr = ci, ve = te("JsSIP:UA"), on = te("JsSIP:ERROR:UA");
on.log = console.warn.bind(console);
const ye = { STATUS_INIT: 0, STATUS_READY: 1, STATUS_USER_CLOSED: 2, STATUS_NOT_READY: 3, CONFIGURATION_ERROR: 1, NETWORK_ERROR: 2 };
function Jd(s) {
  this.emit("connecting", s);
}
function Xd(s) {
  this._status !== ye.STATUS_USER_CLOSED && (this._status = ye.STATUS_READY, this._error = null, this.emit("connected", s), this._dynConfiguration.register && this._registrator.register());
}
function Yd(s) {
  const i = ["nict", "ict", "nist", "ist"];
  for (const n of i) for (const a in this._transactions[n]) Object.prototype.hasOwnProperty.call(this._transactions[n], a) && this._transactions[n][a].onTransportError();
  this.emit("disconnected", s), this._registrator.onTransportClosed(), this._status !== ye.STATUS_USER_CLOSED && (this._status = ye.STATUS_NOT_READY, this._error = ye.NETWORK_ERROR);
}
function Qd(s) {
  const i = s.transport;
  let n = s.message;
  if (n = Kd.parseMessage(n, this), n && !(this._status === ye.STATUS_USER_CLOSED && n instanceof hr.IncomingRequest) && zd(n, this, i)) {
    if (n instanceof hr.IncomingRequest) n.transport = i, this.receiveRequest(n);
    else if (n instanceof hr.IncomingResponse) {
      let a;
      switch (n.method) {
        case Re.INVITE:
          a = this._transactions.ict[n.via_branch], a && a.receiveResponse(n);
          break;
        case Re.ACK:
          break;
        default:
          a = this._transactions.nict[n.via_branch], a && a.receiveResponse(n);
      }
    }
  }
}
const Zd = je(), Ue = te("JsSIP:WebSocketInterface"), ln = te("JsSIP:ERROR:WebSocketInterface");
ln.log = console.warn.bind(console);
const br = Cr, ef = Ae, tf = vt, nf = Ne(), sf = class extends jd {
  static get C() {
    return ye;
  }
  constructor(s) {
    if (ve("new() [configuration:%o]", s), super(), this._cache = { credentials: {} }, this._configuration = Object.assign({}, dr.settings), this._dynConfiguration = {}, this._dialogs = {}, this._applicants = {}, this._sessions = {}, this._transport = null, this._contact = null, this._status = ye.STATUS_INIT, this._error = null, this._transactions = { nist: {}, nict: {}, ist: {}, ict: {} }, this._data = {}, this._closeTimer = null, s === void 0) throw new TypeError("Not enough arguments");
    try {
      this._loadConfig(s);
    } catch (i) {
      throw this._status = ye.STATUS_NOT_READY, this._error = ye.CONFIGURATION_ERROR, i;
    }
    this._registrator = new Bd(this);
  }
  get C() {
    return ye;
  }
  get status() {
    return this._status;
  }
  get contact() {
    return this._contact;
  }
  get configuration() {
    return this._configuration;
  }
  get transport() {
    return this._transport;
  }
  start() {
    ve("start()"), this._status === ye.STATUS_INIT ? this._transport.connect() : this._status === ye.STATUS_USER_CLOSED ? (ve("restarting UA"), this._closeTimer !== null && (clearTimeout(this._closeTimer), this._closeTimer = null, this._transport.disconnect()), this._status = ye.STATUS_INIT, this._transport.connect()) : this._status === ye.STATUS_READY ? ve("UA is in READY status, not restarted") : ve("ERROR: connection is down, Auto-Recovery system is trying to reconnect"), this._dynConfiguration.register = this._configuration.register;
  }
  register() {
    ve("register()"), this._dynConfiguration.register = !0, this._registrator.register();
  }
  unregister(s) {
    ve("unregister()"), this._dynConfiguration.register = !1, this._registrator.unregister(s);
  }
  registrator() {
    return this._registrator;
  }
  isRegistered() {
    return this._registrator.registered;
  }
  isConnected() {
    return this._transport.isConnected();
  }
  call(s, i) {
    ve("call()");
    const n = new Ta(this);
    return n.connect(s, i), n;
  }
  sendMessage(s, i, n) {
    ve("sendMessage()");
    const a = new va(this);
    return a.send(s, i, n), a;
  }
  terminateSessions(s) {
    ve("terminateSessions()");
    for (const i in this._sessions) this._sessions[i].isEnded() || this._sessions[i].terminate(s);
  }
  stop() {
    if (ve("stop()"), this._dynConfiguration = {}, this._status === ye.STATUS_USER_CLOSED) return void ve("UA already closed");
    this._registrator.close();
    const s = Object.keys(this._sessions).length;
    for (const i in this._sessions) if (Object.prototype.hasOwnProperty.call(this._sessions, i)) {
      ve(`closing session ${i}`);
      try {
        this._sessions[i].terminate();
      } catch {
      }
    }
    for (const i in this._applicants) if (Object.prototype.hasOwnProperty.call(this._applicants, i)) try {
      this._applicants[i].close();
    } catch {
    }
    this._status = ye.STATUS_USER_CLOSED, Object.keys(this._transactions.nict).length + Object.keys(this._transactions.nist).length + Object.keys(this._transactions.ict).length + Object.keys(this._transactions.ist).length === 0 && s === 0 ? this._transport.disconnect() : this._closeTimer = setTimeout(() => {
      this._closeTimer = null, this._transport.disconnect();
    }, 2e3);
  }
  normalizeTarget(s) {
    return Wn.normalizeTarget(s, this._configuration.hostport_params);
  }
  get(s) {
    switch (s) {
      case "authorization_user":
        return this._configuration.authorization_user;
      case "realm":
        return this._configuration.realm;
      case "ha1":
        return this._configuration.ha1;
      default:
        return void on('get() | cannot get "%s" parameter in runtime', s);
    }
  }
  set(s, i) {
    switch (s) {
      case "authorization_user":
        this._configuration.authorization_user = String(i);
        break;
      case "password":
        this._configuration.password = String(i);
        break;
      case "realm":
        this._configuration.realm = String(i);
        break;
      case "ha1":
        this._configuration.ha1 = String(i), this._configuration.password = null;
        break;
      case "display_name":
        this._configuration.display_name = i;
        break;
      default:
        return on('set() | cannot set "%s" parameter in runtime', s), !1;
    }
    return !0;
  }
  newTransaction(s) {
    this._transactions[s.type][s.id] = s, this.emit("newTransaction", { transaction: s });
  }
  destroyTransaction(s) {
    delete this._transactions[s.type][s.id], this.emit("transactionDestroyed", { transaction: s });
  }
  newDialog(s) {
    this._dialogs[s.id] = s;
  }
  destroyDialog(s) {
    delete this._dialogs[s.id];
  }
  newMessage(s, i) {
    this._applicants[s] = s, this.emit("newMessage", i);
  }
  destroyMessage(s) {
    delete this._applicants[s];
  }
  newRTCSession(s, i) {
    this._sessions[s.id] = s, this.emit("newRTCSession", i);
  }
  destroyRTCSession(s) {
    delete this._sessions[s.id];
  }
  registered(s) {
    this.emit("registered", s);
  }
  unregistered(s) {
    this.emit("unregistered", s);
  }
  registrationFailed(s) {
    this.emit("registrationFailed", s);
  }
  receiveRequest(s) {
    const i = s.method;
    if (s.ruri.user !== this._configuration.uri.user && s.ruri.user !== this._contact.uri.user) return ve("Request-URI does not point to us"), void (s.method !== Re.ACK && s.reply_sl(404));
    if (s.ruri.scheme === Re.SIPS) return void s.reply_sl(416);
    if (cr.checkTransaction(this, s)) return;
    if (i === Re.INVITE ? new cr.InviteServerTransaction(this, this._transport, s) : i !== Re.ACK && i !== Re.CANCEL && new cr.NonInviteServerTransaction(this, this._transport, s), i === Re.OPTIONS) s.reply(200);
    else if (i === Re.MESSAGE) {
      if (this.listeners("newMessage").length === 0) return void s.reply(405);
      new va(this).init_incoming(s);
    } else if (i === Re.INVITE && !s.to_tag && this.listeners("newRTCSession").length === 0) return void s.reply(405);
    let n, a;
    if (s.to_tag) n = this._findDialog(s.call_id, s.from_tag, s.to_tag), n ? n.receiveRequest(s) : i === Re.NOTIFY ? (a = this._findSession(s), a ? a.receiveRequest(s) : (ve("received NOTIFY request for a non existent subscription"), s.reply(481, "Subscription does not exist"))) : i !== Re.ACK && s.reply(481);
    else switch (i) {
      case Re.INVITE:
        if (window.RTCPeerConnection) if (s.hasHeader("replaces")) {
          const l = s.replaces;
          n = this._findDialog(l.call_id, l.from_tag, l.to_tag), n ? (a = n.owner, a.isEnded() ? s.reply(603) : a.receiveRequest(s)) : s.reply(481);
        } else a = new Ta(this), a.init_incoming(s);
        else on("INVITE received but WebRTC is not supported"), s.reply(488);
        break;
      case Re.BYE:
        s.reply(481);
        break;
      case Re.CANCEL:
        a = this._findSession(s), a ? a.receiveRequest(s) : ve("received CANCEL request for a non existent session");
        break;
      case Re.ACK:
        break;
      case Re.NOTIFY:
        this.emit("sipEvent", { event: s.event, request: s }), s.reply(200);
        break;
      default:
        s.reply(405);
    }
  }
  _findSession({ call_id: s, from_tag: i, to_tag: n }) {
    const a = s + i, l = this._sessions[a], e = s + n, h = this._sessions[e];
    return l || h || null;
  }
  _findDialog(s, i, n) {
    let a = s + i + n, l = this._dialogs[a];
    return l || (a = s + n + i, l = this._dialogs[a], l || null);
  }
  _loadConfig(s) {
    try {
      dr.load(this._configuration, s);
    } catch (a) {
      throw a;
    }
    this._configuration.display_name === 0 && (this._configuration.display_name = "0"), this._configuration.instance_id || (this._configuration.instance_id = Wn.newUUID()), this._configuration.jssip_id = Wn.createRandomToken(5);
    const i = this._configuration.uri.clone();
    i.user = null, this._configuration.hostport_params = i.toString().replace(/^sip:/i, "");
    try {
      this._transport = new Wd(this._configuration.sockets, { max_interval: this._configuration.connection_recovery_max_interval, min_interval: this._configuration.connection_recovery_min_interval }), this._transport.onconnecting = Jd.bind(this), this._transport.onconnect = Xd.bind(this), this._transport.ondisconnect = Yd.bind(this), this._transport.ondata = Qd.bind(this);
    } catch (a) {
      throw on(a), new Gd.ConfigurationError("sockets", this._configuration.sockets);
    }
    if (delete this._configuration.sockets, this._configuration.authorization_user || (this._configuration.authorization_user = this._configuration.uri.user), !this._configuration.registrar_server) {
      const a = this._configuration.uri.clone();
      a.user = null, a.clearParams(), a.clearHeaders(), this._configuration.registrar_server = a;
    }
    this._configuration.no_answer_timeout *= 1e3, this._configuration.contact_uri ? this._configuration.via_host = this._configuration.contact_uri.host : this._configuration.contact_uri = new Vd("sip", Wn.createRandomToken(8), this._configuration.via_host, null, { transport: "ws" }), this._contact = { pub_gruu: null, temp_gruu: null, uri: this._configuration.contact_uri, toString(a = {}) {
      const l = a.anonymous || null, e = a.outbound || null;
      let h = "<";
      return h += l ? this.temp_gruu || "sip:anonymous@anonymous.invalid;transport=ws" : this.pub_gruu || this.uri.toString(), e && (l ? this.temp_gruu : this.pub_gruu), h += ">", h;
    } };
    const n = ["authorization_user", "password", "realm", "ha1", "display_name", "register"];
    for (const a in this._configuration) Object.prototype.hasOwnProperty.call(this._configuration, a) && (n.indexOf(a) !== -1 ? Object.defineProperty(this._configuration, a, { writable: !0, configurable: !1 }) : Object.defineProperty(this._configuration, a, { writable: !1, configurable: !1 }));
    ve("configuration parameters after validation:");
    for (const a in this._configuration) if (Object.prototype.hasOwnProperty.call(dr.settings, a)) switch (a) {
      case "uri":
      case "registrar_server":
        ve(`- ${a}: ${this._configuration[a]}`);
        break;
      case "password":
      case "ha1":
        ve(`- ${a}: NOT SHOWN`);
        break;
      default:
        ve(`- ${a}: ${JSON.stringify(this._configuration[a])}`);
    }
  }
}, rf = Et(), of = oi(), lf = je(), af = class {
  constructor(s) {
    Ue('new() [url:"%s"]', s), this._url = s, this._sip_uri = null, this._via_transport = null, this._ws = null;
    const i = Zd.parse(s, "absoluteURI");
    if (i === -1) throw ln(`invalid WebSocket URI: ${s}`), new TypeError(`Invalid argument: ${s}`);
    if (i.scheme !== "wss" && i.scheme !== "ws") throw ln(`invalid WebSocket URI scheme: ${i.scheme}`), new TypeError(`Invalid argument: ${s}`);
    this._sip_uri = `sip:${i.host}${i.port ? `:${i.port}` : ""};transport=ws`, this._via_transport = i.scheme.toUpperCase();
  }
  get via_transport() {
    return this._via_transport;
  }
  set via_transport(s) {
    this._via_transport = s.toUpperCase();
  }
  get sip_uri() {
    return this._sip_uri;
  }
  get url() {
    return this._url;
  }
  connect() {
    if (Ue("connect()"), this.isConnected()) Ue(`WebSocket ${this._url} is already connected`);
    else if (this.isConnecting()) Ue(`WebSocket ${this._url} is connecting`);
    else {
      this._ws && this.disconnect(), Ue(`connecting to WebSocket ${this._url}`);
      try {
        this._ws = new WebSocket(this._url, "sip"), this._ws.binaryType = "arraybuffer", this._ws.onopen = this._onOpen.bind(this), this._ws.onclose = this._onClose.bind(this), this._ws.onmessage = this._onMessage.bind(this), this._ws.onerror = this._onError.bind(this);
      } catch (s) {
        this._onError(s);
      }
    }
  }
  disconnect() {
    Ue("disconnect()"), this._ws && (this._ws.onopen = () => {
    }, this._ws.onclose = () => {
    }, this._ws.onmessage = () => {
    }, this._ws.onerror = () => {
    }, this._ws.close(), this._ws = null);
  }
  send(s) {
    return Ue("send()"), this.isConnected() ? (this._ws.send(s), !0) : (ln("unable to send message, WebSocket is not open"), !1);
  }
  isConnected() {
    return this._ws && this._ws.readyState === this._ws.OPEN;
  }
  isConnecting() {
    return this._ws && this._ws.readyState === this._ws.CONNECTING;
  }
  _onOpen() {
    Ue(`WebSocket ${this._url} connected`), this.onconnect();
  }
  _onClose({ wasClean: s, code: i, reason: n }) {
    Ue(`WebSocket ${this._url} closed`), s === !1 && Ue("WebSocket abrupt disconnection");
    const a = { socket: this, error: !s, code: i, reason: n };
    this.ondisconnect(a);
  }
  _onMessage({ data: s }) {
    Ue("received WebSocket message"), this.ondata(s);
  }
  _onError(s) {
    ln(`WebSocket ${this._url} error: ${s}`);
  }
};
te("JsSIP")("version %s", br.version);
var fr = { C: ef, Exceptions: tf, Utils: nf, UA: sf, URI: rf, NameAddrHeader: of, WebSocketInterface: af, Grammar: lf, debug: te, get name() {
  return br.title;
}, get version() {
  return br.version;
} };
class uf {
  constructor(i, n = 1e3) {
    this.startTime = 0, this.lastTime = 0, this.frameId = 0, this.onTickStep = 1e3, this.counter = 0, this.start = () => {
      this.startTime = Date.now(), this.lastTime = this.startTime, this.frameId = requestAnimationFrame?.(this.tick.bind(this));
    }, this.stop = () => {
      cancelAnimationFrame?.(this.frameId);
    }, this.tick = () => {
      const a = Date.now(), l = a - this.lastTime;
      this.counter += l;
      const e = this.counter / this.onTickStep;
      let h = 0;
      this.lastTime = a, e > 1 && (h = this.counter, this.counter = this.counter % this.onTickStep), this.onTick && e > 1 && this.onTick({ second: this.lastTime - this.startTime / 1e3, elapsedTime: h, lastTime: this.lastTime, startTime: this.startTime, duration: this.lastTime - this.startTime }), this.frameId = requestAnimationFrame(this.tick.bind(this));
    }, this.onTick = i, this.onTickStep = n <= 0 ? 1e3 : n;
  }
}
const uu = ["audio", "video"], cu = (s) => id(s), wr = (s) => {
  var i;
  const n = cu(s);
  let a = "audio", l = 0, e = "inactive";
  for (const h of n.media) uu.indexOf(h.type) !== -1 && h.type !== "audio" && (a = h.type, l = h.port, e = (i = h.direction) !== null && i !== void 0 ? i : "inactive");
  return a === "video" && l && ["sendrecv", "sendonly", "recvonly"].includes(e) ? "video" : "audio";
};
var J, ct, ht, an, un, Ee, cn, tt, Ir, Xn, Yn, Or, Nr, Dr, Lr, Ve, hn, Pr, dn, xr, Ur, kr, cf = { RFC2833: "RFC2833" };
function hu(s) {
  s.forEach((i) => {
    i.status.callStatus !== "talking" || i.status.isHold || i.hold();
  });
}
function Mr(s, i) {
  return re(this, void 0, void 0, function* () {
    try {
      const { data: n } = yield Fh({ ext_num: s });
      return n.errcode === 0 ? n.photo ? K.get("pbxURL").origin + "/api/photo/" + n.photo : null : (P.error(`${i}Get avatar server error. Error code: ${n.errcode}, Error message: ${n.errmsg}`), null);
    } catch (n) {
      return P.error(`${i}Get avatar failed.`, n), null;
    }
  });
}
function du(s, i) {
  return re(this, void 0, void 0, function* () {
    try {
      const { data: n } = yield qh({ number: s });
      return n.errcode === 0 ? n.name : (P.error(`${i}Get contact name server error. Error code: ${n.errcode}, Error message: ${n.errmsg}`), null);
    } catch (n) {
      return P.error(`${i}Get contact name failed.`, n), null;
    }
  });
}
function $r(s, i) {
  let n = 0, a = 0, l = 0;
  return i.forEach((e) => {
    e.status.callStatus === "ringing" || e.status.callStatus === "calling" ? n++ : e.status.callStatus === "connecting" ? l++ : a++;
  }), (a !== 0 || n !== 0) && (n > 0 || s === "call" && l > 0);
}
function Ea(s) {
  const i = /* @__PURE__ */ new Date();
  return _t({ lksTimestamp: i.getTime().toString(), lksDate: vh(i), callId: "", extension: "", iceResult: "0", lksNetworkType: "0", lksDeviceType: "web", lksDuration: "0", lksAudioCodec: "0", lksAudioRx: "0", lksAudioRxLost: "0", lksAudioRxMaxjitter: "0", lksAudioRxAvgjitter: "0", lksAudioTx: "0", lksAudioTxLost: "0", lksAudioTxMaxjitter: "0", lksAudioTxAvgjitter: "0", lksVideoCodec: "0", lksVideoRx: "0", lksVideoRxLost: "0", lksVideoRxMaxjitter: "0", lksVideoRxAvgjitter: "0", lksVideoTx: "0", lksVideoTxLost: "0", lksVideoTxMaxjitter: "0", lksVideoTxAvgjitter: "0" }, s || {});
}
const Z = "[session] ";
class hf extends Tt.EventEmitter {
  constructor(i, n, a) {
    super(), J.set(this, void 0), ct.set(this, void 0), ht.set(this, void 0), an.set(this, new MediaStream()), un.set(this, new MediaStream()), Ee.set(this, void 0), cn.set(this, !1), this.emitEvent = (l, ...e) => (this.emit(l, ...e), !0), tt.set(this, null), Ir.set(this, () => {
      b(this, tt, "f") || (P.info(`${Z}Start update call report interval.`), ie(this, tt, setInterval(() => {
        b(this, Xn, "f").call(this);
      }, 3e3)));
    }), Xn.set(this, () => re(this, void 0, void 0, function* () {
      try {
        const l = function(e) {
          const h = {};
          return e.forEach((f) => {
            if (f.type === "inbound-rtp" && f.kind === "audio") {
              f.totalSamplesDuration && (h.lksDuration = Math.ceil(f.totalSamplesDuration) + "");
              const u = f.codecId, T = e.get(u), g = T ? T.mimeType.replace("audio/", "").toLowerCase() : "", A = f.packetsReceived, S = f.packetsLost, L = 1e3 * f.jitter;
              h.lksAudioCodec = g, h.lksAudioRx = A + "", S > 0 && (h.lksAudioRxLost = (S / (S + A)).toFixed(6) + ""), h.lksAudioRxAvgjitter = L + "";
            }
            if (f.type === "outbound-rtp" && f.kind === "audio") {
              const u = f.packetsSent;
              h.lksAudioTx = u + "";
            }
            if (f.type === "candidate-pair" && f.state === "succeeded") {
              const u = f.remoteCandidateId, T = e.get(u).candidateType, g = f.localCandidateId, A = e.get(g).networkType;
              let S = "";
              T === "host" ? S = "local" : T === "srflx" || T === "prflx" ? S = "public" : T === "relay" && (S = "turn"), h.iceResult = S, h.lksNetworkType = A;
            }
            if (f.type === "inbound-rtp" && f.kind === "video" && f.codecId) {
              const u = f.codecId, T = e.get(u), g = T ? T.mimeType.replace("video/", "").toLowerCase() : "", A = f.packetsReceived, S = f.packetsLost;
              h.lksVideoCodec = g, h.lksVideoRx = A + "", h.lksVideoRxLost = (S / (S + A)).toFixed(6) + "";
            }
            if (f.type === "outbound-rtp" && f.kind === "video") {
              const u = f.packetsSent;
              h.lksVideoTx = u + "";
            }
          }), h;
        }(yield this.RTCSession.connection.getStats());
        this.callReport = _t(this.callReport, l), this.emitEvent("callReport", { callId: b(this, J, "f").callId, callReport: this.callReport });
      } catch (l) {
        P.error(`${Z}Get WebRTC stats error. `, l);
      }
    })), Yn.set(this, (l) => {
      this.RTCSession.connection.ontrack = (e) => {
        const h = e.track.kind;
        P.info(`${Z}On remote track, track kind: ${h}`);
        const f = new MediaStream(this.remoteStream);
        h === "video" ? (e.track.enabled = !1, f.getVideoTracks().forEach((u) => {
          f.removeTrack(u);
        })) : f.getAudioTracks().forEach((u) => {
          f.removeTrack(u);
        }), e.streams.forEach((u) => {
          const T = u.getAudioTracks();
          T.length > 0 && T.forEach((A) => {
            f.addTrack(A), P.info(`${Z}${l} remote stream add audio track.`);
          });
          const g = u.getAudioTracks();
          g.length > 0 && g.forEach((A) => {
            f.addTrack(A), P.info(`${Z}${l} remote stream add video track.`);
          });
        }), this.remoteStream = f, this.emitEvent("streamAdded", { callId: b(this, J, "f").callId, communicationType: l, stream: this.remoteStream });
      };
    }), Or.set(this, () => {
      if (b(this, ht, "f").stop(), b(this, tt, "f") && clearInterval(b(this, tt, "f")), b(this, J, "f").callStatus !== "talking") return;
      const l = K.get("showCloudPlan"), e = K.get("fqdnStatus");
      var h;
      l || e !== "connected" || (h = gr(this.callReport), Oe.post("/v1.0/rascallreport/web", h)).catch((f) => {
        P.error(`${Z}call report failed.`);
      });
    }), Nr.set(this, () => {
      this.localStream.getTracks().forEach((l) => {
        l.stop(), this.localStream.removeTrack(l);
      }), this.localStream = null, this.remoteStream.getTracks().forEach((l) => {
        l.stop(), this.remoteStream.removeTrack(l);
      }), this.remoteStream = null, P.info(`${Z}remove stream.`);
    }), Dr.set(this, () => {
      var l, e;
      this.RTCSession.hasOwnProperty("_connection") && ((e = (l = this.RTCSession._connection) === null || l === void 0 ? void 0 : l.close) === null || e === void 0 || e.call(l), this.RTCSession._connection = null), P.info(`${Z}close rtc peer connection.`);
    }), Lr.set(this, () => {
      let l = "";
      for (const [e, h] of b(this, Ee, "f").sessions) if (l = e, h.status.isTransfer) break;
      b(this, Ee, "f").setCurrentSession(l);
    }), Ve.set(this, (l, e, h) => {
      P.info(`${Z}end Session. Type: ${l}, Cause: ${e}`), this.stopTimer(), b(this, Or, "f").call(this), b(this, Nr, "f").call(this), b(this, Dr, "f").call(this), l === "ended" ? this.emitEvent("ended", { callId: b(this, J, "f").callId, cause: e }) : l === "failed" ? this.emitEvent("failed", { callId: b(this, J, "f").callId, cause: e, code: h }) : this.emitEvent("clientError", { callId: b(this, J, "f").callId, cause: e }), this.RTCSession = null, this.removeAllListeners(), b(this, Ee, "f").sessions.delete(b(this, J, "f").callId), b(this, Lr, "f").call(this), b(this, Ee, "f").emitEvent("deleteSession", { callId: b(this, J, "f").callId, cause: e });
    }), hn.set(this, null), Pr.set(this, (l, e, h) => {
      if (l === "local") return h;
      const f = wr(h), { isVideo: u, callStatus: T } = b(this, J, "f");
      if (e === "offer") {
        if (f !== "video" || u) return h;
        if (T !== "talking") {
          P.info(`${Z}Video call, audio answer. Change the sdp to audio`);
          const g = "m=video", A = g.length, S = h.indexOf(g), L = h.substring(S + A).replace(/a=sendrecv|a=sendonly|a=recvonly/g, "a=inactive");
          return h = h.substring(0, S) + g + L;
        }
      } else e === "answer" && u && f === "audio" && (this.status = { isVideo: !1 });
      return h;
    }), dn.set(this, (l, e, h) => re(this, void 0, void 0, function* () {
      const f = {};
      if (l) {
        P.info(`${Z}Has Remote-Party-ID.`);
        const { remoteName: u, remoteNumber: T } = function(g, A, S) {
          let L, w;
          if (g.indexOf('" <sip:') > -1) {
            const y = g.split('" <sip:');
            L = y[0].slice(1);
            const U = y[1].indexOf("@");
            w = y[1].substring(0, U);
          } else if (g.indexOf("@") > -1) {
            const y = g.indexOf("@");
            w = g.substring(5, y);
          }
          return L = L || w, { remoteName: L || S || A, remoteNumber: w || A };
        }(l, this.status.number, this.status.name);
        if (b(this, cn, "f") || (f.name = u), f.number = T, !b(this, cn, "f") && T !== b(this, J, "f").number) {
          const g = yield Mr(T, Z);
          if (P.info(`${Z}Change number and get avatar.`), g && (f.avatar = g), h) {
            const A = yield du(T, Z);
            P.info(`${Z}Change number and get contact name.`), A && (f.name = A);
          }
        }
      }
      this.status = Object.assign(Object.assign({}, f), { callStatus: e });
    })), xr.set(this, (l) => re(this, void 0, void 0, function* () {
      const { request: e } = l;
      ((T) => {
        const g = cu(T);
        for (const A of g.media) if (uu.indexOf(A.type) !== -1 && A.type !== "video") return !A.direction || A.direction === "recvonly";
        return !1;
      })(e.body) && (this.status.isHold = !0);
      const h = e.from.display_name, f = e.getHeader("Remote-Party-Id");
      b(this, dn, "f").call(this, f, "talking", !h || void 0), K.get("videoPlan");
      const u = wr(e.body) === "video";
      b(this, J, "f").isVideo !== u && (u ? (yield new Promise((T, g) => {
        setTimeout(() => {
          T();
        }, 2500);
      }), this.renegotiate(!1), this.status = { isVideo: !1 }) : this.status = { isVideo: !1 }), P.info(`${Z}reinvite.`), this.emitEvent("reinvite", { callId: b(this, J, "f").callId, session: this, isInviteVideo: u });
    })), Ur.set(this, () => (b(this, J, "f").communicationType === "outbound" && b(this, Yn, "f").call(this, b(this, J, "f").communicationType), this.RTCSession.on("accepted", (l) => re(this, void 0, void 0, function* () {
      const e = b(this, J, "f").callId;
      if (P.info(`${Z}Call accepted.Call ID: ${e}`), l.originator === "remote") {
        P.info(`${Z}Originator is remote.`);
        const h = l.response.getHeader("Remote-Party-ID");
        b(this, dn, "f").call(this, h, "talking");
      }
      this.emitEvent("accepted", { callId: e, session: this }), this.callReport = Ea({ extension: b(this, J, "f").number, callId: b(this, J, "f").callId }), b(this, Xn, "f").call(this), b(this, Ir, "f").call(this);
    })), this.RTCSession.on("confirmed", (l) => {
      const e = this.RTCSession.connection.getSenders(), h = new MediaStream();
      e.forEach((f) => {
        var u;
        ((u = f.track) === null || u === void 0 ? void 0 : u.kind) === "video" && (h.addTrack(f.track), this.localStream = h);
      }), this.status = { callStatus: "talking" }, b(this, Ee, "f").setCurrentSession(b(this, J, "f").callId), this.emitEvent("confirmed", { callId: b(this, J, "f").callId, session: this });
    }), this.RTCSession.on("icecandidate", (l) => {
      b(this, hn, "f") && clearTimeout(b(this, hn, "f")), ie(this, hn, setTimeout(() => {
        l.ready(), P.info(`${Z}stop icecandidate gathered.`);
      }, 2e3));
    }), this.RTCSession.on("sdp", (l) => {
      const { originator: e, type: h, sdp: f } = l;
      P.info(`${Z}Got sdp.`, e, h);
      const u = b(this, Pr, "f").call(this, e, h, f);
      l.sdp = u, this.emitEvent("sdp", { callId: b(this, J, "f").callId, originator: e, type: h, sdp: u });
    }), this.RTCSession.on("peerconnection", () => {
      b(this, J, "f").communicationType !== "outbound" && (b(this, Yn, "f").call(this, b(this, J, "f").communicationType), this.status.isRing = !1, b(this, Ee, "f").emitEvent("startSession", { callId: b(this, J, "f").callId, session: this }));
    }), this.RTCSession.on("progress", (l) => re(this, void 0, void 0, function* () {
      if (l.originator === "local") return;
      const { response: e } = l, h = e.status_code, f = e.getHeader("Remote-Party-ID");
      h !== 180 && h !== 183 || b(this, dn, "f").call(this, f, "ringing"), P.info(`${Z}Progress originator: ${l.originator}`), this.emitEvent("progress", { callId: b(this, J, "f").callId, statusCode: e.status_code });
    })), this.RTCSession.on("ended", (l) => {
      var e;
      e = this.status.callId, b(this, Ee, "f").sessions.forEach((h) => {
        const f = h.status.transferParent;
        f && f.callId === e && h.terminate();
      }), b(this, Ve, "f").call(this, "ended", l.cause);
    }), this.RTCSession.on("failed", (l) => {
      var e;
      const h = (e = l.message) === null || e === void 0 ? void 0 : e.status_code;
      b(this, Ve, "f").call(this, "failed", l.cause, h);
    }), this.RTCSession.on("getusermediafailed", () => {
      this.RTCSession.isEnded() && b(this, Ve, "f").call(this, "clientError", "getusermediafailed");
    }), this.RTCSession.on("peerconnection:createanswerfailed", () => {
      this.RTCSession.isEnded() && b(this, Ve, "f").call(this, "clientError", "peerconnection:createanswerfailed");
    }), this.RTCSession.on("peerconnection:createofferfailed", () => {
      this.RTCSession.isEnded() && b(this, Ve, "f").call(this, "clientError", "peerconnection:createofferfailed");
    }), this.RTCSession.on("peerconnection:setlocaldescriptionfailed", () => {
      this.RTCSession.isEnded() && b(this, Ve, "f").call(this, "clientError", "peerconnection:setlocaldescriptionfailed");
    }), this.RTCSession.on("peerconnection:setremotedescriptionfailed", () => {
      this.RTCSession.isEnded() && b(this, Ve, "f").call(this, "clientError", "peerconnection:setremotedescriptionfailed");
    }), this.RTCSession.on("reinvite", b(this, xr, "f")), this.RTCSession.on("hold", () => {
      this.status = { isHold: !0 };
    }), this.RTCSession.on("unhold", () => {
      this.status = { isHold: !1 }, b(this, Ee, "f").sessions.forEach((l) => {
        l.status.callId !== this.status.callId && l.status.isHold !== !0 && l.hold();
      });
    }), this.RTCSession.on("muted", () => {
      this.status = { isMute: !0 };
    }), this.RTCSession.on("unmuted", () => {
      this.status = { isMute: !1 };
    }), this)), this.stopTimer = () => (b(this, ht, "f").stop(), this), this.on = (l, e) => this.addListener(l, e), this.reject = () => {
      this.terminate("reject");
    }, kr.set(this, (l) => re(this, void 0, void 0, function* () {
      var e, h, f, u;
      const { fqdnDomain: T, cloudDomain: g, showCloudPlan: A, enableNatFqdn: S, turnPort: L } = K.get(), w = (h = (e = this.RTCSession) === null || e === void 0 ? void 0 : e._sessionTimers) === null || h === void 0 ? void 0 : h.enabled, y = ((f = b(this, Ee, "f").deviceIds) === null || f === void 0 ? void 0 : f.microphoneId) || void 0, U = ((u = b(this, Ee, "f").deviceIds) === null || u === void 0 ? void 0 : u.cameraId) || void 0, O = yield Ua(!!l?.video, y, U);
      if (O === null) return Promise.reject(ge.error("GET_LOCAL_MEDIA_INFO_ERROR"));
      if (O.isNoneAudio) return Promise.reject(ge.error("NOT_FOUND_AUDIO_INPUT_DEVICE"));
      const { mediaConstraints: z, isNoneCamera: k } = O, _ = l?.video ? "video" : "audio";
      if (_ === "video" && k) return Promise.reject(ge.error("NOT_FOUND_VIDEO_INPUT_DEVICE"));
      if ((yield ka(_)) === !1) return Promise.reject(ge.error("GET_AGREE_CHROME_USER_MEDIA_ROLE_ERROR"));
      const m = { mediaConstraints: z, rtcOfferConstraints: { offerToReceiveAudio: !0, offerToReceiveVideo: l?.offerToReceiveVideo || !1 }, sessionTimersExpires: 1800 };
      return w && (m.sessionTimersExpires = 1800, m.extraHeaders = ["Require: timer"]), A ? m.pcConfig = { iceServers: [{ urls: [`stun:${g}:${L}`] }] } : S === 1 && T && (m.pcConfig = { iceServers: [{ urls: [`stun:${T}:${L}`] }] }), P.info(Z + "Answer option is:", m), m;
    })), this.answer = (l) => re(this, void 0, void 0, function* () {
      if ($r("answer", b(this, Ee, "f").sessions)) return P.info(Z + "This operator has refused because the current call has not been connected."), Promise.reject(ge.error("CURRENT_CALL_HAS_NOT_CONNECTED"));
      try {
        const e = yield b(this, kr, "f").call(this, l);
        hu(b(this, Ee, "f").sessions);
        let h = !1;
        return l?.video && (h = !0), this.status = { isVideo: h }, this.RTCSession.answer(e), ge.success("SUCCESS");
      } catch (e) {
        return Promise.reject(e);
      }
    }), this.hangup = () => {
      this.terminate("hangup");
    }, this.blindTransfer = (l) => {
      b(this, Ee, "f").blindTransfer(this.status.callId, l);
    }, this.attendedTransfer = (l) => {
      b(this, Ee, "f").attendedTransfer(this.status.callId, l);
    }, this.hold = () => (this.RTCSession.hold(), P.info(`${Z}Hold the call, Call ID: ${b(this, J, "f").callId}`), !0), this.unhold = () => (this.RTCSession._rtcOfferConstraints = { offerToReceiveAudio: !0, offerToReceiveVideo: n.isVideo }, this.RTCSession.unhold(), P.info(`${Z}Unhold the call, Call ID: ${b(this, J, "f").callId}`), !0), this.dtmf = (l) => {
      const e = { interToneGap: 100, transportType: cf.RFC2833 };
      this.RTCSession.sendDTMF(l, e), P.info(`${Z}Send DTMF to call ID: ${b(this, J, "f").callId}, DTMF Number: ${l}`);
    }, this.mute = () => {
      this.RTCSession.mute({ audio: !0 }), P.info(`${Z}Mute call. Call ID: ${b(this, J, "f").callId}`);
    }, this.unmute = () => {
      this.RTCSession.unmute({ audio: !0 }), P.info(`${Z}Unmute call. Call ID: ${b(this, J, "f").callId}`);
    }, this.startRecord = () => {
      if (b(this, Ee, "f").recordPermissions === 0) return void P.info(`${Z}Not permission.`);
      b(this, J, "f").isConference && (this.status.recordStatus = "recording");
      const l = K.get("recordCode");
      this.dtmf(l);
    }, this.pauseRecord = () => {
      if (b(this, Ee, "f").recordPermissions === 0) return void P.info(`${Z}Not permission.`);
      b(this, J, "f").isConference && (this.status.recordStatus = "pause");
      const l = K.get("recordCode");
      this.dtmf(l);
    }, this.terminate = (l = "terminate") => {
      this.RTCSession.terminate({ status_code: +([0, 1, 2].includes(this.RTCSession.status) ? "487" : "486") }), P.info(`${Z}${l} call. Call ID: ${b(this, J, "f").callId}`);
    }, this.renegotiate = (l) => {
      const e = { useUpdate: !1, rtcOfferConstraints: { offerToReceiveAudio: !0, offerToReceiveVideo: l || !1 } };
      return this.RTCSession._rtcOfferConstraints = e.rtcOfferConstraints, this.RTCSession.renegotiate(e), P.info(`${Z}Renegotiate call, Call ID: ${b(this, J, "f").callId}, offerToReceiveVideo: ${l}`), !0;
    }, this.audioToVideo = (l) => {
      const { videoTrack: e } = { audioTrack: (h = l ?? new MediaStream()).getAudioTracks(), videoTrack: h.getVideoTracks() };
      var h;
      this.localStream.getVideoTracks().forEach((f) => {
        f.stop();
      }), this.RTCSession.connection.addTrack(e[0], this.localStream), P.info(`${Z}Change audio to video. Call ID: ${b(this, J, "f").callId}`);
    }, this.videoToAudio = () => {
      const { connection: l } = this.RTCSession, e = l.getSenders();
      this.localStream.getVideoTracks().forEach((h) => {
        h.stop(), this.localStream.removeTrack(h);
      }), e.forEach((h) => {
        var f;
        ((f = h.track) === null || f === void 0 ? void 0 : f.kind) === "video" && l.removeTrack(h);
      }), P.info(`${Z}Change video to audio. Call ID: ${b(this, J, "f").callId}`);
    }, this.setStatus = (l) => (ie(this, J, _t(b(this, J, "f"), l)), this), this.setStaticStatus = (l, e) => {
      ie(this, cn, !!e);
      const h = Object.assign({}, b(this, J, "f"));
      return ie(this, J, _t(b(this, J, "f"), l)), this.emitEvent("staticStatusChange", b(this, J, "f"), h), this;
    }, this.destroy = () => {
      var l, e, h;
      this.removeAllListeners(), b(this, ht, "f").stop(), b(this, tt, "f") && clearInterval(b(this, tt, "f")), (h = (e = (l = this.RTCSession) === null || l === void 0 ? void 0 : l.connection) === null || e === void 0 ? void 0 : e.close) === null || h === void 0 || h.call(e);
    }, this.RTCSession = i, ie(this, J, n), ie(this, ct, { ringDuration: 0, callingDuration: 0, callDuration: 0, holdDuration: 0 }), this.callReport = Ea({ extension: n.number, callId: n.callId }), ie(this, ht, new uf((l) => {
      let { ringDuration: e, callingDuration: h, callDuration: f, holdDuration: u } = this.timer;
      const { callStatus: T, isHold: g } = this.status, { elapsedTime: A } = l, S = Math.floor(A / 1e3);
      this.timer = { ringDuration: T === "ringing" ? e + S : e, callingDuration: T === "calling" ? h + S : h, callDuration: T === "talking" ? f + S : 0, holdDuration: T === "talking" && g ? u + S : 0 };
    })), b(this, ht, "f").start(), ie(this, Ee, a), b(this, Ur, "f").call(this), P.info(`${Z}Create session. callId:${n.callId}`);
  }
  get status() {
    return b(this, J, "f");
  }
  get incomingList() {
    return b(this, Ee, "f").incomingList;
  }
  set status(i) {
    const n = Object.assign({}, b(this, J, "f"));
    ie(this, J, _t(n, i)), this.emitEvent("statusChange", b(this, J, "f"), n);
  }
  get timer() {
    return b(this, ct, "f");
  }
  get localStream() {
    return b(this, an, "f");
  }
  set localStream(i) {
    ie(this, an, i), this.emitEvent("updateLocalStream", { callId: b(this, J, "f").callId, localStream: b(this, an, "f") });
  }
  get remoteStream() {
    return b(this, un, "f");
  }
  set remoteStream(i) {
    ie(this, un, i), this.emitEvent("updateRemoteStream", { callId: b(this, J, "f").callId, remoteStream: b(this, un, "f") });
  }
  set timer(i) {
    const n = _t(b(this, ct, "f"), i);
    ie(this, ct, n), this.emitEvent("updateTimer", { callId: b(this, J, "f").callId, timer: b(this, ct, "f") });
  }
}
var Fr, pe, ae, Ke, fn, _n, Qn, dt, fu, qr, Hr, jr, Br, Zn, pn, es;
J = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), cn = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap();
const ne = "[phone] ";
class df extends Tt.EventEmitter {
  constructor(i, n) {
    super(), Fr.add(this), pe.set(this, void 0), ae.set(this, void 0), Ke.set(this, 0), fn.set(this, !1), _n.set(this, 0), Qn.set(this, !0), dt.set(this, null), this.emitEvent = (a, ...l) => (this.emit(a, ...l), !0), this.on = (a, l) => this.addListener(a, l), qr.set(this, (a) => {
      const { host: l, number: e, registername: h, ha1: f, userAgent: u = "WebClient", realm: T = "YSAsterisk" } = a, g = new fr.WebSocketInterface(`wss://${l.host}/ws?exten=${e}`), A = "sip:" + e + "@" + l.hostname, S = { sockets: [g], uri: A, contact_uri: `${A};${u.toLowerCase()}`, authorization_user: h || e, ha1: f, realm: T, register: !0, user_agent: u, session_timers: !0, register_expires: 1800, no_answer_timeout: 300 };
      return new fr.UA(S);
    }), Hr.set(this, (a, l, e) => {
      const h = a.remote_identity.uri.user, f = { name: a.remote_identity.display_name || h, number: h, avatar: "", callId: l, communicationType: "outbound", isVideo: !1, isRing: !1, isHold: !1, isMute: !1, callStatus: "calling", callStartTime: Date.now(), recordStatus: "stop", isTransfer: !1, isConference: !1, company: "" };
      if (a.direction === "incoming") f.communicationType = "inbound", f.isRing = !0, f.callStatus = "connecting";
      else {
        const u = b(this, dt, "f");
        f.isVideo = u?.isVideo || !1;
        let T = u?.attendedInfo;
        T && (f.isTransfer = !0, f.transferParent = T), u?.avatar && (f.avatar = u.avatar), u?.name && (f.name = u.name), ie(this, dt, null);
      }
      return new hf(a, _t(f, e || {}), this);
    }), jr.set(this, () => re(this, void 0, void 0, function* () {
      if (b(this, pe, "f").status === 1) return ie(this, Ke, 0), P.info(`${ne}The UA is ready, No need to re-register.`), Promise.reject();
      if (b(this, Zn, "f").call(this)) return Promise.reject();
      try {
        const a = yield za(), { registername: l, registerpassword: e, realm: h } = a.data;
        return this.config.ha1 = e, this.config.registername = l, this.config.realm = h, this.reRegister(l, e), Promise.resolve();
      } catch (a) {
        return P.error(`${ne}Re-init failed.`, a), Promise.reject();
      }
    })), Br.set(this, (a) => a === "outgoing" && !!b(this, dt, "f") && !!b(this, dt, "f").attendedInfo), this.start = () => {
      let a;
      b(this, pe, "f").on("newRTCSession", (e) => re(this, void 0, void 0, function* () {
        const { originator: h, session: f, request: u } = e;
        P.info(ne + "newRTCSession emit.");
        const T = u.getHeader("call-id");
        if (!T) return void P.error(`${ne}can not get call id.`);
        if (this.isMaxCall && !b(this, Br, "f").call(this, f.direction)) return void f.terminate({ status_code: +([0, 1, 2].includes(f.status) ? "487" : "486") });
        const g = b(this, Hr, "f").call(this, f, T);
        if (P.info(`${ne}generate session obj. call id: ${T}`), h === "remote") {
          const A = u.getHeader("Contacts-Company"), S = wr(u.body) === "video", L = yield Mr(g.status.number, ne);
          g.setStatus({ company: A, isVideo: S, avatar: L || "" }), u.getHeader("Session-Expires") !== void 0 ? (g.RTCSession._sessionTimers.enabled = !0, g.RTCSession._sessionTimers.refresher = !0) : g.RTCSession._sessionTimers.enabled = !1;
        }
        b(this, ae, "f").set(T, g), this.emitEvent("newRTCSession", { callId: T, session: g }), h === "remote" ? this.emitEvent("incoming", { callId: T, session: g }) : (this.currentSessionID = T, this.emitEvent("startSession", { callId: T, session: g }));
      }));
      const l = (e) => {
        e.socket.send("heartbeat"), a = setTimeout(() => {
          l(e);
        }, 3e4);
      };
      return b(this, pe, "f").on("connected", (e) => {
        a && clearTimeout(a), l(e), P.info(`${ne}connected.`), this.emitEvent("connected");
      }), b(this, pe, "f").on("connecting", () => {
        P.info(`${ne}connecting.`);
      }), b(this, pe, "f").on("disconnected", () => {
        ie(this, Ke, 0), this.isRegistered = !1, P.info(`${ne}disconnected.`), this.emitEvent("disconnected");
      }), b(this, pe, "f").on("registered", () => {
        ie(this, Ke, 0), this.isRegistered = !0, P.info(`${ne}registered.`), this.emitEvent("registered");
      }), b(this, pe, "f").on("registrationFailed", (e) => {
        this.isRegistered = !1, e.cause === "Request Timeout" || e.cause === "Connection Error" || e.cause === "Rejected" ? this.reRegister(this.config.registername, this.config.ha1) : e.cause === "Authentication Error" && b(this, jr, "f").call(this), P.info(`${ne}registrationFailed, Cause: ${e.cause}`), this.emitEvent("registrationFailed", e.cause);
      }), b(this, pe, "f").on("unregistered", () => {
        this.isRegistered = !1, P.info(`${ne}unregistered.`);
      }), b(this, pe, "f").start(), this;
    }, Zn.set(this, () => !(this.reRegistryPhoneTimes !== void 0 && b(this, Ke, "f") >= this.reRegistryPhoneTimes)), this.reRegister = (a, l) => {
      var e;
      return b(this, pe, "f").status === 1 ? (ie(this, Ke, 0), P.info(`${ne}The UA is ready, No need to re-register.`), this) : b(this, Zn, "f").call(this) === !1 ? ge.error("RE_REGISTRY_MAX_LIMIT_TIMES") : (ie(this, Ke, (e = b(this, Ke, "f"), ++e)), b(this, pe, "f").set("ha1", l), b(this, pe, "f").set("authorization_user", a), b(this, pe, "f").register(), P.info(`${ne}reRegister the UA.`), this);
    }, pn.set(this, null), this.call = (a, l, e) => re(this, void 0, void 0, function* () {
      var h, f;
      if ($r("call", this.sessions)) return Promise.reject(ge.error("CURRENT_CALL_HAS_NOT_CONNECTED"));
      if (!a) return Promise.reject(ge.error("INVALID_NUMBER"));
      if (b(this, pn, "f")) return Promise.reject(ge.error("CALL_TOO_MANY_TIMES"));
      if (ie(this, pn, setTimeout(() => {
        ie(this, pn, null, "f");
      }, 1e3)), this.isMaxCall && !e) return Promise.reject(ge.error("MAX_LIMIT_CALL"));
      P.info(ne + "start call.");
      const u = l?.video ? "video" : "audio", T = ((h = this.deviceIds) === null || h === void 0 ? void 0 : h.microphoneId) || void 0, g = ((f = this.deviceIds) === null || f === void 0 ? void 0 : f.cameraId) || void 0, A = yield Ua(u === "video", T, g);
      if (A === null) return Promise.reject(ge.error("GET_LOCAL_MEDIA_INFO_ERROR"));
      if (A.isNoneAudio) return Promise.reject(ge.error("NOT_FOUND_AUDIO_INPUT_DEVICE"));
      const { mediaConstraints: S, isNoneCamera: L } = A;
      if (u === "video" && L) return Promise.reject(ge.error("NOT_FOUND_VIDEO_INPUT_DEVICE"));
      if ((yield ka(u)) === !1) return Promise.reject(ge.error("GET_AGREE_CHROME_USER_MEDIA_ROLE_ERROR"));
      P.info(ne + "Check local stream."), ie(this, Qn, L);
      const w = { mediaConstraints: S, rtcOfferConstraints: { offerToReceiveAudio: !0, offerToReceiveVideo: l?.offerToReceiveVideo || !1 }, sessionTimersExpires: 1800, extraHeaders: l?.extraHeaders }, { fqdnDomain: y, cloudDomain: U, showCloudPlan: O, enableNatFqdn: z, turnPort: k } = K.get();
      let _;
      if (O ? w.pcConfig = { iceServers: [{ urls: [`stun:${U.toLowerCase()}:${k}`] }] } : z === 1 && y && (w.pcConfig = { iceServers: [{ urls: [`stun:${y.toLowerCase()}:${k}`] }] }), e) {
        const I = b(this, ae, "f").get(e);
        if (!I) return Promise.reject(ge.error("ATTENDED_PARENT_NOT_FOUND"));
        _ = { callId: e, avatar: I.status.avatar, name: I.status.name, number: I.status.number, callDuration: I.timer.callDuration, holdDuration: I.timer.holdDuration };
      }
      var m;
      hu(this.sessions), (m = { type: "call" }, Oe.post("/v1.0/dct/init", m)).then();
      const v = yield du(a, ne), E = yield Mr(a, ne);
      ie(this, dt, { isVideo: u === "video", attendedInfo: _, name: v || void 0, avatar: E || void 0 }), P.info(ne + "send call.");
      try {
        return b(this, pe, "f").call(a, w), ge.success("SUCCESS");
      } catch {
        return ge.error("INVALID_NUMBER");
      }
    }), this.reject = (a) => {
      const l = this.terminate(a, "reject");
      return l == 0 && P.error(`${ne}reject failed. Call ID: ${a}`), l;
    }, this.answer = (a, l) => re(this, void 0, void 0, function* () {
      const e = b(this, ae, "f").get(a);
      if (!e) return Promise.reject(ge.error("NOT_FOUND_CALL_ID"));
      if ($r("answer", this.sessions)) return P.info(ne + "This operator has refused because the current call has not been connected."), Promise.reject(ge.error("CURRENT_CALL_HAS_NOT_CONNECTED"));
      P.info(ne + "Answer call. Call ID: " + a);
      try {
        yield e.answer(l);
      } catch (h) {
        return Promise.reject(h);
      }
      return ge.success("SUCCESS");
    }), this.hangup = (a) => {
      const l = this.terminate(a, "hangup");
      return l == 0 && P.error(`${ne}hangup failed. Call ID: ${a}`), l;
    }, es.set(this, (a, l, e) => {
      var h, f;
      if (!l) return P.info(`${ne}Transfer failed. type: ${e}. Cause: number params invalid or undefined.`), !1;
      const u = b(this, ae, "f").get(a);
      if (!u) return P.info(`${ne}Transfer failed. type: ${e}. Cause: not found session.`), !1;
      const { RTCSession: T } = u, g = "sip:" + l + "@" + ((h = this.config) === null || h === void 0 ? void 0 : h.host.hostname);
      if (e === "attended") {
        const A = (f = u.status.transferParent) === null || f === void 0 ? void 0 : f.callId;
        if (!A) return P.error(`${ne}Transfer failed. type: ${e}.Cause: not found parent call id.`), !1;
        const S = b(this, ae, "f").get(A);
        if (!S) return P.error(`${ne}Transfer failed. type: ${e}.Cause: not found parent session.`), !1;
        if (u.status.callStatus !== "talking") {
          const O = Object.keys(T._earlyDialogs);
          T._status = T.C.STATUS_CONFIRMED, T._dialog = T._earlyDialogs[O[0]];
        }
        const L = S.RTCSession;
        let w = L._from_tag, y = L._to_tag;
        S.status.communicationType === "inbound" && (w = L._to_tag, y = L._from_tag);
        const U = { _request: { call_id: S.status.callId }, _from_tag: w, _to_tag: y };
        T.refer(g, { replaces: U });
      } else T.refer(g), this.terminate(a);
      return !0;
    }), this.blindTransfer = (a, l) => (P.info(`${ne}Blind transfer dispatch.`), b(this, es, "f").call(this, a, l, "blind")), this.attendedTransfer = (a, l) => (P.info(`${ne}Attended transfer dispatch.`), b(this, es, "f").call(this, a, l, "attended")), this.hold = (a) => {
      const l = b(this, ae, "f").get(a);
      return !!l && (l.hold(), !0);
    }, this.unhold = (a) => {
      const l = b(this, ae, "f").get(a);
      return !!l && (l.unhold(), !0);
    }, this.dtmf = (a, l) => {
      const e = b(this, ae, "f").get(a);
      return !!e && (e.dtmf(l), !0);
    }, this.mute = (a) => {
      const l = b(this, ae, "f").get(a);
      return !!l && (l.mute(), !0);
    }, this.unmute = (a) => {
      const l = b(this, ae, "f").get(a);
      return !!l && (l.unmute(), !0);
    }, this.startRecord = (a) => {
      const l = b(this, ae, "f").get(a);
      return !(!l || this.recordPermissions === 0) && (l.startRecord(), !0);
    }, this.pauseRecord = (a) => {
      const l = b(this, ae, "f").get(a);
      return !(!l || this.recordPermissions === 0) && (l.pauseRecord(), !0);
    }, this.terminate = (a, l = "terminate") => {
      const e = b(this, ae, "f").get(a);
      return !!e && (e.terminate(l), b(this, ae, "f").delete(a), !0);
    }, this.renegotiate = (a, l) => {
      const e = b(this, ae, "f").get(a);
      return !!e && (e.renegotiate(l), !0);
    }, this.audioToVideo = (a) => !!b(this, ae, "f").get(a), this.videoToAudio = (a) => {
      const l = b(this, ae, "f").get(a);
      return !!l && (l.videoToAudio(), !0);
    }, this.disconnect = () => !!b(this, pe, "f") && (b(this, pe, "f").stop(), P.info(ne + "disconnect."), !0), this.getSession = (a) => b(this, ae, "f").get(a) || null, this.getSessions = () => Array.from(b(this, ae, "f").values()), this.setCurrentSession = (a) => !!b(this, ae, "f").get(a) && (this.currentSessionID = a, P.info(`${ne}Change current session to: ${a}`), !0), this.getCurrentSession = () => this.currentSession, this.setSessionStaticStatus = (a, l, e) => {
      const h = b(this, ae, "f").get(a);
      return !!h && (h.setStaticStatus(l, e), !0);
    }, this.destroy = () => {
      this.isRegistered = !1, b(this, ae, "f").forEach((a) => {
        a.destroy();
      }), b(this, ae, "f").clear(), b(this, pe, "f").removeAllListeners(), b(this, pe, "f").stop(), this.removeAllListeners(), P.info(`${ne}Phone has been destroy.`);
    }, this.config = i, ie(this, pe, b(this, qr, "f").call(this, i)), ie(this, ae, /* @__PURE__ */ new Map()), this.currentSessionID = null, this.reRegistryPhoneTimes = K.get("reRegistryPhoneTimes"), i.jsSIPDebug && fr.debug(i.jsSIPDebug), n?.afterInited(this);
  }
  get sessions() {
    return b(this, ae, "f");
  }
  get currentSession() {
    const i = this.currentSessionID;
    return i && this.sessions.get(i) || null;
  }
  get isRegistered() {
    return b(this, fn, "f");
  }
  get videoPlan() {
    return K.get("videoPlan");
  }
  set isRegistered(i) {
    ie(this, fn, i), this.emitEvent("isRegisteredChange", b(this, fn, "f"));
  }
  get recordPermissions() {
    return b(this, _n, "f");
  }
  set recordPermissions(i) {
    ie(this, _n, i), this.emitEvent("recordPermissionsChange", b(this, _n, "f"));
  }
  get incomingList() {
    return this.getSessions().filter((i) => i.status.isRing === !0);
  }
  get isNoneCamera() {
    return b(this, Qn, "f");
  }
  get isMaxCall() {
    return function(i, n) {
      if (!i && n.size > 0) return !0;
      let a = 0, l = 0;
      return n.forEach((e) => {
        const { status: h } = e;
        h.isRing ? a++ : h.isTransfer === !1 && l++;
      }), a + l >= 2;
    }(b(this, Fr, "a", fu), this.sessions);
  }
}
pe = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), Qn = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new WeakMap(), Hr = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), Br = /* @__PURE__ */ new WeakMap(), Zn = /* @__PURE__ */ new WeakMap(), pn = /* @__PURE__ */ new WeakMap(), es = /* @__PURE__ */ new WeakMap(), Fr = /* @__PURE__ */ new WeakSet(), fu = function() {
  return !K.get("disableCallWaiting") && K.get("callWaiting");
};
var Wr = {};
({ get exports() {
  return Wr;
}, set exports(s) {
  Wr = s;
} }).exports = function(s) {
  var i = {};
  function n(a) {
    if (i[a]) return i[a].exports;
    var l = i[a] = { i: a, l: !1, exports: {} };
    return s[a].call(l.exports, l, l.exports, n), l.l = !0, l.exports;
  }
  return n.m = s, n.c = i, n.d = function(a, l, e) {
    n.o(a, l) || Object.defineProperty(a, l, { enumerable: !0, get: e });
  }, n.r = function(a) {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 });
  }, n.t = function(a, l) {
    if (1 & l && (a = n(a)), 8 & l || 4 & l && typeof a == "object" && a && a.__esModule) return a;
    var e = /* @__PURE__ */ Object.create(null);
    if (n.r(e), Object.defineProperty(e, "default", { enumerable: !0, value: a }), 2 & l && typeof a != "string") for (var h in a) n.d(e, h, function(f) {
      return a[f];
    }.bind(null, h));
    return e;
  }, n.n = function(a) {
    var l = a && a.__esModule ? function() {
      return a.default;
    } : function() {
      return a;
    };
    return n.d(l, "a", l), l;
  }, n.o = function(a, l) {
    return Object.prototype.hasOwnProperty.call(a, l);
  }, n.p = "", n(n.s = 0);
}([function(s, i, n) {
  function a(l) {
    var e = l.url, h = l.protocols, f = h === void 0 ? "" : h, u = l.pingTimeout, T = u === void 0 ? 15e3 : u, g = l.pongTimeout, A = g === void 0 ? 1e4 : g, S = l.reconnectTimeout, L = S === void 0 ? 2e3 : S, w = l.pingMsg, y = w === void 0 ? "heartbeat" : w, U = l.repeatLimit, O = U === void 0 ? null : U;
    this.opts = { url: e, protocols: f, pingTimeout: T, pongTimeout: A, reconnectTimeout: L, pingMsg: y, repeatLimit: O }, this.ws = null, this.repeat = 0, this.onclose = function() {
    }, this.onerror = function() {
    }, this.onopen = function() {
    }, this.onmessage = function() {
    }, this.onreconnect = function() {
    }, this.createWebSocket();
  }
  Object.defineProperty(i, "__esModule", { value: !0 }), a.prototype.createWebSocket = function() {
    try {
      this.opts.protocols ? this.ws = new WebSocket(this.opts.url, this.opts.protocols) : this.ws = new WebSocket(this.opts.url), this.initEventHandle();
    } catch (l) {
      throw this.reconnect(), l;
    }
  }, a.prototype.initEventHandle = function() {
    var l = this;
    this.ws.onclose = function() {
      l.onclose(), l.reconnect();
    }, this.ws.onerror = function() {
      l.onerror(), l.reconnect();
    }, this.ws.onopen = function() {
      l.repeat = 0, l.onopen(), l.heartCheck();
    }, this.ws.onmessage = function(e) {
      l.onmessage(e), l.heartCheck();
    };
  }, a.prototype.reconnect = function() {
    var l = this;
    this.opts.repeatLimit !== null && this.opts.repeatLimit <= this.repeat || this.lockReconnect || this.forbidReconnect || (this.lockReconnect = !0, this.repeat++, this.onreconnect(), setTimeout(function() {
      l.createWebSocket(), l.lockReconnect = !1;
    }, this.opts.reconnectTimeout));
  }, a.prototype.send = function(l) {
    this.ws.send(l);
  }, a.prototype.heartCheck = function() {
    this.heartReset(), this.heartStart();
  }, a.prototype.heartStart = function() {
    var l = this;
    this.forbidReconnect || (this.pingTimeoutId = setTimeout(function() {
      l.ws.send(l.opts.pingMsg), l.pongTimeoutId = setTimeout(function() {
        l.ws.close();
      }, l.opts.pongTimeout);
    }, this.opts.pingTimeout));
  }, a.prototype.heartReset = function() {
    clearTimeout(this.pingTimeoutId), clearTimeout(this.pongTimeoutId);
  }, a.prototype.close = function() {
    this.forbidReconnect = !0, this.heartReset(), this.ws.close();
  }, typeof window < "u" && (window.WebsocketHeartbeatJs = a), i.default = a;
}]);
var ff = bu(Wr);
const Gn = "connect", _r = "close";
class _f extends Tt.EventEmitter {
  constructor(i) {
    super(), this.init = () => {
      this.connection.onopen = () => {
        P.info("[ws] connection established!"), this.connected = !0, this.isSubScribe || this.resubscribe();
        const n = (/* @__PURE__ */ new Date()).getTime();
        P.info("[ws] connection timeDiff:", n - this.wsConnectTimeDiff), this.wsConnectTimeDiff !== 0 && n - this.wsConnectTimeDiff >= 3e5 && (P.info("[ws] refresh pages"), this.emit(Gn), this.wsConnectTimeDiff = 0), this.connectedChangeCallBack && this.connectedChangeCallBack();
      }, this.connection.onmessage = (n) => {
        if (this.sendHeart || (this.sendHeart = setTimeout(() => {
          this.connected && this.connection.send("heartbeat"), clearInterval(this.sendHeart), this.sendHeart = null;
        }, 35e3)), n?.data && n?.data === "heartbeat response" && this.sendHeart && (clearInterval(this.sendHeart), this.sendHeart = null), n.data === "heartbeat response") return;
        let a = {};
        try {
          a = JSON.parse(n.data);
        } catch {
          P.error("[ws] JSON parse subscribe message error.");
        }
        if (a.hasOwnProperty("errcode") && a.errcode === -3) return void this.resubscribe();
        let l = null;
        if (a.msg) {
          try {
            l = JSON.parse(a.msg);
          } catch {
            P.error("[ws] JSON parse data error.");
          }
          l !== null && a.type !== void 0 && a.errcode !== -2 && this.emit(String(a.type), n);
        }
      }, this.connection.onreconnect = () => {
        P.info("[ws] reconnecting...");
      }, this.connection.onerror = () => {
        this.connected = !1, this.isSubScribe = !1, P.info("[ws] error"), this.connectedChangeCallBack && this.connectedChangeCallBack();
      }, this.connection.onclose = () => {
        P.info("[ws] close"), this.emit("close"), this.connected = !1, this.isSubScribe = !1, this.wsConnectTimeDiff === 0 && (this.wsConnectTimeDiff = (/* @__PURE__ */ new Date()).getTime()), this.connectedChangeCallBack && this.connectedChangeCallBack();
      };
    }, this.stop = () => {
      this.connected && (this.subscribes = [], this.isSubScribe = !1, this.subscribeKeys = {}, this.listenKeys = {}, this.connection.close());
    }, this.send = (n) => {
      this.connected && this.connection.send(n);
    }, this.onConnectListen = (n) => {
      this.addListener(Gn, n);
    }, this.onRemoveConnectListen = (n) => {
      n ? this.removeListener(Gn, n) : this.removeAllListeners(Gn);
    }, this.onCLose = (n) => {
      this.addListener(_r, n);
    }, this.onRemoveClose = (n) => {
      n ? this.removeListener(_r, n) : this.removeAllListeners(_r);
    }, this.onSubscribe = (n) => {
      var a;
      const { addList: l, removeList: e } = n;
      l?.subscribeCodes.forEach((h) => {
        const f = l.listener;
        this.subscribeKeys[h] ? this.subscribeKeys[h].acount += 1 : (this.subscribeKeys[h] = {}, this.subscribeKeys[h].acount = 1), this.addListener(String(h), f);
      }), e?.subscribeCodes.forEach((h) => {
        const f = e.listener;
        this.subscribeKeys[h] && (this.subscribeKeys[h].acount -= 1, this.subscribeKeys[h].acount <= 0 && (this.subscribeKeys[h] = null, delete this.subscribeKeys[h]), f ? this.removeListener(String(h), f) : this.removeAllListeners(String(h)));
      }), this.resubscribe((a = Object.keys(this.subscribeKeys)) === null || a === void 0 ? void 0 : a.map((h) => Number(h)));
    }, this.resubscribe = (n) => {
      var a;
      if (!this.connected) return;
      this.isSubScribe = !0;
      let l = [];
      n && n.length ? (l = [...n], this.subscribes.map((e) => {
        e.global && (l = l.concat(e.topicList));
      })) : (this.subscribes.map((e) => {
        l = l.concat(e.topicList);
      }), l = l.concat((a = Object.keys(this.subscribeKeys)) === null || a === void 0 ? void 0 : a.map((e) => Number(e)))), l = [...new Set(l)], l.length > 0 && this.connection.send(JSON.stringify({ topic_list: l }));
    }, this.onConnectedChange = (n) => {
      this.connectedChangeCallBack = n;
    };
    try {
      this.connection = new ff({ url: i, pingTimeout: 3e4, pongTimeout: 2e4, reconnectTimeout: 5e3, pingMsg: "heartbeat" }), this.init();
    } catch (n) {
      P.error("[ws] instance error.", n);
    }
    this.isSubScribe = !1, this.connected = !1, this.subscribes = [], this.connectKeys = [], this.subscribeKeys = {}, this.listenKeys = {}, this.wsConnectTimeDiff = 0, this.connectedChangeCallBack = null, this.sendHeart = null;
  }
}
var Gr, ft, Vr, Kr, zr, Jr, Xr, _u;
const me = "[PBX] ";
class pf extends Tt.EventEmitter {
  constructor(i) {
    super(), Gr.add(this), this.token = null, this.socket = null, ft.set(this, !1), Vr.set(this, () => re(this, void 0, void 0, function* () {
      try {
        const a = K.get("userAgent"), { data: l } = yield (n = { username: this.username, password: this.secret, login_source: a === "WebPC" ? "webpc" : null, login_jump: "sdk" }, Oe.post("/v1.0/login", n)), { access_token: e, errcode: h, errmsg: f } = l;
        return h !== 0 ? (this.token = null, P.error(`${me}Login failed. Error code: ${h}, Error Message: ${f}`), h === 70136 ? Promise.reject(Ie.error("SDK_PLAN_DISABLED")) : Promise.reject(Ie.error("PBX_API_ERROR"))) : (this.token = e, K.set("token", e), Oe.token = e, P.info(`${me}Login.`), { token: e });
      } catch (a) {
        return this.token = null, P.error(`${me}Login error.`, a), Promise.reject(Ie.error("PBX_NETWORK_ERROR"));
      }
      var n;
    })), Kr.set(this, () => re(this, void 0, void 0, function* () {
      try {
        const { data: n } = yield Oe.get("/v1.0/extension/getpersonalglobal"), { errmsg: a, errcode: l, enable_nat_fqdn: e = 0, fqdn_domain: h = "", cloud_domain: f = "", turn_port: u = 11009, record_feature_code: T = "", enb_internal_client: g = 0 } = n;
        if (l !== 0) return P.error(`${me}Get personal global data failed. Error code: ${l}, Error Message: ${a}`), Promise.reject(Ie.error("PBX_API_ERROR"));
        if (K.get("planMode") === "cn" && g !== 1) return yield this.logout().catch((A) => {
          P.error(`${me}Linkus disabled and logout failed.`);
        }), P.error(`${me}Linkus disabled.`), Promise.reject(Ie.error("LINKUS_DISABLED"));
        K.set("cloudDomain", f), K.set("enableNatFqdn", e), K.set("fqdnDomain", h), K.set("turnPort", u), K.set("recordCode", T);
      } catch (n) {
        return P.error(`${me}Get personal global error.`, n), Promise.reject(Ie.error("PBX_NETWORK_ERROR"));
      }
    })), zr.set(this, () => re(this, void 0, void 0, function* () {
      try {
        const { data: n } = yield Oe.get("/v1.0/licenseservice/get"), { errmsg: a, errcode: l } = n;
        if (l !== 0) return P.error(`${me}Get license service failed. Error code: ${l}, Error Message: ${a}`), Promise.reject(Ie.error("PBX_API_ERROR"));
        const { fqdnStatus: e, videoStatus: h } = Ma(n);
        K.set("fqdnStatus", e), K.set("videoPlan", h);
      } catch (n) {
        return P.error(`${me}Get license service error.`, n), Promise.reject(Ie.error("PBX_NETWORK_ERROR"));
      }
    })), Jr.set(this, () => re(this, void 0, void 0, function* () {
      try {
        const { data: n } = yield Oe.get("v1.0/extension/getpersonal"), { errcode: a, errmsg: l } = n;
        if (a !== 0) return P.error(`${me}Get extension data failed. Error code: ${a}, Error Message: ${l}`), Promise.reject(Ie.error("PBX_API_ERROR"));
        if (!n.extension) return Promise.reject(Ie.error("GET_PERSONAL_NOT_FOUND_DATA"));
        const { id: e, number: h, caller_id_name: f, enb_web_client_call_waiting: u, enb_ctl_record: T, enb_web_client: g, enb_desktop_client: A } = n.extension, S = K.get("planMode"), L = K.get("userAgent");
        if (S === "en" && (L === "WebClient" ? g : A) !== 1) return yield this.logout().catch((y) => {
          P.error(`${me}Linkus disabled and logout failed.`);
        }), P.error(`${me}Linkus disabled.`), Promise.reject(Ie.error("LINKUS_DISABLED"));
        this.extensionId = e, this.extensionName = f, this.extensionNumber = h, K.set("extensionId", e), K.set("extensionNumber", h);
        const w = u !== 0;
        return K.set("callWaiting", w), { extensionNumber: h, extensionId: e, extensionName: f, recordPermissions: T };
      } catch (n) {
        return P.error(`${me}Get extension info error.`, n), Promise.reject(Ie.error("PBX_NETWORK_ERROR"));
      }
    })), Xr.set(this, () => re(this, void 0, void 0, function* () {
      try {
        const { data: n } = yield za(), { realm: a, registername: l, registerpassword: e, errcode: h, errmsg: f } = n;
        return h !== 0 ? (P.error(`${me}Get register info failed. Error code: ${h}, Error Message: ${f}`), Promise.reject(Ie.error("PBX_API_ERROR"))) : (P.info(`${me}Get registry info.`), { realm: a, registername: l, registerpassword: e });
      } catch (n) {
        return P.error(`${me}Get registry info error.`, n), Promise.reject(Ie.error("PBX_NETWORK_ERROR"));
      }
    })), this.init = () => re(this, void 0, void 0, function* () {
      if (b(this, ft, "f")) return Promise.reject(Ie.error("PBX_ALREADY_INITIALIZED"));
      try {
        yield b(this, Vr, "f").call(this), yield b(this, Kr, "f").call(this), yield b(this, zr, "f").call(this);
        const { extensionNumber: n, extensionId: a, extensionName: l, recordPermissions: e } = yield b(this, Jr, "f").call(this), { realm: h, registername: f, registerpassword: u } = yield b(this, Xr, "f").call(this), T = { realm: h, registername: f, ha1: u, extensionNumber: n, extensionId: a, extensionName: l, recordPermissions: e };
        return b(this, Gr, "m", _u).call(this), ie(this, ft, !0, "f"), P.info(`${me}PBX init success.`), Promise.resolve(T);
      } catch (n) {
        return this.token = null, ie(this, ft, !1), P.error(`${me}Init failed.`), Promise.reject(n);
      }
    }), this.destroy = () => {
      var n, a;
      this.removeAllListeners(), (n = this.socket) === null || n === void 0 || n.removeAllListeners(), (a = this.socket) === null || a === void 0 || a.stop(), this.socket = null, this.token = null, this.secret = "", ie(this, ft, !1), K.remove("token"), Oe.token = "", P.info(`${me}Pbx has been destroy.`);
    }, this.cdrQuery = (n) => re(this, void 0, void 0, function* () {
      const { page: a = 1, size: l = 20, status: e = 0, sortBy: h = "time", orderBy: f = "desc", filter: u = null } = n || {};
      try {
        const { data: T } = yield ((g) => Oe.get("/v1.0/cdr/searchpersonal", g))({ page: a, page_size: l, sort_by: h, order_by: f, status: e, number: u });
        return T;
      } catch (T) {
        return Promise.reject(T);
      }
    }), this.logout = () => re(this, void 0, void 0, function* () {
      try {
        const { data: n } = yield Oe.get("/v1.0/logout"), { errcode: a, errmsg: l } = n;
        return { errcode: a, errmsg: l };
      } catch (n) {
        return Promise.reject(n);
      }
    }), this.on = (n, a) => this.addListener(n, a), this.secret = i.secret, this.username = i.username, this.url = i.url, this.token = this.secret;
  }
  get info() {
    return { token: this.token, extensionId: this.extensionId, url: this.url };
  }
  get isInited() {
    return b(this, ft, "f");
  }
}
ft = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ new WeakMap(), Kr = /* @__PURE__ */ new WeakMap(), zr = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ new WeakMap(), Xr = /* @__PURE__ */ new WeakMap(), Gr = /* @__PURE__ */ new WeakSet(), _u = function() {
  this.socket = new _f("wss://" + this.url.host + "/api/v1.0/subscribe?access_token=" + this.token), P.info(`${me}Create pbx subscribe socket.`), this.socket.init(), P.info(`${me}Init pbx subscribe socket.`);
};
const qe = "[PBX Subscribe] ";
function at(s, i, n, a, l, e = !1) {
  return re(this, void 0, void 0, function* () {
    if (e) try {
      yield i.logout();
    } catch {
      P.error(`${qe}Log failed.`);
    }
    i.destroy(), s.destroy(), P.error(`${qe}Got ${n}, ${a}`), i.emit("runtimeError", Ie.error(l));
  });
}
const Ca = { "37.12.0.10": { subscribeList: ["20153", "20154"] } }, mf = ["10000", "20007", "20008", "20010", "20015", "20053", "20065", "20066", "20047", "20048", "20104", "20082", "20049"];
function gf(s) {
  let i = [...mf], n = [];
  return Object.keys(Ca).forEach((a) => {
    const l = Ca[a];
    (function(h, f) {
      const u = h.split(".");
      u.shift();
      const T = f.split(".");
      T.shift();
      const g = Math.max(u.length, T.length);
      for (let A = 0; A < g; A++) {
        const S = Number(u[A]) || 0, L = Number(T[A]) || 0;
        if (S > L) return 1;
        if (S < L) return -1;
      }
      return 0;
    })(s, a) < 0 || (l.subscribeList && (i = i.concat(l.subscribeList)), l.supportFnList && (n = n.concat(l.supportFnList)));
  }), { subscribeList: i, supportFnList: n };
}
var Tf = "1.0.14";
const ke = "[main] ";
function vf() {
  return re(this, void 0, void 0, function* () {
    try {
      const { data: s } = yield $h(), { product: i = {}, errcode: n } = s;
      if (n !== 0) return !1;
      if (i.base_oem_id === void 0) return P.error(`${ke}SDK does not support this PBX firmware version.`), !1;
      const a = mr({ company_name: i.company_name || "", disp_dev_name: i.disp_dev_name || "", oem_id: i.oem_id || "", platform_name: i.platform_name || "", product_name: i.product_name || "", product_type: i.product_type || "", version: i.version || "", sdk_version: Tf });
      return K.set("productInfo", a), K.set("planMode", i.base_oem_id === 1 ? "cn" : "en"), i.platform_name === "p_cloudpbx" && K.set("showCloudPlan", !0), P.log("record", `${ke}get product success.`, JSON.stringify(a)), !0;
    } catch {
      return P.error(`${ke}get product failed.`), !1;
    }
  });
}
function Sa(s, i) {
  s.destroy(), i.destroy();
}
function Ef(s) {
  var i;
  return re(this, void 0, void 0, function* () {
    const { enableLog: n = !0, pbxURL: a, username: l, secret: e, reRegistryPhoneTimes: h, userAgent: f = "WebClient", deviceIds: u = {}, disableCallWaiting: T = !1 } = s;
    n === !1 && P.disable(), Aa.init({ uploadLog: Hh }), P.username = l, P.info(`${ke}init invoke.`);
    const g = function(U) {
      if (U instanceof URL) return P.info(`${ke}get url success.`), U;
      if (typeof U != "string") return P.error(`${ke}pbxURL type must a string or URL.`), null;
      let O = null;
      try {
        O = new URL(U);
      } catch {
        P.error(`${ke}invalid pbxURL.`);
      }
      return P.info(`${ke}get url success.`), O;
    }(a);
    if (g === null) return Promise.reject(Ks.error("INVALID_PBX_URL"));
    if (!function(U) {
      const O = U.protocol === "https:";
      return O === !1 && P.error(`${ke}pbxURL protocol not https. url.protocol: ${U.protocol}`), P.info(`${ke}check url success.`), O;
    }(g)) return Promise.reject(Ks.error("PBX_URL_NOT_HTTPS"));
    if (K.set("pbxURL", g), K.set("secret", e), K.set("username", l), K.set("userAgent", f), K.set("disableCallWaiting", T), function(U, O) {
      const z = { baseURL: U + "/api", timeout: 6e5 };
      Oe.config = z;
    }(g.origin), (yield vf()) === !1) return Promise.reject(Ks.error("GET_PRODUCT_FAILED"));
    h != null || K.set("reRegistryPhoneTimes", h);
    const A = new pf({ url: g, secret: e, username: l });
    let S;
    try {
      S = yield A.init();
    } catch (U) {
      return Promise.reject(U);
    }
    const L = new df({ id: S.extensionId, host: g, registername: S.registername, ha1: S.ha1, realm: S.realm, number: S.extensionNumber, userAgent: f });
    L.deviceIds = u, L.recordPermissions = S.recordPermissions;
    const w = new Array();
    f === "WebClient" ? w.push("20015") : w.push("20013");
    const { subscribeList: y } = gf(K.get("productInfo").version);
    return (i = A.socket) === null || i === void 0 || i.onSubscribe({ addList: { subscribeCodes: y.concat(w), listener: (U) => {
      (function(O, z, k) {
        var _;
        re(this, void 0, void 0, function* () {
          const m = JSON.parse(O.data), v = JSON.parse(m.msg), E = m.type, I = K.get("extensionNumber");
          switch (E) {
            case 1e4:
              v.username === K.get("extensionNumber") && at(z, k, E, "It seems like you have logged in elsewhere!", "LOGGED_IN_ELSEWHERE");
              break;
            case 20007:
              at(z, k, E, "Extension has been deleted!", "EXTENSION_DELETED");
              break;
            case 20008:
              const D = v.record_feature_code;
              P.info(`${qe}Got ${E}, Record code change: ${D}`), K.set("recordCode", D);
              break;
            case 20010:
            case 20154:
              at(z, k, E, "Need re-login!", "RE_LOGIN");
              break;
            case 20053:
              const { fqdnStatus: $, videoStatus: M } = Ma(v);
              K.set("fqdnStatus", $), K.set("videoPlan", M), z.emitEvent("videoPlanChange", M);
              break;
            case 20065:
              K.set("enableNatFqdn", v.enable_nat_fqdn), K.set("fqdnDomain", v.fqdn_domain), K.set("turnPort", v.turn_port);
              break;
            case 20066:
              P.info(`${qe}Got ${E}, Registry info change.`), z.config.ha1 = v.reg_password, z.config.registername = v.reg_name, z.config.realm = v.realm, z.reRegister(v.reg_name, v.reg_password);
              break;
            case 20047:
              P.info(`${qe}Got ${E}, Registry info change.`), z.recordPermissions = v.enb_ctl_record;
              break;
            case 20048:
              P.info(`${qe}Got ${E}, Record status change.`);
              const B = v.call_feature === "conference";
              let V = "";
              if (I === v.callee_origin_number && (V = v.callee_sip_callid), I === v.caller_origin_number && (V = v.caller_sip_callid), z.sessions.has(V)) {
                P.info(`${qe}Change session status.`);
                const q = z.sessions.get(V), Q = Object.assign({}, q.status);
                q.setStatus({ recordStatus: v.record_status, isConference: B }).emitEvent("statusChange", q.status, Q);
              }
              break;
            case 20049:
              P.info(`${qe}Got ${E}, CDR change.`), k.emit("cdrChange", v);
              break;
            case 20104:
              P.info(`${qe}Got ${E}, Hot standby status change.`), (_ = k.socket) === null || _ === void 0 || _.resubscribe();
              break;
            case 20135: {
              P.info(`${qe}Got ${E}, Call waiting value change.`);
              const q = v.enb_call_waiting !== 0;
              K.set("callWaiting", q);
              break;
            }
            case 20082:
              if (K.get("planMode") !== "cn") return;
              v.enb_internal_client !== 1 && at(z, k, E, "Linkus client has been disabled!", "LINKUS_DISABLED", !0);
              break;
            case 20013:
              if (K.get("planMode") !== "en" || K.get("userAgent") !== "WebPC") return;
              v.enb_desktop_client !== 1 && at(z, k, E, "Linkus client has been disabled!", "LINKUS_DISABLED", !0);
              break;
            case 20015:
              if (K.get("planMode") !== "en" || K.get("userAgent") !== "WebClient") return;
              v.enb_web_client !== 1 && at(z, k, E, "Linkus client has been disabled!", "LINKUS_DISABLED", !0);
              break;
            case 20153:
              v.enable === 1 || at(z, k, E, "SDK plan has been disabeled!", "SDK_PLAN_DISABLED");
          }
        });
      })(U, L, A);
    } } }), window && window.addEventListener("unload", (U) => {
      U.preventDefault();
      try {
        Sa(L, A);
      } catch {
        P.error(`${ke}Unload page, Destroy error.`);
      }
    }), { phone: L, pbx: A, destroy: () => {
      Sa(L, A);
    } };
  });
}
export {
  pf as PBXOperator,
  Vh as PHONE_ERROR,
  df as PhoneOperator,
  Ks as Result,
  hf as Session,
  Ef as init
};

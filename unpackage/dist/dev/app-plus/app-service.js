if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  var _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
  "use strict";
  const ON_SHOW = "onShow";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const mpMixin = {};
  function email(value2) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value2);
  }
  function mobile(value2) {
    return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value2);
  }
  function url(value2) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value2);
  }
  function date(value2) {
    if (!value2)
      return false;
    if (number(value2))
      value2 = +value2;
    return !/Invalid|NaN/.test(new Date(value2).toString());
  }
  function dateISO(value2) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value2);
  }
  function number(value2) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value2);
  }
  function string(value2) {
    return typeof value2 === "string";
  }
  function digits(value2) {
    return /^\d+$/.test(value2);
  }
  function idCard(value2) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value2
    );
  }
  function carNo(value2) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value2.length === 7) {
      return creg.test(value2);
    }
    if (value2.length === 8) {
      return xreg.test(value2);
    }
    return false;
  }
  function amount(value2) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value2);
  }
  function chinese(value2) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value2);
  }
  function letter(value2) {
    return /^[a-zA-Z]*$/.test(value2);
  }
  function enOrNum(value2) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value2);
  }
  function contains(value2, param) {
    return value2.indexOf(param) >= 0;
  }
  function range$1(value2, param) {
    return value2 >= param[0] && value2 <= param[1];
  }
  function rangeLength(value2, param) {
    return value2.length >= param[0] && value2.length <= param[1];
  }
  function landline(value2) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value2);
  }
  function empty(value2) {
    switch (typeof value2) {
      case "undefined":
        return true;
      case "string":
        if (value2.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value2)
          return true;
        break;
      case "number":
        if (value2 === 0 || isNaN(value2))
          return true;
        break;
      case "object":
        if (value2 === null || value2.length === 0)
          return true;
        for (const i in value2) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value2) {
    if (typeof value2 === "string") {
      try {
        const obj = JSON.parse(value2);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value2) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value2);
    }
    return Object.prototype.toString.call(value2) === "[object Array]";
  }
  function object(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  function code(value2, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value2);
  }
  function func(value2) {
    return typeof value2 === "function";
  }
  function promise(value2) {
    return object(value2) && func(value2.then) && func(value2.catch);
  }
  function image(value2) {
    const newValue = value2.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value2) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value2);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    amount,
    array,
    carNo,
    chinese,
    code,
    contains,
    date,
    dateISO,
    digits,
    email,
    empty,
    enOrNum,
    func,
    idCard,
    image,
    jsonString,
    landline,
    letter,
    mobile,
    number,
    object,
    promise,
    range: range$1,
    rangeLength,
    regExp,
    string,
    url,
    video
  }, Symbol.toStringTag, { value: "Module" }));
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uv-ui-tools/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value2 = 0) {
    return Math.max(min, Math.min(max, Number(value2)));
  }
  function getPx(value2, unit = false) {
    if (number(value2)) {
      return unit ? `${value2}px` : Number(value2);
    }
    if (/(rpx|upx)$/.test(value2)) {
      return unit ? `${uni.upx2px(parseInt(value2))}px` : Number(uni.upx2px(parseInt(value2)));
    }
    return unit ? `${parseInt(value2)}px` : parseInt(value2);
  }
  function sleep(value2 = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value2);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit(value2 = "auto", unit = ((_b) => (_b = ((_a) => (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config)()) == null ? void 0 : _b.unit)() ?? "px") {
    value2 = String(value2);
    return number(value2) ? `${value2}${unit}` : value2;
  }
  function deepClone(obj, cache = /* @__PURE__ */ new WeakMap()) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (cache.has(obj))
      return cache.get(obj);
    let clone;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value2]) => [key, deepClone(value2, cache)]));
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value2) => deepClone(value2, cache)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value2) => deepClone(value2, cache));
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache.set(obj, clone);
      for (const [key, value2] of Object.entries(obj)) {
        clone[key] = deepClone(value2, cache);
      }
    } else {
      clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
      return target;
    const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop];
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue);
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue);
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue);
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue);
      } else if (typeof sourceValue === "object" && sourceValue !== null) {
        merged[prop] = deepMerge(targetValue, sourceValue);
      } else {
        merged[prop] = sourceValue;
      }
    }
    return merged;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uv-ui-tools/libs/function/index.js:250", `uvui提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime == null ? void 0 : dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
      date2 = new Date(dateTime.replace(/-/g, "/"));
    } else {
      date2 = new Date(dateTime);
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value2 = data[key];
      if (["", void 0, null].indexOf(value2) >= 0) {
        continue;
      }
      if (value2.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value2.length; i++) {
              _result.push(`${key}[${i}]=${value2[i]}`);
            }
            break;
          case "brackets":
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value2.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value2.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value2}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value2, unit = true) {
    const valueNum = parseInt(value2);
    if (unit) {
      if (/s$/.test(value2))
        return value2;
      return value2 > 30 ? `${value2}ms` : `${value2}s`;
    }
    if (/ms$/.test(value2))
      return valueNum;
    if (/s$/.test(value2))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value2) {
    return `00${value2}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "uv-form-item");
    const form = $parent.call(instance, "uv-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value2) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value2);
    } else {
      obj[key] = value2;
    }
  }
  function page() {
    var _a;
    const pages2 = getCurrentPages();
    return `/${((_a = pages2[pages2.length - 1]) == null ? void 0 : _a.route) ?? ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getHistoryPage(back = 0) {
    const pages2 = getCurrentPages();
    const len = pages2.length;
    return pages2[len - 1 + back];
  }
  function setConfig({
    props: props2 = {},
    config = {},
    color = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color);
    uni.$uv.zIndex = deepMerge2(uni.$uv.zIndex, zIndex);
  }
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge,
    error,
    formValidate,
    getDuration,
    getHistoryPage,
    getProperty,
    getPx,
    guid,
    os,
    padZero,
    page,
    pages,
    priceFormat,
    queryParams,
    random,
    randomArray,
    range,
    setConfig,
    setProperty,
    sleep,
    sys,
    timeFormat,
    timeFrom,
    toast,
    trim,
    type2icon
  }, Symbol.toStringTag, { value: "Module" }));
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$uv.getRect = this.$uvGetRect;
    },
    created() {
      this.$uv.getRect = this.$uvGetRect;
    },
    computed: {
      $uv() {
        return {
          ...index,
          test
        };
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `uv-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uvGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$uv.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uvOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const props$c = {
    props: {
      // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
      offsetTop: {
        type: [String, Number],
        default: 0
      },
      // 自定义导航栏的高度
      customNavHeight: {
        type: [String, Number],
        default: 0
      },
      // 是否禁用吸顶功能
      disabled: {
        type: Boolean,
        default: false
      },
      // 吸顶区域的背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // z-index值
      zIndex: {
        type: [String, Number],
        default: ""
      },
      // 列表中的索引值
      index: {
        type: [String, Number],
        default: ""
      },
      ...(_d = (_c = uni.$uv) == null ? void 0 : _c.props) == null ? void 0 : _d.sticky
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$r = {
    name: "uv-sticky",
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {
        cssSticky: false,
        // 是否使用css的sticky实现
        stickyTop: 0,
        // 吸顶的top值，因为可能受自定义导航栏影响，最终的吸顶值非offsetTop值
        elId: "",
        left: 0,
        // js模式时，吸顶的内容因为处于postition: fixed模式，为了和原来保持一致的样式，需要记录并重新设置它的left，height，width属性
        width: "auto",
        height: "auto",
        fixed: false
        // js模式时，是否处于吸顶模式
      };
    },
    computed: {
      style() {
        const style = {};
        if (!this.disabled) {
          if (this.cssSticky) {
            style.position = "sticky";
            style.zIndex = this.uZindex;
            style.top = this.$uv.addUnit(this.stickyTop);
          } else {
            style.height = this.fixed ? this.height + "px" : "auto";
          }
        } else {
          style.position = "static";
        }
        style.backgroundColor = this.bgColor;
        return this.$uv.deepMerge(this.$uv.addStyle(this.customStyle), style);
      },
      // 吸顶内容的样式
      stickyContent() {
        const style = {};
        if (!this.cssSticky) {
          style.position = this.fixed ? "fixed" : "static";
          style.top = this.stickyTop + "px";
          style.left = this.left + "px";
          style.width = this.width == "auto" ? "auto" : this.width + "px";
          style.zIndex = this.uZindex;
        }
        return style;
      },
      uZindex() {
        return this.zIndex ? this.zIndex : 970;
      }
    },
    created() {
      this.elId = this.$uv.guid();
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getStickyTop();
        this.checkSupportCssSticky();
        if (!this.cssSticky) {
          !this.disabled && this.initObserveContent();
        }
      },
      initObserveContent() {
        this.$uvGetRect("#" + this.elId).then((res) => {
          this.height = res.height;
          this.left = res.left;
          this.width = res.width;
          this.$nextTick(() => {
            this.observeContent();
          });
        });
      },
      observeContent() {
        this.disconnectObserver("contentObserver");
        const contentObserver = uni.createIntersectionObserver({
          // 检测的区间范围
          thresholds: [0.95, 0.98, 1]
        });
        contentObserver.relativeToViewport({
          top: -this.stickyTop
        });
        contentObserver.observe(`#${this.elId}`, (res) => {
          this.setFixed(res.boundingClientRect.top);
        });
        this.contentObserver = contentObserver;
      },
      setFixed(top) {
        const fixed = top <= this.stickyTop;
        this.fixed = fixed;
      },
      disconnectObserver(observerName) {
        const observer = this[observerName];
        observer && observer.disconnect();
      },
      getStickyTop() {
        this.stickyTop = this.$uv.getPx(this.offsetTop) + this.$uv.getPx(this.customNavHeight);
      },
      async checkSupportCssSticky() {
        if (this.$uv.os() === "android" && Number(this.$uv.sys().system) > 8) {
          this.cssSticky = true;
        }
        this.cssSticky = await this.checkComputedStyle();
        if (this.$uv.os() === "ios") {
          this.cssSticky = true;
        }
      },
      // 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
      checkComputedStyle() {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this).select(".uv-sticky").fields({
            computedStyle: ["position"]
          }).exec((e) => {
            resolve("sticky" === e[0].position);
          });
        });
      },
      // H5通过创建元素的形式嗅探是否支持css sticky
      // 判断浏览器是否支持sticky属性
      checkCssStickyForH5() {
      }
    },
    beforeDestroy() {
      this.disconnectObserver("contentObserver");
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uv-sticky",
      id: $data.elId,
      style: vue.normalizeStyle([$options.style])
    }, [
      vue.createElementVNode(
        "view",
        {
          style: vue.normalizeStyle([$options.stickyContent]),
          class: "uv-sticky__content"
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        4
        /* STYLE */
      )
    ], 12, ["id"]);
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$i], ["__scopeId", "data-v-0a817f53"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-sticky/components/uv-sticky/uv-sticky.vue"]]);
  const icons$1 = {
    "uvicon-level": "",
    "uvicon-column-line": "",
    "uvicon-checkbox-mark": "",
    "uvicon-folder": "",
    "uvicon-movie": "",
    "uvicon-star-fill": "",
    "uvicon-star": "",
    "uvicon-phone-fill": "",
    "uvicon-phone": "",
    "uvicon-apple-fill": "",
    "uvicon-chrome-circle-fill": "",
    "uvicon-backspace": "",
    "uvicon-attach": "",
    "uvicon-cut": "",
    "uvicon-empty-car": "",
    "uvicon-empty-coupon": "",
    "uvicon-empty-address": "",
    "uvicon-empty-favor": "",
    "uvicon-empty-permission": "",
    "uvicon-empty-news": "",
    "uvicon-empty-search": "",
    "uvicon-github-circle-fill": "",
    "uvicon-rmb": "",
    "uvicon-person-delete-fill": "",
    "uvicon-reload": "",
    "uvicon-order": "",
    "uvicon-server-man": "",
    "uvicon-search": "",
    "uvicon-fingerprint": "",
    "uvicon-more-dot-fill": "",
    "uvicon-scan": "",
    "uvicon-share-square": "",
    "uvicon-map": "",
    "uvicon-map-fill": "",
    "uvicon-tags": "",
    "uvicon-tags-fill": "",
    "uvicon-bookmark-fill": "",
    "uvicon-bookmark": "",
    "uvicon-eye": "",
    "uvicon-eye-fill": "",
    "uvicon-mic": "",
    "uvicon-mic-off": "",
    "uvicon-calendar": "",
    "uvicon-calendar-fill": "",
    "uvicon-trash": "",
    "uvicon-trash-fill": "",
    "uvicon-play-left": "",
    "uvicon-play-right": "",
    "uvicon-minus": "",
    "uvicon-plus": "",
    "uvicon-info": "",
    "uvicon-info-circle": "",
    "uvicon-info-circle-fill": "",
    "uvicon-question": "",
    "uvicon-error": "",
    "uvicon-close": "",
    "uvicon-checkmark": "",
    "uvicon-android-circle-fill": "",
    "uvicon-android-fill": "",
    "uvicon-ie": "",
    "uvicon-IE-circle-fill": "",
    "uvicon-google": "",
    "uvicon-google-circle-fill": "",
    "uvicon-setting-fill": "",
    "uvicon-setting": "",
    "uvicon-minus-square-fill": "",
    "uvicon-plus-square-fill": "",
    "uvicon-heart": "",
    "uvicon-heart-fill": "",
    "uvicon-camera": "",
    "uvicon-camera-fill": "",
    "uvicon-more-circle": "",
    "uvicon-more-circle-fill": "",
    "uvicon-chat": "",
    "uvicon-chat-fill": "",
    "uvicon-bag-fill": "",
    "uvicon-bag": "",
    "uvicon-error-circle-fill": "",
    "uvicon-error-circle": "",
    "uvicon-close-circle": "",
    "uvicon-close-circle-fill": "",
    "uvicon-checkmark-circle": "",
    "uvicon-checkmark-circle-fill": "",
    "uvicon-question-circle-fill": "",
    "uvicon-question-circle": "",
    "uvicon-share": "",
    "uvicon-share-fill": "",
    "uvicon-shopping-cart": "",
    "uvicon-shopping-cart-fill": "",
    "uvicon-bell": "",
    "uvicon-bell-fill": "",
    "uvicon-list": "",
    "uvicon-list-dot": "",
    "uvicon-zhihu": "",
    "uvicon-zhihu-circle-fill": "",
    "uvicon-zhifubao": "",
    "uvicon-zhifubao-circle-fill": "",
    "uvicon-weixin-circle-fill": "",
    "uvicon-weixin-fill": "",
    "uvicon-twitter-circle-fill": "",
    "uvicon-twitter": "",
    "uvicon-taobao-circle-fill": "",
    "uvicon-taobao": "",
    "uvicon-weibo-circle-fill": "",
    "uvicon-weibo": "",
    "uvicon-qq-fill": "",
    "uvicon-qq-circle-fill": "",
    "uvicon-moments-circel-fill": "",
    "uvicon-moments": "",
    "uvicon-qzone": "",
    "uvicon-qzone-circle-fill": "",
    "uvicon-baidu-circle-fill": "",
    "uvicon-baidu": "",
    "uvicon-facebook-circle-fill": "",
    "uvicon-facebook": "",
    "uvicon-car": "",
    "uvicon-car-fill": "",
    "uvicon-warning-fill": "",
    "uvicon-warning": "",
    "uvicon-clock-fill": "",
    "uvicon-clock": "",
    "uvicon-edit-pen": "",
    "uvicon-edit-pen-fill": "",
    "uvicon-email": "",
    "uvicon-email-fill": "",
    "uvicon-minus-circle": "",
    "uvicon-minus-circle-fill": "",
    "uvicon-plus-circle": "",
    "uvicon-plus-circle-fill": "",
    "uvicon-file-text": "",
    "uvicon-file-text-fill": "",
    "uvicon-pushpin": "",
    "uvicon-pushpin-fill": "",
    "uvicon-grid": "",
    "uvicon-grid-fill": "",
    "uvicon-play-circle": "",
    "uvicon-play-circle-fill": "",
    "uvicon-pause-circle-fill": "",
    "uvicon-pause": "",
    "uvicon-pause-circle": "",
    "uvicon-eye-off": "",
    "uvicon-eye-off-outline": "",
    "uvicon-gift-fill": "",
    "uvicon-gift": "",
    "uvicon-rmb-circle-fill": "",
    "uvicon-rmb-circle": "",
    "uvicon-kefu-ermai": "",
    "uvicon-server-fill": "",
    "uvicon-coupon-fill": "",
    "uvicon-coupon": "",
    "uvicon-integral": "",
    "uvicon-integral-fill": "",
    "uvicon-home-fill": "",
    "uvicon-home": "",
    "uvicon-hourglass-half-fill": "",
    "uvicon-hourglass": "",
    "uvicon-account": "",
    "uvicon-plus-people-fill": "",
    "uvicon-minus-people-fill": "",
    "uvicon-account-fill": "",
    "uvicon-thumb-down-fill": "",
    "uvicon-thumb-down": "",
    "uvicon-thumb-up": "",
    "uvicon-thumb-up-fill": "",
    "uvicon-lock-fill": "",
    "uvicon-lock-open": "",
    "uvicon-lock-opened-fill": "",
    "uvicon-lock": "",
    "uvicon-red-packet-fill": "",
    "uvicon-photo-fill": "",
    "uvicon-photo": "",
    "uvicon-volume-off-fill": "",
    "uvicon-volume-off": "",
    "uvicon-volume-fill": "",
    "uvicon-volume": "",
    "uvicon-red-packet": "",
    "uvicon-download": "",
    "uvicon-arrow-up-fill": "",
    "uvicon-arrow-down-fill": "",
    "uvicon-play-left-fill": "",
    "uvicon-play-right-fill": "",
    "uvicon-rewind-left-fill": "",
    "uvicon-rewind-right-fill": "",
    "uvicon-arrow-downward": "",
    "uvicon-arrow-leftward": "",
    "uvicon-arrow-rightward": "",
    "uvicon-arrow-upward": "",
    "uvicon-arrow-down": "",
    "uvicon-arrow-right": "",
    "uvicon-arrow-left": "",
    "uvicon-arrow-up": "",
    "uvicon-skip-back-left": "",
    "uvicon-skip-forward-right": "",
    "uvicon-rewind-right": "",
    "uvicon-rewind-left": "",
    "uvicon-arrow-right-double": "",
    "uvicon-arrow-left-double": "",
    "uvicon-wifi-off": "",
    "uvicon-wifi": "",
    "uvicon-empty-data": "",
    "uvicon-empty-history": "",
    "uvicon-empty-list": "",
    "uvicon-empty-page": "",
    "uvicon-empty-order": "",
    "uvicon-man": "",
    "uvicon-woman": "",
    "uvicon-man-add": "",
    "uvicon-man-add-fill": "",
    "uvicon-man-delete": "",
    "uvicon-man-delete-fill": "",
    "uvicon-zh": "",
    "uvicon-en": ""
  };
  const props$b = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: "16px"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: null
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uvicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "15px"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: "3px"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: ""
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: false
      },
      ...(_f = (_e = uni.$uv) == null ? void 0 : _e.props) == null ? void 0 : _f.icon
    }
  };
  const _sfc_main$q = {
    name: "uv-icon",
    emits: ["click"],
    data() {
      return {};
    },
    mixins: [mpMixin, mixin, props$b],
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix);
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color)
          classes.push("uv-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.$uv.addUnit(this.size),
          lineHeight: this.$uv.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$uv.addUnit(this.top)
        };
        if (this.color)
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$uv.addUnit(this.width) : this.$uv.addUnit(this.size);
        style.height = this.height ? this.$uv.addUnit(this.height) : this.$uv.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        return icons$1["uvicon-" + this.name] || "";
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-icon", ["uv-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "uv-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["uv-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "uv-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$uv.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$uv.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$h], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  const props$a = {
    props: {
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位px
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 是否显示下划线
      underLine: {
        type: Boolean,
        default: false
      },
      // 要跳转的链接
      href: {
        type: String,
        default: ""
      },
      // 小程序中复制到粘贴板的提示语
      mpTips: {
        type: String,
        default: "链接已复制，请在浏览器打开"
      },
      // 下划线颜色
      lineColor: {
        type: String,
        default: ""
      },
      // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
      text: {
        type: String,
        default: ""
      },
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.link
    }
  };
  const _sfc_main$p = {
    name: "uv-link",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$a],
    computed: {
      linkStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          // line-height设置为比字体大小多2px
          lineHeight: this.$uv.addUnit(this.$uv.getPx(this.fontSize) + 2),
          textDecoration: this.underLine ? "underline" : "none"
        };
        return style;
      }
    },
    methods: {
      openLink() {
        plus.runtime.openURL(this.href);
        this.$emit("click");
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        class: "uv-link",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.openLink && $options.openLink(...args), ["stop"])),
        style: vue.normalizeStyle([$options.linkStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      vue.toDisplayString(_ctx.text),
      5
      /* TEXT, STYLE */
    );
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$g], ["__scopeId", "data-v-86e87617"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-link/components/uv-link/uv-link.vue"]]);
  const value = {
    computed: {
      // 经处理后需要显示的值
      value() {
        const {
          text,
          mode,
          format,
          href
        } = this;
        if (mode === "price") {
          if (!/^\d+(\.\d+)?$/.test(text)) {
            error("金额模式下，text参数需要为金额格式");
          }
          if (func(format)) {
            return format(text);
          }
          return priceFormat(text, 2);
        }
        if (mode === "date") {
          !date(text) && error("日期模式下，text参数需要为日期或时间戳格式");
          if (func(format)) {
            return format(text);
          }
          if (format) {
            return timeFormat(text, format);
          }
          return timeFormat(text, "yyyy-mm-dd");
        }
        if (mode === "phone") {
          if (func(format)) {
            return format(text);
          }
          if (format === "encrypt") {
            return `${text.substr(0, 3)}****${text.substr(7)}`;
          }
          return text;
        }
        if (mode === "name") {
          !(typeof text === "string") && error("姓名模式下，text参数需要为字符串格式");
          if (func(format)) {
            return format(text);
          }
          if (format === "encrypt") {
            return this.formatName(text);
          }
          return text;
        }
        if (mode === "link") {
          !url(href) && error("超链接模式下，href参数需要为URL格式");
          return text;
        }
        return text;
      }
    },
    methods: {
      // 默认的姓名脱敏规则
      formatName(name) {
        let value2 = "";
        if (name.length === 2) {
          value2 = name.substr(0, 1) + "*";
        } else if (name.length > 2) {
          let char = "";
          for (let i = 0, len = name.length - 2; i < len; i++) {
            char += "*";
          }
          value2 = name.substr(0, 1) + char + name.substr(-1, 1);
        } else {
          value2 = name;
        }
        return value2;
      }
    }
  };
  const props$9 = {
    props: {
      // 主题颜色
      type: {
        type: String,
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 显示的值
      text: {
        type: [String, Number],
        default: ""
      },
      // 前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 文本处理的匹配模式
      // text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
      mode: {
        type: String,
        default: ""
      },
      // mode=link下，配置的链接
      href: {
        type: String,
        default: ""
      },
      // 格式化规则
      format: {
        type: [String, Function],
        default: ""
      },
      // mode=phone时，点击文本是否拨打电话
      call: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 是否粗体，默认normal
      bold: {
        type: Boolean,
        default: false
      },
      // 是否块状
      block: {
        type: Boolean,
        default: false
      },
      // 文本显示的行数，如果设置，超出此行数，将会显示省略号
      lines: {
        type: [String, Number],
        default: ""
      },
      // 文本颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 字体大小
      size: {
        type: [String, Number],
        default: 15
      },
      // 图标的样式
      iconStyle: {
        type: [Object, String],
        default: () => ({
          fontSize: "15px"
        })
      },
      // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
      decoration: {
        type: String,
        default: "none"
      },
      // 外边距，对象、字符串，数值形式均可
      margin: {
        type: [Object, String, Number],
        default: 0
      },
      // 文本行高
      lineHeight: {
        type: [String, Number],
        default: ""
      },
      // 文本对齐方式，可选值left|center|right
      align: {
        type: String,
        default: "left"
      },
      // 文字换行，可选值break-word|normal|anywhere
      wordWrap: {
        type: String,
        default: "normal"
      },
      ...(_j = (_i = uni.$uv) == null ? void 0 : _i.props) == null ? void 0 : _j.text
    }
  };
  const _sfc_main$o = {
    name: "uv-text",
    emits: ["click"],
    mixins: [mpMixin, mixin, value, props$9],
    computed: {
      valueStyle() {
        const style = {
          textDecoration: this.decoration,
          fontWeight: this.bold ? "bold" : "normal",
          wordWrap: this.wordWrap,
          fontSize: this.$uv.addUnit(this.size)
        };
        !this.type && (style.color = this.color);
        this.isNvue && this.lines && (style.lines = this.lines);
        this.lineHeight && (style.lineHeight = this.$uv.addUnit(this.lineHeight));
        !this.isNvue && this.block && (style.display = "block");
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      isNvue() {
        let nvue = false;
        return nvue;
      },
      isMp() {
        let mp = false;
        return mp;
      }
    },
    data() {
      return {};
    },
    methods: {
      clickHandler() {
        if (this.call && this.mode === "phone") {
          uni.makePhoneCall({
            phoneNumber: this.text
          });
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$5);
    const _component_uv_link = resolveEasycom(vue.resolveDynamicComponent("uv-link"), __easycom_1$4);
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-text", []]),
        style: vue.normalizeStyle({
          margin: _ctx.margin,
          justifyContent: _ctx.align === "left" ? "flex-start" : _ctx.align === "center" ? "center" : "flex-end"
        }),
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        _ctx.mode === "price" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["uv-text__price", _ctx.type && `uv-text__value--${_ctx.type}`]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          "￥",
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uv-text__prefix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.prefixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true),
        _ctx.mode === "link" ? (vue.openBlock(), vue.createBlock(_component_uv_link, {
          key: 2,
          text: _ctx.value,
          href: _ctx.href,
          underLine: ""
        }, null, 8, ["text", "href"])) : _ctx.openType && $options.isMp ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 3,
          class: "uv-reset-button uv-text__value",
          style: vue.normalizeStyle([$options.valueStyle]),
          openType: _ctx.openType,
          onGetuserinfo: _cache[0] || (_cache[0] = (...args) => _ctx.onGetUserInfo && _ctx.onGetUserInfo(...args)),
          onContact: _cache[1] || (_cache[1] = (...args) => _ctx.onContact && _ctx.onContact(...args)),
          onGetphonenumber: _cache[2] || (_cache[2] = (...args) => _ctx.onGetPhoneNumber && _ctx.onGetPhoneNumber(...args)),
          onError: _cache[3] || (_cache[3] = (...args) => _ctx.onError && _ctx.onError(...args)),
          onLaunchapp: _cache[4] || (_cache[4] = (...args) => _ctx.onLaunchApp && _ctx.onLaunchApp(...args)),
          onOpensetting: _cache[5] || (_cache[5] = (...args) => _ctx.onOpenSetting && _ctx.onOpenSetting(...args)),
          lang: _ctx.lang,
          "session-from": _ctx.sessionFrom,
          "send-message-title": _ctx.sendMessageTitle,
          "send-message-path": _ctx.sendMessagePath,
          "send-message-img": _ctx.sendMessageImg,
          "show-message-card": _ctx.showMessageCard,
          "app-parameter": _ctx.appParameter
        }, vue.toDisplayString(_ctx.value), 45, ["openType", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "show-message-card", "app-parameter"])) : (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 4,
            class: vue.normalizeClass(["uv-text__value", [
              _ctx.type && `uv-text__value--${_ctx.type}`,
              _ctx.lines && `uv-line-${_ctx.lines}`
            ]]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          vue.toDisplayString(_ctx.value),
          7
          /* TEXT, CLASS, STYLE */
        )),
        _ctx.suffixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 5,
          class: "uv-text__suffix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.suffixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$f], ["__scopeId", "data-v-8da47eb3"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
  const props$8 = {
    props: {
      // 头像图片路径(不能为相对路径)
      src: {
        type: String,
        default: ""
      },
      // 头像形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "circle"
      },
      // 头像尺寸
      size: {
        type: [String, Number],
        default: 40
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "scaleToFill"
      },
      // 显示的文字
      text: {
        type: String,
        default: ""
      },
      // 背景色
      bgColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 文字颜色
      color: {
        type: String,
        default: "#fff"
      },
      // 文字大小
      fontSize: {
        type: [String, Number],
        default: 18
      },
      // 显示的图标
      icon: {
        type: String,
        default: ""
      },
      // 显示小程序头像，只对百度，微信，QQ小程序有效
      mpAvatar: {
        type: Boolean,
        default: false
      },
      // 是否使用随机背景色
      randomBgColor: {
        type: Boolean,
        default: false
      },
      // 加载失败的默认头像(组件有内置默认图片)
      defaultUrl: {
        type: String,
        default: ""
      },
      // 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
      colorIndex: {
        type: [String, Number],
        // 校验参数规则，索引在0-19之间
        validator(n) {
          return range$1(n, [0, 19]) || n === "";
        },
        default: ""
      },
      // 组件标识符
      name: {
        type: String,
        default: ""
      },
      ...(_l = (_k = uni.$uv) == null ? void 0 : _k.props) == null ? void 0 : _l.avatar
    }
  };
  const base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$n = {
    name: "uv-avatar",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$8],
    data() {
      return {
        // 如果配置randomBgColor参数为true，在图标或者文字的模式下，会随机从中取出一个颜色值当做背景色
        colors: [
          "#ffb34b",
          "#f2bba9",
          "#f7a196",
          "#f18080",
          "#88a867",
          "#bfbf39",
          "#89c152",
          "#94d554",
          "#f19ec2",
          "#afaae4",
          "#e1b0df",
          "#c38cc1",
          "#72dcdc",
          "#9acdcb",
          "#77b1cc",
          "#448aca",
          "#86cefa",
          "#98d1ee",
          "#73d1f1",
          "#80a7dc"
        ],
        avatarUrl: this.src,
        allowMp: false
      };
    },
    watch: {
      // 监听头像src的变化，赋值给内部的avatarUrl变量，因为图片加载失败时，需要修改图片的src为默认值
      // 而组件内部不能直接修改props的值，所以需要一个中间变量
      src: {
        immediate: true,
        handler(newVal) {
          this.avatarUrl = newVal;
          if (!newVal) {
            this.errorHandler();
          }
        }
      }
    },
    computed: {
      imageStyle() {
        const style = {};
        return style;
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.src.indexOf("/") !== -1;
      },
      // 图片加载时失败时触发
      errorHandler() {
        this.avatarUrl = this.defaultUrl || base64Avatar;
      },
      clickHandler() {
        this.$emit("click", this.name);
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$5);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-avatar", [`uv-avatar--${_ctx.shape}`]]),
        style: vue.normalizeStyle([{
          backgroundColor: _ctx.text || _ctx.icon ? _ctx.randomBgColor ? $data.colors[_ctx.colorIndex !== "" ? _ctx.colorIndex : _ctx.$uv.random(0, 19)] : _ctx.bgColor : "transparent",
          width: _ctx.$uv.addUnit(_ctx.size),
          height: _ctx.$uv.addUnit(_ctx.size)
        }, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          _ctx.mpAvatar && $data.allowMp ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [],
            64
            /* STABLE_FRAGMENT */
          )) : _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: _ctx.icon,
            size: _ctx.fontSize,
            color: _ctx.color
          }, null, 8, ["name", "size", "color"])) : _ctx.text ? (vue.openBlock(), vue.createBlock(_component_uv_text, {
            key: 2,
            text: _ctx.text,
            size: _ctx.fontSize,
            color: _ctx.color,
            align: "center",
            customStyle: "justify-content: center"
          }, null, 8, ["text", "size", "color"])) : (vue.openBlock(), vue.createElementBlock("image", {
            key: 3,
            class: vue.normalizeClass(["uv-avatar__image", [`uv-avatar__image--${_ctx.shape}`]]),
            src: $data.avatarUrl || _ctx.defaultUrl,
            mode: _ctx.mode,
            onError: _cache[0] || (_cache[0] = (...args) => $options.errorHandler && $options.errorHandler(...args)),
            style: vue.normalizeStyle([{
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size)
            }])
          }, null, 46, ["src", "mode"]))
        ], true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$e], ["__scopeId", "data-v-fa9b0ca7"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-avatar/components/uv-avatar/uv-avatar.vue"]]);
  const props$7 = {
    props: {
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: "round"
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: "#f2f2f2"
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: "请输入关键字"
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: true
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: false
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: true
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default: () => ({})
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: "搜索"
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default: () => ({})
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: "transparent"
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: "#909399"
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: "#909399"
      },
      // 左边输入框的图标，可以为uvui图标名称或图片路径
      searchIcon: {
        type: String,
        default: "search"
      },
      searchIconSize: {
        type: [Number, String],
        default: 22
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
      margin: {
        type: String,
        default: "0"
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: false
      },
      // 输入框的初始化内容
      modelValue: {
        type: String,
        default: ""
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [String, Number],
        default: -1
      },
      // 搜索框高度，单位px
      height: {
        type: [String, Number],
        default: 32
      },
      // 搜索框左侧文本
      label: {
        type: [String, Number, null],
        default: null
      },
      ...(_n = (_m = uni.$uv) == null ? void 0 : _m.props) == null ? void 0 : _n.search
    }
  };
  const _sfc_main$m = {
    name: "uv-search",
    emits: ["click", "input", "change", "clear", "search", "custom", "focus", "blur", "clickIcon", "update:modelValue"],
    mixins: [mpMixin, mixin, props$7],
    data() {
      return {
        keyword: "",
        showClear: false,
        // 是否显示右边的清除图标
        show: false,
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: this.focus
        // 绑定输入框的值
        // inputValue: this.value
      };
    },
    watch: {
      keyword(nVal) {
        this.$emit("update:modelValue", nVal);
        this.$emit("change", nVal);
      },
      modelValue: {
        immediate: true,
        handler(nVal) {
          this.keyword = nVal;
        }
      }
    },
    computed: {
      showActionBtn() {
        return !this.animation && this.showAction;
      },
      inputValue() {
        return this.modelValue;
      }
    },
    methods: {
      // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
      inputChange(e) {
        this.keyword = e.detail.value;
        this.$emit("update:modelValue", this.keyword);
      },
      // 清空输入
      // 也可以作为用户通过this.$refs形式调用清空输入框内容
      clear() {
        this.keyword = "";
        this.$nextTick(() => {
          this.$emit("clear");
        });
        this.$emit("update:modelValue", this.keyword);
      },
      // 确定搜索
      search(e) {
        this.$emit("search", e.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e) {
        }
      },
      // 获取焦点
      getFocus() {
        this.focused = true;
        if (this.animation && this.showAction)
          this.show = true;
        this.$emit("focus", this.keyword);
      },
      // 失去焦点
      blur() {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.show = false;
        this.$emit("blur", this.keyword);
      },
      // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
      clickHandler() {
        if (this.disabled)
          this.$emit("click");
      },
      // 点击左边图标
      clickIcon() {
        this.$emit("clickIcon");
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-search",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle([{
          margin: _ctx.margin
        }, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "uv-search__content",
            style: vue.normalizeStyle({
              backgroundColor: _ctx.bgColor,
              borderRadius: _ctx.shape == "round" ? "100px" : "4px",
              borderColor: _ctx.borderColor
            })
          },
          [
            _ctx.$slots.label || _ctx.label !== null ? vue.renderSlot(_ctx.$slots, "label", { key: 0 }, () => [
              vue.createElementVNode(
                "text",
                { class: "uv-search__content__label" },
                vue.toDisplayString(_ctx.label),
                1
                /* TEXT */
              )
            ], true) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uv-search__content__icon" }, [
              vue.createVNode(_component_uv_icon, {
                onClick: $options.clickIcon,
                size: _ctx.searchIconSize,
                name: _ctx.searchIcon,
                color: _ctx.searchIconColor ? _ctx.searchIconColor : _ctx.color
              }, null, 8, ["onClick", "size", "name", "color"])
            ]),
            vue.createElementVNode("input", {
              "confirm-type": "search",
              onBlur: _cache[0] || (_cache[0] = (...args) => $options.blur && $options.blur(...args)),
              value: $options.inputValue,
              onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => $options.inputChange && $options.inputChange(...args)),
              disabled: _ctx.disabled,
              onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
              focus: _ctx.focus,
              maxlength: _ctx.maxlength,
              "placeholder-class": "uv-search__content__input--placeholder",
              placeholder: _ctx.placeholder,
              "placeholder-style": `color: ${_ctx.placeholderColor}`,
              class: "uv-search__content__input",
              type: "text",
              style: vue.normalizeStyle([{
                textAlign: _ctx.inputAlign,
                color: _ctx.color,
                backgroundColor: _ctx.bgColor,
                height: _ctx.$uv.addUnit(_ctx.height)
              }, _ctx.inputStyle])
            }, null, 44, ["value", "disabled", "focus", "maxlength", "placeholder", "placeholder-style"]),
            $data.keyword && _ctx.clearabled && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uv-search__content__icon uv-search__content__close",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.createVNode(_component_uv_icon, {
                name: "close",
                size: "11",
                color: "#ffffff",
                customStyle: "line-height: 12px"
              })
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            style: vue.normalizeStyle([_ctx.actionStyle]),
            class: vue.normalizeClass(["uv-search__action", [($options.showActionBtn || $data.show) && "uv-search__action--active"]]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.custom && $options.custom(...args), ["stop", "prevent"]))
          },
          vue.toDisplayString(_ctx.actionText),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$d], ["__scopeId", "data-v-46cbdd03"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-search/components/uv-search/uv-search.vue"]]);
  const icons = {
    "id": "2852637",
    "name": "uniui图标库",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$l = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v) => v.font_class === this.type);
        if (code2) {
          return unescape(`%u${code2.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$c], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const uvBadgeProps = {
    props: {
      // 是否显示圆点
      isDot: {
        type: Boolean,
        default: false
      },
      // 显示的内容
      value: {
        type: [Number, String],
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 最大值，超过最大值会显示 '{max}+'
      max: {
        type: [Number, String],
        default: 999
      },
      // 主题类型，error|warning|success|primary
      type: {
        type: String,
        default: "error"
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: false
      },
      // 背景颜色，优先级比type高，如设置，type参数会失效
      bgColor: {
        type: [String, null],
        default: null
      },
      // 字体颜色
      color: {
        type: [String, null],
        default: null
      },
      // 徽标形状，circle-四角均为圆角，horn-左下角为直角
      shape: {
        type: String,
        default: "circle"
      },
      // 设置数字的显示方式，overflow|ellipsis|limit
      // overflow会根据max字段判断，超出显示`${max}+`
      // ellipsis会根据max判断，超出显示`${max}...`
      // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
      numberType: {
        type: String,
        default: "overflow"
      },
      // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
      offset: {
        type: Array,
        default: () => []
      },
      // 是否反转背景和字体颜色
      inverted: {
        type: Boolean,
        default: false
      },
      // 是否绝对定位
      absolute: {
        type: Boolean,
        default: false
      },
      ...(_p = (_o = uni.$uv) == null ? void 0 : _o.props) == null ? void 0 : _p.badge
    }
  };
  const _sfc_main$k = {
    name: "uv-badge",
    mixins: [mpMixin, mixin, uvBadgeProps],
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        return style;
      },
      // 整个组件的样式
      badgeStyle() {
        const style = {};
        if (this.color) {
          style.color = this.color;
        }
        if (this.bgColor && !this.inverted) {
          style.backgroundColor = this.bgColor;
        }
        if (this.absolute) {
          style.position = "absolute";
          if (this.offset.length) {
            const top = this.offset[0];
            const right = this.offset[1] || top;
            style.top = this.$uv.addUnit(top);
            style.right = this.$uv.addUnit(right);
          }
        }
        return style;
      },
      showValue() {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
          default:
            return Number(this.value);
        }
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show && ((Number(_ctx.value) === 0 ? _ctx.showZero : true) || _ctx.isDot) ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass([[_ctx.isDot ? "uv-badge--dot" : "uv-badge--not-dot", _ctx.inverted && "uv-badge--inverted", _ctx.shape === "horn" && "uv-badge--horn", `uv-badge--${_ctx.type}${_ctx.inverted ? "--inverted" : ""}`], "uv-badge"]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle), $options.badgeStyle])
      },
      vue.toDisplayString(_ctx.isDot ? "" : $options.showValue),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$b], ["__scopeId", "data-v-91e4945b"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-badge/components/uv-badge/uv-badge.vue"]]);
  const props$6 = {
    props: {
      // 滑块的移动过渡时间，单位ms
      duration: {
        type: Number,
        default: 300
      },
      // tabs标签数组
      list: {
        type: Array,
        default: () => []
      },
      // 滑块颜色
      lineColor: {
        type: String,
        default: "#3c9cff"
      },
      // 菜单选择中时的样式
      activeStyle: {
        type: [String, Object],
        default: () => ({
          color: "#303133"
        })
      },
      // 菜单非选中时的样式
      inactiveStyle: {
        type: [String, Object],
        default: () => ({
          color: "#606266"
        })
      },
      // 滑块长度
      lineWidth: {
        type: [String, Number],
        default: 20
      },
      // 滑块高度
      lineHeight: {
        type: [String, Number],
        default: 3
      },
      // 滑块背景显示大小，当滑块背景设置为图片时使用
      lineBgSize: {
        type: String,
        default: "cover"
      },
      // 菜单item的样式
      itemStyle: {
        type: [String, Object],
        default: () => ({
          height: "44px"
        })
      },
      // 菜单是否可滚动
      scrollable: {
        type: Boolean,
        default: true
      },
      // 当前选中标签的索引
      current: {
        type: [Number, String],
        default: 0
      },
      // 默认读取的键名
      keyName: {
        type: String,
        default: "name"
      },
      ...(_r = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r.tabs
    }
  };
  const _sfc_main$j = {
    name: "uv-tabs",
    emits: ["click", "change"],
    mixins: [mpMixin, mixin, props$6],
    data() {
      return {
        firstTime: true,
        scrollLeft: 0,
        scrollViewWidth: 0,
        lineOffsetLeft: 0,
        tabsRect: {
          left: 0
        },
        innerCurrent: 0,
        moving: false
      };
    },
    watch: {
      current: {
        immediate: true,
        handler(newValue, oldValue) {
          if (newValue !== this.innerCurrent) {
            this.innerCurrent = newValue;
            this.$nextTick(() => {
              this.resize();
            });
          }
        }
      },
      // list变化时，重新渲染list各项信息
      list() {
        this.$nextTick(() => {
          this.resize();
        });
      }
    },
    computed: {
      textStyle() {
        return (index2) => {
          const style = {};
          const customeStyle = index2 === this.innerCurrent ? this.$uv.addStyle(this.activeStyle) : this.$uv.addStyle(
            this.inactiveStyle
          );
          if (this.list[index2].disabled) {
            style.color = "#c8c9cc";
          }
          return this.$uv.deepMerge(customeStyle, style);
        };
      },
      propsBadge() {
        return uvBadgeProps;
      }
    },
    async mounted() {
      this.init();
    },
    methods: {
      setLineLeft() {
        const tabItem = this.list[this.innerCurrent];
        if (!tabItem) {
          return;
        }
        let lineOffsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => total + curr.rect.width, 0);
        const lineWidth = this.$uv.getPx(this.lineWidth);
        this.lineOffsetLeft = lineOffsetLeft + (tabItem.rect.width - lineWidth) / 2;
        if (this.firstTime) {
          setTimeout(() => {
            this.firstTime = false;
          }, 10);
        }
      },
      // nvue下设置滑块的位置
      animation(x, duration = 0) {
      },
      // 点击某一个标签
      clickHandler(item, index2) {
        this.$emit("click", {
          ...item,
          index: index2
        });
        if (item.disabled)
          return;
        this.innerCurrent = index2;
        this.resize();
        this.$emit("change", {
          ...item,
          index: index2
        });
      },
      init() {
        this.$uv.sleep().then(() => {
          this.resize();
        });
      },
      setScrollLeft() {
        const tabRect = this.list[this.innerCurrent];
        const offsetLeft = this.list.slice(0, this.innerCurrent).reduce((total, curr) => {
          return total + curr.rect.width;
        }, 0);
        const windowWidth = this.$uv.sys().windowWidth;
        let scrollLeft = offsetLeft - (this.tabsRect.width - tabRect.rect.width) / 2 - (windowWidth - this.tabsRect.right) / 2 + this.tabsRect.left / 2;
        scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width);
        this.scrollLeft = Math.max(0, scrollLeft);
      },
      // 获取所有标签的尺寸
      resize() {
        if (this.list.length === 0) {
          return;
        }
        Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(([tabsRect, itemRect = []]) => {
          this.tabsRect = tabsRect;
          this.scrollViewWidth = 0;
          itemRect.map((item, index2) => {
            this.scrollViewWidth += item.width;
            this.list[index2].rect = item;
          });
          this.setLineLeft();
          this.setScrollLeft();
        });
      },
      // 获取导航菜单的尺寸
      getTabsRect() {
        return new Promise((resolve) => {
          this.queryRect("uv-tabs__wrapper__scroll-view").then((size) => resolve(size));
        });
      },
      // 获取所有标签的尺寸
      getAllItemRect() {
        return new Promise((resolve) => {
          const promiseAllArr = this.list.map((item, index2) => this.queryRect(
            `uv-tabs__wrapper__nav__item-${index2}`,
            true
          ));
          Promise.all(promiseAllArr).then((sizes) => resolve(sizes));
        });
      },
      // 获取各个标签的尺寸
      queryRect(el, item) {
        return new Promise((resolve) => {
          this.$uvGetRect(`.${el}`).then((size) => {
            resolve(size);
          });
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_badge = resolveEasycom(vue.resolveDynamicComponent("uv-badge"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-tabs" }, [
      vue.createElementVNode("view", { class: "uv-tabs__wrapper" }, [
        vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
        vue.createElementVNode("view", { class: "uv-tabs__wrapper__scroll-view-wrapper" }, [
          vue.createElementVNode("scroll-view", {
            "scroll-x": _ctx.scrollable,
            "scroll-left": $data.scrollLeft,
            "scroll-with-animation": "",
            class: "uv-tabs__wrapper__scroll-view",
            "show-scrollbar": false,
            ref: "uv-tabs__wrapper__scroll-view"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: "uv-tabs__wrapper__nav",
                ref: "uv-tabs__wrapper__nav",
                style: vue.normalizeStyle({
                  flex: _ctx.scrollable ? "" : 1
                })
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(_ctx.list, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["uv-tabs__wrapper__nav__item", [`uv-tabs__wrapper__nav__item-${index2}`, item.disabled && "uv-tabs__wrapper__nav__item--disabled"]]),
                      key: index2,
                      onClick: ($event) => $options.clickHandler(item, index2),
                      ref_for: true,
                      ref: `uv-tabs__wrapper__nav__item-${index2}`,
                      style: vue.normalizeStyle([{ flex: _ctx.scrollable ? "" : 1 }, _ctx.$uv.addStyle(_ctx.itemStyle)])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: vue.normalizeClass([[item.disabled && "uv-tabs__wrapper__nav__item__text--disabled"], "uv-tabs__wrapper__nav__item__text"]),
                          style: vue.normalizeStyle([$options.textStyle(index2)])
                        },
                        vue.toDisplayString(item[_ctx.keyName]),
                        7
                        /* TEXT, CLASS, STYLE */
                      ),
                      vue.createVNode(_component_uv_badge, {
                        show: !!(item.badge && (item.badge.show || item.badge.isDot || item.badge.value)),
                        isDot: item.badge && item.badge.isDot || $options.propsBadge.isDot,
                        value: item.badge && item.badge.value || $options.propsBadge.value,
                        max: item.badge && item.badge.max || $options.propsBadge.max,
                        type: item.badge && item.badge.type || $options.propsBadge.type,
                        showZero: item.badge && item.badge.showZero || $options.propsBadge.showZero,
                        bgColor: item.badge && item.badge.bgColor || $options.propsBadge.bgColor,
                        color: item.badge && item.badge.color || $options.propsBadge.color,
                        shape: item.badge && item.badge.shape || $options.propsBadge.shape,
                        numberType: item.badge && item.badge.numberType || $options.propsBadge.numberType,
                        inverted: item.badge && item.badge.inverted || $options.propsBadge.inverted,
                        customStyle: "margin-left: 4px;"
                      }, null, 8, ["show", "isDot", "value", "max", "type", "showZero", "bgColor", "color", "shape", "numberType", "inverted"])
                    ], 14, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                vue.createElementVNode(
                  "view",
                  {
                    class: "uv-tabs__wrapper__nav__line",
                    ref: "uv-tabs__wrapper__nav__line",
                    style: vue.normalizeStyle([{
                      width: _ctx.$uv.addUnit(_ctx.lineWidth),
                      transform: `translate(${$data.lineOffsetLeft}px)`,
                      transitionDuration: `${$data.firstTime ? 0 : _ctx.duration}ms`,
                      height: _ctx.$uv.addUnit(_ctx.lineHeight),
                      background: _ctx.lineColor,
                      backgroundSize: _ctx.lineBgSize
                    }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ],
              4
              /* STYLE */
            )
          ], 8, ["scroll-x", "scroll-left"])
        ]),
        vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$a], ["__scopeId", "data-v-fd5fcf14"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-tabs/components/uv-tabs/uv-tabs.vue"]]);
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const props$5 = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 颜色
      color: {
        type: String,
        default: "#909193"
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: "#909193"
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: false
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: "spinner"
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: 24
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: 15
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 动画模式 https://www.runoob.com/cssref/css3-pr-animation-timing-function.html
      timingFunction: {
        type: String,
        default: "linear"
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: 1200
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: ""
      },
      ...(_t = (_s = uni.$uv) == null ? void 0 : _s.props) == null ? void 0 : _t.loadingIcon
    }
  };
  const _sfc_main$i = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$5],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-loading-icon", [_ctx.vertical && "uv-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-loading-icon__spinner", [`uv-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "uv-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-loading-icon__text",
            style: vue.normalizeStyle({
              fontSize: _ctx.$uv.addUnit(_ctx.textSize),
              color: _ctx.textColor
            })
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$9], ["__scopeId", "data-v-29b619ea"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
  const props$4 = {
    props: {
      // 轮播的长度
      length: {
        type: [String, Number],
        default: 0
      },
      // 当前处于活动状态的轮播的索引
      current: {
        type: [String, Number],
        default: 0
      },
      // 指示器非激活颜色
      indicatorActiveColor: {
        type: String,
        default: ""
      },
      // 指示器的激活颜色
      indicatorInactiveColor: {
        type: String,
        default: ""
      },
      // 指示器模式，line-线型，dot-点型
      indicatorMode: {
        type: String,
        default: ""
      },
      ...(_v = (_u = uni.$uv) == null ? void 0 : _u.props) == null ? void 0 : _v.swiperIndicator
    }
  };
  const _sfc_main$h = {
    name: "uv-swiper-indicator",
    mixins: [mpMixin, mixin, props$4],
    data() {
      return {
        lineWidth: 22
      };
    },
    computed: {
      // 指示器为线型的样式
      lineStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.lineWidth);
        style.transform = `translateX(${this.$uv.addUnit(this.current * this.lineWidth)})`;
        style.backgroundColor = this.indicatorActiveColor;
        return style;
      },
      // 指示器为点型的样式
      dotStyle() {
        return (index2) => {
          let style = {};
          style.backgroundColor = index2 === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor;
          return style;
        };
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-swiper-indicator" }, [
      _ctx.indicatorMode === "line" ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["uv-swiper-indicator__wrapper", [`uv-swiper-indicator__wrapper--${_ctx.indicatorMode}`]]),
          style: vue.normalizeStyle({
            width: _ctx.$uv.addUnit($data.lineWidth * _ctx.length),
            backgroundColor: _ctx.indicatorInactiveColor
          })
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "uv-swiper-indicator__wrapper--line__bar",
              style: vue.normalizeStyle([$options.lineStyle])
            },
            null,
            4
            /* STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      _ctx.indicatorMode === "dot" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uv-swiper-indicator__wrapper"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.length, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock(
              "view",
              {
                class: vue.normalizeClass(["uv-swiper-indicator__wrapper__dot", [index2 === _ctx.current && "uv-swiper-indicator__wrapper__dot--active"]]),
                key: index2,
                style: vue.normalizeStyle([$options.dotStyle(index2)])
              },
              null,
              6
              /* CLASS, STYLE */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$8], ["__scopeId", "data-v-09034092"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-swiper/components/uv-swiper-indicator/uv-swiper-indicator.vue"]]);
  const props$3 = {
    props: {
      // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
      list: {
        type: Array,
        default: () => []
      },
      // 是否显示面板指示器
      indicator: {
        type: Boolean,
        default: false
      },
      // 指示器非激活颜色
      indicatorActiveColor: {
        type: String,
        default: "#fff"
      },
      // 指示器的激活颜色
      indicatorInactiveColor: {
        type: String,
        default: "rgba(255, 255, 255, 0.35)"
      },
      // 指示器样式，可通过bottom，left，right进行定位
      indicatorStyle: {
        type: [String, Object],
        default: ""
      },
      // 指示器模式，line-线型，dot-点型
      indicatorMode: {
        type: String,
        default: "line"
      },
      // 是否自动切换
      autoplay: {
        type: Boolean,
        default: true
      },
      // 当前所在滑块的 index
      current: {
        type: [String, Number],
        default: 0
      },
      // 当前所在滑块的 item-id ，不能与 current 被同时指定
      currentItemId: {
        type: String,
        default: ""
      },
      // 滑块自动切换时间间隔
      interval: {
        type: [String, Number],
        default: 3e3
      },
      // 滑块切换过程所需时间
      duration: {
        type: [String, Number],
        default: 300
      },
      // 播放到末尾后是否重新回到开头
      circular: {
        type: Boolean,
        default: false
      },
      // 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
      previousMargin: {
        type: [String, Number],
        default: 0
      },
      // 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
      nextMargin: {
        type: [String, Number],
        default: 0
      },
      // 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
      acceleration: {
        type: Boolean,
        default: false
      },
      // 同时显示的滑块数量，nvue、支付宝小程序不支持
      displayMultipleItems: {
        type: Number,
        default: 1
      },
      // 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
      // 只对微信小程序有效
      easingFunction: {
        type: String,
        default: "default"
      },
      // list数组中指定对象的目标属性名
      keyName: {
        type: String,
        default: "url"
      },
      // 图片的裁剪模式
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      // 组件高度
      height: {
        type: [String, Number],
        default: 130
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#f3f4f6"
      },
      // 组件圆角，数值或带单位的字符串
      radius: {
        type: [String, Number],
        default: 4
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 是否显示标题，要求数组对象中有title属性
      showTitle: {
        type: Boolean,
        default: false
      },
      ...(_x = (_w = uni.$uv) == null ? void 0 : _w.props) == null ? void 0 : _x.swiper
    }
  };
  const _sfc_main$g = {
    name: "uv-swiper",
    mixins: [mpMixin, mixin, props$3],
    emits: ["click", "change"],
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current(val, preVal) {
        if (val === preVal)
          return;
        this.currentIndex = val;
      }
    },
    computed: {
      itemStyle() {
        return (index2) => {
          const style = {};
          if (this.nextMargin && this.previousMargin) {
            style.borderRadius = this.$uv.addUnit(this.radius);
            if (index2 !== this.currentIndex)
              style.transform = "scale(0.92)";
          }
          return style;
        };
      }
    },
    methods: {
      getItemType(item) {
        if (typeof item === "string")
          return this.$uv.test.video(this.getSource(item)) ? "video" : "image";
        if (typeof item === "object" && this.keyName) {
          if (!item.type)
            return this.$uv.test.video(this.getSource(item)) ? "video" : "image";
          if (item.type === "image")
            return "image";
          if (item.type === "video")
            return "video";
          return "image";
        }
      },
      // 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
      getSource(item) {
        if (typeof item === "string")
          return item;
        if (typeof item === "object" && this.keyName)
          return item[this.keyName];
        else
          this.$uv.error("请按格式传递列表参数");
        return "";
      },
      // 轮播切换事件
      change(e) {
        const {
          current
        } = e.detail;
        this.pauseVideo(this.currentIndex);
        this.currentIndex = current;
        this.$emit("change", e.detail);
      },
      // 切换轮播时，暂停视频播放
      pauseVideo(index2) {
        const lastItem = this.getSource(this.list[index2]);
        if (this.$uv.test.video(lastItem)) {
          const video2 = uni.createVideoContext(`video-${index2}`, this);
          video2.pause();
        }
      },
      // 当一个轮播item为视频时，获取它的视频海报
      getPoster(item) {
        return typeof item === "object" && item.poster ? item.poster : "";
      },
      // 点击某个item
      clickHandler(index2) {
        this.$emit("click", index2);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$3);
    const _component_uv_swiper_indicator = resolveEasycom(vue.resolveDynamicComponent("uv-swiper-indicator"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-swiper",
        style: vue.normalizeStyle({
          backgroundColor: _ctx.bgColor,
          height: _ctx.$uv.addUnit(_ctx.height),
          borderRadius: _ctx.$uv.addUnit(_ctx.radius)
        })
      },
      [
        _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uv-swiper__loading"
        }, [
          vue.createVNode(_component_uv_loading_icon, { mode: "circle" })
        ])) : (vue.openBlock(), vue.createElementBlock("swiper", {
          key: 1,
          class: "uv-swiper__wrapper",
          style: vue.normalizeStyle({
            height: _ctx.$uv.addUnit(_ctx.height),
            flex: 1
          }),
          onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
          circular: _ctx.circular,
          interval: _ctx.interval,
          duration: _ctx.duration,
          autoplay: _ctx.autoplay,
          current: _ctx.current,
          currentItemId: _ctx.currentItemId,
          previousMargin: _ctx.$uv.addUnit(_ctx.previousMargin),
          nextMargin: _ctx.$uv.addUnit(_ctx.nextMargin),
          acceleration: _ctx.acceleration,
          displayMultipleItems: _ctx.displayMultipleItems,
          easingFunction: _ctx.easingFunction
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.list, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                class: "uv-swiper__wrapper__item",
                key: index2
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "uv-swiper__wrapper__item__wrapper",
                    style: vue.normalizeStyle([$options.itemStyle(index2)])
                  },
                  [
                    vue.createCommentVNode(" 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 "),
                    $options.getItemType(item) === "image" ? (vue.openBlock(), vue.createElementBlock("image", {
                      key: 0,
                      class: "uv-swiper__wrapper__item__wrapper__image",
                      src: $options.getSource(item),
                      mode: _ctx.imgMode,
                      onClick: ($event) => $options.clickHandler(index2),
                      style: vue.normalizeStyle({
                        height: _ctx.$uv.addUnit(_ctx.height),
                        borderRadius: _ctx.$uv.addUnit(_ctx.radius)
                      })
                    }, null, 12, ["src", "mode", "onClick"])) : vue.createCommentVNode("v-if", true),
                    $options.getItemType(item) === "video" ? (vue.openBlock(), vue.createElementBlock("video", {
                      key: 1,
                      class: "uv-swiper__wrapper__item__wrapper__video",
                      id: `video-${index2}`,
                      "enable-progress-gesture": false,
                      src: $options.getSource(item),
                      poster: $options.getPoster(item),
                      title: _ctx.showTitle && _ctx.$uv.test.object(item) && item.title ? item.title : "",
                      style: vue.normalizeStyle({
                        height: _ctx.$uv.addUnit(_ctx.height)
                      }),
                      controls: "",
                      onClick: ($event) => $options.clickHandler(index2)
                    }, null, 12, ["id", "src", "poster", "title", "onClick"])) : vue.createCommentVNode("v-if", true),
                    _ctx.showTitle && _ctx.$uv.test.object(item) && item.title && _ctx.$uv.test.image($options.getSource(item)) ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 2,
                        class: "uv-swiper__wrapper__item__wrapper__title uv-line-1"
                      },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  4
                  /* STYLE */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 44, ["circular", "interval", "duration", "autoplay", "current", "currentItemId", "previousMargin", "nextMargin", "acceleration", "displayMultipleItems", "easingFunction"])),
        vue.createElementVNode(
          "view",
          {
            class: "uv-swiper__indicator",
            style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.indicatorStyle)])
          },
          [
            vue.renderSlot(_ctx.$slots, "indicator", {}, () => [
              !_ctx.loading && _ctx.indicator && !_ctx.showTitle ? (vue.openBlock(), vue.createBlock(_component_uv_swiper_indicator, {
                key: 0,
                indicatorActiveColor: _ctx.indicatorActiveColor,
                indicatorInactiveColor: _ctx.indicatorInactiveColor,
                length: _ctx.list.length,
                current: $data.currentIndex,
                indicatorMode: _ctx.indicatorMode
              }, null, 8, ["indicatorActiveColor", "indicatorInactiveColor", "length", "current", "indicatorMode"])) : vue.createCommentVNode("v-if", true)
            ], true)
          ],
          4
          /* STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$7], ["__scopeId", "data-v-7522af0b"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-swiper/components/uv-swiper/uv-swiper.vue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "mxio-scroll-x",
    props: {
      barWidth: { type: Number, required: false, default: 80 },
      barColor: { type: String, required: false, default: "#42b883" },
      barBackground: { type: String, required: false, default: "#ccc" },
      barShow: { type: Boolean, required: false, default: true },
      dataSource: { type: Array, required: false, default: () => [] },
      column: { type: Number, required: false, default: 5 },
      colList: { type: Number, required: false, default: 5 },
      imgMode: { type: String, required: false, default: "scaleToFill" }
    },
    emits: ["scrollItemEmitsClick"],
    setup(__props, { emit: emits }) {
      const props2 = __props;
      vue.useCssVars((_ctx) => ({
        "7aa1eedb-colList": vue.unref(colList),
        "7aa1eedb-scrollColumnWidth": scrollColumnWidth.value,
        "7aa1eedb-barWidthRpx": barWidthRpx,
        "7aa1eedb-barBackground": vue.unref(barBackground),
        "7aa1eedb-barWidthHalfRpx": barWidthHalfRpx,
        "7aa1eedb-barColor": vue.unref(barColor)
      }));
      const barBackground = props2.barBackground;
      const barColor = props2.barColor;
      const barWidthPx = uni.upx2px(props2.barWidth);
      const barWidthHalfCopy = barWidthPx / 2;
      const barWidthRpx = barWidthPx + "px";
      const barWidthHalfRpx = barWidthHalfCopy + "px";
      let dataSourceLen = props2.dataSource.length;
      let colList = 0;
      if (!dataSourceLen) {
        colList = props2.colList;
      } else {
        colList = props2.colList > dataSourceLen ? dataSourceLen : props2.colList;
      }
      let scrollInnerWidth = 0;
      const scrollColumnWidth = vue.ref("0px");
      vue.ref(null);
      const getCurrentInstanceComputed = vue.computed(() => vue.getCurrentInstance());
      const scrollViewDOM = () => {
        return new Promise((resolve) => {
          const query = uni.createSelectorQuery().in(getCurrentInstanceComputed.value);
          query.select(".mxio-scrollx-box-grid").boundingClientRect((data) => {
            resolve(data);
          }).exec();
        });
      };
      const scrollViewDOMCal = async () => {
        let p = await scrollViewDOM();
        scrollInnerWidth = p.width;
        let column = props2.column <= 0 ? 5 : props2.column;
        scrollColumnWidth.value = scrollInnerWidth / column + "px";
      };
      vue.onMounted(() => {
        scrollViewDOMCal();
      });
      const scrollViewLeft = vue.ref(0);
      const scroll = (e) => {
        let scrollLeft = e.detail.scrollLeft;
        let scrollWidth = e.detail.scrollWidth;
        let scrollItem = scrollWidth - scrollInnerWidth;
        let scrollItemCal = scrollLeft / scrollItem;
        let nowLeft = scrollItemCal * barWidthHalfCopy;
        if (scrollLeft <= 0)
          nowLeft = 0;
        scrollViewLeft.value = nowLeft;
      };
      const scrollItemClick = (item, index2, obj) => {
        emits("scrollItemEmitsClick", item, index2, obj);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "mxio-scrollx-warpper" }, [
          vue.createElementVNode(
            "scroll-view",
            {
              class: "mxio-scrollx-box",
              "scroll-x": "true",
              onScroll: scroll,
              "scroll-left": "0"
            },
            [
              vue.createElementVNode("view", { class: "mxio-scrollx-box-grid" }, [
                __props.dataSource.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  vue.renderList(__props.dataSource, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index2,
                      class: "mxio-scrollx-box-grid_item",
                      onClick: vue.withModifiers(($event) => scrollItemClick(item, index2, __props.dataSource), ["stop"])
                    }, [
                      vue.createElementVNode("image", {
                        src: item.icon,
                        mode: __props.imgMode,
                        class: "mxio-scrollx-box-grid_img"
                      }, null, 8, ["src", "mode"]),
                      vue.createElementVNode(
                        "view",
                        { class: "mxio-scrollx-box-grid_txt" },
                        vue.toDisplayString(item.label),
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
              ])
            ],
            32
            /* HYDRATE_EVENTS */
          ),
          __props.barShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "mxio-scrollx-bar-box"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: "mxio-scrollx-bar-item",
                style: vue.normalizeStyle({
                  transform: `translateX(${scrollViewLeft.value}px)`
                })
              },
              [
                vue.createElementVNode("view", { class: "mxio-scrollx-bar-item_H" })
              ],
              4
              /* STYLE */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-7aa1eedb"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/mxio-scroll-x/components/mxio-scroll-x/mxio-scroll-x.vue"]]);
  const _sfc_main$e = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        // 内容区域是否通栏
        type: Boolean,
        default: false
      },
      isShadow: {
        // 是否开启阴影
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type) {
        this.$emit("click", type);
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
        style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
      },
      [
        vue.createCommentVNode(" 封面 "),
        vue.renderSlot(_ctx.$slots, "cover", {}, () => [
          $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__cover"
          }, [
            vue.createElementVNode("image", {
              class: "uni-card__cover-image",
              mode: "widthFix",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
              src: $props.cover
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__header"
          }, [
            vue.createCommentVNode(" 卡片标题 "),
            vue.createElementVNode("view", {
              class: "uni-card__header-box",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
            }, [
              $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-card__header-avatar"
              }, [
                vue.createElementVNode("image", {
                  class: "uni-card__header-avatar-image",
                  src: $props.thumbnail,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "uni-card__header-content" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-card__header-content-title uni-ellipsis" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-card__header-content-subtitle uni-ellipsis"
                  },
                  vue.toDisplayString($props.subTitle),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("view", {
              class: "uni-card__header-extra",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-card__header-extra-text" },
                vue.toDisplayString($props.extra),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.createCommentVNode(" 卡片内容 "),
        vue.createElementVNode(
          "view",
          {
            class: "uni-card__content",
            style: vue.normalizeStyle({ padding: $props.padding }),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "uni-card__actions",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
        }, [
          vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$6], ["__scopeId", "data-v-ae4bee67"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const props$2 = {
    props: {
      // item标签的名称，作为与uv-tabbar的value参数匹配的标识符
      name: {
        type: [String, Number, null],
        default: null
      },
      // uv-ui内置图标或者绝对路径的图片
      icon: {
        icon: String,
        default: ""
      },
      // 右上角的角标提示信息
      badge: {
        type: [String, Number, null],
        default: null
      },
      // 是否显示圆点，将会覆盖badge参数
      dot: {
        type: Boolean,
        default: false
      },
      // 描述文本
      text: {
        type: String,
        default: ""
      },
      // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
      badgeStyle: {
        type: [Object, String],
        default: "top: 6px;right:2px;"
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.tabbarItem
    }
  };
  const _sfc_main$d = {
    name: "uv-tabbar-item",
    mixins: [mpMixin, mixin, props$2],
    emits: ["click", "change"],
    data() {
      return {
        isActive: false,
        // 是否处于激活状态
        parentData: {
          value: null,
          activeColor: "",
          inactiveColor: ""
        }
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.updateParentData();
        if (!this.parent) {
          this.$uv.error("uv-tabbar-item必须搭配uv-tabbar组件使用");
        }
        const index2 = this.parent.children.indexOf(this);
        this.isActive = (this.name || index2) === this.parentData.value;
      },
      updateParentData() {
        this.getParentData("uv-tabbar");
      },
      // 此方法将会被父组件uv-tabbar调用
      updateFromParent() {
        this.init();
      },
      clickHandler() {
        this.$nextTick(() => {
          const index2 = this.parent.children.indexOf(this);
          const name = this.name || index2;
          if (name !== this.parent.value) {
            this.parent.$emit("change", name);
          }
          this.$emit("click", name);
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$5);
    const _component_uv_badge = resolveEasycom(vue.resolveDynamicComponent("uv-badge"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-tabbar-item",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.createElementVNode("view", { class: "uv-tabbar-item__icon" }, [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: _ctx.icon,
            color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor,
            size: 20
          }, null, 8, ["name", "color"])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              $data.isActive ? vue.renderSlot(_ctx.$slots, "active-icon", { key: 0 }, void 0, true) : vue.renderSlot(_ctx.$slots, "inactive-icon", { key: 1 }, void 0, true)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createVNode(_component_uv_badge, {
            absolute: "",
            offset: [0, _ctx.dot ? "34rpx" : _ctx.badge > 9 ? "14rpx" : "20rpx"],
            customStyle: _ctx.badgeStyle,
            isDot: _ctx.dot,
            value: _ctx.badge || (_ctx.dot ? 1 : null),
            show: _ctx.dot || _ctx.badge > 0
          }, null, 8, ["offset", "customStyle", "isDot", "value", "show"])
        ]),
        vue.renderSlot(_ctx.$slots, "text", {}, () => [
          vue.createElementVNode(
            "text",
            {
              class: "uv-tabbar-item__text",
              style: vue.normalizeStyle({
                color: $data.isActive ? $data.parentData.activeColor : $data.parentData.inactiveColor
              })
            },
            vue.toDisplayString(_ctx.text),
            5
            /* TEXT, STYLE */
          )
        ], true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$5], ["__scopeId", "data-v-f9097980"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.vue"]]);
  const _sfc_main$c = {
    name: "uv-safe-bottom",
    mixins: [mpMixin, mixin],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-safe-bottom", [!$data.isNvue && "uv-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$4], ["__scopeId", "data-v-560f16b2"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-safe-bottom/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
  const props$1 = {
    props: {
      // 当前匹配项的name
      value: {
        type: [String, Number, null],
        default: null
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否显示上方边框
      border: {
        type: Boolean,
        default: true
      },
      // 元素层级z-index
      zIndex: {
        type: [String, Number],
        default: 9
      },
      // 选中标签的颜色
      activeColor: {
        type: String,
        default: "#1989fa"
      },
      // 未选中标签的颜色
      inactiveColor: {
        type: String,
        default: "#7d7e80"
      },
      // 是否固定在底部
      fixed: {
        type: Boolean,
        default: true
      },
      // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
      placeholder: {
        type: Boolean,
        default: true
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.tabbar
    }
  };
  const _sfc_main$b = {
    name: "uv-tabbar",
    mixins: [mpMixin, mixin, props$1],
    data() {
      return {
        placeholderHeight: 0
      };
    },
    computed: {
      tabbarStyle() {
        const style = {
          zIndex: this.zIndex
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 监听多个参数的变化，通过在computed执行对应的操作
      updateChild() {
        return [this.value, this.activeColor, this.inactiveColor];
      },
      updatePlaceholder() {
        return [this.fixed, this.placeholder];
      }
    },
    watch: {
      updateChild() {
        this.updateChildren();
      },
      updatePlaceholder() {
        this.setPlaceholderHeight();
      }
    },
    created() {
      this.children = [];
    },
    mounted() {
      this.setPlaceholderHeight();
    },
    methods: {
      updateChildren() {
        this.children.length && this.children.map((child) => child.updateFromParent());
      },
      // 设置用于防止塌陷元素的高度
      async setPlaceholderHeight() {
        if (!this.fixed || !this.placeholder)
          return;
        await this.$uv.sleep(20);
        this.$uvGetRect(".uv-tabbar__content").then(({ height = 50 }) => {
          this.placeholderHeight = height;
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-tabbar" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uv-tabbar__content", [_ctx.border && "uv-border-top", _ctx.fixed && "uv-tabbar--fixed"]]),
          ref: "uv-tabbar__content",
          onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.noop && _ctx.noop(...args), ["stop", "prevent"])),
          style: vue.normalizeStyle([$options.tabbarStyle])
        },
        [
          vue.createElementVNode("view", { class: "uv-tabbar__content__item-wrapper" }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _ctx.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_uv_safe_bottom, { key: 0 })) : vue.createCommentVNode("v-if", true)
        ],
        38
        /* CLASS, STYLE, HYDRATE_EVENTS */
      ),
      _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "uv-tabbar__placeholder",
          style: vue.normalizeStyle({
            height: $data.placeholderHeight + "px"
          })
        },
        null,
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_9 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$3], ["__scopeId", "data-v-cae58123"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.vue"]]);
  const _sfc_main$a = {
    __name: "index",
    setup(__props) {
      const avatar = "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png";
      const barHeight = vue.ref(0);
      const userAvatar = vue.reactive({
        src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
        text: "无头像"
      });
      const list1 = [{
        name: "关注"
      }, {
        name: "推荐"
      }, {
        name: "电影"
      }, {
        name: "科技"
      }, {
        name: "音乐"
      }, {
        name: "美食"
      }, {
        name: "文化"
      }, {
        name: "财经"
      }, {
        name: "手工"
      }, {
        name: "关注"
      }, {
        name: "推荐"
      }, {
        name: "电影"
      }, {
        name: "科技"
      }, {
        name: "音乐"
      }, {
        name: "美食"
      }, {
        name: "文化"
      }, {
        name: "财经"
      }, {
        name: "手工"
      }];
      const list2 = [
        {
          image: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
          title: "昨夜星辰昨夜风，画楼西畔桂堂东"
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
          title: "身无彩凤双飞翼，心有灵犀一点通"
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
          title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳"
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
          title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳"
        }
      ];
      const articleTestList = [
        {
          userName: "小鲨鲨",
          phoneName: "小米",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }, {
            src: "../../static/bg1.jpg"
          }, {
            src: "../../static/bg1.jpg"
          }]
        },
        {
          userName: "小呆呆",
          phoneName: "华为",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }]
        },
        {
          userName: "霸气哥哥",
          phoneName: "iqoo10",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }]
        },
        {
          userName: "嘻嘻",
          phoneName: "vivo",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }]
        },
        {
          userName: "小呆呆",
          phoneName: "华为",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }]
        }
      ];
      const dataSource = [
        {
          label: "信科院",
          // 文本
          icon: "../../static/images/academy/xinke.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 1
        },
        {
          label: "农学院",
          // 文本
          icon: "../../static/images/academy/nongxue.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 2
        },
        {
          label: "机电院",
          // 文本
          icon: "../../static/images/academy/jidian.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 3
        },
        {
          label: "体院",
          // 文本
          icon: "../../static/images/academy/tiyu.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 4
        },
        {
          label: "水土院",
          // 文本
          icon: "../../static/images/academy/tumu.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 5
        },
        {
          label: "景艺院",
          // 文本
          icon: "../../static/images/academy/jingyi.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 6
        },
        {
          label: "园艺院",
          // 文本
          icon: "../../static/images/academy/yuanyi.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 7
        },
        {
          label: "水产院",
          // 文本
          icon: "../../static/images/academy/shuichan.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 8
        },
        {
          label: "动医院",
          // 文本
          icon: "../../static/images/academy/dongyi.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 9
        },
        {
          label: "经济院",
          // 文本
          icon: "../../static/images/academy/jingji.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 10
        },
        {
          label: "马克思院",
          // 文本
          icon: "../../static/images/academy/makesi.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 11
        },
        {
          label: "商学院",
          // 文本
          icon: "../../static/images/academy/shangxue.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 12
        },
        {
          label: "资环院",
          // 文本
          icon: "../../static/images/academy/zihuan.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 13
        },
        {
          label: "化材院",
          // 文本
          icon: "../../static/images/academy/huacai.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 14
        },
        {
          label: "生科院",
          // 文本
          icon: "../../static/images/academy/shengke.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 15
        },
        {
          label: "食科院",
          // 文本
          icon: "../../static/images/academy/shike.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 16
        },
        {
          label: "人外院",
          // 文本
          icon: "../../static/images/academy/renwai.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 17
        },
        {
          label: "植保院",
          // 文本
          icon: "../../static/images/academy/zhibao.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 18
        },
        {
          label: "公法院",
          // 文本
          icon: "../../static/images/academy/gongfa.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 19
        },
        {
          label: "教育院",
          // 文本
          icon: "../../static/images/academy/jiaoyu.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 20
        },
        {
          label: "动科院",
          // 文本
          icon: "../../static/images/academy/dongke.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 21
        },
        {
          label: "东方科技学院",
          // 文本
          icon: "../../static/images/academy/dongfang.png",
          // 图标 ，默认image标签，使用slot可自定义
          id: 22
        }
      ];
      const click = (item) => {
        formatAppLog("log", "at pages/index/index.vue:350", "item", item);
      };
      const scrollItemEmitsClick = (item, index2, array2) => {
        formatAppLog("log", "at pages/index/index.vue:354", item);
      };
      onShow(() => {
        barHeight.value = uni.getSystemInfoSync().statusBarHeight;
      });
      return (_ctx, _cache) => {
        const _component_uv_sticky = resolveEasycom(vue.resolveDynamicComponent("uv-sticky"), __easycom_0$6);
        const _component_uv_avatar = resolveEasycom(vue.resolveDynamicComponent("uv-avatar"), __easycom_1$2);
        const _component_uv_search = resolveEasycom(vue.resolveDynamicComponent("uv-search"), __easycom_2);
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
        const _component_uv_tabs = resolveEasycom(vue.resolveDynamicComponent("uv-tabs"), __easycom_4);
        const _component_uv_swiper = resolveEasycom(vue.resolveDynamicComponent("uv-swiper"), __easycom_5);
        const _component_mxio_scroll_x = resolveEasycom(vue.resolveDynamicComponent("mxio-scroll-x"), __easycom_6);
        const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_7);
        const _component_uv_tabbar_item = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar-item"), __easycom_8);
        const _component_uv_tabbar = resolveEasycom(vue.resolveDynamicComponent("uv-tabbar"), __easycom_9);
        return vue.openBlock(), vue.createElementBlock("view", { class: "index-body" }, [
          vue.createVNode(_component_uv_sticky, null, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: "content",
                  style: vue.normalizeStyle({ "height": barHeight.value + "px" })
                },
                null,
                4
                /* STYLE */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "container" }, [
            vue.createElementVNode("view", { class: "navbar" }, [
              vue.createElementVNode("view", { class: "avatar-box" }, [
                vue.createCommentVNode(' :text="userAvatar.text" 绑定text优先使用text '),
                vue.createVNode(_component_uv_avatar, {
                  src: userAvatar.src,
                  size: "30"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "search-box" }, [
                vue.createVNode(_component_uv_search, {
                  disabled: true,
                  showAction: false,
                  shape: "round"
                })
              ]),
              vue.createElementVNode("view", { class: "notification-box" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "notification",
                  size: "30"
                })
              ])
            ]),
            vue.createVNode(_component_uv_sticky, { "offset-top": barHeight.value }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "tabs-box" }, [
                  vue.createVNode(_component_uv_tabs, {
                    list: list1,
                    onClick: click,
                    lineColor: "var(--line-color)",
                    activeStyle: {
                      color: "var(--text-active-color)",
                      fontWeight: "bold",
                      transform: "scale(1.05)"
                    },
                    inactiveStyle: {
                      color: "var(--text-inactive-color)",
                      transform: "scale(1)"
                    },
                    itemStyle: "padding-left: 15px; padding-right: 15px; height: 34px;"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(">")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["activeStyle", "inactiveStyle"])
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["offset-top"]),
            vue.createElementVNode("view", { class: "swiper-container" }, [
              vue.createVNode(_component_uv_swiper, {
                list: list2,
                height: "200",
                indicator: "",
                previousMargin: "30",
                nextMargin: "30",
                showTitle: "",
                bgColor: "#fff",
                radius: "5",
                "key-name": "image",
                circular: ""
              })
            ]),
            vue.createElementVNode("view", { class: "scroll-box" }, [
              vue.createVNode(_component_mxio_scroll_x, {
                dataSource,
                barWidth: _ctx.barWidth,
                colList: 11,
                column: 5,
                barShow: _ctx.barShow,
                onScrollItemEmitsClick: scrollItemEmitsClick
              }, null, 8, ["barWidth", "barShow"])
            ]),
            vue.createElementVNode("view", { class: "card-items-container" }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(articleTestList, (item, index2) => {
                  return vue.createElementVNode("view", { class: "card-item" }, [
                    vue.createVNode(_component_uni_card, {
                      title: item.userName,
                      "sub-title": `来自 📱${item.phoneName}`,
                      extra: "额外信息",
                      thumbnail: avatar,
                      onClick: _ctx.onClick
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "card-body" }, [
                          vue.createElementVNode("view", { class: "" }, [
                            vue.createElementVNode("text", { class: "uni-body" }, "这是一个带封面和操作栏的卡片示例，此示例展示了封面插槽和操作栏插槽的用法。")
                          ]),
                          vue.createElementVNode("view", { class: "image-box" }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(item.imgSrcs, (imgItem) => {
                                return vue.openBlock(), vue.createElementBlock("view", { class: "image-box-container" }, [
                                  vue.createElementVNode("image", {
                                    src: imgItem.src,
                                    style: { "width": "100%", "height": "100%" }
                                  }, null, 8, ["src"])
                                ]);
                              }),
                              256
                              /* UNKEYED_FRAGMENT */
                            ))
                          ]),
                          vue.createElementVNode("view", {
                            slot: "actions",
                            class: "card-actions"
                          }, [
                            vue.createElementVNode("view", {
                              class: "card-actions-item",
                              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.actionsClick("分享"))
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "pengyouquan",
                                size: "18",
                                color: "#999"
                              }),
                              vue.createElementVNode("text", { class: "card-actions-item-text" }, "分享")
                            ]),
                            vue.createElementVNode("view", {
                              class: "card-actions-item",
                              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.actionsClick("点赞"))
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "heart",
                                size: "18",
                                color: "#999"
                              }),
                              vue.createElementVNode("text", { class: "card-actions-item-text" }, "点赞")
                            ]),
                            vue.createElementVNode("view", {
                              class: "card-actions-item",
                              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.actionsClick("评论"))
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "chatbubble",
                                size: "18",
                                color: "#999"
                              }),
                              vue.createElementVNode("text", { class: "card-actions-item-text" }, "评论")
                            ])
                          ])
                        ])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["title", "sub-title", "onClick"])
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ]),
          vue.createVNode(_component_uv_tabbar, {
            value: _ctx.value6,
            onChange: _cache[3] || (_cache[3] = (name) => _ctx.value6 = name),
            fixed: true,
            placeholder: true,
            safeAreaInsetBottom: true
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uv_tabbar_item, {
                text: "首页",
                icon: "home"
              }),
              vue.createVNode(_component_uv_tabbar_item, {
                text: "放映厅",
                icon: "photo"
              }),
              vue.createVNode(_component_uv_tabbar_item, {
                text: "直播",
                icon: "play-right"
              }),
              vue.createVNode(_component_uv_tabbar_item, {
                text: "我的",
                icon: "account"
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["value"])
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/index/index.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$9 = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change", "keyboardheightchange"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value2 = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value2 = this.trimStr(value2);
          }
          if (typeof this.trim === "string") {
            value2 = this.trimStr(value2, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value2;
        this.$emit("input", value2);
        this.$emit("update:modelValue", value2);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("focus", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$4);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$2], ["__scopeId", "data-v-09fd5285"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$8 = {
    __name: "login",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "login-body" }, [
          vue.createElementVNode("view", { class: "container" }, [
            vue.createElementVNode("view", { class: "login-title" }, [
              vue.createElementVNode("text", null, "Hello!"),
              vue.createElementVNode("text", null, "Welcome Back")
            ]),
            vue.createElementVNode("view", { class: "login-table" }, [
              vue.createElementVNode("view", { class: "login-info" }, [
                vue.createElementVNode("view", { class: "login-username" }, [
                  vue.createElementVNode("text", null, "账号"),
                  vue.createElementVNode("view", { class: "username-input" }, [
                    vue.createVNode(_component_uni_easyinput, {
                      class: "uni-mt-5",
                      primaryColor: borderColor,
                      trim: "all",
                      modelValue: _ctx.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value = $event),
                      placeholder: "请输入账号",
                      onInput: _ctx.input
                    }, null, 8, ["modelValue", "onInput"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "login-passwd" }, [
                  vue.createElementVNode("text", null, "密码"),
                  vue.createElementVNode("view", { class: "passwd-input" }, [
                    vue.createVNode(_component_uni_easyinput, {
                      type: "password",
                      primaryColor: borderColor,
                      modelValue: _ctx.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.password = $event),
                      placeholder: "请输入密码"
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "login-checkboxs" }, [
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("checkbox", {
                      value: "cb",
                      checked: "true",
                      color: "#42b883",
                      style: { "transform": "scale(0.7)" }
                    }),
                    vue.createElementVNode("text", null, "记住我")
                  ]),
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("text", null, "忘记密码?")
                  ])
                ]),
                vue.createElementVNode("view", { class: "login-btn" }, [
                  vue.createElementVNode("button", { "hover-class": "checkActive" }, "登录")
                ]),
                vue.createElementVNode("view", { class: "dividing-line" }, [
                  vue.createElementVNode("view", { class: "line-text" }, [
                    vue.createElementVNode("text", null, "Or")
                  ])
                ]),
                vue.createElementVNode("view", { class: "platforms-box" }, [
                  vue.createElementVNode("view", { class: "qq-box" }, [
                    vue.createElementVNode("button", null, [
                      vue.createElementVNode("image", {
                        src: "/static/images/qq.svg",
                        mode: "heightFix"
                      }),
                      vue.createTextVNode("qq登录")
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "weChat-box" }, [
                    vue.createElementVNode("button", null, [
                      vue.createElementVNode("image", {
                        src: "/static/images/wechat.svg",
                        mode: "heightFix"
                      }),
                      vue.createTextVNode("微信登录")
                    ])
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "login-footer" }, [
              vue.createElementVNode("text", null, "没有账号?"),
              vue.createElementVNode("a", { href: "#" }, "立即注册!")
            ])
          ])
        ]);
      };
    }
  };
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/login/login.vue"]]);
  const _sfc_main$7 = {
    __name: "changepassword",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "changepwd-body" }, [
          vue.createElementVNode("view", { class: "container" }, [
            vue.createElementVNode("view", { class: "changepwd-box" }, [
              vue.createElementVNode("view", { class: "changepwd-title" }, [
                vue.createElementVNode("text", null, "Create password"),
                vue.createElementVNode("text", { class: "contain" }, "Enter the email associated with your account and we’ll send an email with code to reset your password.")
              ]),
              vue.createElementVNode("view", { class: "changepwd-table" }, [
                vue.createElementVNode("view", { class: "changepwd-info" }, [
                  vue.createElementVNode("view", { class: "changepwd-username" }, [
                    vue.createElementVNode("text", null, "密码"),
                    vue.createElementVNode("view", { class: "username-input" }, [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "uni-mt-5",
                        primaryColor: borderColor,
                        type: "password",
                        trim: "all",
                        modelValue: _ctx.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value = $event),
                        placeholder: "请输入原密码",
                        onInput: _ctx.input
                      }, null, 8, ["modelValue", "onInput"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "changepwd-passwd" }, [
                    vue.createElementVNode("text", null, "新密码"),
                    vue.createElementVNode("view", { class: "passwd-input" }, [
                      vue.createVNode(_component_uni_easyinput, {
                        type: "password",
                        primaryColor: borderColor,
                        modelValue: _ctx.password,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.password = $event),
                        placeholder: "请输入新密码"
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "changepwd-repasswd" }, [
                    vue.createElementVNode("text", null, "确认新密码"),
                    vue.createElementVNode("view", { class: "passwd-input" }, [
                      vue.createVNode(_component_uni_easyinput, {
                        type: "password",
                        primaryColor: borderColor,
                        modelValue: _ctx.password,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.password = $event),
                        placeholder: "请确认新密码"
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "conditions" }, [
                    vue.createElementVNode("view", { class: "conditions-1" }, [
                      vue.createElementVNode("image", {
                        src: "/static/images/勾.svg",
                        mode: "heightFix"
                      }),
                      vue.createElementVNode("text", null, "8 to 20 strong characters")
                    ]),
                    vue.createElementVNode("view", { class: "conditions-2" }, [
                      vue.createElementVNode("image", {
                        src: "/static/images/叉.svg",
                        mode: "heightFix"
                      }),
                      vue.createElementVNode("text", null, "Strong letters, numbers, and special characters")
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "changepwd-btn" }, [
                    vue.createElementVNode("button", { "hover-class": "checkActive" }, "修改密码")
                  ])
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesChangepasswordChangepassword = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-6f27b6e7"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/changepassword.vue"]]);
  const _sfc_main$6 = {
    __name: "changepasswdbyphone",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "changepwd-body" }, [
          vue.createElementVNode("view", { class: "container" }, [
            vue.createElementVNode("view", { class: "changepwd-title" }, [
              vue.createElementVNode("text", null, "Confirm"),
              vue.createElementVNode("text", null, "Your Phone number")
            ]),
            vue.createElementVNode("view", { class: "changepwd-table" }, [
              vue.createElementVNode("view", { class: "changepwd-info" }, [
                vue.createElementVNode("view", { class: "changepwd-username" }, [
                  vue.createElementVNode("text", null, "手机号"),
                  vue.createElementVNode("view", { class: "username-input" }, [
                    vue.createVNode(_component_uni_easyinput, {
                      class: "uni-mt-5",
                      primaryColor: borderColor,
                      trim: "all",
                      modelValue: _ctx.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value = $event),
                      placeholder: "请输入手机号",
                      onInput: _ctx.input
                    }, null, 8, ["modelValue", "onInput"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "changepwd-btn" }, [
                  vue.createElementVNode("button", { "hover-class": "checkActive" }, "发送验证码")
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesChangepasswordChangepasswdbyphone = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e0d80887"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/changepasswdbyphone.vue"]]);
  const _sfc_main$5 = {
    __name: "changepwdemail",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "changepwd-body" }, [
          vue.createElementVNode("view", { class: "container" }, [
            vue.createElementVNode("view", { class: "changepwd-title" }, [
              vue.createElementVNode("text", null, "Confirm"),
              vue.createElementVNode("text", null, "Your Email")
            ]),
            vue.createElementVNode("view", { class: "changepwd-table" }, [
              vue.createElementVNode("view", { class: "changepwd-info" }, [
                vue.createElementVNode("view", { class: "changepwd-username" }, [
                  vue.createElementVNode("text", null, "邮箱号"),
                  vue.createElementVNode("view", { class: "username-input" }, [
                    vue.createVNode(_component_uni_easyinput, {
                      class: "uni-mt-5",
                      primaryColor: borderColor,
                      trim: "all",
                      modelValue: _ctx.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value = $event),
                      placeholder: "请输入邮箱号",
                      onInput: _ctx.input
                    }, null, 8, ["modelValue", "onInput"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "changepwd-btn" }, [
                  vue.createElementVNode("button", { "hover-class": "checkActive" }, "发送验证码")
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesChangepasswordChangepwdemail = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-028ebf2f"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/changepwdemail.vue"]]);
  const props = {
    props: {
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 最大输入长度
      maxlength: {
        type: [String, Number],
        default: 6
      },
      // 是否用圆点填充
      dot: {
        type: Boolean,
        default: false
      },
      // 显示模式，box-盒子模式，line-底部横线模式
      mode: {
        type: String,
        default: "box"
      },
      // 是否细边框
      hairline: {
        type: Boolean,
        default: false
      },
      // 字符间的距离
      space: {
        type: [String, Number],
        default: 10
      },
      // 预置值
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 是否自动获取焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 字体是否加粗
      bold: {
        type: Boolean,
        default: false
      },
      // 字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: 18
      },
      // 输入框的大小，宽等于高
      size: {
        type: [String, Number],
        default: 35
      },
      // 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
      disabledKeyboard: {
        type: Boolean,
        default: false
      },
      // 边框和线条颜色
      borderColor: {
        type: String,
        default: "#c9cacc"
      },
      // 是否禁止输入"."符号
      disabledDot: {
        type: Boolean,
        default: true
      },
      ...(_D = (_C = uni.$uv) == null ? void 0 : _C.props) == null ? void 0 : _D.codeInput
    }
  };
  const _sfc_main$4 = {
    name: "uv-code-input",
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        inputValue: "",
        isFocus: this.focus
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(val) {
          this.inputValue = String(val).substring(0, this.maxlength);
        }
      }
    },
    computed: {
      // 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
      codeLength() {
        return new Array(Number(this.maxlength));
      },
      // 循环item的样式
      itemStyle() {
        return (index2) => {
          const addUnit2 = this.$uv.addUnit;
          const style = {
            width: addUnit2(this.size),
            height: addUnit2(this.size)
          };
          if (this.mode === "box") {
            style.border = `${this.hairline ? 0.5 : 1}px solid ${this.borderColor}`;
            if (this.$uv.getPx(this.space) === 0) {
              if (index2 === 0) {
                style.borderTopLeftRadius = "3px";
                style.borderBottomLeftRadius = "3px";
              }
              if (index2 === this.codeLength.length - 1) {
                style.borderTopRightRadius = "3px";
                style.borderBottomRightRadius = "3px";
              }
              if (index2 !== this.codeLength.length - 1) {
                style.borderRight = "none";
              }
            }
          }
          if (index2 !== this.codeLength.length - 1) {
            style.marginRight = addUnit2(this.space);
          } else {
            style.marginRight = 0;
          }
          return style;
        };
      },
      // 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
      codeArray() {
        return String(this.inputValue).split("");
      },
      // 下划线模式下，横线的样式
      lineStyle() {
        const style = {};
        style.height = this.hairline ? "2px" : "4px";
        style.width = this.$uv.addUnit(this.size);
        style.backgroundColor = this.borderColor;
        return style;
      }
    },
    methods: {
      // 监听输入框的值发生变化
      inputHandler(e) {
        const value2 = e.detail.value;
        this.inputValue = value2;
        if (this.disabledDot) {
          this.$nextTick(() => {
            this.inputValue = value2.replace(".", "");
          });
        }
        this.$emit("change", value2);
        this.$emit("update:modelValue", value2);
        if (String(value2).length >= Number(this.maxlength)) {
          this.$emit("finish", value2);
        }
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-code-input" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($options.codeLength, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              class: "uv-code-input__item",
              style: vue.normalizeStyle([$options.itemStyle(index2)]),
              key: index2
            },
            [
              _ctx.dot && $options.codeArray.length > index2 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uv-code-input__item__dot"
              })) : (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 1,
                  style: vue.normalizeStyle({
                    fontSize: _ctx.$uv.addUnit(_ctx.fontSize),
                    fontWeight: _ctx.bold ? "bold" : "normal",
                    color: _ctx.color
                  })
                },
                vue.toDisplayString($options.codeArray[index2]),
                5
                /* TEXT, STYLE */
              )),
              _ctx.mode === "line" ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 2,
                  class: "uv-code-input__item__line",
                  style: vue.normalizeStyle([$options.lineStyle])
                },
                null,
                4
                /* STYLE */
              )) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createElementVNode("input", {
        disabled: _ctx.disabledKeyboard,
        type: "number",
        focus: _ctx.focus,
        value: $data.inputValue,
        maxlength: _ctx.maxlength,
        adjustPosition: _ctx.adjustPosition,
        class: "uv-code-input__input",
        onInput: _cache[0] || (_cache[0] = (...args) => $options.inputHandler && $options.inputHandler(...args)),
        style: vue.normalizeStyle({
          height: _ctx.$uv.addUnit(_ctx.size)
        }),
        onFocus: _cache[1] || (_cache[1] = ($event) => $data.isFocus = true),
        onBlur: _cache[2] || (_cache[2] = ($event) => $data.isFocus = false)
      }, null, 44, ["disabled", "focus", "value", "maxlength", "adjustPosition"])
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-bdd8c54a"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-code-input/components/uv-code-input/uv-code-input.vue"]]);
  const _sfc_main$3 = {
    __name: "sendcode",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_uv_code_input = resolveEasycom(vue.resolveDynamicComponent("uv-code-input"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "sendcode-body" }, [
          vue.createElementVNode("view", { class: "container" }, [
            vue.createElementVNode("view", { class: "sendcode-title" }, [
              vue.createElementVNode("text", { class: "code-title" }, "输入短信验证码"),
              vue.createElementVNode("text", { class: "contain" }, "验证码已发送至xxxxxxx,请在下方输入框内输入4位数字验证码")
            ]),
            vue.createElementVNode("view", { class: "sendcode-table" }, [
              vue.createElementVNode("view", { class: "sendcode-info" }, [
                vue.createVNode(_component_uv_code_input, {
                  size: "100rpx",
                  fontSize: "40rpx",
                  focus: true,
                  borderColor: "#42b883",
                  maxlength: 4,
                  mode: "box"
                }),
                vue.createElementVNode("text", { class: "count-seconds" }, "60s后重新发送")
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesChangepasswordSendcode = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d613efc9"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/sendcode.vue"]]);
  const _sfc_main$2 = {
    __name: "register",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "register-body" }, [
          vue.createElementVNode("view", { class: "container" }, [
            vue.createElementVNode("view", { class: "register-box" }, [
              vue.createElementVNode("view", { class: "register-title" }, [
                vue.createElementVNode("text", null, "Register"),
                vue.createElementVNode("text", null, "New Account")
              ]),
              vue.createElementVNode("view", { class: "register-table" }, [
                vue.createElementVNode("view", { class: "register-info" }, [
                  vue.createElementVNode("view", { class: "register-username" }, [
                    vue.createElementVNode("text", null, "账号"),
                    vue.createElementVNode("view", { class: "username-input" }, [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "uni-mt-5",
                        primaryColor: borderColor,
                        trim: "all",
                        modelValue: _ctx.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value = $event),
                        placeholder: "请输入账号",
                        onInput: _ctx.input
                      }, null, 8, ["modelValue", "onInput"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "register-passwd" }, [
                    vue.createElementVNode("text", null, "密码"),
                    vue.createElementVNode("view", { class: "passwd-input" }, [
                      vue.createVNode(_component_uni_easyinput, {
                        type: "password",
                        primaryColor: borderColor,
                        modelValue: _ctx.password,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.password = $event),
                        placeholder: "请输入密码"
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "register-repasswd" }, [
                    vue.createElementVNode("text", null, "确认密码"),
                    vue.createElementVNode("view", { class: "passwd-input" }, [
                      vue.createVNode(_component_uni_easyinput, {
                        type: "password",
                        primaryColor: borderColor,
                        modelValue: _ctx.password,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.password = $event),
                        placeholder: "请确认密码"
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "register-checkboxs" }, [
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode("checkbox", {
                        value: "cb",
                        checked: "true",
                        color: "var(--border-color)",
                        style: { "transform": "scale(0.7)" }
                      }),
                      vue.createElementVNode("text", null, "我同意条款和条件")
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "register-btn" }, [
                    vue.createElementVNode("button", { "hover-class": "checkActive" }, "注册")
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "register-footer" }, [
              vue.createElementVNode("text", null, "已有账号?"),
              vue.createElementVNode("a", { href: "#" }, "立即登录!")
            ])
          ])
        ]);
      };
    }
  };
  const PagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bac4a35d"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/register/register.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "updated-body" }, [
      vue.createElementVNode("view", { class: "updated-container" }, [
        vue.createElementVNode("view", { class: "update-box" }, [
          vue.createElementVNode("view", { class: "updated-img" }, [
            vue.createElementVNode("image", {
              src: "/static/images/changepwdsuccess.svg",
              mode: ""
            })
          ]),
          vue.createElementVNode("view", { class: "updated-text" }, [
            vue.createElementVNode("view", { class: "text-title" }, [
              vue.createElementVNode("text", null, "密码已更新")
            ]),
            vue.createElementVNode("view", { class: "text-contain" }, [
              vue.createElementVNode("text", null, "Your password has been setup successfully")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "back-btn" }, [
          vue.createElementVNode("button", { "hover-class": "checkActive" }, "返回登录")
        ])
      ])
    ]);
  }
  const PagesPasswdupdatedPasswdupdated = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-bb8da604"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/passwdupdated/passwdupdated.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/changepassword/changepassword", PagesChangepasswordChangepassword);
  __definePage("pages/changepassword/changepasswdbyphone", PagesChangepasswordChangepasswdbyphone);
  __definePage("pages/changepassword/changepwdemail", PagesChangepasswordChangepwdemail);
  __definePage("pages/changepassword/sendcode", PagesChangepasswordSendcode);
  __definePage("pages/register/register", PagesRegisterRegister);
  __definePage("pages/passwdupdated/passwdupdated", PagesPasswdupdatedPasswdupdated);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);

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
  var _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r2, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
  "use strict";
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  const ON_PAGE_SCROLL = "onPageScroll";
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
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onPageScroll = /* @__PURE__ */ createHook(ON_PAGE_SCROLL);
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
        for (const i2 in value2) {
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
      } catch (e2) {
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
  function regExp(o2) {
    return o2 && Object.prototype.toString.call(o2) === "[object RegExp]";
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
      for (let i2 = 0; i2 < len; i2++)
        uuid[i2] = chars[0 | Math.random() * radix];
    } else {
      let r2;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i2 = 0; i2 < 36; i2++) {
        if (!uuid[i2]) {
          r2 = 0 | Math.random() * 16;
          uuid[i2] = chars[i2 == 19 ? r2 & 3 | 8 : r2];
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
      for (let i2 = 0; i2 < styleArray.length; i2++) {
        if (styleArray[i2]) {
          const item = styleArray[i2].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i2 in customStyle) {
      const key = i2.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i2]};`;
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
            for (let i2 = 0; i2 < value2.length; i2++) {
              _result.push(`${key}[${i2}]=${value2[i2]}`);
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
    const n2 = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s2 = "";
    s2 = (prec ? round(n2, prec) + "" : `${Math.round(n2)}`).split(".");
    const re2 = /(-?\d+)(\d{3})/;
    while (re2.test(s2[0])) {
      s2[0] = s2[0].replace(re2, `$1${sep}$2`);
    }
    if ((s2[1] || "").length < prec) {
      s2[1] = s2[1] || "";
      s2[1] += new Array(prec - s2[1].length + 1).join("0");
    }
    return s2.join(dec);
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
      for (let i2 = 1; i2 < keys.length; i2++) {
        if (firstObj) {
          firstObj = firstObj[keys[i2]];
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
    const inFn = function(_obj, keys, v2) {
      if (keys.length === 1) {
        _obj[keys[0]] = v2;
        return;
      }
      while (keys.length > 1) {
        const k2 = keys[0];
        if (!_obj[k2] || typeof _obj[k2] !== "object") {
          _obj[k2] = {};
        }
        keys.shift();
        inFn(_obj[k2], keys, v2);
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
      preventEvent(e2) {
        e2 && typeof e2.stopPropagation === "function" && e2.stopPropagation();
      },
      // 空操作
      noop(e2) {
        this.preventEvent(e2);
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
  const props$f = {
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
  const _sfc_main$A = {
    name: "uv-sticky",
    mixins: [mpMixin, mixin, props$f],
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
          }).exec((e2) => {
            resolve("sticky" === e2[0].position);
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
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$n], ["__scopeId", "data-v-0a817f53"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-sticky/components/uv-sticky/uv-sticky.vue"]]);
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
  const props$e = {
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
      ...(_f = (_e2 = uni.$uv) == null ? void 0 : _e2.props) == null ? void 0 : _f.icon
    }
  };
  const _sfc_main$z = {
    name: "uv-icon",
    emits: ["click"],
    data() {
      return {};
    },
    mixins: [mpMixin, mixin, props$e],
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
      clickHandler(e2) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e2);
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$m], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  const props$d = {
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
  const _sfc_main$y = {
    name: "uv-link",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$d],
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
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$l], ["__scopeId", "data-v-86e87617"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-link/components/uv-link/uv-link.vue"]]);
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
          for (let i2 = 0, len = name.length - 2; i2 < len; i2++) {
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
  const props$c = {
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
  const _sfc_main$x = {
    name: "uv-text",
    emits: ["click"],
    mixins: [mpMixin, mixin, value, props$c],
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
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
    const _component_uv_link = resolveEasycom(vue.resolveDynamicComponent("uv-link"), __easycom_1$6);
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
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$k], ["__scopeId", "data-v-8da47eb3"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
  const props$b = {
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
        validator(n2) {
          return range$1(n2, [0, 19]) || n2 === "";
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
  const _sfc_main$w = {
    name: "uv-avatar",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$b],
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
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_1$5);
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
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$j], ["__scopeId", "data-v-fa9b0ca7"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-avatar/components/uv-avatar/uv-avatar.vue"]]);
  const props$a = {
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
  const _sfc_main$v = {
    name: "uv-search",
    emits: ["click", "input", "change", "clear", "search", "custom", "focus", "blur", "clickIcon", "update:modelValue"],
    mixins: [mpMixin, mixin, props$a],
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
      inputChange(e2) {
        this.keyword = e2.detail.value;
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
      search(e2) {
        this.$emit("search", e2.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e3) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e2) {
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
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
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
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$i], ["__scopeId", "data-v-46cbdd03"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-search/components/uv-search/uv-search.vue"]]);
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
  const _sfc_main$u = {
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
        let code2 = this.icons.find((v2) => v2.font_class === this.type);
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
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$h], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
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
  const _sfc_main$t = {
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
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$g], ["__scopeId", "data-v-91e4945b"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-badge/components/uv-badge/uv-badge.vue"]]);
  const props$9 = {
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
      ...(_r2 = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r2.tabs
    }
  };
  const _sfc_main$s = {
    name: "uv-tabs",
    emits: ["click", "change"],
    mixins: [mpMixin, mixin, props$9],
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
      animation(x2, duration = 0) {
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
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_badge = resolveEasycom(vue.resolveDynamicComponent("uv-badge"), __easycom_0$6);
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
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$f], ["__scopeId", "data-v-fd5fcf14"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-tabs/components/uv-tabs/uv-tabs.vue"]]);
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
    for (let i2 = 0; i2 < step; i2++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i2 + startR)},${Math.round(sG * i2 + startG)},${Math.round(sB * i2 + startB)})`);
      if (i2 === 0)
        hex = rgbToHex(startColor);
      if (i2 === step - 1)
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
        for (let i2 = 1; i2 < 4; i2 += 1) {
          sColorNew += sColor.slice(i2, i2 + 1).concat(sColor.slice(i2, i2 + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i2 = 1; i2 < 7; i2 += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i2, i2 + 2)}`));
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
      for (let i2 = 0; i2 < aColor.length; i2++) {
        let hex = Number(aColor[i2]).toString(16);
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
        for (let i2 = 0; i2 < aNum.length; i2 += 1) {
          numHex += aNum[i2] + aNum[i2];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const props$8 = {
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
  const _sfc_main$r = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$8],
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
      show(n2) {
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
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$e], ["__scopeId", "data-v-29b619ea"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
  const props$7 = {
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
  const _sfc_main$q = {
    name: "uv-swiper-indicator",
    mixins: [mpMixin, mixin, props$7],
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
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$d], ["__scopeId", "data-v-09034092"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-swiper/components/uv-swiper-indicator/uv-swiper-indicator.vue"]]);
  const props$6 = {
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
  const _sfc_main$p = {
    name: "uv-swiper",
    mixins: [mpMixin, mixin, props$6],
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
      change(e2) {
        const {
          current
        } = e2.detail;
        this.pauseVideo(this.currentIndex);
        this.currentIndex = current;
        this.$emit("change", e2.detail);
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
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$5);
    const _component_uv_swiper_indicator = resolveEasycom(vue.resolveDynamicComponent("uv-swiper-indicator"), __easycom_1$2);
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
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$c], ["__scopeId", "data-v-7522af0b"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-swiper/components/uv-swiper/uv-swiper.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
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
        let p2 = await scrollViewDOM();
        scrollInnerWidth = p2.width;
        let column = props2.column <= 0 ? 5 : props2.column;
        scrollColumnWidth.value = scrollInnerWidth / column + "px";
      };
      vue.onMounted(() => {
        scrollViewDOMCal();
      });
      const scrollViewLeft = vue.ref(0);
      const scroll = (e2) => {
        let scrollLeft = e2.detail.scrollLeft;
        let scrollWidth = e2.detail.scrollWidth;
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
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-7aa1eedb"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/mxio-scroll-x/components/mxio-scroll-x/mxio-scroll-x.vue"]]);
  const _sfc_main$n = {
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$b], ["__scopeId", "data-v-ae4bee67"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const props$5 = {
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: false
      },
      // 使用的动画模式
      mode: {
        type: [String, null],
        default: "fade"
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: "ease-out"
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.transition
    }
  };
  const getClassNames = (name) => ({
    enter: `uv-${name}-enter uv-${name}-enter-active`,
    "enter-to": `uv-${name}-enter-to uv-${name}-enter-active`,
    leave: `uv-${name}-leave uv-${name}-leave-active`,
    "leave-to": `uv-${name}-leave-to uv-${name}-leave-active`
  });
  const transition = {
    emits: ["click", "beforeEnter", "enter", "afterEnter", "beforeLeave", "leave", "afterLeave"],
    methods: {
      // 组件被点击发出事件
      clickHandler() {
        this.$emit("click");
      },
      // vue版本的组件进场处理
      async vueEnter() {
        const classNames = getClassNames(this.mode);
        this.status = "enter";
        this.$emit("beforeEnter");
        this.inited = true;
        this.display = true;
        this.classes = classNames.enter;
        await sleep(20);
        this.$emit("enter");
        this.transitionEnded = false;
        this.$emit("afterEnter");
        this.classes = classNames["enter-to"];
      },
      // 动画离场处理
      async vueLeave() {
        if (!this.display)
          return;
        const classNames = getClassNames(this.mode);
        this.status = "leave";
        this.$emit("beforeLeave");
        this.classes = classNames.leave;
        await sleep(10);
        this.transitionEnded = false;
        this.$emit("leave");
        setTimeout(this.onTransitionEnd, this.duration);
        this.classes = classNames["leave-to"];
      },
      // 完成过渡后触发
      onTransitionEnd() {
        if (this.transitionEnded)
          return;
        this.transitionEnded = true;
        this.$emit(this.status === "leave" ? "afterLeave" : "afterEnter");
        if (!this.show && this.display) {
          this.display = false;
          this.inited = false;
        }
      }
    }
  };
  const _sfc_main$m = {
    name: "uv-transition",
    data() {
      return {
        inited: false,
        // 是否显示/隐藏组件
        viewStyle: {},
        // 组件内部的样式
        status: "",
        // 记录组件动画的状态
        transitionEnded: false,
        // 组件是否结束的标记
        display: false,
        // 组件是否展示
        classes: ""
        // 应用的类名
      };
    },
    computed: {
      mergeStyle() {
        const { viewStyle, customStyle } = this;
        return {
          transitionDuration: `${this.duration}ms`,
          // display: `${this.display ? '' : 'none'}`,
          transitionTimingFunction: this.timingFunction,
          // 避免自定义样式影响到动画属性，所以写在viewStyle前面
          ...this.$uv.addStyle(customStyle),
          ...viewStyle
        };
      }
    },
    mixins: [mpMixin, mixin, transition, props$5],
    watch: {
      show: {
        handler(newVal) {
          newVal ? this.vueEnter() : this.vueLeave();
        },
        // 表示同时监听初始化时的props的show的意思
        immediate: true
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.inited ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-transition", $data.classes]),
        ref: "uv-transition",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
        style: vue.normalizeStyle([$options.mergeStyle]),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.noop && _ctx.noop(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$a], ["__scopeId", "data-v-fe34503b"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-transition/components/uv-transition/uv-transition.vue"]]);
  const props$4 = {
    props: {
      // 返回顶部的形状，circle-圆形，square-方形
      mode: {
        type: String,
        default: "circle"
      },
      // 自定义图标
      icon: {
        type: String,
        default: "arrow-upward"
      },
      // 提示文字
      text: {
        type: String,
        default: ""
      },
      // 返回顶部滚动时间
      duration: {
        type: [String, Number],
        default: 100
      },
      // 滚动距离
      scrollTop: {
        type: [String, Number],
        default: 0
      },
      // 距离顶部多少距离显示，单位px
      top: {
        type: [String, Number],
        default: 400
      },
      // 返回顶部按钮到底部的距离，单位px
      bottom: {
        type: [String, Number],
        default: 100
      },
      // 返回顶部按钮到右边的距离，单位px
      right: {
        type: [String, Number],
        default: 20
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: 9
      },
      // 图标的样式，对象形式
      iconStyle: {
        type: Object,
        default: () => ({
          color: "#909399",
          fontSize: "19px"
        })
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.backtop
    }
  };
  const _sfc_main$l = {
    name: "uv-back-top",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$4],
    computed: {
      backTopStyle() {
        const style = {
          bottom: this.$uv.addUnit(this.bottom),
          right: this.$uv.addUnit(this.right),
          width: "40px",
          height: "40px",
          position: "fixed",
          zIndex: 10
        };
        return style;
      },
      show() {
        return this.$uv.getPx(this.scrollTop) > this.$uv.getPx(this.top);
      },
      contentStyle() {
        const style = {};
        let radius = 0;
        if (this.mode === "circle") {
          radius = "100px";
        } else {
          radius = "4px";
        }
        style.borderTopLeftRadius = radius;
        style.borderTopRightRadius = radius;
        style.borderBottomLeftRadius = radius;
        style.borderBottomRightRadius = radius;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      backToTop() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: this.duration
        });
        this.$emit("click");
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_1$1);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      mode: "fade",
      customStyle: $options.backTopStyle,
      show: $options.show
    }, {
      default: vue.withCtx(() => [
        !_ctx.$slots.default && !_ctx.$slots.$default ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "uv-back-top",
            style: vue.normalizeStyle([$options.contentStyle]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.backToTop && $options.backToTop(...args))
          },
          [
            vue.createVNode(_component_uv_icon, {
              name: _ctx.icon,
              "custom-style": _ctx.iconStyle
            }, null, 8, ["name", "custom-style"]),
            _ctx.text ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "uv-back-top__text"
              },
              vue.toDisplayString(_ctx.text),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        )) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["customStyle", "show"]);
  }
  const __easycom_8 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$9], ["__scopeId", "data-v-cb0af4f1"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-back-top/components/uv-back-top/uv-back-top.vue"]]);
  const _sfc_main$k = {
    __name: "index",
    setup(__props) {
      const avatar = "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png";
      const barHeight = vue.ref(0);
      const scrollTop = vue.ref(0);
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
          image: "../../static/banner1.jpg",
          title: "昨夜星辰昨夜风，画楼西畔桂堂东"
        },
        {
          image: "../../static/banner2.jpg",
          title: "身无彩凤双飞翼，心有灵犀一点通"
        },
        {
          image: "../../static/banner3.jpg",
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
          }],
          articleId: "123"
        },
        {
          userName: "小呆呆",
          phoneName: "华为",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }],
          articleId: "123"
        },
        {
          userName: "霸气哥哥",
          phoneName: "iqoo10",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }],
          articleId: "123"
        },
        {
          userName: "嘻嘻",
          phoneName: "vivo",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }],
          articleId: "123"
        },
        {
          userName: "小呆呆",
          phoneName: "华为",
          imgSrcs: [{
            src: "../../static/bg1.jpg"
          }],
          articleId: "123"
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
        formatAppLog("log", "at pages/index/index.vue:342", "item", item);
      };
      const onClick = () => {
        formatAppLog("log", "at pages/index/index.vue:346", "被点击");
      };
      const scrollItemEmitsClick = (item, index2, array2) => {
        formatAppLog("log", "at pages/index/index.vue:350", item);
      };
      onShow(() => {
        barHeight.value = uni.getSystemInfoSync().statusBarHeight;
      });
      onPageScroll((e2) => {
        scrollTop.value = e2.scrollTop;
      });
      const articlehandler = (articleId) => {
        formatAppLog("log", "at pages/index/index.vue:369", articleId);
        uni.navigateTo({
          url: `/pages/article/article?articleId=${articleId}`
        });
      };
      return (_ctx, _cache) => {
        const _component_uv_sticky = resolveEasycom(vue.resolveDynamicComponent("uv-sticky"), __easycom_2$1);
        const _component_uv_avatar = resolveEasycom(vue.resolveDynamicComponent("uv-avatar"), __easycom_1$4);
        const _component_uv_search = resolveEasycom(vue.resolveDynamicComponent("uv-search"), __easycom_1$3);
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        const _component_uv_tabs = resolveEasycom(vue.resolveDynamicComponent("uv-tabs"), __easycom_4);
        const _component_uv_swiper = resolveEasycom(vue.resolveDynamicComponent("uv-swiper"), __easycom_5);
        const _component_mxio_scroll_x = resolveEasycom(vue.resolveDynamicComponent("mxio-scroll-x"), __easycom_6);
        const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_7);
        const _component_uv_back_top = resolveEasycom(vue.resolveDynamicComponent("uv-back-top"), __easycom_8);
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
                  vue.createElementVNode("view", { class: "tabs-container" }, [
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
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["offset-top"]),
            vue.createElementVNode("view", { class: "swiper-container" }, [
              vue.createVNode(_component_uv_swiper, {
                list: list2,
                height: "150",
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
                colList: 11,
                column: 5,
                barShow: true,
                onScrollItemEmitsClick: scrollItemEmitsClick
              })
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
                      onClick
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", {
                          class: "card-body",
                          onClick: ($event) => articlehandler(item.articleId)
                        }, [
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
                              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.actionsClick("点赞"))
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "hand-up",
                                size: "18",
                                color: "#999"
                              }),
                              vue.createElementVNode("text", { class: "card-actions-item-text" }, "点赞")
                            ]),
                            vue.createElementVNode("view", {
                              class: "card-actions-item",
                              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.actionsClick("评论"))
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "chatbubble",
                                size: "18",
                                color: "#999"
                              }),
                              vue.createElementVNode("text", { class: "card-actions-item-text" }, "评论")
                            ]),
                            vue.createElementVNode("view", {
                              class: "card-actions-item",
                              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.actionsClick("分享"))
                            }, [
                              vue.createVNode(_component_uni_icons, {
                                type: "redo",
                                size: "18",
                                color: "#999"
                              }),
                              vue.createElementVNode("text", { class: "card-actions-item-text" }, "转发")
                            ])
                          ])
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["title", "sub-title"])
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ]),
          vue.createVNode(_component_uv_back_top, { "scroll-top": scrollTop.value }, null, 8, ["scroll-top"])
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/index/index.vue"]]);
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
  const _sfc_main$j = {
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
      onConfirm(e2) {
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
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
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
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$8], ["__scopeId", "data-v-09fd5285"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$i = {
    __name: "login",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$4);
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
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/login/login.vue"]]);
  const _sfc_main$h = {
    __name: "changepassword",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$4);
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
  const PagesChangepasswordChangepassword = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-6f27b6e7"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/changepassword.vue"]]);
  const _sfc_main$g = {
    __name: "changepasswdbyphone",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$4);
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
  const PagesChangepasswordChangepasswdbyphone = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-e0d80887"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/changepasswdbyphone.vue"]]);
  const _sfc_main$f = {
    __name: "changepwdemail",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$4);
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
  const PagesChangepasswordChangepwdemail = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-028ebf2f"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/changepwdemail.vue"]]);
  const props$3 = {
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
  const _sfc_main$e = {
    name: "uv-code-input",
    mixins: [mpMixin, mixin, props$3],
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
      inputHandler(e2) {
        const value2 = e2.detail.value;
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$7], ["__scopeId", "data-v-bdd8c54a"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-code-input/components/uv-code-input/uv-code-input.vue"]]);
  const _sfc_main$d = {
    __name: "sendcode",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_uv_code_input = resolveEasycom(vue.resolveDynamicComponent("uv-code-input"), __easycom_0$3);
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
  const PagesChangepasswordSendcode = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-d613efc9"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/changepassword/sendcode.vue"]]);
  const _sfc_main$c = {
    __name: "register",
    setup(__props) {
      const borderColor = "#42b883";
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$4);
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
  const PagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-bac4a35d"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/register/register.vue"]]);
  const _sfc_main$b = {};
  function _sfc_render$6(_ctx, _cache) {
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
  const PagesPasswdupdatedPasswdupdated = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$6], ["__scopeId", "data-v-bb8da604"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/passwdupdated/passwdupdated.vue"]]);
  const _sfc_main$a = {
    __name: "search",
    setup(__props) {
      const barHeight = vue.ref(0);
      onShow(() => {
        barHeight.value = uni.getSystemInfoSync().statusBarHeight;
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        const _component_uv_search = resolveEasycom(vue.resolveDynamicComponent("uv-search"), __easycom_1$3);
        const _component_uv_sticky = resolveEasycom(vue.resolveDynamicComponent("uv-sticky"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "search-body" }, [
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
              ),
              vue.createElementVNode("view", { class: "search-input" }, [
                vue.createElementVNode("view", { class: "search-icon-box" }, [
                  vue.createVNode(_component_uni_icons, { type: "back" })
                ]),
                vue.createVNode(_component_uv_search, {
                  placeholder: "日照香炉生紫烟",
                  animation: true,
                  modelValue: _ctx.keyword,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.keyword = $event)
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/search/search.vue"]]);
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const props$2 = {
    props: {
      // 是否细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，info，primary，error，warning，success
      type: {
        type: String,
        default: "info"
      },
      // 按钮尺寸，large，normal，small，mini
      size: {
        type: String,
        default: "normal"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 加载中提示文字
      loadingText: {
        type: [String, Number],
        default: ""
      },
      // 加载状态图标类型
      loadingMode: {
        type: String,
        default: "spinner"
      },
      // 加载图标大小
      loadingSize: {
        type: [String, Number],
        default: 14
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: true
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: true
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 0
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 0
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 200
      },
      // 按钮文字，之所以通过props传入，是因为slot传入的话
      // nvue中无法控制文字的样式
      text: {
        type: [String, Number],
        default: ""
      },
      // 按钮图标
      icon: {
        type: String,
        default: ""
      },
      // 按钮图标颜色
      iconColor: {
        type: String,
        default: "#000000"
      },
      // 按钮颜色，支持传入linear-gradient渐变色
      color: {
        type: String,
        default: ""
      },
      ...(_F = (_E = uni.$uv) == null ? void 0 : _E.props) == null ? void 0 : _F.button
    }
  };
  const _sfc_main$9 = {
    name: "uv-button",
    mixins: [mpMixin, mixin, props$2],
    emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp"],
    data() {
      return {};
    },
    computed: {
      // 生成bem风格的类名
      bemClass() {
        if (!this.color) {
          return this.bem(
            "button",
            ["type", "shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        } else {
          return this.bem(
            "button",
            ["shape", "size"],
            ["disabled", "plain", "hairline"]
          );
        }
      },
      loadingColor() {
        if (this.plain) {
          return this.color ? this.color : "#3c9cff";
        }
        if (this.type === "info") {
          return "#c9c9c9";
        }
        return "rgb(200, 200, 200)";
      },
      iconColorCom() {
        if (this.iconColor)
          return this.iconColor;
        if (this.plain) {
          return this.color ? this.color : this.type;
        } else {
          return this.type === "info" ? "#000000" : "#ffffff";
        }
      },
      baseColor() {
        let style = {};
        if (this.color) {
          style.color = this.plain ? this.color : "white";
          if (!this.plain) {
            style["background-color"] = this.color;
          }
          if (this.color.indexOf("gradient") !== -1) {
            style.borderTopWidth = 0;
            style.borderRightWidth = 0;
            style.borderBottomWidth = 0;
            style.borderLeftWidth = 0;
            if (!this.plain) {
              style.backgroundImage = this.color;
            }
          } else {
            style.borderColor = this.color;
            style.borderWidth = "1px";
            style.borderStyle = "solid";
          }
        }
        return style;
      },
      // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
      nvueTextStyle() {
        let style = {};
        if (this.type === "info") {
          style.color = "#323233";
        }
        if (this.color) {
          style.color = this.plain ? this.color : "white";
        }
        style.fontSize = this.textSize + "px";
        return style;
      },
      // 字体大小
      textSize() {
        let fontSize = 14, { size } = this;
        if (size === "large")
          fontSize = 16;
        if (size === "normal")
          fontSize = 14;
        if (size === "small")
          fontSize = 12;
        if (size === "mini")
          fontSize = 10;
        return fontSize;
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          throttle(() => {
            this.$emit("click");
          }, this.throttleTime);
        }
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$5);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
    return vue.openBlock(), vue.createElementBlock("button", {
      "hover-start-time": Number(_ctx.hoverStartTime),
      "hover-stay-time": Number(_ctx.hoverStayTime),
      "form-type": _ctx.formType,
      "open-type": _ctx.openType,
      "app-parameter": _ctx.appParameter,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      "send-message-title": _ctx.sendMessageTitle,
      "send-message-path": _ctx.sendMessagePath,
      lang: _ctx.lang,
      "data-name": _ctx.dataName,
      "session-from": _ctx.sessionFrom,
      "send-message-img": _ctx.sendMessageImg,
      "show-message-card": _ctx.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      "hover-class": !_ctx.disabled && !_ctx.loading ? "uv-button--active" : "",
      class: vue.normalizeClass(["uv-button uv-reset-button", $options.bemClass]),
      style: vue.normalizeStyle([$options.baseColor, _ctx.$uv.addStyle(_ctx.customStyle)]),
      onClick: _cache[5] || (_cache[5] = (...args) => $options.clickHandler && $options.clickHandler(...args))
    }, [
      _ctx.loading ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createVNode(_component_uv_loading_icon, {
            mode: _ctx.loadingMode,
            size: _ctx.loadingSize * 1.15,
            color: $options.loadingColor
          }, null, 8, ["mode", "size", "color"]),
          vue.createElementVNode(
            "text",
            {
              class: "uv-button__loading-text",
              style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
            },
            vue.toDisplayString(_ctx.loadingText || _ctx.text),
            5
            /* TEXT, STYLE */
          )
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: _ctx.icon,
            color: $options.iconColorCom,
            size: $options.textSize * 1.35,
            customStyle: { marginRight: "2px" }
          }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "text",
              {
                class: "uv-button__text",
                style: vue.normalizeStyle([{ fontSize: $options.textSize + "px" }])
              },
              vue.toDisplayString(_ctx.text),
              5
              /* TEXT, STYLE */
            )
          ], true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ], 46, ["hover-start-time", "hover-stay-time", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "send-message-path", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class"]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$5], ["__scopeId", "data-v-ae8e42c7"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-button/components/uv-button/uv-button.vue"]]);
  function e$1(e2) {
    if (e2.__esModule)
      return e2;
    var r2 = Object.defineProperty({}, "__esModule", { value: true });
    return Object.keys(e2).forEach(function(t2) {
      var n2 = Object.getOwnPropertyDescriptor(e2, t2);
      Object.defineProperty(r2, t2, n2.get ? n2 : { enumerable: true, get: function() {
        return e2[t2];
      } });
    }), r2;
  }
  var r$1 = {}, t$1 = { Aacute: "Á", aacute: "á", Abreve: "Ă", abreve: "ă", ac: "∾", acd: "∿", acE: "∾̳", Acirc: "Â", acirc: "â", acute: "´", Acy: "А", acy: "а", AElig: "Æ", aelig: "æ", af: "⁡", Afr: "𝔄", afr: "𝔞", Agrave: "À", agrave: "à", alefsym: "ℵ", aleph: "ℵ", Alpha: "Α", alpha: "α", Amacr: "Ā", amacr: "ā", amalg: "⨿", amp: "&", AMP: "&", andand: "⩕", And: "⩓", and: "∧", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angmsd: "∡", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", Aogon: "Ą", aogon: "ą", Aopf: "𝔸", aopf: "𝕒", apacir: "⩯", ap: "≈", apE: "⩰", ape: "≊", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", Aring: "Å", aring: "å", Ascr: "𝒜", ascr: "𝒶", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", Atilde: "Ã", atilde: "ã", Auml: "Ä", auml: "ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", barwed: "⌅", Barwed: "⌆", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", Bcy: "Б", bcy: "б", bdquo: "„", becaus: "∵", because: "∵", Because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", Beta: "Β", beta: "β", beth: "ℶ", between: "≬", Bfr: "𝔅", bfr: "𝔟", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bNot: "⫭", bnot: "⌐", Bopf: "𝔹", bopf: "𝕓", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxdl: "┐", boxdL: "╕", boxDl: "╖", boxDL: "╗", boxdr: "┌", boxdR: "╒", boxDr: "╓", boxDR: "╔", boxh: "─", boxH: "═", boxhd: "┬", boxHd: "╤", boxhD: "╥", boxHD: "╦", boxhu: "┴", boxHu: "╧", boxhU: "╨", boxHU: "╩", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxul: "┘", boxuL: "╛", boxUl: "╜", boxUL: "╝", boxur: "└", boxuR: "╘", boxUr: "╙", boxUR: "╚", boxv: "│", boxV: "║", boxvh: "┼", boxvH: "╪", boxVh: "╫", boxVH: "╬", boxvl: "┤", boxvL: "╡", boxVl: "╢", boxVL: "╣", boxvr: "├", boxvR: "╞", boxVr: "╟", boxVR: "╠", bprime: "‵", breve: "˘", Breve: "˘", brvbar: "¦", bscr: "𝒷", Bscr: "ℬ", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsolb: "⧅", bsol: "\\", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpE: "⪮", bumpe: "≏", Bumpeq: "≎", bumpeq: "≏", Cacute: "Ć", cacute: "ć", capand: "⩄", capbrcup: "⩉", capcap: "⩋", cap: "∩", Cap: "⋒", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", Ccaron: "Č", ccaron: "č", Ccedil: "Ç", ccedil: "ç", Ccirc: "Ĉ", ccirc: "ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", Cdot: "Ċ", cdot: "ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", CenterDot: "·", cfr: "𝔠", Cfr: "ℭ", CHcy: "Ч", chcy: "ч", check: "✓", checkmark: "✓", Chi: "Χ", chi: "χ", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cir: "○", cirE: "⧃", cire: "≗", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", colon: ":", Colon: "∷", Colone: "⩴", colone: "≔", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", conint: "∮", Conint: "∯", ContourIntegral: "∮", copf: "𝕔", Copf: "ℂ", coprod: "∐", Coproduct: "∐", copy: "©", COPY: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", cross: "✗", Cross: "⨯", Cscr: "𝒞", cscr: "𝒸", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cupbrcap: "⩈", cupcap: "⩆", CupCap: "≍", cup: "∪", Cup: "⋓", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dagger: "†", Dagger: "‡", daleth: "ℸ", darr: "↓", Darr: "↡", dArr: "⇓", dash: "‐", Dashv: "⫤", dashv: "⊣", dbkarow: "⤏", dblac: "˝", Dcaron: "Ď", dcaron: "ď", Dcy: "Д", dcy: "д", ddagger: "‡", ddarr: "⇊", DD: "ⅅ", dd: "ⅆ", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", Delta: "Δ", delta: "δ", demptyv: "⦱", dfisht: "⥿", Dfr: "𝔇", dfr: "𝔡", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", diamond: "⋄", Diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", DJcy: "Ђ", djcy: "ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", Dopf: "𝔻", dopf: "𝕕", Dot: "¨", dot: "˙", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", DownArrowBar: "⤓", downarrow: "↓", DownArrow: "↓", Downarrow: "⇓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVectorBar: "⥖", DownLeftVector: "↽", DownRightTeeVector: "⥟", DownRightVectorBar: "⥗", DownRightVector: "⇁", DownTeeArrow: "↧", DownTee: "⊤", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", Dscr: "𝒟", dscr: "𝒹", DScy: "Ѕ", dscy: "ѕ", dsol: "⧶", Dstrok: "Đ", dstrok: "đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", DZcy: "Џ", dzcy: "џ", dzigrarr: "⟿", Eacute: "É", eacute: "é", easter: "⩮", Ecaron: "Ě", ecaron: "ě", Ecirc: "Ê", ecirc: "ê", ecir: "≖", ecolon: "≕", Ecy: "Э", ecy: "э", eDDot: "⩷", Edot: "Ė", edot: "ė", eDot: "≑", ee: "ⅇ", efDot: "≒", Efr: "𝔈", efr: "𝔢", eg: "⪚", Egrave: "È", egrave: "è", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", Emacr: "Ē", emacr: "ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp13: " ", emsp14: " ", emsp: " ", ENG: "Ŋ", eng: "ŋ", ensp: " ", Eogon: "Ę", eogon: "ę", Eopf: "𝔼", eopf: "𝕖", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", Epsilon: "Ε", epsilon: "ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", escr: "ℯ", Escr: "ℰ", esdot: "≐", Esim: "⩳", esim: "≂", Eta: "Η", eta: "η", ETH: "Ð", eth: "ð", Euml: "Ë", euml: "ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", exponentiale: "ⅇ", ExponentialE: "ⅇ", fallingdotseq: "≒", Fcy: "Ф", fcy: "ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", Ffr: "𝔉", ffr: "𝔣", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", Fopf: "𝔽", fopf: "𝕗", forall: "∀", ForAll: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", Fscr: "ℱ", gacute: "ǵ", Gamma: "Γ", gamma: "γ", Gammad: "Ϝ", gammad: "ϝ", gap: "⪆", Gbreve: "Ğ", gbreve: "ğ", Gcedil: "Ģ", Gcirc: "Ĝ", gcirc: "ĝ", Gcy: "Г", gcy: "г", Gdot: "Ġ", gdot: "ġ", ge: "≥", gE: "≧", gEl: "⪌", gel: "⋛", geq: "≥", geqq: "≧", geqslant: "⩾", gescc: "⪩", ges: "⩾", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", Gfr: "𝔊", gfr: "𝔤", gg: "≫", Gg: "⋙", ggg: "⋙", gimel: "ℷ", GJcy: "Ѓ", gjcy: "ѓ", gla: "⪥", gl: "≷", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gnE: "≩", gneq: "⪈", gneqq: "≩", gnsim: "⋧", Gopf: "𝔾", gopf: "𝕘", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", Gscr: "𝒢", gscr: "ℊ", gsim: "≳", gsime: "⪎", gsiml: "⪐", gtcc: "⪧", gtcir: "⩺", gt: ">", GT: ">", Gt: "≫", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", HARDcy: "Ъ", hardcy: "ъ", harrcir: "⥈", harr: "↔", hArr: "⇔", harrw: "↭", Hat: "^", hbar: "ℏ", Hcirc: "Ĥ", hcirc: "ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", Hfr: "ℌ", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", Hopf: "ℍ", horbar: "―", HorizontalLine: "─", hscr: "𝒽", Hscr: "ℋ", hslash: "ℏ", Hstrok: "Ħ", hstrok: "ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", Iacute: "Í", iacute: "í", ic: "⁣", Icirc: "Î", icirc: "î", Icy: "И", icy: "и", Idot: "İ", IEcy: "Е", iecy: "е", iexcl: "¡", iff: "⇔", ifr: "𝔦", Ifr: "ℑ", Igrave: "Ì", igrave: "ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", IJlig: "Ĳ", ijlig: "ĳ", Imacr: "Ī", imacr: "ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", Im: "ℑ", imof: "⊷", imped: "Ƶ", Implies: "⇒", incare: "℅", in: "∈", infin: "∞", infintie: "⧝", inodot: "ı", intcal: "⊺", int: "∫", Int: "∬", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", IOcy: "Ё", iocy: "ё", Iogon: "Į", iogon: "į", Iopf: "𝕀", iopf: "𝕚", Iota: "Ι", iota: "ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", Iscr: "ℐ", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", Itilde: "Ĩ", itilde: "ĩ", Iukcy: "І", iukcy: "і", Iuml: "Ï", iuml: "ï", Jcirc: "Ĵ", jcirc: "ĵ", Jcy: "Й", jcy: "й", Jfr: "𝔍", jfr: "𝔧", jmath: "ȷ", Jopf: "𝕁", jopf: "𝕛", Jscr: "𝒥", jscr: "𝒿", Jsercy: "Ј", jsercy: "ј", Jukcy: "Є", jukcy: "є", Kappa: "Κ", kappa: "κ", kappav: "ϰ", Kcedil: "Ķ", kcedil: "ķ", Kcy: "К", kcy: "к", Kfr: "𝔎", kfr: "𝔨", kgreen: "ĸ", KHcy: "Х", khcy: "х", KJcy: "Ќ", kjcy: "ќ", Kopf: "𝕂", kopf: "𝕜", Kscr: "𝒦", kscr: "𝓀", lAarr: "⇚", Lacute: "Ĺ", lacute: "ĺ", laemptyv: "⦴", lagran: "ℒ", Lambda: "Λ", lambda: "λ", lang: "⟨", Lang: "⟪", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", larrb: "⇤", larrbfs: "⤟", larr: "←", Larr: "↞", lArr: "⇐", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", latail: "⤙", lAtail: "⤛", lat: "⪫", late: "⪭", lates: "⪭︀", lbarr: "⤌", lBarr: "⤎", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", Lcaron: "Ľ", lcaron: "ľ", Lcedil: "Ļ", lcedil: "ļ", lceil: "⌈", lcub: "{", Lcy: "Л", lcy: "л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", lE: "≦", LeftAngleBracket: "⟨", LeftArrowBar: "⇤", leftarrow: "←", LeftArrow: "←", Leftarrow: "⇐", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVectorBar: "⥙", LeftDownVector: "⇃", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", LeftRightArrow: "↔", Leftrightarrow: "⇔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTeeArrow: "↤", LeftTee: "⊣", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangleBar: "⧏", LeftTriangle: "⊲", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVectorBar: "⥘", LeftUpVector: "↿", LeftVectorBar: "⥒", LeftVector: "↼", lEg: "⪋", leg: "⋚", leq: "≤", leqq: "≦", leqslant: "⩽", lescc: "⪨", les: "⩽", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", Lfr: "𝔏", lfr: "𝔩", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", LJcy: "Љ", ljcy: "љ", llarr: "⇇", ll: "≪", Ll: "⋘", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", Lmidot: "Ŀ", lmidot: "ŀ", lmoustache: "⎰", lmoust: "⎰", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lnE: "≨", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", LongLeftArrow: "⟵", Longleftarrow: "⟸", longleftrightarrow: "⟷", LongLeftRightArrow: "⟷", Longleftrightarrow: "⟺", longmapsto: "⟼", longrightarrow: "⟶", LongRightArrow: "⟶", Longrightarrow: "⟹", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", Lopf: "𝕃", lopf: "𝕝", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", Lscr: "ℒ", lsh: "↰", Lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", Lstrok: "Ł", lstrok: "ł", ltcc: "⪦", ltcir: "⩹", lt: "<", LT: "<", Lt: "≪", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", Map: "⤅", map: "↦", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", Mcy: "М", mcy: "м", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", Mfr: "𝔐", mfr: "𝔪", mho: "℧", micro: "µ", midast: "*", midcir: "⫰", mid: "∣", middot: "·", minusb: "⊟", minus: "−", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", Mopf: "𝕄", mopf: "𝕞", mp: "∓", mscr: "𝓂", Mscr: "ℳ", mstpos: "∾", Mu: "Μ", mu: "μ", multimap: "⊸", mumap: "⊸", nabla: "∇", Nacute: "Ń", nacute: "ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natural: "♮", naturals: "ℕ", natur: "♮", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", Ncaron: "Ň", ncaron: "ň", Ncedil: "Ņ", ncedil: "ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", Ncy: "Н", ncy: "н", ndash: "–", nearhk: "⤤", nearr: "↗", neArr: "⇗", nearrow: "↗", ne: "≠", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: "\n", nexist: "∄", nexists: "∄", Nfr: "𝔑", nfr: "𝔫", ngE: "≧̸", nge: "≱", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", nGt: "≫⃒", ngt: "≯", ngtr: "≯", nGtv: "≫̸", nharr: "↮", nhArr: "⇎", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", NJcy: "Њ", njcy: "њ", nlarr: "↚", nlArr: "⇍", nldr: "‥", nlE: "≦̸", nle: "≰", nleftarrow: "↚", nLeftarrow: "⇍", nleftrightarrow: "↮", nLeftrightarrow: "⇎", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nLt: "≪⃒", nlt: "≮", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", nopf: "𝕟", Nopf: "ℕ", Not: "⫬", not: "¬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangleBar: "⧏̸", NotLeftTriangle: "⋪", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangleBar: "⧐̸", NotRightTriangle: "⋫", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", nparallel: "∦", npar: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", nprec: "⊀", npreceq: "⪯̸", npre: "⪯̸", nrarrc: "⤳̸", nrarr: "↛", nrArr: "⇏", nrarrw: "↝̸", nrightarrow: "↛", nRightarrow: "⇏", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", Nscr: "𝒩", nscr: "𝓃", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsubE: "⫅̸", nsube: "⊈", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupE: "⫆̸", nsupe: "⊉", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", Ntilde: "Ñ", ntilde: "ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", Nu: "Ν", nu: "ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nvdash: "⊬", nvDash: "⊭", nVdash: "⊮", nVDash: "⊯", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwarr: "↖", nwArr: "⇖", nwarrow: "↖", nwnear: "⤧", Oacute: "Ó", oacute: "ó", oast: "⊛", Ocirc: "Ô", ocirc: "ô", ocir: "⊚", Ocy: "О", ocy: "о", odash: "⊝", Odblac: "Ő", odblac: "ő", odiv: "⨸", odot: "⊙", odsold: "⦼", OElig: "Œ", oelig: "œ", ofcir: "⦿", Ofr: "𝔒", ofr: "𝔬", ogon: "˛", Ograve: "Ò", ograve: "ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", Omacr: "Ō", omacr: "ō", Omega: "Ω", omega: "ω", Omicron: "Ο", omicron: "ο", omid: "⦶", ominus: "⊖", Oopf: "𝕆", oopf: "𝕠", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", orarr: "↻", Or: "⩔", or: "∨", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", Oscr: "𝒪", oscr: "ℴ", Oslash: "Ø", oslash: "ø", osol: "⊘", Otilde: "Õ", otilde: "õ", otimesas: "⨶", Otimes: "⨷", otimes: "⊗", Ouml: "Ö", ouml: "ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", para: "¶", parallel: "∥", par: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", Pcy: "П", pcy: "п", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", Pfr: "𝔓", pfr: "𝔭", Phi: "Φ", phi: "φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", Pi: "Π", pi: "π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plus: "+", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", popf: "𝕡", Popf: "ℙ", pound: "£", prap: "⪷", Pr: "⪻", pr: "≺", prcue: "≼", precapprox: "⪷", prec: "≺", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", pre: "⪯", prE: "⪳", precsim: "≾", prime: "′", Prime: "″", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportional: "∝", Proportion: "∷", propto: "∝", prsim: "≾", prurel: "⊰", Pscr: "𝒫", pscr: "𝓅", Psi: "Ψ", psi: "ψ", puncsp: " ", Qfr: "𝔔", qfr: "𝔮", qint: "⨌", qopf: "𝕢", Qopf: "ℚ", qprime: "⁗", Qscr: "𝒬", qscr: "𝓆", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', QUOT: '"', rAarr: "⇛", race: "∽̱", Racute: "Ŕ", racute: "ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", Rang: "⟫", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarr: "→", Rarr: "↠", rArr: "⇒", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", Rarrtl: "⤖", rarrtl: "↣", rarrw: "↝", ratail: "⤚", rAtail: "⤜", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rBarr: "⤏", RBarr: "⤐", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", Rcaron: "Ř", rcaron: "ř", Rcedil: "Ŗ", rcedil: "ŗ", rceil: "⌉", rcub: "}", Rcy: "Р", rcy: "р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", Re: "ℜ", rect: "▭", reg: "®", REG: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", Rfr: "ℜ", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", Rho: "Ρ", rho: "ρ", rhov: "ϱ", RightAngleBracket: "⟩", RightArrowBar: "⇥", rightarrow: "→", RightArrow: "→", Rightarrow: "⇒", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVectorBar: "⥕", RightDownVector: "⇂", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTeeArrow: "↦", RightTee: "⊢", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangleBar: "⧐", RightTriangle: "⊳", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVectorBar: "⥔", RightUpVector: "↾", RightVectorBar: "⥓", RightVector: "⇀", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoustache: "⎱", rmoust: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", Ropf: "ℝ", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", rscr: "𝓇", Rscr: "ℛ", rsh: "↱", Rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", Sacute: "Ś", sacute: "ś", sbquo: "‚", scap: "⪸", Scaron: "Š", scaron: "š", Sc: "⪼", sc: "≻", sccue: "≽", sce: "⪰", scE: "⪴", Scedil: "Ş", scedil: "ş", Scirc: "Ŝ", scirc: "ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", Scy: "С", scy: "с", sdotb: "⊡", sdot: "⋅", sdote: "⩦", searhk: "⤥", searr: "↘", seArr: "⇘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", Sfr: "𝔖", sfr: "𝔰", sfrown: "⌢", sharp: "♯", SHCHcy: "Щ", shchcy: "щ", SHcy: "Ш", shcy: "ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", Sigma: "Σ", sigma: "σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", SOFTcy: "Ь", softcy: "ь", solbar: "⌿", solb: "⧄", sol: "/", Sopf: "𝕊", sopf: "𝕤", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", square: "□", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squ: "□", squf: "▪", srarr: "→", Sscr: "𝒮", sscr: "𝓈", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", Star: "⋆", star: "☆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", Sub: "⋐", subdot: "⪽", subE: "⫅", sube: "⊆", subedot: "⫃", submult: "⫁", subnE: "⫋", subne: "⊊", subplus: "⪿", subrarr: "⥹", subset: "⊂", Subset: "⋐", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succapprox: "⪸", succ: "≻", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", sum: "∑", Sum: "∑", sung: "♪", sup1: "¹", sup2: "²", sup3: "³", sup: "⊃", Sup: "⋑", supdot: "⪾", supdsub: "⫘", supE: "⫆", supe: "⊇", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supnE: "⫌", supne: "⊋", supplus: "⫀", supset: "⊃", Supset: "⋑", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swarr: "↙", swArr: "⇙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "	", target: "⌖", Tau: "Τ", tau: "τ", tbrk: "⎴", Tcaron: "Ť", tcaron: "ť", Tcedil: "Ţ", tcedil: "ţ", Tcy: "Т", tcy: "т", tdot: "⃛", telrec: "⌕", Tfr: "𝔗", tfr: "𝔱", there4: "∴", therefore: "∴", Therefore: "∴", Theta: "Θ", theta: "θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", ThinSpace: " ", thinsp: " ", thkap: "≈", thksim: "∼", THORN: "Þ", thorn: "þ", tilde: "˜", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", timesbar: "⨱", timesb: "⊠", times: "×", timesd: "⨰", tint: "∭", toea: "⤨", topbot: "⌶", topcir: "⫱", top: "⊤", Topf: "𝕋", topf: "𝕥", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", TRADE: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", Tscr: "𝒯", tscr: "𝓉", TScy: "Ц", tscy: "ц", TSHcy: "Ћ", tshcy: "ћ", Tstrok: "Ŧ", tstrok: "ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", Uacute: "Ú", uacute: "ú", uarr: "↑", Uarr: "↟", uArr: "⇑", Uarrocir: "⥉", Ubrcy: "Ў", ubrcy: "ў", Ubreve: "Ŭ", ubreve: "ŭ", Ucirc: "Û", ucirc: "û", Ucy: "У", ucy: "у", udarr: "⇅", Udblac: "Ű", udblac: "ű", udhar: "⥮", ufisht: "⥾", Ufr: "𝔘", ufr: "𝔲", Ugrave: "Ù", ugrave: "ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", Umacr: "Ū", umacr: "ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", Uogon: "Ų", uogon: "ų", Uopf: "𝕌", uopf: "𝕦", UpArrowBar: "⤒", uparrow: "↑", UpArrow: "↑", Uparrow: "⇑", UpArrowDownArrow: "⇅", updownarrow: "↕", UpDownArrow: "↕", Updownarrow: "⇕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", upsi: "υ", Upsi: "ϒ", upsih: "ϒ", Upsilon: "Υ", upsilon: "υ", UpTeeArrow: "↥", UpTee: "⊥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", Uring: "Ů", uring: "ů", urtri: "◹", Uscr: "𝒰", uscr: "𝓊", utdot: "⋰", Utilde: "Ũ", utilde: "ũ", utri: "▵", utrif: "▴", uuarr: "⇈", Uuml: "Ü", uuml: "ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", vArr: "⇕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vBar: "⫨", Vbar: "⫫", vBarv: "⫩", Vcy: "В", vcy: "в", vdash: "⊢", vDash: "⊨", Vdash: "⊩", VDash: "⊫", Vdashl: "⫦", veebar: "⊻", vee: "∨", Vee: "⋁", veeeq: "≚", vellip: "⋮", verbar: "|", Verbar: "‖", vert: "|", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", Vfr: "𝔙", vfr: "𝔳", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", Vopf: "𝕍", vopf: "𝕧", vprop: "∝", vrtri: "⊳", Vscr: "𝒱", vscr: "𝓋", vsubnE: "⫋︀", vsubne: "⊊︀", vsupnE: "⫌︀", vsupne: "⊋︀", Vvdash: "⊪", vzigzag: "⦚", Wcirc: "Ŵ", wcirc: "ŵ", wedbar: "⩟", wedge: "∧", Wedge: "⋀", wedgeq: "≙", weierp: "℘", Wfr: "𝔚", wfr: "𝔴", Wopf: "𝕎", wopf: "𝕨", wp: "℘", wr: "≀", wreath: "≀", Wscr: "𝒲", wscr: "𝓌", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", Xfr: "𝔛", xfr: "𝔵", xharr: "⟷", xhArr: "⟺", Xi: "Ξ", xi: "ξ", xlarr: "⟵", xlArr: "⟸", xmap: "⟼", xnis: "⋻", xodot: "⨀", Xopf: "𝕏", xopf: "𝕩", xoplus: "⨁", xotime: "⨂", xrarr: "⟶", xrArr: "⟹", Xscr: "𝒳", xscr: "𝓍", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", Yacute: "Ý", yacute: "ý", YAcy: "Я", yacy: "я", Ycirc: "Ŷ", ycirc: "ŷ", Ycy: "Ы", ycy: "ы", yen: "¥", Yfr: "𝔜", yfr: "𝔶", YIcy: "Ї", yicy: "ї", Yopf: "𝕐", yopf: "𝕪", Yscr: "𝒴", yscr: "𝓎", YUcy: "Ю", yucy: "ю", yuml: "ÿ", Yuml: "Ÿ", Zacute: "Ź", zacute: "ź", Zcaron: "Ž", zcaron: "ž", Zcy: "З", zcy: "з", Zdot: "Ż", zdot: "ż", zeetrf: "ℨ", ZeroWidthSpace: "​", Zeta: "Ζ", zeta: "ζ", zfr: "𝔷", Zfr: "ℨ", ZHcy: "Ж", zhcy: "ж", zigrarr: "⇝", zopf: "𝕫", Zopf: "ℤ", Zscr: "𝒵", zscr: "𝓏", zwj: "‍", zwnj: "‌" }, n$1 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, s$1 = {}, o$1 = {};
  function i$1(e2, r2, t2) {
    var n2, s2, a2, c2, l2, u2 = "";
    for ("string" != typeof r2 && (t2 = r2, r2 = i$1.defaultChars), void 0 === t2 && (t2 = true), l2 = function(e3) {
      var r3, t3, n3 = o$1[e3];
      if (n3)
        return n3;
      for (n3 = o$1[e3] = [], r3 = 0; r3 < 128; r3++)
        t3 = String.fromCharCode(r3), /^[0-9a-z]$/i.test(t3) ? n3.push(t3) : n3.push("%" + ("0" + r3.toString(16).toUpperCase()).slice(-2));
      for (r3 = 0; r3 < e3.length; r3++)
        n3[e3.charCodeAt(r3)] = e3[r3];
      return n3;
    }(r2), n2 = 0, s2 = e2.length; n2 < s2; n2++)
      if (a2 = e2.charCodeAt(n2), t2 && 37 === a2 && n2 + 2 < s2 && /^[0-9a-f]{2}$/i.test(e2.slice(n2 + 1, n2 + 3)))
        u2 += e2.slice(n2, n2 + 3), n2 += 2;
      else if (a2 < 128)
        u2 += l2[a2];
      else if (a2 >= 55296 && a2 <= 57343) {
        if (a2 >= 55296 && a2 <= 56319 && n2 + 1 < s2 && (c2 = e2.charCodeAt(n2 + 1)) >= 56320 && c2 <= 57343) {
          u2 += encodeURIComponent(e2[n2] + e2[n2 + 1]), n2++;
          continue;
        }
        u2 += "%EF%BF%BD";
      } else
        u2 += encodeURIComponent(e2[n2]);
    return u2;
  }
  i$1.defaultChars = ";/?:@&=+$,-_.!~*'()#", i$1.componentChars = "-_.!~*'()";
  var a$1 = i$1, c$1 = {};
  function l$1(e2, r2) {
    var t2;
    return "string" != typeof r2 && (r2 = l$1.defaultChars), t2 = function(e3) {
      var r3, t3, n2 = c$1[e3];
      if (n2)
        return n2;
      for (n2 = c$1[e3] = [], r3 = 0; r3 < 128; r3++)
        t3 = String.fromCharCode(r3), n2.push(t3);
      for (r3 = 0; r3 < e3.length; r3++)
        n2[t3 = e3.charCodeAt(r3)] = "%" + ("0" + t3.toString(16).toUpperCase()).slice(-2);
      return n2;
    }(r2), e2.replace(/(%[a-f0-9]{2})+/gi, function(e3) {
      var r3, n2, s2, o2, i2, a2, c2, l2 = "";
      for (r3 = 0, n2 = e3.length; r3 < n2; r3 += 3)
        (s2 = parseInt(e3.slice(r3 + 1, r3 + 3), 16)) < 128 ? l2 += t2[s2] : 192 == (224 & s2) && r3 + 3 < n2 && 128 == (192 & (o2 = parseInt(e3.slice(r3 + 4, r3 + 6), 16))) ? (l2 += (c2 = s2 << 6 & 1984 | 63 & o2) < 128 ? "��" : String.fromCharCode(c2), r3 += 3) : 224 == (240 & s2) && r3 + 6 < n2 && (o2 = parseInt(e3.slice(r3 + 4, r3 + 6), 16), i2 = parseInt(e3.slice(r3 + 7, r3 + 9), 16), 128 == (192 & o2) && 128 == (192 & i2)) ? (l2 += (c2 = s2 << 12 & 61440 | o2 << 6 & 4032 | 63 & i2) < 2048 || c2 >= 55296 && c2 <= 57343 ? "���" : String.fromCharCode(c2), r3 += 6) : 240 == (248 & s2) && r3 + 9 < n2 && (o2 = parseInt(e3.slice(r3 + 4, r3 + 6), 16), i2 = parseInt(e3.slice(r3 + 7, r3 + 9), 16), a2 = parseInt(e3.slice(r3 + 10, r3 + 12), 16), 128 == (192 & o2) && 128 == (192 & i2) && 128 == (192 & a2)) ? ((c2 = s2 << 18 & 1835008 | o2 << 12 & 258048 | i2 << 6 & 4032 | 63 & a2) < 65536 || c2 > 1114111 ? l2 += "����" : (c2 -= 65536, l2 += String.fromCharCode(55296 + (c2 >> 10), 56320 + (1023 & c2))), r3 += 9) : l2 += "�";
      return l2;
    });
  }
  l$1.defaultChars = ";/?:@&=+$,#", l$1.componentChars = "";
  var u$1 = l$1;
  function p$1() {
    this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
  }
  var h$1 = /^([a-z0-9.+-]+:)/i, f$1 = /:[0-9]*$/, d$1 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, m$1 = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "	"]), g$1 = ["'"].concat(m$1), _$1 = ["%", "/", "?", ";", "#"].concat(g$1), k$1 = ["/", "?", "#"], b$1 = /^[+a-z0-9A-Z_-]{0,63}$/, v$1 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, C$1 = { javascript: true, "javascript:": true }, y$1 = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true };
  p$1.prototype.parse = function(e2, r2) {
    var t2, n2, s2, o2, i2, a2 = e2;
    if (a2 = a2.trim(), !r2 && 1 === e2.split("#").length) {
      var c2 = d$1.exec(a2);
      if (c2)
        return this.pathname = c2[1], c2[2] && (this.search = c2[2]), this;
    }
    var l2 = h$1.exec(a2);
    if (l2 && (s2 = (l2 = l2[0]).toLowerCase(), this.protocol = l2, a2 = a2.substr(l2.length)), (r2 || l2 || a2.match(/^\/\/[^@\/]+@[^@\/]+/)) && (!(i2 = "//" === a2.substr(0, 2)) || l2 && C$1[l2] || (a2 = a2.substr(2), this.slashes = true)), !C$1[l2] && (i2 || l2 && !y$1[l2])) {
      var u2, p2, f2 = -1;
      for (t2 = 0; t2 < k$1.length; t2++)
        -1 !== (o2 = a2.indexOf(k$1[t2])) && (-1 === f2 || o2 < f2) && (f2 = o2);
      for (-1 !== (p2 = -1 === f2 ? a2.lastIndexOf("@") : a2.lastIndexOf("@", f2)) && (u2 = a2.slice(0, p2), a2 = a2.slice(p2 + 1), this.auth = u2), f2 = -1, t2 = 0; t2 < _$1.length; t2++)
        -1 !== (o2 = a2.indexOf(_$1[t2])) && (-1 === f2 || o2 < f2) && (f2 = o2);
      -1 === f2 && (f2 = a2.length), ":" === a2[f2 - 1] && f2--;
      var m2 = a2.slice(0, f2);
      a2 = a2.slice(f2), this.parseHost(m2), this.hostname = this.hostname || "";
      var g2 = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
      if (!g2) {
        var A2 = this.hostname.split(/\./);
        for (t2 = 0, n2 = A2.length; t2 < n2; t2++) {
          var x2 = A2[t2];
          if (x2 && !x2.match(b$1)) {
            for (var D2 = "", w2 = 0, E2 = x2.length; w2 < E2; w2++)
              x2.charCodeAt(w2) > 127 ? D2 += "x" : D2 += x2[w2];
            if (!D2.match(b$1)) {
              var q2 = A2.slice(0, t2), S2 = A2.slice(t2 + 1), F2 = x2.match(v$1);
              F2 && (q2.push(F2[1]), S2.unshift(F2[2])), S2.length && (a2 = S2.join(".") + a2), this.hostname = q2.join(".");
              break;
            }
          }
        }
      }
      this.hostname.length > 255 && (this.hostname = ""), g2 && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
    }
    var L2 = a2.indexOf("#");
    -1 !== L2 && (this.hash = a2.substr(L2), a2 = a2.slice(0, L2));
    var z2 = a2.indexOf("?");
    return -1 !== z2 && (this.search = a2.substr(z2), a2 = a2.slice(0, z2)), a2 && (this.pathname = a2), y$1[s2] && this.hostname && !this.pathname && (this.pathname = ""), this;
  }, p$1.prototype.parseHost = function(e2) {
    var r2 = f$1.exec(e2);
    r2 && (":" !== (r2 = r2[0]) && (this.port = r2.substr(1)), e2 = e2.substr(0, e2.length - r2.length)), e2 && (this.hostname = e2);
  };
  var A$1 = function(e2, r2) {
    if (e2 && e2 instanceof p$1)
      return e2;
    var t2 = new p$1();
    return t2.parse(e2, r2), t2;
  };
  s$1.encode = a$1, s$1.decode = u$1, s$1.format = function(e2) {
    var r2 = "";
    return r2 += e2.protocol || "", r2 += e2.slashes ? "//" : "", r2 += e2.auth ? e2.auth + "@" : "", e2.hostname && -1 !== e2.hostname.indexOf(":") ? r2 += "[" + e2.hostname + "]" : r2 += e2.hostname || "", r2 += e2.port ? ":" + e2.port : "", r2 += e2.pathname || "", r2 += e2.search || "", r2 += e2.hash || "";
  }, s$1.parse = A$1;
  var x$1 = {}, D$1 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, w$1 = /[\0-\x1F\x7F-\x9F]/, E$1 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
  x$1.Any = D$1, x$1.Cc = w$1, x$1.Cf = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, x$1.P = n$1, x$1.Z = E$1, function(e2) {
    var r2 = Object.prototype.hasOwnProperty;
    function o2(e3, t2) {
      return r2.call(e3, t2);
    }
    function i2(e3) {
      return !(e3 >= 55296 && e3 <= 57343) && (!(e3 >= 64976 && e3 <= 65007) && (65535 != (65535 & e3) && 65534 != (65535 & e3) && (!(e3 >= 0 && e3 <= 8) && (11 !== e3 && (!(e3 >= 14 && e3 <= 31) && (!(e3 >= 127 && e3 <= 159) && !(e3 > 1114111)))))));
    }
    function a2(e3) {
      if (e3 > 65535) {
        var r3 = 55296 + ((e3 -= 65536) >> 10), t2 = 56320 + (1023 & e3);
        return String.fromCharCode(r3, t2);
      }
      return String.fromCharCode(e3);
    }
    var c2 = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, l2 = new RegExp(c2.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source, "gi"), u2 = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, p2 = t$1;
    var h2 = /[&<>"]/, f2 = /[&<>"]/g, d2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
    function m2(e3) {
      return d2[e3];
    }
    var g2 = /[.?*+^$[\]\\(){}|-]/g;
    var _2 = n$1;
    e2.lib = {}, e2.lib.mdurl = s$1, e2.lib.ucmicro = x$1, e2.assign = function(e3) {
      var r3 = Array.prototype.slice.call(arguments, 1);
      return r3.forEach(function(r4) {
        if (r4) {
          if ("object" != typeof r4)
            throw new TypeError(r4 + "must be object");
          Object.keys(r4).forEach(function(t2) {
            e3[t2] = r4[t2];
          });
        }
      }), e3;
    }, e2.isString = function(e3) {
      return "[object String]" === function(e4) {
        return Object.prototype.toString.call(e4);
      }(e3);
    }, e2.has = o2, e2.unescapeMd = function(e3) {
      return e3.indexOf("\\") < 0 ? e3 : e3.replace(c2, "$1");
    }, e2.unescapeAll = function(e3) {
      return e3.indexOf("\\") < 0 && e3.indexOf("&") < 0 ? e3 : e3.replace(l2, function(e4, r3, t2) {
        return r3 || function(e5, r4) {
          var t3 = 0;
          return o2(p2, r4) ? p2[r4] : 35 === r4.charCodeAt(0) && u2.test(r4) && i2(t3 = "x" === r4[1].toLowerCase() ? parseInt(r4.slice(2), 16) : parseInt(r4.slice(1), 10)) ? a2(t3) : e5;
        }(e4, t2);
      });
    }, e2.isValidEntityCode = i2, e2.fromCodePoint = a2, e2.escapeHtml = function(e3) {
      return h2.test(e3) ? e3.replace(f2, m2) : e3;
    }, e2.arrayReplaceAt = function(e3, r3, t2) {
      return [].concat(e3.slice(0, r3), t2, e3.slice(r3 + 1));
    }, e2.isSpace = function(e3) {
      switch (e3) {
        case 9:
        case 32:
          return true;
      }
      return false;
    }, e2.isWhiteSpace = function(e3) {
      if (e3 >= 8192 && e3 <= 8202)
        return true;
      switch (e3) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
          return true;
      }
      return false;
    }, e2.isMdAsciiPunct = function(e3) {
      switch (e3) {
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 124:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }, e2.isPunctChar = function(e3) {
      return _2.test(e3);
    }, e2.escapeRE = function(e3) {
      return e3.replace(g2, "\\$&");
    }, e2.normalizeReference = function(e3) {
      return e3 = e3.trim().replace(/\s+/g, " "), "Ṿ" === "ẞ".toLowerCase() && (e3 = e3.replace(/ẞ/g, "ß")), e3.toLowerCase().toUpperCase();
    };
  }(r$1);
  var q$1 = {}, S$1 = r$1.unescapeAll, F$1 = r$1.unescapeAll;
  q$1.parseLinkLabel = function(e2, r2, t2) {
    var n2, s2, o2, i2, a2 = -1, c2 = e2.posMax, l2 = e2.pos;
    for (e2.pos = r2 + 1, n2 = 1; e2.pos < c2; ) {
      if (93 === (o2 = e2.src.charCodeAt(e2.pos)) && 0 === --n2) {
        s2 = true;
        break;
      }
      if (i2 = e2.pos, e2.md.inline.skipToken(e2), 91 === o2) {
        if (i2 === e2.pos - 1)
          n2++;
        else if (t2)
          return e2.pos = l2, -1;
      }
    }
    return s2 && (a2 = e2.pos), e2.pos = l2, a2;
  }, q$1.parseLinkDestination = function(e2, r2, t2) {
    var n2, s2, o2 = r2, i2 = { ok: false, pos: 0, lines: 0, str: "" };
    if (60 === e2.charCodeAt(r2)) {
      for (r2++; r2 < t2; ) {
        if (10 === (n2 = e2.charCodeAt(r2)))
          return i2;
        if (60 === n2)
          return i2;
        if (62 === n2)
          return i2.pos = r2 + 1, i2.str = S$1(e2.slice(o2 + 1, r2)), i2.ok = true, i2;
        92 === n2 && r2 + 1 < t2 ? r2 += 2 : r2++;
      }
      return i2;
    }
    for (s2 = 0; r2 < t2 && 32 !== (n2 = e2.charCodeAt(r2)) && !(n2 < 32 || 127 === n2); )
      if (92 === n2 && r2 + 1 < t2) {
        if (32 === e2.charCodeAt(r2 + 1))
          break;
        r2 += 2;
      } else {
        if (40 === n2 && ++s2 > 32)
          return i2;
        if (41 === n2) {
          if (0 === s2)
            break;
          s2--;
        }
        r2++;
      }
    return o2 === r2 || 0 !== s2 || (i2.str = S$1(e2.slice(o2, r2)), i2.lines = 0, i2.pos = r2, i2.ok = true), i2;
  }, q$1.parseLinkTitle = function(e2, r2, t2) {
    var n2, s2, o2 = 0, i2 = r2, a2 = { ok: false, pos: 0, lines: 0, str: "" };
    if (r2 >= t2)
      return a2;
    if (34 !== (s2 = e2.charCodeAt(r2)) && 39 !== s2 && 40 !== s2)
      return a2;
    for (r2++, 40 === s2 && (s2 = 41); r2 < t2; ) {
      if ((n2 = e2.charCodeAt(r2)) === s2)
        return a2.pos = r2 + 1, a2.lines = o2, a2.str = F$1(e2.slice(i2 + 1, r2)), a2.ok = true, a2;
      if (40 === n2 && 41 === s2)
        return a2;
      10 === n2 ? o2++ : 92 === n2 && r2 + 1 < t2 && (r2++, 10 === e2.charCodeAt(r2) && o2++), r2++;
    }
    return a2;
  };
  var L$1 = r$1.assign, z$1 = r$1.unescapeAll, T$1 = r$1.escapeHtml, I$1 = {};
  function M$1() {
    this.rules = L$1({}, I$1);
  }
  I$1.code_inline = function(e2, r2, t2, n2, s2) {
    var o2 = e2[r2];
    return "<code" + s2.renderAttrs(o2) + ">" + T$1(e2[r2].content) + "</code>";
  }, I$1.code_block = function(e2, r2, t2, n2, s2) {
    var o2 = e2[r2];
    return "<pre" + s2.renderAttrs(o2) + "><code>" + T$1(e2[r2].content) + "</code></pre>\n";
  }, I$1.fence = function(e2, r2, t2, n2, s2) {
    var o2, i2, a2, c2, l2, u2 = e2[r2], p2 = u2.info ? z$1(u2.info).trim() : "", h2 = "", f2 = "";
    return p2 && (h2 = (a2 = p2.split(/(\s+)/g))[0], f2 = a2.slice(2).join("")), 0 === (o2 = t2.highlight && t2.highlight(u2.content, h2, f2) || T$1(u2.content)).indexOf("<pre") ? o2 + "\n" : p2 ? (i2 = u2.attrIndex("class"), c2 = u2.attrs ? u2.attrs.slice() : [], i2 < 0 ? c2.push(["class", t2.langPrefix + h2]) : (c2[i2] = c2[i2].slice(), c2[i2][1] += " " + t2.langPrefix + h2), l2 = { attrs: c2 }, "<pre><code" + s2.renderAttrs(l2) + ">" + o2 + "</code></pre>\n") : "<pre><code" + s2.renderAttrs(u2) + ">" + o2 + "</code></pre>\n";
  }, I$1.image = function(e2, r2, t2, n2, s2) {
    var o2 = e2[r2];
    return o2.attrs[o2.attrIndex("alt")][1] = s2.renderInlineAsText(o2.children, t2, n2), s2.renderToken(e2, r2, t2);
  }, I$1.hardbreak = function(e2, r2, t2) {
    return t2.xhtmlOut ? "<br />\n" : "<br>\n";
  }, I$1.softbreak = function(e2, r2, t2) {
    return t2.breaks ? t2.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
  }, I$1.text = function(e2, r2) {
    return T$1(e2[r2].content);
  }, I$1.html_block = function(e2, r2) {
    return e2[r2].content;
  }, I$1.html_inline = function(e2, r2) {
    return e2[r2].content;
  }, M$1.prototype.renderAttrs = function(e2) {
    var r2, t2, n2;
    if (!e2.attrs)
      return "";
    for (n2 = "", r2 = 0, t2 = e2.attrs.length; r2 < t2; r2++)
      n2 += " " + T$1(e2.attrs[r2][0]) + '="' + T$1(e2.attrs[r2][1]) + '"';
    return n2;
  }, M$1.prototype.renderToken = function(e2, r2, t2) {
    var n2, s2 = "", o2 = false, i2 = e2[r2];
    return i2.hidden ? "" : (i2.block && -1 !== i2.nesting && r2 && e2[r2 - 1].hidden && (s2 += "\n"), s2 += (-1 === i2.nesting ? "</" : "<") + i2.tag, s2 += this.renderAttrs(i2), 0 === i2.nesting && t2.xhtmlOut && (s2 += " /"), i2.block && (o2 = true, 1 === i2.nesting && r2 + 1 < e2.length && ("inline" === (n2 = e2[r2 + 1]).type || n2.hidden || -1 === n2.nesting && n2.tag === i2.tag) && (o2 = false)), s2 += o2 ? ">\n" : ">");
  }, M$1.prototype.renderInline = function(e2, r2, t2) {
    for (var n2, s2 = "", o2 = this.rules, i2 = 0, a2 = e2.length; i2 < a2; i2++)
      void 0 !== o2[n2 = e2[i2].type] ? s2 += o2[n2](e2, i2, r2, t2, this) : s2 += this.renderToken(e2, i2, r2);
    return s2;
  }, M$1.prototype.renderInlineAsText = function(e2, r2, t2) {
    for (var n2 = "", s2 = 0, o2 = e2.length; s2 < o2; s2++)
      "text" === e2[s2].type ? n2 += e2[s2].content : "image" === e2[s2].type ? n2 += this.renderInlineAsText(e2[s2].children, r2, t2) : "softbreak" === e2[s2].type && (n2 += "\n");
    return n2;
  }, M$1.prototype.render = function(e2, r2, t2) {
    var n2, s2, o2, i2 = "", a2 = this.rules;
    for (n2 = 0, s2 = e2.length; n2 < s2; n2++)
      "inline" === (o2 = e2[n2].type) ? i2 += this.renderInline(e2[n2].children, r2, t2) : void 0 !== a2[o2] ? i2 += a2[e2[n2].type](e2, n2, r2, t2, this) : i2 += this.renderToken(e2, n2, r2, t2);
    return i2;
  };
  var R$1 = M$1;
  function B$1() {
    this.__rules__ = [], this.__cache__ = null;
  }
  B$1.prototype.__find__ = function(e2) {
    for (var r2 = 0; r2 < this.__rules__.length; r2++)
      if (this.__rules__[r2].name === e2)
        return r2;
    return -1;
  }, B$1.prototype.__compile__ = function() {
    var e2 = this, r2 = [""];
    e2.__rules__.forEach(function(e3) {
      e3.enabled && e3.alt.forEach(function(e4) {
        r2.indexOf(e4) < 0 && r2.push(e4);
      });
    }), e2.__cache__ = {}, r2.forEach(function(r3) {
      e2.__cache__[r3] = [], e2.__rules__.forEach(function(t2) {
        t2.enabled && (r3 && t2.alt.indexOf(r3) < 0 || e2.__cache__[r3].push(t2.fn));
      });
    });
  }, B$1.prototype.at = function(e2, r2, t2) {
    var n2 = this.__find__(e2), s2 = t2 || {};
    if (-1 === n2)
      throw new Error("Parser rule not found: " + e2);
    this.__rules__[n2].fn = r2, this.__rules__[n2].alt = s2.alt || [], this.__cache__ = null;
  }, B$1.prototype.before = function(e2, r2, t2, n2) {
    var s2 = this.__find__(e2), o2 = n2 || {};
    if (-1 === s2)
      throw new Error("Parser rule not found: " + e2);
    this.__rules__.splice(s2, 0, { name: r2, enabled: true, fn: t2, alt: o2.alt || [] }), this.__cache__ = null;
  }, B$1.prototype.after = function(e2, r2, t2, n2) {
    var s2 = this.__find__(e2), o2 = n2 || {};
    if (-1 === s2)
      throw new Error("Parser rule not found: " + e2);
    this.__rules__.splice(s2 + 1, 0, { name: r2, enabled: true, fn: t2, alt: o2.alt || [] }), this.__cache__ = null;
  }, B$1.prototype.push = function(e2, r2, t2) {
    var n2 = t2 || {};
    this.__rules__.push({ name: e2, enabled: true, fn: r2, alt: n2.alt || [] }), this.__cache__ = null;
  }, B$1.prototype.enable = function(e2, r2) {
    Array.isArray(e2) || (e2 = [e2]);
    var t2 = [];
    return e2.forEach(function(e3) {
      var n2 = this.__find__(e3);
      if (n2 < 0) {
        if (r2)
          return;
        throw new Error("Rules manager: invalid rule name " + e3);
      }
      this.__rules__[n2].enabled = true, t2.push(e3);
    }, this), this.__cache__ = null, t2;
  }, B$1.prototype.enableOnly = function(e2, r2) {
    Array.isArray(e2) || (e2 = [e2]), this.__rules__.forEach(function(e3) {
      e3.enabled = false;
    }), this.enable(e2, r2);
  }, B$1.prototype.disable = function(e2, r2) {
    Array.isArray(e2) || (e2 = [e2]);
    var t2 = [];
    return e2.forEach(function(e3) {
      var n2 = this.__find__(e3);
      if (n2 < 0) {
        if (r2)
          return;
        throw new Error("Rules manager: invalid rule name " + e3);
      }
      this.__rules__[n2].enabled = false, t2.push(e3);
    }, this), this.__cache__ = null, t2;
  }, B$1.prototype.getRules = function(e2) {
    return null === this.__cache__ && this.__compile__(), this.__cache__[e2] || [];
  };
  var N$1 = B$1, O$1 = /\r\n?|\n/g, P$1 = /\0/g, j$1 = r$1.arrayReplaceAt;
  function U$1(e2) {
    return /^<\/a\s*>/i.test(e2);
  }
  var V$1 = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, Z$1 = /\((c|tm|r)\)/i, $$1 = /\((c|tm|r)\)/gi, G$1 = { c: "©", r: "®", tm: "™" };
  function H$1(e2, r2) {
    return G$1[r2.toLowerCase()];
  }
  function J$1(e2) {
    var r2, t2, n2 = 0;
    for (r2 = e2.length - 1; r2 >= 0; r2--)
      "text" !== (t2 = e2[r2]).type || n2 || (t2.content = t2.content.replace($$1, H$1)), "link_open" === t2.type && "auto" === t2.info && n2--, "link_close" === t2.type && "auto" === t2.info && n2++;
  }
  function W$1(e2) {
    var r2, t2, n2 = 0;
    for (r2 = e2.length - 1; r2 >= 0; r2--)
      "text" !== (t2 = e2[r2]).type || n2 || V$1.test(t2.content) && (t2.content = t2.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—").replace(/(^|\s)--(?=\s|$)/gm, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")), "link_open" === t2.type && "auto" === t2.info && n2--, "link_close" === t2.type && "auto" === t2.info && n2++;
  }
  var Y$1 = r$1.isWhiteSpace, K$1 = r$1.isPunctChar, Q$1 = r$1.isMdAsciiPunct, X$1 = /['"]/, ee$1 = /['"]/g;
  function re$1(e2, r2, t2) {
    return e2.slice(0, r2) + t2 + e2.slice(r2 + 1);
  }
  function te$1(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2, y2;
    for (v2 = [], t2 = 0; t2 < e2.length; t2++) {
      for (n2 = e2[t2], c2 = e2[t2].level, k2 = v2.length - 1; k2 >= 0 && !(v2[k2].level <= c2); k2--)
        ;
      if (v2.length = k2 + 1, "text" === n2.type) {
        i2 = 0, a2 = (s2 = n2.content).length;
        e:
          for (; i2 < a2 && (ee$1.lastIndex = i2, o2 = ee$1.exec(s2)); ) {
            if (g2 = _2 = true, i2 = o2.index + 1, b2 = "'" === o2[0], u2 = 32, o2.index - 1 >= 0)
              u2 = s2.charCodeAt(o2.index - 1);
            else
              for (k2 = t2 - 1; k2 >= 0 && ("softbreak" !== e2[k2].type && "hardbreak" !== e2[k2].type); k2--)
                if (e2[k2].content) {
                  u2 = e2[k2].content.charCodeAt(e2[k2].content.length - 1);
                  break;
                }
            if (p2 = 32, i2 < a2)
              p2 = s2.charCodeAt(i2);
            else
              for (k2 = t2 + 1; k2 < e2.length && ("softbreak" !== e2[k2].type && "hardbreak" !== e2[k2].type); k2++)
                if (e2[k2].content) {
                  p2 = e2[k2].content.charCodeAt(0);
                  break;
                }
            if (h2 = Q$1(u2) || K$1(String.fromCharCode(u2)), f2 = Q$1(p2) || K$1(String.fromCharCode(p2)), d2 = Y$1(u2), (m2 = Y$1(p2)) ? g2 = false : f2 && (d2 || h2 || (g2 = false)), d2 ? _2 = false : h2 && (m2 || f2 || (_2 = false)), 34 === p2 && '"' === o2[0] && u2 >= 48 && u2 <= 57 && (_2 = g2 = false), g2 && _2 && (g2 = h2, _2 = f2), g2 || _2) {
              if (_2) {
                for (k2 = v2.length - 1; k2 >= 0 && (l2 = v2[k2], !(v2[k2].level < c2)); k2--)
                  if (l2.single === b2 && v2[k2].level === c2) {
                    l2 = v2[k2], b2 ? (C2 = r2.md.options.quotes[2], y2 = r2.md.options.quotes[3]) : (C2 = r2.md.options.quotes[0], y2 = r2.md.options.quotes[1]), n2.content = re$1(n2.content, o2.index, y2), e2[l2.token].content = re$1(e2[l2.token].content, l2.pos, C2), i2 += y2.length - 1, l2.token === t2 && (i2 += C2.length - 1), a2 = (s2 = n2.content).length, v2.length = k2;
                    continue e;
                  }
              }
              g2 ? v2.push({ token: t2, pos: o2.index, single: b2, level: c2 }) : _2 && b2 && (n2.content = re$1(n2.content, o2.index, "’"));
            } else
              b2 && (n2.content = re$1(n2.content, o2.index, "’"));
          }
      }
    }
  }
  function ne$1(e2, r2, t2) {
    this.type = e2, this.tag = r2, this.attrs = null, this.map = null, this.nesting = t2, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = false, this.hidden = false;
  }
  ne$1.prototype.attrIndex = function(e2) {
    var r2, t2, n2;
    if (!this.attrs)
      return -1;
    for (t2 = 0, n2 = (r2 = this.attrs).length; t2 < n2; t2++)
      if (r2[t2][0] === e2)
        return t2;
    return -1;
  }, ne$1.prototype.attrPush = function(e2) {
    this.attrs ? this.attrs.push(e2) : this.attrs = [e2];
  }, ne$1.prototype.attrSet = function(e2, r2) {
    var t2 = this.attrIndex(e2), n2 = [e2, r2];
    t2 < 0 ? this.attrPush(n2) : this.attrs[t2] = n2;
  }, ne$1.prototype.attrGet = function(e2) {
    var r2 = this.attrIndex(e2), t2 = null;
    return r2 >= 0 && (t2 = this.attrs[r2][1]), t2;
  }, ne$1.prototype.attrJoin = function(e2, r2) {
    var t2 = this.attrIndex(e2);
    t2 < 0 ? this.attrPush([e2, r2]) : this.attrs[t2][1] = this.attrs[t2][1] + " " + r2;
  };
  var se$1 = ne$1, oe$1 = se$1;
  function ie$1(e2, r2, t2) {
    this.src = e2, this.env = t2, this.tokens = [], this.inlineMode = false, this.md = r2;
  }
  ie$1.prototype.Token = oe$1;
  var ae$1 = ie$1, ce$1 = N$1, le$1 = [["normalize", function(e2) {
    var r2;
    r2 = (r2 = e2.src.replace(O$1, "\n")).replace(P$1, "�"), e2.src = r2;
  }], ["block", function(e2) {
    var r2;
    e2.inlineMode ? ((r2 = new e2.Token("inline", "", 0)).content = e2.src, r2.map = [0, 1], r2.children = [], e2.tokens.push(r2)) : e2.md.block.parse(e2.src, e2.md, e2.env, e2.tokens);
  }], ["inline", function(e2) {
    var r2, t2, n2, s2 = e2.tokens;
    for (t2 = 0, n2 = s2.length; t2 < n2; t2++)
      "inline" === (r2 = s2[t2]).type && e2.md.inline.parse(r2.content, e2.md, e2.env, r2.children);
  }], ["linkify", function(e2) {
    var r2, t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2 = e2.tokens;
    if (e2.md.options.linkify) {
      for (t2 = 0, n2 = b2.length; t2 < n2; t2++)
        if ("inline" === b2[t2].type && e2.md.linkify.pretest(b2[t2].content))
          for (f2 = 0, r2 = (s2 = b2[t2].children).length - 1; r2 >= 0; r2--)
            if ("link_close" !== (i2 = s2[r2]).type) {
              if ("html_inline" === i2.type && (k2 = i2.content, /^<a[>\s]/i.test(k2) && f2 > 0 && f2--, U$1(i2.content) && f2++), !(f2 > 0) && "text" === i2.type && e2.md.linkify.test(i2.content)) {
                for (l2 = i2.content, _2 = e2.md.linkify.match(l2), a2 = [], h2 = i2.level, p2 = 0, _2.length > 0 && 0 === _2[0].index && r2 > 0 && "text_special" === s2[r2 - 1].type && (_2 = _2.slice(1)), c2 = 0; c2 < _2.length; c2++)
                  d2 = _2[c2].url, m2 = e2.md.normalizeLink(d2), e2.md.validateLink(m2) && (g2 = _2[c2].text, g2 = _2[c2].schema ? "mailto:" !== _2[c2].schema || /^mailto:/i.test(g2) ? e2.md.normalizeLinkText(g2) : e2.md.normalizeLinkText("mailto:" + g2).replace(/^mailto:/, "") : e2.md.normalizeLinkText("http://" + g2).replace(/^http:\/\//, ""), (u2 = _2[c2].index) > p2 && ((o2 = new e2.Token("text", "", 0)).content = l2.slice(p2, u2), o2.level = h2, a2.push(o2)), (o2 = new e2.Token("link_open", "a", 1)).attrs = [["href", m2]], o2.level = h2++, o2.markup = "linkify", o2.info = "auto", a2.push(o2), (o2 = new e2.Token("text", "", 0)).content = g2, o2.level = h2, a2.push(o2), (o2 = new e2.Token("link_close", "a", -1)).level = --h2, o2.markup = "linkify", o2.info = "auto", a2.push(o2), p2 = _2[c2].lastIndex);
                p2 < l2.length && ((o2 = new e2.Token("text", "", 0)).content = l2.slice(p2), o2.level = h2, a2.push(o2)), b2[t2].children = s2 = j$1(s2, r2, a2);
              }
            } else
              for (r2--; s2[r2].level !== i2.level && "link_open" !== s2[r2].type; )
                r2--;
    }
  }], ["replacements", function(e2) {
    var r2;
    if (e2.md.options.typographer)
      for (r2 = e2.tokens.length - 1; r2 >= 0; r2--)
        "inline" === e2.tokens[r2].type && (Z$1.test(e2.tokens[r2].content) && J$1(e2.tokens[r2].children), V$1.test(e2.tokens[r2].content) && W$1(e2.tokens[r2].children));
  }], ["smartquotes", function(e2) {
    var r2;
    if (e2.md.options.typographer)
      for (r2 = e2.tokens.length - 1; r2 >= 0; r2--)
        "inline" === e2.tokens[r2].type && X$1.test(e2.tokens[r2].content) && te$1(e2.tokens[r2].children, e2);
  }], ["text_join", function(e2) {
    var r2, t2, n2, s2, o2, i2, a2 = e2.tokens;
    for (r2 = 0, t2 = a2.length; r2 < t2; r2++)
      if ("inline" === a2[r2].type) {
        for (o2 = (n2 = a2[r2].children).length, s2 = 0; s2 < o2; s2++)
          "text_special" === n2[s2].type && (n2[s2].type = "text");
        for (s2 = i2 = 0; s2 < o2; s2++)
          "text" === n2[s2].type && s2 + 1 < o2 && "text" === n2[s2 + 1].type ? n2[s2 + 1].content = n2[s2].content + n2[s2 + 1].content : (s2 !== i2 && (n2[i2] = n2[s2]), i2++);
        s2 !== i2 && (n2.length = i2);
      }
  }]];
  function ue$1() {
    this.ruler = new ce$1();
    for (var e2 = 0; e2 < le$1.length; e2++)
      this.ruler.push(le$1[e2][0], le$1[e2][1]);
  }
  ue$1.prototype.process = function(e2) {
    var r2, t2, n2;
    for (r2 = 0, t2 = (n2 = this.ruler.getRules("")).length; r2 < t2; r2++)
      n2[r2](e2);
  }, ue$1.prototype.State = ae$1;
  var pe$1 = ue$1, he$1 = r$1.isSpace;
  function fe$1(e2, r2) {
    var t2 = e2.bMarks[r2] + e2.tShift[r2], n2 = e2.eMarks[r2];
    return e2.src.slice(t2, n2);
  }
  function de$1(e2) {
    var r2, t2 = [], n2 = 0, s2 = e2.length, o2 = false, i2 = 0, a2 = "";
    for (r2 = e2.charCodeAt(n2); n2 < s2; )
      124 === r2 && (o2 ? (a2 += e2.substring(i2, n2 - 1), i2 = n2) : (t2.push(a2 + e2.substring(i2, n2)), a2 = "", i2 = n2 + 1)), o2 = 92 === r2, n2++, r2 = e2.charCodeAt(n2);
    return t2.push(a2 + e2.substring(i2)), t2;
  }
  var me$1 = r$1.isSpace, ge$1 = r$1.isSpace, _e$1 = r$1.isSpace;
  function ke$1(e2, r2) {
    var t2, n2, s2, o2;
    return n2 = e2.bMarks[r2] + e2.tShift[r2], s2 = e2.eMarks[r2], 42 !== (t2 = e2.src.charCodeAt(n2++)) && 45 !== t2 && 43 !== t2 || n2 < s2 && (o2 = e2.src.charCodeAt(n2), !_e$1(o2)) ? -1 : n2;
  }
  function be$1(e2, r2) {
    var t2, n2 = e2.bMarks[r2] + e2.tShift[r2], s2 = n2, o2 = e2.eMarks[r2];
    if (s2 + 1 >= o2)
      return -1;
    if ((t2 = e2.src.charCodeAt(s2++)) < 48 || t2 > 57)
      return -1;
    for (; ; ) {
      if (s2 >= o2)
        return -1;
      if (!((t2 = e2.src.charCodeAt(s2++)) >= 48 && t2 <= 57)) {
        if (41 === t2 || 46 === t2)
          break;
        return -1;
      }
      if (s2 - n2 >= 10)
        return -1;
    }
    return s2 < o2 && (t2 = e2.src.charCodeAt(s2), !_e$1(t2)) ? -1 : s2;
  }
  var ve$1 = r$1.normalizeReference, Ce$1 = r$1.isSpace, ye$1 = {}, Ae$1 = `<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`, xe$1 = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", De$1 = new RegExp("^(?:" + Ae$1 + "|" + xe$1 + "|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?][\\s\\S]*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"), we$1 = new RegExp("^(?:" + Ae$1 + "|" + xe$1 + ")");
  ye$1.HTML_TAG_RE = De$1, ye$1.HTML_OPEN_CLOSE_TAG_RE = we$1;
  var Ee$1 = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "section", "source", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], qe = ye$1.HTML_OPEN_CLOSE_TAG_RE, Se$1 = [[/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true], [/^<!--/, /-->/, true], [/^<\?/, /\?>/, true], [/^<![A-Z]/, />/, true], [/^<!\[CDATA\[/, /\]\]>/, true], [new RegExp("^</?(" + Ee$1.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true], [new RegExp(qe.source + "\\s*$"), /^$/, false]], Fe = r$1.isSpace, Le$1 = se$1, ze = r$1.isSpace;
  function Te$1(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2, l2, u2, p2;
    for (this.src = e2, this.md = r2, this.env = t2, this.tokens = n2, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = false, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", p2 = false, i2 = a2 = l2 = u2 = 0, c2 = (o2 = this.src).length; a2 < c2; a2++) {
      if (s2 = o2.charCodeAt(a2), !p2) {
        if (ze(s2)) {
          l2++, 9 === s2 ? u2 += 4 - u2 % 4 : u2++;
          continue;
        }
        p2 = true;
      }
      10 !== s2 && a2 !== c2 - 1 || (10 !== s2 && a2++, this.bMarks.push(i2), this.eMarks.push(a2), this.tShift.push(l2), this.sCount.push(u2), this.bsCount.push(0), p2 = false, l2 = 0, u2 = 0, i2 = a2 + 1);
    }
    this.bMarks.push(o2.length), this.eMarks.push(o2.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
  }
  Te$1.prototype.push = function(e2, r2, t2) {
    var n2 = new Le$1(e2, r2, t2);
    return n2.block = true, t2 < 0 && this.level--, n2.level = this.level, t2 > 0 && this.level++, this.tokens.push(n2), n2;
  }, Te$1.prototype.isEmpty = function(e2) {
    return this.bMarks[e2] + this.tShift[e2] >= this.eMarks[e2];
  }, Te$1.prototype.skipEmptyLines = function(e2) {
    for (var r2 = this.lineMax; e2 < r2 && !(this.bMarks[e2] + this.tShift[e2] < this.eMarks[e2]); e2++)
      ;
    return e2;
  }, Te$1.prototype.skipSpaces = function(e2) {
    for (var r2, t2 = this.src.length; e2 < t2 && (r2 = this.src.charCodeAt(e2), ze(r2)); e2++)
      ;
    return e2;
  }, Te$1.prototype.skipSpacesBack = function(e2, r2) {
    if (e2 <= r2)
      return e2;
    for (; e2 > r2; )
      if (!ze(this.src.charCodeAt(--e2)))
        return e2 + 1;
    return e2;
  }, Te$1.prototype.skipChars = function(e2, r2) {
    for (var t2 = this.src.length; e2 < t2 && this.src.charCodeAt(e2) === r2; e2++)
      ;
    return e2;
  }, Te$1.prototype.skipCharsBack = function(e2, r2, t2) {
    if (e2 <= t2)
      return e2;
    for (; e2 > t2; )
      if (r2 !== this.src.charCodeAt(--e2))
        return e2 + 1;
    return e2;
  }, Te$1.prototype.getLines = function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2, l2, u2, p2 = e2;
    if (e2 >= r2)
      return "";
    for (l2 = new Array(r2 - e2), s2 = 0; p2 < r2; p2++, s2++) {
      for (o2 = 0, u2 = a2 = this.bMarks[p2], c2 = p2 + 1 < r2 || n2 ? this.eMarks[p2] + 1 : this.eMarks[p2]; a2 < c2 && o2 < t2; ) {
        if (i2 = this.src.charCodeAt(a2), ze(i2))
          9 === i2 ? o2 += 4 - (o2 + this.bsCount[p2]) % 4 : o2++;
        else {
          if (!(a2 - u2 < this.tShift[p2]))
            break;
          o2++;
        }
        a2++;
      }
      l2[s2] = o2 > t2 ? new Array(o2 - t2 + 1).join(" ") + this.src.slice(a2, c2) : this.src.slice(a2, c2);
    }
    return l2.join("");
  }, Te$1.prototype.Token = Le$1;
  var Ie$1 = Te$1, Me$1 = N$1, Re$1 = [["table", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2;
    if (r2 + 2 > t2)
      return false;
    if (l2 = r2 + 1, e2.sCount[l2] < e2.blkIndent)
      return false;
    if (e2.sCount[l2] - e2.blkIndent >= 4)
      return false;
    if ((i2 = e2.bMarks[l2] + e2.tShift[l2]) >= e2.eMarks[l2])
      return false;
    if (124 !== (v2 = e2.src.charCodeAt(i2++)) && 45 !== v2 && 58 !== v2)
      return false;
    if (i2 >= e2.eMarks[l2])
      return false;
    if (124 !== (C2 = e2.src.charCodeAt(i2++)) && 45 !== C2 && 58 !== C2 && !he$1(C2))
      return false;
    if (45 === v2 && he$1(C2))
      return false;
    for (; i2 < e2.eMarks[l2]; ) {
      if (124 !== (s2 = e2.src.charCodeAt(i2)) && 45 !== s2 && 58 !== s2 && !he$1(s2))
        return false;
      i2++;
    }
    for (u2 = (o2 = fe$1(e2, r2 + 1)).split("|"), f2 = [], a2 = 0; a2 < u2.length; a2++) {
      if (!(d2 = u2[a2].trim())) {
        if (0 === a2 || a2 === u2.length - 1)
          continue;
        return false;
      }
      if (!/^:?-+:?$/.test(d2))
        return false;
      58 === d2.charCodeAt(d2.length - 1) ? f2.push(58 === d2.charCodeAt(0) ? "center" : "right") : 58 === d2.charCodeAt(0) ? f2.push("left") : f2.push("");
    }
    if (-1 === (o2 = fe$1(e2, r2).trim()).indexOf("|"))
      return false;
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if ((u2 = de$1(o2)).length && "" === u2[0] && u2.shift(), u2.length && "" === u2[u2.length - 1] && u2.pop(), 0 === (p2 = u2.length) || p2 !== f2.length)
      return false;
    if (n2)
      return true;
    for (_2 = e2.parentType, e2.parentType = "table", b2 = e2.md.block.ruler.getRules("blockquote"), (h2 = e2.push("table_open", "table", 1)).map = m2 = [r2, 0], (h2 = e2.push("thead_open", "thead", 1)).map = [r2, r2 + 1], (h2 = e2.push("tr_open", "tr", 1)).map = [r2, r2 + 1], a2 = 0; a2 < u2.length; a2++)
      h2 = e2.push("th_open", "th", 1), f2[a2] && (h2.attrs = [["style", "text-align:" + f2[a2]]]), (h2 = e2.push("inline", "", 0)).content = u2[a2].trim(), h2.children = [], h2 = e2.push("th_close", "th", -1);
    for (h2 = e2.push("tr_close", "tr", -1), h2 = e2.push("thead_close", "thead", -1), l2 = r2 + 2; l2 < t2 && !(e2.sCount[l2] < e2.blkIndent); l2++) {
      for (k2 = false, a2 = 0, c2 = b2.length; a2 < c2; a2++)
        if (b2[a2](e2, l2, t2, true)) {
          k2 = true;
          break;
        }
      if (k2)
        break;
      if (!(o2 = fe$1(e2, l2).trim()))
        break;
      if (e2.sCount[l2] - e2.blkIndent >= 4)
        break;
      for ((u2 = de$1(o2)).length && "" === u2[0] && u2.shift(), u2.length && "" === u2[u2.length - 1] && u2.pop(), l2 === r2 + 2 && ((h2 = e2.push("tbody_open", "tbody", 1)).map = g2 = [r2 + 2, 0]), (h2 = e2.push("tr_open", "tr", 1)).map = [l2, l2 + 1], a2 = 0; a2 < p2; a2++)
        h2 = e2.push("td_open", "td", 1), f2[a2] && (h2.attrs = [["style", "text-align:" + f2[a2]]]), (h2 = e2.push("inline", "", 0)).content = u2[a2] ? u2[a2].trim() : "", h2.children = [], h2 = e2.push("td_close", "td", -1);
      h2 = e2.push("tr_close", "tr", -1);
    }
    return g2 && (h2 = e2.push("tbody_close", "tbody", -1), g2[1] = l2), h2 = e2.push("table_close", "table", -1), m2[1] = l2, e2.parentType = _2, e2.line = l2, true;
  }, ["paragraph", "reference"]], ["code", function(e2, r2, t2) {
    var n2, s2, o2;
    if (e2.sCount[r2] - e2.blkIndent < 4)
      return false;
    for (s2 = n2 = r2 + 1; n2 < t2; )
      if (e2.isEmpty(n2))
        n2++;
      else {
        if (!(e2.sCount[n2] - e2.blkIndent >= 4))
          break;
        s2 = ++n2;
      }
    return e2.line = s2, (o2 = e2.push("code_block", "code", 0)).content = e2.getLines(r2, s2, 4 + e2.blkIndent, false) + "\n", o2.map = [r2, e2.line], true;
  }], ["fence", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2, l2, u2, p2 = false, h2 = e2.bMarks[r2] + e2.tShift[r2], f2 = e2.eMarks[r2];
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if (h2 + 3 > f2)
      return false;
    if (126 !== (s2 = e2.src.charCodeAt(h2)) && 96 !== s2)
      return false;
    if (c2 = h2, (o2 = (h2 = e2.skipChars(h2, s2)) - c2) < 3)
      return false;
    if (u2 = e2.src.slice(c2, h2), i2 = e2.src.slice(h2, f2), 96 === s2 && i2.indexOf(String.fromCharCode(s2)) >= 0)
      return false;
    if (n2)
      return true;
    for (a2 = r2; !(++a2 >= t2) && !((h2 = c2 = e2.bMarks[a2] + e2.tShift[a2]) < (f2 = e2.eMarks[a2]) && e2.sCount[a2] < e2.blkIndent); )
      if (e2.src.charCodeAt(h2) === s2 && !(e2.sCount[a2] - e2.blkIndent >= 4 || (h2 = e2.skipChars(h2, s2)) - c2 < o2 || (h2 = e2.skipSpaces(h2)) < f2)) {
        p2 = true;
        break;
      }
    return o2 = e2.sCount[r2], e2.line = a2 + (p2 ? 1 : 0), (l2 = e2.push("fence", "code", 0)).info = i2, l2.content = e2.getLines(r2 + 1, a2, o2, true), l2.markup = u2, l2.map = [r2, e2.line], true;
  }, ["paragraph", "reference", "blockquote", "list"]], ["blockquote", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2, y2, A2, x2 = e2.lineMax, D2 = e2.bMarks[r2] + e2.tShift[r2], w2 = e2.eMarks[r2];
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if (62 !== e2.src.charCodeAt(D2++))
      return false;
    if (n2)
      return true;
    for (a2 = h2 = e2.sCount[r2] + 1, 32 === e2.src.charCodeAt(D2) ? (D2++, a2++, h2++, s2 = false, b2 = true) : 9 === e2.src.charCodeAt(D2) ? (b2 = true, (e2.bsCount[r2] + h2) % 4 == 3 ? (D2++, a2++, h2++, s2 = false) : s2 = true) : b2 = false, f2 = [e2.bMarks[r2]], e2.bMarks[r2] = D2; D2 < w2 && (o2 = e2.src.charCodeAt(D2), me$1(o2)); )
      9 === o2 ? h2 += 4 - (h2 + e2.bsCount[r2] + (s2 ? 1 : 0)) % 4 : h2++, D2++;
    for (d2 = [e2.bsCount[r2]], e2.bsCount[r2] = e2.sCount[r2] + 1 + (b2 ? 1 : 0), l2 = D2 >= w2, _2 = [e2.sCount[r2]], e2.sCount[r2] = h2 - a2, k2 = [e2.tShift[r2]], e2.tShift[r2] = D2 - e2.bMarks[r2], C2 = e2.md.block.ruler.getRules("blockquote"), g2 = e2.parentType, e2.parentType = "blockquote", p2 = r2 + 1; p2 < t2 && (A2 = e2.sCount[p2] < e2.blkIndent, !((D2 = e2.bMarks[p2] + e2.tShift[p2]) >= (w2 = e2.eMarks[p2]))); p2++)
      if (62 !== e2.src.charCodeAt(D2++) || A2) {
        if (l2)
          break;
        for (v2 = false, i2 = 0, c2 = C2.length; i2 < c2; i2++)
          if (C2[i2](e2, p2, t2, true)) {
            v2 = true;
            break;
          }
        if (v2) {
          e2.lineMax = p2, 0 !== e2.blkIndent && (f2.push(e2.bMarks[p2]), d2.push(e2.bsCount[p2]), k2.push(e2.tShift[p2]), _2.push(e2.sCount[p2]), e2.sCount[p2] -= e2.blkIndent);
          break;
        }
        f2.push(e2.bMarks[p2]), d2.push(e2.bsCount[p2]), k2.push(e2.tShift[p2]), _2.push(e2.sCount[p2]), e2.sCount[p2] = -1;
      } else {
        for (a2 = h2 = e2.sCount[p2] + 1, 32 === e2.src.charCodeAt(D2) ? (D2++, a2++, h2++, s2 = false, b2 = true) : 9 === e2.src.charCodeAt(D2) ? (b2 = true, (e2.bsCount[p2] + h2) % 4 == 3 ? (D2++, a2++, h2++, s2 = false) : s2 = true) : b2 = false, f2.push(e2.bMarks[p2]), e2.bMarks[p2] = D2; D2 < w2 && (o2 = e2.src.charCodeAt(D2), me$1(o2)); )
          9 === o2 ? h2 += 4 - (h2 + e2.bsCount[p2] + (s2 ? 1 : 0)) % 4 : h2++, D2++;
        l2 = D2 >= w2, d2.push(e2.bsCount[p2]), e2.bsCount[p2] = e2.sCount[p2] + 1 + (b2 ? 1 : 0), _2.push(e2.sCount[p2]), e2.sCount[p2] = h2 - a2, k2.push(e2.tShift[p2]), e2.tShift[p2] = D2 - e2.bMarks[p2];
      }
    for (m2 = e2.blkIndent, e2.blkIndent = 0, (y2 = e2.push("blockquote_open", "blockquote", 1)).markup = ">", y2.map = u2 = [r2, 0], e2.md.block.tokenize(e2, r2, p2), (y2 = e2.push("blockquote_close", "blockquote", -1)).markup = ">", e2.lineMax = x2, e2.parentType = g2, u2[1] = e2.line, i2 = 0; i2 < k2.length; i2++)
      e2.bMarks[i2 + r2] = f2[i2], e2.tShift[i2 + r2] = k2[i2], e2.sCount[i2 + r2] = _2[i2], e2.bsCount[i2 + r2] = d2[i2];
    return e2.blkIndent = m2, true;
  }, ["paragraph", "reference", "blockquote", "list"]], ["hr", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2 = e2.bMarks[r2] + e2.tShift[r2], l2 = e2.eMarks[r2];
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if (42 !== (s2 = e2.src.charCodeAt(c2++)) && 45 !== s2 && 95 !== s2)
      return false;
    for (o2 = 1; c2 < l2; ) {
      if ((i2 = e2.src.charCodeAt(c2++)) !== s2 && !ge$1(i2))
        return false;
      i2 === s2 && o2++;
    }
    return !(o2 < 3) && (n2 || (e2.line = r2 + 1, (a2 = e2.push("hr", "hr", 0)).map = [r2, e2.line], a2.markup = Array(o2 + 1).join(String.fromCharCode(s2))), true);
  }, ["paragraph", "reference", "blockquote", "list"]], ["list", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2, C2, y2, A2, x2, D2, w2, E2, q2, S2, F2, L2, z2 = false, T2 = true;
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if (e2.listIndent >= 0 && e2.sCount[r2] - e2.listIndent >= 4 && e2.sCount[r2] < e2.blkIndent)
      return false;
    if (n2 && "paragraph" === e2.parentType && e2.sCount[r2] >= e2.blkIndent && (z2 = true), (w2 = be$1(e2, r2)) >= 0) {
      if (u2 = true, q2 = e2.bMarks[r2] + e2.tShift[r2], g2 = Number(e2.src.slice(q2, w2 - 1)), z2 && 1 !== g2)
        return false;
    } else {
      if (!((w2 = ke$1(e2, r2)) >= 0))
        return false;
      u2 = false;
    }
    if (z2 && e2.skipSpaces(w2) >= e2.eMarks[r2])
      return false;
    if (m2 = e2.src.charCodeAt(w2 - 1), n2)
      return true;
    for (d2 = e2.tokens.length, u2 ? (L2 = e2.push("ordered_list_open", "ol", 1), 1 !== g2 && (L2.attrs = [["start", g2]])) : L2 = e2.push("bullet_list_open", "ul", 1), L2.map = f2 = [r2, 0], L2.markup = String.fromCharCode(m2), k2 = r2, E2 = false, F2 = e2.md.block.ruler.getRules("list"), C2 = e2.parentType, e2.parentType = "list"; k2 < t2; ) {
      for (D2 = w2, _2 = e2.eMarks[k2], l2 = b2 = e2.sCount[k2] + w2 - (e2.bMarks[r2] + e2.tShift[r2]); D2 < _2; ) {
        if (9 === (s2 = e2.src.charCodeAt(D2)))
          b2 += 4 - (b2 + e2.bsCount[k2]) % 4;
        else {
          if (32 !== s2)
            break;
          b2++;
        }
        D2++;
      }
      if ((c2 = (o2 = D2) >= _2 ? 1 : b2 - l2) > 4 && (c2 = 1), a2 = l2 + c2, (L2 = e2.push("list_item_open", "li", 1)).markup = String.fromCharCode(m2), L2.map = p2 = [r2, 0], u2 && (L2.info = e2.src.slice(q2, w2 - 1)), x2 = e2.tight, A2 = e2.tShift[r2], y2 = e2.sCount[r2], v2 = e2.listIndent, e2.listIndent = e2.blkIndent, e2.blkIndent = a2, e2.tight = true, e2.tShift[r2] = o2 - e2.bMarks[r2], e2.sCount[r2] = b2, o2 >= _2 && e2.isEmpty(r2 + 1) ? e2.line = Math.min(e2.line + 2, t2) : e2.md.block.tokenize(e2, r2, t2, true), e2.tight && !E2 || (T2 = false), E2 = e2.line - r2 > 1 && e2.isEmpty(e2.line - 1), e2.blkIndent = e2.listIndent, e2.listIndent = v2, e2.tShift[r2] = A2, e2.sCount[r2] = y2, e2.tight = x2, (L2 = e2.push("list_item_close", "li", -1)).markup = String.fromCharCode(m2), k2 = r2 = e2.line, p2[1] = k2, o2 = e2.bMarks[r2], k2 >= t2)
        break;
      if (e2.sCount[k2] < e2.blkIndent)
        break;
      if (e2.sCount[r2] - e2.blkIndent >= 4)
        break;
      for (S2 = false, i2 = 0, h2 = F2.length; i2 < h2; i2++)
        if (F2[i2](e2, k2, t2, true)) {
          S2 = true;
          break;
        }
      if (S2)
        break;
      if (u2) {
        if ((w2 = be$1(e2, k2)) < 0)
          break;
        q2 = e2.bMarks[k2] + e2.tShift[k2];
      } else if ((w2 = ke$1(e2, k2)) < 0)
        break;
      if (m2 !== e2.src.charCodeAt(w2 - 1))
        break;
    }
    return (L2 = u2 ? e2.push("ordered_list_close", "ol", -1) : e2.push("bullet_list_close", "ul", -1)).markup = String.fromCharCode(m2), f2[1] = k2, e2.line = k2, e2.parentType = C2, T2 && function(e3, r3) {
      var t3, n3, s3 = e3.level + 2;
      for (t3 = r3 + 2, n3 = e3.tokens.length - 2; t3 < n3; t3++)
        e3.tokens[t3].level === s3 && "paragraph_open" === e3.tokens[t3].type && (e3.tokens[t3 + 2].hidden = true, e3.tokens[t3].hidden = true, t3 += 2);
    }(e2, d2), true;
  }, ["paragraph", "reference", "blockquote"]], ["reference", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2, _2, k2, b2, v2 = 0, C2 = e2.bMarks[r2] + e2.tShift[r2], y2 = e2.eMarks[r2], A2 = r2 + 1;
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if (91 !== e2.src.charCodeAt(C2))
      return false;
    for (; ++C2 < y2; )
      if (93 === e2.src.charCodeAt(C2) && 92 !== e2.src.charCodeAt(C2 - 1)) {
        if (C2 + 1 === y2)
          return false;
        if (58 !== e2.src.charCodeAt(C2 + 1))
          return false;
        break;
      }
    for (a2 = e2.lineMax, k2 = e2.md.block.ruler.getRules("reference"), f2 = e2.parentType, e2.parentType = "reference"; A2 < a2 && !e2.isEmpty(A2); A2++)
      if (!(e2.sCount[A2] - e2.blkIndent > 3 || e2.sCount[A2] < 0)) {
        for (_2 = false, l2 = 0, u2 = k2.length; l2 < u2; l2++)
          if (k2[l2](e2, A2, a2, true)) {
            _2 = true;
            break;
          }
        if (_2)
          break;
      }
    for (y2 = (g2 = e2.getLines(r2, A2, e2.blkIndent, false).trim()).length, C2 = 1; C2 < y2; C2++) {
      if (91 === (s2 = g2.charCodeAt(C2)))
        return false;
      if (93 === s2) {
        h2 = C2;
        break;
      }
      (10 === s2 || 92 === s2 && ++C2 < y2 && 10 === g2.charCodeAt(C2)) && v2++;
    }
    if (h2 < 0 || 58 !== g2.charCodeAt(h2 + 1))
      return false;
    for (C2 = h2 + 2; C2 < y2; C2++)
      if (10 === (s2 = g2.charCodeAt(C2)))
        v2++;
      else if (!Ce$1(s2))
        break;
    if (!(d2 = e2.md.helpers.parseLinkDestination(g2, C2, y2)).ok)
      return false;
    if (c2 = e2.md.normalizeLink(d2.str), !e2.md.validateLink(c2))
      return false;
    for (o2 = C2 = d2.pos, i2 = v2 += d2.lines, m2 = C2; C2 < y2; C2++)
      if (10 === (s2 = g2.charCodeAt(C2)))
        v2++;
      else if (!Ce$1(s2))
        break;
    for (d2 = e2.md.helpers.parseLinkTitle(g2, C2, y2), C2 < y2 && m2 !== C2 && d2.ok ? (b2 = d2.str, C2 = d2.pos, v2 += d2.lines) : (b2 = "", C2 = o2, v2 = i2); C2 < y2 && (s2 = g2.charCodeAt(C2), Ce$1(s2)); )
      C2++;
    if (C2 < y2 && 10 !== g2.charCodeAt(C2) && b2)
      for (b2 = "", C2 = o2, v2 = i2; C2 < y2 && (s2 = g2.charCodeAt(C2), Ce$1(s2)); )
        C2++;
    return !(C2 < y2 && 10 !== g2.charCodeAt(C2)) && (!!(p2 = ve$1(g2.slice(1, h2))) && (n2 || (void 0 === e2.env.references && (e2.env.references = {}), void 0 === e2.env.references[p2] && (e2.env.references[p2] = { title: b2, href: c2 }), e2.parentType = f2, e2.line = r2 + v2 + 1), true));
  }], ["html_block", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2 = e2.bMarks[r2] + e2.tShift[r2], l2 = e2.eMarks[r2];
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if (!e2.md.options.html)
      return false;
    if (60 !== e2.src.charCodeAt(c2))
      return false;
    for (a2 = e2.src.slice(c2, l2), s2 = 0; s2 < Se$1.length && !Se$1[s2][0].test(a2); s2++)
      ;
    if (s2 === Se$1.length)
      return false;
    if (n2)
      return Se$1[s2][2];
    if (o2 = r2 + 1, !Se$1[s2][1].test(a2)) {
      for (; o2 < t2 && !(e2.sCount[o2] < e2.blkIndent); o2++)
        if (c2 = e2.bMarks[o2] + e2.tShift[o2], l2 = e2.eMarks[o2], a2 = e2.src.slice(c2, l2), Se$1[s2][1].test(a2)) {
          0 !== a2.length && o2++;
          break;
        }
    }
    return e2.line = o2, (i2 = e2.push("html_block", "", 0)).map = [r2, o2], i2.content = e2.getLines(r2, o2, e2.blkIndent, true), true;
  }, ["paragraph", "reference", "blockquote"]], ["heading", function(e2, r2, t2, n2) {
    var s2, o2, i2, a2, c2 = e2.bMarks[r2] + e2.tShift[r2], l2 = e2.eMarks[r2];
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    if (35 !== (s2 = e2.src.charCodeAt(c2)) || c2 >= l2)
      return false;
    for (o2 = 1, s2 = e2.src.charCodeAt(++c2); 35 === s2 && c2 < l2 && o2 <= 6; )
      o2++, s2 = e2.src.charCodeAt(++c2);
    return !(o2 > 6 || c2 < l2 && !Fe(s2)) && (n2 || (l2 = e2.skipSpacesBack(l2, c2), (i2 = e2.skipCharsBack(l2, 35, c2)) > c2 && Fe(e2.src.charCodeAt(i2 - 1)) && (l2 = i2), e2.line = r2 + 1, (a2 = e2.push("heading_open", "h" + String(o2), 1)).markup = "########".slice(0, o2), a2.map = [r2, e2.line], (a2 = e2.push("inline", "", 0)).content = e2.src.slice(c2, l2).trim(), a2.map = [r2, e2.line], a2.children = [], (a2 = e2.push("heading_close", "h" + String(o2), -1)).markup = "########".slice(0, o2)), true);
  }, ["paragraph", "reference", "blockquote"]], ["lheading", function(e2, r2, t2) {
    var n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2 = r2 + 1, d2 = e2.md.block.ruler.getRules("paragraph");
    if (e2.sCount[r2] - e2.blkIndent >= 4)
      return false;
    for (h2 = e2.parentType, e2.parentType = "paragraph"; f2 < t2 && !e2.isEmpty(f2); f2++)
      if (!(e2.sCount[f2] - e2.blkIndent > 3)) {
        if (e2.sCount[f2] >= e2.blkIndent && (c2 = e2.bMarks[f2] + e2.tShift[f2]) < (l2 = e2.eMarks[f2]) && (45 === (p2 = e2.src.charCodeAt(c2)) || 61 === p2) && (c2 = e2.skipChars(c2, p2), (c2 = e2.skipSpaces(c2)) >= l2)) {
          u2 = 61 === p2 ? 1 : 2;
          break;
        }
        if (!(e2.sCount[f2] < 0)) {
          for (s2 = false, o2 = 0, i2 = d2.length; o2 < i2; o2++)
            if (d2[o2](e2, f2, t2, true)) {
              s2 = true;
              break;
            }
          if (s2)
            break;
        }
      }
    return !!u2 && (n2 = e2.getLines(r2, f2, e2.blkIndent, false).trim(), e2.line = f2 + 1, (a2 = e2.push("heading_open", "h" + String(u2), 1)).markup = String.fromCharCode(p2), a2.map = [r2, e2.line], (a2 = e2.push("inline", "", 0)).content = n2, a2.map = [r2, e2.line - 1], a2.children = [], (a2 = e2.push("heading_close", "h" + String(u2), -1)).markup = String.fromCharCode(p2), e2.parentType = h2, true);
  }], ["paragraph", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2 = r2 + 1, l2 = e2.md.block.ruler.getRules("paragraph"), u2 = e2.lineMax;
    for (a2 = e2.parentType, e2.parentType = "paragraph"; c2 < u2 && !e2.isEmpty(c2); c2++)
      if (!(e2.sCount[c2] - e2.blkIndent > 3 || e2.sCount[c2] < 0)) {
        for (n2 = false, s2 = 0, o2 = l2.length; s2 < o2; s2++)
          if (l2[s2](e2, c2, u2, true)) {
            n2 = true;
            break;
          }
        if (n2)
          break;
      }
    return t2 = e2.getLines(r2, c2, e2.blkIndent, false).trim(), e2.line = c2, (i2 = e2.push("paragraph_open", "p", 1)).map = [r2, e2.line], (i2 = e2.push("inline", "", 0)).content = t2, i2.map = [r2, e2.line], i2.children = [], i2 = e2.push("paragraph_close", "p", -1), e2.parentType = a2, true;
  }]];
  function Be$1() {
    this.ruler = new Me$1();
    for (var e2 = 0; e2 < Re$1.length; e2++)
      this.ruler.push(Re$1[e2][0], Re$1[e2][1], { alt: (Re$1[e2][2] || []).slice() });
  }
  Be$1.prototype.tokenize = function(e2, r2, t2) {
    for (var n2, s2 = this.ruler.getRules(""), o2 = s2.length, i2 = r2, a2 = false, c2 = e2.md.options.maxNesting; i2 < t2 && (e2.line = i2 = e2.skipEmptyLines(i2), !(i2 >= t2)) && !(e2.sCount[i2] < e2.blkIndent); ) {
      if (e2.level >= c2) {
        e2.line = t2;
        break;
      }
      for (n2 = 0; n2 < o2 && !s2[n2](e2, i2, t2, false); n2++)
        ;
      e2.tight = !a2, e2.isEmpty(e2.line - 1) && (a2 = true), (i2 = e2.line) < t2 && e2.isEmpty(i2) && (a2 = true, i2++, e2.line = i2);
    }
  }, Be$1.prototype.parse = function(e2, r2, t2, n2) {
    var s2;
    e2 && (s2 = new this.State(e2, r2, t2, n2), this.tokenize(s2, s2.line, s2.lineMax));
  }, Be$1.prototype.State = Ie$1;
  var Ne$1 = Be$1;
  function Oe$1(e2) {
    switch (e2) {
      case 10:
      case 33:
      case 35:
      case 36:
      case 37:
      case 38:
      case 42:
      case 43:
      case 45:
      case 58:
      case 60:
      case 61:
      case 62:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 125:
      case 126:
        return true;
      default:
        return false;
    }
  }
  for (var Pe = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i, je = r$1.isSpace, Ue = r$1.isSpace, Ve = [], Ze = 0; Ze < 256; Ze++)
    Ve.push(0);
  "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e2) {
    Ve[e2.charCodeAt(0)] = 1;
  });
  var $e$1 = {};
  function Ge(e2, r2) {
    var t2, n2, s2, o2, i2, a2 = [], c2 = r2.length;
    for (t2 = 0; t2 < c2; t2++)
      126 === (s2 = r2[t2]).marker && -1 !== s2.end && (o2 = r2[s2.end], (i2 = e2.tokens[s2.token]).type = "s_open", i2.tag = "s", i2.nesting = 1, i2.markup = "~~", i2.content = "", (i2 = e2.tokens[o2.token]).type = "s_close", i2.tag = "s", i2.nesting = -1, i2.markup = "~~", i2.content = "", "text" === e2.tokens[o2.token - 1].type && "~" === e2.tokens[o2.token - 1].content && a2.push(o2.token - 1));
    for (; a2.length; ) {
      for (n2 = (t2 = a2.pop()) + 1; n2 < e2.tokens.length && "s_close" === e2.tokens[n2].type; )
        n2++;
      t2 !== --n2 && (i2 = e2.tokens[n2], e2.tokens[n2] = e2.tokens[t2], e2.tokens[t2] = i2);
    }
  }
  $e$1.tokenize = function(e2, r2) {
    var t2, n2, s2, o2, i2 = e2.pos, a2 = e2.src.charCodeAt(i2);
    if (r2)
      return false;
    if (126 !== a2)
      return false;
    if (s2 = (n2 = e2.scanDelims(e2.pos, true)).length, o2 = String.fromCharCode(a2), s2 < 2)
      return false;
    for (s2 % 2 && (e2.push("text", "", 0).content = o2, s2--), t2 = 0; t2 < s2; t2 += 2)
      e2.push("text", "", 0).content = o2 + o2, e2.delimiters.push({ marker: a2, length: 0, token: e2.tokens.length - 1, end: -1, open: n2.can_open, close: n2.can_close });
    return e2.pos += n2.length, true;
  }, $e$1.postProcess = function(e2) {
    var r2, t2 = e2.tokens_meta, n2 = e2.tokens_meta.length;
    for (Ge(e2, e2.delimiters), r2 = 0; r2 < n2; r2++)
      t2[r2] && t2[r2].delimiters && Ge(e2, t2[r2].delimiters);
  };
  var He = {};
  function Je(e2, r2) {
    var t2, n2, s2, o2, i2, a2;
    for (t2 = r2.length - 1; t2 >= 0; t2--)
      95 !== (n2 = r2[t2]).marker && 42 !== n2.marker || -1 !== n2.end && (s2 = r2[n2.end], a2 = t2 > 0 && r2[t2 - 1].end === n2.end + 1 && r2[t2 - 1].marker === n2.marker && r2[t2 - 1].token === n2.token - 1 && r2[n2.end + 1].token === s2.token + 1, i2 = String.fromCharCode(n2.marker), (o2 = e2.tokens[n2.token]).type = a2 ? "strong_open" : "em_open", o2.tag = a2 ? "strong" : "em", o2.nesting = 1, o2.markup = a2 ? i2 + i2 : i2, o2.content = "", (o2 = e2.tokens[s2.token]).type = a2 ? "strong_close" : "em_close", o2.tag = a2 ? "strong" : "em", o2.nesting = -1, o2.markup = a2 ? i2 + i2 : i2, o2.content = "", a2 && (e2.tokens[r2[t2 - 1].token].content = "", e2.tokens[r2[n2.end + 1].token].content = "", t2--));
  }
  He.tokenize = function(e2, r2) {
    var t2, n2, s2 = e2.pos, o2 = e2.src.charCodeAt(s2);
    if (r2)
      return false;
    if (95 !== o2 && 42 !== o2)
      return false;
    for (n2 = e2.scanDelims(e2.pos, 42 === o2), t2 = 0; t2 < n2.length; t2++)
      e2.push("text", "", 0).content = String.fromCharCode(o2), e2.delimiters.push({ marker: o2, length: n2.length, token: e2.tokens.length - 1, end: -1, open: n2.can_open, close: n2.can_close });
    return e2.pos += n2.length, true;
  }, He.postProcess = function(e2) {
    var r2, t2 = e2.tokens_meta, n2 = e2.tokens_meta.length;
    for (Je(e2, e2.delimiters), r2 = 0; r2 < n2; r2++)
      t2[r2] && t2[r2].delimiters && Je(e2, t2[r2].delimiters);
  };
  var We = r$1.normalizeReference, Ye = r$1.isSpace, Ke = r$1.normalizeReference, Qe = r$1.isSpace, Xe = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, er = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/, rr = ye$1.HTML_TAG_RE;
  var tr = t$1, nr = r$1.has, sr = r$1.isValidEntityCode, or = r$1.fromCodePoint, ir = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, ar = /^&([a-z][a-z0-9]{1,31});/i;
  function cr(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2, l2, u2 = {}, p2 = r2.length;
    if (p2) {
      var h2 = 0, f2 = -2, d2 = [];
      for (t2 = 0; t2 < p2; t2++)
        if (s2 = r2[t2], d2.push(0), r2[h2].marker === s2.marker && f2 === s2.token - 1 || (h2 = t2), f2 = s2.token, s2.length = s2.length || 0, s2.close) {
          for (u2.hasOwnProperty(s2.marker) || (u2[s2.marker] = [-1, -1, -1, -1, -1, -1]), i2 = u2[s2.marker][(s2.open ? 3 : 0) + s2.length % 3], a2 = n2 = h2 - d2[h2] - 1; n2 > i2; n2 -= d2[n2] + 1)
            if ((o2 = r2[n2]).marker === s2.marker && o2.open && o2.end < 0 && (c2 = false, (o2.close || s2.open) && (o2.length + s2.length) % 3 == 0 && (o2.length % 3 == 0 && s2.length % 3 == 0 || (c2 = true)), !c2)) {
              l2 = n2 > 0 && !r2[n2 - 1].open ? d2[n2 - 1] + 1 : 0, d2[t2] = t2 - n2 + l2, d2[n2] = l2, s2.open = false, o2.end = t2, o2.close = false, a2 = -1, f2 = -2;
              break;
            }
          -1 !== a2 && (u2[s2.marker][(s2.open ? 3 : 0) + (s2.length || 0) % 3] = a2);
        }
    }
  }
  var lr = se$1, ur = r$1.isWhiteSpace, pr = r$1.isPunctChar, hr = r$1.isMdAsciiPunct;
  function fr(e2, r2, t2, n2) {
    this.src = e2, this.env = t2, this.md = r2, this.tokens = n2, this.tokens_meta = Array(n2.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = false, this.linkLevel = 0;
  }
  fr.prototype.pushPending = function() {
    var e2 = new lr("text", "", 0);
    return e2.content = this.pending, e2.level = this.pendingLevel, this.tokens.push(e2), this.pending = "", e2;
  }, fr.prototype.push = function(e2, r2, t2) {
    this.pending && this.pushPending();
    var n2 = new lr(e2, r2, t2), s2 = null;
    return t2 < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), n2.level = this.level, t2 > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], s2 = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(n2), this.tokens_meta.push(s2), n2;
  }, fr.prototype.scanDelims = function(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2, l2, u2, p2 = e2, h2 = true, f2 = true, d2 = this.posMax, m2 = this.src.charCodeAt(e2);
    for (t2 = e2 > 0 ? this.src.charCodeAt(e2 - 1) : 32; p2 < d2 && this.src.charCodeAt(p2) === m2; )
      p2++;
    return s2 = p2 - e2, n2 = p2 < d2 ? this.src.charCodeAt(p2) : 32, c2 = hr(t2) || pr(String.fromCharCode(t2)), u2 = hr(n2) || pr(String.fromCharCode(n2)), a2 = ur(t2), (l2 = ur(n2)) ? h2 = false : u2 && (a2 || c2 || (h2 = false)), a2 ? f2 = false : c2 && (l2 || u2 || (f2 = false)), r2 ? (o2 = h2, i2 = f2) : (o2 = h2 && (!f2 || c2), i2 = f2 && (!h2 || u2)), { can_open: o2, can_close: i2, length: s2 };
  }, fr.prototype.Token = lr;
  var dr = fr, mr = N$1, gr = [["text", function(e2, r2) {
    for (var t2 = e2.pos; t2 < e2.posMax && !Oe$1(e2.src.charCodeAt(t2)); )
      t2++;
    return t2 !== e2.pos && (r2 || (e2.pending += e2.src.slice(e2.pos, t2)), e2.pos = t2, true);
  }], ["linkify", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2;
    return !!e2.md.options.linkify && (!(e2.linkLevel > 0) && (!((t2 = e2.pos) + 3 > e2.posMax) && (58 === e2.src.charCodeAt(t2) && (47 === e2.src.charCodeAt(t2 + 1) && (47 === e2.src.charCodeAt(t2 + 2) && (!!(n2 = e2.pending.match(Pe)) && (s2 = n2[1], !!(o2 = e2.md.linkify.matchAtStart(e2.src.slice(t2 - s2.length))) && (i2 = (i2 = o2.url).replace(/\*+$/, ""), a2 = e2.md.normalizeLink(i2), !!e2.md.validateLink(a2) && (r2 || (e2.pending = e2.pending.slice(0, -s2.length), (c2 = e2.push("link_open", "a", 1)).attrs = [["href", a2]], c2.markup = "linkify", c2.info = "auto", (c2 = e2.push("text", "", 0)).content = e2.md.normalizeLinkText(i2), (c2 = e2.push("link_close", "a", -1)).markup = "linkify", c2.info = "auto"), e2.pos += i2.length - s2.length, true)))))))));
  }], ["newline", function(e2, r2) {
    var t2, n2, s2, o2 = e2.pos;
    if (10 !== e2.src.charCodeAt(o2))
      return false;
    if (t2 = e2.pending.length - 1, n2 = e2.posMax, !r2)
      if (t2 >= 0 && 32 === e2.pending.charCodeAt(t2))
        if (t2 >= 1 && 32 === e2.pending.charCodeAt(t2 - 1)) {
          for (s2 = t2 - 1; s2 >= 1 && 32 === e2.pending.charCodeAt(s2 - 1); )
            s2--;
          e2.pending = e2.pending.slice(0, s2), e2.push("hardbreak", "br", 0);
        } else
          e2.pending = e2.pending.slice(0, -1), e2.push("softbreak", "br", 0);
      else
        e2.push("softbreak", "br", 0);
    for (o2++; o2 < n2 && je(e2.src.charCodeAt(o2)); )
      o2++;
    return e2.pos = o2, true;
  }], ["escape", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2 = e2.pos, c2 = e2.posMax;
    if (92 !== e2.src.charCodeAt(a2))
      return false;
    if (++a2 >= c2)
      return false;
    if (10 === (t2 = e2.src.charCodeAt(a2))) {
      for (r2 || e2.push("hardbreak", "br", 0), a2++; a2 < c2 && (t2 = e2.src.charCodeAt(a2), Ue(t2)); )
        a2++;
      return e2.pos = a2, true;
    }
    return o2 = e2.src[a2], t2 >= 55296 && t2 <= 56319 && a2 + 1 < c2 && (n2 = e2.src.charCodeAt(a2 + 1)) >= 56320 && n2 <= 57343 && (o2 += e2.src[a2 + 1], a2++), s2 = "\\" + o2, r2 || (i2 = e2.push("text_special", "", 0), t2 < 256 && 0 !== Ve[t2] ? i2.content = o2 : i2.content = s2, i2.markup = s2, i2.info = "escape"), e2.pos = a2 + 1, true;
  }], ["backticks", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2, l2, u2 = e2.pos;
    if (96 !== e2.src.charCodeAt(u2))
      return false;
    for (t2 = u2, u2++, n2 = e2.posMax; u2 < n2 && 96 === e2.src.charCodeAt(u2); )
      u2++;
    if (c2 = (s2 = e2.src.slice(t2, u2)).length, e2.backticksScanned && (e2.backticks[c2] || 0) <= t2)
      return r2 || (e2.pending += s2), e2.pos += c2, true;
    for (i2 = a2 = u2; -1 !== (i2 = e2.src.indexOf("`", a2)); ) {
      for (a2 = i2 + 1; a2 < n2 && 96 === e2.src.charCodeAt(a2); )
        a2++;
      if ((l2 = a2 - i2) === c2)
        return r2 || ((o2 = e2.push("code_inline", "code", 0)).markup = s2, o2.content = e2.src.slice(u2, i2).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e2.pos = a2, true;
      e2.backticks[l2] = i2;
    }
    return e2.backticksScanned = true, r2 || (e2.pending += s2), e2.pos += c2, true;
  }], ["strikethrough", $e$1.tokenize], ["emphasis", He.tokenize], ["link", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2, l2, u2 = "", p2 = "", h2 = e2.pos, f2 = e2.posMax, d2 = e2.pos, m2 = true;
    if (91 !== e2.src.charCodeAt(e2.pos))
      return false;
    if (i2 = e2.pos + 1, (o2 = e2.md.helpers.parseLinkLabel(e2, e2.pos, true)) < 0)
      return false;
    if ((a2 = o2 + 1) < f2 && 40 === e2.src.charCodeAt(a2)) {
      for (m2 = false, a2++; a2 < f2 && (n2 = e2.src.charCodeAt(a2), Ye(n2) || 10 === n2); a2++)
        ;
      if (a2 >= f2)
        return false;
      if (d2 = a2, (c2 = e2.md.helpers.parseLinkDestination(e2.src, a2, e2.posMax)).ok) {
        for (u2 = e2.md.normalizeLink(c2.str), e2.md.validateLink(u2) ? a2 = c2.pos : u2 = "", d2 = a2; a2 < f2 && (n2 = e2.src.charCodeAt(a2), Ye(n2) || 10 === n2); a2++)
          ;
        if (c2 = e2.md.helpers.parseLinkTitle(e2.src, a2, e2.posMax), a2 < f2 && d2 !== a2 && c2.ok)
          for (p2 = c2.str, a2 = c2.pos; a2 < f2 && (n2 = e2.src.charCodeAt(a2), Ye(n2) || 10 === n2); a2++)
            ;
      }
      (a2 >= f2 || 41 !== e2.src.charCodeAt(a2)) && (m2 = true), a2++;
    }
    if (m2) {
      if (void 0 === e2.env.references)
        return false;
      if (a2 < f2 && 91 === e2.src.charCodeAt(a2) ? (d2 = a2 + 1, (a2 = e2.md.helpers.parseLinkLabel(e2, a2)) >= 0 ? s2 = e2.src.slice(d2, a2++) : a2 = o2 + 1) : a2 = o2 + 1, s2 || (s2 = e2.src.slice(i2, o2)), !(l2 = e2.env.references[We(s2)]))
        return e2.pos = h2, false;
      u2 = l2.href, p2 = l2.title;
    }
    return r2 || (e2.pos = i2, e2.posMax = o2, e2.push("link_open", "a", 1).attrs = t2 = [["href", u2]], p2 && t2.push(["title", p2]), e2.linkLevel++, e2.md.inline.tokenize(e2), e2.linkLevel--, e2.push("link_close", "a", -1)), e2.pos = a2, e2.posMax = f2, true;
  }], ["image", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2 = "", g2 = e2.pos, _2 = e2.posMax;
    if (33 !== e2.src.charCodeAt(e2.pos))
      return false;
    if (91 !== e2.src.charCodeAt(e2.pos + 1))
      return false;
    if (a2 = e2.pos + 2, (i2 = e2.md.helpers.parseLinkLabel(e2, e2.pos + 1, false)) < 0)
      return false;
    if ((c2 = i2 + 1) < _2 && 40 === e2.src.charCodeAt(c2)) {
      for (c2++; c2 < _2 && (n2 = e2.src.charCodeAt(c2), Qe(n2) || 10 === n2); c2++)
        ;
      if (c2 >= _2)
        return false;
      for (d2 = c2, (u2 = e2.md.helpers.parseLinkDestination(e2.src, c2, e2.posMax)).ok && (m2 = e2.md.normalizeLink(u2.str), e2.md.validateLink(m2) ? c2 = u2.pos : m2 = ""), d2 = c2; c2 < _2 && (n2 = e2.src.charCodeAt(c2), Qe(n2) || 10 === n2); c2++)
        ;
      if (u2 = e2.md.helpers.parseLinkTitle(e2.src, c2, e2.posMax), c2 < _2 && d2 !== c2 && u2.ok)
        for (p2 = u2.str, c2 = u2.pos; c2 < _2 && (n2 = e2.src.charCodeAt(c2), Qe(n2) || 10 === n2); c2++)
          ;
      else
        p2 = "";
      if (c2 >= _2 || 41 !== e2.src.charCodeAt(c2))
        return e2.pos = g2, false;
      c2++;
    } else {
      if (void 0 === e2.env.references)
        return false;
      if (c2 < _2 && 91 === e2.src.charCodeAt(c2) ? (d2 = c2 + 1, (c2 = e2.md.helpers.parseLinkLabel(e2, c2)) >= 0 ? o2 = e2.src.slice(d2, c2++) : c2 = i2 + 1) : c2 = i2 + 1, o2 || (o2 = e2.src.slice(a2, i2)), !(l2 = e2.env.references[Ke(o2)]))
        return e2.pos = g2, false;
      m2 = l2.href, p2 = l2.title;
    }
    return r2 || (s2 = e2.src.slice(a2, i2), e2.md.inline.parse(s2, e2.md, e2.env, f2 = []), (h2 = e2.push("image", "img", 0)).attrs = t2 = [["src", m2], ["alt", ""]], h2.children = f2, h2.content = s2, p2 && t2.push(["title", p2])), e2.pos = c2, e2.posMax = _2, true;
  }], ["autolink", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2, c2 = e2.pos;
    if (60 !== e2.src.charCodeAt(c2))
      return false;
    for (i2 = e2.pos, a2 = e2.posMax; ; ) {
      if (++c2 >= a2)
        return false;
      if (60 === (o2 = e2.src.charCodeAt(c2)))
        return false;
      if (62 === o2)
        break;
    }
    return t2 = e2.src.slice(i2 + 1, c2), er.test(t2) ? (n2 = e2.md.normalizeLink(t2), !!e2.md.validateLink(n2) && (r2 || ((s2 = e2.push("link_open", "a", 1)).attrs = [["href", n2]], s2.markup = "autolink", s2.info = "auto", (s2 = e2.push("text", "", 0)).content = e2.md.normalizeLinkText(t2), (s2 = e2.push("link_close", "a", -1)).markup = "autolink", s2.info = "auto"), e2.pos += t2.length + 2, true)) : !!Xe.test(t2) && (n2 = e2.md.normalizeLink("mailto:" + t2), !!e2.md.validateLink(n2) && (r2 || ((s2 = e2.push("link_open", "a", 1)).attrs = [["href", n2]], s2.markup = "autolink", s2.info = "auto", (s2 = e2.push("text", "", 0)).content = e2.md.normalizeLinkText(t2), (s2 = e2.push("link_close", "a", -1)).markup = "autolink", s2.info = "auto"), e2.pos += t2.length + 2, true));
  }], ["html_inline", function(e2, r2) {
    var t2, n2, s2, o2, i2, a2 = e2.pos;
    return !!e2.md.options.html && (s2 = e2.posMax, !(60 !== e2.src.charCodeAt(a2) || a2 + 2 >= s2) && (!(33 !== (t2 = e2.src.charCodeAt(a2 + 1)) && 63 !== t2 && 47 !== t2 && !function(e3) {
      var r3 = 32 | e3;
      return r3 >= 97 && r3 <= 122;
    }(t2)) && (!!(n2 = e2.src.slice(a2).match(rr)) && (r2 || ((o2 = e2.push("html_inline", "", 0)).content = e2.src.slice(a2, a2 + n2[0].length), i2 = o2.content, /^<a[>\s]/i.test(i2) && e2.linkLevel++, function(e3) {
      return /^<\/a\s*>/i.test(e3);
    }(o2.content) && e2.linkLevel--), e2.pos += n2[0].length, true))));
  }], ["entity", function(e2, r2) {
    var t2, n2, s2, o2 = e2.pos, i2 = e2.posMax;
    if (38 !== e2.src.charCodeAt(o2))
      return false;
    if (o2 + 1 >= i2)
      return false;
    if (35 === e2.src.charCodeAt(o2 + 1)) {
      if (n2 = e2.src.slice(o2).match(ir))
        return r2 || (t2 = "x" === n2[1][0].toLowerCase() ? parseInt(n2[1].slice(1), 16) : parseInt(n2[1], 10), (s2 = e2.push("text_special", "", 0)).content = sr(t2) ? or(t2) : or(65533), s2.markup = n2[0], s2.info = "entity"), e2.pos += n2[0].length, true;
    } else if ((n2 = e2.src.slice(o2).match(ar)) && nr(tr, n2[1]))
      return r2 || ((s2 = e2.push("text_special", "", 0)).content = tr[n2[1]], s2.markup = n2[0], s2.info = "entity"), e2.pos += n2[0].length, true;
    return false;
  }]], _r = [["balance_pairs", function(e2) {
    var r2, t2 = e2.tokens_meta, n2 = e2.tokens_meta.length;
    for (cr(0, e2.delimiters), r2 = 0; r2 < n2; r2++)
      t2[r2] && t2[r2].delimiters && cr(0, t2[r2].delimiters);
  }], ["strikethrough", $e$1.postProcess], ["emphasis", He.postProcess], ["fragments_join", function(e2) {
    var r2, t2, n2 = 0, s2 = e2.tokens, o2 = e2.tokens.length;
    for (r2 = t2 = 0; r2 < o2; r2++)
      s2[r2].nesting < 0 && n2--, s2[r2].level = n2, s2[r2].nesting > 0 && n2++, "text" === s2[r2].type && r2 + 1 < o2 && "text" === s2[r2 + 1].type ? s2[r2 + 1].content = s2[r2].content + s2[r2 + 1].content : (r2 !== t2 && (s2[t2] = s2[r2]), t2++);
    r2 !== t2 && (s2.length = t2);
  }]];
  function kr() {
    var e2;
    for (this.ruler = new mr(), e2 = 0; e2 < gr.length; e2++)
      this.ruler.push(gr[e2][0], gr[e2][1]);
    for (this.ruler2 = new mr(), e2 = 0; e2 < _r.length; e2++)
      this.ruler2.push(_r[e2][0], _r[e2][1]);
  }
  kr.prototype.skipToken = function(e2) {
    var r2, t2, n2 = e2.pos, s2 = this.ruler.getRules(""), o2 = s2.length, i2 = e2.md.options.maxNesting, a2 = e2.cache;
    if (void 0 === a2[n2]) {
      if (e2.level < i2)
        for (t2 = 0; t2 < o2 && (e2.level++, r2 = s2[t2](e2, true), e2.level--, !r2); t2++)
          ;
      else
        e2.pos = e2.posMax;
      r2 || e2.pos++, a2[n2] = e2.pos;
    } else
      e2.pos = a2[n2];
  }, kr.prototype.tokenize = function(e2) {
    for (var r2, t2, n2 = this.ruler.getRules(""), s2 = n2.length, o2 = e2.posMax, i2 = e2.md.options.maxNesting; e2.pos < o2; ) {
      if (e2.level < i2)
        for (t2 = 0; t2 < s2 && !(r2 = n2[t2](e2, false)); t2++)
          ;
      if (r2) {
        if (e2.pos >= o2)
          break;
      } else
        e2.pending += e2.src[e2.pos++];
    }
    e2.pending && e2.pushPending();
  }, kr.prototype.parse = function(e2, r2, t2, n2) {
    var s2, o2, i2, a2 = new this.State(e2, r2, t2, n2);
    for (this.tokenize(a2), i2 = (o2 = this.ruler2.getRules("")).length, s2 = 0; s2 < i2; s2++)
      o2[s2](a2);
  }, kr.prototype.State = dr;
  var br = kr;
  function vr(e2) {
    var r2 = Array.prototype.slice.call(arguments, 1);
    return r2.forEach(function(r3) {
      r3 && Object.keys(r3).forEach(function(t2) {
        e2[t2] = r3[t2];
      });
    }), e2;
  }
  function Cr(e2) {
    return Object.prototype.toString.call(e2);
  }
  function yr(e2) {
    return "[object Function]" === Cr(e2);
  }
  function Ar(e2) {
    return e2.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  var xr = { fuzzyLink: true, fuzzyEmail: true, fuzzyIP: false };
  var Dr = { "http:": { validate: function(e2, r2, t2) {
    var n2 = e2.slice(r2);
    return t2.re.http || (t2.re.http = new RegExp("^\\/\\/" + t2.re.src_auth + t2.re.src_host_port_strict + t2.re.src_path, "i")), t2.re.http.test(n2) ? n2.match(t2.re.http)[0].length : 0;
  } }, "https:": "http:", "ftp:": "http:", "//": { validate: function(e2, r2, t2) {
    var n2 = e2.slice(r2);
    return t2.re.no_http || (t2.re.no_http = new RegExp("^" + t2.re.src_auth + "(?:localhost|(?:(?:" + t2.re.src_domain + ")\\.)+" + t2.re.src_domain_root + ")" + t2.re.src_port + t2.re.src_host_terminator + t2.re.src_path, "i")), t2.re.no_http.test(n2) ? r2 >= 3 && ":" === e2[r2 - 3] || r2 >= 3 && "/" === e2[r2 - 3] ? 0 : n2.match(t2.re.no_http)[0].length : 0;
  } }, "mailto:": { validate: function(e2, r2, t2) {
    var n2 = e2.slice(r2);
    return t2.re.mailto || (t2.re.mailto = new RegExp("^" + t2.re.src_email_name + "@" + t2.re.src_host_strict, "i")), t2.re.mailto.test(n2) ? n2.match(t2.re.mailto)[0].length : 0;
  } } }, wr = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
  function Er(e2) {
    var r2 = e2.re = function(e3) {
      var r3 = {};
      return e3 = e3 || {}, r3.src_Any = D$1.source, r3.src_Cc = w$1.source, r3.src_Z = E$1.source, r3.src_P = n$1.source, r3.src_ZPCc = [r3.src_Z, r3.src_P, r3.src_Cc].join("|"), r3.src_ZCc = [r3.src_Z, r3.src_Cc].join("|"), r3.src_pseudo_letter = "(?:(?![><｜]|" + r3.src_ZPCc + ")" + r3.src_Any + ")", r3.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", r3.src_auth = "(?:(?:(?!" + r3.src_ZCc + "|[@/\\[\\]()]).)+@)?", r3.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", r3.src_host_terminator = "(?=$|[><｜]|" + r3.src_ZPCc + ")(?!" + (e3["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + r3.src_ZPCc + "))", r3.src_path = "(?:[/?#](?:(?!" + r3.src_ZCc + `|[><｜]|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + r3.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + r3.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + r3.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + r3.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + r3.src_ZCc + "|[']).)+\\'|\\'(?=" + r3.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + r3.src_ZCc + "|[.]|$)|" + (e3["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + r3.src_ZCc + "|$)|;(?!" + r3.src_ZCc + "|$)|\\!+(?!" + r3.src_ZCc + "|[!]|$)|\\?(?!" + r3.src_ZCc + "|[?]|$))+|\\/)?", r3.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', r3.src_xn = "xn--[a-z0-9\\-]{1,59}", r3.src_domain_root = "(?:" + r3.src_xn + "|" + r3.src_pseudo_letter + "{1,63})", r3.src_domain = "(?:" + r3.src_xn + "|(?:" + r3.src_pseudo_letter + ")|(?:" + r3.src_pseudo_letter + "(?:-|" + r3.src_pseudo_letter + "){0,61}" + r3.src_pseudo_letter + "))", r3.src_host = "(?:(?:(?:(?:" + r3.src_domain + ")\\.)*" + r3.src_domain + "))", r3.tpl_host_fuzzy = "(?:" + r3.src_ip4 + "|(?:(?:(?:" + r3.src_domain + ")\\.)+(?:%TLDS%)))", r3.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + r3.src_domain + ")\\.)+(?:%TLDS%))", r3.src_host_strict = r3.src_host + r3.src_host_terminator, r3.tpl_host_fuzzy_strict = r3.tpl_host_fuzzy + r3.src_host_terminator, r3.src_host_port_strict = r3.src_host + r3.src_port + r3.src_host_terminator, r3.tpl_host_port_fuzzy_strict = r3.tpl_host_fuzzy + r3.src_port + r3.src_host_terminator, r3.tpl_host_port_no_ip_fuzzy_strict = r3.tpl_host_no_ip_fuzzy + r3.src_port + r3.src_host_terminator, r3.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + r3.src_ZPCc + "|>|$))", r3.tpl_email_fuzzy = '(^|[><｜]|"|\\(|' + r3.src_ZCc + ")(" + r3.src_email_name + "@" + r3.tpl_host_fuzzy_strict + ")", r3.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + r3.src_ZPCc + "))((?![$+<=>^`|｜])" + r3.tpl_host_port_fuzzy_strict + r3.src_path + ")", r3.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + r3.src_ZPCc + "))((?![$+<=>^`|｜])" + r3.tpl_host_port_no_ip_fuzzy_strict + r3.src_path + ")", r3;
    }(e2.__opts__), t2 = e2.__tlds__.slice();
    function s2(e3) {
      return e3.replace("%TLDS%", r2.src_tlds);
    }
    e2.onCompile(), e2.__tlds_replaced__ || t2.push("a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]"), t2.push(r2.src_xn), r2.src_tlds = t2.join("|"), r2.email_fuzzy = RegExp(s2(r2.tpl_email_fuzzy), "i"), r2.link_fuzzy = RegExp(s2(r2.tpl_link_fuzzy), "i"), r2.link_no_ip_fuzzy = RegExp(s2(r2.tpl_link_no_ip_fuzzy), "i"), r2.host_fuzzy_test = RegExp(s2(r2.tpl_host_fuzzy_test), "i");
    var o2 = [];
    function i2(e3, r3) {
      throw new Error('(LinkifyIt) Invalid schema "' + e3 + '": ' + r3);
    }
    e2.__compiled__ = {}, Object.keys(e2.__schemas__).forEach(function(r3) {
      var t3 = e2.__schemas__[r3];
      if (null !== t3) {
        var n2 = { validate: null, link: null };
        if (e2.__compiled__[r3] = n2, "[object Object]" === Cr(t3))
          return !function(e3) {
            return "[object RegExp]" === Cr(e3);
          }(t3.validate) ? yr(t3.validate) ? n2.validate = t3.validate : i2(r3, t3) : n2.validate = function(e3) {
            return function(r4, t4) {
              var n3 = r4.slice(t4);
              return e3.test(n3) ? n3.match(e3)[0].length : 0;
            };
          }(t3.validate), void (yr(t3.normalize) ? n2.normalize = t3.normalize : t3.normalize ? i2(r3, t3) : n2.normalize = function(e3, r4) {
            r4.normalize(e3);
          });
        !function(e3) {
          return "[object String]" === Cr(e3);
        }(t3) ? i2(r3, t3) : o2.push(r3);
      }
    }), o2.forEach(function(r3) {
      e2.__compiled__[e2.__schemas__[r3]] && (e2.__compiled__[r3].validate = e2.__compiled__[e2.__schemas__[r3]].validate, e2.__compiled__[r3].normalize = e2.__compiled__[e2.__schemas__[r3]].normalize);
    }), e2.__compiled__[""] = { validate: null, normalize: function(e3, r3) {
      r3.normalize(e3);
    } };
    var a2 = Object.keys(e2.__compiled__).filter(function(r3) {
      return r3.length > 0 && e2.__compiled__[r3];
    }).map(Ar).join("|");
    e2.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + r2.src_ZPCc + "))(" + a2 + ")", "i"), e2.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + r2.src_ZPCc + "))(" + a2 + ")", "ig"), e2.re.schema_at_start = RegExp("^" + e2.re.schema_search.source, "i"), e2.re.pretest = RegExp("(" + e2.re.schema_test.source + ")|(" + e2.re.host_fuzzy_test.source + ")|@", "i"), function(e3) {
      e3.__index__ = -1, e3.__text_cache__ = "";
    }(e2);
  }
  function qr(e2, r2) {
    var t2 = e2.__index__, n2 = e2.__last_index__, s2 = e2.__text_cache__.slice(t2, n2);
    this.schema = e2.__schema__.toLowerCase(), this.index = t2 + r2, this.lastIndex = n2 + r2, this.raw = s2, this.text = s2, this.url = s2;
  }
  function Sr(e2, r2) {
    var t2 = new qr(e2, r2);
    return e2.__compiled__[t2.schema].normalize(t2, e2), t2;
  }
  function Fr(e2, r2) {
    if (!(this instanceof Fr))
      return new Fr(e2, r2);
    var t2;
    r2 || (t2 = e2, Object.keys(t2 || {}).reduce(function(e3, r3) {
      return e3 || xr.hasOwnProperty(r3);
    }, false) && (r2 = e2, e2 = {})), this.__opts__ = vr({}, xr, r2), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = vr({}, Dr, e2), this.__compiled__ = {}, this.__tlds__ = wr, this.__tlds_replaced__ = false, this.re = {}, Er(this);
  }
  Fr.prototype.add = function(e2, r2) {
    return this.__schemas__[e2] = r2, Er(this), this;
  }, Fr.prototype.set = function(e2) {
    return this.__opts__ = vr(this.__opts__, e2), this;
  }, Fr.prototype.test = function(e2) {
    if (this.__text_cache__ = e2, this.__index__ = -1, !e2.length)
      return false;
    var r2, t2, n2, s2, o2, i2, a2, c2;
    if (this.re.schema_test.test(e2)) {
      for ((a2 = this.re.schema_search).lastIndex = 0; null !== (r2 = a2.exec(e2)); )
        if (s2 = this.testSchemaAt(e2, r2[2], a2.lastIndex)) {
          this.__schema__ = r2[2], this.__index__ = r2.index + r2[1].length, this.__last_index__ = r2.index + r2[0].length + s2;
          break;
        }
    }
    return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c2 = e2.search(this.re.host_fuzzy_test)) >= 0 && (this.__index__ < 0 || c2 < this.__index__) && null !== (t2 = e2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (o2 = t2.index + t2[1].length, (this.__index__ < 0 || o2 < this.__index__) && (this.__schema__ = "", this.__index__ = o2, this.__last_index__ = t2.index + t2[0].length)), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && e2.indexOf("@") >= 0 && null !== (n2 = e2.match(this.re.email_fuzzy)) && (o2 = n2.index + n2[1].length, i2 = n2.index + n2[0].length, (this.__index__ < 0 || o2 < this.__index__ || o2 === this.__index__ && i2 > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o2, this.__last_index__ = i2)), this.__index__ >= 0;
  }, Fr.prototype.pretest = function(e2) {
    return this.re.pretest.test(e2);
  }, Fr.prototype.testSchemaAt = function(e2, r2, t2) {
    return this.__compiled__[r2.toLowerCase()] ? this.__compiled__[r2.toLowerCase()].validate(e2, t2, this) : 0;
  }, Fr.prototype.match = function(e2) {
    var r2 = 0, t2 = [];
    this.__index__ >= 0 && this.__text_cache__ === e2 && (t2.push(Sr(this, r2)), r2 = this.__last_index__);
    for (var n2 = r2 ? e2.slice(r2) : e2; this.test(n2); )
      t2.push(Sr(this, r2)), n2 = n2.slice(this.__last_index__), r2 += this.__last_index__;
    return t2.length ? t2 : null;
  }, Fr.prototype.matchAtStart = function(e2) {
    if (this.__text_cache__ = e2, this.__index__ = -1, !e2.length)
      return null;
    var r2 = this.re.schema_at_start.exec(e2);
    if (!r2)
      return null;
    var t2 = this.testSchemaAt(e2, r2[2], r2[0].length);
    return t2 ? (this.__schema__ = r2[2], this.__index__ = r2.index + r2[1].length, this.__last_index__ = r2.index + r2[0].length + t2, Sr(this, 0)) : null;
  }, Fr.prototype.tlds = function(e2, r2) {
    return e2 = Array.isArray(e2) ? e2 : [e2], r2 ? (this.__tlds__ = this.__tlds__.concat(e2).sort().filter(function(e3, r3, t2) {
      return e3 !== t2[r3 - 1];
    }).reverse(), Er(this), this) : (this.__tlds__ = e2.slice(), this.__tlds_replaced__ = true, Er(this), this);
  }, Fr.prototype.normalize = function(e2) {
    e2.schema || (e2.url = "http://" + e2.url), "mailto:" !== e2.schema || /^mailto:/i.test(e2.url) || (e2.url = "mailto:" + e2.url);
  }, Fr.prototype.onCompile = function() {
  };
  var Lr = Fr, zr = 2147483647, Tr = /^xn--/, Ir = /[^\x20-\x7E]/, Mr = /[\x2E\u3002\uFF0E\uFF61]/g, Rr = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, Br = Math.floor, Nr = String.fromCharCode;
  /*! https://mths.be/punycode v1.4.1 by @mathias */
  function Or(e2) {
    throw new RangeError(Rr[e2]);
  }
  function Pr(e2, r2) {
    for (var t2 = e2.length, n2 = []; t2--; )
      n2[t2] = r2(e2[t2]);
    return n2;
  }
  function jr(e2, r2) {
    var t2 = e2.split("@"), n2 = "";
    return t2.length > 1 && (n2 = t2[0] + "@", e2 = t2[1]), n2 + Pr((e2 = e2.replace(Mr, ".")).split("."), r2).join(".");
  }
  function Ur(e2) {
    for (var r2, t2, n2 = [], s2 = 0, o2 = e2.length; s2 < o2; )
      (r2 = e2.charCodeAt(s2++)) >= 55296 && r2 <= 56319 && s2 < o2 ? 56320 == (64512 & (t2 = e2.charCodeAt(s2++))) ? n2.push(((1023 & r2) << 10) + (1023 & t2) + 65536) : (n2.push(r2), s2--) : n2.push(r2);
    return n2;
  }
  function Vr(e2) {
    return Pr(e2, function(e3) {
      var r2 = "";
      return e3 > 65535 && (r2 += Nr((e3 -= 65536) >>> 10 & 1023 | 55296), e3 = 56320 | 1023 & e3), r2 += Nr(e3);
    }).join("");
  }
  function Zr(e2, r2) {
    return e2 + 22 + 75 * (e2 < 26) - ((0 != r2) << 5);
  }
  function $r(e2, r2, t2) {
    var n2 = 0;
    for (e2 = t2 ? Br(e2 / 700) : e2 >> 1, e2 += Br(e2 / r2); e2 > 455; n2 += 36)
      e2 = Br(e2 / 35);
    return Br(n2 + 36 * e2 / (e2 + 38));
  }
  function Gr(e2) {
    var r2, t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2 = [], f2 = e2.length, d2 = 0, m2 = 128, g2 = 72;
    for ((t2 = e2.lastIndexOf("-")) < 0 && (t2 = 0), n2 = 0; n2 < t2; ++n2)
      e2.charCodeAt(n2) >= 128 && Or("not-basic"), h2.push(e2.charCodeAt(n2));
    for (s2 = t2 > 0 ? t2 + 1 : 0; s2 < f2; ) {
      for (o2 = d2, i2 = 1, a2 = 36; s2 >= f2 && Or("invalid-input"), ((c2 = (p2 = e2.charCodeAt(s2++)) - 48 < 10 ? p2 - 22 : p2 - 65 < 26 ? p2 - 65 : p2 - 97 < 26 ? p2 - 97 : 36) >= 36 || c2 > Br((zr - d2) / i2)) && Or("overflow"), d2 += c2 * i2, !(c2 < (l2 = a2 <= g2 ? 1 : a2 >= g2 + 26 ? 26 : a2 - g2)); a2 += 36)
        i2 > Br(zr / (u2 = 36 - l2)) && Or("overflow"), i2 *= u2;
      g2 = $r(d2 - o2, r2 = h2.length + 1, 0 == o2), Br(d2 / r2) > zr - m2 && Or("overflow"), m2 += Br(d2 / r2), d2 %= r2, h2.splice(d2++, 0, m2);
    }
    return Vr(h2);
  }
  function Hr(e2) {
    var r2, t2, n2, s2, o2, i2, a2, c2, l2, u2, p2, h2, f2, d2, m2, g2 = [];
    for (h2 = (e2 = Ur(e2)).length, r2 = 128, t2 = 0, o2 = 72, i2 = 0; i2 < h2; ++i2)
      (p2 = e2[i2]) < 128 && g2.push(Nr(p2));
    for (n2 = s2 = g2.length, s2 && g2.push("-"); n2 < h2; ) {
      for (a2 = zr, i2 = 0; i2 < h2; ++i2)
        (p2 = e2[i2]) >= r2 && p2 < a2 && (a2 = p2);
      for (a2 - r2 > Br((zr - t2) / (f2 = n2 + 1)) && Or("overflow"), t2 += (a2 - r2) * f2, r2 = a2, i2 = 0; i2 < h2; ++i2)
        if ((p2 = e2[i2]) < r2 && ++t2 > zr && Or("overflow"), p2 == r2) {
          for (c2 = t2, l2 = 36; !(c2 < (u2 = l2 <= o2 ? 1 : l2 >= o2 + 26 ? 26 : l2 - o2)); l2 += 36)
            m2 = c2 - u2, d2 = 36 - u2, g2.push(Nr(Zr(u2 + m2 % d2, 0))), c2 = Br(m2 / d2);
          g2.push(Nr(Zr(c2, 0))), o2 = $r(t2, f2, n2 == s2), t2 = 0, ++n2;
        }
      ++t2, ++r2;
    }
    return g2.join("");
  }
  function Jr(e2) {
    return jr(e2, function(e3) {
      return Tr.test(e3) ? Gr(e3.slice(4).toLowerCase()) : e3;
    });
  }
  function Wr(e2) {
    return jr(e2, function(e3) {
      return Ir.test(e3) ? "xn--" + Hr(e3) : e3;
    });
  }
  var Yr = { decode: Ur, encode: Vr }, Kr = { version: "1.4.1", ucs2: Yr, toASCII: Wr, toUnicode: Jr, encode: Hr, decode: Gr }, Qr = r$1, Xr = q$1, et = R$1, rt = pe$1, tt = Ne$1, nt = br, st = Lr, ot = s$1, it = e$1(Object.freeze({ __proto__: null, decode: Gr, encode: Hr, toUnicode: Jr, toASCII: Wr, version: "1.4.1", ucs2: Yr, default: Kr })), at = { default: { options: { html: false, xhtmlOut: false, breaks: false, langPrefix: "language-", linkify: false, typographer: false, quotes: "“”‘’", highlight: null, maxNesting: 100 }, components: { core: {}, block: {}, inline: {} } }, zero: { options: { html: false, xhtmlOut: false, breaks: false, langPrefix: "language-", linkify: false, typographer: false, quotes: "“”‘’", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline", "text_join"] }, block: { rules: ["paragraph"] }, inline: { rules: ["text"], rules2: ["balance_pairs", "fragments_join"] } } }, commonmark: { options: { html: true, xhtmlOut: true, breaks: false, langPrefix: "language-", linkify: false, typographer: false, quotes: "“”‘’", highlight: null, maxNesting: 20 }, components: { core: { rules: ["normalize", "block", "inline", "text_join"] }, block: { rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"] }, inline: { rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"], rules2: ["balance_pairs", "emphasis", "fragments_join"] } } } }, ct = /^(vbscript|javascript|file|data):/, lt = /^data:image\/(gif|png|jpeg|webp);/;
  function ut(e2) {
    var r2 = e2.trim().toLowerCase();
    return !ct.test(r2) || !!lt.test(r2);
  }
  var pt = ["http:", "https:", "mailto:"];
  function ht(e2) {
    var r2 = ot.parse(e2, true);
    if (r2.hostname && (!r2.protocol || pt.indexOf(r2.protocol) >= 0))
      try {
        r2.hostname = it.toASCII(r2.hostname);
      } catch (e3) {
      }
    return ot.encode(ot.format(r2));
  }
  function ft(e2) {
    var r2 = ot.parse(e2, true);
    if (r2.hostname && (!r2.protocol || pt.indexOf(r2.protocol) >= 0))
      try {
        r2.hostname = it.toUnicode(r2.hostname);
      } catch (e3) {
      }
    return ot.decode(ot.format(r2), ot.decode.defaultChars + "%");
  }
  function dt(e2, r2) {
    if (!(this instanceof dt))
      return new dt(e2, r2);
    r2 || Qr.isString(e2) || (r2 = e2 || {}, e2 = "default"), this.inline = new nt(), this.block = new tt(), this.core = new rt(), this.renderer = new et(), this.linkify = new st(), this.validateLink = ut, this.normalizeLink = ht, this.normalizeLinkText = ft, this.utils = Qr, this.helpers = Qr.assign({}, Xr), this.options = {}, this.configure(e2), r2 && this.set(r2);
  }
  dt.prototype.set = function(e2) {
    return Qr.assign(this.options, e2), this;
  }, dt.prototype.configure = function(e2) {
    var r2, t2 = this;
    if (Qr.isString(e2) && !(e2 = at[r2 = e2]))
      throw new Error('Wrong `markdown-it` preset "' + r2 + '", check name');
    if (!e2)
      throw new Error("Wrong `markdown-it` preset, can't be empty");
    return e2.options && t2.set(e2.options), e2.components && Object.keys(e2.components).forEach(function(r3) {
      e2.components[r3].rules && t2[r3].ruler.enableOnly(e2.components[r3].rules), e2.components[r3].rules2 && t2[r3].ruler2.enableOnly(e2.components[r3].rules2);
    }), this;
  }, dt.prototype.enable = function(e2, r2) {
    var t2 = [];
    Array.isArray(e2) || (e2 = [e2]), ["core", "block", "inline"].forEach(function(r3) {
      t2 = t2.concat(this[r3].ruler.enable(e2, true));
    }, this), t2 = t2.concat(this.inline.ruler2.enable(e2, true));
    var n2 = e2.filter(function(e3) {
      return t2.indexOf(e3) < 0;
    });
    if (n2.length && !r2)
      throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n2);
    return this;
  }, dt.prototype.disable = function(e2, r2) {
    var t2 = [];
    Array.isArray(e2) || (e2 = [e2]), ["core", "block", "inline"].forEach(function(r3) {
      t2 = t2.concat(this[r3].ruler.disable(e2, true));
    }, this), t2 = t2.concat(this.inline.ruler2.disable(e2, true));
    var n2 = e2.filter(function(e3) {
      return t2.indexOf(e3) < 0;
    });
    if (n2.length && !r2)
      throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n2);
    return this;
  }, dt.prototype.use = function(e2) {
    var r2 = [this].concat(Array.prototype.slice.call(arguments, 1));
    return e2.apply(e2, r2), this;
  }, dt.prototype.parse = function(e2, r2) {
    if ("string" != typeof e2)
      throw new Error("Input data should be a String");
    var t2 = new this.core.State(e2, this, r2);
    return this.core.process(t2), t2.tokens;
  }, dt.prototype.render = function(e2, r2) {
    return r2 = r2 || {}, this.renderer.render(this.parse(e2, r2), this.options, r2);
  }, dt.prototype.parseInline = function(e2, r2) {
    var t2 = new this.core.State(e2, this, r2);
    return t2.inlineMode = true, this.core.process(t2), t2.tokens;
  }, dt.prototype.renderInline = function(e2, r2) {
    return r2 = r2 || {}, this.renderer.render(this.parseInline(e2, r2), this.options, r2);
  };
  var mt = dt;
  var e = {
    exports: {}
  };
  function n(e2) {
    return e2 instanceof Map ? e2.clear = e2.delete = e2.set = () => {
      throw Error("map is read-only");
    } : e2 instanceof Set && (e2.add = e2.clear = e2.delete = () => {
      throw Error("set is read-only");
    }), Object.freeze(e2), Object.getOwnPropertyNames(e2).forEach((t2) => {
      var a2 = e2[t2];
      "object" != typeof a2 || Object.isFrozen(a2) || n(a2);
    }), e2;
  }
  e.exports = n, e.exports.default = n;
  class t {
    constructor(e2) {
      void 0 === e2.data && (e2.data = {}), this.data = e2.data, this.isMatchIgnored = false;
    }
    ignoreMatch() {
      this.isMatchIgnored = true;
    }
  }
  function a(e2) {
    return e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(
      /'/g,
      "&#x27;"
    );
  }
  function i(e2, ...n2) {
    const t2 = /* @__PURE__ */ Object.create(null);
    for (const n3 in e2)
      t2[n3] = e2[n3];
    return n2.forEach((e3) => {
      for (const n3 in e3)
        t2[n3] = e3[n3];
    }), t2;
  }
  const r = (e2) => !!e2.scope || e2.sublanguage && e2.language;
  class s {
    constructor(e2, n2) {
      this.buffer = "", this.classPrefix = n2.classPrefix, e2.walk(this);
    }
    addText(e2) {
      this.buffer += a(e2);
    }
    openNode(e2) {
      if (!r(e2))
        return;
      let n2 = "";
      n2 = e2.sublanguage ? "language-" + e2.language : ((e3, {
        prefix: n3
      }) => {
        if (e3.includes(".")) {
          const t2 = e3.split(".");
          return [`${n3}${t2.shift()}`, ...t2.map((e4, n4) => `${e4}${"_".repeat(n4 + 1)}`)].join(" ");
        }
        return `${n3}${e3}`;
      })(e2.scope, {
        prefix: this.classPrefix
      }), this.span(n2);
    }
    closeNode(e2) {
      r(e2) && (this.buffer += "</span>");
    }
    value() {
      return this.buffer;
    }
    span(e2) {
      this.buffer += `<span class="${e2}">`;
    }
  }
  const o = (e2 = {}) => {
    const n2 = {
      children: []
    };
    return Object.assign(n2, e2), n2;
  };
  class l {
    constructor() {
      this.rootNode = o(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    add(e2) {
      this.top.children.push(e2);
    }
    openNode(e2) {
      const n2 = o({
        scope: e2
      });
      this.add(n2), this.stack.push(n2);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); )
        ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    walk(e2) {
      return this.constructor._walk(e2, this.rootNode);
    }
    static _walk(e2, n2) {
      return "string" == typeof n2 ? e2.addText(n2) : n2.children && (e2.openNode(n2), n2.children.forEach((n3) => this._walk(e2, n3)), e2.closeNode(n2)), e2;
    }
    static _collapse(e2) {
      "string" != typeof e2 && e2.children && (e2.children.every((e3) => "string" == typeof e3) ? e2.children = [
        e2.children.join("")
      ] : e2.children.forEach((e3) => {
        l._collapse(e3);
      }));
    }
  }
  class c extends l {
    constructor(e2) {
      super(), this.options = e2;
    }
    addKeyword(e2, n2) {
      "" !== e2 && (this.openNode(n2), this.addText(e2), this.closeNode());
    }
    addText(e2) {
      "" !== e2 && this.add(e2);
    }
    addSublanguage(e2, n2) {
      const t2 = e2.root;
      t2.sublanguage = true, t2.language = n2, this.add(t2);
    }
    toHTML() {
      return new s(this, this.options).value();
    }
    finalize() {
      return true;
    }
  }
  function d(e2) {
    return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
  }
  function g(e2) {
    return m("(?=", e2, ")");
  }
  function u(e2) {
    return m("(?:", e2, ")*");
  }
  function b(e2) {
    return m("(?:", e2, ")?");
  }
  function m(...e2) {
    return e2.map((e3) => d(e3)).join("");
  }
  function p(...e2) {
    const n2 = ((e3) => {
      const n3 = e3[e3.length - 1];
      return "object" == typeof n3 && n3.constructor === Object ? (e3.splice(e3.length - 1, 1), n3) : {};
    })(e2);
    return "(" + (n2.capture ? "" : "?:") + e2.map((e3) => d(e3)).join("|") + ")";
  }
  function _(e2) {
    return RegExp(e2.toString() + "|").exec("").length - 1;
  }
  const h = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function f(e2, {
    joinWith: n2
  }) {
    let t2 = 0;
    return e2.map((e3) => {
      t2 += 1;
      const n3 = t2;
      let a2 = d(e3), i2 = "";
      for (; a2.length > 0; ) {
        const e4 = h.exec(a2);
        if (!e4) {
          i2 += a2;
          break;
        }
        i2 += a2.substring(0, e4.index), a2 = a2.substring(e4.index + e4[0].length), "\\" === e4[0][0] && e4[1] ? i2 += "\\" + (Number(e4[1]) + n3) : (i2 += e4[0], "(" === e4[0] && t2++);
      }
      return i2;
    }).map((e3) => `(${e3})`).join(n2);
  }
  const E = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", y = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, w = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [y]
  }, N = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [y]
  }, v = (e2, n2, t2 = {}) => {
    const a2 = i({
      scope: "comment",
      begin: e2,
      end: n2,
      contains: []
    }, t2);
    a2.contains.push({
      scope: "doctag",
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: true,
      relevance: 0
    });
    const r2 = p(
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      /[A-Za-z]+[-][a-z]+/,
      /[A-Za-z][a-z]{2,}/
    );
    return a2.contains.push({
      begin: m(/[ ]+/, "(", r2, /[.]?[:]?([.][ ]|[ ])/, "){3}")
    }), a2;
  }, O = v("//", "$"), k = v("/\\*", "\\*/"), x = v("#", "$");
  var M = Object.freeze({
    __proto__: null,
    MATCH_NOTHING_RE: /\b\B/,
    IDENT_RE: "[a-zA-Z]\\w*",
    UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
    NUMBER_RE: "\\b\\d+(\\.\\d+)?",
    C_NUMBER_RE: E,
    BINARY_NUMBER_RE: "\\b(0b[01]+)",
    RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG: (e2 = {}) => {
      const n2 = /^#![ ]*\//;
      return e2.binary && (e2.begin = m(n2, /.*\b/, e2.binary, /\b.*/)), i({
        scope: "meta",
        begin: n2,
        end: /$/,
        relevance: 0,
        "on:begin": (e3, n3) => {
          0 !== e3.index && n3.ignoreMatch();
        }
      }, e2);
    },
    BACKSLASH_ESCAPE: y,
    APOS_STRING_MODE: w,
    QUOTE_STRING_MODE: N,
    PHRASAL_WORDS_MODE: {
      begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    },
    COMMENT: v,
    C_LINE_COMMENT_MODE: O,
    C_BLOCK_COMMENT_MODE: k,
    HASH_COMMENT_MODE: x,
    NUMBER_MODE: {
      scope: "number",
      begin: "\\b\\d+(\\.\\d+)?",
      relevance: 0
    },
    C_NUMBER_MODE: {
      scope: "number",
      begin: E,
      relevance: 0
    },
    BINARY_NUMBER_MODE: {
      scope: "number",
      begin: "\\b(0b[01]+)",
      relevance: 0
    },
    REGEXP_MODE: {
      begin: /(?=\/[^/\n]*\/)/,
      contains: [{
        scope: "regexp",
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [y, {
          begin: /\[/,
          end: /\]/,
          relevance: 0,
          contains: [y]
        }]
      }]
    },
    TITLE_MODE: {
      scope: "title",
      begin: "[a-zA-Z]\\w*",
      relevance: 0
    },
    UNDERSCORE_TITLE_MODE: {
      scope: "title",
      begin: "[a-zA-Z_]\\w*",
      relevance: 0
    },
    METHOD_GUARD: {
      begin: "\\.\\s*[a-zA-Z_]\\w*",
      relevance: 0
    },
    END_SAME_AS_BEGIN: (e2) => Object.assign(e2, {
      "on:begin": (e3, n2) => {
        n2.data._beginMatch = e3[1];
      },
      "on:end": (e3, n2) => {
        n2.data._beginMatch !== e3[1] && n2.ignoreMatch();
      }
    })
  });
  function S(e2, n2) {
    "." === e2.input[e2.index - 1] && n2.ignoreMatch();
  }
  function A(e2, n2) {
    void 0 !== e2.className && (e2.scope = e2.className, delete e2.className);
  }
  function C(e2, n2) {
    n2 && e2.beginKeywords && (e2.begin = "\\b(" + e2.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e2.__beforeBegin = S, e2.keywords = e2.keywords || e2.beginKeywords, delete e2.beginKeywords, void 0 === e2.relevance && (e2.relevance = 0));
  }
  function T(e2, n2) {
    Array.isArray(e2.illegal) && (e2.illegal = p(...e2.illegal));
  }
  function R(e2, n2) {
    if (e2.match) {
      if (e2.begin || e2.end)
        throw Error("begin & end are not supported with match");
      e2.begin = e2.match, delete e2.match;
    }
  }
  function D(e2, n2) {
    void 0 === e2.relevance && (e2.relevance = 1);
  }
  const I = (e2, n2) => {
    if (!e2.beforeMatch)
      return;
    if (e2.starts)
      throw Error("beforeMatch cannot be used with starts");
    const t2 = Object.assign({}, e2);
    Object.keys(e2).forEach((n3) => {
      delete e2[n3];
    }), e2.keywords = t2.keywords, e2.begin = m(t2.beforeMatch, g(t2.begin)), e2.starts = {
      relevance: 0,
      contains: [Object.assign(t2, {
        endsParent: true
      })]
    }, e2.relevance = 0, delete t2.beforeMatch;
  }, L = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];
  function B(e2, n2, t2 = "keyword") {
    const a2 = /* @__PURE__ */ Object.create(null);
    return "string" == typeof e2 ? i2(t2, e2.split(" ")) : Array.isArray(e2) ? i2(t2, e2) : Object.keys(e2).forEach((t3) => {
      Object.assign(a2, B(e2[t3], n2, t3));
    }), a2;
    function i2(e3, t3) {
      n2 && (t3 = t3.map((e4) => e4.toLowerCase())), t3.forEach((n3) => {
        const t4 = n3.split("|");
        a2[t4[0]] = [e3, $(t4[0], t4[1])];
      });
    }
  }
  function $(e2, n2) {
    return n2 ? Number(n2) : ((e3) => L.includes(e3.toLowerCase()))(e2) ? 0 : 1;
  }
  const z = {}, F = (e2) => {
    formatAppLog("error", "at components/ua-markdown/lib/highlight/uni-highlight.min.js:390", e2);
  }, U = (e2, ...n2) => {
    formatAppLog("log", "at components/ua-markdown/lib/highlight/uni-highlight.min.js:393", "WARN: " + e2, ...n2);
  }, j = (e2, n2) => {
    z[`${e2}/${n2}`] || (formatAppLog("log", "at components/ua-markdown/lib/highlight/uni-highlight.min.js:396", `Deprecated as of ${e2}. ${n2}`), z[`${e2}/${n2}`] = true);
  }, P = Error();
  function K(e2, n2, {
    key: t2
  }) {
    let a2 = 0;
    const i2 = e2[t2], r2 = {}, s2 = {};
    for (let e3 = 1; e3 <= n2.length; e3++)
      s2[e3 + a2] = i2[e3], r2[e3 + a2] = true, a2 += _(n2[e3 - 1]);
    e2[t2] = s2, e2[t2]._emit = r2, e2[t2]._multi = true;
  }
  function H(e2) {
    ((e3) => {
      e3.scope && "object" == typeof e3.scope && null !== e3.scope && (e3.beginScope = e3.scope, delete e3.scope);
    })(e2), "string" == typeof e2.beginScope && (e2.beginScope = {
      _wrap: e2.beginScope
    }), "string" == typeof e2.endScope && (e2.endScope = {
      _wrap: e2.endScope
    }), ((e3) => {
      if (Array.isArray(e3.begin)) {
        if (e3.skip || e3.excludeBegin || e3.returnBegin)
          throw F(
            "skip, excludeBegin, returnBegin not compatible with beginScope: {}"
          ), P;
        if ("object" != typeof e3.beginScope || null === e3.beginScope)
          throw F("beginScope must be object"), P;
        K(e3, e3.begin, {
          key: "beginScope"
        }), e3.begin = f(e3.begin, {
          joinWith: ""
        });
      }
    })(e2), ((e3) => {
      if (Array.isArray(e3.end)) {
        if (e3.skip || e3.excludeEnd || e3.returnEnd)
          throw F(
            "skip, excludeEnd, returnEnd not compatible with endScope: {}"
          ), P;
        if ("object" != typeof e3.endScope || null === e3.endScope)
          throw F("endScope must be object"), P;
        K(e3, e3.end, {
          key: "endScope"
        }), e3.end = f(e3.end, {
          joinWith: ""
        });
      }
    })(e2);
  }
  function q(e2) {
    function n2(n3, t3) {
      return RegExp(d(n3), "m" + (e2.case_insensitive ? "i" : "") + (e2.unicodeRegex ? "u" : "") + (t3 ? "g" : ""));
    }
    class t2 {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      addRule(e3, n3) {
        n3.position = this.position++, this.matchIndexes[this.matchAt] = n3, this.regexes.push([n3, e3]), this.matchAt += _(e3) + 1;
      }
      compile() {
        0 === this.regexes.length && (this.exec = () => null);
        const e3 = this.regexes.map((e4) => e4[1]);
        this.matcherRe = n2(f(e3, {
          joinWith: "|"
        }), true), this.lastIndex = 0;
      }
      exec(e3) {
        this.matcherRe.lastIndex = this.lastIndex;
        const n3 = this.matcherRe.exec(e3);
        if (!n3)
          return null;
        const t3 = n3.findIndex((e4, n4) => n4 > 0 && void 0 !== e4), a3 = this.matchIndexes[t3];
        return n3.splice(0, t3), Object.assign(n3, a3);
      }
    }
    class a2 {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      getMatcher(e3) {
        if (this.multiRegexes[e3])
          return this.multiRegexes[e3];
        const n3 = new t2();
        return this.rules.slice(e3).forEach(([e4, t3]) => n3.addRule(e4, t3)), n3.compile(), this.multiRegexes[e3] = n3, n3;
      }
      resumingScanAtSamePosition() {
        return 0 !== this.regexIndex;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      addRule(e3, n3) {
        this.rules.push([e3, n3]), "begin" === n3.type && this.count++;
      }
      exec(e3) {
        const n3 = this.getMatcher(this.regexIndex);
        n3.lastIndex = this.lastIndex;
        let t3 = n3.exec(e3);
        if (this.resumingScanAtSamePosition())
          if (t3 && t3.index === this.lastIndex)
            ;
          else {
            const n4 = this.getMatcher(0);
            n4.lastIndex = this.lastIndex + 1, t3 = n4.exec(e3);
          }
        return t3 && (this.regexIndex += t3.position + 1, this.regexIndex === this.count && this.considerAll()), t3;
      }
    }
    if (e2.compilerExtensions || (e2.compilerExtensions = []), e2.contains && e2.contains.includes("self"))
      throw Error(
        "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
      );
    return e2.classNameAliases = i(e2.classNameAliases || {}), function t3(r2, s2) {
      const o2 = r2;
      if (r2.isCompiled)
        return o2;
      [A, R, H, I].forEach((e3) => e3(r2, s2)), e2.compilerExtensions.forEach((e3) => e3(r2, s2)), r2.__beforeBegin = null, [C, T, D].forEach((e3) => e3(r2, s2)), r2.isCompiled = true;
      let l2 = null;
      return "object" == typeof r2.keywords && r2.keywords.$pattern && (r2.keywords = Object.assign({}, r2.keywords), l2 = r2.keywords.$pattern, delete r2.keywords.$pattern), l2 = l2 || /\w+/, r2.keywords && (r2.keywords = B(r2.keywords, e2.case_insensitive)), o2.keywordPatternRe = n2(l2, true), s2 && (r2.begin || (r2.begin = /\B|\b/), o2.beginRe = n2(o2.begin), r2.end || r2.endsWithParent || (r2.end = /\B|\b/), r2.end && (o2.endRe = n2(o2.end)), o2.terminatorEnd = d(o2.end) || "", r2.endsWithParent && s2.terminatorEnd && (o2.terminatorEnd += (r2.end ? "|" : "") + s2.terminatorEnd)), r2.illegal && (o2.illegalRe = n2(r2.illegal)), r2.contains || (r2.contains = []), r2.contains = [].concat(...r2.contains.map((e3) => ((e4) => (e4.variants && !e4.cachedVariants && (e4.cachedVariants = e4.variants.map((n3) => i(e4, {
        variants: null
      }, n3))), e4.cachedVariants ? e4.cachedVariants : Z(e4) ? i(e4, {
        starts: e4.starts ? i(e4.starts) : null
      }) : Object.isFrozen(e4) ? i(e4) : e4))("self" === e3 ? r2 : e3))), r2.contains.forEach((e3) => {
        t3(e3, o2);
      }), r2.starts && t3(r2.starts, s2), o2.matcher = ((e3) => {
        const n3 = new a2();
        return e3.contains.forEach((e4) => n3.addRule(e4.begin, {
          rule: e4,
          type: "begin"
        })), e3.terminatorEnd && n3.addRule(e3.terminatorEnd, {
          type: "end"
        }), e3.illegal && n3.addRule(e3.illegal, {
          type: "illegal"
        }), n3;
      })(o2), o2;
    }(e2);
  }
  function Z(e2) {
    return !!e2 && (e2.endsWithParent || Z(e2.starts));
  }
  class G extends Error {
    constructor(e2, n2) {
      super(e2), this.name = "HTMLInjectionError", this.html = n2;
    }
  }
  const W = a, Q = i, X = Symbol("nomatch");
  var V = ((n2) => {
    const a2 = /* @__PURE__ */ Object.create(null), i2 = /* @__PURE__ */ Object.create(null), r2 = [];
    let s2 = true;
    const o2 = "Could not find the language '{}', did you forget to load/include a language module?", l2 = {
      disableAutodetect: true,
      name: "Plain text",
      contains: []
    };
    let d2 = {
      ignoreUnescapedHTML: false,
      throwUnescapedHTML: false,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      __emitter: c
    };
    function _2(e2) {
      return d2.noHighlightRe.test(e2);
    }
    function h2(e2, n3, t2) {
      let a3 = "", i3 = "";
      "object" == typeof n3 ? (a3 = e2, t2 = n3.ignoreIllegals, i3 = n3.language) : (j("10.7.0", "highlight(lang, code, ...args) has been deprecated."), j(
        "10.7.0",
        "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"
      ), i3 = e2, a3 = n3), void 0 === t2 && (t2 = true);
      const r3 = {
        code: a3,
        language: i3
      };
      x2("before:highlight", r3);
      const s3 = r3.result ? r3.result : f2(r3.language, r3.code, t2);
      return s3.code = r3.code, x2("after:highlight", s3), s3;
    }
    function f2(e2, n3, i3, r3) {
      const l3 = /* @__PURE__ */ Object.create(null);
      function c2() {
        if (!k3.keywords)
          return void M2.addText(S2);
        let e3 = 0;
        k3.keywordPatternRe.lastIndex = 0;
        let n4 = k3.keywordPatternRe.exec(S2), t2 = "";
        for (; n4; ) {
          t2 += S2.substring(e3, n4.index);
          const i4 = w3.case_insensitive ? n4[0].toLowerCase() : n4[0], r4 = (a3 = i4, k3.keywords[a3]);
          if (r4) {
            const [e4, a4] = r4;
            if (M2.addText(t2), t2 = "", l3[i4] = (l3[i4] || 0) + 1, l3[i4] <= 7 && (A2 += a4), e4.startsWith("_"))
              t2 += n4[0];
            else {
              const t3 = w3.classNameAliases[e4] || e4;
              M2.addKeyword(n4[0], t3);
            }
          } else
            t2 += n4[0];
          e3 = k3.keywordPatternRe.lastIndex, n4 = k3.keywordPatternRe.exec(S2);
        }
        var a3;
        t2 += S2.substring(e3), M2.addText(t2);
      }
      function g2() {
        null != k3.subLanguage ? (() => {
          if ("" === S2)
            return;
          let e3 = null;
          if ("string" == typeof k3.subLanguage) {
            if (!a2[k3.subLanguage])
              return void M2.addText(S2);
            e3 = f2(k3.subLanguage, S2, true, x3[k3.subLanguage]), x3[k3.subLanguage] = e3._top;
          } else
            e3 = E2(S2, k3.subLanguage.length ? k3.subLanguage : null);
          k3.relevance > 0 && (A2 += e3.relevance), M2.addSublanguage(e3._emitter, e3.language);
        })() : c2(), S2 = "";
      }
      function u2(e3, n4) {
        let t2 = 1;
        const a3 = n4.length - 1;
        for (; t2 <= a3; ) {
          if (!e3._emit[t2]) {
            t2++;
            continue;
          }
          const a4 = w3.classNameAliases[e3[t2]] || e3[t2], i4 = n4[t2];
          a4 ? M2.addKeyword(i4, a4) : (S2 = i4, c2(), S2 = ""), t2++;
        }
      }
      function b2(e3, n4) {
        return e3.scope && "string" == typeof e3.scope && M2.openNode(w3.classNameAliases[e3.scope] || e3.scope), e3.beginScope && (e3.beginScope._wrap ? (M2.addKeyword(S2, w3.classNameAliases[e3.beginScope._wrap] || e3.beginScope._wrap), S2 = "") : e3.beginScope._multi && (u2(e3.beginScope, n4), S2 = "")), k3 = Object.create(e3, {
          parent: {
            value: k3
          }
        }), k3;
      }
      function m2(e3, n4, a3) {
        let i4 = ((e4, n5) => {
          const t2 = e4 && e4.exec(n5);
          return t2 && 0 === t2.index;
        })(e3.endRe, a3);
        if (i4) {
          if (e3["on:end"]) {
            const a4 = new t(e3);
            e3["on:end"](n4, a4), a4.isMatchIgnored && (i4 = false);
          }
          if (i4) {
            for (; e3.endsParent && e3.parent; )
              e3 = e3.parent;
            return e3;
          }
        }
        if (e3.endsWithParent)
          return m2(e3.parent, n4, a3);
      }
      function p2(e3) {
        return 0 === k3.matcher.regexIndex ? (S2 += e3[0], 1) : (R2 = true, 0);
      }
      function _3(e3) {
        const t2 = e3[0], a3 = n3.substring(e3.index), i4 = m2(k3, e3, a3);
        if (!i4)
          return X;
        const r4 = k3;
        k3.endScope && k3.endScope._wrap ? (g2(), M2.addKeyword(t2, k3.endScope._wrap)) : k3.endScope && k3.endScope._multi ? (g2(), u2(k3.endScope, e3)) : r4.skip ? S2 += t2 : (r4.returnEnd || r4.excludeEnd || (S2 += t2), g2(), r4.excludeEnd && (S2 = t2));
        do {
          k3.scope && M2.closeNode(), k3.skip || k3.subLanguage || (A2 += k3.relevance), k3 = k3.parent;
        } while (k3 !== i4.parent);
        return i4.starts && b2(i4.starts, e3), r4.returnEnd ? 0 : t2.length;
      }
      let h3 = {};
      function y3(a3, r4) {
        const o3 = r4 && r4[0];
        if (S2 += a3, null == o3)
          return g2(), 0;
        if ("begin" === h3.type && "end" === r4.type && h3.index === r4.index && "" === o3) {
          if (S2 += n3.slice(r4.index, r4.index + 1), !s2) {
            const n4 = Error(`0 width match regex (${e2})`);
            throw n4.languageName = e2, n4.badRule = h3.rule, n4;
          }
          return 1;
        }
        if (h3 = r4, "begin" === r4.type)
          return ((e3) => {
            const n4 = e3[0], a4 = e3.rule, i4 = new t(a4), r5 = [a4.__beforeBegin, a4["on:begin"]];
            for (const t2 of r5)
              if (t2 && (t2(e3, i4), i4.isMatchIgnored))
                return p2(n4);
            return a4.skip ? S2 += n4 : (a4.excludeBegin && (S2 += n4), g2(), a4.returnBegin || a4.excludeBegin || (S2 = n4)), b2(a4, e3), a4.returnBegin ? 0 : n4.length;
          })(r4);
        if ("illegal" === r4.type && !i3) {
          const e3 = Error('Illegal lexeme "' + o3 + '" for mode "' + (k3.scope || "<unnamed>") + '"');
          throw e3.mode = k3, e3;
        }
        if ("end" === r4.type) {
          const e3 = _3(r4);
          if (e3 !== X)
            return e3;
        }
        if ("illegal" === r4.type && "" === o3)
          return 1;
        if (T2 > 1e5 && T2 > 3 * r4.index)
          throw Error("potential infinite loop, way more iterations than matches");
        return S2 += o3, o3.length;
      }
      const w3 = v2(e2);
      if (!w3)
        throw F(o2.replace("{}", e2)), Error('Unknown language: "' + e2 + '"');
      const N3 = q(w3);
      let O3 = "", k3 = r3 || N3;
      const x3 = {}, M2 = new d2.__emitter(d2);
      (() => {
        const e3 = [];
        for (let n4 = k3; n4 !== w3; n4 = n4.parent)
          n4.scope && e3.unshift(n4.scope);
        e3.forEach((e4) => M2.openNode(e4));
      })();
      let S2 = "", A2 = 0, C2 = 0, T2 = 0, R2 = false;
      try {
        for (k3.matcher.considerAll(); ; ) {
          T2++, R2 ? R2 = false : k3.matcher.considerAll(), k3.matcher.lastIndex = C2;
          const e3 = k3.matcher.exec(n3);
          if (!e3)
            break;
          const t2 = y3(n3.substring(C2, e3.index), e3);
          C2 = e3.index + t2;
        }
        return y3(n3.substring(C2)), M2.closeAllNodes(), M2.finalize(), O3 = M2.toHTML(), {
          language: e2,
          value: O3,
          relevance: A2,
          illegal: false,
          _emitter: M2,
          _top: k3
        };
      } catch (t2) {
        if (t2.message && t2.message.includes("Illegal"))
          return {
            language: e2,
            value: W(n3),
            illegal: true,
            relevance: 0,
            _illegalBy: {
              message: t2.message,
              index: C2,
              context: n3.slice(C2 - 100, C2 + 100),
              mode: t2.mode,
              resultSoFar: O3
            },
            _emitter: M2
          };
        if (s2)
          return {
            language: e2,
            value: W(n3),
            illegal: false,
            relevance: 0,
            errorRaised: t2,
            _emitter: M2,
            _top: k3
          };
        throw t2;
      }
    }
    function E2(e2, n3) {
      n3 = n3 || d2.languages || Object.keys(a2);
      const t2 = ((e3) => {
        const n4 = {
          value: W(e3),
          illegal: false,
          relevance: 0,
          _top: l2,
          _emitter: new d2.__emitter(d2)
        };
        return n4._emitter.addText(e3), n4;
      })(e2), i3 = n3.filter(v2).filter(k2).map((n4) => f2(n4, e2, false));
      i3.unshift(t2);
      const r3 = i3.sort((e3, n4) => {
        if (e3.relevance !== n4.relevance)
          return n4.relevance - e3.relevance;
        if (e3.language && n4.language) {
          if (v2(e3.language).supersetOf === n4.language)
            return 1;
          if (v2(n4.language).supersetOf === e3.language)
            return -1;
        }
        return 0;
      }), [s3, o3] = r3, c2 = s3;
      return c2.secondBest = o3, c2;
    }
    function y2(e2) {
      let n3 = null;
      const t2 = ((e3) => {
        let n4 = e3.className + " ";
        n4 += e3.parentNode ? e3.parentNode.className : "";
        const t3 = d2.languageDetectRe.exec(n4);
        if (t3) {
          const n5 = v2(t3[1]);
          return n5 || (U(o2.replace("{}", t3[1])), U("Falling back to no-highlight mode for this block.", e3)), n5 ? t3[1] : "no-highlight";
        }
        return n4.split(/\s+/).find((e4) => _2(e4) || v2(e4));
      })(e2);
      if (_2(t2))
        return;
      if (x2("before:highlightElement", {
        el: e2,
        language: t2
      }), e2.children.length > 0 && (d2.ignoreUnescapedHTML || (formatAppLog(
        "warn",
        "at components/ua-markdown/lib/highlight/uni-highlight.min.js:845",
        "One of your code blocks includes unescaped HTML. This is a potentially serious security risk."
      ), formatAppLog("warn", "at components/ua-markdown/lib/highlight/uni-highlight.min.js:847", "https://github.com/highlightjs/highlight.js/wiki/security"), formatAppLog("warn", "at components/ua-markdown/lib/highlight/uni-highlight.min.js:848", "The element with unescaped HTML:"), formatAppLog("warn", "at components/ua-markdown/lib/highlight/uni-highlight.min.js:849", e2)), d2.throwUnescapedHTML))
        throw new G("One of your code blocks includes unescaped HTML.", e2.innerHTML);
      n3 = e2;
      const a3 = n3.textContent, r3 = t2 ? h2(a3, {
        language: t2,
        ignoreIllegals: true
      }) : E2(a3);
      e2.innerHTML = r3.value, ((e3, n4, t3) => {
        const a4 = n4 && i2[n4] || t3;
        e3.classList.add("hljs"), e3.classList.add("language-" + a4);
      })(e2, t2, r3.language), e2.result = {
        language: r3.language,
        re: r3.relevance,
        relevance: r3.relevance
      }, r3.secondBest && (e2.secondBest = {
        language: r3.secondBest.language,
        relevance: r3.secondBest.relevance
      }), x2("after:highlightElement", {
        el: e2,
        result: r3,
        text: a3
      });
    }
    let w2 = false;
    function N2() {
      "loading" !== document.readyState ? document.querySelectorAll(d2.cssSelector).forEach(y2) : w2 = true;
    }
    function v2(e2) {
      return e2 = (e2 || "").toLowerCase(), a2[e2] || a2[i2[e2]];
    }
    function O2(e2, {
      languageName: n3
    }) {
      "string" == typeof e2 && (e2 = [e2]), e2.forEach((e3) => {
        i2[e3.toLowerCase()] = n3;
      });
    }
    function k2(e2) {
      const n3 = v2(e2);
      return n3 && !n3.disableAutodetect;
    }
    function x2(e2, n3) {
      const t2 = e2;
      r2.forEach((e3) => {
        e3[t2] && e3[t2](n3);
      });
    }
    "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", () => {
      w2 && N2();
    }, false), Object.assign(n2, {
      highlight: h2,
      highlightAuto: E2,
      highlightAll: N2,
      highlightElement: y2,
      highlightBlock: (e2) => (j("10.7.0", "highlightBlock will be removed entirely in v12.0"), j("10.7.0", "Please use highlightElement now."), y2(e2)),
      configure: (e2) => {
        d2 = Q(d2, e2);
      },
      initHighlighting: () => {
        N2(), j("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
      },
      initHighlightingOnLoad: () => {
        N2(), j("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
      },
      registerLanguage: (e2, t2) => {
        let i3 = null;
        try {
          i3 = t2(n2);
        } catch (n3) {
          if (F("Language definition for '{}' could not be registered.".replace("{}", e2)), !s2)
            throw n3;
          F(n3), i3 = l2;
        }
        i3.name || (i3.name = e2), a2[e2] = i3, i3.rawDefinition = t2.bind(null, n2), i3.aliases && O2(i3.aliases, {
          languageName: e2
        });
      },
      unregisterLanguage: (e2) => {
        delete a2[e2];
        for (const n3 of Object.keys(i2))
          i2[n3] === e2 && delete i2[n3];
      },
      listLanguages: () => Object.keys(a2),
      getLanguage: v2,
      registerAliases: O2,
      autoDetection: k2,
      inherit: Q,
      addPlugin: (e2) => {
        ((e3) => {
          e3["before:highlightBlock"] && !e3["before:highlightElement"] && (e3["before:highlightElement"] = (n3) => {
            e3["before:highlightBlock"](Object.assign({
              block: n3.el
            }, n3));
          }), e3["after:highlightBlock"] && !e3["after:highlightElement"] && (e3["after:highlightElement"] = (n3) => {
            e3["after:highlightBlock"](Object.assign({
              block: n3.el
            }, n3));
          });
        })(e2), r2.push(e2);
      }
    }), n2.debugMode = () => {
      s2 = false;
    }, n2.safeMode = () => {
      s2 = true;
    }, n2.versionString = "11.7.0", n2.regex = {
      concat: m,
      lookahead: g,
      either: p,
      optional: b,
      anyNumberOfTimes: u
    };
    for (const n3 in M)
      "object" == typeof M[n3] && e.exports(M[n3]);
    return Object.assign(n2, M), n2;
  })({});
  const J = (e2) => ({
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: e2.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: e2.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z][A-Za-z0-9_-]*/
    }
  }), Y = [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "audio",
    "b",
    "blockquote",
    "body",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "mark",
    "menu",
    "nav",
    "object",
    "ol",
    "p",
    "q",
    "quote",
    "samp",
    "section",
    "span",
    "strong",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "ul",
    "var",
    "video"
  ], ee = [
    "any-hover",
    "any-pointer",
    "aspect-ratio",
    "color",
    "color-gamut",
    "color-index",
    "device-aspect-ratio",
    "device-height",
    "device-width",
    "display-mode",
    "forced-colors",
    "grid",
    "height",
    "hover",
    "inverted-colors",
    "monochrome",
    "orientation",
    "overflow-block",
    "overflow-inline",
    "pointer",
    "prefers-color-scheme",
    "prefers-contrast",
    "prefers-reduced-motion",
    "prefers-reduced-transparency",
    "resolution",
    "scan",
    "scripting",
    "update",
    "width",
    "min-width",
    "max-width",
    "min-height",
    "max-height"
  ], ne = [
    "active",
    "any-link",
    "blank",
    "checked",
    "current",
    "default",
    "defined",
    "dir",
    "disabled",
    "drop",
    "empty",
    "enabled",
    "first",
    "first-child",
    "first-of-type",
    "fullscreen",
    "future",
    "focus",
    "focus-visible",
    "focus-within",
    "has",
    "host",
    "host-context",
    "hover",
    "indeterminate",
    "in-range",
    "invalid",
    "is",
    "lang",
    "last-child",
    "last-of-type",
    "left",
    "link",
    "local-link",
    "not",
    "nth-child",
    "nth-col",
    "nth-last-child",
    "nth-last-col",
    "nth-last-of-type",
    "nth-of-type",
    "only-child",
    "only-of-type",
    "optional",
    "out-of-range",
    "past",
    "placeholder-shown",
    "read-only",
    "read-write",
    "required",
    "right",
    "root",
    "scope",
    "target",
    "target-within",
    "user-invalid",
    "valid",
    "visited",
    "where"
  ], te = [
    "after",
    "backdrop",
    "before",
    "cue",
    "cue-region",
    "first-letter",
    "first-line",
    "grammar-error",
    "marker",
    "part",
    "placeholder",
    "selection",
    "slotted",
    "spelling-error"
  ], ae = [
    "align-content",
    "align-items",
    "align-self",
    "all",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "block-size",
    "border",
    "border-block",
    "border-block-color",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-style",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-style",
    "border-block-start-width",
    "border-block-style",
    "border-block-width",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-inline",
    "border-inline-color",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-style",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-style",
    "border-inline-start-width",
    "border-inline-style",
    "border-inline-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "clear",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "contain",
    "content",
    "content-visibility",
    "counter-increment",
    "counter-reset",
    "cue",
    "cue-after",
    "cue-before",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "flow",
    "font",
    "font-display",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-language-override",
    "font-size",
    "font-size-adjust",
    "font-smoothing",
    "font-stretch",
    "font-style",
    "font-synthesis",
    "font-variant",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-variant-position",
    "font-variation-settings",
    "font-weight",
    "gap",
    "glyph-orientation-vertical",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphens",
    "icon",
    "image-orientation",
    "image-rendering",
    "image-resolution",
    "ime-mode",
    "inline-size",
    "isolation",
    "justify-content",
    "left",
    "letter-spacing",
    "line-break",
    "line-height",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-block",
    "margin-block-end",
    "margin-block-start",
    "margin-bottom",
    "margin-inline",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "marks",
    "mask",
    "mask-border",
    "mask-border-mode",
    "mask-border-outset",
    "mask-border-repeat",
    "mask-border-slice",
    "mask-border-source",
    "mask-border-width",
    "mask-clip",
    "mask-composite",
    "mask-image",
    "mask-mode",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "mask-type",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-width",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "mix-blend-mode",
    "nav-down",
    "nav-index",
    "nav-left",
    "nav-right",
    "nav-up",
    "none",
    "normal",
    "object-fit",
    "object-position",
    "opacity",
    "order",
    "orphans",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-block",
    "padding-block-end",
    "padding-block-start",
    "padding-bottom",
    "padding-inline",
    "padding-inline-end",
    "padding-inline-start",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "pause",
    "pause-after",
    "pause-before",
    "perspective",
    "perspective-origin",
    "pointer-events",
    "position",
    "quotes",
    "resize",
    "rest",
    "rest-after",
    "rest-before",
    "right",
    "row-gap",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-snap-type",
    "scrollbar-color",
    "scrollbar-gutter",
    "scrollbar-width",
    "shape-image-threshold",
    "shape-margin",
    "shape-outside",
    "speak",
    "speak-as",
    "src",
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-all",
    "text-align-last",
    "text-combine-upright",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-indent",
    "text-justify",
    "text-orientation",
    "text-overflow",
    "text-rendering",
    "text-shadow",
    "text-transform",
    "text-underline-position",
    "top",
    "transform",
    "transform-box",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "unicode-bidi",
    "vertical-align",
    "visibility",
    "voice-balance",
    "voice-duration",
    "voice-family",
    "voice-pitch",
    "voice-range",
    "voice-rate",
    "voice-stress",
    "voice-volume",
    "white-space",
    "widows",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index"
  ].reverse(), ie = ne.concat(te);
  var re = "\\.([0-9](_*[0-9])*)", se = "[0-9a-fA-F](_*[0-9a-fA-F])*", oe = {
    className: "number",
    variants: [{
      begin: `(\\b([0-9](_*[0-9])*)((${re})|\\.)?|(${re}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
    }, {
      begin: `\\b([0-9](_*[0-9])*)((${re})[fFdD]?\\b|\\.([fFdD]\\b)?)`
    }, {
      begin: `(${re})[fFdD]?\\b`
    }, {
      begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b"
    }, {
      begin: `\\b0[xX]((${se})\\.?|(${se})?\\.(${se}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
    }, {
      begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
    }, {
      begin: `\\b0[xX](${se})[lL]?\\b`
    }, {
      begin: "\\b0(_*[0-7])*[lL]?\\b"
    }, {
      begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
    }],
    relevance: 0
  };
  function le(e2, n2, t2) {
    return -1 === t2 ? "" : e2.replace(n2, (a2) => le(e2, n2, t2 - 1));
  }
  const ce = "[A-Za-z$_][0-9A-Za-z$_]*", de = [
    "as",
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends"
  ], ge = ["true", "false", "null", "undefined", "NaN", "Infinity"], ue = [
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    "Math",
    "Date",
    "Number",
    "BigInt",
    "String",
    "RegExp",
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    "Reflect",
    "Proxy",
    "Intl",
    "WebAssembly"
  ], be = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], me = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
  ], pe = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], _e = [].concat(me, ue, be);
  function he(e2) {
    const n2 = e2.regex, t2 = ce, a2 = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      isTrulyOpeningTag: (e3, n3) => {
        const t3 = e3[0].length + e3.index, a3 = e3.input[t3];
        if ("<" === a3 || "," === a3)
          return void n3.ignoreMatch();
        let i3;
        ">" === a3 && (((e4, {
          after: n4
        }) => {
          const t4 = "</" + e4[0].slice(1);
          return -1 !== e4.input.indexOf(t4, n4);
        })(e3, {
          after: t3
        }) || n3.ignoreMatch());
        const r3 = e3.input.substring(t3);
        ((i3 = r3.match(/^\s*=/)) || (i3 = r3.match(/^\s+extends\s+/)) && 0 === i3.index) && n3.ignoreMatch();
      }
    }, i2 = {
      $pattern: ce,
      keyword: de,
      literal: ge,
      built_in: _e,
      "variable.language": pe
    }, r2 = "\\.([0-9](_?[0-9])*)", s2 = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", o2 = {
      className: "number",
      variants: [{
        begin: `(\\b(${s2})((${r2})|\\.)?|(${r2}))[eE][+-]?([0-9](_?[0-9])*)\\b`
      }, {
        begin: `\\b(${s2})\\b((${r2})\\b|\\.)?|(${r2})\\b`
      }, {
        begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
      }, {
        begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
      }, {
        begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
      }, {
        begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
      }, {
        begin: "\\b0[0-7]+n?\\b"
      }],
      relevance: 0
    }, l2 = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: i2,
      contains: []
    }, c2 = {
      begin: "html`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [e2.BACKSLASH_ESCAPE, l2],
        subLanguage: "xml"
      }
    }, d2 = {
      begin: "css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [e2.BACKSLASH_ESCAPE, l2],
        subLanguage: "css"
      }
    }, g2 = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [e2.BACKSLASH_ESCAPE, l2]
    }, u2 = {
      className: "comment",
      variants: [e2.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
        relevance: 0,
        contains: [{
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [{
            className: "doctag",
            begin: "@[A-Za-z]+"
          }, {
            className: "type",
            begin: "\\{",
            end: "\\}",
            excludeEnd: true,
            excludeBegin: true,
            relevance: 0
          }, {
            className: "variable",
            begin: t2 + "(?=\\s*(-)|$)",
            endsParent: true,
            relevance: 0
          }, {
            begin: /(?=[^\n])\s/,
            relevance: 0
          }]
        }]
      }), e2.C_BLOCK_COMMENT_MODE, e2.C_LINE_COMMENT_MODE]
    }, b2 = [e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, c2, d2, g2, {
      match: /\$\d+/
    }, o2];
    l2.contains = b2.concat({
      begin: /\{/,
      end: /\}/,
      keywords: i2,
      contains: ["self"].concat(b2)
    });
    const m2 = [].concat(u2, l2.contains), p2 = m2.concat([{
      begin: /\(/,
      end: /\)/,
      keywords: i2,
      contains: ["self"].concat(m2)
    }]), _2 = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      excludeBegin: true,
      excludeEnd: true,
      keywords: i2,
      contains: p2
    }, h2 = {
      variants: [{
        match: [/class/, /\s+/, t2, /\s+/, /extends/, /\s+/, n2.concat(t2, "(", n2.concat(/\./, t2), ")*")],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      }, {
        match: [/class/, /\s+/, t2],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }]
    }, f2 = {
      relevance: 0,
      match: n2.either(
        /\bJSON/,
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      ),
      className: "title.class",
      keywords: {
        _: [...ue, ...be]
      }
    }, E2 = {
      variants: [{
        match: [/function/, /\s+/, t2, /(?=\s*\()/]
      }, {
        match: [/function/, /\s*(?=\()/]
      }],
      className: {
        1: "keyword",
        3: "title.function"
      },
      label: "func.def",
      contains: [_2],
      illegal: /%/
    }, y2 = {
      match: n2.concat(/\b/, (w2 = [...me, "super", "import"], n2.concat("(?!", w2.join("|"), ")")), t2, n2.lookahead(/\(/)),
      className: "title.function",
      relevance: 0
    };
    var w2;
    const N2 = {
      begin: n2.concat(/\./, n2.lookahead(n2.concat(t2, /(?![0-9A-Za-z$_(])/))),
      end: t2,
      excludeBegin: true,
      keywords: "prototype",
      className: "property",
      relevance: 0
    }, v2 = {
      match: [/get|set/, /\s+/, t2, /(?=\()/],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [{
        begin: /\(\)/
      }, _2]
    }, O2 = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e2.UNDERSCORE_IDENT_RE + ")\\s*=>", k2 = {
      match: [/const|var|let/, /\s+/, t2, /\s*/, /=\s*/, /(async\s*)?/, n2.lookahead(O2)],
      keywords: "async",
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [_2]
    };
    return {
      name: "Javascript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: i2,
      exports: {
        PARAMS_CONTAINS: p2,
        CLASS_REFERENCE: f2
      },
      illegal: /#(?![$_A-z])/,
      contains: [e2.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }), {
        label: "use_strict",
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      }, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, c2, d2, g2, u2, {
        match: /\$\d+/
      }, o2, f2, {
        className: "attr",
        begin: t2 + n2.lookahead(":"),
        relevance: 0
      }, k2, {
        begin: "(" + e2.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [u2, e2.REGEXP_MODE, {
          className: "function",
          begin: O2,
          returnBegin: true,
          end: "\\s*=>",
          contains: [{
            className: "params",
            variants: [{
              begin: e2.UNDERSCORE_IDENT_RE,
              relevance: 0
            }, {
              className: null,
              begin: /\(\s*\)/,
              skip: true
            }, {
              begin: /\(/,
              end: /\)/,
              excludeBegin: true,
              excludeEnd: true,
              keywords: i2,
              contains: p2
            }]
          }]
        }, {
          begin: /,/,
          relevance: 0
        }, {
          match: /\s+/,
          relevance: 0
        }, {
          variants: [{
            begin: "<>",
            end: "</>"
          }, {
            match: /<[A-Za-z0-9\\._:-]+\s*\/>/
          }, {
            begin: a2.begin,
            "on:begin": a2.isTrulyOpeningTag,
            end: a2.end
          }],
          subLanguage: "xml",
          contains: [{
            begin: a2.begin,
            end: a2.end,
            skip: true,
            contains: ["self"]
          }]
        }]
      }, E2, {
        beginKeywords: "while if switch catch for"
      }, {
        begin: "\\b(?!function)" + e2.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        returnBegin: true,
        label: "func.def",
        contains: [_2, e2.inherit(e2.TITLE_MODE, {
          begin: t2,
          className: "title.function"
        })]
      }, {
        match: /\.\.\./,
        relevance: 0
      }, N2, {
        match: "\\$" + t2,
        relevance: 0
      }, {
        match: [/\bconstructor(?=\s*\()/],
        className: {
          1: "title.function"
        },
        contains: [_2]
      }, y2, {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant"
      }, h2, v2, {
        match: /\$[(.]/
      }]
    };
  }
  const fe = (e2) => m(/\b/, e2, /\w$/.test(e2) ? /\b/ : /\B/), Ee = ["Protocol", "Type"].map(fe), ye = ["init", "self"].map(fe), we = ["Any", "Self"], Ne = [
    "actor",
    "any",
    "associatedtype",
    "async",
    "await",
    /as\?/,
    /as!/,
    "as",
    "break",
    "case",
    "catch",
    "class",
    "continue",
    "convenience",
    "default",
    "defer",
    "deinit",
    "didSet",
    "distributed",
    "do",
    "dynamic",
    "else",
    "enum",
    "extension",
    "fallthrough",
    /fileprivate\(set\)/,
    "fileprivate",
    "final",
    "for",
    "func",
    "get",
    "guard",
    "if",
    "import",
    "indirect",
    "infix",
    /init\?/,
    /init!/,
    "inout",
    /internal\(set\)/,
    "internal",
    "in",
    "is",
    "isolated",
    "nonisolated",
    "lazy",
    "let",
    "mutating",
    "nonmutating",
    /open\(set\)/,
    "open",
    "operator",
    "optional",
    "override",
    "postfix",
    "precedencegroup",
    "prefix",
    /private\(set\)/,
    "private",
    "protocol",
    /public\(set\)/,
    "public",
    "repeat",
    "required",
    "rethrows",
    "return",
    "set",
    "some",
    "static",
    "struct",
    "subscript",
    "super",
    "switch",
    "throws",
    "throw",
    /try\?/,
    /try!/,
    "try",
    "typealias",
    /unowned\(safe\)/,
    /unowned\(unsafe\)/,
    "unowned",
    "var",
    "weak",
    "where",
    "while",
    "willSet"
  ], ve = ["false", "nil", "true"], Oe = ["assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right"], ke = [
    "#colorLiteral",
    "#column",
    "#dsohandle",
    "#else",
    "#elseif",
    "#endif",
    "#error",
    "#file",
    "#fileID",
    "#fileLiteral",
    "#filePath",
    "#function",
    "#if",
    "#imageLiteral",
    "#keyPath",
    "#line",
    "#selector",
    "#sourceLocation",
    "#warn_unqualified_access",
    "#warning"
  ], xe = [
    "abs",
    "all",
    "any",
    "assert",
    "assertionFailure",
    "debugPrint",
    "dump",
    "fatalError",
    "getVaList",
    "isKnownUniquelyReferenced",
    "max",
    "min",
    "numericCast",
    "pointwiseMax",
    "pointwiseMin",
    "precondition",
    "preconditionFailure",
    "print",
    "readLine",
    "repeatElement",
    "sequence",
    "stride",
    "swap",
    "swift_unboxFromSwiftValueWithType",
    "transcode",
    "type",
    "unsafeBitCast",
    "unsafeDowncast",
    "withExtendedLifetime",
    "withUnsafeMutablePointer",
    "withUnsafePointer",
    "withVaList",
    "withoutActuallyEscaping",
    "zip"
  ], Me = p(
    /[/=\-+!*%<>&|^~?]/,
    /[\u00A1-\u00A7]/,
    /[\u00A9\u00AB]/,
    /[\u00AC\u00AE]/,
    /[\u00B0\u00B1]/,
    /[\u00B6\u00BB\u00BF\u00D7\u00F7]/,
    /[\u2016-\u2017]/,
    /[\u2020-\u2027]/,
    /[\u2030-\u203E]/,
    /[\u2041-\u2053]/,
    /[\u2055-\u205E]/,
    /[\u2190-\u23FF]/,
    /[\u2500-\u2775]/,
    /[\u2794-\u2BFF]/,
    /[\u2E00-\u2E7F]/,
    /[\u3001-\u3003]/,
    /[\u3008-\u3020]/,
    /[\u3030]/
  ), Se = p(Me, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/), Ae = m(Me, Se, "*"), Ce = p(
    /[a-zA-Z_]/,
    /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,
    /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,
    /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,
    /[\u1E00-\u1FFF]/,
    /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,
    /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,
    /[\u2C00-\u2DFF\u2E80-\u2FFF]/,
    /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,
    /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,
    /[\uFE47-\uFEFE\uFF00-\uFFFD]/
  ), Te = p(Ce, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/), Re = m(Ce, Te, "*"), De = m(/[A-Z]/, Te, "*"), Ie = [
    "autoclosure",
    m(/convention\(/, p("swift", "block", "c"), /\)/),
    "discardableResult",
    "dynamicCallable",
    "dynamicMemberLookup",
    "escaping",
    "frozen",
    "GKInspectable",
    "IBAction",
    "IBDesignable",
    "IBInspectable",
    "IBOutlet",
    "IBSegueAction",
    "inlinable",
    "main",
    "nonobjc",
    "NSApplicationMain",
    "NSCopying",
    "NSManaged",
    m(
      /objc\(/,
      Re,
      /\)/
    ),
    "objc",
    "objcMembers",
    "propertyWrapper",
    "requires_stored_property_inits",
    "resultBuilder",
    "testable",
    "UIApplicationMain",
    "unknown",
    "usableFromInline"
  ], Le = [
    "iOS",
    "iOSApplicationExtension",
    "macOS",
    "macOSApplicationExtension",
    "macCatalyst",
    "macCatalystApplicationExtension",
    "watchOS",
    "watchOSApplicationExtension",
    "tvOS",
    "tvOSApplicationExtension",
    "swift"
  ];
  var Be = Object.freeze({
    __proto__: null,
    grmr_bash: (e2) => {
      const n2 = e2.regex, t2 = {}, a2 = {
        begin: /\$\{/,
        end: /\}/,
        contains: ["self", {
          begin: /:-/,
          contains: [t2]
        }]
      };
      Object.assign(t2, {
        className: "variable",
        variants: [{
          begin: n2.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
        }, a2]
      });
      const i2 = {
        className: "subst",
        begin: /\$\(/,
        end: /\)/,
        contains: [e2.BACKSLASH_ESCAPE]
      }, r2 = {
        begin: /<<-?\s*(?=\w+)/,
        starts: {
          contains: [e2.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/,
            className: "string"
          })]
        }
      }, s2 = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e2.BACKSLASH_ESCAPE, t2, i2]
      };
      i2.contains.push(s2);
      const o2 = {
        begin: /\$?\(\(/,
        end: /\)\)/,
        contains: [{
          begin: /\d+#[0-9a-f]+/,
          className: "number"
        }, e2.NUMBER_MODE, t2]
      }, l2 = e2.SHEBANG({
        binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
        relevance: 10
      }), c2 = {
        className: "function",
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: true,
        contains: [e2.inherit(e2.TITLE_MODE, {
          begin: /\w[\w\d_]*/
        })],
        relevance: 0
      };
      return {
        name: "Bash",
        aliases: ["sh"],
        keywords: {
          $pattern: /\b[a-z][a-z0-9._-]+\b/,
          keyword: [
            "if",
            "then",
            "else",
            "elif",
            "fi",
            "for",
            "while",
            "in",
            "do",
            "done",
            "case",
            "esac",
            "function"
          ],
          literal: ["true", "false"],
          built_in: [
            "break",
            "cd",
            "continue",
            "eval",
            "exec",
            "exit",
            "export",
            "getopts",
            "hash",
            "pwd",
            "readonly",
            "return",
            "shift",
            "test",
            "times",
            "trap",
            "umask",
            "unset",
            "alias",
            "bind",
            "builtin",
            "caller",
            "command",
            "declare",
            "echo",
            "enable",
            "help",
            "let",
            "local",
            "logout",
            "mapfile",
            "printf",
            "read",
            "readarray",
            "source",
            "type",
            "typeset",
            "ulimit",
            "unalias",
            "set",
            "shopt",
            "autoload",
            "bg",
            "bindkey",
            "bye",
            "cap",
            "chdir",
            "clone",
            "comparguments",
            "compcall",
            "compctl",
            "compdescribe",
            "compfiles",
            "compgroups",
            "compquote",
            "comptags",
            "comptry",
            "compvalues",
            "dirs",
            "disable",
            "disown",
            "echotc",
            "echoti",
            "emulate",
            "fc",
            "fg",
            "float",
            "functions",
            "getcap",
            "getln",
            "history",
            "integer",
            "jobs",
            "kill",
            "limit",
            "log",
            "noglob",
            "popd",
            "print",
            "pushd",
            "pushln",
            "rehash",
            "sched",
            "setcap",
            "setopt",
            "stat",
            "suspend",
            "ttyctl",
            "unfunction",
            "unhash",
            "unlimit",
            "unsetopt",
            "vared",
            "wait",
            "whence",
            "where",
            "which",
            "zcompile",
            "zformat",
            "zftp",
            "zle",
            "zmodload",
            "zparseopts",
            "zprof",
            "zpty",
            "zregexparse",
            "zsocket",
            "zstyle",
            "ztcp",
            "chcon",
            "chgrp",
            "chown",
            "chmod",
            "cp",
            "dd",
            "df",
            "dir",
            "dircolors",
            "ln",
            "ls",
            "mkdir",
            "mkfifo",
            "mknod",
            "mktemp",
            "mv",
            "realpath",
            "rm",
            "rmdir",
            "shred",
            "sync",
            "touch",
            "truncate",
            "vdir",
            "b2sum",
            "base32",
            "base64",
            "cat",
            "cksum",
            "comm",
            "csplit",
            "cut",
            "expand",
            "fmt",
            "fold",
            "head",
            "join",
            "md5sum",
            "nl",
            "numfmt",
            "od",
            "paste",
            "ptx",
            "pr",
            "sha1sum",
            "sha224sum",
            "sha256sum",
            "sha384sum",
            "sha512sum",
            "shuf",
            "sort",
            "split",
            "sum",
            "tac",
            "tail",
            "tr",
            "tsort",
            "unexpand",
            "uniq",
            "wc",
            "arch",
            "basename",
            "chroot",
            "date",
            "dirname",
            "du",
            "echo",
            "env",
            "expr",
            "factor",
            "groups",
            "hostid",
            "id",
            "link",
            "logname",
            "nice",
            "nohup",
            "nproc",
            "pathchk",
            "pinky",
            "printenv",
            "printf",
            "pwd",
            "readlink",
            "runcon",
            "seq",
            "sleep",
            "stat",
            "stdbuf",
            "stty",
            "tee",
            "test",
            "timeout",
            "tty",
            "uname",
            "unlink",
            "uptime",
            "users",
            "who",
            "whoami",
            "yes"
          ]
        },
        contains: [l2, e2.SHEBANG(), c2, o2, e2.HASH_COMMENT_MODE, r2, {
          match: /(\/[a-z._-]+)+/
        }, s2, {
          className: "",
          begin: /\\"/
        }, {
          className: "string",
          begin: /'/,
          end: /'/
        }, t2]
      };
    },
    grmr_c: (e2) => {
      const n2 = e2.regex, t2 = e2.COMMENT("//", "$", {
        contains: [{
          begin: /\\\n/
        }]
      }), a2 = "[a-zA-Z_]\\w*::", i2 = "(decltype\\(auto\\)|" + n2.optional(a2) + "[a-zA-Z_]\\w*" + n2.optional("<[^<>]+>") + ")", r2 = {
        className: "type",
        variants: [{
          begin: "\\b[a-z\\d_]*_t\\b"
        }, {
          match: /\batomic_[a-z]{3,6}\b/
        }]
      }, s2 = {
        className: "string",
        variants: [{
          begin: '(u8?|U|L)?"',
          end: '"',
          illegal: "\\n",
          contains: [e2.BACKSLASH_ESCAPE]
        }, {
          begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
          end: "'",
          illegal: "."
        }, e2.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
          end: /\)([^()\\ ]{0,16})"/
        })]
      }, o2 = {
        className: "number",
        variants: [{
          begin: "\\b(0b[01']+)"
        }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }],
        relevance: 0
      }, l2 = {
        className: "meta",
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: {
          keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
        },
        contains: [{
          begin: /\\\n/,
          relevance: 0
        }, e2.inherit(s2, {
          className: "string"
        }), {
          className: "string",
          begin: /<.*?>/
        }, t2, e2.C_BLOCK_COMMENT_MODE]
      }, c2 = {
        className: "title",
        begin: n2.optional(a2) + e2.IDENT_RE,
        relevance: 0
      }, d2 = n2.optional(a2) + e2.IDENT_RE + "\\s*\\(", g2 = {
        keyword: [
          "asm",
          "auto",
          "break",
          "case",
          "continue",
          "default",
          "do",
          "else",
          "enum",
          "extern",
          "for",
          "fortran",
          "goto",
          "if",
          "inline",
          "register",
          "restrict",
          "return",
          "sizeof",
          "struct",
          "switch",
          "typedef",
          "union",
          "volatile",
          "while",
          "_Alignas",
          "_Alignof",
          "_Atomic",
          "_Generic",
          "_Noreturn",
          "_Static_assert",
          "_Thread_local",
          "alignas",
          "alignof",
          "noreturn",
          "static_assert",
          "thread_local",
          "_Pragma"
        ],
        type: [
          "float",
          "double",
          "signed",
          "unsigned",
          "int",
          "short",
          "long",
          "char",
          "void",
          "_Bool",
          "_Complex",
          "_Imaginary",
          "_Decimal32",
          "_Decimal64",
          "_Decimal128",
          "const",
          "static",
          "complex",
          "bool",
          "imaginary"
        ],
        literal: "true false NULL",
        built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
      }, u2 = [l2, r2, t2, e2.C_BLOCK_COMMENT_MODE, o2, s2], b2 = {
        variants: [{
          begin: /=/,
          end: /;/
        }, {
          begin: /\(/,
          end: /\)/
        }, {
          beginKeywords: "new throw return else",
          end: /;/
        }],
        keywords: g2,
        contains: u2.concat([{
          begin: /\(/,
          end: /\)/,
          keywords: g2,
          contains: u2.concat(["self"]),
          relevance: 0
        }]),
        relevance: 0
      }, m2 = {
        begin: "(" + i2 + "[\\*&\\s]+)+" + d2,
        returnBegin: true,
        end: /[{;=]/,
        excludeEnd: true,
        keywords: g2,
        illegal: /[^\w\s\*&:<>.]/,
        contains: [{
          begin: "decltype\\(auto\\)",
          keywords: g2,
          relevance: 0
        }, {
          begin: d2,
          returnBegin: true,
          contains: [e2.inherit(c2, {
            className: "title.function"
          })],
          relevance: 0
        }, {
          relevance: 0,
          match: /,/
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: g2,
          relevance: 0,
          contains: [t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2, {
            begin: /\(/,
            end: /\)/,
            keywords: g2,
            relevance: 0,
            contains: ["self", t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2]
          }]
        }, r2, t2, e2.C_BLOCK_COMMENT_MODE, l2]
      };
      return {
        name: "C",
        aliases: ["h"],
        keywords: g2,
        disableAutodetect: true,
        illegal: "</",
        contains: [].concat(b2, m2, u2, [l2, {
          begin: e2.IDENT_RE + "::",
          keywords: g2
        }, {
          className: "class",
          beginKeywords: "enum class struct union",
          end: /[{;:<>=]/,
          contains: [{
            beginKeywords: "final class struct"
          }, e2.TITLE_MODE]
        }]),
        exports: {
          preprocessor: l2,
          strings: s2,
          keywords: g2
        }
      };
    },
    grmr_cpp: (e2) => {
      const n2 = e2.regex, t2 = e2.COMMENT("//", "$", {
        contains: [{
          begin: /\\\n/
        }]
      }), a2 = "[a-zA-Z_]\\w*::", i2 = "(?!struct)(decltype\\(auto\\)|" + n2.optional(a2) + "[a-zA-Z_]\\w*" + n2.optional("<[^<>]+>") + ")", r2 = {
        className: "type",
        begin: "\\b[a-z\\d_]*_t\\b"
      }, s2 = {
        className: "string",
        variants: [{
          begin: '(u8?|U|L)?"',
          end: '"',
          illegal: "\\n",
          contains: [e2.BACKSLASH_ESCAPE]
        }, {
          begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
          end: "'",
          illegal: "."
        }, e2.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
          end: /\)([^()\\ ]{0,16})"/
        })]
      }, o2 = {
        className: "number",
        variants: [{
          begin: "\\b(0b[01']+)"
        }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }],
        relevance: 0
      }, l2 = {
        className: "meta",
        begin: /#\s*[a-z]+\b/,
        end: /$/,
        keywords: {
          keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
        },
        contains: [{
          begin: /\\\n/,
          relevance: 0
        }, e2.inherit(s2, {
          className: "string"
        }), {
          className: "string",
          begin: /<.*?>/
        }, t2, e2.C_BLOCK_COMMENT_MODE]
      }, c2 = {
        className: "title",
        begin: n2.optional(a2) + e2.IDENT_RE,
        relevance: 0
      }, d2 = n2.optional(a2) + e2.IDENT_RE + "\\s*\\(", g2 = {
        type: [
          "bool",
          "char",
          "char16_t",
          "char32_t",
          "char8_t",
          "double",
          "float",
          "int",
          "long",
          "short",
          "void",
          "wchar_t",
          "unsigned",
          "signed",
          "const",
          "static"
        ],
        keyword: [
          "alignas",
          "alignof",
          "and",
          "and_eq",
          "asm",
          "atomic_cancel",
          "atomic_commit",
          "atomic_noexcept",
          "auto",
          "bitand",
          "bitor",
          "break",
          "case",
          "catch",
          "class",
          "co_await",
          "co_return",
          "co_yield",
          "compl",
          "concept",
          "const_cast|10",
          "consteval",
          "constexpr",
          "constinit",
          "continue",
          "decltype",
          "default",
          "delete",
          "do",
          "dynamic_cast|10",
          "else",
          "enum",
          "explicit",
          "export",
          "extern",
          "false",
          "final",
          "for",
          "friend",
          "goto",
          "if",
          "import",
          "inline",
          "module",
          "mutable",
          "namespace",
          "new",
          "noexcept",
          "not",
          "not_eq",
          "nullptr",
          "operator",
          "or",
          "or_eq",
          "override",
          "private",
          "protected",
          "public",
          "reflexpr",
          "register",
          "reinterpret_cast|10",
          "requires",
          "return",
          "sizeof",
          "static_assert",
          "static_cast|10",
          "struct",
          "switch",
          "synchronized",
          "template",
          "this",
          "thread_local",
          "throw",
          "transaction_safe",
          "transaction_safe_dynamic",
          "true",
          "try",
          "typedef",
          "typeid",
          "typename",
          "union",
          "using",
          "virtual",
          "volatile",
          "while",
          "xor",
          "xor_eq"
        ],
        literal: ["NULL", "false", "nullopt", "nullptr", "true"],
        built_in: ["_Pragma"],
        _type_hints: [
          "any",
          "auto_ptr",
          "barrier",
          "binary_semaphore",
          "bitset",
          "complex",
          "condition_variable",
          "condition_variable_any",
          "counting_semaphore",
          "deque",
          "false_type",
          "future",
          "imaginary",
          "initializer_list",
          "istringstream",
          "jthread",
          "latch",
          "lock_guard",
          "multimap",
          "multiset",
          "mutex",
          "optional",
          "ostringstream",
          "packaged_task",
          "pair",
          "promise",
          "priority_queue",
          "queue",
          "recursive_mutex",
          "recursive_timed_mutex",
          "scoped_lock",
          "set",
          "shared_future",
          "shared_lock",
          "shared_mutex",
          "shared_timed_mutex",
          "shared_ptr",
          "stack",
          "string_view",
          "stringstream",
          "timed_mutex",
          "thread",
          "true_type",
          "tuple",
          "unique_lock",
          "unique_ptr",
          "unordered_map",
          "unordered_multimap",
          "unordered_multiset",
          "unordered_set",
          "variant",
          "vector",
          "weak_ptr",
          "wstring",
          "wstring_view"
        ]
      }, u2 = {
        className: "function.dispatch",
        relevance: 0,
        keywords: {
          _hint: [
            "abort",
            "abs",
            "acos",
            "apply",
            "as_const",
            "asin",
            "atan",
            "atan2",
            "calloc",
            "ceil",
            "cerr",
            "cin",
            "clog",
            "cos",
            "cosh",
            "cout",
            "declval",
            "endl",
            "exchange",
            "exit",
            "exp",
            "fabs",
            "floor",
            "fmod",
            "forward",
            "fprintf",
            "fputs",
            "free",
            "frexp",
            "fscanf",
            "future",
            "invoke",
            "isalnum",
            "isalpha",
            "iscntrl",
            "isdigit",
            "isgraph",
            "islower",
            "isprint",
            "ispunct",
            "isspace",
            "isupper",
            "isxdigit",
            "labs",
            "launder",
            "ldexp",
            "log",
            "log10",
            "make_pair",
            "make_shared",
            "make_shared_for_overwrite",
            "make_tuple",
            "make_unique",
            "malloc",
            "memchr",
            "memcmp",
            "memcpy",
            "memset",
            "modf",
            "move",
            "pow",
            "printf",
            "putchar",
            "puts",
            "realloc",
            "scanf",
            "sin",
            "sinh",
            "snprintf",
            "sprintf",
            "sqrt",
            "sscanf",
            "std",
            "stderr",
            "stdin",
            "stdout",
            "strcat",
            "strchr",
            "strcmp",
            "strcpy",
            "strcspn",
            "strlen",
            "strncat",
            "strncmp",
            "strncpy",
            "strpbrk",
            "strrchr",
            "strspn",
            "strstr",
            "swap",
            "tan",
            "tanh",
            "terminate",
            "to_underlying",
            "tolower",
            "toupper",
            "vfprintf",
            "visit",
            "vprintf",
            "vsprintf"
          ]
        },
        begin: n2.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e2.IDENT_RE, n2.lookahead(/(<[^<>]+>|)\s*\(/))
      }, b2 = [u2, l2, r2, t2, e2.C_BLOCK_COMMENT_MODE, o2, s2], m2 = {
        variants: [{
          begin: /=/,
          end: /;/
        }, {
          begin: /\(/,
          end: /\)/
        }, {
          beginKeywords: "new throw return else",
          end: /;/
        }],
        keywords: g2,
        contains: b2.concat([{
          begin: /\(/,
          end: /\)/,
          keywords: g2,
          contains: b2.concat(["self"]),
          relevance: 0
        }]),
        relevance: 0
      }, p2 = {
        className: "function",
        begin: "(" + i2 + "[\\*&\\s]+)+" + d2,
        returnBegin: true,
        end: /[{;=]/,
        excludeEnd: true,
        keywords: g2,
        illegal: /[^\w\s\*&:<>.]/,
        contains: [{
          begin: "decltype\\(auto\\)",
          keywords: g2,
          relevance: 0
        }, {
          begin: d2,
          returnBegin: true,
          contains: [c2],
          relevance: 0
        }, {
          begin: /::/,
          relevance: 0
        }, {
          begin: /:/,
          endsWithParent: true,
          contains: [s2, o2]
        }, {
          relevance: 0,
          match: /,/
        }, {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: g2,
          relevance: 0,
          contains: [t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2, {
            begin: /\(/,
            end: /\)/,
            keywords: g2,
            relevance: 0,
            contains: ["self", t2, e2.C_BLOCK_COMMENT_MODE, s2, o2, r2]
          }]
        }, r2, t2, e2.C_BLOCK_COMMENT_MODE, l2]
      };
      return {
        name: "C++",
        aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
        keywords: g2,
        illegal: "</",
        classNameAliases: {
          "function.dispatch": "built_in"
        },
        contains: [].concat(m2, p2, u2, b2, [l2, {
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",
          end: ">",
          keywords: g2,
          contains: ["self", r2]
        }, {
          begin: e2.IDENT_RE + "::",
          keywords: g2
        }, {
          match: [/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }])
      };
    },
    grmr_csharp: (e2) => {
      const n2 = {
        keyword: [
          "abstract",
          "as",
          "base",
          "break",
          "case",
          "catch",
          "class",
          "const",
          "continue",
          "do",
          "else",
          "event",
          "explicit",
          "extern",
          "finally",
          "fixed",
          "for",
          "foreach",
          "goto",
          "if",
          "implicit",
          "in",
          "interface",
          "internal",
          "is",
          "lock",
          "namespace",
          "new",
          "operator",
          "out",
          "override",
          "params",
          "private",
          "protected",
          "public",
          "readonly",
          "record",
          "ref",
          "return",
          "scoped",
          "sealed",
          "sizeof",
          "stackalloc",
          "static",
          "struct",
          "switch",
          "this",
          "throw",
          "try",
          "typeof",
          "unchecked",
          "unsafe",
          "using",
          "virtual",
          "void",
          "volatile",
          "while"
        ].concat([
          "add",
          "alias",
          "and",
          "ascending",
          "async",
          "await",
          "by",
          "descending",
          "equals",
          "from",
          "get",
          "global",
          "group",
          "init",
          "into",
          "join",
          "let",
          "nameof",
          "not",
          "notnull",
          "on",
          "or",
          "orderby",
          "partial",
          "remove",
          "select",
          "set",
          "unmanaged",
          "value|0",
          "var",
          "when",
          "where",
          "with",
          "yield"
        ]),
        built_in: [
          "bool",
          "byte",
          "char",
          "decimal",
          "delegate",
          "double",
          "dynamic",
          "enum",
          "float",
          "int",
          "long",
          "nint",
          "nuint",
          "object",
          "sbyte",
          "short",
          "string",
          "ulong",
          "uint",
          "ushort"
        ],
        literal: ["default", "false", "null", "true"]
      }, t2 = e2.inherit(e2.TITLE_MODE, {
        begin: "[a-zA-Z](\\.?\\w)*"
      }), a2 = {
        className: "number",
        variants: [{
          begin: "\\b(0b[01']+)"
        }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }],
        relevance: 0
      }, i2 = {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [{
          begin: '""'
        }]
      }, r2 = e2.inherit(i2, {
        illegal: /\n/
      }), s2 = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: n2
      }, o2 = e2.inherit(s2, {
        illegal: /\n/
      }), l2 = {
        className: "string",
        begin: /\$"/,
        end: '"',
        illegal: /\n/,
        contains: [{
          begin: /\{\{/
        }, {
          begin: /\}\}/
        }, e2.BACKSLASH_ESCAPE, o2]
      }, c2 = {
        className: "string",
        begin: /\$@"/,
        end: '"',
        contains: [{
          begin: /\{\{/
        }, {
          begin: /\}\}/
        }, {
          begin: '""'
        }, s2]
      }, d2 = e2.inherit(c2, {
        illegal: /\n/,
        contains: [{
          begin: /\{\{/
        }, {
          begin: /\}\}/
        }, {
          begin: '""'
        }, o2]
      });
      s2.contains = [c2, l2, i2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, a2, e2.C_BLOCK_COMMENT_MODE], o2.contains = [d2, l2, r2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, a2, e2.inherit(e2.C_BLOCK_COMMENT_MODE, {
        illegal: /\n/
      })];
      const g2 = {
        variants: [c2, l2, i2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE]
      }, u2 = {
        begin: "<",
        end: ">",
        contains: [{
          beginKeywords: "in out"
        }, t2]
      }, b2 = e2.IDENT_RE + "(<" + e2.IDENT_RE + "(\\s*,\\s*" + e2.IDENT_RE + ")*>)?(\\[\\])?", m2 = {
        begin: "@" + e2.IDENT_RE,
        relevance: 0
      };
      return {
        name: "C#",
        aliases: ["cs", "c#"],
        keywords: n2,
        illegal: /::/,
        contains: [e2.COMMENT("///", "$", {
          returnBegin: true,
          contains: [{
            className: "doctag",
            variants: [{
              begin: "///",
              relevance: 0
            }, {
              begin: "<!--|-->"
            }, {
              begin: "</?",
              end: ">"
            }]
          }]
        }), e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, {
          className: "meta",
          begin: "#",
          end: "$",
          keywords: {
            keyword: "if else elif endif define undef warning error line region endregion pragma checksum"
          }
        }, g2, a2, {
          beginKeywords: "class interface",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:,]/,
          contains: [{
            beginKeywords: "where class"
          }, t2, u2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
        }, {
          beginKeywords: "namespace",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:]/,
          contains: [t2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
        }, {
          beginKeywords: "record",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:]/,
          contains: [t2, u2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
        }, {
          className: "meta",
          begin: "^\\s*\\[(?=[\\w])",
          excludeBegin: true,
          end: "\\]",
          excludeEnd: true,
          contains: [{
            className: "string",
            begin: /"/,
            end: /"/
          }]
        }, {
          beginKeywords: "new return throw await else",
          relevance: 0
        }, {
          className: "function",
          begin: "(" + b2 + "\\s+)+" + e2.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
          returnBegin: true,
          end: /\s*[{;=]/,
          excludeEnd: true,
          keywords: n2,
          contains: [{
            beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
            relevance: 0
          }, {
            begin: e2.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
            returnBegin: true,
            contains: [e2.TITLE_MODE, u2],
            relevance: 0
          }, {
            match: /\(\)/
          }, {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: n2,
            relevance: 0,
            contains: [g2, a2, e2.C_BLOCK_COMMENT_MODE]
          }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
        }, m2]
      };
    },
    grmr_css: (e2) => {
      const n2 = e2.regex, t2 = J(e2), a2 = [e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE];
      return {
        name: "CSS",
        case_insensitive: true,
        illegal: /[=|'\$]/,
        keywords: {
          keyframePosition: "from to"
        },
        classNameAliases: {
          keyframePosition: "selector-tag"
        },
        contains: [t2.BLOCK_COMMENT, {
          begin: /-(webkit|moz|ms|o)-(?=[a-z])/
        }, t2.CSS_NUMBER_MODE, {
          className: "selector-id",
          begin: /#[A-Za-z0-9_-]+/,
          relevance: 0
        }, {
          className: "selector-class",
          begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
          relevance: 0
        }, t2.ATTRIBUTE_SELECTOR_MODE, {
          className: "selector-pseudo",
          variants: [{
            begin: ":(" + ne.join("|") + ")"
          }, {
            begin: ":(:)?(" + te.join("|") + ")"
          }]
        }, t2.CSS_VARIABLE, {
          className: "attribute",
          begin: "\\b(" + ae.join("|") + ")\\b"
        }, {
          begin: /:/,
          end: /[;}{]/,
          contains: [t2.BLOCK_COMMENT, t2.HEXCOLOR, t2.IMPORTANT, t2.CSS_NUMBER_MODE, ...a2, {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            keywords: {
              built_in: "url data-uri"
            },
            contains: [...a2, {
              className: "string",
              begin: /[^)]/,
              endsWithParent: true,
              excludeEnd: true
            }]
          }, t2.FUNCTION_DISPATCH]
        }, {
          begin: n2.lookahead(/@/),
          end: "[{;]",
          relevance: 0,
          illegal: /:/,
          contains: [{
            className: "keyword",
            begin: /@-?\w[\w]*(-\w+)*/
          }, {
            begin: /\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: "and or not only",
              attribute: ee.join(" ")
            },
            contains: [{
              begin: /[a-z-]+(?=:)/,
              className: "attribute"
            }, ...a2, t2.CSS_NUMBER_MODE]
          }]
        }, {
          className: "selector-tag",
          begin: "\\b(" + Y.join("|") + ")\\b"
        }]
      };
    },
    grmr_diff: (e2) => {
      const n2 = e2.regex;
      return {
        name: "Diff",
        aliases: ["patch"],
        contains: [{
          className: "meta",
          relevance: 10,
          match: n2.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/, /^\*\*\* +\d+,\d+ +\*\*\*\*$/, /^--- +\d+,\d+ +----$/)
        }, {
          className: "comment",
          variants: [{
            begin: n2.either(/Index: /, /^index/, /={3,}/, /^-{3}/, /^\*{3} /, /^\+{3}/, /^diff --git/),
            end: /$/
          }, {
            match: /^\*{15}$/
          }]
        }, {
          className: "addition",
          begin: /^\+/,
          end: /$/
        }, {
          className: "deletion",
          begin: /^-/,
          end: /$/
        }, {
          className: "addition",
          begin: /^!/,
          end: /$/
        }]
      };
    },
    grmr_go: (e2) => {
      const n2 = {
        keyword: [
          "break",
          "case",
          "chan",
          "const",
          "continue",
          "default",
          "defer",
          "else",
          "fallthrough",
          "for",
          "func",
          "go",
          "goto",
          "if",
          "import",
          "interface",
          "map",
          "package",
          "range",
          "return",
          "select",
          "struct",
          "switch",
          "type",
          "var"
        ],
        type: [
          "bool",
          "byte",
          "complex64",
          "complex128",
          "error",
          "float32",
          "float64",
          "int8",
          "int16",
          "int32",
          "int64",
          "string",
          "uint8",
          "uint16",
          "uint32",
          "uint64",
          "int",
          "uint",
          "uintptr",
          "rune"
        ],
        literal: ["true", "false", "iota", "nil"],
        built_in: [
          "append",
          "cap",
          "close",
          "complex",
          "copy",
          "imag",
          "len",
          "make",
          "new",
          "panic",
          "print",
          "println",
          "real",
          "recover",
          "delete"
        ]
      };
      return {
        name: "Go",
        aliases: ["golang"],
        keywords: n2,
        illegal: "</",
        contains: [e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, {
          className: "string",
          variants: [e2.QUOTE_STRING_MODE, e2.APOS_STRING_MODE, {
            begin: "`",
            end: "`"
          }]
        }, {
          className: "number",
          variants: [{
            begin: e2.C_NUMBER_RE + "[i]",
            relevance: 1
          }, e2.C_NUMBER_MODE]
        }, {
          begin: /:=/
        }, {
          className: "function",
          beginKeywords: "func",
          end: "\\s*(\\{|$)",
          excludeEnd: true,
          contains: [e2.TITLE_MODE, {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: n2,
            illegal: /["']/
          }]
        }]
      };
    },
    grmr_graphql: (e2) => {
      const n2 = e2.regex;
      return {
        name: "GraphQL",
        aliases: ["gql"],
        case_insensitive: true,
        disableAutodetect: false,
        keywords: {
          keyword: [
            "query",
            "mutation",
            "subscription",
            "type",
            "input",
            "schema",
            "directive",
            "interface",
            "union",
            "scalar",
            "fragment",
            "enum",
            "on"
          ],
          literal: ["true", "false", "null"]
        },
        contains: [e2.HASH_COMMENT_MODE, e2.QUOTE_STRING_MODE, e2.NUMBER_MODE, {
          scope: "punctuation",
          match: /[.]{3}/,
          relevance: 0
        }, {
          scope: "punctuation",
          begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/,
          relevance: 0
        }, {
          scope: "variable",
          begin: /\$/,
          end: /\W/,
          excludeEnd: true,
          relevance: 0
        }, {
          scope: "meta",
          match: /@\w+/,
          excludeEnd: true
        }, {
          scope: "symbol",
          begin: n2.concat(/[_A-Za-z][_0-9A-Za-z]*/, n2.lookahead(/\s*:/)),
          relevance: 0
        }],
        illegal: [/[;<']/, /BEGIN/]
      };
    },
    grmr_ini: (e2) => {
      const n2 = e2.regex, t2 = {
        className: "number",
        relevance: 0,
        variants: [{
          begin: /([+-]+)?[\d]+_[\d_]+/
        }, {
          begin: e2.NUMBER_RE
        }]
      }, a2 = e2.COMMENT();
      a2.variants = [{
        begin: /;/,
        end: /$/
      }, {
        begin: /#/,
        end: /$/
      }];
      const i2 = {
        className: "variable",
        variants: [{
          begin: /\$[\w\d"][\w\d_]*/
        }, {
          begin: /\$\{(.*?)\}/
        }]
      }, r2 = {
        className: "literal",
        begin: /\bon|off|true|false|yes|no\b/
      }, s2 = {
        className: "string",
        contains: [e2.BACKSLASH_ESCAPE],
        variants: [{
          begin: "'''",
          end: "'''",
          relevance: 10
        }, {
          begin: '"""',
          end: '"""',
          relevance: 10
        }, {
          begin: '"',
          end: '"'
        }, {
          begin: "'",
          end: "'"
        }]
      }, o2 = {
        begin: /\[/,
        end: /\]/,
        contains: [a2, r2, i2, s2, t2, "self"],
        relevance: 0
      }, l2 = n2.either(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/);
      return {
        name: "TOML, also INI",
        aliases: ["toml"],
        case_insensitive: true,
        illegal: /\S/,
        contains: [a2, {
          className: "section",
          begin: /\[+/,
          end: /\]+/
        }, {
          begin: n2.concat(l2, "(\\s*\\.\\s*", l2, ")*", n2.lookahead(/\s*=\s*[^#\s]/)),
          className: "attr",
          starts: {
            end: /$/,
            contains: [a2, o2, r2, i2, s2, t2]
          }
        }]
      };
    },
    grmr_java: (e2) => {
      const n2 = e2.regex, t2 = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", a2 = t2 + le("(?:<" + t2 + "~~~(?:\\s*,\\s*" + t2 + "~~~)*>)?", /~~~/g, 2), i2 = {
        keyword: [
          "synchronized",
          "abstract",
          "private",
          "var",
          "static",
          "if",
          "const ",
          "for",
          "while",
          "strictfp",
          "finally",
          "protected",
          "import",
          "native",
          "final",
          "void",
          "enum",
          "else",
          "break",
          "transient",
          "catch",
          "instanceof",
          "volatile",
          "case",
          "assert",
          "package",
          "default",
          "public",
          "try",
          "switch",
          "continue",
          "throws",
          "protected",
          "public",
          "private",
          "module",
          "requires",
          "exports",
          "do",
          "sealed",
          "yield",
          "permits"
        ],
        literal: ["false", "true", "null"],
        type: ["char", "boolean", "long", "float", "int", "byte", "short", "double"],
        built_in: ["super", "this"]
      }, r2 = {
        className: "meta",
        begin: "@" + t2,
        contains: [{
          begin: /\(/,
          end: /\)/,
          contains: ["self"]
        }]
      }, s2 = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: i2,
        relevance: 0,
        contains: [e2.C_BLOCK_COMMENT_MODE],
        endsParent: true
      };
      return {
        name: "Java",
        aliases: ["jsp"],
        keywords: i2,
        illegal: /<\/|#/,
        contains: [e2.COMMENT("/\\*\\*", "\\*/", {
          relevance: 0,
          contains: [{
            begin: /\w+@/,
            relevance: 0
          }, {
            className: "doctag",
            begin: "@[A-Za-z]+"
          }]
        }), {
          begin: /import java\.[a-z]+\./,
          keywords: "import",
          relevance: 2
        }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, {
          begin: /"""/,
          end: /"""/,
          className: "string",
          contains: [e2.BACKSLASH_ESCAPE]
        }, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, {
          match: [/\b(?:class|interface|enum|extends|implements|new)/, /\s+/, t2],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }, {
          match: /non-sealed/,
          scope: "keyword"
        }, {
          begin: [n2.concat(/(?!else)/, t2), /\s+/, t2, /\s+/, /=(?!=)/],
          className: {
            1: "type",
            3: "variable",
            5: "operator"
          }
        }, {
          begin: [/record/, /\s+/, t2],
          className: {
            1: "keyword",
            3: "title.class"
          },
          contains: [s2, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
        }, {
          beginKeywords: "new throw return else",
          relevance: 0
        }, {
          begin: ["(?:" + a2 + "\\s+)", e2.UNDERSCORE_IDENT_RE, /\s*(?=\()/],
          className: {
            2: "title.function"
          },
          keywords: i2,
          contains: [{
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: i2,
            relevance: 0,
            contains: [r2, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, oe, e2.C_BLOCK_COMMENT_MODE]
          }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
        }, oe, r2]
      };
    },
    grmr_javascript: he,
    grmr_json: (e2) => {
      const n2 = ["true", "false", "null"], t2 = {
        scope: "literal",
        beginKeywords: n2.join(" ")
      };
      return {
        name: "JSON",
        keywords: {
          literal: n2
        },
        contains: [{
          className: "attr",
          begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
          relevance: 1.01
        }, {
          match: /[{}[\],:]/,
          className: "punctuation",
          relevance: 0
        }, e2.QUOTE_STRING_MODE, t2, e2.C_NUMBER_MODE, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE],
        illegal: "\\S"
      };
    },
    grmr_kotlin: (e2) => {
      const n2 = {
        keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
        built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
        literal: "true false null"
      }, t2 = {
        className: "symbol",
        begin: e2.UNDERSCORE_IDENT_RE + "@"
      }, a2 = {
        className: "subst",
        begin: /\$\{/,
        end: /\}/,
        contains: [e2.C_NUMBER_MODE]
      }, i2 = {
        className: "variable",
        begin: "\\$" + e2.UNDERSCORE_IDENT_RE
      }, r2 = {
        className: "string",
        variants: [{
          begin: '"""',
          end: '"""(?=[^"])',
          contains: [i2, a2]
        }, {
          begin: "'",
          end: "'",
          illegal: /\n/,
          contains: [e2.BACKSLASH_ESCAPE]
        }, {
          begin: '"',
          end: '"',
          illegal: /\n/,
          contains: [e2.BACKSLASH_ESCAPE, i2, a2]
        }]
      };
      a2.contains.push(r2);
      const s2 = {
        className: "meta",
        begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e2.UNDERSCORE_IDENT_RE + ")?"
      }, o2 = {
        className: "meta",
        begin: "@" + e2.UNDERSCORE_IDENT_RE,
        contains: [{
          begin: /\(/,
          end: /\)/,
          contains: [e2.inherit(r2, {
            className: "string"
          }), "self"]
        }]
      }, l2 = oe, c2 = e2.COMMENT("/\\*", "\\*/", {
        contains: [e2.C_BLOCK_COMMENT_MODE]
      }), d2 = {
        variants: [{
          className: "type",
          begin: e2.UNDERSCORE_IDENT_RE
        }, {
          begin: /\(/,
          end: /\)/,
          contains: []
        }]
      }, g2 = d2;
      return g2.variants[1].contains = [d2], d2.variants[1].contains = [g2], {
        name: "Kotlin",
        aliases: ["kt", "kts"],
        keywords: n2,
        contains: [e2.COMMENT("/\\*\\*", "\\*/", {
          relevance: 0,
          contains: [{
            className: "doctag",
            begin: "@[A-Za-z]+"
          }]
        }), e2.C_LINE_COMMENT_MODE, c2, {
          className: "keyword",
          begin: /\b(break|continue|return|this)\b/,
          starts: {
            contains: [{
              className: "symbol",
              begin: /@\w+/
            }]
          }
        }, t2, s2, o2, {
          className: "function",
          beginKeywords: "fun",
          end: "[(]|$",
          returnBegin: true,
          excludeEnd: true,
          keywords: n2,
          relevance: 5,
          contains: [{
            begin: e2.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            relevance: 0,
            contains: [e2.UNDERSCORE_TITLE_MODE]
          }, {
            className: "type",
            begin: /</,
            end: />/,
            keywords: "reified",
            relevance: 0
          }, {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: n2,
            relevance: 0,
            contains: [{
              begin: /:/,
              end: /[=,\/]/,
              endsWithParent: true,
              contains: [d2, e2.C_LINE_COMMENT_MODE, c2],
              relevance: 0
            }, e2.C_LINE_COMMENT_MODE, c2, s2, o2, r2, e2.C_NUMBER_MODE]
          }, c2]
        }, {
          begin: [/class|interface|trait/, /\s+/, e2.UNDERSCORE_IDENT_RE],
          beginScope: {
            3: "title.class"
          },
          keywords: "class interface trait",
          end: /[:\{(]|$/,
          excludeEnd: true,
          illegal: "extends implements",
          contains: [{
            beginKeywords: "public protected internal private constructor"
          }, e2.UNDERSCORE_TITLE_MODE, {
            className: "type",
            begin: /</,
            end: />/,
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          }, {
            className: "type",
            begin: /[,:]\s*/,
            end: /[<\(,){\s]|$/,
            excludeBegin: true,
            returnEnd: true
          }, s2, o2]
        }, r2, {
          className: "meta",
          begin: "^#!/usr/bin/env",
          end: "$",
          illegal: "\n"
        }, l2]
      };
    },
    grmr_less: (e2) => {
      const n2 = J(e2), t2 = ie, a2 = "([\\w-]+|@\\{[\\w-]+\\})", i2 = [], r2 = [], s2 = (e3) => ({
        className: "string",
        begin: "~?" + e3 + ".*?" + e3
      }), o2 = (e3, n3, t3) => ({
        className: e3,
        begin: n3,
        relevance: t3
      }), l2 = {
        $pattern: /[a-z-]+/,
        keyword: "and or not only",
        attribute: ee.join(" ")
      }, c2 = {
        begin: "\\(",
        end: "\\)",
        contains: r2,
        keywords: l2,
        relevance: 0
      };
      r2.push(e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, s2("'"), s2('"'), n2.CSS_NUMBER_MODE, {
        begin: "(url|data-uri)\\(",
        starts: {
          className: "string",
          end: "[\\)\\n]",
          excludeEnd: true
        }
      }, n2.HEXCOLOR, c2, o2("variable", "@@?[\\w-]+", 10), o2("variable", "@\\{[\\w-]+\\}"), o2(
        "built_in",
        "~?`[^`]*?`"
      ), {
        className: "attribute",
        begin: "[\\w-]+\\s*:",
        end: ":",
        returnBegin: true,
        excludeEnd: true
      }, n2.IMPORTANT, {
        beginKeywords: "and not"
      }, n2.FUNCTION_DISPATCH);
      const d2 = r2.concat({
        begin: /\{/,
        end: /\}/,
        contains: i2
      }), g2 = {
        beginKeywords: "when",
        endsWithParent: true,
        contains: [{
          beginKeywords: "and not"
        }].concat(r2)
      }, u2 = {
        begin: a2 + "\\s*:",
        returnBegin: true,
        end: /[;}]/,
        relevance: 0,
        contains: [{
          begin: /-(webkit|moz|ms|o)-/
        }, n2.CSS_VARIABLE, {
          className: "attribute",
          begin: "\\b(" + ae.join("|") + ")\\b",
          end: /(?=:)/,
          starts: {
            endsWithParent: true,
            illegal: "[<=$]",
            relevance: 0,
            contains: r2
          }
        }]
      }, b2 = {
        className: "keyword",
        begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
        starts: {
          end: "[;{}]",
          keywords: l2,
          returnEnd: true,
          contains: r2,
          relevance: 0
        }
      }, m2 = {
        className: "variable",
        variants: [{
          begin: "@[\\w-]+\\s*:",
          relevance: 15
        }, {
          begin: "@[\\w-]+"
        }],
        starts: {
          end: "[;}]",
          returnEnd: true,
          contains: d2
        }
      }, p2 = {
        variants: [{
          begin: "[\\.#:&\\[>]",
          end: "[;{}]"
        }, {
          begin: a2,
          end: /\{/
        }],
        returnBegin: true,
        returnEnd: true,
        illegal: `[<='$"]`,
        relevance: 0,
        contains: [e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, g2, o2("keyword", "all\\b"), o2(
          "variable",
          "@\\{[\\w-]+\\}"
        ), {
          begin: "\\b(" + Y.join("|") + ")\\b",
          className: "selector-tag"
        }, n2.CSS_NUMBER_MODE, o2("selector-tag", a2, 0), o2("selector-id", "#" + a2), o2("selector-class", "\\." + a2, 0), o2("selector-tag", "&", 0), n2.ATTRIBUTE_SELECTOR_MODE, {
          className: "selector-pseudo",
          begin: ":(" + ne.join("|") + ")"
        }, {
          className: "selector-pseudo",
          begin: ":(:)?(" + te.join("|") + ")"
        }, {
          begin: /\(/,
          end: /\)/,
          relevance: 0,
          contains: d2
        }, {
          begin: "!important"
        }, n2.FUNCTION_DISPATCH]
      }, _2 = {
        begin: `[\\w-]+:(:)?(${t2.join("|")})`,
        returnBegin: true,
        contains: [p2]
      };
      return i2.push(e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, b2, m2, _2, u2, p2, g2, n2.FUNCTION_DISPATCH), {
        name: "Less",
        case_insensitive: true,
        illegal: `[=>'/<($"]`,
        contains: i2
      };
    },
    grmr_lua: (e2) => {
      const n2 = "\\[=*\\[", t2 = "\\]=*\\]", a2 = {
        begin: n2,
        end: t2,
        contains: ["self"]
      }, i2 = [e2.COMMENT("--(?!\\[=*\\[)", "$"), e2.COMMENT("--\\[=*\\[", t2, {
        contains: [a2],
        relevance: 10
      })];
      return {
        name: "Lua",
        keywords: {
          $pattern: e2.UNDERSCORE_IDENT_RE,
          literal: "true false nil",
          keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
          built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
        },
        contains: i2.concat([{
          className: "function",
          beginKeywords: "function",
          end: "\\)",
          contains: [e2.inherit(e2.TITLE_MODE, {
            begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
          }), {
            className: "params",
            begin: "\\(",
            endsWithParent: true,
            contains: i2
          }].concat(i2)
        }, e2.C_NUMBER_MODE, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE, {
          className: "string",
          begin: n2,
          end: t2,
          contains: [a2],
          relevance: 5
        }])
      };
    },
    grmr_makefile: (e2) => {
      const n2 = {
        className: "variable",
        variants: [{
          begin: "\\$\\(" + e2.UNDERSCORE_IDENT_RE + "\\)",
          contains: [e2.BACKSLASH_ESCAPE]
        }, {
          begin: /\$[@%<?\^\+\*]/
        }]
      }, t2 = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e2.BACKSLASH_ESCAPE, n2]
      }, a2 = {
        className: "variable",
        begin: /\$\([\w-]+\s/,
        end: /\)/,
        keywords: {
          built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
        },
        contains: [n2]
      }, i2 = {
        begin: "^" + e2.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
      }, r2 = {
        className: "section",
        begin: /^[^\s]+:/,
        end: /$/,
        contains: [n2]
      };
      return {
        name: "Makefile",
        aliases: ["mk", "mak", "make"],
        keywords: {
          $pattern: /[\w-]+/,
          keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
        },
        contains: [e2.HASH_COMMENT_MODE, n2, t2, a2, i2, {
          className: "meta",
          begin: /^\.PHONY:/,
          end: /$/,
          keywords: {
            $pattern: /[\.\w]+/,
            keyword: ".PHONY"
          }
        }, r2]
      };
    },
    grmr_xml: (e2) => {
      const n2 = e2.regex, t2 = n2.concat(
        /(?:[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/,
        n2.optional(
          /(?:[\x2D\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*:/
        ),
        /(?:[\x2D\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*/
      ), a2 = {
        className: "symbol",
        begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
      }, i2 = {
        begin: /\s/,
        contains: [{
          className: "keyword",
          begin: /#?[a-z_][a-z1-9_-]+/,
          illegal: /\n/
        }]
      }, r2 = e2.inherit(i2, {
        begin: /\(/,
        end: /\)/
      }), s2 = e2.inherit(e2.APOS_STRING_MODE, {
        className: "string"
      }), o2 = e2.inherit(e2.QUOTE_STRING_MODE, {
        className: "string"
      }), l2 = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [{
          className: "attr",
          begin: /(?:[\x2D\.0-:A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])+/,
          relevance: 0
        }, {
          begin: /=\s*/,
          relevance: 0,
          contains: [{
            className: "string",
            endsParent: true,
            variants: [{
              begin: /"/,
              end: /"/,
              contains: [a2]
            }, {
              begin: /'/,
              end: /'/,
              contains: [a2]
            }, {
              begin: /[^\s"'=<>`]+/
            }]
          }]
        }]
      };
      return {
        name: "HTML, XML",
        aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
        case_insensitive: true,
        unicodeRegex: true,
        contains: [{
          className: "meta",
          begin: /<![a-z]/,
          end: />/,
          relevance: 10,
          contains: [i2, o2, s2, r2, {
            begin: /\[/,
            end: /\]/,
            contains: [{
              className: "meta",
              begin: /<![a-z]/,
              end: />/,
              contains: [i2, r2, o2, s2]
            }]
          }]
        }, e2.COMMENT(/<!--/, /-->/, {
          relevance: 10
        }), {
          begin: /<!\[CDATA\[/,
          end: /\]\]>/,
          relevance: 10
        }, a2, {
          className: "meta",
          end: /\?>/,
          variants: [{
            begin: /<\?xml/,
            relevance: 10,
            contains: [o2]
          }, {
            begin: /<\?[a-z][a-z0-9]+/
          }]
        }, {
          className: "tag",
          begin: /<style(?=\s|>)/,
          end: />/,
          keywords: {
            name: "style"
          },
          contains: [l2],
          starts: {
            end: /<\/style>/,
            returnEnd: true,
            subLanguage: ["css", "xml"]
          }
        }, {
          className: "tag",
          begin: /<script(?=\s|>)/,
          end: />/,
          keywords: {
            name: "script"
          },
          contains: [l2],
          starts: {
            end: /<\/script>/,
            returnEnd: true,
            subLanguage: ["javascript", "handlebars", "xml"]
          }
        }, {
          className: "tag",
          begin: /<>|<\/>/
        }, {
          className: "tag",
          begin: n2.concat(/</, n2.lookahead(n2.concat(t2, n2.either(/\/>/, />/, /\s/)))),
          end: /\/?>/,
          contains: [{
            className: "name",
            begin: t2,
            relevance: 0,
            starts: l2
          }]
        }, {
          className: "tag",
          begin: n2.concat(/<\//, n2.lookahead(n2.concat(t2, />/))),
          contains: [{
            className: "name",
            begin: t2,
            relevance: 0
          }, {
            begin: />/,
            relevance: 0,
            endsParent: true
          }]
        }]
      };
    },
    grmr_markdown: (e2) => {
      const n2 = {
        begin: /<\/?[A-Za-z_]/,
        end: ">",
        subLanguage: "xml",
        relevance: 0
      }, t2 = {
        variants: [{
          begin: /\[.+?\]\[.*?\]/,
          relevance: 0
        }, {
          begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
          relevance: 2
        }, {
          begin: e2.regex.concat(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
          relevance: 2
        }, {
          begin: /\[.+?\]\([./?&#].*?\)/,
          relevance: 1
        }, {
          begin: /\[.*?\]\(.*?\)/,
          relevance: 0
        }],
        returnBegin: true,
        contains: [{
          match: /\[(?=\])/
        }, {
          className: "string",
          relevance: 0,
          begin: "\\[",
          end: "\\]",
          excludeBegin: true,
          returnEnd: true
        }, {
          className: "link",
          relevance: 0,
          begin: "\\]\\(",
          end: "\\)",
          excludeBegin: true,
          excludeEnd: true
        }, {
          className: "symbol",
          relevance: 0,
          begin: "\\]\\[",
          end: "\\]",
          excludeBegin: true,
          excludeEnd: true
        }]
      }, a2 = {
        className: "strong",
        contains: [],
        variants: [{
          begin: /_{2}(?!\s)/,
          end: /_{2}/
        }, {
          begin: /\*{2}(?!\s)/,
          end: /\*{2}/
        }]
      }, i2 = {
        className: "emphasis",
        contains: [],
        variants: [{
          begin: /\*(?![*\s])/,
          end: /\*/
        }, {
          begin: /_(?![_\s])/,
          end: /_/,
          relevance: 0
        }]
      }, r2 = e2.inherit(a2, {
        contains: []
      }), s2 = e2.inherit(i2, {
        contains: []
      });
      a2.contains.push(s2), i2.contains.push(r2);
      let o2 = [n2, t2];
      return [a2, i2, r2, s2].forEach((e3) => {
        e3.contains = e3.contains.concat(o2);
      }), o2 = o2.concat(a2, i2), {
        name: "Markdown",
        aliases: ["md", "mkdown", "mkd"],
        contains: [{
          className: "section",
          variants: [{
            begin: "^#{1,6}",
            end: "$",
            contains: o2
          }, {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [{
              begin: "^[=-]*$"
            }, {
              begin: "^",
              end: "\\n",
              contains: o2
            }]
          }]
        }, n2, {
          className: "bullet",
          begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
          end: "\\s+",
          excludeEnd: true
        }, a2, i2, {
          className: "quote",
          begin: "^>\\s+",
          contains: o2,
          end: "$"
        }, {
          className: "code",
          variants: [{
            begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
          }, {
            begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
          }, {
            begin: "```",
            end: "```+[ ]*$"
          }, {
            begin: "~~~",
            end: "~~~+[ ]*$"
          }, {
            begin: "`.+?`"
          }, {
            begin: "(?=^( {4}|\\t))",
            contains: [{
              begin: "^( {4}|\\t)",
              end: "(\\n)$"
            }],
            relevance: 0
          }]
        }, {
          begin: "^[-\\*]{3,}",
          end: "$"
        }, t2, {
          begin: /^\[[^\n]+\]:/,
          returnBegin: true,
          contains: [{
            className: "symbol",
            begin: /\[/,
            end: /\]/,
            excludeBegin: true,
            excludeEnd: true
          }, {
            className: "link",
            begin: /:\s*/,
            end: /$/,
            excludeBegin: true
          }]
        }]
      };
    },
    grmr_objectivec: (e2) => {
      const n2 = /[a-zA-Z@][a-zA-Z0-9_]*/, t2 = {
        $pattern: n2,
        keyword: ["@interface", "@class", "@protocol", "@implementation"]
      };
      return {
        name: "Objective-C",
        aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
        keywords: {
          "variable.language": ["this", "super"],
          $pattern: n2,
          keyword: [
            "while",
            "export",
            "sizeof",
            "typedef",
            "const",
            "struct",
            "for",
            "union",
            "volatile",
            "static",
            "mutable",
            "if",
            "do",
            "return",
            "goto",
            "enum",
            "else",
            "break",
            "extern",
            "asm",
            "case",
            "default",
            "register",
            "explicit",
            "typename",
            "switch",
            "continue",
            "inline",
            "readonly",
            "assign",
            "readwrite",
            "self",
            "@synchronized",
            "id",
            "typeof",
            "nonatomic",
            "IBOutlet",
            "IBAction",
            "strong",
            "weak",
            "copy",
            "in",
            "out",
            "inout",
            "bycopy",
            "byref",
            "oneway",
            "__strong",
            "__weak",
            "__block",
            "__autoreleasing",
            "@private",
            "@protected",
            "@public",
            "@try",
            "@property",
            "@end",
            "@throw",
            "@catch",
            "@finally",
            "@autoreleasepool",
            "@synthesize",
            "@dynamic",
            "@selector",
            "@optional",
            "@required",
            "@encode",
            "@package",
            "@import",
            "@defs",
            "@compatibility_alias",
            "__bridge",
            "__bridge_transfer",
            "__bridge_retained",
            "__bridge_retain",
            "__covariant",
            "__contravariant",
            "__kindof",
            "_Nonnull",
            "_Nullable",
            "_Null_unspecified",
            "__FUNCTION__",
            "__PRETTY_FUNCTION__",
            "__attribute__",
            "getter",
            "setter",
            "retain",
            "unsafe_unretained",
            "nonnull",
            "nullable",
            "null_unspecified",
            "null_resettable",
            "class",
            "instancetype",
            "NS_DESIGNATED_INITIALIZER",
            "NS_UNAVAILABLE",
            "NS_REQUIRES_SUPER",
            "NS_RETURNS_INNER_POINTER",
            "NS_INLINE",
            "NS_AVAILABLE",
            "NS_DEPRECATED",
            "NS_ENUM",
            "NS_OPTIONS",
            "NS_SWIFT_UNAVAILABLE",
            "NS_ASSUME_NONNULL_BEGIN",
            "NS_ASSUME_NONNULL_END",
            "NS_REFINED_FOR_SWIFT",
            "NS_SWIFT_NAME",
            "NS_SWIFT_NOTHROW",
            "NS_DURING",
            "NS_HANDLER",
            "NS_ENDHANDLER",
            "NS_VALUERETURN",
            "NS_VOIDRETURN"
          ],
          literal: ["false", "true", "FALSE", "TRUE", "nil", "YES", "NO", "NULL"],
          built_in: ["dispatch_once_t", "dispatch_queue_t", "dispatch_sync", "dispatch_async", "dispatch_once"],
          type: [
            "int",
            "float",
            "char",
            "unsigned",
            "signed",
            "short",
            "long",
            "double",
            "wchar_t",
            "unichar",
            "void",
            "bool",
            "BOOL",
            "id|0",
            "_Bool"
          ]
        },
        illegal: "</",
        contains: [
          {
            className: "built_in",
            begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
          },
          e2.C_LINE_COMMENT_MODE,
          e2.C_BLOCK_COMMENT_MODE,
          e2.C_NUMBER_MODE,
          e2.QUOTE_STRING_MODE,
          e2.APOS_STRING_MODE,
          {
            className: "string",
            variants: [{
              begin: '@"',
              end: '"',
              illegal: "\\n",
              contains: [e2.BACKSLASH_ESCAPE]
            }]
          },
          {
            className: "meta",
            begin: /#\s*[a-z]+\b/,
            end: /$/,
            keywords: {
              keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include"
            },
            contains: [{
              begin: /\\\n/,
              relevance: 0
            }, e2.inherit(e2.QUOTE_STRING_MODE, {
              className: "string"
            }), {
              className: "string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            }, e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE]
          },
          {
            className: "class",
            begin: "(" + t2.keyword.join("|") + ")\\b",
            end: /(\{|$)/,
            excludeEnd: true,
            keywords: t2,
            contains: [e2.UNDERSCORE_TITLE_MODE]
          },
          {
            begin: "\\." + e2.UNDERSCORE_IDENT_RE,
            relevance: 0
          }
        ]
      };
    },
    grmr_perl: (e2) => {
      const n2 = e2.regex, t2 = /[dualxmsipngr]{0,12}/, a2 = {
        $pattern: /[\w.]+/,
        keyword: "abs accept alarm and atan2 bind binmode bless break caller chdir chmod chomp chop chown chr chroot close closedir connect continue cos crypt dbmclose dbmopen defined delete die do dump each else elsif endgrent endhostent endnetent endprotoent endpwent endservent eof eval exec exists exit exp fcntl fileno flock for foreach fork format formline getc getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr getnetbyname getnetent getpeername getpgrp getpriority getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid getservbyname getservbyport getservent getsockname getsockopt given glob gmtime goto grep gt hex if index int ioctl join keys kill last lc lcfirst length link listen local localtime log lstat lt ma map mkdir msgctl msgget msgrcv msgsnd my ne next no not oct open opendir or ord our pack package pipe pop pos print printf prototype push q|0 qq quotemeta qw qx rand read readdir readline readlink readpipe recv redo ref rename require reset return reverse rewinddir rindex rmdir say scalar seek seekdir select semctl semget semop send setgrent sethostent setnetent setpgrp setpriority setprotoent setpwent setservent setsockopt shift shmctl shmget shmread shmwrite shutdown sin sleep socket socketpair sort splice split sprintf sqrt srand stat state study sub substr symlink syscall sysopen sysread sysseek system syswrite tell telldir tie tied time times tr truncate uc ucfirst umask undef unless unlink unpack unshift untie until use utime values vec wait waitpid wantarray warn when while write x|0 xor y|0"
      }, i2 = {
        className: "subst",
        begin: "[$@]\\{",
        end: "\\}",
        keywords: a2
      }, r2 = {
        begin: /->\{/,
        end: /\}/
      }, s2 = {
        variants: [{
          begin: /\$\d/
        }, {
          begin: n2.concat(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
        }, {
          begin: /[$%@][^\s\w{]/,
          relevance: 0
        }]
      }, o2 = [e2.BACKSLASH_ESCAPE, i2, s2], l2 = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/], c2 = (e3, a3, i3 = "\\1") => {
        const r3 = "\\1" === i3 ? i3 : n2.concat(i3, a3);
        return n2.concat(n2.concat("(?:", e3, ")"), a3, /(?:\\.|[^\\\/])*?/, r3, /(?:\\.|[^\\\/])*?/, i3, t2);
      }, d2 = (e3, a3, i3) => n2.concat(n2.concat("(?:", e3, ")"), a3, /(?:\\.|[^\\\/])*?/, i3, t2), g2 = [s2, e2.HASH_COMMENT_MODE, e2.COMMENT(/^=\w/, /=cut/, {
        endsWithParent: true
      }), r2, {
        className: "string",
        contains: o2,
        variants: [{
          begin: "q[qwxr]?\\s*\\(",
          end: "\\)",
          relevance: 5
        }, {
          begin: "q[qwxr]?\\s*\\[",
          end: "\\]",
          relevance: 5
        }, {
          begin: "q[qwxr]?\\s*\\{",
          end: "\\}",
          relevance: 5
        }, {
          begin: "q[qwxr]?\\s*\\|",
          end: "\\|",
          relevance: 5
        }, {
          begin: "q[qwxr]?\\s*<",
          end: ">",
          relevance: 5
        }, {
          begin: "qw\\s+q",
          end: "q",
          relevance: 5
        }, {
          begin: "'",
          end: "'",
          contains: [e2.BACKSLASH_ESCAPE]
        }, {
          begin: '"',
          end: '"'
        }, {
          begin: "`",
          end: "`",
          contains: [e2.BACKSLASH_ESCAPE]
        }, {
          begin: /\{\w+\}/,
          relevance: 0
        }, {
          begin: "-?\\w+\\s*=>",
          relevance: 0
        }]
      }, {
        className: "number",
        begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        relevance: 0
      }, {
        begin: "(\\/\\/|" + e2.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        keywords: "split return print reverse grep",
        relevance: 0,
        contains: [e2.HASH_COMMENT_MODE, {
          className: "regexp",
          variants: [{
            begin: c2("s|tr|y", n2.either(...l2, {
              capture: true
            }))
          }, {
            begin: c2("s|tr|y", "\\(", "\\)")
          }, {
            begin: c2("s|tr|y", "\\[", "\\]")
          }, {
            begin: c2("s|tr|y", "\\{", "\\}")
          }],
          relevance: 2
        }, {
          className: "regexp",
          variants: [{
            begin: /(m|qr)\/\//,
            relevance: 0
          }, {
            begin: d2("(?:m|qr)?", /\//, /\//)
          }, {
            begin: d2("m|qr", n2.either(...l2, {
              capture: true
            }), /\1/)
          }, {
            begin: d2("m|qr", /\(/, /\)/)
          }, {
            begin: d2("m|qr", /\[/, /\]/)
          }, {
            begin: d2("m|qr", /\{/, /\}/)
          }]
        }]
      }, {
        className: "function",
        beginKeywords: "sub",
        end: "(\\s*\\(.*?\\))?[;{]",
        excludeEnd: true,
        relevance: 5,
        contains: [e2.TITLE_MODE]
      }, {
        begin: "-\\w\\b",
        relevance: 0
      }, {
        begin: "^__DATA__$",
        end: "^__END__$",
        subLanguage: "mojolicious",
        contains: [{
          begin: "^@@.*",
          end: "$",
          className: "comment"
        }]
      }];
      return i2.contains = g2, r2.contains = g2, {
        name: "Perl",
        aliases: ["pl", "pm"],
        keywords: a2,
        contains: g2
      };
    },
    grmr_php: (e2) => {
      const n2 = e2.regex, t2 = /(?![A-Za-z0-9])(?![$])/, a2 = n2.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/, t2), i2 = n2.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/, t2), r2 = {
        scope: "variable",
        match: "\\$+" + a2
      }, s2 = {
        scope: "subst",
        variants: [{
          begin: /\$\w+/
        }, {
          begin: /\{\$/,
          end: /\}/
        }]
      }, o2 = e2.inherit(e2.APOS_STRING_MODE, {
        illegal: null
      }), l2 = "[ 	\n]", c2 = {
        scope: "string",
        variants: [e2.inherit(e2.QUOTE_STRING_MODE, {
          illegal: null,
          contains: e2.QUOTE_STRING_MODE.contains.concat(s2)
        }), o2, e2.END_SAME_AS_BEGIN({
          begin: /<<<[ \t]*(\w+)\n/,
          end: /[ \t]*(\w+)\b/,
          contains: e2.QUOTE_STRING_MODE.contains.concat(s2)
        })]
      }, d2 = {
        scope: "number",
        variants: [{
          begin: "\\b0[bB][01]+(?:_[01]+)*\\b"
        }, {
          begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b"
        }, {
          begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"
        }, {
          begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"
        }],
        relevance: 0
      }, g2 = ["false", "null", "true"], u2 = [
        "__CLASS__",
        "__DIR__",
        "__FILE__",
        "__FUNCTION__",
        "__COMPILER_HALT_OFFSET__",
        "__LINE__",
        "__METHOD__",
        "__NAMESPACE__",
        "__TRAIT__",
        "die",
        "echo",
        "exit",
        "include",
        "include_once",
        "print",
        "require",
        "require_once",
        "array",
        "abstract",
        "and",
        "as",
        "binary",
        "bool",
        "boolean",
        "break",
        "callable",
        "case",
        "catch",
        "class",
        "clone",
        "const",
        "continue",
        "declare",
        "default",
        "do",
        "double",
        "else",
        "elseif",
        "empty",
        "enddeclare",
        "endfor",
        "endforeach",
        "endif",
        "endswitch",
        "endwhile",
        "enum",
        "eval",
        "extends",
        "final",
        "finally",
        "float",
        "for",
        "foreach",
        "from",
        "global",
        "goto",
        "if",
        "implements",
        "instanceof",
        "insteadof",
        "int",
        "integer",
        "interface",
        "isset",
        "iterable",
        "list",
        "match|0",
        "mixed",
        "new",
        "never",
        "object",
        "or",
        "private",
        "protected",
        "public",
        "readonly",
        "real",
        "return",
        "string",
        "switch",
        "throw",
        "trait",
        "try",
        "unset",
        "use",
        "var",
        "void",
        "while",
        "xor",
        "yield"
      ], b2 = [
        "Error|0",
        "AppendIterator",
        "ArgumentCountError",
        "ArithmeticError",
        "ArrayIterator",
        "ArrayObject",
        "AssertionError",
        "BadFunctionCallException",
        "BadMethodCallException",
        "CachingIterator",
        "CallbackFilterIterator",
        "CompileError",
        "Countable",
        "DirectoryIterator",
        "DivisionByZeroError",
        "DomainException",
        "EmptyIterator",
        "ErrorException",
        "Exception",
        "FilesystemIterator",
        "FilterIterator",
        "GlobIterator",
        "InfiniteIterator",
        "InvalidArgumentException",
        "IteratorIterator",
        "LengthException",
        "LimitIterator",
        "LogicException",
        "MultipleIterator",
        "NoRewindIterator",
        "OutOfBoundsException",
        "OutOfRangeException",
        "OuterIterator",
        "OverflowException",
        "ParentIterator",
        "ParseError",
        "RangeException",
        "RecursiveArrayIterator",
        "RecursiveCachingIterator",
        "RecursiveCallbackFilterIterator",
        "RecursiveDirectoryIterator",
        "RecursiveFilterIterator",
        "RecursiveIterator",
        "RecursiveIteratorIterator",
        "RecursiveRegexIterator",
        "RecursiveTreeIterator",
        "RegexIterator",
        "RuntimeException",
        "SeekableIterator",
        "SplDoublyLinkedList",
        "SplFileInfo",
        "SplFileObject",
        "SplFixedArray",
        "SplHeap",
        "SplMaxHeap",
        "SplMinHeap",
        "SplObjectStorage",
        "SplObserver",
        "SplPriorityQueue",
        "SplQueue",
        "SplStack",
        "SplSubject",
        "SplTempFileObject",
        "TypeError",
        "UnderflowException",
        "UnexpectedValueException",
        "UnhandledMatchError",
        "ArrayAccess",
        "BackedEnum",
        "Closure",
        "Fiber",
        "Generator",
        "Iterator",
        "IteratorAggregate",
        "Serializable",
        "Stringable",
        "Throwable",
        "Traversable",
        "UnitEnum",
        "WeakReference",
        "WeakMap",
        "Directory",
        "__PHP_Incomplete_Class",
        "parent",
        "php_user_filter",
        "self",
        "static",
        "stdClass"
      ], m2 = {
        keyword: u2,
        literal: ((e3) => {
          const n3 = [];
          return e3.forEach((e4) => {
            n3.push(e4), e4.toLowerCase() === e4 ? n3.push(e4.toUpperCase()) : n3.push(e4.toLowerCase());
          }), n3;
        })(g2),
        built_in: b2
      }, p2 = (e3) => e3.map((e4) => e4.replace(/\|\d+$/, "")), _2 = {
        variants: [{
          match: [/new/, n2.concat(l2, "+"), n2.concat("(?!", p2(b2).join("\\b|"), "\\b)"), i2],
          scope: {
            1: "keyword",
            4: "title.class"
          }
        }]
      }, h2 = n2.concat(a2, "\\b(?!\\()"), f2 = {
        variants: [{
          match: [n2.concat(/::/, n2.lookahead(/(?!class\b)/)), h2],
          scope: {
            2: "variable.constant"
          }
        }, {
          match: [/::/, /class/],
          scope: {
            2: "variable.language"
          }
        }, {
          match: [i2, n2.concat(/::/, n2.lookahead(/(?!class\b)/)), h2],
          scope: {
            1: "title.class",
            3: "variable.constant"
          }
        }, {
          match: [i2, n2.concat("::", n2.lookahead(/(?!class\b)/))],
          scope: {
            1: "title.class"
          }
        }, {
          match: [i2, /::/, /class/],
          scope: {
            1: "title.class",
            3: "variable.language"
          }
        }]
      }, E2 = {
        scope: "attr",
        match: n2.concat(a2, n2.lookahead(":"), n2.lookahead(/(?!::)/))
      }, y2 = {
        relevance: 0,
        begin: /\(/,
        end: /\)/,
        keywords: m2,
        contains: [E2, r2, f2, e2.C_BLOCK_COMMENT_MODE, c2, d2, _2]
      }, w2 = {
        relevance: 0,
        match: [
          /\b/,
          n2.concat("(?!fn\\b|function\\b|", p2(u2).join("\\b|"), "|", p2(b2).join("\\b|"), "\\b)"),
          a2,
          n2.concat(l2, "*"),
          n2.lookahead(/(?=\()/)
        ],
        scope: {
          3: "title.function.invoke"
        },
        contains: [y2]
      };
      y2.contains.push(w2);
      const N2 = [E2, f2, e2.C_BLOCK_COMMENT_MODE, c2, d2, _2];
      return {
        case_insensitive: false,
        keywords: m2,
        contains: [{
          begin: n2.concat(/#\[\s*/, i2),
          beginScope: "meta",
          end: /]/,
          endScope: "meta",
          keywords: {
            literal: g2,
            keyword: ["new", "array"]
          },
          contains: [{
            begin: /\[/,
            end: /]/,
            keywords: {
              literal: g2,
              keyword: ["new", "array"]
            },
            contains: ["self", ...N2]
          }, ...N2, {
            scope: "meta",
            match: i2
          }]
        }, e2.HASH_COMMENT_MODE, e2.COMMENT("//", "$"), e2.COMMENT("/\\*", "\\*/", {
          contains: [{
            scope: "doctag",
            match: "@[A-Za-z]+"
          }]
        }), {
          match: /__halt_compiler\(\);/,
          keywords: "__halt_compiler",
          starts: {
            scope: "comment",
            end: e2.MATCH_NOTHING_RE,
            contains: [{
              match: /\?>/,
              scope: "meta",
              endsParent: true
            }]
          }
        }, {
          scope: "meta",
          variants: [{
            begin: /<\?php/,
            relevance: 10
          }, {
            begin: /<\?=/
          }, {
            begin: /<\?/,
            relevance: 0.1
          }, {
            begin: /\?>/
          }]
        }, {
          scope: "variable.language",
          match: /\$this\b/
        }, r2, w2, f2, {
          match: [/const/, /\s/, a2],
          scope: {
            1: "keyword",
            3: "variable.constant"
          }
        }, _2, {
          scope: "function",
          relevance: 0,
          beginKeywords: "fn function",
          end: /[;{]/,
          excludeEnd: true,
          illegal: "[$%\\[]",
          contains: [{
            beginKeywords: "use"
          }, e2.UNDERSCORE_TITLE_MODE, {
            begin: "=>",
            endsParent: true
          }, {
            scope: "params",
            begin: "\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true,
            keywords: m2,
            contains: ["self", r2, f2, e2.C_BLOCK_COMMENT_MODE, c2, d2]
          }]
        }, {
          scope: "class",
          variants: [{
            beginKeywords: "enum",
            illegal: /[($"]/
          }, {
            beginKeywords: "class interface trait",
            illegal: /[:($"]/
          }],
          relevance: 0,
          end: /\{/,
          excludeEnd: true,
          contains: [{
            beginKeywords: "extends implements"
          }, e2.UNDERSCORE_TITLE_MODE]
        }, {
          beginKeywords: "namespace",
          relevance: 0,
          end: ";",
          illegal: /[.']/,
          contains: [e2.inherit(e2.UNDERSCORE_TITLE_MODE, {
            scope: "title.class"
          })]
        }, {
          beginKeywords: "use",
          relevance: 0,
          end: ";",
          contains: [{
            match: /\b(as|const|function)\b/,
            scope: "keyword"
          }, e2.UNDERSCORE_TITLE_MODE]
        }, c2, d2]
      };
    },
    grmr_php_template: (e2) => ({
      name: "PHP template",
      subLanguage: "xml",
      contains: [{
        begin: /<\?(php|=)?/,
        end: /\?>/,
        subLanguage: "php",
        contains: [{
          begin: "/\\*",
          end: "\\*/",
          skip: true
        }, {
          begin: 'b"',
          end: '"',
          skip: true
        }, {
          begin: "b'",
          end: "'",
          skip: true
        }, e2.inherit(e2.APOS_STRING_MODE, {
          illegal: null,
          className: null,
          contains: null,
          skip: true
        }), e2.inherit(e2.QUOTE_STRING_MODE, {
          illegal: null,
          className: null,
          contains: null,
          skip: true
        })]
      }]
    }),
    grmr_plaintext: (e2) => ({
      name: "Plain text",
      aliases: ["text", "txt"],
      disableAutodetect: true
    }),
    grmr_python: (e2) => {
      const n2 = e2.regex, t2 = /(?:[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFC5D\uFC64-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDF9\uFE71\uFE73\uFE77\uFE79\uFE7B\uFE7D\uFE7F-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037B-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u0870-\u0887\u0889-\u088E\u0898-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3C-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECE\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1715\u171F-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B4C\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA827\uA82C\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFC5D\uFC64-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDF9\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE71\uFE73\uFE77\uFE79\uFE7B\uFE7D\uFE7F-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDEFD-\uDF1C\uDF27\uDF30-\uDF50\uDF70-\uDF85\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC75\uDC7F-\uDCBA\uDCC2\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E-\uDE41\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39\uDF40-\uDF46]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDF00-\uDF10\uDF12-\uDF3A\uDF3E-\uDF42\uDF50-\uDF59\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC40-\uDC55]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDC30-\uDC6D\uDC8F\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAE\uDEC0-\uDEF9]|\uD839[\uDCD0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF]|\uDB40[\uDD00-\uDDEF])*/, a2 = [
        "and",
        "as",
        "assert",
        "async",
        "await",
        "break",
        "case",
        "class",
        "continue",
        "def",
        "del",
        "elif",
        "else",
        "except",
        "finally",
        "for",
        "from",
        "global",
        "if",
        "import",
        "in",
        "is",
        "lambda",
        "match",
        "nonlocal|10",
        "not",
        "or",
        "pass",
        "raise",
        "return",
        "try",
        "while",
        "with",
        "yield"
      ], i2 = {
        $pattern: /[A-Za-z]\w+|__\w+__/,
        keyword: a2,
        built_in: [
          "__import__",
          "abs",
          "all",
          "any",
          "ascii",
          "bin",
          "bool",
          "breakpoint",
          "bytearray",
          "bytes",
          "callable",
          "chr",
          "classmethod",
          "compile",
          "complex",
          "delattr",
          "dict",
          "dir",
          "divmod",
          "enumerate",
          "eval",
          "exec",
          "filter",
          "float",
          "format",
          "frozenset",
          "getattr",
          "globals",
          "hasattr",
          "hash",
          "help",
          "hex",
          "id",
          "input",
          "int",
          "isinstance",
          "issubclass",
          "iter",
          "len",
          "list",
          "locals",
          "map",
          "max",
          "memoryview",
          "min",
          "next",
          "object",
          "oct",
          "open",
          "ord",
          "pow",
          "print",
          "property",
          "range",
          "repr",
          "reversed",
          "round",
          "set",
          "setattr",
          "slice",
          "sorted",
          "staticmethod",
          "str",
          "sum",
          "super",
          "tuple",
          "type",
          "vars",
          "zip"
        ],
        literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
        type: [
          "Any",
          "Callable",
          "Coroutine",
          "Dict",
          "List",
          "Literal",
          "Generic",
          "Optional",
          "Sequence",
          "Set",
          "Tuple",
          "Type",
          "Union"
        ]
      }, r2 = {
        className: "meta",
        begin: /^(>>>|\.\.\.) /
      }, s2 = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: i2,
        illegal: /#/
      }, o2 = {
        begin: /\{\{/,
        relevance: 0
      }, l2 = {
        className: "string",
        contains: [e2.BACKSLASH_ESCAPE],
        variants: [{
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
          end: /'''/,
          contains: [e2.BACKSLASH_ESCAPE, r2],
          relevance: 10
        }, {
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
          end: /"""/,
          contains: [e2.BACKSLASH_ESCAPE, r2],
          relevance: 10
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])'''/,
          end: /'''/,
          contains: [e2.BACKSLASH_ESCAPE, r2, o2, s2]
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])"""/,
          end: /"""/,
          contains: [e2.BACKSLASH_ESCAPE, r2, o2, s2]
        }, {
          begin: /([uU]|[rR])'/,
          end: /'/,
          relevance: 10
        }, {
          begin: /([uU]|[rR])"/,
          end: /"/,
          relevance: 10
        }, {
          begin: /([bB]|[bB][rR]|[rR][bB])'/,
          end: /'/
        }, {
          begin: /([bB]|[bB][rR]|[rR][bB])"/,
          end: /"/
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])'/,
          end: /'/,
          contains: [e2.BACKSLASH_ESCAPE, o2, s2]
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])"/,
          end: /"/,
          contains: [e2.BACKSLASH_ESCAPE, o2, s2]
        }, e2.APOS_STRING_MODE, e2.QUOTE_STRING_MODE]
      }, c2 = "[0-9](_?[0-9])*", d2 = `(\\b(${c2}))?\\.(${c2})|\\b(${c2})\\.`, g2 = "\\b|" + a2.join("|"), u2 = {
        className: "number",
        relevance: 0,
        variants: [{
          begin: `(\\b(${c2})|(${d2}))[eE][+-]?(${c2})[jJ]?(?=${g2})`
        }, {
          begin: `(${d2})[jJ]?`
        }, {
          begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${g2})`
        }, {
          begin: `\\b0[bB](_?[01])+[lL]?(?=${g2})`
        }, {
          begin: `\\b0[oO](_?[0-7])+[lL]?(?=${g2})`
        }, {
          begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${g2})`
        }, {
          begin: `\\b(${c2})[jJ](?=${g2})`
        }]
      }, b2 = {
        className: "comment",
        begin: n2.lookahead(/# type:/),
        end: /$/,
        keywords: i2,
        contains: [{
          begin: /# type:/
        }, {
          begin: /#/,
          end: /\b\B/,
          endsWithParent: true
        }]
      }, m2 = {
        className: "params",
        variants: [{
          className: "",
          begin: /\(\s*\)/,
          skip: true
        }, {
          begin: /\(/,
          end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          keywords: i2,
          contains: ["self", r2, u2, l2, e2.HASH_COMMENT_MODE]
        }]
      };
      return s2.contains = [l2, u2, r2], {
        name: "Python",
        aliases: ["py", "gyp", "ipython"],
        unicodeRegex: true,
        keywords: i2,
        illegal: /(<\/|->|\?)|=>/,
        contains: [r2, u2, {
          begin: /\bself\b/
        }, {
          beginKeywords: "if",
          relevance: 0
        }, l2, b2, e2.HASH_COMMENT_MODE, {
          match: [/\bdef/, /\s+/, t2],
          scope: {
            1: "keyword",
            3: "title.function"
          },
          contains: [m2]
        }, {
          variants: [{
            match: [/\bclass/, /\s+/, t2, /\s*/, /\(\s*/, t2, /\s*\)/]
          }, {
            match: [/\bclass/, /\s+/, t2]
          }],
          scope: {
            1: "keyword",
            3: "title.class",
            6: "title.class.inherited"
          }
        }, {
          className: "meta",
          begin: /^[\t ]*@/,
          end: /(?=#)|$/,
          contains: [u2, m2, l2]
        }]
      };
    },
    grmr_python_repl: (e2) => ({
      aliases: ["pycon"],
      contains: [{
        className: "meta.prompt",
        starts: {
          end: / |$/,
          starts: {
            end: "$",
            subLanguage: "python"
          }
        },
        variants: [{
          begin: /^>>>(?=[ ]|$)/
        }, {
          begin: /^\.\.\.(?=[ ]|$)/
        }]
      }]
    }),
    grmr_r: (e2) => {
      const n2 = e2.regex, t2 = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, a2 = n2.either(
        /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
        /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/,
        /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/
      ), i2 = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, r2 = n2.either(/[()]/, /[{}]/, /\[\[/, /[[\]]/, /\\/, /,/);
      return {
        name: "R",
        keywords: {
          $pattern: t2,
          keyword: "function if in break next repeat else for while",
          literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
          built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
        },
        contains: [e2.COMMENT(/#'/, /$/, {
          contains: [{
            scope: "doctag",
            match: /@examples/,
            starts: {
              end: n2.lookahead(n2.either(/\n^#'\s*(?=@[a-zA-Z]+)/, /\n^(?!#')/)),
              endsParent: true
            }
          }, {
            scope: "doctag",
            begin: "@param",
            end: /$/,
            contains: [{
              scope: "variable",
              variants: [{
                match: t2
              }, {
                match: /`(?:\\.|[^`\\])+`/
              }],
              endsParent: true
            }]
          }, {
            scope: "doctag",
            match: /@[a-zA-Z]+/
          }, {
            scope: "keyword",
            match: /\\[a-zA-Z]+/
          }]
        }), e2.HASH_COMMENT_MODE, {
          scope: "string",
          contains: [e2.BACKSLASH_ESCAPE],
          variants: [e2.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\(/,
            end: /\)(-*)"/
          }), e2.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\{/,
            end: /\}(-*)"/
          }), e2.END_SAME_AS_BEGIN({
            begin: /[rR]"(-*)\[/,
            end: /\](-*)"/
          }), e2.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\(/,
            end: /\)(-*)'/
          }), e2.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\{/,
            end: /\}(-*)'/
          }), e2.END_SAME_AS_BEGIN({
            begin: /[rR]'(-*)\[/,
            end: /\](-*)'/
          }), {
            begin: '"',
            end: '"',
            relevance: 0
          }, {
            begin: "'",
            end: "'",
            relevance: 0
          }]
        }, {
          relevance: 0,
          variants: [{
            scope: {
              1: "operator",
              2: "number"
            },
            match: [i2, a2]
          }, {
            scope: {
              1: "operator",
              2: "number"
            },
            match: [/%[^%]*%/, a2]
          }, {
            scope: {
              1: "punctuation",
              2: "number"
            },
            match: [r2, a2]
          }, {
            scope: {
              2: "number"
            },
            match: [/[^a-zA-Z0-9._]|^/, a2]
          }]
        }, {
          scope: {
            3: "operator"
          },
          match: [t2, /\s+/, /<-/, /\s+/]
        }, {
          scope: "operator",
          relevance: 0,
          variants: [{
            match: i2
          }, {
            match: /%[^%]*%/
          }]
        }, {
          scope: "punctuation",
          relevance: 0,
          match: r2
        }, {
          begin: "`",
          end: "`",
          contains: [{
            begin: /\\./
          }]
        }]
      };
    },
    grmr_ruby: (e2) => {
      const n2 = e2.regex, t2 = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", a2 = n2.either(/\b([A-Z]+[a-z0-9]+)+/, /\b([A-Z]+[a-z0-9]+)+[A-Z]+/), i2 = n2.concat(a2, /(::\w+)*/), r2 = {
        "variable.constant": ["__FILE__", "__LINE__", "__ENCODING__"],
        "variable.language": ["self", "super"],
        keyword: [
          "alias",
          "and",
          "begin",
          "BEGIN",
          "break",
          "case",
          "class",
          "defined",
          "do",
          "else",
          "elsif",
          "end",
          "END",
          "ensure",
          "for",
          "if",
          "in",
          "module",
          "next",
          "not",
          "or",
          "redo",
          "require",
          "rescue",
          "retry",
          "return",
          "then",
          "undef",
          "unless",
          "until",
          "when",
          "while",
          "yield",
          "include",
          "extend",
          "prepend",
          "public",
          "private",
          "protected",
          "raise",
          "throw"
        ],
        built_in: [
          "proc",
          "lambda",
          "attr_accessor",
          "attr_reader",
          "attr_writer",
          "define_method",
          "private_constant",
          "module_function"
        ],
        literal: ["true", "false", "nil"]
      }, s2 = {
        className: "doctag",
        begin: "@[A-Za-z]+"
      }, o2 = {
        begin: "#<",
        end: ">"
      }, l2 = [e2.COMMENT("#", "$", {
        contains: [s2]
      }), e2.COMMENT("^=begin", "^=end", {
        contains: [s2],
        relevance: 10
      }), e2.COMMENT("^__END__", e2.MATCH_NOTHING_RE)], c2 = {
        className: "subst",
        begin: /#\{/,
        end: /\}/,
        keywords: r2
      }, d2 = {
        className: "string",
        contains: [e2.BACKSLASH_ESCAPE, c2],
        variants: [{
          begin: /'/,
          end: /'/
        }, {
          begin: /"/,
          end: /"/
        }, {
          begin: /`/,
          end: /`/
        }, {
          begin: /%[qQwWx]?\(/,
          end: /\)/
        }, {
          begin: /%[qQwWx]?\[/,
          end: /\]/
        }, {
          begin: /%[qQwWx]?\{/,
          end: /\}/
        }, {
          begin: /%[qQwWx]?</,
          end: />/
        }, {
          begin: /%[qQwWx]?\//,
          end: /\//
        }, {
          begin: /%[qQwWx]?%/,
          end: /%/
        }, {
          begin: /%[qQwWx]?-/,
          end: /-/
        }, {
          begin: /%[qQwWx]?\|/,
          end: /\|/
        }, {
          begin: /\B\?(\\\d{1,3})/
        }, {
          begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
        }, {
          begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
        }, {
          begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
        }, {
          begin: /\B\?\\(c|C-)[\x20-\x7e]/
        }, {
          begin: /\B\?\\?\S/
        }, {
          begin: n2.concat(/<<[-~]?'?/, n2.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),
          contains: [e2.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/,
            contains: [e2.BACKSLASH_ESCAPE, c2]
          })]
        }]
      }, g2 = "[0-9](_?[0-9])*", u2 = {
        className: "number",
        relevance: 0,
        variants: [{
          begin: `\\b([1-9](_?[0-9])*|0)(\\.(${g2}))?([eE][+-]?(${g2})|r)?i?\\b`
        }, {
          begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
        }, {
          begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
        }, {
          begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
        }, {
          begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
        }, {
          begin: "\\b0(_?[0-7])+r?i?\\b"
        }]
      }, b2 = {
        variants: [{
          match: /\(\)/
        }, {
          className: "params",
          begin: /\(/,
          end: /(?=\))/,
          excludeBegin: true,
          endsParent: true,
          keywords: r2
        }]
      }, m2 = [d2, {
        variants: [{
          match: [/class\s+/, i2, /\s+<\s+/, i2]
        }, {
          match: [/\b(class|module)\s+/, i2]
        }],
        scope: {
          2: "title.class",
          4: "title.class.inherited"
        },
        keywords: r2
      }, {
        match: [/(include|extend)\s+/, i2],
        scope: {
          2: "title.class"
        },
        keywords: r2
      }, {
        relevance: 0,
        match: [i2, /\.new[. (]/],
        scope: {
          1: "title.class"
        }
      }, {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant"
      }, {
        relevance: 0,
        match: a2,
        scope: "title.class"
      }, {
        match: [/def/, /\s+/, t2],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [b2]
      }, {
        begin: e2.IDENT_RE + "::"
      }, {
        className: "symbol",
        begin: e2.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
        relevance: 0
      }, {
        className: "symbol",
        begin: ":(?!\\s)",
        contains: [d2, {
          begin: t2
        }],
        relevance: 0
      }, u2, {
        className: "variable",
        begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
      }, {
        className: "params",
        begin: /\|/,
        end: /\|/,
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0,
        keywords: r2
      }, {
        begin: "(" + e2.RE_STARTERS_RE + "|unless)\\s*",
        keywords: "unless",
        contains: [{
          className: "regexp",
          contains: [e2.BACKSLASH_ESCAPE, c2],
          illegal: /\n/,
          variants: [{
            begin: "/",
            end: "/[a-z]*"
          }, {
            begin: /%r\{/,
            end: /\}[a-z]*/
          }, {
            begin: "%r\\(",
            end: "\\)[a-z]*"
          }, {
            begin: "%r!",
            end: "![a-z]*"
          }, {
            begin: "%r\\[",
            end: "\\][a-z]*"
          }]
        }].concat(o2, l2),
        relevance: 0
      }].concat(o2, l2);
      c2.contains = m2, b2.contains = m2;
      const p2 = [{
        begin: /^\s*=>/,
        starts: {
          end: "$",
          contains: m2
        }
      }, {
        className: "meta.prompt",
        begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
        starts: {
          end: "$",
          keywords: r2,
          contains: m2
        }
      }];
      return l2.unshift(o2), {
        name: "Ruby",
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        keywords: r2,
        illegal: /\/\*/,
        contains: [e2.SHEBANG({
          binary: "ruby"
        })].concat(p2).concat(l2).concat(m2)
      };
    },
    grmr_rust: (e2) => {
      const n2 = e2.regex, t2 = {
        className: "title.function.invoke",
        relevance: 0,
        begin: n2.concat(/\b/, /(?!let\b)/, e2.IDENT_RE, n2.lookahead(/\s*\(/))
      }, a2 = "([ui](8|16|32|64|128|size)|f(32|64))?", i2 = [
        "drop ",
        "Copy",
        "Send",
        "Sized",
        "Sync",
        "Drop",
        "Fn",
        "FnMut",
        "FnOnce",
        "ToOwned",
        "Clone",
        "Debug",
        "PartialEq",
        "PartialOrd",
        "Eq",
        "Ord",
        "AsRef",
        "AsMut",
        "Into",
        "From",
        "Default",
        "Iterator",
        "Extend",
        "IntoIterator",
        "DoubleEndedIterator",
        "ExactSizeIterator",
        "SliceConcatExt",
        "ToString",
        "assert!",
        "assert_eq!",
        "bitflags!",
        "bytes!",
        "cfg!",
        "col!",
        "concat!",
        "concat_idents!",
        "debug_assert!",
        "debug_assert_eq!",
        "env!",
        "panic!",
        "file!",
        "format!",
        "format_args!",
        "include_bytes!",
        "include_str!",
        "line!",
        "local_data_key!",
        "module_path!",
        "option_env!",
        "print!",
        "println!",
        "select!",
        "stringify!",
        "try!",
        "unimplemented!",
        "unreachable!",
        "vec!",
        "write!",
        "writeln!",
        "macro_rules!",
        "assert_ne!",
        "debug_assert_ne!"
      ], r2 = [
        "i8",
        "i16",
        "i32",
        "i64",
        "i128",
        "isize",
        "u8",
        "u16",
        "u32",
        "u64",
        "u128",
        "usize",
        "f32",
        "f64",
        "str",
        "char",
        "bool",
        "Box",
        "Option",
        "Result",
        "String",
        "Vec"
      ];
      return {
        name: "Rust",
        aliases: ["rs"],
        keywords: {
          $pattern: e2.IDENT_RE + "!?",
          type: r2,
          keyword: [
            "abstract",
            "as",
            "async",
            "await",
            "become",
            "box",
            "break",
            "const",
            "continue",
            "crate",
            "do",
            "dyn",
            "else",
            "enum",
            "extern",
            "false",
            "final",
            "fn",
            "for",
            "if",
            "impl",
            "in",
            "let",
            "loop",
            "macro",
            "match",
            "mod",
            "move",
            "mut",
            "override",
            "priv",
            "pub",
            "ref",
            "return",
            "self",
            "Self",
            "static",
            "struct",
            "super",
            "trait",
            "true",
            "try",
            "type",
            "typeof",
            "unsafe",
            "unsized",
            "use",
            "virtual",
            "where",
            "while",
            "yield"
          ],
          literal: ["true", "false", "Some", "None", "Ok", "Err"],
          built_in: i2
        },
        illegal: "</",
        contains: [e2.C_LINE_COMMENT_MODE, e2.COMMENT("/\\*", "\\*/", {
          contains: ["self"]
        }), e2.inherit(e2.QUOTE_STRING_MODE, {
          begin: /b?"/,
          illegal: null
        }), {
          className: "string",
          variants: [{
            begin: /b?r(#*)"(.|\n)*?"\1(?!#)/
          }, {
            begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
          }]
        }, {
          className: "symbol",
          begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
        }, {
          className: "number",
          variants: [{
            begin: "\\b0b([01_]+)" + a2
          }, {
            begin: "\\b0o([0-7_]+)" + a2
          }, {
            begin: "\\b0x([A-Fa-f0-9_]+)" + a2
          }, {
            begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + a2
          }],
          relevance: 0
        }, {
          begin: [/fn/, /\s+/, e2.UNDERSCORE_IDENT_RE],
          className: {
            1: "keyword",
            3: "title.function"
          }
        }, {
          className: "meta",
          begin: "#!?\\[",
          end: "\\]",
          contains: [{
            className: "string",
            begin: /"/,
            end: /"/
          }]
        }, {
          begin: [/let/, /\s+/, /(?:mut\s+)?/, e2.UNDERSCORE_IDENT_RE],
          className: {
            1: "keyword",
            3: "keyword",
            4: "variable"
          }
        }, {
          begin: [/for/, /\s+/, e2.UNDERSCORE_IDENT_RE, /\s+/, /in/],
          className: {
            1: "keyword",
            3: "variable",
            5: "keyword"
          }
        }, {
          begin: [/type/, /\s+/, e2.UNDERSCORE_IDENT_RE],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }, {
          begin: [/(?:trait|enum|struct|union|impl|for)/, /\s+/, e2.UNDERSCORE_IDENT_RE],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }, {
          begin: e2.IDENT_RE + "::",
          keywords: {
            keyword: "Self",
            built_in: i2,
            type: r2
          }
        }, {
          className: "punctuation",
          begin: "->"
        }, t2]
      };
    },
    grmr_scss: (e2) => {
      const n2 = J(e2), t2 = te, a2 = ne, i2 = "@[a-z-]+", r2 = {
        className: "variable",
        begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b",
        relevance: 0
      };
      return {
        name: "SCSS",
        case_insensitive: true,
        illegal: "[=/|']",
        contains: [e2.C_LINE_COMMENT_MODE, e2.C_BLOCK_COMMENT_MODE, n2.CSS_NUMBER_MODE, {
          className: "selector-id",
          begin: "#[A-Za-z0-9_-]+",
          relevance: 0
        }, {
          className: "selector-class",
          begin: "\\.[A-Za-z0-9_-]+",
          relevance: 0
        }, n2.ATTRIBUTE_SELECTOR_MODE, {
          className: "selector-tag",
          begin: "\\b(" + Y.join("|") + ")\\b",
          relevance: 0
        }, {
          className: "selector-pseudo",
          begin: ":(" + a2.join("|") + ")"
        }, {
          className: "selector-pseudo",
          begin: ":(:)?(" + t2.join("|") + ")"
        }, r2, {
          begin: /\(/,
          end: /\)/,
          contains: [n2.CSS_NUMBER_MODE]
        }, n2.CSS_VARIABLE, {
          className: "attribute",
          begin: "\\b(" + ae.join("|") + ")\\b"
        }, {
          begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
        }, {
          begin: /:/,
          end: /[;}{]/,
          relevance: 0,
          contains: [
            n2.BLOCK_COMMENT,
            r2,
            n2.HEXCOLOR,
            n2.CSS_NUMBER_MODE,
            e2.QUOTE_STRING_MODE,
            e2.APOS_STRING_MODE,
            n2.IMPORTANT,
            n2.FUNCTION_DISPATCH
          ]
        }, {
          begin: "@(page|font-face)",
          keywords: {
            $pattern: i2,
            keyword: "@page @font-face"
          }
        }, {
          begin: "@",
          end: "[{;]",
          returnBegin: true,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: "and or not only",
            attribute: ee.join(" ")
          },
          contains: [{
            begin: i2,
            className: "keyword"
          }, {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          }, r2, e2.QUOTE_STRING_MODE, e2.APOS_STRING_MODE, n2.HEXCOLOR, n2.CSS_NUMBER_MODE]
        }, n2.FUNCTION_DISPATCH]
      };
    },
    grmr_shell: (e2) => ({
      name: "Shell Session",
      aliases: ["console", "shellsession"],
      contains: [{
        className: "meta.prompt",
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
        starts: {
          end: /[^\\](?=\s*$)/,
          subLanguage: "bash"
        }
      }]
    }),
    grmr_sql: (e2) => {
      const n2 = e2.regex, t2 = e2.COMMENT("--", "$"), a2 = ["true", "false", "unknown"], i2 = [
        "bigint",
        "binary",
        "blob",
        "boolean",
        "char",
        "character",
        "clob",
        "date",
        "dec",
        "decfloat",
        "decimal",
        "float",
        "int",
        "integer",
        "interval",
        "nchar",
        "nclob",
        "national",
        "numeric",
        "real",
        "row",
        "smallint",
        "time",
        "timestamp",
        "varchar",
        "varying",
        "varbinary"
      ], r2 = [
        "abs",
        "acos",
        "array_agg",
        "asin",
        "atan",
        "avg",
        "cast",
        "ceil",
        "ceiling",
        "coalesce",
        "corr",
        "cos",
        "cosh",
        "count",
        "covar_pop",
        "covar_samp",
        "cume_dist",
        "dense_rank",
        "deref",
        "element",
        "exp",
        "extract",
        "first_value",
        "floor",
        "json_array",
        "json_arrayagg",
        "json_exists",
        "json_object",
        "json_objectagg",
        "json_query",
        "json_table",
        "json_table_primitive",
        "json_value",
        "lag",
        "last_value",
        "lead",
        "listagg",
        "ln",
        "log",
        "log10",
        "lower",
        "max",
        "min",
        "mod",
        "nth_value",
        "ntile",
        "nullif",
        "percent_rank",
        "percentile_cont",
        "percentile_disc",
        "position",
        "position_regex",
        "power",
        "rank",
        "regr_avgx",
        "regr_avgy",
        "regr_count",
        "regr_intercept",
        "regr_r2",
        "regr_slope",
        "regr_sxx",
        "regr_sxy",
        "regr_syy",
        "row_number",
        "sin",
        "sinh",
        "sqrt",
        "stddev_pop",
        "stddev_samp",
        "substring",
        "substring_regex",
        "sum",
        "tan",
        "tanh",
        "translate",
        "translate_regex",
        "treat",
        "trim",
        "trim_array",
        "unnest",
        "upper",
        "value_of",
        "var_pop",
        "var_samp",
        "width_bucket"
      ], s2 = [
        "create table",
        "insert into",
        "primary key",
        "foreign key",
        "not null",
        "alter table",
        "add constraint",
        "grouping sets",
        "on overflow",
        "character set",
        "respect nulls",
        "ignore nulls",
        "nulls first",
        "nulls last",
        "depth first",
        "breadth first"
      ], o2 = r2, l2 = [
        "abs",
        "acos",
        "all",
        "allocate",
        "alter",
        "and",
        "any",
        "are",
        "array",
        "array_agg",
        "array_max_cardinality",
        "as",
        "asensitive",
        "asin",
        "asymmetric",
        "at",
        "atan",
        "atomic",
        "authorization",
        "avg",
        "begin",
        "begin_frame",
        "begin_partition",
        "between",
        "bigint",
        "binary",
        "blob",
        "boolean",
        "both",
        "by",
        "call",
        "called",
        "cardinality",
        "cascaded",
        "case",
        "cast",
        "ceil",
        "ceiling",
        "char",
        "char_length",
        "character",
        "character_length",
        "check",
        "classifier",
        "clob",
        "close",
        "coalesce",
        "collate",
        "collect",
        "column",
        "commit",
        "condition",
        "connect",
        "constraint",
        "contains",
        "convert",
        "copy",
        "corr",
        "corresponding",
        "cos",
        "cosh",
        "count",
        "covar_pop",
        "covar_samp",
        "create",
        "cross",
        "cube",
        "cume_dist",
        "current",
        "current_catalog",
        "current_date",
        "current_default_transform_group",
        "current_path",
        "current_role",
        "current_row",
        "current_schema",
        "current_time",
        "current_timestamp",
        "current_path",
        "current_role",
        "current_transform_group_for_type",
        "current_user",
        "cursor",
        "cycle",
        "date",
        "day",
        "deallocate",
        "dec",
        "decimal",
        "decfloat",
        "declare",
        "default",
        "define",
        "delete",
        "dense_rank",
        "deref",
        "describe",
        "deterministic",
        "disconnect",
        "distinct",
        "double",
        "drop",
        "dynamic",
        "each",
        "element",
        "else",
        "empty",
        "end",
        "end_frame",
        "end_partition",
        "end-exec",
        "equals",
        "escape",
        "every",
        "except",
        "exec",
        "execute",
        "exists",
        "exp",
        "external",
        "extract",
        "false",
        "fetch",
        "filter",
        "first_value",
        "float",
        "floor",
        "for",
        "foreign",
        "frame_row",
        "free",
        "from",
        "full",
        "function",
        "fusion",
        "get",
        "global",
        "grant",
        "group",
        "grouping",
        "groups",
        "having",
        "hold",
        "hour",
        "identity",
        "in",
        "indicator",
        "initial",
        "inner",
        "inout",
        "insensitive",
        "insert",
        "int",
        "integer",
        "intersect",
        "intersection",
        "interval",
        "into",
        "is",
        "join",
        "json_array",
        "json_arrayagg",
        "json_exists",
        "json_object",
        "json_objectagg",
        "json_query",
        "json_table",
        "json_table_primitive",
        "json_value",
        "lag",
        "language",
        "large",
        "last_value",
        "lateral",
        "lead",
        "leading",
        "left",
        "like",
        "like_regex",
        "listagg",
        "ln",
        "local",
        "localtime",
        "localtimestamp",
        "log",
        "log10",
        "lower",
        "match",
        "match_number",
        "match_recognize",
        "matches",
        "max",
        "member",
        "merge",
        "method",
        "min",
        "minute",
        "mod",
        "modifies",
        "module",
        "month",
        "multiset",
        "national",
        "natural",
        "nchar",
        "nclob",
        "new",
        "no",
        "none",
        "normalize",
        "not",
        "nth_value",
        "ntile",
        "null",
        "nullif",
        "numeric",
        "octet_length",
        "occurrences_regex",
        "of",
        "offset",
        "old",
        "omit",
        "on",
        "one",
        "only",
        "open",
        "or",
        "order",
        "out",
        "outer",
        "over",
        "overlaps",
        "overlay",
        "parameter",
        "partition",
        "pattern",
        "per",
        "percent",
        "percent_rank",
        "percentile_cont",
        "percentile_disc",
        "period",
        "portion",
        "position",
        "position_regex",
        "power",
        "precedes",
        "precision",
        "prepare",
        "primary",
        "procedure",
        "ptf",
        "range",
        "rank",
        "reads",
        "real",
        "recursive",
        "ref",
        "references",
        "referencing",
        "regr_avgx",
        "regr_avgy",
        "regr_count",
        "regr_intercept",
        "regr_r2",
        "regr_slope",
        "regr_sxx",
        "regr_sxy",
        "regr_syy",
        "release",
        "result",
        "return",
        "returns",
        "revoke",
        "right",
        "rollback",
        "rollup",
        "row",
        "row_number",
        "rows",
        "running",
        "savepoint",
        "scope",
        "scroll",
        "search",
        "second",
        "seek",
        "select",
        "sensitive",
        "session_user",
        "set",
        "show",
        "similar",
        "sin",
        "sinh",
        "skip",
        "smallint",
        "some",
        "specific",
        "specifictype",
        "sql",
        "sqlexception",
        "sqlstate",
        "sqlwarning",
        "sqrt",
        "start",
        "static",
        "stddev_pop",
        "stddev_samp",
        "submultiset",
        "subset",
        "substring",
        "substring_regex",
        "succeeds",
        "sum",
        "symmetric",
        "system",
        "system_time",
        "system_user",
        "table",
        "tablesample",
        "tan",
        "tanh",
        "then",
        "time",
        "timestamp",
        "timezone_hour",
        "timezone_minute",
        "to",
        "trailing",
        "translate",
        "translate_regex",
        "translation",
        "treat",
        "trigger",
        "trim",
        "trim_array",
        "true",
        "truncate",
        "uescape",
        "union",
        "unique",
        "unknown",
        "unnest",
        "update",
        "upper",
        "user",
        "using",
        "value",
        "values",
        "value_of",
        "var_pop",
        "var_samp",
        "varbinary",
        "varchar",
        "varying",
        "versioning",
        "when",
        "whenever",
        "where",
        "width_bucket",
        "window",
        "with",
        "within",
        "without",
        "year",
        "add",
        "asc",
        "collation",
        "desc",
        "final",
        "first",
        "last",
        "view"
      ].filter((e3) => !r2.includes(e3)), c2 = {
        begin: n2.concat(/\b/, n2.either(...o2), /\s*\(/),
        relevance: 0,
        keywords: {
          built_in: o2
        }
      };
      return {
        name: "SQL",
        case_insensitive: true,
        illegal: /[{}]|<\//,
        keywords: {
          $pattern: /\b[\w\.]+/,
          keyword: ((e3, {
            exceptions: n3,
            when: t3
          } = {}) => {
            const a3 = t3;
            return n3 = n3 || [], e3.map((e4) => e4.match(/\|\d+$/) || n3.includes(e4) ? e4 : a3(e4) ? e4 + "|0" : e4);
          })(l2, {
            when: (e3) => e3.length < 3
          }),
          literal: a2,
          type: i2,
          built_in: [
            "current_catalog",
            "current_date",
            "current_default_transform_group",
            "current_path",
            "current_role",
            "current_schema",
            "current_transform_group_for_type",
            "current_user",
            "session_user",
            "system_time",
            "system_user",
            "current_time",
            "localtime",
            "current_timestamp",
            "localtimestamp"
          ]
        },
        contains: [{
          begin: n2.either(...s2),
          relevance: 0,
          keywords: {
            $pattern: /[\w\.]+/,
            keyword: l2.concat(s2),
            literal: a2,
            type: i2
          }
        }, {
          className: "type",
          begin: n2.either("double precision", "large object", "with timezone", "without timezone")
        }, c2, {
          className: "variable",
          begin: /@[a-z0-9]+/
        }, {
          className: "string",
          variants: [{
            begin: /'/,
            end: /'/,
            contains: [{
              begin: /''/
            }]
          }]
        }, {
          begin: /"/,
          end: /"/,
          contains: [{
            begin: /""/
          }]
        }, e2.C_NUMBER_MODE, e2.C_BLOCK_COMMENT_MODE, t2, {
          className: "operator",
          begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
          relevance: 0
        }]
      };
    },
    grmr_swift: (e2) => {
      const n2 = {
        match: /\s+/,
        relevance: 0
      }, t2 = e2.COMMENT("/\\*", "\\*/", {
        contains: ["self"]
      }), a2 = [e2.C_LINE_COMMENT_MODE, t2], i2 = {
        match: [/\./, p(...Ee, ...ye)],
        className: {
          2: "keyword"
        }
      }, r2 = {
        match: m(/\./, p(...Ne)),
        relevance: 0
      }, s2 = Ne.filter((e3) => "string" == typeof e3).concat(["_|0"]), o2 = {
        variants: [{
          className: "keyword",
          match: p(...Ne.filter((e3) => "string" != typeof e3).concat(we).map(fe), ...ye)
        }]
      }, l2 = {
        $pattern: p(/\b\w+/, /#\w+/),
        keyword: s2.concat(ke),
        literal: ve
      }, c2 = [i2, r2, o2], d2 = [{
        match: m(/\./, p(...xe)),
        relevance: 0
      }, {
        className: "built_in",
        match: m(/\b/, p(...xe), /(?=\()/)
      }], u2 = {
        match: /->/,
        relevance: 0
      }, b2 = [u2, {
        className: "operator",
        relevance: 0,
        variants: [{
          match: Ae
        }, {
          match: `\\.(\\.|${Se})+`
        }]
      }], _2 = "([0-9a-fA-F]_*)+", h2 = {
        className: "number",
        relevance: 0,
        variants: [{
          match: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
        }, {
          match: `\\b0x(${_2})(\\.(${_2}))?([pP][+-]?(([0-9]_*)+))?\\b`
        }, {
          match: /\b0o([0-7]_*)+\b/
        }, {
          match: /\b0b([01]_*)+\b/
        }]
      }, f2 = (e3 = "") => ({
        className: "subst",
        variants: [{
          match: m(/\\/, e3, /[0\\tnr"']/)
        }, {
          match: m(/\\/, e3, /u\{[0-9a-fA-F]{1,8}\}/)
        }]
      }), E2 = (e3 = "") => ({
        className: "subst",
        match: m(/\\/, e3, /[\t ]*(?:[\r\n]|\r\n)/)
      }), y2 = (e3 = "") => ({
        className: "subst",
        label: "interpol",
        begin: m(/\\/, e3, /\(/),
        end: /\)/
      }), w2 = (e3 = "") => ({
        begin: m(e3, /"""/),
        end: m(/"""/, e3),
        contains: [f2(e3), E2(e3), y2(e3)]
      }), N2 = (e3 = "") => ({
        begin: m(e3, /"/),
        end: m(/"/, e3),
        contains: [f2(e3), y2(e3)]
      }), v2 = {
        className: "string",
        variants: [w2(), w2("#"), w2("##"), w2("###"), N2(), N2("#"), N2("##"), N2("###")]
      }, O2 = {
        match: m(/`/, Re, /`/)
      }, k2 = [O2, {
        className: "variable",
        match: /\$\d+/
      }, {
        className: "variable",
        match: `\\$${Te}+`
      }], x2 = [{
        match: /(@|#(un)?)available/,
        className: "keyword",
        starts: {
          contains: [{
            begin: /\(/,
            end: /\)/,
            keywords: Le,
            contains: [...b2, h2, v2]
          }]
        }
      }, {
        className: "keyword",
        match: m(/@/, p(...Ie))
      }, {
        className: "meta",
        match: m(/@/, Re)
      }], M2 = {
        match: g(/\b[A-Z]/),
        relevance: 0,
        contains: [{
          className: "type",
          match: m(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, Te, "+")
        }, {
          className: "type",
          match: De,
          relevance: 0
        }, {
          match: /[?!]+/,
          relevance: 0
        }, {
          match: /\.\.\./,
          relevance: 0
        }, {
          match: m(/\s+&\s+/, g(De)),
          relevance: 0
        }]
      }, S2 = {
        begin: /</,
        end: />/,
        keywords: l2,
        contains: [...a2, ...c2, ...x2, u2, M2]
      };
      M2.contains.push(S2);
      const A2 = {
        begin: /\(/,
        end: /\)/,
        relevance: 0,
        keywords: l2,
        contains: ["self", {
          match: m(Re, /\s*:/),
          keywords: "_|0",
          relevance: 0
        }, ...a2, ...c2, ...d2, ...b2, h2, v2, ...k2, ...x2, M2]
      }, C2 = {
        begin: /</,
        end: />/,
        contains: [...a2, M2]
      }, T2 = {
        begin: /\(/,
        end: /\)/,
        keywords: l2,
        contains: [{
          begin: p(g(m(Re, /\s*:/)), g(m(Re, /\s+/, Re, /\s*:/))),
          end: /:/,
          relevance: 0,
          contains: [{
            className: "keyword",
            match: /\b_\b/
          }, {
            className: "params",
            match: Re
          }]
        }, ...a2, ...c2, ...b2, h2, v2, ...x2, M2, A2],
        endsParent: true,
        illegal: /["']/
      }, R2 = {
        match: [/func/, /\s+/, p(O2.match, Re, Ae)],
        className: {
          1: "keyword",
          3: "title.function"
        },
        contains: [C2, T2, n2],
        illegal: [/\[/, /%/]
      }, D2 = {
        match: [/\b(?:subscript|init[?!]?)/, /\s*(?=[<(])/],
        className: {
          1: "keyword"
        },
        contains: [C2, T2, n2],
        illegal: /\[|%/
      }, I2 = {
        match: [/operator/, /\s+/, Ae],
        className: {
          1: "keyword",
          3: "title"
        }
      }, L2 = {
        begin: [/precedencegroup/, /\s+/, De],
        className: {
          1: "keyword",
          3: "title"
        },
        contains: [M2],
        keywords: [...Oe, ...ve],
        end: /}/
      };
      for (const e3 of v2.variants) {
        const n3 = e3.contains.find((e4) => "interpol" === e4.label);
        n3.keywords = l2;
        const t3 = [...c2, ...d2, ...b2, h2, v2, ...k2];
        n3.contains = [...t3, {
          begin: /\(/,
          end: /\)/,
          contains: ["self", ...t3]
        }];
      }
      return {
        name: "Swift",
        keywords: l2,
        contains: [...a2, R2, D2, {
          beginKeywords: "struct protocol class extension enum actor",
          end: "\\{",
          excludeEnd: true,
          keywords: l2,
          contains: [e2.inherit(e2.TITLE_MODE, {
            className: "title.class",
            begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
          }), ...c2]
        }, I2, L2, {
          beginKeywords: "import",
          end: /$/,
          contains: [...a2],
          relevance: 0
        }, ...c2, ...d2, ...b2, h2, v2, ...k2, ...x2, M2, A2]
      };
    },
    grmr_typescript: (e2) => {
      const n2 = he(e2), t2 = ["any", "void", "number", "boolean", "string", "object", "never", "symbol", "bigint", "unknown"], a2 = {
        beginKeywords: "namespace",
        end: /\{/,
        excludeEnd: true,
        contains: [n2.exports.CLASS_REFERENCE]
      }, i2 = {
        beginKeywords: "interface",
        end: /\{/,
        excludeEnd: true,
        keywords: {
          keyword: "interface extends",
          built_in: t2
        },
        contains: [n2.exports.CLASS_REFERENCE]
      }, r2 = {
        $pattern: ce,
        keyword: de.concat([
          "type",
          "namespace",
          "interface",
          "public",
          "private",
          "protected",
          "implements",
          "declare",
          "abstract",
          "readonly",
          "enum",
          "override"
        ]),
        literal: ge,
        built_in: _e.concat(t2),
        "variable.language": pe
      }, s2 = {
        className: "meta",
        begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
      }, o2 = (e3, n3, t3) => {
        const a3 = e3.contains.findIndex((e4) => e4.label === n3);
        if (-1 === a3)
          throw Error("can not find mode to replace");
        e3.contains.splice(a3, 1, t3);
      };
      return Object.assign(n2.keywords, r2), n2.exports.PARAMS_CONTAINS.push(s2), n2.contains = n2.contains.concat([s2, a2, i2]), o2(n2, "shebang", e2.SHEBANG()), o2(n2, "use_strict", {
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use strict['"]/
      }), n2.contains.find((e3) => "func.def" === e3.label).relevance = 0, Object.assign(n2, {
        name: "TypeScript",
        aliases: ["ts", "tsx"]
      }), n2;
    },
    grmr_vbnet: (e2) => {
      const n2 = e2.regex, t2 = /\d{1,2}\/\d{1,2}\/\d{4}/, a2 = /\d{4}-\d{1,2}-\d{1,2}/, i2 = /(\d|1[012])(:\d+){0,2} *(AM|PM)/, r2 = /\d{1,2}(:\d{1,2}){1,2}/, s2 = {
        className: "literal",
        variants: [{
          begin: n2.concat(/# */, n2.either(a2, t2), / *#/)
        }, {
          begin: n2.concat(/# */, r2, / *#/)
        }, {
          begin: n2.concat(/# */, i2, / *#/)
        }, {
          begin: n2.concat(/# */, n2.either(a2, t2), / +/, n2.either(i2, r2), / *#/)
        }]
      }, o2 = e2.COMMENT(/'''/, /$/, {
        contains: [{
          className: "doctag",
          begin: /<\/?/,
          end: />/
        }]
      }), l2 = e2.COMMENT(null, /$/, {
        variants: [{
          begin: /'/
        }, {
          begin: /([\t ]|^)REM(?=\s)/
        }]
      });
      return {
        name: "Visual Basic .NET",
        aliases: ["vb"],
        case_insensitive: true,
        classNameAliases: {
          label: "symbol"
        },
        keywords: {
          keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
          built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
          type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
          literal: "true false nothing"
        },
        illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
        contains: [{
          className: "string",
          begin: /"(""|[^/n])"C\b/
        }, {
          className: "string",
          begin: /"/,
          end: /"/,
          illegal: /\n/,
          contains: [{
            begin: /""/
          }]
        }, s2, {
          className: "number",
          relevance: 0,
          variants: [{
            begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
          }, {
            begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
          }, {
            begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
          }, {
            begin: /&O[0-7_]+((U?[SIL])|[%&])?/
          }, {
            begin: /&B[01_]+((U?[SIL])|[%&])?/
          }]
        }, {
          className: "label",
          begin: /^\w+:/
        }, o2, l2, {
          className: "meta",
          begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
          end: /$/,
          keywords: {
            keyword: "const disable else elseif enable end externalsource if region then"
          },
          contains: [l2]
        }]
      };
    },
    grmr_wasm: (e2) => {
      e2.regex;
      const n2 = e2.COMMENT(/\(;/, /;\)/);
      return n2.contains.push("self"), {
        name: "WebAssembly",
        keywords: {
          $pattern: /[\w.]+/,
          keyword: [
            "anyfunc",
            "block",
            "br",
            "br_if",
            "br_table",
            "call",
            "call_indirect",
            "data",
            "drop",
            "elem",
            "else",
            "end",
            "export",
            "func",
            "global.get",
            "global.set",
            "local.get",
            "local.set",
            "local.tee",
            "get_global",
            "get_local",
            "global",
            "if",
            "import",
            "local",
            "loop",
            "memory",
            "memory.grow",
            "memory.size",
            "module",
            "mut",
            "nop",
            "offset",
            "param",
            "result",
            "return",
            "select",
            "set_global",
            "set_local",
            "start",
            "table",
            "tee_local",
            "then",
            "type",
            "unreachable"
          ]
        },
        contains: [e2.COMMENT(/;;/, /$/), n2, {
          match: [/(?:offset|align)/, /\s*/, /=/],
          className: {
            1: "keyword",
            3: "operator"
          }
        }, {
          className: "variable",
          begin: /\$[\w_]+/
        }, {
          match: /(\((?!;)|\))+/,
          className: "punctuation",
          relevance: 0
        }, {
          begin: [/(?:func|call|call_indirect)/, /\s+/, /\$[^\s)]+/],
          className: {
            1: "keyword",
            3: "title.function"
          }
        }, e2.QUOTE_STRING_MODE, {
          match: /(i32|i64|f32|f64)(?!\.)/,
          className: "type"
        }, {
          className: "keyword",
          match: /\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/
        }, {
          className: "number",
          relevance: 0,
          match: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/
        }]
      };
    },
    grmr_yaml: (e2) => {
      const n2 = "true false yes no null", t2 = "[\\w#;/?:@&=+$,.~*'()[\\]]+", a2 = {
        className: "string",
        relevance: 0,
        variants: [{
          begin: /'/,
          end: /'/
        }, {
          begin: /"/,
          end: /"/
        }, {
          begin: /\S+/
        }],
        contains: [e2.BACKSLASH_ESCAPE, {
          className: "template-variable",
          variants: [{
            begin: /\{\{/,
            end: /\}\}/
          }, {
            begin: /%\{/,
            end: /\}/
          }]
        }]
      }, i2 = e2.inherit(a2, {
        variants: [{
          begin: /'/,
          end: /'/
        }, {
          begin: /"/,
          end: /"/
        }, {
          begin: /[^\s,{}[\]]+/
        }]
      }), r2 = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        keywords: n2,
        relevance: 0
      }, s2 = {
        begin: /\{/,
        end: /\}/,
        contains: [r2],
        illegal: "\\n",
        relevance: 0
      }, o2 = {
        begin: "\\[",
        end: "\\]",
        contains: [r2],
        illegal: "\\n",
        relevance: 0
      }, l2 = [{
        className: "attr",
        variants: [{
          begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)"
        }, {
          begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)'
        }, {
          begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)"
        }]
      }, {
        className: "meta",
        begin: "^---\\s*$",
        relevance: 10
      }, {
        className: "string",
        begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
      }, {
        begin: "<%[%=-]?",
        end: "[%-]?%>",
        subLanguage: "ruby",
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      }, {
        className: "type",
        begin: "!\\w+!" + t2
      }, {
        className: "type",
        begin: "!<" + t2 + ">"
      }, {
        className: "type",
        begin: "!" + t2
      }, {
        className: "type",
        begin: "!!" + t2
      }, {
        className: "meta",
        begin: "&" + e2.UNDERSCORE_IDENT_RE + "$"
      }, {
        className: "meta",
        begin: "\\*" + e2.UNDERSCORE_IDENT_RE + "$"
      }, {
        className: "bullet",
        begin: "-(?=[ ]|$)",
        relevance: 0
      }, e2.HASH_COMMENT_MODE, {
        beginKeywords: n2,
        keywords: {
          literal: n2
        }
      }, {
        className: "number",
        begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
      }, {
        className: "number",
        begin: e2.C_NUMBER_RE + "\\b",
        relevance: 0
      }, s2, o2, a2], c2 = [...l2];
      return c2.pop(), c2.push(i2), r2.contains = c2, {
        name: "YAML",
        case_insensitive: true,
        aliases: ["yml"],
        contains: l2
      };
    }
  });
  const $e = V;
  for (const e2 of Object.keys(Be)) {
    const n2 = e2.replace("grmr_", "").replace("_", "-");
    $e.registerLanguage(n2, Be[e2]);
  }
  makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
  makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
  makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
  makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
  makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
  makeMap("script,style");
  function makeMap(str) {
    var obj = {};
    var items = str.split(",");
    for (var i2 = 0; i2 < items.length; i2++) {
      obj[items[i2]] = true;
    }
    return obj;
  }
  const _sfc_main$8 = {
    __name: "ua-markdown",
    props: {
      // 解析内容
      source: String,
      showLine: { type: [Boolean, String], default: true }
    },
    setup(__props) {
      const props2 = __props;
      let copyCodeData = [];
      const markdown = mt({
        html: true,
        highlight: function(str, lang) {
          let preCode = "";
          try {
            preCode = $e.highlightAuto(str).value;
          } catch (err) {
            preCode = markdown.utils.escapeHtml(str);
          }
          const lines = preCode.split(/\n/).slice(0, -1);
          let html = lines.map((item, index2) => {
            if (item == "") {
              return "";
            }
            return '<li><span class="line-num" data-line="' + (index2 + 1) + '"></span>' + item + "</li>";
          }).join("");
          if (props2.showLine) {
            html = '<ol style="padding: 0px 30px;">' + html + "</ol>";
          } else {
            html = '<ol style="padding: 0px 7px;list-style:none;">' + html + "</ol>";
          }
          copyCodeData.push(str);
          let htmlCode = `<div class="markdown-wrap">`;
          htmlCode += `<div style="color: #aaa;text-align: right;font-size: 12px;padding:8px;">`;
          htmlCode += `${lang}<a class="copy-btn" code-data-index="${copyCodeData.length - 1}" style="margin-left: 8px;">复制代码</a>`;
          htmlCode += `</div>`;
          htmlCode += `<pre class="hljs" style="padding:10px 8px 0;margin-bottom:5px;overflow: auto;display: block;border-radius: 5px;"><code>${html}</code></pre>`;
          htmlCode += "</div>";
          return htmlCode;
        }
      });
      const parseNodes = (value2) => {
        if (!value2)
          return;
        value2 = value2.replace(/<br>|<br\/>|<br \/>/g, "\n");
        value2 = value2.replace(/&nbsp;/g, " ");
        let htmlString = "";
        if (value2.split("```").length % 2) {
          let mdtext = value2;
          if (mdtext[mdtext.length - 1] != "\n") {
            mdtext += "\n";
          }
          htmlString = markdown.render(mdtext);
        } else {
          htmlString = markdown.render(value2);
        }
        htmlString = htmlString.replace(/<table/g, `<table class="table"`);
        htmlString = htmlString.replace(/<tr/g, `<tr class="tr"`);
        htmlString = htmlString.replace(/<th>/g, `<th class="th">`);
        htmlString = htmlString.replace(/<td/g, `<td class="td"`);
        htmlString = htmlString.replace(/<hr>|<hr\/>|<hr \/>/g, `<hr class="hr">`);
        return htmlString;
      };
      const handleItemClick = (e2) => {
        let { attrs } = e2.detail.node;
        let { "code-data-index": codeDataIndex, "class": className } = attrs;
        if (className == "copy-btn") {
          uni.setClipboardData({
            data: copyCodeData[codeDataIndex],
            showToast: false,
            success() {
              uni.showToast({
                title: "复制成功",
                icon: "none"
              });
            }
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "ua__markdown" }, [
          vue.createElementVNode("rich-text", {
            space: "nbsp",
            nodes: parseNodes(__props.source),
            onItemclick: handleItemClick
          }, null, 40, ["nodes"])
        ]);
      };
    }
  };
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-64f4d077"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/components/ua-markdown/ua-markdown.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$7 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e2) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$4], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$6 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e2) {
        e2.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:279", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__scopeId", "data-v-4dd3c44b"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const props$1 = {
    props: {
      // 输入的值
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框类型
      // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
      // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
      // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
      // text-文本输入键盘
      type: {
        type: String,
        default: "text"
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 禁用状态时的背景色
      disabledColor: {
        type: String,
        default: "#f5f7fa"
      },
      // 是否显示清除控件
      clearable: {
        type: Boolean,
        default: false
      },
      // 是否密码类型
      password: {
        type: Boolean,
        default: false
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: -1
      },
      // 	输入框为空时的占位符
      placeholder: {
        type: String,
        default: null
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: "input-placeholder"
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: "color: #c0c4cc"
      },
      // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
      // https://uniapp.dcloud.io/component/input
      // https://uniapp.dcloud.io/component/textarea
      confirmType: {
        type: String,
        default: "done"
      },
      // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
      confirmHold: {
        type: Boolean,
        default: false
      },
      // focus时，点击页面的时候不收起键盘，微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      // 自动获取焦点
      // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
      autoBlur: {
        type: Boolean,
        default: false
      },
      // 指定focus时光标的位置
      cursor: {
        type: [String, Number],
        default: -1
      },
      // 输入框聚焦时底部与键盘的距离
      cursorSpacing: {
        type: [String, Number],
        default: 30
      },
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      selectionStart: {
        type: [String, Number],
        default: -1
      },
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [String, Number],
        default: -1
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 输入框内容对齐方式，可选值为：left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // 输入框字体的大小
      fontSize: {
        type: [String, Number],
        default: "14px"
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 输入框前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 前置图标样式，对象或字符串
      prefixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 输入框后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 后置图标样式，对象或字符串
      suffixIconStyle: {
        type: [String, Object],
        default: ""
      },
      // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
      border: {
        type: String,
        default: "surround"
      },
      // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
      readonly: {
        type: Boolean,
        default: false
      },
      // 输入框形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      },
      ...(_H = (_G = uni.$uv) == null ? void 0 : _G.props) == null ? void 0 : _H.input
    }
  };
  const _sfc_main$5 = {
    name: "uv-input",
    mixins: [mpMixin, mixin, props$1],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
        firstChange: true,
        // value绑定值的变化是由内部还是外部引起的
        changeFromInner: false,
        // 过滤处理方法
        innerFormatter: (value2) => value2
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal, oldVal) {
          this.innerValue = newVal;
          this.firstChange = false;
          this.changeFromInner = false;
        }
      }
    },
    computed: {
      // 是否显示清除控件
      isShowClear() {
        const { clearable, readonly, focused, innerValue } = this;
        return !!clearable && !readonly && !!focused && innerValue !== "";
      },
      // 组件的类名
      inputClass() {
        let classes = [], { border, disabled, shape } = this;
        border === "surround" && (classes = classes.concat(["uv-border", "uv-input--radius"]));
        classes.push(`uv-input--${shape}`);
        border === "bottom" && (classes = classes.concat([
          "uv-border-bottom",
          "uv-input--no-radius"
        ]));
        return classes.join(" ");
      },
      // 组件的样式
      wrapperStyle() {
        const style = {};
        if (this.disabled) {
          style.backgroundColor = this.disabledColor;
        }
        if (this.border === "none") {
          style.padding = "0";
        } else {
          style.paddingTop = "6px";
          style.paddingBottom = "6px";
          style.paddingLeft = "9px";
          style.paddingRight = "9px";
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      // 输入框的样式
      inputStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
        return style;
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      // 当键盘输入时，触发input事件
      onInput(e2) {
        let { value: value2 = "" } = e2.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value2);
        this.innerValue = value2;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 输入框失去焦点时触发
      onBlur(event) {
        this.$emit("blur", event.detail.value);
        this.$uv.sleep(50).then(() => {
          this.focused = false;
        });
        this.$uv.formValidate(this, "blur");
      },
      // 输入框聚焦时触发
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      // 点击完成按钮时触发
      onConfirm(event) {
        this.$emit("confirm", this.innerValue);
      },
      // 键盘高度发生变化的时候触发此事件
      // 兼容性：微信小程序2.7.0+、App 3.1.0+
      onkeyboardheightchange() {
        this.$emit("keyboardheightchange");
      },
      // 内容发生变化，进行处理
      valueChange() {
        const value2 = this.innerValue;
        this.$nextTick(() => {
          this.$emit("update:modelValue", value2);
          this.changeFromInner = true;
          this.$emit("change", value2);
          this.$uv.formValidate(this, "change");
        });
      },
      // 点击清除控件
      onClear() {
        this.innerValue = "";
        this.$nextTick(() => {
          this.valueChange();
          this.$emit("clear");
        });
      },
      /**
       * 在安卓nvue上，事件无法冒泡
       * 在某些时间，我们希望监听uv-from-item的点击事件，此时会导致点击uv-form-item内的uv-input后
       * 无法触发uv-form-item的点击事件，这里通过手动调用uv-form-item的方法进行触发
       */
      clickHandler() {
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-input", $options.inputClass]),
        style: vue.normalizeStyle([$options.wrapperStyle])
      },
      [
        vue.createElementVNode("view", { class: "uv-input__content" }, [
          _ctx.prefixIcon || _ctx.$slots.prefix ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uv-input__content__prefix-icon"
          }, [
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              vue.createVNode(_component_uv_icon, {
                name: _ctx.prefixIcon,
                size: "18",
                customStyle: _ctx.prefixIconStyle
              }, null, 8, ["name", "customStyle"])
            ], true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", {
            class: "uv-input__content__field-wrapper",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
          }, [
            vue.createCommentVNode(" 根据uni-app的input组件文档，H5和APP中只要声明了password参数(无论true还是false)，type均失效，此时\r\n					为了防止type=number时，又存在password属性，type无效，此时需要设置password为undefined\r\n				 "),
            vue.createElementVNode("input", {
              class: "uv-input__content__field-wrapper__field",
              style: vue.normalizeStyle([$options.inputStyle]),
              type: _ctx.type,
              focus: _ctx.focus,
              cursor: _ctx.cursor,
              value: $data.innerValue,
              "auto-blur": _ctx.autoBlur,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              placeholder: _ctx.placeholder,
              "placeholder-style": _ctx.placeholderStyle,
              "placeholder-class": _ctx.placeholderClass,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              "hold-keyboard": _ctx.holdKeyboard,
              "cursor-spacing": _ctx.cursorSpacing,
              "adjust-position": _ctx.adjustPosition,
              "selection-end": _ctx.selectionEnd,
              "selection-start": _ctx.selectionStart,
              password: _ctx.password || _ctx.type === "password" || void 0,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
              onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
              onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args)),
              onClick: _cache[5] || (_cache[5] = () => {
              })
            }, null, 44, ["type", "focus", "cursor", "value", "auto-blur", "disabled", "maxlength", "placeholder", "placeholder-style", "placeholder-class", "confirm-type", "confirm-hold", "hold-keyboard", "cursor-spacing", "adjust-position", "selection-end", "selection-start", "password", "ignoreCompositionEvent"])
          ]),
          $options.isShowClear ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uv-input__content__clear",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "close",
              size: "11",
              color: "#ffffff",
              customStyle: "line-height: 12px"
            })
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.suffixIcon || _ctx.$slots.suffix ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "uv-input__content__subfix-icon"
          }, [
            vue.renderSlot(_ctx.$slots, "suffix", {}, () => [
              vue.createVNode(_component_uv_icon, {
                name: _ctx.suffixIcon,
                size: "18",
                customStyle: _ctx.suffixIconStyle
              }, null, 8, ["name", "customStyle"])
            ], true)
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__scopeId", "data-v-651602aa"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-input/components/uv-input/uv-input.vue"]]);
  const artileText = `
缓存可以减少网络 IO 消耗，提高访问速度。浏览器缓存是一种操作简单、效果显著的前端性能优化手段。对于这个操作的必要性，Chrome 官方给出的解释似乎更有说服力一些：

> 通过网络获取内容既速度缓慢又开销巨大。较大的响应需要在客户端与服务器之间进行多次往返通信，这会延迟浏览器获得和处理内容的时间，还会增加访问者的流量费用。因此，缓存并重复利用之前获取的资源的能力成为性能优化的一个关键方面。

很多时候，大家倾向于将浏览器缓存简单地理解为“HTTP 缓存”。但事实上，浏览器缓存机制有四个方面，它们按照获取资源时请求的优先级依次排列如下：

1.  Memory Cache
2.  Service Worker Cache
3.  HTTP Cache
4.  Push Cache

大家对 HTTP Cache（即 Cache-Control、expires 等字段控制的缓存）应该比较熟悉，如果对其它几种缓存可能还没什么概念，我们可以先来看一张线上网站的 Network 面板截图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f714800e5be49~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

我们给 size 这一栏一个特写：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f715425bd73b6~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

大家注意一下非数字——即形如“（from xxx）”这样的描述——对应的资源，这些资源就是我们通过缓存获取到的。其中，“from memory cache”对标到 Memory Cache 类型，“from ServiceWorker”对标到 Service Worker Cache 类型。至于 Push Cache，这个比较特殊，是 HTTP2 的新特性。

本节将会针对这四个方面各个击破。考虑到 HTTP 缓存是最主要、最具有代表性的缓存策略，也是每一位前端工程师都应该深刻理解掌握的性能优化知识点，我们下面优先针对 HTTP 缓存机制进行剖析。

## HTTP 缓存机制探秘

HTTP 缓存是我们日常开发中最为熟悉的一种缓存机制。它又分为**强缓存**和**协商缓存**。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。

### 强缓存的特征

强缓存是利用 http 头中的 Expires 和 Cache-Control 两个字段来控制的。强缓存中，当请求再次发出时，浏览器会根据其中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，**不会再与服务端发生通信。**

命中强缓存的情况下，返回的 HTTP 状态码为 200 （如下图）。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f6a683fc021e1?w=660&h=100&f=png&s=15006)

### 强缓存的实现：从 expires 到 cache-control

实现强缓存，过去我们一直用 \`expires\`。  
当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段。像这样：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f52bf6e844b85~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

我们给 expires 一个特写：

\`\`\`
expires: Wed, 11 Sep 2019 16:12:18 GMT

\`\`\`

可以看到，expires 是一个时间戳，接下来如果我们试图再次向服务器请求资源，浏览器就会先对比本地时间和 expires 的时间戳，如果本地时间小于 expires 设定的过期时间，那么就直接去缓存中取这个资源。

从这样的描述中大家也不难猜测，expires 是有问题的，它最大的问题在于对“本地时间”的依赖。如果服务端和客户端的时间设置可能不同，或者我直接手动去把客户端的时间改掉，那么 expires 将无法达到我们的预期。

考虑到 expires 的局限性，HTTP1.1 新增了 \`Cache-Control\` 字段来完成 expires 的任务。  
expires 能做的事情，Cache-Control 都能做；expires 完成不了的事情，Cache-Control 也能做。因此，Cache-Control 可以视作是 expires 的**完全替代方案**。在当下的前端实践里，我们继续使用 expires 的唯一目的就是**向下兼容**。

现在我们给 Cache-Control 字段一个特写：

\`\`\`
cache-control: max-age=31536000

\`\`\`

如大家所见，在 Cache-Control 中，我们通过 \`max-age\` 来控制资源的有效期。max-age 不是一个时间戳，而是一个时间长度。在本例中，max-age 是 31536000 秒，它意味着该资源在 31536000 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。

**Cache-Control 相对于 expires 更加准确，它的优先级也更高。当 Cache-Control 与 expires 同时出现时，我们以 Cache-Control 为准。**

### Cache-Control 应用分析

Cache-Control 的神通，可不止于这一个小小的 max-age。如下的用法也非常常见：

\`\`\`
cache-control: max-age=3600, s-maxage=31536000

\`\`\`

**s-maxage 优先级高于 max-age，两者同时出现时，优先考虑 s-maxage。如果 s-maxage 未过期，则向代理服务器请求其缓存内容。**

这个 s-maxage 不像 max-age 一样为大家所熟知。的确，在项目不是特别大的场景下，max-age 足够用了。但在依赖各种**代理**的大型架构中，我们不得不考虑**代理服务器**的缓存问题。s-maxage 就是用于表示 cache 服务器上（比如 cache CDN）的缓存的有效时间的，并只对 public 缓存有效。

(10.24 晚更新。感谢评论区@敖天羽的补充，此处应注意这样一个细节：s-maxage 仅在代理服务器中生效，客户端中我们只考虑 max-age。)

那么什么是 public 缓存呢？说到这里，Cache-Control 中有一些适合放在一起理解的知识点，我们集中梳理一下：

#### public 与 private

public 与 private 是针对资源是否能够被代理服务缓存而存在的一组对立概念。

如果我们为资源设置了 public，那么它既可以被浏览器缓存，也可以被代理服务器缓存；如果我们设置了 private，则该资源只能被浏览器缓存。private 为**默认值**。但多数情况下，public 并不需要我们手动设置，比如有很多线上网站的 cache-control 是这样的：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f6029fc74bbc6~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

设置了 s-maxage，没设置 public，那么 CDN 还可以缓存这个资源吗？答案是肯定的。因为明确的缓存信息（例如“max-age”）已表示响应是可以缓存的。

#### no-store 与 no-cache

no-cache 绕开了浏览器：我们为资源设置了 no-cache 后，每一次发起请求都不会再去询问浏览器的缓存情况，而是直接向服务端去确认该资源是否过期（即走我们下文即将讲解的协商缓存的路线）。

no-store 比较绝情，顾名思义就是不使用任何缓存策略。在 no-cache 的基础上，它连服务端的缓存确认也绕开了，只允许你直接向服务端发送请求、并下载完整的响应。

### 协商缓存：浏览器与服务器合作之下的缓存策略

协商缓存依赖于服务端与浏览器之间的通信。

协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。

如果服务端提示缓存资源未改动（Not Modified），资源会被**重定向**到浏览器缓存，**这种情况下网络请求对应的状态码是 304**（如下图）。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f6a6d6ffd4cc2~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

### 协商缓存的实现：从 Last-Modified 到 Etag

Last-Modified 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 Response Headers 返回：

\`\`\`
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT

\`\`\`

随后我们每次请求时，会带上一个叫 If-Modified-Since 的时间戳字段，它的值正是上一次 response 返回给它的 last-modified 值：

\`\`\`
If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT

\`\`\`

服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的最后修改时间是否一致，从而判断资源是否发生了变化。如果发生了变化，就会返回一个完整的响应内容，并在 Response Headers 中添加新的 Last-Modified 值；否则，返回如上图的 304 响应，Response Headers 不会再添加 Last-Modified 字段。

使用 Last-Modified 存在一些弊端，这其中最常见的就是这样两个场景：

- 我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。
- 当我们修改文件的速度过快时（比如花了 100ms 完成了改动），由于 If-Modified-Since 只能检查到以秒为最小计量单位的时间差，所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了。

这两个场景其实指向了同一个 bug——服务器并没有正确感知文件的变化。为了解决这样的问题，Etag 作为 Last-Modified 的补充出现了。

Etag 是由服务器为每个资源生成的唯一的**标识字符串**，这个标识字符串是基于文件内容编码的，只要文件内容不同，它们对应的 Etag 就是不同的，反之亦然。因此 Etag 能够精准地感知文件的变化。

Etag 和 Last-Modified 类似，当首次请求时，我们会在响应头里获取到一个最初的标识符字符串，举个 🌰，它可以是这样的：

\`\`\`
ETag: W/"2a3b-1602480f459"

\`\`\`

那么下一次请求时，请求头里就会带上一个值相同的、名为 if-None-Match 的字符串供服务端比对了：

\`\`\`
If-None-Match: W/"2a3b-1602480f459"

\`\`\`

Etag 的生成过程需要服务器额外付出开销，会影响服务端的性能，这是它的弊端。因此启用 Etag 需要我们审时度势。正如我们刚刚所提到的——Etag 并不能替代 Last-Modified，它只能作为 Last-Modified 的补充和强化存在。 **Etag 在感知文件变化上比 Last-Modified 更加准确，优先级也更高。当 Etag 和 Last-Modified 同时存在时，以 Etag 为准。**

## HTTP 缓存决策指南

行文至此，当代 HTTP 缓存技术用到的知识点，我们已经从头到尾挖掘了一遍了。那么在面对一个具体的缓存需求时，我们到底该怎么决策呢？

走到决策建议这一步，我本来想给大家重新画一个流程图。但是画来画去终究不如 Chrome 官方给出的这张清晰、权威：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/20/165f701820fafcf8~tplv-t2oaga2asx-jj-mark:1890:0:0:0:q75.awebp)

我们现在一起解读一下这张流程图：

当我们的资源内容不可复用时，直接为 Cache-Control 设置 no-store，拒绝一切形式的缓存；否则考虑是否每次都需要向服务器进行缓存有效确认，如果需要，那么设 Cache-Control 的值为 no-cache；否则考虑该资源是否可以被代理服务器缓存，根据其结果决定是设置为 private 还是 public；然后考虑该资源的过期时间，设置对应的 max-age 和 s-maxage 值；最后，配置协商缓存需要用到的 Etag、Last-Modified 等参数。

我个人非常推崇这张流程图给出的决策建议，也强烈推荐大家在理解以上知识点的基础上，将这张图保存下来、在日常开发中用用看，它的可行度非常高。

OK，走到这里，本节最大的一座山已经被大家翻过去了。接下来的内容会相对比较轻松，大家放松心情，我们继续前行！

## MemoryCache

MemoryCache，是指存在内存中的缓存。从优先级上来说，它是浏览器最先尝试去命中的一种缓存。从效率上来说，它是响应速度最快的一种缓存。

内存缓存是快的，也是“短命”的。它和渲染进程“生死相依”，当进程结束后，也就是 tab 关闭以后，内存里的数据也将不复存在。

那么哪些文件会被放入内存呢？

事实上，这个划分规则，一直以来是没有定论的。不过想想也可以理解，内存是有限的，很多时候需要先考虑即时呈现的内存余量，再根据具体的情况决定分配给内存和磁盘的资源量的比重——资源存放的位置具有一定的随机性。

虽然划分规则没有定论，但根据日常开发中观察的结果，包括我们开篇给大家展示的 Network 截图，我们至少可以总结出这样的规律：资源存不存内存，浏览器秉承的是“节约原则”。我们发现，Base64 格式的图片，几乎永远可以被塞进 memory cache，这可以视作浏览器为节省渲染开销的“自保行为”；此外，体积不大的 JS、CSS 文件，也有较大地被写入内存的几率——相比之下，较大的 JS、CSS 文件就没有这个待遇了，内存资源是有限的，它们往往被直接甩进磁盘。

## Service Worker Cache

Service Worker 是一种独立于主线程之外的 Javascript 线程。它脱离于浏览器窗体，因此无法直接访问 DOM。这样独立的个性使得 Service Worker 的“个人行为”无法干扰页面的性能，这个“幕后工作者”可以帮我们实现离线缓存、消息推送和网络代理等功能。我们借助 Service worker 实现的离线缓存就称为 Service Worker Cache。

Service Worker 的生命周期包括 install、active、working 三个阶段。一旦 Service Worker 被 install，它将始终存在，只会在 active 与 working 之间切换，除非我们主动终止它。这是它可以用来实现离线存储的重要先决条件。

下面我们就通过实战的方式，一起见识一下 Service Worker 如何为我们实现离线缓存（注意看注释）： 我们首先在入口文件中插入这样一段 JS 代码，用以判断和引入 Service Worker：

\`\`\`
window.navigator.serviceWorker.register('/test.js').then(
   function () {
      __f__('log','at common/article.js:194','注册成功')
    }).catch(err => {
      __f__('error','at common/article.js:196',"注册失败")
    })

\`\`\`

在 test.js 中，我们进行缓存的处理。假设我们需要缓存的文件分别是 test.html,test.css 和 test.js：

\`\`\`
// Service Worker会监听 install事件，我们在其对应的回调里可以实现初始化的逻辑
self.addEventListener('install', event => {
  event.waitUntil(
    // 考虑到缓存也需要更新，open内传入的参数为缓存的版本号
    caches.open('test-v1').then(cache => {
      return cache.addAll([
        // 此处传入指定的需缓存的文件名
        '/test.html',
        '/test.css',
        '/test.js'
      ])
    })
  )
})

// Service Worker会监听所有的网络请求，网络请求的产生触发的是fetch事件，我们可以在其对应的监听函数中实现对请求的拦截，进而判断是否有对应到该请求的缓存，实现从Service Worker中取到缓存的目的
self.addEventListener('fetch', event => {
  event.respondWith(
    // 尝试匹配该请求对应的缓存值
    caches.match(event.request).then(res => {
      // 如果匹配到了，调用Server Worker缓存
      if (res) {
        return res;
      }
      // 如果没匹配到，向服务端发起这个资源请求
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }
        // 请求成功的话，将请求缓存起来。
        caches.open('test-v1').then(function(cache) {
          cache.put(event.request, response);
        });
        return response.clone();
      });
    })
  );
});

\`\`\`

**PS**：大家注意 Server Worker 对协议是有要求的，必须以 https 协议为前提。

## Push Cache

> 预告：本小节定位为基础科普向，对 Push Cache 有深入挖掘兴趣的同学，强烈推荐拓展阅读 Chrome 工程师 Jake Archibald 的这篇 [HTTP/2 push is tougher than I thought](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)。

Push Cache 是指 HTTP2 在 server push 阶段存在的缓存。这块的知识比较新，应用也还处于萌芽阶段，我找了好几个网站也没找到一个合适的案例来给大家做具体的介绍。但应用范围有限不代表不重要——HTTP2 是趋势、是未来。在它还未被推而广之的此时此刻，我仍希望大家能对 Push Cache 的关键特性有所了解：

- Push Cache 是缓存的最后一道防线。浏览器只有在 Memory Cache、HTTP Cache 和 Service Worker Cache 均未命中的情况下才会去询问 Push Cache。
- Push Cache 是一种存在于会话阶段的缓存，当 session 终止时，缓存也随之释放。
- 不同的页面只要共享了同一个 HTTP2 连接，那么它们就可以共享同一个 Push Cache。

更多的特性和应用，期待大家可以在日后的开发过程中去挖掘和实践。

## 小结

小建议！很多同学在学习缓存这块知识的时候可能多少会有这样的感觉：对浏览器缓存，只能描述个大致，却说不上深层原理；好不容易记住了每个字段怎么用，过几天又给忘了。这是因为缓存部分的知识，具有“细碎、迭代快”的特点。对于这样的知识，我们应该尝试先划分出层次和重点，归纳出完整的体系，然后针对每个知识点去各个击破。

终于结束了对缓存世界的探索，不知道大家有没有一种意犹未尽的感觉。开篇我们谈过，缓存非常重要，它几乎是我们性能优化的首选方案。

但页面的数据存储方案除了缓存，还有本地存储。在下一节中，我们就将围绕本地存储展开探索。
`;
  const props = {
    props: {
      // 输入框的内容
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框为空时占位符
      placeholder: {
        type: [String, Number],
        default: ""
      },
      // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
      placeholderClass: {
        type: String,
        default: "textarea-placeholder"
      },
      // 指定placeholder的样式
      placeholderStyle: {
        type: [String, Object],
        default: "color: #c0c4cc"
      },
      // 输入框高度
      height: {
        type: [String, Number],
        default: 70
      },
      // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
      confirmType: {
        type: String,
        default: "done"
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示统计字数
      count: {
        type: Boolean,
        default: false
      },
      // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
      focus: {
        type: Boolean,
        default: false
      },
      // 是否自动增加高度
      autoHeight: {
        type: Boolean,
        default: false
      },
      // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
      fixed: {
        type: Boolean,
        default: false
      },
      // 指定光标与键盘的距离
      cursorSpacing: {
        type: Number,
        default: 0
      },
      // 指定focus时的光标位置
      cursor: {
        type: [String, Number],
        default: ""
      },
      // 是否显示键盘上方带有”完成“按钮那一栏，
      showConfirmBar: {
        type: Boolean,
        default: true
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: Number,
        default: -1
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: Number,
        default: -1
      },
      // 键盘弹起时，是否自动上推页面
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // 是否去掉 iOS 下的默认内边距，只微信小程序有效
      disableDefaultPadding: {
        type: Boolean,
        default: false
      },
      // focus时，点击页面的时候不收起键盘，只微信小程序有效
      holdKeyboard: {
        type: Boolean,
        default: false
      },
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      maxlength: {
        type: [String, Number],
        default: 140
      },
      // 边框类型，surround-四周边框，bottom-底部边框
      border: {
        type: String,
        default: "surround"
      },
      // 用于处理或者过滤输入框内容的方法
      formatter: {
        type: [Function, null],
        default: null
      },
      // 是否忽略组件内对文本合成系统事件的处理
      ignoreCompositionEvent: {
        type: Boolean,
        default: true
      },
      ...(_J = (_I = uni.$uv) == null ? void 0 : _I.props) == null ? void 0 : _J.textarea
    }
  };
  const _sfc_main$4 = {
    name: "uv-textarea",
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        // 输入框的值
        innerValue: "",
        // 是否处于获得焦点状态
        focused: false,
        // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
        firstChange: true,
        // value绑定值的变化是由内部还是外部引起的
        changeFromInner: false,
        // 过滤处理方法
        innerFormatter: (value2) => value2
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal, oldVal) {
          this.innerValue = newVal;
          this.firstChange = false;
          this.changeFromInner = false;
        }
      }
    },
    computed: {
      // 组件的类名
      textareaClass() {
        let classes = [], { border, disabled } = this;
        border === "surround" && (classes = classes.concat(["uv-border", "uv-textarea--radius"]));
        border === "bottom" && (classes = classes.concat(["uv-border-bottom", "uv-textarea--no-radius"]));
        disabled && classes.push("uv-textarea--disabled");
        return classes.join(" ");
      },
      // 组件的样式
      textareaStyle() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      maxlen() {
        return this.maxlength < 0 ? 140 : this.maxlength;
      }
    },
    methods: {
      // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
      setFormatter(e2) {
        this.innerFormatter = e2;
      },
      onFocus(e2) {
        this.$emit("focus", e2);
      },
      onBlur(e2) {
        this.$emit("blur", e2);
        this.$uv.formValidate(this, "blur");
      },
      onLinechange(e2) {
        this.$emit("linechange", e2);
      },
      onInput(e2) {
        let { value: value2 = "" } = e2.detail || {};
        const formatter = this.formatter || this.innerFormatter;
        const formatValue = formatter(value2);
        this.innerValue = value2;
        this.$nextTick(() => {
          this.innerValue = formatValue;
          this.valueChange();
        });
      },
      // 内容发生变化，进行处理
      valueChange() {
        const value2 = this.innerValue;
        this.$nextTick(() => {
          this.$emit("update:modelValue", value2);
          this.changeFromInner = true;
          this.$emit("change", value2);
          this.$uv.formValidate(this, "change");
        });
      },
      onConfirm(e2) {
        this.$emit("confirm", e2);
      },
      onKeyboardheightchange(e2) {
        this.$emit("keyboardheightchange", e2);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-textarea", $options.textareaClass]),
        style: vue.normalizeStyle([$options.textareaStyle])
      },
      [
        vue.createElementVNode("textarea", {
          class: "uv-textarea__field",
          value: $data.innerValue,
          style: vue.normalizeStyle({ height: _ctx.$uv.addUnit(_ctx.height) }),
          placeholder: _ctx.placeholder,
          "placeholder-style": _ctx.$uv.addStyle(_ctx.placeholderStyle, "string"),
          "placeholder-class": _ctx.placeholderClass,
          disabled: _ctx.disabled,
          focus: _ctx.focus,
          autoHeight: _ctx.autoHeight,
          fixed: _ctx.fixed,
          cursorSpacing: _ctx.cursorSpacing,
          cursor: _ctx.cursor,
          showConfirmBar: _ctx.showConfirmBar,
          selectionStart: _ctx.selectionStart,
          selectionEnd: _ctx.selectionEnd,
          adjustPosition: _ctx.adjustPosition,
          disableDefaultPadding: _ctx.disableDefaultPadding,
          holdKeyboard: _ctx.holdKeyboard,
          maxlength: $options.maxlen,
          confirmType: _ctx.confirmType,
          ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
          onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onLinechange: _cache[2] || (_cache[2] = (...args) => $options.onLinechange && $options.onLinechange(...args)),
          onInput: _cache[3] || (_cache[3] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
          onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args))
        }, null, 44, ["value", "placeholder", "placeholder-style", "placeholder-class", "disabled", "focus", "autoHeight", "fixed", "cursorSpacing", "cursor", "showConfirmBar", "selectionStart", "selectionEnd", "adjustPosition", "disableDefaultPadding", "holdKeyboard", "maxlength", "confirmType", "ignoreCompositionEvent"]),
        _ctx.count ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "uv-textarea__count",
            style: vue.normalizeStyle({
              "background-color": _ctx.disabled ? "transparent" : "#fff"
            })
          },
          vue.toDisplayString($data.innerValue.length) + "/" + vue.toDisplayString($options.maxlen),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-d5a7e73a"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/uni_modules/uv-textarea/components/uv-textarea/uv-textarea.vue"]]);
  const _sfc_main$3 = {
    __name: "forum-comment",
    setup(__props) {
      const emojiList = [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "🤣",
        "🙂",
        "🙃",
        "😉",
        "😊",
        "😇",
        "🥰",
        "😍",
        "🤩",
        "😘",
        "😗",
        "😚",
        "😙",
        "😋",
        "😛",
        "😜",
        "🤪",
        "😝",
        "🤑",
        "🤗",
        "🤭",
        "🤫",
        "🤔",
        "🤐"
      ];
      const textAreaValue = vue.ref("");
      const showEmojiFlag = vue.ref(false);
      const corsurTop = vue.ref(70);
      const pointPosition = vue.ref(0);
      const tempValue = vue.ref("");
      const pointHandler = (value2, cursor) => {
        pointPosition.value = value2.detail.cursor;
        tempValue.value = value2.detail.value;
      };
      const emojiBoxShow = () => {
        formatAppLog("log", "at components/forum-comment/forum-comment.vue:58", showEmojiFlag.value);
        showEmojiFlag.value = !showEmojiFlag.value;
        uni.hideKeyboard();
      };
      const emojiClickHandle = (item) => {
        formatAppLog("log", "at components/forum-comment/forum-comment.vue:64", item);
        const finishString = tempValue.value.slice(0, pointPosition.value) + item + tempValue.value.slice(pointPosition.value);
        formatAppLog("log", "at components/forum-comment/forum-comment.vue:66", finishString);
        pointPosition.value += item.length;
        tempValue.value = finishString;
        textAreaValue.value = finishString;
      };
      const uploadImg = () => {
        uni.chooseImage({
          success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            uni.uploadFile({
              url: "https://www.example.com/upload",
              //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: "file",
              formData: {
                "user": "test"
              },
              success: (uploadFileRes) => {
                formatAppLog("log", "at components/forum-comment/forum-comment.vue:88", uploadFileRes.data);
              }
            });
          }
        });
      };
      return (_ctx, _cache) => {
        const _component_uv_textarea = resolveEasycom(vue.resolveDynamicComponent("uv-textarea"), __easycom_0);
        const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
        const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "comment-body" }, [
          vue.createElementVNode("view", { class: "comment-container" }, [
            vue.createElementVNode("view", { class: "input-box" }, [
              vue.createVNode(_component_uv_textarea, {
                onBlur: pointHandler,
                cursorSpacing: corsurTop.value,
                modelValue: textAreaValue.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => textAreaValue.value = $event),
                count: "",
                placeholder: "请输入内容"
              }, null, 8, ["cursorSpacing", "modelValue"])
            ]),
            vue.createElementVNode("view", { class: "function-list" }, [
              vue.createElementVNode("view", { class: "left-list" }, [
                vue.createElementVNode("view", {
                  class: "emoji-box",
                  onClick: _cache[1] || (_cache[1] = ($event) => emojiBoxShow())
                }, [
                  vue.createVNode(_component_uv_icon, {
                    name: showEmojiFlag.value ? "pause-circle-fill" : "pause-circle",
                    color: "#6fca4f",
                    size: "35"
                  }, null, 8, ["name"])
                ]),
                vue.createElementVNode("view", {
                  class: "img-upload",
                  onClick: _cache[2] || (_cache[2] = ($event) => uploadImg())
                }, [
                  vue.createVNode(_component_uv_icon, {
                    name: "photo",
                    color: "#6fca4f",
                    size: "35"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "right-list" }, [
                vue.createVNode(_component_uv_button, {
                  type: "success",
                  plain: true,
                  hairline: true,
                  text: "发送"
                })
              ])
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "emoji-list" },
              [
                vue.createElementVNode("view", { class: "emoji-list-container" }, [
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(emojiList, (item, index2) => {
                      return vue.createElementVNode("view", {
                        class: "emoji-item",
                        onClick: ($event) => emojiClickHandle(item)
                      }, vue.toDisplayString(item), 9, ["onClick"]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ])
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, showEmojiFlag.value]
            ])
          ])
        ]);
      };
    }
  };
  const forumComment = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d55485dd"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/components/forum-comment/forum-comment.vue"]]);
  const _sfc_main$2 = {
    __name: "article",
    setup(__props) {
      const popup = vue.ref(null);
      onLoad((options) => {
        formatAppLog("log", "at pages/article/article.vue:91", options.articleId);
      });
      vue.onMounted(() => {
        formatAppLog("log", "at pages/article/article.vue:96", popup.value.show);
      });
      vue.ref(false);
      const that = vue.getCurrentInstance();
      const commitOpen = () => {
        that.refs.popup.open();
      };
      const mdvalue = `${artileText}`;
      return (_ctx, _cache) => {
        const _component_uv_button = resolveEasycom(vue.resolveDynamicComponent("uv-button"), __easycom_0$2);
        const _component_ua_markdown = resolveEasycom(vue.resolveDynamicComponent("ua-markdown"), __easycom_1);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_2);
        const _component_uv_input = resolveEasycom(vue.resolveDynamicComponent("uv-input"), __easycom_3);
        const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_4$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "article-body" }, [
          vue.createElementVNode("view", { class: "article-header-info" }, [
            vue.createElementVNode("view", { class: "header-container" }, [
              vue.createElementVNode("view", { class: "article-title" }, [
                vue.createElementVNode("text", null, " 浏览器缓存机制介绍与缓存策略剖析 ")
              ]),
              vue.createElementVNode("view", { class: "user-info" }, [
                vue.createElementVNode("view", { class: "info-containner" }, [
                  vue.createElementVNode("view", { class: "user-avatar" }, [
                    vue.createElementVNode("image", {
                      src: "/static/logo.png",
                      style: { "height": "100%" },
                      mode: "heightFix"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "user-info-box" }, [
                    vue.createElementVNode("view", { class: "info-top" }, [
                      vue.createElementVNode("view", { class: "user-name" }, [
                        vue.createElementVNode("text", null, "测试最长长度啊")
                      ]),
                      vue.createElementVNode("view", { class: "user-level" }, [
                        vue.createElementVNode("image", {
                          src: "/static/level.webp",
                          style: { "height": "100%" },
                          mode: "heightFix"
                        })
                      ]),
                      vue.createElementVNode("view", { class: "user-badge" }, [
                        vue.createElementVNode("image", {
                          src: "/static/badge.svg",
                          style: { "height": "100%" },
                          mode: "heightFix"
                        })
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "info-button" }, [
                      vue.createElementVNode("view", { class: "post-time" }, [
                        vue.createElementVNode("text", null, "一天前 ")
                      ]),
                      vue.createElementVNode("text", null, "·"),
                      vue.createElementVNode("view", { class: "read-count" }, [
                        vue.createElementVNode("text", null, " 阅读 1000")
                      ])
                    ])
                  ])
                ]),
                vue.createElementVNode("view", { class: "user-button" }, [
                  vue.createVNode(_component_uv_button, {
                    type: "success",
                    size: "small",
                    plain: true,
                    hairline: true,
                    text: "关注"
                  }),
                  vue.createCommentVNode(' <button class="follow-btn" type="default" size="mini">按钮</button> ')
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "article-content" }, [
              vue.createVNode(_component_ua_markdown, { source: mdvalue })
            ]),
            vue.createElementVNode("view", { class: "article-footer" }, [
              vue.createVNode(
                _component_uni_popup,
                {
                  ref_key: "popup",
                  ref: popup,
                  type: "bottom"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode(forumComment)
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createCommentVNode(" 评论按钮区 "),
              vue.createElementVNode("view", { class: "footer-function-list" }, [
                vue.createElementVNode("view", { class: "left-function-list" }, [
                  vue.createVNode(_component_uv_input, {
                    placeholder: "评论一下吧...",
                    onClick: commitOpen,
                    border: "surround",
                    disabled: ""
                  }),
                  vue.createCommentVNode(' <button type="default" >评论</button> ')
                ]),
                vue.createElementVNode("view", { class: "right-function-list" }, [
                  vue.createElementVNode("view", { class: "directory" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "order",
                      color: "#2979ff",
                      size: "28"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "chat",
                      color: "#2979ff",
                      size: "28"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "thumb-up",
                      color: "#2979ff",
                      size: "28"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "star",
                      color: "#2979ff",
                      size: "28"
                    })
                  ])
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesArticleArticle = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-33268ad9"], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/article/article.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesShoppingShopping = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/WorkSpace/StudySpace/Study-WORK/web/Project/hunauforum-web/pages/shopping/shopping.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/changepassword/changepassword", PagesChangepasswordChangepassword);
  __definePage("pages/changepassword/changepasswdbyphone", PagesChangepasswordChangepasswdbyphone);
  __definePage("pages/changepassword/changepwdemail", PagesChangepasswordChangepwdemail);
  __definePage("pages/changepassword/sendcode", PagesChangepasswordSendcode);
  __definePage("pages/register/register", PagesRegisterRegister);
  __definePage("pages/passwdupdated/passwdupdated", PagesPasswdupdatedPasswdupdated);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/article/article", PagesArticleArticle);
  __definePage("pages/shopping/shopping", PagesShoppingShopping);
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

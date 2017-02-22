//十进制转任何进制
(function() {
  //模拟栈
  function Stack() {
    var items = [];
    this.push = function(item) {
      items.length++;
      items[items.length - 1] = item;
      //items.push(item);
    }

    this.pop = function() {
      var popItem = null;
      var len = items.length;
      popItem = items[len - 1];
      items.length--;
      return popItem;
      //        return        items.pop();
    }

    //return        the        last        item        in        stack
    this.peek = function() {
        return items[items.length - 1];
      }
      //if        items        is        empty
    this.isEmpty = function() {
      return items.length === 0;
    }

    //clear        all        items        in        stack
    this.clear = function() {
        items = [];
      }
      //return        items'        length
    this.size = function() {
      return items.length;
    }
    this.print = function() {
      console.log(items.join(""));
    }
  }

  function divideBy2(decNumber, base) {
    var remStack = new Stack(),
      rem,
      binaryString = '';
    while (decNumber > 0) {
      rem = decNumber % base;
      remStack.push(rem);
      decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()) {
      binaryString += remStack.pop().toString();
    }
    return binaryString;
  }

  console.log(divideBy2(100, 8));
  console.log(divideBy2(30, 2));
})();

//事件綁定
var eventUtil = {
  addListener: function(element, type, hander) {
    if (element.addEventListener) {
      element.addEventListener(type, hander, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, hander);
    } else {
      element['on' + type] = hander;
    }
  },

  getEvent: function(event) {
    return event || window.event;
    //return        event        ?        event        :        window.event;
  },

  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  removeListener: function(element, type, hander) {
    if (element.removeEventListener) {
      element.removeEventListener(type, hander, false);
    } else if (element.deattachEvent) {
      element.detachEvent(type, hander);
    } else {
      element['on' + type] = null;
    }
  },

  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};

//关于bind兼容性 扩展；
Function.prototype.bind = Function.prototype.bind || function(target) {
  var self = this;
  return function(args) {
    if (!(args instanceof Array)) {
      args = [args];
    }
    self.apply(target, args);
  }
};
//单例模式  也叫桥接模式

var singleton = function(fn) {

  var result;

  return function() {

    return result || (result = fn.apply(this, arguments));

  }

};

var createMask = singleton(function() {

  return document.body.appendChild(document.createElement('div'));

});


(function(n, e) {
  var t = n.documentElement,
    i = "orientationchange" in window ? "orientationchange" : "resize",
    d = function() {
      var n = t.clientWidth;
      n && (t.style.fontSize = 100 * (n / 375) + "px")
    };
  n.addEventListener && (e.addEventListener(i, d, !1), n.addEventListener("DOMContentLoaded", d, !1), d())
})(document, window);

/*
自 IE8 开始已经开始支持 querySelector 和 querySelectorAll 这两个十分有用的选择器函数，
如果不考虑低版本浏览器，它们已经可以基本满足日常需求了。而在兼容低版本浏览器中，可以采用一些 hack 手段。
原理比较简单：通过 CSS Rule 给我们的目标元素添加特殊属性，然后遍历所有元素找到具备特殊属性的元素，当然，找到之后，移除这些特殊属性。
*/

function $(query) {
  var res = [];
  if (document.querySelectorAll) {
    res = document.querySelectorAll(query);
  } else {
    var firstStyleSheet = document.styleSheets[0] || document.createStyleSheet();
    query = query.split(',');
    for (var i = 0, len = query.length; i < len; i++) {
      firstStyleSheet.addRule(query[i], 'Barret:Lee');
    }
    for (var i = 0, len = document.all.length; i < len; i++) {
      var item = document.all[i];
      item.currentStyle.Barret && res.push(item);
    }
    firstStyleSheet.removeRule(0);
  }
  if (res.item) { /* Fuck IE8 */
    var ret = [];
    for (var i = 0, len = res.length; i < len; i++) {
      ret.push(res.item(i));
    }
    res = ret;
  }
  return res;
};
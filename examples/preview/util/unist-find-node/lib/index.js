"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function compare(beforePos, afterPos) {
  if (afterPos.line > beforePos.line) {
    return true;
  } else if (afterPos.line === beforePos.line) {
    return afterPos.column >= beforePos.column;
  }
  return false;
}

function findNode(position, node, defaultNode, returnable) {
  var rootReturn = returnable(node, defaultNode);
  if (rootReturn === true) {
    return node;
  } else if (rootReturn === false) {
    return defaultNode;
  } else if (node.children) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        if (child.position && compare(child.position.start, position) && compare(position, child.position.end)) {
          return findNode(position, child, node, returnable);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return node;
}

function compose(returnable) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = returnable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var f = _step2.value;

      if (typeof f !== "function") {
        throw new Error("returnable must be an Array of Functions, while it is passed an " + (typeof f === "undefined" ? "undefined" : _typeof(f)));
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return function (node, defaultNode) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = returnable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var f = _step3.value;

        var result = f(node, defaultNode);
        if (result !== undefined) {
          return result;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return undefined;
  };
}

// null: continue search, discontinue the following search rules;
// null: if where no child exists, or all children out of position, return node
// false: return defaultNode;
// true: return node;
// undefined: continues search
var defaultReturnable = [function (node, defaultNode) {
  return node.type === "paragraph" ? defaultNode.type === "root" : undefined;
}, function (node) {
  return node.type === "root" ? null : undefined;
}, function (node) {
  return node.type === "tableCell" ? true : undefined;
}, function (node) {
  return node.type === "heading" ? true : undefined;
}, function (node) {
  return node.type === "list" ? null : undefined;
}, function (node) {
  return node.type === "table" ? null : undefined;
}, function (node, defaultNode) {
  return defaultNode && defaultNode.type === "listItem" ? false : undefined;
}, function (node, defaultNode) {
  if (["text", "inlineCode", "emphasis", "strong", "delete", "link", "image", "linkReference", "imageReference"].indexOf(node.type) > -1) {
    return false;
  }
  return undefined;
}];

module.exports = function (node, position) {
  var returnable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (compare(node.position.start, position) && compare(position, node.position.end)) {
    return findNode(position, node, null, compose([].concat(_toConsumableArray(returnable), defaultReturnable)));
  }
  return null;
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _require = require("chalk"),
    bgWhite = _require.bgWhite;

module.exports =
/*#__PURE__*/
function () {
  function ProgressBar() {
    (0, _classCallCheck2["default"])(this, ProgressBar);
    this.total;
    this.current;
    this.bar_length = process.stdout.columns - 30;
  }

  (0, _createClass2["default"])(ProgressBar, [{
    key: "init",
    value: function init(total) {
      this.total = total;
      this.current = 0;
      this.update(this.current);
    }
  }, {
    key: "update",
    value: function update(current) {
      this.current = current;
      var current_progress = this.current / this.total;
      this.draw(current_progress);
    }
  }, {
    key: "draw",
    value: function draw(current_progress) {
      var filled_bar_length = (current_progress * this.bar_length).toFixed(0);
      var empty_bar_length = this.bar_length - filled_bar_length;
      var filled_bar = this.get_bar(filled_bar_length, " ", bgWhite);
      var empty_bar = this.get_bar(empty_bar_length, "-");
      var percentage_progress = (current_progress * 100).toFixed(2);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write("Current progress: [".concat(filled_bar).concat(empty_bar, "] | ").concat(percentage_progress, "%"));
    }
  }, {
    key: "get_bar",
    value: function get_bar(length, _char) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a) {
        return a;
      };
      var str = "";

      for (var i = 0; i < length; i++) {
        str += _char;
      }

      return color(str);
    }
  }]);
  return ProgressBar;
}();
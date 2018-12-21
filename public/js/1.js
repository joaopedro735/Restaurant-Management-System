webpackJsonp([1],{

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(96)
}
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(98)
/* template */
var __vue_template__ = __webpack_require__(99)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2f2813e9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/user/waiterList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f2813e9", Component.options)
  } else {
    hotAPI.reload("data-v-2f2813e9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4322fcce", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2f2813e9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./waiterList.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2f2813e9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./waiterList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\nimg[data-v-2f2813e9] {\n    max-height: 60px;\n    border-radius: 3px;\n}\n", ""]);

// exports


/***/ }),

/***/ 98:
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
module.exports = {
  props: ['waiters'],
  data: function data() {
    return {};
  },
  methods: {
    getPhoto: function getPhoto(photo_url) {
      return photo_url;
    }
  },
  mounted: function mounted() {}
};

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("table", { staticClass: "table table-striped table-hover" }, [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "tbody",
      _vm._l(_vm.waiters, function(waiter) {
        return _c("tr", { key: waiter.id }, [
          _c("td", [_c("strong", [_vm._v(_vm._s(waiter.name))])]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(waiter.type))]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(waiter.email))]),
          _vm._v(" "),
          _c("td", { attrs: { align: "center" } }, [
            _c("img", { attrs: { src: _vm.getPhoto(waiter.photo_url) } })
          ])
        ])
      })
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_c("strong", [_vm._v("Nome")])]),
        _vm._v(" "),
        _c("th", [_c("strong", [_vm._v("Categoria")])]),
        _vm._v(" "),
        _c("th", [_c("strong", [_vm._v("Email")])]),
        _vm._v(" "),
        _c("th", [_c("strong", [_vm._v("Fotografia")])])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2f2813e9", module.exports)
  }
}

/***/ })

});
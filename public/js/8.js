webpackJsonp([8],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(118);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("5b893a4f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d8553cd\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dishList.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d8553cd\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dishList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\nimg[data-v-5d8553cd] {\n    max-height: 60px;\n    border-radius: 3px;\n}\n", ""]);

// exports


/***/ }),

/***/ 119:
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
  props: ['dishes'],
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

/***/ 120:
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
      _vm._l(_vm.dishes, function(dish) {
        return _c("tr", { key: dish.id }, [
          _c("td", [_c("strong", [_vm._v(_vm._s(dish.name))])]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(dish.price))]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(dish.description))]),
          _vm._v(" "),
          _c("td", { attrs: { align: "center" } }, [
            _c("img", { attrs: { src: _vm.getPhoto(dish.photo_url) } })
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
        _c("th", [_c("strong", [_vm._v("Prato")])]),
        _vm._v(" "),
        _c("th", [_c("strong", [_vm._v("Preço")])]),
        _vm._v(" "),
        _c("th", [_c("strong", [_vm._v("Descrição")])]),
        _vm._v(" "),
        _c("th")
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d8553cd", module.exports)
  }
}

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(117)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(119)
/* template */
var __vue_template__ = __webpack_require__(120)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5d8553cd"
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
Component.options.__file = "resources/js/components/menu/dishList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d8553cd", Component.options)
  } else {
    hotAPI.reload("data-v-5d8553cd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
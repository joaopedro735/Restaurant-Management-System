webpackJsonp([19],{

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("3806e8ae", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7bc860aa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./menu.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7bc860aa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./menu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 105:
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
  data: function data() {
    return {
      title: 'Menu',
      menu: [],
      dishes: [],
      drinks: [],
      showDishes: true,
      showDrinks: true,
      showAll: true
    };
  },
  methods: {},
  mounted: function mounted() {
    var _this = this;

    axios.get('/api/menu').then(function (response) {
      _this.menu = response.data.data;
      _this.drinks = _this.menu.filter(function (elem) {
        return elem.type == 'drink';
      });
      _this.dishes = _this.menu.filter(function (elem) {
        return elem.type == 'dish';
      });
    }).catch(function (error) {
      console.dir(error);
    });
  }
};

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("hr"),
    _vm._v(" "),
    _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "btn-group btn-group-justified" }, [
        _c("div", { staticClass: "btn-group" }, [
          _c(
            "button",
            {
              staticClass: "btn ",
              class: {
                "btn-primary": _vm.showAll,
                "btn-secondary": !_vm.showAll
              },
              attrs: { id: "all", type: "button" },
              on: {
                click: function($event) {
                  _vm.showDishes = true
                  _vm.showDrinks = true
                  _vm.showAll = true
                }
              }
            },
            [_vm._v("Tudo")]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "btn-group" }, [
          _c(
            "button",
            {
              staticClass: "btn ",
              class: {
                "btn-primary": _vm.showDishes && !_vm.showAll,
                "btn-secondary": !_vm.showDishes
              },
              attrs: { id: "dishes", type: "button" },
              on: {
                click: function($event) {
                  _vm.showDishes = true
                  _vm.showDrinks = false
                  _vm.showAll = false
                }
              }
            },
            [_vm._v("Pratos")]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "btn-group" }, [
          _c(
            "button",
            {
              staticClass: "btn ",
              class: {
                "btn-primary": _vm.showDrinks && !_vm.showAll,
                "btn-secondary": !_vm.showDrinks
              },
              attrs: { id: "drinks", type: "button" },
              on: {
                click: function($event) {
                  _vm.showDishes = false
                  _vm.showDrinks = true
                  _vm.showAll = false
                }
              }
            },
            [_vm._v("Bebidas")]
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _vm.showDishes
      ? _c(
          "div",
          { staticClass: "container" },
          [
            _c("h2", [_vm._v("Pratos")]),
            _vm._v(" "),
            _c("list-dishes", { attrs: { dishes: _vm.dishes } })
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.showDishes && _vm.showDrinks
      ? _c("div", { staticClass: "container" }, [_c("hr")])
      : _vm._e(),
    _vm._v(" "),
    _vm.showDrinks
      ? _c(
          "div",
          { staticClass: "container" },
          [
            _c("h2", [_vm._v("Bebidas")]),
            _vm._v(" "),
            _c("list-drinks", { attrs: { drinks: _vm.drinks } })
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("h1", { staticClass: "text-center" }, [_vm._v("Menu")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7bc860aa", module.exports)
  }
}

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(103)
}
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(105)
/* template */
var __vue_template__ = __webpack_require__(106)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7bc860aa"
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
Component.options.__file = "resources/js/components/menu.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bc860aa", Component.options)
  } else {
    hotAPI.reload("data-v-7bc860aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
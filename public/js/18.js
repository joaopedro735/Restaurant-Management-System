webpackJsonp([18],{

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(168)
}
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(170)
/* template */
var __vue_template__ = __webpack_require__(171)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-31cf3a70"
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
Component.options.__file = "resources/js/components/orders.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31cf3a70", Component.options)
  } else {
    hotAPI.reload("data-v-31cf3a70", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(169);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("6e7bf4c0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31cf3a70\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orders.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31cf3a70\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orders.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      totalOrders: 0,
      orders: [],
      loading: true,
      pagination: {
        sortBy: 'responsable_cook'
      },
      headers: [{
        text: 'Status',
        value: 'state'
      }, {
        text: 'Cook',
        value: 'responsable_cook'
      }, {
        text: 'Ordered at',
        value: 'created_at'
      }, {
        text: 'Begin',
        value: 'start'
      }, {
        text: 'End',
        value: 'end'
      }]
    };
  },
  watch: {
    pagination: {
      handler: function handler() {
        var _this = this;

        this.getDataFromApi().then(function (data) {
          _this.orders = data.data.orders;
          _this.totalOrders = data.data.totalOrders;
        });
      },
      deep: true
    }
  },
  methods: {
    getDataFromApi: function getDataFromApi() {
      var _this2 = this;

      this.loading = true;
      return axios.all([axios.get('/api/orders', {
        params: {
          page: this.pagination.page,
          rowsPerPage: this.pagination.rowsPerPage,
          cook_id: 38
        }
      }), axios.get('/api/orders', {
        params: {
          nmr: 0
        }
      })]).then(axios.spread(function (ordersRes, nmrRes) {
        _this2.loading = false;
        return {
          data: {
            orders: ordersRes.data.data,
            totalOrders: nmrRes.data
          }
        };
      }));
    },
    changeSort: function changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
});

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-card",
        [
          _c(
            "v-card-title",
            {
              staticClass: "headline light-blue lighten-3",
              attrs: { "primary-title": "" }
            },
            [_vm._v("Orders")]
          ),
          _vm._v(" "),
          _c(
            "v-data-table",
            {
              staticClass: "elevation-1",
              attrs: {
                headers: _vm.headers,
                items: _vm.orders,
                pagination: _vm.pagination,
                "total-items": _vm.totalOrders,
                loading: _vm.loading,
                "item-key": "created_at"
              },
              on: {
                "update:pagination": function($event) {
                  _vm.pagination = $event
                }
              },
              scopedSlots: _vm._u([
                {
                  key: "items",
                  fn: function(props) {
                    return [
                      _c(
                        "tr",
                        {
                          on: {
                            click: function($event) {
                              props.expanded = !props.expanded
                            }
                          }
                        },
                        [
                          _c("td", [_vm._v(_vm._s(props.item.state))]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(_vm._s(props.item.responsable_cook))
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(props.item.created_at))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(props.item.start))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(props.item.end))])
                        ]
                      )
                    ]
                  }
                },
                {
                  key: "expand",
                  fn: function(props) {
                    return [
                      _c(
                        "v-card",
                        { attrs: { flat: "" } },
                        [
                          _c("v-card-text", [
                            _vm._v(
                              "Last update: " + _vm._s(props.item.updated_at)
                            )
                          ])
                        ],
                        1
                      )
                    ]
                  }
                }
              ])
            },
            [
              _c(
                "template",
                { slot: "no-data" },
                [
                  _c(
                    "v-alert",
                    { attrs: { value: true, color: "error", icon: "warning" } },
                    [
                      _vm._v(
                        "\n                    No orders available\n                "
                      )
                    ]
                  )
                ],
                1
              )
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-31cf3a70", module.exports)
  }
}

/***/ })

});
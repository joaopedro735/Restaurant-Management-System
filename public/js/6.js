webpackJsonp([6],{

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(164)
/* template */
var __vue_template__ = __webpack_require__(165)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-50073cd8"
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
Component.options.__file = "resources/js/components/orders/orders.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50073cd8", Component.options)
  } else {
    hotAPI.reload("data-v-50073cd8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(163);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4a5835f0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50073cd8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orders.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50073cd8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orders.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n.in-prep[data-v-50073cd8] {\n    background-color: #BBDEFB;\n}\n.this-cook-conf[data-v-50073cd8] {\n    background-color: #C8E6C9;\n}\n.other-cook-conf[data-v-50073cd8] {\n    background-color: #FFCDD2;\n}\n.no-cook[data-v-50073cd8] {\n    background-color: #FFECB3;\n}\n", ""]);

// exports


/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var _ref;

    return _ref = {
      user: {},
      cookID: '',
      showPage: false,
      totalOrders: 0,
      orders: [],
      currentOrder: {},
      loading: true,
      pagination: {},
      rowsPerPageItems: [15, 25, 50, 100]
    }, _defineProperty(_ref, "pagination", {
      rowsPerPage: 15
    }), _defineProperty(_ref, "headers", [{
      text: 'Status',
      align: 'left',
      sortable: false,
      value: 'state'
    }, {
      text: 'Cook',
      value: 'responsible_cook'
    }, {
      text: 'Ordered at',
      value: 'created_at'
    }, {
      text: 'Begin',
      value: 'start'
    }, {
      text: 'Last update',
      value: 'updated_at'
    }, {
      text: 'Order ID',
      value: 'id'
    }, {
      text: '',
      value: 'actions'
    }]), _ref;
  },
  watch: {
    pagination: {
      handler: function handler() {
        var _this = this;

        this.getDataFromApi().then(function (data) {
          _this.orders = data.data.orders;
          _this.totalOrders = data.data.totalOrders; //console.table(this.orders);
        });
      },
      deep: true
    }
  },
  methods: {
    getDataFromApi: function getDataFromApi() {
      var _this2 = this;

      this.loading = true; //console.log('Cook ID: ' + this.user.id);

      return axios.all([axios.get('/api/orders', {
        params: {
          page: this.pagination.page,
          rowsPerPage: this.pagination.rowsPerPage,
          cookID: this.cookID
        }
      })
      /* ,
      axios.get('/api/orders', {
        params: {
            nmr: 0,
            cookID: this.cookID
        }
      }) */
      ]).then(axios.spread(function (ordersRes, nmrRes) {
        _this2.loading = false;
        return {
          data: {
            orders: ordersRes.data.data,
            totalOrders: ordersRes.data.meta.total
          }
        };
      }));
    },

    /* getOrderDataFromApi (id) {
        this.order[0].name = 'Please wait';
        this.loading = true;
        axios.get('/api/order', {
            params: {
                orderID: id
            }
        }).then(response => {
            this.loading = false;
            this.order = response.data
            
            console.log(this.order);
        });
    }, */
    changeOrderState: function changeOrderState(index, order, state) {
      var _this3 = this;

      console.clear();
      this.currentOrder = Object.assign({}, order);
      var orderToUpdate = this.currentOrder;
      console.log('[Checkpoint 1] Order ID: ' + orderToUpdate.id);
      console.log('               Responsible cook ID: ' + this.cookID);
      console.log('               Current state: ' + orderToUpdate.state);
      console.log('               New state: ' + state); // Order already has a cook

      if (order.responsible_cook_id != 0) {
        /** Server needs : {
         * order.id
         * order
         * new state
         * } */
        console.log('Order already had this cook');
        axios.put('/api/orders/' + orderToUpdate.id + '?state=' + state).then(function (response) {
          console.log(response.data.data);
          Vue.set(_this3.orders, index, response.data.data);

          if (state == 'prepared') {
            _this3.orders.splice(index, 1);

            _this3.totalOrders--;
          }

          _this3.$toasted.success('Order updated', {
            position: "top-center",
            duration: 3000,
            icon: "error_outline"
          });
        }).catch(function (error) {
          console.dir(error);
        });
      } else {
        // Order doesn't have a cook

        /** Server needs : {
         * order.id
         * cook.id
         * order
         * order.state
         * } */
        console.log('Order had no cook');
        axios.put('/api/orders/' + orderToUpdate.id + '?state=' + state + '&responsible_cook_id=' + this.cookID).then(function (response) {
          Vue.set(_this3.orders, index, response.data.data);

          if (state == 'prepared') {
            _this3.orders.splice(index, 1);
          }

          _this3.$toasted.success('Order updated', {
            position: "top-center",
            duration: 3000,
            icon: "error_outline"
          });
        }).catch(function (error) {
          console.dir(error);
        });
      }
    },
    changeSort: function changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    getInformationFromLoggedUser: function getInformationFromLoggedUser() {
      this.user = this.$store.state.user;
    },
    isUserAWorker: function isUserAWorker(user) {
      //console.log(user);
      if (user.type == "cook") {
        this.showPage = true;
        this.cookID = user.id;
      } else {
        console.log('Not authorized to see this page!');
        this.$toasted.error('You are not authorized to see this page', {
          position: "top-center",
          duration: 3000,
          icon: "error_outline"
        });
        this.$router.push('/');
      }
    }
  },
  mounted: function mounted() {
    this.getInformationFromLoggedUser();
    this.isUserAWorker(this.user);
  }
});

/***/ }),

/***/ 165:
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
                "rows-per-page-items": _vm.rowsPerPageItems,
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
                          key: props.item.created_at,
                          class: {
                            "in-prep":
                              (props.item.responsible_cook_id == _vm.user.id) &
                              (props.item.state == "In preparation"),
                            "this-cook-conf":
                              (props.item.responsible_cook_id == _vm.user.id) &
                              (props.item.state == "Confirmed"),
                            "other-cook-conf":
                              props.item.responsible_cook_id != _vm.user.id,
                            "no-cook":
                              props.item.responsible_cook == "No cook assigned"
                          },
                          on: {
                            click: function($event) {
                              props.expanded = !props.expanded
                            }
                          }
                        },
                        [
                          _c(
                            "td",
                            [
                              props.item.state == "Confirmed"
                                ? _c(
                                    "v-chip",
                                    {
                                      attrs: { outline: "", color: "primary" }
                                    },
                                    [
                                      _vm._v(
                                        "  " + _vm._s(props.item.state) + "   "
                                      )
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              props.item.state == "In preparation"
                                ? _c(
                                    "v-chip",
                                    {
                                      attrs: { outline: "", color: "primary" }
                                    },
                                    [_vm._v(_vm._s(props.item.state))]
                                  )
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("td", [
                            _c("strong", [
                              _vm._v(_vm._s(props.item.responsible_cook))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(props.item.created_at))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(props.item.start))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(props.item.updated_at))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(props.item.id))]),
                          _vm._v(" "),
                          _c("td", { staticClass: "text-xs-right" }, [
                            (props.item.state == "In preparation") &
                            (props.item.responsible_cook_id == _vm.user.id)
                              ? _c(
                                  "span",
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { small: "", color: "success" },
                                        nativeOn: {
                                          click: function($event) {
                                            _vm.changeOrderState(
                                              props.index,
                                              props.item,
                                              "prepared"
                                            ),
                                              (props.expanded = !props.expanded)
                                          }
                                        }
                                      },
                                      [_vm._v("Mark as prepared")]
                                    )
                                  ],
                                  1
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            (props.item.responsible_cook_id == _vm.user.id) &
                            (props.item.state == "Confirmed")
                              ? _c(
                                  "span",
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { small: "", color: "info" },
                                        nativeOn: {
                                          click: function($event) {
                                            _vm.changeOrderState(
                                              props.index,
                                              props.item,
                                              "in preparation"
                                            ),
                                              (props.expanded = !props.expanded)
                                          }
                                        }
                                      },
                                      [_vm._v("Prepare")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { small: "", color: "success" },
                                        nativeOn: {
                                          click: function($event) {
                                            _vm.changeOrderState(
                                              props.index,
                                              props.item,
                                              "prepared"
                                            ),
                                              (props.expanded = !props.expanded)
                                          }
                                        }
                                      },
                                      [_vm._v("Mark as Prepared")]
                                    )
                                  ],
                                  1
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            props.item.responsible_cook == "No cook assigned"
                              ? _c(
                                  "span",
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { small: "", color: "info" },
                                        nativeOn: {
                                          click: function($event) {
                                            _vm.changeOrderState(
                                              props.index,
                                              props.item,
                                              "in preparation"
                                            ),
                                              (props.expanded = !props.expanded)
                                          }
                                        }
                                      },
                                      [_vm._v("Prepare")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { small: "", color: "success" },
                                        nativeOn: {
                                          click: function($event) {
                                            _vm.changeOrderState(
                                              props.index,
                                              props.item,
                                              "prepared"
                                            ),
                                              (props.expanded = !props.expanded)
                                          }
                                        }
                                      },
                                      [_vm._v("Mark as prepared")]
                                    )
                                  ],
                                  1
                                )
                              : _vm._e()
                          ])
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
                              "\n                        Order details: " +
                                _vm._s(props.item.item) +
                                "\n                    "
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
              _c("template", { slot: "footer" }, [
                _c("td", { attrs: { colspan: _vm.headers.length } }, [
                  _c("strong", [_vm._v("Click order for details")])
                ])
              ]),
              _vm._v(" "),
              _c(
                "template",
                { slot: "no-data" },
                [
                  _c(
                    "v-alert",
                    { attrs: { value: true, color: "info", icon: "info" } },
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
    require("vue-hot-reload-api")      .rerender("data-v-50073cd8", module.exports)
  }
}

/***/ })

});
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orders/orders.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.in-prep[data-v-50073cd8] {\n    background-color: #BBDEFB;\n}\n.this-cook-conf[data-v-50073cd8] {\n    background-color: #C8E6C9;\n}\n.other-cook-conf[data-v-50073cd8] {\n    background-color: #FFCDD2;\n}\n.no-cook[data-v-50073cd8] {\n    background-color: #FFECB3;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=template&id=50073cd8&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orders/orders.vue?vue&type=template&id=50073cd8&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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



/***/ }),

/***/ "./resources/js/components/orders/orders.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/orders/orders.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orders_vue_vue_type_template_id_50073cd8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orders.vue?vue&type=template&id=50073cd8&scoped=true& */ "./resources/js/components/orders/orders.vue?vue&type=template&id=50073cd8&scoped=true&");
/* harmony import */ var _orders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orders.vue?vue&type=script&lang=js& */ "./resources/js/components/orders/orders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _orders_vue_vue_type_style_index_0_id_50073cd8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css& */ "./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _orders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _orders_vue_vue_type_template_id_50073cd8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _orders_vue_vue_type_template_id_50073cd8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "50073cd8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orders/orders.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orders/orders.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/orders/orders.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./orders.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_style_index_0_id_50073cd8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=style&index=0&id=50073cd8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_style_index_0_id_50073cd8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_style_index_0_id_50073cd8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_style_index_0_id_50073cd8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_style_index_0_id_50073cd8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_style_index_0_id_50073cd8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/orders/orders.vue?vue&type=template&id=50073cd8&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/orders/orders.vue?vue&type=template&id=50073cd8&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_template_id_50073cd8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./orders.vue?vue&type=template&id=50073cd8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orders/orders.vue?vue&type=template&id=50073cd8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_template_id_50073cd8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_orders_vue_vue_type_template_id_50073cd8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
webpackJsonp([0],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c(
        "v-card-title",
        {
          staticClass: "headline light-blue lighten-3",
          attrs: { "primary-title": "" }
        },
        [_vm._v("Users\n    ")]
      ),
      _vm._v(" "),
      _c("v-data-table", {
        staticClass: "elevation-1",
        attrs: {
          headers: _vm.headers,
          items: _vm.users,
          pagination: _vm.pagination,
          "total-items": _vm.totalUsers,
          loading: _vm.loading
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
                  "td",
                  [
                    _c("v-avatar", { attrs: { size: "56px" } }, [
                      _c("img", {
                        attrs: { src: props.item.photo_url, alt: "miau" }
                      })
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(props.item.name))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(props.item.type))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(props.item.email))])
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "fab-container text-xs-center" },
        [
          _c(
            "v-btn",
            {
              attrs: { dark: "", round: "", color: "indigo" },
              on: {
                click: function($event) {
                  _vm.showCreateAccount = true
                }
              }
            },
            [_c("v-icon", [_vm._v("add")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("create-account", {
        attrs: { visible: _vm.showCreateAccount },
        on: {
          close: function($event) {
            _vm.showCreateAccount = false
          }
        }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-d5013f96", module.exports)
  }
}

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(92)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(94)
/* template */
var __vue_template__ = __webpack_require__(100)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d5013f96"
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
Component.options.__file = "resources/js/components/users2.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d5013f96", Component.options)
  } else {
    hotAPI.reload("data-v-d5013f96", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("986bb6b4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d5013f96\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./users2.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d5013f96\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./users2.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n.fab-container[data-v-d5013f96] {\n    position: fixed;\n    bottom: 13%;\n    right: 1%;\n}\n", ""]);

// exports


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createUser__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createUser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__createUser__);
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
    return {
      totalUsers: 0,
      users: [],
      loading: true,
      pagination: {},
      headers: [{
        text: '',
        value: 'photo_url',
        align: 'left',
        sortable: false,
        width: '60px'
      }, {
        text: 'Nome',
        value: 'name',
        width: '500px'
      }, {
        text: 'Tipo',
        value: 'type',
        width: '80px'
      }, {
        text: 'Email',
        value: 'email',
        width: '200px'
      }],
      showCreateAccount: false
    };
  },
  watch: {
    pagination: {
      handler: function handler() {
        var _this = this;

        this.getDataFromApi().then(function (data) {
          _this.users = data.data.users;
          _this.totalUsers = data.data.totalUsers;
        });
      },
      deep: true
    }
  },
  methods: {
    getDataFromApi: function getDataFromApi() {
      var _this2 = this;

      this.loading = true;
      return axios.get('/api/users', {
        params: {
          page: this.pagination.page,
          rowsPerPage: this.pagination.rowsPerPage
        }
      }).then(function (usersRes) {
        console.log(usersRes.data.meta);
        return {
          data: {
            users: usersRes.data.data,
            totalUsers: usersRes.data.meta.total
          }
        };
      }).catch(function (error) {
        console.log(error);
      }).finally(function () {
        _this2.loading = false;
      });
    },
    showCreateAccount1: function showCreateAccount1() {
      this.showCreateAccount = !this.showCreateAccount;
    }
  },
  mounted: function mounted() {},
  components: {
    'create-account': __WEBPACK_IMPORTED_MODULE_0__createUser___default.a
  }
});

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(96)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(98)
/* template */
var __vue_template__ = __webpack_require__(99)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2313901c"
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
Component.options.__file = "resources/js/components/createUser.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2313901c", Component.options)
  } else {
    hotAPI.reload("data-v-2313901c", Component.options)
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
var update = __webpack_require__(4)("4374333c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2313901c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./createUser.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2313901c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./createUser.vue");
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
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 98:
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
function initialState() {
  return {
    title: 'Login',
    user: {
      name: '',
      email: '',
      username: '',
      type: ''
    },
    alert: {
      show: false,
      error: ""
    },
    form: {
      valid: true,
      loading: false,
      p_show: false,
      rules: {
        required: function required(v) {
          return !!v || 'Required.';
        },
        min: function min(v) {
          return v.length >= 3 || 'Min 3 characters';
        },
        email: function email(value) {
          var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        }
      }
    },
    types: [{
      text: 'Manager',
      value: 'manager'
    }, {
      text: 'Cook',
      value: 'cook'
    }, {
      text: 'Waiter',
      value: 'waiter'
    }, {
      text: 'Cashier',
      value: 'cashier'
    }]
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "createUser",
  props: {
    visible: Boolean
  },
  data: function data() {
    return initialState();
  },
  methods: {
    submit: function submit() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    clear: function clear() {
      this.$refs.form.reset();
    },
    register: function register() {
      var _this = this;

      var config = {
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.token,
          'Accept': 'application/json'
        }
      };
      axios.post('/api/account/create', this.user, config).then(function (response) {
        _this.$toasted.success('User created successfully');
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  computed: {
    show: {
      get: function get() {
        return this.visible;
      },
      set: function set(value) {
        if (!value) {
          this.$emit('close');
        }
      }
    }
  }
});

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "text-xs-center" },
    [
      _c(
        "v-dialog",
        {
          attrs: { width: "500" },
          on: {
            click: function($event) {
              $event.stopPropagation()
              _vm.show = false
            }
          },
          model: {
            value: _vm.show,
            callback: function($$v) {
              _vm.show = $$v
            },
            expression: "show"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-card-title",
                {
                  staticClass: "headline light-blue lighten-3",
                  attrs: { "primary-title": "", color: "purple" }
                },
                [
                  _vm._v(
                    "\n                Create worker account\n            "
                  )
                ]
              ),
              _vm._v(" "),
              _c("v-divider", { attrs: { light: "" } }),
              _vm._v(" "),
              _c(
                "v-alert",
                {
                  attrs: {
                    value: _vm.alert.show,
                    type: "error",
                    transition: "scale-transition",
                    dismissible: "",
                    outline: ""
                  }
                },
                [_vm._v(_vm._s(_vm.alert.error) + "\n            ")]
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c(
                    "v-form",
                    {
                      ref: "form",
                      attrs: { "lazy-validation": "" },
                      model: {
                        value: _vm.form.valid,
                        callback: function($$v) {
                          _vm.$set(_vm.form, "valid", $$v)
                        },
                        expression: "form.valid"
                      }
                    },
                    [
                      _c("v-text-field", {
                        attrs: {
                          rules: [_vm.form.rules.required],
                          label: "Name",
                          autofocus: "",
                          required: ""
                        },
                        model: {
                          value: _vm.user.name,
                          callback: function($$v) {
                            _vm.$set(_vm.user, "name", $$v)
                          },
                          expression: "user.name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          rules: [
                            _vm.form.rules.required,
                            _vm.form.rules.email
                          ],
                          label: "E-mail",
                          required: ""
                        },
                        model: {
                          value: _vm.user.email,
                          callback: function($$v) {
                            _vm.$set(_vm.user, "email", $$v)
                          },
                          expression: "user.email"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          rules: [_vm.form.rules.required],
                          label: "Username",
                          required: ""
                        },
                        model: {
                          value: _vm.user.username,
                          callback: function($$v) {
                            _vm.$set(_vm.user, "username", $$v)
                          },
                          expression: "user.username"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-select", {
                        attrs: {
                          items: _vm.types,
                          "item-text": "text",
                          "item-value": "value",
                          label: "Type"
                        },
                        model: {
                          value: _vm.user.type,
                          callback: function($$v) {
                            _vm.$set(_vm.user, "type", $$v)
                          },
                          expression: "user.type"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        disabled: !_vm.form.valid,
                        loading: _vm.form.loading
                      },
                      on: { click: _vm.submit }
                    },
                    [_vm._v("\n                    submit\n                ")]
                  ),
                  _vm._v(" "),
                  _c("v-btn", { on: { click: _vm.clear } }, [_vm._v("clear")])
                ],
                1
              )
            ],
            1
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
    require("vue-hot-reload-api")      .rerender("data-v-2313901c", module.exports)
  }
}

/***/ })

});
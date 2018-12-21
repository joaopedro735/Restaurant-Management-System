webpackJsonp([10],{

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(126);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("6bbdb163", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-172b28a4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-172b28a4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 127:
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
function initialState() {
  return {
    title: 'Login',
    user: {
      email: '',
      password: ''
    },
    dialog: false,
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
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return initialState();
  },
  methods: {
    login: function login() {
      var _this = this;

      this.form.loading = true;
      axios.post("/api/login", this.user).then(function (response) {
        _this.$store.commit('setToken', response.data.access_token);

        return axios.get("api/users/me");
      }).then(function (response) {
        _this.$store.commit("setUser", response.data.data);

        _this.dialog = false;

        _this.$toasted.success("Login successful", {
          position: "top-center",
          duration: 3000,
          icon: "fingerprint"
        });

        Object.assign(_this.$data, initialState());
        return axios.get('api/users/me');
      }).then(function (response) {
        _this.$store.commit('setUser', response.data.data);

        console.log("wtv"); //this.$socket.emit('user_enter', response.data.data);
      }).catch(function (error) {
        _this.alert.error = error.response.data.msg;
        _this.alert.show = true;
        console.dir(error);
      }).finally(function () {
        _this.form.loading = false;
      });
    },
    clear: function clear() {
      this.$refs.form.reset();
    },
    submit: function submit() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    }
  }
});

/***/ }),

/***/ 128:
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
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-btn",
            { attrs: { slot: "activator", flat: "" }, slot: "activator" },
            [_vm._v("Login")]
          ),
          _vm._v(" "),
          _c(
            "v-card",
            [
              _c(
                "v-card-title",
                {
                  staticClass: "headline light-blue lighten-3",
                  attrs: { "primary-title": "", color: "purple" }
                },
                [_vm._v("\n                Login\n            ")]
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
                          rules: [
                            _vm.form.rules.required,
                            _vm.form.rules.email
                          ],
                          label: "E-mail",
                          autofocus: "",
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
                          "append-icon": _vm.form.p_show
                            ? "visibility_off"
                            : "visibility",
                          rules: [_vm.form.rules.required, _vm.form.rules.min],
                          type: _vm.form.p_show ? "text" : "password",
                          name: "input-10-1",
                          label: "Password",
                          hint: "At least 3 characters",
                          counter: ""
                        },
                        on: {
                          "click:append": function($event) {
                            _vm.form.p_show = !_vm.form.p_show
                          },
                          keypress: function($event) {
                            if (
                              !("button" in $event) &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            return _vm.submit($event)
                          }
                        },
                        model: {
                          value: _vm.user.password,
                          callback: function($$v) {
                            _vm.$set(_vm.user, "password", $$v)
                          },
                          expression: "user.password"
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
    require("vue-hot-reload-api")      .rerender("data-v-172b28a4", module.exports)
  }
}

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(127)
/* template */
var __vue_template__ = __webpack_require__(128)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-172b28a4"
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
Component.options.__file = "resources/js/components/login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-172b28a4", Component.options)
  } else {
    hotAPI.reload("data-v-172b28a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
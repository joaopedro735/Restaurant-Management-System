(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/account/changePassword1.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  validations: {
    user: {
      old_password: {
        required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"]
      },
      new_password: {
        required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"],
        minLength: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["minLength"])(3)
      },
      new_password_confirmation: {
        required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["required"],
        minLength: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["minLength"])(3),
        sameAsPassword: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_0__["sameAs"])('new_password')
      }
    }
  },
  data: function data() {
    return {
      user: {
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
      p_show: false,
      p_old_show: false
    };
  },
  computed: {
    newPasswordErrors: function newPasswordErrors() {
      var errors = [];
      if (!this.$v.user.new_password.$dirty) return errors;
      !this.$v.user.new_password.required && errors.push("Password is required");
      !this.$v.user.new_password.minLength && errors.push("Min 3 characters");
      return errors;
    },
    newPasswordConfirmationErrors: function newPasswordConfirmationErrors() {
      var errors = [];
      if (!this.$v.user.new_password_confirmation.$dirty) return errors;
      !this.$v.user.new_password_confirmation.required && errors.push("Password confirmation is required");
      !this.$v.user.new_password_confirmation.minLength && errors.push("Min 3 characters");
      !this.$v.user.new_password_confirmation.sameAsPassword && errors.push("Password and password confirmation mismatch");
      return errors;
    },
    oldPasswordErrors: function oldPasswordErrors() {
      var errors = [];
      if (!this.$v.user.old_password.$dirty) return errors;
      !this.$v.user.old_password.required && errors.push("Old password is required");
      return errors;
    }
  },
  methods: {
    submit: function submit() {
      this.$v.$touch();
      this.$store.commit('loadTokenAndUserFromSession');
      console.log(axios.defaults.headers.common.Authorization);

      if (!this.$v.$invalid) {
        axios.put('/api/account/changePassword', this.user).then(function (response) {
          console.log(response.data);
        });
      }
    },
    clear: function clear() {
      this.$v.$reset();
      this.user.old_password = "";
      this.user.new_password = "";
      this.user.new_password_confirmation = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/account/changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
    "v-container",
    { attrs: { fluid: "", "grid-list-xl": "", "text-xs-center": "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs4: "", "offset-xs4": "" } },
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
                    [_vm._v("Change Password\n                ")]
                  ),
                  _vm._v(" "),
                  _c("v-divider", { attrs: { light: "" } }),
                  _vm._v(" "),
                  _c("v-card-text", [
                    _c(
                      "form",
                      { ref: "form" },
                      [
                        _c("v-text-field", {
                          attrs: {
                            "error-messages": _vm.oldPasswordErrors,
                            "append-icon": _vm.p_old_show
                              ? "visibility_off"
                              : "visibility",
                            type: _vm.p_old_show ? "text" : "password",
                            label: "Old password"
                          },
                          on: {
                            "click:append": function($event) {
                              _vm.p_old_show = !_vm.p_old_show
                            },
                            input: function($event) {
                              _vm.$v.user.old_password.$touch()
                            },
                            blur: function($event) {
                              _vm.$v.user.old_password.$touch()
                            }
                          },
                          model: {
                            value: _vm.user.old_password,
                            callback: function($$v) {
                              _vm.$set(_vm.user, "old_password", $$v)
                            },
                            expression: "user.old_password"
                          }
                        }),
                        _vm._v(" "),
                        _c("v-text-field", {
                          attrs: {
                            "error-messages": _vm.newPasswordErrors,
                            "append-icon": _vm.p_show
                              ? "visibility_off"
                              : "visibility",
                            type: _vm.p_show ? "text" : "password",
                            label: "Password",
                            counter: ""
                          },
                          on: {
                            "click:append": function($event) {
                              _vm.p_show = !_vm.p_show
                            },
                            input: function($event) {
                              _vm.$v.user.new_password.$touch()
                            },
                            blur: function($event) {
                              _vm.$v.user.new_password.$touch()
                            }
                          },
                          model: {
                            value: _vm.user.new_password,
                            callback: function($$v) {
                              _vm.$set(_vm.user, "new_password", $$v)
                            },
                            expression: "user.new_password"
                          }
                        }),
                        _vm._v(" "),
                        _c("v-text-field", {
                          attrs: {
                            "error-messages": _vm.newPasswordConfirmationErrors,
                            "append-icon": _vm.p_show
                              ? "visibility_off"
                              : "visibility",
                            type: _vm.p_show ? "text" : "password",
                            label: "Password Confirmation",
                            counter: ""
                          },
                          on: {
                            "click:append": function($event) {
                              _vm.p_show = !_vm.p_show
                            },
                            input: function($event) {
                              _vm.$v.user.new_password_confirmationf.$touch()
                            },
                            blur: function($event) {
                              _vm.$v.user.new_password_confirmation.$touch()
                            }
                          },
                          model: {
                            value: _vm.user.new_password_confirmation,
                            callback: function($$v) {
                              _vm.$set(
                                _vm.user,
                                "new_password_confirmation",
                                $$v
                              )
                            },
                            expression: "user.new_password_confirmation"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c("v-btn", { on: { click: _vm.submit } }, [
                        _vm._v("submit")
                      ]),
                      _vm._v(" "),
                      _c("v-btn", { on: { click: _vm.clear } }, [
                        _vm._v("clear")
                      ])
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/account/changePassword1.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/account/changePassword1.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _changePassword1_vue_vue_type_template_id_38abdcc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true& */ "./resources/js/components/account/changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true&");
/* harmony import */ var _changePassword1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./changePassword1.vue?vue&type=script&lang=js& */ "./resources/js/components/account/changePassword1.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _changePassword1_vue_vue_type_style_index_0_id_38abdcc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css& */ "./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _changePassword1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _changePassword1_vue_vue_type_template_id_38abdcc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _changePassword1_vue_vue_type_template_id_38abdcc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "38abdcc9",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/account/changePassword1.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/account/changePassword1.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/account/changePassword1.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./changePassword1.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_style_index_0_id_38abdcc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=style&index=0&id=38abdcc9&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_style_index_0_id_38abdcc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_style_index_0_id_38abdcc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_style_index_0_id_38abdcc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_style_index_0_id_38abdcc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_style_index_0_id_38abdcc9_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/account/changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/account/changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_template_id_38abdcc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/account/changePassword1.vue?vue&type=template&id=38abdcc9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_template_id_38abdcc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_changePassword1_vue_vue_type_template_id_38abdcc9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
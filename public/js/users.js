webpackJsonp([11],{

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(86)
/* template */
var __vue_template__ = __webpack_require__(87)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
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

/***/ 86:
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
      }]
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
      return axios.all([axios.get('/api/users', {
        params: {
          page: this.pagination.page,
          rowsPerPage: this.pagination.rowsPerPage
        }
      }), axios.get('/api/users', {
        params: {
          nmr: 0
        }
      })]).then(axios.spread(function (usersRes, nmrRes) {
        _this2.loading = false;
        return {
          data: {
            users: usersRes.data.data,
            totalUsers: nmrRes.data
          }
        };
      }));
    }
  }
});

/***/ }),

/***/ 87:
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

/***/ })

});
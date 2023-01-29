(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.snap = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);

      return o;
    }

    return r;
  }()({
    1: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.onTransaction = void 0;

      const onTransaction = async ({
        transaction,
        chainId
      }) => {
        const user_address = transaction.from;
        const contract_address = transaction.to;
        const chain_id = chainId.split(":")[1];
        const url = 'https://research.hapilabs.one/v1/snap/' + contract_address + '/' + chain_id + '/' + user_address;
        let x = await fetch(url);
        let data = await x.json();
        console.log(data);

        if (data.status == "ok") {
          return {
            insights: {
              "Risk Score": data.data.risk.score,
              "Risk category": data.data.risk.category,
              "Type": data.data.type,
              "Public name": data.data.public_name,
              "Contract security": data.data.contract,
              "Token security": data.data.token
            }
          };
        } else if (data.status == 'error') {
          return {
            insights: {
              "Error": data.description
            }
          };
        } else {
          return {
            insights: {
              "Unknown Error": "An unknown error occured. Please contact the team and try again later."
            }
          };
        }
      };

      exports.onTransaction = onTransaction;
    }, {}]
  }, {}, [1])(1);
});
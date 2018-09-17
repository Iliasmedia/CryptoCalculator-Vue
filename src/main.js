// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ToggleButton from 'vue-js-toggle-button'
import round from 'vue-round-filter';

new Vue({
  filters: {
    round,
  },
});

Vue.use(ToggleButton)

Vue.config.productionTip = false

Vue.filter('currency', function (number) {

      let q = String(number),
          f = '',
          g = 0,
          s = (parseInt(q.length % 3) === 0) ? 3 : parseInt(q.length % 3);
      while (1) {
          if (q.substr(g, s) !== '') {
              f += q.substr(g, s) + ',';
              g += (g === 0) ? s : 3;
              s = 3;
          } else {
              break;
          }
      }
      return (f.substr(0, f.length - 1));

});
Vue.filter('percentage', function(value, decimals) {
  if(!value) {
    value = 0;
  }

  if(!decimals) {
    decimals = 0;
  }

  value = value * 100;
  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  value = value + '%';
  return value;
});


/**
 * Vue filter to round the decimal to the given place.
 * http://jsfiddle.net/bryan_k/3ova17y9/
 *
 * @param {String} value    The value string.
 * @param {Number} decimals The number of decimal places.
 */
Vue.filter('round', function(value, decimals) {
  if(!value) {
    value = 0;
  }

  if(!decimals) {
    decimals = 0;
  }

  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return value;
});

/* eslint-disable no-new */
new Vue({
  mode: History,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

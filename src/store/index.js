import Vue from 'vue'
import Vuex from 'vuex'
import reader from './reader'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      reader
    }
  })

  return Store
}

import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeLayers,
  FontAwesomeLayersText,
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import {
  faEyeSlash as freeFasFaEyeSlash,
  faEye as freeFasFaEye
} from '@fortawesome/free-solid-svg-icons'

library.add(
  freeFasFaEyeSlash,
  freeFasFaEye
)

config.autoAddCss = false

Vue.component('fontAwesomeIcon', FontAwesomeIcon)
Vue.component('fontAwesomeLayers', FontAwesomeLayers)
Vue.component('fontAwesomeLayersText', FontAwesomeLayersText)

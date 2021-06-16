import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)

const opts = {
    breakpoint: {
        thresholds: {
            xs: 0,
            sm: 476,
            md: 668,
            lg: 1000,
            xl: 1300
        }
    },
    theme: {
        themes: {
            light: {
                primary: '#3E3940',
                secondary: '#BFA473',
                accent: '#F2913D',
                error: '#F27141',
                info: '#A65B4B',
            },
            dark: {
                primary: colors.cyan.darken3,
            },
        },
    }
}

export default new Vuetify(opts)

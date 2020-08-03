import Vue from 'vue'
import { LsKeys } from '../enums'
import { FdzFundModel } from '../models'

// Get funds data from localstorage
const funds: FdzFundModel[] = []
if (localStorage && localStorage.getItem(LsKeys.Funds) !== null) {
  const str = localStorage.getItem(LsKeys.Funds)
  if (str) {
    JSON.parse(str).map((fund: FdzFundModel) => funds.push(fund))
  }
}

// Funds are set in simple store (vuex could be used for larger apps)
export const store = Vue.observable({ funds })

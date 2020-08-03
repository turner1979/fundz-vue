import Vue from 'vue'
import { FdzFundModel } from '@/models'
import { FdzLocalStorageService } from '@/services'

// Get funds data from localstorage
const funds: FdzFundModel[] = new FdzLocalStorageService().getFunds()

// Funds are set in simple store (vuex could be used for larger apps)
export const store = Vue.observable({ funds })

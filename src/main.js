//import vue from 'vue'
import {createApp} from 'vue'
import App from './App.vue'

import math from '@/modules/util/math.js'
import num from '@/modules/const/num.js'

import device from '@/game/config/device.js'

import globalVar from "@/modules/base/GlobalVar";

//앱 생성
const app = createApp(App);

//글로벌 객체 로딩
app.config.globalProperties.$math = math;
app.config.globalProperties.$num = num;

app.config.globalProperties.$res = {};

//device config 로딩
app.config.globalProperties.$device = device;

//class global 변수에 vue global 셋팅
globalVar.$vue = app.config.globalProperties;

//앱 실행
app.mount('#app')
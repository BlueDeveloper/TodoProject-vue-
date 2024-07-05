import {createApp} from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'


const app = createApp(App)
app.provide('today', new Date().toISOString().split('T')[0])
app.mount('#app')


/* filter 를 통한 구현 */
// 날짜가 지났지만 완료하지 않은 작업들
// 오늘 해야 할 작업들
// 오늘 해야 할 일들 중 완료한 작업들
// 모든 날을 아우르는 상태와 상관 없은 작업들


/* sort 기준 */
// 최근 날짜의 데이터가 더 위에(앞에) 나온다.
// 같은 날이라면 뒤늦게 입력한 데이터가 더 위에 나온다.
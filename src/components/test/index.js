/**
 * Created by ao.ma on 2022/01/10
 */

import tem from './test.html';
import testCtrl from './test';
import './test.less'


export default angular.module('test', [])
    .component('test', {
        testlate: tem,
        controller: testCtrl,
        controllerAs: 'ctrl'
    })
    .name;
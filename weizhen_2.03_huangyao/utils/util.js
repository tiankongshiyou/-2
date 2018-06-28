/**
 * 工具类统一暴露接口
 */
const formatTime = require('./formatTime.js');
const port = require('./port.js');
const modalBox = require('./modalBox.js');
const pullDownRefresh = require('./pullDownRefresh.js');
const createValidate = require('./createValidate.js');
const toChineseNum = require('./toChineseNum.js');
const log = require('./log.js');
const getLocation = require('./getLocation.js');

import wxValidate from './WxValidate';

module.exports = {
    formatTime: formatTime.formatTime,
    getDate: formatTime.getDate,
    replace:formatTime.replace,
    getPort:port.getPort,
    uploadImg:port.uploadImg,
    getImagePrefixHost:port.getImagePrefixHost,

    log:log.print_log,

    openToastSuccess:modalBox.openToastSuccess,
    openToastFail:modalBox.openToastFail,
    openConfirm:modalBox.openConfirm,
    openAlert:modalBox.openAlert,

    wxValidate:wxValidate,
    createValidate:createValidate,

    pullDownRefresh:pullDownRefresh,
    toChineseNum:toChineseNum,
    getLocation:getLocation

}

/**
 * LArea移动端城市选择控件
 * 
 * version:1.7.2
 * 
 * author:黄磊
 * 
 * git:https://github.com/xfhxbb/LArea
 * 
 * Copyright 2016
 * 
 * Licensed under MIT
 * 
 * 最近修改于： 2016-6-12 16:47:41
 */
window.LArea = (function () {
    var MobileArea = function () {
        this.gearArea;
        this.data;
        this.index = 0;
        this.value = [0, 0, 0];
        this.stopGear = true;
        this.rollTarget = null;
    }
    MobileArea.prototype = {
        init: function (params) {
            this.params = params;
            this.trigger = params.trigger;
            if (params.valueTo) {
                this.valueTo = document.querySelector(params.valueTo);
            }
            this.keys = params.keys;
            this.type = params.type || 1;
            this.maxLevel = params.maxLevel || 3;
            this.funcOK = params.funcOK;
            this.value = params.value || [0, 0, 0];
            this.parentNode = params.parentNode;
            switch (this.type) {
                case 1:
                case 2:
                    break;
                default:
                    throw new Error('错误提示: 没有这种数据源类型');
                    break;
            }
            if (this.trigger.lAreaSelect) {
                if (this.parentNode) {
                    this.parentNode.removeChild(this.trigger.lAreaSelect);
                } else {
                    this.trigger.lAreaSelect.parentNode.removeChild(this.trigger.lAreaSelect);
                }
                this.trigger.lAreaSelect = null;
            }
            this.bindEvent();
        },
        getData: function (callback) {
            var _self = this;
            if (typeof _self.params.data == "object") {
                _self.data = _self.params.data;
                callback();
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('get', _self.params.data);
                xhr.onload = function (e) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                        var responseData = JSON.parse(xhr.responseText);
                        _self.data = responseData.data;
                        if (callback) {
                            callback()
                        };
                    }
                }
                xhr.send();
            }
        },
        bindEvent: function () {
            var _self = this;
            //呼出插件
            function popupArea(e) {
                _self.gearArea = document.createElement("div");
                _self.gearArea.className = "gearArea";
                _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' +
                    '<div class="area_btn_box">' +
                    '<div class="area_btn larea_cancel">取消</div>' +
                    '<div class="area_btn larea_finish">确定</div>' +
                    '</div>' +
                    '<div class="area_roll_mask">' +
                    '<div class="area_roll">' +
                    '<div>' +
                    '<div class="gear area_province" data-areatype="area_province"></div>' +
                    '<div class="area_grid">' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear area_city" data-areatype="area_city"></div>' +
                    '<div class="area_grid">' +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<div class="gear area_county" data-areatype="area_county"></div>' +
                    '<div class="area_grid">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                if (_self.trigger.lAreaSelect){
                    if (_self.parentNode) {
                        _self.parentNode.replaceChild(_self.gearArea, _self.trigger.lAreaSelect);
                    } else {
                        _self.trigger.parentNode.replaceChild(_self.gearArea, _self.trigger.lAreaSelect);
                    }
                }
                else {
                    if (_self.parentNode) {
                        _self.parentNode.appendChild(_self.gearArea);
                    } else {
                        _self.trigger.parentNode.appendChild(_self.gearArea);
                    }
                }
                areaCtrlInit();
                var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
                larea_cancel.addEventListener('touchstart', function (e) {
                    _self.close(e);
                });
                _self.gearArea.addEventListener('click', function (e) {
                    if (e.target.classList.contains('gearArea')) {
                        _self.close(e);
                    }
                });
                var larea_finish = _self.gearArea.querySelector(".larea_finish");
                larea_finish.addEventListener('touchstart', function (e) {
                    _self.finish(e);
                });
                var area_province = _self.gearArea.querySelector(".area_province");
                var area_city = _self.gearArea.querySelector(".area_city");
                var area_county = _self.gearArea.querySelector(".area_county");
                area_province.addEventListener('touchstart', gearTouchStart);
                area_city.addEventListener('touchstart', gearTouchStart);
                area_county.addEventListener('touchstart', gearTouchStart);
                area_province.addEventListener('touchmove', gearTouchMove);
                area_city.addEventListener('touchmove', gearTouchMove);
                area_county.addEventListener('touchmove', gearTouchMove);
                area_province.addEventListener('touchend', gearTouchEnd);
                area_city.addEventListener('touchend', gearTouchEnd);
                area_county.addEventListener('touchend', gearTouchEnd);
                var columns = _self.gearArea.querySelectorAll('.area_roll > div');
                if (_self.maxLevel === 1) {
                    columns[2].style.display = "none";
                    columns[1].style.display = "none";
                } else if (_self.maxLevel === 2) {
                    columns[2].style.display = "none";
                }
                _self.trigger.lAreaSelect = _self.gearArea;
            }
            //初始化插件默认值
            function areaCtrlInit() {
                _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
                _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
                _self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);
                switch (_self.type) {
                    case 1:
                        _self.setGearTooth(_self.data);
                        break;
                    case 2:
                        _self.setGearTooth(_self.data[0]);
                        break;
                }
            }
            //触摸开始
            function gearTouchStart(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches[0].screenY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                }
                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
            }
            //手指移动
            function gearTouchMove(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                }
                target["new_" + target.id] = e.targetTouches[0].screenY;
                target["n_t_" + target.id] = (new Date()).getTime();
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
                if (e.targetTouches[0].screenY < 1) {
                    gearTouchEnd(e);
                };
            }
            //离开屏幕
            function gearTouchEnd(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                }
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (isNaN(flag)) {
                    flag = 0;
                }
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                }
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                }
                rollGear(target);
            }
            //缓动效果
            function rollGear(target) {
                _self.rollTarget = target;
                var d = 0;
                _self.stopGear = false;
                var pos = 0;
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function () {
                    //点击了取消或确定
                    if (!_self.gearArea) {
                        clearInterval(target["int_" + target.id]);
                    } else {
                        if (_self.stopGear) {
                            var b = Math.round(pos / 2) * 2;
                            pos = b;
                        } else {
                            pos = target["pos_" + target.id];
                            var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                            pos += speed;
                            if (Math.abs(speed) > 0.1) {} else {
                                var b = Math.round(pos / 2) * 2;
                                pos = b;
                                _self.setDuration();
                            }
                            if (pos > 0) {
                                pos = 0;
                                _self.setDuration();
                            }
                        }
                        var minTop = -(target.dataset.len - 1) * 2;
                        if (pos < minTop) {
                            pos = minTop;
                            _self.setDuration();
                        }
                        if (_self.stopGear) {
                            var gearVal = Math.abs(pos) / 2;
                            setGear(target, gearVal);
                            clearInterval(target["int_" + target.id]);
                        }
                        target["pos_" + target.id] = pos;
                        target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                        target.setAttribute('top', pos + 'em');
                        d++;
                    }
                }, 30);
            }
            //控制插件滚动后停留的值
            function setGear(target, val) {
                val = Math.round(val);
                target.setAttribute("val", val);
                switch (_self.type) {
                    case 1:
                        _self.setGearTooth(_self.data);
                        break;
                    case 2:
                        switch (target.dataset['areatype']) {
                            case 'area_province':
                                _self.setGearTooth(_self.data[0]);
                                break;
                            case 'area_city':
                                var ref = target.childNodes[val].getAttribute('ref');
                                var childData = [];
                                var nextData = _self.data[2];
                                for (var i in nextData) {
                                    if (i == ref) {
                                        childData = nextData[i];
                                        break;
                                    }
                                };
                                _self.index = 2;
                                _self.setGearTooth(childData);
                                break;
                        }
                }
            }
            _self.getData(function () {
                if (_self.trigger.popupArea) {
                    _self.trigger.removeEventListener('click', _self.trigger.popupArea);
                }
                _self.trigger.popupArea = popupArea;
                _self.trigger.addEventListener('click', popupArea);
            });
        },
        setDuration: function () {
            var _self = this;
            _self.rollTarget.style.webkitTransitionDuration = _self.rollTarget.style.transitionDuration = '200ms';
            _self.stopGear = true;
        },
        //重置节点个数
        setGearTooth: function (data) {
            var _self = this;
            if (!_self.gearArea) {
                return;
            }
            var item = data || [];
            var l = item.length;
            var gearChild = _self.gearArea.querySelectorAll(".gear");
            var gearVal = gearChild[_self.index].getAttribute('val');
            var maxVal = l - 1;
            if (gearVal > maxVal) {
                gearVal = maxVal;
            }
            gearChild[_self.index].setAttribute('data-len', l);
            if (l > 0) {
                var id = item[gearVal][this.keys['id']];
                var childData;
                switch (_self.type) {
                    case 1:
                        childData = item[gearVal].children
                        break;
                    case 2:
                        var nextData = _self.data[_self.index + 1]
                        for (var i in nextData) {
                            if (i == id) {
                                childData = nextData[i];
                                break;
                            }
                        };
                        break;
                }
                var itemStr = "";
                for (var i = 0; i < l; i++) {
                    itemStr += "<div class='tooth'  ref='" + item[i][this.keys['id']] + "'>" + item[i][this.keys['name']] + "</div>";
                }
                gearChild[_self.index].innerHTML = itemStr;
                gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
                gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
                gearChild[_self.index].setAttribute('val', gearVal);
                _self.index++;
                if (_self.index > 2) {
                    _self.index = 0;
                    return;
                }
                _self.setGearTooth(childData);
            } else {
                gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
                gearChild[_self.index].setAttribute('val', 0);
                if (_self.index == 1) {
                    gearChild[2].innerHTML = "<div class='tooth'></div>";
                    gearChild[2].setAttribute('val', 0);
                }
                _self.index = 0;
            }
        },
        finish: function (e) {
            var _self = this;
            //设置缓动停止
            if (!_self.stopGear) {
                _self.setDuration();
            }
            setTimeout(function () {
                var area_province = _self.gearArea.querySelector(".area_province");
                var area_city = _self.gearArea.querySelector(".area_city");
                var area_county = _self.gearArea.querySelector(".area_county");
                var provinceVal = parseInt(area_province.getAttribute("val"));
                var provinceText = area_province.childNodes[provinceVal].textContent;
                var provinceCode = area_province.childNodes[provinceVal].getAttribute('ref');
                var cityVal = parseInt(area_city.getAttribute("val"));
                var cityText = area_city.childNodes[cityVal].textContent;
                var cityCode = area_city.childNodes[cityVal].getAttribute('ref');
                var countyVal = parseInt(area_county.getAttribute("val"));
                var countyText = area_county.childNodes[countyVal].textContent;
                var countyCode = area_county.childNodes[countyVal].getAttribute('ref');
                _self.trigger.value = provinceText + ((cityText) ? (',' + cityText) : ('')) + ((countyText) ? (',' + countyText) : (''));
                _self.value = [provinceVal, cityVal, countyVal];
                // var result = provinceCode +((cityCode)?(',' + cityCode):('')) + ((countyCode)?(',' + countyCode):(''));
                //查询结果
                var result = {
                    'level1': null,
                    'level2': null,
                    'level3': null,
                };
                if (provinceCode) {
                    [].forEach.call(_self.data, function (firstLevelData) {
                        if (firstLevelData[_self.keys.id] === provinceCode) {
                            result.level1 = firstLevelData;
                            return false;
                        }
                    });
                }
                if (cityCode && result.level1.children && result.level1.children.length > 0) {
                    [].forEach.call(result.level1.children, function (secondLevelData) {
                        if (secondLevelData[_self.keys.id] === cityCode) {
                            result.level2 = secondLevelData;
                            return false;
                        }
                    });
                }
                if (countyCode && result.level2.children && result.level2.children.length > 0) {
                    [].forEach.call(result.level2.children, function (thirdLevelData) {
                        if (thirdLevelData[_self.keys.id] === countyCode) {
                            result.level3 = thirdLevelData;
                            return false;
                        }
                    });
                }
                if (_self.valueTo) {
                    _self.valueTo.value = result;
                }
                if (_self.funcOK) {
                    _self.funcOK(result);
                }
            }, 30);
            _self.close(e);
        },
        close: function (e) {
            e.preventDefault();
            var _self = this;
            var evt = new CustomEvent('input');
            _self.trigger.dispatchEvent(evt);
            _self.gearArea.style.display = 'none';
            setTimeout(function () {
                _self.gearArea = null;
            }, 30);
        }
    }
    return MobileArea;
})()
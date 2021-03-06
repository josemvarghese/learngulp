(function(t) {
    "use strict";
    var e = "ngMaterialDatePicker";
    var a = {
        DATE: 0,
        HOUR: 1,
        MINUTE: 2
    };
    var i = function(t, e) {
        if ("jQuery" in window) {
            return jQuery(t).css(e)
        } else {
            t = angular.element(t);
            return "getComputedStyle" in window ? window.getComputedStyle(t[0])[e] : t.css(e)
        }
    };
    var r = '<md-dialog class="dtp" layout="column" style="width: 300px;">' + '    <md-dialog-content class="dtp-content">' + '        <div class="dtp-date-view">' + '            <header class="dtp-header">' + '                <div class="dtp-actual-day" ng-show="picker.dateMode">{{picker.currentDate.format("dddd")}}</div>' + '                <div class="dtp-actual-day" ng-show="picker.timeMode">{{picker.params.shortTime ? picker.currentDate.format("A") : " "}}</div>' + '                <div class="dtp-close text-right">' + '                    <!-- a href="#" mdc-dtp-noclick ng-click="picker.hide()">&times;</a -->' + "                </div>" + "            </header>" + '            <div class="dtp-date" ng-show="picker.params.date">' + '                <div layout="column">' + '                    <div class="dtp-actual-month">{{picker.currentDate.format("MMM") | uppercase}}</div>' + "                </div>" + '                <div class="dtp-actual-num">{{picker.currentDate.format("DD")}}</div>' + '                <div layout="column">' + '                    <div class="dtp-actual-year">{{picker.currentDate.format("YYYY")}}</div>' + "                </div>" + "            </div>" + '            <div class="dtp-time" ng-show="picker.params.time && !picker.params.date">' + '                <div class="dtp-actual-maxtime">{{picker.currentNearest5Minute().format(picker.params.shortTime ? "hh:mm" : "HH:mm")}}</div>' + "            </div>" + '            <div class="dtp-picker">' + '                <mdc-datetime-picker-calendar date="picker.currentDate" picker="picker" class="dtp-picker-calendar" ng-show="picker.currentView === picker.VIEWS.DATE"></mdc-datetime-picker-calendar>' + '                <div class="dtp-picker-datetime" ng-show="picker.currentView !== picker.VIEWS.DATE">' + '                    <div class="dtp-actual-meridien">' + '                        <div class="left p20">' + '                            <a href="#" mdc-dtp-noclick class="dtp-meridien-am" ng-class="{selected: picker.meridien == \'AM\'}" ng-click="picker.selectAM()">{{picker.params.amText}}</a>' + "                        </div>" + '                        <div ng-show="!picker.timeMode" class="dtp-actual-time p60">{{picker.currentNearest5Minute().format(picker.params.shortTime ? "hh:mm" : "HH:mm")}}</div>' + '                        <div class="right p20">' + '                            <a href="#" mdc-dtp-noclick class="dtp-meridien-pm" ng-class="{selected: picker.meridien == \'PM\'}" ng-click="picker.selectPM()">{{picker.params.pmText}}</a>' + "                        </div>" + '                        <div class="clearfix"></div>' + "                    </div>" + '                    <mdc-datetime-picker-clock mode="hours" ng-if="picker.currentView === picker.VIEWS.HOUR"></mdc-datetime-picker-clock>' + '                    <mdc-datetime-picker-clock mode="minutes" ng-if="picker.currentView === picker.VIEWS.MINUTE"></mdc-datetime-picker-clock>' + "                </div>" + "            </div>" + "        </div>" + "    </md-dialog-content>" + '    <md-dialog-actions class="dtp-buttons">' + '            <md-button class="dtp-btn-cancel md-button ng-hide" ng-click="picker.cancel()"> {{picker.params.cancelText}}</md-button>' + '            <md-button class="dtp-btn-ok md-button" ng-click="picker.ok()"> {{picker.params.okText}}</md-button>' + "      </md-dialog-actions>" + "</md-dialog>";
    angular.module(e, ["ngMaterial"]).provider("mdcDatetimePickerDefaultLocale", function() {
        this.locale = "en";
        this.$get = function() {
            return this.locale
        };
        this.setDefaultLocale = function(t) {
            this.locale = t
        }
    }).directive("mdcDatetimePicker", ["$mdDialog", function(e) {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                currentDate: "=ngModel",
                time: "=",
                date: "=",
                minDate: "=",
                maxDate: "=",
                shortTime: "=",
                format: "@",
                cancelText: "@",
                okText: "@",
                lang: "@",
                amText: "@",
                pmText: "@"
            },
            link: function(a, i, s, c) {

                var l = false;
                if (!a.format) {
                    if (a.date && a.time) {
                        a.format = "YYYY-MM-DD HH:mm:ss"
                    } else if (a.date) {
                        a.format = "YYYY-MM-DD"
                    } else {
                        a.format = "HH:mm"
                    }
                }
                if (angular.isString(a.currentDate) && a.currentDate !== "") {
                    a.currentDate = t(a.currentDate, a.format)
                }
                if (c) {
                    c.$formatters.push(function(e) {
                        var i = t(e);
                        return i.isValid() ? i.format(a.format) : ""
                    })
                }
                i.attr("readonly", "");
                i.on("focus", function(t) {
                    t.preventDefault();
                    i.blur();
                    if (l) {
                        return
                    }
                    l = true;
                    var c = {};
                    for (var o in s) {
                        if (a.hasOwnProperty(o) && !angular.isUndefined(a[o])) {
                            c[o] = a[o]
                        }
                    }
                    c.currentDate = a.currentDate;
                    var u = {
                        options: c
                    };
                    e.show({
                        template: r,
                        controller: n,
                        controllerAs: "picker",
                        locals: u,
                        openFrom: i,
                        parent: angular.element(document.body),
                        bindToController: true,
                        disableParentScroll: false
                    }).then(function(t) {
                        a.currentDate = t ? t._d : t;
                        l = false
                    }, function() {
                        l = false
                    })
                })
            }
        }
    }]);
    var n = function(t, e, i) {
        this.currentView = a.DATE;
        this._dialog = e;
        this.minDate;
        this.maxDate;
        this._attachedEvents = [];
        this.VIEWS = a;
        this.params = {
            date: true,
            time: true,
            format: "YYYY-MM-DD",
            minDate: null,
            maxDate: null,
            currentDate: null,
            lang: i,
            weekStart: 0,
            shortTime: false,
            cancelText: "Cancel",
            okText: "OK",
            amText: "AM",
            pmText: "PM"
        };
        this.meridien = "AM";
        this.params = angular.extend(this.params, this.options);
        this.init()
    };
    n.$inject = ["$scope", "$mdDialog", "mdcDatetimePickerDefaultLocale"];
    n.prototype = {
        init: function() {
            this.timeMode = this.params.time && !this.params.date;
            this.dateMode = this.params.date;
            this.initDates();
            this.start()
        },
        currentNearest5Minute: function() {
            var e = this.currentDate || t();
            var a = 5 * Math.round(e.minute() / 5);
            if (a >= 60) {
                a = 55
            }
            return t(e).minutes(a)
        },
        initDates: function() {
            var e = this;
            var a = function(a, i) {
                var r = null;
                if (angular.isDefined(a) && a !== null && a !== "") {
                    if (angular.isString(a)) {
                        if (typeof e.params.format !== "undefined" && e.params.format !== null) {
                            r = t(a, e.params.format).locale(e.params.lang)
                        } else {
                            r = t(a).locale(e.params.lang)
                        }
                    } else {
                        if (angular.isDate(a)) {
                            var n = a.getTime();
                            r = t(n, "x").locale(e.params.lang)
                        } else if (a._isAMomentObject) {
                            r = a
                        }
                    }
                } else {
                    r = i
                }
                return r
            };
            this.currentDate = a(this.params.currentDate, t());
            this.minDate = a(this.params.minDate);
            this.maxDate = a(this.params.maxDate);
            this.selectDate(this.currentDate)
        },
        initDate: function(t) {
            this.currentView = a.DATE
        },
        initHours: function() {
            this.currentView = a.HOUR
        },
        initMinutes: function() {
            this.currentView = a.MINUTE
        },
        isAfterMinDate: function(e, a, i) {
            var r = true;
            if (typeof this.minDate !== "undefined" && this.minDate !== null) {
                var n = t(this.minDate);
                var s = t(e);
                if (!a && !i) {
                    n.hour(0);
                    n.minute(0);
                    s.hour(0);
                    s.minute(0)
                }
                n.second(0);
                s.second(0);
                n.millisecond(0);
                s.millisecond(0);
                if (!i) {
                    s.minute(0);
                    n.minute(0);
                    r = parseInt(s.format("X")) >= parseInt(n.format("X"))
                } else {
                    r = parseInt(s.format("X")) >= parseInt(n.format("X"))
                }
            }
            return r
        },
        isBeforeMaxDate: function(e, a, i) {
            var r = true;
            //console.log(this.maxDate);
            if (typeof this.maxDate !== "undefined" && this.maxDate !== null) {
                var n = t(this.maxDate);
                var s = t(e);
                if (!a && !i) {
                    n.hour(0);
                    n.minute(0);
                    s.hour(0);
                    s.minute(0)
                }
                n.second(0);
                s.second(0);
                n.millisecond(0);
                s.millisecond(0);
                if (!i) {
                    s.minute(0);
                    n.minute(0);
                    r = parseInt(s.format("X")) <= parseInt(n.format("X"))
                } else {
                    r = parseInt(s.format("X")) <= parseInt(n.format("X"))
                }
            }
            //console.log(r);
            return r
        },
        selectDate: function(e) {
            if (e) {
                this.currentDate = t(e);
                if (!this.isAfterMinDate(this.currentDate)) {
                    this.currentDate = t(this.minDate)
                }
                if (!this.isBeforeMaxDate(this.currentDate)) {
                    this.currentDate = t(this.maxDate)
                }
                this.currentDate.locale(this.params.lang);
                this.calendarStart = t(this.currentDate);
                this.meridien = this.currentDate.hour() >= 12 ? "PM" : "AM"
            }
        },
        setName: function() {
            var t = "";
            var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var a = 0; a < 5; a++) {
                t += e.charAt(Math.floor(Math.random() * e.length))
            }
            return t
        },
        isPM: function() {
            return this.meridien === "PM"
        },
        isPreviousMonthVisible: function() {
            return this.calendarStart && this.isAfterMinDate(t(this.calendarStart).startOf("month"), false, false)
        },
        isNextMonthVisible: function() {
            return this.calendarStart && this.isBeforeMaxDate(t(this.calendarStart).endOf("month"), false, false)
        },
        isPreviousYearVisible: function() {
            return this.calendarStart && this.isAfterMinDate(t(this.calendarStart).startOf("year"), false, false)
        },
        isNextYearVisible: function() {
            return this.calendarStart && this.isBeforeMaxDate(t(this.calendarStart).endOf("year"), false, false)
        },
        isHourAvailable: function(e) {
            var a = t(this.currentDate);
            a.hour(this.convertHours(e)).minute(0).second(0);
            return this.isAfterMinDate(a, true, false) && this.isBeforeMaxDate(a, true, false)
        },
        isMinuteAvailable: function(e) {
            var a = t(this.currentDate);
            a.minute(e).second(0);
            return this.isAfterMinDate(a, true, true) && this.isBeforeMaxDate(a, true, true)
        },
        start: function() {
            this.currentView = a.DATE;
            if (this.params.date) {
                this.initDate()
            } else {
                if (this.params.time) {
                    this.initHours()
                }
            }
        },
        ok: function() {
            switch (this.currentView) {
                case a.DATE:
                    if (this.params.time === true) {
                        this.initHours()
                    } else {
                        this.hide(true)
                    }
                    break;
                case a.HOUR:
                    this.initMinutes();
                    break;
                case a.MINUTE:
                    if(this.minDate!=undefined && this.minDate!=null && this.minDate!='' ){
                       // console.log(this.currentDate);
                        if(!this.isAfterMinDate(this.currentDate,true,true)) {
                               this.currentDate = t(this.minDate);
                        }
                    };
                    this.hide(true);
                    break
            }
        },
        cancel: function() {
            if (this.params.time) {
                switch (this.currentView) {
                    case a.DATE:
                        this.hide();
                        break;
                    case a.HOUR:
                        if (this.params.date) {
                            this.initDate()
                        } else {
                            this.hide()
                        }
                        break;
                    case a.MINUTE:
                        this.initHours();
                        break
                }
            } else {
                this.hide()
            }
        },
        selectMonthBefore: function() {
            this.calendarStart.subtract(1, "months")
        },
        selectMonthAfter: function() {
            this.calendarStart.add(1, "months")
        },
        selectYearBefore: function() {
            this.calendarStart.subtract(1, "years")
        },
        selectYearAfter: function() {
            this.calendarStart.add(1, "years")
        },
        selectAM: function() {
            if (this.isHourAvailable(0) || this.isHourAvailable(12)) {
                if (this.currentDate.hour() >= 12) {
                    this.selectDate(this.currentDate.subtract(12, "hours"))
                }
                if (!this.isHourAvailable(this.currentDate.hour())) {
                    this.selectDate(this.currentDate.hour(this.minDate.hour()))
                }
                if (!this.isMinuteAvailable(this.currentDate.minute())) {
                    this.selectDate(this.currentDate.minute(this.minDate.minute()))
                }
            }
        },
        selectPM: function() {
            if (this.isHourAvailable(13) || this.isHourAvailable(24)) {
                if (this.currentDate.hour() < 12) {
                    this.selectDate(this.currentDate.add(12, "hours"))
                }
                if (!this.isHourAvailable(this.currentDate.hour())) {
                    this.selectDate(this.currentDate.hour(this.maxDate.hour()))
                }
                if (!this.isMinuteAvailable(this.currentDate.minute())) {
                    this.selectDate(this.currentDate.minute(this.maxDate.minute()))
                }
            }
        },
        convertHours: function(t) {
            var e = t;
            if (t < 12 && this.isPM()) e += 12;
            return e
        },
        hide: function(t) {
            if (t) {
                this._dialog.hide(this.currentDate)
            } else {
                this._dialog.cancel()
            }
        }
    };
    angular.module(e).directive("mdcDatetimePickerCalendar", [function() {
        var e = t(),
            a = 1900,
            i = 2100,
            r = (i - a + 1) * 12,
            n = 240,
            s = [];
        for (var c = 0; c < r; c++) {
            s.push(c)
        }
        var l = function(t) {
            var e = t.year();
            var i = t.month();
            return (e - a) * 12 + i - 1
        };
        return {
            restrict: "E",
            scope: {
                picker: "=",
                date: "="
            },
            bindToController: true,
            controllerAs: "cal",
            controller: ["$scope", function(e) {
                var i = this,
                    n = this.picker,
                    c = [];
                for (var o = n.params.weekStart; c.length < 7; o++) {
                    if (o > 6) {
                        o = 0
                    }
                    c.push(o.toString())
                }
                i.week = c;
                if (!n.maxDate && !n.minDate) {
                    i.months = s
                } else {
                    var u = n.minDate ? l(n.minDate) : 0;
                    var d = n.maxDate ? l(n.maxDate) + 1 : r;
                    i.months = s.slice(u, d)
                }
                i.getItemAtIndex = function(e) {
                    var i = (e + 1) % 12 || 12;
                    var r = a + Math.floor(e / 12);
                    var s = t(n.currentDate).year(r).month(i);
                    return m(s)
                };
                i.topIndex = l(n.currentDate) - i.months[0];
                var m = function(e) {
                    var a = {};
                    if (e !== null) {
                        a.name = e.format("MMMM YYYY");
                        var r = t(e).locale(n.params.lang).startOf("month").hour(e.hour()).minute(e.minute());
                        var s = r.format("d");
                        a.days = [];
                        for (var c = r.date(); c <= r.daysInMonth(); c++) {
                            if (c === r.date()) {
                                var l = i.week.indexOf(s.toString());
                                if (l > 0) {
                                    for (var o = 0; o < l; o++) {
                                        a.days.push(0)
                                    }
                                }
                            }
                            a.days.push(t(r).locale(n.params.lang).date(c))
                        }
                        var u = 7,
                            d = [],
                            m = Math.ceil(a.days.length / u);
                        for (var h = 0; h < m; h++) {
                            d.push(a.days.slice(h * u, (h + 1) * u))
                        }
                        a.days = d;
                        return a
                    }
                };
                i.toDay = function(e) {
                    return t(parseInt(e), "d").locale(n.params.lang).format("dd").substring(0, 1)
                };
                i.isInRange = function(e) {
                    return n.isAfterMinDate(t(e), false, false) && n.isBeforeMaxDate(t(e), false, false)
                };
                i.selectDate = function(e) {
                    if (e) {
                        if (i.isSelectedDay(e)) {
                            return n.ok()
                        }
                        n.selectDate(t(e).hour(i.date.hour()).minute(i.date.minute()))
                    }
                };
                i.isSelectedDay = function(t) {
                    return t && i.date.date() === t.date() && i.date.month() === t.month() && i.date.year() === t.year()
                }
            }],
            template: '<a ng-click="topindex=topindex-1" ng-hide="topindex==0">left</a><a ng-click="topindex=topindex+1" ng-hide="topindex==cal.months.length">right</a><md-virtual-repeat-container class="months" md-top-index="topindex" ng-init="i=0;topindex=0;">' + '<div md-virtual-repeat="idx in cal.months" md-start-index="cal.topIndex" md-item-size="' + n + '" >' + '<div mdc-datetime-picker-calendar-month idx="idx" ></div>' + "</div>" + "</md-virtual-repeat-container>"
        }
    }]).directive("mdcDatetimePickerCalendarMonth", ["$compile", function(t) {
        var e = function(e, a) {
            var i = angular.element(e[0].querySelector("tbody"));
            var r = a.cal,
                n = a.month;
            i.html("");
            n.days.forEach(function(t, e) {
                var a = angular.element("<tr></tr>");
                t.forEach(function(t, i) {
                    var n = angular.element("<td> </td>");
                    if (t) {
                        var s;
                        if (r.isInRange(t)) {
                            var c = 'month["days"][' + e + "][" + i + "]";
                            s = angular.element("<a href='#' mdc-dtp-noclick></a>").attr("ng-class", "{selected: cal.isSelectedDay(" + c + ")}").attr("ng-click", "cal.selectDate(" + c + ")")
                        } else {
                            s = angular.element("<span></span>")
                        }
                        s.addClass("dtp-select-day").html(t.format("D"));
                        n.append(s)
                    }
                    a.append(n)
                });
                i.append(a)
            });
            t(i)(a)
        };
        return {
            scope: {
                idx: "="
            },
            require: "^mdcDatetimePickerCalendar",
            restrict: "AE",
            template: '<div class="dtp-picker-month">{{month.name}}</div>' + '<table class="table dtp-picker-days">' + "    <thead>" + "    <tr>" + '        <th ng-repeat="day in cal.week">{{cal.toDay(day)}}</th>' + "    </tr>" + "    </thead>" + "    <tbody>" + "    </tbody>" + "</table>",
            link: function(t, a, i, r) {
                t.cal = r;
                t.month = r.getItemAtIndex(parseInt(t.idx));
                e(a, t);
                t.$watch(function() {
                    return t.idx
                }, function(i, n) {
                    if (i != n) {
                        t.month = r.getItemAtIndex(parseInt(t.idx));
                        e(a, t)
                    }
                })
            }
        }
    }]);
    angular.module(e).directive("mdcDtpNoclick", function() {
        return {
            link: function(t, e) {
                e.on("click", function(t) {
                    t.preventDefault()
                })
            }
        }
    });
    angular.module(e).directive("mdcDatetimePickerClock", [function() {
        var t = '<div class="dtp-picker-clock"><span ng-if="!points || points.length < 1">&nbsp;</span>' + '<div ng-repeat="point in points" class="dtp-picker-time" style="margin-left: {{point.left}}px; margin-top: {{point.top}}px;">' + '   <a href="#" mdc-dtp-noclick ng-class="{selected: point.value===currentValue}" class="dtp-select-hour" ng-click="setTime(point.value)" ng-if="pointAvailable(point)">{{point.display}}</a>' + '   <a href="#" mdc-dtp-noclick class="disabled dtp-select-hour" ng-if="!pointAvailable(point)">{{point.display}}</a>' + "</div>" + '<div class="dtp-hand dtp-hour-hand"></div>' + '<div class="dtp-hand dtp-minute-hand"></div>' + '<div class="dtp-clock-center"></div>' + "</div>";
        return {
            restrict: "E",
            template: t,
            link: function(t, e, a) {
                var r = a.mode === "minutes";
                var n = t.picker;
                var s = document.querySelector("md-dialog.dtp");
                var c = function() {
                    var a = angular.element(e[0].querySelector(".dtp-picker-clock")),
                        c = angular.element(s.querySelector(".dtp-picker"));
                    var o = s.querySelector(".dtp-content").offsetWidth;
                    var d = parseInt(i(c, "paddingLeft").replace("px", "")) || 0;
                    var m = parseInt(i(c, "paddingRight").replace("px", "")) || 0;
                    var h = parseInt(i(a, "marginLeft").replace("px", "")) || 0;
                    var p = parseInt(i(a, "marginRight").replace("px", "")) || 0;
                    var f = o - (h + p + d + m);
                    a.css("width", f + "px");
                    var v = parseInt(i(c, "paddingLeft").replace("px", "")) || 0;
                    var D = parseInt(i(c, "paddingTop").replace("px", "")) || 0;
                    var g = parseInt(i(a, "marginLeft").replace("px", "")) || 0;
                    var k = parseInt(i(a, "marginTop").replace("px", "")) || 0;
                    var M = f / 2;
                    var x = M / 1.2;
                    var y = [];
                    for (var b = 0; b < 12; ++b) {
                        var A = x * Math.sin(Math.PI * 2 * (b / 12));
                        var T = x * Math.cos(Math.PI * 2 * (b / 12));
                        var I = {
                            left: M + A + v / 2 - (v + g),
                            top: M - T - k / 2 - (D + k),
                            value: r ? b * 5 : b
                        };
                        if (r) {
                            I.display = I.value < 10 ? "0" + I.value : I.value
                        } else {
                            if (n.params.shortTime) {
                                I.display = b === 0 ? 12 : b
                            } else {
                                I.display = n.isPM() ? b + 12 : b
                            }
                        }
                        y.push(I)
                    }
                    t.points = y;
                    u();
                    a.css("height", f + "px");
                    var S = e[0].querySelector(".dtp-clock-center");
                    var w = S.offsetWidth / 2 || 7.5,
                        H = S.offsetHeight / 2 || 7.5;
                    var P = M / 1.8;
                    var E = M / 1.5;
                    angular.element(e[0].querySelector(".dtp-hour-hand")).css({
                        left: M + g * 1.5 + "px",
                        height: P + "px",
                        marginTop: M - P - v + "px"
                    }).addClass(!r ? "on" : "");
                    angular.element(e[0].querySelector(".dtp-minute-hand")).css({
                        left: M + g * 1.5 + "px",
                        height: E + "px",
                        marginTop: M - E - v + "px"
                    }).addClass(r ? "on" : "");
                    angular.element(S).css({
                        left: M + v + g - w + "px",
                        marginTop: M - g / 2 - H + "px"
                    });
                    l()
                };
                var l = function() {
                    var t = n.currentNearest5Minute();
                    var a = t.hour();
                    var i = t.minute();
                    o(angular.element(e[0].querySelector(".dtp-hour-hand")), 360 / 12 * a);
                    var r = 360 / 60 * (5 * Math.round(i / 5));
                    o(angular.element(e[0].querySelector(".dtp-minute-hand")), r)
                };
                var o = function(t, e) {
                    angular.element(t).css({
                        WebkitTransform: "rotate(" + e + "deg)",
                        "-moz-transform": "rotate(" + e + "deg)"
                    })
                };
                var u = function() {
                    var e = n.currentNearest5Minute();
                    t.currentValue = r ? e.minute() : e.hour() % 12
                };
                t.$watch(function() {
                    var t = n.currentNearest5Minute();
                    return t ? t.format("HH:mm") : ""
                }, function(t) {
                    u();
                    l()
                });
                var d = function(t, e) {
                    for (var a = 0; a < e.length; a++) {
                        e[a].display = a;
                        if (t) {
                            e[a].display += 12
                        }
                    }
                    return e
                };
                if (!n.params.shortTime) {
                    t.$watch("picker.meridien", function() {
                        if (!r) {
                            if (t.points) {
                                var e = d(n.isPM(), angular.copy(t.points));
                                t.points = e
                            }
                        }
                    })
                }
                t.setTime = function(e) {
                    if (e === t.currentValue) {
                        n.ok()
                    }
                    if (!r) {
                        n.currentDate.hour(n.isPM() ? e + 12 : e)
                    } else {
                        n.currentDate.minute(e)
                    }
                    n.currentDate.second(0)
                };
                t.pointAvailable = function(t) {
                    return r ? n.isMinuteAvailable(t.value) : n.isHourAvailable(t.value)
                };
                var m = t.$watch(function() {
                    return e[0].querySelectorAll("div").length
                }, function() {
                    c();
                    m()
                })
            }
        }
    }])
})(moment);

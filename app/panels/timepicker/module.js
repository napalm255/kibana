/*! kibana - v3.1.1 - 2014-10-02
 * Copyright (c) 2014 Rashid Khan; Licensed Apache License */

define("panels/timepicker/module",["angular","app","lodash","moment","kbn"],function(a,b,c,d,e){var f=a.module("kibana.panels.timepicker",[]);b.useModule(f),f.controller("timepicker",["$scope","$modal","$q","filterSrv",function(a,b,f,g){a.panelMeta={status:"Stable",description:"A panel for controlling the time range filters. If you have time based data,  or if you're using time stamped indices, you need one of these"};var h={status:"Stable",time_options:["5m","15m","1h","6h","12h","24h","2d","7d","30d"],refresh_intervals:["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"],timefield:"@timestamp"};c.defaults(a.panel,h);var i=b({template:"./app/panels/timepicker/custom.html",persist:!0,show:!1,scope:a,keyboard:!1});a.filterSrv=g,a.patterns={date:/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,hour:/^([01]?[0-9]|2[0-3])$/,minute:/^[0-5][0-9]$/,second:/^[0-5][0-9]$/,millisecond:/^[0-9]*$/},a.$on("refresh",function(){a.init()}),a.init=function(){var b=g.timeRange("last");b&&(a.panel.now="now"===g.timeRange(!1).to?!0:!1,a.time=l(b.from,b.to))},a.customTime=function(){a.input.$setValidity("dummy",!0),a.temptime=k(a.time),a.temptime.from.date.setHours(0,0,0,0),a.temptime.to.date.setHours(0,0,0,0),(new Date).getTimezoneOffset()<0&&(a.temptime.from.date=d(a.temptime.from.date).add("days",1).toDate(),a.temptime.to.date=d(a.temptime.to.date).add("days",1).toDate()),f.when(i).then(function(a){a.modal("show")})},a.validate=function(b){a.input.$setValidity("dummy",!0);var c=n(b.from.date),d=n(b.to.date),e=b;return a.input.$valid?(c.setHours(e.from.hour,e.from.minute,e.from.second,e.from.millisecond),d.setHours(e.to.hour,e.to.minute,e.to.second,e.to.millisecond),isNaN(c.getTime())||isNaN(d.getTime())||c.getTime()>=d.getTime()?(a.input.$setValidity("dummy",!1),!1):{from:c,to:d}):!1},a.setNow=function(){a.time.to=m(new Date)},a.setAbsoluteTimeFilter=function(b){var d=c.clone(b);return d.type="time",d.field=a.panel.timefield,a.panel.now&&(d.to="now"),g.removeByType("time",!0),a.panel.filter_id=g.set(d),a.time=l(b.from,b.to),a.panel.filter_id},a.setRelativeFilter=function(b){a.panel.now=!0;var c={type:"time",field:a.panel.timefield,from:"now-"+b,to:"now"};return g.removeByType("time",!0),a.panel.filter_id=g.set(c),a.time=l(e.parseDate(c.from),new Date),a.panel.filter_id};var j=function(a,b,c){return c=c||"0",a+="",a.length>=b?a:new Array(b-a.length+1).join(c)+a},k=function(a){var b={from:c.clone(a.from),to:c.clone(a.to)};return b.from.date=new Date(b.from.date),b.to.date=new Date(b.to.date),b},l=function(a,b){return{from:m(a),to:m(b)}},m=function(a){return{date:new Date(a),hour:j(a.getHours(),2),minute:j(a.getMinutes(),2),second:j(a.getSeconds(),2),millisecond:j(a.getMilliseconds(),3)}},n=function(a){return a=d(a).clone().toDate(),d(new Date(a.getTime()+6e4*a.getTimezoneOffset())).toDate()}}])});
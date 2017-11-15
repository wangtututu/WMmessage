var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 2014/8/2.
 */
var EventCenter = (function () {
    function EventCenter() {
    }
    EventCenter.addEventListener = function (eventType, callback, thisObj) {
        if (!this.eventDic[eventType])
            this.eventDic[eventType] = [];
        if (!this.hasEventListener(eventType, callback, thisObj))
            this.eventDic[eventType].push({ "this": thisObj, "fun": callback });
    };
    EventCenter.hasEventListener = function (eventType, call, thisObj) {
        if (!this.eventDic[eventType])
            return false;
        for (var i; i < this.eventDic[eventType].length; i++) {
            if (this.eventDic[eventType][i].fun == call && this.eventDic[eventType][i].this == thisObj)
                return true;
        }
        return false;
    };
    EventCenter.removeEventListener = function (eventType, callback, thisObj) {
        var _this = this;
        if (this.eventDic[eventType]) {
            this.eventDic[eventType].forEach(function (obj, index) {
                if (obj.fun == callback && obj.this == thisObj) {
                    _this.eventDic[eventType].splice(index, 1);
                    return;
                }
            });
        }
    };
    EventCenter.getEventIndex = function (eventType, call, thisObj) {
        if (!this.eventDic[eventType])
            return -1;
        for (var i; i < this.eventDic[eventType].length; i++) {
            if (this.eventDic[eventType][i].fun == call && this.eventDic[eventType][i].this == thisObj)
                return i;
        }
        return -1;
    };
    EventCenter.dispatchEvent = function (gameEvent) {
        if (this.eventDic[gameEvent.type]) {
            var eventObj;
            for (var fun in this.eventDic[gameEvent.type]) {
                eventObj = this.eventDic[gameEvent.type][fun];
                eventObj.fun.call(eventObj.this, gameEvent.eventBody);
            }
        }
        if (this.queEventDic[gameEvent.type]) {
            this.queEvents.push(gameEvent);
            if (!this.isQueRuning) {
                this.exeNextEvent();
            }
        }
    };
    EventCenter.dispatchWith = function (type, data) {
        EventCenter.dispatchEvent(new GameEvent(type, data));
    };
    EventCenter.addQueEventListener = function (eventType, callback, thisObj) {
        if (!this.queEventDic[eventType])
            this.queEventDic[eventType] = [];
        if (!this.hasEventListener(eventType, callback, thisObj))
            this.queEventDic[eventType].push({ "this": thisObj, "fun": callback });
    };
    EventCenter.exeNextEvent = function () {
        this.isQueRuning = true;
        if (this.queEvents.length) {
            var gameEvent = this.queEvents.shift();
            var eventObj;
            for (var fun in this.queEventDic[gameEvent.type]) {
                eventObj = this.queEventDic[gameEvent.type][fun];
                eventObj.fun.call(eventObj.this, gameEvent.eventBody);
            }
        }
        else {
            this.isQueRuning = false;
        }
    };
    EventCenter.disposeQueEvents = function () {
        this.isQueRuning = false;
        this.queEvents = [];
    };
    EventCenter.eventDic = {};
    EventCenter.queEventDic = {};
    EventCenter.queEvents = [];
    return EventCenter;
}());
__reflect(EventCenter.prototype, "EventCenter");

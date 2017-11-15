/**
 * Created by Saco on 2014/8/2.
 */
class EventCenter {
    private static eventDic: Object = {};
    private static queEventDic: Object = {};
    private static isQueRuning;
    private static queEvents = [];

    public constructor() {
    }

    public static addEventListener(eventType: string, callback: Function, thisObj: any): void {
        if (!this.eventDic[eventType])
            this.eventDic[eventType] = [];
        if (!this.hasEventListener(eventType, callback, thisObj))
            this.eventDic[eventType].push({ "this": thisObj, "fun": callback });
    }

    private static hasEventListener(eventType: string, call: Function, thisObj: any): Boolean {
        if (!this.eventDic[eventType])
            return false;
        for (var i: number; i < this.eventDic[eventType].length; i++) {
            if (this.eventDic[eventType][i].fun == call && this.eventDic[eventType][i].this == thisObj)
                return true;
        }
        return false;
    }

    public static removeEventListener(eventType: string, callback: Function, thisObj: any): void {
        if (this.eventDic[eventType]) {
            this.eventDic[eventType].forEach((obj, index) => {
                if (obj.fun == callback && obj.this == thisObj) {
                    this.eventDic[eventType].splice(index, 1);
                    return;
                }
            });
        }
    }

    private static getEventIndex(eventType: string, call: Function, thisObj: any): number {
        if (!this.eventDic[eventType])
            return -1;
        for (var i: number; i < this.eventDic[eventType].length; i++) {
            if (this.eventDic[eventType][i].fun == call && this.eventDic[eventType][i].this == thisObj)
                return i;
        }
        return -1;
    }

    public static dispatchEvent(gameEvent: GameEvent): void {
        if (this.eventDic[gameEvent.type]) {
            var eventObj: any;
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
    }

    public static dispatchWith(type: string, data?): void {
        EventCenter.dispatchEvent(new GameEvent(type, data));
    }

    public static addQueEventListener(eventType: string, callback: Function, thisObj: any): void {
        if (!this.queEventDic[eventType])
            this.queEventDic[eventType] = [];
        if (!this.hasEventListener(eventType, callback, thisObj))
            this.queEventDic[eventType].push({ "this": thisObj, "fun": callback });
    }

    public static exeNextEvent(): void {
        this.isQueRuning = true;
        if (this.queEvents.length) {
            var gameEvent = this.queEvents.shift();
            var eventObj: any;
            for (var fun in this.queEventDic[gameEvent.type]) {
                eventObj = this.queEventDic[gameEvent.type][fun];
                eventObj.fun.call(eventObj.this, gameEvent.eventBody);
            }
        } else {
            this.isQueRuning = false;
        }
    }

    public static disposeQueEvents(): void {
        this.isQueRuning = false;
        this.queEvents = [];
    }
}

"use strict";
/**
 * Application
 */
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class AdminBoot {
    constructor(app) {
        // this.app = app;
        this.ctx = app.createAnonymousContext();
        // agent send
        app.messenger.on('init-task', () => {
            // 启动任务
            this.ctx.service.admin.sys.task.initTask();
        });
        // Date time
        // eslint-disable-next-line no-extend-native
        Date.prototype.toJSON = function () {
            return moment(this).format('YYYY-MM-DD HH:mm:ss');
        };
    }
    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }
    configDidLoad() {
        // Config, plugin files have loaded.
    }
    async didLoad() {
        // All files have loaded, start plugin here.
    }
    async willReady() {
        // All plugins have started, can do some thing before app ready.
    }
    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
    }
    async serverDidReady() {
        // Server is listening.
    }
    async beforeClose() {
        // Do some thing before app close.
    }
}
exports.default = AdminBoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFHSCxpQ0FBaUM7QUFFakMsTUFBcUIsU0FBUztJQUk1QixZQUFZLEdBQWdCO1FBQzFCLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3hDLGFBQWE7UUFDYixHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1lBQ2pDLE9BQU87WUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILFlBQVk7UUFDWiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUc7WUFDdEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGNBQWM7UUFDWiwrQkFBK0I7UUFDL0IscUNBQXFDO1FBQ3JDLGdEQUFnRDtJQUNsRCxDQUFDO0lBRUQsYUFBYTtRQUNYLG9DQUFvQztJQUN0QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCw0Q0FBNEM7SUFDOUMsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTO1FBQ2IsZ0VBQWdFO0lBQ2xFLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUTtRQUNaLHNDQUFzQztRQUN0QyxvQ0FBb0M7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2xCLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVc7UUFDZixrQ0FBa0M7SUFDcEMsQ0FBQztDQUNGO0FBakRELDRCQWlEQyJ9
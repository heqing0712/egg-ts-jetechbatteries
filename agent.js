"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://eggjs.org/zh-cn/core/cluster-and-ipc.html
 */
exports.default = (agent) => {
    agent.messenger.on('egg-ready', () => {
        agent.messenger.sendRandom('init-task', { name: 'init-task' });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztHQUVHO0FBQ0gsa0JBQWUsQ0FBQyxLQUFZLEVBQUUsRUFBRTtJQUM5QixLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1FBQ25DLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIn0=
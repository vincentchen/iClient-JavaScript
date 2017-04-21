/**
 * Class: SuperMap.REST.RouteCalculateMeasureService
 * 该类负责将客户设置的计算指定点的M值参数传递给服务端，并接收服务端返回的
 *      指定点的M值。通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
require('./RouteCalculateMeasureParameters');
SuperMap.REST.RouteCalculateMeasureService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Constructor: SuperMap.REST.RouteCalculateMeasureService
     * 计算指定点的M值服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     * var parameters = new SuperMap.RouteCalculateMeasureParameters({
     *     "sourceRoute":{
     *         "type":"LINEM",
     *        "parts":[4],
     *         "points":[
     *             {
     *                 "measure":0,
     *                 "y":-6674.466867067764,
     *                 "x":3817.3527876130133
     *             },
     *             {
     *                 "measure":199.57954019411724,
     *                 "y":-6670.830929417594,
     *                 "x":3617.806369901496
     *             },
     *             {
     *                 "measure":609.3656478634477,
     *                "y":-6877.837541432356,
     *                 "x":3264.1498746678444
     *             },
     *             {
     *                 "measure":936.0174126282958,
     *                 "y":-7038.687780615184,
     *                 "x":2979.846206068903
     *             }
     *         ]
     *     },
     *     "tolerance":1,
     *     "point":{
     *         "x":3330.7754269417,
     *         "y":-6838.8394457216
     *     },
     *     "isIgnoreGap":false
     * });
     *
     * var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(spatialAnalystURL, {
     *     eventListeners:{
     *         processCompleted:calculateCompleted,
     *         processFailed:calculateFailded
     *     }
     * );
     * routeCalculateMeasureService.processAsync(parameters);
     *
     *  //执行
     * function calculateCompleted(){todo}
     * function calculateFailded(){todo}
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.REST.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.REST.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的基于路由对象计算指定点M值操作的参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.RouteCalculateMeasureParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonParameters;

        jsonParameters = me.getJsonParameters(params);

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: getJsonParameters
     * 将参数转化为 JSON 字符串。
     *
     * Parameters:
     * params - {<SuperMap.RouteCalculateMeasureParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters: function (params) {
        var jsonParameters, jsonStr = "geometry/calculatemeasure", me = this, end;
        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? jsonStr + ".json" : "/" + jsonStr + ".json";
        } else {
            me.url += (end === "/") ? jsonStr + ".jsonp" : "/" + jsonStr + ".jsonp";
        }

        me.url += "?returnContent=true";
        jsonParameters = SuperMap.Util.toJSON(params);
        return jsonParameters;
    },

    CLASS_NAME: "SuperMap.REST.RouteCalculateMeasureService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.RouteCalculateMeasureService(url, options);
};
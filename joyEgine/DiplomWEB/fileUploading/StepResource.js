
define(["angular"], function (angular) {

    return ["$resource", "config", function ($resource, config) {
        return $resource(config.api + "/Step/:id", { id: '@Id' }, {
            update: { method: "PUT" },
            upload: { method: "POST", headers: { 'Content-Type': undefined }, transformRequest: angular.identity },
            reload: { method: "PUT", headers: { 'Content-Type': undefined }, transformRequest: angular.identity }
        });
    }];

});
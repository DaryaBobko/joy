angular
    .module('DiplomApp')
    .directive('mustHaveRole', mustHaveRole);

mustHaveRole.$inject = ['userService', "ngIfDirective"];

function mustHaveRole(userService, ngIfDirective) {
    var ngIf = ngIfDirective[0];

    var directive = {
        transclude: ngIf.transclude,
        priority: ngIf.priority + 1,
        terminal: ngIf.terminal,
        restrict: ngIf.restrict,
        scope: {
            mustHaveRole: "="
        },
        link: link
    };

    return directive;

    function link(scope, element, attr) {
        var isApprove = false;
        if (userService.isInnRole(scope.mustHaveRole)) {
            isApprove = true;
        }

        attr.ngIf = function () {
            return isApprove;
        };
        ngIf.link.apply(ngIf, arguments);
    }
}
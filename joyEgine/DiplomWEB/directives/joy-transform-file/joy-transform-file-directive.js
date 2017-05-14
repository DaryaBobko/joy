angular.directive('joyTransformFile', transrormFileDirective);

transrormFileDirective.$inject = ["$q", "$timeout", "$document", "config"];

function transrormFileDirective($q, $timeout, $document, config) {
    return {
        scope: {
            ngModel: "=",
            defaults: "="
        },
        restrict: "EA",
        link: function (scope, element) {

            var hiddenInput = element.find("#hiddenFile");
            hiddenInput.bind('change', function (event) {
                var fileInput = event.target;
                var file = fileInput.files[0];
                if (file) {
                    addImage(file);
                }
                fileInput.value = "";
            });

            scope.thumbnails = [];

            function resize(file) {
                var info = {};
                if (file.width > file.height) {
                    info.sourceSize = file.height;
                    info.x = (file.width - file.height) / 2;
                    info.y = 0;
                } else {
                    info.sourceSize = file.width;
                    info.x = 0;
                    info.y = (file.height - file.width) / 2;
                }
                return info;
            }

            function getImage(src) {
                var deferred = $q.defer();
                var image = new Image();
                image.onload = function () {
                    deferred.resolve(image);
                }
                image.src = src;
                return deferred.promise;
            }

            function getDataUrlFromFile(file) {
                var deferred = $q.defer();
                var reader = new FileReader();
                reader.onloadend = function () {
                    deferred.resolve(reader.result);
                }
                reader.readAsDataURL(file);
                return deferred.promise;
            }

            function getCanvas(image) {
                var canvas = $document[0].createElement("canvas");
                var context = canvas.getContext("2d");
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                return canvas;
            }

            function getDataUrlFromImage(image) {
                var canvas = getCanvas(image);
                return canvas.toDataURL("image/png");
            }

            function getBlobFromImage(image) {
                var deferred = $q.defer();
                var canvas = getCanvas(image);
                canvas.toBlob(function (blob) {
                    deferred.resolve(blob);
                });
                return deferred.promise;
            }

            function getThumbnail(src) {
                return getImage(src).then(function (image) {
                    var canvas = $document[0].createElement("canvas");
                    var context = canvas.getContext("2d");
                    canvas.width = 120;
                    canvas.height = 120;
                    var size = resize(image);
                    context.drawImage(image, size.x, size.y, size.sourceSize, size.sourceSize, 0, 0, 120, 120);
                    return canvas.toDataURL("image/png");
                });
            }

            function addImage(file) {
                getDataUrlFromFile(file).then(function (dataUrl) {
                    getThumbnail(dataUrl).then(function (thumbnail) {
                        scope.ngModel.push({
                            file: file,
                            url: dataUrl,
                            thumbnail: thumbnail
                        });
                    });
                });
            }

            element[0].ondragover = function () {
                element.addClass('hover');
                return false;
            };

            element[0].ondragleave = function () {
                element.removeClass('hover');
                return false;
            };

            element[0].ondrop = function (event) {
                event.preventDefault();
                element.removeClass('hover');
                addImage(event.dataTransfer.files[0]);
            }

            scope.removeImage = function (event, $index) {
                event.stopPropagation();
                scope.ngModel.splice($index, 1);
            }

            scope.choose = function (event) {
                event.preventDefault();
                hiddenInput.trigger("click");
            }

            if (scope.ngModel && scope.ngModel.length) {
                scope.ngModel.forEach(function (item) {
                    var src = config.api + "/Image/" + item.Id;
                    getImage(src).then(function (image) {
                        var dataUrl = getDataUrlFromImage(image);
                        getThumbnail(dataUrl).then(function (thumbnail) {
                            getBlobFromImage(image).then(function (file) {
                                item.file = file;
                                item.url = dataUrl;
                                item.thumbnail = thumbnail;
                            });

                        });
                    });
                });
            }


            if (!scope.ngModel) {
                scope.ngModel = [];
            }
        }
    };
}
angular.service('commonService', commonService);

commonService.$inject = ["$q"];
function commonService($q) {

    this.createFormData = function (data) {
        if (!data.Images) return data;
        var formData = new FormData();
        for (var property in data) {
            if (property != "Images")
                formData.append(poperty, data[property]);
        }
        data.Images.forEach(function (image, index) {
            formData.append("image" + index, image.file ? image.file : image.url);
        });
        return formData;
    }

    return this;
}
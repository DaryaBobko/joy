angular.module("DiplomApp").service('commonService', commonService);

commonService.$inject = ["$q"];
function commonService($q) {

    this.createFormData = function (data) {
        if (!data.Images) return data;
        var formData = new FormData();
        for (var property in data) {

            if (property != "Images") {
                if (Array.isArray(data[property])) {
                    var arr = "[";

                    for (var i = 0; i < data[property].length; i++) {
                        arr += data[property][i];
                        if (i < data[property].length-1) arr += ",";
                        //formData.append(property + '[' + i + ']', data[property][i]);
                    }
                    arr += "]";
                    formData.append(property, arr);
                    //data[property].forEach(function (elem, index) {
                    //    formData.append(property + '['+index+']', elem);
                    //});
                } else {
                    formData.append(property, data[property]);
                }
                //formData.append(property, JSON.stringify(data[property]));
            }
        }
        data.Images.forEach(function (image, index) {
            formData.append("image" + index, image.file ? image.file : image.url);
        });
        return formData;
    }

    return this;
}
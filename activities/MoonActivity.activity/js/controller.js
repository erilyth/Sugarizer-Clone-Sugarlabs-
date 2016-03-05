define(function (require) {

	var controller = {};

    // Take a model and view and act as the controller between them.
    controller.Controller = function (model, view) {
        this.model = model;
        this.view = view;
    };

    return controller;

});
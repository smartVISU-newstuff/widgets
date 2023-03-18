$.widget("sv.buffer", $.sv.widget, {
    initSelector: 'div[data-widget="buffer.solar_stove"]',

    gradient_diff: 50,

    _create: function () {
        this._super();
        this.element[0].closest('.block').style.minWidth = "370px";
    },

    _update: function (response) {
        var gradient = this.element[0].getElementsByTagName("linearGradient")[0]

        var y1 = "" + (parseInt(response[0]) + (this.gradient_diff/2.0) + 30) + "%";
        var y2 = "" + (parseInt(response[0]) - (this.gradient_diff/2.0)) + "%";
        gradient.setAttribute("y1", y1);
        gradient.setAttribute("y2", y2);
    }

});
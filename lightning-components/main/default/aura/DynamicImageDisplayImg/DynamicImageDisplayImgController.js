({
    calcVisibility : function(component, event, helper) {
        var params = event.getParam("arguments");
        if (params) {
            var startPos = "layer_".length;
            var newid = component.get("v.newid")
            var compareName = newid.slice(startPos);
            
            var imgLayer = component.find("imglayer");
            
            if (imgLayer) {
                var compareList = params.compare;
                if (compareName !== "base") {
                    if (compareList.indexOf(compareName) > -1) {
                        $A.util.addClass(imgLayer, "show");
                        $A.util.removeClass(imgLayer, "hide");
                    } else {
                        $A.util.addClass(imgLayer, "hide");
                        $A.util.removeClass(imgLayer, "show");
                    }
                }
            }
        }
    }
})
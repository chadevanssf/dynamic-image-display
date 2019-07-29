({
    addImages : function(component, config) {
        var imagedata = [];
        
        for (var item of config) {
            var layerName = item.layername;
            var imageLocation = item.image;
            var archiveLocation = item.archive;
            var combined = "layer_" + layerName;
            var classInfo = "slds-float_left layer " + combined;
            if (layerName === "base") {
                classInfo += " show";
            } else {
                classInfo += " hide";
            }
            
            var newSrc = "";
            if (archiveLocation && archiveLocation !== "") {
                newSrc = $A.get('$Resource.' + archiveLocation) + imageLocation;
            } else {
                newSrc = $A.get('$Resource.' + imageLocation);
            }
            
            var imgitem = {
                id: combined,
                class: classInfo,
                src: newSrc
            };
            imagedata.push(imgitem);
        }; // forEach
        
        component.set("v.imagedata", imagedata);
    },
    
    updateStatus : function(component) {
        var currentStatus = component.get("v.currentStatus");
        if (currentStatus) {
            var status = JSON.parse(currentStatus);
            
            var images = component.find("allimages");
            var startPos = "layer_".length;
            
            if (images) {
                for (var img of images) {
                    var currId = img.getElement().id;
                    var layerName = currId.slice(startPos);
                    if (status[layerName] === "hide") {
                        $A.util.addClass(img, "hide");
                        $A.util.removeClass(img, "show");
                    } else {
                        $A.util.addClass(img, "show");
                        $A.util.removeClass(img, "hide");
                    }
                }
            }
        }
    }
})
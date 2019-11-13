({
    addImages : function(component, helper, config) {
        var imagedata = [];
        var pattern = /[ ,.]/g;
        
        for (var item of config) {
            var layerName = item.layername.replace(pattern, "_").toLowerCase();
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
                newSrc = $A.get('$Resource.' + archiveLocation) + "/" + imageLocation;
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
            var images = component.find("allimages");
            
            if (images) {
                var pattern = /[ ,.]/g;
                var listOfStatus = currentStatus.split(";");
                
                for(var i=0; i < listOfStatus.length; i++) {
                    listOfStatus[i] = listOfStatus[i].replace(pattern, "_").toLowerCase();
                }

                for (var img of images) {
                    img.calculateVisibility(listOfStatus);
                }
            }
        }
    }
})
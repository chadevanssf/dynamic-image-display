({
    updateRecord : function(component, newId) {
        var dID = component.find("imageStatus");
        
        dID.set("v.recordId", newId);
    }
})
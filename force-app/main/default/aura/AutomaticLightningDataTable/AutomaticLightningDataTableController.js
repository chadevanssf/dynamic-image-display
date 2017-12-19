({
    doInit : function(component, event, helper) {
        helper.describe(component, component.get("v.sObjectType"));
    },
    
    getSelectedRow : function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        // Display that id of the selected rows
        for (var i = 0; i < selectedRows.length; i++){
            var selectEvent = $A.get("e.ltng:selectSObject");
            selectEvent.setParams({
                "recordId": selectedRows[i].Id,
                "channel": "DynamicImageListingRowChange"});
            selectEvent.fire();
        }
    }
})
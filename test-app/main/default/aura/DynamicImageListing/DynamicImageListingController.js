({
    doInit : function(component, event, helper) {
        // set up the apex actions
        var metadataAction = component.get("c.getFieldTypes");
        metadataAction.setParams({
            "objectName" : component.get("v.sObject"),
            "fieldNames" : component.get("v.fieldNames")
        });
        
        var dataAction = component.get("c.getResults");
        dataAction.setParams({
            "objectName" : component.get("v.sObject"),
            "fieldNames" : component.get("v.fieldNames")
        });
        
        metadataAction.setCallback(this, function (mdRes){
            var mdState = mdRes.getState();
            if (mdState === "SUCCESS") {
                var columns = mdRes.getReturnValue();
                
                component.set("v.columns", columns);
                
                dataAction.setCallback(this, function (dataRes) {
                    var dataState = dataRes.getState();
                    if (dataState === "SUCCESS") {
                        var records = dataRes.getReturnValue();
                        
                        component.set("v.results", records);
                        
                        if (records.length > 0) {
                            var selrecs = [];
                            selrecs.push(records[0].Id);
                            component.set("v.selectedResults", selrecs);
                            
                            var selectEvent = $A.get("e.ltng:selectSObject");
                            selectEvent.setParams({
                                "recordId": records[0].Id,
                                "channel": "DynamicImageListingRowChange"});
                            selectEvent.fire();
                        }
                    }  else if (dataState === "ERROR") {
                        $A.log(dataRes.getError());
                        // eslint-disable-next-line
                        $A.reportError("DynamicImageListing", dataRes.getError());
                    } //end if errors
                });
                $A.enqueueAction(dataAction);
            }  else if (mdState === "ERROR") {
                $A.log(mdRes.getError());
                // eslint-disable-next-line
                $A.reportError("DynamicImageListing", mdRes.getError());
            } //end if errors
        });
        $A.enqueueAction(metadataAction);
    },
    
    handleSelection : function (component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        
        var selectEvent = $A.get("e.ltng:selectSObject");
        selectEvent.setParams({
            "recordId": selectedRows[0].Id,
            "channel": "DynamicImageListingRowChange"});
        selectEvent.fire();
    }
})
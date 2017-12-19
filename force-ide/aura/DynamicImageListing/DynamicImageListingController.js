({
    doInit : function(component, event, helper) {
        var action = component.get("c.getResults");
        
        action.setParams({
            "objectName" : component.get("v.sObject"),
            "fieldNames" : component.get("v.fieldNames")
        });
        
        action.setCallback(this, function (res){
            if (component.isValid() && res.getState() === 'SUCCESS') {
                var records = res.getReturnValue();
                
                if (records.length > 0) {
                    var selectEvent = $A.get("e.ltng:selectSObject");
                    selectEvent.setParams({
                        "recordId": records[0].Id,
                        "channel": "DynamicImageListingRowChange"});
                    selectEvent.fire();
                }
                component.set("v.results", records);
            }
        });
        $A.enqueueAction(action);
    }
})
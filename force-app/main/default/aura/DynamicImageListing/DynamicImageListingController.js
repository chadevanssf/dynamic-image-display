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
                    helper.updateRecord(component, records[0].Id);
                }
                component.set("v.results", records);
            }
        });
        $A.enqueueAction(action);
    },
    
    selectObject : function(component, event, helper) {
        var recId = event.getParam("recordId");
        //console.log("Found record id : " + recId);
        helper.updateRecord(component, recId);
    }
})
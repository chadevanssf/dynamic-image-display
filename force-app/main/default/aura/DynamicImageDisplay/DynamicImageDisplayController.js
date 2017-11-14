({
    doInit : function(component, event, helper) {
        var fieldName = component.get("v.fieldName");
        
        var fieldNames = [];
        fieldNames.push(fieldName);
        
        component.set("v.fieldNames", fieldNames);
        
        var action = component.get("c.getConfig");
        action.setStorable();
        action.setParams(
            {
                configName : component.get("v.configName")
            }
        );
        action.setCallback(this, function(resp) {
            var state = resp.getState();
            if (state === "SUCCESS") {
                var configValue = resp.getReturnValue();
                if (configValue === "")
                {
                    $A.log("No Config found for: " + component.get("v.configName"));
                } else {
                    var config = JSON.parse(configValue);
                    component.set("v.config", config);
                    
                    var dynamicComponentsByAuraId = { "config": "true" };
                    component.set("v.dynamicComponentsByAuraId", dynamicComponentsByAuraId);
                    
                    config.forEach(function (item) {
                        var layerName = item.layername;
                        var imageLocation = item.image;
                        var combined = "layer_" + layerName;
                        var classInfo = "slds-float_left layer " + combined;
                        if (layerName === "base") {
                            classInfo += " show";
                        } else {
                            classInfo += " hide"
                        }
                        helper.addImageElement(component, combined, classInfo, imageLocation, helper.updateStatus);
                    }); // forEach
                }
            }  else if (state === "ERROR") {
                $A.log(resp.getError());
                // eslint-disable-next-line
                $A.reportError("DynamicImageDisplay", resp.getError());
            } //end if errors
        });
        $A.enqueueAction(action);
    },
    
    recordUpdated : function(component, event, helper) {
        // when the record is loaded for the first time, or updated in the interface
        var changeType = event.getParams().changeType;
        
        if (changeType === "ERROR") {
            /* handle error; do this first! */
        } else if (changeType === "LOADED" || changeType === "CHANGED") {
            var rec = component.get("v.simpleRecord");
            var fieldName = component.get("v.fieldName");
            component.set("v.currentStatus", rec[fieldName]);
            helper.updateStatus(component);
        }
    },
    
    handleMessage : function(component, event, helper) {
        var fieldName = component.get("v.payloadFieldName");
        var payload = event.getParam("payload");
        if (component.get("v.filterIdFieldName") !== "" 
            && component.get("v.filterPayloadFieldName") !== "") {
            var rec = component.get("v.simpleRecord");
            var filterValue = rec[component.get("v.filterIdFieldName")];
            if (payload[component.get("v.filterPayloadFieldName")] === filterValue) {
                component.set("v.currentStatus", payload[fieldName]);
                helper.updateStatus(component);
            }
        } else {
            component.set("v.currentStatus", payload[fieldName]);
            helper.updateStatus(component);
        }
    }
})
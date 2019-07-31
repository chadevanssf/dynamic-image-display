({
    doInit : function(component, event, helper) {
        var empApi = component.find("empApi");
        if (empApi) {
            // Uncomment below line to enable debug logging (optional)
            empApi.setDebugFlag(true);
            // Register error listener and pass in the error handler function
            empApi.onError($A.getCallback(function(error) {
                console.error('EMP API error: ', error);
            }));
            var channel = component.get("v.channel");
            var replayId = -1;
            empApi.subscribe(channel, replayId, $A.getCallback(function(eventReceived) {
                var live = component.find("live");
                
                $A.util.removeClass(live, "slds-theme_warning");
                $A.util.addClass(live, "slds-theme_success");
                
                var fieldName = component.get("v.payloadFieldName");
                var payload = eventReceived.data.payload;
                if (component.get("v.filterIdFieldName") !== "" &&
                    component.get("v.filterPayloadFieldName") !== "") {
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
                
                var delay = 1000;
                window.setTimeout(
                    $A.getCallback(function() {
                        if (component.isValid()) {
                            $A.util.addClass(live, "slds-theme_warning");
                            $A.util.removeClass(live, "slds-theme_success");
                        }}),
                    delay);       
            }))
            .then(function(subscription) {
                // Save subscription to unsubscribe later
                component.set("v.subscription", subscription);
                
                var live = component.find("live");
                var delay = 500;
                window.setTimeout(
                    $A.getCallback(function() {
                        if (component.isValid()) {
                            live.set("v.label", "live");
                            $A.util.removeClass(live, "slds-theme_offline");
                            $A.util.addClass(live, "slds-theme_warning");
                            $A.util.removeClass(live, "slds-theme_success");
                        }}),
                    delay); 
            });
        }
        
        var action = component.get("c.getConfig");
        action.setStorable();
        var configName = component.get("v.configName");
        action.setParams({
            configName : configName
        });
        action.setCallback(this, function(resp) {
            var state = resp.getState();
            if (state === "SUCCESS") {
                var config = resp.getReturnValue();
                if (config !== "") {
                    component.set("v.config", config);
                    
                    helper.addImages(component, config);
                    helper.updateStatus(component);
                } else {
                    console.log("No Config found for: " + component.get("v.configName"));
                    $A.log("No Config found for: " + component.get("v.configName"));
                }
            }  else if (state === "ERROR") {
                console.log(resp.getError());
                $A.log(resp.getError());
                $A.reportError("DynamicImageDisplay", resp.getError());
            } //end if errors
        });
        $A.enqueueAction(action);
    },
    
    changeRecord : function(component, event, helper) {
        var rec = component.find("record");
        rec.reloadRecord();
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
    
    handleRecordChange : function(component, event, helper) {
        var id = event.getParam("recordId");
        component.set("v.recordId", id);
        var rec = component.find("record");
        rec.reloadRecord();
    }
})
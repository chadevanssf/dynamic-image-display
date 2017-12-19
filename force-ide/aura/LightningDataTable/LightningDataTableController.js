({
    doInit : function(component, event, helper) {
        //TODO: do a cleanup on displayFields parameter to make sure it's not invalid (commas, spaces, etc)
        helper.describe(component, component.get("v.sObjectType"));
    },
    
    changeSort: function (component, event, helper){
        //console.log(event.target);
        if (component.get("v.sortState.field")===event.target.id){
            //same field, flip it!
            if (component.get("v.sortState.direction")==="Ascending"){
                component.set("v.sortState.direction", "Descending");
            } else {
                component.set("v.sortState.direction", "Ascending");
            }
        } else { //new field, set it to that, Ascending
            component.set("v.sortState", {"field":event.target.id, "direction":"Ascending"});
        }
        helper.sort(component);
    },
    
    
    //TODO: options for click behavior
    selectRecord : function(component, event){
        //console.log("nav invoked, get id first");
        var rows = component.find("rows");
        for (var i = 0; i < rows.length; i += 1) {
            $A.util.removeClass(rows[i].elements[0], "slds-is-selected");
        }
        
        //console.log(event.target);
        var node = event.target;
        var nodeId = node.id;
        var recordId = nodeId.substring(4);
        
        while (!nodeId.startsWith("row-")) {
            node = node.parentNode;
            nodeId = node.id;
        	recordId = nodeId.substring(4);
        }
        $A.util.addClass(node, "slds-is-selected");
        //console.log(recordId);
        
        var selectEvent = $A.get("e.ltng:selectSObject");
        selectEvent.setParams({
            "recordId": recordId,
            "channel": "LightningDataTableRowChange"});
        selectEvent.fire();

        //console.log(selectEvent);
    }
    
})
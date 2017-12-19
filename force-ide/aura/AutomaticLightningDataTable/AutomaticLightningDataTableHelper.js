({
    CSL2Array: function (CSL){
        try{
            let outputArray = CSL.split(",");
            _.forEach(outputArray, function (value, key){
                outputArray[key] = _.trim(value);
            });
            return outputArray;
        } catch(err){
            console.log("failed at building CSL array");
            //console.log("lodash is defined?: " + (false || _));
            //intended to handle the "CSL is null scenario"
            return [];
        }
    },
    
    describe: function (component, objectName){
        //console.log("displayFields value is:");
        //console.log(component.get("v.displayFields"))
        let fieldsArray = this.CSL2Array(component.get("v.displayFields"));
        //console.log(fieldsArray);
        //let editableFields = this.CSL2Array(component.get("v.editableFields"));

        //	public static String describe(String objtype) {
        let action = component.get("c.describe");
        action.setStorable();
        action.setParams({"objtype" : objectName });
        action.setCallback(this, function (a){
            let displayFieldsArray=[];

            //console.log("result in callback:");
            let output = JSON.parse(a.getReturnValue());
            //component.set("v.pluralLabel", output.objectProperties.pluralLabel);
            //console.log(output.fields);
            //now, only get the ones that are in the displayfieldsList
            //console.log(fieldsArray);

            _.forEach(fieldsArray, function(value){
                //check for reference dot
                if (!value.includes(".")){
                    //just a normal, non-reference field
                    let temp = {
                        "describe" : _.find(output.fields, {"name" : value}),
                        "original": value,
                        //"editable" : _.includes(editableFields, value),
                        "related" : false
                    };
                    temp.label = temp.describe.label;
                    temp.fieldName = temp.describe.name;
                    temp.type = temp.describe.type;
                    displayFieldsArray.push(temp);
                } else { //it's a relationship/reference field
                    displayFieldsArray.push({
                        "describe": value, //placeholder, will update late with related object describe
                        //"editable":false,
                        "original":value,
                        "related":true
                    });
                }
            });

            //first (and possibly only) setting. Will update if parent fields found
            component.set("v.displayFieldsArray", displayFieldsArray);
            //console.log("done with normal fields");
            //console.log(displayFieldsArray);

            //related objects (up one level only!)
            _.forEach(fieldsArray, function(value){
                if (value.includes(".")){
                    //console.log("dependentField:" + value);
                    let parentDesribe = component.get("c.describe");
                    let parentObjectName = value.split(".")[0].replace("__r", "__c"); //replaces if custom
                    //do a describe for that object
                    //
                    parentDesribe.setParams({"objtype" : parentObjectName});
                    let temp = {};
                    parentDesribe.setCallback(this, function (response){
                        displayFieldsArray = component.get("v.displayFieldsArray");
                        //console.log(response)
                        let relatedOutput = JSON.parse(response.getReturnValue());
                        ////console.log(relatedOutput);
                        //get the describe for that field
                        //console.log("searched name is: " + value.split(".")[1])
                        temp = {
                            "describe" : _.find(relatedOutput.fields, {"name" : value.split(".")[1]}) 
                        };
                        //console.log(temp);
                        //now temp is the describe.  Let's find where to put it
                        let displayFieldIndex = _.findIndex(displayFieldsArray, { 'describe': value});
                        //console.log("found index: " + displayFieldIndex);
                        displayFieldsArray[displayFieldIndex].describe = temp.describe;
                        displayFieldsArray[displayFieldIndex].label = temp.describe.label;
                        displayFieldsArray[displayFieldIndex].fieldName = temp.describe.name;
                        displayFieldsArray[displayFieldIndex].type = temp.describe.type;

                        //console.log(displayFieldsArray);
                        component.set("v.displayFieldsArray", displayFieldsArray);
                    });

                    $A.enqueueAction(parentDesribe);
                }
            });
        });
        $A.enqueueAction(action);

    }
})
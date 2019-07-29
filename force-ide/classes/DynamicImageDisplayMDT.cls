global class DynamicImageDisplayMDT extends VisualEditor.DynamicPickList {
    
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('<Please Select>', '<Please Select>');
        return defaultValue;
    }
    
    global override VisualEditor.DynamicPickListRows getValues() {
        Dynamic_Image_Display__mdt[] items = [SELECT MasterLabel, DeveloperName FROM Dynamic_Image_Display__mdt];
        
        VisualEditor.DynamicPickListRows values = new VisualEditor.DynamicPickListRows();
        
        values.addRow(getDefaultValue());
        
        for (Dynamic_Image_Display__mdt item : items) {
            values.addRow(new VisualEditor.DataRow(item.MasterLabel, item.DeveloperName));
        }
        
        return values;
    }
    
}
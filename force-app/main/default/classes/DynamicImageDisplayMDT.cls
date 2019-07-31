global class DynamicImageDisplayMDT extends VisualEditor.DynamicPickList
{
    global override VisualEditor.DataRow getDefaultValue()
    {
        return getStaticDefaultValue();
    }    
    global static VisualEditor.DataRow getStaticDefaultValue()
    {
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('<Please Select>', '<Please Select>');
        return defaultValue;
    }
    
    global override VisualEditor.DynamicPickListRows getValues()
    {
        return getStaticValues();
    }
    global static VisualEditor.DynamicPickListRows getStaticValues()
    {
        List<String> items = new List<String>();
        Dynamic_Image_Display__mdt[] mdtItems = [SELECT Group__c FROM Dynamic_Image_Display__mdt];
        
        VisualEditor.DynamicPickListRows values = new VisualEditor.DynamicPickListRows();
        
        values.addRow(getStaticDefaultValue());
        
        for (Dynamic_Image_Display__mdt mdtItem : mdtItems) {
            String str = mdtItem.Group__c;
            if (!items.contains(str)) {
                items.add(str);
            }
        }
        
        for(String item : items) {
            VisualEditor.DataRow veRow = new VisualEditor.DataRow(item, item);
            values.addRow(veRow);
        }
        
        return values;
    }
}
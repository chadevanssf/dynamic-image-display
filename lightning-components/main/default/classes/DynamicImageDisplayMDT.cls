global with sharing class DynamicImageDisplayMDT extends VisualEditor.DynamicPickList
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
        List<String> items = DynamicImageDisplayConfig.getGroupsDID();
        
        VisualEditor.DynamicPickListRows values = new VisualEditor.DynamicPickListRows();
        
        values.addRow(getStaticDefaultValue());
                
        for(String item : items) {
            VisualEditor.DataRow veRow = new VisualEditor.DataRow(item, item);
            values.addRow(veRow);
        }
        
        return values;
    }
}
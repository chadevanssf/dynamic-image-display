public class DynamicImageListingCtrl
{    
    @AuraEnabled
    public static List<SObject> getResults(String objectName, String fieldNames) 
    {
        return Database.query('SELECT Id, Name, ' + fieldNames + ' FROM ' + objectName);
    }
    
    @AuraEnabled(cacheable=true)
    public static List<ColumnInfo> getFieldTypes(string objectName, string fieldNames)
    {
       	String[] fields = fieldNames.split(',');
        List<ColumnInfo> results = new List<ColumnInfo>();
        
        Schema.SObjectType targetType = Schema.getGlobalDescribe().get(objectName);
        Map<String, Schema.sObjectField> targetFields = targetType.getDescribe().fields.getMap();
        for (String fieldname : fields)
        {
            DescribeFieldResult dfr = targetFields.get(fieldname).getDescribe();
            ColumnInfo ci = new ColumnInfo();
            ci.label = dfr.getLabel();
            ci.fieldName = dfr.getName();
            Schema.DisplayType fielddataType = dfr.getType();
			if (fielddataType == Schema.DisplayType.STRING)
                ci.type = 'text';
        	results.add(ci);
        }
        
        return results;
    }
    
    public class ColumnInfo
    {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String fieldName;
        @AuraEnabled
        public String type;
    }
}
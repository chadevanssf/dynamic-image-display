public class DynamicImageListingCtrl {
    
    @AuraEnabled
    public static List<SObject> getResults(String objectName, String fieldNames) 
    {
        return Ora.query('SELECT Id, Name, ' + fieldNames + ' FROM ' + objectName);
    }

}
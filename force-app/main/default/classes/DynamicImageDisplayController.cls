public class DynamicImageDisplayController {

    @AuraEnabled(cacheable=true)
    public static String getConfig(String configName)
    {
        List<Dynamic_Image_Display__mdt> recs = [SELECT Id, DeveloperName, Image_Config__c
                                      FROM Dynamic_Image_Display__mdt
                                     WHERE DeveloperName = :configName];
        
        String retVal = '';
        for (Dynamic_Image_Display__mdt rec : recs)
        {
            retVal = rec.Image_Config__c;
        }
        return retVal;
    }
}
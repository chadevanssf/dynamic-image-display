global with sharing class DynamicImageDisplayController
{
    @AuraEnabled(cacheable=true)
    public static List<DisplayResult> getConfig(String configName)
    {
        List<DisplayResult> drs = new List<DisplayResult>();
        List<Dynamic_Image_Display__mdt> recs = [SELECT Id, DeveloperName, LayerName__c, ArchiveName__c, ImageName__c
                                                 FROM Dynamic_Image_Display__mdt
                                                 WHERE Group__c = :configName
                                                 ORDER BY DeveloperName];
        
        String retVal = '';
        for (Dynamic_Image_Display__mdt rec : recs)
        {
            DisplayResult dr = new DisplayResult();
            dr.layername = rec.LayerName__c;
            dr.archive = rec.ArchiveName__c;
            dr.image = rec.ImageName__c;
            drs.add(dr);
        }
        return drs;
    }
    
    public class DisplayResult
    {
        @AuraEnabled
        public String layername;
        @AuraEnabled
        public String archive;
        @AuraEnabled
        public String image;
    }
}
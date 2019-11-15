public with sharing class DynamicImageDisplayConfig
{
    public static List<Dynamic_Image_Display__mdt> getAllByGroupDID(String groupName)
    {
        List<Dynamic_Image_Display__mdt> recs = [SELECT Id, DeveloperName, LayerName__c, ArchiveName__c, ImageName__c
                                                 FROM Dynamic_Image_Display__mdt
                                                 WHERE Group__c = :groupName
                                                 ORDER BY DeveloperName];
        
        if(Test.isRunningTest())
        {
            if (recs != null && recs.size() <= 0)
            {
                Dynamic_Image_Display__mdt rec = new Dynamic_Image_Display__mdt(
                    DeveloperName = 'TestConfig',
                    LayerName__c = 'base',
                    ArchiveName__c = '',
                    ImageName__c = 'base.png');
                recs.add(rec);
            }
        }
        
        return recs;
    }
    
    public static List<String> getGroupsDID()
    {
        List<String> items = new List<String>();
        List<Dynamic_Image_Display__mdt> recs = [SELECT Group__c
                                      FROM Dynamic_Image_Display__mdt];
        
        if(Test.isRunningTest())
        {
            if (recs != null && recs.size() <= 0)
            {
                Dynamic_Image_Display__mdt rec = new Dynamic_Image_Display__mdt(
                    DeveloperName = 'TestConfig',
                    LayerName__c = 'base',
                    ArchiveName__c = '',
                    ImageName__c = 'base.png');
                recs.add(rec);
            }
        }
        
        for (Dynamic_Image_Display__mdt rec : recs)
        {
            String groupName = rec.Group__c;
            if (!items.contains(groupName)) {
                items.add(groupName);
            }
        }
        
        return items;
    }
}
public class GenerateEventController
{
    @AuraEnabled
    public static void publishEvent(SObject newEvent)
    {
        publishEvents(newEvent);
    }
    
    public static List<Database.SaveResult> publishEvents(SObject newEvent)
    {
        List<SObject> events = new List<SObject>();
        events.add(newEvent);
        
        List<Database.SaveResult> results = EventBus.publish(events);
        return results;
    }
    
    @AuraEnabled
    public static List<Events_Generator__mdt> listMetadata(String grouping)
    {
        List<Events_Generator__mdt> results = [SELECT Id, Label, DeveloperName, Event_Data__c
                                               FROM Events_Generator__mdt
                                               WHERE Group__c = :grouping
                                               ORDER BY DeveloperName];
        return results;
    }
    
    @AuraEnabled
    public static Events_Generator__mdt selectMetadata(String devName)
    {
        List<Events_Generator__mdt> results = [SELECT Id, Label, DeveloperName, Event_Data__c
                                               FROM Events_Generator__mdt
                                               WHERE DeveloperName = :devName];
        
        String evtData = results[0].Event_Data__c;
        System.debug('Before: ' + results[0].Event_Data__c);
        // single quotes are invalid, replace with slash-double-quote,
        // each slash is an escape, need more to filter down to one in javascript side
        results[0].Event_Data__c = evtData.replaceAll('\'', '\\\\\\"');
        System.debug('After: ' + results[0].Event_Data__c);
        return results[0];
    }
}
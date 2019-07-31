@IsTest
public class GenerateEventControllerTest
{
    @isTest
    static void testPublishEvents()
    {
        TestEvent__e evt = new TestEvent__e();
        evt.Message__c = '{test: "yes"}';
        
        GenerateEventController.publishEvent(evt);
        List<Database.SaveResult> results = GenerateEventController.publishEvents(evt);
        
        System.assertNotEquals(null, results);
    }

    @isTest
    static void testListMetadata()
    {
        List<Events_Generator__mdt> mdts = GenerateEventController.listMetadata('TestEvent');
        
        System.assertNotEquals(null, mdts);
    }
    
    @isTest
    static void testSelectMetadata()
    {
        Events_Generator__mdt mdt = GenerateEventController.selectMetadata('Go_Left');
        
        System.assertNotEquals(null, mdt);
    }
}
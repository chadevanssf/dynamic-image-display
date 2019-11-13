@isTest
public class DynamicImageListingCtrlTest
{
    @isTest
    static void testGetResults()
    {
        List<SObject> objs = DynamicImageListingCtrl.getResults('Account', 'AccountSource');
        
        System.assertNotEquals(null, objs);
    }
    
    @isTest
    static void testGetFieldTypes()
    {
        List<DynamicImageListingCtrl.ColumnInfo> cols = DynamicImageListingCtrl.getFieldTypes('Account', 'AccountSource');
        
        System.assertNotEquals(null, cols);
    }
    
    @testSetup
    static void testSetupCoreObjects()
    {
        Account a = new Account();
        a.Name = 'Pizza King';
        insert a;
    }
}
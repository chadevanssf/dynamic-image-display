@isTest
public class DynamicImageListingCtrlTest {
    @isTest static void testGetResults() {
        DynamicImageListingCtrl.getResults('Account', 'AccountSource');
    }
    
    @testSetup static void testSetupCoreObjects() {
        Account a = new Account();
        a.Name = 'Pizza King';
        insert a;
    }
}
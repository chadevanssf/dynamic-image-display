@IsTest
public class DynamicImageDisplayTest {
    @isTest 
    static void validateMDTInfo() 
    {
        String s = DynamicImageDisplayController.getConfig('Test');
        
        System.assertEquals('', s);
    }
}
@IsTest
public class DynamicImageDisplayTest
{
    @isTest 
    static void validateMDTInfo()
    {
        List<DynamicImageDisplayController.DisplayResult> drs = DynamicImageDisplayController.getConfig('TestConfig');
        
        System.assertNotEquals(null, drs);
    }
}
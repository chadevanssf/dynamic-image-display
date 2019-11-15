@IsTest
public class DynamicImageDisplayConfigTest
{
    @isTest 
    static void validateGetAllByGroupDID() 
    {
        List<Dynamic_Image_Display__mdt> recs = DynamicImageDisplayConfig.getAllByGroupDID('TestConfig');
        System.assertNotEquals(null, recs);
    }

    @isTest 
    static void validateGetGroupsDID() 
    {
        List<String> groups = DynamicImageDisplayConfig.getGroupsDID();
        System.assertNotEquals(null, groups);
    }
}
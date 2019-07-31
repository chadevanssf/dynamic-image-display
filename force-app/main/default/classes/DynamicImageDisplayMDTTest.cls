@IsTest
public class DynamicImageDisplayMDTTest
{
    @isTest 
    static void validateMDTInfo() 
    {
        VisualEditor.DynamicPickListRows test = DynamicImageDisplayMDT.getStaticValues();
        
        System.assertNotEquals(null, test);
    }
}
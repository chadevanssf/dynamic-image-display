@IsTest
public class SessionControllerTest {
	
    @isTest 
    static void validateUserSessionId() 
    {
        String s = SessionController.getSessionId();
        
        System.assertNotEquals('', s);
    }
}
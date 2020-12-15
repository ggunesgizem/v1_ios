/********* perm.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>

@interface perm : CDVPlugin {
    // Member variables go here.
    
}

- (void)coolMethod:(CDVInvokedUrlCommand*)command;
- (void)permCheck:(CDVInvokedUrlCommand*)command;
- (void)popup:(CDVInvokedUrlCommand*)command;

@end

@implementation perm

- (void)coolMethod:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];
    
    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)permCheck:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];
    
    if (echo != nil && [echo length] > 0) {
        NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
        NSString *toggleSwitchValue = [defaults objectForKey:@"Data_Analytics"];
        //BOOL permissionStatus = [toggleSwitchValue boolValue];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:toggleSwitchValue];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
- (void)popup:(CDVInvokedUrlCommand*)command
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Uygulama Analizi"
                          
                                                    message:@"Uygulama deneyiminizi geliştirmek ve kullanıcı ihtiyaçlarına göre şekillendirmek için istatistiksel olarak uygulama kullanım alanları, sıklığı ve kapsamını aylık dönemlerde incelemekteyiz. Bu uygulamayı kullanarak bu analizde bulunmayı kabul etmiş sayılırsınız. Herhangi bir zamanda Ayarlar –> Servisim ekranından bu ayarı değiştirebilirsiniz."
                                                   delegate:self
                                          cancelButtonTitle:@"Tamam"
                                          otherButtonTitles:nil];
    [alert show];
    
    /* UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Data Analiz kullanma izni"
     message:@"Servisim uygulaması datalarınıza erişmek istiyor"
     delegate:self
     cancelButtonTitle:@"İzin Verme"
     otherButtonTitles:@"İzin Ver",nil];
     [alert show];*/
    
}

@end


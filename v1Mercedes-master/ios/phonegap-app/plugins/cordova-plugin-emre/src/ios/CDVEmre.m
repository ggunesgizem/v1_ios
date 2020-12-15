/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import "CDVEmre.h"

@implementation CDVEmre

- (void)emre:(CDVInvokedUrlCommand*)command
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

/*- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex //istenirse başlangıçta sorulsun evet ya da hayır olarak seçilsin
{
    
    if (buttonIndex == 0)
    {
        [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"Data_Analytics"];
        //Code for no button
    }
    if (buttonIndex == 1)
    {
        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"Data_Analytics"];
        //Code for yes button
    }
}*/

-(int)check:(CDVInvokedUrlCommand*)command
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    id toggleSwitchValue = [defaults objectForKey:@"Data_Analytics"];
    BOOL permissionStatus = [toggleSwitchValue boolValue];
    NSLog(@"asadas---  this is the variable value: %d",toggleSwitchValue);

    //NSLog(@""+permissionStatus);
    
    return toggleSwitchValue;
    
}
@end

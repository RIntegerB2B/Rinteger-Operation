import { environment } from '../../environments/environment';
export const AppSetting: AppSettingType = {
    awsServiceUrl: 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3041/',
    local3041CrmServiceUrl: 'http://localhost:3041/',
    serviceUrl: environment.serviceUrl,
    /* serviceUrl: 'http://localhost:3041/' , */
    /* serviceUrl: 'https://rinteger-operation-service.appspot.com/', */
    imageUrl: ' http://rinteger-operation.s3-website.ap-south-1.amazonaws.com/images/assetlists/'
};


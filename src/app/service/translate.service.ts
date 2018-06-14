import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as AWS from 'aws-sdk/global';
import * as Lambda from 'aws-sdk/clients/lambda';

import { TargetLanguage, Translate } from '../models/translate.model';
import { environment } from '../../environments/environment';

@Injectable()
export class TranslateService {

    constructor() {
    }

    callTranslateLambda(translate: Translate): Observable<any> {
        const payload = '{"text": "' + translate.text + '", "target": "' + translate.target + '"}';
        const myLambda = this.getLambda();
        const pullParams: any = {
            FunctionName: environment.translation_lambda,
            InvocationType: 'RequestResponse',
            Payload: payload.toString(),
            LogType: 'None'
        };
        let pullResults: Translate = new Translate();
        myLambda.invoke(pullParams, (error, data) => {
           if (error) {
               console.error(error.toString());
           }  else {
               pullResults = JSON.parse(data.Payload.toString());
               console.log(pullResults);
           }
           return Observable.create(pullResults);
        });
        return Observable.create(null);
    }

    private getLambda(): Lambda {
        AWS.config.update({
            region: environment.region,
        });
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: environment.identityPoolId});
        const lambda = new Lambda({region: environment.region, apiVersion: '2015-03-31'});
        return lambda;
    }
}

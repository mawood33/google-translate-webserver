import { Injectable } from '@angular/core';
import { TargetLanguage, Translate } from '../models/translate.model';
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as Lambda from 'aws-sdk/clients/lambda';

@Injectable()
export class TranslateService {

    constructor() {
    }

    callTranslateLambda(translate: Translate) {
        console.log('call to GetTranslation Lambda: ', translate);
        const payload = {text: 'father',
            target: [TargetLanguage.Korean],
            translation: []};
        const myLambda = this.getLambda();
        let pullParams: any = {
            FunctionName: environment.translation_lambda,
            InvocationType: 'RequestResponse',
            Payload: payload.toString(),
            LogType: 'None'
        };
        let pullResults: Translate = new Translate();
        console.log('about to invoke');
        myLambda.invoke(pullParams, (error, data) => {
           if (error) {
               console.error(error.toString());
           }  else {
               pullResults = JSON.parse(data.Payload.toString());
               console.log(JSON.stringify(pullResults));
           }
        });

        pullResults = {
            text: ['father'],
            target: ['ko'],
            translation: []
        };
        console.log('done...');
        return setTimeout(() => { console.log(pullResults); return pullResults}, 3000);
    }

    private getLambda(): Lambda {
        AWS.config.update({
            region: environment.region,
        });
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: environment.identityPoolId});
        console.log('AWS:', AWS.config);
        const lambda = new Lambda({region: environment.region, apiVersion: '2015-03-31'});
        return lambda;
    }
}

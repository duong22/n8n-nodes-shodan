import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
    ICredentialTestRequest
} from 'n8n-workflow';

export class ShodanApi implements ICredentialType {
    name = 'shodanApi';
    displayName = 'Shodan API';
    documentationUrl = 'https://developer.shodan.io/api';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'Your Shodan API key',
        },
    ];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				key: '={{$credentials.apiKey}}'
			}
		},
	};
    test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.shodan.io',
			url: '/api-info',
			qs: {
				key: '={{$credentials.apiKey}}'
			}
		},
	};
}
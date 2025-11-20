import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Shodan implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Shodan',
        name: 'shodan',
        icon: 'file:shodan.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with Shodan API',
        defaults: {
            name: 'Shodan',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'shodanApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.shodan.io',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Host',
                        value: 'host',
                    },
                    {
                        name: 'Search',
                        value: 'search',
                    },
                    {
                        name: 'DN',
                        value: 'dns',
                    },
                    {
                        name: 'Domain',
                        value: 'domain',
                    },
                ],
                default: 'host',
            },
            
            // Host Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['host'],
                    },
                },
                options: [
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get information about an IP address',
                        action: 'Get host information',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '=/shodan/host/{{$parameter.ip}}',
                            },
                        },
                    },
                ],
                default: 'get',
            },
            {
                displayName: 'IP Address',
                name: 'ip',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['host'],
                        operation: ['get'],
                    },
                },
                default: '',
                placeholder: '8.8.8.8',
                description: 'The IP address to lookup',
            },
            {
                displayName: 'Additional Fields',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                displayOptions: {
                    show: {
                        resource: ['host'],
                        operation: ['get'],
                    },
                },
                options: [
                    {
                        displayName: 'History',
                        name: 'history',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to return all historical banners',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'history',
                            },
                        },
                    },
                    {
                        displayName: 'Minify',
                        name: 'minify',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to only return the list of ports and general host information',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'minify',
                            },
                        },
                    },
                ],
            },
            
            // Search Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['search'],
                    },
                },
                options: [
                    {
                        name: 'Query',
                        value: 'query',
                        description: 'Search Shodan using a query',
                        action: 'Search shodan',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '/shodan/host/search',
                            },
                        },
                    },
                    {
                        name: 'Count',
                        value: 'count',
                        description: 'Get total number of results without consuming credits',
                        action: 'Count search results',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '/shodan/host/count',
                            },
                        },
                    },
                ],
                default: 'query',
            },
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['search'],
                        operation: ['query', 'count'],
                    },
                },
                default: '',
                placeholder: 'apache country:US',
                description: 'Shodan search query',
                routing: {
                    send: {
                        type: 'query',
                        property: 'query',
                    },
                },
            },
            {
                displayName: 'Additional Fields',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                displayOptions: {
                    show: {
                        resource: ['search'],
                        operation: ['query', 'count'],
                    },
                },
                options: [
                    {
                        displayName: 'Facets',
                        name: 'facets',
                        type: 'string',
                        default: '',
                        placeholder: 'country,org',
                        description: 'Comma-separated list of properties to get summary information on',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'facets',
                            },
                        },
                    },
                    {
                        displayName: 'Limit',
                        name: 'limit',
                        type: 'number',
																								typeOptions: {
																									minValue: 1,
																								},
                        default: 50,
                        description: 'Max number of results to return',
                        displayOptions: {
                            show: {
                                '/operation': ['query'],
                            },
                        },
                        routing: {
                            send: {
                                type: 'query',
                                property: 'limit',
                            },
                        },
                    },
                    {
                        displayName: 'Page',
                        name: 'page',
                        type: 'number',
                        default: 1,
                        description: 'Page number',
                        displayOptions: {
                            show: {
                                '/operation': ['query'],
                            },
                        },
                        routing: {
                            send: {
                                type: 'query',
                                property: 'page',
                            },
                        },
                    },
                    {
                        displayName: 'Minify',
                        name: 'minify',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to truncate some of the larger fields',
                        displayOptions: {
                            show: {
                                '/operation': ['query'],
                            },
                        },
                        routing: {
                            send: {
                                type: 'query',
                                property: 'minify',
                            },
                        },
                    },
                ],
            },
            
            // DNS Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['dns'],
                    },
                },
                options: [
                    {
                        name: 'Resolve',
                        value: 'resolve',
                        description: 'Resolve hostnames to IP addresses',
                        action: 'Resolve hostnames',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '/dns/resolve',
                            },
                        },
                    },
                    {
                        name: 'Reverse',
                        value: 'reverse',
                        description: 'Look up hostnames for IP addresses',
                        action: 'Reverse DNS lookup',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '/dns/reverse',
                            },
                        },
                    },
                ],
                default: 'resolve',
            },
            {
                displayName: 'Hostnames',
                name: 'hostnames',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['dns'],
                        operation: ['resolve'],
                    },
                },
                default: '',
                placeholder: 'google.com,facebook.com',
                description: 'Comma-separated list of hostnames to resolve',
                routing: {
                    send: {
                        type: 'query',
                        property: 'hostnames',
                    },
                },
            },
            {
                displayName: 'IP Addresses',
                name: 'ips',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['dns'],
                        operation: ['reverse'],
                    },
                },
                default: '',
                placeholder: '8.8.8.8,1.1.1.1',
                description: 'Comma-separated list of IP addresses',
                routing: {
                    send: {
                        type: 'query',
                        property: 'ips',
                    },
                },
            },
            
            // Domain Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['domain'],
                    },
                },
                options: [
                    {
                        name: 'Get Info',
                        value: 'getInfo',
                        description: 'Get all subdomains and DNS entries for a domain',
                        action: 'Get domain information',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '=/dns/domain/{{$parameter.domain}}',
                            },
                        },
                    },
                ],
                default: 'getInfo',
            },
            {
                displayName: 'Domain',
                name: 'domain',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['domain'],
                        operation: ['getInfo'],
                    },
                },
                default: '',
                placeholder: 'google.com',
                description: 'Domain name to lookup',
            },
            {
                displayName: 'Additional Fields',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                displayOptions: {
                    show: {
                        resource: ['domain'],
                        operation: ['getInfo'],
                    },
                },
                options: [
                    {
                        displayName: 'History',
                        name: 'history',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to include historical DNS data',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'history',
                            },
                        },
                    },
                    {
                        displayName: 'Type',
                        name: 'type',
                        type: 'options',
                        default: 'A',
                        options: [
                            {
                                name: 'A',
                                value: 'A',
                            },
                            {
                                name: 'AAAA',
                                value: 'AAAA',
                            },
                            {
                                name: 'CNAME',
                                value: 'CNAME',
                            },
                            {
                                name: 'MX',
                                value: 'MX',
                            },
                            {
                                name: 'NS',
                                value: 'NS',
                            },
                            {
                                name: 'SOA',
                                value: 'SOA',
                            },
                            {
                                name: 'TXT',
                                value: 'TXT',
                            },
                        ],
                        description: 'DNS record type to filter',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'type',
                            },
                        },
                    },
                    {
                        displayName: 'Page',
                        name: 'page',
                        type: 'number',
                        default: 1,
                        description: 'Page number (100 results per page)',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'page',
                            },
                        },
                    },
                ],
            },
        ],
    };
}
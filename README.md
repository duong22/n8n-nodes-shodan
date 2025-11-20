# n8n-nodes-shodan

This is an n8n community node. It lets you use Shodan in your n8n workflows.

Shodan is a search engine for Internet-connected devices that allows you to discover and monitor devices, services, and vulnerabilities across the Internet.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-shodan` in the **Enter npm package name** field
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installing the node, you can use it like any other node. n8n displays the node in search results in the **Nodes** panel.

### Manual Installation

To get started install the package in your n8n root directory:

```bash
npm install n8n-nodes-shodan
```

For Docker-based deployments, add the following line before the font installation command in your [n8n Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile):

```
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-shodan
```

## Operations

### Host
- **Get**: Returns all services that have been found on the given host IP address

### Search
- **Query**: Search Shodan using the same query syntax as the website
- **Count**: Get the total number of results that matched the query (doesn't consume query credits)
- **Facets**: List all search facets that can be used for summary information
- **Filters**: List all filters that can be used when searching

### DNS
- **Resolve**: Look up the IP address for the provided list of hostnames
- **Reverse**: Look up the hostnames that have been defined for the given list of IP addresses

### Domain
- **Get Info**: Get all the subdomains and other DNS entries for the given domain

## Credentials

To use this node, you need a Shodan API key. Here's how to set it up:

### Prerequisites

1. Sign up for a Shodan account at [https://account.shodan.io/register](https://account.shodan.io/register)
2. Choose a plan:
   - **Free**: Limited queries per month
   - **Membership**: More queries and additional features
   - **Enterprise**: Unlimited queries and full access

### Getting Your API Key

1. Log in to your Shodan account at [https://account.shodan.io/](https://account.shodan.io/)
2. Your API key will be displayed on the account page
3. Copy the API key

### Setting Up Credentials in n8n

1. In n8n, go to **Credentials** in the left sidebar
2. Click **Add Credential**
3. Search for "Shodan API" and select it
4. Enter your API key in the **API Key** field
5. Click **Save**

## Compatibility

- **Minimum n8n version**: 0.180.0
- **Tested against**: n8n 1.0.0+

## Usage

### Basic Examples

#### Search for Apache servers in the United States
1. Add the Shodan node to your workflow
2. Select **Resource**: Search
3. Select **Operation**: Query
4. Enter **Query**: `apache country:US`
5. Execute the node

#### Look up IP address information
1. Add the Shodan node to your workflow
2. Select **Resource**: Host
3. Select **Operation**: Get
4. Enter **IP Address**: `8.8.8.8`
5. Execute the node

#### Resolve domain to IP
1. Add the Shodan node to your workflow
2. Select **Resource**: DNS
3. Select **Operation**: Resolve
4. Enter **Hostnames**: `google.com,facebook.com`
5. Execute the node

#### Get domain information and subdomains
1. Add the Shodan node to your workflow
2. Select **Resource**: Domain
3. Select **Operation**: Get Info
4. Enter **Domain**: `example.com`
5. Optionally enable **History** for historical DNS data
6. Optionally select a specific DNS **Type** (A, AAAA, CNAME, etc.)
7. Execute the node

### Search Query Syntax

Shodan uses filters to narrow down search results. Here are some common filters:

- `country:US` - Filter by country code
- `port:22` - Filter by port number
- `org:Google` - Filter by organization
- `product:nginx` - Filter by product name
- `os:Windows` - Filter by operating system
- `city:"Los Angeles"` - Filter by city
- `net:8.8.8.0/24` - Filter by network range

You can combine multiple filters:
```
apache country:US port:443 city:"New York"
```

For a complete list of filters, use the **Search > Filters** operation or visit the [Shodan search filters page](https://www.shodan.io/search/filters).

### API Credits

Be aware that some operations consume API credits:

- **Host Search (Query)**: Consumes 1 query credit if the search contains a filter or accessing results past the 1st page
- **Domain Info**: Uses 1 query credit per lookup
- **Host Count**: Does NOT consume query credits (use this for getting totals)

Check your remaining credits using the Shodan API Info endpoint or in your account dashboard.

### Common Use Cases

1. **Security Monitoring**: Monitor your IP ranges for exposed services
2. **Vulnerability Research**: Find devices running specific software versions
3. **Asset Discovery**: Discover all internet-facing assets for an organization
4. **Threat Intelligence**: Track malicious IPs and services
5. **Compliance Checks**: Verify that sensitive services aren't publicly exposed

### Tips

- Use the **Count** operation first to check how many results you'll get before running a full search
- Use **Facets** to get summary statistics (e.g., top countries, organizations) without downloading all results
- For large result sets, use pagination with the **Page** parameter
- Enable **Minify** to reduce response size for searches
- Combine with other n8n nodes for automated security workflows

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Shodan API Documentation](https://developer.shodan.io/api)
* [Shodan Account Dashboard](https://account.shodan.io/)

## License

[MIT](LICENSE.md)

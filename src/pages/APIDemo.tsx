import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { sendAPI, APIRequest, APIResponse } from '@/services/api';
import { Code, Send, Database, Zap } from 'lucide-react';

/**
 * API Demo Page - Shows how to use the sendAPI function
 * Demonstrates the custom socket-based API architecture
 * © 2026 RWNA Engineering Sdn. Bhd.
 */
export default function APIDemo() {
  const [request, setRequest] = useState<APIRequest>({
    route: '/users',
    data: {
      pagi: {
        page: 1,
        keyword: '',
        limit: 20
      }
    }
  });
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const result = await sendAPI(request);
      setResponse(result);
    } catch (error) {
      setResponse({
        route: request.route,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: null
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleRequests = [
    {
      name: 'Get Users',
      request: {
        route: '/users',
        data: {
          pagi: { page: 1, keyword: '', limit: 20 }
        }
      }
    },
    {
      name: 'Update User',
      request: {
        route: '/users/update',
        data: {
          _id: 'user123',
          name: 'Rizal Salim',
          email: 'rizalsalim@gmail.com'
        }
      }
    },
    {
      name: 'Delete User',
      request: {
        route: '/users/delete',
        data: {
          _id: 'user123'
        }
      }
    },
    {
      name: 'Get Projects',
      request: {
        route: '/projects',
        data: {
          pagi: { page: 1, keyword: 'offshore', limit: 10 }
        }
      }
    },
    {
      name: 'Create Project',
      request: {
        route: '/projects/create',
        data: {
          title: 'New Offshore Platform',
          description: 'Maintenance project for offshore platform',
          status: 'active',
          client: 'Petronas'
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Demo</h1>
            <p className="text-muted-foreground">
              Test the custom socket-based API with single sendAPI function
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                API Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Example Requests */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quick Examples:</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exampleRequests.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setRequest(example.request)}
                      className="text-xs"
                    >
                      {example.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Route Input */}
              <div>
                <label className="text-sm font-medium mb-2 block">Route:</label>
                <Input
                  value={request.route}
                  onChange={(e) => setRequest({ ...request, route: e.target.value })}
                  placeholder="/users"
                  className="font-mono"
                />
              </div>

              {/* Data Input */}
              <div>
                <label className="text-sm font-medium mb-2 block">Data (JSON):</label>
                <Textarea
                  value={JSON.stringify(request.data, null, 2)}
                  onChange={(e) => {
                    try {
                      const data = JSON.parse(e.target.value);
                      setRequest({ ...request, data });
                    } catch (error) {
                      // Invalid JSON, keep the text for editing
                    }
                  }}
                  placeholder='{"pagi": {"page": 1, "keyword": "", "limit": 20}}'
                  className="font-mono text-sm min-h-[120px]"
                />
              </div>

              {/* Send Button */}
              <Button 
                onClick={handleSendRequest} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Response Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                API Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              {response ? (
                <div className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <Badge variant={response.error ? 'destructive' : 'default'}>
                      {response.error ? 'Error' : 'Success'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Route: {response.route}
                    </span>
                  </div>

                  {/* Response Data */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Response:</label>
                    <Textarea
                      value={JSON.stringify(response, null, 2)}
                      readOnly
                      className="font-mono text-sm min-h-[200px] bg-muted"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No response yet. Send a request to see the result.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>API Usage Documentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Request Format</h3>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "route": "/users",
  "data": {
    "pagi": {
      "page": 1,
      "keyword": "",
      "limit": 20
    }
  }
}`}
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Response Format</h3>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "route": "/users",
  "error": null,
  "data": [
    {
      "_id": "user123",
      "name": "Rizal Salim",
      "email": "rizal@rwna.com"
    }
  ]
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Usage in Code</h3>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { sendAPI } from '@/services/api';

// Example usage
const response = await sendAPI({
  route: '/users',
  data: {
    pagi: { page: 1, keyword: '', limit: 20 }
  }
});

if (response.error) {
  console.error('API Error:', response.error);
} else {
  console.log('Success:', response.data);
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
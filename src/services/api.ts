/**
 * RWNA CMS API Service - Mock Data (Socket Disabled)
 * Custom token authentication with single sendAPI function
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'ws://localhost:3001';
const API_TOKEN_KEY = 'rwna_custom_token';

// Types for API communication
export interface APIRequest {
  route: string;
  data?: any;
}

export interface APIResponse {
  route: string;
  error: string | null;
  data?: any;
}

export interface PaginationParams {
  page: number;
  keyword: string;
  limit: number;
}

// SOCKET SERVICE COMMENTED OUT - USING MOCK DATA FOR NOW
/*
// Socket connection management
class SocketAPIManager {
  private socket: WebSocket | null = null;
  private requestQueue: Map<string, { resolve: Function; reject: Function }> = new Map();
  private requestId = 0;

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      this.socket = new WebSocket(API_BASE_URL);
      
      this.socket.onopen = () => {
        console.log('Socket connected to RWNA API');
      };

      this.socket.onmessage = (event) => {
        try {
          const response: APIResponse & { requestId?: string } = JSON.parse(event.data);
          
          if (response.requestId && this.requestQueue.has(response.requestId)) {
            const { resolve, reject } = this.requestQueue.get(response.requestId)!;
            this.requestQueue.delete(response.requestId);
            
            if (response.error) {
              reject(new Error(response.error));
            } else {
              resolve(response);
            }
          }
        } catch (error) {
          console.error('Failed to parse socket response:', error);
        }
      };

      this.socket.onclose = () => {
        console.log('Socket disconnected, attempting to reconnect...');
        setTimeout(() => this.connect(), 3000);
      };

      this.socket.onerror = (error) => {
        console.error('Socket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to socket:', error);
      // Fallback to HTTP if socket fails
    }
  }

  public async send(request: APIRequest): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        // Fallback to HTTP request
        return this.sendHTTP(request).then(resolve).catch(reject);
      }

      const requestId = `req_${++this.requestId}_${Date.now()}`;
      const token = localStorage.getItem(API_TOKEN_KEY);
      
      const payload = {
        ...request,
        requestId,
        token
      };

      this.requestQueue.set(requestId, { resolve, reject });
      this.socket.send(JSON.stringify(payload));

      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.requestQueue.has(requestId)) {
          this.requestQueue.delete(requestId);
          reject(new Error('Request timeout'));
        }
      }, 30000);
    });
  }

  private async sendHTTP(request: APIRequest): Promise<APIResponse> {
    const httpUrl = API_BASE_URL.replace('ws://', 'http://').replace('wss://', 'https://');
    const token = localStorage.getItem(API_TOKEN_KEY);
    
    try {
      const response = await fetch(`${httpUrl}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Custom ${token}` : '',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`HTTP request failed: ${error.message}`);
    }
  }
}

// Global socket manager instance
const socketManager = new SocketAPIManager();
*/

/**
 * Main API function - MOCK VERSION (Socket disabled)
 * @param request - API request with route and data
 * @returns Promise<APIResponse>
 */
export const sendAPI = async (request: APIRequest): Promise<APIResponse> => {
  // Mock response for development
  console.log('Mock API call:', request);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        route: request.route,
        error: null,
        data: { success: true, message: 'Mock response - Socket service disabled' }
      });
    }, 100);
  });
};

/**
 * Handle API Response - Mock version
 */
export const handleAPIResponse = (response: APIResponse, onSuccess?: (data: any) => void, onError?: (error: string) => void) => {
  if (response.error) {
    console.error('API Error:', response.error);
    if (onError) onError(response.error);
  } else {
    console.log('API Success:', response.data);
    if (onSuccess) onSuccess(response.data);
  }
};

// Authentication helpers
export const authAPI = {
  login: async (email: string, password: string): Promise<APIResponse> => {
    // Mock login
    const mockUser = { id: '1', email, name: 'Admin User', role: 'admin' };
    const mockToken = 'mock_token_' + Date.now();
    
    localStorage.setItem(API_TOKEN_KEY, mockToken);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    
    return {
      route: '/auth/login',
      error: null,
      data: { token: mockToken, user: mockUser }
    };
  },

  logout: (): void => {
    localStorage.removeItem(API_TOKEN_KEY);
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): any | null => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem(API_TOKEN_KEY);
  }
};

// Mock API functions - all return success responses
export const usersAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    // Import mock data dynamically to avoid circular imports
    const { mockUsers } = await import('@/services/mockData');
    return { route: '/users', error: null, data: { users: mockUsers, total: mockUsers.length } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/users/get', error: null, data: { user: null } };
  },
  create: async (userData: any): Promise<APIResponse> => {
    return { route: '/users/create', error: null, data: { success: true } };
  },
  update: async (id: string, userData: any): Promise<APIResponse> => {
    return { route: '/users/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/users/delete', error: null, data: { success: true } };
  }
};

export const rolesAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    // Import mock data dynamically to avoid circular imports
    const { mockRoles } = await import('@/services/mockData');
    return { route: '/roles', error: null, data: { roles: mockRoles, total: mockRoles.length } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/roles/get', error: null, data: { role: null } };
  },
  create: async (roleData: any): Promise<APIResponse> => {
    return { route: '/roles/create', error: null, data: { success: true } };
  },
  update: async (id: string, roleData: any): Promise<APIResponse> => {
    return { route: '/roles/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/roles/delete', error: null, data: { success: true } };
  }
};

export const projectsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    const { mockProjects } = await import('@/services/mockData');
    return { route: '/projects', error: null, data: { projects: mockProjects, total: mockProjects.length } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/projects/get', error: null, data: { project: null } };
  },
  create: async (projectData: any): Promise<APIResponse> => {
    return { route: '/projects/create', error: null, data: { success: true } };
  },
  update: async (id: string, projectData: any): Promise<APIResponse> => {
    return { route: '/projects/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/projects/delete', error: null, data: { success: true } };
  }
};

export const clientsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    const { mockClients } = await import('@/services/mockData');
    return { route: '/clients', error: null, data: { clients: mockClients, total: mockClients.length } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/clients/get', error: null, data: { client: null } };
  },
  create: async (clientData: any): Promise<APIResponse> => {
    return { route: '/clients/create', error: null, data: { success: true } };
  },
  update: async (id: string, clientData: any): Promise<APIResponse> => {
    return { route: '/clients/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/clients/delete', error: null, data: { success: true } };
  }
};

export const newsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return { route: '/news', error: null, data: { news: [], total: 0 } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/news/get', error: null, data: { news: null } };
  },
  create: async (newsData: any): Promise<APIResponse> => {
    return { route: '/news/create', error: null, data: { success: true } };
  },
  update: async (id: string, newsData: any): Promise<APIResponse> => {
    return { route: '/news/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/news/delete', error: null, data: { success: true } };
  }
};

export const careerAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return { route: '/career', error: null, data: { jobs: [], total: 0 } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/career/get', error: null, data: { job: null } };
  },
  create: async (jobData: any): Promise<APIResponse> => {
    return { route: '/career/create', error: null, data: { success: true } };
  },
  update: async (id: string, jobData: any): Promise<APIResponse> => {
    return { route: '/career/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/career/delete', error: null, data: { success: true } };
  }
};

export const trainingAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return { route: '/training', error: null, data: { trainings: [], total: 0 } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/training/get', error: null, data: { training: null } };
  },
  create: async (trainingData: any): Promise<APIResponse> => {
    return { route: '/training/create', error: null, data: { success: true } };
  },
  update: async (id: string, trainingData: any): Promise<APIResponse> => {
    return { route: '/training/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/training/delete', error: null, data: { success: true } };
  }
};

// Access Logs API (Mock)
export const accessLogsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    const { mockAccessLogs } = await import('@/services/mockData');
    return { route: '/access-logs', error: null, data: { logs: mockAccessLogs, total: mockAccessLogs.length } };
  },
  getById: async (id: string): Promise<APIResponse> => {
    return { route: '/access-logs/get', error: null, data: { log: null } };
  },
  create: async (logData: any): Promise<APIResponse> => {
    return { route: '/access-logs/create', error: null, data: { success: true } };
  },
  update: async (id: string, logData: any): Promise<APIResponse> => {
    return { route: '/access-logs/update', error: null, data: { success: true } };
  },
  delete: async (id: string): Promise<APIResponse> => {
    return { route: '/access-logs/delete', error: null, data: { success: true } };
  },
  log: async (logData: any): Promise<APIResponse> => {
    console.log('Mock access log:', logData);
    return { route: '/access-logs/log', error: null, data: { success: true } };
  }
};
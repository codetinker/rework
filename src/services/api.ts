/**
 * RWNA CMS API Service - Socket-based Communication
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

/**
 * Main API function - sends all requests through socket/HTTP
 * @param request - API request with route and data
 * @returns Promise<APIResponse>
 */
export const sendAPI = async (request: APIRequest): Promise<APIResponse> => {
  try {
    const response = await socketManager.send(request);
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      route: request.route,
      error: error.message || 'Unknown error occurred',
      data: null
    };
  }
};

// Authentication helpers
export const authAPI = {
  login: async (email: string, password: string): Promise<APIResponse> => {
    const response = await sendAPI({
      route: '/auth/login',
      data: { email, password }
    });
    
    if (!response.error && response.data?.token) {
      localStorage.setItem(API_TOKEN_KEY, response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    
    return response;
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

// Users API
export const usersAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/users',
      data: { pagi }
    });
  },

  getById: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/users/get',
      data: { _id: id }
    });
  },

  create: async (userData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/users/create',
      data: userData
    });
  },

  update: async (id: string, userData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/users/update',
      data: { _id: id, ...userData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/users/delete',
      data: { _id: id }
    });
  }
};

// Roles API
export const rolesAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/roles',
      data: { pagi }
    });
  },

  getById: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/roles/get',
      data: { _id: id }
    });
  },

  create: async (roleData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/roles/create',
      data: roleData
    });
  },

  update: async (id: string, roleData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/roles/update',
      data: { _id: id, ...roleData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/roles/delete',
      data: { _id: id }
    });
  }
};

// Projects API
export const projectsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/projects',
      data: { pagi }
    });
  },

  getById: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/projects/get',
      data: { _id: id }
    });
  },

  create: async (projectData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/projects/create',
      data: projectData
    });
  },

  update: async (id: string, projectData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/projects/update',
      data: { _id: id, ...projectData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/projects/delete',
      data: { _id: id }
    });
  }
};

// Clients API
export const clientsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/clients',
      data: { pagi }
    });
  },

  getById: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/clients/get',
      data: { _id: id }
    });
  },

  create: async (clientData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/clients/create',
      data: clientData
    });
  },

  update: async (id: string, clientData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/clients/update',
      data: { _id: id, ...clientData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/clients/delete',
      data: { _id: id }
    });
  }
};

// News API
export const newsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/news',
      data: { pagi }
    });
  },

  getById: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/news/get',
      data: { _id: id }
    });
  },

  create: async (newsData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/news/create',
      data: newsData
    });
  },

  update: async (id: string, newsData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/news/update',
      data: { _id: id, ...newsData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/news/delete',
      data: { _id: id }
    });
  }
};

// Inquiries API
export const inquiriesAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/inquiries',
      data: { pagi }
    });
  },

  getById: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/inquiries/get',
      data: { _id: id }
    });
  },

  create: async (inquiryData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/inquiries/create',
      data: inquiryData
    });
  },

  update: async (id: string, inquiryData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/inquiries/update',
      data: { _id: id, ...inquiryData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/inquiries/delete',
      data: { _id: id }
    });
  }
};

// Career API
export const careerAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/career',
      data: { pagi }
    });
  },

  create: async (jobData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/career/create',
      data: jobData
    });
  },

  update: async (id: string, jobData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/career/update',
      data: { _id: id, ...jobData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/career/delete',
      data: { _id: id }
    });
  }
};

// Training API
export const trainingAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/training',
      data: { pagi }
    });
  },

  create: async (trainingData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/training/create',
      data: trainingData
    });
  },

  update: async (id: string, trainingData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/training/update',
      data: { _id: id, ...trainingData }
    });
  },

  delete: async (id: string): Promise<APIResponse> => {
    return sendAPI({
      route: '/training/delete',
      data: { _id: id }
    });
  }
};

// Chat API
export const chatAPI = {
  getConversations: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 20 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/chat/conversations',
      data: { pagi }
    });
  },

  getMessages: async (conversationId: string, pagi: PaginationParams = { page: 1, keyword: '', limit: 50 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/chat/messages',
      data: { conversationId, pagi }
    });
  },

  sendMessage: async (messageData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/chat/send',
      data: messageData
    });
  }
};

// Access Logs API
export const accessLogsAPI = {
  getAll: async (pagi: PaginationParams = { page: 1, keyword: '', limit: 50 }): Promise<APIResponse> => {
    return sendAPI({
      route: '/access-logs',
      data: { pagi }
    });
  },

  log: async (logData: any): Promise<APIResponse> => {
    return sendAPI({
      route: '/access-logs/create',
      data: logData
    });
  }
};

// Utility functions for handling API responses
export const handleAPIResponse = (response: APIResponse) => {
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
};

export const handleAPIError = (error: any): { error: string; data: null } => {
  console.error('API Error:', error);
  return {
    error: error.message || 'Unknown error occurred',
    data: null
  };
};

// Token management
export const tokenAPI = {
  setToken: (token: string) => {
    localStorage.setItem(API_TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(API_TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(API_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(API_TOKEN_KEY);
  }
};

// Export the main API function
export default sendAPI;
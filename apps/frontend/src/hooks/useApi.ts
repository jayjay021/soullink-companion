import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import type { components } from '@repo/api-spec/types';



// API endpoints
const API_BASE = '/api';
const API_V1_BASE = '/api/v1';

// Health check
export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_BASE}/health`);
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Users
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const response = await apiClient.get(`${API_V1_BASE}/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { username: string }) => {
      const response = await apiClient.post(`${API_V1_BASE}/users`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users', data.user.id] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      userId, 
      data 
    }: { 
      userId: string; 
      data: { username: string } 
    }) => {
      const response = await apiClient.patch(`${API_V1_BASE}/users/${userId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
    },
  });
}

// Sessions
export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const response = await apiClient.get(`${API_V1_BASE}/session`);
      return response.data;
    },
  });
}

export function useSession(sessionId: string) {
  return useQuery({
    queryKey: ['sessions', sessionId],
    queryFn: async () => {
      const response = await apiClient.get(`${API_V1_BASE}/session/${sessionId}`);
      return response.data;
    },
    enabled: !!sessionId,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      const response = await apiClient.post(`${API_V1_BASE}/session`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      sessionId, 
      data 
    }: { 
      sessionId: string; 
      data: { name: string; description: string } 
    }) => {
      const response = await apiClient.patch(`${API_V1_BASE}/session/${sessionId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sessions', variables.sessionId] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sessionId: string) => {
      await apiClient.delete(`${API_V1_BASE}/session/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

export function useJoinSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      sessionId, 
      data 
    }: { 
      sessionId: string; 
      data: { userId: string } 
    }) => {
      const response = await apiClient.post(`${API_V1_BASE}/session/${sessionId}/join`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sessions', variables.sessionId] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}

// Pokemon
export function usePokemon(sessionId: string, filters?: {
  userId?: string;
  routeName?: string;
  status?: components['schemas']['PokemonStatus'];
}) {
  return useQuery({
    queryKey: ['pokemon', sessionId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.routeName) params.append('routeName', filters.routeName);
      if (filters?.status) params.append('status', filters.status);
      
      const response = await apiClient.get(
        `${API_V1_BASE}/pokemon/${sessionId}?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!sessionId,
  });
}

export function useAddPokemon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      sessionId, 
      data 
    }: { 
      sessionId: string; 
      data: components['schemas']['AddPokemonRequest'] 
    }) => {
      const response = await apiClient.post(`${API_V1_BASE}/pokemon/${sessionId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pokemon', variables.sessionId] });
    },
  });
}

export function useUpdatePokemon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      sessionId, 
      pokemonId, 
      data 
    }: { 
      sessionId: string; 
      pokemonId: string; 
      data: components['schemas']['UpdatePokemonRequest'] 
    }) => {
      const response = await apiClient.patch(
        `${API_V1_BASE}/pokemon/${sessionId}/${pokemonId}`, 
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pokemon', variables.sessionId] });
    },
  });
}

export function usePokemonRoutes(sessionId: string, userId?: string) {
  return useQuery({
    queryKey: ['pokemon-routes', sessionId, userId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      
      const response = await apiClient.get(
        `${API_V1_BASE}/pokemon/${sessionId}/routes?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!sessionId,
  });
}

// Pokedex
export function usePokedexPokemon(filters?: {
  id?: number;
  name?: string;
  type?: string;
  minId?: number;
  maxId?: number;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ['pokedex-pokemon', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.id) params.append('id', filters.id.toString());
      if (filters?.name) params.append('name', filters.name);
      if (filters?.type) params.append('type', filters.type);
      if (filters?.minId) params.append('minId', filters.minId.toString());
      if (filters?.maxId) params.append('maxId', filters.maxId.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.offset) params.append('offset', filters.offset.toString());
      const response = await apiClient.get(
        `${API_V1_BASE}/pokedex/pokemon?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - pokedex data doesn't change often
  });
}

// Dashboard stats (computed from other data)
export function useDashboardStats() {
  const { data: sessions } = useSessions();
  const { data: health } = useHealth();
  
  return {
    data: sessions ? {
      totalSessions: sessions.sessions.length,
      activeSessions: sessions.sessions.filter((s: { status: string }) => s.status === 'STARTED').length,
      waitingSessions: sessions.sessions.filter((s: { status: string }) => s.status === 'WAITING').length,
      finishedSessions: sessions.sessions.filter((s: { status: string }) => s.status === 'FINISHED').length,
      apiStatus: health?.status || 'unknown',
      uptime: health?.uptime || 0,
    } : undefined,
    isLoading: !sessions && !health,
    error: null,
  };
} 
import { apiClient } from './client';

export function createOrder(order) {
    return apiClient.post('/orders', {
        ...order,
        id: `o_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending',
    });
}

export function getOrders() {
    return apiClient.get('/orders');
}
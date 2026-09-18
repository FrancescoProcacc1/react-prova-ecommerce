import { apiClient } from './client';

export function getProducts(params = {}) {
  const search = new URLSearchParams();
  if (params.category) search.set('category', params.category);
  if (params.q) search.set('q', params.q);
  if (params._sort) search.set('_sort', params._sort);
  const qs = search.toString();
  return apiClient.get(`/products${qs ? `?${qs}` : ''}`);
}

export function getProductById(id) {
  return apiClient.get(`/products/${id}`);
}

export function getCategories() {
  return apiClient.get('/products').then((products) =>
    [...new Set(products.map((p) => p.category))].sort(),
  );
}
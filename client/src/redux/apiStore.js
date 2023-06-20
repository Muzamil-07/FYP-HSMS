import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { nodeAPI } from '../services/nodeApi';

const apiStore = configureStore({
  reducer: {
    [nodeAPI.reducerPath]: nodeAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nodeAPI.middleware),

})

setupListeners(apiStore.dispatch)

export default apiStore
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function getRouter() {
  return createRouter({
    routeTree,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    Wrap: function WrapComponent({ children }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    },
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}

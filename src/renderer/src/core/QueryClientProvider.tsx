import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <OriginalQueryClientProvider client={queryClient}>
    {children}
  </OriginalQueryClientProvider>
)

export default QueryClientProvider

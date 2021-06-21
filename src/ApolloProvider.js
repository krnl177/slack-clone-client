import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import App from './App'

const client = new ApolloClient({
    uri: 'http://localhost:3005/graphql',
    cache: new InMemoryCache()
});


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
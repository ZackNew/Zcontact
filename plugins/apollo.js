import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split, ApolloLink, from } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";

export default function ({ store, app }, inject) {
  const connectionParams = () => {
    return {
      headers: {
        authorization: localStorage.getItem("token")
          ? `Bearer ${localStorage.getItem("token")}`
          : undefined,
      },
    };
  };

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (
      (graphQLErrors && graphQLErrors[0].extensions.code === "invalid-jwt") ||
      (networkError && networkError.message.indexOf("JWTExpired") !== -1)
    ) {
      store.dispatch("access/logout");
      Vue.notify({
        group: "global",
        title: "Session expired",
        text: `Your session has expired! Please login again.`,
        type: "error",
        duration: 90000,
      });
      localStorage.removeItem("token");
      console.log("signed out coz one of many reasons");
      app.router.replace("/");
      return;
    } else if (graphQLErrors) {
      // If there is a graphgl request error, the join all error messages and show them.
      Vue.notify({
        group: "global",
        title: "Error",
        text: `${
          graphQLErrors
            ? graphQLErrors.map((error) => error.message).join("<br/>")
            : ""
        }`,
        type: "error",
      });
      console.log("Error", graphQLErrors);
    }

    if (networkError) {
      Vue.notify({
        group: "global",
        title: "Network Error",
        text: `Couldn't connect to server.`,
        type: "info",
      });
      console.log("network error");
    }
  });

  const getDefinition = ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  };

  let cropconexAuthenticationLink = (operation, forward) => {
    const { headers } = operation.getContext();
    if (localStorage.getItem("token"))
      operation.setContext({
        headers: {
          authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
          ...headers,
        },
      });
    return forward(operation);
  };

  cropconexAuthenticationLink = new ApolloLink(cropconexAuthenticationLink);

  const cropconexHTTPLink = new HttpLink({
    uri: process.env.BASE_URL,
  });

  const cropconexWSLink = new WebSocketLink({
    uri: process.env.WS_URL,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams,
    },
  });

  const cropconexLink = split(
    getDefinition,
    cropconexWSLink,
    cropconexHTTPLink
  );

  const cropconexApolloClient = new ApolloClient({
    // errorLink can be addes in the list below
    link: from([errorLink, cropconexAuthenticationLink, cropconexLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    connectToDevTools: true,
  });

  const apolloProvider = new VueApollo({
    clients: {
      default: cropconexApolloClient,
    },
    defaultClient: cropconexApolloClient,
    errorHandler(error) {
      console.error(error);
    },
  });

  Vue.use(VueApollo);

  Vue.mixin({
    apolloProvider,
  });

  const resetCropConexSubscription = () => {
    cropconexWSLink.subscriptionClient.close(false, false);
  };

  inject("apollo", apolloProvider);
  inject("resetCropConexSubscription", resetCropConexSubscription);
}

import { jsx as _jsx } from "react/jsx-runtime";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useCallback, useMemo } from "react";
import { ConvexProviderWithAuth } from "convex/react";
/**
 * A wrapper React component which provides a {@link react.ConvexReactClient}
 * authenticated with Kinde.
 *
 * It must be wrapped by a configured `KindeProvider` from `@kinde-oss/kinde-auth-react`.
 *
 * @public
 * @example
 * ```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithKinde } from "convex/react-kinde";
import App from "./App.jsx";
import "./index.css";
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
console.log(import.meta.env.VITE_KINDE_LOGOUT_URI);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
      audience={import.meta.env.VITE_KINDE_AUDIENCE}
      isDangerouslyUseLocalStorage={true}
    >
      <ConvexProviderWithKinde client={convex}>
        <App />
      </ConvexProviderWithKinde>
    </KindeProvider>
  </React.StrictMode>
);
```
 */
export function ConvexProviderWithKinde({ children, client, }) {
    return (_jsx(ConvexProviderWithAuth, { client: client, useAuth: useAuthFromKinde, children: children }));
}
// Old Version
// export function useAuthFromKinde() {
//   const { isLoading, isAuthenticated, getToken } = useKindeAuth();
//   const fetchAccessToken = useCallback(
//     async () => {
//       // This might loop forever if `getToken` isn't memoized
//       return await getToken();
//     },
//     // If `getToken` isn't correctly memoized
//     // remove it from this dependency array
//     [getToken]
//   );
//   return useMemo(
//     () => ({
//       // Whether the auth provider is in a loading state
//       isLoading: isLoading,
//       // Whether the auth provider has the user signed in
//       isAuthenticated: isAuthenticated ?? false,
//       // The async function to fetch the ID token
//       fetchAccessToken,
//     }),
//     [isLoading, isAuthenticated, fetchAccessToken]
//   );
// }
// Better Version
/**
 * This code fetches the user's token from Kinde. It uses the Kinde SDK
 * to get the token, and then uses that token to make a call to the
 * Kinde API to get the user's token. The token is stored in the
 * fetchAccessToken variable. The fetchAccessToken variable is then
 * used to make a call to the Kinde API to get the user's token.
 *
 * @public
 * @returns {String} - The user's token
 */
function useAuthFromKinde() {
    const { isLoading, isAuthenticated, getToken } = useKindeAuth();
    const fetchAccessToken = useCallback(async ({ forceRefreshToken }) => {
        if (forceRefreshToken) {
            try {
                const response = await getToken();
                // Returns the token as string
                return response;
            }
            catch (error) {
                return null;
            }
        }
        // Add this line to ensure the function always returns a string or null
        return null;
    }, [getToken]);
    return useMemo(() => ({ isLoading, isAuthenticated, fetchAccessToken }), [isLoading, isAuthenticated, fetchAccessToken]);
}
//# sourceMappingURL=react.js.map
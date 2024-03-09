"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvexProviderWithKinde = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const kinde_auth_react_1 = require("@kinde-oss/kinde-auth-react");
const react_1 = require("react");
const react_2 = require("convex/react");
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
function ConvexProviderWithKinde({ children, client, }) {
    return ((0, jsx_runtime_1.jsx)(react_2.ConvexProviderWithAuth, { client: client, useAuth: useAuthFromKinde, children: children }));
}
exports.ConvexProviderWithKinde = ConvexProviderWithKinde;
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
    const { isLoading, isAuthenticated, getToken } = (0, kinde_auth_react_1.useKindeAuth)();
    const fetchAccessToken = (0, react_1.useCallback)((_a) => __awaiter(this, [_a], void 0, function* ({ forceRefreshToken }) {
        if (forceRefreshToken) {
            try {
                const response = yield getToken();
                // Returns the token as string
                return response;
            }
            catch (error) {
                return null;
            }
        }
        // Add this line to ensure the function always returns a string or null
        return null;
    }), [getToken]);
    return (0, react_1.useMemo)(() => ({ isLoading, isAuthenticated, fetchAccessToken }), [isLoading, isAuthenticated, fetchAccessToken]);
}
//# sourceMappingURL=react.js.map
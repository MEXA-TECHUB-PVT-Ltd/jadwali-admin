import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import VerificationCode from "./pages/auth/VerificationCode";
import ChangePassword from "./pages/auth/ChangePassword";
import Forgot from "./pages/auth/Forgot";
import ResetPassword from "./pages/auth/ResetPassword";
import Layout from "./components/dashboard/Layout";
import Dashboard from "./pages/dashboard/header/Dashboard";
import AllUsers from "./pages/dashboard/AllUsers";
import SubscribedUsers from "./pages/dashboard/SubscribedUsers";
import PrivacyPolicy from "./pages/dashboard/PrivacyPolicy";
import TermsConditions from "./pages/dashboard/TermsConditions";
import SubscriptionPlan from "./pages/dashboard/SubscriptionPlan";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Dashboard />} />
        <Route
          element={<SignIn />}
          path="/auth/sign-in"
        />
        <Route
          element={<Forgot />}
          path="/auth/forgot-password"
        />
        <Route
          element={<VerificationCode />}
          path="/auth/verification-code"
        />
        <Route
          element={<ResetPassword />}
          path="/auth/reset-password"
        />
        <Route
          element={<ChangePassword />}
          path="/auth/change-password"
        />
        <Route
          element={<Layout />}
          path="/dashboard"
        >
          <Route index element={<Dashboard />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="subscribed-users" element={<SubscribedUsers />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsConditions />} />
          <Route path="subscription-plan" element={<SubscriptionPlan />} />
        </Route>
      </>
    )
  );
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

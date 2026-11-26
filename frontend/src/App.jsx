import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./features/home/HomePage";
import ScrollManager from "./components/ScrollManager";
import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsTracker from "./components/AnalyticsTracker";
import CookieBanner from "./components/CookieBanner";
import Seo from "./components/Seo";
import NotFound from "./features/info/NotFoundPage";

// Code splitting: each page below is downloaded only when someone opens it, so the first visit loads faster.
// (Home and NotFound stay in the main file because they are the most common first pages.)
const Restaurant = lazy(() => import("./features/restaurant/RestaurantPage"));
const Hotel = lazy(() => import("./features/hotel/HotelPage"));
const Club = lazy(() => import("./features/club/ClubPage"));
const Privacy = lazy(() => import("./features/info/PrivacyPage"));
const Terms = lazy(() => import("./features/info/TermsPage"));
const Faq = lazy(() => import("./features/info/FaqPage"));
const BlogList = lazy(() => import("./features/info/BlogListPage"));
const BlogPost = lazy(() => import("./features/info/BlogPostPage"));
const AboutPage = lazy(() => import("./features/info/AboutPage"));
const ContactPage = lazy(() => import("./features/info/ContactPage"));
const GalleryPage = lazy(() => import("./features/info/GalleryPage"));
const Login = lazy(() => import("./features/auth/LoginPage"));
const Register = lazy(() => import("./features/auth/RegisterPage"));
const ForgotPassword = lazy(() => import("./features/auth/ForgotPasswordPage"));
const VerifyOtp = lazy(() => import("./features/auth/VerifyOtpPage"));
const ResetPassword = lazy(() => import("./features/auth/ResetPasswordPage"));

// Page titles for the account pages. They are kept out of search results (noindex).
const AUTH_TITLES = {
  "/login": "Log in",
  "/register": "Create account",
  "/forgot-password": "Forgot password",
  "/verify-otp": "Verify code",
  "/reset-password": "Reset password",
};

function AuthSeo() {
  const { pathname } = useLocation();
  const title = AUTH_TITLES[pathname];
  return title ? <Seo title={title} path={pathname} noindex /> : null;
}

// Pages only for visitors who are NOT logged in (login, register...).
// A logged-in customer who opens /login is sent to the homepage instead.
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <ScrollManager />
          <AnalyticsTracker />
          <AuthSeo />
          <Suspense fallback={<div className="grid min-h-screen place-items-center" role="status" aria-label="Loading page"><span className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/club" element={<Club />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <GuestRoute>
                  <ForgotPassword />
                </GuestRoute>
              }
            />
            <Route
              path="/verify-otp"
              element={
                <GuestRoute>
                  <VerifyOtp />
                </GuestRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <GuestRoute>
                  <ResetPassword />
                </GuestRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          <CookieBanner />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

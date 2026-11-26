import { Component } from "react";

// A safety net. If any component crashes while drawing, React would normally wipe the WHOLE page blank.
// This catches the crash and shows a friendly message with a reload button instead.
// (Error boundaries must be class components - this is one of the few places React still needs one.)
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("Page crashed:", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className="grid min-h-screen place-items-center bg-cream px-6 text-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-ink">Something went wrong</h1>
          <p className="mt-3 text-gray-600">Please refresh the page. If it keeps happening, contact us.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-brand px-8 py-3 text-sm font-bold text-white"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
}

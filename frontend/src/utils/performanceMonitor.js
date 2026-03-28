// Performance Monitoring Utilities

/**
 * Initialize performance monitoring
 * Tracks Core Web Vitals, resource loading, and custom events
 */
class PerformanceMonitor {
  constructor(options = {}) {
    this.metrics = {};
    this.trackedEvents = [];
    this.enableConsoleLogging = options.enableConsoleLogging || false;
    this.enableServerReporting = options.enableServerReporting || false;
    this.serverEndpoint = options.serverEndpoint || '/api/metrics';
  }

  /**
   * Start tracking a metric
   */
  startMetric(name) {
    this.metrics[name] = {
      startTime: performance.now(),
      marked: true,
    };
  }

  /**
   * End tracking a metric
   */
  endMetric(name) {
    if (!this.metrics[name]) {
      console.warn(`Metric "${name}" was not started`);
      return null;
    }

    const duration = performance.now() - this.metrics[name].startTime;
    this.metrics[name].duration = duration;
    this.metrics[name].marked = false;

    if (this.enableConsoleLogging) {
      console.log(`📊 Metric: ${name} - ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Track Core Web Vitals (LCP, FID, CLS)
   */
  trackCoreWebVitals() {
    try {
      // Largest Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.LCP = {
            value: entry.renderTime || entry.loadTime,
            good: entry.renderTime || entry.loadTime < 2500,
          };

          if (this.enableConsoleLogging) {
            console.log(`⏱️ LCP: ${this.metrics.LCP.value.toFixed(2)}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let cls = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = this.metrics.CLS?.sessions[0];
            const isConsecutive =
              firstSessionEntry &&
              entry.startTime - firstSessionEntry.startTime < 1000;

            if (isConsecutive) {
              firstSessionEntry.value += entry.value;
            } else {
              if (!this.metrics.CLS) {
                this.metrics.CLS = { value: 0, sessions: [] };
              }
              this.metrics.CLS.sessions.push({ value: entry.value, startTime: entry.startTime });
            }

            cls = Math.max(cls, firstSessionEntry?.value || 0);
          }
        }
        this.metrics.CLS = { value: cls, good: cls < 0.1 };

        if (this.enableConsoleLogging) {
          console.log(`📊 CLS: ${cls.toFixed(3)}`);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (err) {
      console.warn('Core Web Vitals tracking not supported:', err);
    }
  }

  /**
   * Track page load time
   */
  trackPageLoad() {
    window.addEventListener('load', () => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      this.metrics.pageLoad = {
        total: pageLoadTime,
        connect: connectTime,
        render: renderTime,
      };

      if (this.enableConsoleLogging) {
        console.log('📄 Page Load Metrics:', this.metrics.pageLoad);
      }
    });
  }

  /**
   * Track memory usage (if available)
   */
  trackMemory() {
    if (performance.memory) {
      setInterval(() => {
        this.metrics.memory = {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit,
        };
      }, 5000);
    }
  }

  /**
   * Track resource loading times
   */
  trackResourceTiming() {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      const resourceMetrics = {};

      resources.forEach(resource => {
        const type = resource.initiatorType;
        if (!resourceMetrics[type]) {
          resourceMetrics[type] = { count: 0, totalTime: 0, avgTime: 0 };
        }
        resourceMetrics[type].count += 1;
        resourceMetrics[type].totalTime += resource.duration;
        resourceMetrics[type].avgTime = resourceMetrics[type].totalTime / resourceMetrics[type].count;
      });

      this.metrics.resources = resourceMetrics;

      if (this.enableConsoleLogging) {
        console.log('📦 Resource Metrics:', resourceMetrics);
      }
    });
  }

  /**
   * Record a custom event
   */
  recordEvent(name, data = {}) {
    this.trackedEvents.push({
      name,
      data,
      timestamp: new Date().toISOString(),
    });

    if (this.enableConsoleLogging) {
      console.log(`🎯 Event: ${name}`, data);
    }
  }

  /**
   * Get all metrics
   */
  getMetrics() {
    return {
      metrics: this.metrics,
      events: this.trackedEvents,
    };
  }

  /**
   * Send metrics to server
   */
  async reportMetrics() {
    if (!this.enableServerReporting) return;

    try {
      const response = await fetch(this.serverEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.getMetrics()),
      });

      if (response.ok) {
        console.log('✅ Metrics reported successfully');
      }
    } catch (err) {
      console.error('Failed to report metrics:', err);
    }
  }

  /**
   * Initialize all tracking
   */
  initialize() {
    this.trackPageLoad();
    this.trackCoreWebVitals();
    this.trackResourceTiming();
    this.trackMemory();
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor({
  enableConsoleLogging: process.env.NODE_ENV === 'development',
});

export default performanceMonitor;
export { PerformanceMonitor };

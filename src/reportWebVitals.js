// reportWebVitals.js

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // This function sends the Web Vitals data to an analytics endpoint
    // or other monitoring service.
    import("web-vitals").then(({ getCLS, getFID, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}

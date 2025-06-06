import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Application metrics tracking
let requestCount = 0;
let errorCount = 0;
const startTime = Date.now();
// localStorage.removeItem("token");
// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//Get the directory name from the file path
const __dirname = dirname(__filename);

//what this line does is it tells that the server can expect json input when using put or post or any other method.
app.use(express.json());

// Request logging and metrics middleware
app.use((req, res, next) => {
  requestCount++;
  const startTime = Date.now();

  console.log(
    `📥 ${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`
  );

  // Log response time
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode;

    if (status >= 400) {
      errorCount++;
      console.log(`❌ ${req.method} ${req.path} - ${status} - ${duration}ms`);
    } else {
      console.log(`✅ ${req.method} ${req.path} - ${status} - ${duration}ms`);
    }
  });

  next();
});
//Serves the HTML file from the public directory
// Tells express to serve all files from the public folder as static assets /file.
// Any requests for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, "../public")));

//Serving up the HTML file from the public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check endpoint for monitoring
app.get("/health", (req, res) => {
  const uptime = Date.now() - startTime;
  const uptimeMinutes = Math.floor(uptime / 60000);

  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: `${uptimeMinutes} minutes`,
    requests: requestCount,
    errors: errorCount,
    errorRate:
      requestCount > 0
        ? ((errorCount / requestCount) * 100).toFixed(2) + "%"
        : "0%",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});

// Metrics endpoint for monitoring tools
app.get("/metrics", (req, res) => {
  const uptime = Date.now() - startTime;

  res.status(200).json({
    app_requests_total: requestCount,
    app_errors_total: errorCount,
    app_uptime_seconds: Math.floor(uptime / 1000),
    app_memory_usage: process.memoryUsage(),
    app_cpu_usage: process.cpuUsage(),
  });
});

//Routes
app.use("/auth", authRoutes);

//Routes related to todo
app.use("/todos", authMiddleware, todoRoutes);

// Global error handling middleware (acts like Bugsnag)
app.use((err, req, res, next) => {
  errorCount++;

  // Log the error with context
  console.error(`🚨 ERROR: ${new Date().toISOString()}`);
  console.error(`Path: ${req.method} ${req.path}`);
  console.error(`User Agent: ${req.get("User-Agent")}`);
  console.error(`IP: ${req.ip}`);
  console.error(`Error: ${err.message}`);
  console.error(`Stack: ${err.stack}`);

  // Send error response
  res.status(500).json({
    error: "Internal Server Error",
    timestamp: new Date().toISOString(),
    path: req.path,
    requestId: Date.now().toString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  console.log(`❓ 404: ${req.method} ${req.path} - Resource not found`);
  res.status(404).json({
    error: "Resource not found",
    path: req.path,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(` Server has started at port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
  console.log(` Metrics: http://localhost:${PORT}/metrics`);
});

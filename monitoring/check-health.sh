#!/bin/bash

# Simple health monitoring script
# This demonstrates basic monitoring concepts

echo "🔍 Application Health Monitor"
echo "=============================="

# Get service URL (adjust as needed)
if command -v kubectl &> /dev/null; then
    # If kubectl available, use port-forward
    kubectl port-forward service/todo-backend-service 8080:80 &
    PID=$!
    sleep 2
    URL="http://localhost:8080"
else
    URL="http://localhost:5000"
fi

echo "Checking health endpoint..."

# Health check
HEALTH_RESPONSE=$(curl -s "$URL/health")
HEALTH_STATUS=$?

if [ $HEALTH_STATUS -eq 0 ]; then
    echo "Application is healthy"
    echo "$HEALTH_RESPONSE" | jq . 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo "Application health check failed"
    exit 1
fi

echo ""
echo "Checking metrics endpoint..."

# Metrics check
METRICS_RESPONSE=$(curl -s "$URL/metrics")
METRICS_STATUS=$?

if [ $METRICS_STATUS -eq 0 ]; then
    echo "Metrics collected successfully"
    echo "$METRICS_RESPONSE" | jq . 2>/dev/null || echo "$METRICS_RESPONSE"
else
    echo "Metrics collection failed"
fi

# Cleanup background process if started
if [ ! -z "$PID" ]; then
    kill $PID 2>/dev/null
fi

echo ""
echo "Monitoring check complete!" 

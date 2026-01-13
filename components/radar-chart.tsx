"use client";

import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { MetricScore } from "@/lib/types";

interface RadarChartProps {
  metrics: Record<string, MetricScore>;
  size?: number;
}

export function RadarChart({ metrics, size = 400 }: RadarChartProps) {
  const isMobile = useIsMobile();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate mobile container dimensions
  const mobileViewportWidth = 320; // Typical mobile width for safe viewing
  const mobileViewportHeight = 320; // Square container for mobile
  const mobileScale = Math.min(
    mobileViewportWidth / size,
    mobileViewportHeight / size
  );

  // Transform state for pan and zoom
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Effect to update scale when mobile state changes
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize transform with proper mobile scaling
  useEffect(() => {
    if (!isInitialized) {
      setTransform({
        x: 0,
        y: 0,
        scale: isMobile ? mobileScale : 1,
      });
      setIsInitialized(true);
    }
  }, [isMobile, mobileScale, isInitialized]);

  // Touch state for gesture handling
  const touchStateRef = useRef({
    lastTouchDistance: 0,
    lastTouchCenter: { x: 0, y: 0 },
    isDragging: false,
    initialScale: 1,
    lastScale: 1,
  });

  const chartData = useMemo(() => {
    const dimensions = [
      { key: "self-regulation", label: "Self-Regulation", angle: 0 },
      { key: "time-management", label: "Time Mgmt", angle: 30 },
      { key: "task-management", label: "Task Mgmt", angle: 60 },
      { key: "metacognitive-monitoring", label: "Metacognition", angle: 90 },
      { key: "concentration", label: "Concentration", angle: 120 },
      { key: "digital-literacy", label: "Digital Literacy", angle: 150 },
      { key: "collaboration", label: "Collaboration", angle: 180 },
      { key: "adaptability", label: "Adaptability", angle: 210 },
      { key: "note-taking", label: "Note-Taking", angle: 240 },
      { key: "retention", label: "Retention", angle: 270 },
      { key: "critical-thinking", label: "Critical Thinking", angle: 300 },
      { key: "well-being", label: "Well-being", angle: 330 },
    ];

    const center = size / 2;
    const maxRadius = (size / 2) * 0.7;

    // Generate concentric circles for grid
    const circles = [20, 40, 60, 80, 100].map((percent) => ({
      radius: (maxRadius * percent) / 100,
      label: percent === 100 ? "+100" : percent === 0 ? "0" : "",
    }));

    // Generate axis lines
    const axes = dimensions.map((dim) => {
      const angleRad = (dim.angle * Math.PI) / 180;
      return {
        x1: center,
        y1: center,
        x2: center + maxRadius * Math.cos(angleRad),
        y2: center + maxRadius * Math.sin(angleRad),
        label: dim.label,
        labelX: center + (maxRadius + 30) * Math.cos(angleRad),
        labelY: center + (maxRadius + 30) * Math.sin(angleRad),
      };
    });

    // Generate data polygon points
    const dataPoints = dimensions.map((dim) => {
      const score = metrics[dim.key]?.normalized || 0;
      // Convert -100 to +100 scale to 0 to maxRadius
      const normalizedScore = ((score + 100) / 200) * maxRadius;
      const angleRad = (dim.angle * Math.PI) / 180;
      return {
        x: center + normalizedScore * Math.cos(angleRad),
        y: center + normalizedScore * Math.sin(angleRad),
      };
    });

    const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

    return { center, maxRadius, circles, axes, dataPoints, polygonPoints };
  }, [metrics, size]);

  // Helper function to get touch distance between two points
  const getTouchDistance = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  // Helper function to get center point between two touches
  const getTouchCenter = useCallback((touches: React.TouchList) => {
    if (touches.length < 2)
      return { x: touches[0].clientX, y: touches[0].clientY };
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  }, []);

  // Touch start handler
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;

      e.preventDefault();
      const touches = e.touches;
      touchStateRef.current.isDragging = true;
      touchStateRef.current.initialScale = transform.scale;
      touchStateRef.current.lastScale = transform.scale;
      setIsGrabbing(true);

      if (touches.length === 2) {
        // Pinch gesture - store initial distance
        touchStateRef.current.lastTouchDistance = getTouchDistance(touches);
        touchStateRef.current.lastTouchCenter = getTouchCenter(touches);
      } else if (touches.length === 1) {
        // Single touch for panning
        touchStateRef.current.lastTouchCenter = {
          x: touches[0].clientX,
          y: touches[0].clientY,
        };
      }
    },
    [isMobile, transform.scale, getTouchDistance, getTouchCenter]
  );

  // Touch move handler
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !touchStateRef.current.isDragging) return;

      e.preventDefault();
      const touches = e.touches;

      if (touches.length === 2) {
        // Pinch zoom - improved implementation
        const currentDistance = getTouchDistance(touches);
        const currentCenter = getTouchCenter(touches);

        if (
          touchStateRef.current.lastTouchDistance > 0 &&
          currentDistance > 0
        ) {
          // Calculate incremental scale change based on current distance vs last distance
          const distanceRatio =
            currentDistance / touchStateRef.current.lastTouchDistance;

          // Add threshold to prevent micro-jitters
          if (Math.abs(distanceRatio - 1) > 0.01) {
            // Apply incremental scaling to current scale
            const newScale = touchStateRef.current.lastScale * distanceRatio;

            // Set scale bounds relative to initial mobile scale
            const minScale = isMobile ? mobileScale * 0.3 : 0.3;
            const maxScale = isMobile ? mobileScale * 4 : 4;

            const clampedScale = Math.max(
              minScale,
              Math.min(maxScale, newScale)
            );

            setTransform((prev) => ({
              ...prev,
              scale: clampedScale,
            }));

            // Update last scale for next calculation
            touchStateRef.current.lastScale = clampedScale;
          }
        }

        // Always update touch tracking for next frame
        touchStateRef.current.lastTouchDistance = currentDistance;
        touchStateRef.current.lastTouchCenter = currentCenter;
      } else if (touches.length === 1) {
        // Single touch pan
        const currentTouch = {
          x: touches[0].clientX,
          y: touches[0].clientY,
        };

        const deltaX = currentTouch.x - touchStateRef.current.lastTouchCenter.x;
        const deltaY = currentTouch.y - touchStateRef.current.lastTouchCenter.y;

        setTransform((prev) => ({
          ...prev,
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));

        touchStateRef.current.lastTouchCenter = currentTouch;
      }
    },
    [isMobile, mobileScale, getTouchDistance, getTouchCenter]
  );

  // Touch end handler
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;

      e.preventDefault();

      // If transitioning from 2 fingers to 1 finger, update the last scale for smooth continuation
      if (e.touches.length === 1) {
        touchStateRef.current.lastScale = transform.scale;
        touchStateRef.current.lastTouchCenter = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        return; // Continue dragging with single finger
      }

      // Complete gesture end
      touchStateRef.current.isDragging = false;
      touchStateRef.current.lastTouchDistance = 0;
      setIsGrabbing(false);
    },
    [isMobile, transform.scale]
  );

  // Mouse handlers for desktop drag (optional enhancement)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;

      e.preventDefault();
      touchStateRef.current.isDragging = true;
      touchStateRef.current.lastTouchCenter = { x: e.clientX, y: e.clientY };
      setIsGrabbing(true);
    },
    [isMobile]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || !touchStateRef.current.isDragging) return;

      e.preventDefault();
      const deltaX = e.clientX - touchStateRef.current.lastTouchCenter.x;
      const deltaY = e.clientY - touchStateRef.current.lastTouchCenter.y;

      setTransform((prev) => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      touchStateRef.current.lastTouchCenter = { x: e.clientX, y: e.clientY };
    },
    [isMobile]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;

      e.preventDefault();
      touchStateRef.current.isDragging = false;
      setIsGrabbing(false);
    },
    [isMobile]
  );

  // Reset transform function
  const resetTransform = useCallback(() => {
    setTransform({
      x: 0,
      y: 0,
      scale: isMobile ? mobileScale : 1,
    });
  }, [isMobile, mobileScale]);  // Build your own slider component
  // Learn: value mapping, constraints, accessibility

  return (
    <div className="relative">
      {/* Container for draggable/zoomable chart on mobile */}
      <div
        ref={containerRef}
        className={`
          ${isMobile ? "overflow-hidden touch-none" : ""}
          ${isGrabbing ? "cursor-grabbing" : isMobile ? "cursor-grab" : ""}
          w-full flex justify-center items-center
        `}
        style={{
          height: isMobile ? `${mobileViewportHeight}px` : "auto",
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? `${mobileViewportWidth}px` : "none",
          margin: isMobile ? "0 auto" : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          width={size}
          height={size}
          className="select-none"
          viewBox={isMobile ? `0 0 ${size} ${size}` : undefined}
          style={{
            transform: isMobile
              ? `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
              : undefined,
            transformOrigin: "center center",
            transition: touchStateRef.current.isDragging
              ? "none"
              : "transform 0.2s ease-out",
            width: isMobile ? "100%" : size,
            height: isMobile ? "100%" : size,
            maxWidth: isMobile ? `${size}px` : undefined,
            maxHeight: isMobile ? `${size}px` : undefined,
          }}
        >
          {/* Background circles */}
          {chartData.circles.map((circle, i) => (
            <circle
              key={i}
              cx={chartData.center}
              cy={chartData.center}
              r={circle.radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
              opacity={0.3}
            />
          ))}

          {/* Axis lines */}
          {chartData.axes.map((axis, i) => (
            <g key={i}>
              <line
                x1={axis.x1}
                y1={axis.y1}
                x2={axis.x2}
                y2={axis.y2}
                stroke="currentColor"
                strokeWidth="1"
                className="text-border"
                opacity={0.3}
              />
              <text
                x={axis.labelX}
                y={axis.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-muted-foreground font-medium"
              >
                {axis.label}
              </text>
            </g>
          ))}

          {/* Data polygon */}
          <polygon
            points={chartData.polygonPoints}
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />

          {/* Data points */}
          {chartData.dataPoints.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="currentColor"
              className="text-primary"
            />
          ))}

          {/* Center point */}
          <circle
            cx={chartData.center}
            cy={chartData.center}
            r="3"
            fill="currentColor"
            className="text-muted-foreground"
          />
        </svg>
      </div>

      {/* Reset button for mobile */}
      {isMobile &&
        (transform.x !== 0 ||
          transform.y !== 0 ||
          transform.scale !== (isMobile ? mobileScale : 1)) && (
          <button
            onClick={resetTransform}
            className="absolute top-2 right-2 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md shadow-lg"
          >
            Reset View
          </button>
        )}

      {/* Instructions for mobile */}
      {isMobile && (
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">
            Drag to pan • Pinch to zoom
          </p>
        </div>
      )}
    </div>
  );
}

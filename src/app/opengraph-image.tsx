import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "RevenuFlow — Maximize Every Night's Revenue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "#0A0A0F",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* === Background Effects === */}

        {/* Large blue glow top-center */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: 300,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Purple glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -250,
            right: -100,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)",
            display: "flex",
          }}
        />

        {/* Cyan accent glow */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)",
            display: "flex",
          }}
        />

        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            display: "flex",
          }}
        />

        {/* === LEFT SIDE — Brand & Copy === */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 0 60px 72px",
            width: "58%",
            zIndex: 10,
            gap: 28,
          }}
        >
          {/* Logo + Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(139,92,246,0.2)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 22L13 14L17 18L24 10"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 10H24V14"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "white",
                display: "flex",
                letterSpacing: "-0.01em",
              }}
            >
              Revenu
              <span
                style={{
                  background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Flow
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>Maximize Every</span>
            <span
              style={{
                display: "flex",
                background:
                  "linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {"Night's Revenue"}
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: "#94A3B8",
              lineHeight: 1.6,
              maxWidth: 480,
              display: "flex",
            }}
          >
            Dynamic pricing & hands-on revenue management for short-term
            rentals across all major platforms.
          </div>

          {/* Platform pills */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            {["Airbnb", "VRBO", "Booking.com", "Expedia"].map((platform) => (
              <div
                key={platform}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#CBD5E1",
                }}
              >
                {platform}
              </div>
            ))}
          </div>
        </div>

        {/* === RIGHT SIDE — Revenue Chart Visualization === */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "42%",
            padding: "60px 60px 60px 0",
            zIndex: 10,
          }}
        >
          {/* Glass card with chart */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 420,
              height: 340,
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "28px 32px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.08)",
              gap: 20,
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#64748B",
                    fontWeight: 500,
                    display: "flex",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Monthly Revenue
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "white",
                    display: "flex",
                    letterSpacing: "-0.02em",
                  }}
                >
                  $14,280
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#10B981",
                }}
              >
                +23%
              </div>
            </div>

            {/* Chart area */}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <svg
                width="356"
                height="180"
                viewBox="0 0 356 180"
                fill="none"
                style={{ position: "absolute", bottom: 0, left: 0 }}
              >
                {/* Gradient fill under the line */}
                <defs>
                  <linearGradient
                    id="chartGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="180"
                  >
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop
                      offset="100%"
                      stopColor="#3B82F6"
                      stopOpacity="0.02"
                    />
                  </linearGradient>
                  <linearGradient
                    id="lineGrad"
                    x1="0"
                    y1="0"
                    x2="356"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="60%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>

                {/* Area fill */}
                <path
                  d="M0 140 Q40 130 70 120 T140 95 T210 60 T280 35 T356 15 L356 180 L0 180 Z"
                  fill="url(#chartGrad)"
                />

                {/* Chart line */}
                <path
                  d="M0 140 Q40 130 70 120 T140 95 T210 60 T280 35 T356 15"
                  stroke="url(#lineGrad)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Glow dot at the end */}
                <circle cx="356" cy="15" r="6" fill="#06B6D4" opacity="0.3" />
                <circle cx="356" cy="15" r="3" fill="#06B6D4" />
              </svg>
            </div>

            {/* Stat row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: 16,
              }}
            >
              {[
                { label: "Occupancy", value: "92%" },
                { label: "ADR", value: "$187" },
                { label: "RevPAR", value: "$172" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "white",
                      display: "flex",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#64748B",
                      fontWeight: 500,
                      display: "flex",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === Bottom gradient line === */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)",
            display: "flex",
          }}
        />

        {/* === Top-right subtle accent === */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 200,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.5))",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

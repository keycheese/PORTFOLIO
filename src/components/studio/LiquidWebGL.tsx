"use client";

import { useEffect, useRef } from "react";

/* ---------- GLSL ---------- */

const VERT_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/* Colors are now driven by uniforms u_bg / u_acc1 / u_acc2 */
const FRAG_SRC = `
precision highp float;

uniform vec2  u_res;
uniform vec2  u_mouse;
uniform vec2  u_vel;
uniform float u_time;
uniform vec3  u_bg;
uniform vec3  u_acc1;
uniform vec3  u_acc2;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float gnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.52;
  for (int i = 0; i < 5; i++) {
    v += gnoise(p) * a;
    p  = p * mat2(1.6, 1.2, -1.2, 1.6);
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv  = gl_FragCoord.xy / u_res;
  float ar = u_res.x / u_res.y;

  vec2 p = (uv * 2.0 - 1.0) * vec2(ar, 1.0);
  vec2 m = u_mouse           * vec2(ar, 1.0);

  float d   = length(p - m);
  float spd = length(u_vel);

  /* Liquid ripple warp */
  float ripple = sin(d * 9.0 - u_time * 2.2)
               * exp(-d * 2.3) * 0.10;
  ripple += spd * 0.22 * exp(-d * 4.5);
  vec2 dir = d > 0.001 ? normalize(p - m) : vec2(0.0);
  vec2 wp  = p + dir * ripple;

  /* FBM noise layers */
  float n1 = fbm(wp * 1.0 + u_time * 0.05) * 0.5 + 0.5;
  float n2 = fbm(wp * 2.2 - u_time * 0.03) * 0.5 + 0.5;
  float n3 = fbm(wp * 4.5 + u_time * 0.07) * 0.5 + 0.5;
  float blend = clamp(n1 * 0.5 + n2 * 0.35 + n3 * 0.15, 0.0, 1.0);

  /* Mouse proximity glow */
  float glow = exp(-d * 1.05) * 0.72
             + spd * 0.50 * exp(-d * 3.5);
  glow = clamp(glow, 0.0, 0.90);

  vec3 accent = mix(u_acc1, u_acc2, blend);
  vec3 col    = mix(u_bg, accent, glow * 0.40);

  /* Subtle ambient shimmer */
  col += u_bg * fbm(p * 1.8 + u_time * 0.018) * 0.05;

  /* Film grain */
  float g = fract(sin(dot(gl_FragCoord.xy
            + vec2(u_time * 73.1, u_time * 41.3),
            vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.028;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

/* ---------- Helpers ---------- */

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
  }
  return s;
}

/* ---------- Props ---------- */

interface LiquidWebGLProps {
  /** RGB triplet in 0-1 range, defaults to studio near-black */
  bgColor?:  [number, number, number];
  /** Primary accent colour, defaults to gold */
  accent1?:  [number, number, number];
  /** Secondary accent colour, defaults to sage */
  accent2?:  [number, number, number];
  className?: string;
  style?: React.CSSProperties;
}

const STUDIO_BG    = [0.0431, 0.0471, 0.0549] as const; // #0B0C0E
const STUDIO_ACC1  = [0.851,  0.643,  0.255]  as const; // #D9A441
const STUDIO_ACC2  = [0.298,  0.420,  0.396]  as const; // #4C6B65

/* ---------- Component ---------- */

export default function LiquidWebGL({
  bgColor  = [...STUDIO_BG]  as [number,number,number],
  accent1  = [...STUDIO_ACC1] as [number,number,number],
  accent2  = [...STUDIO_ACC2] as [number,number,number],
  className = "fixed inset-0 w-full h-full pointer-events-none",
  style     = { zIndex: 1 },
}: LiquidWebGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
                canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    /* Build shader program */
    const vs   = compileShader(gl, gl.VERTEX_SHADER,   VERT_SRC);
    const fs   = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    /* Full-screen quad */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]),
      gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    /* Uniform locations */
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uVel   = gl.getUniformLocation(prog, "u_vel");
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uBg    = gl.getUniformLocation(prog, "u_bg");
    const uAcc1  = gl.getUniformLocation(prog, "u_acc1");
    const uAcc2  = gl.getUniformLocation(prog, "u_acc2");

    /* Set colour uniforms once */
    gl.uniform3f(uBg,   bgColor[0],  bgColor[1],  bgColor[2]);
    gl.uniform3f(uAcc1, accent1[0],  accent1[1],  accent1[2]);
    gl.uniform3f(uAcc2, accent2[0],  accent2[1],  accent2[2]);

    /* Resize – uses canvas parent when absolute, window when fixed */
    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.offsetWidth  : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Mouse – relative to canvas bounding rect */
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;
    let px = 0, py = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      tx =   ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      ty = -(((e.clientY - rect.top)  / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);

    /* RAF loop */
    let rafId: number;
    const t0 = performance.now();

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      const L = 0.065;
      cx += (tx - cx) * L;
      cy += (ty - cy) * L;
      const vx = (cx - px) * 18;
      const vy = (cy - py) * 18;
      px = cx; py = cy;
      gl.uniform2f(uMouse, cx, cy);
      gl.uniform2f(uVel,   vx, vy);
      gl.uniform1f(uTime,  (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={style}
    />
  );
}

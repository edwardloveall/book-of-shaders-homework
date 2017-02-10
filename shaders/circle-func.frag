#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float inside_circle(vec2 center, float radius) {
  float falloff_edge = radius + 2.;
  float distance = distance(center, gl_FragCoord.xy);
  float inside = smoothstep(falloff_edge, radius, distance);

  return inside;
}

void main() {
  float color = inside_circle(u_mouse, 50.);

  gl_FragColor = vec4(color, 0., 0., 1.0);
}

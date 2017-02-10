#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 norm_coord = gl_FragCoord.xy / u_resolution.y;
  vec2 norm_mouse = u_mouse / u_resolution.y;
  vec2 center = norm_mouse;

  float size = 0.1;
  float falloff_edge = size + 0.003;

  float distance = distance(norm_coord, center);
  float color = smoothstep(falloff_edge, size, distance);

  gl_FragColor = vec4(color, 0., 0., 1.0);
}

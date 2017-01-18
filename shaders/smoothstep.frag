#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 mouse = u_mouse / u_resolution;
  vec2 coord_mouse = gl_FragCoord.xy / u_mouse;
  float smoothed = smoothstep(0., 1., mouse.x);
  float x = step(smoothed, coord_mouse.x);

  gl_FragColor = vec4(x, 0., 0., 1.);
}

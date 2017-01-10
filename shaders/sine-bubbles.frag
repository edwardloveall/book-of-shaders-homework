#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float pi = 3.14159;

void main() {
  float mult = 50.0;
  vec2 coord = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution * mult;
  float x = sin(mouse.x - coord.x * mult);
  float y = cos(mouse.y - coord.y * mult);
  gl_FragColor = vec4(x + y, 0.0, 0.0, 1.0);
}

#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

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
  float radius = 50.;
  float spread = radius * .8;
  float time = u_time * -1.;

  vec2 red_spin = vec2(cos(time) * spread,
                       sin(time) * spread);
  vec2 green_spin = vec2(cos(time + TWO_PI * (1./3.)) * spread,
                         sin(time + TWO_PI * (1./3.)) * spread);
  vec2 blue_spin = vec2(cos(time + TWO_PI * (2./3.)) * spread,
                        sin(time + TWO_PI * (2./3.)) * spread);

  float red = inside_circle(u_mouse + red_spin, radius);
  float green = inside_circle(u_mouse + green_spin, radius);
  float blue = inside_circle(u_mouse + blue_spin, radius);

  gl_FragColor = vec4(red, green, blue, 1.0);
}

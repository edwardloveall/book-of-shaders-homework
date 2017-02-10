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

  float colors[3];

  for(int i = 0; i < 3; i++) {
    vec2 spin = vec2(cos(time + TWO_PI * float(i)/3.) * spread,
                sin(time + TWO_PI * float(i)/3.) * spread);
    colors[i] = inside_circle(u_mouse + spin, radius);
  }

  gl_FragColor = vec4(colors[0], colors[1], colors[2], 1.0);
}

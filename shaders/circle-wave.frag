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
  float radius = 10.;
  float spread = radius * 20.;
  float rotate_speed = u_time * 0.05;
  float wave_speed = u_time * 0.8;
  float nubs = 3.;
  float nub_size = 10.;
  vec2 center = vec2(u_resolution.x * .5, u_resolution.y * .5);

  float circles[36];
  float color = 0.0;

  for(int i = 0; i < 36; i++) {
    float phase = TWO_PI * float(i)/36.;
    float radius_offset = sin(wave_speed + phase * nubs) * nub_size;
    float this_radius = spread + radius_offset;
    vec2 location = vec2(cos(rotate_speed + phase) * this_radius,
                         sin(rotate_speed + phase) * this_radius);
    color = color + inside_circle(center + location, radius);
  }

  gl_FragColor = vec4(vec3(color), 1.0);
}

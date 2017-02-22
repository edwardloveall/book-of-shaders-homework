#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI     3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float metaball(vec2 position, float radius) {
  vec2 dist = position - gl_FragCoord.xy;
  float gradient = radius * radius / (dist.x * dist.x + dist.y * dist.y);
  return gradient;
}

void main() {
  float time = u_time;
  vec2 center = u_resolution * .5;
  vec3 metaballs[4];
  float metaball_mask = 0.;
  float radius = 20.;
  float spread = 80.;
  float timeDelay = PI * .5;

  vec3 gray = vec3(0.16, 0.21, 0.23);
  vec3 green = vec3(0.52, 0.76, 0.31);
  vec3 diff = green - gray;

  metaballs[0] = vec3(center.x + sin(time) * spread, center.y, radius);
  metaballs[1] = vec3(center.x + cos(time) * spread, center.y, radius);
  metaballs[2] = vec3(center.x, center.y + sin(time + timeDelay) * spread, radius);
  metaballs[3] = vec3(center.x, center.y + cos(time + timeDelay) * spread, radius);

  for(int i = 0; i < 4; i++) {
    vec3 ball = metaballs[i];
    metaball_mask += metaball(ball.xy, ball.z);
  }

  float threshold = 1.0;
  float falloff = threshold - 0.15;
  vec3 smoothed = smoothstep(falloff, threshold, vec3(metaball_mask));
  vec3 color = gray;
  color += diff * smoothed;

  gl_FragColor = vec4(color, 1.0);
}

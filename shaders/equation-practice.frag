#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;

float plot(float center, float y) {
  float range = 0.01;
  return smoothstep(center - range, center, y) -
         smoothstep(center, center + range, y);
}

void main() {
  vec2 norm_pos = gl_FragCoord.xy / u_resolution;
  vec2 scaled_mouse = (u_mouse / u_resolution) * 4.;
  float x = norm_pos.x;

  // float y = 1.0 - pow(abs(x), scaled_mouse.x);
  // float y = pow(cos(PI * x / 2.), scaled_mouse.x);
  // float y = 1.0 - pow(abs(sin(PI * x / 2.0)), scaled_mouse.x);
  // float y = pow(min(cos(PI * x / 2.), 1. - abs(x)), scaled_mouse.x);
  float y = 1. - pow(max(0.0, abs(x) * 2. - 1.), scaled_mouse.x);

  vec3 color = vec3(y);
  float percent = plot(norm_pos.y, y);
  color = (1. - percent) *
          color +
          percent *
          vec3(0., 1., 0.);

  gl_FragColor = vec4(color, 1.);
}

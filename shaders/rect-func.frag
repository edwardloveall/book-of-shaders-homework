#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float inside_rect(float width, float height, float x, float y) {
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;

  float left_edge = x;
  float right_edge = x + width;
  float bottom_edge = y;
  float top_edge = y + height;

  float left = step(left_edge, norm_coord.x);
  float right = 1. - step(right_edge, norm_coord.x);
  float bottom = step(bottom_edge, norm_coord.y);
  float top = 1. - step(top_edge, norm_coord.y);

  return left * right * bottom * top;
}

void main() {
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;

  float color = inside_rect(0.5, 0.4, 0.4, 0.4);

  gl_FragColor = vec4(vec3(color), 1.0);
}

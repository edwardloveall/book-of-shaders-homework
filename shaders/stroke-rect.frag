#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float trace_rect(float width, float height, float x, float y) {
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;
  float stroke_width = 0.001;

  float left_edge = x;
  float right_edge = x + width;
  float bottom_edge = y;
  float top_edge = y + height;

  float left_inside_edge = x + stroke_width;
  float right_inside_edge = x + width - stroke_width;
  float bottom_inside_edge = y + stroke_width;
  float top_inside_edge = y + height - stroke_width;

  float left = step(left_edge, norm_coord.x);
  float right = 1. - step(right_edge, norm_coord.x);
  float bottom = step(bottom_edge, norm_coord.y);
  float top = 1. - step(top_edge, norm_coord.y);

  float left_inside = step(left_inside_edge, norm_coord.x);
  float right_inside = 1. - step(right_inside_edge, norm_coord.x);
  float bottom_inside = step(bottom_inside_edge, norm_coord.y);
  float top_inside = 1. - step(top_inside_edge, norm_coord.y);

  return (left * right * bottom * top) - (left_inside * right_inside * bottom_inside * top_inside);
}

void main() {
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;

  float color = trace_rect(0.5, 0.4, 0.4, 0.4);

  gl_FragColor = vec4(vec3(color), 1.0);
}

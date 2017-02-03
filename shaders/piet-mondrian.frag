#ifdef GL_ES
precision mediump float;
#endif

int sections = 12;
int gutter = 10;

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

float grid_pos(float column, float axis) {
  float gutter_space = float(gutter) * float(sections - 1);
  float section_space = axis - gutter_space;
  float section_width_px = section_space / float(sections);
  float pixel_value = section_width_px * column +
                      float(gutter) * (column - 1.0);

  return pixel_value / axis;
}

float col(int column) {
  return grid_pos(float(column), u_resolution.x);
}

float row(int row) {
  return grid_pos(float(row), u_resolution.y);
}

void main() {
  vec3 red = vec3(0.68, 0.15, 0.16);
  vec3 yellow = vec3(0.96, 0.77, 0.29);
  vec3 blue = vec3(0.05, 0.36, 0.58);
  vec3 white = vec3(0.97, 0.95, 0.88);

  float blue_1 = inside_rect(col(1), row(1), col(0), row(0));
  float blue_2 = inside_rect(col(1), row(2), col(0), row(1));
  float white_1 = inside_rect(col(7), row(1), col(1), row(0));
  float white_2 = inside_rect(col(7), row(2), col(1), row(1));
  float white_3 = inside_rect(col(2), row(2), col(8), row(1));
  float white_4 = inside_rect(col(2), row(2), col(10), row(1));
  float white_5 = inside_rect(col(1), row(6), col(0), row(3));
  float white_6 = inside_rect(col(7), row(6), col(1), row(3));
  float white_7 = inside_rect(col(2), row(6), col(8), row(3));
  float white_8 = inside_rect(col(2), row(6), col(10), row(3));
  float white_9 = inside_rect(col(8), row(4), col(0), row(9));
  float yel_1 = inside_rect(col(2), row(1), col(8), row(0));
  float yel_2 = inside_rect(col(2), row(1), col(10), row(0));
  float red_1 = inside_rect(col(2), row(2), col(8), row(9));
  float red_2 = inside_rect(col(2), row(2), col(8), row(11));
  float red_3 = inside_rect(col(2), row(2), col(10), row(9));
  float red_4 = inside_rect(col(2), row(2), col(10), row(11));

  vec3 color = blue_1 * blue +
               blue_2 * blue +
               white_1 * white +
               white_2 * white +
               white_3 * white +
               white_4 * white +
               white_5 * white +
               white_6 * white +
               white_7 * white +
               white_8 * white +
               white_9 * white +
               yel_1 * yellow +
               yel_2 * yellow +
               red_1 * red +
               red_2 * red +
               red_3 * red +
               red_4 * red;

  gl_FragColor = vec4(color, 1.0);
}

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

float rect(in vec2 coord, float width, float height, float x, float y) {
  float left_edge = x;
  float right_edge = x + width;
  float bottom_edge = y;
  float top_edge = y + height;

  float left = step(left_edge, coord.x);
  float right = 1. - step(right_edge, coord.x);
  float bottom = step(bottom_edge, coord.y);
  float top = 1. - step(top_edge, coord.y);

  return left * right * bottom * top;
}

float cross(in vec2 coord, float size) {
  return rect(coord, size / 4., size, -size / 8., -size / 2.) +
         rect(coord, size, size / 4., -size / 2., -size / 8.);
}

void main() {
  vec2 coord = gl_FragCoord.xy;
  vec2 center = u_resolution.xy / 2.;
  float radius = 200.;
  float speed = .7;
  float angle_adjust = PI * .5;
  float angle = sin(u_time * speed) - angle_adjust;
  float x = radius * cos(angle);
  float y = radius * sin(angle);
  coord -= center + vec2(x, y);
  coord = rotate2d(sin(u_time * speed) * PI * 3.) * coord;

  float color = cross(coord, 100.);

  gl_FragColor = vec4(vec3(color), 1.0);
}

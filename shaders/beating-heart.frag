#ifdef GL_ES
precision mediump float;
#endif

#define QUARTER_PI 0.7853981634

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );
}

mat2 scale2d(vec2 scale) {
  return mat2(
    scale.x, 0.0,
    0.0, scale.y
  );
}

float rect(in vec2 coord, float width, float height, float x, float y) {
  float left_edge = x;
  float right_edge = x + width;
  float bottom_edge = y;
  float top_edge = y + height;

  float left = smoothstep(left_edge - 1., left_edge, coord.x);
  float right = 1. - smoothstep(right_edge, right_edge + 1., coord.x);
  float bottom = smoothstep(bottom_edge - 1., bottom_edge, coord.y);
  float top = 1. - smoothstep(top_edge, top_edge + 1., coord.y);

  return left * right * bottom * top;
}

float center_heart(vec2 coord,
                   vec2 origin,
                   float size,
                   float rotation,
                   float scale) {
  coord -= origin;
  coord = rotate(rotation + QUARTER_PI) * coord;
  coord = scale2d(vec2(1./scale)) * coord;
  coord += vec2(size / 2.);

  float inside = rect(coord, size, size * .6, 0., 0.);
  inside += rect(coord, size * .6, size, 0., 0.);

  return min(inside, 1.);
}

void main(){
  vec2 coord = gl_FragCoord.xy;
  float cycle = mod(u_time, 2.);
  vec2 center = vec2(u_resolution.xy / 2.);
  vec3 red = vec3(0.94, 0.34, 0.32);
  vec3 cream = vec3(0.93, 0.85, 0.73);

  float heart = 0.;

  if (cycle < 2./6.) {
    heart = center_heart(coord, center, 100., 0.2, 1.2);
  } else if (cycle > 3./6. && cycle < 5./6.) {
    heart = center_heart(coord, center, 100., -0.2, 1.2);
  } else {
    heart = center_heart(coord, center, 100., 0., 1.);
  }

  vec3 color = mix(cream, red, heart);
  gl_FragColor = vec4(color, 1.0);
}

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  float grid_size = 20.;
  float half_grid = grid_size / 2.;
  vec2 mouse = floor(u_mouse / grid_size) * vec2(grid_size) + vec2(half_grid);

  if (mouse.x > gl_FragCoord.x - half_grid &&
      mouse.x < gl_FragCoord.x + half_grid &&
      mouse.y > gl_FragCoord.y - half_grid &&
      mouse.y < gl_FragCoord.y + half_grid) {
    gl_FragColor = vec4(coord.x, 1. - coord.y, coord.y, 1.);
  } else {
    gl_FragColor = vec4(0., 0., 0., 1.);
  }
}

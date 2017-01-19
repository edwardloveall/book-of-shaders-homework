#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;
  float grid_size = 20.;
  float half_grid = grid_size / 2.;
  vec2 floored_mouse = floor(u_mouse / grid_size) * vec2(grid_size) + vec2(grid_size);

               // fill in everything to the left of the current coord
  float fill = step(gl_FragCoord.x, floored_mouse.x) -
               // subtract everthing to the left of this coord
               step(gl_FragCoord.x, floored_mouse.x - grid_size) -
               // subtract everything below this point
               step(gl_FragCoord.y, floored_mouse.y - grid_size) -
               // subtract everything above this point
               (1. - step(gl_FragCoord.y, floored_mouse.y));

  vec3 color = vec3(fill * norm_coord.x,
                    fill * 1. - norm_coord.y,
                    fill * norm_coord.y);

  gl_FragColor = vec4(color, 1.);
}

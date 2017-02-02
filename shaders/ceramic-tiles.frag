#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;
  float inset = 0.1;
  float flipped_x = 1. - norm_coord.x;
  float flipped_y = 1. - norm_coord.y;

  float red_left = smoothstep(inset, norm_coord.x + 0.001, norm_coord.x);
  float red_right = smoothstep(inset, flipped_x - 0.001, flipped_x);
  float red_bottom = smoothstep(inset, norm_coord.y - 0.002, norm_coord.y);
  float red_top = smoothstep(inset, flipped_y + 0.002, flipped_y);

  float green_left = smoothstep(inset, norm_coord.x - 0.001, norm_coord.x);
  float green_right = smoothstep(inset, flipped_x + 0.001, flipped_x);
  float green_bottom = smoothstep(inset, norm_coord.y + 0.002, norm_coord.y);
  float green_top = smoothstep(inset, flipped_y - 0.002, flipped_y);

  float blue_left = smoothstep(inset, norm_coord.x + 0.002, norm_coord.x);
  float blue_right = smoothstep(inset, flipped_x - 0.002, flipped_x);
  float blue_bottom = smoothstep(inset, norm_coord.y + 0.001, norm_coord.y);
  float blue_top = smoothstep(inset, flipped_y - 0.002, flipped_y);

  float red = (red_left * red_right * red_bottom * red_top);
  float green = (green_left * green_right * green_bottom * green_top);
  float blue = (blue_left * blue_right * blue_bottom * blue_top);
  vec3 color = vec3(red, green, blue);

  gl_FragColor = vec4(color, 1.0);
}

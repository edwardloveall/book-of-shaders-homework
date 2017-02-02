#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;
  float left = floor(norm_coord.x + 0.9);
  float right = floor((1. - norm_coord.x) + 0.9);
  float bottom = floor(norm_coord.y + 0.9);
  float top = floor((1. - norm_coord.y) + 0.9);

  float color = (left * right * bottom * top);

  gl_FragColor = vec4(vec3(color), 1.0);
}

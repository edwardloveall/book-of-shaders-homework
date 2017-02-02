#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;
  float left = smoothstep(0.2, 0.5, norm_coord.x);
  float right = smoothstep(0.2, 0.5, 1.0 - norm_coord.x);
  float bottom = smoothstep(0., 0.01, norm_coord.y);
  float top = smoothstep(0., 0.01, 1.0 - norm_coord.y);

  float color = left * right * top * bottom;

  gl_FragColor = vec4(vec3(color), 1.0);
}

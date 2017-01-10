#ifdef GL_ES
precision mediump float;
#endif

vec4 tomatoColor() {
  vec3 tomato = vec3(1.0, 0.38, 0.28);
  return vec4(tomato, 1.0);
}

void main() {
  gl_FragColor = tomatoColor();
}

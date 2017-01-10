#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
  float red = abs(sin(u_time * 0.1));
  float green = abs(sin(u_time * 1.7));
  float blue = abs(sin(u_time * 7.0));
  gl_FragColor = vec4(red,green,blue,1.0);
}

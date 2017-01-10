#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  if (u_mouse.x > gl_FragCoord.x - 5. &&
      u_mouse.x < gl_FragCoord.x + 5. &&
      u_mouse.y > gl_FragCoord.y - 5. &&
      u_mouse.y < gl_FragCoord.y + 5.) {
    gl_FragColor = vec4(1., 0., 0., 1.);
  } else {
    gl_FragColor = vec4(0., 0., 0., 1.);
  }
}

#ifdef GL_ES
  precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 origin = vec2(.5, .5);
  float radius = .3;
  vec2 norm_coord = gl_FragCoord.xy / u_resolution;

  // colors from http://www.colourlovers.com/palette/1473/Ocean_Five

  vec3 carlbic_daylight = vec3(.93, .79, .36);
  vec3 carlbic_sun = vec3(.92, .42, .29);
  vec3 carlbic_red = vec3(.80, .22, .27);
  vec3 invisible_ufo = vec3(.07, .62, .69);

  float stop_one = 1./3.;
  float stop_two = 2./3.;

  vec3 color = mix(invisible_ufo, carlbic_red, smoothstep(0., stop_one, norm_coord.y));
  color = mix(color, carlbic_sun, smoothstep(stop_one, stop_two, norm_coord.y));
  color = mix(color, carlbic_daylight, smoothstep(stop_two, 1., norm_coord.y));

  gl_FragColor = vec4(color, 1.);
}

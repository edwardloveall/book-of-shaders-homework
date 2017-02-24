#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 mouse = u_mouse / u_resolution.y;
  vec2 norm_coord = gl_FragCoord.xy / u_resolution.y;
  float x_offset = (u_resolution.x / u_resolution.y) / 2.;
  float y_offset = 0.5;
  norm_coord = norm_coord - vec2(x_offset, y_offset);
  vec3 background = vec3(0.16, 0.21, 0.23);
  vec3 color1 = vec3(0.60, 0.72, 0.60);
  vec3 color2 = vec3(1.00, 0.81, 0.67);
  vec3 color3 = vec3(1.00, 0.51, 0.49);
  vec3 color4 = vec3(0.32, 0.32, 0.32);

  vec2 pos = norm_coord;

  float radius = length(pos) * 2.;
  float angle = atan(pos.y, pos.x);
  float layer1 = (cos(angle * 4. + u_time) +
                  sin(angle * 8. - u_time) +
                  min(sin(angle * 4. + u_time * -4.), 1.)
                 ) * 0.03 + 0.6;
  float layer2 = (sin(angle * 9. + u_time) +
                  sin(angle * 3. - u_time) +
                  min(sin(angle * 4. + u_time * 2.), 1.)
                  ) * 0.03 + 0.4;
  float layer3 = (sin(abs(angle * 3.) + u_time) +
                  sin(abs(angle * -7.) - u_time * 2.) +
                  min(sin(angle * 4. + u_time * 2.), 1.)
                  ) * 0.03 + 0.2;
  float f = 0.5 + layer1 + layer2 + layer3;

  float inside1 = 1. - smoothstep(layer1, layer1 + 0.01, radius);
  float inside2 = 1. - smoothstep(layer2, layer2 + 0.01, radius);
  float inside3 = 1. - smoothstep(layer3, layer3 + 0.01, radius);
  float circles_shape = step(0.95, fract(radius * 10. + u_time));
  vec3 circles = circles_shape * color4;

  vec3 mix1 = mix(background, color1, inside1);
  vec3 mix2 = mix(mix1, color2, inside2);
  vec3 mix3 = mix(mix2, color3, inside3);
  vec3 color = mix(vec3(circles), mix3, inside1);

  gl_FragColor = vec4(color, 1.0);
}

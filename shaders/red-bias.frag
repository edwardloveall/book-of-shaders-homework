#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                           6.0)-3.0)-1.0,
                   0.0,
                   1.0 );
  rgb = rgb*rgb*(3.0-2.0*rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

void main(){
  vec2 norm_coord = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.0);
  float transformX = pow(cos(PI * norm_coord.x / 2.), 0.5);

  vec3 position = vec3(transformX, 1.0, norm_coord.y);
  vec3 modded = mod(position.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0);
  vec3 absolute = abs(modded - 3.0);
  vec3 rgb = clamp(absolute - 1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  color = position.z * mix(vec3(1.0), rgb, position.y);

  gl_FragColor = vec4(color, 1.0);
}

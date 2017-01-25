#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
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

  // We map x (0.0 - 1.0) to the hue (0.0 - 1.0)
  // And the y (0.0 - 1.0) to the brightness
  // color = hsb2rgb(vec3(norm_coord.x,1.0,norm_coord.y));
  vec3 position = vec3(norm_coord.x, 1.0, norm_coord.y);
  vec3 modded = mod(position.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0);
  vec3 absolute = abs(modded - 3.0);
  vec3 rgb = clamp(absolute - 1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  color = position.z * mix(vec3(1.0), rgb, position.y);

  gl_FragColor = vec4(color, 1.0);
}

// H = 193°
// S = 67%
// L = 28%
vec3 hsl2rgb(in vec3 color) {
  float temp_1 = 0.0;
  float temp_2 = 0.0;

  // if(color.z < 0.5) {
    temp_1 = color.z * (1.0 + color.y);
    temp_2 = color.z - temp_1;
  // }
  float normalized_hue = color.x / 360.0;
  float one_third = 1.0 / 3.0;
  float raw_red = color.x + one_third;
  float raw_blue = color.x - one_third;
  float red = mod(raw_red + 1.0, 1.0);
  float green = color.x;
  float blue = mod(raw_blue + 1.0, 1.0);



  return vec3(1);
}

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 norm_coord = gl_FragCoord.xy / u_resolution.y;
    float x_offset = (u_resolution.x / u_resolution.y) / 2.;
    float y_offset = 0.5;
    norm_coord = norm_coord - vec2(x_offset, y_offset);
    float inside = 0.;
    vec3 foreground = vec3(1., 0., 0.32);
    vec3 background = vec3(1., 1., 1.);

    vec2 pos = norm_coord;

    float radius = length(pos) * 2.;
    float angle = atan(pos.y, pos.x);
    float f = sin(angle + sin(angle * 2.) + u_time);

    inside = 1. - smoothstep(f, f + 0.02, radius);
    vec3 color = mix(foreground, background, inside);

    gl_FragColor = vec4(color, 1.0);
}

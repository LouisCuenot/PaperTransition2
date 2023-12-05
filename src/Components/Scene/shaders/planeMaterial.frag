varying vec2 vUv;
uniform sampler2D uTexture;

void main() { 

    vec4 texelColor = texture2D(uTexture, vUv);
    //vec4 texelColor = vec4(step(0.05,vUv.x) * step(0.05, vUv.y) * (-step(0.95,vUv.x)+1.0) * (-step(0.95,vUv.y)+1.0));
    texelColor.w = 1.0;
    texelColor.x = step(0.05,vUv.x) * step(0.05, vUv.y) * (-step(0.95,vUv.x)+1.0) * (-step(0.95,vUv.y)+1.0) + ((-step(0.05,vUv.x)+1.0) * (-step(0.05,vUv.y)+1.0));
    gl_FragColor = vec4(vUv.x,vUv.y,0.0,1.0);
}
  
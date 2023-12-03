#define M_PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform float uTime;
uniform float uDecalage;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  //modelPosition.z += smoothstep(0.0,1.0,uv.x) * smoothstep(0.0,1.0,uv.y) * -0.5;
  //modelPosition.z += step(uDecalage,uv.x) * step(uDecalage, uv.y) * pow((uv.x-uDecalage)*0.8,2.0) * pow((uv.y-uDecalage)*0.8,2.0);
  //modelPosition.z+= step(uDecalage,uv.x)*(pow(uv.x - uDecalage, 2.0)) + step(uDecalage,uv.y)*(pow(uv.y - uDecalage,2.0)) ;

  //modelPosition.z += step(uDecalage,uv.x)*(pow(uv.x - uDecalage, 2.0));
  modelPosition.x -= step(uDecalage, uv.x) * ((uv.x-uDecalage) - cos((uv.x - uDecalage)*10.0 - M_PI * 0.5) * 0.05 * (uv.x *  -0.1 +  1.0));

  //step(uDecalage, uv.x) = ne pas appliquer la rotation aux valeurs déjà déroulées
  //* ((uv.x-uDecalage) mettre les valeurs après la valeur du décalages au niveau du décalage
  // *10.0 = completer le cercle, faire * 6.28 pour un tour entier
  // - M_PI * 0.5 faire commencer le cercle en bas
  //* 0.05 diminuer le diametre di cercle
  //(uv.x *  -0.1 +  1.0) = faire diminuer le radius du cercle pour éviter le zfighting


  modelPosition.z += step(uDecalage, uv.x) * (sin((uv.x - uDecalage)* 10.0 - M_PI * 0.5) * 0.05 * (uv.x * -0.1 +  1.0) + 0.05) ;

  //modelPosition.x += (cos((uv.x-M_PI*0.5)*5.0))*0.3 *uv.x - uv.x ;
  //modelPosition.z += (sin((uv.x-M_PI*0.5)*5.0)) * 0.3 * uv.x;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;
  
  gl_Position = clipPosition;
}
  
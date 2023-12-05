#define M_PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform float uTime;
uniform float uDecalage;
uniform float uEnroulement;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  //modelPosition.z += smoothstep(0.0,1.0,(uv.x*2.0)) * smoothstep(0.0,1.0,uv.y) * -0.5;
  //modelPosition.z += step(uDecalage,(uv.x*2.0)) * step(uDecalage, uv.y) * pow(((uv.x*2.0)-uDecalage)*0.8,2.0) * pow((uv.y-uDecalage)*0.8,2.0);
  //modelPosition.z+= step(uDecalage,(uv.x*2.0))*(pow((uv.x*2.0) - uDecalage, 2.0)) + step(uDecalage,uv.y)*(pow(uv.y - uDecalage,2.0)) ;
  //modelPosition.z += step(uDecalage,(uv.x*2.0))*(pow((uv.x*2.0) - uDecalage, 2.0));

  //modelPosition.z += (1.0-step(uDecalage, (uv.x*2.0))) * (sin(((uv.x*2.0) - uDecalage)* 3.0 - M_PI * 0.5) * 0.05 * ((uv.x*2.0) * 0.1 +  0.9) + 0.05) ;
  //modelPosition.x +=  -(-step(uDecalage, (uv.x*2.0))+1.0) * (((uv.x*2.0)-uDecalage) - cos(((uv.x*2.0) - uDecalage)*3.0 - M_PI * 0.5) * 0.05 * ((uv.x*2.0) *  0.1 +  0.9));

  //step(uDecalage, (uv.x*2.0)) = ne pas appliquer la rotation aux valeurs déjà déroulées
  //* (((uv.x*2.0)-uDecalage) mettre les valeurs après la valeur du décalages au niveau du décalage
  // *10.0 = completer le cercle, faire * 6.28 pour un tour entier
  // - M_PI * 0.5 faire commencer le cercle en bas
  //* 0.05 diminuer le diametre di cercle
  //((uv.x*2.0) *  -0.1 +  1.0) = faire diminuer le radius du cercle pour éviter le zfighting



  //float pointDecalage = ((uv.x*2.0) + uv.y) * 0.5;
  //
  //modelPosition.z += (step(uDecalage, pointDecalage)) * (sin((pointDecalage - uDecalage)* 20.0  - M_PI * 0.5) * 0.05 * (pointDecalage *  -0.1 +  1.0) + 0.05);
  //modelPosition.x += (-step(uDecalage, pointDecalage)) * ((pointDecalage-uDecalage) - cos((pointDecalage - uDecalage) * 20.0  - M_PI *0.5) * 0.05 * (pointDecalage *  -0.1 +  1.0)) ;
  //modelPosition.y += (-step(uDecalage, pointDecalage)) * ((pointDecalage-uDecalage) - cos((pointDecalage - uDecalage) * 20.0 - M_PI *0.5) * 0.05 * (pointDecalage *  -0.1 +  1.0)) ;



  
  //float pointDecalage = ((uv.x*2.0) + uv.y) * 0.5;
//
  //modelPosition.x +=   -(-step(uDecalage, pointDecalage)+1.0) * ((pointDecalage-uDecalage) - cos((pointDecalage - uDecalage) * 20.0  - M_PI *0.5) * 0.05 * (pointDecalage *  0.1 +  0.9)) ;
  //modelPosition.y +=   -(-step(uDecalage, pointDecalage)+1.0) * ((pointDecalage-uDecalage) - cos((pointDecalage - uDecalage) * 20.0 - M_PI *0.5) * 0.05 * (pointDecalage *  0.1 +  0.9)) ;
//
  //modelPosition.z += (1.0-step(uDecalage, pointDecalage)) * (sin((pointDecalage - uDecalage)* 20.0  - M_PI * 0.5) * 0.05 * (pointDecalage *  0.1 +  0.9) + 0.05);

  modelPosition.x += -(-step(uDecalage, (uv.x*2.0))+1.0) * (((uv.x*2.0)-uDecalage) - cos(((uv.x*2.0) - uDecalage) * (M_PI*uEnroulement * uv.y)  - M_PI *0.5) * 0.05 * ((uv.x*2.0) *  0.1 +  0.9)) ;
  modelPosition.z += (1.0-step(uDecalage, (uv.x*2.0))) * (sin(((uv.x*2.0) - uDecalage)* (M_PI*uEnroulement * uv.y)  - M_PI * 0.5) * 0.05 * ((uv.x*2.0) *  0.1 +  0.9) + 0.05);
  modelPosition.y += (-(-step(uDecalage, (uv.x*2.0))+1.0) * (((uv.x*2.0) / -uDecalage) + 1.0 ) *0.15*(uv.y*0.2)) * smoothstep(0.0,0.05, uDecalage);

  //modelPosition.x += (cos(((uv.x*2.0)-M_PI*0.5)*5.0))*0.3 *(uv.x*2.0) - (uv.x*2.0) ;
  //modelPosition.z += (sin(((uv.x*2.0)-M_PI*0.5)*5.0)) * 0.3 * (uv.x*2.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;
  
  gl_Position = clipPosition;
}
  
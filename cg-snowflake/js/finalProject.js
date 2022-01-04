
rooms.raytrace2 = function() {

lib3D();

description = ``;

code = {
'init':` 




   // ADD INTERACTIVE WIDGETS TO THE HTML PAGE.

   setDescription(description + \`
      
      <p>
      
          <input type=range id=red   > red light
      <br><input type=range id=green > green light
      <br><input type=range id=blue  > blue light
      
      <br>   <input type=range id=radius> zoom
      <br>    <input type=range id=apart> apart
      <!--
      <br>    <input type=range id=xrot> xrot
      <br>    <input type=range id=yrot> yrot
      <br>    <input type=range id=zrot> zrot
      -->
      <br> <input type=range id=specular> specularity
      <br> <input type=range id=rDecFactor> radius decrease factor
      <br>    <input type=number id=level min=0 max=2 style="width:30%"> number of recursion
     \
   <div>
   <input type="radio" id=lead name="material" value="0" checked >
   <label for="lead">Lead</label>
   </div>
   <div>
     <input type="radio" id=plastic name="material" value="1" >
     <label for="plastic">Plastic</label>
     </div>
   <div>
     <input type="radio" id=copper name="material" value="2" >
     <label for="copper">Copper</label>
     </div>
   <div>
     <input type="radio" id=gold name="material" value="3" >
     <label for="gold">Gold</label>
     </div>
     <br>
     <br>
     <b>Also drag the canvas to change the snowfalke!</b>



      <p>
   \`);
   
   S.materialIndex=0;
   
  
   
   // if (lead.value){
   //    S.materialIndex=0;
   // }
   // else if(plastic.checked){
   //    S.materialIndex=1;
   // }

   // INITIALIZE THE SPHERE DATA.

   S.sc = [];
   
   let lead  =
       [.05,.05,.05,0,.1,.1,.1,0, 1,1,1,5, 0,0,0,0];
   let plastic    =
       [.9,.0,.0,0,.5,.3,.05,0,1,.6,.1,6,0,0,0,0];
   let copper    =
       [.15,.05,.025,0,.3,.1,.05,0,.6,.2,.1,3,0,0,0,0];
   let gold = 
      [.25,.15,.025,0,.5,.3,.05,0,1,.6,.1,6,0,0,0,0];

   S.material = [lead,plastic,copper,gold];

   S.turnx=0;
   S.turny=0;
`,
fragment: `
S.setFragmentShader(\`
// MODIFY STRING TO ADD NUMBER OF SPHERES.

   const int nS = \` + S.sc.length + \`;
   const int nL = 3;

   // LIGHTS AND SPHERES DATA COMES FROM CPU.

   uniform vec3 uLd[nL];
   uniform vec3 uLc[nL];

   uniform vec4 uS[nS];
   uniform mat4 uSm[nS];

   uniform float uTime;
   varying vec3 vPos;
   uniform float uSpace;
   uniform float uX;
   uniform float uY;
   


   // YOU CAN CHANGE CAMERA FOCAL LENGTH.
   // MAYBE YOU CAN TRY MAKING THIS A SLIDER.

   float fl = 2.0;

   //vec3 bgColor = vec3(.9,.9,.4);
   vec3 bgColor = vec3(1.,1.,1.);

   // INTERSECT A RAY WITH A SPHERE.
   // IF NO INTERSECTION, RETURN NEGATIVE VALUE.

   float raySphere(vec3 V, vec3 W, vec4 S) {
      V = V - S.xyz + .001 * W;
      float b = dot(V, W);
      float d = b * b - dot(V, V) + S.w * S.w;
      return d < 0. ? -1. : -b - sqrt(d);
   }

   // GOURAUD SHADING WITH CAST SHADOWS.

   vec3 shadeSphere(vec3 P, vec3 W, vec4 S, mat4 m) {
      vec3 Ambient  = m[0].rgb;
      vec3 Diffuse  = m[1].rgb;
      vec4 Specular = m[2];

      vec3 N = normalize(P - S.xyz);

      vec3 c = Ambient;
      for (int l = 0 ; l < nL ; l++) {

         // ARE WE SHADOWED BY ANY OTHER SPHERE?

         float t = -1.;
         for (int n = 0 ; n < nS ; n++)
	    t = max(t, raySphere(P, uLd[l], uS[n]));

         // IF NOT, ADD LIGHTING FROM THIS LIGHT

         if (t < 0.) {
            vec3 R = 2. * dot(N, uLd[l]) * N - uLd[l];
            c += uLc[l] *3.*
	         Diffuse * max(0., dot(N, uLd[l]));
            
          if (dot(R,N) > 0.0) {
               c += 2. * pow(dot(R,N),15.) * Specular.rgb; 
          }

         }
      }

      return c;
   }

   void main() {

      // START WITH SKY COLOR.

      vec3 color = bgColor;

      // FORM THE RAY FOR THIS PIXEL.
     // vPos.x=uX;
      //vPos.y=uY;
      vec3 V = vec3(0,0,fl);
      vec3 W = normalize(vec3(vPos.xy, -2.*fl));//SLIDER

      // THEN SEE WHAT IT HITS FIRST.

      float tMin = 10000.;
      for (int n = 0 ; n < nS ; n++) {
         float t = raySphere(V, W, uS[n]);
         if (t > 0. && t < tMin) {
	    vec3 P = V + t * W;
            color = shadeSphere(P, W, uS[n], uSm[n]);
	    tMin = t;
       float tMin1=10000.;
            vec3 N = normalize(P - uS[n].xyz);
            vec3 R = 2. * dot(N, -W) * N +W;
            for (int k = 0 ; k < nS ; k++){
	      float t1 = raySphere(P,R,uS[k]);
              vec3 PtoAdd;
              if (t1 > 0. && t1 < tMin1){
                  PtoAdd = N + t1 * R;
	          tMin1 = t1;
                  color += shadeSphere(PtoAdd, R, uS[k], uSm[k])*uSm[n][2].rgb*0.3/0.5*t1;
               }
            }

         }
      }

      gl_FragColor = vec4(sqrt(color), 1.);
   }
\`);
`,
vertex: `
S.setVertexShader(\`

   attribute vec3 aPos;
   varying   vec3 vPos;
   uniform   mat4 uCIM;
   uniform   mat4 uMatrix, uInvMatrix, uPerspective;

   void main() {
      
      vec4 pos = vec4(aPos, 1.);
      pos = uCIM * pos;
      vPos = pos.xyz;
      gl_Position = vec4(aPos.x,aPos.y,aPos.z, 1.);
   }

\`)
`,
render: `
S.setUniform('1f', 'uTime', time);

S.setUniform('Matrix4fv', 'uPerspective', false,
[1,0,0,0, 0,1,0,0, 0,0,1,-.1, 0,0,0,1]);

//let m = new Matrix();

// if (S.roll === undefined)
//    S.roll = 0;
// m.identity()；
// m.rotx(-0.5);
// m.rotx(0.5-2 * S.roll);

let c = Math.cos(time),
 s = Math.sin(time);

 let identity = () => [1,0,0,0,
   0,1,0,0,
   0,0,1,0,
   0,0,0,1];

let translate = t => [1,0,0,0,
   0,1,0,0,
   0,0,1,0,
   t[0],t[1],t[2],1];

let scale = s => [s[0],0,0,0,
0,s[1],0,0,
0,0,s[2],0,
0,0,0,1];

let rotx = theta => {
let c = Math.cos(theta);
let s = Math.sin(theta);

return [
1, 0, 0, 0,
0, c, s, 0,
0,-s, c, 0,
0, 0, 0, 1 ];
}

let roty = theta => {
   let c = Math.cos(theta);
   let s = Math.sin(theta);
   
   return [
   c, 0, s, 0,
   0, 1, 0, 0,
   -s,0, c, 0,
   0, 0, 0, 1 ];
   }

let rotz = theta => {
   let c = Math.cos(theta);
   let s = Math.sin(theta);

   return [
      c, s, 0, 0,
     -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1 ];
}

// SPECIFY COLORED KEY LIGHT + FILL LIGHT.

S.setUniform('3fv', 'uLd', [
.57, .57, .57,
-.5*c,-.5,-.5*c


]);

//1.*c,1.,1.*c,
// USE SLIDERS TO SET COLOR OF KEY LIGHT.

let r = red.value   / 100;
let g = green.value / 100;
let b = blue.value  / 100;
let radiusDecraseFactor=rDecFactor.value/100+2;


lead.onclick = function () {
   S.materialIndex=0;
   console.log("clicked");
};
plastic.onclick = function () {
   S.materialIndex=1;
   console.log("clicked");
};
copper.onclick = function () {
   S.materialIndex=2;
   console.log("clicked");
};
gold.onclick = function () {
   S.materialIndex=3;
   console.log("clicked");
};

//let materials=material;
//    if(lead){
//       S.materialIndex=0;
//    }

// let plastic=plastic.checked;
//    if(thisOne){
//       S.materialIndex=1;
//    }

   // let plastic=plastic.checked;
   // if(thisOne){
   //    S.materialIndex=1;
   // }

   // let plastic=plastic.checked;
   // if(thisOne){
   //    S.materialIndex=1;
   // }


//let ra=0.5;
// let xrotation=xrot.value/-100;
// let yrotation=yrot.value/100;
// let zrotation=zrot.value/100;
let spec=specular.value/100-0.5;
let ra=radius.value/300;
let ap=(apart.value-50)/300;
//let radius=0.1;
S.setUniform('3fv', 'uLc', [
 r,g,b,
 
 .9,.9,.9,
]);
//.7,.9,.1

// ANIMATE SPHERE POSITIONS BEFORE RENDERING.

let sData = [];
let smData = [];
S.sc[0] = [ 0,0,0,0,0];
S.sc[1] = [ 0,0,0,0,0];
S.sc[2] = [ 0,0,0,0,0];
S.sc[3] = [ 0,0,0,0,0];
S.sc[4] = [ 0,0,0,0,0];
S.sc[5] = [ 0,0,0,0,0];
S.sc[6] = [ 0,0,0,0,0];
S.sc[7] = [ 0,0,0,0,0];
S.sc[8] = [ 0,0,0,0,0];
S.sc[9] = [ 0,0,0,0,0];
S.sc[10] = [ 0,0,0,0,0];
S.sc[11] = [ 0,0,0,0,0];
S.sc[12] = [ 0,0,0,0,0];
S.sc[13] = [ 0,0,0,0,0];
S.sc[14] = [ 0,0,0,0,0];
S.sc[15] = [ 0,0,0,0,0];
S.sc[16] = [ 0,0,0,0,0];
S.sc[17] = [ 0,0,0,0,0];
S.sc[18] = [ 0,0,0,0,0];
S.sc[19] = [ 0,0,0,0,0];
S.sc[20] = [ 0,0,0,0,0];
S.sc[21] = [ 0,0,0,0,0];
S.sc[22] = [ 0,0,0,0,0];
S.sc[23] = [ 0,0,0,0,0];
S.sc[24] = [ 0,0,0,0,0];
S.sc[25] = [ 0,0,0,0,0];
S.sc[26] = [ 0,0,0,0,0];
S.sc[27] = [ 0,0,0,0,0];
S.sc[28] = [ 0,0,0,0,0];
S.sc[29] = [ 0,0,0,0,0];
S.sc[30] = [ 0,0,0,0,0];
S.sc[31] = [ 0,0,0,0,0];
S.sc[32] = [ 0,0,0,0,0];
S.sc[33] = [ 0,0,0,0,0];
S.sc[34] = [ 0,0,0,0,0];
S.sc[35] = [ 0,0,0,0,0];
S.sc[36] = [ 0,0,0,0,0];
S.sc[37] = [ 0,0,0,0,0];
S.sc[38] = [ 0,0,0,0,0];
S.sc[39] = [ 0,0,0,0,0];
S.sc[40] = [ 0,0,0,0,0];
S.sc[41] = [ 0,0,0,0,0];
S.sc[42] = [ 0,0,0,0,0];
S.sc[43] = [ 0,0,0,0,0];

let lev=level.value;
let copies=1;

function clearArray(){
   sData=[];
   // for(let n = 0 ; n < 42 ; n++){
   //    for(let i = 0 ; n < 4 ; n++){
   //       sData.push(0);
   //    }
   // }
}

function drawFlake(x,y,z, radius, apart,level ){
   if(level>0){
      let newRadius=radius/radiusDecraseFactor;
      drawFlake((x+radius+newRadius+apart)+(newRadius)*S.turnx*2,y,z,newRadius,apart/2,level-1);
      drawFlake((x-radius-newRadius-apart)-(newRadius)*S.turnx*2,y,z,newRadius,apart/2,level-1);
      drawFlake(x,y+radius+newRadius+apart+(newRadius)*S.turny*2,z,newRadius,apart/2,level-1);
      drawFlake(x,y-radius-newRadius-apart-(newRadius)*S.turny*2,z,newRadius,apart/2,level-1);
      drawFlake(x,y,z+radius+newRadius+apart+(newRadius)*S.turnx*2,newRadius,apart/2,level-1);
      drawFlake(x,y,z-radius-newRadius-apart-(newRadius)*S.turnx*2,newRadius,apart/2,level-1);
   }
   sData.push(x);
   sData.push(y);
   sData.push(z);
   sData.push(radius);
   for (let n = 0 ; n < 16 ; n++) {
      if(n>7&&n<12){
         smData = smData.concat(S.material[S.materialIndex][n]+spec);
      }else{
    smData = smData.concat(S.material[S.materialIndex][n]);
      }
   }
}

clearArray();
drawFlake(0,0,0,ra,ap,lev);




// for (let n = 0 ; n < 5 ; n++) {
//    S.sc[n][0] = -0.4+0.1*n;
//    S.sc[n][1] = 0+0.1*n;
//    S.sc[n][2] = 0+0.1*n;
//    S.sc[n][3] = 0.1;
//    for (let i = 0 ; i < 4 ; i++){
//     sData.push(S.sc[n][i]);
//    }
//    smData = smData.concat(S.material[0]);
// }
let cM = identity();

//cM = matrixMultiply(cM,roty(0.2 * S.turny));
//cM = matrixMultiply(cM,rotx(0.2 * S.turnx));
//cM = matrixMultiply(cM,rotz(2 * S.turnx));

//cM = matrixMultiply(cM,roty(zrotation));
//cM = matrixMultiply(cM,translate([c*0.1,c,s]));
 S.setUniform('Matrix4fv', 'uCIM', false,
 matrixInverse(cM));

S.setUniform('4fv', 'uS', sData);
S.setUniform('Matrix4fv', 'uSm', false, smData);

S.gl.drawArrays(S.gl.TRIANGLE_STRIP, 0, 4);
`,
events: `

onPress = (x,y) => {S.x = x;S.y=y};
onDrag = (x,y) => { S.turnx += x - S.x; S.x = x; S.turny += y-S.y;S.y=y; }

`
};

}


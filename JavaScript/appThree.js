document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();

//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------
var cs = 1; //camera default
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 500;
const cameraHeight = cameraWidth / aspectRatio;



function criarCamaraPrimeiraPessoa() {
    const cam = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 15000);
    cam.position.set(-2, 0, 30); // Ajuste a posição da câmera dentro do carro
    cam.rotation.set(Math.PI / 2, -Math.PI / 2, 0); // Ajuste a rotação da câmera para olhar ligeiramente para baixo
    return cam;
}


function criarCamaraPrimeiraPessoaTraseira() {
    const cam = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 15000);
    cam.position.set(-2, 0, 30); // Ajuste a posição da câmera dentro do carro
    cam.rotation.set(Math.PI / 2, -Math.PI / 2, 0); // Ajuste a rotação da câmera para olhar ligeiramente para baixo
    cam.rotation.y = Math.PI / 2; // Gire a câmera traseira para que ela aponte para trás
    return cam;
}

// Cria um novo WebGLRenderer para o retrovisor
var rearViewRenderer = new THREE.WebGLRenderer({ alpha: true });
rearViewRenderer.setSize(window.innerWidth / 2, window.innerHeight / 6); // Defina um tamanho menor para o retrovisor

// Obtém a câmera traseira existente
var rearViewCamera = criarCamaraPrimeiraPessoaTraseira();

// Anexa o elemento <canvas> do renderer à <div> correspondente ao retrovisor
var rearViewContainer = document.getElementById('rear-view');
rearViewContainer.appendChild(rearViewRenderer.domElement);
rearViewRenderer.domElement.style.border = '10px solid black'; // Adicione uma borda ao retrovisor
rearViewRenderer.domElement.style.borderRadius = '10px'



//Camera Ortografica
var camaraO = new THREE.OrthographicCamera(
    cameraWidth / -3.5, // left
    cameraWidth / 3.5, // right
    cameraHeight / 4, // top
    cameraHeight / -3, // bottom
    0, // near plane
    1000, // far plane
);

if (cs == 1) {
    camara = camaraO;
    camara.position.set(0, -100, 200);
    camara.lookAt(0, 0, 0);
} else if (cs == 2) {
    camara = camaraPrimeiraPessoa;

}



//SETTINGS DA CAMARA TRASEIRA



//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------


//-------------------------------------------------
// Set up renderer

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 15, window.innerHeight - 20);
renderer.render(cena, camara);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function showRearView() {
    rearViewRenderer.setSize(window.innerWidth / 2, window.innerHeight / 6); // Define o tamanho do retrovisor visível
    rearViewContainer.style.display = 'block'; // Exibe o retrovisor
}

// Função para ocultar o retrovisor
function hideRearView() {
    rearViewRenderer.setSize(0, 0); // Define o tamanho do retrovisor como zero
    rearViewContainer.style.display = 'none'; // Oculta o retrovisor
}



//Clicar tecla C e mexer com a camara Ortografica ou perspetiva e Primeira Pessoa.
document.addEventListener("keydown", (event) => {
    if (event.code === "KeyC") {
        cs = (cs + 1) % 2; // Alterna entre as câmeras

        if (cs == 0) {

            camara = camaraPrimeiraPessoa;
            showRearView();

            if (skyboxState === 'night') {
                lampAny.add(lightNighs);
                lampAny2.add(lightNighs2);
                lampAny3.add(lightNighs3);
                lampAny4.add(lightNighs4);
                lampAny5.add(lightNighs5);
                lampAny6.add(lightNighs6);
                lampAny7.add(lightNighs7);
                lampAny8.add(lightNighs8);
                lampAny9.add(lightNighs9);
                lampAny10.add(lightNighs10);
                lampAny11.add(lightNighs11);
                lampAny12.add(lightNighs12);



            }

        } else if (cs == 1) {
            hideRearView();
            camara = camaraO;
            camara.position.set(0, -200, 300);
            camara.lookAt(0, 0, 0);
            if (skyboxState === 'night') {
                lampAny.remove(lightNighs);
                lampAny2.remove(lightNighs2);
                lampAny3.remove(lightNighs3);
                lampAny4.remove(lightNighs4);
                lampAny5.remove(lightNighs5);
                lampAny6.remove(lightNighs6);
                lampAny7.remove(lightNighs7);
                lampAny8.remove(lightNighs8);
                lampAny9.remove(lightNighs9);
                lampAny10.remove(lightNighs10);
                lampAny11.remove(lightNighs11);
                lampAny12.remove(lightNighs12);
            }
        }
        console.log(cs)
    }
});




//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

const vehicleColors = [0xa52523, 0xbdb638, 0x78b14b];


function Car() {
    const car = new THREE.Group();


    const backWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(8.5, 8.5, 33, 32),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    backWheel.position.z = 6;
    backWheel.position.x = -18;

    backWheel.castShadow = true;
    backWheel.receiveShadow = true;

    car.add(backWheel);


    const frontWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(8.5, 8.5, 33, 32),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    frontWheel.position.z = 6;
    frontWheel.position.x = 18;

    frontWheel.castShadow = true;
    frontWheel.receiveShadow = true;

    car.add(frontWheel);

    // Carregar a textura da imagem das jantes
    const jantesTexture = new THREE.TextureLoader().load('./Images/BBS.png');

    // Configurar transparência na textura
    jantesTexture.transparent = true;

    // Criar o material com a textura das jantes
    const jantesMaterial = new THREE.MeshBasicMaterial({ map: jantesTexture, transparent: true, alphaTest: 0.3 });


    // Criar a geometria das jantes
    const jantesGeometry = new THREE.PlaneGeometry(14, 14);

    // Criar os meshes das jantes para as rodas traseiras
    const backWheelLeftJantes = new THREE.Mesh(jantesGeometry, jantesMaterial);
    backWheelLeftJantes.position.set(-18, 17, 6);
    backWheelLeftJantes.rotation.z = Math.PI / 2;
    backWheelLeftJantes.rotation.x = -Math.PI / 2;
    car.add(backWheelLeftJantes);

    const backWheelRightJantes = new THREE.Mesh(jantesGeometry, jantesMaterial);
    backWheelRightJantes.position.set(-18, -17, 6);
    backWheelRightJantes.rotation.x = Math.PI / 2;
    car.add(backWheelRightJantes);

    // Criar os meshes das jantes para as rodas dianteiras
    const frontWheelLeftJantes = new THREE.Mesh(jantesGeometry, jantesMaterial);
    frontWheelLeftJantes.position.set(18, 17, 6);
    frontWheelLeftJantes.rotation.x = Math.PI;
    frontWheelLeftJantes.rotation.z = Math.PI / 2;
    frontWheelLeftJantes.rotation.x = -Math.PI / 2;
    car.add(frontWheelLeftJantes);

    const frontWheelRightJantes = new THREE.Mesh(jantesGeometry, jantesMaterial);
    frontWheelRightJantes.position.set(18, -17, 6);
    frontWheelRightJantes.rotation.x = Math.PI / 2;
    car.add(frontWheelRightJantes);




    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({ color: pickRandom(vehicleColors) })
    );
    main.position.z = 12;

    main.castShadow = true;
    main.receiveShadow = true;

    car.add(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 24, 12),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    cabin.position.x = -6;
    cabin.position.z = 25.5;

    cabin.castShadow = true;
    cabin.receiveShadow = true;

    car.add(cabin);

    const racingline = new THREE.Mesh(
        new THREE.BoxGeometry(60, 5, 15),
        new THREE.MeshLambertMaterial({ color: 0x000000 })
    );
    racingline.position.z = 12;


    car.add(racingline);

    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(22, 23, 15),
        new THREE.MeshLambertMaterial({ color: 0x000000 })
    );
    roof.position.set(-6, 0, 25);
    roof.rotation.z = -Math.PI / 2;

    roof.castShadow = true;
    roof.receiveShadow = true;

    car.add(roof);


    const texture = new THREE.TextureLoader().load("./Images/Number1.png");
    const material = new THREE.MeshStandardMaterial({ map: texture });

    const imageGeometry = new THREE.PlaneGeometry(20, 20);
    const imageMesh = new THREE.Mesh(imageGeometry, material);

    imageMesh.position.set(-6, 0, 33);

    imageMesh.rotation.z = -Math.PI / 2;

    car.add(imageMesh);

    //Ferrari
    const hoodTexture = new THREE.TextureLoader().load("./Images/Ferrari.png");
    const hoodMaterial = new THREE.MeshStandardMaterial({ map: hoodTexture });
    const hoodGeometry = new THREE.BoxGeometry(30, 15, 1);
    const hoodMesh = new THREE.Mesh(hoodGeometry, hoodMaterial);
    hoodMesh.position.set(20, 0, 20);
    hoodMesh.rotation.z = Math.PI / 2;

    car.add(hoodMesh);

    //Farois
    // Criar grupo para os faróis
    const headlights = new THREE.Group();

    // Criar geometria e material dos faróis
    const headlightGeometry = new THREE.CircleGeometry(5, 32);
    const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Criar os dois meshes com as geometrias e materiais
    const headlight1 = new THREE.Mesh(headlightGeometry, headlightMaterial);
    const headlight2 = new THREE.Mesh(headlightGeometry, headlightMaterial);

    // Posicionar e rotacionar os dois meshes
    headlight1.position.set(30, 7, 10);
    headlight1.rotation.y = Math.PI / 2;
    headlight2.position.set(30, -7, 10);
    headlight2.rotation.y = Math.PI / 2;

    // Adicionar os faróis ao grupo
    headlights.add(headlight1);
    headlights.add(headlight2);

    // Adicionar o grupo dos faróis ao carro
    car.add(headlights);

    //Luzes do carro
    var spotLight1 = new THREE.SpotLight(0xffffff, 0, 1000, Math.PI / 6, 0.5);
    var spotLight2 = new THREE.SpotLight(0xffffff, 0, 1000, Math.PI / 6, 0.5);
    spotLight1.castShadow = true;
    spotLight2.castShadow = true;



    // Posicionar as spotlights em relação aos faróis
    spotLight1.position.set(2, 2, 1);
    spotLight2.position.set(2, 2, 1);

    headlight1.add(spotLight1);
    headlight2.add(spotLight2);

    //Target para direcionar a luz do carro transparente
    const geometry_farols = new THREE.BoxBufferGeometry(5, 3, 2);
    const material_farols = new THREE.MeshLambertMaterial({ color: 0x0000ff, transparent: true, opacity: 0 });
    const farols = new THREE.Mesh(geometry_farols, material_farols);

    //Posicionamento do target invisivel para luz carro
    farols.position.x = 110;
    farols.position.y = 15;
    car.add(farols);
    spotLight1.target = farols;
    spotLight2.target = farols;


    // Cria uma variável para controlar o estado das luzes
    let lightsOn = true;

    // Adiciona um listener para a tecla "L"
    document.addEventListener("keydown", (event) => {
        if (event.code === "KeyL") {
            // Inverte o estado das luzes
            lightsOn = !lightsOn;

            // Atualiza a intensidade das spotlights com base no estado
            if (lightsOn) {
                spotLight1.intensity = 2;
                spotLight2.intensity = 2;
            } else {
                spotLight1.intensity = 0;
                spotLight2.intensity = 0;

            }
        }

    });

    car.scale.set(0.04, 0.04, 0.04);

    camaraPrimeiraPessoa = criarCamaraPrimeiraPessoa();
    car.add(camaraPrimeiraPessoa); // Adicione a câmera de primeira pessoa como um objeto filho do carro
    car.add(rearViewCamera);



    // // Crie a geometria da caixa
    // // As dimensões devem ser grandes o suficiente para conter todo o carro
    // const collisionGeometry = new THREE.BoxBufferGeometry(60, 50, 15);

    // // Crie o material
    // // A opacidade é definida para 0 para torná-lo invisível
    // const collisionMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });

    // // Crie o mesh
    // const collisionBox = new THREE.Mesh(collisionGeometry, collisionMaterial);

    // // Posicione a caixa corretamente
    // // A posição depende do tamanho e formato do seu carro
    // collisionBox.position.z = 0;

    // // Adicione a caixa ao carro
    // car.add(collisionBox);




    return car;
} const car = Car();


function Wheel() {
    const wheel = new THREE.Mesh(
        new THREE.BufferGeometry(12, 33, 12),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    wheel.position.z = 6;
    return wheel;

} const wheel = Wheel();

//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO



//----------------------------------------------------------



renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

//Variavel que guardara o objeto importado
var objetoImportado;

//Variavel com o objeto responsavel por importar ficheiros FBX
var importer = new THREE.FBXLoader();

// function createFerrari() {
//     importer.load('./Objetos/ferrari-f1-race-car.fbx', function (object) {
//         console.log("Número de filhos: ", object.children.length);

//         object.remove(object.children[8]);
//         object.remove(object.children[7]);


//         for (let i = 0; i < object.children.length; i++) {
//             console.log("Filho " + i + ": ", object.children[i].name);
//         }
//         // Cria uma instância do objeto THREE.Object3D()
//         var object3D = new THREE.Object3D();

//         // Adiciona o objeto carregado como filho do objeto THREE.Object3D()
//         object3D.add(object);



//         // Define a posição, rotação e escala do objeto THREE.Object3D()
//         object3D.position.set(0, 0, 0);
//         object3D.rotation.set(0, 0, 0);
//         object3D.scale.set(0.6, 0.6, 0.6);
//         object3D.position.set(2, 0, -10);
//         object3D.rotation.x = Math.PI / 2;


//         cena.add(object3D);

//         return object

//     })
// } const ferraricar = createFerrari()



function createTruck() {
    importer.load('./Objetos/M1070 HET.fbx', function (object) {

        object.remove(object.children[8]);
        object.remove(object.children[7]);

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });



        // Cria uma instância do objeto THREE.Object3D()
        var object3D = new THREE.Object3D();

        // Adiciona o objeto carregado como filho do objeto THREE.Object3D()
        object3D.add(object);



        // Define a posição, rotação e escala do objeto THREE.Object3D()
        object3D.position.set(0, 0, 0);
        object3D.rotation.set(0, 0, 0);
        object3D.scale.set(0.6, 0.6, 0.6);
        object3D.position.set(2, 0, -10);
        object3D.rotation.x = Math.PI / 2;


        cena.add(object3D);
        object3D.scale.set(0.02, 0.02, 0.02)
        object3D.position.set(80, 30, -16.7)
        object3D.rotation.y = Math.PI / 2;

    })
} const createtruck = createTruck()


function createTrack() {
    importer.load('./Objetos/race-track.fbx', function (object) {

        // Cria uma instância do objeto THREE.Object3D()
        var object3D = new THREE.Object3D();

        const geometrytrack = new THREE.PlaneGeometry(100, 100);

        const texturetrack = new THREE.TextureLoader().load('./Images/alcatrao.jpg');

        const materialtrack = new THREE.MeshPhongMaterial({ map: texturetrack });

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialtrack;

                // Habilitar as sombras
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });





        // Adiciona o objeto carregado como filho do objeto THREE.Object3D()
        object3D.add(object);



        // Define a posição, rotação e escala do objeto THREE.Object3D()
        object3D.position.set(0, 0, 0);
        object3D.rotation.set(0, 0, 0);
        object3D.scale.set(0.6, 0.6, 0.6);
        object3D.position.set(2, 0, -20);



        cena.add(object3D);
        // Cria a geometria do plano
        const geometry = new THREE.PlaneGeometry(100, 100);


        // Cria o material com a textura da bandeira axadrezada
        const texture = new THREE.TextureLoader().load('./Images/Bandeira.png');
        const material = new THREE.MeshPhongMaterial({ map: texture });

        // Cria a malha com a geometria e o material
        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(0.1, 0.099, 0.5);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Posiciona a malha no chão
        mesh.position.set(-4, 19.2, -19.75);

        // Adiciona a malha à cena
        cena.add(mesh);



    })
} const track = createTrack()


function Bancada() {

    const radiusTop = 0.5; // Raio do topo do cilindro
    const radiusBottom = 0.5 // Raio da base do cilindro
    const height = 6; // Altura do cilindro
    const height2 = 15; // Altura do cilindro~
    const heightlaterais = 9; // Altura do cilindro
    const heightlaterai2 = 11; // Altura do cilindro
    const radialSegments = 32; // Número de segmentos ao redor do cilindro
    const cylinder = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const cylinder2 = new THREE.CylinderGeometry(radiusTop, radiusBottom, height2, radialSegments);
    const cylinderlaterais = new THREE.CylinderGeometry(radiusTop, radiusBottom, heightlaterais, radialSegments);
    const cylinderlaterais2 = new THREE.CylinderGeometry(radiusTop, radiusBottom, heightlaterai2, radialSegments);

    const geometry = new THREE.BoxGeometry(50, 10, 2);
    const geometryup = new THREE.BoxGeometry(50, 30, 2);

    // Criando o material do retângulo
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Cor verde
    const materialcylinder = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Cor verde

    // Criando a malha do retângulo
    const rectangle = new THREE.Mesh(geometry, material);
    const rectangle2 = new THREE.Mesh(geometry, material);
    const rectangle3 = new THREE.Mesh(geometry, material);
    const rectangleup = new THREE.Mesh(geometryup, material);

    const cylinderadd = new THREE.Mesh(cylinder, materialcylinder);
    const cylinderadd2 = new THREE.Mesh(cylinder, materialcylinder);
    const cylinderadd3 = new THREE.Mesh(cylinder2, materialcylinder);
    const cylinderadd4 = new THREE.Mesh(cylinderlaterais, materialcylinder);
    const cylinderadd5 = new THREE.Mesh(cylinderlaterais2, materialcylinder);
    const cylinderadd6 = new THREE.Mesh(cylinder, materialcylinder);
    const cylinderadd7 = new THREE.Mesh(cylinder, materialcylinder);
    const cylinderadd8 = new THREE.Mesh(cylinder2, materialcylinder);
    const cylinderadd9 = new THREE.Mesh(cylinderlaterais, materialcylinder);
    const cylinderadd10 = new THREE.Mesh(cylinderlaterais2, materialcylinder);
    // Adicionando o retângulo à cena

    rectangle.castShadow = true
    rectangle.receiveShadow = true
    rectangle2.castShadow = true
    rectangle2.receiveShadow = true
    rectangle3.castShadow = true
    rectangle3.receiveShadow = true
    rectangleup.castShadow = true
    rectangleup.receiveShadow = true

    cylinderadd.castShadow = true
    cylinderadd.receiveShadow = true
    cylinderadd2.castShadow = true
    cylinderadd2.receiveShadow = true
    cylinderadd3.castShadow = true
    cylinderadd3.receiveShadow = true
    cylinderadd4.castShadow = true
    cylinderadd4.receiveShadow = true
    cylinderadd5.castShadow = true
    cylinderadd5.receiveShadow = true
    cylinderadd6.castShadow = true
    cylinderadd6.receiveShadow = true
    cylinderadd7.castShadow = true
    cylinderadd7.receiveShadow = true
    cylinderadd8.castShadow = true
    cylinderadd8.receiveShadow = true
    cylinderadd9.castShadow = true
    cylinderadd9.receiveShadow = true
    cylinderadd10.castShadow = true
    cylinderadd10.receiveShadow = true


    cena.add(rectangle);
    cena.add(rectangle2);
    cena.add(rectangle3);
    cena.add(cylinderadd);
    cena.add(cylinderadd2);
    cena.add(cylinderadd3);
    cena.add(cylinderadd4);
    cena.add(cylinderadd5);
    cena.add(cylinderadd6);
    cena.add(cylinderadd7);
    cena.add(cylinderadd8);
    cena.add(cylinderadd9);
    cena.add(cylinderadd10);
    cena.add(rectangleup);

    rectangle.position.set(0, 50, -19)
    rectangle2.position.set(0, 60, -17)
    rectangle3.position.set(0, 70, -15)
    rectangleup.position.set(0, 55, 0)
    cylinderadd.position.set(-23, 47, -17)
    cylinderadd.rotation.x = Math.PI / 2;
    cylinderadd2.position.set(-23, 56, -13)
    cylinderadd2.rotation.x = Math.PI / 2;
    cylinderadd3.position.set(-23, 68, -8)
    cylinderadd3.rotation.x = Math.PI / 2;
    cylinderadd4.position.set(-23, 51.2, -13.9)
    cylinderadd5.position.set(-23, 61.7, -10.5)

    cylinderadd6.position.set(23, 47, -17)
    cylinderadd6.rotation.x = Math.PI / 2;
    cylinderadd7.position.set(23, 56, -13)
    cylinderadd7.rotation.x = Math.PI / 2;
    cylinderadd8.position.set(23, 68, -8)
    cylinderadd8.rotation.x = Math.PI / 2;
    cylinderadd9.position.set(23, 51.2, -13.9)
    cylinderadd10.position.set(23, 61.7, -10.5)




} const rectangle = Bancada();


function createDHLBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(4, 2);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/DHL.png');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(10, 44.9, -19);


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const DHLboard = createDHLBoard();


function createRolexBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(4, 2);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/Rolex.png');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(5, 44.9, -19);


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const Rolexboard = createRolexBoard();

function createAramcoBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(4, 2);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/Aramco.jpeg');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(0, 44.9, -19);


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const aramcoBoard = createAramcoBoard();

function createPirelliBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(4, 2);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/Pirelli.png');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(-5, 44.9, -19);


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const Pirelliboard = createPirelliBoard();


function createEmiratesBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(4, 2);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/Emirates.png');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(-10, 44.9, -19);


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const Emiratesboard = createEmiratesBoard();



function createF1Board() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(4, 2);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/Formula1.jpg');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(-15, 44.9, -19);


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const F1board = createF1Board();



function createHeinekenoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(50, 29);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/Heineken.png');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);


    // Posiciona a malha na beira da pista
    mesh.position.set(0, 53, 1.5);


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const Heinekenboard = createHeinekenoard();





var geometriaCubo = new THREE.BoxGeometry(1, 1, 1);

var textura = new THREE.TextureLoader().load('./Images/boxImage.jpg')
var materialTextura = new THREE.MeshStandardMaterial({ map: textura });


//SOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
var audioListener = new THREE.AudioListener();
cena.add(audioListener);

var soundLoader = new THREE.AudioLoader();
var sound = new THREE.Audio(audioListener);

soundLoader.load('./Sons/buzina.mp3', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(false); // Faça com que o som não seja repetido.
    sound.setVolume(0.5);
});


//Colisao
var wallGeometry = new THREE.BoxBufferGeometry(25, 1, 2);



var wallMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false });
var wall5 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall6 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall7 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall8 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall9 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall10 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall11 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall12 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall13 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall14 = new THREE.Mesh(wallGeometry, wallMaterial);

cena.add(wall5);
cena.add(wall6);
cena.add(wall7);
cena.add(wall8);
// cena.add(wall9);
cena.add(wall10);
// cena.add(wall11)
cena.add(wall12);
cena.add(wall13);




wall5.scale.set(3.5, 39, 0)
wall5.position.set(23, -5.5, -19)
wall6.scale.set(1, 38, 0)
wall6.position.set(-20, -4.4, -19)
wall7.position.set(-19, -5.5, -19)
wall7.scale.set(1, 38, 0)
wall8.scale.set(1, 27, 0)
wall8.position.set(-35, 1, -19)
wall12.scale.set(4.3, 39, 0)
wall12.position.set(27, 44, -19)
wall13.scale.set(5, 39, 0)
wall13.position.set(17, -55, -19)


const raio = 19; // Raio do círculo
const segmentos = 32; // Número de segmentos do círculo
const geometry = new THREE.CircleGeometry(raio, segmentos);

const raio2 = 19; // Raio do círculo
const segmentos2 = 32; // Número de segmentos do círculo
const geometry2 = new THREE.CircleGeometry(raio2, segmentos2);

// Criar o material do círculo
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false });

// Criar a malha (mesh) do círculo combinando a geometria e o material
const circleMesh = new THREE.Mesh(geometry, material);
const circleMesh2 = new THREE.Mesh(geometry, material);
const circleMesh3 = new THREE.Mesh(geometry, material);
const circleMesh4 = new THREE.Mesh(geometry, material);
const circleMesh5 = new THREE.Mesh(geometry, material);
const circleMesh6 = new THREE.Mesh(geometry, material);
const circleMesh7 = new THREE.Mesh(geometry2, material);
const circleMesh8 = new THREE.Mesh(geometry, material);
const circleMesh9 = new THREE.Mesh(geometry2, material);
const circleMesh10 = new THREE.Mesh(geometry2, material);
const circleMesh11 = new THREE.Mesh(geometry2, material);
const circleMesh12 = new THREE.Mesh(geometry2, material);
const circleMesh13 = new THREE.Mesh(geometry2, material);
const circleMesh14 = new THREE.Mesh(geometry2, material);
const circleMesh15 = new THREE.Mesh(geometry2, material);
const circleMesh16 = new THREE.Mesh(geometry2, material);
const circleMesh17 = new THREE.Mesh(geometry2, material);
const circleMesh18 = new THREE.Mesh(geometry2, material);
const circleMesh19 = new THREE.Mesh(geometry2, material);
const circleMesh20 = new THREE.Mesh(geometry2, material);
const circleMesh21 = new THREE.Mesh(geometry2, material);
const circleMesh22 = new THREE.Mesh(geometry2, material);
const circleMesh23 = new THREE.Mesh(geometry2, material);
const circleMesh24 = new THREE.Mesh(geometry2, material);
const circleMesh25 = new THREE.Mesh(geometry2, material);
const circleMesh26 = new THREE.Mesh(geometry2, material);

// Adicionar a malha do círculo à cena
cena.add(circleMesh);
circleMesh.position.set(64.5, -5.5, -19.5)
cena.add(circleMesh2);
circleMesh2.position.set(-59, 9.3, -19.5)
circleMesh2.scale.set(1.1, 1, 1);
cena.add(circleMesh3);
circleMesh3.position.set(-40, 14, -19.5)
circleMesh3.scale.set(0.4, 0.2, 0.2);
cena.add(circleMesh4);
circleMesh4.position.set(-35, -17, -19.5)
circleMesh4.scale.set(0.2, 0.2, 0.2);
cena.add(circleMesh5);
circleMesh5.position.set(-40, -13, -19.5)
circleMesh5.scale.set(0.2, 0.2, 0.2);
cena.add(circleMesh6);
circleMesh6.position.set(-50, -7.5, -19.5)
circleMesh6.scale.set(0.2, 0.2, 0.2);
cena.add(circleMesh7);
circleMesh7.position.set(90, 35, -19.5)
circleMesh7.scale.set(1, 1, 1);
cena.add(circleMesh8);
circleMesh8.position.set(103, 25, -19.5)
circleMesh8.scale.set(1, 1, 1);
cena.add(circleMesh9);
circleMesh9.position.set(112, 0, -19.5)
circleMesh9.scale.set(1, 1, 1);
cena.add(circleMesh10);
circleMesh10.position.set(112, -15, -19.5)
circleMesh10.scale.set(1, 1, 1);
cena.add(circleMesh11);
circleMesh11.position.set(103, -35, -19.5)
circleMesh11.scale.set(1, 1, 1);
cena.add(circleMesh12);
circleMesh12.position.set(90, -47, -19.5)
circleMesh12.scale.set(1, 1, 1);
cena.add(circleMesh13);
circleMesh13.position.set(-60, -39, -19.5)
circleMesh13.scale.set(1, 1, 1);
cena.add(circleMesh14);
circleMesh14.position.set(-44, -51, -19.5)
circleMesh14.scale.set(1, 1, 1);
cena.add(circleMesh15);
circleMesh15.position.set(-75, -37, -19.5)
circleMesh15.scale.set(1, 1, 1);
cena.add(circleMesh16);
circleMesh16.position.set(-85, -32, -19.5)
circleMesh16.scale.set(1, 1, 1);
cena.add(circleMesh17);
circleMesh17.position.set(-97, -22, -19.5)
circleMesh17.scale.set(1, 1, 1);
cena.add(circleMesh18);
circleMesh18.position.set(-105, -5, -19.5)
circleMesh18.scale.set(1, 1, 1);
cena.add(circleMesh19);
circleMesh19.position.set(-108, 10, -19.5)
circleMesh19.scale.set(1, 1, 1);
cena.add(circleMesh20);
circleMesh20.position.set(-105, 25, -19.5)
circleMesh20.scale.set(1, 1, 1);
cena.add(circleMesh21);
circleMesh21.position.set(-100, 35, -19.5)
circleMesh21.scale.set(1, 1, 1);
cena.add(circleMesh22);
circleMesh22.position.set(-87, 50, -19.5)
circleMesh22.scale.set(1, 1, 1);
cena.add(circleMesh23);
circleMesh23.position.set(-64, 57, -19.5)
circleMesh23.scale.set(1, 1, 1);
cena.add(circleMesh24);
circleMesh24.position.set(-64, 57, -19.5)
circleMesh24.scale.set(1, 1, 1);
cena.add(circleMesh25);
circleMesh25.position.set(-50, 57, -19.5)
circleMesh25.scale.set(1, 1, 1);
cena.add(circleMesh26);
circleMesh26.position.set(-27, 45, -19.5)
circleMesh26.scale.set(1, 1, 1);

var isGamePaused = false;
var previousCarPosition = new THREE.Vector3();
var carDirection = new THREE.Vector3();

var isGameRestarted = false;
let speed = 0.15;


//Mecanismo atraves do teclado (mexer o objeto) ----------------------------------------------------------------------------
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        if (car) {
            car.position.x += 0.25;

        }
    } else if (keyCode == 83) {
        if (car) {
            car.position.x -= 0.25;

        }
    } else if (keyCode == 65) {
        if (car) {
            car.rotation.z += 0.25;

        }
    } else if (keyCode == 68) {
        if (car) {
            car.rotation.z -= 0.25;
        }
    }

}


const keys = {
    w: false,
    s: false,
    a: false,
    d: false
};

// Defina uma variável para armazenar o valor original da velocidade
var originalSpeed = speed;

// Defina uma variável para controlar se a tecla de espaço está pressionada
var isSpacePressed = false;

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        keys.w = true;
    } else if (keyCode == 83) {
        keys.s = true;
    } else if (keyCode == 65) {
        keys.a = true;
    } else if (keyCode == 68) {
        keys.d = true;
    } else if (keyCode == 86 || keyCode == 118) { // 86 is 'V', 118 is 'v'
        if (!sound.isPlaying) { // Adicione esta verificação para tocar o som apenas se ele não estiver já tocando
            sound.play();
        }
    } else if (event.keyCode === 32) {
        isSpacePressed = true;
        // Diminua a velocidade quando a tecla de espaço é pressionada
        speed = 0.1;
    }
}

function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        keys.w = false;
    } else if (keyCode == 83) {
        keys.s = false;
    } else if (keyCode == 65) {
        keys.a = false;
    } else if (keyCode == 68) {
        keys.d = false;
    } else if (event.keyCode === 32) {
        isSpacePressed = false;
        // Restaure a velocidade original quando a tecla de espaço é solta
        speed = originalSpeed;
    }
}

document.addEventListener("keyup", onDocumentKeyUp, false);


function startGame() {
    speed = 0.15;
    count = 0;
    updateCounter();
    car.position.set(-10, 20, -19);
    car.rotation.z = -Math.PI / 60; //TENHO MESMO QUE MELHORAR ISTO
    // outras lógicas para começar o jogo...
}

function resetGame() {
    isGameRestarted = true;
    speed = 0;  // parar o carro
    document.getElementById('new-game').style.display = 'block';
}


var gameContainer = document.getElementById('game-container');
var restartMessage = document.getElementById('restart-message');

function update() {


    function checkCollision() {
        if (!car) {
            console.log("Erro: Carro não está definido");
            return false;
        }

        // Obter a posição global do carro
        const carPosition = new THREE.Vector3();
        car.getWorldPosition(carPosition);

        // Obter a caixa delimitadora do carro
        const carBoundingBox = new THREE.Box3().setFromObject(car);
        // const wallBoundingBox = new THREE.Box3().setFromObject(wall);
        const wallInside = new THREE.Box3().setFromObject(wall5);
        const wallInside2 = new THREE.Box3().setFromObject(wall6);
        const wallInside3 = new THREE.Box3().setFromObject(wall7);
        const wallInside4 = new THREE.Box3().setFromObject(wall8);
        const wallInside6 = new THREE.Box3().setFromObject(wall10);
        const wallInside7 = new THREE.Box3().setFromObject(wall12);
        const wallInside8 = new THREE.Box3().setFromObject(wall13);

        // Obter as caixas delimitadoras das paredes
        const wallBoundingBoxes = [
            // wallBoundingBox,

            wallInside, wallInside2, wallInside3, wallInside4,
            wallInside6, wallInside7, wallInside8

        ];

        const circleMeshes = [circleMesh, circleMesh2, circleMesh3, circleMesh4, circleMesh5,
            circleMesh6, circleMesh7, circleMesh8,
            circleMesh9, circleMesh10, circleMesh11, circleMesh12,
            circleMesh13, circleMesh14, circleMesh15, circleMesh16, circleMesh17,
            circleMesh18, circleMesh19, circleMesh20, circleMesh21, circleMesh22,
            circleMesh23, circleMesh24, circleMesh25, circleMesh26
        ];

        for (let i = 0; i < circleMeshes.length; i++) {
            const circleCenter = circleMeshes[i].position.clone();
            const carDistanceToCircle = carPosition.distanceTo(circleCenter);
            const circleRadius = raio * Math.max(circleMeshes[i].scale.x, circleMeshes[i].scale.y, circleMeshes[i].scale.z);

            if (carDistanceToCircle < circleRadius) {
                return true;
            }
        }


        // Verificar colisão com todas as paredes
        for (let i = 0; i < wallBoundingBoxes.length; i++) {
            if (carBoundingBox.intersectsBox(wallBoundingBoxes[i])) {
                return true;
            }
        }


        return false;
    }


    if (checkCollision()) {
        if (!isGameRestarted) {
            isGameRestarted = true;
            resetGame();
            restartMessage.style.display = 'block';
        }
    } else {
        if (isGameRestarted) {
            isGameRestarted = false;
            restartMessage.style.display = 'none';
        }
        if (keys.w) {
            car.position.x += Math.cos(car.rotation.z) * speed;
            car.position.y += Math.sin(car.rotation.z) * speed;
        }
        if (keys.s) {
            car.position.x -= Math.cos(car.rotation.z) * speed;
            car.position.y -= Math.sin(car.rotation.z) * speed;
        }
        isGameRestarted = false;

    }

    document.getElementById('new-game').addEventListener('click', startGame);


    if (car) {
        if (keys.w) {
            car.position.x += Math.cos(car.rotation.z) * speed;
            car.position.y += Math.sin(car.rotation.z) * speed;
        }
        if (keys.s) {
            car.position.x -= Math.cos(car.rotation.z) * speed;
            car.position.y -= Math.sin(car.rotation.z) * speed;
        }
        if (speed > 0) { // Adicione essa condição
            if (keys.a) {
                car.rotation.z += 0.03;
            }
            if (keys.d) {
                car.rotation.z -= 0.03;
            }
        }
    }

    requestAnimationFrame(update);
}

update();



//Criar uma arvore---------------------------------------------------------------------------------------------
//Criar uma arvore---------------------------------------------------------------------------------------------
//Criar uma arvore---------------------------------------------------------------------------------------------

//Arvore no cenário
const treeCrownColor = 0x498c2c;
const treeTrunkColor = 0x4b3f2f;
const treeTrunkGeometry = new THREE.BoxBufferGeometry(15, 15, 30);
const treeTrunkMaterial = new THREE.MeshLambertMaterial({
    color: treeTrunkColor
});
const treeCrownMaterial = new THREE.MeshLambertMaterial({
    color: treeCrownColor
});


function createTree() {
    // Cria o tronco da árvore
    const trunkGeometry = new THREE.CylinderGeometry(2, 2, 20, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);


    trunk.castShadow = true
    trunk.receiveShadow = true
    // Cria a copa da árvore
    const leavesGeometry = new THREE.SphereGeometry(8, 8, 8);
    const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(0, 15, 0);

    leaves.castShadow = true
    leaves.receiveShadow = true

    // Cria um grupo para a árvore e adiciona o tronco e a copa como filhos
    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves);

    // Define a posição da árvore
    tree.position.set(0, 0, 0);
    tree.rotation.x = Math.PI / 2;


    // Adiciona a árvore à cena
    cena.add(tree);
    return tree;
}
const tree = createTree();
const tree2 = createTree();
//const tree2 = createTree();
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------

function addBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(10, 5);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/UTAD.jpg');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(60, 30, -18);

    mesh.castShadow = true;
    mesh.receiveShadow = true;


    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const board = addBoard();

function addBoard2() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(10, 5);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/MASSIVE.png');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(50, 30, -18);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const board2 = addBoard2();


function addCGBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(70, 35);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/CG.png');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    // Posiciona a malha na beira da pista
    mesh.position.set(-74, -50, -20);

    // Adiciona a malha à cena
    cena.add(mesh);

    return mesh;
} const CG = addCGBoard();


// //Helicóptero
// //Helicóptero
// //Helicóptero

//SERVE PARA METER O CARRO A DAR UMA VOLTA PARA DEMONSTRAÇÃO
const helidada = new THREE.Group();

// Cria a geometria do corpo do helicóptero
var bodyGeometry = new THREE.BoxGeometry(3, 2, 8);
var bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.set(0, 0, 0);
body.rotation.z = Math.PI / 2
helidada.add(body);
body.castShadow = true
body.receiveShadow = true

// Cria a geometria do rotor principal
var mainRotorGeometry = new THREE.BoxGeometry(10, 0.2, 0.2);
var mainRotorMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
var mainRotor = new THREE.Mesh(mainRotorGeometry, mainRotorMaterial);
mainRotor.position.set(-2, 0, 0);
mainRotor.rotation.z = Math.PI /2;
helidada.add(mainRotor);
mainRotor.castShadow = true
mainRotor.receiveShadow = true

// Cria a geometria da cauda do helicóptero
var tailGeometry = new THREE.BoxGeometry(0.4, 1, 7);
var tailMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
var tail = new THREE.Mesh(tailGeometry, tailMaterial);
tail.position.set(0, 0, -4);
helidada.add(tail);
tail.castShadow = true
tail.receiveShadow = true

// Define a geometria
var tailRotorGeometry = new THREE.BoxGeometry(5, 0.2, 0.2);
// Cria a helice traseira
var tailRotorMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
var tailRotor = new THREE.Mesh(tailRotorGeometry, tailRotorMaterial);
tailRotor.position.set(0.45, 0, -6);
tailRotor.rotation.z = Math.PI / 2;
helidada.add(tailRotor);
tailRotor.castShadow = true
tailRotor.receiveShadow = true


// Cria as geometrias das janelas
var windowGeometry1 = new THREE.BoxGeometry(0.2, 1, 1);
var windowMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
var window1 = new THREE.Mesh(windowGeometry1, windowMaterial);
window1.position.set(1.5, 0.5, 0);
window1.rotation.y = Math.PI / 2
helidada.add(window1);

var windowGeometry2 = new THREE.BoxGeometry(0.2, 1, 1);
var window2 = new THREE.Mesh(windowGeometry2, windowMaterial);
window2.position.set(-1.5, 0.5, 0);
window2.rotation.y = Math.PI / 2
helidada.add(window2);

helidada.matrixAutoUpdate = false;
cena.add(helidada);




const vehicle = new YUKA.Vehicle()
vehicle.setRenderComponent(helidada, sync);

function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}

const path = new YUKA.Path();
path.add(new YUKA.Vector3(-4, 18, -10))
path.add(new YUKA.Vector3(70, 18, -10))
path.add(new YUKA.Vector3(88, 5, -10))
path.add(new YUKA.Vector3(88, -15, -10))
path.add(new YUKA.Vector3(70, -32, -10))
path.add(new YUKA.Vector3(-35, -32, -10))
path.add(new YUKA.Vector3(-50, -17, -10))
path.add(new YUKA.Vector3(-65, -16, -10))
path.add(new YUKA.Vector3(-80, -10, -10))
path.add(new YUKA.Vector3(-85, 10, -10))
path.add(new YUKA.Vector3(-75, 30, -15))
path.add(new YUKA.Vector3(-50, 30, 0))
path.add(new YUKA.Vector3(-30, 20, 10))
path.add(new YUKA.Vector3(0, 45, 15))


vehicle.position.copy(path.current())

// Verifique se o objeto está no último ponto do caminho
const lastWaypoint = path._waypoints[path._waypoints.length - 1];

const FollowPathBehavior = new YUKA.FollowPathBehavior(path, 0.5)
vehicle.steering.add(FollowPathBehavior);



vehicle.maxSpeed = 5;

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

let initialVehiclePosition = new YUKA.Vector3();
initialVehiclePosition.copy(vehicle.position);

window.addEventListener('keyup', function (event) {
    if (event.key === 'm') {
        if (isRectangleVisible) {
            cena.remove(testefinal);
            vehicle.position.copy(path._waypoints[0]);
            vehicle.steering.behaviors.length = 0; // Limpa todos os comportamentos
            vehicle.steering.add(FollowPathBehavior); // Adiciona novamente o comportamento de seguir o caminho
            isRectangleVisible = false;
        } else {
            cena.add(testefinal);
            vehicle.position.copy(path._waypoints[0]);
            vehicle.steering.behaviors.length = 0; // Limpa todos os comportamentos
            vehicle.steering.add(FollowPathBehavior); // Adiciona novamente o comportamento de seguir o caminho
            isRectangleVisible = true;
        }
    }
});
const position = [];
for (let i = 0; i < path._waypoints.length; i++) {
    const waypoint = path._waypoints[i];
    position.push(waypoint.x, waypoint.y, waypoint.z);
}

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));

let isRectangleVisible = true;





// const lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
// const lines = new THREE.LineLoop(lineGeometry, lineMaterial);
// cena.add(lines);

const time = new YUKA.Time();



function createGrass(width, height, x, y, z, texture) {
    const geometry = new THREE.PlaneGeometry(width, height, 1000, 10);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, y, z);

    return mesh;
}

function createGrasswithOpac(width, height, x, y, z, texture) {
    const geometry = new THREE.PlaneGeometry(width, height, 1000, 10);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, y, z);
    mesh.material.transparent = true;
    mesh.material.opacity = 0.8;

    return mesh;
}

function FirstcreateLamp() {
    // Cria um grupo para o candeeiro
    var lamp = new THREE.Group();

    // Cria a base do candeeiro
    var baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 7);
    var baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    var base = new THREE.Mesh(baseGeometry, baseMaterial);
    var base2 = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;

    base.castShadow = true;
    base.receiveShadow = true;

    lamp.add(base);
    base2.position.y = 0.15;
    base2.position.z = -6;

    base2.castShadow = true;
    base2.receiveShadow = true;

    lamp.add(base2);

    // Cria o poste do candeeiro
    var postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
    var postMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
    var post = new THREE.Mesh(postGeometry, postMaterial);
    var post2 = new THREE.Mesh(postGeometry, postMaterial);

    post.castShadow = true;
    post.receiveShadow = true;

    post.position.y = 1;
    lamp.add(post);
    post2.position.y = 1;
    post2.position.z = -6;

    post2.castShadow = true;
    post2.receiveShadow = true;

    lamp.add(post2);

    var sideGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 16);
    var sideup = new THREE.Mesh(sideGeometry, postMaterial);
    sideup.position.y = 2;
    sideup.position.z = -3;
    sideup.rotation.x = Math.PI / 2;

    sideup.castShadow = true;
    sideup.receiveShadow = true;

    lamp.add(sideup);


    lamp.rotation.x = Math.PI / 2;
    lamp.position.z = -20;
    lamp.scale.set(3, 3, 3);


    return lamp;
} const firstlamp = FirstcreateLamp();


function criarSemaforoHorizontal() {
    // Criar o objeto do semáforo
    var semaforo = new THREE.Object3D();

    // Criar a parte de cima do semáforo (luz vermelha)
    var parteSuperiorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var parteSuperiorGeometria = new THREE.CircleGeometry(0.25, 32, 32);
    var parteSuperior = new THREE.Mesh(parteSuperiorGeometria, parteSuperiorMaterial);

    parteSuperior.castShadow = true;
    parteSuperior.receiveShadow = true;

    semaforo.add(parteSuperior);

    // Criar a luz vermelha
    var luzVermelha = new THREE.PointLight(0xff0000, 1, 10);
    luzVermelha.position.y = 0.5;

    // luzVermelha.castShadow = true;
    // luzVermelha.receiveShadow = true;

    semaforo.add(luzVermelha);

    // Configurar a sombra da luz
    luzVermelha.castShadow = true;
    luzVermelha.shadow.mapSize.width = 512;
    luzVermelha.shadow.mapSize.height = 512;
    luzVermelha.shadow.camera.near = 0.5;
    luzVermelha.shadow.camera.far = 500;

    // Função para alternar a cor da luz e da geometria
    function alternarCores() {
        var corAtual = parteSuperior.material.color.getHex();
        if (corAtual === 0xff0000) {
            // Se a cor atual é vermelha, alterna para preto
            parteSuperior.material.color.setHex(0x000000); // Preto
            luzVermelha.color.setHex(0x000000); // Preto
        } else {
            // Se a cor atual é preta, alterna para vermelho
            parteSuperior.material.color.setHex(0xff0000); // Vermelho
            luzVermelha.color.setHex(0xff0000); // Vermelho
        }
    }


    // Função para iniciar a animação
    function iniciarAnimacao() {
        animacaoInterval = setInterval(function () {
            alternarCores();
        }, 1000); // Intervalo de 1 segundo para alternar as cores
    }

    // Iniciar a animação
    iniciarAnimacao();

    // Retornar o objeto do semáforo
    return semaforo;
}

// Criar três semáforos horizontais
var semaforo1 = criarSemaforoHorizontal();
var semaforo2 = criarSemaforoHorizontal();
var semaforo3 = criarSemaforoHorizontal();




function createLamp() {
    // Cria um grupo para o candeeiro
    var lampAny = new THREE.Group();

    // Cria a base do candeeiro
    var baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 7);
    var baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    var base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;

    base.castShadow = true;
    base.receiveShadow = true;


    lampAny.add(base);

    // Cria o poste do candeeiro
    var postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
    var postMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
    var post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = 1;

    post.castShadow = true;
    post.receiveShadow = true;

    lampAny.add(post);

    // Cria a lâmpada do candeeiro
    var bulbGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    var bulbMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    var bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.y = 2.5;

    bulb.castShadow = true;
    bulb.receiveShadow = true;

    lampAny.add(bulb);


    lampAny.rotation.x = Math.PI / 2;
    lampAny.position.z = -20;
    lampAny.scale.set(3, 3, 3);

    // var coneGeometry = new THREE.ConeGeometry(1, 2, 16);
    // var coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.3 });
    // var cone = new THREE.Mesh(coneGeometry, coneMaterial);
    // cone.position.copy(light.position);
    // cone.rotation.copy(light.rotation);
    // lamp.add(cone);


    return lampAny;
} const lampAny = createLamp();
const lampAny2 = createLamp();
const lampAny3 = createLamp();
const lampAny4 = createLamp();
const lampAny5 = createLamp();
const lampAny6 = createLamp();
const lampAny7 = createLamp();
const lampAny8 = createLamp();
const lampAny9 = createLamp();
const lampAny10 = createLamp();
const lampAny11 = createLamp();
const lampAny12 = createLamp();

//SKYBOX DE DIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
var texture_dir = new THREE.TextureLoader().load('./Images/SkyBox/clouds1_west.png');
var texture_esq = new THREE.TextureLoader().load('./Images/SkyBox/clouds1_east.png');
var texture_up = new THREE.TextureLoader().load('./Images/SkyBox/clouds1_up.png');
var texture_dn = new THREE.TextureLoader().load('./Images/SkyBox/clouds1_down.png');
var texture_bk = new THREE.TextureLoader().load('./Images/SkyBox/clouds1_south.png');
var texture_ft = new THREE.TextureLoader().load('./Images/SkyBox/clouds1_north.png');

var materialArray = [];

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dir }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_esq }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));


for (var i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;

var skyboxGeo = new THREE.BoxGeometry(500, 500, 500);

var skybox = new THREE.Mesh(skyboxGeo, materialArray);

skybox.rotation.x = Math.PI / 2; // Rotaciona 90 graus em torno do eixo y


//SKYBOX DE NOITEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
var texture_dir2 = new THREE.TextureLoader().load('./Images/SkyBoxNight/skybox_0.png');
var texture_esq2 = new THREE.TextureLoader().load('./Images/SkyBoxNight/skybox_1.png');
var texture_up2 = new THREE.TextureLoader().load('./Images/SkyBoxNight/skybox_2.png');
var texture_dn2 = new THREE.TextureLoader().load('./Images/SkyBoxNight/skybox_3.png');
var texture_bk2 = new THREE.TextureLoader().load('./Images/SkyBoxNight/skybox_4.png');
var texture_ft2 = new THREE.TextureLoader().load('./Images/SkyBoxNight/skybox_5.png');

var materialArray2 = [];

materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_dir2 }));
materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_esq2 }));
materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_up2 }));
materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_dn2 }));
materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_bk2 }));
materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_ft2 }));

for (var i = 0; i < 6; i++)
    materialArray2[i].side = THREE.BackSide;

var skyboxGeo2 = new THREE.BoxGeometry(500, 500, 500);

var skybox2 = new THREE.Mesh(skyboxGeo2, materialArray2);

skybox2.rotation.x = Math.PI / 2; // Rotaciona 90 graus em torno do eixo y

var skyboxState = 'day';

var spotlightday; // Holofote para o dia
var spotlightnight; // Holofote para a noite
var skyboxState = 'day'; // Estado inicial do skybox (dia)

function createLightforNight() {

    spotlightnight = new THREE.DirectionalLight(0xffffff, 0.5);
    spotlightnight.position.set(60, 60, 50); // Posição do holofote

    spotlightday = new THREE.DirectionalLight(0xffffff, 0.8);
    spotlightday.position.set(60, 60, 50); // Posição do holofote

    // Habilitar as sombras na luz
    spotlightday.castShadow = true;

    // Ajustar os parâmetros da câmera de sombras
    spotlightday.shadow.mapSize.width = 2024; // resolução da sombra
    spotlightday.shadow.mapSize.height = 2024; // resolução da sombra
    spotlightday.shadow.camera.left = -60;
    spotlightday.shadow.camera.right = 60;
    spotlightday.shadow.camera.top = 80;
    spotlightday.shadow.camera.bottom = -60;
    spotlightday.shadow.camera.updateProjectionMatrix();

    var radius = 10; // Raio da esfera
    var widthSegments = 32; // Número de segmentos horizontais. Opcional, mas quanto maior, mais "suave" a esfera
    var heightSegments = 32; // Número de segmentos verticais. Opcional, mas quanto maior, mais "suave" a esfera
    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // Carrega a textura
    var texture = new THREE.TextureLoader().load('./Images/lua.jpg')

    // Aplica a textura ao material
    var material = new THREE.MeshBasicMaterial({ map: texture });

    var lightDay = new THREE.Mesh(geometry, material);
    lightDay.position.copy(spotlightday.position); // Posiciona a esfera na mesma posição do holofote

    cena.add(lightDay); // Adicione a esfera à cena

    return lightDay;
}

const nightLight = createLightforNight();


function createLightforDay() {
    spotlightday = new THREE.DirectionalLight(0xffffff, 1.5);
    spotlightday.position.set(60, 60, 50); // Posição do holofote

    // Habilitar as sombras na luz
    spotlightday.castShadow = true;

    // Ajustar os parâmetros da câmera de sombras
    spotlightday.shadow.mapSize.width = 2024; // resolução da sombra
    spotlightday.shadow.mapSize.height = 2024; // resolução da sombra
    spotlightday.shadow.camera.left = -100;
    spotlightday.shadow.camera.right = 100;
    spotlightday.shadow.camera.top = 80;
    spotlightday.shadow.camera.bottom = -60;
    spotlightday.shadow.camera.updateProjectionMatrix();

    var radius = 10; // Raio da esfera
    var widthSegments = 32; // Número de segmentos horizontais. Opcional, mas quanto maior, mais "suave" a esfera
    var heightSegments = 32; // Número de segmentos verticais. Opcional, mas quanto maior, mais "suave" a esfera
    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // Carrega a textura
    var texture = new THREE.TextureLoader().load('./Images/sol.avif')

    // Aplica a textura ao material
    var material = new THREE.MeshBasicMaterial({ map: texture });

    var lightDay = new THREE.Mesh(geometry, material);
    lightDay.position.copy(spotlightday.position); // Posiciona a esfera na mesma posição do holofote

    lightDay.castShadow = false;
    lightDay.receiveShadow = false;

    cena.add(lightDay); // Adicione a esfera à cena
    cena.add(spotlightday); // Adicione a luz à cena

    return lightDay;
}

const lightDay = createLightforDay();


// Cria a luz da lâmpada de noite da camara de cima
var lightday = new THREE.PointLight(0xffffff, 2, 10);
var lightday2 = new THREE.PointLight(0xffffff, 2, 10);
var lightday3 = new THREE.PointLight(0xffffff, 2, 10);
var lightday4 = new THREE.PointLight(0xffffff, 2, 10);
var lightday5 = new THREE.PointLight(0xffffff, 2, 10);
var lightday6 = new THREE.PointLight(0xffffff, 2, 10);
var lightday7 = new THREE.PointLight(0xffffff, 2, 10);
var lightday8 = new THREE.PointLight(0xffffff, 2, 10);
var lightday9 = new THREE.PointLight(0xffffff, 2, 10);
var lightday10 = new THREE.PointLight(0xffffff, 2, 10);
var lightday11 = new THREE.PointLight(0xffffff, 2, 10);
var lightday12 = new THREE.PointLight(0xffffff, 2, 10);

lightday.position.set(0, 1.5, 0);
lightday2.position.set(0, 1.5, 0);
lightday3.position.set(0, 1.5, 0);
lightday4.position.set(0, 1.5, 0);
lightday5.position.set(0, 1.5, 0);
lightday6.position.set(0, 1.5, 0);
lightday7.position.set(0, 1.5, 0);
lightday8.position.set(0, 1.5, 0);
lightday9.position.set(0, 1.5, 0);
lightday10.position.set(0, 1.5, 0);
lightday11.position.set(0, 1.5, 0);
lightday12.position.set(0, 1.5, 0);




// Cria a luz da lâmpada da primeira pessoa de noite
var lightNighs = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs2 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs3 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs4 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs5 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs6 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs7 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs8 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs9 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs10 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs11 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs12 = new THREE.PointLight(0xffffff, 6, 200);


var ambientLightday = new THREE.AmbientLight(0x404040, 1); // luz suave branca
var ambientLightnight = new THREE.AmbientLight(0x404040, 0.5); // luz suave branca




window.addEventListener('keyup', function (event) {
    if (event.key === 'p') {
        if (cena.children.includes(ambientLightday)) {
            cena.remove(ambientLightday);
        } else {
            cena.add(ambientLightday);
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key === 'o') {
        if (cena.children.includes(spotlightday)) {
            cena.remove(spotlightday);
        } else {
            cena.add(spotlightday);
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key === 'i') {
        if (cena.children.includes(ambientLightnight)) {
            cena.remove(ambientLightnight);
        } else {
            cena.add(ambientLightnight);
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key === 'u') {
        if (cena.children.includes(spotlightnight)) {
            cena.remove(spotlightnight);
        } else {
            cena.add(spotlightnight);
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key === 'y') {
        if (skyboxState === 'day') {
            if (camara === camaraPrimeiraPessoa) {
                lampAny.add(lightNighs);
                lampAny2.add(lightNighs2);
                lampAny3.add(lightNighs3);
                lampAny4.add(lightNighs4);
                lampAny5.add(lightNighs5);
                lampAny6.add(lightNighs6);
                lampAny7.add(lightNighs7);
                lampAny8.add(lightNighs8);
                lampAny9.add(lightNighs9);
                lampAny10.add(lightNighs10);
                lampAny11.add(lightNighs11);
                lampAny12.add(lightNighs12);
            }

            lampAny.add(lightday);
            lampAny2.add(lightday2);
            lampAny3.add(lightday3);
            lampAny4.add(lightday4);
            lampAny5.add(lightday5);
            lampAny6.add(lightday6);
            lampAny7.add(lightday7);
            lampAny8.add(lightday8);
            lampAny9.add(lightday9);
            lampAny10.add(lightday10);
            lampAny11.add(lightday11);
            lampAny12.add(lightday12);
            skyboxState = 'night';
        } else {
            if (camara === camaraPrimeiraPessoa) {
                lampAny.remove(lightNighs);
                lampAny2.remove(lightNighs2);
                lampAny3.remove(lightNighs3);
                lampAny4.remove(lightNighs4);
                lampAny5.remove(lightNighs5);
                lampAny6.remove(lightNighs6);
                lampAny7.remove(lightNighs7);
                lampAny8.remove(lightNighs8);
                lampAny9.remove(lightNighs9);
                lampAny10.remove(lightNighs10);
                lampAny11.remove(lightNighs11);
                lampAny12.remove(lightNighs12);
            }

            lampAny.remove(lightday)
            lampAny2.remove(lightday2)
            lampAny3.remove(lightday3)
            lampAny4.remove(lightday4)
            lampAny5.remove(lightday5);
            lampAny6.remove(lightday6);
            lampAny7.remove(lightday7);
            lampAny8.remove(lightday8);
            lampAny9.remove(lightday9);
            lampAny10.remove(lightday10);
            lampAny11.remove(lightday11);
            lampAny12.remove(lightday12);


            skyboxState = 'day';

        }

    }
});


window.addEventListener('keydown', function (event) {
    if (event.key === 't') { // Tecla "t" para alternar os skyboxes
        if (skyboxState === 'day') {
            if (camara === camaraPrimeiraPessoa) {
                //Luzes de noite na terceira pessoa tem de ser mais fortes
                lightNighs.position.set(0, 1.5, 0);
                lightNighs2.position.set(0, 1.5, 0);
                lightNighs3.position.set(0, 1.5, 0);
                lightNighs4.position.set(0, 1.5, 0);
                lightNighs5.position.set(0, 1.5, 0);
                lightNighs6.position.set(0, 1.5, 0);
                lightNighs7.position.set(0, 1.5, 0);
                lightNighs8.position.set(0, 1.5, 0);
                lightNighs9.position.set(0, 1.5, 0);
                lightNighs10.position.set(0, 1.5, 0);
                lightNighs11.position.set(0, 1.5, 0);
                lightNighs12.position.set(0, 1.5, 0);

                lampAny.add(lightNighs);
                lampAny2.add(lightNighs2);
                lampAny3.add(lightNighs3);
                lampAny4.add(lightNighs4);
                lampAny5.add(lightNighs5);
                lampAny6.add(lightNighs6);
                lampAny7.add(lightNighs7);
                lampAny8.add(lightNighs8);
                lampAny9.add(lightNighs9);
                lampAny10.add(lightNighs10);
                lampAny11.add(lightNighs11);
                lampAny12.add(lightNighs12);
            }
            cena.remove(lightDay);  // remove a esfera do dia
            cena.add(nightLight);   // adiciona a esfera da noite
            cena.remove(ambientLightday)
            cena.add(ambientLightnight)

            lampAny.add(lightday);
            lampAny2.add(lightday2);
            lampAny3.add(lightday3);
            lampAny4.add(lightday4);
            lampAny5.add(lightday5);
            lampAny6.add(lightday6);
            lampAny7.add(lightday7);
            lampAny8.add(lightday8);
            lampAny9.add(lightday9);
            lampAny10.add(lightday10);
            lampAny11.add(lightday11);
            lampAny12.add(lightday12);

            cena.remove(spotlightday);
            cena.remove(skybox);
            cena.add(skybox2);
            cena.add(spotlightnight);
            skyboxState = 'night';
        } else {
            if (camara === camaraPrimeiraPessoa) {
                lampAny.remove(lightNighs);
                lampAny2.remove(lightNighs2);
                lampAny3.remove(lightNighs3);
                lampAny4.remove(lightNighs4);
                lampAny5.remove(lightNighs5);
                lampAny6.remove(lightNighs6);
                lampAny7.remove(lightNighs7);
                lampAny8.remove(lightNighs8);
                lampAny9.remove(lightNighs9);
                lampAny10.remove(lightNighs10);
                lampAny11.remove(lightNighs11);
                lampAny12.remove(lightNighs12);
            }
            cena.remove(ambientLightnight)
            cena.add(ambientLightday)
            lampAny.remove(lightday)
            lampAny2.remove(lightday2)
            lampAny3.remove(lightday3)
            lampAny4.remove(lightday4)
            lampAny5.remove(lightday5);
            lampAny6.remove(lightday6);
            lampAny7.remove(lightday7);
            lampAny8.remove(lightday8);
            lampAny9.remove(lightday9);
            lampAny10.remove(lightday10);
            lampAny11.remove(lightday11);
            lampAny12.remove(lightday12);

            cena.remove(spotlightnight);
            cena.remove(skybox2);
            cena.add(skybox);
            cena.add(spotlightday);
            cena.remove(nightLight);  // remove a esfera da noite
            cena.add(lightDay);   // adiciona a esfera do dia
            skyboxState = 'day';

        }
    }
});


//COLOCAR AS VOLTAS NA PISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//COLOCAR AS VOLTAS NA PISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//COLOCAR AS VOLTAS NA PISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//COLOCAR AS VOLTAS NA PISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//COLOCAR AS VOLTAS NA PISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// Adicione um elemento HTML para exibir a contagem
// Adicione um elemento HTML para exibir a contagem
var counterElement = document.createElement('div');
counterElement.style.position = 'absolute';
counterElement.style.color = 'white'
counterElement.style.fontSize = '50px';
counterElement.style.top = '10px';
counterElement.style.left = '10px';
document.body.appendChild(counterElement);

function updateCounter() {
    counterElement.innerHTML = 'Voltas: ' + count;
}

var count = 0;
var flagMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false });
var flagGeometry = new THREE.BoxBufferGeometry(10, 1, 2);
var lapcount = new THREE.Mesh(flagGeometry, flagMaterial);

cena.add(lapcount)
lapcount.position.set(-5, 19.5, -19)
lapcount.rotation.z = Math.PI / 2

var crossedFinishLine = false; // Variável de controle
var carPreviousPosition = new THREE.Vector3(); // Posição anterior do carro

var checkpointMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, visible: false });
var checkpointGeometry = new THREE.BoxBufferGeometry(10, 1, 2);

var checkpoint1 = new THREE.Mesh(checkpointGeometry, checkpointMaterial);
checkpoint1.rotation.z = Math.PI / 2;
// Posicione os checkpoints adequadamente
checkpoint1.position.set(-65, 33.5, -19);

cena.add(checkpoint1);
var checkpoints = [checkpoint1, lapcount]; // Checkpoints na ordem correta

var currentCheckpoint = 0; // Variável para controlar o checkpoint atual

function lapUpdate() {
    const carPosition = new THREE.Vector3();
    car.getWorldPosition(carPosition);

    const carBoundingBox = new THREE.Box3().setFromObject(car);

    const checkpoint = checkpoints[currentCheckpoint];
    const checkpointBoundingBox = new THREE.Box3().setFromObject(checkpoint);

    if (carBoundingBox.intersectsBox(checkpointBoundingBox)) {
        if (checkpoint.visible) {
            if (currentCheckpoint === checkpoints.length - 1) {
                // O carro cruzou o último checkpoint, indicando uma volta completa
                count++;
                updateCounter();
                speed += speed - 0.14;
                resetCheckpoints();
            } else {
                // Avança para o próximo checkpoint
                checkpoint.visible = false;
                currentCheckpoint++;
                checkpoints[currentCheckpoint].visible = true;
            }
        }
    }

    carPreviousPosition.copy(carPosition);
}

function resetCheckpoints() {
    // Redefine a visibilidade de todos os checkpoints
    for (let i = 0; i < checkpoints.length; i++) {
        const checkpoint = checkpoints[i];
        checkpoint.visible = (i === 0); // Define o primeiro checkpoint como visível, os demais como invisíveis
    }

    currentCheckpoint = 0; // Reinicia para o primeiro checkpoint
}




//ANIMAÇÃO PARA O SOL ANDARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

//ANIMAÇÃO PARA O SOL ANDARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// Variável para controlar o estado da animação
let isAnimating = false;

// Ângulo atual do sol
let currentAngle = 0;

// Duração total da animação em milissegundos
const duration = 10000;

// Ângulo completo da rotação (360 graus em radianos)
const fullRotation = 2 * Math.PI;

// Altura do sol acima do plano
const height = 20;

// Raio da trajetória do sol
const radiusSun = 100;

// Coordenadas da posição do sol
const positionX = 0;
const positionY = 0;
const positionZ = 50;

function updateSunPosition() {
    if (isAnimating) {
        // Incrementa o ângulo atual com base no tempo decorrido
        const elapsedTime = Date.now() - startTime;
        const angularSpeed = fullRotation / duration; // velocidade angular (radianos por ms)
        currentAngle += elapsedTime * angularSpeed;

        // Calcula a nova posição do sol
        const newX = Math.cos(currentAngle) * radiusSun;
        const newY = Math.sin(currentAngle) * radiusSun;
        const newZ = positionZ;

        // Atualiza a posição do sol
        lightDay.position.set(newX + positionX, newY + positionY, newZ);

        spotlightday.position.copy(lightDay.position);


        // Verifica se a animação foi concluída
        if (currentAngle >= fullRotation) {
            isAnimating = false;
            currentAngle = 0; // Reset the angle
        }

        // Update the start time for the next frame
        startTime = Date.now();
    }
}

// Função de clique para iniciar a animação ao pressionar a letra X
function handleClick(event) {
    if (event.keyCode === 88) { // Código da tecla X
        if (!isAnimating) {
            isAnimating = true;
            startTime = Date.now();
            currentAngle = 0; // Reset the angle at the start of the animation
        }
    }
}


// Adicione um ouvinte de eventos para capturar o clique da tecla X
window.addEventListener('keydown', handleClick);

function Start() {

    const grassTexture = new THREE.TextureLoader().load('./Images/grass2.0.png');

    const gravelTexture = new THREE.TextureLoader().load('./Images/gravel2.png');


    const grass = createGrass(130, 42, 40, -10, -20, grassTexture);
    const grass2 = createGrass(30, 42, 40, -10, -20, grassTexture);
    const grass3 = createGrass(50, 40, -55, 0, -20, grassTexture);
    const gravel = createGrasswithOpac(110, 150, -55, 0, -20, gravelTexture);
    const gravel2 = createGrasswithOpac(110, 150, -55, 0, -20, gravelTexture);

    grass.position.x = 20; // posição do chão
    grass.position.y = -6; // posição do chão
    grass.position.z = -20; // posição da relva na pista

    grass2.position.x = -64; // posição do chão
    grass2.position.y = 10; // posição do chão
    grass2.position.z = -20; // posição da relva na pista

    grass3.position.x = -54; // posição do chão
    grass3.position.y = 6; // posição do chão
    grass3.position.z = -20; // posição da relva na pista
    gravel.position.x = -57.96; // posição do chão
    gravel.position.y = 0; // posição do chão
    gravel.position.z = -20.01; // posição da relva na pista
    gravel2.position.x = 51.9; // posição do chão
    gravel2.position.y = 0; // posição do chão
    gravel2.position.z = -20.05; // posição da relva na pista

    lampAny.position.y = 12;
    lampAny.position.x = -7;
    lampAny2.position.x = -40;
    lampAny2.position.y = 16;
    lampAny3.position.x = 35;
    lampAny3.position.y = 12;
    lampAny4.position.x = 62;
    lampAny4.position.y = 12.5;
    lampAny5.position.x = -50;
    lampAny5.position.y = -10;
    lampAny6.position.x = -20;
    lampAny6.position.y = -22;
    lampAny7.position.x = 62;
    lampAny7.position.y = -22;
    lampAny8.position.x = 32;
    lampAny8.position.y = -22;
    lampAny9.position.x = 7;
    lampAny9.position.y = -22;
    lampAny10.position.x = -77;
    lampAny10.position.y = 7;
    lampAny11.position.x = 7;
    lampAny11.position.y = -22;
    lampAny12.position.x = 81;
    lampAny12.position.y = -5;
    firstlamp.position.set(0, 11, -19.8)




    // Posicionar os semáforos
    semaforo1.position.set(-0.3, 21, -14.1);
    semaforo2.position.set(-0.3, 20, -14.1);
    semaforo3.position.set(-0.3, 19, -14.1);
    semaforo1.rotation.y = -Math.PI / 2;
    semaforo2.rotation.y = -Math.PI / 2;
    semaforo3.rotation.y = -Math.PI / 2;


    hideRearView();
    cena.add(ambientLightday)
    cena.add(skybox);
    cena.add(spotlightday);

    // Crie um helper para a luz
    const spotlightHelper = new THREE.SpotLightHelper(spotlightday);

    // Adicione o helper à cena
    cena.add(spotlightHelper);



    cena.add(tree);
    cena.add(tree2);
    cena.add(car);
    cena.add(wheel);
    cena.add(track);
    cena.add(grass);
    cena.add(grass2);
    cena.add(grass3);
    cena.add(gravel);
    cena.add(gravel2);
    cena.add(lampAny);
    cena.add(lampAny2);
    cena.add(lampAny3);
    cena.add(lampAny4);
    cena.add(lampAny5);
    cena.add(lampAny6);
    cena.add(lampAny7);
    cena.add(lampAny8);
    cena.add(lampAny9);
    cena.add(lampAny10);
    cena.add(lampAny11);
    cena.add(lampAny12);
    cena.add(firstlamp);
    cena.add(semaforo1);
    cena.add(semaforo2);
    cena.add(semaforo3);




    tree.position.set(-60, 10, -10);
    tree2.position.set(20, -5, -10);

    startGame();
    updateCounter();

    requestAnimationFrame(loop);
}

function loop() {
    // Verifique se o objeto está no último ponto do caminho
    const marginOfError = 0.1; // Valor de margem de erro para a comparação

    if (
        Math.abs(vehicle.position.x - lastWaypoint.x) <= marginOfError &&
        Math.abs(vehicle.position.y - lastWaypoint.y) <= marginOfError &&
        Math.abs(vehicle.position.z - lastWaypoint.z) <= marginOfError
    ) {
        // Defina a velocidade de rotação das hélices como zero
        mainRotor.rotation.x = 0;
        tailRotor.rotation.x = 0;
    } else {
        // Continue atualizando a rotação das hélices normalmente
        mainRotor.rotation.x += 0.1;
        tailRotor.rotation.x += 0.1;
    }


    const delta = time.update().getDelta() * 2;
    entityManager.update(delta);

    // controls.update(); Serve para a orbit para mexer com o rato na camara.
    lapUpdate(); // Adicione esta linha para verificar as voltas
    updateSunPosition();
    renderer.render(cena, camara);
    rearViewRenderer.render(cena, rearViewCamera)

    requestAnimationFrame(loop);
}


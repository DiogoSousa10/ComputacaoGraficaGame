document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();

//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------
var cs = 1; //camera default
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 500;
const cameraHeight = cameraWidth / aspectRatio;

//Camera Perspectiva 
var camaraPerspetiva = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);

var camaraPrimeiraPessoa;

function criarCamaraPrimeiraPessoa() {
    const cam = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 15000);
    cam.position.set(-2, 0, 30); // Ajuste a posição da câmera dentro do carro
    cam.rotation.set(Math.PI / 2, -Math.PI / 2, 0); // Ajuste a rotação da câmera para olhar ligeiramente para baixo
    return cam;
}

//Camera Ortografica
var camaraO = new THREE.OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0, // near plane
    1000, // far plane
);

if (cs == 0) {
    camara = camaraPerspetiva;

    camara.position.set(100, 100, 100);
    camara.lookAt(0, 0, 0);
} else if (cs == 1) {
    camara = camaraO;
    camara.position.set(200, 0, 300);
    camara.lookAt(0, 0, 0);
} else if (cs == 2) { // Adicione esta condição para usar a câmera de primeira pessoa
    camara = camaraPrimeiraPessoa;

}


//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------


//-------------------------------------------------
// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 15, window.innerHeight - 20);
renderer.render(cena, camara);

document.body.appendChild(renderer.domElement);



//Clicar tecla C e mexer com a camara Ortografica ou perspetiva e Primeira Pessoa.
document.addEventListener("keydown", (event) => {
    if (event.code === "KeyC") {
        cs = (cs + 1) % 3; // Alterna entre as câmeras

        if (cs == 0) {
            camara = camaraPerspetiva;
            camara.position.set(100, 100, 100);
            camara.lookAt(0, 0, 0);
            lampAny.remove(lightNighs);
            lampAny2.remove(lightNighs2);
            lampAny3.remove(lightNighs3);
            lampAny4.remove(lightNighs4);

        } else if (cs == 1) {
            camara = camaraO;
            camara.position.set(200, 0, 300);
            camara.lookAt(0, 0, 0);
        } else if (cs == 2) {
            camara = camaraPrimeiraPessoa;

            //Faço este if para elas inicializarem com elas ligadas quando esta de noite e depos haver a troca
            if (skyboxState === 'night') {
                lampAny.add(lightNighs);
                lampAny2.add(lightNighs2);
                lampAny3.add(lightNighs3);
                lampAny4.add(lightNighs4);
            }
        }
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
    car.add(backWheel);


    const frontWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(8.5, 8.5, 33, 32),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    frontWheel.position.z = 6;
    frontWheel.position.x = 18;
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
    car.add(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 24, 12),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    cabin.position.x = -6;
    cabin.position.z = 25.5;
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
//Camera Orbit (Camara que faz 360ª, tem de ser criada em baixo da camara, da cena e dos renderer.)

var controls = new THREE.OrbitControls(camara, renderer.domElement);
controls.update();



renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

//Variavel que guardara o objeto importado
var objetoImportado;

//Variavel com o objeto responsavel por importar ficheiros FBX
var importer = new THREE.FBXLoader();


function createTrack() {
    importer.load('./Objetos/race-track.fbx', function (object) {

        // Cria uma instância do objeto THREE.Object3D()
        var object3D = new THREE.Object3D();

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
        const material = new THREE.MeshBasicMaterial({ map: texture });

        // Cria a malha com a geometria e o material
        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(0.1, 0.099, 0);

        // Posiciona a malha no chão
        mesh.position.set(-4, 19.2, -19.75);

        // Adiciona a malha à cena
        cena.add(mesh);



    })
} const track = createTrack()


var geometriaCubo = new THREE.BoxGeometry(1, 1, 1);

var textura = new THREE.TextureLoader().load('./Images/boxImage.jpg')
var materialTextura = new THREE.MeshStandardMaterial({ map: textura });



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
    }
}

document.addEventListener("keyup", onDocumentKeyUp, false);

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

cena.add(wall5);
cena.add(wall6);
cena.add(wall7);
cena.add(wall8);
// cena.add(wall9);
// cena.add(wall10);
// cena.add(wall11)


wall5.scale.set(3.5, 39, 0)
wall5.position.set(23, -5.5, -19)
wall6.scale.set(1, 38, 0)
wall6.position.set(-20, -4.4, -19)
wall7.position.set(-19, -5.5, -19)
wall7.scale.set(1, 38, 0)
wall8.scale.set(1, 27, 0)
wall8.position.set(-35, 1, -19)
// wall9.scale.set(1, 27, 1)
// wall9.position.set(-34, -6, -19)
// wall9.rotation.z = Math.PI / 3.5;
//  wall10.scale.set(1, 27, 0)
// wall10.position.set(-50, 11 , -19)
// wall10.rotation.z = Math.PI / 3.1
// wall11.scale.set(0.5, 5, 0)
// wall11.position.set(-50, -9 , -19)
// wall11.rotation.z = -Math.PI / 10


const raio = 19; // Raio do círculo
const segmentos = 32; // Número de segmentos do círculo
const geometry = new THREE.CircleGeometry(raio, segmentos);

// Criar o material do círculo
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Criar a malha (mesh) do círculo combinando a geometria e o material
const circleMesh = new THREE.Mesh(geometry, material);
const circleMesh2 = new THREE.Mesh(geometry, material);

// Adicionar a malha do círculo à cena
cena.add(circleMesh);
circleMesh.position.set(64.5, -5.5, -19)
cena.add(circleMesh2);
circleMesh2.position.set(-60, 9.7, -19)

var isGamePaused = false;
var previousCarPosition = new THREE.Vector3();
var carDirection = new THREE.Vector3();

var isGameRestarted = false;
let speed = 0.15;

function startGame() {
    speed = 0.15;
    car.position.set(-3, 20, -19);
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
        const wallBoundingCircle = new THREE.Box3().setFromObject(circleMesh);
        // const wallBoundingBox = new THREE.Box3().setFromObject(wall);
        const wallInside = new THREE.Box3().setFromObject(wall5);
        const wallInside2 = new THREE.Box3().setFromObject(wall6);
        const wallInside3 = new THREE.Box3().setFromObject(wall7);
        const wallInside4 = new THREE.Box3().setFromObject(wall8);
        //const wallInside5 = new THREE.Box3().setFromObject(wall9);
        //const wallInside6 = new THREE.Box3().setFromObject(wall10);
        //const wallInside7 = new THREE.Box3().setFromObject(wall11);
        const wallInside8 = new THREE.Box3().setFromObject(circleMesh2);

        // Obter as caixas delimitadoras das paredes
        const wallBoundingBoxes = [
            // wallBoundingBox,

            wallInside, wallInside2, wallInside3, wallInside4
            //wallInside6,wallInside7,wallInside5
        ];

        const circleCenter = circleMesh.position.clone();
        const carDistanceToCircle = carPosition.distanceTo(circleCenter);
        const circleRadius = raio * Math.max(circleMesh.scale.x, circleMesh.scale.y, circleMesh.scale.z);
        if (carDistanceToCircle < circleRadius) {
            return true;
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

    // Cria a copa da árvore
    const leavesGeometry = new THREE.SphereGeometry(8, 8, 8);
    const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(0, 15, 0);

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
} const tree = createTree();

//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------

function addBoard() {
    // Cria a geometria do placar
    const geometry = new THREE.PlaneGeometry(10, 5);

    // Carrega a textura da imagem
    const texture = new THREE.TextureLoader().load('./Images/UTAD.jpg');

    // Cria o material com a textura da imagem
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(80, 50, -18);

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
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Cria a malha com a geometria e o material
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);

    // Posiciona a malha na beira da pista
    mesh.position.set(70, 50, -18);

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
function createHeli() {

    const heli = new THREE.Group();


    // Cria a geometria do corpo do helicóptero
    var bodyGeometry = new THREE.BoxGeometry(3, 2, 8);
    var bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0, 0);
    heli.add(body);

    // Cria a geometria do rotor principal
    var mainRotorGeometry = new THREE.BoxGeometry(10, 0.2, 0.2);
    var mainRotorMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    var mainRotor = new THREE.Mesh(mainRotorGeometry, mainRotorMaterial);
    mainRotor.position.set(0, 1, 0);
    heli.add(mainRotor);


    // Cria a geometria da cauda do helicóptero
    var tailGeometry = new THREE.BoxGeometry(0.4, 1, 7);
    var tailMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    var tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0, -4);
    heli.add(tail);


    // Define a geometria
    var tailRotorGeometry = new THREE.BoxGeometry(5, 0.2, 0.2);
    // Cria a helice traseira
    var tailRotorMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    var tailRotor = new THREE.Mesh(tailRotorGeometry, tailRotorMaterial);
    tailRotor.position.set(0.45, 0, -6);
    tailRotor.rotation.z = Math.PI / 2;
    heli.add(tailRotor);



    // Cria as geometrias das janelas
    var windowGeometry1 = new THREE.BoxGeometry(0.2, 1, 1);
    var windowMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
    var window1 = new THREE.Mesh(windowGeometry1, windowMaterial);
    window1.position.set(1.5, 0.5, 0);
    heli.add(window1);

    var windowGeometry2 = new THREE.BoxGeometry(0.2, 1, 1);
    var window2 = new THREE.Mesh(windowGeometry2, windowMaterial);
    window2.position.set(-1.5, 0.5, 0);
    heli.add(window2);

    //     // Posiciona os objetos
    //     body.position.set(0, 0, 0);
    //     mainRotor.position.set(0, 1, 0);
    //     tail.position.set(0, 0, -4);
    //     tailRotor.position.set(0, 1, -3);


    //     // Renderiza a cena
    //     function animate() {
    //         requestAnimationFrame(animate);

    //         mainRotor.rotation.y += 0.1;
    //         tailRotor.rotation.x += 0.1;

    //         renderer.render(cena, camera);
    //     }
    //     animate();
    return { heli, mainRotor, tailRotor };
} var heliObj = createHeli();

var heli = heliObj.heli;
var mainRotor = heliObj.mainRotor;
var tailRotor = heliObj.tailRotor;

// Configurações do movimento circular
var radius = 35; // Raio do círculo
var speedHeli = 0.0005; // Velocidade de rotação
var maxRotation = Math.PI / 6; // Ângulo máximo de rotação (30 graus)

function updateHeli() {
    // Atualiza a posição do objeto no movimento circular
    var time = Date.now() * speedHeli;

    var x = Math.cos(time) * radius;
    var y = Math.sin(time) * radius;

    heli.position.set(x, y, 0);
    // Orienta o objeto na direção do próximo ponto no movimento circular
    var nextX = Math.cos(time + 0.01) * radius;
    var nextY = Math.sin(time + 0.01) * radius;
    var direction = new THREE.Vector3(nextX - x, nextY - y, 0).normalize();
    heli.lookAt(heli.position.clone().add(direction));
    requestAnimationFrame(updateHeli);
    // Calcula o ângulo de rotação em torno do eixo Z
    var rotationAngle = Math.atan2(direction.y, direction.x);

    // Define a rotação do objeto em torno do eixo Z
    heli.rotation.z = rotationAngle;
}

// //Helicóptero
// //Helicóptero
// //Helicóptero



function createGrass(width, height, x, y, z, texture) {
    const geometry = new THREE.PlaneGeometry(width, height, 1000, 10);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);


    return mesh;
}

function createGrasswithOpac(width, height, x, y, z, texture) {
    const geometry = new THREE.PlaneGeometry(width, height, 1000, 10);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

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
    lamp.add(base);
    base2.position.y = 0.15;
    base2.position.z = -6;
    lamp.add(base2);

    // Cria o poste do candeeiro
    var postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
    var postMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
    var post = new THREE.Mesh(postGeometry, postMaterial);
    var post2 = new THREE.Mesh(postGeometry, postMaterial);

    post.position.y = 1;
    lamp.add(post);
    post2.position.y = 1;
    post2.position.z = -6;
    lamp.add(post2);

    var sideGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 16);
    var sideup = new THREE.Mesh(sideGeometry, postMaterial);
    sideup.position.y = 2;
    sideup.position.z = -3;
    sideup.rotation.x = Math.PI / 2;
    lamp.add(sideup);


    lamp.rotation.x = Math.PI / 2;
    lamp.position.z = -20;
    lamp.scale.set(3, 3, 3);


    return lamp;
} const firstlamp = FirstcreateLamp();


function createLamp() {
    // Cria um grupo para o candeeiro
    var lampAny = new THREE.Group();

    // Cria a base do candeeiro
    var baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 7);
    var baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    var base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.15;
    lampAny.add(base);

    // Cria o poste do candeeiro
    var postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
    var postMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
    var post = new THREE.Mesh(postGeometry, postMaterial);
    post.position.y = 1;
    lampAny.add(post);

    // Cria a lâmpada do candeeiro
    var bulbGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    var bulbMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    var bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.y = 2.5;
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
    spotlightnight = new THREE.SpotLight(0xffffff, 0.3);
    spotlightnight.position.set(180, 120, 140); // Posição do holofote

    var size = 20; // Tamanho do quadrado
    var geometry = new THREE.BoxGeometry(size, size, size);
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var nightLight = new THREE.Mesh(geometry, material);
    nightLight.position.copy(spotlightnight.position); // Posiciona o quadrado na mesma posição do holofote

    cena.add(nightLight); // Adicione o quadrado à cena


    return nightLight;
}

const nightLight = createLightforNight();

function createLightforDay() {
    spotlightday = new THREE.SpotLight(0xffffff, 1.5);
    spotlightday.position.set(180, 120, 140); // Posição do holofote

    var size = 20; // Tamanho do quadrado
    var geometry = new THREE.BoxGeometry(size, size, size);
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var lightDay = new THREE.Mesh(geometry, material);
    lightDay.position.copy(spotlightday.position); // Posiciona o quadrado na mesma posição do holofote

    cena.add(lightDay); // Adicione o quadrado à cena

    return lightDay;
}

const lightDay = createLightforDay();


// Cria a luz da lâmpada de noite da camara de cima
var lightday = new THREE.PointLight(0xffffff, 2, 10);
var lightday2 = new THREE.PointLight(0xffffff, 2, 10);
var lightday3 = new THREE.PointLight(0xffffff, 2, 10);
var lightday4 = new THREE.PointLight(0xffffff, 2, 10);

lightday.position.set(0, 1.5, 0);
lightday2.position.set(0, 1.5, 0);
lightday3.position.set(0, 1.5, 0);
lightday4.position.set(0, 1.5, 0);


// Cria a luz da lâmpada da primeira pessoa de noite
var lightNighs = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs2 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs3 = new THREE.PointLight(0xffffff, 6, 200);
var lightNighs4 = new THREE.PointLight(0xffffff, 6, 200);



window.addEventListener('keydown', function (event) {
    if (event.key === 't') { // Tecla "t" para alternar os skyboxes
        if (skyboxState === 'day') {

            if (camara === camaraPrimeiraPessoa) {
                //Luzes de noite na terceira pessoa tem de ser mais fortes
                lightNighs.position.set(0, 1.5, 0);
                lightNighs2.position.set(0, 1.5, 0);
                lightNighs3.position.set(0, 1.5, 0);
                lightNighs4.position.set(0, 1.5, 0);
                lampAny.add(lightNighs);
                lampAny2.add(lightNighs2);
                lampAny3.add(lightNighs3);
                lampAny4.add(lightNighs4);
            }

            lampAny.add(lightday);
            lampAny2.add(lightday2);
            lampAny3.add(lightday3);
            lampAny4.add(lightday4);
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
            }
            lampAny.remove(lightday)
            lampAny2.remove(lightday2)
            lampAny3.remove(lightday3)
            lampAny4.remove(lightday4)
            cena.remove(spotlightnight);
            cena.remove(skybox2);
            cena.add(skybox);
            cena.add(spotlightday);
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

function lapUpdate() {
    const carPosition = new THREE.Vector3();
    car.getWorldPosition(carPosition);

    const carBoundingBox = new THREE.Box3().setFromObject(car);
    const lapcountfinal = new THREE.Box3().setFromObject(lapcount);

    const carCrossedFinishLine = carBoundingBox.intersectsBox(lapcountfinal);
    const carDirection = carPosition.clone().sub(carPreviousPosition).normalize();
    const lapcountNormal = new THREE.Vector3(0, 1, 0); // Assumindo que a linha de chegada está orientada verticalmente

    const angle = carDirection.angleTo(lapcountNormal);

    // Verifica se o carro cruzou a linha de chegada e está se movendo na direção correta (ângulo próximo de zero)
    if (carCrossedFinishLine && !crossedFinishLine) {
        count++;
        updateCounter();
        crossedFinishLine = true; // Atualiza a variável de controle
    }

    if (!carCrossedFinishLine) {
        crossedFinishLine = false; // Reseta a variável de controle
    }

    carPreviousPosition.copy(carPosition); // Atualiza a posição anterior do carro
}






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

    lampAny2.position.x = -40;
    lampAny2.position.y = 16;


    lampAny3.position.x = 35;
    lampAny3.position.y = 12;

    lampAny4.position.x = 62;
    lampAny4.position.y = 12.5;

    firstlamp.position.set(0, 11, -19.8)
    //Heli
    heli.rotation.x = Math.PI / 2;


    cena.add(skybox);
    cena.add(spotlightday);
    cena.add(tree);
    cena.add(car);
    cena.add(wheel);
    cena.add(track);
    cena.add(grass);
    cena.add(grass2);
    cena.add(grass3);
    cena.add(gravel);
    cena.add(gravel2);
    cena.add(heli);
    cena.add(lampAny);
    cena.add(lampAny2);
    cena.add(lampAny3);
    cena.add(lampAny4);
    cena.add(firstlamp);

    car.position.set(-3, 20, -19);
    wheel.position.set(-3, -10, -19);


    tree.position.set(20, 50, -10);

    startGame();
    updateCounter();
    updateHeli();

    requestAnimationFrame(loop);
}


function loop() {
    mainRotor.rotation.y += 0.1;
    tailRotor.rotation.x += 0.1;
    controls.update();
    lapUpdate(); // Adicione esta linha para verificar as voltas
    renderer.render(cena, camara);
    requestAnimationFrame(loop);
}


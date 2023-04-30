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
}
if (cs == 1) {
    camara = camaraO;
    camara.position.set(200, 0, 300);
    camara.lookAt(0, 0, 0);
}


//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------
//Setings das Camaras--------------------------------------------------------------------------------------------


//-------------------------------------------------
// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 15, window.innerHeight - 80);
renderer.render(cena, camara);

document.body.appendChild(renderer.domElement);


//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO

function Car() {
    const car = new THREE.Group();

    const backWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 12, 33, 32),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    backWheel.position.z = 6;
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 12, 33, 32),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    frontWheel.position.z = 6;
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({ color: 0xa52523 })
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

    car.scale.set(0.05, 0.05, 0.05);

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
        object3D.scale.set(1, 1, 1);

        var focoLuz = new THREE.SpotLight('#ffffff', 1);

        object3D.position.set(2, 0, -20);

        focoLuz.position.set(0, 0, 100);

        focoLuz.lookAt(object3D.position);

        cena.add(object3D);
        cena.add(focoLuz);
        
    })
} const track = createTrack()

var geometriaCubo = new THREE.BoxGeometry(1, 1, 1);

var textura = new THREE.TextureLoader().load('./Images/boxImage.jpg')
var materialTextura = new THREE.MeshStandardMaterial({ map: textura });

var meshCubo = new THREE.Mesh(geometriaCubo, materialTextura);
meshCubo.translateZ(-6.0);



//Mecanismo atraves do teclado (mexer o objeto (nao funcional)) ----------------------------------------------------------------------------
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        if (car) {
            car.position.z -= 0.25;
        }
    } else if (keyCode == 83) {
        if (car) {
            car.position.z += 0.25;
        }
    } else if (keyCode == 65) {
        if (car) {
            car.position.x -= 0.25;
        }
    } else if (keyCode == 68) {
        if (car) {
            car.position.x += 0.25;
        }
    } else if (keyCode == 32) {
        if (meshCubo.parent === cena) {
            cena.remove(meshCubo);
        } else {
            cena.add(meshCubo)
        }
    }
}


//Clicar tecla C e mexer com a camara Ortografica ou perspetiva.
document.addEventListener('keydown', ev => {

    //Tecla C = 67 (Camara Ortografica ou Perspectiva)
    if (ev.keyCode == 67) {
        if (cs == 0) {
            cs = 1;
            camara = camaraO;
            camara.position.set(200, 0, 300);
            camara.lookAt(0, 0, 0);
            car.position.z = 0;
            console.log(cs)

        } else {
            cs = 0;
            camara = camaraPerspetiva;
            console.log(cs)
        }

    }
});


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
    const tree = new THREE.Group();

    // Cria um tronco para a árvore
    const trunkGeometry = new THREE.CylinderGeometry(1, 1, 10, 16);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    tree.add(trunk);

    // Adiciona algumas folhas à árvore
    const leavesGeometry = new THREE.SphereGeometry(4, 16, 16);
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 1 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = 10;
    tree.add(leaves);

    return tree;
} const tree = createTree();

//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------




function Start() {
    cena.add(meshCubo);
    cena.add(tree);
    cena.add(car);
    cena.add(wheel);
    cena.add(track);

    car.position.set(-3, 0 - 10);
    car.position.set(-3, 0, -10);
    wheel.position.set(-3, 0, -10);
    tree.position.set(2, 0, -10);

    //Criação de um foco de luz com a cor branca e intensidade a 1 (intensidade normal)
    var focoLuz = new THREE.SpotLight('#ffffff', 1);

    //Mudar a posiçao da luz para ficar 5 unidades a cima de onde a câmara se encontra
    focoLuz.position.x = 5;
    focoLuz.position.y = 20;
    focoLuz.position.z = 20;

   
    //Adicionamos a light à cena
    //  cena.add(focoLuz);

    requestAnimationFrame(loop);
}

function loop() {
    meshCubo.rotateY(Math.PI / 180 * 1);



    controls.update();
    renderer.render(cena, camara);

    requestAnimationFrame(loop);
}

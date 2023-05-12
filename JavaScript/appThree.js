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
    const cam = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    cam.position.set(10, 50, 10); // Ajuste a posição da câmera dentro do carro
    cam.rotation.set(Math.PI/2, -Math.PI/2, 0); // Ajuste a rotação da câmera para olhar ligeiramente para baixo
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
renderer.setSize(window.innerWidth - 15, window.innerHeight - 80);
renderer.render(cena, camara);

document.body.appendChild(renderer.domElement);


//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO
//CARROOOOOOOOOOOOOOOOOOOOO
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

const vehicleColors = [ 0xa52523, 0xbdb638, 0x78b14b];


function Car() {
    const car = new THREE.Group();


    const backWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 33, 32),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    backWheel.position.z = 6;
    backWheel.position.x = -18;
    car.add(backWheel);
    

    const frontWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 33, 32),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    frontWheel.position.z = 6;
    frontWheel.position.x = 18;
    car.add(frontWheel);



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
    roof.rotation.z = -Math.PI/2;
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
var spotLight1 = new THREE.SpotLight(0xffffff, 0, 100, Math.PI/6, 0.5);
var spotLight2 = new THREE.SpotLight(0xffffff, 0, 100, Math.PI/6, 0.5);
spotLight1.castShadow = true;
spotLight2.castShadow = true;



// Posicionar as spotlights em relação aos faróis
spotLight1.position.set(2, 2, 1);
spotLight2.position.set(2, 2, 1);

headlight1.add(spotLight1);
headlight2.add(spotLight2);

//Target para direcionar a luz do carro transparente
const geometry_farols = new THREE.BoxBufferGeometry(5, 3, 2);
const material_farols = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0});
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

car.scale.set(0.15, 0.15, 0.15);

camaraPrimeiraPessoa = criarCamaraPrimeiraPessoa();
car.add(camaraPrimeiraPessoa); // Adicione a câmera de primeira pessoa como um objeto filho do carro
    
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


        // Cria a geometria do plano
        const geometry = new THREE.PlaneGeometry(100, 100);


        // Cria o material com a textura da bandeira axadrezada
        const texture = new THREE.TextureLoader().load('./Images/Bandeira.png');
        const material = new THREE.MeshBasicMaterial({ map: texture });

        // Cria a malha com a geometria e o material
        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(0.1,0.16,0);

        // Posiciona a malha no chão
        mesh.position.set(0, -50, -19.75);

        // Adiciona a malha à cena
        cena.add(mesh);

        
        
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
    } else if (keyCode == 32) {
        if (meshCubo.parent === cena) {
            cena.remove(meshCubo);
        } else {
            cena.add(meshCubo)
        }
    }
}

function getCarDirection(car) {
    const direction = new THREE.Vector3(0, 2, 2);
    return direction;
}
// ... (mantenha o código original aqui)
// Substitua a função onDocumentKeyDown por esta:
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    const speed = 0.25;
    if (keyCode == 87) {
        if (car) {
            car.position.x += Math.cos(car.rotation.z) * speed;
            car.position.y += Math.sin(car.rotation.z) * speed;   
        }
    } else if (keyCode == 83) {
        if (car) {
            car.position.x -= Math.cos(car.rotation.z) * speed;
            car.position.y -= Math.sin(car.rotation.z) * speed;
        }
    } else if (keyCode == 65) {
        if (car) {
            car.rotation.z += 0.1;    
        }
    } else if (keyCode == 68) {
        if (car) {
            car.rotation.z -= 0.1;
        }
    } else if (keyCode == 32) {
        if (meshCubo.parent === cena) {
            cena.remove(meshCubo);
        } else {
            cena.add(meshCubo);
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

function update() {
    const speed = 0.25;
    if (car) {
        if (keys.w) {
            car.position.x += Math.cos(car.rotation.z) * speed;
            car.position.y += Math.sin(car.rotation.z) * speed;
            
        }
        if (keys.s) {
            car.position.x -= Math.cos(car.rotation.z) * speed;
            car.position.y -= Math.sin(car.rotation.z) * speed;
        }
        if (keys.a) {
            car.rotation.z += 0.03;
        }
        if (keys.d) {
            car.rotation.z -= 0.03;
        }
    }

    requestAnimationFrame(update);
}

update();


//Clicar tecla C e mexer com a camara Ortografica ou perspetiva e Primeira Pessoa.
document.addEventListener("keydown", (event) => {
    if (event.code === "KeyC") {
      cs = (cs + 1) % 3; // Alterna entre as câmeras
  
      if (cs == 0) {
        camara = camaraPerspetiva;
        camara.position.set(100, 100, 100);
        camara.lookAt(0, 0, 0);
      } else if (cs == 1) {
        camara = camaraO;
        camara.position.set(200, 0, 300);
        camara.lookAt(0, 0, 0);
      } else if (cs == 2) {
        camara = camaraPrimeiraPessoa;
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
    tree.rotation.x = Math.PI/2;
  
    // Adiciona a árvore à cena
    cena.add(tree);

    return tree;
  }const tree = createTree();

//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------
//Criar uma arvore (fim)---------------------------------------------------------------------------------------------

function addBoard()
{
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
}const board = addBoard();

function addBoard2()
{
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
}const board2 = addBoard2();




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



function Start() {


    const grassTexture = new THREE.TextureLoader().load('./Images/grass2.0.png');

    const gravelTexture = new THREE.TextureLoader().load('./Images/gravel2.png');


    const grass = createGrass(200, 70, 40, -10, -20, grassTexture);
    const grass2 = createGrass(60, 73, -103, 12, -20, grassTexture);
    const grass3 = createGrass(60, 80, -55, 0, -20, grassTexture);
    const gravel = createGrasswithOpac(160, 150, -55, 0, -20, gravelTexture);
    const gravel2 = createGrasswithOpac(160, 150, -55, 0, -20, gravelTexture);

    grass.position.x = 40; // posição do chão
    grass.position.y = -10; // posição do chão
    grass.position.z = -20; // posição da relva na pista

    grass2.position.x = -103; // posição do chão
    grass2.position.y = 12; // posição do chão
    grass2.position.z = -20; // posição da relva na pista

    grass3.position.x = -55; // posição do chão
    grass3.position.y = 0; // posição do chão
    grass3.position.z = -20; // posição da relva na pista

    gravel.position.x = -77.96; // posição do chão
    gravel.position.y = 0; // posição do chão
    gravel.position.z = -20.01; // posição da relva na pista

    gravel2.position.x = 82; // posição do chão
    gravel2.position.y = 0; // posição do chão
    gravel2.position.z = -20.05; // posição da relva na pista

    cena.add(meshCubo);
    cena.add(tree);
    cena.add(car);
    cena.add(wheel);
    cena.add(track);
    cena.add(grass);
    cena.add(grass2);
    cena.add(grass3);
    cena.add(gravel);
    cena.add(gravel2);


    car.position.set(-3, 31, -20);
    wheel.position.set(-3, -10, -20);

  
    tree.position.set(20, 50, -10);

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

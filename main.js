import * as THREE from "https://cdn.skypack.dev/three@0.150.1";

import {
    PointerLockControls
} from './PointerLockControls.js';




// Configuration du rendu
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Active les ombres
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Définit le type d'ombre
document.body.appendChild(renderer.domElement);

// Initialisation de la scène et de la caméra
const scene = new THREE.Scene();


// Création de la carte avec des cases
const mapSize = Math.sqrt(90);
const tileSize = 50;
const tileHeight = tileSize / 4;
const visibleAreaSize = 25; // Taille de la zone visible autour de la caméra (en nombre de tuiles)
const generatedTiles = new Map(); // Stocke les tuiles déjà créées


function getSkyColors() {
    const date = new Date();
    const hours = date.getHours();
    let topColor, bottomColor, ambiant;
    if (hours < 6) {
        topColor = '#0c2237';
        bottomColor = '#1d3d6b';
        ambiant = .3;
    } else if (hours < 8) {
        topColor = '#4a7b9d';
        bottomColor = '#87ceeb';
        ambiant = .6;
    } else if (hours < 18) {
        topColor = '#87ceeb';
        bottomColor = '#ffffff';
    } else if (hours < 20) {
        topColor = '#fc8d3c';
        bottomColor = '#ffdd85';
        ambiant = .5;
    } else {
        topColor = '#0c2237';
        bottomColor = '#1d3d6b';
        ambiant = .3;
    }
    return [topColor, bottomColor, ambiant];
}

const ambientLight = new THREE.AmbientLight(0xffffff, getSkyColors()[2]);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(100, 200, 100);
directionalLight.castShadow = true; // Active les ombres pour cette lumière
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.left = -500;
directionalLight.shadow.camera.right = 500;
directionalLight.shadow.camera.top = 500;
directionalLight.shadow.camera.bottom = -500;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 1000;
scene.add(directionalLight);


// scene.background = new THREE.Color(0xffffff); // Définir l'arrière-plan en blanc
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 5000);
const halfMapSize = (mapSize * tileSize) / 2;
camera.position.set(halfMapSize + 20, 1500, halfMapSize + 20);
camera.lookAt(halfMapSize, 0, halfMapSize);
scene.add(camera);





// Ajout des contrôles de caméra
const controls = new PointerLockControls(camera, renderer.domElement);



const grassColor = new THREE.Color(0x3c873a);
const sandColor = new THREE.Color(0xc2b280);
const waterColor = new THREE.Color(0x87ceeb);
const treeProbability = 0.1;

const waterProbability = 0.2; // Probabilité de générer une case d'eau
const waterHeight = tileSize / 8; // Hauteur de la case d'eau

// Temps de l'animation des vagues
const waveTime = 2; // en secondes

function createGradientBackground(topColor, bottomColor) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, topColor);
    gradient.addColorStop(1, bottomColor);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return new THREE.CanvasTexture(canvas);
}
function createStar(cameraPosition, mapSize) {
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
    const star = new THREE.Mesh(geometry, material);
  
    const minDistance = mapSize / 2 + 100; // La distance minimale entre la caméra et les étoiles
    const maxDistance = minDistance + 500; // La distance maximale entre la caméra et les étoiles
  
    // Générer une position aléatoire pour l'étoile dans un intervalle spécifié
    function randomPosition(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    const distance = randomPosition(minDistance, maxDistance);
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.random() * Math.PI * 2;
  
    star.position.set(
      cameraPosition.x + distance * Math.sin(angle1) * Math.cos(angle2),
      cameraPosition.y + distance * Math.sin(angle1) * Math.sin(angle2),
      cameraPosition.z + distance * Math.cos(angle1)
    );
  
    scene.add(star);
  }
  
  function generateStars(cameraPosition, mapSize, numStars = 200) {
    for (let i = 0; i < numStars; i++) {
      createStar(cameraPosition, mapSize);
    }
  }
   
  const clouds = [];

  function generateCloud() {
    const geometry = new THREE.BoxGeometry((Math.random() * 100 - 60), 20, (Math.random() * 100 - 60));
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
    const cloud = new THREE.Mesh(geometry, material);
  
    // Positionnez le nuage à une distance plus proche de la caméra
    const x = camera.position.x + (Math.random() * 2000 - 1000);
    const y = camera.position.y + (Math.random() * 1000 + 300);
    const z = camera.position.z + (Math.random() * 2000 - 1000);
  
    cloud.position.set(x, y, z);
    scene.add(cloud);
    clouds.push(cloud);
  }
  
 






function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}
// Fonction pour animer une case d'eau
function animateWater(water) {
    const initialHeight = water.position.y;
    const targetHeight = initialHeight + tileSize / 16; // Hauteur de la vague
    const clock = new THREE.Clock();

    function updateWater() {
        const elapsed = clock.getElapsedTime();
        const progress = (elapsed % waveTime) / waveTime; // Progression de l'animation avec une fonction sinus pour un effet de ease-in-out

        // Modifier la progression pour inclure l'animation inverse
        const adjustedProgress = progress < 0.5 ? progress * 2 : 1 - (progress - 0.5) * 2;
        const easedProgress = easeInOutSine(adjustedProgress);

        const newHeight = THREE.MathUtils.lerp(initialHeight, targetHeight, easedProgress); // Interpolation linéaire de la hauteur
        water.position.y = newHeight;
        requestAnimationFrame(updateWater);
    }

    requestAnimationFrame(updateWater);
}
function createTree() {
    const tree = new THREE.Group();

    // Tronc
    const minHeight = 30; // Hauteur minimale du tronc
    const maxHeight = 60; // Hauteur maximale du tronc
    const height = Math.random() * (maxHeight - minHeight) + minHeight;

    const trunkGeometry = new THREE.CylinderGeometry(2.5, 2.5, height, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({
        color: 0x8b4513
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = height / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;

    // Feuilles
    const leavesHeight = (Math.random() * 30 + 30) / 2; // Divise la hauteur par deux
    const leavesRadius = (Math.random() * 20 + 20) / 2; // Divise le rayon par deux
    const leavesGeometry = new THREE.CylinderGeometry(leavesRadius, leavesRadius, leavesHeight, 12);
    const leavesMaterial = new THREE.MeshLambertMaterial({
        color: 0x6B8E23,
        transparent: true, // Active la transparence
        opacity: .90, // Définit l'opacité des feuilles
    });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = height + leavesHeight / 2; // Positionne les feuilles juste au-dessus du tronc
    leaves.castShadow = true;
    leaves.receiveShadow = true;

    // Ajout des éléments à l'arbre
    tree.add(trunk);
    tree.add(leaves);

    tree.scale.set(0.5, 0.5, 0.5); // Réduit de moitié la taille de l'arbre

    return tree;
}




function generateTilesAroundPosition(x, z) {
    const tileX = Math.floor(x / tileSize);
    const tileZ = Math.floor(z / tileSize);

    for (let i = tileX - visibleAreaSize; i <= tileX + visibleAreaSize; i++) {
        for (let j = tileZ - visibleAreaSize; j <= tileZ + visibleAreaSize; j++) {
            const tileKey = `${i},${j}`;

            // Si la tuile n'a pas encore été créée, créez-la
            if (!generatedTiles.has(tileKey)) {
                // Déterminez si cette case doit être de l'eau ou non
                const isWater = Math.random() < waterProbability;

                let tile;
                // Si c'est de l'eau, créez une case d'eau
                if (isWater) {
                    const waterGeometry = new THREE.BoxGeometry(tileSize, waterHeight, tileSize);
                    const waterMaterial = new THREE.MeshLambertMaterial({
                        color: waterColor,
                        transparent: true,
                        opacity: 0.7,
                    });

                    tile = new THREE.Mesh(waterGeometry, waterMaterial);
                    tile.position.y = waterHeight / 2;
                    animateWater(tile); // Animer la case d'eau
                }
                // Sinon, créez une case de terre
                else {
                    const randomHeightFactor = Math.random() * 3 + 1;
                    const adjustedTileHeight = tileHeight * randomHeightFactor;
                    const adjustedGeometry = new THREE.BoxGeometry(tileSize, adjustedTileHeight, tileSize);
                    const mixValue = Math.random();
                    const tileColor = new THREE.Color().lerpColors(grassColor, sandColor, mixValue);
                    const tileMaterial = new THREE.MeshLambertMaterial({
                        color: tileColor
                    });
                    tile = new THREE.Mesh(adjustedGeometry, tileMaterial);
                    tile.position.y = adjustedTileHeight / 2;
                    tile.castShadow = true; // Active les ombres pour les cases
                    tile.receiveShadow = true; // Les cases reçoivent les ombres

                    // Ajouter un arbre aléatoirement sur certaines cases d'herbe
                    if (Math.random() < treeProbability) {
                        const tree = createTree();
                        tree.position.y = adjustedTileHeight/2; // Positionne l'arbre sur la case
                        tile.add(tree);
                    }
                }

                tile.position.x = i * tileSize;
                tile.position.z = j * tileSize;

                scene.add(tile);
                generatedTiles.set(tileKey, tile);
            }
        }
    }
}

const rotationSpeed = 0.01;
const verticalSpeed = 10;


function animate() {
    requestAnimationFrame(animate);

    // Mettez à jour la couleur du ciel
    const [topColor, bottomColor] = getSkyColors();
    const skyTexture = createGradientBackground(topColor, bottomColor);
    scene.background = skyTexture;

    // Génère les tuiles autour de la position de la caméra
    generateTilesAroundPosition(camera.position.x, camera.position.z);

    // Vérifie et limite la position de la caméra
    checkCameraPosition();

    // Obtenez le vecteur de direction de la caméra
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // Appliquez un petit déplacement dans la direction de la caméra
    const autoMoveSpeed = 0.3;
    camera.position.add(cameraDirection.multiplyScalar(autoMoveSpeed));

    const currentTime = new Date();
  
    if (currentTime.getHours() >= 20 || currentTime.getHours() <= 0 || currentTime.getHours() < 6 ) {
        generateStars(camera.position, 2000, 5); 
    }

    if (controls.isLocked) {
    
       // Rotation de la caméra autour de l'axe Y en fonction des touches enfoncées
        if (keys.a) {
            camera.rotation.y += rotationSpeed;
        }
        if (keys.d) {
            camera.rotation.y -= rotationSpeed;
        }

        // Déplacement vertical de la caméra le long de l'axe Z en fonction des touches enfoncées
        if (keys.w) {
            camera.position.x -= verticalSpeed;
        }
        if (keys.s) {
            camera.position.x += verticalSpeed;
        }

      }
    
      // Mettez à jour les contrôles
    //   controls.update();

    // Générer des nuages aléatoirement avec une probabilité de 5%
  if (Math.random() < 0.05) {
    generateCloud();
  }

  // Déplacez les nuages lentement
  scene.traverse(function (object) {
    if (object.name === 'cloud') {
      object.position.x += 0.05;
      if (object.position.x > camera.position.x + 500) {
        object.position.x = camera.position.x - 500;
      }
    }
  });

    renderer.render(scene, camera);
}


function checkCameraPosition() {
    const minCameraHeight = 280; // Hauteur d'homme en centimètres

    // Vérifiez si la caméra est sous la hauteur minimale autorisée
    if (camera.position.y < minCameraHeight) {
        // Limitez la position de la caméra à la hauteur minimale
        camera.position.y = minCameraHeight;
    }
}

function positionCameraOnRandomTile() {
    const randomX = Math.floor(Math.random() * mapSize) * tileSize + tileSize / 2;
    const randomZ = Math.floor(Math.random() * mapSize) * tileSize + tileSize / 2;
    const humanHeight = 180; // Hauteur d'homme en centimètres
    camera.position.set(randomX, humanHeight, randomZ);
    camera.lookAt(new THREE.Vector3(-180, 0, 360));
}

positionCameraOnRandomTile();

animate();

//html
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
    // Réinitialisez la position et l'orientation de la caméra
    camera.position.set(450, 450, 450);
    camera.lookAt(scene.position);

    // Réinitialisez les contrôles de la caméra
    controls.reset();
});
let initSound = 0;
//add document.body to PointerLockControls constructor
document.addEventListener('click', () => {
    controls.lock();
    if(initSound == 0) {
        audioContext.resume();
        initSound++;
    }
});

const moveSpeed = 150; // Vitesse de déplacement
let moveDirection = new THREE.Vector3();
document.addEventListener('keydown', (event) => {
    const key = event.code;

    switch (key) {
        case 'ArrowUp': // Z key on AZERTY keyboard
            moveDirection.z = -moveSpeed;
            break;
        case 'ArrowDown': // S key on AZERTY keyboard
            moveDirection.z = moveSpeed;
            break;
        case 'ArrowLeft': // Q key on AZERTY keyboard
            moveDirection.x = -moveSpeed;
            break;
        case 'ArrowRight': // D key on AZERTY keyboard
            moveDirection.x = moveSpeed;
            break;
        default:
            return;
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.code;

    switch (key) {
        case 'ArrowUp':
        case 'ArrowDown':
            moveDirection.z = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            moveDirection.x = 0;
            break;
        default:
            return;
    }
});

function animateCamera() {
    if (!moveDirection.equals(new THREE.Vector3(0, 0, 0))) {
        const deltaDirection = moveDirection.clone().multiplyScalar(0.1);
        deltaDirection.applyQuaternion(camera.quaternion);
        camera.position.add(deltaDirection);
    }

    requestAnimationFrame(animateCamera);
}

animateCamera();


// Initialise l'API Web Audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer;
let audioSource;
let isPlaying = true;

// Charge le fichier audio
function loadAudio(url) {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data))
    .then((buffer) => {
      audioBuffer = buffer;
      playAudio();
    })
    .catch((err) => console.error(err));
}

const playlist = [
    'https://www.oxynum.fr/ES_AtMidnight.mp3',
    'https://www.oxynum.fr/ES_GrowingLove.mp3',
    'https://www.oxynum.fr/ES_CottonDreams.mp3',
    'https://www.oxynum.fr/ES_BigSky.mp3',
  ];

  let currentTrack = 0;

  function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadAudio(playlist[currentTrack]);
  }
// Joue l'audio
function playAudio() {
    if (audioSource) {
      audioSource.stop();
    }
  
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(audioContext.destination);
    audioSource.start(0);
  
    // Passe au morceau suivant lorsque le morceau actuel est terminé
    audioSource.onended = () => {
      nextTrack();
    };
  }



// Pause ou reprend l'audio
function toggleAudio() {
  if (isPlaying) {
    audioContext.suspend();
  } else {
    audioContext.resume();
  }

  isPlaying = !isPlaying;
}

// Charge le fichier MP3
  loadAudio(playlist[currentTrack]);

// Gère le bouton de pause
const audioToggleBtn = document.getElementById('audio-toggle');
audioToggleBtn.addEventListener('click', () => {
  toggleAudio();
  audioToggleBtn.textContent = isPlaying ? 'Pause' : 'Play';
});


const keys = {
    w: false,
    a: false,
    s: false,
    d: false
  };

  function onKeyDown(event) {
    switch (event.key.toLowerCase()) {
      case 'w':
        keys.w = true;
        break;
      case 'a':
        keys.a = true;
        break;
      case 's':
        keys.s = true;
        break;
      case 'd':
        keys.d = true;
        break;
    }
  }
  
  function onKeyUp(event) {
    switch (event.key.toLowerCase()) {
      case 'w':
        keys.w = false;
        break;
      case 'a':
        keys.a = false;
        break;
      case 's':
        keys.s = false;
        break;
      case 'd':
        keys.d = false;
        break;
    }
  }
  
  
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  
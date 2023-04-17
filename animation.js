




        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

        /*const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('anim')
        });*/
        const renderer = new THREE.WebGLRenderer();

        
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild( renderer.domElement );


        camera.position.set(30);
        renderer.render(scene,camera);

        const geomety = new THREE.TorusGeometry(10,3,16,100);

        const material = new THREE.MeshBasicMaterial({color: 0xff6347, wireframe: true});

        const torus = new THREE.Mesh(geomety,material);

        scene.add(torus);
        
         function animate2(){
            requestAnimationFrame(animate2);
            renderer.render(scene,camera);
        }

        animate2()

        $(window).on("load", function () {

})
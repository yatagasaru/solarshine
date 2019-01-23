const speed = 1 //kecepatan orbit/ 1 = normal(official NASA wkwk)
let planets = []
let bintang

function setup() {
    createCanvas(windowWidth, windowHeight)

    //init bintang
    bintang = new Bintang(windowWidth, windowHeight)
    bintang.createCluster()

    for (let key in planetsData) { //planetsData dari ./solar2.static.js
        if (planetsData.hasOwnProperty(key)) {
            planets.push(new Planet(planetsData[key]))
        }
    }
}

function draw() {
    background(0)

    //kelap-kelip bintang
    bintang.starify()

    translate(width / 2, height / 2)
    stroke(0)

    //you are my sunshine
    fill(252, 254, 65)
    ellipse(0, 0, 150, 150)

    //planets
    planets.forEach(planet => {
        planet.move()
        planet.display()
        planet.orbitLine()
    })
}

function mousePressed() {
    if (mouseIsPressed) {
        if (mouseButton == LEFT) {
            location.reload()
        }
    }

}

class Planet {
    constructor(data) {
        this.a = 0.0
        this.r = data.r
        this.speedConst = data.speedConst
        this.xPlanet
        this.yPlanet
        this.planetSize = data.size
        this.planetFill1 = data.f1
        this.planetFill2 = data.f2
        this.planetFill3 = data.f3
        this.orbitFill1 = data.orbit.f1
        this.orbitFill2 = data.orbit.f2
        this.orbitFill3 = data.orbit.f3
        this.orbitSize = data.orbit.size
    }

    move() {
        this.xPlanet = this.r * cos(this.a)
        this.yPlanet = this.r * sin(this.a)
        this.a += this.speedConst * speed

    }
    display() {
        fill(this.planetFill1, this.planetFill2, this.planetFill3)
        ellipse(this.xPlanet, this.yPlanet, this.planetSize)
    }
    orbitLine() {
        stroke(this.orbitFill1, this.orbitFill2, this.orbitFill3)
        noFill()
        ellipse(0, 0, this.orbitSize, this.orbitSize)
        stroke(0)
    }
}

class Bintang {
    constructor(x, y) {
        this.x = []
        this.y = []
        this.min
        this.clusters = {
            weakCluster: {
                start: "",
                stop: "",
                count: "",
                a: 0.0,
                fadeMe: "",
            },
            cluster1: {
                start: "",
                stop: "",
                count: "",
                a: 0.0,
                fadeMe: "",
            },
            cluster2: {
                start: "",
                stop: "",
                count: "",
                a: 0.0,
                fadeMe: "",
            },
            cluster3: {
                start: "",
                stop: "",
                count: "",
                a: 0.0,
                fadeMe: "",
            }
        }
        x < y ? this.min = x : this.min = y

        for (let i = 0; i < x; i++) {
            this.x[i] = Math.floor(random(0, x))
        }
        for (let i = 0; i < y; i++) {
            this.y[i] = Math.floor(random(0, y))

        }
    }
    createCluster() {
        let weak = this.min * 0.125
        let strong = this.min * 0.25

        let weakCluster = weak
        let cluster1 = strong + weakCluster
        let cluster2 = strong + cluster1
        let cluster3 = strong + cluster2


        this.clusters.weakCluster.start = 0
        this.clusters.weakCluster.stop = Math.round(weakCluster)

        this.clusters.cluster1.start = Math.round(weakCluster + 1)
        this.clusters.cluster1.stop = Math.round(cluster1)

        this.clusters.cluster2.start = Math.round(cluster1 + 1)
        this.clusters.cluster2.stop = Math.round(cluster2)

        this.clusters.cluster3.start = Math.round(cluster2 + 1)
        this.clusters.cluster3.stop = Math.round(cluster3)
    }

    starify() {
        this.animate("weakCluster", 0.0159 * 4, -90)
        this.display("weakCluster")

        this.animate("cluster1", 0.00182, -90)
        this.display("cluster1")

        this.animate("cluster2", 0.00439, -90)
        this.display("cluster2")

        this.animate("cluster3", 0.0159, -90)
        this.display("cluster3")
    }
    
    animate(clustername, blinkConst, r) {
        this.clusters[clustername].count = r * cos(this.clusters[clustername].a)
        this.clusters[clustername].fadeMe = map(this.clusters[clustername].count, -90, 90, 255, 0)
        this.clusters[clustername].a += blinkConst * speed
    }

    display(clustername) {
        stroke(this.clusters[clustername].fadeMe)
        noFill()
        for (let i = this.clusters[clustername].start; i <= this.clusters[clustername].stop; i++) {
            ellipse(this.x[i], this.y[i], 1, 1)
        }
    }
}
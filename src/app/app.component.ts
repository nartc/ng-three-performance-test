import { NgtSobaFlyControls } from "@angular-three/soba/controls";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from "@angular/core";
import * as THREE from "three";
import { IcosahedronGeometry, LOD, MeshLambertMaterial } from "three";

@Component({
  selector: "app-root",
  template: `
    <ngt-canvas
      [linear]="true"
      [camera]="{ fov: 45, near: 1, far: 15000, position: [0, 0, 1000] }"
      [scene]="{ fog }"
      (created)="
        $event.camera.updateProjectionMatrix();
        $event.renderer.setClearColor('black')
      "
    >
      <ngt-point-light [position]="[0, 0, 0]" color="#ff2200"></ngt-point-light>
      <ngt-directional-light
        [position]="[0, 0, 1]"
        color="#ffffff"
      ></ngt-directional-light>

      <ngt-stats></ngt-stats>

      <app-lods></app-lods>
      <ngt-soba-fly-controls></ngt-soba-fly-controls>
    </ngt-canvas>
  `,
  styles: [],
})
export class AppComponent implements AfterViewInit {
  fog = new THREE.Fog("#000000", 1, 15000);

  @ViewChild(NgtSobaFlyControls, { static: true })
  flyControls!: NgtSobaFlyControls;

  ngAfterViewInit() {
    this.flyControls.controls.movementSpeed = 1000;
    this.flyControls.controls.rollSpeed = Math.PI / 10;
  }
}

@Component({
  selector: "app-lods",
  template: `
    <ngt-mesh-lambert-material
      #lambertMaterial="ngtMeshLambertMaterial"
      [parameters]="{ color: '#ffffff', wireframe: true }"
    ></ngt-mesh-lambert-material>

    <ngt-icosahedron-geometry
      #geometry16="ngtIcosahedronGeometry"
      [args]="[100, 16]"
    ></ngt-icosahedron-geometry>
    <ngt-icosahedron-geometry
      #geometry8="ngtIcosahedronGeometry"
      [args]="[100, 8]"
    ></ngt-icosahedron-geometry>
    <ngt-icosahedron-geometry
      #geometry4="ngtIcosahedronGeometry"
      [args]="[100, 4]"
    ></ngt-icosahedron-geometry>
    <ngt-icosahedron-geometry
      #geometry2="ngtIcosahedronGeometry"
      [args]="[100, 2]"
    ></ngt-icosahedron-geometry>
    <ngt-icosahedron-geometry
      #geometry1="ngtIcosahedronGeometry"
      [args]="[100, 1]"
    ></ngt-icosahedron-geometry>

    <!--    <ngt-lod-->
    <!--      *repeat="let _ of 1000"-->
    <!--      #lod="ngtLod"-->
    <!--      [position]="[-->
    <!--        10000 * (0.5 - (1 | mathConst: 'random')),-->
    <!--        7500 * (0.5 - (1 | mathConst: 'random')),-->
    <!--        10000 * (0.5 - (1 | mathConst: 'random'))-->
    <!--      ]"-->
    <!--      (ready)="-->
    <!--        onLodReady(lod.lod, lambertMaterial.material, [-->
    <!--          geometry16.geometry,-->
    <!--          geometry8.geometry,-->
    <!--          geometry4.geometry,-->
    <!--          geometry2.geometry,-->
    <!--          geometry1.geometry-->
    <!--        ])-->
    <!--      "-->
    <!--    >-->
    <!--    </ngt-lod>-->

    <ng-container *rxFor="let position of $any(amount)">
      <ngt-soba-detailed
        #lod="ngtSobaDetailed"
        [position]="$any(position)"
        [distances]="distances"
      >
        <ngt-mesh
          appendMode="none"
          [geometry]="geometry16.geometry"
          [material]="lambertMaterial.material"
          [scale]="[1.5, 1.5, 1.5]"
        ></ngt-mesh>
        <ngt-mesh
          appendMode="none"
          [geometry]="geometry8.geometry"
          [material]="lambertMaterial.material"
          [scale]="[1.5, 1.5, 1.5]"
        ></ngt-mesh>
        <ngt-mesh
          appendMode="none"
          [geometry]="geometry4.geometry"
          [material]="lambertMaterial.material"
          [scale]="[1.5, 1.5, 1.5]"
        ></ngt-mesh>
        <ngt-mesh
          appendMode="none"
          [geometry]="geometry2.geometry"
          [material]="lambertMaterial.material"
          [scale]="[1.5, 1.5, 1.5]"
        ></ngt-mesh>
        <ngt-mesh
          appendMode="none"
          [geometry]="geometry1.geometry"
          [material]="lambertMaterial.material"
          [scale]="[1.5, 1.5, 1.5]"
        ></ngt-mesh>
      </ngt-soba-detailed>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LODComponent {
  distances = [50, 300, 1000, 2000, 8000];

  amount = Array.from({ length: 1000 })
    .fill(undefined)
    .map(
      () =>
        [this.getXZ(), this.getY(), this.getXZ()] as [number, number, number]
    );

  getXZ() {
    return 10000 * (0.5 - Math.random());
  }

  getY() {
    return 7500 * (0.5 - Math.random());
  }

  onLodReady(
    lod: LOD,
    material: MeshLambertMaterial,
    geometries: IcosahedronGeometry[]
  ) {
    for (let i = 0; i < this.distances.length; i++) {
      const distance = this.distances[i];
      const mesh = new THREE.Mesh(geometries[i], material);
      mesh.scale.set(1.5, 1.5, 1.5);
      lod.addLevel(mesh, distance);
    }
  }
}
